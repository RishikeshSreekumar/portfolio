---
target: portfolio page (src/pages/index.astro)
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
timestamp: 2026-08-17T21-07-21Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review, isolated · B: detector + browser evidence, isolated).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Progress bar, active nav, copied ✓, role="status" form line present; h1 gives no signal whether animating or broken |
| 2 | Match System / Real World | 2 | ~/about, return_top(), open_to_talk, PRJ_01 — dialect imposed on an audience incl. non-technical recruiters |
| 3 | User Control and Freedom | 3 | Esc/outside-click/resize-close/history good; goto pushes history entries, Tab swallowed in terminal |
| 4 | Consistency and Standards | 3 | One accent/mono/grid. Breaks: filled-black hamburger vs outlined term button; 4 radii; inert `theme` command |
| 5 | Error Prevention | 3 | Native validation, goto validates, mailto anticipates failure. No required markers; "press ⌘C" selects nothing |
| 6 | Recognition Rather Than Recall | 2 | ⌘K printed nowhere; resume is a raw filename in row 5 of a table at y≈6,900 |
| 7 | Flexibility and Efficiency | 3 | Real accelerator layer (⌘K, tab-completion, history, goto); clobbers browser ⌘K; unadvertised |
| 8 | Aesthetic and Minimalist Design | 2 | 7,660px desktop / 11,659px mobile, 22 bullets, 25 chips, zero progressive disclosure |
| 9 | Error Recovery | 3 | Thorough written recoveries; docked for non-functional clipboard fallback |
| 10 | Help and Documentation | 2 | help command complete but behind an undiscoverable shortcut; no orientation for non-technical visitors |
| **Total** | | **26/40** | **Acceptable** |

Both 7 and 10 apply: documented 12-command palette exists.

## Design Specificity Verdict

Authored, not interchangeable — with two blocks that fell back to template.

Specific: project card anatomy (PRJ_01 → installable badge → copyable brew install → falsifiable Key highlight); hero terminal as primary art where git log lines are the metrics; failure-path copy; prompt-caret mark; hairline 1px-gap grid construction.

Interchangeable: skills section (25 chips, all outbound to vendor homepages — the Tech Stack block from every template); work history (5 roles at identical weight, 2020 internship rendered like the founding-engineer entry); footer post-removal (logo + return_top() in ~130px of whitespace).

Deterministic scan: CLI exit 2, 2 findings (flat-type-hierarchy AccentLab.astro:106; advisory em-dash-overuse). Overlay: 34 elements / 45 findings — 24 undersized-ui-text, 7 kicker-above-heading, 4 gpt-thin-border-wide-shadow, plus overused-font, codex-grid-background, blinking-cursor, dark-glow.

~21 of 45 are false positives (dev-only AccentLab behind import.meta.env.DEV). The 1.75MB JS is the Astro dev toolbar; real app payload 124KB. em-dash rule double-counts the 7 section eyebrows already flagged as kickers.

Detector caught what the review missed: 7 shipped undersized-ui-text (10.5px badge-os, Key highlight, copy) and 45/47 inline SVGs without aria-hidden (decorative-but-unmarked, not unreachable).

## Overall Impression

The engineering under this page is better than the page. What is missing is editing. Everything the résumé contains is on screen at full weight, and the two things that would prove "a builder who makes his own tools" — the resume PDF and any pixel of the built things — are respectively buried and absent.

## What's Working

1. Install line + Key highlight pairing — verifiable in one command, reads as shipping discipline.
2. Every dead end has a written recovery (mailto fallback, goto section list, private-repo note).
3. Invisible engineering: reserved terminal height, renderHeroInstant() under reduced motion, revealVisible() behind the observer, command scrolls while copy button stays put.

## Priority Issues

### [P0] The h1 is not reliably the person's name
Verified live: 43s after load in a background tab the h1 read `—^]<\__!*__.`. The scramble is rAF-driven; Chrome pauses rAF in non-foreground tabs, the loop stalls mid-sequence, and the accessible name of the primary heading stays corrupt indefinitely. Every other animation in Layout.astro guards for this; the scramble has none. Maps onto how PRODUCT.md says people arrive (⌘-click from a DM = background tab).
Fix: skip when document.visibilityState !== 'visible'; add a visibilitychange listener and a ~1200ms deadline that force-settles to target.
Command: /impeccable harden

### [P0] The resume PDF has no route
Two paths survive: a raw filename in row 5 of a table at y≈6,900 (≈11,000 mobile), and a terminal command whose shortcut is printed nowhere. Tab stop 56 of 65. PRODUCT.md calls the PDF the handoff artifact.
Fix: one text link in the hero social row beside GitHub/LinkedIn/email — `Resume ↓`, same mono/size, no button.
Command: /impeccable layout

### [P1] --ink-mute fails AA across 67 elements
#8B8F84 on --bg = 3.22:1, on --panel 3.30:1, on --bg-2 3.02:1. Colors the hero email address, every nav link, dates, locations, repo paths, PRJ_0n, section eyebrows, all five contact labels incl. RESUME, and form placeholders. check-contrast.mjs validates accents only, so the neutral ramp drifted past an existing guard.
Fix: darken light-mode --ink-mute to ≈#6B6F65 (≈4.6:1); extend check-contrast.mjs to assert --ink-mute and --ink-soft against --bg, --panel, --bg-2.
Command: /impeccable audit

### [P1] Open-source shelf renders a bare grey block
.oss-grid is repeat(3,1fr) with 4 entries; cells 5–6 leave ~760×180px of #E2E4DD showing under "The shelf". .skills-grid carries the rule that prevents this; .oss-grid never got it.
Fix: mirror :last-child:nth-child(3n+1){grid-column:1/-1} for 3-col and ≤1080px 2-col, or repeat(auto-fit, minmax(280px,1fr)).
Command: /impeccable layout

### [P2] Not one pixel of the work
No screenshot, GIF, asciinema cast or embed across 7,660px. leak is a TUI; weather-cast draws animated ASCII scenes. The Rubik's solver ends in "private repo — happy to walk through it" with no live URL and no visual.
Command: /impeccable bolder

## Persona Red Flags

Recruiter skimming for a PDF: no resume in nav; ~/ convention is a foreign dialect; with the stat strip gone nothing above the fold states years of experience (4+ years now only inside a typewriter ~4s in); the PDF row is an 11px label at 3.22:1 after four project essays, a CGPA, a JEE rank, four repo cards and 25 chips.

Sam (accessibility): h1 accessible name is glyph noise when rAF throttles, no aria-label fallback; #heroTerm has no aria-hidden so the 11-line transcript is announced as content with `rishikesh@portfolio:~$ ` injected per prompt line; Tab preventDefaulted unconditionally in the terminal; .oss-grid/.skills-grid overflow:hidden clips the outline-offset focus ring on edge cards; Skip to content targets #about, skipping name and bio.

Peer from a repo: arrives at github.com/RishikeshSreekumar/nimbus, meets a card titled weather-cast; finds no image of anything.

Alex (power user): well served once they know, but nothing advertises the layer; help lists `theme — show the pinned mode`, a command whose only function is to say it cannot do anything.

## Minor Observations

- Work history 1,850px undifferentiated — 22 bullets, one size, one glyph. Compress pre-2022 roles to one line with tags.
- 25 skill chips all outbound (38% of tab stops, every one an exit). Point inward or make them spans.
- Cognitive load: 5/8 checklist items fail (single focus, grouping, minimal choices, working memory, progressive disclosure). Decision points over 4 options: skills 25, help 12, contact 8, oss 5.
- .about-side uses border-bottom, .info-row uses border-top; label/value ~400px apart via space-between.
- 04 — EDUCATION has no nav entry, so ~/open-source silently skips a numbered section. PRODUCT.md lists education last and still mentions the removed stats strip.
- goto pushes a history entry per jump; ⌘K overrides the browser shortcut; email appears three times.
- Four radii (4/5/9/11px).
- Reduced-motion users get a better page than everyone else — they always see the correct name.

## Questions to Consider

1. If success is credibility not conversion, what is the three-field contact form for?
2. Which of the removals were restraint, and which were not wanting to decide the page's one job?
3. If the scramble only subtracts legibility from the most important word — permanently in a background tab — what is it buying?
4. Is 04 — EDUCATION's placement a decision, or a résumé default that survived?
