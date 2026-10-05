// lib/emailTemplate.ts
//
// Newsletter / test email layout. Email clients ignore stylesheets, so the
// markdown -> HTML output is given inline styles here.

import { markdownToHtml } from './markdown';
import { escapeHtml } from './emailSend';

export const SITE_URL = 'https://numrexo.com';

const STYLES: [RegExp, string][] = [
  [/<h1>/g, '<h1 style="font-size:24px;line-height:1.3;margin:24px 0 10px;color:#0f172a">'],
  [/<h2>/g, '<h2 style="font-size:20px;line-height:1.35;margin:24px 0 8px;color:#0f172a">'],
  [/<h3>/g, '<h3 style="font-size:17px;line-height:1.4;margin:20px 0 6px;color:#0f172a">'],
  [/<p>/g, '<p style="font-size:15px;line-height:1.65;margin:0 0 14px;color:#334155">'],
  [/<ul>/g, '<ul style="margin:0 0 14px;padding-left:22px;color:#334155;font-size:15px;line-height:1.65">'],
  [/<ol>/g, '<ol style="margin:0 0 14px;padding-left:22px;color:#334155;font-size:15px;line-height:1.65">'],
  [/<blockquote>/g, '<blockquote style="margin:0 0 14px;padding:4px 14px;border-left:4px solid #3b82f6;color:#475569">'],
  [/<a /g, '<a style="color:#2563eb" '],
  [/<img /g, '<img style="max-width:100%;height:auto;border-radius:8px" '],
];

export function styleEmailHtml(html: string): string {
  return STYLES.reduce((acc, [re, rep]) => acc.replace(re, rep), html);
}

export function markdownToPlain(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/[*_`>#]/g, '')
    .trim();
}

export interface NewsletterInput {
  subject: string;
  markdown: string;
  unsubUrl: string;
}

export function renderNewsletter({ subject, markdown, unsubUrl }: NewsletterInput) {
  const body = styleEmailHtml(markdownToHtml(markdown));
  const html = `<!doctype html><html><body style="margin:0;background:#f5f5f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;border:1px solid #e2e8f0">
<tr><td style="padding:22px 28px 6px;font-size:20px;font-weight:700;letter-spacing:-0.3px"><a href="${SITE_URL}" style="color:#0f172a;text-decoration:none">numrexo</a></td></tr>
<tr><td style="padding:8px 28px 0;font-size:22px;font-weight:700;line-height:1.3;color:#0f172a">${escapeHtml(subject)}</td></tr>
<tr><td style="padding:12px 28px 8px">${body}</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.6">You are receiving this because you subscribed to updates from Numrexo. <a href="${escapeHtml(unsubUrl)}" style="color:#475569">Unsubscribe anytime</a>.</td></tr>
</table></td></tr></table></body></html>`;
  const text = `${subject}\n\n${markdownToPlain(markdown)}\n\n--\nYou are receiving this because you subscribed to updates from Numrexo.\nUnsubscribe: ${unsubUrl}\n`;
  return { html, text };
}
