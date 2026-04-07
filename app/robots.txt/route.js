export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Allow important pages
Allow: /about
Allow: /terms
Allow: /contact
Allow: /privacy
Allow: /terms


# Disallow admin and private areas
Disallow: /admin
Disallow: /api
Disallow: /_next
Disallow: /static
Disallow: /dashboard

# Sitemap location
Sitemap: https://olalusgroupllc.com/sitemap.xml

# Crawl delay
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
