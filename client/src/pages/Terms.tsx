import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { breadcrumbSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Terms() {
  const { t } = useLanguage();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Terms of Service', url: 'https://dropdrophabit.com/terms' }
  ]);

  return (
    <>
      <SEOHead
        title={`${t('terms.title')} - DropDrop`}
        description={t('terms.seo.description')}
        canonical="https://dropdrophabit.com/terms"
        structuredData={breadcrumbs}
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
              <h1 className="text-3xl md:text-4xl font-light mb-12 text-center">{t('terms.title')}</h1>

              <div className="prose prose-slate max-w-none text-[#666666] font-light leading-relaxed">
                <p className="mb-8">{t('terms.updated')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('terms.section1.title')}</h2>
                <p>{t('terms.section1.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('terms.section2.title')}</h2>
                <p>{t('terms.section2.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('terms.section3.title')}</h2>
                <p>{t('terms.section3.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('terms.section4.title')}</h2>
                <p>{t('terms.section4.content')}</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">{t('terms.section5.title')}</h2>
                <p>{t('terms.section5.content')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}