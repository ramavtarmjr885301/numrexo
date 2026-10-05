import Link from 'next/link';
import { listAllPostsForAdmin } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import { PageHeader } from '@/components/admin/AdminUi';
import DeletePostButton from '@/components/admin/DeletePostButton';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await listAllPostsForAdmin();
  const now = Date.now();
  const isScheduled = (p: { published: boolean; publishedAt: string }) =>
    p.published && new Date(p.publishedAt).getTime() > now;

  return (
    <div>
      <PageHeader
        title="Blog posts"
        subtitle={`${posts.length} posts`}
        actions={
          <Link href="/new" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            + New post
          </Link>
        }
      />

      <div className="bg-white border border-slate-300 rounded-xl divide-y divide-slate-200 shadow-sm">
        {posts.length === 0 && <p className="p-6 text-slate-600 text-sm">No posts yet. Click "New post" to start.</p>}
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">{categoryLabel(post.category)}</span>
                {!post.published && <span className="text-[11px] px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-medium">Draft</span>}
                {isScheduled(post) && <span className="text-[11px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Scheduled</span>}
                {post.noindex && <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">noindex</span>}
              </div>
              <p className="text-slate-900 font-medium text-sm sm:text-base truncate">{post.title}</p>
              <p className="text-slate-500 text-xs mt-0.5">/blog/{post.slug}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              {post.published && !isScheduled(post) ? (
                <a href={`https://numrexo.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900">
                  View live
                </a>
              ) : (
                <span className="text-sm text-slate-400" title={isScheduled(post) ? 'Scheduled - goes live automatically at the set time' : 'Draft - not live yet'}>
                  Not live
                </span>
              )}
              <Link href={`/edit/${post.id}`} className="text-sm font-medium text-blue-700 hover:text-blue-900">
                Edit
              </Link>
              <DeletePostButton id={post.id} title={post.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
