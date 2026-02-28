import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEO/SEOHead";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { faqSchema } from "@/lib/structuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
  ];

  const structuredData = faqSchema(faqs);

  return (
    <>
      <SEOHead
        title={`${t("faq.title")} - DropDrop`}
        description={t("faq.seo.description")}
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
              <h1 className="text-3xl md:text-4xl font-light mb-4">
                {t("faq.title")}
              </h1>
              <p className="text-[#666666] font-light">{t("faq.subtitle")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#E5E5E5] rounded-3xl p-6 md:p-12 shadow-soft"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-[#F5F5F5]"
                  >
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
