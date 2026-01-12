import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { faqData, getFAQsByCategory } from '@/data/faq';
import { breadcrumbSchema, faqSchema } from '@/lib/structuredData';

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const categorizedFAQs = getFAQsByCategory(language);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'FAQ', url: 'https://dropdrophabit.com/faq' }
  ]);

  const faqStructuredData = faqSchema(
    faqData.map(faq => ({
      question: faq.question[language],
      answer: faq.answer[language]
    }))
  );

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '常见问题 - DropDrop' : 'FAQ - DropDrop'}
        description={language === 'zh'
          ? '查找关于 DropDrop 习惯追踪应用的常见问题答案，包括功能、定价、数据安全等'
          : 'Find answers to common questions about DropDrop habit tracking app, including features, pricing, data security, and more'}
        canonical="https://dropdrophabit.com/faq"
        ogImage="https://dropdrophabit.com/images/og-faq.png"
        structuredData={[breadcrumbs, faqStructuredData]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block p-4 bg-white rounded-3xl shadow-xl shadow-blue-500/10 mb-6"
            >
              <HelpCircle className="w-10 h-10 text-blue-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-[#1E293B] mb-6"
            >
              {language === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#64748B] max-w-2xl mx-auto"
            >
              {language === 'zh'
                ? '找到关于 DropDrop 的所有问题答案'
                : 'Find answers to all your questions about DropDrop'}
            </motion.p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="pb-20 px-4">
          <div className="container max-w-4xl mx-auto">
            {Object.entries(categorizedFAQs).map(([category, faqs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-[#1E293B] mb-6">{category}</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const faqId = `${category}-${index}`;
                    const isOpen = openIndex === faqId;

                    return (
                      <motion.div
                        key={faqId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(faqId)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50/50 transition-colors"
                        >
                          <span className="text-lg font-semibold text-[#1E293B] pr-4">
                            {faq.question[language]}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-6 h-6 text-blue-600" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 pt-2 text-[#64748B] leading-relaxed border-t border-gray-100">
                                {faq.answer[language]}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="pb-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'zh' ? '还有其他问题？' : 'Still Have Questions?'}
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                {language === 'zh'
                  ? '我们很乐意帮助你。请通过邮件联系我们。'
                  : 'We are happy to help. Please contact us via email.'}
              </p>
              <a
                href="mailto:support@dropdrophabit.com"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
              >
                {language === 'zh' ? '联系支持' : 'Contact Support'}
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
