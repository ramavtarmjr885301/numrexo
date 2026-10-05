// lib/emailSend.ts
//
// Sends one email through Resend's REST API (https://resend.com), using plain
// fetch so there is no package to install. Configure with environment vars:
//   RESEND_API_KEY   the API key from the Resend dashboard
//   EMAIL_FROM       e.g. "Numrexo <results@numrexo.com>" (domain must be verified in Resend)
//   EMAIL_REPLY_TO   optional reply-to address

export interface OutgoingEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
  attachments?: { filename: string; content: Uint8Array }[];
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64');
}

export async function sendEmail(mail: OutgoingEmail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) throw new Error('Email is not configured');

  const body: Record<string, unknown> = {
    from,
    to: [mail.to],
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  };
  if (process.env.EMAIL_REPLY_TO) body.reply_to = process.env.EMAIL_REPLY_TO;
  if (mail.headers) body.headers = mail.headers;
  if (mail.attachments?.length) {
    body.attachments = mail.attachments.map((a) => ({ filename: a.filename, content: toBase64(a.content) }));
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

/** Sends up to 100 emails in one Resend call (no attachments). Returns how many were accepted. */
export async function sendBatch(mails: Omit<OutgoingEmail, 'attachments'>[]): Promise<number> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) throw new Error('Email is not configured');
  if (mails.length === 0) return 0;
  const payload = mails.slice(0, 100).map((m) => {
    const item: Record<string, unknown> = { from, to: [m.to], subject: m.subject, html: m.html, text: m.text };
    if (process.env.EMAIL_REPLY_TO) item.reply_to = process.env.EMAIL_REPLY_TO;
    if (m.headers) item.headers = m.headers;
    return item;
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
    }
    return payload.length;
  } finally {
    clearTimeout(timer);
  }
}

/** Safe-to-show summary of the email setup (never includes the key itself). */
export function emailStatus() {
  const from = process.env.EMAIL_FROM || '';
  const fromEmail = (from.match(/<([^>]+)>/)?.[1] || from).trim();
  return {
    hasKey: Boolean(process.env.RESEND_API_KEY),
    hasFrom: Boolean(from),
    from,
    usingResendTestSender: /@resend\.dev$/i.test(fromEmail),
    replyTo: process.env.EMAIL_REPLY_TO || '',
    dailyLimit: Math.max(10, Number(process.env.EMAIL_DAILY_LIMIT) || 100),
  };
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
