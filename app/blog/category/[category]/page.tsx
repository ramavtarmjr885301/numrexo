// import { wpClient, getFeaturedImage, formatWpDate } from '../..wordpress';
import { wpClient, getFeaturedImage, formatWpDate } from '@/app/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: { category: string };
    searchParams: { page?: string };
}

// Generate metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const categories = await wpClient.getCategories();
    const category = categories.find(c => c.slug === params.category);

    return {
        title: `${category?.name || 'Category'} – Numrexo Blog`,
        description: `Read articles about ${category?.name || ''} on Numrexo blog.`,
    };
}

// ✅ Default export - React Component
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const page = parseInt(searchParams.page || '1');
    const perPage = 9;

    const categories = await wpClient.getCategories();
    const category = categories.find(c => c.slug === params.category);

    if (!category) {
        notFound();
    }

    const { posts } = await wpClient.getPostsWithPagination(page, perPage);
    const categoryPosts = posts.filter(p => p.categories?.includes(category.id));

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">📝 {category.name}</h1>
                <p className="text-gray-400 mt-2">
                    {category.description || `Read articles about ${category.name}`}
                </p>
            </div>

            {/* Back Link */}
            <Link href="/blog" className="text-blue-400 hover:underline text-sm inline-block mb-6">
                ← Back to All Posts
            </Link>

            {/* Blog Grid */}
            {categoryPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryPosts.map((post) => {
                        const featuredImage = getFeaturedImage(post);
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
                                        <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors line-clamp-2">
                                            {post.title.rendered}
                                        </h3>
                                        <div
                                            className="text-sm text-gray-400 mt-2 line-clamp-3 flex-grow"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{formatWpDate(post.date)}</span>
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
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-400">No posts in this category yet.</p>
                </div>
            )}
        </div>
    );
}