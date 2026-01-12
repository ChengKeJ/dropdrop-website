import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { breadcrumbSchema } from '@/lib/structuredData';

export default function Terms() {
  const { language } = useLanguage();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://dropdrophabit.com/' },
    { name: 'Terms of Service', url: 'https://dropdrophabit.com/terms' }
  ]);

  const sections = [
    {
      title: { zh: '接受条款', en: 'Acceptance of Terms' },
      content: { zh: '通过访问或使用 DropDrop 服务，您同意受本服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。', en: 'By accessing or using DropDrop services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' }
    },
    {
      title: { zh: '用户账户', en: 'User Accounts' },
      content: { zh: '您有责任维护账户安全，对您账户下发生的所有活动负责。请勿与他人共享您的账户信息。', en: 'You are responsible for maintaining account security and are liable for all activities under your account. Do not share your account information with others.' }
    },
    {
      title: { zh: '禁止行为', en: 'Prohibited Conduct' },
      content: { zh: '您不得使用服务进行任何非法活动、滥用服务、干扰其他用户或试图未经授权访问我们的系统。', en: 'You may not use the service for any illegal activities, abuse the service, interfere with other users, or attempt unauthorized access to our systems.' }
    },
    {
      title: { zh: '知识产权', en: 'Intellectual Property' },
      content: { zh: 'DropDrop 及其内容（包括但不限于文本、图形、logo）均受知识产权法保护。未经授权，您不得复制、修改或分发我们的内容。', en: 'DropDrop and its content (including but not limited to text, graphics, logos) are protected by intellectual property laws. You may not copy, modify, or distribute our content without authorization.' }
    },
    {
      title: { zh: '免责声明', en: 'Disclaimer' },
      content: { zh: '服务按"现状"提供，不提供任何明示或暗示的保证。我们不保证服务不会中断或完全无错误。', en: 'Services are provided "as is" without any express or implied warranties. We do not guarantee that services will be uninterrupted or error-free.' }
    },
    {
      title: { zh: '责任限制', en: 'Limitation of Liability' },
      content: { zh: '在法律允许的最大范围内，DropDrop 不对任何间接、偶然、特殊或后果性损害承担责任。', en: 'To the maximum extent permitted by law, DropDrop shall not be liable for any indirect, incidental, special, or consequential damages.' }
    },
    {
      title: { zh: '服务终止', en: 'Termination' },
      content: { zh: '我们保留在您违反本条款时暂停或终止您的账户的权利。您也可以随时停止使用我们的服务。', en: 'We reserve the right to suspend or terminate your account if you violate these terms. You may also stop using our services at any time.' }
    },
    {
      title: { zh: '条款变更', en: 'Changes to Terms' },
      content: { zh: '我们可能会不时更新这些条款。重大变更将通过应用内通知或电子邮件通知您。继续使用服务即表示您接受更新的条款。', en: 'We may update these terms from time to time. Significant changes will be notified via in-app notifications or email. Continued use of services indicates acceptance of updated terms.' }
    }
  ];

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '服务条款 - DropDrop' : 'Terms of Service - DropDrop'}
        description={language === 'zh'
          ? '阅读 DropDrop 的服务条款，了解使用我们服务时的权利和责任。'
          : 'Read DropDrop\'s Terms of Service to understand your rights and responsibilities when using our services.'}
        canonical="https://dropdrophabit.com/terms"
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
              {language === 'zh' ? '服务条款' : 'Terms of Service'}
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
                ? '欢迎使用 DropDrop！这些服务条款（"条款"）管理您对我们的应用程序和服务的使用。请仔细阅读这些条款。'
                : 'Welcome to DropDrop! These Terms of Service ("Terms") govern your use of our application and services. Please read these terms carefully.'}
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
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center mt-12"
          >
            <h3 className="text-2xl font-bold mb-4">
              {language === 'zh' ? '对条款有疑问？' : 'Questions About Terms?'}
            </h3>
            <p className="text-white/90 mb-6">
              {language === 'zh'
                ? '如果您对服务条款有任何疑问，请联系我们'
                : 'If you have any questions about our terms of service, please contact us'}
            </p>
            <a
              href="mailto:legal@dropdrophabit.com"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              legal@dropdrophabit.com
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}
