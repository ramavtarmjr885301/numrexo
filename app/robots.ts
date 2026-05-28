import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',      // Disable API routes
                '/_next/',    // Disable Next.js internal files
            ],
        },
        sitemap: 'https://www.numrexo.com/sitemap.xml',
    }
}