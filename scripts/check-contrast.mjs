#!/usr/bin/env node
/**
 * WCAG contrast check for every accent palette, both sides.
 *
 * Accents are used as body-adjacent text (section labels, links, the role line)
 * and as the fill behind button text, so each palette has to clear AA in three
 * places per side. Run it after editing src/data/theme.js:
 *
 *   node scripts/check-contrast.mjs
 *
 * Exits non-zero on a failure so it can go in front of a commit.
 */

import { ACCENTS, GROUND } from '../src/data/theme.js';

const AA = 4.5;

const channel = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const failures = [];
const rows = [];

for (const [name, palette] of Object.entries(ACCENTS)) {
  for (const side of ['light', 'dark']) {
    const { base, deep, on } = palette[side];
    const ground = GROUND[side];
    const checks = {
      'base on page': ratio(base, ground),
      'deep on page': ratio(deep, ground),
      'text on base': ratio(on, base),
    };
    for (const [what, value] of Object.entries(checks)) {
      if (value < AA) failures.push(`${name}/${side}: ${what} is ${value.toFixed(2)}:1`);
    }
    rows.push([`${name}/${side}`, ...Object.values(checks).map((v) => v.toFixed(2))]);
  }
}

const pad = Math.max(...rows.map((r) => r[0].length));
console.log(`${'palette'.padEnd(pad)}   base   deep   text`);
for (const [label, ...values] of rows) {
  console.log(`${label.padEnd(pad)}  ${values.map((v) => v.padStart(5)).join('  ')}`);
}

if (failures.length) {
  console.error(`\n${failures.length} below AA (${AA}:1):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`\nAll ${Object.keys(ACCENTS).length} palettes clear AA on both sides.`);
