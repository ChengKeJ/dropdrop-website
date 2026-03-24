const {
  getAllPublicRoutes,
  getAlternateUrls,
  getCanonicalUrl,
  getRouteLastModified,
  getPriorityConfig,
  writeStaticAsset,
} = require('./site-manifest.cjs');

function generateUrlEntry(route, lastMod) {
  const { enUrl, zhUrl } = getAlternateUrls(route);
  const { priority, changefreq } = getPriorityConfig(route);
  const canonicalUrl = getCanonicalUrl(route);

  return `  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${zhUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
  </url>`;
}

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

getAllPublicRoutes().forEach((route) => {
  sitemapContent += generateUrlEntry(route, getRouteLastModified(route)) + '\n';
});

sitemapContent += `</urlset>`;

writeStaticAsset('sitemap.xml', sitemapContent);

console.log(`Sitemap generated with ${getAllPublicRoutes().length} total entries.`);
