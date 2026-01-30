import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getAllBlogPosts, BlogPost } from '@/lib/blog';
import { Link } from 'wouter';
import { breadcrumbSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';

export default function Blog() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const data = await getAllBlogPosts(language as 'zh' | 'en');
        setPosts(data);
      } catch (error) {
        console.error("Failed to load blog posts", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [language]);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Blog', url: 'https://dropdrophabit.com/blog' }
  ]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <>
      <SEOHead
        title={language === 'zh' ? 'DropDrop 博客 - 习惯养成指南与技巧' : 'DropDrop Blog - Habit Building Guides & Tips'}
        description={language === 'zh'
          ? '探索科学的习惯养成指南、2026年最新趋势以及 DropDrop 使用教程。获取专业的自我提升建议，助你建立持久的生活方式。'
          : 'Discover expert habit-building strategies, 2026 trends, and DropDrop tutorials. Transform your daily routine with science-backed insights.'}
        canonical="https://dropdrophabit.com/blog"
        structuredData={breadcrumbs}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />

        {/* Header */}
        <section className="pt-40 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-light text-[#222222] mb-8"
            >
              {t('blog.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#666666] max-w-2xl mx-auto font-light"
            >
              {t('blog.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-32 px-4">
          <div className="container max-w-6xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[240px] w-full rounded-3xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <a className="block h-full">
                        <div className="bg-white border border-[#E5E5E5] rounded-3xl overflow-hidden shadow-soft hover:border-[#4CAF93]/30 transition-all duration-500 h-full flex flex-col">
                          {/* Image */}
                          <div className="aspect-[16/10] bg-[#F5F5F5] overflow-hidden relative">
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center group-hover:bg-[#E8F5E9] transition-colors duration-500">
                                <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">🌿</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-4 text-xs text-[#999999] uppercase tracking-widest">
                              <span className="text-[#4CAF93] font-medium">
                                {post.category}
                              </span>
                              <span>•</span>
                              <span>{new Date(post.datePublished).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}</span>
                            </div>

                            <h2 className="text-xl font-normal text-[#222222] mb-4 group-hover:text-[#4CAF93] transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h2>

                            <p className="text-[#666666] text-sm font-light mb-8 line-clamp-3 leading-relaxed flex-grow">
                              {post.description}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-[#F5F5F5]">
                              <div className="flex items-center gap-2 text-xs text-[#999999]">
                                <Clock size={14} />
                                <span>{post.readTime} {language === 'zh' ? '分钟阅读' : 'min read'}</span>
                              </div>
                              <span className="text-[#222222] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                {language === 'zh' ? '阅读全文' : 'Read More'}
                                <ArrowRight size={16} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
