import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeByToken } from '@/lib/subscribersDb';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === 'string' ? body.token : '';
  try {
    const ok = await unsubscribeByToken(token);
    if (!ok) return NextResponse.json({ error: 'This unsubscribe link is not valid.' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.warn('[unsubscribe] failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
