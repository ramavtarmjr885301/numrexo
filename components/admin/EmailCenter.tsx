'use client';

import { useMemo, useState } from 'react';
import { markdownToHtml } from '@/lib/markdown';
import { styleEmailHtml } from '@/lib/emailTemplate';
import { Card } from './AdminUi';
import type { Broadcast, Quota } from '@/lib/emailBroadcastDb';

interface Props {
  configured: boolean;
  status: { hasKey: boolean; hasFrom: boolean; from: string; usingResendTestSender: boolean; replyTo: string; dailyLimit: number };
  activeSubscribers: number;
  quota: Quota;
  history: Broadcast[];
}

const field = 'w-full px-3 py-2 rounded-lg bg-white border border-slate-400 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200';

function Check({ ok, label, detail }: { ok: boolean; label: string; detail?: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className={`mt-0.5 inline-flex w-5 h-5 rounded-full items-center justify-center text-xs font-bold text-white flex-shrink-0 ${ok ? 'bg-emerald-600' : 'bg-red-500'}`}>
        {ok ? '✓' : '!'}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        {detail && <p className="text-xs text-slate-600 mt-0.5">{detail}</p>}
      </div>
    </div>
  );
}

function fmt(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
}

export default function EmailCenter({ configured, status, activeSubscribers, quota: initialQuota, history: initialHistory }: Props) {
  const [quota, setQuota] = useState(initialQuota);
  const [history, setHistory] = useState(initialHistory);

  // test mail
  const [testTo, setTestTo] = useState('');
  const [testMsg, setTestMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [testBusy, setTestBusy] = useState(false);

  // composer
  const [subject, setSubject] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState<{ sent: number; total: number; id: number } | null>(null);
  const [sendMsg, setSendMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const previewHtml = useMemo(() => styleEmailHtml(markdownToHtml(markdown || '*Your message preview appears here.*')), [markdown]);

  async function sendTest(withContent: boolean) {
    setTestMsg(null);
    setTestBusy(true);
    try {
      const res = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withContent ? { to: testTo, subject, markdown } : { to: testTo }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok) setTestMsg({ ok: true, text: `Test email sent to ${testTo}. Check the inbox (and spam folder).` });
      else setTestMsg({ ok: false, text: j.error || 'Could not send the test email.' });
    } catch {
      setTestMsg({ ok: false, text: 'Network problem. Please try again.' });
    } finally {
      setTestBusy(false);
    }
  }

  function upsert(b: Broadcast) {
    setHistory((h) => [b, ...h.filter((x) => x.id !== b.id)].sort((a, c) => c.id - a.id));
  }

  async function drive(id: number) {
    // Sends chunk after chunk until done, paused by the daily limit, or an error.
    for (let guard = 0; guard < 400; guard++) {
      const res = await fetch('/api/admin/email/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'next', id }),
      });
      const j = await res.json().catch(() => ({}));
      if (j.broadcast) {
        upsert(j.broadcast);
        setProgress({ sent: j.broadcast.sent, total: j.broadcast.total, id });
      }
      if (j.quota) setQuota(j.quota);
      if (!res.ok || j.error) {
        setSendMsg({ ok: false, text: j.error || 'Sending stopped because of an error.' });
        return;
      }
      if (j.finished) {
        setSendMsg({ ok: true, text: `Done! Your email went to ${j.broadcast.sent} subscribers.` });
        return;
      }
      if (j.paused) {
        setSendMsg({
          ok: false,
          text: `Daily email limit reached (${quota.limit}/day). ${j.broadcast?.sent ?? 0} of ${j.broadcast?.total ?? 0} sent. Come back tomorrow and press "Continue" in the history below.`,
        });
        return;
      }
      if (j.busy) await new Promise((r) => setTimeout(r, 1500));
    }
  }

  async function startSend() {
    setSendMsg(null);
    if (!subject.trim() || !markdown.trim()) {
      setSendMsg({ ok: false, text: 'Please write a subject and a message first.' });
      return;
    }
    if (!window.confirm(`Send "${subject}" to ${activeSubscribers} active subscribers now? This cannot be undone.`)) return;
    setSending(true);
    try {
      const res = await fetch('/api/admin/email/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', subject, markdown }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSendMsg({ ok: false, text: j.error || 'Could not start sending.' });
        return;
      }
      upsert(j.broadcast);
      setProgress({ sent: 0, total: j.broadcast.total, id: j.broadcast.id });
      await drive(j.broadcast.id);
    } finally {
      setSending(false);
    }
  }

  async function resume(id: number) {
    setSendMsg(null);
    setSending(true);
    try {
      await fetch('/api/admin/email/broadcast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'resume', id }) });
      await drive(id);
    } finally {
      setSending(false);
    }
  }

  const overQuota = quota.remaining <= 0;

  return (
    <div className="space-y-4">
      <Card title="1. Email setup">
        <div className="px-4 py-3 divide-y divide-slate-100">
          <Check ok={status.hasKey} label="Resend API key" detail={status.hasKey ? 'RESEND_API_KEY is set in Vercel.' : 'Missing. Add RESEND_API_KEY in Vercel → Settings → Environment Variables.'} />
          <Check
            ok={status.hasFrom}
            label="Sender address"
            detail={status.hasFrom ? `Emails go out as: ${status.from}` : 'Missing. Add EMAIL_FROM, for example  Numrexo <hello@numrexo.com>'}
          />
          {status.hasFrom && status.usingResendTestSender && (
            <Check ok={false} label="Using Resend's test sender" detail="onboarding@resend.dev can only email YOUR OWN Resend account address. Verify numrexo.com in Resend and switch EMAIL_FROM to an @numrexo.com address so visitors can receive emails." />
          )}
          <Check ok={configured} label={configured ? 'Email is ON — "Email me this result" is visible on all calculators' : 'Email is OFF — the "Email me this result" button stays hidden'} />
        </div>
        <div className="px-4 pb-4 text-sm text-slate-700 space-y-2">
          <p>
            Today: <strong>{quota.usedToday}</strong> of <strong>{quota.limit}</strong> emails used in the last 24 hours ({quota.remaining} left). Resend's free plan allows about 100 emails per day.
          </p>
          {!configured && (
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              <li>Create a free account at resend.com (you sign in with your own email — no password of yours is ever shared with us).</li>
              <li>Resend → Domains → add <strong>numrexo.com</strong> and paste the DNS records they show into your domain's DNS settings.</li>
              <li>Resend → API Keys → create a key.</li>
              <li>Vercel → your project → Settings → Environment Variables: add <code>RESEND_API_KEY</code> and <code>EMAIL_FROM</code>, then redeploy.</li>
            </ol>
          )}
        </div>
      </Card>

      <Card title="2. Send a test email">
        <div className="p-4 flex flex-col sm:flex-row gap-2">
          <input type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="your-email@example.com" className={field} disabled={!configured} />
          <button
            type="button"
            disabled={!configured || testBusy || !testTo}
            onClick={() => sendTest(false)}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-40 whitespace-nowrap"
          >
            {testBusy ? 'Sending…' : 'Send test'}
          </button>
        </div>
        {testMsg && <p className={`px-4 pb-4 text-sm ${testMsg.ok ? 'text-emerald-700' : 'text-red-700'}`}>{testMsg.text}</p>}
      </Card>

      <Card title={`3. Email your subscribers (${activeSubscribers} active)`}>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1" htmlFor="nl-subject">Subject</label>
            <input id="nl-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. 3 new calculators to try this week" className={field} maxLength={200} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-800" htmlFor="nl-body">Message</label>
              <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden text-xs font-semibold">
                {(['write', 'preview'] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)} className={`px-3 py-1.5 ${tab === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}>
                    {t === 'write' ? 'Write' : 'Preview'}
                  </button>
                ))}
              </div>
            </div>
            {tab === 'write' ? (
              <textarea
                id="nl-body"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                rows={12}
                placeholder={'Write in plain text. You can use:\n## Heading\n**bold**  [link text](https://numrexo.com/...)  - bullet points'}
                className={`${field} font-mono`}
              />
            ) : (
              <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 min-h-[16rem]">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{subject || 'Subject'}</h3>
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
            )}
            <p className="text-xs text-slate-500 mt-1">An unsubscribe link is added to every email automatically.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" disabled={!configured || testBusy || !testTo || !subject || !markdown} onClick={() => sendTest(true)} className="px-4 py-2 rounded-lg border border-slate-400 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 disabled:opacity-40">
              Send this draft to the test address above
            </button>
            <button
              type="button"
              disabled={!configured || sending || overQuota || activeSubscribers === 0}
              onClick={startSend}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40"
            >
              {sending ? 'Sending…' : `Send to ${activeSubscribers} subscribers`}
            </button>
          </div>

          {progress && sending && (
            <div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress.total ? Math.round((progress.sent / progress.total) * 100) : 0}%` }} />
              </div>
              <p className="text-xs text-slate-600 mt-1">{progress.sent} of {progress.total} sent — keep this page open.</p>
            </div>
          )}
          {overQuota && configured && <p className="text-sm text-amber-800">Today's email limit is used up. Try again tomorrow.</p>}
          {sendMsg && <p className={`text-sm ${sendMsg.ok ? 'text-emerald-700' : 'text-red-700'}`}>{sendMsg.text}</p>}
        </div>
      </Card>

      <Card title="Sent emails">
        <div className="divide-y divide-slate-200">
          {history.length === 0 && <p className="p-4 text-sm text-slate-600">Nothing sent yet.</p>}
          {history.map((b) => (
            <div key={b.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{b.subject}</p>
                <p className="text-xs text-slate-500">
                  {fmt(b.createdAt)} · {b.sent} of {b.total} sent{b.failed ? ` · ${b.failed} failed` : ''}
                </p>
              </div>
              {b.status === 'done' ? (
                <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-100 text-emerald-800">Sent</span>
              ) : (
                <button type="button" disabled={sending || overQuota} onClick={() => resume(b.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 disabled:opacity-40">
                  Continue
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
