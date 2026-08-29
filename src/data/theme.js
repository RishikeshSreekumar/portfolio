/**
 * Accent palettes and theme mode — the one place the site's colour identity is set.
 *
 * Plain JS (not TS) so the icon and resume generators can import it under plain
 * Node, the same arrangement `content.js` uses. Changing `theme` below changes the
 * site, the favicon, the app icons, the share card and the resume PDF together;
 * re-run `node scripts/generate-icons.mjs` and `npm run resume` to rebuild the
 * files that are committed rather than compiled.
 *
 * Every palette carries its own light and dark values. `base` is the accent,
 * `deep` is the hover/secondary step, and `on` is text drawn on top of `base`.
 * The washes are mixed from `base` in CSS, so a palette never has to spell them
 * out. Each pair below clears WCAG AA against its own background — see
 * scripts/check-contrast.mjs, which fails the build of your patience if one doesn't.
 */

export const ACCENTS = {
  signal: {
    label: 'Signal green',
    light: { base: '#0F7A46', deep: '#0B5C34', on: '#FFFFFF' },
    dark: { base: '#2FBF71', deep: '#6FD08C', on: '#12120F' },
  },
  cobalt: {
    label: 'Cobalt',
    light: { base: '#1B5FD9', deep: '#1449AE', on: '#FFFFFF' },
    dark: { base: '#5C9DFF', deep: '#93BDFF', on: '#12120F' },
  },
  cyan: {
    label: 'Deep cyan',
    light: { base: '#06767F', deep: '#055C63', on: '#FFFFFF' },
    dark: { base: '#2DD4BF', deep: '#6EE7D7', on: '#12120F' },
  },
  violet: {
    label: 'Violet',
    light: { base: '#5B34D6', deep: '#4626AB', on: '#FFFFFF' },
    dark: { base: '#A78BFA', deep: '#C4B5FD', on: '#12120F' },
  },
  magenta: {
    label: 'Magenta',
    light: { base: '#B32777', deep: '#8E1F5E', on: '#FFFFFF' },
    dark: { base: '#F472B6', deep: '#F9A8D4', on: '#12120F' },
  },
  ember: {
    label: 'Ember',
    light: { base: '#B84A0A', deep: '#9B400A', on: '#FFFFFF' },
    dark: { base: '#FF8A4C', deep: '#FFB088', on: '#12120F' },
  },
  crimson: {
    label: 'Crimson',
    light: { base: '#C42B3F', deep: '#9D2232', on: '#FFFFFF' },
    dark: { base: '#FF6B7A', deep: '#FF9AA4', on: '#12120F' },
  },
  gold: {
    label: 'Gold',
    light: { base: '#8B5F00', deep: '#785400', on: '#FFFFFF' },
    dark: { base: '#E3B341', deep: '#EFCC77', on: '#12120F' },
  },
  oxford: {
    label: 'Oxford blue',
    light: { base: '#1F4B99', deep: '#16386F', on: '#FFFFFF' },
    dark: { base: '#7FA9EE', deep: '#A9C6F7', on: '#12120F' },
  },
  mono: {
    label: 'Mono (no hue)',
    light: { base: '#191813', deep: '#4A483F', on: '#FFFFFF' },
    dark: { base: '#EDEAE1', deep: '#ADA99C', on: '#12120F' },
  },
};

export const theme = {
  /** Which palette above the site ships with. */
  accent: 'oxford',

  /**
   * 'auto'  — follow the OS, remember the visitor's toggle, show the toggle button.
   * 'light' — light only. No toggle, no OS query, no stored preference.
   * 'dark'  — dark only, same deal.
   *
   * Pinned to light. The dark half of every palette is still defined above and the
   * dark blocks are still in global.css: the icon generator uses the dark values
   * for the app tile. Flipping this back to 'auto' restores the toggle with
   * nothing else to change.
   */
  mode: 'light',
};

/** Page background per side, so generators and <meta theme-color> agree with the CSS. */
export const GROUND = { light: '#F6F3EC', dark: '#12120F' };
/** Body ink per side. */
export const INK = { light: '#17160F', dark: '#EDEAE1' };

export const activeAccent = () => ACCENTS[theme.accent] ?? ACCENTS.signal;
