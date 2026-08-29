# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences arrive at the same single page, usually from a link someone was
already given — a DM, an application, a repo README, a LinkedIn profile. None of
them searched for it; all of them are checking whether the person behind the link
is real.

- **Founders and hiring principals** at early-stage companies, scanning for
  ownership and breadth: did this person carry a product from schema to interface
  without handoffs.
- **Recruiters and talent teams**, non-technical, screening fast. They need role,
  years, stack keywords and a resume PDF they can forward into an internal process.
- **Engineering managers at product companies**, assessing depth: real-time
  systems, full-stack ownership, whether the claims survive a technical read.
- **Peers and open-source visitors** who arrived from `leak`, `deadfall`,
  `weather-cast` or another repo and want to see what else got built.

## Product Purpose

A personal site and resume for Rishikesh S — founding software engineer at Mando,
based in Chennai. It exists to make a link land well. Success is not a booked call
or a submitted form; it is that whoever follows the link comes away with a credible,
specific picture of the work and the person, and that the resume PDF is there when
their process needs one.

Everything on the page and everything in the PDF comes from a single data file, so
the two can never drift apart.

## Positioning

A builder who makes his own tools. Not only an employment history — shipped taste.
`leak` (terminal subscription manager, Go), `deadfall` (npm CLI that finds React
components nothing renders), `weather-cast` (animated ASCII weather CLI), FanPark
(IPL NRR and playoff-scenario engine), a Rubik's cube solver that scans a real
cube. The site itself is part of the claim: zero client-side frameworks, a
hand-written PDF generator, a ⌘K terminal — the artifact demonstrates the thing it
asserts.

Supporting truth the positioning rests on, both factual and preserved: five product
surfaces at Mando from first commit in under two years, solo across the stack; two
years before that on real-time trading systems at Quantitative Brokers, where being
slow was the same as being wrong (40s → under 1s load, 20% latency cut, 50% CPU cut
on the order-entry critical path).

## Operating Context

- Single page, one scroll. Sections: hero, stats strip, about, experience,
  projects, open source shelf, skills, education, contact.
- Read in a browser tab that is one of several open. Often skimmed in under a
  minute; sometimes read fully by a technical reader.
- The PDF is the handoff artifact — it leaves the site and travels through ATS
  parsers and internal email.
- ⌘K opens an interactive terminal with history, tab-completion and a `goto`
  command that scrolls the page.
- A dev-only accent lab (bottom right, behind `import.meta.env.DEV`) flips palette
  and mode live on the real page.

## Capabilities and Constraints

- **Stack:** Astro 5, Tailwind v4 via `@tailwindcss/vite`, hand-written CSS in
  `src/styles/global.css`. No client-side JS framework — the only JavaScript is one
  inline script in `Layout.astro` plus a small contact-form handler.
- **Single source of truth:** `src/data/content.js` feeds both the page (via the
  typed facade `src/data/portfolio.ts`) and the PDF (via
  `scripts/generate-resume.mjs`). No second copy of the CV.
- **Two voices, deliberately:** the site speaks first person; the resume does not.
  Data carries `highlights` (page) and `resumeHighlights` (PDF) separately.
- **Resume PDF:** written byte by byte, dependency-free, no headless browser.
  Single column, real text, base-14 Helvetica, ASCII-normalised, deterministic
  output, must stay one page. ATS-parseable is a hard requirement.
- **Theme:** resolves before first paint via inline `<head>` script — no flash.
  Follows the OS by default, remembers the choice, `t` toggles it. Colour identity
  lives in `src/data/theme.js`: ten accent palettes, each with its own light and
  dark values (`base` / `deep` / `on`).
- **The logo** is a prompt-caret R — the bowl points right like a shell `>`, the leg
  carries the accent. Its geometry lives in three places that must stay in step:
  `src/components/Logo.astro`, `scripts/generate-icons.mjs`, and the `mark()` method
  in `scripts/generate-resume.mjs`. Icon regeneration needs `rsvg-convert`, which is
  why raster outputs are committed rather than built in CI.
- **Contact** composes a `mailto:` in the visitor's own client. No third-party
  endpoint, no form backend.
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml` on every push to
  `main`. `prebuild` regenerates the PDF, so the deployed resume always matches
  current content. Static output only — no server runtime available.
- Node 20+.

## Brand Commitments

- Name and domain: Rishikesh S, https://rishikeshs.dev.
- The prompt-caret R mark, and the terminal register it implies.
- First-person, specific, understated voice on the page; metric-led past tense in
  the PDF. No inflation, no superlatives about himself.
- Accent + mode are configurable by design; the site must stay correct across all
  ten palettes and both grounds, not tuned to one.

## Evidence on Hand

Real, verifiable, already in the repo:

- Employment history with named companies, dates, and measured outcomes
  (`src/data/content.js` → `experience`).
- Four featured projects: leak, deadfall, FanPark, Rubik's Cube Solver — with live
  links, repos, install commands.
- Four open-source repos on the shelf: weather-cast (Go), YT Music Romanizer (TS),
  Marvel Nexus (Astro), Lift Simulation (Python). These must stay public or the
  links 404.
- Education: Chemical Engineering, IIT Madras.
- Assets: `public/logo.svg`, `logo-dark.svg`, `avatar.png`, `og-image.png`, full
  icon set, `Rishikesh-S-Resume.pdf`.
- Hero stats: 4+ years shipping, 5+ products 0→1, 4 open-source tools, 6 languages
  in production.

Absent, and not to be fabricated: testimonials, client logos, customer names,
pricing, awards, follower or download counts, employer endorsements.

## Product Principles

1. **One source, two artifacts.** Anything true on the page must be true in the
   PDF, from the same data. Never introduce a second copy of a fact.
2. **The artifact is the argument.** The site's own restraint — no framework, no
   third-party form, no flash of wrong theme — is evidence for the positioning.
   Additions that undercut it cost more than they give.
3. **Specific over impressive.** Named systems, real numbers, shipped tools.
   No adjectives doing work a metric could do.
4. **Credible in sixty seconds, rewarding in ten minutes.** A recruiter must get
   role, years and resume immediately; a technical reader must find depth if they
   keep going.
5. **Correct across every configuration.** Ten accents × light/dark × reduced
   motion × the PDF. A change is not done until it holds in all of them.

## Accessibility & Inclusion

- Every accent palette clears WCAG AA on both grounds.
  `node scripts/check-contrast.mjs` proves it and exits non-zero otherwise.
- Reduced motion is honoured throughout; the reveal animation can never be the
  reason content is invisible.
- The resume PDF must remain real text, ATS-parseable — no images of text.
