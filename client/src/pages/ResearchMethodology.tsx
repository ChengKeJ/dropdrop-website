import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { pageSchema, breadcrumbSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const content = {
  zh: {
    title: '研究方法论',
    description: '了解 DropDrop 如何选择来源、撰写比较内容，以及如何更新和审阅网站上的信息。',
    intro: '这页主要说明我们在撰写产品内容、习惯相关文章和比较内容时，如何选择来源、如何处理不确定信息，以及如何保持内容更新。',
    bullets: [
      {
        title: '来源优先级',
        body: '优先使用原始研究、机构指南、平台官方文档和一手产品信息。二级来源仅用于补充背景，不用于承载关键结论。'
      },
      {
        title: '产品与比较方法',
        body: '涉及功能对比、替代应用或年度推荐时，我们优先说明评价维度，如提醒、数据分析、跨设备、恢复导向能力和长期坚持成本。'
      },
      {
        title: '引用与审阅',
        body: '涉及健康、行为或习惯形成的内容时，我们会尽量标明参考来源，并在表达上避免超过证据本身所支持的结论。'
      },
      {
        title: '更新原则',
        body: '当产品功能、价格、兼容性或关键事实发生变化时，相关页面会优先更新。对于长期有效的背景内容，我们会在需要时复核并修订。'
      }
    ]
  },
  en: {
    title: 'Research Methodology',
    description: 'Understand how DropDrop chooses sources, writes comparison content, and reviews or updates information across the site.',
    intro: 'This page explains how we choose sources, how we handle uncertainty in habit and health-related topics, and how we update product and editorial content over time.',
    bullets: [
      {
        title: 'Source priority',
        body: 'We prioritize original research, institutional guidance, official platform documentation, and first-party product information. Secondary sources are used for context, not for core factual claims.'
      },
      {
        title: 'Product and comparison methodology',
        body: 'For comparison and recommendation content, we use explicit evaluation dimensions such as reminders, analytics depth, cross-device support, recovery-awareness, and long-term user cost.'
      },
      {
        title: 'Review and citations',
        body: 'When content touches health, behavior, or habit formation, we try to cite sources clearly and phrase conclusions conservatively when the evidence is mixed or directional.'
      },
      {
        title: 'Update policy',
        body: 'Pages are updated when features, pricing, compatibility, or other material facts change. Longer-lived background content is reviewed and revised when it needs clarification or correction.'
      }
    ]
  }
} as const;

export default function ResearchMethodology() {
  const { language } = useLanguage();
  const page = content[language];
  const baseUrl = language === 'zh' ? 'https://www.dropdrophabit.com/zh' : 'https://www.dropdrophabit.com';
  const homeUrl = language === 'zh' ? baseUrl : `${baseUrl}/`;
  const breadcrumbs = breadcrumbSchema([
    { name: language === 'zh' ? '首页' : 'Home', url: homeUrl },
    { name: page.title, url: `${baseUrl}/research-methodology` }
  ]);
  const schema = pageSchema({
    type: 'WebPage',
    name: page.title,
    description: page.description,
    url: `${baseUrl}/research-methodology`,
    language,
  });

  return (
    <>
      <SEOHead
        title={`${page.title} - DropDrop`}
        description={page.description}
        canonical="https://www.dropdrophabit.com/research-methodology"
        structuredData={[breadcrumbs, schema]}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />
        <main className="pt-36 pb-28 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-[#4CAF93] mb-5">Evidence & Methods</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">{page.title}</h1>
              <p className="text-lg text-[#666666] leading-relaxed max-w-3xl">{page.intro}</p>
            </motion.div>

            <div className="grid gap-8">
              {page.bullets.map((item, index) => (
                <motion.section
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white border border-[#E5E5E5] rounded-3xl p-8 md:p-10 shadow-soft"
                >
                  <h2 className="text-2xl font-light mb-4">{item.title}</h2>
                  <p className="text-[#666666] leading-relaxed">{item.body}</p>
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
