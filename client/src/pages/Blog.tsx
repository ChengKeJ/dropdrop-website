import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getAllBlogPosts } from '@/data/blogPosts';
import { Link } from 'wouter';
import { breadcrumbSchema } from '@/lib/structuredData';

export default function Blog() {
  const { language } = useLanguage();
  const posts = getAllBlogPosts();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Blog', url: 'https://dropdrophabit.com/blog' }
  ]);

  return (
    <>
      <SEOHead
        title={language === 'zh' ? 'DropDrop 博客 - 习惯养成指南与技巧' : 'DropDrop Blog - Habit Building Guides & Tips'}
        description={language === 'zh'
          ? '探索科学的习惯养成方法、生产力技巧和自我提升策略。DropDrop 博客提供实用的习惯追踪建议。'
          : 'Explore science-based habit building methods, productivity tips, and self-improvement strategies. DropDrop blog offers practical habit tracking advice.'}
        canonical="https://dropdrophabit.com/blog"
        ogImage="https://dropdrophabit.com/images/og-blog.png"
        structuredData={breadcrumbs}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-[#1E293B] mb-6"
            >
              {language === 'zh' ? 'DropDrop 博客' : 'DropDrop Blog'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#64748B] max-w-2xl mx-auto"
            >
              {language === 'zh'
                ? '探索习惯养成的科学方法、生产力技巧和自我提升策略'
                : 'Explore science-based habit building, productivity tips, and self-improvement strategies'}
            </motion.p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <a className="block">
                      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer">
                        {/* Image */}
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl">📝</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Category & Date */}
                          <div className="flex items-center gap-4 mb-3 text-sm text-[#64748B]">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.datePublished).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-bold text-[#1E293B] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title[language]}
                          </h2>

                          {/* Description */}
                          <p className="text-[#64748B] mb-4 line-clamp-3 flex-grow">
                            {post.description[language]}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-1 text-sm text-[#64748B]">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime} {language === 'zh' ? '分钟' : 'min'}</span>
                            </div>
                            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              {language === 'zh' ? '阅读更多' : 'Read More'}
                              <ArrowRight className="w-4 h-4" />
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
      </div>
    </>
  );
}
