// Accessibility audit. These tests do not pass or fail on what they find:
// they record findings to a11y-results/, and scripts/a11y-report.js turns
// those into a readable report. Run with `npm run test:a11y`.
//
//   1. Automated scan of every page with axe-core (WCAG 2.2 A and AA rules,
//      plus axe's best-practice rules, reported separately).
//   2. Keyboard walk of every page: press Tab through the whole page and note
//      where focus goes, whether it can be seen, and whether it gets stuck.
//   3. Keyboard operation of the interactive widgets.
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PAGES } = require('./pages');
const { settle } = require('./helpers');
const keyboard = require('./keyboard');

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

function save(testInfo, kind, slug, data) {
  const dir = path.join(__dirname, '..', 'a11y-results', testInfo.project.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${slug}.${kind}.json`), JSON.stringify(data, null, 2));
}

const trimViolation = (v) => ({
  id: v.id,
  impact: v.impact,
  help: v.help,
  helpUrl: v.helpUrl,
  wcag: v.tags.filter((t) => /^wcag\d{3,4}$/.test(t)).map((t) => t.replace('wcag', '').split('').join('.')),
  bestPractice: v.tags.includes('best-practice'),
  nodes: v.nodes.map((n) => ({
    target: n.target.join(' '),
    html: n.html.replace(/\s+/g, ' ').slice(0, 220),
    summary: (n.failureSummary || '').replace(/\s+/g, ' ').slice(0, 300),
  })),
});

for (const p of PAGES) {
  test(`${p.slug}: automated scan @a11y`, async ({ page }, testInfo) => {
    await page.goto(p.path, { waitUntil: 'load' });
    await settle(page);
    // Scan this page only. The contents of third-party video players are
    // their vendor's responsibility, but the <iframe> elements themselves
    // (for example, whether each has a title) are checked.
    const results = await new AxeBuilder({ page })
      .withTags([...WCAG_TAGS, 'best-practice'])
      .options({ iframes: false })
      .setLegacyMode(true)
      .analyze();
    save(testInfo, 'axe', p.slug, {
      page: p.path,
      violations: results.violations.map(trimViolation),
      needsReview: results.incomplete.map(trimViolation),
      passed: results.passes.length,
    });
    expect(results).toBeTruthy();
  });

  test(`${p.slug}: keyboard walk @a11y`, async ({ page }, testInfo) => {
    await page.goto(p.path, { waitUntil: 'load' });
    await settle(page);
    const findings = await keyboard.walk(page);
    save(testInfo, 'keyboard', p.slug, { page: p.path, ...findings });
    expect(findings.stops.length).toBeGreaterThan(0);
  });
}

test('widgets: keyboard operation @a11y', async ({ page, isMobile }, testInfo) => {
  const checks = [];
  const record = (name, where, ok, detail) => checks.push({ name, where, result: ok ? 'works' : 'does not work', detail });
  const skipped = (name, where, why) => checks.push({ name, where, result: 'not checked', detail: why });

  // Skip link: first Tab stop, visible when focused, and it moves to the content.
  await page.goto('/', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
  const skip = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    return { text: el.textContent.trim(), href: el.getAttribute('href'), onScreen: r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight && r.width > 0 };
  });
  const isSkip = !!skip && /skip/i.test(skip.text) && /^#/.test(skip.href || '');
  record('Skip link is the first Tab stop', '/', isSkip, JSON.stringify(skip));
  if (isSkip) {
    record('Skip link is visible when focused', '/', skip.onScreen, 'Press Tab once on a freshly loaded page.');
    await page.keyboard.press('Enter');
    // Webflow scrolls to the target smoothly; give it time to finish.
    await page.waitForTimeout(2500);
    const describe = () =>
      page.evaluate(() => {
        const el = document.activeElement;
        const main = document.querySelector('main');
        return {
          focused: el ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${String(el.className || '').split(' ')[0]}` : null,
          inMain: !!main && !!el && main.contains(el),
          inNav: !!el && !!el.closest('.w-nav'),
        };
      });
    const afterEnter = await describe();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    const afterTab = await describe();
    // Focus should land on the main content, and the next Tab should carry on
    // from there rather than going back into the navigation. (On a page whose
    // content has no links, the next stop is the footer.)
    record('Skip link moves keyboard focus past the navigation', '/', afterEnter.inMain && !afterTab.inNav, JSON.stringify({ afterEnter, afterTab }));
  }

  // Careers accordion: open and close with Enter and Space.
  await page.goto('/careers', { waitUntil: 'load' });
  await settle(page); // hidden until scrolled into view, and hidden elements cannot take focus
  const triggers = page.locator('[fs-accordion-element="trigger"]');
  if ((await triggers.count()) >= 2) {
    const states = await triggers.evaluateAll((els) => els.map((e) => e.classList.contains('is-active-accordion')));
    const index = Math.max(states.indexOf(false), 0);
    const trigger = triggers.nth(index);
    await trigger.scrollIntoViewIfNeeded();
    const isOpen = () => trigger.evaluate((e) => e.classList.contains('is-active-accordion'));
    for (const key of ['Enter', 'Space']) {
      const before = await isOpen();
      await trigger.focus();
      await page.keyboard.press(key);
      await page.waitForTimeout(1200);
      record(`Accordion toggles with ${key}`, '/careers', (await isOpen()) !== before, 'Focus an accordion heading and press the key.');
    }
    const semantics = await trigger.evaluate((e) => ({
      role: e.getAttribute('role'),
      tabindex: e.getAttribute('tabindex'),
      expanded: e.getAttribute('aria-expanded'),
      controls: e.getAttribute('aria-controls'),
    }));
    record('Accordion announces open/closed state (aria-expanded)', '/careers', semantics.expanded !== null, JSON.stringify(semantics));
  } else {
    skipped('Accordion', '/careers', 'No accordion found.');
  }

  // Portfolio tabs: switch with Enter.
  await page.goto('/portfolio', { waitUntil: 'load' });
  await settle(page);
  const tabs = page.locator('.portfolio-tab');
  if ((await tabs.count()) >= 2) {
    await tabs.nth(1).focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);
    record('Portfolio tab switches with Enter', '/portfolio', await tabs.nth(1).evaluate((e) => e.classList.contains('portfolio-tab--selected')), 'Focus the second tab and press Enter.');
    const tabSemantics = await tabs.nth(1).evaluate((e) => ({ tag: e.tagName, role: e.getAttribute('role'), selected: e.getAttribute('aria-selected'), pressed: e.getAttribute('aria-pressed'), current: e.getAttribute('aria-current') }));
    record('Portfolio tabs announce which one is selected', '/portfolio', !!(tabSemantics.selected || tabSemantics.pressed || tabSemantics.current), JSON.stringify(tabSemantics));
  } else {
    skipped('Portfolio tabs', '/portfolio', 'No tabs found.');
  }

  // Portfolio filters: toggle with the keyboard.
  const filter = page.locator('.service-filter-toggle:not([fs-cmsfilter-element^="clear"]) input').first();
  if ((await filter.count()) > 0) {
    await page.goto('/portfolio?tab=service', { waitUntil: 'load' });
    await page.waitForTimeout(2500);
    const reachable = await filter.evaluate((e) => {
      const s = getComputedStyle(e);
      return e.tabIndex >= 0 && s.display !== 'none' && s.visibility !== 'hidden';
    });
    record('Portfolio filter options can receive keyboard focus', '/portfolio?tab=service', reachable, 'Checks the first service filter input.');
  } else {
    skipped('Portfolio filters', '/portfolio', 'No filter inputs found.');
  }

  // About history timeline: can it be scrolled without a mouse?
  await page.goto('/about', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  const timeline = page.locator('.our-history-bottom-content').first();
  if ((await timeline.count()) > 0) {
    const info = await timeline.evaluate((el) => ({
      scrolls: el.scrollWidth > el.clientWidth + 5,
      tabindex: el.getAttribute('tabindex'),
      focusableInside: el.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').length,
    }));
    const ok = !info.scrolls || info.tabindex !== null || info.focusableInside > 0;
    record('History timeline can be scrolled with the keyboard', '/about', ok, JSON.stringify(info));
  } else {
    skipped('History timeline', '/about', 'No timeline found.');
  }

  // Mobile menu: open with Enter, close with Escape.
  if (isMobile) {
    await page.goto('/', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const button = page.locator('.w-nav-button').first();
    if ((await button.count()) > 0 && (await button.isVisible())) {
      const open = () => button.evaluate((e) => e.classList.contains('w--open'));
      await button.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      const opened = await open();
      record('Mobile menu opens with Enter', '/', opened, 'Focus the menu button and press Enter.');
      if (opened) {
        await page.keyboard.press('Tab');
        const focusInMenu = await page.evaluate(() => !!document.activeElement && !!document.activeElement.closest('.w-nav-menu, .w-nav-overlay, .w-nav'));
        record('Focus moves into the open mobile menu', '/', focusInMenu, 'Press Tab once after opening.');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(800);
        record('Mobile menu closes with Escape', '/', !(await open()), 'Press Escape while the menu is open.');
      }
    } else {
      skipped('Mobile menu', '/', 'Menu button not visible.');
    }
  }

  save(testInfo, 'widgets', 'widgets', { checks });
  expect(checks.length).toBeGreaterThan(0);
});
