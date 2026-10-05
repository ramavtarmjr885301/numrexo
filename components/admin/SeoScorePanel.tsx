'use client';

import { useMemo } from 'react';
import { analyseSeo, SeoInput } from '@/lib/seoScore';

const DOT: Record<string, string> = {
  good: 'bg-green-500',
  ok: 'bg-yellow-500',
  bad: 'bg-red-500',
};

export default function SeoScorePanel({ input }: { input: SeoInput }) {
  const report = useMemo(() => analyseSeo(input), [input]);
  const color = report.score >= 75 ? 'text-green-600' : report.score >= 50 ? 'text-yellow-700' : 'text-red-600';
  const label = report.score >= 75 ? 'Good' : report.score >= 50 ? 'Decent, can be improved' : 'Needs work';
  // Show the problems first so the author sees what to fix without scrolling.
  const order = { bad: 0, ok: 1, good: 2 } as const;
  const sorted = [...report.checks].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        <div className={`text-3xl font-bold font-mono ${color}`}>{report.score}</div>
        <div>
          <div className="text-sm font-semibold text-slate-900">SEO score / 100</div>
          <div className={`text-xs ${color}`}>{label}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mb-3">
        This is a helpful checklist, not Google's real score. Fix the red and yellow items, but write for readers
        first.
      </p>
      <ul className="space-y-2">
        {sorted.map((c) => (
          <li key={c.id} className="flex gap-2 text-sm">
            <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${DOT[c.status]}`} />
            <div>
              <div className="text-slate-900">{c.label}</div>
              {c.status !== 'good' && c.hint && <div className="text-xs text-slate-500">{c.hint}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
