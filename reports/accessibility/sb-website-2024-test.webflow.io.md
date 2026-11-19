# Accessibility audit: sb-website-2024-test.webflow.io

Run 2026-11-19 against https://sb-website-2024-test.webflow.io. 13 pages, at desktop and mobile sizes.

This report is produced by automated checks. They find a share of real problems, not all of them: a screen reader pass and a human review of alt text, link wording and motion are still needed.

## Summary

- **WCAG 2.2 A/AA failures:** 2 rules, 26 elements.
- **By severity:** 26 serious.
- **Best-practice findings:** 0 rules, 0 elements.
- **Needs a human decision:** 3 rules, 64 elements.

## WCAG failures

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [Frames must have an accessible name](https://dequeuniversity.com/rules/axe/4.14/frame-title?application=playwright) | serious | 4.1.2 | 4 | 25 |
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 1 | 1 |

### Frames must have an accessible name

Rule `frame-title`. Pages: piece-college-toolkit, piece-cra-recruitment, piece-holodomor-mooc, piece-undp-hello-future.

- **piece-college-toolkit** `.portfolio-hero-image-container > div:nth-child(2) > iframe`
  - `<iframe src="https://player.vimeo..." frameborder="0" allow="autoplay; fullscreen..." style="position: absolute; ..." data-ready="true">`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **piece-college-toolkit** `#w-node-_1c72132b-9513-ebeb-134f-9d85946bf401-b6859bc6 > div:nth-child(2) > iframe`
  - `<iframe src="https://player.vimeo.com/video/1129291612?background=1&amp;muted=1&amp;loop=1&amp;autopause=false" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position: absolute;`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **piece-college-toolkit** `.image-block-5-video-container-background > div:nth-child(2) > iframe`
  - `<iframe src="https://player.vimeo..." frameborder="0" allow="autoplay; fullscreen..." style="position: absolute; ..." data-ready="true">`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **piece-college-toolkit** `.image-block-7-video-container-background > div:nth-child(2) > iframe`
  - `<iframe src="https://player.vimeo..." frameborder="0" allow="autoplay; fullscreen..." style="position: absolute; ..." data-ready="true">`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **piece-college-toolkit** `.image-block-8-video-container > div:nth-child(2) > iframe`
  - `<iframe src="https://player.vimeo.com/video/1131418515?autoplay=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position: a`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **piece-cra-recruitment** `.portfolio-hero-image-container > div:nth-child(2) > iframe`
  - `<iframe src="https://player.vimeo..." frameborder="0" allow="autoplay; fullscreen..." style="position: absolute; ..." data-ready="true">`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- ...and 19 more.

### Elements must only use permitted ARIA attributes

Rule `aria-prohibited-attr`. Pages: about.

- **about** `.centre-align`
  - `<p class="paragraph---l centre-align" aria-label="We are creatives – designers, strategists, researchers, educators, developers, filmmakers, and more - dedicated to connecting users worldwide with products and each other`
  - Fix all of the following: aria-label attribute cannot be used on "p" elements with no valid role attribute.

## Best-practice findings

Not WCAG failures on their own, but they usually make a page harder to use with assistive technology.

None.

## Needs a human decision

The scanner could not tell whether these pass, most often colour contrast over an image, video or gradient.

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [Frames should be tested with axe-core](https://dequeuniversity.com/rules/axe/4.14/frame-tested?application=playwright) | critical |  | 4 | 25 |
| [Elements must meet minimum color contrast ratio thresholds](https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright) | serious | 1.4.3 | 5 | 37 |
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 1 | 2 |

## Keyboard walk

Pressing Tab from the top of each page to the end.

### desktop

| Page | Tab stops | Reached the end | Skip link | No visible focus | Focus on hidden element | Focus covered | Mouse-only controls | Video frames in tab order |
|---|---|---|---|---|---|---|---|---|
| about | 20 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| careers | 25 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| clients | 19 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| contact | 28 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| home | 23 | yes | yes | 0 | 0 | 0 | 1 | 0 |
| not-found | 22 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| piece-college-toolkit | 25 | yes | yes | 0 | 0 | 0 | 0 | 5 |
| piece-cra-recruitment | 26 | yes | yes | 0 | 0 | 0 | 0 | 6 |
| piece-holodomor-mooc | 26 | yes | yes | 0 | 0 | 0 | 0 | 6 |
| piece-undp-hello-future | 29 | yes | yes | 0 | 0 | 0 | 0 | 8 |
| portfolio | 84 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| privacy-policy | 20 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| terms-of-use | 20 | yes | yes | 0 | 0 | 0 | 0 | 0 |

### mobile

| Page | Tab stops | Reached the end | Skip link | No visible focus | Focus on hidden element | Focus covered | Mouse-only controls | Video frames in tab order |
|---|---|---|---|---|---|---|---|---|
| about | 17 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| careers | 22 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| clients | 16 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| contact | 22 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| home | 20 | yes | yes | 0 | 0 | 0 | 1 | 0 |
| not-found | 19 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| piece-college-toolkit | 22 | yes | yes | 0 | 0 | 0 | 0 | 5 |
| piece-cra-recruitment | 23 | yes | yes | 0 | 0 | 0 | 0 | 6 |
| piece-holodomor-mooc | 23 | yes | yes | 0 | 0 | 0 | 0 | 6 |
| piece-undp-hello-future | 26 | yes | yes | 0 | 0 | 0 | 0 | 8 |
| portfolio | 81 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| privacy-policy | 17 | yes | yes | 0 | 0 | 0 | 0 | 0 |
| terms-of-use | 17 | yes | yes | 0 | 0 | 0 | 0 | 0 |

### Controls that only work with a mouse

Styled as clickable but not reachable with Tab. This is a heuristic, so confirm by eye.

- **home**: `div.scrim`

### Small targets

Focusable elements smaller than 24 by 24 CSS pixels (WCAG 2.5.8).

- **contact**: `a.link "Careers page" (109x23)` (desktop only), `a.link "Careers page" (96x19)` (mobile only)
- **privacy-policy**: `a.utility-link "https://www.sandboxinc.ca/" (224x23)` (mobile only)
- **terms-of-use**: `a.utility-link "https://www.sandboxinc.ca/" (224x23)` (mobile only)

### Page structure

- **Language set on the page:** yes, on every page.
- **Main landmark:** present on every page.
- **Skip link:** present on some pages.

## Keyboard operation of widgets

| Check | Page | Size | Result | Detail |
|---|---|---|---|---|
| Skip link is the first Tab stop | / | desktop | works | {"text":"Skip to main content","href":"#main","onScreen":true} |
| Skip link is visible when focused | / | desktop | works | Press Tab once on a freshly loaded page. |
| Skip link moves keyboard focus into the main content | / | desktop | does not work | Press Enter on the skip link, then Tab. |
| Accordion toggles with Enter | /careers | desktop | works | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | desktop | works | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | desktop | does not work | {"role":"button","tabindex":"0","expanded":null,"controls":"lQtEeq04-va-9fnmmQvMP"} |
| Portfolio tab switches with Enter | /portfolio | desktop | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | desktop | does not work | {"tag":"A","role":null,"selected":null,"pressed":null,"current":null} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | desktop | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | desktop | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Skip link is the first Tab stop | / | mobile | works | {"text":"Skip to main content","href":"#main","onScreen":true} |
| Skip link is visible when focused | / | mobile | works | Press Tab once on a freshly loaded page. |
| Skip link moves keyboard focus into the main content | / | mobile | does not work | Press Enter on the skip link, then Tab. |
| Accordion toggles with Enter | /careers | mobile | works | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | mobile | works | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | mobile | does not work | {"role":"button","tabindex":"0","expanded":null,"controls":"XG23F7Zr7n8EDzybCObbH"} |
| Portfolio tab switches with Enter | /portfolio | mobile | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | mobile | does not work | {"tag":"A","role":null,"selected":null,"pressed":null,"current":null} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | mobile | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | mobile | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Mobile menu opens with Enter | / | mobile | works | Focus the menu button and press Enter. |
| Focus moves into the open mobile menu | / | mobile | works | Press Tab once after opening. |
| Mobile menu closes with Escape | / | mobile | works | Press Escape while the menu is open. |
