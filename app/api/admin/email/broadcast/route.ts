import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { emailConfigured, sendBatch } from '@/lib/emailSend';
import { countSubscribers, listActiveAfter } from '@/lib/subscribersDb';
import { renderNewsletter, SITE_URL } from '@/lib/emailTemplate';
import {
  claimChunk,
  createBroadcast,
  getBroadcast,
  quotaLeft,
  recordChunkResult,
  resumeBroadcast,
  setBroadcastStatus,
} from '@/lib/emailBroadcastDb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const CHUNK = 50;

// Newsletter sending, driven by the admin Email page:
//   {action:"start", subject, markdown}  -> creates a broadcast, returns its id
//   {action:"next", id}                  -> sends the next chunk (up to 50), returns progress
//   {action:"resume", id}                -> un-pauses a broadcast stopped by the daily limit
export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!emailConfigured()) {
    return NextResponse.json({ error: 'Email is not set up yet.' }, { status: 503 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  try {
    if (body.action === 'start') {
      const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 200) : '';
      const markdown = typeof body.markdown === 'string' ? body.markdown.slice(0, 60000) : '';
      if (!subject || !markdown.trim()) {
        return NextResponse.json({ error: 'Please add a subject and a message.' }, { status: 400 });
      }
      const counts = await countSubscribers();
      if (counts.active === 0) return NextResponse.json({ error: 'There are no active subscribers yet.' }, { status: 400 });
      const b = await createBroadcast(subject, markdown, counts.active);
      return NextResponse.json({ ok: true, broadcast: b });
    }

    const id = Number(body.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    const b = await getBroadcast(id);
    if (!b) return NextResponse.json({ error: 'Broadcast not found' }, { status: 404 });

    if (body.action === 'resume') {
      await resumeBroadcast(id);
      return NextResponse.json({ ok: true, broadcast: await getBroadcast(id) });
    }

    if (body.action !== 'next') return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    if (b.status === 'done') return NextResponse.json({ ok: true, broadcast: b, finished: true });
    if (b.status === 'paused') return NextResponse.json({ ok: true, broadcast: b, paused: true });

    const quota = await quotaLeft();
    if (quota.remaining <= 0) {
      await setBroadcastStatus(id, 'paused');
      return NextResponse.json({ ok: true, broadcast: await getBroadcast(id), paused: true, quota });
    }

    const subs = await listActiveAfter(b.lastId, Math.min(CHUNK, quota.remaining));
    if (subs.length === 0) {
      await setBroadcastStatus(id, 'done');
      return NextResponse.json({ ok: true, broadcast: await getBroadcast(id), finished: true });
    }

    const claimed = await claimChunk(id, b.lastId, subs[subs.length - 1].id);
    if (!claimed) return NextResponse.json({ ok: true, broadcast: await getBroadcast(id), busy: true });

    const mails = subs.map((s) => {
      const unsubUrl = `${SITE_URL}/unsubscribe?t=${s.token}`;
      const { html, text } = renderNewsletter({ subject: b.subject, markdown: b.bodyMd, unsubUrl });
      return {
        to: s.email,
        subject: b.subject,
        html,
        text,
        headers: {
          'List-Unsubscribe': `<${SITE_URL}/api/unsubscribe?t=${s.token}>, <${unsubUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      };
    });

    let lastError = '';
    try {
      await sendBatch(mails);
      await recordChunkResult(id, mails.length, 0);
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Send failed';
      await recordChunkResult(id, 0, mails.length);
    }

    const after = await getBroadcast(id);
    return NextResponse.json({ ok: !lastError, error: lastError || undefined, broadcast: after, quota: await quotaLeft() });
  } catch (error) {
    console.warn('[broadcast] failed:', error);
    return NextResponse.json({ error: 'Something went wrong while sending.' }, { status: 500 });
  }
}
