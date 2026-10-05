// lib/metaFit.ts
//
// Keeps <title> and meta description inside the lengths Bing Webmaster Tools and
// Google both like, without ever inventing content:
//   - titles   : at most 60 characters in total (the " | Numrexo" suffix included)
//   - descriptions: 120-160 characters. A short description is extended ONLY with
//     real sentences already on the page (its own text), never with filler.
// Pure string helpers, safe to use in any server component.

export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 160;

function decode(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/** Plain text from an HTML string: tags, scripts and extra whitespace removed. */
export function htmlToText(html: string): string {
  return decode(
    html
      .replace(/<(script|style|figure|table|pre)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function clipAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[\s,;:.\-–—]+$/, '') + '…';
}

/**
 * Title for a page whose suffix is added by us (not by the layout template).
 * `Guide to X | Numrexo Blog` becomes `Guide to X | Numrexo` if that fits, and is
 * clipped at a word boundary only when even the shortened form is too long.
 */
export function fitTitle(title: string, suffix = ' | Numrexo'): string {
  const clean = decode(title).replace(/\s+/g, ' ').trim();
  const full = `${clean}${suffix}`;
  if (full.length <= TITLE_MAX) return full;
  if (clean.length <= TITLE_MAX) return clean;
  return clipAtWord(clean, TITLE_MAX);
}

/**
 * Description of 120-160 characters. Uses `primary` when it is long enough;
 * otherwise appends the next real sentences from `bodyText` (the page's own
 * content), then clips at a word boundary.
 */
export function fitDescription(primary: string | null | undefined, bodyText = ''): string {
  let text = decode(primary ?? '').replace(/\s+/g, ' ').trim();
  if (text.length < DESC_MIN && bodyText) {
    const body = decode(bodyText).replace(/\s+/g, ' ').trim();
    // Skip body text that merely repeats the start of the primary text.
    const rest = text && body.toLowerCase().startsWith(text.toLowerCase().slice(0, 40))
      ? body.slice(text.length).trim()
      : body;
    if (rest) {
      const join = text && !/[.!?…]$/.test(text) ? '. ' : ' ';
      text = text ? `${text}${join}${rest}` : rest;
    }
  }
  return clipAtWord(text, DESC_MAX);
}
