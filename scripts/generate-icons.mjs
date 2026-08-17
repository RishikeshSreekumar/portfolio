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
/** One routed stroke, stem foot to the s's flat terminal. Arcs pre-flattened to cubics. */
export const MARK_PATH =
  'M7.5 92.5L7.5 11.5C7.5 9.291 9.291 7.5 11.5 7.5L45 7.5C50.572 7.498 55.526 11.047 57.316 16.324C59.105 21.601 57.333 27.432 52.91 30.82L38.05 42.2C36.25 43.578 35.119 45.654 34.938 47.914C34.757 50.173 35.542 52.403 37.1 54.05L67.54 86.24C71.317 90.235 76.572 92.499 82.07 92.5L98.5 92.5C107.198 92.5 114.25 85.448 114.25 76.75C114.25 68.052 107.198 61 98.5 61L84 61C78.753 61 74.5 56.747 74.5 51.5C74.5 46.253 78.753 42 84 42L108 42';

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
 * dark preview. Supporting greys are the site's ink-soft / ink-mute / grid on the
 * matching side.
 *
 * Menlo, not the site's JetBrains Mono: this is rasterised locally, so it can only
 * use fonts that are certain to be installed. Mono throughout keeps it on message
 * anyway — the card should read like the terminal the site opens with. */
const CARD = {
  light: { ground: GROUND.light, ink: INK.light, soft: '#44483F', mute: '#8B8F84', faint: '#A9AEA3', grid: 'rgba(12,14,11,0.05)' },
  dark: { ground: GROUND.dark, ink: INK.dark, soft: '#A8B1A5', mute: '#6D766C', faint: '#4A524A', grid: 'rgba(233,238,232,0.035)' },
};

function ogCard() {
  const side = theme.mode === 'light' ? 'light' : 'dark';
  const c = CARD[side];
  const accent = activeAccent()[side];
  const W = 1200;
  const H = 630;
  const grid = [];
  for (let x = 0; x <= W; x += 40) grid.push(`M${x} 0V${H}`);
  for (let y = 0; y <= H; y += 40) grid.push(`M0 ${y}H${W}`);

  const markH = 92;
  const markW = (markH * MARK_W) / MARK_H;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${c.ground}"/>
  <path d="${grid.join('')}" stroke="${c.grid}" stroke-width="1" fill="none"/>
  <rect x="0" y="0" width="${W}" height="5" fill="${accent.base}"/>

  ${mark({ ink: c.ink, accent: accent.base }, { x: 72, y: 66, w: markW.toFixed(1), h: markH })}
  <text x="${(72 + markW + 26).toFixed(0)}" y="127" font-family="Menlo" font-size="26" fill="${c.mute}">rishikesh.s</text>

  <text x="72" y="340" font-family="Menlo" font-weight="bold" font-size="78" fill="${c.ink}">Rishikesh S<tspan fill="${accent.base}">.</tspan></text>
  <rect x="72" y="372" width="108" height="4" fill="${accent.base}"/>

  <text x="72" y="424" font-family="Menlo" font-weight="bold" font-size="22" letter-spacing="2.4" fill="${accent.deep}">FOUNDING SOFTWARE ENGINEER</text>
  <text x="72" y="462" font-family="Menlo" font-size="22" fill="${c.soft}">Mando  ·  ex-Quantitative Brokers  ·  IIT Madras</text>

  <text x="72" y="546" font-family="Menlo" font-size="20" fill="${c.mute}"><tspan fill="${accent.base}">&gt;</tspan> ships products end to end — the API, the interface, everything between</text>
  <text x="${W - 72}" y="590" text-anchor="end" font-family="Menlo" font-size="18" fill="${c.faint}">rishikeshsreekumar.github.io</text>
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
