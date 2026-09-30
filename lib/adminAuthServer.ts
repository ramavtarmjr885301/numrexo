// lib/adminAuthServer.ts
//
// Split out from lib/adminAuth.ts on purpose: that file is imported by
// middleware.ts, which runs on the Edge runtime, and `next/headers`'s
// cookies() relies on Node's request-context APIs. Keeping this in its own
// file means middleware.ts's module graph never references `next/headers`
// at all, instead of relying on a bundler to tree-shake it out correctly.
//
// Used only by the /api/admin/* route handlers, which run on the Node
// runtime and are not covered by middleware.ts's matcher (see that file's
// `config.matcher`, which explicitly skips /api/).

import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from './adminAuth';

export async function isAdminRequestAuthed(): Promise<boolean> {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}
