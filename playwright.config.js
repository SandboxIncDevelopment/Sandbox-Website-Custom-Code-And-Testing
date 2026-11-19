// Regression tests for the Sandbox Inc. Webflow site.
// Point the suite at a site with BASE_URL, e.g.
//   BASE_URL=https://www.sandboxinc.ca npx playwright test
const { defineConfig, devices } = require('@playwright/test');

const baseURL = (process.env.BASE_URL || 'https://sb-website-2024-test.webflow.io').replace(/\/$/, '');

module.exports = defineConfig({
  testDir: './tests',
  // Baselines live in one readable folder: baseline/<desktop|mobile>/<page>-<what>.<ext>
  snapshotPathTemplate: 'baseline/{projectName}/{arg}{ext}',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers: process.env.CI ? 3 : undefined,
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
