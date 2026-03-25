import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SupportEmailButton } from '@/components/SupportEmailButton';
import { faqSchema } from '@/lib/structuredData';
import { faqData } from '@/data/faq';

export default function FAQ() {
  const { t, language } = useLanguage();

  const faqs = faqData.map((faq) => ({
    question: faq.question[language],
    answer: faq.answer[language],
    category: faq.category
  }));

  const structuredData = faqSchema(faqs);

  return (
    <>
      <SEOHead
        title={`${t('faq.title')} - DropDrop`}
        description={t('faq.seo.description')}
        canonical="https://www.dropdrophabit.com/faq"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />

        <section className="pt-40 pb-20 px-4">
          <div className="container max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-3xl md:text-4xl font-light mb-4">{t('faq.title')}</h1>
              <p className="text-[#666666] font-light">{t('faq.subtitle')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#E5E5E5] rounded-3xl p-6 md:p-12 shadow-soft"
            >
              <div className="w-full">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border-b last:border-b-0 border-[#F5F5F5] py-1"
                  >
                    <summary className="list-none cursor-pointer py-5 text-[#222222] transition-colors hover:text-[#4CAF93] [&::-webkit-details-marker]:hidden">
                      <div className="flex items-start justify-between gap-4">
                        <span>
                          <span className="block text-xs uppercase tracking-[0.2em] text-[#999999] mb-2">
                            {faq.category}
                          </span>
                          <span className="block text-base font-normal text-left">
                            {faq.question}
                          </span>
                        </span>
                        <span className="mt-1 text-[#999999] transition-transform duration-200 group-open:rotate-180">
                          ↓
                        </span>
                      </div>
                    </summary>
                    <div className="pb-6 pr-8 text-[#666666] font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <SupportEmailButton className="px-4 py-2 rounded-full bg-white border border-[#E5E5E5] hover:border-[#4CAF93]/30 transition-colors">
                support@dropdrophabit.com
              </SupportEmailButton>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
