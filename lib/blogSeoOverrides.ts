// lib/blogSeoOverrides.ts
//
// Search-snippet overrides for specific blog posts, kept in code so they apply
// even when the post's own SEO fields in the admin panel are empty (and survive
// a database outage). Used by app/blog/[slug]/page.tsx.
//
// Why (GSC readout, 4 Nov 2026): the BMI chart guide ranks #1-2 for "bmi chart
// 2026", "mens bmi chart 2026", "womens bmi chart 2026", but its title was cut
// off before the word "Chart" and Google showed the opening line ("Introduction:
// Your Weight Number Doesn't...") as the description - so almost nobody clicked.

export interface BlogSeoOverride {
  /** Shown in search results and the browser tab. Keep under ~50 characters so " | Numrexo" still fits. */
  title?: string;
  /** 120-160 characters. Say exactly what the searcher typed and what the page gives them. */
  description?: string;
}

export const BLOG_SEO_OVERRIDES: Readonly<Record<string, BlogSeoOverride>> = {
  'what-is-a-healthy-bmi-for-men-and-women-complete-bmi-chart-guide-2026': {
    title: 'BMI Chart 2026: Healthy Ranges for Men and Women',
    description:
      'Full BMI chart for men and women, with the healthy, overweight and obese weight ranges for every height, plus a free calculator to find your own BMI.',
  },
};
