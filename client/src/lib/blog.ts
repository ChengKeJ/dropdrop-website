import frontMatter from 'front-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // HTML content
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  category: string;
  tags: string[];
  readTime: number;
  language: 'zh' | 'en';
  keywords?: string[]; // SEO keywords
  wordCount?: number; // Automatically calculated
}

interface MarkdownAttributes {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
  keywords?: string[]; // Optional SEO keywords
}

// Vite Glob Import
// Eagerly load content for simplicity in this scale, or lazy load if many posts
// Using eager: false (default) returns a function that returns a promise.
const markdownFiles = import.meta.glob('/src/content/blog/**/*.md', { query: '?raw', import: 'default' });

/**
 * Get all blog posts, optionally filtered by language.
 */
export async function getAllBlogPosts(lang?: 'zh' | 'en'): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  console.log('[Blog] Loading posts for language:', lang);
  console.log('[Blog] Found files:', Object.keys(markdownFiles));

  for (const path in markdownFiles) {
    // Determine language from path by looking for exact directory segments
    // e.g. /src/content/blog/en/post.md -> parts includes 'en'
    const parts = path.split('/');
    let fileLang: 'zh' | 'en' = 'en'; // Default fallback

    if (parts.includes('zh')) {
      fileLang = 'zh';
    } else if (parts.includes('en')) {
      fileLang = 'en';
    }

    // Extract slug from filename (e.g. "my-post.md" -> "my-post")
    const fileName = parts[parts.length - 1] || '';
    const slug = fileName.replace('.md', '');

    console.log(`[Blog] Processing ${path}: lang=${fileLang}, slug=${slug}`);

    if (lang && fileLang !== lang) {
      continue;
    }

    // Load content
    const rawContent = await markdownFiles[path]() as string;
    const { attributes, body } = frontMatter<MarkdownAttributes>(rawContent);

    // Parse Markdown to HTML
    // marked.parse can be synchronous
    const htmlContent = await marked.parse(body, { gfm: true });

    let datePublished = new Date().toISOString();
    try {
      const parsedDate = new Date(attributes.date);
      if (!isNaN(parsedDate.getTime())) {
        datePublished = parsedDate.toISOString();
      } else {
        console.warn(`[Blog] Invalid date found in ${path}:`, attributes.date);
      }
    } catch (e) {
      console.warn(`[Blog] Date parsing error in ${path}:`, e);
    }

    // Calculate word count from plain text
    const plainText = body.replace(/[#*`\[\]()]/g, '').trim();
    const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;

    posts.push({
      slug,
      title: attributes.title,
      description: attributes.description,
      content: htmlContent,
      image: attributes.image,
      author: attributes.author,
      datePublished: datePublished,
      dateModified: datePublished,
      category: attributes.category,
      tags: attributes.tags,
      readTime: attributes.readTime,
      language: fileLang,
      keywords: attributes.keywords || attributes.tags, // Use keywords if provided, fallback to tags
      wordCount: wordCount
    });
  }

  return posts.sort((a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

/**
 * Get a single blog post by slug and language.
 */
export async function getBlogPost(slug: string, lang: 'zh' | 'en'): Promise<BlogPost | undefined> {
  // Optimization: Could construct path directly instead of scanning all, 
  // but scanning is safer for now.
  const allPosts = await getAllBlogPosts(lang);
  return allPosts.find(p => p.slug === slug);
}

/**
 * Get related blog posts based on content similarity (tags and category).
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(currentPost.language);

  const scoredPosts = allPosts
    .filter(p => p.slug !== currentPost.slug) // Exclude current post
    .map(p => {
      let score = 0;

      // Category match: +2 points
      if (p.category === currentPost.category) {
        score += 2;
      }

      // Tags match: +1 point per matching tag
      if (p.tags && currentPost.tags) {
        const matchingTags = p.tags.filter(tag => currentPost.tags.includes(tag));
        score += matchingTags.length;
      }

      return { post: p, score };
    })
    .filter(item => item.score > 0) // Only keep posts with some relevance
    .sort((a, b) => {
      // Sort by score (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Fallback: Sort by date (newest first)
      return new Date(b.post.datePublished).getTime() - new Date(a.post.datePublished).getTime();
    });

  return scoredPosts.slice(0, limit).map(item => item.post);
}
