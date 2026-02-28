import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEO/SEOHead";
import {
  getBlogPost,
  getRelatedPosts,
  BlogPost as BlogPostType,
} from "@/lib/blog";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Link, useRoute } from "wouter";
import { breadcrumbSchema, blogPostSchema } from "@/lib/structuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { language, t } = useLanguage();
  const [, params] = useRoute("/blog/:slug");
  const { scrollYProgress } = useScroll();

  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [contentWithIds, setContentWithIds] = useState("");
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isTocOpen, setIsTocOpen] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // TOC Active State Observer
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    async function loadPost() {
      if (!params?.slug) return;

      setLoading(true);
      try {
        const data = await getBlogPost(params.slug, language as "zh" | "en");
        if (data) {
          setPost(data);

          // Fetch related posts
          getRelatedPosts(data).then(setRelatedPosts);

          const processedContent = data.content.replace(
            /^<h[12]>.*?<\/h[12]>/i,
            ""
          );

          const extractedHeadings: {
            id: string;
            text: string;
            level: number;
          }[] = [];
          const processedIds = processedContent.replace(
            /<h([23])>(.*?)<\/h\1>/g,
            (_, level, title) => {
              const id = title
                .toLowerCase()
                .replace(/[^\w\s-\u4e00-\u9fa5]/g, "")
                .replace(/\s+/g, "-");
              extractedHeadings.push({
                id,
                text: title.replace(/<[^>]*>?/gm, ""),
                level: parseInt(level),
              });
              return `<h${level} id="${id}">${title}</h${level}>`;
            }
          );

          setContentWithIds(processedIds);
          setHeadings(extractedHeadings);
        }
      } catch (error) {
        console.error("Failed to load blog post", error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [params?.slug, language]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("blog.share.success"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <div className="container max-w-3xl mx-auto pt-48 px-6">
          <Skeleton className="h-4 w-24 mb-12" />
          <Skeleton className="h-16 w-3/4 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://dropdrophabit.com${post.image}`;

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://dropdrophabit.com/" },
    { name: "Blog", url: "https://dropdrophabit.com/blog" },
    { name: post.title, url: `https://dropdrophabit.com/blog/${post.slug}` },
  ]);

  const blogSchema = blogPostSchema({
    title: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    url: `https://dropdrophabit.com/blog/${post.slug}`,
    keywords: post.keywords,
    wordCount: post.wordCount,
    articleSection: post.category,
  });

  return (
    <>
      <SEOHead
        title={`${post.title} - DropDrop Blog`}
        description={post.description}
        canonical={`https://dropdrophabit.com/blog/${post.slug}`}
        ogType="article"
        ogImage={imageUrl}
        keywords={post.keywords || post.tags}
        article={{
          publishedTime: post.datePublished,
          modifiedTime: post.dateModified,
          author: post.author,
          section: post.category,
          tags: post.keywords || post.tags,
        }}
        structuredData={[breadcrumbs, blogSchema]}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#4CAF93] origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#333333] font-sans selection:bg-[#4CAF93] selection:text-white">
        <Navbar />

        <article className="pt-32 md:pt-48 pb-20 px-6 md:px-8">
          <div className="container max-w-3xl mx-auto">
            <nav
              aria-label="Breadcrumb"
              className="mb-12 flex items-center gap-2 text-[13px] text-[#999] font-medium tracking-wide"
            >
              <Link href="/">
                <a className="hover:text-[#222] transition-colors">Home</a>
              </Link>
              <span className="text-[#eee]">/</span>
              <Link href="/blog">
                <a className="hover:text-[#222] transition-colors">Blog</a>
              </Link>
              <span className="text-[#eee]">/</span>
              <span className="text-[#222] truncate max-w-[150px] md:max-w-none">
                {post.title}
              </span>
            </nav>

            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 md:mb-24 text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-4 py-1.5 bg-[#4CAF93]/5 text-[#4CAF93] rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-10">
                {post.category}
              </div>

              <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111] mb-10 leading-[1.25] tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[12px] text-[#999] uppercase tracking-widest font-bold">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#4CAF93]" />
                  <time dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString(
                      language === "zh" ? "zh-CN" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                </div>
                <div className="w-1 h-1 bg-[#eee] rounded-full" />
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#4CAF93]" />
                  <span>
                    {post.readTime} {t("blog.minuteRead")}
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="ml-2 p-2 hover:text-[#4CAF93] transition-colors"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </motion.header>

            {headings.length > 0 && (
              <div className="mb-20 max-w-2xl mx-auto">
                <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="md:hidden w-full flex items-center justify-between bg-white border border-gray-100 rounded-xl px-6 py-4 text-sm font-bold text-[#333] shadow-sm"
                >
                  <span>{t("blog.toc.title")}</span>
                  <motion.span animate={{ rotate: isTocOpen ? 180 : 0 }}>
                    ▼
                  </motion.span>
                </button>

                <motion.nav
                  initial={false}
                  animate={{ height: isTocOpen ? "auto" : "auto", opacity: 1 }}
                  className={`
                    overflow-hidden md:overflow-visible mt-4 md:mt-0
                    bg-white md:bg-transparent
                    border border-gray-100 md:border-none md:border-l-[1px] md:border-gray-200 
                    rounded-2xl md:rounded-none
                    p-6 md:p-0 md:pl-8 md:py-1
                    ${isTocOpen ? "block" : "hidden md:block"}
                  `}
                >
                  <h4 className="hidden md:block text-[11px] font-bold text-[#999] uppercase tracking-[0.2em] mb-6">
                    {t("blog.toc.title")}
                  </h4>
                  <ul className="space-y-4">
                    {headings.map((heading, index) => (
                      <li
                        key={`${heading.id}-${index}`}
                        style={{
                          marginLeft: heading.level === 3 ? "1rem" : "0",
                        }}
                      >
                        <a
                          href={`#${heading.id}`}
                          onClick={e => {
                            e.preventDefault();
                            document
                              .getElementById(heading.id)
                              ?.scrollIntoView({ behavior: "smooth" });
                            setIsTocOpen(false);
                          }}
                          className={`
                            text-[14px] block leading-snug transition-all duration-500 relative
                            ${
                              activeId === heading.id
                                ? "text-[#4CAF93] font-semibold"
                                : "text-[#777] hover:text-[#222]"
                            }
                          `}
                        >
                          {activeId === heading.id && (
                            <motion.div
                              layoutId="toc-indicator"
                              className="absolute -left-[33px] top-0 w-[2px] h-full bg-[#4CAF93]"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
            )}

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  prose prose-lg max-w-none 
                  mx-auto
                  font-sans
                  text-[#374151] 
                  
                  /* Content Rhythm */
                  [&_p]:mb-5
                  [&_p]:leading-[1.8]
                  [&_p]:text-[17px] md:[&_p]:text-[18px]
                  
                  /* Typography Stack */
                  font-['Inter',_-apple-system,'BlinkMacSystemFont','PingFang_SC','Hiragino_Sans_GB','Microsoft_YaHei',sans-serif]
                  
                  /* Headings: Structural Anchors (High Specificity) */
                  [&_h2]:font-bold
                  [&_h2]:text-[#111827]
                  [&_h2]:tracking-tight
                  [&_h2]:text-[1.5em] md:[&_h2]:text-[1.6em]
                  [&_h2]:mt-12
                  [&_h2]:mb-4
                  [&_h2]:leading-[1.3]
                  
                  [&_h3]:font-bold
                  [&_h3]:text-[#111827]
                  [&_h3]:tracking-tight
                  [&_h3]:text-[1.25em] md:[&_h3]:text-[1.3em]
                  [&_h3]:mt-8
                  [&_h3]:mb-3
                  [&_h3]:scroll-mt-32
                  
                  /* Lists - Subtle & Tidy */
                  [&_ul]:list-disc
                  [&_ul]:pl-6
                  [&_ul]:my-8
                  [&_ul_li]:mb-2
                  [&_ul_li]:pl-2
                  
                  [&_ol]:list-decimal
                  [&_ol]:pl-6
                  [&_ol]:my-8
                  [&_ol_li]:mb-2
                  [&_ol_li]:pl-2
                  
                  /* Blockquotes - Sophisticated Callout */
                  prose-blockquote:border-l-[2px]
                  prose-blockquote:border-[#4CAF93] 
                  prose-blockquote:bg-[#F9FAFB]
                  prose-blockquote:pl-6
                  prose-blockquote:py-4
                  prose-blockquote:pr-6
                  prose-blockquote:rounded-r-xl
                  prose-blockquote:text-[#4B5563]
                  prose-blockquote:my-12
                  prose-blockquote:leading-[1.7]
                  prose-blockquote:not-italic
                  
                  /* Links & Media */
                  prose-a:text-[#4CAF93] prose-a:no-underline prose-a:border-b prose-a:border-[#4CAF93]/20 prose-a:transition-all hover:prose-a:border-[#4CAF93]
                  prose-img:rounded-2xl prose-img:shadow-sm prose-img:my-12 prose-img:border prose-img:border-gray-100
                "
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* Author Bio (Card Style) */}
              <div className="mt-24 p-8 md:p-12 bg-gray-50/80 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm mb-6">
                  <img
                    src="/images/logo.png"
                    alt="DropDrop Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#999] uppercase tracking-[0.2em] mb-3">
                    {t("blog.author.title")}
                  </div>
                  <h4 className="text-xl font-bold text-[#111] mb-3">
                    {post.author}
                  </h4>
                  <p className="text-[15px] text-[#555] leading-relaxed max-w-lg mx-auto">
                    {t("blog.author.desc")}
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />
            </div>

            {/* CTA Section (High Contrast) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-24 relative overflow-hidden bg-[#111111] rounded-[3rem] p-12 md:p-24 text-center shadow-2xl"
            >
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-[#4CAF93] text-[11px] font-bold tracking-[0.3em] uppercase mb-8 block opacity-90">
                  DropDrop App
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-[1.2] tracking-tight">
                  {t("blog.cta.title")}
                </h3>
                <p className="text-white/70 mb-12 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto">
                  {t("blog.cta.subtitle")}
                </p>
                <a
                  href="https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-16 items-center justify-center rounded-full bg-[#4CAF93] px-12 text-[17px] font-bold text-white shadow-lg shadow-[#4CAF93]/20 transition-all hover:bg-[#3d8f78] hover:scale-105 active:scale-95"
                >
                  {t("blog.cta.btn")}
                </a>
              </div>

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              {/* Glow Effects */}
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#4CAF93] rounded-full blur-[150px] opacity-20 pointer-events-none" />
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10 pointer-events-none" />
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
