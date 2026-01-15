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
      language: fileLang
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
