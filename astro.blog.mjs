// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/* The blog is a second Astro site living in the same repo. It has its own
 * source tree (src/blog/pages → routes at the ROOT of the blog domain), its
 * own build output (dist-blog/) and its own domain, but shares everything
 * that matters — theme.js, global.css, blog.css, the post list in
 * src/data/blog.js and the Logo component — through plain relative imports.
 *
 *   npm run dev:blog     develop it
 *   npm run build:blog   build it into dist-blog/
 *
 * The main config (astro.config.mjs) knows nothing about this tree: srcDir
 * points at src/blog, so src/blog/pages is invisible to the main build and
 * src/pages is invisible to this one. public/ is shared — favicons and the
 * share card come along for free. */
export default defineConfig({
  site: 'https://blog.rishikeshs.dev',
  srcDir: './src/blog',
  outDir: './dist-blog',
  vite: {
    plugins: [tailwindcss()]
  }
});
