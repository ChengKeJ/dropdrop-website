import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getBlogPost, BlogPost as BlogPostType } from '@/lib/blog';
import { Link, useRoute } from 'wouter';
import { breadcrumbSchema, blogPostSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from './NotFound';

export default function BlogPost() {
  const { language, t } = useLanguage();
  const [, params] = useRoute('/blog/:slug');
  const { scrollYProgress } = useScroll();
  
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [contentWithIds, setContentWithIds] = useState('');

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    async function loadPost() {
      if (!params?.slug) return;
      
      setLoading(true);
      try {
        const data = await getBlogPost(params.slug, language as 'zh' | 'en');
        if (data) {
          setPost(data);
          
          // Process Content
          // 1. Remove duplicate H2 title if it exists at the beginning (legacy check)
          // Since we migrated to markdown, we might have removed H1/H2 from the body manually, 
          // but keeping this check is safe.
          const processedContent = data.content.replace(/^<h[12]>.*?<\/h[12]>/i, '');

          // 2. Add IDs to H3 for better SEO and anchor links
          const processedIds = processedContent.replace(/<h3>(.*?)<\/h3>/g, (_, title) => {
            const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return `<h3 id="${id}">${title}</h3>`;
          });
          
          setContentWithIds(processedIds);
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
      navigator.share({
        title: post?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(language === 'zh' ? '链接已复制' : 'Link copied');
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

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Blog', url: 'https://dropdrophabit.com/blog' },
    { name: post.title, url: `https://dropdrophabit.com/blog/${post.slug}` }
  ]);

  const blogSchema = blogPostSchema({
    title: post.title,
    description: post.description,
    image: `https://dropdrophabit.com${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    url: `https://dropdrophabit.com/blog/${post.slug}`
  });

  return (
    <>
      <SEOHead
        title={`${post.title} - DropDrop Blog`}
        description={post.description}
        canonical={`https://dropdrophabit.com/blog/${post.slug}`}
        ogType="article"
        ogImage={`https://dropdrophabit.com${post.image}`}
        structuredData={[breadcrumbs, blogSchema]}
      />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#4CAF93] origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans selection:bg-[#4CAF93] selection:text-white">
        <Navbar />

        <article className="pt-32 md:pt-48 pb-20 px-6 md:px-8">
          <div className="container max-w-3xl mx-auto">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link href="/blog">
                  <a className="inline-flex items-center gap-2 text-[#999999] hover:text-[#4CAF93] transition-colors text-xs md:text-sm uppercase tracking-[0.2em] font-medium group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {t('blog.back')}
                  </a>
                </Link>
              </motion.div>

              <div className="flex items-center gap-4">
                 <button 
                  onClick={handleShare}
                  className="p-2 text-[#999999] hover:text-[#4CAF93] transition-colors"
                  aria-label="Share"
                 >
                    <Share2 size={18} />
                 </button>
                 <button 
                  className="p-2 text-[#999999] hover:text-[#4CAF93] transition-colors"
                  aria-label="Bookmark"
                 >
                    <Bookmark size={18} />
                 </button>
              </div>
            </div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 md:mb-20"
            >
              <div className="inline-block px-3 py-1 bg-[#4CAF93]/10 text-[#4CAF93] rounded-full text-xs font-semibold tracking-wider uppercase mb-8">
                {post.category}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#222222] mb-10 leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 md:gap-10 text-xs md:text-sm text-[#999999] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#CCCCCC]" />
                  <span>{new Date(post.datePublished).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="w-1 h-1 bg-[#E5E5E5] rounded-full" />
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#CCCCCC]" />
                  <span>{post.readTime} {t('blog.minuteRead')}</span>
                </div>
              </div>
            </motion.header>

            {/* Content Container */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="
                  prose prose-lg md:prose-xl max-w-none 
                  prose-slate 
                  text-[#444444] 
                  font-light 
                  leading-loose
                  
                  prose-headings:font-light 
                  prose-headings:text-[#222222] 
                  prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                  prose-h3:scroll-mt-24
                  
                  prose-p:mb-8 
                  prose-p:leading-8
                  
                  prose-strong:text-[#222222] 
                  prose-strong:font-semibold
                  
                  prose-a:text-[#4CAF93] 
                  prose-a:no-underline 
                  prose-a:border-b 
                  prose-a:border-[#4CAF93]/30 
                  prose-a:transition-colors
                  hover:prose-a:border-[#4CAF93]
                  
                  prose-img:rounded-[2rem] 
                  prose-img:shadow-2xl 
                  prose-img:my-12
                  prose-img:border
                  prose-img:border-gray-100
                  
                  prose-blockquote:border-l-4
                  prose-blockquote:border-[#4CAF93] 
                  prose-blockquote:bg-[#F8FAF9]
                  prose-blockquote:py-6
                  prose-blockquote:px-8
                  prose-blockquote:rounded-r-2xl
                  prose-blockquote:italic
                  prose-blockquote:text-gray-600
                  prose-blockquote:my-12
                  prose-blockquote:not-italic
                  
                  prose-ul:my-8
                  prose-li:marker:text-[#4CAF93]
                  prose-li:pl-2
                "
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-32 relative overflow-hidden bg-[#1A1A1A] rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl"
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-[#4CAF93] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                  DropDrop
                </span>
                <h3 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
                  {t('blog.cta.title')}
                </h3>
                <p className="text-white/60 mb-10 text-lg font-light leading-relaxed">
                  {t('blog.cta.subtitle')}
                </p>
                <a 
                  href="https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#4CAF93] px-10 text-base font-medium text-white shadow transition-all hover:bg-[#3d8f78] hover:scale-105 active:scale-95"
                >
                  {t('blog.cta.btn')}
                </a>
              </div>

              {/* Decorative background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-[#2A2A2A] to-transparent opacity-50 -z-0 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#4CAF93] rounded-full blur-[100px] opacity-20 pointer-events-none" />
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
