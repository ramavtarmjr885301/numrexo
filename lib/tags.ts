// lib/tags.ts
//
// Shared helpers for blog tags (used by the admin API, the post page and the
// /blog/tag/<tag> pages). A tag is stored exactly as typed ("Home Loan"),
// and its URL slug is derived from it ("home-loan").

export const MAX_TAGS = 12;

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

export function sanitizeTags(value: unknown): string[] {
  const raw: unknown[] = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item !== 'string') continue;
    const clean = item.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
    const key = tagSlug(clean);
    if (!clean || !key || seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
    if (out.length >= MAX_TAGS) break;
  }
  return out;
}
