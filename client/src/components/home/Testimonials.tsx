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
      avatar: "/images/avatars/avatar1.webp",
    },
    {
      id: 2,
      nameKey: "testimonial.2.name",
      roleKey: "testimonial.2.role",
      commentKey: "testimonial.2.comment",
      stars: 5,
      avatar: "/images/avatars/avatar2.webp",
    },
    {
      id: 3,
      nameKey: "testimonial.3.name",
      roleKey: "testimonial.3.role",
      commentKey: "testimonial.3.comment",
      stars: 5,
      avatar: "/images/avatars/avatar3.webp",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F7FAFE]">
      <div className="container">
        <div className="text-center mb-14 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light mb-6 text-[#172033] tracking-tight"
          >
            {t("home.testimonials.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#64748B] font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("home.testimonials.desc")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-7 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white/90 p-7 md:p-8 rounded-[1.5rem] shadow-[0_18px_50px_-42px_rgba(24,39,75,0.42)] hover:shadow-[0_24px_64px_-42px_rgba(24,39,75,0.5)] transition-all duration-300 border border-[#E1EAF4] relative group flex flex-col"
            >
              <Quote className="absolute top-7 right-7 text-[#5E8CD7]/10 w-11 h-11 group-hover:text-[#5E8CD7]/18 transition-colors" />

              <div className="flex gap-1 mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-[18px] w-[18px] fill-[#DDAA45] text-[#DDAA45]"
                  />
                ))}
              </div>

              <p className="text-[#475569] leading-relaxed mb-8 flex-grow font-light text-base md:text-[1.04rem]">
                "{t(item.commentKey)}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#EDF3F8]">
                <div className="w-11 h-11 rounded-full overflow-hidden shadow-[0_12px_24px_-18px_rgba(24,39,75,0.5)] ring-1 ring-[#E1EAF4] shrink-0">
                  <img
                    src={item.avatar}
                    alt={t(item.nameKey)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="font-medium text-[#172033] text-base">
                    {t(item.nameKey)}
                  </div>
                  <div className="text-xs text-[#8190A3] uppercase tracking-wide font-medium">
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
