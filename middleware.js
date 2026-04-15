import { NextResponse } from "next/server";

/**
 * Canonical domain – all other brand domains redirect here with a 301.
 * Update NEXT_PUBLIC_SITE_URL in .env if the canonical ever changes.
 */
const CANONICAL_DOMAIN = "olalusgroupllc.com";

/**
 * Every domain (besides the canonical) that should permanently redirect
 * to the canonical domain, preserving the full path and query string.
 */
const ALIAS_DOMAINS = new Set([
  "www.olalusgroupllc.com",
  "olalusgroup.com",
  "www.olalusgroup.com",
  "olalus.com",
  "www.olalus.com",
]);

export function middleware(request) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0]; // strip port if present (e.g. localhost:3000)

  if (ALIAS_DOMAINS.has(hostname)) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.host = CANONICAL_DOMAIN;
    return NextResponse.redirect(destination, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match every request path except:
     *  - _next/static  (compiled assets)
     *  - _next/image   (image optimisation)
     *  - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};
