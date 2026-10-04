// lib/postInput.ts
//
// One place that turns the admin form's JSON body into the validated,
// trimmed values blogDb.createPost/updatePost expect. Used by both
// POST /api/admin/posts and PUT /api/admin/posts/[id] so the two can never
// drift apart (they used to be copy-pasted).

import { markdownToHtml } from './markdown';
import { slugify } from './slugify';
import { sanitizeFaqs } from './faqs';
import { sanitizeTags } from './tags';

function str(value: unknown, max = 5000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function httpUrlOrNull(value: unknown): string | null {
  const v = str(value, 1000);
  if (!v) return null;
  // Allow site-relative paths (/uploads/x.png) and absolute http(s) URLs only.
  if (v.startsWith('/')) return v;
  try {
    const u = new URL(v);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

function slugList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    if (typeof item !== 'string') continue;
    const s = slugify(item);
    if (s && !out.includes(s)) out.push(s);
    if (out.length >= 6) break;
  }
  return out;
}

export function parsePostBody(body: any) {
  const title = str(body?.title, 200);
  const slug = str(body?.slug, 200) ? slugify(str(body.slug, 200)) : slugify(title);
  const contentMarkdown = typeof body?.contentMarkdown === 'string' ? body.contentMarkdown : '';

  // datetime sent by the form as an ISO string. Anything unparseable = ignore
  // (create -> now, update -> keep the existing date).
  let publishedAt: string | null = null;
  if (typeof body?.publishedAt === 'string' && body.publishedAt) {
    const d = new Date(body.publishedAt);
    if (!Number.isNaN(d.getTime())) publishedAt = d.toISOString();
  }

  return {
    title,
    slug,
    values: {
      slug,
      title,
      category: str(body?.category, 40) || 'finance',
      author: str(body?.author, 100) || 'Sanjay Singh',
      excerpt: str(body?.excerpt, 600),
      contentHtml: markdownToHtml(contentMarkdown),
      contentMarkdown,
      featuredImage: httpUrlOrNull(body?.featuredImage),
      metaTitle: str(body?.metaTitle, 120) || null,
      metaDescription: str(body?.metaDescription, 300) || null,
      faqs: sanitizeFaqs(body?.faqs),
      published: Boolean(body?.published),
      tags: sanitizeTags(body?.tags),
      ogImage: httpUrlOrNull(body?.ogImage),
      canonicalUrl: httpUrlOrNull(body?.canonicalUrl),
      noindex: Boolean(body?.noindex),
      focusKeyword: str(body?.focusKeyword, 100) || null,
      relatedSlugs: slugList(body?.relatedSlugs),
      ctaCalculator: str(body?.ctaCalculator, 60) || null,
      showToc: body?.showToc === undefined ? true : Boolean(body.showToc),
      publishedAt,
    },
  };
}
