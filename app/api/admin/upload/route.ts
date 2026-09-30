// app/api/admin/upload/route.ts
//
// Handles image uploads from the admin editor (featured image + inline
// content images) by storing them in Vercel Blob Storage and handing back a
// public URL. Blob Storage is what makes a real "pick a file from your
// computer" button possible - without it, the admin would have to host
// images somewhere else themselves and paste a URL in, which is exactly the
// clunky flow this replaces.

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          'Image storage is not set up yet on this deployment - see PATCH15-STEPS.md (the Vercel Blob Storage step).',
      },
      { status: 500 },
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file received' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG, PNG, WEBP or GIF images are allowed' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image is larger than 5MB - resize it and try again' }, { status: 400 });
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-') || 'image';
    const blob = await put(`blog-uploads/${Date.now()}-${safeName}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Upload failed: ${reason}` }, { status: 500 });
  }
}
