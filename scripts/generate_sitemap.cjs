const fs = require('fs');
const path = require('path');

// Base URL of the website
const BASE_URL = 'https://dropdrophabit.com';

// Static routes (without language prefix)
const STATIC_ROUTES = [
  '',
  '/blog',
  '/faq',
  '/about',
  '/privacy',
  '/terms'
];

// Blog Directories
const BLOG_DIR_ZH = path.join(__dirname, '../client/src/content/blog/zh');
const BLOG_DIR_EN = path.join(__dirname, '../client/src/content/blog/en');

// Helper to get slugs from a directory
function getSlugs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

const slugsZH = getSlugs(BLOG_DIR_ZH);
const slugsEN = getSlugs(BLOG_DIR_EN);

// Merge unique slugs (assuming slugs are same across languages)
const allSlugs = [...new Set([...slugsZH, ...slugsEN])];

// Helper to generate URL entry
function generateUrlEntry(pathStr, lastMod) {
  const enUrl = `${BASE_URL}${pathStr}`;
  const zhUrl = `${BASE_URL}/zh${pathStr === '/' ? '' : pathStr}`;
  
  return `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pathStr === '' ? '1.0' : pathStr.startsWith('/blog/') ? '0.8' : '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${zhUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
  </url>
  <url>
    <loc>${zhUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pathStr === '' ? '1.0' : pathStr.startsWith('/blog/') ? '0.8' : '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${zhUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
  </url>`;
}

// Generate Sitemap Content
const today = new Date().toISOString().split('T')[0];
let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Add Static Routes
STATIC_ROUTES.forEach(route => {
  sitemapContent += generateUrlEntry(route === '' ? '/' : route, today) + '\n';
});

// Add Blog Posts
allSlugs.forEach(slug => {
  sitemapContent += generateUrlEntry(`/blog/${slug}`, today) + '\n';
});

sitemapContent += `</urlset>`;

// Write to file
const outputPath = path.join(__dirname, '../client/public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent);

console.log(`Sitemap generated with ${STATIC_ROUTES.length * 2} static entries and ${allSlugs.length * 2} blog entries.`);
console.log(`Saved to ${outputPath}`);