// lib/uploadImageClient.ts  (browser only)
//
// Shrinks a picture in the browser (long edge 1600px, WebP/JPEG) and uploads it
// to /api/admin/upload. A 6MB phone photo becomes ~200-400KB, which uploads
// fast, loads fast on the blog, and always fits the server's size limit.

const MAX_EDGE = 1600;
const TARGET_BYTES = 1_200_000;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This file could not be read as an image.'));
    };
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

/** Returns a smaller copy of the image, or the original if it is already small / cannot be shrunk. */
export async function shrinkImage(file: File): Promise<File> {
  // Animated GIFs would lose their animation on a canvas; leave them alone.
  if (file.type === 'image/gif') return file;
  let img: HTMLImageElement;
  try {
    img = await loadImage(file);
  } catch {
    return file;
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
  if (scale === 1 && file.size <= 400_000) return file;

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  // Transparent PNGs keep their transparency in WebP; for JPEG fallback paint white first.
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let blob: Blob | null = null;
  let type = 'image/webp';
  for (const q of [0.86, 0.78, 0.68, 0.55]) {
    blob = await toBlob(canvas, 'image/webp', q);
    if (blob && blob.type === 'image/webp' && blob.size <= TARGET_BYTES) break;
  }
  if (!blob || blob.type !== 'image/webp') {
    type = 'image/jpeg';
    const flat = document.createElement('canvas');
    flat.width = canvas.width;
    flat.height = canvas.height;
    const fctx = flat.getContext('2d');
    if (!fctx) return file;
    fctx.fillStyle = '#ffffff';
    fctx.fillRect(0, 0, flat.width, flat.height);
    fctx.drawImage(canvas, 0, 0);
    for (const q of [0.85, 0.75, 0.65, 0.5]) {
      blob = await toBlob(flat, 'image/jpeg', q);
      if (blob && blob.size <= TARGET_BYTES) break;
    }
  }
  if (!blob || blob.size >= file.size) return file;
  const base = file.name.replace(/\.[^.]+$/, '') || 'image';
  return new File([blob], `${base}.${type === 'image/webp' ? 'webp' : 'jpg'}`, { type });
}

export async function uploadImage(file: File): Promise<string> {
  const small = await shrinkImage(file);
  const formData = new FormData();
  formData.append('file', small);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed. Please try again.');
  return data.url as string;
}
