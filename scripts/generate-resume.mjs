#!/usr/bin/env node
/**
 * Generates an ATS-friendly PDF resume from src/data/content.js.
 *
 * Deliberately dependency-free: it writes the PDF by hand using the base-14
 * Helvetica family, so there are no embedded font subsets, no images, no
 * tables and no multi-column layout — just a single column of real, selectable
 * text in reading order, which is exactly what an applicant tracking system
 * wants to parse.
 *
 * The styling (accent rules, tinted header band, square bullets) is vector
 * fills drawn behind that text, so it costs nothing at parse time.
 *
 *   node scripts/generate-resume.mjs
 *
 * Output is deterministic (no timestamps), so rebuilding without content
 * changes produces a byte-identical file.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { personal, experience, education, resume } from '../src/data/content.js';
import { activeAccent } from '../src/data/theme.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', personal.resumeFile);

/* ------------------------------------------------------------------ *
 * Base-14 metrics (units per 1000). Codes 32..126 plus the bullet.
 * ------------------------------------------------------------------ */

const W_REGULAR = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];

const W_BOLD = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

const BULLET_W = { regular: 350, bold: 350 };

function charWidth(code, font) {
  if (code === 0x95) return BULLET_W[font === 'bold' ? 'bold' : 'regular'];
  if (code < 32 || code > 126) return font === 'bold' ? 556 : 556;
  const table = font === 'bold' ? W_BOLD : W_REGULAR;
  return table[code - 32];
}

function measure(text, size, font) {
  let total = 0;
  for (let i = 0; i < text.length; i++) total += charWidth(text.charCodeAt(i), font);
  return (total * size) / 1000;
}

/* ------------------------------------------------------------------ *
 * Text hygiene: ATS parsers choke on typographic punctuation far more
 * often than they choke on plain ASCII. Normalise everything.
 * ------------------------------------------------------------------ */

const REPLACEMENTS = [
  [/[‘’‛]/g, "'"],
  [/[“”]/g, '"'],
  [/[–—]/g, '-'],
  [/…/g, '...'],
  [/→/g, '->'],
  [/·/g, '|'],
  [/×/g, 'x'],
  [/≥/g, '>='],
  [/≤/g, '<='],
  [/−/g, '-'],
  [/ /g, ' '],
];

function ascii(text) {
  let out = String(text);
  for (const [re, to] of REPLACEMENTS) out = out.replace(re, to);
  // Anything still outside Latin-1 printable range would break WinAnsi.
  return out.replace(/[^\x20-\x7E]/g, '');
}

function escapePdf(text) {
  return text.replace(/([\\()])/g, '\\$1');
}

/* ------------------------------------------------------------------ *
 * Page geometry
 * ------------------------------------------------------------------ */

const PAGE_W = 612; // US Letter
const PAGE_H = 792;
const MARGIN_X = 52;
const MARGIN_TOP = 46;
const MARGIN_BOTTOM = 38;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const RIGHT = PAGE_W - MARGIN_X;

const FONT_KEY = { regular: '/F1', bold: '/F2', italic: '/F3' };

/** Body type. Nudge these two to trade density against fitting one page. */
const BODY = 9.2;
const LEAD = 10.9;

/* Palette, lifted from the site's light theme so print and web agree. Paper is
 * always light, so the accent comes from the active palette's light side. */
const hexToPdf = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => Number((parseInt(h.slice(i, i + 2), 16) / 255).toFixed(4)));
};
/** Tint towards paper white — used for the header band behind the name. */
const tint = (c, amount) => c.map((v) => Number((v + (1 - v) * amount).toFixed(4)));

const INK = [0.07, 0.08, 0.06];
const SOFT = [0.28, 0.30, 0.26];
const MUTE = [0.47, 0.50, 0.44];
const ACCENT = hexToPdf(activeAccent().light.base);
const ACCENT_DK = hexToPdf(activeAccent().light.deep);
const RULE = [0.84, 0.85, 0.82];
const BAND = tint(ACCENT, 0.94);

const HEADER_H = 92;

const rgb = (c) => `${c[0]} ${c[1]} ${c[2]}`;

const overflows = [];

class Resume {
  constructor() {
    this.pages = [];
    this.newPage();
  }

  newPage() {
    this.ops = [];
    this.links = [];
    this.pages.push({ ops: this.ops, links: this.links });
    this.y = PAGE_H - MARGIN_TOP;
  }

  space(amount) {
    this.y -= amount;
  }

  ensure(needed) {
    if (this.y - needed < MARGIN_BOTTOM) this.newPage();
  }

  /** Draw one line of text. Returns the drawn width. */
  draw(
    text,
    { x = MARGIN_X, y = this.y, size = BODY, font = 'regular', align = 'left', color = INK, tracking = 0, link } = {}
  ) {
    const clean = ascii(text);
    const width = measure(clean, size, font) + tracking * clean.length;
    const drawX = align === 'right' ? RIGHT - width : x;
    this.ops.push(
      `BT ${rgb(color)} rg ${FONT_KEY[font]} ${size} Tf ${tracking} Tc ` +
        `1 0 0 1 ${drawX.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdf(clean)}) Tj ET 0 Tc`
    );
    if (drawX + width > RIGHT + 0.5) {
      overflows.push(`${clean.slice(0, 48)} (+${(drawX + width - RIGHT).toFixed(0)}pt)`);
    }
    if (link) {
      this.links.push({
        url: link,
        rect: [drawX - 1, y - 2.5, drawX + width + 1, y + size * 0.86],
      });
    }
    return width;
  }

  /** Filled rectangle, drawn from its lower-left corner. */
  rect(x, y, w, h, color) {
    this.ops.push(`${rgb(color)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }

  /**
   * The Rs mark, drawn onto a box `size` points tall whose lower-left corner sits
   * at (x, y). Authoring coordinates are the SVG's, which run top-down, so y is
   * flipped on the way out.
   *
   * The SVG path is already all lines and cubics with the arcs pre-flattened, so
   * it transfers across one operator at a time. Flat caps, round joins, one colour.
   */
  mark(x, y, size) {
    const s = size / 100; // 100 authoring units of ink height
    const px = (gx) => (x + gx * s).toFixed(2);
    const py = (gy) => (y + (100 - gy) * s).toFixed(2);
    const pt = (gx, gy) => `${px(gx)} ${py(gy)}`;

    this.ops.push(
      'q 0 J 1 j',
      `${(15 * s).toFixed(2)} w`,
      `${rgb(INK)} RG`,
      `${pt(7.5, 92.5)} m`,
      `${pt(7.5, 11.5)} l`,
      `${pt(7.5, 9.291)} ${pt(9.291, 7.5)} ${pt(11.5, 7.5)} c`,
      `${pt(45.0, 7.5)} l`,
      `${pt(50.572, 7.498)} ${pt(55.526, 11.047)} ${pt(57.316, 16.324)} c`,
      `${pt(59.105, 21.601)} ${pt(57.333, 27.432)} ${pt(52.91, 30.82)} c`,
      `${pt(38.05, 42.2)} l`,
      `${pt(36.25, 43.578)} ${pt(35.119, 45.654)} ${pt(34.938, 47.914)} c`,
      `${pt(34.757, 50.173)} ${pt(35.542, 52.403)} ${pt(37.1, 54.05)} c`,
      `${pt(67.54, 86.24)} l`,
      `${pt(71.317, 90.235)} ${pt(76.572, 92.499)} ${pt(82.07, 92.5)} c`,
      `${pt(98.5, 92.5)} l`,
      `${pt(107.198, 92.5)} ${pt(114.25, 85.448)} ${pt(114.25, 76.75)} c`,
      `${pt(114.25, 68.052)} ${pt(107.198, 61.0)} ${pt(98.5, 61.0)} c`,
      `${pt(84.0, 61.0)} l`,
      `${pt(78.753, 61.0)} ${pt(74.5, 56.747)} ${pt(74.5, 51.5)} c`,
      `${pt(74.5, 46.253)} ${pt(78.753, 42.0)} ${pt(84.0, 42.0)} c`,
      `${pt(108.0, 42.0)} l S`,
      'Q'
    );
  }

  rule({ y = this.y, x = MARGIN_X, to = RIGHT, color = RULE, weight = 0.6 } = {}) {
    this.ops.push(
      `${rgb(color)} RG ${weight} w ${x.toFixed(2)} ${y.toFixed(2)} m ${to.toFixed(2)} ${y.toFixed(2)} l S`
    );
  }

  /** Word-wrapped paragraph. */
  paragraph(
    text,
    { size = BODY, font = 'regular', x = MARGIN_X, width = CONTENT_W, leading = LEAD, hang = 0, color = SOFT } = {}
  ) {
    const words = ascii(text).split(/\s+/).filter(Boolean);
    let line = '';
    let first = true;
    const flush = () => {
      const lineX = first ? x : x + hang;
      this.ensure(leading);
      this.draw(line, { x: lineX, size, font, color });
      this.y -= leading;
      first = false;
      line = '';
    };
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      const avail = first ? width : width - hang;
      if (line && measure(candidate, size, font) > avail) {
        flush();
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) flush();
  }

  /**
   * Bold label in a fixed left column, wrapped body beside it. The column keeps
   * every skill row aligned; the colon stays because parsers look for it.
   */
  labelled(label, body, { size = BODY, leading = LEAD, col = 88 } = {}) {
    this.ensure(leading);
    this.draw(`${label}:`, { size, font: 'bold', color: ACCENT_DK });
    this.paragraph(body, { size, x: MARGIN_X + col, width: CONTENT_W - col, leading, color: SOFT });
  }

  bullet(text, { size = BODY, leading = LEAD } = {}) {
    const indent = 12;
    this.ensure(leading);
    // A small accent square reads cleaner in print than Helvetica's bullet.
    this.rect(MARGIN_X + 1.5, this.y + size * 0.28, 3, 3, ACCENT);
    this.paragraph(text, { size, x: MARGIN_X + indent, width: CONTENT_W - indent, leading });
  }

  section(title, { lead = 9 } = {}) {
    this.space(lead);
    this.ensure(34);
    this.draw(title.toUpperCase(), { size: 8.8, font: 'bold', color: INK, tracking: 1.5 });
    this.y -= 5;
    this.rule({ color: RULE });
    this.rule({ to: MARGIN_X + 30, color: ACCENT, weight: 1.4 });
    this.y -= 11;
  }
}

/* ------------------------------------------------------------------ *
 * The document
 * ------------------------------------------------------------------ */

const linkedinShort = personal.social.linkedin
  .replace(/^https?:\/\/(www\.)?/, '')
  .replace(/\/$/, '');
const githubShort = personal.social.github.replace(/^https?:\/\/(www\.)?/, '');
const siteShort = personal.website.replace(/^https?:\/\/(www\.)?/, '');

const doc = new Resume();

/* --- header ---
 * A tinted full-bleed band under an accent rule. Everything inside it is still
 * plain text in reading order (name, role, contacts), so the band is decoration
 * an ATS never has to understand. */
doc.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, BAND);
doc.rect(0, PAGE_H - 3.4, PAGE_W, 3.4, ACCENT);
doc.rule({ y: PAGE_H - HEADER_H, x: 0, to: PAGE_W, color: RULE, weight: 0.7 });

// Mark sits opposite the name, its right edge on the text margin.
doc.mark(RIGHT - 26 * 1.2175, 730, 26);

doc.y = PAGE_H - 36;
const nameW = doc.draw(personal.name, { size: 21, font: 'bold', color: INK, tracking: -0.3 });
doc.draw('.', { x: MARGIN_X + nameW + 1, size: 21, font: 'bold', color: ACCENT });

doc.y -= 15;
const roleW = doc.draw(personal.role.toUpperCase(), {
  size: 9,
  font: 'bold',
  color: ACCENT_DK,
  tracking: 1.1,
});
doc.draw(`|  ${personal.location}`, { x: MARGIN_X + roleW + 9, size: 9, color: MUTE });

doc.y -= 14;

// Contact rows, laid out inline so each URL gets its own clickable rect.
{
  const size = 8.7;
  const rows = [
    [
      { text: personal.email, link: `mailto:${personal.email}` },
      { text: siteShort, link: personal.website },
    ],
    [
      { text: githubShort, link: personal.social.github },
      { text: linkedinShort, link: personal.social.linkedin },
    ],
  ];
  rows.forEach((row, rowIndex) => {
    let x = MARGIN_X;
    row.forEach((piece, i) => {
      if (i > 0) x += doc.draw('  |  ', { x, size, color: MUTE });
      x += doc.draw(piece.text, { x, size, color: SOFT, link: piece.link });
    });
    if (rowIndex < rows.length - 1) doc.y -= 11;
  });
}

doc.y = PAGE_H - HEADER_H - 18;

/* --- summary --- */
doc.section('Summary', { lead: 0 });
doc.paragraph(resume.summary, { color: SOFT });

/* --- skills --- */
doc.section('Technical Skills');
for (const group of resume.skillGroups) {
  doc.labelled(group.label, group.items.join(', '));
}

/* --- experience --- */
doc.section('Work Experience');

const RESUME_ROLES = [
  { company: 'Mando', period: 'Sep 2024 - Present', bullets: 5 },
  { company: 'Quantitative Brokers', period: 'Jul 2022 - Sep 2024', bullets: 4 },
  { company: 'Quantitative Brokers', period: 'May 2021 - Jul 2021', bullets: 2 },
];

for (const wanted of RESUME_ROLES) {
  const role = experience.find((e) => e.company === wanted.company && e.period === wanted.period);
  if (!role) throw new Error(`resume: no experience entry for ${wanted.company} ${wanted.period}`);

  doc.ensure(42);
  doc.draw(role.company, { size: 10.6, font: 'bold', color: INK });
  doc.draw(role.period, { size: 8.6, align: 'right', color: MUTE, tracking: 0.4 });
  doc.y -= 11.5;
  doc.draw(role.role, { size: 9.4, font: 'italic', color: ACCENT_DK });
  doc.draw(role.location, { size: 8.6, align: 'right', color: MUTE });
  doc.y -= 11.5;

  const bullets = (role.resumeHighlights ?? role.highlights).slice(0, wanted.bullets);
  for (const line of bullets) doc.bullet(line);
  doc.y -= 3;
}

doc.paragraph(resume.earlier, { size: 8.8, color: MUTE });

/* --- projects --- */
doc.section('Projects');
for (const project of resume.projects) {
  doc.ensure(36);
  const projectW = doc.draw(project.name, { size: 10, font: 'bold', color: INK });
  if (project.link) {
    doc.draw(project.link, {
      x: MARGIN_X + projectW + 8,
      size: 8.4,
      color: ACCENT_DK,
      link: `https://${project.link}`,
    });
  }
  doc.y -= 11;
  doc.draw(project.stack, { size: 8.8, font: 'italic', color: MUTE });
  doc.y -= 11.5;
  for (const line of project.bullets) doc.bullet(line);
  doc.y -= 3;
}

/* --- education --- */
doc.section('Education');
const edu = education[0];
doc.draw(edu.institution, { size: 10.6, font: 'bold', color: INK });
doc.draw(edu.period, { size: 8.6, align: 'right', color: MUTE, tracking: 0.4 });
doc.y -= 11.5;
doc.draw(edu.degree, { size: 9.4, font: 'italic', color: ACCENT_DK });
doc.draw(`${edu.location}  |  ${edu.grade}`, { size: 8.6, align: 'right', color: MUTE });
doc.y -= 11.5;
doc.labelled(
  'Achievements',
  'All India Rank 2275 in JEE Advanced 2018 (155,000 sat it, from 1.1M+ JEE Main candidates); Rank 5 in Kerala, KEAM 2018.',
  { size: 8.8 }
);

/* ------------------------------------------------------------------ *
 * Serialise
 * ------------------------------------------------------------------ */

function buildPdf(pages) {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length; // 1-indexed object number
  };

  const fontRegular = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const fontBold = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const fontItalic = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

  const pagesId = objects.length + 1;
  add('PLACEHOLDER_PAGES');

  const pageIds = [];
  for (const page of pages) {
    const stream = page.ops.join('\n');
    const contentId = add(`<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);

    const annotIds = page.links.map((link) =>
      add(
        `<< /Type /Annot /Subtype /Link /Rect [${link.rect.map((n) => n.toFixed(2)).join(' ')}] ` +
          `/Border [0 0 0] /A << /S /URI /URI (${escapePdf(link.url)}) >> >>`
      )
    );

    const pageId = add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R /F3 ${fontItalic} 0 R >> >> ` +
        `/Contents ${contentId} 0 R` +
        (annotIds.length ? ` /Annots [${annotIds.map((id) => `${id} 0 R`).join(' ')}]` : '') +
        ' >>'
    );
    pageIds.push(pageId);
  }

  objects[pagesId - 1] =
    `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] >>`;

  const infoId = add(
    `<< /Title (${escapePdf(`${personal.name} - Resume`)}) /Author (${escapePdf(personal.name)}) ` +
      `/Subject (${escapePdf(personal.role)}) ` +
      `/Keywords (${escapePdf(resume.skillGroups.flatMap((g) => g.items).join(', '))}) ` +
      '/Creator (portfolio/scripts/generate-resume.mjs) /Producer (portfolio) >>'
  );
  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R /Lang (en-US) >>`);

  let pdf = '%PDF-1.7\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  pdf +=
    `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\n` +
    `startxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

const buffer = buildPdf(doc.pages);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, buffer);

const lastPage = doc.pages.length;
const used = PAGE_H - MARGIN_TOP - doc.y;
console.log(
  `resume -> ${OUT.replace(`${process.cwd()}/`, '')}  ` +
    `${(buffer.length / 1024).toFixed(1)} KB  ${lastPage} page${lastPage > 1 ? 's' : ''}  ` +
    `(${used.toFixed(0)}pt used on final page, ${(doc.y - MARGIN_BOTTOM).toFixed(0)}pt left)`
);
if (lastPage > 1) console.warn('  note: resume spills past one page - trim bullet counts in RESUME_ROLES');
for (const line of overflows) console.warn(`  overflow: ${line}`);
