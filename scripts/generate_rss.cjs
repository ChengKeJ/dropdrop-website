const fs = require("fs");
const path = require("path");
const frontMatter = require("front-matter");

// Configuration
const BASE_URL = "https://dropdrophabit.com";
const BLOG_DIR_ZH = path.join(__dirname, "../client/src/content/blog/zh");
const BLOG_DIR_EN = path.join(__dirname, "../client/src/content/blog/en");
const OUTPUT_FILE = path.join(__dirname, "../client/public/feed.xml");

// Helper to get posts from a directory
function getPosts(dir, lang) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      const { attributes, body } = frontMatter(content);
      return {
        slug: file.replace(".md", ""),
        lang,
        title: attributes.title,
        description: attributes.description,
        date: new Date(attributes.date),
        link: `${BASE_URL}${lang === "zh" ? "/zh" : ""}/blog/${file.replace(".md", "")}`,
      };
    });
}

// Main generation function
function generateRSS() {
  console.log("Generating RSS feed...");

  const postsZH = getPosts(BLOG_DIR_ZH, "zh");
  const postsEN = getPosts(BLOG_DIR_EN, "en");

  // Combine and sort by date (newest first)
  const allPosts = [...postsZH, ...postsEN].sort((a, b) => b.date - a.date);

  const rssItems = allPosts
    .map(
      post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <guid>${post.link}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.date.toUTCString()}</pubDate>
    </item>
  `
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DropDrop Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Latest updates, habit tracking tips, and productivity guides from DropDrop.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  fs.writeFileSync(OUTPUT_FILE, rssFeed);
  console.log(
    `RSS feed generated at ${OUTPUT_FILE} with ${allPosts.length} posts.`
  );
}

generateRSS();
