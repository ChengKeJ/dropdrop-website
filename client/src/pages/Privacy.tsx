import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title={`${t('privacy.title')} - DropDrop`}
        description={t('privacy.seo.description')}
        canonical="https://dropdrophabit.com/privacy"
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />

        <section className="pt-40 pb-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E5E5E5] rounded-3xl p-8 md:p-16 shadow-soft"
            >
              <h1 className="text-3xl md:text-4xl font-light mb-12 text-center">{t('privacy.title')}</h1>
              
              <div className="prose prose-slate max-w-none text-[#666666] font-light leading-relaxed">
                <p className="mb-8">{t('privacy.updated')}</p>
                
                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('privacy.section1.title')}</h2>
                <p>{t('privacy.section1.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('privacy.section2.title')}</h2>
                <p>{t('privacy.section2.content')}</p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                  <li>{t('privacy.section2.item1')}</li>
                  <li>{t('privacy.section2.item2')}</li>
                </ul>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('privacy.section3.title')}</h2>
                <p>{t('privacy.section3.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('privacy.section4.title')}</h2>
                <p>{t('privacy.section4.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('privacy.section5.title')}</h2>
                <p>{t('privacy.section5.content')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}