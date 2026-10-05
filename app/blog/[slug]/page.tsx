// app/blog/[slug]/page.tsx

import { getPublishedPostBySlug, listAllSlugs, getRelatedPosts, getPostsBySlugs } from '@/lib/blogDb';
import { addHeadingIds, splitBeforeSecondH2 } from '@/lib/toc';
import { tagSlug } from '@/lib/tags';
import { CALCULATORS_REGISTRY } from '@/data/calculatorsRegistry';
import ShareBar from '@/components/common/ShareBar';
import SubscribeBox from '@/components/common/SubscribeBox';
import { categoryLabel } from '@/lib/blogTypes';
import { getRelatedCalculators } from '@/lib/relatedCalculators';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fitTitle, fitDescription, htmlToText } from '@/lib/metaFit';
import { ensureImgAlt } from '@/lib/imgAlt';

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
      description: 'The requested blog post could not be found. Browse the latest Numrexo guides on loans, savings, taxes and health, or try one of our free calculators.',
      robots: { index: false, follow: true },
    };
  }

  const canonical = post.canonicalUrl || `https://numrexo.com/blog/${post.slug}`;
  const socialImage = post.ogImage || post.featuredImage;
  // metaTitle/metaDescription are the admin's optional SEO overrides - most
  // posts won't set them, so fall back to the same title/excerpt used
  // everywhere else on the site.
  // Titles are kept to 60 characters and descriptions to 120-160 (Bing/Google
  // length guidance). A short description is extended with the post's own opening
  // text, never with filler.
  const title = post.metaTitle ? fitTitle(post.metaTitle, '') : fitTitle(post.title);
  const description = fitDescription(post.metaDescription || post.excerpt, htmlToText(post.contentHtml));
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    keywords: post.tags.length ? post.tags : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags.length ? post.tags : undefined,
      images: socialImage ? [socialImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: socialImage ? [socialImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await getPublishedPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedCalculators = getRelatedCalculators(post.category, 4);
  // Hand-picked related posts first, topped up with automatic ones from the
  // same category, never more than 3 and never repeating one.
  const pickedPosts = await getPostsBySlugs(post.relatedSlugs.filter((s) => s !== post.slug));
  const autoPosts = pickedPosts.length >= 3 ? [] : await getRelatedPosts(post.category, post.slug, 3);
  const relatedPosts = [...pickedPosts, ...autoPosts]
    .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 3);

  const { html: contentWithIds, items: tocItems } = addHeadingIds(ensureImgAlt(post.contentHtml, post.title));
  const showToc = post.showToc && tocItems.filter((i) => i.level === 2).length >= 3;
  const ctaCalc = post.ctaCalculator
    ? CALCULATORS_REGISTRY.find((c) => c.id === post.ctaCalculator && !c.comingSoon)
    : undefined;
  const { before: contentBefore, after: contentAfter } = ctaCalc
    ? splitBeforeSecondH2(contentWithIds)
    : { before: contentWithIds, after: '' };
  const postUrl = post.canonicalUrl || `https://numrexo.com/blog/${post.slug}`;
  const shareUrl = `https://numrexo.com/blog/${post.slug}`;
  const proseClass = 'blog-content';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: fitDescription(post.metaDescription || post.excerpt, htmlToText(post.contentHtml)),
            mainEntityOfPage: postUrl,
            keywords: post.tags.length ? post.tags.join(', ') : undefined,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            image: post.ogImage || post.featuredImage || undefined,
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

        {showToc && (
          <nav
            aria-label="Table of contents"
            className="mb-6 sm:mb-8 rounded-xl border border-hairline bg-surface p-4 sm:p-5"
          >
            <p className="text-sm font-semibold text-ink mb-2">In this article</p>
            <ol className="space-y-1 text-sm">
              {tocItems.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                  <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div>
          <div dangerouslySetInnerHTML={{ __html: contentBefore }} className={proseClass} />

          {ctaCalc && (
            <aside className="not-prose my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6 flex items-center gap-4">
              <div className="text-4xl flex-shrink-0" aria-hidden="true">
                {ctaCalc.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Try it yourself</p>
                <p className="text-base sm:text-lg font-semibold text-ink">{ctaCalc.name}</p>
                <p className="text-sm text-ink-soft">{ctaCalc.desc}. Free, no sign-up.</p>
              </div>
              <Link
                href={ctaCalc.path}
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Open →
              </Link>
            </aside>
          )}

          {contentAfter && <div dangerouslySetInnerHTML={{ __html: contentAfter }} className={proseClass} />}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-faint">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tagSlug(tag)}`}
                className="text-xs px-2.5 py-1 rounded-full bg-surface border border-hairline text-ink-soft hover:border-blue-600 hover:text-ink"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

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
          <ShareBar url={shareUrl} title={post.title} heading="Share this article:" />
        </div>

        <SubscribeBox className="mt-8 sm:mt-10" />

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
