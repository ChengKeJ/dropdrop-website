import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Terms() {
  const { language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '用户协议 - DropDrop' : 'Terms of Service - DropDrop'}
        description="了解使用 DropDrop 服务的条款与条件。"
        canonical="https://dropdrophabit.com/terms"
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
              <h1 className="text-3xl md:text-4xl font-light mb-12 text-center">用户协议</h1>
              
              <div className="prose prose-slate max-w-none text-[#666666] font-light leading-relaxed">
                <p className="mb-8">生效日期：2026年1月13日</p>
                
                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">1. 协议接受</h2>
                <p>下载或使用 DropDrop 应用即表示您同意接受本协议的所有条款。如果您不同意，请勿使用本应用。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">2. 服务内容</h2>
                <p>DropDrop 提供基于生理指标的习惯追踪与建议服务。这些建议仅供参考，不能替代专业的医疗诊断或建议。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">3. 免责声明</h2>
                <p>在使用本应用提供的建议进行高强度运动或其他可能影响健康的活动前，请务必咨询专业医疗人员。DropDrop 对因使用本应用建议而产生的任何直接或间接健康后果不承担法律责任。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">4. 订阅服务</h2>
                <p>部分高级功能可能需要订阅。订阅费用将在确认购买时从您的应用商店账户扣除。您可以随时在账户设置中管理或取消订阅。</p>

                <h2 className="text-[#222222] text-xl font-medium mt-12 mb-4">5. 协议修改</h2>
                <p>我们可能会不时修改本协议。重大修改将通过应用内通知或网站公告告知您。继续使用服务即视为您接受修改后的协议。</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}