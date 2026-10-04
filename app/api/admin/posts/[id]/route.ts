import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { getPostById, updatePost, deletePost, slugExists } from '@/lib/blogDb';
import { parsePostBody } from '@/lib/postInput';

interface Params {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  const existing = await getPostById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== 'string' || !body.title.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const { slug, values } = parsePostBody(body);
  if (!slug) {
    return NextResponse.json({ error: 'Could not generate a slug from that title' }, { status: 400 });
  }
  if (await slugExists(slug, id)) {
    return NextResponse.json({ error: `A post already uses the slug "${slug}"` }, { status: 409 });
  }

  const post = await updatePost(id, values);
  if (!post) {
    return NextResponse.json({ error: 'Could not save the post - check the server logs' }, { status: 500 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  const ok = await deletePost(id);
  if (!ok) {
    return NextResponse.json({ error: 'Could not delete the post' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
