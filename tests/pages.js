// The pages the suite visits. Draft pages (Labs, Accelerator Program, Old Home,
// Test Page) are left out on purpose.
//
// The portfolio pieces were picked so that, between them, every video slot on
// the Portfolio Pieces template is used at least once (except Block 10, which
// no published piece uses).
const PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'about', path: '/about' },
  { slug: 'careers', path: '/careers' },
  { slug: 'contact', path: '/contact' },
  { slug: 'clients', path: '/clients' },
  { slug: 'portfolio', path: '/portfolio' },
  { slug: 'privacy-policy', path: '/privacy-policy' },
  { slug: 'terms-of-use', path: '/terms-of-use' },
  { slug: 'not-found', path: '/this-page-does-not-exist', status: 404 },
  { slug: 'piece-undp-hello-future', path: '/portfolio/undp-hello-future-season-2' },
  { slug: 'piece-college-toolkit', path: '/portfolio/college-toolkit' },
  { slug: 'piece-holodomor-mooc', path: '/portfolio/u-of-a-holodomor-mooc' },
  { slug: 'piece-cra-recruitment', path: '/portfolio/cra-recruitment-campaign' },
];

module.exports = { PAGES };
