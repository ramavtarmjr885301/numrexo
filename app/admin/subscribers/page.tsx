import Link from 'next/link';
import { countSubscribers, listSubscribers, StatusFilter } from '@/lib/subscribersDb';
import LogoutButton from '@/components/admin/LogoutButton';
import SubscriberActions from '@/components/admin/SubscriberActions';
import SubscriberImport from '@/components/admin/SubscriberImport';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { q?: string; status?: string; page?: string };
}

function fmt(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
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
      className={`px-3 py-1.5 rounded-lg text-sm ${status === value ? 'bg-blue-600 text-white' : 'bg-surface border border-hairline text-ink-soft hover:text-ink'}`}
    >
      {label} ({n})
    </Link>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-ink">Subscribers</h1>
          <p className="text-sm text-ink-soft mt-1">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              ← Blog posts
            </Link>
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total', value: counts.total },
          { label: 'Active', value: counts.active },
          { label: 'Inactive', value: counts.inactive },
        ].map((c) => (
          <div key={c.label} className="bg-surface border border-hairline rounded-xl p-4">
            <div className="text-2xl font-bold text-ink font-mono">{c.value}</div>
            <div className="text-xs text-ink-faint uppercase tracking-wider">{c.label}</div>
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
          className="px-3 py-1.5 rounded-lg bg-surface border border-hairline text-sm text-ink-soft hover:text-ink"
        >
          ⬇ Export active (CSV)
        </a>
        <a
          href="/api/admin/subscribers/export?status=all"
          className="px-3 py-1.5 rounded-lg bg-surface border border-hairline text-sm text-ink-soft hover:text-ink"
        >
          ⬇ Export all (CSV)
        </a>
      </div>

      <form action="/subscribers" method="get" className="flex gap-2 mb-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by email or name"
          className="flex-1 px-3 py-2 rounded-lg bg-surface border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
        />
        {status !== 'all' && <input type="hidden" name="status" value={status} />}
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="bg-surface border border-hairline rounded-xl divide-y divide-hairline">
        {data.subscribers.length === 0 && (
          <p className="p-6 text-ink-soft text-sm">
            {counts.total === 0 ? 'No subscribers yet. Import a list above or wait for sign-ups from the website.' : 'No subscribers match this filter.'}
          </p>
        )}
        {data.subscribers.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-ink text-sm sm:text-base truncate">{s.email}</p>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded flex-shrink-0 ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                >
                  {s.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-ink-faint text-xs">
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
          <span className="text-ink-faint">
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
