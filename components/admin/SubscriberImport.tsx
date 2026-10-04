'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseSubscriberText } from '@/lib/csvParse';

interface Summary {
  received: number;
  added: number;
  duplicates: number;
  invalid: number;
}

export default function SubscriberImport() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('File 5 MB se badi hai.');
      return;
    }
    setError('');
    setText(await file.text());
  }

  async function submit() {
    setError('');
    setSummary(null);
    const rows = parseSubscriberText(text);
    if (rows.length === 0) {
      setError('Koi email nahi mila. File/text check karo.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/admin/subscribers/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Import nahi hua.');
        return;
      }
      setSummary(data as Summary);
      setText('');
      router.refresh();
    } catch {
      setError('Kuch gadbad hui. Dobara try karo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-surface border border-hairline rounded-xl p-4 space-y-3">
      <h2 className="text-sm font-semibold text-ink">Subscribers import karo</h2>
      <p className="text-xs text-ink-faint">
        CSV file upload karo ya emails paste karo (ek line me ek email, ya <code>email,name</code>). CSV me pehli row
        me <code>email</code> (aur chahe to <code>name</code>) likha ho to wo bhi chalega. Jo email pehle se list me
        hai wo dobara nahi judta, aur jisne unsubscribe kiya hai wo wapas active nahi hota.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder={'rahul@example.com\npriya@example.com, Priya'}
        className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink text-sm font-mono focus:outline-none focus:border-blue-600"
      />

      <div className="flex flex-wrap items-center gap-3">
        <input ref={fileRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={onFile} className="hidden" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-cream border border-hairline text-ink-soft text-sm hover:text-ink"
        >
          CSV / TXT file chuno
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={busy || !text.trim()}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? 'Import ho raha hai…' : 'Import'}
        </button>
      </div>

      {error && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
      {summary && (
        <div className="px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
          Import complete: {summary.added} naye add hue, {summary.duplicates} pehle se the (ya file me repeat), {summary.invalid} galat
          email chhod diye. Total mile: {summary.received}.
        </div>
      )}
    </div>
  );
}
