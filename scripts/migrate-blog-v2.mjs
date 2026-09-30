// scripts/migrate-blog-v2.mjs
//
// One-time migration for Patch 15. Adds the three new columns the richer
// admin editor needs (meta_title, meta_description, faqs) to the blog_posts
// table that scripts/seed-blog.mjs already created. Every existing post
// keeps working exactly as before - the new columns are nullable / default
// to an empty FAQ list, so nothing has to be backfilled.
//
// Usage:  node scripts/migrate-blog-v2.mjs
//
// Safe to run more than once - every statement is "add the column if it's
// not already there", so re-running it just confirms the columns exist.

import { neon } from '@neondatabase/serverless';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Same hand-rolled .env.local reader as scripts/seed-blog.mjs - a bare
// `node script.mjs` process doesn't auto-load it the way `next build` does.
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
  console.log('Adding meta_title, meta_description and faqs columns to blog_posts (if missing)...');
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS faqs JSONB NOT NULL DEFAULT '[]'::jsonb`;
  console.log('Done. Your 25 existing posts are untouched - the new fields are empty until you fill them in.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
