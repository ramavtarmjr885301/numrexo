// app/api/admin/upload/route.ts
//
// Handles image uploads from the admin editor (featured image + inline
// content images). With a Vercel Blob token the file goes to Blob Storage;
// without one it is stored in the Postgres database (lib/imageDb.ts) and
// served from /api/img/<id>. Either way a public URL is handed back. Blob Storage is what makes a real "pick a file from your
// computer" button possible - without it, the admin would have to host
// images somewhere else themselves and paste a URL in, which is exactly the
// clunky flow this replaces.

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { MAX_DB_IMAGE_BYTES, saveImage } from '@/lib/imageDb';

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

  // No Vercel Blob token: store the picture in the database instead. This is
  // the zero-setup path, so uploads work on a brand-new deployment.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (file.size > MAX_DB_IMAGE_BYTES) {
      return NextResponse.json(
        { error: 'This image is too large (over 2MB). Please pick a smaller picture - the editor shrinks big photos automatically, so try again.' },
        { status: 400 },
      );
    }
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const id = await saveImage(file.type, bytes);
      return NextResponse.json({ url: `/api/img/${id}` });
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ error: `Upload failed: ${reason}` }, { status: 500 });
    }
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
