// middleware.ts
//
// Two canonicalisation problems this fixes, both of which created duplicate URLs
// that Google had no canonical tag to resolve:
//
// 1. Mixed-case paths returned HTTP 200.
//    https://numrexo.com/FINANCE/mortgage-calculator served the real page.
//    Now 301s to the lowercase path.
//
// 2. Every calculator existed at two URLs.
//    /calculators/<slug> rendered exactly the same page as /<category>/<slug>,
//    so all 117 calculators had a duplicate. Only the category URL is in the
//    sitemap, so /calculators/<slug> now 301s to it.
//
// Both are 301 (permanent), not 307, so Google consolidates any link equity onto
// the surviving URL instead of keeping both.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";

// Built once at module load: slug -> category
const CATEGORY_BY_SLUG = new Map(
  CALCULATORS_REGISTRY.map((calc) => [calc.slug, calc.category]),
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Lowercase the path.
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // 2. Collapse /calculators/<slug> onto /<category>/<slug>.
  //    "/calculators" itself is the real browse page and is left alone.
  const legacyMatch = pathname.match(/^\/calculators\/([^/]+)\/?$/);
  if (legacyMatch) {
    const slug = legacyMatch[1];
    const category = CATEGORY_BY_SLUG.get(slug);
    if (category) {
      const url = request.nextUrl.clone();
      url.pathname = `/${category}/${slug}`;
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals, API routes and any request for a real file
  // (favicon.ico, ads.txt, sitemap.xml, robots.txt, images).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
