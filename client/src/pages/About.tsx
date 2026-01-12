import { motion } from 'framer-motion';
import { Heart, Target, Users, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { breadcrumbSchema, organizationSchema } from '@/lib/structuredData';

export default function About() {
  const { language } = useLanguage();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'About', url: 'https://dropdrophabit.com/about' }
  ]);

  const values = [
    {
      icon: Heart,
      title: { zh: '用户至上', en: 'User First' },
      description: { zh: '我们专注于创造真正帮助用户改变生活的产品', en: 'We focus on creating products that truly help users change their lives' }
    },
    {
      icon: Target,
      title: { zh: '持续改进', en: 'Continuous Improvement' },
      description: { zh: '就像习惯养成一样，我们每天都在变得更好', en: 'Like habit building, we get better every day' }
    },
    {
      icon: Users,
      title: { zh: '社区驱动', en: 'Community Driven' },
      description: { zh: '倾听用户反馈，与社区共同成长', en: 'Listen to user feedback and grow with the community' }
    }
  ];

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '关于我们 - DropDrop' : 'About Us - DropDrop'}
        description={language === 'zh'
          ? '了解 DropDrop 团队的使命、愿景和价值观。我们致力于帮助人们养成更好的习惯，过上更充实的生活。'
          : 'Learn about DropDrop team\'s mission, vision, and values. We are dedicated to helping people build better habits and live more fulfilling lives.'}
        canonical="https://dropdrophabit.com/about"
        ogImage="https://dropdrophabit.com/images/og-dropdrop.png"
        structuredData={[breadcrumbs, organizationSchema]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-[#1E293B] mb-6"
            >
              {language === 'zh' ? '关于 DropDrop' : 'About DropDrop'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed"
            >
              {language === 'zh'
                ? 'DropDrop 诞生于一个简单的信念：每个人都有能力通过持续的小改变，创造不凡的人生。'
                : 'DropDrop was born from a simple belief: everyone has the power to create an extraordinary life through consistent small changes.'}
            </motion.p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-[#1E293B] mb-6">
                {language === 'zh' ? '我们的使命' : 'Our Mission'}
              </h2>
              <p className="text-lg text-[#64748B] leading-relaxed mb-6">
                {language === 'zh'
                  ? '我们的使命是让习惯养成变得简单、有趣且持久。通过科学的方法、精美的设计和智能的技术，我们帮助全球用户建立更好的日常习惯。'
                  : 'Our mission is to make habit building simple, enjoyable, and lasting. Through scientific methods, beautiful design, and smart technology, we help users worldwide establish better daily habits.'}
              </p>
              <p className="text-lg text-[#64748B] leading-relaxed">
                {language === 'zh'
                  ? '我们相信，小小的日常习惯是改变人生的最强大力量。每一次打卡，都是向更好的自己迈进的一步。'
                  : 'We believe that small daily habits are the most powerful force for life change. Every check-in is a step toward becoming your best self.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1E293B] mb-12 text-center"
            >
              {language === 'zh' ? '我们的价值观' : 'Our Values'}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-4">
                    {value.title[language]}
                  </h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {value.description[language]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
            >
              <Mail className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                {language === 'zh'
                  ? '有任何问题或建议？我们很乐意听到你的声音。'
                  : 'Have any questions or suggestions? We\'d love to hear from you.'}
              </p>
              <a
                href="mailto:support@dropdrophabit.com"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
              >
                support@dropdrophabit.com
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
