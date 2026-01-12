import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getBlogPost } from '@/data/blogPosts';
import { Link, useRoute } from 'wouter';
import { breadcrumbSchema, blogPostSchema } from '@/lib/structuredData';
import NotFound from './NotFound';

export default function BlogPost() {
  const { language } = useLanguage();
  const [, params] = useRoute('/blog/:slug');

  const post = params?.slug ? getBlogPost(params.slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Blog', url: 'https://dropdrophabit.com/blog' },
    { name: post.title[language], url: `https://dropdrophabit.com/blog/${post.slug}` }
  ]);

  const blogSchema = blogPostSchema({
    title: post.title[language],
    description: post.description[language],
    image: `https://dropdrophabit.com${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    url: `https://dropdrophabit.com/blog/${post.slug}`
  });

  return (
    <>
      <SEOHead
        title={`${post.title[language]} - DropDrop Blog`}
        description={post.description[language]}
        canonical={`https://dropdrophabit.com/blog/${post.slug}`}
        ogType="article"
        ogImage={`https://dropdrophabit.com${post.image}`}
        article={{
          publishedTime: post.datePublished,
          modifiedTime: post.dateModified,
          author: post.author,
          section: post.category,
          tags: post.tags
        }}
        structuredData={[breadcrumbs, blogSchema]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
        <article className="pt-24 pb-20 px-4">
          <div className="container max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/blog">
              <a className="flex items-center gap-2 text-[#64748B] hover:text-[#1E293B] mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                {language === 'zh' ? '返回博客' : 'Back to Blog'}
              </a>
            </Link>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              {/* Category */}
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium mb-6">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 leading-tight">
                {post.title[language]}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-[#64748B] mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime} {language === 'zh' ? '分钟阅读' : 'min read'}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mb-12 overflow-hidden shadow-xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl">📝</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none prose-headings:text-[#1E293B] prose-p:text-[#64748B] prose-a:text-blue-600 prose-strong:text-[#1E293B] prose-ul:text-[#64748B] prose-ol:text-[#64748B]"
              dangerouslySetInnerHTML={{ __html: post.content[language] }}
            />

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                {language === 'zh' ? '准备好开始养成好习惯了吗？' : 'Ready to Start Building Better Habits?'}
              </h3>
              <p className="text-white/90 mb-6">
                {language === 'zh'
                  ? '立即下载 DropDrop，开始你的习惯养成之旅'
                  : 'Download DropDrop now and start your habit-building journey'}
              </p>
              <Link href="/#download">
                <a className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg">
                  {language === 'zh' ? '立即下载' : 'Download Now'}
                </a>
              </Link>
            </motion.div>
          </div>
        </article>
      </div>
    </>
  );
}
