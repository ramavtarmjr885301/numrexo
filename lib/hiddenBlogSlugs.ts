// lib/hiddenBlogSlugs.ts
//
// Posts that must never appear on the public site, whatever the database says.
// Kept in its own dependency-free file so both the data layer (lib/blogDb.ts)
// and the edge middleware can import it without pulling in the database driver.
//
// These two are the "SIP mutual funds in the USA" posts: SIP is an
// Indian-market term, so the title is a category error for a US audience, and
// both are unsourced investment rankings (a YMYL topic) with no financial
// disclaimer. Hiding them here means they stay gone even if someone re-saves
// or re-publishes them from the admin panel. They still show in the admin list
// so they can be rewritten properly and removed from this list once they meet
// the site's standard.
export const HIDDEN_PUBLIC_SLUGS: ReadonlySet<string> = new Set([
  'best-sip-mutual-funds-usa-2026-part-1',
  '10-best-sip-mutual-long-term-wealth-creation-2026',
]);
