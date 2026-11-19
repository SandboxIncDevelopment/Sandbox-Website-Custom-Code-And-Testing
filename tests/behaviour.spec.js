// Behaviour baseline: for every page, record what the custom code produced and
// compare it with the stored baseline. Three files per page:
//
//   <page>-behaviour.json  what the visitor gets (animations, videos, logic)
//   <page>-errors.json     JavaScript errors raised by the page's own scripts
//   <page>-scripts.json    external scripts the page loads
//
// After the migration, behaviour.json should be identical. scripts.json is
// EXPECTED to change (the new GitHub-hosted files appear), and errors.json
// should only ever get shorter.
const { test, expect } = require('@playwright/test');
const { PAGES } = require('./pages');
const fingerprint = require('./fingerprint');
const { watchErrors, settle, pretty } = require('./helpers');

for (const p of PAGES) {
  test(`${p.slug}: behaviour matches baseline`, async ({ page }) => {
    const errors = watchErrors(page);
    const response = await page.goto(p.path, { waitUntil: 'load' });
    expect(response.status(), `HTTP status of ${p.path}`).toBe(p.status || 200);

    await settle(page);
    const { behaviour, scripts } = await page.evaluate(fingerprint);

    expect.soft(pretty(behaviour)).toMatchSnapshot(`${p.slug}-behaviour.json`);
    expect.soft(pretty(errors())).toMatchSnapshot(`${p.slug}-errors.json`);
    expect.soft(pretty(scripts)).toMatchSnapshot(`${p.slug}-scripts.json`);
  });
}
