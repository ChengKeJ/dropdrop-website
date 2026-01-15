import { motion } from 'framer-motion';
import { Heart, Target, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { breadcrumbSchema, organizationSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function About() {
  const { language, t } = useLanguage();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'About', url: 'https://dropdrophabit.com/about' }
  ]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const values = [
    {
      icon: Heart,
      titleKey: 'about.values.scientific',
      descKey: 'about.values.scientific.desc'
    },
    {
      icon: Target,
      titleKey: 'about.values.longterm',
      descKey: 'about.values.longterm.desc'
    },
    {
      icon: Users,
      titleKey: 'about.values.gentle',
      descKey: 'about.values.gentle.desc'
    }
  ];

  return (
    <>
      <SEOHead
        title={t('about.title') + ' - DropDrop'}
        description={language === 'zh'
          ? '了解 DropDrop 团队的使命、愿景和价值观。我们致力于通过科学温和的方式，帮助人们建立更好的日常习惯。'
          : 'Learn about DropDrop team\'s mission, vision, and values. We are dedicated to helping people build better habits in a scientific and gentle way.'}
        canonical="https://dropdrophabit.com/about"
        structuredData={[breadcrumbs, organizationSchema]}
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-light text-[#222222] mb-8"
            >
              {t('about.hero.title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed font-light"
            >
              <span dangerouslySetInnerHTML={{ __html: t('about.hero.subtitle') }} />
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="bg-white border border-[#E5E5E5] rounded-3xl p-8 md:p-12 shadow-soft"
            >
              <h2 className="text-2xl md:text-3xl font-light text-[#222222] mb-8">
                {t('about.mission')}
              </h2>
              <p className="text-[#666666] leading-relaxed mb-6 font-light">
                {t('about.mission.desc1')}
              </p>
              <p className="text-[#666666] leading-relaxed font-light">
                {t('about.mission.desc2')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.h2
              {...fadeInUp}
              className="text-2xl md:text-3xl font-light text-[#222222] mb-12 text-center"
            >
              {t('about.values.title')}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-[#E5E5E5] rounded-3xl p-8 text-center hover:border-[#4CAF93]/30 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FAFAFA] rounded-2xl mb-6 text-[#4CAF93]">
                    <value.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-[#222222] mb-4">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-[#999999] text-sm leading-relaxed font-light">
                    {t(value.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 px-4 pb-32">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.div
              {...fadeInUp}
              className="bg-[#222222] rounded-[2.5rem] p-10 md:p-16 text-white shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-light text-white mb-6">
                {t('about.contact.title')}
              </h3>
              <p className="text-white/60 mb-10 text-lg font-light leading-relaxed max-w-lg mx-auto">
                {t('about.contact.subtitle')}
              </p>
              
              {/* Responsive Button Fix: break-all and smaller text on mobile */}
              <a
                href="mailto:support@dropdrophabit.com"
                className="btn-primary inline-block max-w-full px-6 py-4 md:px-8 md:py-4 rounded-full text-sm md:text-base break-all"
              >
                support@dropdrophabit.com
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
