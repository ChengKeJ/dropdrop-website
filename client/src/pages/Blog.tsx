import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getAllBlogPosts } from '@/data/blogPosts';
import { Link } from 'wouter';
import { breadcrumbSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Blog() {
  const { language } = useLanguage();
  const posts = getAllBlogPosts();

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
          ? '探索科学的习惯养成方法、生产力技巧和自我提升策略。DropDrop 博客提供实用的习惯追踪建议。'
          : 'Explore science-based habit building methods, productivity tips, and self-improvement strategies. DropDrop blog offers practical habit tracking advice.'}
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
              习惯实验室
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#666666] max-w-2xl mx-auto font-light"
            >
              探索习惯养成的科学方法、生理原理和温和自律的实践。
            </motion.p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-32 px-4">
          <div className="container max-w-6xl mx-auto">
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
                        {/* Simple Placeholder or Image */}
                        <div className="aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#E8F5E9] transition-colors duration-500">
                          <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">🌿</span>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex items-center gap-4 mb-4 text-xs text-[#999999] uppercase tracking-widest">
                            <span className="text-[#4CAF93] font-medium">
                              {post.category}
                            </span>
                            <span>•</span>
                            <span>{new Date(post.datePublished).toLocaleDateString('zh-CN')}</span>
                          </div>

                          <h2 className="text-xl font-normal text-[#222222] mb-4 group-hover:text-[#4CAF93] transition-colors line-clamp-2 leading-snug">
                            {post.title[language as 'zh' | 'en'] || post.title.zh}
                          </h2>

                          <p className="text-[#666666] text-sm font-light mb-8 line-clamp-3 leading-relaxed flex-grow">
                            {post.description[language as 'zh' | 'en'] || post.description.zh}
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-[#F5F5F5]">
                            <div className="flex items-center gap-2 text-xs text-[#999999]">
                              <Clock size={14} />
                              <span>{post.readTime} 分钟阅读</span>
                            </div>
                            <span className="text-[#222222] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              阅读全文
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
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}