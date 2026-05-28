import { MetadataRoute } from 'next'
import { CALCULATORS_REGISTRY, CATEGORIES } from '@/data/calculatorsRegistry'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.numrexo.com'
    const currentDate = new Date()

    // Static pages (manually maintained - add new static pages here)
    const staticPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/calculators`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ]

    // Category pages (automatically from CATEGORIES object)
    const categoryPages = Object.entries(CATEGORIES).map(([key, category]) => ({
        url: `${baseUrl}/calculators/${key}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Individual calculator pages (automatically from CALCULATORS_REGISTRY)
    const calculatorPages = CALCULATORS_REGISTRY.map((calculator) => ({
        url: `${baseUrl}${calculator.path}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: calculator.isNew ? 0.9 : 0.7, // Give higher priority to new calculators
    }))

    // Combine all pages
    return [...staticPages, ...categoryPages, ...calculatorPages]
}