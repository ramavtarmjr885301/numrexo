// lib/migratedBlogSlugs.ts
//
// The 25 posts migrated off blog.numrexo.com's WordPress install on
// 2026-09-22. Google may already have some of these indexed at their old
// address (https://blog.numrexo.com/<slug>/), so middleware.ts 301-redirects
// any request for one of these exact slugs on that host to its new home at
// numrexo.com/blog/<slug>. Everything else on blog.numrexo.com falls back to
// a plain redirect to numrexo.com/blog - see middleware.ts.
//
// This list does not need to grow: every post published after the
// migration is authored directly at numrexo.com/blog and never had an old
// blog.numrexo.com URL to redirect from.
export const MIGRATED_WORDPRESS_SLUGS: string[] = [
  'the-wealth-destroying-mistake-of-pausing-your-sip-during-market-volatility',
  'sip-vs-fd-which-investment-builds-more-wealth',
  'best-sip-mutual-funds-usa-2026-part-1',
  '10-best-sip-mutual-long-term-wealth-creation-2026',
  'what-is-a-healthy-bmi-for-men-and-women-complete-bmi-chart-guide-2026',
  'area-calculator-the-fastest-way-to-get-accurate-measurements',
  'what-your-number-really-means-and-when-its-wrong',
  'bmr-vs-tdee-which-one-should-you-actually-use',
  'how-to-calculate-body-fat-percentage-at-home-no-calipers-needed',
  'emi-calculator-calculate-your-monthly-loan-payment-for-a-car-home-land-bike-more',
  'bmr-calculator-how-many-calories-does-your-body-burn-at-rest',
  'bmi-calculator-what-your-bmi-really-means-for-your-health',
  'calorie-burn-calculator',
  'ideal-weight-calculator-guide',
  'pregnancy-due-date-calculator-how-to-calculate-your-estimated-delivery-date-edd',
  'ovulation-calculator-calculate-your-ovulation-date-fertile-window',
  'fd-calculator-how-to-calculate-fixed-deposit-maturity-amount-and-interest',
  'ppf-calculator-how-to-calculate-your-public-provident-fund-maturity-value',
  'rd-calculator-calculate-recurring-deposit-maturity-amount-interest',
  'lumpsum-calculator-calculate-one-time-investment-returns-future-value',
  'nps-calculator-calculate-your-retirement-corpus-monthly-pension',
  'swp-calculator-calculate-monthly-withdrawals-remaining-investment-corpus',
  'capm-calculator-calculate-expected-return-based-on-risk-market-performance',
  'cagr-calculator-calculate-your-investments-annual-growth-rate',
  'xirr-calculator-calculate-annualized-returns-on-irregular-investments',
];
