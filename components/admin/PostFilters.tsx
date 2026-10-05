'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  q: string;
  category: string;
  status: string;
  sort: string;
  dateBy: string;
  from: string;
  to: string;
  categories: { slug: string; label: string; count: number }[];
}

const field = 'px-3 py-2 rounded-lg bg-white border border-slate-400 text-slate-900 text-sm focus:outline-none focus:border-blue-600';

// Search + filter bar for the posts list. Dropdowns and dates apply as soon as
// they change; the search box applies on Enter or the Search button.
export default function PostFilters({ q, category, status, sort, dateBy, from, to, categories }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const submit = () => formRef.current?.requestSubmit();

  const hasFilters = Boolean(q || category || (status && status !== 'all') || from || to || (sort && sort !== 'newest') || (dateBy && dateBy !== 'published'));

  return (
    <form ref={formRef} action="/posts" method="get" className="bg-white border border-slate-300 rounded-xl shadow-sm p-4 mb-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by title, slug, author, tag or summary…"
          className={`${field} flex-1`}
          aria-label="Search posts"
        />
        <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <label className="text-xs font-semibold text-slate-600">
          Category
          <select name="category" defaultValue={category} onChange={submit} className={`${field} w-full mt-1 font-normal`}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label} ({c.count})
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-600">
          Sort by
          <select name="sort" defaultValue={sort} onChange={submit} className={`${field} w-full mt-1 font-normal`}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="updated">Recently edited</option>
            <option value="title_az">Title A → Z</option>
            <option value="title_za">Title Z → A</option>
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-600">
          Date type
          <select name="dateBy" defaultValue={dateBy} onChange={submit} className={`${field} w-full mt-1 font-normal`}>
            <option value="published">Publish date</option>
            <option value="updated">Last edited date</option>
          </select>
        </label>

        <div className="hidden md:block" />

        <label className="text-xs font-semibold text-slate-600">
          From date
          <input type="date" name="from" defaultValue={from} onChange={submit} className={`${field} w-full mt-1 font-normal`} />
        </label>
        <label className="text-xs font-semibold text-slate-600">
          To date
          <input type="date" name="to" defaultValue={to} onChange={submit} className={`${field} w-full mt-1 font-normal`} />
        </label>

        <div className="col-span-2 flex items-end gap-2 flex-wrap">
          {[
            { label: 'Today', days: 0 },
            { label: 'Last 7 days', days: 7 },
            { label: 'Last 30 days', days: 30 },
          ].map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => {
                const fmt = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
                const end = new Date();
                const start = new Date(Date.now() - r.days * 86400000);
                const form = formRef.current;
                if (!form) return;
                (form.elements.namedItem('from') as HTMLInputElement).value = fmt(start);
                (form.elements.namedItem('to') as HTMLInputElement).value = fmt(end);
                submit();
              }}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              {r.label}
            </button>
          ))}
          {hasFilters && (
            <button type="button" onClick={() => router.push('/posts')} className="px-3 py-2 rounded-lg text-xs font-semibold text-red-700 hover:bg-red-50">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {status && status !== 'all' && <input type="hidden" name="status" value={status} />}
    </form>
  );
}
