import { NextRequest, NextResponse } from 'next/server';
import { CALCULATORS_REGISTRY, CATEGORIES } from '@/data/calculatorsRegistry';
import { buildResultReport, formatGeneratedLabel, reportFileName } from '@/lib/pdf/resultReport';
import { cleanPayload } from '@/lib/resultPayload';
import { normaliseEmail, subscribeForResult } from '@/lib/subscribersDb';
import { checkAndRecord } from '@/lib/resultEmailLog';
import { emailConfigured, escapeHtml, sendEmail } from '@/lib/emailSend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITE = 'https://numrexo.com';

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

// "Email me this result": builds the PDF on the server from the visitor's
// result, emails it, and adds the address to the subscriber list. Everything
// the browser sends is re-cleaned, and the calculator's name/colour/URL come
// from our own registry - never from the request.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot / instant-submit bots: pretend it worked, send nothing.
  const filledAt = Number(body.t);
  if ((typeof body.website === 'string' && body.website.trim() !== '') || (filledAt && Date.now() - filledAt < 1500)) {
    return NextResponse.json({ ok: true });
  }

  if (!emailConfigured()) {
    return NextResponse.json(
      { error: "Email delivery isn't available right now. You can still download the PDF." },
      { status: 503 },
    );
  }

  const email = normaliseEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const payload = cleanPayload(body.result);
  const calc = payload ? CALCULATORS_REGISTRY.find((c) => c.path === payload.calcPath) : undefined;
  if (!payload || !calc) {
    return NextResponse.json({ error: "We couldn't read this result. Please recalculate and try again." }, { status: 400 });
  }

  try {
    const limit = await checkAndRecord(clientIp(request), email);
    if (!limit.ok) {
      const message =
        limit.reason === 'global'
          ? 'We are sending a lot of emails right now. Please try again later, or download the PDF instead.'
          : limit.reason === 'email'
            ? 'We have already emailed results to this address several times today. Please try again tomorrow.'
            : 'Too many requests. Please wait a little while and try again.';
      return NextResponse.json({ error: message }, { status: 429 });
    }

    const created = payload.generatedAt ? new Date(payload.generatedAt) : new Date();
    const category = CATEGORIES[calc.category as keyof typeof CATEGORIES];
    const displayUrl = `numrexo.com${calc.path}`;
    const pdf = buildResultReport({
      calcName: calc.name,
      categoryLabel: category?.name || 'Calculator',
      accent: calc.color || '#3b82f6',
      label: payload.label,
      value: payload.value,
      unit: payload.unit,
      rows: payload.rows,
      inputs: payload.inputs,
      displayUrl,
      generatedLabel: formatGeneratedLabel(created, payload.timeZone, payload.locale),
      created,
      paper: payload.paper === 'a4' ? 'a4' : 'letter',
    });
    // The file name uses the server's clock parts in the visitor's time zone when known.
    const fileName = reportFileName(calc.name, tzDate(created, payload.timeZone));

    const sub = await subscribeForResult(email);
    const unsubUrl = `${SITE}/unsubscribe?t=${sub.token}`;
    const oneClick = `${SITE}/api/unsubscribe?t=${sub.token}`;
    const pageUrl = `${SITE}${calc.path}`;
    const valueLine = `${payload.value}${payload.unit ? ` ${payload.unit}` : ''}`;

    const text = [
      `Your ${calc.name} result`,
      '',
      `${payload.label}: ${valueLine}`,
      '',
      'Your full result is attached as a PDF.',
      `Open the calculator again: ${pageUrl}`,
      '',
      'You are getting this email because this address was entered on numrexo.com to receive a result.',
      'We will also send you occasional Numrexo updates (new calculators and guides) - nothing else.',
      `Unsubscribe anytime: ${unsubUrl}`,
    ].join('\n');

    const html = `<!doctype html><html><body style="margin:0;background:#f5f5f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;border:1px solid #e2e8f0">
<tr><td style="padding:24px 28px 8px;font-size:20px;font-weight:700;letter-spacing:-0.3px">numrexo</td></tr>
<tr><td style="padding:8px 28px 0;font-size:15px;color:#475569">Here is your <strong style="color:#0f172a">${escapeHtml(calc.name)}</strong> result.</td></tr>
<tr><td style="padding:16px 28px"><div style="background:#f1f5f9;border-radius:12px;padding:18px 20px">
<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;font-weight:700">${escapeHtml(payload.label)}</div>
<div style="font-size:30px;font-weight:700;margin-top:6px;word-break:break-word">${escapeHtml(valueLine)}</div></div></td></tr>
<tr><td style="padding:0 28px 8px;font-size:14px;color:#475569;line-height:1.55">The full report is attached as a PDF, with your inputs and the date and time of the calculation.</td></tr>
<tr><td style="padding:12px 28px 24px"><a href="${escapeHtml(pageUrl)}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 18px;border-radius:10px">Open the calculator</a></td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.6">You are getting this email because this address was entered on numrexo.com to receive a result. We will also send you occasional Numrexo updates (new calculators and guides) &mdash; nothing else. <a href="${escapeHtml(unsubUrl)}" style="color:#475569">Unsubscribe anytime</a>.</td></tr>
</table></td></tr></table></body></html>`;

    await sendEmail({
      to: email,
      subject: `Your ${calc.name} result from Numrexo`,
      html,
      text,
      headers: {
        'List-Unsubscribe': `<${oneClick}>, <${unsubUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      attachments: [{ filename: fileName, content: pdf }],
    });

    return NextResponse.json({ ok: true, status: sub.status });
  } catch (error) {
    console.warn('[email-result] failed:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "We couldn't send the email just now. Please try again in a minute, or download the PDF." },
      { status: 500 },
    );
  }
}

/** A Date whose local getters read the wall-clock time in `timeZone` (for the file name only). */
function tzDate(date: Date, timeZone?: string): Date {
  if (!timeZone) return new Date(date.getTime());
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date);
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value || 0);
    return new Date(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'));
  } catch {
    return new Date(date.getTime());
  }
}
