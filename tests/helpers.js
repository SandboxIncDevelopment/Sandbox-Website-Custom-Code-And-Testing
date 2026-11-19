const IGNORED_ERROR_SOURCES = /player\.vimeo\.com|vimeocdn\.com|google|doubleclick|facebook|linkedin/i;

// Records uncaught exceptions and console errors raised by the page's own
// scripts. Third-party player noise and network hiccups are left out so the
// list stays stable between runs.
function watchErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(`uncaught: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const url = (msg.location() && msg.location().url) || '';
    const text = msg.text();
    if (IGNORED_ERROR_SOURCES.test(url) || IGNORED_ERROR_SOURCES.test(text)) return;
    if (/Failed to load resource|net::ERR_|Permissions policy|third-party cookie/i.test(text)) return;
    errors.push(`console: ${text}`);
  });
  return () => {
    const counts = {};
    errors
      .map((e) => e.replace(/https?:\/\/\S+/g, '<url>').replace(/\s+/g, ' ').trim())
      .forEach((e) => { counts[e] = (counts[e] || 0) + 1; });
    return Object.keys(counts).sort().map((k) => (counts[k] > 1 ? `${k}  x${counts[k]}` : k));
  };
}

// Loads a page the way a visitor would experience it: wait for load, scroll
// all the way down so every scroll-triggered animation fires and lazy images
// load, return to the top, then wait until the animations have finished
// (the number of revealed elements stops changing).
async function settle(page, { minPause = 4000, maxPause = 20000 } = {}) {
  await page.waitForLoadState('load');
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(200, Math.round(window.innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await wait(100);
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
    await wait(300);
    window.scrollTo({ top: 0, behavior: 'instant' });
  });

  const revealedCount = () =>
    page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-animate], [data-animate-step]')).filter((el) => {
        const s = getComputedStyle(el);
        return s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.99;
      }).length
    );
  const started = Date.now();
  let last = -1;
  let stableFor = 0;
  while (Date.now() - started < maxPause) {
    await page.waitForTimeout(1000);
    const now = await revealedCount();
    stableFor = now === last ? stableFor + 1 : 0;
    last = now;
    if (Date.now() - started >= minPause && stableFor >= 2) break;
  }
}

const pretty = (value) => JSON.stringify(value, null, 2) + '\n';

module.exports = { watchErrors, settle, pretty };
