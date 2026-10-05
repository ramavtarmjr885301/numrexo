// lib/imgAlt.ts
//
// Blog posts are written in the admin editor, and an image pasted or inserted
// there can end up with no alt text (or alt=""). Search engines and screen
// readers want a description, so every <img> in a post gets one: its own alt if
// the author wrote it, otherwise a readable name taken from the file name, otherwise
// the post title. Pure string work, runs at render time, never edits the database.

function decode(text: string): string {
  return text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");
}

function escapeAttr(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function altFromSrc(src: string, fallback: string): string {
  try {
    const file = decodeURIComponent(src.split('?')[0].split('#')[0].split('/').pop() || '');
    const name = file
      .replace(/\.[a-z0-9]{2,5}$/i, '')
      .replace(/[-_+]+/g, ' ')
      .replace(/\b\d{6,}\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    // File names like "img 4821" or a bare hash say nothing useful.
    if (name.length >= 4 && /[a-z]{3,}/i.test(name) && !/^[0-9a-f]{16,}$/i.test(name)) return name;
  } catch {
    /* fall through */
  }
  return fallback;
}

export function ensureImgAlt(html: string, fallbackAlt: string): string {
  const fallback = decode(fallbackAlt).trim() || 'Illustration';
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const altMatch = /\salt\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);
    const existing = altMatch ? (altMatch[2] ?? altMatch[3] ?? '').trim() : '';
    if (existing) return tag;
    const srcMatch = /\ssrc\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);
    const alt = escapeAttr(altFromSrc(srcMatch ? srcMatch[2] ?? srcMatch[3] ?? '' : '', fallback));
    if (altMatch) return tag.replace(altMatch[0], ` alt="${alt}"`);
    return tag.replace(/<img\b/i, `<img alt="${alt}"`);
  });
}
