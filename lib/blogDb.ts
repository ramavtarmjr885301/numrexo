// lib/blogDb.ts
//
// Blog data layer, backed by Postgres (Neon) instead of a live call to the
// WordPress REST API on blog.numrexo.com.
//
// WHY THIS EXISTS
//
// The old app/wordpress.ts fetched every blog page's data from
// https://blog.numrexo.com/wp-json/wp/v2/... at request/build time, over
// HTTP, from a shared cPanel host. That's a slow round trip on every
// uncached render, and it's exactly why the blog opened noticeably slower
// than the calculators - the calculators never leave the Vercel deployment,
// the old blog pages did, every time. Reading from Neon over its HTTP
// driver from the same Vercel serverless region removes that hop.
//
// Every function here returns a plain, safe fallback ([], null, zeroed
// pagination) if the database call fails, the same defensive pattern the
// old wordpress.ts used - a blog/database hiccup must never be able to fail
// the whole site build or take down calculator pages.

import { decodeEntities } from '@/lib/htmlEntities';
import { neon } from '@neondatabase/serverless';
import { BlogPost, BlogFaq } from './blogTypes';
import { HIDDEN_PUBLIC_SLUGS } from './hiddenBlogSlugs';
import { tagSlug } from './tags';

const DATABASE_URL = process.env.DATABASE_URL || '';

// Lazily created - so a missing DATABASE_URL doesn't crash the whole app at
// import time, only the blog/admin pages that actually try to use it.
function getSql() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
}

function isPublic(post: { slug: string }): boolean {
  return !HIDDEN_PUBLIC_SLUGS.has(post.slug);
}

type Row = {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content_html: string;
  content_markdown: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  // The Neon HTTP driver returns jsonb columns already parsed into JS
  // values, but this is defensive in case a row ever comes back as a raw
  // JSON string instead (e.g. a different driver/path).
  faqs: BlogFaq[] | string | null;
  published: boolean;
  published_at: string;
  updated_at: string;
  // Patch 19 columns. Optional on purpose: reads use SELECT *, so a row
  // from a database that has not had ensureBlogSchema() run yet simply
  // lacks them and rowToPost falls back to safe defaults.
  tags?: string[] | string | null;
  og_image?: string | null;
  canonical_url?: string | null;
  noindex?: boolean | null;
  focus_keyword?: string | null;
  related_slugs?: string[] | string | null;
  cta_calculator?: string | null;
  show_toc?: boolean | null;
};

function parseStringList(value: string[] | string | null | undefined): string[] {
  if (!value) return [];
  let list: unknown = value;
  if (typeof value === 'string') {
    try {
      list = JSON.parse(value);
    } catch {
      return [];
    }
  }
  return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : [];
}

function parseFaqs(value: BlogFaq[] | string | null): BlogFaq[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function rowToPost(row: Row): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: decodeEntities(row.title),
    category: row.category,
    author: decodeEntities(row.author),
    excerpt: decodeEntities(row.excerpt),
    contentHtml: row.content_html,
    contentMarkdown: row.content_markdown,
    featuredImage: row.featured_image,
    metaTitle: row.meta_title ? decodeEntities(row.meta_title) : row.meta_title,
    metaDescription: row.meta_description ? decodeEntities(row.meta_description) : row.meta_description,
    faqs: parseFaqs(row.faqs),
    published: row.published,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    tags: parseStringList(row.tags),
    ogImage: row.og_image ?? null,
    canonicalUrl: row.canonical_url ?? null,
    noindex: Boolean(row.noindex),
    focusKeyword: row.focus_keyword ?? '',
    relatedSlugs: parseStringList(row.related_slugs),
    ctaCalculator: row.cta_calculator ?? '',
    showToc: row.show_toc === null || row.show_toc === undefined ? true : Boolean(row.show_toc),
  };
}

// Adds the Patch 19 columns the first time an admin write runs, so Sanjay
// never has to run a migration script by hand. Every statement is "add if
// missing", so it is safe to repeat; the result is cached per server
// instance so it costs one round trip, not one per request.
let schemaReady: Promise<void> | null = null;
export function ensureBlogSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  const sql = getSql();
  if (!sql) return Promise.resolve();
  schemaReady = (async () => {
    try {
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS faqs JSONB NOT NULL DEFAULT '[]'::jsonb`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags JSONB NOT NULL DEFAULT '[]'::jsonb`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url TEXT`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS noindex BOOLEAN NOT NULL DEFAULT false`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS related_slugs JSONB NOT NULL DEFAULT '[]'::jsonb`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cta_calculator TEXT`;
      await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS show_toc BOOLEAN NOT NULL DEFAULT true`;
    } catch (error) {
      schemaReady = null; // try again on the next write
      throw error;
    }
  })();
  return schemaReady;
}

async function safeDb<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  const sql = getSql();
  if (!sql) {
    console.warn(`[blogDb] ${label} skipped - DATABASE_URL is not set.`);
    return fallback;
  }
  try {
    return await run();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[blogDb] ${label} failed (${reason}) - continuing without blog data.`);
    return fallback;
  }
}

export interface PostsPage {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function listPublishedPosts(page = 1, perPage = 9): Promise<PostsPage> {
  return safeDb(
    'listPublishedPosts',
    async () => {
      const sql = getSql()!;
      // The blog is small, so fetch every published post and filter/paginate
      // here - that keeps HIDDEN_PUBLIC_SLUGS exact for both the list and the
      // total count without relying on array-parameter SQL.
      const rows = (await sql`
        SELECT * FROM blog_posts WHERE published = true AND published_at <= now() ORDER BY published_at DESC
      `) as unknown as Row[];
      const visible = rows.map(rowToPost).filter(isPublic);
      const total = visible.length;
      const offset = (page - 1) * perPage;
      return {
        posts: visible.slice(offset, offset + perPage),
        total,
        totalPages: Math.max(1, Math.ceil(total / perPage)),
        currentPage: page,
      };
    },
    { posts: [], total: 0, totalPages: 0, currentPage: page },
  );
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  return safeDb(
    `getPublishedPostBySlug(${slug})`,
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true AND published_at <= now() LIMIT 1
      `) as unknown as Row[];
      const post = rows[0] ? rowToPost(rows[0]) : null;
      return post && isPublic(post) ? post : null;
    },
    null,
  );
}

export async function listAllSlugs(): Promise<string[]> {
  return safeDb(
    'listAllSlugs',
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT slug FROM blog_posts WHERE published = true AND published_at <= now()
      `) as unknown as { slug: string }[];
      return rows.map((r) => r.slug).filter((slug) => !HIDDEN_PUBLIC_SLUGS.has(slug));
    },
    [],
  );
}

export async function listCategoriesWithCounts(): Promise<{ slug: string; count: number }[]> {
  return safeDb(
    'listCategoriesWithCounts',
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT slug, category FROM blog_posts WHERE published = true AND published_at <= now()
      `) as unknown as { slug: string; category: string }[];
      const counts = new Map<string, number>();
      for (const r of rows) {
        if (HIDDEN_PUBLIC_SLUGS.has(r.slug)) continue;
        counts.set(r.category, (counts.get(r.category) || 0) + 1);
      }
      return Array.from(counts.entries())
        .map(([slug, count]) => ({ slug, count }))
        .sort((x, y) => y.count - x.count);
    },
    [],
  );
}

export async function listPostsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 9,
): Promise<PostsPage> {
  return safeDb(
    `listPostsByCategory(${categorySlug})`,
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts
        WHERE published = true AND published_at <= now() AND category = ${categorySlug}
        ORDER BY published_at DESC
      `) as unknown as Row[];
      const visible = rows.map(rowToPost).filter(isPublic);
      const total = visible.length;
      const offset = (page - 1) * perPage;
      return {
        posts: visible.slice(offset, offset + perPage),
        total,
        totalPages: Math.max(1, Math.ceil(total / perPage)),
        currentPage: page,
      };
    },
    { posts: [], total: 0, totalPages: 0, currentPage: page },
  );
}

export async function getRelatedPosts(
  category: string,
  excludeSlug: string,
  limit = 3,
): Promise<BlogPost[]> {
  return safeDb(
    `getRelatedPosts(${category})`,
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts
        WHERE published = true AND published_at <= now() AND category = ${category} AND slug != ${excludeSlug}
        ORDER BY published_at DESC
        LIMIT ${limit + HIDDEN_PUBLIC_SLUGS.size}
      `) as unknown as Row[];
      return rows.map(rowToPost).filter(isPublic).slice(0, limit);
    },
    [],
  );
}

export async function listPostsByTag(tag: string): Promise<BlogPost[]> {
  return safeDb(
    `listPostsByTag(${tag})`,
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts WHERE published = true AND published_at <= now() ORDER BY published_at DESC
      `) as unknown as Row[];
      const wanted = tag.toLowerCase();
      return rows
        .map(rowToPost)
        .filter(isPublic)
        .filter((p) => p.tags.some((t) => tagSlug(t) === wanted));
    },
    [],
  );
}

export async function listAllTags(): Promise<{ tag: string; slug: string; count: number }[]> {
  return safeDb(
    'listAllTags',
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts WHERE published = true AND published_at <= now()
      `) as unknown as Row[];
      const counts = new Map<string, { tag: string; count: number }>();
      for (const post of rows.map(rowToPost).filter(isPublic)) {
        for (const t of post.tags) {
          const key = tagSlug(t);
          if (!key) continue;
          const entry = counts.get(key);
          if (entry) entry.count += 1;
          else counts.set(key, { tag: t, count: 1 });
        }
      }
      return Array.from(counts.entries())
        .map(([slug, v]) => ({ slug, tag: v.tag, count: v.count }))
        .sort((a, b) => b.count - a.count);
    },
    [],
  );
}

export async function getPostsBySlugs(slugs: string[]): Promise<BlogPost[]> {
  if (slugs.length === 0) return [];
  return safeDb(
    'getPostsBySlugs',
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts WHERE published = true AND published_at <= now()
      `) as unknown as Row[];
      const bySlug = new Map(rows.map(rowToPost).filter(isPublic).map((p) => [p.slug, p] as const));
      return slugs.map((s) => bySlug.get(s)).filter((p): p is BlogPost => Boolean(p));
    },
    [],
  );
}

// ---------------------------------------------------------------------------
// Admin-only queries below. These deliberately ignore the `published` flag
// so a draft is visible in the admin list/editor but not on the public site.
// ---------------------------------------------------------------------------

export async function listAllPostsForAdmin(): Promise<BlogPost[]> {
  return safeDb(
    'listAllPostsForAdmin',
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT * FROM blog_posts ORDER BY published_at DESC
      `) as unknown as Row[];
      return rows.map(rowToPost);
    },
    [],
  );
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  return safeDb(
    `getPostById(${id})`,
    async () => {
      const sql = getSql()!;
      const rows = (await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`) as unknown as Row[];
      return rows[0] ? rowToPost(rows[0]) : null;
    },
    null,
  );
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  return safeDb(
    `slugExists(${slug})`,
    async () => {
      const sql = getSql()!;
      const rows = (await sql`
        SELECT id FROM blog_posts WHERE slug = ${slug} AND id != ${excludeId ?? -1} LIMIT 1
      `) as unknown as { id: number }[];
      return rows.length > 0;
    },
    false,
  );
}

interface PostWriteInput {
  slug: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  contentHtml: string;
  contentMarkdown: string;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  faqs: BlogFaq[];
  published: boolean;
  // Patch 19
  tags: string[];
  ogImage: string | null;
  canonicalUrl: string | null;
  noindex: boolean;
  focusKeyword: string | null;
  relatedSlugs: string[];
  ctaCalculator: string | null;
  showToc: boolean;
  // ISO string. Empty/undefined = "now" on create, "keep as is" on update.
  publishedAt?: string | null;
}

export async function createPost(input: PostWriteInput): Promise<BlogPost | null> {
  return safeDb(
    'createPost',
    async () => {
      const sql = getSql()!;
      await ensureBlogSchema();
      const faqsJson = JSON.stringify(input.faqs || []);
      const tagsJson = JSON.stringify(input.tags || []);
      const relatedJson = JSON.stringify(input.relatedSlugs || []);
      const publishedAt = input.publishedAt || new Date().toISOString();
      const rows = (await sql`
        INSERT INTO blog_posts (slug, title, category, author, excerpt, content_html, content_markdown, featured_image, meta_title, meta_description, faqs, published, published_at, updated_at, tags, og_image, canonical_url, noindex, focus_keyword, related_slugs, cta_calculator, show_toc)
        VALUES (${input.slug}, ${input.title}, ${input.category}, ${input.author}, ${input.excerpt}, ${input.contentHtml}, ${input.contentMarkdown}, ${input.featuredImage}, ${input.metaTitle}, ${input.metaDescription}, ${faqsJson}::jsonb, ${input.published}, ${publishedAt}::timestamptz, now(), ${tagsJson}::jsonb, ${input.ogImage}, ${input.canonicalUrl}, ${input.noindex}, ${input.focusKeyword}, ${relatedJson}::jsonb, ${input.ctaCalculator}, ${input.showToc})
        RETURNING *
      `) as unknown as Row[];
      return rows[0] ? rowToPost(rows[0]) : null;
    },
    null,
  );
}

export async function updatePost(id: number, input: PostWriteInput): Promise<BlogPost | null> {
  return safeDb(
    `updatePost(${id})`,
    async () => {
      const sql = getSql()!;
      await ensureBlogSchema();
      const faqsJson = JSON.stringify(input.faqs || []);
      const tagsJson = JSON.stringify(input.tags || []);
      const relatedJson = JSON.stringify(input.relatedSlugs || []);
      const publishedAt = input.publishedAt || null;
      const rows = (await sql`
        UPDATE blog_posts
        SET slug = ${input.slug},
            title = ${input.title},
            category = ${input.category},
            author = ${input.author},
            excerpt = ${input.excerpt},
            content_html = ${input.contentHtml},
            content_markdown = ${input.contentMarkdown},
            featured_image = ${input.featuredImage},
            meta_title = ${input.metaTitle},
            meta_description = ${input.metaDescription},
            faqs = ${faqsJson}::jsonb,
            published = ${input.published},
            published_at = COALESCE(${publishedAt}::timestamptz, published_at),
            tags = ${tagsJson}::jsonb,
            og_image = ${input.ogImage},
            canonical_url = ${input.canonicalUrl},
            noindex = ${input.noindex},
            focus_keyword = ${input.focusKeyword},
            related_slugs = ${relatedJson}::jsonb,
            cta_calculator = ${input.ctaCalculator},
            show_toc = ${input.showToc},
            updated_at = now()
        WHERE id = ${id}
        RETURNING *
      `) as unknown as Row[];
      return rows[0] ? rowToPost(rows[0]) : null;
    },
    null,
  );
}

export async function deletePost(id: number): Promise<boolean> {
  return safeDb(
    `deletePost(${id})`,
    async () => {
      const sql = getSql()!;
      await sql`DELETE FROM blog_posts WHERE id = ${id}`;
      return true;
    },
    false,
  );
}
