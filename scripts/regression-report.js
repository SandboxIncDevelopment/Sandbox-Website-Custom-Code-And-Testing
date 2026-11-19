// Turns Playwright's JSON report (regression-report.json) into a short, readable
// summary of what differs from the baseline, plus the difference images, in
// regression-results/. The Regression tests workflow publishes that folder to
// the regression-results branch, so the outcome can be read without
// downloading and unzipping the full report.
//
//   BASE_URL=https://sb-website-2024-test.webflow.io node scripts/regression-report.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const reportFile = process.env.REPORT_FILE || path.join(root, 'regression-report.json');
const outDir = process.env.OUT_DIR || path.join(root, 'regression-results');
const baseURL = (process.env.BASE_URL || 'https://sb-website-2024-test.webflow.io').replace(/\/$/, '');
const site = new URL(baseURL).hostname;

const repoUrl = process.env.GITHUB_REPOSITORY ? `${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY}` : '';
const runUrl = repoUrl && process.env.GITHUB_RUN_ID ? `${repoUrl}/actions/runs/${process.env.GITHUB_RUN_ID}` : '';
const sha = process.env.GITHUB_SHA || '';

if (!fs.existsSync(reportFile)) {
  console.log(`No ${path.basename(reportFile)} found, so there is nothing to summarise.`);
  process.exit(0);
}
const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));

const plain = (s) => String(s == null ? '' : s).replace(/\u001b\[[0-9;]*m/g, '');
const esc = (s) => plain(s).replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/\s*\n\s*/g, ' ').trim();
const posix = (p) => p.split(path.sep).join('/');

// ---- Flatten the report into one entry per test and screen size ----
const tests = [];
(function walk(suites) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const t of spec.tests || []) {
        const title = spec.title.replace(/\s*@\w+/g, '').trim();
        const colon = title.indexOf(':');
        tests.push({
          file: spec.file || suite.file || '',
          page: colon > 0 ? title.slice(0, colon).trim() : '',
          what: colon > 0 ? title.slice(colon + 1).trim() : title,
          size: t.projectName || '',
          status: t.status, // expected | unexpected | flaky | skipped
          result: (t.results || []).at(-1) || { attachments: [], errors: [] },
        });
      }
    }
    walk(suite.suites);
  }
})(report.suites);

// ---- Lines only in the baseline, and lines only on the site now ----
function lineDiff(expectedFile, actualFile, cap = 25) {
  const read = (f) => (f && fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n') : []);
  const expected = read(expectedFile);
  const actual = read(actualFile);
  const tally = (lines) => lines.reduce((m, l) => m.set(l, (m.get(l) || 0) + 1), new Map());
  const only = (lines, other) => {
    const left = tally(other);
    return lines.filter((l) => {
      if (left.get(l)) { left.set(l, left.get(l) - 1); return false; }
      return l.trim() !== '';
    });
  };
  const removed = only(expected, actual);
  const added = only(actual, expected);
  const lines = [...removed.map((l) => `- ${l.trim()}`), ...added.map((l) => `+ ${l.trim()}`)];
  const more = lines.length > cap ? [`… ${lines.length - cap} more lines`] : [];
  return { removed: removed.length, added: added.length, lines: [...lines.slice(0, cap), ...more] };
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
const copy = (from, to) => {
  if (!from || !fs.existsSync(from)) return '';
  fs.mkdirSync(path.dirname(path.join(outDir, to)), { recursive: true });
  fs.copyFileSync(from, path.join(outDir, to));
  return posix(to);
};
const baselineLink = (file) => {
  if (!file) return '';
  const rel = posix(path.relative(root, file));
  if (rel.startsWith('..')) return '';
  return repoUrl && sha ? `${repoUrl}/blob/${sha}/${rel}` : rel;
};

// ---- One difference per file or screenshot that no longer matches ----
const differences = [];
for (const t of tests.filter((x) => x.status === 'unexpected')) {
  const byName = new Map((t.result.attachments || []).filter((a) => a.path).map((a) => [a.name, a.path]));
  const actuals = [...byName.keys()].filter((n) => /-actual\.(png|json)$/.test(n));
  for (const name of actuals) {
    const ext = path.extname(name);
    const base = name.replace(/-actual\.(png|json)$/, '');
    const expected = byName.get(`${base}-expected${ext}`);
    if (ext === '.png') {
      differences.push({
        page: t.page, size: t.size, check: 'screenshot',
        detail: 'The page looks different from the baseline screenshot.',
        diffImage: copy(byName.get(`${base}-diff.png`), `images/${t.size}/${base}-diff.png`),
        actualImage: copy(byName.get(name), `images/${t.size}/${base}-actual.png`),
        baseline: baselineLink(expected),
      });
    } else {
      const check = base.startsWith(`${t.page}-`) ? base.slice(t.page.length + 1) : base;
      const diff = lineDiff(expected, byName.get(name));
      differences.push({
        page: t.page, size: t.size, check,
        detail: `${diff.removed} line${diff.removed === 1 ? '' : 's'} no longer present, ${diff.added} new.`,
        actualFile: copy(byName.get(name), `data/${t.size}/${base}-actual.json`),
        baseline: baselineLink(expected),
        lines: diff.lines,
      });
    }
  }
  if (!actuals.length) {
    const message = plain(((t.result.errors || [])[0] || {}).message || 'The test failed.').split('\n').map((l) => l.trim()).filter(Boolean);
    differences.push({ page: t.page, size: t.size, check: t.what, detail: message.slice(0, 2).join(' ').slice(0, 300) });
  }
}
const order = (d) => `${d.page} ${d.size} ${d.check}`;
differences.sort((a, b) => order(a).localeCompare(order(b)));

const flaky = tests.filter((t) => t.status === 'flaky');
const skipped = tests.filter((t) => t.status === 'skipped');
const passed = tests.filter((t) => t.status === 'expected').length;
const failed = tests.filter((t) => t.status === 'unexpected').length;
const pages = [...new Set(differences.map((d) => d.page || '(no page)'))];
const sizes = [...new Set(tests.map((t) => t.size).filter(Boolean))];
const date = new Date().toISOString().slice(0, 10);

// ---- summary.json: the same facts, for tools ----
fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify({
  site, baseURL, date, runUrl, baselineCommit: sha,
  totals: { passed, failed, passedOnRetry: flaky.length, skipped: skipped.length, differences: differences.length, pagesWithDifferences: pages.length },
  differences,
  passedOnRetry: flaky.map((t) => ({ page: t.page, size: t.size, check: t.what })),
  skipped: skipped.map((t) => ({ page: t.page, size: t.size, check: t.what })),
}, null, 2) + '\n');

// ---- summary.md: the same facts, for people ----
const lines = [];
const out = (s = '') => lines.push(s);

out(`# Regression check: ${site}`);
out();
out(`Run ${date} against ${baseURL}, at ${sizes.join(' and ') || 'no'} sizes.${runUrl ? ` [Open the run](${runUrl}) for the full side-by-side report.` : ''}`);
out();
out(differences.length
  ? `**${differences.length} difference${differences.length === 1 ? '' : 's'} from the baseline, on ${pages.length} page${pages.length === 1 ? '' : 's'}: ${pages.join(', ')}.**`
  : '**No differences from the baseline.**');
out();
out(`- Tests passed: ${passed}`);
out(`- Tests failed: ${failed}`);
out(`- Passed only on a second try: ${flaky.length}`);
out(`- Skipped: ${skipped.length}`);
out();
out('A difference is not always a fault. A content edit is expected to change the page it was made on. A difference on a page nobody meant to change is the one to look into.');
out();

if (differences.length) {
  out('## What differs');
  out();
  out('| Page | Size | Check | What changed |');
  out('|---|---|---|---|');
  for (const d of differences) out(`| ${esc(d.page)} | ${esc(d.size)} | ${esc(d.check)} | ${esc(d.detail)} |`);
  out();
}
if (flaky.length) {
  out('## Passed only on a second try');
  out();
  out('These failed once and then passed. They are not differences, but an unstable test is worth knowing about.');
  out();
  for (const t of flaky) out(`- ${t.page ? `${t.page}: ` : ''}${t.what} (${t.size})`);
  out();
}
if (skipped.length) {
  out('## Skipped');
  out();
  out('A test is skipped when the feature it checks is not on the site being tested.');
  out();
  for (const t of skipped) out(`- ${t.page ? `${t.page}: ` : ''}${t.what} (${t.size})`);
  out();
}
if (differences.some((d) => d.diffImage || d.actualImage || (d.lines && d.lines.length))) {
  out('## Differences in detail');
  out();
  for (const d of differences) {
    if (!(d.diffImage || d.actualImage || (d.lines && d.lines.length))) continue;
    out(`### ${d.page}, ${d.size}: ${d.check}`);
    out();
    if (d.diffImage) {
      out('Changed areas are highlighted in red.');
      out();
      out(`![${d.page} at ${d.size} size, changed areas highlighted](${d.diffImage})`);
      out();
    }
    const links = [];
    if (d.actualImage) links.push(`[how it looks now](${d.actualImage})`);
    if (d.actualFile) links.push(`[what the site produced](${d.actualFile})`);
    if (d.baseline) links.push(`[the baseline](${d.baseline})`);
    if (links.length) { out(`Compare: ${links.join(' · ')}`); out(); }
    if (d.lines && d.lines.length) {
      out('Lines starting with `-` were in the baseline and are gone. Lines starting with `+` are new.');
      out();
      out('```diff');
      d.lines.forEach((l) => out(l));
      out('```');
      out();
    }
  }
}

fs.writeFileSync(path.join(outDir, 'summary.md'), lines.join('\n').replace(/\n+$/, '\n'));
console.log(`Wrote ${path.relative(root, outDir) || outDir}: ${differences.length} difference(s) on ${pages.length} page(s).`);
