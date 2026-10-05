// lib/seoScore.ts
//
// A small, transparent on-page SEO checklist for the blog editor (in the
// spirit of Yoast / Rank Math, but without pretending to be Google). Each
// check is simple and explained in plain words so the author knows exactly
// what to fix. Pure functions, no dependencies, runs in the browser as the
// author types.

export interface SeoInput {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  focusKeyword: string;
  contentMarkdown: string;
  featuredImage: string;
  faqCount: number;
  tagCount: number;
}

export type CheckStatus = 'good' | 'ok' | 'bad';

export interface SeoCheck {
  id: string;
  status: CheckStatus;
  label: string;
  hint: string;
}

export interface SeoReport {
  score: number; // 0-100
  checks: SeoCheck[];
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function wordCount(md: string): number {
  const text = stripMarkdown(md);
  return text ? text.split(' ').length : 0;
}

export function analyseSeo(input: SeoInput): SeoReport {
  const checks: SeoCheck[] = [];
  const add = (id: string, status: CheckStatus, label: string, hint: string) =>
    checks.push({ id, status, label, hint });

  const seoTitle = (input.metaTitle || input.title).trim();
  const description = (input.metaDescription || input.excerpt).trim();
  const kw = input.focusKeyword.trim().toLowerCase();
  const md = input.contentMarkdown;
  const text = stripMarkdown(md);
  const words = wordCount(md);
  const firstWords = text.split(' ').slice(0, 120).join(' ').toLowerCase();

  // --- Title ---------------------------------------------------------------
  const tl = seoTitle.length;
  if (tl === 0) add('title', 'bad', 'Title is missing', 'Add a title - it becomes the blue link in Google results.');
  else if (tl < 30) add('title', 'ok', `Title is short (${tl} characters)`, 'Aim for 50-60 characters so Google shows all of it and there is room for your keyword.');
  else if (tl <= 60) add('title', 'good', `Title length is good (${tl} characters)`, 'It should show in full in Google.');
  else add('title', 'ok', `Title is long (${tl} characters)`, 'Google cuts titles after about 60 characters. Shorten it.');

  // --- Description ---------------------------------------------------------
  const dl = description.length;
  if (dl === 0) add('desc', 'bad', 'Meta description is missing', 'Write an Excerpt or Meta Description - it is the 2-line text under the title in Google.');
  else if (dl < 110) add('desc', 'ok', `Description is short (${dl} characters)`, 'Aim for 120-160 characters to earn more clicks.');
  else if (dl <= 160) add('desc', 'good', `Description length is good (${dl} characters)`, 'It should show in full in Google.');
  else add('desc', 'ok', `Description is long (${dl} characters)`, 'Google cuts descriptions after about 160 characters.');

  // --- Slug ----------------------------------------------------------------
  const slug = input.slug.trim();
  if (!slug) add('slug', 'ok', 'Slug will be generated from the title', 'A short slug containing your keyword is best (e.g. best-sip-plans).');
  else if (slug.length > 75) add('slug', 'ok', 'Slug is very long', 'Keep the slug to 3-6 words.');
  else add('slug', 'good', 'Slug looks good', '');

  // --- Focus keyword -------------------------------------------------------
  if (!kw) {
    add('kw', 'ok', 'No focus keyword set', 'Enter the phrase people will search for (e.g. "sip calculator"). The keyword checks below run once you do.');
  } else {
    const inTitle = seoTitle.toLowerCase().includes(kw);
    add('kw-title', inTitle ? 'good' : 'bad', inTitle ? 'Keyword is in the title' : 'Keyword is not in the title', 'Put the focus keyword near the start of the title.');
    const inDesc = description.toLowerCase().includes(kw);
    add('kw-desc', inDesc ? 'good' : 'ok', inDesc ? 'Keyword is in the description' : 'Keyword is not in the description', 'Use the keyword once in the meta description.');
    const inSlug = slug.includes(kw.replace(/\s+/g, '-'));
    add('kw-slug', inSlug ? 'good' : 'ok', inSlug ? 'Keyword is in the slug' : 'Keyword is not in the slug', 'Better if the slug contains the keyword (with hyphens).');
    const inIntro = firstWords.includes(kw);
    add('kw-intro', inIntro ? 'good' : 'ok', inIntro ? 'Keyword appears in the opening paragraph' : 'Keyword is not in the first 100 words', 'Use the keyword naturally once in your first paragraph.');
    const occurrences = kw ? text.toLowerCase().split(kw).length - 1 : 0;
    const density = words > 0 ? (occurrences * kw.split(' ').length * 100) / words : 0;
    if (occurrences === 0) add('kw-body', 'bad', 'Keyword was not found in the content', 'Use it naturally 2-3 times in the article.');
    else if (density > 3) add('kw-body', 'ok', `Keyword appears very often (${occurrences} times)`, 'Avoid keyword stuffing - roughly 0.5% to 2% of the words is fine.');
    else add('kw-body', 'good', `Keyword appears ${occurrences} time${occurrences === 1 ? '' : 's'} in the content`, '');
  }

  // --- Content -------------------------------------------------------------
  if (words < 300) add('len', 'bad', `Content is very short (${words} words)`, 'Thin content is disliked by Google and AdSense. Aim for 600+ words.');
  else if (words < 600) add('len', 'ok', `Content is a little short (${words} words)`, 'Useful posts of 800-1,500 words tend to rank better.');
  else add('len', 'good', `Content length is good (${words} words)`, '');

  const h2s = (md.match(/^##\s+\S/gm) || []).length + (md.match(/<h2[\s>]/gi) || []).length;
  add('h2', h2s >= 2 ? 'good' : h2s === 1 ? 'ok' : 'bad', h2s >= 2 ? `${h2s} sub-headings (H2) found` : 'Few sub-headings (H2)', 'Break the article into sections with ## Heading - it is easier to read and builds the table of contents.');

  const internalLinks = (md.match(/\]\((https?:\/\/(www\.)?numrexo\.com)?\/[^)\s]*\)/g) || []).length;
  add('internal', internalLinks >= 1 ? 'good' : 'ok', internalLinks >= 1 ? `${internalLinks} internal link${internalLinks === 1 ? '' : 's'} found` : 'No internal links', 'Link to one of your calculators or another post, e.g. [SIP Calculator](/finance/sip-calculator).');

  const images = [...md.matchAll(/!\[([^\]]*)\]\(/g)];
  if (images.length === 0) add('img', 'ok', 'No images in the content', 'Add at least one useful image or chart.');
  else {
    const missingAlt = images.filter((m) => !m[1].trim()).length;
    add('alt', missingAlt === 0 ? 'good' : 'bad', missingAlt === 0 ? 'All images have alt text' : `${missingAlt} image${missingAlt === 1 ? '' : 's'} missing alt text`, 'Write a 3-8 word description of the image inside the [ ] brackets.');
  }

  add('feat', input.featuredImage ? 'good' : 'ok', input.featuredImage ? 'Featured image is set' : 'No featured image', 'The featured image appears in the blog list and when the post is shared.');
  add('faq', input.faqCount >= 2 ? 'good' : 'ok', input.faqCount >= 2 ? `${input.faqCount} FAQs added (can earn an FAQ rich result)` : 'No or few FAQs', 'Add 2-5 real questions and answers.');
  add('tags', input.tagCount >= 2 ? 'good' : 'ok', input.tagCount >= 2 ? `${input.tagCount} tags added` : 'Few tags', 'Add 2-5 relevant tags.');

  const weight = { good: 1, ok: 0.5, bad: 0 } as const;
  const total = checks.reduce((sum, c) => sum + weight[c.status], 0);
  const score = checks.length === 0 ? 0 : Math.round((total / checks.length) * 100);
  return { score, checks };
}
