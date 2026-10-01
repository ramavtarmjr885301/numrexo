import { listPublishedPosts, listCategoriesWithCounts } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog: Guides on Money, Loans and Everyday Math',
  description:
    'Practical guides on mortgages and loans, saving and investing, taxes, health metrics and the maths behind our calculators. Written by the Numrexo team.',
  alternates: { canonical: 'https://numrexo.com/blog' },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1');
  const perPage = 9;

  const [{ posts, totalPages }, categories] = await Promise.all([
    listPublishedPosts(page, perPage),
    listCategoriesWithCounts(),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink">
            📝 Numrexo Blog
          </h1>
          <p className="text-sm sm:text-base text-ink-soft mt-1 sm:mt-2">
            Expert guides, tips, and insights on finance, loans, investments, and math
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        <Link href="/blog" className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-blue-600 text-white">
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-surface border border-hairline text-ink-soft hover:border-blue-600 hover:text-ink transition-colors"
          >
            {categoryLabel(cat.slug)}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all group h-full flex flex-col">
                  {post.featuredImage && (
                    <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {categoryLabel(post.category)}
                      </span>
                      <span className="text-[10px] sm:text-xs text-ink-faint">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-ink group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-soft mt-1.5 sm:mt-2 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-ink-faint">{post.author}</span>
                      <span className="text-blue-600 text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/blog?page=${p}`}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${
                    p === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-surface border border-hairline text-ink-soft hover:border-blue-600 hover:text-ink'
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
          <p className="text-ink-soft">No blog posts found. Coming soon!</p>
        </div>
      )}
    </div>
  );
}
