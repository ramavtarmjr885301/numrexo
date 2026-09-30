import { NextRequest, NextResponse } from 'next/server';
import {
  checkAdminCredentials,
  createSessionToken,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
} from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  const { userId, password } = await request.json().catch(() => ({ userId: '', password: '' }));

  if (
    typeof userId !== 'string' ||
    typeof password !== 'string' ||
    !checkAdminCredentials(userId, password)
  ) {
    // Same response either way - don't tell a caller whether ADMIN_USER_ID /
    // ADMIN_PASSWORD are even configured, or which of the two was wrong.
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
