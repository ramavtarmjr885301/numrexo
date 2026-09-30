import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { createPost, slugExists } from '@/lib/blogDb';
import { markdownToHtml } from '@/lib/markdown';
import { slugify } from '@/lib/slugify';
import { sanitizeFaqs } from '@/lib/faqs';

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== 'string' || !body.title.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const slug = typeof body.slug === 'string' && body.slug.trim() ? slugify(body.slug) : slugify(body.title);
  if (!slug) {
    return NextResponse.json({ error: 'Could not generate a slug from that title' }, { status: 400 });
  }
  if (await slugExists(slug)) {
    return NextResponse.json({ error: `A post already uses the slug "${slug}"` }, { status: 409 });
  }

  const contentMarkdown = body.contentMarkdown || '';
  const post = await createPost({
    slug,
    title: body.title.trim(),
    category: body.category || 'finance',
    author: (body.author || 'Sanjay Singh').trim(),
    excerpt: (body.excerpt || '').trim(),
    contentHtml: markdownToHtml(contentMarkdown),
    contentMarkdown,
    featuredImage: body.featuredImage?.trim() || null,
    metaTitle: (body.metaTitle || '').trim() || null,
    metaDescription: (body.metaDescription || '').trim() || null,
    faqs: sanitizeFaqs(body.faqs),
    published: Boolean(body.published),
  });

  if (!post) {
    return NextResponse.json({ error: 'Could not save the post - check the server logs' }, { status: 500 });
  }

  return NextResponse.json({ post });
}
