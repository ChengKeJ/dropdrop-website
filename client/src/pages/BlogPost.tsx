import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { getBlogPost } from '@/data/blogPosts';
import { Link, useRoute } from 'wouter';
import { breadcrumbSchema, blogPostSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
    { name: post.title[language as 'zh' | 'en'] || post.title.zh, url: `https://dropdrophabit.com/blog/${post.slug}` }
  ]);

  const blogSchema = blogPostSchema({
    title: post.title[language as 'zh' | 'en'] || post.title.zh,
    description: post.description[language as 'zh' | 'en'] || post.description.zh,
    image: `https://dropdrophabit.com${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    url: `https://dropdrophabit.com/blog/${post.slug}`
  });

  return (
    <>
      <SEOHead
        title={`${post.title[language as 'zh' | 'en'] || post.title.zh} - DropDrop Blog`}
        description={post.description[language as 'zh' | 'en'] || post.description.zh}
        canonical={`https://dropdrophabit.com/blog/${post.slug}`}
        ogType="article"
        ogImage={`https://dropdrophabit.com${post.image}`}
        structuredData={[breadcrumbs, blogSchema]}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />

        <article className="pt-40 pb-20 px-4">
          <div className="container max-w-3xl mx-auto">
            {/* Back Button */}
            <Link href="/blog">
              <a className="inline-flex items-center gap-2 text-[#999999] hover:text-[#222222] mb-12 transition-colors text-sm uppercase tracking-widest font-medium">
                <ArrowLeft size={16} />
                返回实验室
              </a>
            </Link>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="text-[#4CAF93] font-medium tracking-widest text-sm uppercase mb-6">
                {post.category}
              </div>

              <h1 className="text-3xl md:text-5xl font-light text-[#222222] mb-10 leading-tight">
                {post.title[language as 'zh' | 'en'] || post.title.zh}
              </h1>

              <div className="flex items-center gap-8 text-xs text-[#999999] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{new Date(post.datePublished).toLocaleDateString('zh-CN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{post.readTime} 分钟阅读</span>
                </div>
              </div>
            </motion.header>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none prose-slate font-light text-[#666666] leading-relaxed prose-headings:text-[#222222] prose-headings:font-normal prose-strong:text-[#222222] prose-a:text-[#4CAF93] prose-img:rounded-3xl"
              dangerouslySetInnerHTML={{ __html: post.content[language as 'zh' | 'en'] || post.content.zh }}
            />

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 p-12 bg-[#222222] rounded-3xl text-white text-center"
            >
              <h3 className="text-2xl font-light mb-6">
                开启更科学的生活方式
              </h3>
              <p className="text-white/60 mb-10 text-lg font-light">
                立即下载 DropDrop，找到属于你的身心平衡。
              </p>
              <Link href="/#download">
                <a className="btn-primary inline-block">
                  下载 App
                </a>
              </Link>
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}