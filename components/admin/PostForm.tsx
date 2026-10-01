'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS, BlogFaq } from '@/lib/blogTypes';
import ImageUploadField from '@/components/admin/ImageUploadField';
import RichMarkdownEditor from '@/components/admin/RichMarkdownEditor';
import FaqEditor from '@/components/admin/FaqEditor';

export interface PostFormValues {
  id?: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  contentMarkdown: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  faqs: BlogFaq[];
  published: boolean;
}

const EMPTY: PostFormValues = {
  title: '',
  slug: '',
  category: 'finance',
  author: 'Sanjay Singh',
  excerpt: '',
  contentMarkdown: '',
  featuredImage: '',
  metaTitle: '',
  metaDescription: '',
  faqs: [],
  published: true,
};

export default function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(initial || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isEdit = Boolean(initial?.id);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = isEdit ? `/api/admin/posts/${initial!.id}` : '/api/admin/posts';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Save nahi hua, dobara try karo.');
        return;
      }
      router.push('/');
      router.refresh();
    } catch {
      setError('Kuch gadbad hui. Dobara try karo.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm text-ink-soft mb-1.5">Title</label>
        <input
          value={values.title}
          onChange={(e) => update('title', e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink focus:outline-none focus:border-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm text-ink-soft mb-1.5">
          URL slug{' '}
          <span className="text-ink-faint">(khaali chhod do to title se auto-ban jayega)</span>
        </label>
        <input
          value={values.slug}
          onChange={(e) => update('slug', e.target.value)}
          placeholder="auto-generated-from-title"
          className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink focus:outline-none focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-ink-soft mb-1.5">Category</label>
          <select
            value={values.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink focus:outline-none focus:border-blue-600"
          >
            {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
              <option key={slug} value={slug}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-ink-soft mb-1.5">Author</label>
          <input
            value={values.author}
            onChange={(e) => update('author', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      <ImageUploadField
        label="Featured Image"
        hint="optional - blog list aur post ke top par dikhegi"
        value={values.featuredImage}
        onChange={(url) => update('featuredImage', url)}
      />

      <div>
        <label className="block text-sm text-ink-soft mb-1.5">
          Excerpt <span className="text-ink-faint">(blog list aur Google me dikhega, 1-2 line)</span>
        </label>
        <textarea
          value={values.excerpt}
          onChange={(e) => update('excerpt', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink focus:outline-none focus:border-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm text-ink-soft mb-1.5">Content</label>
        <RichMarkdownEditor
          value={values.contentMarkdown}
          onChange={(v) => update('contentMarkdown', v)}
        />
      </div>

      <div className="p-4 rounded-lg bg-cream border border-hairline space-y-4">
        <h3 className="text-sm font-semibold text-ink-soft">SEO (Google search result)</h3>

        <div>
          <label className="block text-sm text-ink-soft mb-1.5">
            Meta Title{' '}
            <span className="text-ink-faint">
              (optional - khaali chhod do to normal Title use hoga; 50-60 letters best hai)
            </span>
          </label>
          <input
            value={values.metaTitle}
            onChange={(e) => update('metaTitle', e.target.value)}
            maxLength={70}
            className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm text-ink-soft mb-1.5">
            Meta Description{' '}
            <span className="text-ink-faint">
              (optional - khaali chhod do to Excerpt use hoga; 150-160 letters best hai)
            </span>
          </label>
          <textarea
            value={values.metaDescription}
            onChange={(e) => update('metaDescription', e.target.value)}
            rows={2}
            maxLength={200}
            className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      <FaqEditor value={values.faqs} onChange={(v) => update('faqs', v)} />

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => update('published', e.target.checked)}
          className="w-4 h-4"
        />
        Published (uncheck karke draft ki tarah save kar sakte ho)
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Publish Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-5 py-2 rounded-lg bg-cream border border-hairline text-ink-soft hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
