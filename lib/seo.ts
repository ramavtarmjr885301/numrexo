// lib/seo.ts
//
// One place that builds every page's <title>, meta description, canonical URL
// and social tags. Import from here instead of hand-writing metadata in a page,
// so a page can never silently fall back to the site-wide default again.
//
// IMPORTANT: metadata only works in a SERVER component. If a file starts with
// "use client", neither `export const metadata` nor `generateMetadata` runs, and
// `next/head` is ignored entirely in the App Router. Keep the page a server
// component and move the interactive UI into a separate client component.

import type { Metadata } from "next";
import { CALCULATORS_REGISTRY, CATEGORIES, type CalculatorType } from "@/data/calculatorsRegistry";
import {
  CALCULATOR_SEO,
  CATEGORY_SEO,
  SITE_DEFAULT_UPDATED_AT,
  type CalculatorSeo,
} from "@/data/calculatorsSeo";

/** Canonical origin. The www host 301s to this one, so every absolute URL we emit must match it. */
export const SITE_URL = "https://numrexo.com";
export const SITE_NAME = "Numrexo";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Fallback SEO copy for a calculator that has no entry in calculatorsSeo.ts yet.
 * Still unique per page, so a newly added calculator never inherits a duplicate.
 */
function fallbackCalculatorSeo(calc: CalculatorType): CalculatorSeo {
  const categoryName = CATEGORIES[calc.category]?.name ?? calc.category;
  return {
    title: calc.name,
    description: `${calc.desc}. Free ${calc.name.toLowerCase()} from Numrexo — instant results, no sign-up, and nothing you enter leaves your browser. Part of our ${categoryName.toLowerCase()} tools.`,
  };
}

export function getCalculatorSeo(calc: CalculatorType): CalculatorSeo {
  return CALCULATOR_SEO[`${calc.category}/${calc.slug}`] ?? fallbackCalculatorSeo(calc);
}

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

/**
 * The single builder every page goes through. Always sets a canonical URL and
 * Open Graph / Twitter tags — the site had zero of both before this.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  // Open Graph gets the full title; the template only applies to `title`.
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: "@numrexo",
    },
  };
}

/** Metadata for a single calculator page. */
export function calculatorMetadata(calc: CalculatorType): Metadata {
  const seo = getCalculatorSeo(calc);
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: `/${calc.category}/${calc.slug}`,
  });
}

/** Metadata for a category hub page (/finance, /health, ...). */
export function categoryMetadata(category: keyof typeof CATEGORIES): Metadata {
  const seo = CATEGORY_SEO[category];
  const name = CATEGORIES[category]?.name ?? category;
  return buildMetadata({
    title: seo?.title ?? `${name} Calculators`,
    description:
      seo?.description ??
      `Free ${name.toLowerCase()} calculators from Numrexo. Instant results, no sign-up required, and every calculation runs in your browser.`,
    keywords: seo?.keywords,
    path: `/${category}`,
  });
}

/** Last modified date for a calculator, used by sitemap.xml. */
export function calculatorLastModified(calc: CalculatorType): Date {
  const seo = CALCULATOR_SEO[`${calc.category}/${calc.slug}`];
  return new Date(seo?.updatedAt ?? SITE_DEFAULT_UPDATED_AT);
}

/** Look up a calculator by category + slug. Returns undefined if it does not exist. */
export function findCalculator(category: string, slug: string): CalculatorType | undefined {
  return CALCULATORS_REGISTRY.find((c) => c.category === category && c.slug === slug);
}

/* ────────────────────────────────────────────────────────────────
   Structured data helpers
   ──────────────────────────────────────────────────────────────── */

export function breadcrumbJsonLd(calc: CalculatorType) {
  const categoryName = CATEGORIES[calc.category]?.name ?? calc.category;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${categoryName} Calculators`,
        item: absoluteUrl(`/${calc.category}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calc.name,
        item: absoluteUrl(`/${calc.category}/${calc.slug}`),
      },
    ],
  };
}
