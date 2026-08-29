#!/usr/bin/env node
/**
 * Brand asset generator.
 *
 * The mark is "Rs" routed as a single constant-width stroke: up the stem, along
 * the arm, around the hook, back down the diagonal to the waist, out along the leg
 * and straight on into the s, which is a serpentine of two half-turns. Every bend
 * is a true fillet, every terminal is cut flat, and the whole thing is one colour.
 *
 * The path is all lines and cubics — no arc operator — so the same geometry drops
 * straight into the PDF as well as the SVG.
 *
 * The viewBox IS the mark's bounding box, origin included, so the ink touches all
 * four edges and callers control size with nothing but width/height.
 *
 * Not part of `npm run build` — rsvg-convert is a local-only dependency
 * (`brew install librsvg`), so the generated files are committed instead.
 *
 *   node scripts/generate-icons.mjs
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

import { activeAccent, theme, GROUND, INK } from '../src/data/theme.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

/* ------------------------------------------------------------------ *
 * The mark
 * ------------------------------------------------------------------ */

export const MARK_VIEWBOX = '0 0 121.75 100';
export const MARK_W = 121.75;
export const MARK_H = 100;
export const MARK_WEIGHT = 15;
/** One routed stroke, stem foot to the s's flat terminal. The s's two half-turns
 * are semicircles on one 12.625 radius, each flattened to a pair of quarter cubics
 * so the mark transfers to the PDF one operator at a time. */
export const MARK_PATH =
  'M7.5 92.5L7.5 11.5C7.5 9.291 9.291 7.5 11.5 7.5L45 7.5C50.572 7.498 55.526 11.047 57.316 16.324C59.105 21.601 57.333 27.432 52.91 30.82L38.05 42.2C36.25 43.578 35.119 45.654 34.938 47.914C34.757 50.173 35.542 52.403 37.1 54.05L67.54 86.24C71.317 90.235 76.572 92.499 82.07 92.5L98.5 92.5C105.473 92.5 111.125 86.848 111.125 79.875C111.125 72.902 105.473 67.25 98.5 67.25L84 67.25C77.027 67.25 71.375 61.598 71.375 54.625C71.375 47.652 77.027 42 84 42L108 42';

const LIGHT = { ink: INK.light, accent: activeAccent().light.base, bg: GROUND.light };
const DARK = { ink: INK.dark, accent: activeAccent().dark.base, bg: GROUND.dark };

/** The mark in its own viewport, so callers can place it without doing maths. */
const mark = ({ ink }, { x = 0, y = 0, w = MARK_W, h = MARK_H } = {}) =>
  `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${MARK_VIEWBOX}">` +
  `<path d="${MARK_PATH}" fill="none" stroke="${ink}" stroke-width="${MARK_WEIGHT}"` +
  ` stroke-linecap="butt" stroke-linejoin="round"/>` +
  `</svg>`;

/** Standalone file: the viewBox is the mark's own bounding box. */
const glyph = (theme) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">${mark(theme)}</svg>`;

/**
 * Mark centred on its own ground. `pad` is breathing room on the wide axis, so
 * a bigger pad means a smaller mark — that is the lever the maskable icon pulls
 * to stay inside Android's safe zone.
 */
const tile = ({ ink, accent, bg }, { pad = 26, radiusRatio = 0.22 } = {}) => {
  const side = MARK_W + pad * 2;
  const top = (side - MARK_H) / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}">` +
    `<rect width="${side}" height="${side}" rx="${(side * radiusRatio).toFixed(2)}" fill="${bg}"/>` +
    mark({ ink, accent }, { x: pad, y: top.toFixed(2) }) +
    `</svg>`
  );
};

/* ------------------------------------------------------------------ *
 * Rasterising
 * ------------------------------------------------------------------ */

function png(svg, width, height = width) {
  const tmp = join(tmpdir(), `mark-${process.pid}-${width}x${height}.svg`);
  writeFileSync(tmp, svg);
  try {
    execFileSync('rsvg-convert', ['-w', String(width), '-h', String(height), '-o', `${tmp}.png`, tmp]);
    return readFileSync(`${tmp}.png`);
  } finally {
    unlinkSync(tmp);
    try {
      unlinkSync(`${tmp}.png`);
    } catch {}
  }
}

/** Pack PNGs into an .ico. Every target browser reads PNG-in-ICO. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;
  images.forEach(({ size, buf }, i) => {
    const e = dir.subarray(i * 16, i * 16 + 16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
  });

  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

/* ------------------------------------------------------------------ *
 * The share card
 * ------------------------------------------------------------------ */

/* The card follows the site's own mode, so a light-only site does not hand out a
 * dark preview. Supporting greys are the site's ink-soft / ink-mute on the
 * matching side.
 *
 * Helvetica throughout — bold and tightly tracked for the name: rasterised
 * locally, so it can only use fonts certain to be installed, and that is the
 * closest stand-in for the site's Bricolage Grotesque and Public Sans. A serif
 * here would promise a page that no longer exists. The ruled ground is gone for
 * the same reason it is gone from the page. */
const CARD = {
  light: { ground: GROUND.light, ink: INK.light, soft: '#4A483F', mute: '#75736A', faint: '#9B988D' },
  dark: { ground: GROUND.dark, ink: INK.dark, soft: '#ADA99C', mute: '#8C897F', faint: '#5A5850' },
};

function ogCard() {
  const side = theme.mode === 'light' ? 'light' : 'dark';
  const c = CARD[side];
  const accent = activeAccent()[side];
  const W = 1200;
  const H = 630;

  const markH = 92;
  const markW = (markH * MARK_W) / MARK_H;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${c.ground}"/>
  <rect x="0" y="0" width="${W}" height="5" fill="${accent.base}"/>

  ${mark({ ink: c.ink, accent: accent.base }, { x: 72, y: 66, w: markW.toFixed(1), h: markH })}
  <text x="${(72 + markW + 26).toFixed(0)}" y="127" font-family="Helvetica" font-size="25" fill="${c.mute}">rishikesh.s</text>

  <text x="72" y="340" font-family="Helvetica" font-weight="bold" letter-spacing="-3.4" font-size="88" fill="${c.ink}">Rishikesh S<tspan fill="${accent.base}">.</tspan></text>
  <rect x="72" y="376" width="108" height="3" fill="${accent.base}"/>

  <text x="72" y="428" font-family="Helvetica" font-size="24" fill="${accent.deep}">Founding Software Engineer</text>
  <text x="72" y="466" font-family="Helvetica" font-size="22" fill="${c.soft}">Mando  ·  ex-Quantitative Brokers  ·  IIT Madras</text>

  <text x="72" y="548" font-family="Helvetica" font-size="20" fill="${c.mute}">Ships products end to end — the API, the interface, everything between</text>
  <text x="${W - 72}" y="590" text-anchor="end" font-family="Helvetica" font-size="18" fill="${c.faint}">rishikeshs.dev</text>
</svg>`;
}

/* ------------------------------------------------------------------ *
 * Output
 * ------------------------------------------------------------------ */

/** Scalable favicon: transparent, and it follows the tab strip's theme. */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">
  <style>
    .ink { stroke: ${LIGHT.ink} }
    @media (prefers-color-scheme: dark) {
      .ink { stroke: ${DARK.ink} }
    }
  </style>
  <path class="ink" d="${MARK_PATH}" fill="none" stroke-width="${MARK_WEIGHT}" stroke-linecap="butt" stroke-linejoin="round"/>
</svg>
`;

const written = [];
const emit = (name, data) => {
  writeFileSync(join(PUBLIC, name), data);
  written.push([name, typeof data === 'string' ? Buffer.byteLength(data) : data.length]);
};

emit('favicon.svg', faviconSvg);
emit('logo.svg', glyph(LIGHT));
emit('logo-dark.svg', glyph(DARK));

// Dark tile everywhere an icon needs its own ground: it holds up on the light
// and dark home screens alike, where a light tile disappears into one of them.
const darkInk = { ink: DARK.ink, accent: DARK.accent, bg: LIGHT.ink };
const darkTile = tile(darkInk);
emit('apple-touch-icon.png', png(darkTile, 180));
emit('icon-192.png', png(darkTile, 192));
emit('icon-512.png', png(darkTile, 512));
emit('avatar.png', png(darkTile, 512));
emit('favicon.ico', ico([16, 32, 48].map((size) => ({ size, buf: png(darkTile, size) }))));

// Maskable: square to the edge, since the launcher supplies the corner shape,
// and padded until the mark's diagonal clears the 80% safe circle.
emit('icon-maskable-512.png', png(tile(darkInk, { pad: 40, radiusRatio: 0 }), 512));

emit('og-image.png', png(ogCard(), 1200, 630));

const pad = Math.max(...written.map(([n]) => n.length));
for (const [name, bytes] of written) {
  console.log(`  ${name.padEnd(pad)}  ${(bytes / 1024).toFixed(1)} kB`);
}
console.log(`\n${written.length} brand assets written to public/`);
