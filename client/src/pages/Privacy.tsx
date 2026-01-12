import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { breadcrumbSchema } from '@/lib/structuredData';

export default function Privacy() {
  const { language } = useLanguage();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Privacy Policy', url: 'https://dropdrophabit.com/privacy' }
  ]);

  const sections = [
    {
      title: { zh: '信息收集', en: 'Information Collection' },
      content: { zh: '我们收集您提供的信息，包括账户信息、习惯数据和使用统计。所有数据收集都遵循最小必要原则。', en: 'We collect information you provide, including account details, habit data, and usage statistics. All data collection follows the principle of minimum necessity.' }
    },
    {
      title: { zh: '数据使用', en: 'Data Usage' },
      content: { zh: '您的数据用于提供和改进服务、个性化体验和生成统计分析。我们不会将您的个人数据用于广告目的。', en: 'Your data is used to provide and improve services, personalize experiences, and generate statistical analysis. We do not use your personal data for advertising purposes.' }
    },
    {
      title: { zh: '数据共享', en: 'Data Sharing' },
      content: { zh: '我们不会向第三方出售或分享您的个人数据。仅在法律要求或您明确同意的情况下才会共享数据。', en: 'We do not sell or share your personal data with third parties. Data is only shared when required by law or with your explicit consent.' }
    },
    {
      title: { zh: '数据安全', en: 'Data Security' },
      content: { zh: '我们使用行业标准的加密技术保护您的数据。所有数据传输都经过 SSL 加密，存储数据使用 AES-256 加密。', en: 'We use industry-standard encryption to protect your data. All data transmissions are SSL encrypted, and stored data uses AES-256 encryption.' }
    },
    {
      title: { zh: '用户权利', en: 'User Rights' },
      content: { zh: '您有权访问、修改、导出或删除您的个人数据。您可以随时在应用设置中管理您的隐私偏好。', en: 'You have the right to access, modify, export, or delete your personal data. You can manage your privacy preferences in app settings at any time.' }
    },
    {
      title: { zh: 'Cookie 使用', en: 'Cookie Usage' },
      content: { zh: '我们使用 Cookie 来改善用户体验和分析网站使用情况。您可以在浏览器设置中管理 Cookie 偏好。', en: 'We use cookies to improve user experience and analyze website usage. You can manage cookie preferences in your browser settings.' }
    }
  ];

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '隐私政策 - DropDrop' : 'Privacy Policy - DropDrop'}
        description={language === 'zh'
          ? '了解 DropDrop 如何收集、使用和保护您的个人信息。我们承诺保护您的隐私和数据安全。'
          : 'Learn how DropDrop collects, uses, and protects your personal information. We are committed to protecting your privacy and data security.'}
        canonical="https://dropdrophabit.com/privacy"
        structuredData={breadcrumbs}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
        <div className="container max-w-4xl mx-auto px-4 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
              {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
            </h1>
            <p className="text-[#64748B] text-lg">
              {language === 'zh' ? '最后更新：2026年1月12日' : 'Last Updated: January 12, 2026'}
            </p>
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-10 shadow-xl mb-8"
          >
            <p className="text-lg text-[#64748B] leading-relaxed">
              {language === 'zh'
                ? 'DropDrop（"我们"）非常重视您的隐私。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。使用我们的服务即表示您同意本政策中描述的做法。'
                : 'DropDrop ("we", "us", "our") takes your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information. By using our services, you consent to the practices described in this policy.'}
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-10 shadow-lg mb-6"
            >
              <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                {section.title[language]}
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                {section.content[language]}
              </p>
            </motion.section>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center mt-12"
          >
            <h3 className="text-2xl font-bold mb-4">
              {language === 'zh' ? '隐私问题？' : 'Privacy Questions?'}
            </h3>
            <p className="text-white/90 mb-6">
              {language === 'zh'
                ? '如果您对我们的隐私政策有任何疑问，请联系我们'
                : 'If you have any questions about our privacy policy, please contact us'}
            </p>
            <a
              href="mailto:privacy@dropdrophabit.com"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              privacy@dropdrophabit.com
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}
