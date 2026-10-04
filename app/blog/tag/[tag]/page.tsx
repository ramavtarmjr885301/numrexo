import { listPostsByTag } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600;

interface TagPageProps {
  params: { tag: string };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

// Tag archives are navigation aids, not content of their own, so they are
// kept out of Google's index (still crawlable via "follow") to avoid adding
// thin pages to the site.
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const label = decodeURIComponent(params.tag).replace(/-/g, ' ');
  return {
    title: `Posts tagged "${label}"`,
    description: `Numrexo blog posts tagged ${label}.`,
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const posts = await listPostsByTag(params.tag);
  if (posts.length === 0) notFound();

  // Show the tag the way the author typed it, taken from the first post.
  const display =
    posts[0].tags.find((t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === params.tag) ||
    params.tag.replace(/-/g, ' ');

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
      <Link href="/blog" className="text-blue-600 hover:underline text-sm inline-block mb-4">
        ← Back to all posts
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-1">#{display}</h1>
      <p className="text-ink-soft mb-6 sm:mb-8">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
      </p>

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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 self-start mb-2">
                  {categoryLabel(post.category)}
                </span>
                <h2 className="text-base font-semibold text-ink group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-ink-soft mt-2 line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-ink-faint mt-auto pt-3">{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
