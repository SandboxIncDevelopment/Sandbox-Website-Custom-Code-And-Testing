# Sandbox Website: Custom Code and Testing

Custom code and regression tests for the Sandbox Inc. Webflow site
(sandboxinc.co / sandboxinc.ca).

## Custom code

`src/` holds the site's custom CSS and JavaScript, moved out of Webflow so it
has version history and can be reviewed.

| Path | Used by |
|---|---|
| `src/global.css`, `src/global.js` | Every page: scroll animations, portfolio display-size logic |
| `src/shared/accordion.css` | Careers (and the Labs and Accelerator drafts later) |
| `src/pages/about.*` | About: history timeline drag-scroll, physics bubbles |
| `src/pages/contact.*` | Contact: message box auto-grow, Agency/Labs toggle |
| `src/pages/portfolio.*` | Portfolio: filter styles, tabs, `?tab=` links |
| `src/pages/portfolio-piece.*` | Portfolio Pieces template: all Vimeo players |
| `src/pages/job-posting.css`, `src/pages/not-found.css` | Job Postings template, 404 |

**The site does not use these files yet.** The steps to switch Webflow over,
and the list of what differs from the inline code, are in
[`docs/webflow-setup.md`](docs/webflow-setup.md).

Blocks marked `/* @block name */` are exact copies of the inline code. Keep
them unchanged until the switch has been verified.

## Regression tests

### What the tests do

The suite opens the site in a real browser (desktop and mobile sizes) and checks
three things.

| Test file | What it checks |
|---|---|
| `tests/behaviour.spec.js` | For each page, records what the custom code produced and compares it with the stored baseline |
| `tests/interactions.spec.js` | Clicks, types and drags the features the custom code powers |
| `tests/visual.spec.js` | Full-page screenshots compared with the stored baseline |

The behaviour test writes three small, readable files per page into `baseline/`:

- `<page>-behaviour.json`: scroll animations revealed, Vimeo players and how they
  are sized, portfolio display-size sections, Labs colours, counters, and so on.
- `<page>-errors.json`: JavaScript errors raised by the page's own scripts.
- `<page>-scripts.json`: external scripts the page loads.

Pages covered: Home, About, Careers, Contact, Clients, Portfolio, Privacy Policy,
Terms of Use, the 404 page and four portfolio pieces. Draft pages are left out.
The list is in `tests/pages.js`.

### Running the tests

The tests run in GitHub Actions, so nothing needs installing.

1. Open the **Actions** tab and choose **Regression tests**.
2. Click **Run workflow**.
3. Set the site to test. The default is the staging site,
   `https://sb-website-2024-test.webflow.io`.
4. Choose a mode:
   - **record-baseline** saves how the site behaves now and commits it to
     `baseline/`.
   - **check** compares the site with the saved baseline and fails on any
     difference.

Each run uploads a `playwright-report` file. Download it from the run page and
open `index.html` to see every difference side by side.

### Using the suite for the migration

1. **Record the baseline** against staging before changing anything.
2. **Run a check straight away**, without changing anything. It should pass. If a
   test fails here, it is unstable and needs fixing before it can be trusted.
3. **Swap the custom code** in Webflow for the GitHub-hosted files and publish to
   staging.
4. **Run a check.** Expected results:
   - `behaviour.json` files are unchanged.
   - `scripts.json` files change, because the new GitHub-hosted files appear.
     Review the difference, then record a new baseline.
   - `errors.json` files stay the same or get shorter. The About page currently
     raises errors from duplicated code, so its list should shrink once that is
     fixed.
   - Interaction tests pass.
5. **Repeat against production** after publishing there, with the site set to
   `https://www.sandboxinc.ca`. Production needs its own baseline first if its
   content differs from staging.

### Things to know

- **Content changes show up as differences.** Adding a portfolio piece or a job
  posting changes the baseline files. Record a new baseline after content edits.
- **Screenshots are the least stable check.** Videos, the physics canvas and the
  animated counters are masked out, and a 1% pixel difference is allowed. If
  screenshots prove noisy, untick "Include full-page screenshot comparisons" and
  rely on the behaviour and interaction tests.
- **Tests skip features that are missing.** If a feature is not on the site being
  tested, its interaction test is skipped rather than failed. Check the skipped
  list in the report after the first run to confirm nothing important is skipped.

### Running on your own computer

Requires Node.js 20 or later.

```
npm install
npx playwright install chromium
npm run test:behaviour                              # everything except screenshots
BASE_URL=https://www.sandboxinc.ca npm test          # a different site
npm run baseline                                    # record a new baseline
```

Record screenshot baselines in GitHub Actions rather than locally, because
screenshots only compare reliably on the same type of machine that made them.
