const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://olalusgroupllc.com";
const API_URL = process.env.NEXT_PUBLIC_SERVER_API;

async function fetchDynamic(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  // ─── Static pages ────────────────────────────────────────────
  const staticRoutes = [
    { url: BASE_URL,                         priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/about`,              priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/services`,           priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/career`,             priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/career/apply`,       priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`,               priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/faq`,                priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/resources`,          priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`,            priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE_URL}/privacy-policy`,     priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/non-discrimination`, priority: 0.3, changeFrequency: "yearly" },
  ].map((r) => ({ ...r, lastModified: now }));

  // ─── Dynamic: blog posts ─────────────────────────────────────
  const blogs = await fetchDynamic("/blog");
  const blogRoutes = blogs.map((post) => ({
    url: `${BASE_URL}/blog/${post._id}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ─── Dynamic: career positions ───────────────────────────────
  const jobs = await fetchDynamic("/job");
  const jobRoutes = jobs.map((job) => ({
    url: `${BASE_URL}/career/${job._id}`,
    lastModified: job.updatedAt ? new Date(job.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // ─── Dynamic: resources ──────────────────────────────────────
  const resources = await fetchDynamic("/resource");
  const resourceRoutes = resources.map((r) => ({
    url: `${BASE_URL}/resources/${r.slug || r._id}`,
    lastModified: r.updatedAt ? new Date(r.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...jobRoutes, ...resourceRoutes];
}
