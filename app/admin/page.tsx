import Link from 'next/link';
import { listAllPostsForAdmin } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import LogoutButton from '@/components/admin/LogoutButton';
import DeletePostButton from '@/components/admin/DeletePostButton';

export default async function AdminDashboardPage() {
  const posts = await listAllPostsForAdmin();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Numrexo Blog Admin</h1>
          <p className="text-sm text-gray-400 mt-1">{posts.length} posts</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/new"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            + New Post
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-[#111827] border border-gray-800 rounded-xl divide-y divide-gray-800">
        {posts.length === 0 && (
          <p className="p-6 text-gray-400 text-sm">Abhi koi post nahi hai. "New Post" se shuru karo.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                  {categoryLabel(post.category)}
                </span>
                {!post.published && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                    Draft
                  </span>
                )}
              </div>
              <p className="text-white text-sm sm:text-base truncate">{post.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">/blog/{post.slug}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {post.published ? (
                <a
                  href={`https://numrexo.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  View Live
                </a>
              ) : (
                <span className="text-sm text-gray-600" title="Draft hai, abhi live nahi hai">
                  Not live
                </span>
              )}
              <Link href={`/edit/${post.id}`} className="text-sm text-blue-400 hover:text-blue-300">
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
