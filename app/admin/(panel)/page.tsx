import Link from 'next/link';
import { listAllPostsForAdmin } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import type { BlogPost } from '@/lib/blogTypes';
import { countSubscribers, listSubscribers } from '@/lib/subscribersDb';
import { emailStatus, emailConfigured } from '@/lib/emailSend';
import { quotaLeft } from '@/lib/emailBroadcastDb';
import { Card, PageHeader, StatCard } from '@/components/admin/AdminUi';

export const dynamic = 'force-dynamic';

function fmt(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

export default async function AdminDashboardPage() {
  const [posts, counts, recent, quota] = await Promise.all([
    listAllPostsForAdmin().catch((): BlogPost[] => []),
    countSubscribers(),
    listSubscribers({ status: 'all', q: '', page: 1 }),
    quotaLeft(),
  ]);
  const now = Date.now();
  const scheduled = posts.filter((p) => p.published && new Date(p.publishedAt).getTime() > now).length;
  const live = posts.filter((p) => p.published && new Date(p.publishedAt).getTime() <= now).length;
  const drafts = posts.filter((p) => !p.published).length;
  const emailReady = emailConfigured();
  const status = emailStatus();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="A quick look at your blog and email list."
        actions={
          <Link href="/new" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            + New post
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Live posts" value={live} hint={`${drafts} drafts · ${scheduled} scheduled`} href="/posts" tone="blue" />
        <StatCard label="Subscribers" value={counts.total} hint={`${counts.inactive} unsubscribed`} href="/subscribers" tone="green" />
        <StatCard label="Active emails" value={counts.active} hint="Will get your newsletter" href="/email" tone="violet" />
        <StatCard
          label="Emails left today"
          value={emailReady ? quota.remaining : '—'}
          hint={emailReady ? `of ${status.dailyLimit} per day` : 'Email not set up yet'}
          href="/email"
          tone="amber"
        />
      </div>

      {!emailReady && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Email is not set up yet.</strong> Visitors cannot receive result PDFs by email and you cannot send newsletters.{' '}
          <Link href="/email" className="font-semibold underline">
            See the 3-minute setup →
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Latest posts" action={<Link href="/posts" className="text-xs font-medium text-blue-700">View all</Link>}>
          <div className="divide-y divide-slate-200">
            {posts.length === 0 && <p className="p-4 text-sm text-slate-600">No posts yet.</p>}
            {posts.slice(0, 6).map((p) => (
              <Link key={p.id} href={`/edit/${p.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{p.title}</p>
                  <p className="text-xs text-slate-500">{categoryLabel(p.category)} · {fmt(p.publishedAt)}</p>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded font-medium flex-shrink-0 ${p.published ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {p.published ? 'Live' : 'Draft'}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        <Card title="Newest subscribers" action={<Link href="/subscribers" className="text-xs font-medium text-blue-700">View all</Link>}>
          <div className="divide-y divide-slate-200">
            {recent.subscribers.length === 0 && <p className="p-4 text-sm text-slate-600">No subscribers yet.</p>}
            {recent.subscribers.slice(0, 6).map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{s.email}</p>
                  <p className="text-xs text-slate-500">{s.source} · {fmt(s.subscribedAt)}</p>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded font-medium flex-shrink-0 ${s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                  {s.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
