# Editing the content

Everything on the site — and everything in the downloadable PDF resume — comes from
**one file**:

```
src/data/content.js
```

Edit it, run `npm run build`, and both the page and `public/Rishikesh-S-Resume.pdf`
update together. There is no second copy of your CV to keep in sync.

```
src/data/content.js   ← the only file you edit
   ├── src/data/portfolio.ts        adds TypeScript types, re-exports for .astro components
   └── scripts/generate-resume.mjs  renders the ATS-friendly PDF into public/
```

---

## What lives where

| Export | Used by | Notes |
|---|---|---|
| `personal` | hero, about, contact, resume header | name, role, email, socials, `resumeFile` |
| `stats` | hero strip | `value` is a number — it drives the count-up animation |
| `experience` | experience section, resume | see below |
| `education`, `achievements` | education section, resume | |
| `projects` | projects section | `featured: true` renders a card |
| `openSource` | the shelf | keep these repos **public** or the links 404 |
| `skills` | skills grid | `category` must be one of the seven groups |
| `resume` | PDF only | summary, skill groups, project entries |

---

## Two voices, on purpose

The site speaks in first person. The resume does not. Where they differ, the data
carries both:

```js
{
  company: "Mando",
  highlights: [ /* long form, first person, shown on the page */ ],
  resumeHighlights: [ /* tight, past tense, metric-led — used in the PDF */ ],
}
```

If `resumeHighlights` is missing, the PDF falls back to `highlights`.

---

## The resume PDF

```bash
npm run resume     # regenerate just the PDF
npm run build      # prebuild regenerates it, then Astro builds the site
```

It is written by hand in `scripts/generate-resume.mjs` — no dependencies, no
headless browser. That is deliberate:

- **Single column, real text, base-14 Helvetica.** No embedded font subsets, no
  images, no tables, no text boxes. Applicant tracking systems parse it cleanly.
- **ASCII only.** Curly quotes, em dashes and arrows are normalised before they
  reach the page.
- **Deterministic.** No timestamps, so rebuilding without content changes gives a
  byte-identical file and no git noise.

### Keeping it to one page

The generator prints how much room is left:

```
resume -> public/Rishikesh-S-Resume.pdf  11.3 KB  1 page  (685pt used, 23pt left)
```

If it spills to two pages, in order of preference:

1. Shorten bullets so they wrap to one line instead of two (~105 characters).
2. Drop a bullet — edit the `bullets` counts in `RESUME_ROLES`.
3. Nudge `BODY` / `LEAD` (font size and line height) at the top of the script.

It also warns if any line overflows the right margin.

---

## Adding a project

```js
{
  id: "thing",
  title: "thing — What It Does",     // text after the em dash renders muted
  tagline: "One line, in mono.",
  description: "Two or three sentences on the problem and the approach.",
  highlight: "The one technically interesting decision.",
  install: "npx thing",              // optional — renders a copyable command block
  tags: ["Go", "SQLite"],
  liveUrl: "https://…",
  liveLabel: "View on npm",          // optional link label
  githubUrl: "https://…",
  featured: true,
}
```

A project with neither `liveUrl` nor `githubUrl` shows "private repo — happy to
walk through it" instead of a dead link.

---

## Terminal commands

The ⌘K terminal lives in `src/layouts/Layout.astro`. Add a command by adding a key
to the `commands` object — it returns a string (or `null` to print nothing), and
tab-completion picks it up automatically.
