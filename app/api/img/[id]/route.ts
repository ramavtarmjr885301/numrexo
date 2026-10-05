import { NextRequest } from 'next/server';
import { loadImage } from '@/lib/imageDb';

export const dynamic = 'force-dynamic';

// Public: serves an image uploaded through the admin editor and stored in the
// database. The id is random and unguessable, and the content never changes,
// so browsers and the CDN may keep it for a year.
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const img = await loadImage(params.id.replace(/\.[a-z0-9]+$/i, ''));
    if (!img) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(img.data), {
      headers: {
        'Content-Type': img.contentType,
        'Content-Length': String(img.data.byteLength),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Unavailable', { status: 503 });
  }
}
