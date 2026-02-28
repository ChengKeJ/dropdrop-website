import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      nameKey: "testimonial.1.name",
      roleKey: "testimonial.1.role",
      commentKey: "testimonial.1.comment",
      stars: 5,
      avatar: "/images/avatars/avatar1.png",
    },
    {
      id: 2,
      nameKey: "testimonial.2.name",
      roleKey: "testimonial.2.role",
      commentKey: "testimonial.2.comment",
      stars: 5,
      avatar: "/images/avatars/avatar2.png",
    },
    {
      id: 3,
      nameKey: "testimonial.3.name",
      roleKey: "testimonial.3.role",
      commentKey: "testimonial.3.comment",
      stars: 5,
      avatar: "/images/avatars/avatar3.png",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light mb-6 text-[#222222]"
          >
            {t("home.testimonials.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#666666] font-light max-w-2xl mx-auto"
          >
            {t("home.testimonials.desc")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative group flex flex-col"
            >
              <Quote className="absolute top-8 right-8 text-[#4CAF93]/10 w-12 h-12 group-hover:text-[#4CAF93]/20 transition-colors" />

              <div className="flex gap-1 mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>

              <p className="text-[#444] leading-relaxed mb-8 flex-grow font-light text-lg">
                "{t(item.commentKey)}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md shrink-0">
                  <img
                    src={item.avatar}
                    alt={t(item.nameKey)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="font-medium text-[#222] text-lg">
                    {t(item.nameKey)}
                  </div>
                  <div className="text-xs text-[#888] uppercase tracking-wide font-medium">
                    {t(item.roleKey)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
