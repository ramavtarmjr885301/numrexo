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
    return NextResponse.json({ error: 'Koi email nahi mila.' }, { status: 400 });
  }
  if (body.rows.length > MAX_ROWS) {
    return NextResponse.json({ error: `Ek baar me max ${MAX_ROWS} emails import ho sakte hain.` }, { status: 400 });
  }
  try {
    const summary = await importSubscribers(body.rows);
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    console.warn('[import] failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Import fail ho gaya. Dobara try karo.' }, { status: 500 });
  }
}
