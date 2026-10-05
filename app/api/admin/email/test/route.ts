import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { emailConfigured, sendEmail } from '@/lib/emailSend';
import { normaliseEmail } from '@/lib/subscribersDb';
import { renderNewsletter } from '@/lib/emailTemplate';
import { recordUsage } from '@/lib/emailBroadcastDb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Sends a short test email so the owner can check the email setup works.
// Also used by the newsletter composer's "Send me a test" button.
export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!emailConfigured()) {
    return NextResponse.json(
      { error: 'Email is not set up yet. Add RESEND_API_KEY and EMAIL_FROM in Vercel, then redeploy.' },
      { status: 503 },
    );
  }
  const body = await request.json().catch(() => null);
  const to = normaliseEmail(body?.to);
  if (!to) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });

  const subject = typeof body?.subject === 'string' && body.subject.trim() ? body.subject.trim().slice(0, 200) : 'Numrexo test email';
  const markdown =
    typeof body?.markdown === 'string' && body.markdown.trim()
      ? body.markdown.slice(0, 60000)
      : 'This is a test email from your Numrexo admin panel.\n\nIf you can read this, **email sending works**. 🎉';
  const { html, text } = renderNewsletter({ subject: `[Test] ${subject}`, markdown, unsubUrl: 'https://numrexo.com/unsubscribe' });

  try {
    await sendEmail({ to, subject: `[Test] ${subject}`, html, text });
    await recordUsage(1).catch(() => undefined);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not send the test email.' }, { status: 502 });
  }
}
