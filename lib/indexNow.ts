// lib/indexNow.ts
//
// Tells Bing (and other IndexNow search engines) the moment a page is published,
// edited or removed, one URL at a time, instead of only in a bulk batch after each
// deploy. The key file lives at /public/<key>.txt and the same key goes in the
// INDEXNOW_KEY environment variable. Never throws: a failed ping must not block
// saving a post.

import { SITE_URL } from '@/lib/seo';

// The key is public by design (it is served at /<key>.txt); this fallback is the
// key already deployed in /public.
const DEFAULT_KEY = '34fa63b2ed3d7ae2e4cba99a055e169e';

export async function pingIndexNow(paths: string[]): Promise<boolean> {
  const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
  const urlList = Array.from(new Set(paths.map((p) => (p.startsWith('http') ? p : `${SITE_URL}${p}`))));
  if (!urlList.length) return false;
  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
