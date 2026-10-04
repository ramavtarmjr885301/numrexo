import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { createPost, slugExists } from '@/lib/blogDb';
import { parsePostBody } from '@/lib/postInput';

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== 'string' || !body.title.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const { slug, values } = parsePostBody(body);
  if (!slug) {
    return NextResponse.json({ error: 'Could not generate a slug from that title' }, { status: 400 });
  }
  if (await slugExists(slug)) {
    return NextResponse.json({ error: `A post already uses the slug "${slug}"` }, { status: 409 });
  }

  const post = await createPost(values);
  if (!post) {
    return NextResponse.json({ error: 'Could not save the post - check the server logs' }, { status: 500 });
  }

  return NextResponse.json({ post });
}
