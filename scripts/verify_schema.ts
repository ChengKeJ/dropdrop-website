import { blogPostSchema, faqSchema } from "../client/src/lib/structuredData";

// Mock Data for Blog Post
const blogPost = {
  title: "Test Blog Post",
  description: "This is a test description for SEO verification.",
  image: "https://dropdrophabit.com/images/test.jpg",
  datePublished: "2026-01-28",
  dateModified: "2026-01-28",
  author: "DropDrop Team",
  url: "https://dropdrophabit.com/blog/test-post",
  keywords: ["habit tracker", "test keyword"],
  wordCount: 1500,
  articleSection: "Technology",
};

// Mock Data for FAQ
const faqs = [
  { question: "What is DropDrop?", answer: "The best habit tracker." },
  { question: "Is it free?", answer: "Yes, with premium options." },
];

console.log("--- Blog Post Schema (JSON-LD) ---");
console.log(JSON.stringify(blogPostSchema(blogPost), null, 2));

console.log("\n--- FAQ Page Schema (JSON-LD) ---");
console.log(JSON.stringify(faqSchema(faqs), null, 2));
