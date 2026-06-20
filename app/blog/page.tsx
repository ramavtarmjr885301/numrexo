import { wpClient, getFeaturedImage, formatWpDate, getMetaTitle, getMetaDescription, getAuthorName } from '../wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog – Numrexo Finance & Math Guides',
    description: 'Read our latest articles on personal finance, loans, investments, taxes, and mathematical calculations.',
};

interface BlogPageProps {
    searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const page = parseInt(searchParams.page || '1');
    const perPage = 9;

    const { posts, total, totalPages } = await wpClient.getPostsWithPagination(page, perPage);
    const categories = await wpClient.getCategories();

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header with RSS Link */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        📝 Numrexo Blog
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Expert guides, tips, and insights on finance, loans, investments, and math
                    </p>
                </div>
                <Link
                    href="/rss"
                    target="_blank"
                    className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1 bg-[#0f1525] px-3 py-2 rounded-lg border border-gray-700 whitespace-nowrap"
                >
                    📡 RSS Feed
                </Link>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Link href="/blog" className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                    All
                </Link>
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/blog/category/${cat.slug}`}
                        className="px-3 py-1 text-sm rounded-full bg-[#0f1525] border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white transition-colors"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>

            {/* Blog Grid */}
            {posts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => {
                            const featuredImage = getFeaturedImage(post);
                            const author = getAuthorName(post);

                            return (
                                <Link key={post.id} href={`/blog/${post.slug}`}>
                                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all group h-full flex flex-col">
                                        {featuredImage && (
                                            <div className="relative h-48 overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={featuredImage.url}
                                                    alt={featuredImage.alt || post.title.rendered}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                        )}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                {post.categories && post.categories.length > 0 && (
                                                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                                                        {post.categories.map((catId) => {
                                                            const cat = categories.find(c => c.id === catId);
                                                            return cat ? cat.name : '';
                                                        }).filter(Boolean).join(', ')}
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-500">
                                                    {formatWpDate(post.date)}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors line-clamp-2">
                                                {post.title.rendered}
                                            </h3>
                                            <div
                                                className="text-sm text-gray-400 mt-2 line-clamp-3 flex-grow"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-xs text-gray-500">{author}</span>
                                                <span className="text-blue-400 text-sm group-hover:translate-x-1 transition-transform">
                                                    Read More →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                                <Link
                                    key={p}
                                    href={`/blog?page=${p}`}
                                    className={`px-4 py-2 rounded-lg text-sm ${p === page
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
                    <p className="text-gray-400">No blog posts found. Coming soon!</p>
                </div>
            )}
        </div>
    );
}