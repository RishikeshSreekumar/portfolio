# Resume

One LaTeX source produces two selectable-text PDFs:

| File | Layout | Use |
|------|--------|-----|
| `Rishikesh-S-Resume.pdf` | Two-page master; all five roles and five projects | Full professional history and source for tailored applications |
| `Rishikesh-S-Resume-1page.pdf` | Two full roles, internships as one-line entries, two projects, Jake's-template density | Applications requiring a concise resume |

## Build

Run `./resume/build.sh` from the repository root. Requires TeX Live 2024 or later (for `DocumentMetadata` and the tagging modules) with `tex-gyre`, plus Poppler (`pdfinfo`). BasicTeX is not sufficient. The script compiles each variant three times to resolve tagging page data and references, reports compiler/layout warnings, and checks page counts. Failure logs are retained for inspection.

The layout follows [Jake's Resume](https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs), rebuilt on base LaTeX (no `titlesec`, `enumitem` or tables) so tagging and the minimal TeX install keep working. Latin Modern gives the template's Computer Modern look as embedded Type 1 fonts. Section headings are large small caps over a full-width rule. Each entry is bold organisation with location on the right, then the role or degree in italics with dates on the right; a second role at the same organisation uses `\resumeSubRole`. Projects take one line: bold name, italic stack, link on the right. Dates are always `Mon YYYY -- Mon YYYY`. Within bullets, bold marks one or two key outcomes, metrics or product names; keep it that sparse.

Both variants run at 11pt. The one-page version uses Jake's half-inch margins and tight spacing, with earlier internships as one-line entries. The master uses 0.7-inch side margins and 1.1 leading, and starts projects on page 2. Gaps are stretchable glue under `\flushbottom`: the one-page version shares its few spare points between gaps, while the master's second page ends with `\vfill` so its spare space sits at the foot. Edit bullet copy so the last line of each bullet is reasonably full; one- or two-word wrap tails waste a line.

## Tailoring

Edit `Rishikesh-S-Resume.tex`, then rebuild both outputs:

- `\masteronly{...}` includes detail only in the master.
- `\ifonepage ... \else ... \fi` selects variant-specific content.
- Prioritise projects and skills relevant to the role; use job-description terminology only when it accurately describes your experience.
- Preserve defensible metrics. `TODO (metrics)` comments in the source mark bullets that would benefit from a figure once one can be defended in an interview; do not add numbers that cannot be sourced.
- Section headings go through `\@startsection` so the tagged PDF keeps H1 structure. Do not replace `\section` with plain bold text.

## Verification

The layout uses one column without tables or graphics. Fonts are embedded, contact/project links are clickable, and text can be extracted using `pdftotext`. PDF tagging is enabled and section headings are tagged as H1; this does not by itself establish PDF/UA conformance or guarantee any ATS result. The contact line includes a phone number, so keep that in mind before committing the PDFs to a public repository. Visually inspect both PDFs after substantive changes.

The build also writes `public/Rishikesh-S-Resume.pdf`, the copy the website links to: the master built with `\nophone`, so the phone number stays off the public site. The site build does not run TeX, so commit the regenerated PDF.
