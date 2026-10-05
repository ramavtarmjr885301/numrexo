import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { importSubscribers } from '@/lib/subscribersDb';

export const dynamic = 'force-dynamic';

const MAX_ROWS = 20000;

// Body: { rows: [{ email, name? }, ...] } - the admin page parses the CSV /
// pasted list in the browser and sends it here.
export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.rows) || body.rows.length === 0) {
    return NextResponse.json({ error: 'No email addresses found.' }, { status: 400 });
  }
  if (body.rows.length > MAX_ROWS) {
    return NextResponse.json({ error: `You can import at most ${MAX_ROWS} emails at a time.` }, { status: 400 });
  }
  try {
    const summary = await importSubscribers(body.rows);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    console.warn('[import] failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Import failed. Please try again.' }, { status: 500 });
  }
}
