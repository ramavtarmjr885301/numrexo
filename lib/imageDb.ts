// lib/imageDb.ts
//
// Image storage inside the same Neon Postgres database as the blog, so the
// admin's "Upload from computer" works with NO extra service to set up. The
// picture is stored as base64 text (simple and reliable with the HTTP driver)
// and served back, with a long cache lifetime, from /api/img/<id>.
//
// Images are compressed in the browser before upload (see
// lib/uploadImageClient.ts) so they are normally 100-500 KB, well inside the
// limit below. If a Vercel Blob token is configured, uploads still go to Blob
// (app/api/admin/upload/route.ts) - this is the zero-setup fallback.

import { neon } from '@neondatabase/serverless';
import { randomBytes } from 'node:crypto';

const DATABASE_URL = process.env.DATABASE_URL || '';

/** Largest image accepted for database storage. */
export const MAX_DB_IMAGE_BYTES = 2 * 1024 * 1024;

function getSql() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
}

let tableReady: Promise<void> | null = null;
async function ensureTable(): Promise<void> {
  if (tableReady) return tableReady;
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL is not set');
  tableReady = (async () => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS blog_images (
          id TEXT PRIMARY KEY,
          content_type TEXT NOT NULL,
          bytes INTEGER NOT NULL,
          data_b64 TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    } catch (error) {
      tableReady = null;
      throw error;
    }
  })();
  return tableReady;
}

export async function saveImage(contentType: string, data: Uint8Array): Promise<string> {
  await ensureTable();
  const sql = getSql()!;
  const id = randomBytes(12).toString('hex');
  const b64 = Buffer.from(data).toString('base64');
  await sql`INSERT INTO blog_images (id, content_type, bytes, data_b64) VALUES (${id}, ${contentType}, ${data.byteLength}, ${b64})`;
  return id;
}

export async function loadImage(id: string): Promise<{ contentType: string; data: Buffer } | null> {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  await ensureTable();
  const sql = getSql()!;
  const rows = (await sql`SELECT content_type, data_b64 FROM blog_images WHERE id = ${id} LIMIT 1`) as unknown as {
    content_type: string;
    data_b64: string;
  }[];
  if (!rows[0]) return null;
  return { contentType: rows[0].content_type, data: Buffer.from(rows[0].data_b64, 'base64') };
}
