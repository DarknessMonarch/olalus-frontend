export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://olalusgroupllc.com";

  const robotsTxt = `User-agent: *
Allow: /

Disallow: /api
Disallow: /_next
Disallow: /dashboard
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml

Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}
