import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { pageSchema, breadcrumbSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const content = {
  zh: {
    title: '编辑政策',
    description: '了解 DropDrop 如何策划、审核、更新和纠正网站内容，以及我们如何区分产品主张与科学信息。',
    intro: 'DropDrop 的内容目标不是制造焦虑式增长叙事，而是提供可验证、可执行、可被长期使用的习惯与恢复建议。',
    sections: [
      {
        title: '我们写什么',
        body: '我们聚焦习惯养成、HRV、恢复、情绪与行为节奏等主题。内容分为两类：产品信息，以及基于公开研究和行业共识的科学总结。'
      },
      {
        title: '我们如何区分产品主张与科学信息',
        body: '凡是关于 DropDrop 功能、价格、设备兼容性和应用体验的描述，都视为产品主张；凡是关于习惯形成、恢复或 HRV 的解释，都必须尽量基于公开来源并在文末列出参考信息。'
      },
      {
        title: '审核与更新',
        body: '部分重点文章会显示最近更新时间。产品策略、功能和定价变化后，相关页面会优先更新；科学类内容则在研究结论、指南或核心事实发生变化时复审。'
      },
      {
        title: '更正机制',
        body: '如果你发现事实错误、过时描述或不清晰表述，可以通过 support@dropdrophabit.com 联系我们。确认存在问题后，我们会在合理时间内修订相关页面。'
      }
    ]
  },
  en: {
    title: 'Editorial Policy',
    description: 'Learn how DropDrop plans, reviews, updates, and corrects site content, and how we distinguish product claims from science summaries.',
    intro: 'DropDrop content is designed to be useful, evidence-informed, and practical. We avoid hype-first growth narratives and aim for content that stays clear, checkable, and usable over time.',
    sections: [
      {
        title: 'What we publish',
        body: 'We publish product pages, FAQs, changelog notes, and editorial content about habit formation, HRV, recovery, mood, and behavior design.'
      },
      {
        title: 'How we separate product claims from science summaries',
        body: 'Statements about DropDrop features, pricing, device support, and app behavior are treated as product claims. Explanations about habit formation, HRV, or recovery are treated as science summaries and should be supported by public sources where possible.'
      },
      {
        title: 'Review and update cadence',
        body: 'Some key articles show a recent update date. Product pages are updated when positioning, features, or pricing change. Science-focused articles are reviewed when the underlying evidence, guidance, or key claims materially change.'
      },
      {
        title: 'Corrections',
        body: 'If you spot a factual error, outdated statement, or unclear claim, contact us at support@dropdrophabit.com. Confirmed issues will be corrected in a reasonable timeframe.'
      }
    ]
  }
} as const;

export default function EditorialPolicy() {
  const { language } = useLanguage();
  const page = content[language];
  const baseUrl = language === 'zh' ? 'https://www.dropdrophabit.com/zh' : 'https://www.dropdrophabit.com';
  const homeUrl = language === 'zh' ? baseUrl : `${baseUrl}/`;
  const breadcrumbs = breadcrumbSchema([
    { name: language === 'zh' ? '首页' : 'Home', url: homeUrl },
    { name: page.title, url: `${baseUrl}/editorial-policy` }
  ]);
  const schema = pageSchema({
    type: 'WebPage',
    name: page.title,
    description: page.description,
    url: `${baseUrl}/editorial-policy`,
    language,
  });

  return (
    <>
      <SEOHead
        title={`${page.title} - DropDrop`}
        description={page.description}
        canonical="https://www.dropdrophabit.com/editorial-policy"
        structuredData={[breadcrumbs, schema]}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />
        <main className="pt-36 pb-28 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-[#4CAF93] mb-5">Trust & Transparency</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">{page.title}</h1>
              <p className="text-lg text-[#666666] leading-relaxed max-w-3xl">{page.intro}</p>
            </motion.div>

            <div className="space-y-8">
              {page.sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white border border-[#E5E5E5] rounded-3xl p-8 md:p-10 shadow-soft"
                >
                  <h2 className="text-2xl font-light mb-4">{section.title}</h2>
                  <p className="text-[#666666] leading-relaxed">{section.body}</p>
                </motion.section>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
