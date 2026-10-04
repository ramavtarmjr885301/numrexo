// middleware.ts
//
// Canonicalisation for the main site, plus routing for the blog's admin
// panel and the old blog.numrexo.com WordPress address. Four things happen
// here, in order:
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
//
// 3. app.numrexo.com is the address for the blog's admin/writing panel
//    (same Vercel deployment, added as a second domain on the project).
//    Everything on that host is rewritten to /admin/<path>, and gated
//    behind the admin session cookie (login page itself is the one
//    exception).
//
// 4. blog.numrexo.com was the old WordPress install the 25 posts were
//    migrated FROM. It is no longer the admin panel (that's app.numrexo.com
//    now) and no longer needs WordPress at all - it only exists so any old
//    Google index entry or backlink still lands somewhere. A request for one
//    of the 25 migrated posts' old slugs 301s to its new home at
//    numrexo.com/blog/<slug>; anything else on that host 301s to
//    numrexo.com/blog. (This code only runs once blog.numrexo.com's DNS is
//    pointed at this Vercel deployment - see PATCH14-STEPS.md. Until then
//    MilesWeb keeps serving the old WordPress site as before.)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CALCULATORS_REGISTRY } from "@/data/calculatorsRegistry";
import { MIGRATED_WORDPRESS_SLUGS } from "@/lib/migratedBlogSlugs";
import { HIDDEN_PUBLIC_SLUGS } from "@/lib/hiddenBlogSlugs";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/adminAuth";

// Built once at module load: slug -> category
const CATEGORY_BY_SLUG = new Map(
  CALCULATORS_REGISTRY.map((calc) => [calc.slug, calc.category]),
);

const MIGRATED_SLUGS = new Set(MIGRATED_WORDPRESS_SLUGS);
const ADMIN_HOST = "app.numrexo.com";
const OLD_BLOG_HOST = "blog.numrexo.com";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // --- 4. Old WordPress host: redirect everything to the new blog --------
  if (host === OLD_BLOG_HOST || host.startsWith(`${OLD_BLOG_HOST}:`)) {
    const oldSlugMatch = pathname.match(/^\/([^/]+)\/?$/);
    const slug =
      oldSlugMatch && MIGRATED_SLUGS.has(oldSlugMatch[1]) && !HIDDEN_PUBLIC_SLUGS.has(oldSlugMatch[1])
        ? oldSlugMatch[1]
        : null;
    const url = new URL(slug ? `https://numrexo.com/blog/${slug}` : "https://numrexo.com/blog");
    return NextResponse.redirect(url, 301);
  }

  // --- 3. Admin subdomain routing -----------------------------------------
  if (host === ADMIN_HOST || host.startsWith(`${ADMIN_HOST}:`)) {
    const isLoginPath = pathname === "/login";
    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const authed = await isValidSessionToken(sessionToken);

    if (!authed && !isLoginPath) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
    if (authed && isLoginPath) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const rewritten = request.nextUrl.clone();
    rewritten.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    // Root layout.tsx reads this to skip the public site's header/footer and
    // the GA/AdSense scripts on the admin panel - they don't belong there,
    // and loading AdSense on a login screen is asking for a policy problem.
    const adminHeaders = new Headers(request.headers);
    adminHeaders.set("x-numrexo-admin", "1");
    return NextResponse.rewrite(rewritten, { request: { headers: adminHeaders } });
  }

  // The /admin pages are real files under app/admin/ - Next.js's router
  // doesn't know they're "supposed" to only be reached by rewriting from
  // app.numrexo.com above, so numrexo.com/admin/anything would otherwise
  // serve them directly, on the public host, with none of the cookie
  // gating above. Close that off: on every host except the admin one,
  // /admin doesn't exist.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // --- 1. Lowercase the path -----------------------------------------------
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // --- 2. Collapse /calculators/<slug> onto /<category>/<slug> -------------
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
