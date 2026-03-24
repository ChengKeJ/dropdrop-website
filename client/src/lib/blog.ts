import generatedBlogPosts from "@/generated/blog-posts.json";

export interface BlogSource {
  title: string;
  url: string;
  publisher: string;
  publishedDate?: string;
  notes?: string;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  contentHtml: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  lastReviewed?: string;
  reviewedBy?: string;
  category: string;
  tags: string[];
  readTime: number;
  language: "zh" | "en";
  keywords?: string[];
  wordCount?: number;
  sources?: BlogSource[];
  headings: BlogHeading[];
}

const allPosts = generatedBlogPosts as BlogPost[];

export function getAllBlogPosts(lang?: "zh" | "en"): BlogPost[] {
  if (!lang) {
    return allPosts;
  }

  return allPosts.filter((post) => post.language === lang);
}

export function getBlogPost(slug: string, lang: "zh" | "en"): BlogPost | undefined {
  return getAllBlogPosts(lang).find((post) => post.slug === slug);
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const scoredPosts = getAllBlogPosts(currentPost.language)
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      if (post.category === currentPost.category) {
        score += 2;
      }

      if (post.tags && currentPost.tags) {
        const matchingTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
        score += matchingTags.length;
      }

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return (
        new Date(right.post.datePublished).getTime() -
        new Date(left.post.datePublished).getTime()
      );
    });

  return scoredPosts.slice(0, limit).map((item) => item.post);
}
