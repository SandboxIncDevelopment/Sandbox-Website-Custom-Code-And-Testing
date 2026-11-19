# Accessibility audit: sb-website-2024-test.webflow.io

Run 2026-11-19 against https://sb-website-2024-test.webflow.io. 13 pages, at desktop and mobile sizes.

This report is produced by automated checks. They find a share of real problems, not all of them: a screen reader pass and a human review of alt text, link wording and motion are still needed.

## Summary

- **WCAG 2.2 A/AA failures:** 1 rules, 4 elements.
- **By severity:** 4 serious.
- **Best-practice findings:** 3 rules, 104 elements.
- **Needs a human decision:** 2 rules, 39 elements.

## WCAG failures

| Rule | Severity | WCAG | Pages | Elements |
|---|---|---|---|---|
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 2 | 4 |

### Elements must only use permitted ARIA attributes

Rule `aria-prohibited-attr`. Pages: about, home.

- **about** `.centre-align`
  - `<p class="paragraph---l centre-align" aria-label="We are creatives – designers, strategists, researchers, educators, developers, filmmakers, and more - dedicated to connecting users worldwide with products and each other`
  - Fix all of the following: aria-label attribute cannot be used on "p" elements with no valid role attribute.
- **home** `g[aria-label="Research, marketing\d and impact"]`
  - `<g transform="matrix(0.00562268728..." opacity="1" fill="rgb(19,24,29)" font-size="32" font-family="Switzer Variable" font-style="normal" font-weight="500" aria-label="Research, marketing ..." style="display: block;">`
  - Fix all of the following: aria-label attribute cannot be used on "g" elements with no valid role attribute.
- **home** `g[aria-label="Media and\d design"]`
  - `<g transform="matrix(0.99998420476..." opacity="1" fill="rgb(19,24,29)" font-size="32" font-family="Switzer Variable" font-style="normal" font-weight="500" aria-label="Media and design" style="display: block;">`
  - Fix all of the following: aria-label attribute cannot be used on "g" elements with no valid role attribute.
- **home** `g[aria-label="Digital learning\d and products"]`
  - `<g transform="matrix(-0.0112451966..." opacity="1" fill="rgb(19,24,29)" font-size="32" font-family="Switzer Variable" font-style="normal" font-weight="500" aria-label="Digital learning and..." style="display: block;">`
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
| [Elements must meet minimum color contrast ratio thresholds](https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright) | serious | 1.4.3 | 5 | 37 |
| [Elements must only use permitted ARIA attributes](https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright) | serious | 4.1.2 | 1 | 2 |

## Keyboard walk

Pressing Tab from the top of each page to the end.

### desktop

| Page | Tab stops | Reached the end | Skip link | No visible focus | Focus on hidden element | Focus covered | Mouse-only controls | Video frames in tab order |
|---|---|---|---|---|---|---|---|---|
| about | 20 | yes | no | 0 | 0 | 0 | 0 | 1 |
| careers | 24 | yes | no | 0 | 0 | 0 | 4 | 0 |
| clients | 18 | yes | no | 0 | 0 | 0 | 0 | 0 |
| contact | 27 | yes | no | 0 | 0 | 0 | 0 | 0 |
| home | 28 | yes | no | 0 | 0 | 1 | 1 | 6 |
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
| about | 17 | yes | no | 0 | 0 | 1 | 0 | 1 |
| careers | 21 | yes | no | 0 | 0 | 0 | 4 | 0 |
| clients | 15 | yes | no | 0 | 0 | 0 | 0 | 0 |
| contact | 21 | yes | no | 0 | 0 | 0 | 0 | 0 |
| home | 25 | yes | no | 0 | 0 | 1 | 1 | 6 |
| not-found | 19 | yes | no | 0 | 0 | 0 | 0 | 1 |
| piece-college-toolkit | 21 | yes | no | 0 | 0 | 0 | 0 | 5 |
| piece-cra-recruitment | 22 | yes | no | 0 | 0 | 0 | 0 | 6 |
| piece-holodomor-mooc | 22 | yes | no | 0 | 0 | 0 | 0 | 6 |
| piece-undp-hello-future | 25 | yes | no | 0 | 0 | 0 | 0 | 8 |
| portfolio | 80 | yes | no | 0 | 0 | 0 | 0 | 0 |
| privacy-policy | 16 | yes | no | 0 | 0 | 0 | 0 | 0 |
| terms-of-use | 16 | yes | no | 0 | 0 | 0 | 0 | 0 |

### Focus covered by another element

The focused element sits underneath something else, such as a fixed navigation bar.

- **home** (desktop): `iframe.`
- **about** (mobile): `iframe.`
- **home** (mobile): `iframe.`

### Controls that only work with a mouse

Styled as clickable but not reachable with Tab. This is a heuristic, so confirm by eye.

- **careers** (desktop): `div.accordion-group-item "Thriving TogetherMorning Kickoffs: Begin each day with produ"`, `div.accordion-group-item "Balanced Work LifeHybrid Style: Enjoy a balanced work enviro"`, `div.accordion-group-item "Growing with UsProfessional Growth: Thrive in a work culture"`, `div.accordion-group-item "Well-being and ConnectionHealth First: Access comprehensive "`
- **home** (desktop): `div.scrim`
- **careers** (mobile): `div.accordion-group-item "Thriving TogetherMorning Kickoffs: Begin each day with produ"`, `div.accordion-group-item "Balanced Work LifeHybrid Style: Enjoy a balanced work enviro"`, `div.accordion-group-item "Growing with UsProfessional Growth: Thrive in a work culture"`, `div.accordion-group-item "Well-being and ConnectionHealth First: Access comprehensive "`
- **home** (mobile): `div.scrim`

### Tab stops with no name

Focusable elements with no text or label.

- **contact** (desktop): `input.contact-submit-button`
- **contact** (mobile): `input.contact-submit-button`

### Small targets

Focusable elements smaller than 24 by 24 CSS pixels (WCAG 2.5.8).

- **about** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **careers** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **clients** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **contact** (desktop): `a.footer-link "Instagram" (202x20)`, `a.footer-link "Linkedin" (202x20)`, `a.footer-link "Facebook" (202x20)`, `a.link "Careers page" (109x23)`, `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, and 7 more
- **home** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **not-found** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-college-toolkit** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-cra-recruitment** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-holodomor-mooc** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-undp-hello-future** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **portfolio** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **privacy-policy** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **terms-of-use** (desktop): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **about** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **careers** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **clients** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **contact** (mobile): `a.link "Careers page" (96x19)`, `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, and 4 more
- **home** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **not-found** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-college-toolkit** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-cra-recruitment** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-holodomor-mooc** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **piece-undp-hello-future** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **portfolio** (mobile): `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, `a.footer-link "Facebook" (73x20)`, and 3 more
- **privacy-policy** (mobile): `a.utility-link "https://www.sandboxinc.ca/" (224x23)`, `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, and 4 more
- **terms-of-use** (mobile): `a.utility-link "https://www.sandboxinc.ca/" (224x23)`, `a.footer-link "About" (125x20)`, `a.footer-link "Portfolio" (125x20)`, `a.footer-link "Clients" (125x20)`, `a.footer-link "Careers" (125x20)`, `a.footer-link "Contact" (125x20)`, `a.footer-link "Instagram" (73x20)`, `a.footer-link "Linkedin" (73x20)`, and 4 more

### Page structure

- **Language set on the page:** yes, on every page.
- **Main landmark:** missing on about, careers, clients, contact, home, not-found, piece-college-toolkit, piece-cra-recruitment, piece-holodomor-mooc, piece-undp-hello-future, portfolio, privacy-policy, terms-of-use.
- **Skip link:** none found on any page.

## Keyboard operation of widgets

| Check | Page | Size | Result | Detail |
|---|---|---|---|---|
| Accordion toggles with Enter | /careers | desktop | does not work | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | desktop | does not work | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | desktop | does not work | {"role":"button","tabindex":"0","expanded":null,"controls":"szwR_9sPyUFMlT3eaOxT9"} |
| Portfolio tab switches with Enter | /portfolio | desktop | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | desktop | does not work | {"tag":"A","role":null,"selected":null,"pressed":null,"current":null} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | desktop | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | desktop | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Accordion toggles with Enter | /careers | mobile | does not work | Focus an accordion heading and press the key. |
| Accordion toggles with Space | /careers | mobile | does not work | Focus an accordion heading and press the key. |
| Accordion announces open/closed state (aria-expanded) | /careers | mobile | does not work | {"role":"button","tabindex":"0","expanded":null,"controls":"CXmORQQ0H6YqZQNZvj0_-"} |
| Portfolio tab switches with Enter | /portfolio | mobile | works | Focus the second tab and press Enter. |
| Portfolio tabs announce which one is selected | /portfolio | mobile | does not work | {"tag":"A","role":null,"selected":null,"pressed":null,"current":null} |
| Portfolio filter options can receive keyboard focus | /portfolio?tab=service | mobile | does not work | Checks the first service filter input. |
| History timeline can be scrolled with the keyboard | /about | mobile | works | {"scrolls":true,"tabindex":"0","focusableInside":0} |
| Mobile menu opens with Enter | / | mobile | works | Focus the menu button and press Enter. |
| Focus moves into the open mobile menu | / | mobile | works | Press Tab once after opening. |
| Mobile menu closes with Escape | / | mobile | works | Press Escape while the menu is open. |
