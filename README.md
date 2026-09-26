# rishikesh.s — portfolio

Personal site and resume for Rishikesh S, founding software engineer at Mando.
Astro, zero client-side frameworks, hand-written CSS. The downloadable resume PDF
is generated at build time from the same data file that renders the page.

**Live:** https://rishikeshs.dev

---

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # builds to dist/
npm run preview    # serve the production build
npm run resume     # rebuild the resume PDFs from LaTeX (needs TeX Live)
```

Node 20+.

## Content

All of it — page and PDF — lives in `src/data/content.js`. See
[`DATA_GUIDE.md`](DATA_GUIDE.md).

## Structure

```
src/
├── data/
│   ├── content.js       single source of truth for the site
│   ├── theme.js         accent palettes + light/dark mode
│   └── portfolio.ts     typed facade over content.js
├── layouts/Layout.astro head, theme bootstrap, ⌘K terminal, all page behaviour
├── components/          one .astro file per section
│   └── Logo.astro       the mark, inline, for the nav and footer
├── pages/index.astro    the single page
└── styles/global.css    design tokens, light + dark, every component
scripts/
└── generate-icons.mjs   favicon, touch icons, avatar and OG card from one mark
```

## Details worth knowing

- **Theme** resolves before first paint (inline script in `<head>`), so there is no
  flash. It follows the OS by default, remembers your choice, and `t` toggles it.
- **⌘K** opens an interactive terminal with history, tab-completion and a `goto`
  command that scrolls the page.
- **Colour and mode** live in `src/data/theme.js`. `accent` picks one of ten
  palettes; `mode` is `auto` (OS + toggle), or `light`/`dark` to pin the site to one
  side — pinning drops the toggle button, the OS query and the stored preference.
  Every palette clears WCAG AA on both grounds; `node scripts/check-contrast.mjs`
  proves it and exits non-zero if you add one that doesn't. Changing the
  accent also changes the icons and share card — re-run
  `node scripts/generate-icons.mjs`.
- **The logo** is a prompt-caret R: the bowl points right like a shell `>`, and the
  leg carries the accent. Its geometry lives in two places that must stay in step
  — `src/components/Logo.astro` (the site) and `scripts/generate-icons.mjs` (every
  raster). Run
  `node scripts/generate-icons.mjs` after changing it; that needs `rsvg-convert`
  (`brew install librsvg`), which is why the outputs are committed rather than
  built in CI.
- **The resume PDF** is built from LaTeX in `resume/` (`npm run resume`, needs
  TeX Live) and committed to `public/`; see `resume/README.md`.
- **No client JS framework.** The only JavaScript is one inline script in the
  layout and a small handler for the contact form, which composes a `mailto:` in
  your own client rather than posting to a third-party endpoint.
- **Reduced motion** is honoured throughout; the reveal animation can never be the
  reason content is invisible.

## The blog

The blog is a **second Astro site in the same repo**, served at
`blog.rishikeshs.dev` with none of the portfolio chrome — its own masthead, its
own footer that links back to the portfolio, and posts at the root of the
subdomain (`/bezier-curves/`, not `/blog/bezier-curves/`).

- `astro.blog.mjs` is its config: `srcDir: src/blog`, `outDir: dist-blog`,
  `site: https://blog.rishikeshs.dev`. The main build never sees `src/blog/pages`
  and the blog build never sees `src/pages`.
- It shares the design system by plain imports: `theme.js`, `global.css`,
  `blog.css`, `Logo.astro` and the post list in `src/data/blog.js`.
- `src/blog/layouts/BlogLayout.astro` is the blog's shell; posts are pages in
  `src/blog/pages/`. A new post = one page there + one entry in `blog.js`.
- `npm run dev:blog` / `npm run build:blog` develop and build it.
- Old `/blog/...` URLs on the portfolio are redirect stubs
  (`src/pages/blog/`), generated from the same post list.

## Deploy

Deployment is **Vercel, two projects, one repo** — one project per domain:

| Project   | Build command        | Output dir  | Domain               |
| --------- | -------------------- | ----------- | -------------------- |
| portfolio | `npm run build`      | `dist`      | `rishikeshs.dev`     |
| blog      | `npm run build:blog` | `dist-blog` | `blog.rishikeshs.dev` |

Both projects import the same GitHub repo; the only per-project settings are the
overridden build command and output directory (framework preset: Astro). Every
push to `main` deploys both.

`vercel.json` (shared by both projects, scoped by host) turns the old
`rishikeshs.dev/blog/...` URLs into real 308 redirects to the subdomain; the
static stubs in `src/pages/blog/` remain as a host-agnostic fallback.

`.github/workflows/deploy.yml` is the older GitHub Pages deploy (with
`public/CNAME`); it can be deleted once the domain points at Vercel.
