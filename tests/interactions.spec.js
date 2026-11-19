// Interaction tests: click, type and drag the things the custom code powers.
// Each test skips itself if the feature isn't on the site being tested, so the
// same suite runs against staging and production.
const { test, expect } = require('@playwright/test');

async function open(page, path) {
  await page.goto(path, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
}

async function dragScrolls(page, selector) {
  const box = page.locator(selector).first();
  test.skip((await box.count()) === 0, `${selector} is not on this page`);
  await box.scrollIntoViewIfNeeded();
  const canScroll = await box.evaluate((el) => el.scrollWidth > el.clientWidth + 5);
  test.skip(!canScroll, `${selector} has nothing to scroll at this size`);
  await box.evaluate((el) => { el.scrollLeft = 0; });
  const r = await box.boundingBox();
  const y = r.y + Math.min(r.height / 2, 200);
  await page.mouse.move(r.x + r.width * 0.7, y);
  await page.mouse.down();
  await page.mouse.move(r.x + r.width * 0.3, y, { steps: 8 });
  await page.mouse.up();
  expect(await box.evaluate((el) => el.scrollLeft)).toBeGreaterThan(20);
}

test.describe('home', () => {
  test('rotating-word carousel keeps moving', async ({ page }) => {
    await open(page, '/');
    const track = page.locator('.text-rotation-wrapper .track-vertical').first();
    test.skip((await track.count()) === 0, 'no word carousel on this site');
    const position = () => track.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(2500); // the carousel waits 2s before starting
    const before = await position();
    await expect.poll(position, { timeout: 12_000 }).not.toBe(before);
  });
});

test.describe('about', () => {
  test('history timeline scrolls when dragged', async ({ page, isMobile }) => {
    test.skip(isMobile, 'drag-to-scroll is a mouse feature');
    await open(page, '/about');
    await dragScrolls(page, '.our-history-bottom-content');
  });

  test('physics bubbles are drawn', async ({ page, isMobile }) => {
    // On mobile the canvas has no size; the behaviour baseline records that instead.
    test.skip(isMobile, 'checked on desktop only');
    await open(page, '/about');
    const canvas = page.locator('.matter-content canvas').first();
    test.skip((await page.locator('.matter-content').count()) === 0, 'no physics section on this site');
    await expect(canvas).toBeAttached();
    expect(await canvas.evaluate((c) => c.width > 0 && c.height > 0)).toBe(true);
  });
});

test.describe('careers', () => {
  test('job postings list scrolls when dragged', async ({ page, isMobile }) => {
    test.skip(isMobile, 'drag-to-scroll is a mouse feature');
    await open(page, '/careers');
    await dragScrolls(page, '.current-openings-bottom-section');
  });

  test('accordion opens and closes', async ({ page }) => {
    await open(page, '/careers');
    const triggers = page.locator('[fs-accordion-element="trigger"]');
    test.skip((await triggers.count()) < 2, 'no accordion on this site');
    await triggers.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    // Pick an item that is currently closed, open it, then close it again.
    const states = await triggers.evaluateAll((els) => els.map((e) => e.classList.contains('is-active-accordion')));
    const index = states.indexOf(false);
    test.skip(index === -1, 'every accordion item is already open');
    const trigger = triggers.nth(index);
    await trigger.click();
    await expect(trigger).toHaveClass(/is-active-accordion/);
    await page.waitForTimeout(800);
    await trigger.click();
    await expect(trigger).not.toHaveClass(/is-active-accordion/);
  });
});

test.describe('contact', () => {
  test('Agency / Labs toggle recolours the info panel', async ({ page }) => {
    await open(page, '/contact');
    const labs = page.locator('#lab-toggle-button');
    test.skip((await labs.count()) === 0, 'no Agency / Labs toggle on this site');
    const panel = page.locator('.info-content-container').first();
    // The toggle buttons can be hidden by the page design, so trigger them
    // directly rather than with a mouse click.
    await labs.evaluate((el) => el.click());
    await expect(panel).toHaveClass(/info-content-container--labs/);
    await expect(labs).toHaveClass(/contact-toggle-button-default--labs-selected/);
    await page.locator('#agency-toggle-button').evaluate((el) => el.click());
    await expect(panel).not.toHaveClass(/info-content-container--labs/);
    await expect(labs).not.toHaveClass(/contact-toggle-button-default--labs-selected/);
  });

  test('message box grows as you type', async ({ page }) => {
    await open(page, '/contact');
    const box = page.locator('.contact-text-area-field:visible').first();
    test.skip((await box.count()) === 0, 'no message box on this site');
    const height = () => box.evaluate((el) => el.getBoundingClientRect().height);
    const before = await height();
    await box.click();
    await box.pressSequentially('one\ntwo\nthree\nfour\nfive\nsix\nseven\neight', { delay: 10 });
    expect(await height()).toBeGreaterThan(before);
  });
});

test.describe('portfolio', () => {
  test('clicking a tab marks it as selected', async ({ page }) => {
    await open(page, '/portfolio');
    const tabs = page.locator('.portfolio-tab');
    test.skip((await tabs.count()) < 2, 'no portfolio tabs on this site');
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveClass(/portfolio-tab--selected/);
    await expect(tabs.nth(0)).not.toHaveClass(/portfolio-tab--selected/);
    await expect(page.locator('.portfolio-tab--selected')).toHaveCount(1);
  });

  test('?tab=service opens the Service tab', async ({ page }) => {
    await open(page, '/portfolio?tab=service');
    const tab = page.locator('#service');
    test.skip((await tab.count()) === 0, 'no #service tab on this site');
    await expect(tab).toHaveClass(/w--current/);
    await expect(page.locator('#service-button')).toHaveClass(/portfolio-tab--selected/);
  });

  test('a service filter narrows the list', async ({ page }) => {
    await open(page, '/portfolio?tab=service');
    const toggle = page.locator('.service-filter-toggle:not([fs-cmsfilter-element^="clear"]):visible').first();
    await toggle.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    test.skip((await toggle.count()) === 0, 'no service filters visible on this site');
    const visibleItems = () =>
      page.locator('.portfolio-item---link-block').evaluateAll((els) => els.filter((e) => e.offsetParent !== null).length);
    await page.waitForTimeout(1000);
    const before = await visibleItems();
    await toggle.click();
    await expect.poll(visibleItems, { timeout: 10_000 }).toBeLessThan(before);
    expect(await visibleItems()).toBeGreaterThan(0);
  });
});

test.describe('portfolio piece', () => {
  test('hero video is muted and playing', async ({ page }) => {
    await open(page, '/portfolio/undp-hello-future-season-2');
    const frame = page.locator('.portfolio-hero-image-container iframe').first();
    test.skip((await frame.count()) === 0, 'this piece has no hero video');
    await expect(frame).toHaveAttribute('src', /player\.vimeo\.com\/video\/\d+/);
    // Ask the Vimeo player for its state. Vimeo sometimes refuses automated
    // browsers ("temporarily unavailable"); that is Vimeo's side, not the
    // site's code, so in that case the playback check is skipped.
    const state = await page.evaluate(async () => {
      try {
        const iframe = document.querySelector('.portfolio-hero-image-container iframe');
        const player = new window.Vimeo.Player(iframe);
        await player.ready();
        await new Promise((r) => setTimeout(r, 3000));
        return { volume: await player.getVolume(), paused: await player.getPaused() };
      } catch (err) {
        return { vimeoError: String((err && err.message) || err) };
      }
    });
    test.skip(!!state.vimeoError, `Vimeo did not respond: ${state.vimeoError}`);
    expect(state.volume).toBe(0);
    expect(state.paused).toBe(false);
  });
});
