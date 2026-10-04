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
  if (tl === 0) add('title', 'bad', 'Title missing', 'Title likho - ye Google me blue link banta hai.');
  else if (tl < 30) add('title', 'ok', `Title chhota hai (${tl} letters)`, '50-60 letters me rakho taaki Google poora dikhaye aur keyword ki jagah mile.');
  else if (tl <= 60) add('title', 'good', `Title length theek hai (${tl} letters)`, 'Google me poora dikhega.');
  else add('title', 'ok', `Title lamba hai (${tl} letters)`, '60 se zyada letters Google me kat jate hain. Chhota karo.');

  // --- Description ---------------------------------------------------------
  const dl = description.length;
  if (dl === 0) add('desc', 'bad', 'Meta description missing', 'Excerpt ya Meta Description likho - ye Google ke neeche ka 2-line text hai.');
  else if (dl < 110) add('desc', 'ok', `Description chhota hai (${dl} letters)`, '120-160 letters me likho, taaki zyada log click karein.');
  else if (dl <= 160) add('desc', 'good', `Description length theek hai (${dl} letters)`, 'Google me poora dikhega.');
  else add('desc', 'ok', `Description lamba hai (${dl} letters)`, '160 se zyada letters kat jate hain.');

  // --- Slug ----------------------------------------------------------------
  const slug = input.slug.trim();
  if (!slug) add('slug', 'ok', 'Slug title se auto banega', 'Chhota, keyword wala slug best hai (jaise best-sip-plans).');
  else if (slug.length > 75) add('slug', 'ok', 'Slug bahut lamba hai', '3-6 shabdon ka chhota slug rakho.');
  else add('slug', 'good', 'Slug theek hai', '');

  // --- Focus keyword -------------------------------------------------------
  if (!kw) {
    add('kw', 'ok', 'Focus keyword set nahi hai', 'Wo ek phrase likho jis par log Google karenge (jaise "sip calculator"). Neeche ke keyword checks tabhi chalenge.');
  } else {
    add('kw-title', seoTitle.toLowerCase().includes(kw) ? 'good' : 'bad', seoTitle.toLowerCase().includes(kw) ? 'Keyword title me hai' : 'Keyword title me nahi hai', 'Focus keyword ko title ke shuru me rakhna best hai.');
    add('kw-desc', description.toLowerCase().includes(kw) ? 'good' : 'ok', description.toLowerCase().includes(kw) ? 'Keyword description me hai' : 'Keyword description me nahi hai', 'Meta description me ek baar keyword aana chahiye.');
    add('kw-slug', slug.includes(kw.replace(/\s+/g, '-')) ? 'good' : 'ok', slug.includes(kw.replace(/\s+/g, '-')) ? 'Keyword slug me hai' : 'Keyword slug me nahi hai', 'Slug me keyword (hyphen ke saath) ho to behtar.');
    add('kw-intro', firstWords.includes(kw) ? 'good' : 'ok', firstWords.includes(kw) ? 'Keyword shuru ke paragraph me hai' : 'Keyword shuru ke 100 shabdon me nahi hai', 'Pehle paragraph me keyword ek baar naturally lao.');
    const occurrences = kw ? text.toLowerCase().split(kw).length - 1 : 0;
    const density = words > 0 ? (occurrences * kw.split(' ').length * 100) / words : 0;
    if (occurrences === 0) add('kw-body', 'bad', 'Keyword content me nahi mila', 'Content me kam se kam 2-3 baar naturally use karo.');
    else if (density > 3) add('kw-body', 'ok', `Keyword zyada baar aa raha hai (${occurrences} baar)`, 'Keyword stuffing se bacho - 0.5% se 2% theek hai.');
    else add('kw-body', 'good', `Keyword content me ${occurrences} baar hai`, '');
  }

  // --- Content -------------------------------------------------------------
  if (words < 300) add('len', 'bad', `Content bahut chhota hai (${words} words)`, 'Thin content AdSense aur Google dono ko pasand nahi. Kam se kam 600+ words likho.');
  else if (words < 600) add('len', 'ok', `Content thoda chhota hai (${words} words)`, '800-1500 words wali useful post behtar rank karti hai.');
  else add('len', 'good', `Content length achhi hai (${words} words)`, '');

  const h2s = (md.match(/^##\s+\S/gm) || []).length + (md.match(/<h2[\s>]/gi) || []).length;
  add('h2', h2s >= 2 ? 'good' : h2s === 1 ? 'ok' : 'bad', h2s >= 2 ? `${h2s} sub-headings (H2) hain` : 'Sub-headings (H2) kam hain', 'Content ko ## Heading se hisson me todo - padhna aasan hota hai aur TOC bhi banta hai.');

  const internalLinks = (md.match(/\]\((https?:\/\/(www\.)?numrexo\.com)?\/[^)\s]*\)/g) || []).length;
  add('internal', internalLinks >= 1 ? 'good' : 'ok', internalLinks >= 1 ? `${internalLinks} internal link(s) hain` : 'Koi internal link nahi', 'Apne calculator ya doosri post ka link do - jaise [SIP Calculator](/finance/sip-calculator).');

  const images = [...md.matchAll(/!\[([^\]]*)\]\(/g)];
  if (images.length === 0) add('img', 'ok', 'Content me koi image nahi', 'Kam se kam 1 useful image/chart rakho.');
  else {
    const missingAlt = images.filter((m) => !m[1].trim()).length;
    add('alt', missingAlt === 0 ? 'good' : 'bad', missingAlt === 0 ? 'Sabhi images me alt text hai' : `${missingAlt} image(s) me alt text nahi`, 'Image ke [ ] ke andar 3-8 shabdon me image ka description likho.');
  }

  add('feat', input.featuredImage ? 'good' : 'ok', input.featuredImage ? 'Featured image hai' : 'Featured image nahi hai', 'Featured image blog list aur social share me dikhti hai.');
  add('faq', input.faqCount >= 2 ? 'good' : 'ok', input.faqCount >= 2 ? `${input.faqCount} FAQ hain (FAQ rich result ban sakta hai)` : 'FAQ nahi / kam hain', '2-5 real sawal-jawab jodo.');
  add('tags', input.tagCount >= 2 ? 'good' : 'ok', input.tagCount >= 2 ? `${input.tagCount} tags hain` : 'Tags kam hain', '2-5 relevant tags lagao.');

  const weight = { good: 1, ok: 0.5, bad: 0 } as const;
  const total = checks.reduce((sum, c) => sum + weight[c.status], 0);
  const score = checks.length === 0 ? 0 : Math.round((total / checks.length) * 100);
  return { score, checks };
}
