import { wpClient, getFeaturedImage, formatWpDate, getMetaTitle, getMetaDescription, getAuthorName } from '../wordpress';
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

interface BlogPageProps {
    searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const page = parseInt(searchParams.page || '1');
    const perPage = 9;

    const { posts, total, totalPages } = await wpClient.getPostsWithPagination(page, perPage);
    const categories = await wpClient.getCategories();

    return (
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-6xl">
            {/* Header with RSS Link - Mobile Friendly */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        📝 Numrexo Blog
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">
                        Expert guides, tips, and insights on finance, loans, investments, and math
                    </p>
                </div>
                {/* <Link
                    href="/rss"
                    target="_blank"
                    className="text-orange-400 hover:text-orange-300 text-xs sm:text-sm flex items-center gap-1 bg-[#0f1525] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-700 whitespace-nowrap self-start sm:self-auto"
                >
                    📡 RSS Feed
                </Link> */}
            </div>

            {/* Category Filter - Mobile Friendly */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                <Link href="/blog" className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-blue-500 text-white">
                    All
                </Link>
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/blog/category/${cat.slug}`}
                        className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-[#0f1525] border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white transition-colors"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>

            {/* Blog Grid - Mobile Friendly */}
            {posts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {posts.map((post) => {
                            const featuredImage = getFeaturedImage(post);
                            const author = getAuthorName(post);

                            return (
                                <Link key={post.id} href={`/blog/${post.slug}`}>
                                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all group h-full flex flex-col">
                                        {featuredImage && (
                                            <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={featuredImage.url}
                                                    alt={featuredImage.alt || post.title.rendered}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                        )}
                                        <div className="p-3 sm:p-4 flex flex-col flex-grow">
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                                {post.categories && post.categories.length > 0 && (
                                                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                                                        {post.categories.map((catId) => {
                                                            const cat = categories.find(c => c.id === catId);
                                                            return cat ? cat.name : '';
                                                        }).filter(Boolean).join(', ')}
                                                    </span>
                                                )}
                                                <span className="text-[10px] sm:text-xs text-gray-500">
                                                    {formatWpDate(post.date)}
                                                </span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-semibold text-white hover:text-blue-400 transition-colors line-clamp-2">
                                                {post.title.rendered}
                                            </h3>
                                            <div
                                                className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2 line-clamp-3 flex-grow"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                            <div className="mt-3 sm:mt-4 flex items-center justify-between">
                                                <span className="text-[10px] sm:text-xs text-gray-500">{author}</span>
                                                <span className="text-blue-400 text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                                                    Read More →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Pagination - Mobile Friendly */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
                            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                                <Link
                                    key={p}
                                    href={`/blog?page=${p}`}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${p === page
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