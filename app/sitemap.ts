// app/sitemap.ts
//
// What changed and why:
//
// 1. `lastModified` used to be `new Date()` for every URL, so all 138 entries
//    carried the same timestamp — the build time. Identical lastmod across a
//    whole site is noise, and Google ignores it. Dates now come from each
//    calculator's `updatedAt` in data/calculatorsSeo.ts, so bumping one page's
//    date is a real freshness signal.
//
// 2. `changeFrequency: 'daily'` was set on everything, including the privacy
//    policy. Google has said for years it ignores changefreq, and claiming
//    daily updates on a static legal page is the kind of low-quality signal
//    reviewers notice. It is gone.
//
// 3. Blog posts and /contact were missing entirely — 8 published posts were not
//    in the sitemap at all. Posts are now pulled from WordPress at build time,
//    with a try/catch so a WordPress outage cannot break the build.
//
// 4. Comingsoon calculators are excluded — no point asking Google to index a
//    page that has nothing on it yet.

import { MetadataRoute } from 'next'
import { CALCULATORS_REGISTRY, CATEGORIES } from '@/data/calculatorsRegistry'
import { SITE_URL, calculatorLastModified } from '@/lib/seo'
import { SITE_DEFAULT_UPDATED_AT } from '@/data/calculatorsSeo'
import { wpClient } from '@/app/wordpress'

const baseUrl = SITE_URL

// Revalidate the sitemap hourly so newly published blog posts appear without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteDate = new Date(SITE_DEFAULT_UPDATED_AT)

    // ─────────────────────────────────────────────────────────
    // Static pages
    // ─────────────────────────────────────────────────────────
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: siteDate, priority: 1.0 },
        { url: `${baseUrl}/calculators`, lastModified: siteDate, priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: siteDate, priority: 0.7 },
        { url: `${baseUrl}/about`, lastModified: siteDate, priority: 0.6 },
        { url: `${baseUrl}/contact`, lastModified: siteDate, priority: 0.5 },
        { url: `${baseUrl}/privacy`, lastModified: siteDate, priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: siteDate, priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: siteDate, priority: 0.3 },
    ]

    // ─────────────────────────────────────────────────────────
    // Category hub pages
    // ─────────────────────────────────────────────────────────
    const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((categoryKey) => ({
        url: `${baseUrl}/${categoryKey}`,
        lastModified: siteDate,
        priority: 0.75,
    }))

    // ─────────────────────────────────────────────────────────
    // Calculator pages
    // Priority: popular + new = 0.95, new = 0.90, popular = 0.85, else 0.70
    // ─────────────────────────────────────────────────────────
    const calculatorPages: MetadataRoute.Sitemap = CALCULATORS_REGISTRY
        .filter((calculator) => !calculator.comingSoon)
        .map((calculator) => {
            let priority = 0.7
            if (calculator.isNew && calculator.popularity) priority = 0.95
            else if (calculator.isNew) priority = 0.9
            else if (calculator.popularity) priority = 0.85

            return {
                url: `${baseUrl}${calculator.path}`,
                lastModified: calculatorLastModified(calculator),
                priority,
            }
        })

    // ─────────────────────────────────────────────────────────
    // Blog posts — pulled from WordPress, never allowed to fail the build
    // ─────────────────────────────────────────────────────────
    let blogPages: MetadataRoute.Sitemap = []
    try {
        const posts = await wpClient.getPosts()
        blogPages = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.modified || post.date),
            priority: 0.6,
        }))
    } catch (error) {
        console.warn('[sitemap] Could not fetch blog posts from WordPress:', error)
    }

    return [...staticPages, ...categoryPages, ...calculatorPages, ...blogPages]
}
