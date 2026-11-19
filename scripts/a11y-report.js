// Turns the raw findings in a11y-results/ into reports/accessibility/<site>.md
//
//   BASE_URL=https://sb-website-2024-test.webflow.io node scripts/a11y-report.js
const fs = require('fs');
const path = require('path');

const baseURL = (process.env.BASE_URL || 'https://sb-website-2024-test.webflow.io').replace(/\/$/, '');
const site = new URL(baseURL).hostname;
const inDir = path.join(__dirname, '..', 'a11y-results');
const outDir = path.join(__dirname, '..', 'reports', 'accessibility');

const esc = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/\n/g, ' ');
const code = (s) => '`' + String(s).replace(/`/g, "'") + '`';
const projects = fs.existsSync(inDir) ? fs.readdirSync(inDir).filter((d) => fs.statSync(path.join(inDir, d)).isDirectory()).sort() : [];

const load = (kind) => {
  const rows = [];
  for (const project of projects) {
    for (const file of fs.readdirSync(path.join(inDir, project)).filter((f) => f.endsWith(`.${kind}.json`)).sort()) {
      rows.push({ project, slug: file.replace(`.${kind}.json`, ''), data: JSON.parse(fs.readFileSync(path.join(inDir, project, file), 'utf8')) });
    }
  }
  return rows;
};

const axe = load('axe');
const keyboard = load('keyboard');
const widgets = load('widgets');

// ---- Group axe findings by rule ----
function groupRules(field, filter) {
  const rules = new Map();
  for (const { project, slug, data } of axe) {
    for (const v of data[field].filter(filter)) {
      if (!rules.has(v.id)) rules.set(v.id, { ...v, pages: new Set(), elements: new Map() });
      const rule = rules.get(v.id);
      rule.pages.add(slug);
      for (const n of v.nodes) {
        const key = `${slug} ${n.target}`;
        if (!rule.elements.has(key)) rule.elements.set(key, { slug, project, ...n });
      }
    }
  }
  const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  return [...rules.values()].sort((a, b) => (order[a.impact] ?? 9) - (order[b.impact] ?? 9) || b.elements.size - a.elements.size);
}

const wcag = groupRules('violations', (v) => !v.bestPractice);
const best = groupRules('violations', (v) => v.bestPractice);
const review = groupRules('needsReview', () => true);
const pagesScanned = new Set(axe.map((a) => a.slug)).size;

const lines = [];
const out = (s = '') => lines.push(s);

out(`# Accessibility audit: ${site}`);
out();
out(`Run ${new Date().toISOString().slice(0, 10)} against ${baseURL}. ${pagesScanned} pages, at ${projects.join(' and ')} sizes.`);
out();
out('This report is produced by automated checks. They find a share of real problems, not all of them: a screen reader pass and a human review of alt text, link wording and motion are still needed.');
out();
out('## Summary');
out();
const count = (list) => list.reduce((n, r) => n + r.elements.size, 0);
out(`- **WCAG 2.2 A/AA failures:** ${wcag.length} rules, ${count(wcag)} elements.`);
const byImpact = {};
wcag.forEach((r) => { byImpact[r.impact] = (byImpact[r.impact] || 0) + r.elements.size; });
out(`- **By severity:** ${['critical', 'serious', 'moderate', 'minor'].filter((i) => byImpact[i]).map((i) => `${byImpact[i]} ${i}`).join(', ') || 'none'}.`);
out(`- **Best-practice findings:** ${best.length} rules, ${count(best)} elements.`);
out(`- **Needs a human decision:** ${review.length} rules, ${count(review)} elements.`);
out();

function ruleTable(rules) {
  out('| Rule | Severity | WCAG | Pages | Elements |');
  out('|---|---|---|---|---|');
  for (const r of rules) {
    out(`| [${esc(r.help)}](${r.helpUrl}) | ${r.impact || ''} | ${r.wcag.join(', ')} | ${r.pages.size} | ${r.elements.size} |`);
  }
  out();
}

function ruleDetails(rules, max) {
  for (const r of rules) {
    out(`### ${esc(r.help)}`);
    out();
    out(`Rule ${code(r.id)}. Pages: ${[...r.pages].sort().join(', ')}.`);
    out();
    const examples = [...r.elements.values()].slice(0, max);
    for (const e of examples) {
      out(`- **${e.slug}** ${code(e.target)}`);
      out(`  - ${code(e.html)}`);
      if (e.summary) out(`  - ${esc(e.summary)}`);
    }
    if (r.elements.size > max) out(`- ...and ${r.elements.size - max} more.`);
    out();
  }
}

out('## WCAG failures');
out();
if (wcag.length) { ruleTable(wcag); ruleDetails(wcag, 6); } else { out('None found by the automated scan.'); out(); }

out('## Best-practice findings');
out();
out('Not WCAG failures on their own, but they usually make a page harder to use with assistive technology.');
out();
if (best.length) { ruleTable(best); ruleDetails(best, 3); } else { out('None.'); out(); }

out('## Needs a human decision');
out();
out('The scanner could not tell whether these pass, most often colour contrast over an image, video or gradient.');
out();
if (review.length) ruleTable(review); else { out('None.'); out(); }

// ---- Keyboard ----
out('## Keyboard walk');
out();
out('Pressing Tab from the top of each page to the end.');
out();
for (const project of projects) {
  out(`### ${project}`);
  out();
  out('| Page | Tab stops | Reached the end | Skip link | No visible focus | Focus on hidden element | Focus covered | Mouse-only controls | Video frames in tab order |');
  out('|---|---|---|---|---|---|---|---|---|');
  for (const { slug, data: k } of keyboard.filter((r) => r.project === project)) {
    out(`| ${slug} | ${k.tabStops} | ${k.completed ? 'yes' : k.stuckAt ? `stuck at ${esc(k.stuckAt)}` : 'no (limit reached)'} | ${k.skipLink ? 'yes' : 'no'} | ${k.noFocusIndicator.length} | ${k.focusNotVisible.length} | ${k.focusCovered.length} | ${k.mouseOnly.length} | ${k.videoFrames} |`);
  }
  out();
}

// Lists findings per page. Anything found on most pages (navigation and
// footer items) is listed once under "Every page" instead of being repeated.
const listSection = (title, intro, field, format = (x) => code(x)) => {
  const rows = [];
  for (const { project, slug, data } of keyboard) {
    const items = (data[field] || []).map(format);
    if (items.length) rows.push({ project, slug, items });
  }
  if (!rows.length) return;
  out(`### ${title}`);
  out();
  out(intro);
  out();
  const pagesPerProject = {};
  keyboard.forEach((k) => { pagesPerProject[k.project] = (pagesPerProject[k.project] || 0) + 1; });
  const seenOn = new Map();
  rows.forEach((r) => new Set(r.items).forEach((item) => {
    const key = `${r.project}\n${item}`;
    seenOn.set(key, (seenOn.get(key) || 0) + 1);
  }));
  const isSiteWide = (project, item) => (seenOn.get(`${project}\n${item}`) || 0) >= Math.max(3, Math.ceil(pagesPerProject[project] * 0.7));
  const siteWide = new Set();
  rows.forEach((r) => r.items.forEach((item) => { if (isSiteWide(r.project, item)) siteWide.add(item); }));
  if (siteWide.size) out(`- **Every page** (navigation and footer): ${[...siteWide].slice(0, 30).join(', ')}${siteWide.size > 30 ? `, and ${siteWide.size - 30} more` : ''}`);
  const byPage = new Map();
  rows.forEach((r) => {
    const own = r.items.filter((item) => !siteWide.has(item));
    if (!own.length) return;
    if (!byPage.has(r.slug)) byPage.set(r.slug, new Map());
    own.forEach((item) => {
      const sizes = byPage.get(r.slug);
      if (!sizes.has(item)) sizes.set(item, new Set());
      sizes.get(item).add(r.project);
    });
  });
  for (const [slug, items] of byPage) {
    const list = [...items.entries()].map(([item, sizes]) => (sizes.size === projects.length ? item : `${item} (${[...sizes].join(', ')} only)`));
    out(`- **${slug}**: ${list.slice(0, 10).join(', ')}${list.length > 10 ? `, and ${list.length - 10} more` : ''}`);
  }
  out();
};
listSection('No visible focus indicator', 'These elements looked the same focused and unfocused. This is a heuristic, so confirm by eye.', 'noFocusIndicator');
listSection('Focus lands on a hidden element', 'Tab stops that cannot be seen, so a keyboard user loses their place.', 'focusNotVisible');
listSection('Focus covered by another element', 'The focused element sits underneath something else, such as a fixed navigation bar.', 'focusCovered');
listSection('Controls that only work with a mouse', 'Styled as clickable but not reachable with Tab. This is a heuristic, so confirm by eye.', 'mouseOnly', (m) => code(`${m.element}${m.text ? ` "${m.text}"` : ''}`));
listSection('Tab stops with no name', 'Focusable elements with no text or label.', 'unnamed');
listSection('Small targets', 'Focusable elements smaller than 24 by 24 CSS pixels (WCAG 2.5.8).', 'smallTargets');

const pageFacts = keyboard.filter((r) => r.project === projects[0]);
const noLang = pageFacts.filter((r) => !r.data.lang).map((r) => r.slug);
const noMain = pageFacts.filter((r) => !r.data.hasMain).map((r) => r.slug);
out('### Page structure');
out();
out(`- **Language set on the page:** ${noLang.length ? `missing on ${noLang.join(', ')}` : 'yes, on every page'}.`);
out(`- **Main landmark:** ${noMain.length ? `missing on ${noMain.join(', ')}` : 'present on every page'}.`);
out(`- **Skip link:** ${pageFacts.some((r) => r.data.skipLink) ? 'present on some pages' : 'none found on any page'}.`);
out();

// ---- Widgets ----
out('## Keyboard operation of widgets');
out();
out('| Check | Page | Size | Result | Detail |');
out('|---|---|---|---|---|');
for (const { project, data } of widgets) {
  for (const c of data.checks) out(`| ${esc(c.name)} | ${c.where} | ${project} | ${c.result} | ${esc(c.detail)} |`);
}
out();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `${site}.md`), lines.join('\n'));
console.log(`Wrote reports/accessibility/${site}.md (${wcag.length} WCAG rules, ${count(wcag)} elements)`);
