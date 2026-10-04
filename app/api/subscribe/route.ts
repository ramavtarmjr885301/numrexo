import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, cleanName, normaliseEmail } from '@/lib/subscribersDb';

export const dynamic = 'force-dynamic';

// Public newsletter sign-up. No account, no password: an email address and
// (optionally) a first name. A hidden "website" field catches simple bots,
// and a form that is submitted in under 2 seconds is treated as a bot too.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot / too-fast bots: pretend it worked, store nothing.
  const filledAt = Number(body.t);
  if ((typeof body.website === 'string' && body.website.trim() !== '') || (filledAt && Date.now() - filledAt < 2000)) {
    return NextResponse.json({ ok: true, status: 'subscribed' });
  }

  const email = normaliseEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const status = await addSubscriber(email, cleanName(body.name), 'website');
    return NextResponse.json({ ok: true, status });
  } catch (error) {
    console.warn('[subscribe] failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Something went wrong. Please try again in a minute.' }, { status: 500 });
  }
}
