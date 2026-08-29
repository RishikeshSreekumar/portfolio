/* The blog's single source of truth, the same way content.js is the site's.
 * Each post is an .astro page under src/blog/pages/ (the blog is its own
 * site — see astro.blog.mjs); this list is what the index renders and what
 * the portfolio's /blog/<slug> redirect stubs are generated from, so a post
 * that is not listed here does not exist. Newest first — the index prints
 * the array in order. */

export const posts = [
  {
    slug: 'bezier-curves',
    title: 'Bézier curves from first principles',
    summary:
      'I finally sat down to understand the curves behind fonts, the pen tool and CSS easing. Turns out it is one repeated lerp. With draggable demos.',
    date: '2026-08-29',
    minutes: 12,
  },
];

export function formatDate(iso) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
