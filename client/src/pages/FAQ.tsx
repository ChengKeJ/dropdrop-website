import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { faqSchema } from '@/lib/structuredData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const { language } = useLanguage();

  const faqs = [
    {
      question: "为什么需要 HRV 数据？",
      answer: "HRV (心率变异性) 是反映自主神经系统平衡的重要指标。它能科学地反映你的身体压力水平和恢复状况，比单纯的心率更灵敏。"
    },
    {
      question: "DropDrop 如何确保我的数据安全？",
      answer: "我们坚持隐私优先。您的详细健康数据存储在本地设备或您的 iCloud 空间。我们只在必要时分析经过脱敏处理的汇总数据来优化建议算法。"
    },
    {
      question: "我没有 Apple Watch，可以使用吗？",
      answer: "可以。虽然 HRV 自动监测需要智能穿戴设备（如 Apple Watch、Garmin 等），但您也可以手动输入心情和感觉，或者通过第三方 App 测量的 HRV 数据同步。"
    },
    {
      question: "订阅版和免费版有什么区别？",
      answer: "免费版可以追踪基础习惯并获得每日状态简报。订阅版提供更深入的长效趋势分析、无限习惯追踪、以及针对具体身心状态的深度干预建议。"
    }
  ];

  const structuredData = faqSchema(faqs);

  return (
    <>
      <SEOHead
        title={language === 'zh' ? '常见问题 - DropDrop' : 'FAQ - DropDrop'}
        description="解答关于 DropDrop 的功能、科学原理和订阅的常见问题。"
        canonical="https://dropdrophabit.com/faq"
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
              <h1 className="text-3xl md:text-4xl font-light mb-4">常见问题</h1>
              <p className="text-[#666666] font-light">了解更多关于科学追踪与温和生活的细节</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#E5E5E5] rounded-3xl p-6 md:p-12 shadow-soft"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-[#F5F5F5]">
                    <AccordionTrigger className="text-[#222222] font-normal text-left hover:text-[#4CAF93] py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#666666] font-light leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}