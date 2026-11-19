# Webflow setup for v1.0.0

This is the list of changes to make in Webflow to switch the site from inline
custom code to the files in `src/`. **Nothing here has been applied yet.**

Do the switch on staging first (publish to the webflow.io domain only), run the
regression check, and only then publish to production.

## The address of the files

Every file is served by jsDelivr from this repository:

```
https://cdn.jsdelivr.net/gh/SandboxIncDevelopment/Sandbox-Website-Custom-Code-And-Testing@VERSION/src/...
```

Replace `VERSION` with a release tag (`v1.0.0`) or, while testing, a commit
hash. jsDelivr keeps a tagged file forever, so only create the `v1.0.0` tag
once the code has passed the regression check on staging. Until then, test
with the commit hash.

In the snippets below, `BASE` stands for everything up to and including
`@VERSION`.

Two rules for the tags:

- **Do not add `defer` or `async`** to the `BASE` script tags. The scripts rely
  on running in the order they appear, as the inline code did.
- **Keep the third-party tags** (Finsweet, GSAP, Matter.js and so on) exactly
  where they are unless a step below says otherwise.

## Site settings > Custom code

**Head.** Replace the `<style>` block with one line. Keep the Finsweet tag and
the Google verification tag.

```html
<!-- [Attributes by Finsweet] Disable scrolling -->
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-scrolldisable@1/scrolldisable.js"></script>
<link rel="stylesheet" href="BASE/src/global.css">
<meta name="google-site-verification" content="qyVBg1WSpGk5xOjkrSUa8bCfcveMLkUIEf8ixgpfLTI" />
```

**Footer.** Replace both `<script>` blocks and the `<style>` block with one
line after the libraries.

```html
<script src="https://unpkg.com/split-type"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js"></script>
<script src="BASE/src/global.js"></script>
```

## Page settings > Custom code

| Page | Head | Footer |
|---|---|---|
| Home | Keep the Finsweet mirror-click tag | Delete everything (the word carousel is unused) |
| About | `<link rel="stylesheet" href="BASE/src/pages/about.css">` | See "About footer" below |
| Careers | Keep the Finsweet accordion tag, then `<link rel="stylesheet" href="BASE/src/shared/accordion.css">` | Delete everything (both scripts target a section that no longer exists) |
| Contact | `<link rel="stylesheet" href="BASE/src/pages/contact.css">` | Keep the Finsweet mirror-click tag, then `<script src="BASE/src/pages/contact.js"></script>` |
| Clients | No change | No change (Finsweet number-count tag) |
| Portfolio | Keep the three Finsweet tags, then `<link rel="stylesheet" href="BASE/src/pages/portfolio.css">` | `<script src="BASE/src/pages/portfolio.js"></script>` |
| Job Postings template | `<link rel="stylesheet" href="BASE/src/pages/job-posting.css">` | No change |
| Portfolio Pieces template | `<link rel="stylesheet" href="BASE/src/pages/portfolio-piece.css">`, then keep the Vimeo `player.js` tag | `<script src="BASE/src/pages/portfolio-piece.js"></script>` |
| 404 | `<link rel="stylesheet" href="BASE/src/pages/not-found.css">` | No change |

On Careers, also delete the second `<style>` block in the head (the scrollbar
rules for the old openings section).

**About footer.** Replace the whole footer with each library once, then the
page script:

```html
<script src="https://cdn.jsdelivr.net/npm/pathseg@1.2.1/pathseg.js"></script>
<script src="https://cdn.jsdelivr.net/npm/poly-decomp@0.3.0/build/decomp.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.js"></script>
<script src="BASE/src/pages/about.js"></script>
```

## Portfolio Pieces template: video containers

The 14 code embeds are replaced by `portfolio-piece.js`. For each container
below, in the Designer:

1. Select the container (the element that holds the code embed).
2. In Element settings > Custom attributes, add `data-vimeo-id` and bind its
   value to the CMS field shown.
3. Delete the code embed inside it.

| Container (class) | CMS field for `data-vimeo-id` |
|---|---|
| Portfolio Hero Image Container | Hero Video Vimeo ID |
| Image Block 2 Video Container | Image Block 2 Vimeo ID |
| Image Block 3 Video Container | Image Block 3 Vimeo ID |
| Image Block 4 Video Container | Image Block 4 Vimeo ID |
| Image Block 5 Video Container | Image Block 5 Vimeo ID Embed Player |
| Image Block 5 Video Container Background | Image Block 5 Vimeo ID Background Video |
| Image Block 6 Video Container | Image Block 6 Vimeo ID |
| Image Block 7 Video Container | Image Block 7 Vimeo ID Embed Player |
| Image Block 7 Video Container Background | Image Block 7 Vimeo ID Background Video |
| Image Block 10 Video Container Case Study | Image Block 10 Vimeo ID - CASE STUDY |
| Image Block 11 Video Container Case Study | Image Block 11 Vimeo ID - CASE STUDY |
| Image Block 8 Video Container | Image Block 8 Vimeo ID Embed Player |
| Image Block 8 Background Video Container | Image Block 8 Vimeo ID Background Video |
| Image Block 9 Video Container | Image Block 9 Vimeo ID |

Leave each container's conditional visibility as it is.

## What differs from the inline code

Everything in `src/` is a character-for-character copy of the inline code,
checked against the staging site, except for the points below.

**Left out because it did nothing**

- Home: the rotating-word carousel. Its elements are not on the page.
- Careers: the drag-to-scroll script, the no-openings script and the scrollbar
  styles. They target a section that was rebuilt; Webflow's built-in empty
  state now covers the no-openings case.
- About: two duplicate copies of the drag-to-scroll script (both failed with
  errors) and two duplicate loads of each library.

**Portfolio piece videos (rewritten as one script)**

The players are built with the same URL options, wrapper and sizing as each
embed. Four small differences:

- Block 10 now adds its video to its own container. The embed was a copy of
  Block 2's and pointed at Block 2's container. No published piece uses
  Block 10.
- A piece with no hero video no longer raises a JavaScript error.
- Blocks 3 and 11 no longer load a second copy of the Vimeo `player.js`.
- The Block 8 background embed's "page is fully loaded" console message is
  gone.

**Not yet changed (planned for v1.1.0)**

- SplitType still loads on every page although the code that uses it is
  switched off.
- Unpinned library versions (`split-type`, Finsweet `@1`).
- Leftover `console.log` calls on About and Portfolio.
- The Job Postings heading rule that also resizes headings outside the job
  description.

## Checking the switch

Run the **Regression tests** workflow in check mode against staging. Expected:

- `behaviour.json` files unchanged.
- `scripts.json` files changed (the new files appear; About loads each library
  once instead of three times).
- `errors.json` shorter for About and Careers, unchanged elsewhere.
- Interaction tests pass.
