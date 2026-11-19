// Keyboard walk: press Tab through a page and describe every stop.
const MAX_PRESSES = 220;

// Runs in the page before the walk: remember what each focusable element
// looks like when it is NOT focused, and list things that look clickable but
// cannot be reached with the keyboard.
function prepare() {
  const FOCUSABLE = 'a[href], button, input, select, textarea, summary, iframe, [tabindex], [contenteditable="true"]';
  const props = ['outlineStyle', 'outlineWidth', 'outlineColor', 'boxShadow', 'borderTopColor', 'borderBottomColor', 'borderBottomWidth', 'backgroundColor', 'color', 'textDecorationLine', 'opacity'];
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  window.__kbRest = new Map();
  document.querySelectorAll(FOCUSABLE).forEach((el) => {
    const s = getComputedStyle(el);
    window.__kbRest.set(el, props.map((p) => s[p]).join('|'));
  });
  window.__kbProps = props;
  window.__kbSeen = new Map();

  const label = (el) =>
    (el.getAttribute('aria-label') || el.textContent || el.getAttribute('alt') || el.getAttribute('title') || '').replace(/\s+/g, ' ').trim().slice(0, 60);

  // Elements styled as clickable that the keyboard cannot reach.
  const mouseOnly = [];
  document.querySelectorAll('body *').forEach((el) => {
    if (mouseOnly.length >= 40) return;
    const s = getComputedStyle(el);
    if (s.cursor !== 'pointer' || !visible(el)) return;
    if (el.closest(FOCUSABLE.replace(', [tabindex]', ', [tabindex]:not([tabindex="-1"])'))) return;
    if (el.querySelector('a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])')) return;
    const parent = el.parentElement;
    if (parent && getComputedStyle(parent).cursor === 'pointer' && !parent.matches('body')) return; // report the outermost only
    mouseOnly.push({ element: `${el.tagName.toLowerCase()}.${(el.classList[0] || '')}`, text: label(el) });
  });

  return {
    focusableCount: window.__kbRest.size,
    positiveTabindex: Array.from(document.querySelectorAll('[tabindex]')).filter((e) => e.tabIndex > 0).map((e) => `${e.tagName.toLowerCase()}.${e.classList[0] || ''}`),
    mouseOnly,
    lang: document.documentElement.getAttribute('lang'),
    hasMain: !!document.querySelector('main, [role="main"]'),
  };
}

// Runs in the page after each Tab press: describe the focused element.
function describeFocus() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  if (!window.__kbSeen.has(el)) window.__kbSeen.set(el, window.__kbSeen.size + 1);
  const r = el.getBoundingClientRect();
  const s = getComputedStyle(el);
  const sized = r.width > 0 && r.height > 0;
  const shown = sized && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05;
  // Is every ancestor visible too?
  let ancestorsShown = true;
  for (let n = el.parentElement; n; n = n.parentElement) {
    const ps = getComputedStyle(n);
    if (ps.display === 'none' || ps.visibility === 'hidden' || parseFloat(ps.opacity) < 0.05) { ancestorsShown = false; break; }
  }
  const inViewport = sized && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  let covered = false;
  if (shown && inViewport) {
    const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 2);
    const y = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 2);
    const top = document.elementFromPoint(x, y);
    covered = !!top && !el.contains(top) && !top.contains(el);
  }
  const now = window.__kbProps.map((p) => s[p]).join('|');
  const rest = window.__kbRest.get(el);
  const hasOutline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
  const changed = rest !== undefined && rest !== now;
  const text = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('alt') || el.getAttribute('title') || el.getAttribute('placeholder') || (/^(submit|button|reset)$/.test(el.type || '') ? el.value : '') || el.getAttribute('name') || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  return {
    key: window.__kbSeen.get(el),
    element: `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${el.classList[0] || ''}`,
    text,
    href: el.getAttribute('href'),
    isFrame: el.tagName === 'IFRAME',
    visible: shown && ancestorsShown,
    onScreen: inViewport,
    covered,
    indicator: hasOutline || changed,
    size: [Math.round(r.width), Math.round(r.height)],
  };
}

async function walk(page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const setup = await page.evaluate(prepare);
  // Start from the top of the document.
  // Do not click anywhere first: a click moves the browser's tab starting
  // point past anything above it, which would hide a skip link from the walk.
  await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); });

  const sequence = [];
  let lastKey = null;
  let repeat = 0;
  let stuckAt = null;
  let completed = false;
  for (let i = 0; i < MAX_PRESSES; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(40);
    const info = await page.evaluate(describeFocus);
    if (!info) {
      if (sequence.length) { completed = true; break; } // focus left the page: end of the tab order
      continue;
    }
    if (sequence.length && info.key === sequence[0].key) { completed = true; break; } // wrapped round
    if (info.key === lastKey) {
      repeat += 1;
      if (repeat >= 12) { stuckAt = info; break; }
      continue;
    }
    lastKey = info.key;
    repeat = 0;
    sequence.push(info);
  }

  // Each element once, in the order first reached.
  const stops = [];
  const seen = new Set();
  for (const s of sequence) {
    if (seen.has(s.key)) continue;
    seen.add(s.key);
    stops.push(s);
  }
  const name = (s) => `${s.element}${s.text ? ` "${s.text}"` : ''}`;
  const first = stops[0];
  return {
    ...setup,
    stops: stops.map(name),
    tabStops: stops.length,
    completed,
    firstStop: first ? name(first) : null,
    skipLink: !!first && /^#/.test(first.href || '') && /skip|main|content/i.test(first.text),
    noFocusIndicator: stops.filter((s) => s.visible && !s.isFrame && !s.indicator).map(name),
    focusNotVisible: stops.filter((s) => !s.visible).map(name),
    focusCovered: stops.filter((s) => s.visible && s.covered && !s.isFrame).map(name),
    unnamed: stops.filter((s) => !s.isFrame && !s.text).map(name),
    videoFrames: stops.filter((s) => s.isFrame).length,
    smallTargets: stops.filter((s) => s.visible && !s.isFrame && (s.size[0] < 24 || s.size[1] < 24)).map((s) => `${name(s)} (${s.size[0]}x${s.size[1]})`),
    stuckAt: stuckAt ? name(stuckAt) : null,
  };
}

module.exports = { walk };
