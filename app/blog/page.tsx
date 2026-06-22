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












// import { wpClient, getFeaturedImage, formatWpDate, getAuthorName } from '../wordpress';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Metadata } from 'next';
// import { Rss, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// export const metadata: Metadata = {
//     title: 'Blog – Numrexo Finance & Math Guides',
//     description: 'Read our latest articles on personal finance, loans, investments, taxes, and mathematical calculations.',
// };

// interface BlogPageProps {
//     searchParams: { page?: string };
// }

// export default async function BlogPage({ searchParams }: BlogPageProps) {
//     const page = parseInt(searchParams.page || '1');
//     const perPage = 9;

//     const { posts, total, totalPages } = await wpClient.getPostsWithPagination(page, perPage);
//     const categories = await wpClient.getCategories();

//     return (
//         <div className="max-w-6xl mx-auto px-4 py-10">

//             {/* Hero Header */}
//             <div className="flex justify-between items-start gap-4 flex-wrap">
//                 <div>
//                     <p className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-1">
//                         Knowledge base
//                     </p>
//                     <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
//                         Numrexo Blog
//                     </h1>
//                     <p className="text-gray-400 mt-1.5 text-[15px]">
//                         Expert guides on finance, loans, investments &amp; math
//                     </p>
//                 </div>

//                 <Link
//                     href="/rss"
//                     target="_blank"
//                     className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-colors rounded-lg px-3.5 py-2 bg-[#0f1525] whitespace-nowrap"
//                 >
//                     <Rss size={14} />
//                     RSS Feed
//                 </Link>
//             </div>

//             <hr className="border-gray-800 my-6" />

//             {/* Category Pills */}
//             <div className="flex flex-wrap gap-2 mb-5">
//                 <Link
//                     href="/blog"
//                     className="text-[13px] px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-400"
//                 >
//                     All posts
//                 </Link>
//                 {categories.map((cat) => (
//                     <Link
//                         key={cat.id}
//                         href={`/blog/category/${cat.slug}`}
//                         className="text-[13px] px-4 py-1.5 rounded-full border border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/10 transition-colors bg-[#0f1525]"
//                     >
//                         {cat.name}
//                     </Link>
//                 ))}
//             </div>

//             {/* Stats row */}
//             <div className="flex gap-5 text-[13px] text-gray-500 mb-7">
//                 <span><span className="text-white font-medium">{total}</span> articles</span>
//                 <span><span className="text-white font-medium">{categories.length}</span> categories</span>
//             </div>

//             {/* Blog Grid */}
//             {posts.length > 0 ? (
//                 <>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                         {posts.map((post) => {
//                             const featuredImage = getFeaturedImage(post);
//                             const author = getAuthorName(post);
//                             const postCategory = post.categories && post.categories.length > 0
//                                 ? categories.find(c => c.id === post.categories[0])
//                                 : null;

//                             return (
//                                 <Link key={post.id} href={`/blog/${post.slug}`} className="group">
//                                     <div className="bg-[#0f1525] border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col hover:border-blue-500/50 transition-all duration-200 hover:-translate-y-0.5">

//                                         {/* Image / Placeholder */}
//                                         <div className="relative h-44 flex-shrink-0 bg-[#0a1020] flex items-center justify-center overflow-hidden">
//                                             {featuredImage ? (
//                                                 <Image
//                                                     src={featuredImage.url}
//                                                     alt={featuredImage.alt || post.title.rendered}
//                                                     fill
//                                                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                                                 />
//                                             ) : (
//                                                 <span className="text-4xl opacity-20">📝</span>
//                                             )}
//                                             {postCategory && (
//                                                 <span className="absolute top-2.5 left-2.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
//                                                     {postCategory.name}
//                                                 </span>
//                                             )}
//                                         </div>

//                                         {/* Card Body */}
//                                         <div className="p-4 flex flex-col flex-grow gap-2">
//                                             <div className="flex items-center gap-2">
//                                                 {postCategory && (
//                                                     <span className="text-[11px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
//                                                         {postCategory.name}
//                                                     </span>
//                                                 )}
//                                                 <span className="text-[12px] text-gray-600">
//                                                     {formatWpDate(post.date)}
//                                                 </span>
//                                             </div>

//                                             <h3 className="text-[15px] font-medium text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
//                                                 {post.title.rendered}
//                                             </h3>

//                                             <div
//                                                 className="text-[13px] text-gray-400 leading-relaxed line-clamp-3 flex-grow"
//                                                 dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
//                                             />

//                                             <div className="flex items-center justify-between pt-2.5 border-t border-gray-800 mt-1">
//                                                 <div className="flex items-center gap-1.5">
//                                                     <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[9px] font-medium text-blue-400 flex-shrink-0">
//                                                         {author?.[0]?.toUpperCase() || 'N'}
//                                                     </div>
//                                                     <span className="text-[12px] text-gray-600">{author}</span>
//                                                 </div>
//                                                 <span className="text-[12px] text-blue-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
//                                                     Read more <ArrowRight size={12} />
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             );
//                         })}
//                     </div>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <div className="flex justify-center items-center gap-1.5 mt-10 flex-wrap">
//                             {page > 1 && (
//                                 <Link
//                                     href={`/blog?page=${page - 1}`}
//                                     className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 bg-[#0f1525] transition-colors"
//                                 >
//                                     <ChevronLeft size={14} />
//                                 </Link>
//                             )}

//                             {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => {
//                                 if (totalPages > 7 && p > 4 && p < totalPages - 1 && Math.abs(p - page) > 1) {
//                                     if (p === 5) return <span key={p} className="text-gray-600 text-[13px] px-1">…</span>;
//                                     return null;
//                                 }
//                                 return (
//                                     <Link
//                                         key={p}
//                                         href={`/blog?page=${p}`}
//                                         className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] border transition-colors ${p === page
//                                             ? 'bg-blue-500/15 border-blue-500/40 text-blue-400 font-medium'
//                                             : 'border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 bg-[#0f1525]'
//                                             }`}
//                                     >
//                                         {p}
//                                     </Link>
//                                 );
//                             })}

//                             {page < totalPages && (
//                                 <Link
//                                     href={`/blog?page=${page + 1}`}
//                                     className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 bg-[#0f1525] transition-colors"
//                                 >
//                                     <ChevronRight size={14} />
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <div className="text-center py-16">
//                     <p className="text-4xl mb-3 opacity-30">📝</p>
//                     <p className="text-gray-400 text-[15px]">No posts yet. Check back soon!</p>
//                 </div>
//             )}
//         </div>
//     );
// }