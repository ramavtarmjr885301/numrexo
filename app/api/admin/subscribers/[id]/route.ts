import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { deleteSubscriber, setSubscriberActive } from '@/lib/subscribersDb';

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = Number(params.id);
  const body = await request.json().catch(() => null);
  if (!Number.isInteger(id) || typeof body?.active !== 'boolean') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  try {
    const ok = await setSubscriberActive(id, body.active);
    if (!ok) return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not update subscriber' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  try {
    const ok = await deleteSubscriber(id);
    if (!ok) return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not delete subscriber' }, { status: 500 });
  }
}
