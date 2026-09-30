// app/rss/route.ts

import { listPublishedPosts } from '@/lib/blogDb';
import { categoryLabel } from '@/lib/blogTypes';
import RSS from 'rss';
import { NextResponse } from 'next/server';

export async function GET() {
  const { posts } = await listPublishedPosts(1, 50);
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
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      guid: `${baseUrl}/blog/${post.slug}`,
      categories: [categoryLabel(post.category)],
      author: post.author,
      date: post.publishedAt,
      enclosure: post.featuredImage
        ? {
            url: post.featuredImage.startsWith('http')
              ? post.featuredImage
              : `${baseUrl}${post.featuredImage}`,
            type: 'image/jpeg',
          }
        : undefined,
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
