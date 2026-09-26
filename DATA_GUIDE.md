# Editing the content

Everything on the site comes from **one file**:

```
src/data/content.js   ← the only file you edit
   └── src/data/portfolio.ts        adds TypeScript types, re-exports for .astro components
```

The downloadable resume is separate: it is built from LaTeX in `resume/` and
committed to `public/Rishikesh-S-Resume.pdf`. See [`resume/README.md`](resume/README.md).

---

## What lives where

| Export | Used by | Notes |
|---|---|---|
| `personal` | hero, about, contact | name, role, email, socials, `resumeFile` |
| `stats` | hero strip | `value` is a number — it drives the count-up animation |
| `experience` | experience section | |
| `education`, `achievements` | education section | |
| `projects` | projects section | `featured: true` renders a card |
| `openSource` | the shelf | keep these repos **public** or the links 404 |
| `skills` | skills grid | `category` must be one of the seven groups |

---

## The resume PDF

The site speaks in first person; the resume does not, and it lives in its own
source, `resume/Rishikesh-S-Resume.tex`. When experience or projects change here,
update the resume too, then rebuild it:

```bash
npm run resume     # needs TeX Live; writes resume/*.pdf and public/Rishikesh-S-Resume.pdf
```

The site build does not run TeX, so commit the regenerated PDFs.

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
