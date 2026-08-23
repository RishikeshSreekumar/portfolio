/**
 * Project card previews.
 *
 * Drives a headless Chrome over the DevTools protocol, photographs each project
 * at a fixed 1440×900 viewport at 2× and writes a 1200×750 WebP into
 * `public/previews/`. The cards render those shots desaturated and let them
 * bloom back to full colour on hover, so the source frame has to be a real,
 * loaded page — not a hero with nothing in it yet.
 *
 * The captures are committed, the same way the icons and the resume PDF are:
 * a deploy must never depend on someone else's site being up.
 *
 *   node scripts/generate-previews.mjs            # everything reachable
 *   node scripts/generate-previews.mjs flute      # one target, by id
 *
 * `local: true` targets need their dev server running first — the script says
 * which one and skips rather than writing a blank frame.
 */

import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'previews');

/**
 * One entry per card that shows a photograph.
 *
 * `scroll` is a CSS pixel offset applied before the shot — a scroll-driven page
 * has nothing to show at the top. `settle` is the wait after load in ms, for
 * fonts, entrance animations and canvases that draw a frame late. `steps` are
 * clicks dispatched as real mouse events before the shot, each matching a button
 * by a regular expression over its text — an onboarding gate photographs as a
 * blurred modal otherwise.
 */
const TARGETS = [
  {
    id: 'flute',
    url: 'http://localhost:5181/',
    local: 'cd ~/Documents/workspace/flute && npm run dev -- --port 5181',
    settle: 2600,
  },
  {
    id: 'fanpark',
    url: 'https://fanpark.vercel.app',
    // First run gates the whole dashboard behind a team picker, and a blurred
    // modal is not a portfolio preview. Pick a team, then photograph the app.
    // Two gates: the team picker, then a five-card product tour.
    steps: [{ click: '^CSCSK$' }, { click: '^Go with', settle: 2500 }, { click: '^Skip$', settle: 2000 }],
    settle: 4500,
  },
  {
    id: 'marvel-nexus',
    url: 'https://marvel.rishikeshs.dev',
    settle: 3000,
  },
  {
    id: 'rubiks-cube-solver',
    url: 'http://localhost:5182/',
    local: 'cd ~/Documents/workspace/rubiks-cube-solver && npm run dev -- --port 5182',
    settle: 3200,
  },
  {
    id: 'chilli',
    url: 'https://chilli.rishikeshs.dev',
    // The scale is scroll-driven: the top of the page is a title on paper, and
    // the pod only has colour once you are some way up the Scoville run.
    scroll: 5200,
    settle: 3200,
  },
];

const VIEWPORT = { width: 1440, height: 900, scale: 2 };
const OUTPUT = { width: 1200, height: 750, quality: 82 };

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
].find((p) => {
  try {
    execFileSync('test', ['-x', p]);
    return true;
  } catch {
    return false;
  }
});

if (!CHROME) {
  console.error('No Chrome or Chromium found. Install one, or capture the frames by hand.');
  process.exit(1);
}

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const wanted = only.length ? TARGETS.filter((t) => only.includes(t.id)) : TARGETS;
if (!wanted.length) {
  console.error(`No target matches ${only.join(', ')}. Known: ${TARGETS.map((t) => t.id).join(', ')}`);
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- a very small DevTools protocol client ---------- */

class Session {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      const waiter = this.pending.get(msg.id);
      if (!waiter) return;
      this.pending.delete(msg.id);
      msg.error ? waiter.reject(new Error(msg.error.message)) : waiter.resolve(msg.result);
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`${method} timed out`));
      }, 45000);
    });
  }

  close() {
    this.ws.close();
  }
}

async function connect(url) {
  const ws = new WebSocket(url);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error(`cannot reach ${url}`)), { once: true });
  });
  return new Session(ws);
}

async function reachable(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(8000) });
    return res.ok;
  } catch {
    return false;
  }
}

/* ---------- capture ---------- */

const profile = mkdtempSync(path.join(tmpdir(), 'preview-chrome-'));
const staging = mkdtempSync(path.join(tmpdir(), 'preview-frames-'));
const port = 9333;

/**
 * Chrome keeps writing into its profile for a moment after SIGTERM, so a plain
 * rmSync loses a race with it and takes the whole run down at the last line.
 */
async function cleanup() {
  chrome.kill();
  await sleep(400);
  for (const dir of [profile, staging]) {
    try {
      rmSync(dir, { recursive: true, force: true, maxRetries: 12, retryDelay: 250 });
    } catch {
      /* a temp directory left behind is not worth failing the run over */
    }
  }
}

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--hide-scrollbars',
  '--force-color-profile=srgb',
  '--disable-features=CalculateNativeWinOcclusion',
  'about:blank',
], { stdio: 'ignore' });

let browserWs = null;
for (let i = 0; i < 60 && !browserWs; i++) {
  await sleep(250);
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/version`);
    browserWs = (await res.json()).webSocketDebuggerUrl;
  } catch {
    /* not listening yet */
  }
}
if (!browserWs) {
  await cleanup();
  console.error('Chrome never opened its debugging port.');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const browser = await connect(browserWs);
const written = [];
const skipped = [];

for (const target of wanted) {
  if (!(await reachable(target.url))) {
    skipped.push(target);
    console.warn(
      `· ${target.id} — ${target.url} did not answer.` +
        (target.local ? `\n    start it first:  ${target.local}` : ''),
    );
    continue;
  }

  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const page = await connect(`ws://127.0.0.1:${port}/devtools/page/${targetId}`);

  try {
    await page.send('Emulation.setDeviceMetricsOverride', {
      width: VIEWPORT.width,
      height: VIEWPORT.height,
      deviceScaleFactor: VIEWPORT.scale,
      mobile: false,
    });
    await page.send('Page.enable');
    await page.send('Runtime.enable');
    await page.send('Page.navigate', { url: target.url });

    // Poll for the document to finish rather than racing a lifecycle event: some
    // of these pages hydrate an island well after `load`.
    for (let i = 0; i < 60; i++) {
      await sleep(250);
      const { result } = await page.send('Runtime.evaluate', {
        expression: 'document.readyState',
        returnByValue: true,
      });
      if (result.value === 'complete') break;
    }

    for (const step of target.steps ?? []) {
      const { result } = await page.send('Runtime.evaluate', {
        expression:
          `(() => {` +
          `const b = [...document.querySelectorAll('button, a[role="button"]')]` +
          `  .find((x) => new RegExp(${JSON.stringify(step.click)}).test(x.textContent.trim()));` +
          `if (!b || b.disabled) return null;` +
          `const r = b.getBoundingClientRect();` +
          `return { x: r.x + r.width / 2, y: r.y + r.height / 2 };` +
          `})()`,
        returnByValue: true,
      });
      if (!result.value) {
        console.warn(`  ${target.id}: no enabled control matched /${step.click}/ — the page may have changed`);
        continue;
      }
      for (const type of ['mousePressed', 'mouseReleased']) {
        await page.send('Input.dispatchMouseEvent', {
          type,
          x: result.value.x,
          y: result.value.y,
          button: 'left',
          clickCount: 1,
        });
      }
      await sleep(step.settle ?? 1200);
    }

    if (target.scroll) {
      await page.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${target.scroll}, behavior: 'instant' })`,
      });
      await sleep(1200);
    }

    await sleep(target.settle ?? 2000);

    // A caret blinking in a focused field photographs as a stray dark bar.
    await page.send('Runtime.evaluate', {
      expression: 'document.activeElement && document.activeElement.blur && document.activeElement.blur()',
    });

    const shot = await page.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
      clip: { x: 0, y: target.scroll ?? 0, width: VIEWPORT.width, height: VIEWPORT.height, scale: VIEWPORT.scale },
    });

    const raw = path.join(staging, `${target.id}.png`);
    writeFileSync(raw, Buffer.from(shot.data, 'base64'));

    const out = path.join(outDir, `${target.id}.webp`);
    execFileSync('cwebp', [
      '-quiet',
      '-q', String(OUTPUT.quality),
      '-resize', String(OUTPUT.width), String(OUTPUT.height),
      raw,
      '-o', out,
    ]);

    written.push(target.id);
    console.log(`✓ ${target.id} → public/previews/${target.id}.webp`);
  } catch (err) {
    skipped.push(target);
    console.warn(`· ${target.id} — ${err.message}`);
  } finally {
    page.close();
    await browser.send('Target.closeTarget', { targetId }).catch(() => {});
  }
}

browser.close();
await cleanup();

console.log(`\n${written.length} written, ${skipped.length} skipped.`);
process.exit(skipped.length && !written.length ? 1 : 0);
