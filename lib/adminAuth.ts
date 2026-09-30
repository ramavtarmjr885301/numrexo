// lib/adminAuth.ts
//
// Minimal single-user session for the blog admin panel. There's exactly one
// author, so this is deliberately not a full auth system: a password
// checked against an env var, and a signed, expiring cookie so the browser
// doesn't have to resend the password on every request.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
// `crypto` module, because this needs to verify the cookie from
// middleware.ts, which runs on the Edge runtime - Web Crypto is the one
// HMAC implementation available in both places.

const COOKIE_NAME = 'numrexo_admin_session';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set');
  }
  return secret;
}

// No Buffer here on purpose - this file is imported from middleware.ts,
// which runs on the Edge runtime, and Buffer is a Node API the Edge
// runtime doesn't provide. btoa is a Web API available in both the Edge
// runtime and Node, so it's the one encoding path that works everywhere
// this file runs.
function arrayBufferToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return arrayBufferToBase64Url(sig);
}

export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  const expiresAt = Date.now() + THIRTY_DAYS_MS;
  const signature = await hmac(String(expiresAt), secret);
  return `${expiresAt}.${signature}`;
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expiresAtStr, signature] = token.split('.');
  if (!expiresAtStr || !signature) return false;
  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  try {
    const secret = getSecret();
    const expected = await hmac(expiresAtStr, secret);
    return expected === signature;
  } catch {
    return false;
  }
}

// Checks both the user ID and the password against their env vars. This is
// still a single-admin system (one fixed identity, not a user table) - the
// user ID field exists because Sanjay asked for a login that isn't just a
// bare password, not because there's more than one person who can log in.
export function checkAdminCredentials(userId: string, password: string): boolean {
  const expectedUserId = process.env.ADMIN_USER_ID;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUserId || !expectedPassword) return false;
  return userId === expectedUserId && password === expectedPassword;
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;
export const ADMIN_SESSION_MAX_AGE_SECONDS = THIRTY_DAYS_MS / 1000;
