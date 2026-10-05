// lib/shareCard.ts
//
// Draws the shareable "result card" (a PNG) for any calculator result, in the
// spirit of a Strava activity card: a bold number, a few supporting figures,
// the calculator's own accent colour and a "calculate yours free" footer with
// the page link. Everything is drawn on a <canvas> in the visitor's browser,
// so the numbers they typed never leave their device and no server or image
// service is involved.
//
// Two shapes: "story" (1080x1920, for Instagram/WhatsApp/Facebook Stories and
// Reels covers) and "square" (1080x1080, for feeds, X and LinkedIn).

import { toFirstPerson } from "./shareHeadline";

export type CardFormat = "story" | "square";

export interface ShareCardRow {
  label: string;
  value: string;
}

export interface ShareCardData {
  calcName: string;
  calcIcon: string;
  /** Hex colour like #3b82f6 - the calculator's own colour from the registry. */
  accent: string;
  /** Short uppercase-able category, e.g. "Health & Wellness". */
  categoryLabel: string;
  /** e.g. "Your BMI" - the label above the big number. */
  label: string;
  /** The big number, e.g. "22.9". */
  value: string;
  unit?: string;
  rows: ShareCardRow[];
  /** Optional celebratory line shown at the top of the card, e.g. "I'm in the healthy weight range! 🎉". */
  headline?: string;
  /** Page the card links to, shown at the bottom (no https://). */
  displayUrl: string;
}

const SANS = '"Sora", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

export function sizeFor(format: CardFormat): { w: number; h: number } {
  return format === "story" ? { w: 1080, h: 1920 } : { w: 1080, h: 1080 };
}

// ---------------------------------------------------------------- colour --

function parseHex(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [59, 130, 246];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(rgb: [number, number, number], a: number): string {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
}

function mix(rgb: [number, number, number], target: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(rgb[0] + (target[0] - rgb[0]) * t),
    Math.round(rgb[1] + (target[1] - rgb[1]) * t),
    Math.round(rgb[2] + (target[2] - rgb[2]) * t),
  ];
}

// ---------------------------------------------------------------- drawing --

type Ctx = CanvasRenderingContext2D;

function roundRectPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.arcTo(x + w, y, x + w, y + rr, rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.lineTo(x + rr, y + h);
  ctx.arcTo(x, y + h, x, y + h - rr, rr);
  ctx.lineTo(x, y + rr);
  ctx.arcTo(x, y, x + rr, y, rr);
  ctx.closePath();
}

/** Shrinks the font until `text` fits `maxWidth`; returns the font size used. */
function fitFont(ctx: Ctx, text: string, family: string, weight: number, maxSize: number, minSize: number, maxWidth: number): number {
  let size = maxSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 4;
  }
  ctx.font = `${weight} ${size}px ${family}`;
  return size;
}

/** Cuts text with an ellipsis so it fits `maxWidth` in the current font. */
function ellipsize(ctx: Ctx, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > maxWidth) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

/** Draws text with manual letter-spacing (canvas letterSpacing is not in every browser). */
function spaced(ctx: Ctx, text: string, x: number, y: number, spacing: number, align: "left" | "center" = "left") {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width + spacing);
  const total = widths.reduce((a, b) => a + b, 0) - spacing;
  let cx = align === "center" ? x - total / 2 : x;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y);
    cx += widths[i];
  });
  ctx.textAlign = prevAlign;
}

function drawBackground(ctx: Ctx, w: number, h: number, accent: [number, number, number]) {
  const base = ctx.createLinearGradient(0, 0, w * 0.6, h);
  base.addColorStop(0, "#0a0f1f");
  base.addColorStop(0.55, rgba(mix([10, 15, 31], accent, 0.28), 1));
  base.addColorStop(1, "#070a14");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // Big soft glow, top right
  const glow = ctx.createRadialGradient(w * 0.9, h * 0.08, 0, w * 0.9, h * 0.08, w * 0.85);
  glow.addColorStop(0, rgba(accent, 0.55));
  glow.addColorStop(1, rgba(accent, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Second glow, bottom left, in a lighter tint
  const tint = mix(accent, [255, 255, 255], 0.35);
  const glow2 = ctx.createRadialGradient(w * 0.05, h * 0.95, 0, w * 0.05, h * 0.95, w * 0.8);
  glow2.addColorStop(0, rgba(tint, 0.28));
  glow2.addColorStop(1, rgba(tint, 0));
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, w, h);

  // Dot grid texture
  ctx.fillStyle = "rgba(255,255,255,0.055)";
  const gap = 44;
  for (let y = gap; y < h; y += gap) {
    for (let x = gap; x < w; x += gap) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawBrand(ctx: Ctx, x: number, y: number, accent: [number, number, number]) {
  // Logo mark: rounded square with a stylised "n"
  const s = 64;
  const grad = ctx.createLinearGradient(x, y, x + s, y + s);
  grad.addColorStop(0, rgba(mix(accent, [255, 255, 255], 0.35), 1));
  grad.addColorStop(1, rgba(accent, 1));
  ctx.fillStyle = grad;
  roundRectPath(ctx, x, y, s, s, 18);
  ctx.fill();
  ctx.fillStyle = "#0a0f1f";
  ctx.font = `800 40px ${SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("n", x + s / 2, y + 47);

  ctx.fillStyle = "#ffffff";
  ctx.font = `700 40px ${SANS}`;
  ctx.textAlign = "left";
  ctx.fillText("numrexo", x + s + 18, y + 46);
}

function drawPill(ctx: Ctx, text: string, icon: string, x: number, y: number, accent: [number, number, number], maxW: number): number {
  ctx.font = `600 30px ${SANS}`;
  const label = ellipsize(ctx, text, maxW - 130);
  const textW = ctx.measureText(label).width;
  const w = textW + 110;
  const h = 68;
  ctx.fillStyle = rgba(accent, 0.2);
  roundRectPath(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.strokeStyle = rgba(mix(accent, [255, 255, 255], 0.4), 0.55);
  ctx.lineWidth = 2;
  roundRectPath(ctx, x, y, w, h, h / 2);
  ctx.stroke();
  ctx.font = `32px ${EMOJI}`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.fillText(icon || "🧮", x + 26, y + 46);
  ctx.font = `600 30px ${SANS}`;
  ctx.fillText(label, x + 76, y + 45);
  return w;
}

function drawRing(ctx: Ctx, cx: number, cy: number, r: number, accent: [number, number, number]) {
  // Decorative "progress" ring behind the number - purely visual, it does not
  // encode the value.
  ctx.lineCap = "round";
  ctx.lineWidth = 22;
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, rgba(mix(accent, [255, 255, 255], 0.55), 1));
  g.addColorStop(1, rgba(accent, 1));
  ctx.strokeStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI * 0.62, Math.PI * 0.55);
  ctx.stroke();

  // small glowing dot at the end of the arc
  const ex = cx + r * Math.cos(Math.PI * 0.55);
  const ey = cy + r * Math.sin(Math.PI * 0.55);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(ex, ey, 11, 0, Math.PI * 2);
  ctx.fill();
}

// ------------------------------------------------------------------ main --

export async function renderShareCard(data: ShareCardData, format: CardFormat): Promise<HTMLCanvasElement> {
  const { w, h } = sizeFor(format);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser");

  // Make sure the site fonts are ready so the card matches the website.
  try {
    await (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready;
  } catch {
    /* fall back to system fonts */
  }

  const accent = parseHex(data.accent);
  const story = format === "story";
  const pad = 80;

  drawBackground(ctx, w, h, accent);

  // ---- header
  drawBrand(ctx, pad, story ? 90 : 64, accent);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `500 26px ${SANS}`;
  ctx.textAlign = "right";
  const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date());
  ctx.fillText(date, w - pad, (story ? 90 : 64) + 44);

  drawPill(ctx, data.calcName, data.calcIcon, pad, story ? 200 : 168, accent, w - pad * 2);

  // ---- glass card
  const cardTop = story ? 330 : 262;
  const cardBottom = story ? h - 420 : h - 232;
  const cardH = cardBottom - cardTop;
  const cardW = w - pad * 2;
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  roundRectPath(ctx, pad, cardTop, cardW, cardH, 56);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  roundRectPath(ctx, pad, cardTop, cardW, cardH, 56);
  ctx.stroke();

  const innerPad = 64;
  const innerW = cardW - innerPad * 2;
  const headH = data.headline ? (story ? 196 : 118) : 0;

  // ---- celebratory headline (only when the calculator provides one)
  if (data.headline) {
    const hFont = `800 ${story ? 62 : 46}px ${SANS}, ${EMOJI}`;
    ctx.font = hFont;
    const maxLine = innerW;
    const words = data.headline.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const wd of words) {
      const test = cur ? `${cur} ${wd}` : wd;
      if (ctx.measureText(test).width <= maxLine || !cur) cur = test;
      else {
        lines.push(cur);
        cur = wd;
      }
    }
    if (cur) lines.push(cur);
    const shown = lines.slice(0, 2);
    const lh = story ? 74 : 54;
    const blockH = shown.length * lh;
    const startY = cardTop + 30 + (headH - blockH) / 2 + lh * 0.78;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    shown.forEach((ln, i) => ctx.fillText(ln, w / 2, startY + i * lh));
    // thin accent underline
    ctx.fillStyle = rgba(accent, 0.85);
    roundRectPath(ctx, w / 2 - 60, cardTop + 30 + headH - 8, 120, 6, 3);
    ctx.fill();
  }
  // With a headline on the card there is less room, so show fewer supporting rows.
  const rows = data.rows.slice(0, data.headline ? (story ? 3 : 2) : story ? 4 : 3);
  const rowH = story ? 92 : 76;
  const rowsBlockH = rows.length ? rows.length * rowH + 20 : 0;

  // Ring + number zone sits in the space above the rows.
  const zoneTop = cardTop + 30 + headH;
  const zoneBottom = cardBottom - rowsBlockH - 20;
  const zoneH = zoneBottom - zoneTop;
  const cx = w / 2;
  const cy = zoneTop + zoneH / 2;
  const ringR = Math.min(zoneH / 2 - 24, (cardW - 160) / 2, story ? 330 : 190);
  // Skip the ring when the number is too long to sit inside it.
  ctx.font = `700 44px ${MONO}`;
  const hasRing = ringR > 120 && ctx.measureText(data.value).width <= ringR * 1.55;
  if (hasRing) drawRing(ctx, cx, cy, ringR, accent);

  // The label / number / unit stack, centred as one block in the zone (and
  // inside the ring when there is one) so the three can never collide.
  const stackMaxW = hasRing ? ringR * 1.55 : innerW;
  const labelPx = story ? 30 : 24;
  const gapA = story ? 38 : 34;
  const gapB = story ? 26 : 20;
  const unitPx = story ? 34 : 28;
  const numSize = fitFont(ctx, data.value, MONO, 700, story ? 190 : 116, 44, stackMaxW);
  const numH = numSize * 0.8; // digit height plus a little air
  const stackH = labelPx + gapA + numH + (data.unit ? gapB + unitPx : 0);
  const top = cy - stackH / 2;

  // label (letter-spaced caps), shrunk to fit
  const labelText = toFirstPerson(data.label).toUpperCase().slice(0, 40);
  let lSize = labelPx;
  const spacing = 4;
  const spacedWidth = (size: number) => {
    ctx.font = `600 ${size}px ${SANS}`;
    return Array.from(labelText).reduce((acc, c) => acc + ctx.measureText(c).width + spacing, -spacing);
  };
  while (lSize > 16 && spacedWidth(lSize) > stackMaxW) lSize -= 2;
  ctx.font = `600 ${lSize}px ${SANS}`;
  ctx.fillStyle = rgba(mix(accent, [255, 255, 255], 0.65), 1);
  ctx.textAlign = "center";
  spaced(ctx, labelText, cx, top + labelPx - 2, spacing, "center");

  // the big number
  const numCy = top + labelPx + gapA + numH / 2;
  ctx.font = `700 ${numSize}px ${MONO}`;
  const numGrad = ctx.createLinearGradient(cx - stackMaxW / 2, numCy - numSize, cx + stackMaxW / 2, numCy + numSize);
  numGrad.addColorStop(0, "#ffffff");
  numGrad.addColorStop(1, rgba(mix(accent, [255, 255, 255], 0.6), 1));
  ctx.fillStyle = numGrad;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(data.value, cx, numCy);
  ctx.textBaseline = "alphabetic";

  if (data.unit) {
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = `500 ${unitPx}px ${SANS}`;
    ctx.textAlign = "center";
    ctx.fillText(ellipsize(ctx, data.unit, hasRing ? ringR * 1.7 : innerW), cx, top + stackH - 4);
  }

  // ---- supporting rows
  let ry = cardBottom - rowsBlockH;
  rows.forEach((row, i) => {
    const top = ry + i * rowH;
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad + innerPad, top);
    ctx.lineTo(w - pad - innerPad, top);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.62)";
    ctx.font = `500 ${story ? 30 : 26}px ${SANS}`;
    const valueFont = `700 ${story ? 34 : 30}px ${MONO}`;
    ctx.font = valueFont;
    const valueText = ellipsize(ctx, row.value, innerW * 0.55);
    const valueW = ctx.measureText(valueText).width;
    ctx.font = `500 ${story ? 30 : 26}px ${SANS}`;
    const labelText = ellipsize(ctx, row.label, innerW - valueW - 30);
    ctx.fillText(labelText, pad + innerPad, top + rowH / 2 + 12);

    ctx.fillStyle = "#ffffff";
    ctx.font = valueFont;
    ctx.textAlign = "right";
    ctx.fillText(valueText, w - pad - innerPad, top + rowH / 2 + 12);
  });

  // ---- footer / call to action
  const footTop = cardBottom + (story ? 70 : 38);
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${story ? 50 : 38}px ${SANS}`;
  ctx.fillText("Calculate yours — free", pad, footTop + (story ? 40 : 30));

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `500 ${story ? 30 : 26}px ${SANS}`;
  ctx.fillText(ellipsize(ctx, data.displayUrl, w - pad * 2 - 250), pad, footTop + (story ? 96 : 76));

  // CTA button on the right
  const btnW = story ? 230 : 200;
  const btnH = story ? 84 : 72;
  const btnX = w - pad - btnW;
  const btnY = footTop + (story ? 0 : -4);
  const bg = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
  bg.addColorStop(0, rgba(mix(accent, [255, 255, 255], 0.35), 1));
  bg.addColorStop(1, rgba(accent, 1));
  ctx.fillStyle = bg;
  roundRectPath(ctx, btnX, btnY, btnW, btnH, btnH / 2);
  ctx.fill();
  ctx.fillStyle = "#0a0f1f";
  ctx.font = `700 ${story ? 32 : 28}px ${SANS}`;
  ctx.textAlign = "center";
  ctx.fillText("Try it →", btnX + btnW / 2, btnY + btnH / 2 + 11);

  ctx.fillStyle = "rgba(255,255,255,0.38)";
  ctx.font = `500 22px ${SANS}`;
  ctx.textAlign = "center";
  ctx.fillText("Estimates for information only. Not professional advice.", w / 2, h - (story ? 70 : 34));

  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not create the image"))), "image/png");
  });
}

export function cardFileName(calcName: string, format: CardFormat): string {
  const slug = calcName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `numrexo-${slug || "result"}-${format}.png`;
}
