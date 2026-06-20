// app/rss.xml/route.ts

import { wpClient, getFeaturedImage } from '../wordpress';
import RSS from 'rss';
import { NextResponse } from 'next/server';

export async function GET() {
    const posts = await wpClient.getPosts();
    const baseUrl = 'https://numrexo.com';

    const feed = new RSS({
        title: 'Numrexo Blog',
        description: 'Expert guides on finance, loans, investments, and math',
        feed_url: `${baseUrl}/rss.xml`,
        site_url: baseUrl,
        image_url: `${baseUrl}/favicon.ico`,
        managingEditor: 'Numrexo Team',
        webMaster: 'Numrexo Team',
        copyright: `2024-${new Date().getFullYear()} Numrexo`,
        language: 'en-us',
        pubDate: new Date(),
        ttl: 60,
    });

    posts.forEach((post) => {
        const featuredImage = getFeaturedImage(post);
        const author = post._embedded?.author?.[0]?.name || 'Numrexo Team';

        feed.item({
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
            url: `${baseUrl}/blog/${post.slug}`,
            guid: `${baseUrl}/blog/${post.slug}`,
            categories: post.categories?.map((catId) => catId.toString()) || [],
            author: author,
            date: post.date,
            enclosure: featuredImage ? {
                url: featuredImage.url,
                type: 'image/jpeg',
            } : undefined,
        });
    });

    const xml = feed.xml({ indent: true });

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}