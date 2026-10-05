'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS, BlogFaq } from '@/lib/blogTypes';
import { CALCULATORS_REGISTRY } from '@/data/calculatorsRegistry';
import { slugify } from '@/lib/slugify';
import ImageUploadField from '@/components/admin/ImageUploadField';
import RichMarkdownEditor from '@/components/admin/RichMarkdownEditor';
import FaqEditor from '@/components/admin/FaqEditor';
import SerpPreview from '@/components/admin/SerpPreview';
import SeoScorePanel from '@/components/admin/SeoScorePanel';
import TagsInput from '@/components/admin/TagsInput';

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
  // Patch 19
  tags: string[];
  ogImage: string;
  canonicalUrl: string;
  noindex: boolean;
  focusKeyword: string;
  relatedSlugs: string[];
  ctaCalculator: string;
  showToc: boolean;
  // ISO timestamp, or '' for "now" on a brand-new post.
  publishedAt: string;
}

export interface OtherPostOption {
  slug: string;
  title: string;
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
  tags: [],
  ogImage: '',
  canonicalUrl: '',
  noindex: false,
  focusKeyword: '',
  relatedSlugs: [],
  ctaCalculator: '',
  showToc: true,
  publishedAt: '',
};

const INPUT =
  'w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600';
const CARD = 'p-4 rounded-xl bg-surface border border-hairline space-y-4';

// <input type="datetime-local"> wants "YYYY-MM-DDTHH:mm" in the browser's
// own timezone, while the database stores a UTC instant.
function isoToLocalInput(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function PostForm({
  initial,
  otherPosts = [],
}: {
  initial?: PostFormValues;
  otherPosts?: OtherPostOption[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(initial || EMPTY);
  const [dateLocal, setDateLocal] = useState<string>(isoToLocalInput(initial?.publishedAt || ''));
  const [slugTouched, setSlugTouched] = useState<boolean>(Boolean(initial?.slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isEdit = Boolean(initial?.id);
  const originalSlug = initial?.slug || '';

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onTitleChange(title: string) {
    setValues((v) => ({
      ...v,
      title,
      // Keep the slug in step with the title until the author edits the slug
      // by hand (and never silently rewrite an existing post's live URL).
      slug: !isEdit && !slugTouched ? slugify(title) : v.slug,
    }));
  }

  const scheduled = useMemo(() => {
    if (!values.published || !dateLocal) return false;
    const d = new Date(dateLocal);
    return !Number.isNaN(d.getTime()) && d.getTime() > Date.now();
  }, [values.published, dateLocal]);

  const seoTitle = values.metaTitle || values.title;
  const seoDescription = values.metaDescription || values.excerpt;
  const slugForPreview = values.slug || slugify(values.title);

  const seoInput = useMemo(
    () => ({
      title: values.title,
      slug: slugForPreview,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
      excerpt: values.excerpt,
      focusKeyword: values.focusKeyword,
      contentMarkdown: values.contentMarkdown,
      featuredImage: values.featuredImage,
      faqCount: values.faqs.filter((f) => f.question.trim() && f.answer.trim()).length,
      tagCount: values.tags.length,
    }),
    [values, slugForPreview],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Work out the publish date to send.
    let publishedAt = '';
    if (dateLocal) {
      const d = new Date(dateLocal);
      if (!Number.isNaN(d.getTime())) publishedAt = d.toISOString();
    } else if (isEdit && initial?.publishedAt) {
      publishedAt = initial.publishedAt;
    }

    try {
      const url = isEdit ? `/api/admin/posts/${initial!.id}` : '/api/admin/posts';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, publishedAt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't save. Please try again.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      router.push('/');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const slugChangedOnLivePost = isEdit && values.published && values.slug && values.slug !== originalSlug;

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
      {/* ------------------------------ MAIN COLUMN ------------------------------ */}
      <div className="space-y-5 min-w-0">
        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <div>
          <label className="block text-sm text-ink-soft mb-1.5">Title</label>
          <input
            value={values.title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
            className={INPUT}
          />
        </div>

        <div>
          <label className="block text-sm text-ink-soft mb-1.5">
            URL slug <span className="text-ink-faint">(the post's link; leave empty to build it from the title)</span>
          </label>
          <div className="flex items-center rounded-lg bg-cream border border-hairline focus-within:border-blue-600 overflow-hidden">
            <span className="pl-3 text-xs text-ink-faint whitespace-nowrap">numrexo.com/blog/</span>
            <input
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              onBlur={() => update('slug', slugify(values.slug))}
              placeholder="auto-generated-from-title"
              className="flex-1 px-1 py-2 bg-transparent text-ink text-sm focus:outline-none"
            />
          </div>
          {slugChangedOnLivePost && (
            <p className="text-xs text-red-600 mt-1.5">
              Heads up: this post is live. If you change the slug, the old link (on Google, WhatsApp and social media) will stop
              working. Don't change it unless you have to.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-ink-soft mb-1.5">
            Excerpt <span className="text-ink-faint">(shown on the blog list, 1-2 lines)</span>
          </label>
          <textarea
            value={values.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            rows={2}
            className={INPUT}
          />
        </div>

        <div>
          <label className="block text-sm text-ink-soft mb-1.5">Content</label>
          <RichMarkdownEditor value={values.contentMarkdown} onChange={(v) => update('contentMarkdown', v)} />
          <p className="text-xs text-ink-faint mt-1.5">
            For a sub-heading, write <code>## Heading</code> - the post's &quot;In this article&quot; table of
            contents is built from these.
          </p>
        </div>

        {/* ------------------------------ SEO ------------------------------ */}
        <div className={CARD}>
          <h3 className="text-sm font-semibold text-ink">SEO (Google search result)</h3>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Focus keyword{' '}
              <span className="text-ink-faint">(the phrase people will search on Google; only used for the SEO score)</span>
            </label>
            <input
              value={values.focusKeyword}
              onChange={(e) => update('focusKeyword', e.target.value)}
              placeholder="e.g. sip calculator"
              className={INPUT}
            />
          </div>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Meta Title <span className="text-ink-faint">(empty = the normal Title; 50-60 characters is best)</span>
            </label>
            <input
              value={values.metaTitle}
              onChange={(e) => update('metaTitle', e.target.value)}
              maxLength={120}
              className={INPUT}
            />
          </div>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Meta Description <span className="text-ink-faint">(empty = the Excerpt; 120-160 characters is best)</span>
            </label>
            <textarea
              value={values.metaDescription}
              onChange={(e) => update('metaDescription', e.target.value)}
              rows={2}
              maxLength={300}
              className={INPUT}
            />
          </div>

          <SerpPreview title={seoTitle} slug={slugForPreview} description={seoDescription} />
        </div>

        {/* ------------------------------ SOCIAL & ADVANCED ------------------------------ */}
        <div className={CARD}>
          <h3 className="text-sm font-semibold text-ink">Social share &amp; advanced SEO</h3>

          <ImageUploadField
            label="Social share image"
            hint="Shown when the link is shared on WhatsApp, Facebook or X (1200x630 is best). Empty = the Featured Image."
            value={values.ogImage}
            onChange={(url) => update('ogImage', url)}
          />

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Canonical URL <span className="text-ink-faint">(only fill this in if this content is a copy of another URL)</span>
            </label>
            <input
              value={values.canonicalUrl}
              onChange={(e) => update('canonicalUrl', e.target.value)}
              placeholder={`https://numrexo.com/blog/${slugForPreview || 'your-slug'}`}
              className={INPUT}
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={values.noindex}
              onChange={(e) => update('noindex', e.target.checked)}
              className="w-4 h-4 mt-0.5"
            />
            <span>
              Hide from Google (noindex) <span className="text-ink-faint">- the post stays live but won't appear in search and is removed from the sitemap</span>
            </span>
          </label>
        </div>

        {/* ------------------------------ ENGAGEMENT ------------------------------ */}
        <div className={CARD}>
          <h3 className="text-sm font-semibold text-ink">Extras inside the post</h3>

          <label className="flex items-start gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={values.showToc}
              onChange={(e) => update('showToc', e.target.checked)}
              className="w-4 h-4 mt-0.5"
            />
            <span>
              &quot;In this article&quot; table of contents{' '}
              <span className="text-ink-faint">(when the post has 3 or more sub-headings)</span>
            </span>
          </label>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Calculator box <span className="text-ink-faint">(a &quot;Try it free&quot; box for this calculator in the middle of the post)</span>
            </label>
            <select
              value={values.ctaCalculator}
              onChange={(e) => update('ctaCalculator', e.target.value)}
              className={INPUT}
            >
              <option value="">- none -</option>
              {CALCULATORS_REGISTRY.filter((c) => !c.comingSoon).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Choose related posts yourself <span className="text-ink-faint">(max 6; the rest are added automatically)</span>
            </label>
            <select
              multiple
              value={values.relatedSlugs}
              onChange={(e) =>
                update(
                  'relatedSlugs',
                  Array.from(e.target.selectedOptions)
                    .map((o) => o.value)
                    .slice(0, 6),
                )
              }
              className={`${INPUT} h-36`}
            >
              {otherPosts
                .filter((p) => p.slug !== values.slug)
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title}
                  </option>
                ))}
            </select>
            <p className="text-xs text-ink-faint mt-1">Hold Ctrl (Cmd on Mac) to select more than one.</p>
          </div>
        </div>

        <FaqEditor value={values.faqs} onChange={(v) => update('faqs', v)} />

        <div className="flex gap-3 pt-2 lg:hidden">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : values.published ? 'Publish Post' : 'Save Draft'}
          </button>
        </div>
      </div>

      {/* ------------------------------ SIDEBAR ------------------------------ */}
      <aside className="space-y-5 lg:sticky lg:top-4">
        <div className={CARD}>
          <h3 className="text-sm font-semibold text-ink">Publish</h3>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">Status</label>
            <select
              value={values.published ? 'published' : 'draft'}
              onChange={(e) => update('published', e.target.value === 'published')}
              className={INPUT}
            >
              <option value="published">Published</option>
              <option value="draft">Draft (not live)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              Publish date &amp; time <span className="text-ink-faint">(empty = now)</span>
            </label>
            <input
              type="datetime-local"
              value={dateLocal}
              onChange={(e) => setDateLocal(e.target.value)}
              className={INPUT}
            />
            {scheduled && (
              <p className="text-xs text-blue-700 mt-1.5">
                Scheduled: this post goes live automatically at that time (and is added to the sitemap too; it can occasionally be up to an hour late).
              </p>
            )}
            {dateLocal && (
              <button
                type="button"
                onClick={() => setDateLocal('')}
                className="text-xs text-ink-faint hover:text-ink mt-1"
              >
                Clear date (publish now)
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving
                ? 'Saving...'
                : isEdit
                  ? 'Save Changes'
                  : !values.published
                    ? 'Save Draft'
                    : scheduled
                      ? 'Schedule Post'
                      : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-5 py-2 rounded-lg bg-cream border border-hairline text-ink-soft hover:text-ink transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className={CARD}>
          <h3 className="text-sm font-semibold text-ink">Category &amp; author</h3>
          <div>
            <label className="block text-sm text-ink-soft mb-1.5">Category</label>
            <select value={values.category} onChange={(e) => update('category', e.target.value)} className={INPUT}>
              {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-ink-soft mb-1.5">Tags</label>
            <TagsInput value={values.tags} onChange={(t) => update('tags', t)} />
          </div>
          <div>
            <label className="block text-sm text-ink-soft mb-1.5">Author</label>
            <input value={values.author} onChange={(e) => update('author', e.target.value)} className={INPUT} />
          </div>
        </div>

        <div className={CARD}>
          <ImageUploadField
            label="Featured Image"
            hint="Shown on the blog list and at the top of the post"
            value={values.featuredImage}
            onChange={(url) => update('featuredImage', url)}
          />
        </div>

        <div className={CARD}>
          <SeoScorePanel input={seoInput} />
        </div>
      </aside>
    </form>
  );
}
