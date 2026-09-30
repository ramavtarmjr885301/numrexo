// lib/blogTypes.ts
//
// Shared shape for the self-hosted blog. Replaces the old WordPress-shaped
// types in app/wordpress.ts (title.rendered, _embedded, numeric category
// ids, ...) with a flat shape that matches what our own Postgres table
// actually stores, since we're no longer constrained by the WP REST API's
// response format.

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  // What the public page renders (dangerouslySetInnerHTML).
  contentHtml: string;
  // What the admin editor's textarea shows back when re-opening a post.
  // For the 24 posts migrated from WordPress this is the same cleaned HTML
  // as contentHtml (there was no original markdown source to recover) -
  // markdown renderers pass raw HTML blocks through unchanged, so re-saving
  // one of those posts without touching it round-trips safely.
  contentMarkdown: string;
  featuredImage: string | null;
  published: boolean;
  publishedAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface BlogPostInput {
  slug: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  contentHtml: string;
  featuredImage: string | null;
  published: boolean;
  publishedAt?: string;
}

// Keeps blog categories on the same vocabulary as the calculator categories
// (data/calculatorsRegistry.ts) so "Investment" on the blog and "Investment"
// on the calculators browse page mean the same thing.
export const CATEGORY_LABELS: Record<string, string> = {
  finance: 'Finance',
  investment: 'Investment',
  health: 'Health',
  fitness: 'Fitness',
  math: 'Math',
  tax: 'Tax',
  conversion: 'Conversion',
  education: 'Education',
  construction: 'Construction',
  business: 'Business',
  cooking: 'Cooking',
  travel: 'Travel',
  time: 'Time',
  science: 'Science',
};

export function categoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] || slug;
}
