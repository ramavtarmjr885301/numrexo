import { listPostsByCategory } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { fitDescription } from '@/lib/metaFit';

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
  const { posts, total } = await listPostsByCategory(params.category, 1, 3);
  // Built from the real posts in this category, so every category page has its own
  // description (and an empty one is kept out of the index).
  const titles = posts.map((p) => p.title).join('; ');
  const lead = total
    ? `${total} ${total === 1 ? 'guide' : 'guides'} on ${label.toLowerCase()} from the Numrexo team, including ${titles}.`
    : `Numrexo guides on ${label.toLowerCase()}.`;
  const description = fitDescription(
    lead,
    `Free, practical explanations with worked examples, plus the matching ${label.toLowerCase()} calculators from Numrexo.`,
  );
  return {
    title: `${label} Guides and Articles`,
    description,
    alternates: { canonical: `https://numrexo.com/blog/category/${params.category}` },
    ...(total === 0 ? { robots: { index: false, follow: true } } : {}),
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
        <h1 className="text-3xl font-bold text-ink">📝 {label}</h1>
        <p className="text-ink-soft mt-2">Read articles about {label}</p>
      </div>

      <Link href="/blog" className="text-blue-600 hover:underline text-sm inline-block mb-6">
        ← Back to All Posts
      </Link>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all group h-full flex flex-col">
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
                    <h3 className="text-lg font-semibold text-ink group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-2 line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-ink-faint">{formatDate(post.publishedAt)}</span>
                      <span className="text-blue-600 text-sm group-hover:translate-x-1 transition-transform">
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
          <p className="text-ink-soft">No posts in this category yet.</p>
        </div>
      )}
    </div>
  );
}
