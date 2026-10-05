// lib/subscribersDb.ts
//
// Newsletter subscribers, stored in the same Neon Postgres database as the
// blog. The table is created automatically the first time it is needed
// (CREATE TABLE IF NOT EXISTS), so there is no migration script to run.
//
// Each subscriber has:
//   - active:  false = deactivated (kept on file but excluded from the
//              "active" export). Set by the admin, or by the subscriber
//              themselves via the unsubscribe link.
//   - token:   a random string used ONLY for the one-click unsubscribe link
//              (https://numrexo.com/unsubscribe?t=<token>). It is included in
//              the CSV export so it can be merged into newsletter emails.
//   - source:  where the address came from: "website", "import" or "admin".

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || '';

function getSql() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
}

export interface Subscriber {
  id: number;
  email: string;
  name: string;
  source: string;
  active: boolean;
  token: string;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

type Row = {
  id: number;
  email: string;
  name: string | null;
  source: string;
  active: boolean;
  token: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
};

function rowToSubscriber(r: Row): Subscriber {
  return {
    id: r.id,
    email: r.email,
    name: r.name || '',
    source: r.source,
    active: r.active,
    token: r.token,
    subscribedAt: r.subscribed_at,
    unsubscribedAt: r.unsubscribed_at,
  };
}

let tableReady: Promise<void> | null = null;
async function ensureTable(): Promise<void> {
  if (tableReady) return tableReady;
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL is not set');
  tableReady = (async () => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          name TEXT,
          source TEXT NOT NULL DEFAULT 'website',
          active BOOLEAN NOT NULL DEFAULT true,
          token TEXT NOT NULL DEFAULT replace(gen_random_uuid()::text, '-', ''),
          subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          unsubscribed_at TIMESTAMPTZ
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS subscribers_active_idx ON subscribers (active)`;
    } catch (error) {
      tableReady = null;
      throw error;
    }
  })();
  return tableReady;
}

// ---- validation -----------------------------------------------------------

const EMAIL_RE = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]{2,}$/;

export function normaliseEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return null;
  if (!EMAIL_RE.test(email)) return null;
  const [local, domain] = email.split('@');
  if (!local || local.length > 64 || !domain || domain.includes('..')) return null;
  return email;
}

export function cleanName(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80) : '';
}

// ---- public: subscribe / unsubscribe --------------------------------------

export type SubscribeResult = 'subscribed' | 'already' | 'reactivated';

/** Throws on database failure - the API route turns that into a friendly error. */
export async function addSubscriber(email: string, name: string, source = 'website'): Promise<SubscribeResult> {
  await ensureTable();
  const sql = getSql()!;
  const existing = (await sql`SELECT id, active FROM subscribers WHERE email = ${email} LIMIT 1`) as unknown as {
    id: number;
    active: boolean;
  }[];
  if (existing[0]) {
    if (existing[0].active) return 'already';
    // They (or the admin) had deactivated it; a fresh sign-up from the person
    // themselves is a clear new consent, so switch them back on.
    await sql`UPDATE subscribers SET active = true, unsubscribed_at = NULL, subscribed_at = now() WHERE id = ${existing[0].id}`;
    return 'reactivated';
  }
  await sql`INSERT INTO subscribers (email, name, source) VALUES (${email}, ${name || null}, ${source}) ON CONFLICT (email) DO NOTHING`;
  return 'subscribed';
}

export interface ResultSubscription {
  status: 'subscribed' | 'already' | 'unsubscribed';
  /** The address's unsubscribe token, for the link in the email we are about to send. */
  token: string;
}

/**
 * Used by "Email me this result". Adds the address as an active subscriber
 * (source "result-email") and returns its unsubscribe token.
 *
 * Unlike the newsletter form this NEVER switches a deactivated address back
 * on: someone who unsubscribed once stays unsubscribed, even if another person
 * types their address into the box. They still get the one result they asked
 * for, which carries its own unsubscribe link.
 */
export async function subscribeForResult(email: string): Promise<ResultSubscription> {
  await ensureTable();
  const sql = getSql()!;
  await sql`INSERT INTO subscribers (email, name, source) VALUES (${email}, ${null}, 'result-email') ON CONFLICT (email) DO NOTHING`;
  const rows = (await sql`SELECT token, active, source, subscribed_at FROM subscribers WHERE email = ${email} LIMIT 1`) as unknown as {
    token: string;
    active: boolean;
    source: string;
    subscribed_at: string;
  }[];
  const row = rows[0];
  if (!row) throw new Error('subscriber row missing');
  if (!row.active) return { status: 'unsubscribed', token: row.token };
  const justNow = row.source === 'result-email' && Date.now() - new Date(row.subscribed_at).getTime() < 15000;
  return { status: justNow ? 'subscribed' : 'already', token: row.token };
}

export async function unsubscribeByToken(token: string): Promise<boolean> {
  if (!/^[a-f0-9]{32}$/.test(token)) return false;
  await ensureTable();
  const sql = getSql()!;
  const rows = (await sql`
    UPDATE subscribers SET active = false, unsubscribed_at = now() WHERE token = ${token} RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}

// ---- admin ------------------------------------------------------------------

export interface SubscriberCounts {
  total: number;
  active: number;
  inactive: number;
}

export async function countSubscribers(): Promise<SubscriberCounts> {
  try {
    await ensureTable();
    const sql = getSql()!;
    const rows = (await sql`
      SELECT count(*)::int AS total,
             count(*) FILTER (WHERE active)::int AS active
      FROM subscribers
    `) as unknown as { total: number; active: number }[];
    const total = rows[0]?.total ?? 0;
    const active = rows[0]?.active ?? 0;
    return { total, active, inactive: total - active };
  } catch (error) {
    console.warn('[subscribersDb] countSubscribers failed:', error);
    return { total: 0, active: 0, inactive: 0 };
  }
}

/** Active subscribers with id > afterId, in id order - used to send a newsletter in chunks. */
export async function listActiveAfter(afterId: number, limit: number): Promise<Subscriber[]> {
  await ensureTable();
  const sql = getSql()!;
  const rows = (await sql`
    SELECT id, email, name, source, active, token, subscribed_at, unsubscribed_at
    FROM subscribers WHERE active = true AND id > ${afterId} ORDER BY id ASC LIMIT ${limit}
  `) as unknown as Row[];
  return rows.map(rowToSubscriber);
}

export type StatusFilter = 'all' | 'active' | 'inactive';

export interface SubscriberPage {
  subscribers: Subscriber[];
  total: number;
  page: number;
  totalPages: number;
}

const PAGE_SIZE = 50;

export async function listSubscribers(opts: {
  status?: StatusFilter;
  q?: string;
  page?: number;
}): Promise<SubscriberPage> {
  const status = opts.status || 'all';
  const page = Math.max(1, opts.page || 1);
  const q = (opts.q || '').trim().toLowerCase();
  try {
    await ensureTable();
    const sql = getSql()!;
    // Small, owner-only table: filter in SQL with plain parameters.
    const like = `%${q.replace(/[%_\\]/g, '')}%`;
    const activeOnly = status === 'active';
    const inactiveOnly = status === 'inactive';
    const totalRows = (await sql`
      SELECT count(*)::int AS n FROM subscribers
      WHERE (${q} = '' OR lower(email) LIKE ${like} OR lower(coalesce(name, '')) LIKE ${like})
        AND (NOT ${activeOnly} OR active = true)
        AND (NOT ${inactiveOnly} OR active = false)
    `) as unknown as { n: number }[];
    const total = totalRows[0]?.n ?? 0;
    const rows = (await sql`
      SELECT * FROM subscribers
      WHERE (${q} = '' OR lower(email) LIKE ${like} OR lower(coalesce(name, '')) LIKE ${like})
        AND (NOT ${activeOnly} OR active = true)
        AND (NOT ${inactiveOnly} OR active = false)
      ORDER BY subscribed_at DESC, id DESC
      LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}
    `) as unknown as Row[];
    return {
      subscribers: rows.map(rowToSubscriber),
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    };
  } catch (error) {
    console.warn('[subscribersDb] listSubscribers failed:', error);
    return { subscribers: [], total: 0, page, totalPages: 1 };
  }
}

export async function listAllForExport(status: StatusFilter): Promise<Subscriber[]> {
  await ensureTable();
  const sql = getSql()!;
  const rows = (await sql`
    SELECT * FROM subscribers
    WHERE (${status} = 'all' OR (${status} = 'active' AND active = true) OR (${status} = 'inactive' AND active = false))
    ORDER BY subscribed_at DESC, id DESC
  `) as unknown as Row[];
  return rows.map(rowToSubscriber);
}

export async function setSubscriberActive(id: number, active: boolean): Promise<boolean> {
  await ensureTable();
  const sql = getSql()!;
  const rows = (await sql`
    UPDATE subscribers
    SET active = ${active},
        unsubscribed_at = CASE WHEN ${active} THEN NULL ELSE now() END
    WHERE id = ${id}
    RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}

export async function deleteSubscriber(id: number): Promise<boolean> {
  await ensureTable();
  const sql = getSql()!;
  const rows = (await sql`DELETE FROM subscribers WHERE id = ${id} RETURNING id`) as unknown as { id: number }[];
  return rows.length > 0;
}

export async function addSubscriberManually(email: string, name: string): Promise<SubscribeResult> {
  return addSubscriber(email, name, 'admin');
}

export interface ImportSummary {
  received: number;
  added: number;
  duplicates: number;
  invalid: number;
}

/**
 * Bulk import. Existing addresses are left exactly as they are (so importing
 * a list never re-activates someone who unsubscribed). Done in chunks of
 * 200 with one INSERT per chunk.
 */
export async function importSubscribers(
  items: { email: unknown; name?: unknown }[],
): Promise<ImportSummary> {
  await ensureTable();
  const sql = getSql()!;
  const seen = new Set<string>();
  const clean: { email: string; name: string }[] = [];
  let invalid = 0;
  let duplicatesInFile = 0;
  for (const item of items) {
    const email = normaliseEmail(item.email);
    if (!email) {
      invalid += 1;
      continue;
    }
    if (seen.has(email)) {
      duplicatesInFile += 1;
      continue;
    }
    seen.add(email);
    clean.push({ email, name: cleanName(item.name) });
  }

  let added = 0;
  const CHUNK = 200;
  for (let i = 0; i < clean.length; i += CHUNK) {
    const part = clean.slice(i, i + CHUNK);
    const emails = part.map((p) => p.email);
    const names = part.map((p) => p.name);
    const rows = (await sql`
      INSERT INTO subscribers (email, name, source)
      SELECT e, NULLIF(n, ''), 'import'
      FROM unnest(${emails}::text[], ${names}::text[]) AS t(e, n)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `) as unknown as { id: number }[];
    added += rows.length;
  }

  return {
    received: items.length,
    added,
    duplicates: clean.length - added + duplicatesInFile,
    invalid,
  };
}

// ---- CSV ----------------------------------------------------------------------

function csvCell(value: string): string {
  // Neutralise spreadsheet formula injection (=, +, -, @ at the start of a cell).
  let v = value;
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function subscribersToCsv(list: Subscriber[]): string {
  const header = ['email', 'name', 'status', 'source', 'subscribed_at', 'unsubscribed_at', 'unsubscribe_token'];
  const lines = [header.join(',')];
  for (const s of list) {
    lines.push(
      [
        csvCell(s.email),
        csvCell(s.name),
        s.active ? 'active' : 'inactive',
        csvCell(s.source),
        new Date(s.subscribedAt).toISOString(),
        s.unsubscribedAt ? new Date(s.unsubscribedAt).toISOString() : '',
        s.token,
      ].join(','),
    );
  }
  return lines.join('\r\n') + '\r\n';
}
