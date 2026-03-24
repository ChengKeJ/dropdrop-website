import fs from "fs";
import path from "path";
import frontMatter from "front-matter";
import { marked } from "marked";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIRS = {
  en: path.join(__dirname, "../client/src/content/blog/en"),
  zh: path.join(__dirname, "../client/src/content/blog/zh"),
};

const GENERATED_BLOG_DATA_PATH = path.join(
  __dirname,
  "../client/src/generated/blog-posts.json"
);

marked.setOptions({ gfm: true });

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-\u4e00-\u9fa5]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractContentSections(htmlContent) {
  const processedContent = htmlContent.replace(
    /^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i,
    ""
  );
  const headings = [];
  const seenIds = new Map();

  const contentHtml = processedContent.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_, level, title) => {
      const cleanTitle = title.replace(/<[^>]*>/g, "").trim();
      const baseId = slugifyHeading(cleanTitle) || `section-${headings.length + 1}`;
      const duplicateCount = seenIds.get(baseId) ?? 0;
      seenIds.set(baseId, duplicateCount + 1);
      const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`;

      headings.push({
        id,
        text: cleanTitle,
        level: Number(level),
      });

      return `<h${level} id="${id}">${title}</h${level}>`;
    }
  );

  return {
    contentHtml,
    headings,
  };
}

function getWordCount(markdownBody) {
  const plainText = markdownBody
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .trim();

  return plainText.split(/\s+/).filter(Boolean).length;
}

function toIsoDate(rawDate, fallback) {
  const parsedDate = new Date(rawDate);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toISOString();
  }

  return fallback;
}

function readMarkdownPosts() {
  const posts = [];

  for (const [language, directory] of Object.entries(BLOG_DIRS)) {
    if (!fs.existsSync(directory)) {
      continue;
    }

    const fileNames = fs.readdirSync(directory).filter((file) => file.endsWith(".md"));

    for (const fileName of fileNames) {
      const slug = fileName.replace(".md", "");
      const rawContent = fs.readFileSync(path.join(directory, fileName), "utf8");
      const { attributes, body } = frontMatter(rawContent);
      const datePublished = toIsoDate(attributes.date, new Date().toISOString());
      const updatedAt = attributes.updatedAt
        ? toIsoDate(attributes.updatedAt, datePublished)
        : undefined;
      const lastReviewed = attributes.lastReviewed
        ? toIsoDate(attributes.lastReviewed, datePublished)
        : undefined;
      const { contentHtml, headings } = extractContentSections(marked.parse(body));

      posts.push({
        slug,
        title: attributes.title,
        description: attributes.description,
        contentHtml,
        image: attributes.image,
        author: attributes.author,
        datePublished,
        dateModified: updatedAt ?? datePublished,
        updatedAt,
        lastReviewed,
        reviewedBy: attributes.reviewedBy,
        category: attributes.category,
        tags: attributes.tags,
        readTime: attributes.readTime,
        language,
        keywords: attributes.keywords ?? attributes.tags,
        wordCount: getWordCount(body),
        sources: attributes.sources ?? [],
        headings,
      });
    }
  }

  return posts.sort(
    (left, right) =>
      new Date(right.datePublished).getTime() -
      new Date(left.datePublished).getTime()
  );
}

function writeGeneratedBlogPosts(posts) {
  fs.mkdirSync(path.dirname(GENERATED_BLOG_DATA_PATH), { recursive: true });
  fs.writeFileSync(GENERATED_BLOG_DATA_PATH, `${JSON.stringify(posts, null, 2)}\n`);
}

const posts = readMarkdownPosts();
writeGeneratedBlogPosts(posts);

console.log(`Generated blog data with ${posts.length} posts.`);
