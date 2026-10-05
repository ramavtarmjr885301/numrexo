import Link from 'next/link';
import { searchPostsForAdmin, AdminPostStatus, AdminPostSort, AdminDateBy } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import DeletePostButton from '@/components/admin/DeletePostButton';
import PostFilters from '@/components/admin/PostFilters';
import { PageHeader } from '@/components/admin/AdminUi';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { q?: string; category?: string; status?: string; sort?: string; dateBy?: string; from?: string; to?: string; page?: string };
}

const IST = 'Asia/Kolkata';
const dateFmt = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: IST });
const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: IST });

export default async function AdminPostsPage({ searchParams }: PageProps) {
  const status = (['live', 'scheduled', 'draft'].includes(searchParams.status || '') ? searchParams.status : 'all') as AdminPostStatus;
  const sort = (['oldest', 'updated', 'title_az', 'title_za'].includes(searchParams.sort || '') ? searchParams.sort : 'newest') as AdminPostSort;
  const dateBy = (searchParams.dateBy === 'updated' ? 'updated' : 'published') as AdminDateBy;
  const q = (searchParams.q || '').slice(0, 100);
  const category = (searchParams.category || '').slice(0, 60);
  const from = searchParams.from || '';
  const to = searchParams.to || '';
  const page = Math.max(1, Number(searchParams.page) || 1);

  const data = await searchPostsForAdmin({ q, category, status, sort, dateBy, from, to, page });

  // Link that keeps every current filter and changes only what is passed in.
  const href = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    const merged: Record<string, string | number | undefined> = {
      q,
      category,
      status: status === 'all' ? '' : status,
      sort: sort === 'newest' ? '' : sort,
      dateBy: dateBy === 'published' ? '' : dateBy,
      from,
      to,
      page: '',
      ...over,
    };
    for (const [k, v] of Object.entries(merged)) if (v !== undefined && v !== '') p.set(k, String(v));
    const s = p.toString();
    return `/posts${s ? `?${s}` : ''}`;
  };

  const tab = (value: AdminPostStatus, label: string, n: number) => (
    <Link
      key={value}
      href={href({ status: value === 'all' ? '' : value, page: '' })}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
        status === value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
      }`}
    >
      {label} ({n})
    </Link>
  );

  const firstItem = data.total === 0 ? 0 : (data.page - 1) * data.pageSize + 1;
  const lastItem = Math.min(data.total, data.page * data.pageSize);

  return (
    <div>
      <PageHeader
        title="Blog posts"
        subtitle={`${data.counts.all} ${data.counts.all === 1 ? 'post' : 'posts'} match your search`}
        actions={
          <Link href="/new" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            + New post
          </Link>
        }
      />

      <PostFilters
        q={q}
        category={category}
        status={status}
        sort={sort}
        dateBy={dateBy}
        from={from}
        to={to}
        categories={data.categories.map((c) => ({ slug: c.slug, label: categoryLabel(c.slug), count: c.count }))}
      />

      <div className="flex flex-wrap gap-2 mb-3">
        {tab('all', 'All', data.counts.all)}
        {tab('live', 'Live', data.counts.live)}
        {tab('scheduled', 'Scheduled', data.counts.scheduled)}
        {tab('draft', 'Drafts', data.counts.draft)}
      </div>

      <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
        {/* Column headings (desktop) */}
        <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_110px_150px_150px_170px] gap-4 px-4 py-2.5 bg-slate-50 border-b border-slate-300 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <div>Title</div>
          <div>Status</div>
          <div>Publish date</div>
          <div>Last edited</div>
          <div className="text-right">Actions</div>
        </div>

        {data.posts.length === 0 && (
          <p className="p-6 text-slate-600 text-sm">
            {data.counts.all === 0 && !q && !category && !from && !to ? 'No posts yet. Click "New post" to start.' : 'No posts match these filters. Try clearing some filters.'}
          </p>
        )}

        <div className="divide-y divide-slate-200">
          {data.posts.map((post) => {
            const pub = new Date(post.publishedAt);
            const upd = new Date(post.updatedAt);
            const live = post.published && !post.scheduled;
            return (
              <div key={post.id} className="grid lg:grid-cols-[minmax(0,1fr)_110px_150px_150px_170px] gap-x-4 gap-y-2 px-4 py-3 items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">{categoryLabel(post.category)}</span>
                    {post.noindex && <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">noindex</span>}
                  </div>
                  <Link href={`/edit/${post.id}`} className="block text-slate-900 font-semibold text-sm sm:text-base truncate hover:text-blue-700">
                    {post.title}
                  </Link>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">
                    /blog/{post.slug} · {post.author}
                  </p>
                </div>

                <div>
                  {live && <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-100 text-emerald-800">Live</span>}
                  {post.scheduled && <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-purple-100 text-purple-800">Scheduled</span>}
                  {!post.published && <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-yellow-100 text-yellow-800">Draft</span>}
                </div>

                <div className="text-sm text-slate-800">
                  <span className="lg:hidden text-xs text-slate-500">Published: </span>
                  {dateFmt.format(pub)}
                  <div className="text-xs text-slate-500">{timeFmt.format(pub)} IST</div>
                </div>

                <div className="text-sm text-slate-800">
                  <span className="lg:hidden text-xs text-slate-500">Edited: </span>
                  {dateFmt.format(upd)}
                  <div className="text-xs text-slate-500">{timeFmt.format(upd)} IST</div>
                </div>

                <div className="flex items-center lg:justify-end gap-4">
                  {live ? (
                    <a href={`https://numrexo.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900">
                      View
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400" title={post.scheduled ? 'Scheduled - goes live automatically at the set time' : 'Draft - not live yet'}>
                      Not live
                    </span>
                  )}
                  <Link href={`/edit/${post.id}`} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                    Edit
                  </Link>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {data.total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm">
          <span className="text-slate-600">
            Showing {firstItem}–{lastItem} of {data.total}
          </span>
          <div className="flex items-center gap-2">
            {data.page > 1 ? (
              <Link href={href({ page: data.page - 1 })} className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-50">
                ← Previous
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400">← Previous</span>
            )}
            <span className="text-slate-600">
              Page {data.page} of {data.totalPages}
            </span>
            {data.page < data.totalPages ? (
              <Link href={href({ page: data.page + 1 })} className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-50">
                Next →
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400">Next →</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
