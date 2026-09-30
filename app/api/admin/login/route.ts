import { NextRequest, NextResponse } from 'next/server';
import {
  checkAdminPassword,
  createSessionToken,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
} from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: '' }));

  if (typeof password !== 'string' || !checkAdminPassword(password)) {
    // Same response either way - don't tell a caller whether ADMIN_PASSWORD
    // is even configured.
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
