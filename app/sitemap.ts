import { MetadataRoute } from 'next'
import { CALCULATORS_REGISTRY, CATEGORIES } from '@/data/calculatorsRegistry'

const baseUrl = 'https://numrexo.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date()

    // ─────────────────────────────────────────────────────────
    // Static pages
    // ─────────────────────────────────────────────────────────
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/calculators`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // ─────────────────────────────────────────────────────────
    // Category pages — auto from CATEGORIES
    // FIXED: Direct category URLs (not /calculators/health)
    // ─────────────────────────────────────────────────────────
    const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map(
        (categoryKey) => ({
            url: `${baseUrl}/${categoryKey}`,  // ← FIXED: removed /calculators/
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.75,
        })
    )

    // ─────────────────────────────────────────────────────────
    // Individual calculator pages — auto from CALCULATORS_REGISTRY
    // Priority logic:
    //   isNew + popular = 0.95  (boost for fresh popular pages)
    //   isNew only      = 0.90  (new pages get crawled fast)
    //   popular only    = 0.85  (proven traffic pages)
    //   default         = 0.70
    // ─────────────────────────────────────────────────────────
    const calculatorPages: MetadataRoute.Sitemap = CALCULATORS_REGISTRY.map(
        (calculator) => {
            let priority = 0.7
            if (calculator.isNew && calculator.popularity) priority = 0.95
            else if (calculator.isNew) priority = 0.9
            else if (calculator.popularity) priority = 0.85

            return {
                url: `${baseUrl}${calculator.path}`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority,
            }
        }
    )

    return [...staticPages, ...categoryPages, ...calculatorPages]
}