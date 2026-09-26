# Resume

One LaTeX source produces two selectable-text PDFs:

| File | Layout | Use |
|------|--------|-----|
| `Rishikesh-S-Resume.pdf` | Two-page master; all five roles and five projects | Full professional history and source for tailored applications |
| `Rishikesh-S-Resume-1page.pdf` | Two full roles, internships as one-line entries, two projects | Applications requiring a concise resume |

## Build

Run `./resume/build.sh` from the repository root. Requires TeX Live 2024 or later (for `DocumentMetadata` and the tagging modules) with `tex-gyre`, plus Poppler (`pdfinfo`). BasicTeX is not sufficient. The script compiles each variant three times to resolve tagging page data and references, reports compiler/layout warnings, and checks page counts. Failure logs are retained for inspection.

TeX Gyre Heros is the preferred font, with Helvetica and Latin Modern Sans fallbacks. The master uses a 10pt body on an 11pt document base, slightly expanded leading and 0.75-inch side margins. The one-page version uses a 9pt body on a 10pt base. Every entry has the same two-line shape: bold title with dates (or link) on the right, then the company (or stack) in italics with the location on the right. Dates are always `Mon YYYY -- Mon YYYY`. Within bullets, bold marks one or two key outcomes, metrics or product names; keep it that sparse. Gaps between sections, entries and bullets are stretchable glue under `\flushbottom`, and the document ends with `\pagebreak`, so each page's spare space is shared out instead of pooling at the bottom. The master starts projects on page 2.

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
