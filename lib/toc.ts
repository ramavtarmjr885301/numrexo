// lib/toc.ts
//
// Builds the "In this article" table of contents for a blog post from the
// H2/H3 headings already in its stored HTML, and gives each heading an id so
// the links jump to it. Works on the HTML string (no DOM needed on the
// server). Pure and safe: if there are not enough headings, nothing changes.

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function slug(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'section'
  );
}

export function addHeadingIds(html: string): { html: string; items: TocItem[] } {
  const items: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs: string, inner: string) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    if (!text) return match;
    const existing = /\bid\s*=\s*["']([^"']+)["']/i.exec(attrs);
    let id = existing ? existing[1] : slug(text);
    if (!existing) {
      let n = 2;
      const base = id;
      while (used.has(id)) id = `${base}-${n++}`;
    }
    used.add(id);
    items.push({ id, text, level: tag.toLowerCase() === 'h2' ? 2 : 3 });
    return existing ? match : `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
  return { html: out, items };
}

/**
 * Splits the HTML in two just before the 2nd top-level <h2>, so a call-to-action
 * box can sit "in the middle" of the article without ever cutting through a
 * list or quote. With fewer than 3 H2s, returns everything in `before`.
 */
export function splitBeforeSecondH2(html: string): { before: string; after: string } {
  const re = /<h2[\s>]/gi;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    count += 1;
    if (count === 2) {
      // Only split if there are at least 3 H2s so the box lands mid-article.
      const total = (html.match(/<h2[\s>]/gi) || []).length;
      if (total < 3) break;
      return { before: html.slice(0, match.index), after: html.slice(match.index) };
    }
  }
  return { before: html, after: '' };
}
