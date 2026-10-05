import Link from 'next/link';
import { countSubscribers, listSubscribers, StatusFilter } from '@/lib/subscribersDb';
import { PageHeader } from '@/components/admin/AdminUi';
import SubscriberActions from '@/components/admin/SubscriberActions';
import SubscriberImport from '@/components/admin/SubscriberImport';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { q?: string; status?: string; page?: string };
}

function fmt(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

export default async function SubscribersPage({ searchParams }: PageProps) {
  const status: StatusFilter =
    searchParams.status === 'active' || searchParams.status === 'inactive' ? searchParams.status : 'all';
  const q = (searchParams.q || '').slice(0, 100);
  const page = Math.max(1, Number(searchParams.page) || 1);

  const [counts, data] = await Promise.all([countSubscribers(), listSubscribers({ status, q, page })]);

  const qs = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    const merged = { q, status: status === 'all' ? '' : status, page: '', ...over };
    for (const [k, v] of Object.entries(merged)) if (v !== undefined && v !== '') p.set(k, String(v));
    const s = p.toString();
    return `/subscribers${s ? `?${s}` : ''}`;
  };

  const tab = (value: StatusFilter, label: string, n: number) => (
    <Link
      href={qs({ status: value === 'all' ? '' : value, page: '' })}
      className={`px-3 py-1.5 rounded-lg text-sm ${status === value ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:text-slate-900'}`}
    >
      {label} ({n})
    </Link>
  );

  return (
    <div>
      <PageHeader
        title="Subscribers"
        subtitle="People who asked for their result by email or signed up for updates."
        actions={
          <Link href="/email" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            ✉ Send newsletter
          </Link>
        }
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total', value: counts.total },
          { label: 'Active', value: counts.active },
          { label: 'Inactive', value: counts.inactive },
        ].map((c) => (
          <div key={c.label} className="bg-white border border-slate-300 rounded-xl p-4">
            <div className="text-2xl font-bold text-slate-900 font-mono">{c.value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <SubscriberImport />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {tab('all', 'All', counts.total)}
        {tab('active', 'Active', counts.active)}
        {tab('inactive', 'Inactive', counts.inactive)}
        <div className="flex-1" />
        <a
          href="/api/admin/subscribers/export?status=active"
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-700 hover:text-slate-900"
        >
          ⬇ Export active (CSV)
        </a>
        <a
          href="/api/admin/subscribers/export?status=all"
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-700 hover:text-slate-900"
        >
          ⬇ Export all (CSV)
        </a>
      </div>

      <form action="/subscribers" method="get" className="flex gap-2 mb-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by email or name"
          className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
        />
        {status !== 'all' && <input type="hidden" name="status" value={status} />}
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="bg-white border border-slate-300 rounded-xl divide-y divide-slate-200">
        {data.subscribers.length === 0 && (
          <p className="p-6 text-slate-900-soft text-sm">
            {counts.total === 0 ? 'No subscribers yet. Import a list above or wait for sign-ups from the website.' : 'No subscribers match this filter.'}
          </p>
        )}
        {data.subscribers.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-slate-900 text-sm sm:text-base truncate">{s.email}</p>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded flex-shrink-0 ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                >
                  {s.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-slate-500 text-xs">
                {s.name ? `${s.name} · ` : ''}
                {s.source} · joined {fmt(s.subscribedAt)}
                {s.unsubscribedAt ? ` · deactivated ${fmt(s.unsubscribedAt)}` : ''}
              </p>
            </div>
            <SubscriberActions id={s.id} email={s.email} active={s.active} />
          </div>
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          {data.page > 1 ? (
            <Link href={qs({ page: data.page - 1 })} className="text-blue-600">
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-slate-500">
            Page {data.page} of {data.totalPages} · {data.total} results
          </span>
          {data.page < data.totalPages ? (
            <Link href={qs({ page: data.page + 1 })} className="text-blue-600">
              Next →
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
