// lib/hiddenBlogSlugs.ts
//
// Posts that must never appear on the public site, whatever the database says.
// Kept in its own dependency-free file so both the data layer (lib/blogDb.ts)
// and the edge middleware can import it without pulling in the database driver.
// The posts themselves stay in the database and in the admin list, so any of
// these decisions can be undone by deleting a line here.

/**
 * Removed for good: middleware answers 410 Gone.
 * The two "SIP mutual funds in the USA" posts: SIP is an Indian-market term, so
 * the title is a category error for a US audience, and both are unsourced
 * investment rankings (a YMYL topic) with no financial disclaimer.
 */
export const GONE_BLOG_SLUGS: ReadonlySet<string> = new Set([
  'best-sip-mutual-funds-usa-2026-part-1',
  '10-best-sip-mutual-long-term-wealth-creation-2026',
]);

/**
 * Patch 28: blog posts titled "X Calculator" that targeted exactly the same
 * search as the calculator page of the same name. Two URLs for one query made
 * Google pick one and drop the other ("Duplicate" / "Alternate page" in Search
 * Console) and read as duplicate, low-value content. Each now 301-redirects to
 * its calculator, which already carries the full guide, FAQ and worked examples.
 * The genuine guides (how-to, comparisons, "what does my number mean") stay.
 */
export const MERGED_INTO_CALCULATOR: Readonly<Record<string, string>> = {
  'age-calculator': '/math/age-calculator',
  'percentage-calculator': '/math/percentage-calculator',
  'area-calculator-the-fastest-way-to-get-accurate-measurements': '/math/area-calculator',
  'credit-score-estimator-know-your-score-before-lenders-do': '/finance/credit-score-estimator',
  'amortization-calculator-see-where-every-payment-goes': '/finance/amortization-calculator',
  'home-loan-eligibility-calculator-how-much-can-you-borrow': '/finance/home-loan-eligibility-calculator',
  'emi-calculator-calculate-your-monthly-loan-payment-for-a-car-home-land-bike-more': '/finance/emi-calculator',
  'bike-loan-emi-calculator-monthly-emi-interest-numrexo': '/finance/bike-loan-emi-calculator',
  'car-loan-emi-calculator-monthly-emi-interest-numrexo': '/finance/car-loan-emi-calculator',
  'home-loan-emi-calculator-monthly-emi-interest-numrexo': '/finance/home-loan-emi-calculator',
  'personal-loan-emi-calculator-calculate-your-monthly-emi-interest-repayment': '/finance/personal-loan-emi-calculator',
  'calculators-fd-calculator': '/finance/fd-calculator',
  'rd-calculator-calculate-recurring-deposit-maturity-amount-interest': '/finance/rd-calculator',
  'cagr-calculator-calculate-your-investments-annual-growth-rate': '/finance/cagr-calculator',
  'xirr-calculator-calculate-annualized-returns-on-irregular-investments': '/investment/xirr-calculator',
  'capm-calculator-calculate-expected-return-based-on-risk-market-performance': '/investment/capm-calculator',
  'swp-calculator-calculate-monthly': '/investment/swp-calculator',
  'nps-calculator-calculate-your-retirement-corpus-monthly-pension': '/investment/nps-calculator',
  'lumpsum-calculator-calculate-one-time-investment-returns-future-value': '/investment/lumpsum-calculator',
  'ppf-calculator-how-to-calculate-your-public-provident-fund-maturity-value': '/investment/ppf-calculator',
  'bmi-calculator-what-your-bmi-really-means-for-your-health': '/health/bmi-calculator',
  'ideal-weight-calculator-guide': '/health/ideal-weight-calculator',
  'ovulation-calculator-calculate-your-ovulation-date-fertile-window': '/health/ovulation-calculator',
  'pregnancy-due-date-calculator-how-to-calculate-your-estimated-delivery-date-edd': '/health/pregnancy-due-date-calculator',
  'bmr-calculator-how-many-calories-does-your-body-burn-at-rest': '/fitness/bmr-calculator',
  'calorie-burn-calculator': '/fitness/calorie-burn-calculator',
};

/** Everything kept off public lists, the sitemap, RSS and related-post blocks. */
export const HIDDEN_PUBLIC_SLUGS: ReadonlySet<string> = new Set([
  ...GONE_BLOG_SLUGS,
  ...Object.keys(MERGED_INTO_CALCULATOR),
]);
