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

import { neon } from '@neondatabase/serverless';
import { BlogPost, BlogFaq } from './blogTypes';

const DATABASE_URL = process.env.DATABASE_URL || '';

// Lazily created - so a missing DATABASE_URL doesn't crash the whole app at
// import time, only the blog/admin pages that actually try to use it.
function getSql() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
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
};

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
    title: row.title,
    category: row.category,
    author: row.author,
    excerpt: row.excerpt,
    contentHtml: row.content_html,
    contentMarkdown: row.content_markdown,
    featuredImage: row.featured_image,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    faqs: parseFaqs(row.faqs),
    published: row.published,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
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
      const offset = (page - 1) * perPage;
      const [rows, countRows] = await Promise.all([
        sql`
          SELECT * FROM blog_posts
          WHERE published = true
          ORDER BY published_at DESC
          LIMIT ${perPage} OFFSET ${offset}
        ` as unknown as Promise<Row[]>,
        sql`SELECT COUNT(*)::int AS count FROM blog_posts WHERE published = true` as unknown as Promise<
          { count: number }[]
        >,
      ]);
      const total = countRows[0]?.count || 0;
      return {
        posts: rows.map(rowToPost),
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
        SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true LIMIT 1
      `) as unknown as Row[];
      return rows[0] ? rowToPost(rows[0]) : null;
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
        SELECT slug FROM blog_posts WHERE published = true
      `) as unknown as { slug: string }[];
      return rows.map((r) => r.slug);
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
        SELECT category AS slug, COUNT(*)::int AS count
        FROM blog_posts
        WHERE published = true
        GROUP BY category
        ORDER BY count DESC
      `) as unknown as { slug: string; count: number }[];
      return rows;
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
      const offset = (page - 1) * perPage;
      const [rows, countRows] = await Promise.all([
        sql`
          SELECT * FROM blog_posts
          WHERE published = true AND category = ${categorySlug}
          ORDER BY published_at DESC
          LIMIT ${perPage} OFFSET ${offset}
        ` as unknown as Promise<Row[]>,
        sql`
          SELECT COUNT(*)::int AS count FROM blog_posts
          WHERE published = true AND category = ${categorySlug}
        ` as unknown as Promise<{ count: number }[]>,
      ]);
      const total = countRows[0]?.count || 0;
      return {
        posts: rows.map(rowToPost),
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
        WHERE published = true AND category = ${category} AND slug != ${excludeSlug}
        ORDER BY published_at DESC
        LIMIT ${limit}
      `) as unknown as Row[];
      return rows.map(rowToPost);
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
}

export async function createPost(input: PostWriteInput): Promise<BlogPost | null> {
  return safeDb(
    'createPost',
    async () => {
      const sql = getSql()!;
      const faqsJson = JSON.stringify(input.faqs || []);
      const rows = (await sql`
        INSERT INTO blog_posts (slug, title, category, author, excerpt, content_html, content_markdown, featured_image, meta_title, meta_description, faqs, published, published_at, updated_at)
        VALUES (${input.slug}, ${input.title}, ${input.category}, ${input.author}, ${input.excerpt}, ${input.contentHtml}, ${input.contentMarkdown}, ${input.featuredImage}, ${input.metaTitle}, ${input.metaDescription}, ${faqsJson}::jsonb, ${input.published}, now(), now())
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
      const faqsJson = JSON.stringify(input.faqs || []);
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
