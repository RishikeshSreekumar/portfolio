# rishikesh.s — portfolio

Personal site and resume for Rishikesh S, founding software engineer at Mando.
Astro, zero client-side frameworks, hand-written CSS. The downloadable resume PDF
is generated at build time from the same data file that renders the page.

**Live:** https://rishikeshsreekumar.github.io/portfolio

---

## Run it

```bash
npm install
npm run dev        # http://localhost:4321/portfolio
npm run build      # regenerates the resume PDF, then builds to dist/
npm run preview    # serve the production build
npm run resume     # regenerate public/Rishikesh-S-Resume.pdf only
```

Node 20+.

## Content

All of it — page and PDF — lives in `src/data/content.js`. See
[`DATA_GUIDE.md`](DATA_GUIDE.md).

## Structure

```
src/
├── data/
│   ├── content.js       single source of truth (site + resume)
│   ├── theme.js         accent palettes + light/dark mode
│   └── portfolio.ts     typed facade over content.js
├── layouts/Layout.astro head, theme bootstrap, ⌘K terminal, all page behaviour
├── components/          one .astro file per section
│   └── Logo.astro       the mark, inline, for the nav and footer
├── pages/index.astro    the single page
└── styles/global.css    design tokens, light + dark, every component
scripts/
├── generate-resume.mjs  dependency-free ATS-friendly PDF writer
└── generate-icons.mjs   favicon, touch icons, avatar and OG card from one mark
```

## Details worth knowing

- **Theme** resolves before first paint (inline script in `<head>`), so there is no
  flash. It follows the OS by default, remembers your choice, and `t` toggles it.
- **⌘K** opens an interactive terminal with history, tab-completion and a `goto`
  command that scrolls the page.
- **Colour and mode** live in `src/data/theme.js`. `accent` picks one of nine
  palettes; `mode` is `auto` (OS + toggle), or `light`/`dark` to pin the site to one
  side — pinning drops the toggle button, the OS query and the stored preference.
  Every palette clears WCAG AA on both grounds; `node scripts/check-contrast.mjs`
  proves it and exits non-zero if you add one that doesn't. In `npm run dev` a
  floating **accent lab** (bottom right) flips palette and mode live on the real
  page; it is behind `import.meta.env.DEV` and never reaches a build. Changing the
  accent also changes the icons, share card and resume — re-run
  `node scripts/generate-icons.mjs` and `npm run resume`.
- **The logo** is a prompt-caret R: the bowl points right like a shell `>`, and the
  leg carries the accent. Its geometry lives in three places that must stay in step
  — `src/components/Logo.astro` (the site), `scripts/generate-icons.mjs` (every
  raster) and the `mark()` method in `scripts/generate-resume.mjs` (the PDF). Run
  `node scripts/generate-icons.mjs` after changing it; that needs `rsvg-convert`
  (`brew install librsvg`), which is why the outputs are committed rather than
  built in CI.
- **The resume PDF** is written byte by byte in `scripts/generate-resume.mjs`:
  single column, real text, base-14 Helvetica, ASCII-normalised, deterministic
  output. No dependencies and no headless browser in CI.
- **No client JS framework.** The only JavaScript is one inline script in the
  layout and a small handler for the contact form, which composes a `mailto:` in
  your own client rather than posting to a third-party endpoint.
- **Reduced motion** is honoured throughout; the reveal animation can never be the
  reason content is invisible.

## Deploy

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/`
to GitHub Pages. `npm run build` runs `prebuild`, so the PDF in the deployed site is
always regenerated from current content.
