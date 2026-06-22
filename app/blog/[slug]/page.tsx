// app/blog/[slug]/page.tsx

import { wpClient, getFeaturedImage, formatWpDate, getAuthorName, getMetaTitle, getMetaDescription, getRelatedCalculators } from '@/app/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CalculatorType } from '@/data/calculatorsRegistry';
export const revalidate = 3600;
interface BlogDetailPageProps {
    params: { slug: string };
}

// Generate static paths
export async function generateStaticParams() {
    const posts = await wpClient.getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
    const post = await wpClient.getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: getMetaTitle(post),
        description: getMetaDescription(post),
        openGraph: {
            title: getMetaTitle(post),
            description: getMetaDescription(post),
            images: getFeaturedImage(post) ? [getFeaturedImage(post)!.url] : [],
        },
    };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const post = await wpClient.getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const featuredImage = getFeaturedImage(post);
    const author = getAuthorName(post);
    const categories = await wpClient.getCategories();

    // Get category names
    const categoryNames = post.categories?.map((catId) => {
        const cat = categories.find(c => c.id === catId);
        return cat ? cat.name : '';
    }).filter(Boolean) || [];

    // Get category slug for calculator mapping
    const categorySlug = post.categories?.map((catId) => {
        const cat = categories.find(c => c.id === catId);
        return cat ? cat.slug : '';
    }).filter(Boolean)[0] || 'finance';

    // Get related calculators
    const relatedCalculators: CalculatorType[] = await getRelatedCalculators(categorySlug, 4);

    // Get related posts
    let relatedPosts: any[] = [];
    if (post.categories && post.categories.length > 0) {
        const allRelated = await wpClient.getPostsByCategory(post.categories[0]);
        relatedPosts = allRelated.filter(p => p.id !== post.id).slice(0, 3);
    }

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title.rendered,
                        "description": post.excerpt.rendered.replace(/<[^>]+>/g, ''),
                        "author": {
                            "@type": "Person",
                            "name": author
                        },
                        "datePublished": post.date,
                        "dateModified": post.modified,
                        "image": featuredImage ? featuredImage.url : undefined,
                    })
                }}
            />

            <article className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-4xl">
                {/* Breadcrumb */}
                <nav className="mb-4 sm:mb-6 text-xs sm:text-sm overflow-x-auto">
                    <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-500 whitespace-nowrap">
                        <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
                        {categoryNames.length > 0 && (
                            <>
                                <li>/</li>
                                <li className="text-gray-300 truncate max-w-[100px] sm:max-w-none">{categoryNames[0]}</li>
                            </>
                        )}
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-6 sm:mb-8">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {categoryNames.map((cat) => (
                            <span key={cat} className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-500/20 text-blue-400">
                                {cat}
                            </span>
                        ))}
                        <span className="text-[10px] sm:text-xs text-gray-500">{formatWpDate(post.date)}</span>
                    </div>

                    <h1
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div
                        className="text-base sm:text-lg text-gray-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    <div className="mt-3 sm:mt-4 flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm sm:text-base">
                            {author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm sm:text-base text-white">{author}</p>
                            <p className="text-xs text-gray-500">
                                Published on {formatWpDate(post.date)}
                                {post.modified !== post.date && ` • Updated on ${formatWpDate(post.modified)}`}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 sm:mb-8 bg-[#0f1525]">
                        <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || post.title.rendered}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                            className="object-cover"
                            priority
                        />
                        {featuredImage.caption && (
                            <p className="absolute bottom-2 left-2 text-[10px] sm:text-xs text-white/70 bg-black/50 px-2 sm:px-3 py-1 rounded">
                                {featuredImage.caption}
                            </p>
                        )}
                    </div>
                )}

                {/* Content - Mobile friendly typography */}
                <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none">
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        className="[&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h3]:text-lg sm:[&_h3]:text-xl [&_img]:rounded-lg [&_img]:my-4 [&_ul]:pl-4 sm:[&_ul]:pl-6 [&_ol]:pl-4 sm:[&_ol]:pl-6 [&_li]:text-sm sm:[&_li]:text-base [&_li]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:text-gray-300 [&_table]:text-xs sm:[&_table]:text-sm [&_table]:w-full [&_table]:overflow-x-auto [&_td]:px-2 sm:[&_td]:px-4 [&_td]:py-1 sm:[&_td]:py-2 [&_th]:px-2 sm:[&_th]:px-4 [&_th]:py-1 sm:[&_th]:py-2 [&_img]:max-w-full [&_img]:h-auto"
                    />
                </div>

                {/* Share Buttons - Mobile friendly */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-3">Share this article:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(`https://www.numrexo.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1DA1F2] text-white rounded-lg text-xs sm:text-sm hover:bg-[#1a8cd8] transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.numrexo.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0A66C2] text-white rounded-lg text-xs sm:text-sm hover:bg-[#0958a8] transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title.rendered} - https://www.numrexo.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#25D366] text-white rounded-lg text-xs sm:text-sm hover:bg-[#1da851] transition-colors"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Related Calculators - Mobile friendly */}
                {relatedCalculators.length > 0 && (
                    <section className="mt-8 sm:mt-12 border-t border-gray-800 pt-6 sm:pt-8">
                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                            🧮 Related Calculators
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                            {relatedCalculators.map((calc) => (
                                <Link
                                    key={calc.id}
                                    href={calc.path}
                                    className="bg-[#111827] border border-gray-800 rounded-lg p-3 sm:p-4 hover:border-blue-500 transition-all text-center group"
                                >
                                    <div className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform">
                                        {calc.icon}
                                    </div>
                                    <h3 className="text-[10px] sm:text-xs font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {calc.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Posts - Mobile friendly */}
                {relatedPosts.length > 0 && (
                    <section className="mt-8 sm:mt-12 border-t border-gray-800 pt-6 sm:pt-8">
                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {relatedPosts.map((related) => {
                                const relatedImage = getFeaturedImage(related);
                                return (
                                    <Link key={related.id} href={`/blog/${related.slug}`}>
                                        <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition-all h-full flex flex-col">
                                            {relatedImage && (
                                                <div className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0 bg-[#0f1525]">
                                                    <Image
                                                        src={relatedImage.url}
                                                        alt={relatedImage.alt || related.title.rendered}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-2.5 sm:p-3 flex flex-col flex-grow">
                                                <h3 className="text-xs sm:text-sm font-medium text-white hover:text-blue-400 transition-colors line-clamp-2">
                                                    {related.title.rendered}
                                                </h3>
                                                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                                                    {formatWpDate(related.date)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Back to Blog */}
                <div className="mt-6 sm:mt-8">
                    <Link href="/blog" className="text-blue-400 hover:underline text-sm">
                        ← Back to Blog
                    </Link>
                </div>
            </article>
        </>
    );
}