// Saves a copy of the site's published page source, so the inline custom code
// can be recovered exactly as it was.
//
//   BASE_URL=https://sb-website-2024-test.webflow.io node scripts/snapshot-source.js
//
// For each page this writes, under original/<site>/:
//   <page>.html              the full page source as served
//   <page>.custom-code.txt   every inline <script> and <style>, external
//                            script and stylesheet tag, and <iframe>, in page order
//
// CMS values appear filled in (for example a Vimeo ID), not as Webflow
// bindings. To restore whole elements, use a Webflow site backup.
const fs = require('fs');
const path = require('path');
const { PAGES } = require('../tests/pages');

const baseURL = (process.env.BASE_URL || 'https://sb-website-2024-test.webflow.io').replace(/\/$/, '');
const site = new URL(baseURL).hostname;
const outDir = path.join(__dirname, '..', 'original', site);

// Extra pages that are worth keeping a copy of but are not part of the tests.
const EXTRA = [{ slug: 'job-posting', path: '/job-postings/digital-learning-product-lead' }];

function extract(html) {
  const parts = [];
  const pattern = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<link\b[^>]*rel=["']stylesheet["'][^>]*>|<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi;
  const bodyStart = html.search(/<body\b/i);
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const where = bodyStart !== -1 && match.index > bodyStart ? 'body' : 'head';
    parts.push(`<!-- ===== in ${where}, at character ${match.index} ===== -->\n${match[0]}\n`);
  }
  return parts.join('\n');
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const summary = [];
  for (const page of [...PAGES, ...EXTRA]) {
    const response = await fetch(baseURL + page.path, { redirect: 'follow' });
    const html = await response.text();
    fs.writeFileSync(path.join(outDir, `${page.slug}.html`), html);
    fs.writeFileSync(path.join(outDir, `${page.slug}.custom-code.txt`), extract(html));
    summary.push(`| ${page.slug} | ${page.path} | ${response.status} | ${html.length} |`);
    console.log(`${response.status}  ${page.path}  (${html.length} characters)`);
  }
  const readme = [
    `# Page source snapshot: ${site}`,
    '',
    `Taken ${new Date().toISOString()} from ${baseURL}.`,
    '',
    'Each page has the full source (`.html`) and its scripts, styles and iframes (`.custom-code.txt`).',
    '',
    '| Page | Path | HTTP status | Size |',
    '|---|---|---|---|',
    ...summary,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'README.md'), readme);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
