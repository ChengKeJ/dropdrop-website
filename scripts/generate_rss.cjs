const { loadGeneratedBlogPosts } = require('./blog-data.cjs');
const { BASE_URL, writeStaticAsset } = require('./site-manifest.cjs');

// Main generation function
function generateRSS() {
    console.log('Generating RSS feed...');

    const allPosts = loadGeneratedBlogPosts()
        .map((post) => ({
            title: post.title,
            description: post.description,
            date: new Date(post.dateModified || post.datePublished),
            link: `${BASE_URL}${post.language === 'zh' ? '/zh' : ''}/blog/${post.slug}`
        }))
        .sort((a, b) => b.date - a.date);

    const lastBuildDate = allPosts[0]?.date
        ? allPosts[0].date.toUTCString()
        : new Date('2026-01-01').toUTCString();

    const rssItems = allPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <guid>${post.link}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.date.toUTCString()}</pubDate>
    </item>
  `).join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DropDrop Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Latest updates, habit tracking tips, and productivity guides from DropDrop.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    writeStaticAsset('feed.xml', rssFeed);
    console.log(`RSS feed generated with ${allPosts.length} posts.`);
}

generateRSS();
