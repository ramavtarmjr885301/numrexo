// app/blog/[slug]/page.tsx

import { getPublishedPostBySlug, listAllSlugs, getRelatedPosts } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import { getRelatedCalculators } from '@/lib/relatedCalculators';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600;

interface BlogDetailPageProps {
  params: { slug: string };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

export async function generateStaticParams() {
  const slugs = await listAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const canonical = `https://numrexo.com/blog/${post.slug}`;
  // metaTitle/metaDescription are the admin's optional SEO overrides - most
  // posts won't set them, so fall back to the same title/excerpt used
  // everywhere else on the site.
  const title = post.metaTitle || `${post.title} | Numrexo Blog`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await getPublishedPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedCalculators = getRelatedCalculators(post.category, 4);
  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            image: post.featuredImage || undefined,
          }),
        }}
      />

      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      <article className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-4xl">
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm overflow-x-auto">
          <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-ink-faint whitespace-nowrap">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            <li>/</li>
            <li className="text-ink-soft truncate max-w-[100px] sm:max-w-none">
              {categoryLabel(post.category)}
            </li>
          </ol>
        </nav>

        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-50 text-blue-700">
              {categoryLabel(post.category)}
            </span>
            <span className="text-[10px] sm:text-xs text-ink-faint">{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-3 sm:mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">{post.excerpt}</p>

          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm sm:text-base">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm sm:text-base text-ink">{post.author}</p>
              <p className="text-xs text-ink-faint">
                Published on {formatDate(post.publishedAt)}
                {post.updatedAt !== post.publishedAt && ` • Updated on ${formatDate(post.updatedAt)}`}
              </p>
            </div>
          </div>
        </header>

        {post.featuredImage && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 sm:mb-8 bg-cream">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-ink prose-p:text-ink-soft prose-strong:text-ink prose-a:text-blue-600">
          <div
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            className="[&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h3]:text-lg sm:[&_h3]:text-xl [&_img]:rounded-lg [&_img]:my-4 [&_ul]:pl-4 sm:[&_ul]:pl-6 [&_ol]:pl-4 sm:[&_ol]:pl-6 [&_li]:text-sm sm:[&_li]:text-base [&_li]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:text-ink-soft [&_table]:text-xs sm:[&_table]:text-sm [&_table]:w-full [&_table]:overflow-x-auto [&_td]:px-2 sm:[&_td]:px-4 [&_td]:py-1 sm:[&_td]:py-2 [&_th]:px-2 sm:[&_th]:px-4 [&_th]:py-1 sm:[&_th]:py-2 [&_img]:max-w-full [&_img]:h-auto"
          />
        </div>

        {post.faqs.length > 0 && (
          <section className="mt-8 sm:mt-12 border-t border-hairline pt-6 sm:pt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-ink mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {post.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface border border-hairline rounded-lg p-3 sm:p-4 open:border-blue-300"
                >
                  <summary className="cursor-pointer text-sm sm:text-base text-ink font-medium list-none flex items-center justify-between gap-2">
                    {faq.question}
                    <span className="text-ink-faint group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-2 sm:mt-3 text-sm text-ink-soft leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-hairline">
          <p className="text-sm text-ink-soft mb-3">Share this article:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://numrexo.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1DA1F2] text-white rounded-lg text-xs sm:text-sm hover:bg-[#1a8cd8] transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://numrexo.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0A66C2] text-white rounded-lg text-xs sm:text-sm hover:bg-[#0958a8] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - https://numrexo.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#25D366] text-white rounded-lg text-xs sm:text-sm hover:bg-[#1da851] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {relatedCalculators.length > 0 && (
          <section className="mt-8 sm:mt-12 border-t border-hairline pt-6 sm:pt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-ink mb-3 sm:mb-4">
              🧮 Related Calculators
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {relatedCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.path}
                  className="bg-surface border border-hairline rounded-lg p-3 sm:p-4 hover:border-blue-300 hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform">
                    {calc.icon}
                  </div>
                  <h3 className="text-[10px] sm:text-xs font-medium text-ink group-hover:text-blue-600 transition-colors line-clamp-2">
                    {calc.name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-8 sm:mt-12 border-t border-hairline pt-6 sm:pt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-ink mb-3 sm:mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <div className="bg-surface border border-hairline rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all h-full flex flex-col">
                    {related.featuredImage && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0 bg-cream">
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-2.5 sm:p-3 flex flex-col flex-grow">
                      <h3 className="text-xs sm:text-sm font-medium text-ink hover:text-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-ink-faint mt-1">
                        {formatDate(related.publishedAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 sm:mt-8">
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}
