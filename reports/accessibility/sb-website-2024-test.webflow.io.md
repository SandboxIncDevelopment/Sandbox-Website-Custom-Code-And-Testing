# Accessibility audit: sb-website-2024-test.webflow.io

Run 2026-11-19 against https://sb-website-2024-test.webflow.io. 13 pages, at desktop and mobile sizes.

This report is produced by automated checks. They find a share of real problems, not all of them: a screen reader pass and a human review of alt text, link wording and motion are still needed.

## Summary

- **WCAG 2.2 A/AA failures:** 1 rules, 1 elements.
- **By severity:** 1 serious.
- **Best-practice findings:** 0 rules, 0 elements.
- **Needs a human decision:** 4 rules, 65 elements.

## WCAG failures

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 1 | 1 |

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
| [Frames should be tested with axe-core](https://dequeuniversity.com/rules/axe/4.14/frame-tested?application=playwright) | critical |  | 4 | 13 |
| [Elements must meet minimum color contrast ratio thresholds](https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright) | serious | 1.4.3 | 5 | 37 |
| [Frames must have a unique title attribute](https://dequeuniversity.com/rules/axe/4.14/frame-title-unique?application=playwright) | serious | 4.1.2 | 4 | 13 |
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
| piece-college-toolkit | 22 | yes | yes | 0 | 0 | 0 | 0 | 2 |
| piece-cra-recruitment | 24 | yes | yes | 0 | 0 | 0 | 0 | 4 |
| piece-holodomor-mooc | 23 | yes | yes | 0 | 0 | 0 | 0 | 3 |
| piece-undp-hello-future | 25 | yes | yes | 0 | 0 | 0 | 0 | 4 |
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
| piece-college-toolkit | 19 | yes | yes | 0 | 0 | 0 | 0 | 2 |
| piece-cra-recruitment | 21 | yes | yes | 0 | 0 | 0 | 0 | 4 |
| piece-holodomor-mooc | 20 | yes | yes | 0 | 0 | 0 | 0 | 3 |
| piece-undp-hello-future | 22 | yes | yes | 0 | 0 | 0 | 0 | 4 |
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
| Accordion announces open/closed state (aria-expanded) | /careers | desktop | works | {"role":"button","tabindex":"0","expanded":"false","controls":"7pARaJU8faTzDjW9dCDDN"} |
| Portfolio tab switches with Enter | /portfolio | desktop | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | desktop | works | {"tag":"A","role":null,"selected":null,"pressed":null,"current":"true"} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | desktop | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | desktop | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Skip link is the first Tab stop | / | mobile | works | {"text":"Skip to main content","href":"#main","onScreen":true} |
| Skip link is visible when focused | / | mobile | works | Press Tab once on a freshly loaded page. |
| Skip link moves keyboard focus into the main content | / | mobile | does not work | Press Enter on the skip link, then Tab. |
| Accordion toggles with Enter | /careers | mobile | works | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | mobile | works | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | mobile | works | {"role":"button","tabindex":"0","expanded":"false","controls":"b2qQCYc71dO3o_dgtlLSs"} |
| Portfolio tab switches with Enter | /portfolio | mobile | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | mobile | works | {"tag":"A","role":null,"selected":null,"pressed":null,"current":"true"} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | mobile | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | mobile | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Mobile menu opens with Enter | / | mobile | works | Focus the menu button and press Enter. |
| Focus moves into the open mobile menu | / | mobile | works | Press Tab once after opening. |
| Mobile menu closes with Escape | / | mobile | works | Press Escape while the menu is open. |
