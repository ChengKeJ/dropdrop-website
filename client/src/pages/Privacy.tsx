import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
  const { language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '隐私政策 - DropDrop' : 'Privacy Policy - DropDrop'}
        description="了解 DropDrop 如何保护您的个人信息。我们坚持隐私优先，您的健康数据始终掌握在自己手中。"
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
              <h1 className="text-3xl md:text-4xl font-light mb-12 text-center">隐私政策</h1>
              
              <div className="prose prose-slate max-w-none text-[#666666] font-light leading-relaxed">
                <p className="mb-8">最后更新日期：2026年1月13日</p>
                
                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">1. 我们的承诺</h2>
                <p>DropDrop 深知个人隐私的重要性。我们设计的核心理念之一就是“隐私优先”。我们致力于在提供智能习惯建议的同时，最大程度地保护您的数据安全。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">2. 数据收集与使用</h2>
                <p>我们收集的数据主要用于分析您的身体状态并提供个性化习惯建议：</p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                  <li>健康数据：包括心率、HRV、睡眠、步数等（通过 Apple Health 或 Google Fit 授权）。</li>
                  <li>应用使用数据：记录习惯完成情况，以便分析长期趋势。</li>
                </ul>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">3. 数据存储</h2>
                <p>您的健康数据主要存储在您的设备本地或您的云端账户（如 iCloud）中。我们不会在我们的服务器上存储您的原始生理数据。分析过程尽可能在本地完成。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">4. 第三方共享</h2>
                <p>我们不会将您的个人数据出售给任何第三方。除非法律要求或为了提供核心服务所必须（如云端同步），否则我们不会共享您的信息。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">5. 您的权利</h2>
                <p>您拥有随时查看、修改或删除您在 DropDrop 中存储的数据的权利。您可以随时撤销对健康数据的授权。</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}