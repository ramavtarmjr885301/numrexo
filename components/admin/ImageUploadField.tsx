'use client';

import { useRef, useState } from 'react';

interface ImageUploadFieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
}

// Used for the featured image field. Shows whatever URL is currently set as
// a small preview, a button that opens the computer's file picker and
// uploads straight to /api/admin/upload, and a plain text input underneath
// for the rare case Sanjay wants to paste a URL by hand instead (an image
// already hosted somewhere else, or one of the /blog-images/... paths the
// migrated posts use).
export default function ImageUploadField({ label, hint, value, onChange }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload nahi hua, dobara try karo.');
        return;
      }
      onChange(data.url);
    } catch {
      setError('Upload nahi hua - internet check karo aur dobara try karo.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm text-ink-soft mb-1.5">
        {label} {hint && <span className="text-ink-faint">({hint})</span>}
      </label>

      {value && (
        <div className="mb-2 relative w-full max-w-xs aspect-[16/9] rounded-lg overflow-hidden bg-cream border border-hairline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelected}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 rounded-lg bg-cream border border-hairline text-ink-soft text-sm hover:border-blue-600 disabled:opacity-50 transition-colors"
        >
          {uploading ? 'Upload ho raha hai...' : 'Computer se Upload karo'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="px-3 py-1.5 rounded-lg text-ink-faint text-sm hover:text-red-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="...ya yahan seedha image ka URL paste karo"
        className="mt-2 w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
      />
    </div>
  );
}
