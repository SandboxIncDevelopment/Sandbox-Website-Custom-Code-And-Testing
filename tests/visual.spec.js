// Visual baseline: a full-page screenshot of every page once it has settled.
// Videos, the physics canvas and the word carousel never look the same twice,
// so they are masked out. Run these with `npm run test:visual`.
//
// Screenshots only compare reliably on the machine type that made them, so
// create and check the baseline in GitHub Actions rather than on a laptop.
const { test, expect } = require('@playwright/test');
const { PAGES } = require('./pages');
const { settle } = require('./helpers');

for (const p of PAGES) {
  test(`${p.slug}: looks the same @visual`, async ({ page }) => {
    await page.goto(p.path, { waitUntil: 'load' });
    await settle(page, { minPause: 5000 });
    await expect(page).toHaveScreenshot(`${p.slug}.png`, {
      fullPage: true,
      animations: 'disabled',
      mask: [page.locator('iframe, canvas, video, .text-rotation-wrapper, [fs-numbercount-element]')],
      maxDiffPixelRatio: 0.01,
      timeout: 45_000,
    });
  });
}
