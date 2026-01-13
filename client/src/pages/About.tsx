import { motion } from 'framer-motion';
import { Heart, Target, Users, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { breadcrumbSchema, organizationSchema } from '@/lib/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function About() {
  const { language } = useLanguage();

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
      title: { zh: '科学至上', en: 'Scientific First' },
      description: { zh: '我们坚持基于生理数据的科学方法，拒绝盲目激励。', en: 'We insist on scientific methods based on physiological data, rejecting blind motivation.' }
    },
    {
      icon: Target,
      title: { zh: '长期主义', en: 'Long-termism' },
      description: { zh: '习惯不是短跑，而是与身体的一场终身长跑。', en: 'Habits are not a sprint, but a lifelong run with your body.' }
    },
    {
      icon: Users,
      title: { zh: '温和克制', en: 'Gentle & Restrained' },
      description: { zh: '不做烦人的提醒者，做懂你的安静伙伴。', en: 'Not a nagging reminder, but a quiet partner who understands you.' }
    }
  ];

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '关于我们 - DropDrop' : 'About Us - DropDrop'}
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
              懂你的每一种状态
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed font-light"
            >
              DropDrop 诞生于一个简单的愿望:<br/>
              让习惯回归自然，让自律不再痛苦。
            </motion.p>
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
                我们的使命
              </h2>
              <p className="text-[#666666] leading-relaxed mb-6 font-light">
                我们相信，每个人的身体状态都是波动的。强行维持恒定的高强度自律，是对身心的巨大消耗。
              </p>
              <p className="text-[#666666] leading-relaxed font-light">
                DropDrop 的使命是利用先进的生理监测技术，将原本抽象的身体感受量化。我们帮你找到那个“合适的节奏”——在精力充沛时勇敢挑战，在疲惫不堪时温柔休息。
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
              我们的价值观
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
                    {value.title[language as 'zh' | 'en'] || value.title.zh}
                  </h3>
                  <p className="text-[#999999] text-sm leading-relaxed font-light">
                    {value.description[language as 'zh' | 'en'] || value.description.zh}
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
              className="bg-[#222222] rounded-3xl p-12 text-white"
            >
              <h3 className="text-2xl md:text-3xl font-light mb-6">
                期待听到你的声音
              </h3>
              <p className="text-white/60 mb-10 text-lg font-light">
                如果你有任何关于习惯、健康或产品的想法，请随时联系我们。
              </p>
              <a
                href="mailto:support@dropdrophabit.com"
                className="btn-primary inline-block"
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