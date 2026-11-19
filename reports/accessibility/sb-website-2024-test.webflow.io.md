# Accessibility audit: sb-website-2024-test.webflow.io

Run 2026-11-19 against https://sb-website-2024-test.webflow.io. 13 pages, at desktop and mobile sizes.

This report is produced by automated checks. They find a share of real problems, not all of them: a screen reader pass and a human review of alt text, link wording and motion are still needed.

## Summary

- **WCAG 2.2 A/AA failures:** 2 rules, 37 elements.
- **By severity:** 37 serious.
- **Best-practice findings:** 3 rules, 104 elements.
- **Needs a human decision:** 3 rules, 72 elements.

## WCAG failures

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [Frames must have an accessible name](https://dequeuniversity.com/rules/axe/4.14/frame-title?application=playwright) | serious | 4.1.2 | 7 | 33 |
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 2 | 4 |

### Frames must have an accessible name

Rule `frame-title`. Pages: about, home, not-found, piece-college-toolkit, piece-cra-recruitment, piece-holodomor-mooc, piece-undp-hello-future.

- **about** `iframe`
  - `<iframe src="https://player.vimeo.com/video/1164151452?background=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe>`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **home** `.code-embed-10 > div > iframe`
  - `<iframe src="https://player.vimeo.com/video/1165767996?h=f6969cfbb0&badge=0&autopause=0&background=1&muted=1&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; enc`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **home** `.background-video-research-service > .w-iframe.w-embed > div > iframe`
  - `<iframe src="https://player.vimeo.com/video/1175539488?h=38924e8a53&badge=0&autopause=0&background=1&muted=1&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; enc`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **home** `.primary-image---bird-override.primary-image[data-animation-group="group3"] > .w-iframe.w-embed > iframe`
  - `<iframe src="https://player.vimeo..." frameborder="0" allow="autoplay; fullscreen..." style="box-sizing: border-b...">`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **home** `.code-embed-11 > div > iframe`
  - `<iframe src="https://player.vimeo.com/video/1165785782?h=38924e8a53&badge=0&autopause=0&background=1&muted=1&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; enc`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- **home** `.code-embed-12 > div > iframe`
  - `<iframe src="https://player.vimeo.com/video/1176686540?h=c631d4837c&badge=0&autopause=0&background=1&muted=1&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; enc`
  - Fix any of the following: Element has no title attribute aria-label attribute does not exist or is empty aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty Element's default semantics were not overridden with role="none" or role="pre
- ...and 27 more.

### Elements must only use permitted ARIA attributes

Rule `aria-prohibited-attr`. Pages: about, home.

- **about** `.centre-align`
  - `<p class="paragraph---l centre-align" aria-label="We are creatives – designers, strategists, researchers, educators, developers, filmmakers, and more - dedicated to connecting users worldwide with products and each other`
  - Fix all of the following: aria-label attribute cannot be used on "p" elements with no valid role attribute.
- **home** `g[aria-label="Research, marketing\d and impact"]`
  - `<g transform="matrix(0,-1,1,0,869.52099609375,1270.111083984375)" opacity="1" fill="rgb(19,24,29)" font-size="32" font-family="Switzer Variable" font-style="normal" font-weight="500" aria-label="Research, marketing and i`
  - Fix all of the following: aria-label attribute cannot be used on "g" elements with no valid role attribute.
- **home** `g[aria-label="Media and\d design"]`
  - `<g transform="matrix(1,0,0,1,69.74398803710938,667.2949829101562)" opacity="1" fill="rgb(19,24,29)" font-size="32" font-family="Switzer Variable" font-style="normal" font-weight="500" aria-label="Media and design" style=`
  - Fix all of the following: aria-label attribute cannot be used on "g" elements with no valid role attribute.
- **home** `g[aria-label="Digital learning\d and products"]`
  - `<g transform="matrix(0,1,-1,0,854.4169921875,84.88900756835938)" opacity="1" fill="rgb(19,24,29)" font-size="32" font-family="Switzer Variable" font-style="normal" font-weight="500" aria-label="Digital learning and produ`
  - Fix all of the following: aria-label attribute cannot be used on "g" elements with no valid role attribute.

## Best-practice findings

Not WCAG failures on their own, but they usually make a page harder to use with assistive technology.

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [All page content should be contained by landmarks](https://dequeuniversity.com/rules/axe/4.14/region?application=playwright) | moderate |  | 13 | 92 |
| [Document should have one main landmark](https://dequeuniversity.com/rules/axe/4.14/landmark-one-main?application=playwright) | moderate |  | 11 | 11 |
| [Page should contain a level-one heading](https://dequeuniversity.com/rules/axe/4.14/page-has-heading-one?application=playwright) | moderate |  | 1 | 1 |

### All page content should be contained by landmarks

Rule `region`. Pages: about, careers, clients, contact, home, not-found, piece-college-toolkit, piece-cra-recruitment, piece-holodomor-mooc, piece-undp-hello-future, portfolio, privacy-policy, terms-of-use.

- **about** `.about-hero_section`
  - `<section class="about-hero_section">`
  - Fix any of the following: Some page content is not contained by landmarks
- **about** `#w-node-_92fd2d46-41e7-9285-e14e-ff9451166270-5a0abefd`
  - `<div id="w-node-_92fd2d46-41e7-9285-e14e-ff9451166270-5a0abefd" class="labs-image-block-1-left-side-2" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) s`
  - Fix any of the following: Some page content is not contained by landmarks
- **about** `.labs-image-block-image-4`
  - `<img class="labs-image-block-ima..." src="https://cdn.prod.web..." alt="A group of people on..." sizes="(max-width: 818px) 1..." loading="lazy" data-animate="fade" srcset="https://cdn.prod.web..." style="opacity: 1; visi`
  - Fix any of the following: Some page content is not contained by landmarks
- ...and 89 more.

### Document should have one main landmark

Rule `landmark-one-main`. Pages: clients, contact, home, not-found, piece-college-toolkit, piece-cra-recruitment, piece-holodomor-mooc, piece-undp-hello-future, portfolio, privacy-policy, terms-of-use.

- **clients** `html`
  - `<html data-wf-domain="sb-website-2024-test.webflow.io" data-wf-page="67462167148dcc8232ad44f6" data-wf-site="66b23858269649af383cd986" lang="en" class=" w-mod-js w-mod-ix">`
  - Fix all of the following: Document does not have a main landmark
- **contact** `html`
  - `<html data-wf-domain="sb-website-2024-test.webflow.io" data-wf-page="6748e1e2f8e1301e81c30cd9" data-wf-site="66b23858269649af383cd986" lang="en" class=" w-mod-js w-mod-ix">`
  - Fix all of the following: Document does not have a main landmark
- **home** `html`
  - `<html data-wf-domain="sb-website-2024-test.webflow.io" data-wf-page="6736293957021c3f12328494" data-wf-site="66b23858269649af383cd986" lang="en" class="w-mod-js w-mod-ix w-mod-ix3">`
  - Fix all of the following: Document does not have a main landmark
- ...and 8 more.

### Page should contain a level-one heading

Rule `page-has-heading-one`. Pages: clients.

- **clients** `html`
  - `<html data-wf-domain="sb-website-2024-test.webflow.io" data-wf-page="67462167148dcc8232ad44f6" data-wf-site="66b23858269649af383cd986" lang="en" class=" w-mod-js w-mod-ix">`
  - Fix all of the following: Page must have a level-one heading

## Needs a human decision

The scanner could not tell whether these pass, most often colour contrast over an image, video or gradient.

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [Frames should be tested with axe-core](https://dequeuniversity.com/rules/axe/4.14/frame-tested?application=playwright) | critical |  | 7 | 33 |
| [Elements must meet minimum color contrast ratio thresholds](https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright) | serious | 1.4.3 | 5 | 37 |
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 1 | 2 |

## Keyboard walk

Pressing Tab from the top of each page to the end.

### desktop

| Page | Tab stops | Reached the end | Skip link | No visible focus | Focus on hidden element | Focus covered | Mouse-only controls | Video frames in tab order |
|---|---|---|---|---|---|---|---|---|
| about | 20 | yes | no | 0 | 0 | 0 | 0 | 1 |
| careers | 24 | yes | no | 0 | 0 | 0 | 0 | 0 |
| clients | 18 | yes | no | 0 | 0 | 0 | 0 | 0 |
| contact | 27 | yes | no | 0 | 0 | 0 | 0 | 0 |
| home | 28 | yes | no | 0 | 0 | 0 | 1 | 6 |
| not-found | 22 | yes | no | 0 | 0 | 0 | 0 | 1 |
| piece-college-toolkit | 24 | yes | no | 0 | 0 | 0 | 0 | 5 |
| piece-cra-recruitment | 25 | yes | no | 0 | 0 | 0 | 0 | 6 |
| piece-holodomor-mooc | 25 | yes | no | 0 | 0 | 0 | 0 | 6 |
| piece-undp-hello-future | 28 | yes | no | 0 | 0 | 0 | 0 | 8 |
| portfolio | 83 | yes | no | 0 | 0 | 0 | 0 | 0 |
| privacy-policy | 19 | yes | no | 0 | 0 | 0 | 0 | 0 |
| terms-of-use | 19 | yes | no | 0 | 0 | 0 | 0 | 0 |

### mobile

| Page | Tab stops | Reached the end | Skip link | No visible focus | Focus on hidden element | Focus covered | Mouse-only controls | Video frames in tab order |
|---|---|---|---|---|---|---|---|---|
| about | 17 | yes | no | 0 | 0 | 0 | 0 | 1 |
| careers | 21 | yes | no | 0 | 0 | 0 | 0 | 0 |
| clients | 15 | yes | no | 0 | 0 | 0 | 0 | 0 |
| contact | 21 | yes | no | 0 | 0 | 0 | 0 | 0 |
| home | 25 | yes | no | 0 | 0 | 0 | 1 | 6 |
| not-found | 19 | yes | no | 0 | 0 | 0 | 0 | 1 |
| piece-college-toolkit | 21 | yes | no | 0 | 0 | 0 | 0 | 5 |
| piece-cra-recruitment | 22 | yes | no | 0 | 0 | 0 | 0 | 6 |
| piece-holodomor-mooc | 22 | yes | no | 0 | 0 | 0 | 0 | 6 |
| piece-undp-hello-future | 25 | yes | no | 0 | 0 | 0 | 0 | 8 |
| portfolio | 80 | yes | no | 0 | 0 | 0 | 0 | 0 |
| privacy-policy | 16 | yes | no | 0 | 0 | 0 | 0 | 0 |
| terms-of-use | 16 | yes | no | 0 | 0 | 0 | 0 | 0 |

### Controls that only work with a mouse

Styled as clickable but not reachable with Tab. This is a heuristic, so confirm by eye.

- **home**: `div.scrim`

### Small targets

Focusable elements smaller than 24 by 24 CSS pixels (WCAG 2.5.8).

- **Every page** (navigation and footer): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, `a.footer-link "Vimeo" (73x20)`, `a.footer-small-link "Terms of use" (221x20)`, `a.footer-small-link "Privacy policy" (221x20)`, `a.footer-small-link "Terms of use" (392x20)`, `a.footer-small-link "Privacy policy" (392x20)`
- **contact**: `a.footer-link "Instagram" (202x20)` (desktop only), `a.footer-link "Linkedin" (202x20)` (desktop only), `a.footer-link "Facebook" (202x20)` (desktop only), `a.link "Careers page" (109x23)` (desktop only), `a.link "Careers page" (96x19)` (mobile only)
- **privacy-policy**: `a.utility-link "https://www.sandboxinc.ca/" (224x23)` (mobile only)
- **terms-of-use**: `a.utility-link "https://www.sandboxinc.ca/" (224x23)` (mobile only)

### Page structure

- **Language set on the page:** yes, on every page.
- **Main landmark:** missing on about, careers, clients, contact, home, not-found, piece-college-toolkit, piece-cra-recruitment, piece-holodomor-mooc, piece-undp-hello-future, portfolio, privacy-policy, terms-of-use.
- **Skip link:** none found on any page.

## Keyboard operation of widgets

| Check | Page | Size | Result | Detail |
|---|---|---|---|---|
| Accordion toggles with Enter | /careers | desktop | does not work | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | desktop | does not work | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | desktop | does not work | {"role":"button","tabindex":"0","expanded":null,"controls":"9KSbimxF9okM6C_eF_mBx"} |
| Portfolio tab switches with Enter | /portfolio | desktop | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | desktop | does not work | {"tag":"A","role":null,"selected":null,"pressed":null,"current":null} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | desktop | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | desktop | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Accordion toggles with Enter | /careers | mobile | does not work | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | mobile | does not work | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | mobile | does not work | {"role":"button","tabindex":"0","expanded":null,"controls":"kHpk1JMMKRj1hgJhF08js"} |
| Portfolio tab switches with Enter | /portfolio | mobile | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | mobile | does not work | {"tag":"A","role":null,"selected":null,"pressed":null,"current":null} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | mobile | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | mobile | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Mobile menu opens with Enter | / | mobile | works | Focus the menu button and press Enter. |
| Focus moves into the open mobile menu | / | mobile | works | Press Tab once after opening. |
| Mobile menu closes with Escape | / | mobile | works | Press Escape while the menu is open. |
