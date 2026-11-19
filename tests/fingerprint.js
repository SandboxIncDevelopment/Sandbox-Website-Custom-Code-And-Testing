// Runs INSIDE the page (via page.evaluate) and returns a plain-data summary of
// everything the site's custom code is responsible for. The summary is compared
// with the stored baseline, so any change in behaviour shows up as a diff.
//
// Keep this function self-contained: it is serialised and sent to the browser.
module.exports = function fingerprint() {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const css = (el) => getComputedStyle(el);
  const shown = (el) => {
    const s = css(el);
    return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.99;
  };
  const firstClass = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (n.classList && n.classList.length && n.tagName !== 'IFRAME') return n.classList[0];
    }
    return '(none)';
  };
  const tally = (list) => {
    const m = {};
    list.forEach((k) => { m[k] = (m[k] || 0) + 1; });
    return Object.keys(m).sort().map((k) => (m[k] > 1 ? `${k}  x${m[k]}` : k));
  };
  const revealed = (sel) => {
    const els = q(sel);
    return { total: els.length, revealed: els.filter(shown).length };
  };

  // --- Third-party and custom scripts on the page (reported separately) ---
  const scripts = tally(
    q('script[src]')
      .map((s) => s.src)
      .filter((u) => !/website-files\.com|cloudfront\.net|googleapis\.com|gstatic\.com|googletagmanager\.com|google-analytics\.com/.test(u))
      .filter((u) => new URL(u).origin !== location.origin)
  );

  const behaviour = {
    title: document.title,
    h1: q('h1').map((e) => e.textContent.replace(/\s+/g, ' ').trim()),

    // Libraries the custom code depends on.
    globals: ['jQuery', 'Webflow', 'gsap', 'ScrollTrigger', 'CustomEase', 'SplitType', 'Matter', 'Swiper', 'Vimeo']
      .filter((g) => typeof window[g] !== 'undefined'),

    // Site-wide scroll animations: everything should be revealed once the
    // page has been scrolled through.
    scrollAnimations: {
      fade: revealed('[data-animate="fade"]'),
      animatedText: revealed('[data-animate="animated-text"]'),
      steps: revealed('[data-animate-step]'),
    },

    // Portfolio piece template: sections hidden by the "Project Content Size" logic.
    displaySize: q('[displaysize]').map((e) => e.getAttribute('displaysize'))[0] || null,
    sizeSections: q('[hideonsize]').map(
      (e) => `${e.getAttribute('hideonsize')} | ${e.classList[0]} | ${css(e).display === 'none' ? 'hidden' : 'shown'}`
    ),

    // Portfolio piece template: Labs colour override.
    labsProject: q('[regularorlabsproject]').map((e) => e.getAttribute('regularorlabsproject'))[0] || null,
    labsTextColours: tally(q('[labstext]').map((e) => css(e).color)),

    // Every Vimeo player on the page: where it sits, its URL and how it is sized.
    videos: q('iframe[src*="player.vimeo.com"]')
      .map((f) => ({
        container: firstClass(f.parentElement),
        src: f.getAttribute('src').replace(/&amp;/g, '&'),
        wrapperStyle: (f.parentElement.getAttribute('style') || '').replace(/\s+/g, ' ').trim(),
        iframeStyle: (f.getAttribute('style') || '').replace(/\s+/g, ' ').trim(),
      }))
      .sort((a, b) => (a.container + a.src).localeCompare(b.container + b.src)),

    // Home: rotating-word carousel.
    wordCarousels: q('.text-rotation-wrapper').map((r) => {
      const track = r.querySelector('.track-vertical');
      const swap = r.querySelector('.vertical-scroll-wrapper');
      return {
        words: r.querySelectorAll('.rotate-text').length,
        cloned: track ? track.dataset.cloned || null : null,
        heightSet: !!(swap && swap.style.height),
      };
    }),

    // About: physics bubbles.
    physicsCanvas: q('.matter-content canvas').map((c) => (c.width > 0 && c.height > 0 ? 'drawn' : 'empty')),

    // Careers: empty-state logic for job postings.
    careers: q('.current-openings-section').length
      ? {
          jobPostings: q('.current-openings-section .job-posting-item').length,
          listDisplay: q('.current-openings-bottom-section').map((e) => css(e).display),
          arrowDisplay: q('.current-openings-top-arrow').map((e) => css(e).display),
          emptyMessageHidden: q('.current-opening-top-right-section').map((e) =>
            e.classList.contains('current-opening-top-right-section----hide')
          ),
        }
      : null,

    // Accordions (Careers).
    accordion: {
      triggers: q('[fs-accordion-element="trigger"]').length,
      open: q('.is-active-accordion').length,
    },

    // Clients: animated counters. Portfolio: item counters and visible items.
    numberCounters: q('[fs-numbercount-element]').map((e) => e.textContent.trim()),
    itemCounters: q('[fs-countitems-element="value"]').map((e) => e.textContent.trim()),
    portfolioItemsVisible: q('.portfolio-item---link-block').filter((e) => e.offsetParent !== null).length,
    portfolioTabSelected: q('.portfolio-tab--selected').map((e) => e.textContent.trim()),

    // Contact: Agency / Labs toggle state.
    contactLabsMode: q('.info-content-container').map((e) => e.classList.contains('info-content-container--labs')),
  };

  return { behaviour, scripts };
};
