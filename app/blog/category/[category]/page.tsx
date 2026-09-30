import { listPostsByCategory } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

interface CategoryPageProps {
  params: { category: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const label = categoryLabel(params.category);
  return {
    title: `${label} – Numrexo Blog`,
    description: `Read articles about ${label} on Numrexo blog.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const page = parseInt(searchParams.page || '1');
  const perPage = 9;
  const label = categoryLabel(params.category);

  const { posts, totalPages } = await listPostsByCategory(params.category, page, perPage);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">📝 {label}</h1>
        <p className="text-gray-400 mt-2">Read articles about {label}</p>
      </div>

      <Link href="/blog" className="text-blue-400 hover:underline text-sm inline-block mb-6">
        ← Back to All Posts
      </Link>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all group h-full flex flex-col">
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                      <span className="text-blue-400 text-sm group-hover:translate-x-1 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/blog/category/${params.category}?page=${p}`}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    p === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#0f1525] border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No posts in this category yet.</p>
        </div>
      )}
    </div>
  );
}
