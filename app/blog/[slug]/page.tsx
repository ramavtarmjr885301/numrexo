import { wpClient, getFeaturedImage, formatWpDate, getAuthorName, getMetaTitle, getMetaDescription } from '@/app/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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

            <article className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm">
                    <ol className="flex flex-wrap items-center gap-2 text-gray-500">
                        <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
                        {categoryNames.length > 0 && (
                            <>
                                <li>/</li>
                                <li className="text-gray-300">{categoryNames[0]}</li>
                            </>
                        )}
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {categoryNames.map((cat) => (
                            <span key={cat} className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                {cat}
                            </span>
                        ))}
                        <span className="text-xs text-gray-500">{formatWpDate(post.date)}</span>
                    </div>

                    <h1
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div
                        className="text-lg text-gray-400"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    <div className="mt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                            {author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm text-white">{author}</p>
                            <p className="text-xs text-gray-500">
                                Published on {formatWpDate(post.date)}
                                {post.modified !== post.date && ` • Updated on ${formatWpDate(post.modified)}`}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="relative h-80 md:h-96 rounded-xl overflow-hidden mb-8">
                        <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || post.title.rendered}
                            fill
                            className="object-cover"
                            priority
                        />
                        {featuredImage.caption && (
                            <p className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/50 px-3 py-1 rounded">
                                {featuredImage.caption}
                            </p>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-3">Share this article:</p>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(`https://www.numrexo.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm hover:bg-[#1a8cd8] transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.numrexo.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm hover:bg-[#0958a8] transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title.rendered} - https://www.numrexo.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm hover:bg-[#1da851] transition-colors"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-12 border-t border-gray-800 pt-8">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedPosts.map((related) => {
                                const relatedImage = getFeaturedImage(related);
                                return (
                                    <Link key={related.id} href={`/blog/${related.slug}`}>
                                        <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition-all h-full">
                                            {relatedImage && (
                                                <div className="relative h-32 overflow-hidden">
                                                    <Image
                                                        src={relatedImage.url}
                                                        alt={relatedImage.alt || related.title.rendered}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-3">
                                                <h3 className="text-sm font-medium text-white hover:text-blue-400 transition-colors line-clamp-2">
                                                    {related.title.rendered}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-1">
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
                <div className="mt-8">
                    <Link href="/blog" className="text-blue-400 hover:underline text-sm">
                        ← Back to Blog
                    </Link>
                </div>
            </article>
        </>
    );
}