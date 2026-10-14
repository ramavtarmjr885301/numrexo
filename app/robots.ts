import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default function robots(): MetadataRoute.Robots {
    // app.numrexo.com is the blog's admin/writing panel - it should never be
    // crawled or indexed, on top of the password gate and the /admin
    // redirect-away that middleware.ts already enforces on every other host.
    // blog.numrexo.com is the old WordPress address, now just a set of 301
    // redirects into numrexo.com/blog - nothing there to index either.
    const host = headers().get('host') || ''
    if (
        host === 'app.numrexo.com' || host.startsWith('app.numrexo.com:') ||
        host === 'blog.numrexo.com' || host.startsWith('blog.numrexo.com:')
    ) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        }
    }

    return {
        rules: {
            userAgent: '*',
            // /_next/ (CSS + JavaScript) must stay crawlable: Google renders the calculator
            // pages with it, and a page it cannot render looks empty. /api/img/ serves the
            // images uploaded in the blog editor, so Google Images must be able to fetch them.
            allow: ['/', '/api/img/'],
            disallow: [
                '/api/',      // Disable API routes (except /api/img/, allowed above - the longer rule wins)
                '/admin',     // Blog admin panel (only actually reachable via app.numrexo.com)
            ],
        },
        sitemap: 'https://numrexo.com/sitemap.xml',
    }
}