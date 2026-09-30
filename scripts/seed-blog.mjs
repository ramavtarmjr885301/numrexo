// scripts/seed-blog.mjs
//
// One-time migration script. Run this once, after DATABASE_URL is set (see
// PATCH14-STEPS.md), to create the blog_posts table and load the 25 posts
// migrated off blog.numrexo.com's WordPress install on 2026-09-22.
//
// Usage:  node scripts/seed-blog.mjs
//
// Safe to run more than once - it creates the table only if missing, and
// upserts each post by slug, so re-running after fixing one post's content
// in this file won't create duplicates.

import { neon } from '@neondatabase/serverless';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// This is a plain `node scripts/seed-blog.mjs` script, not `next dev`/`next
// build` - Next.js is what normally reads .env.local automatically, a bare
// Node process doesn't. So: read it by hand if it's there, rather than
// asking Sanjay to type DATABASE_URL into a terminal command (fiddly, and
// different syntax on Windows cmd vs PowerShell vs bash).
const envLocalPath = join(__dirname, '..', '.env.local');
if (existsSync(envLocalPath)) {
  for (const line of readFileSync(envLocalPath, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env.local (see PATCH14-STEPS.md) and try again.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function main() {
  console.log('Creating blog_posts table (if it does not already exist)...');
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'Sanjay Singh',
      excerpt TEXT NOT NULL DEFAULT '',
      content_html TEXT NOT NULL DEFAULT '',
      content_markdown TEXT NOT NULL DEFAULT '',
      featured_image TEXT,
      published BOOLEAN NOT NULL DEFAULT true,
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published, published_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category)`;

  const seedPath = join(__dirname, 'blog-seed-data.json');
  const posts = JSON.parse(readFileSync(seedPath, 'utf-8'));
  console.log(`Loading ${posts.length} posts from ${seedPath}...`);

  let inserted = 0;
  let updated = 0;

  for (const post of posts) {
    const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${post.slug} LIMIT 1`;

    // The migrated content has no original markdown source (it came from
    // cleaned WordPress HTML), so content_markdown is set to the same
    // cleaned HTML - markdown renderers pass raw HTML blocks through
    // unchanged, so this round-trips safely if the post is ever re-saved
    // from the admin panel without being rewritten.
    if (existing.length > 0) {
      await sql`
        UPDATE blog_posts
        SET title = ${post.title},
            category = ${post.category},
            author = ${post.author},
            excerpt = ${post.excerpt},
            content_html = ${post.content_html},
            content_markdown = ${post.content_html},
            featured_image = ${post.featured_image},
            published_at = ${post.published_at},
            updated_at = now()
        WHERE slug = ${post.slug}
      `;
      updated++;
    } else {
      await sql`
        INSERT INTO blog_posts (slug, title, category, author, excerpt, content_html, content_markdown, featured_image, published, published_at, updated_at)
        VALUES (${post.slug}, ${post.title}, ${post.category}, ${post.author}, ${post.excerpt}, ${post.content_html}, ${post.content_html}, ${post.featured_image}, true, ${post.published_at}, now())
      `;
      inserted++;
    }
  }

  console.log(`Done. Inserted ${inserted}, updated ${updated}.`);

  const openaiCount = posts.filter((p) => (p.content_html || '').includes('images.openai.com')).length;
  if (openaiCount > 0) {
    console.log('');
    console.log(`NOTE: ${openaiCount} post(s) still reference images.openai.com URLs (ChatGPT-generated`);
    console.log('images that were hotlinked, never saved to WordPress). These may already be broken.');
    console.log('Send the original images if you have them, and they can be swapped in afterwards.');
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
