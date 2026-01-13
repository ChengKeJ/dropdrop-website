import { Button } from "@/components/ui/button";
import {
  Activity,
  Smartphone,
  Moon,
  Sun,
  BarChart3,
  Heart,
  CheckCircle2,
  Brain,
  Zap,
  Coffee,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { SEOHead } from "@/components/SEO/SEOHead";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/useMobile";

/**
 * DropDrop Official Website - Converged & Upgraded
 * Design Philosophy: 
 * - Narrative-driven: State -> Suggestion -> Execution -> Review
 * - Restrained: Less functional listing, more value storytelling
 * - Scientific & Gentle: Emphasizing HRV, recovery, and long-termism
 */

export default function Home() {
  const { t } = useLanguage(); 
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Interactive Carousel State
  const [activeIndex, setActiveIndex] = useState(1); // Default to Plan (Index 1)

  const heroImages = [
    { src: "/images/today.png", alt: "Today Interface", id: 0 },
    { src: "/images/plan.png", alt: "Plan Interface", id: 1 },
    { src: "/images/statics.png", alt: "Stats Interface", id: 2 }
  ];

  const getPosition = (index: number) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex - 1 + 3) % 3) return "left";
    return "right";
  };

  const carouselVariants = {
    center: {
      x: "-50%",
      scale: 1,
      zIndex: 30,
      rotate: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 20 }
    },
    left: {
      x: isMobile ? "-120%" : "-125%", // Tighter overlap for PC
      scale: 0.85,
      zIndex: 10,
      rotate: -12,
      opacity: 0.8,
      filter: "blur(0.5px)",
      transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 20 }
    },
    right: {
      x: isMobile ? "20%" : "25%", // Tighter overlap for PC
      scale: 0.85,
      zIndex: 10,
      rotate: 12,
      opacity: 0.8,
      filter: "blur(0.5px)",
      transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.15 }
  };

  return (
    <>
      <SEOHead
        title="DropDrop - 让身体状态决定今天的习惯 | 科学温和的习惯追踪"
        description="基于 HRV、心情与活动数据，为你生成真正适合今天的习惯与计划。不逼你自律，而是帮你找到最舒服的节奏。"
        canonical="https://dropdrophabit.com/"
      />

      <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans selection:bg-[#4CAF93] selection:text-white">
        
        <Navbar />

        {/* 1. Hero Section: "The Promise" */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
          <div className="container">
            <motion.div 
              style={{ opacity, scale }}
              className="max-w-4xl mx-auto text-center relative z-20"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 text-[#222222] tracking-tight">
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.title') }} />
              </h1>
              <p className="text-lg md:text-xl text-[#666666] leading-relaxed mb-12 font-light max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#download" className="btn-primary w-full sm:w-auto px-10 py-4 text-lg shadow-soft rounded-full transition-all hover:scale-105">
                  {t('home.hero.cta')}
                </a>
              </div>
            </motion.div>

            {/* Interactive 3-Phone Carousel */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-16 md:mt-24 max-w-[1000px] mx-auto h-[360px] md:h-[750px] flex justify-center items-start perspective-1000"
            >
               {heroImages.map((image, index) => {
                 const position = getPosition(index);
                 const isCenter = position === "center";
                 
                 return (
                   <motion.div
                     key={image.id}
                     variants={carouselVariants}
                     initial="center"
                     animate={position}
                     onClick={() => setActiveIndex(index)}
                     className={`absolute left-1/2 top-6 md:top-0 w-[180px] md:w-[320px] origin-center ${isCenter ? 'cursor-default' : 'cursor-pointer hover:brightness-105'}`}
                     style={{ touchAction: "manipulation" }}
                   >
                     <div 
                        className={`relative overflow-hidden bg-white transition-all duration-500
                          ${isCenter 
                            ? 'rounded-[2.5rem] md:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] border-[6px] md:border-[8px] border-white' 
                            : 'rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-4 md:border-8 border-white'
                          }
                        `}
                     >
                        <img src={image.src} alt={image.alt} className="w-full h-full block" />
                        
                        {/* Overlay for non-center items to indicate interactivity */}
                        {!isCenter && (
                          <div className="absolute inset-0 bg-white/10 hover:bg-transparent transition-colors" />
                        )}
                     </div>
                   </motion.div>
                 );
               })}

               {/* Glow Effect */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-[#4CAF93]/10 to-transparent rounded-full blur-3xl -z-30 pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* 2. State Understanding Layer */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div {...fadeInUp} className="order-2 md:order-1">
                <div className="relative min-h-[400px] md:min-h-[500px] bg-[#F8F9FA] rounded-3xl overflow-visible p-8 flex items-center justify-center">
                   {/* Refined HRV Visualization - Focused Data Card (Hybrid: Code Title + Image Chart) */}
                   <div className="relative w-full max-w-[380px]">
                      
                      {/* Main Data Insight Card */}
                      <div className="relative h-[350px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-2 border-white/80 bg-white z-10 group mx-auto transform transition-transform duration-700 hover:scale-[1.02]">
                         
                         {/* 1. Recreated Header (HTML/CSS) - Solid white top to mask image text */}
                         <div className="absolute top-0 left-0 w-full pt-6 px-6 pb-8 z-20 flex justify-between items-start bg-[linear-gradient(to_bottom,#ffffff_80%,transparent)]">
                            <div>
                               <h3 className="text-lg font-bold text-gray-900 leading-tight">Daily HRV Trend</h3>
                               <p className="text-xs text-gray-400 mt-1">Based on daily measurement average</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                               <Activity size={16} />
                            </div>
                         </div>

                         {/* 2. Focused Chart View (Image) */}
                         <div className="w-full h-full relative overflow-hidden bg-white">
                            <img 
                              src="/images/hrv.png" 
                              alt="HRV Trends" 
                              className="w-full h-full object-cover object-[center_95%] scale-140 group-hover:scale-[1.45] transition-transform duration-700 ease-out" 
                            />
                            {/* Inner shadow & blends */}
                            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none" />
                            
                            {/* Bottom blend to hide UI artifacts */}
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-20" />
                         </div>
                      </div>

                      {/* Floating Card 1: Readiness/Sun */}
                      <div className="absolute top-2 -right-10 md:-right-16 p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-white/60 animate-float-slow z-20 min-w-[130px]">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-orange-50 text-orange-500 rounded-full relative shadow-sm">
                            <Sun size={20} strokeWidth={2.5} />
                          </div>
                          <div>
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Readiness</div>
                             <div className="text-base font-bold text-[#222222]">High</div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Card 2: Stress/Load */}
                      <div className="absolute -bottom-10 -left-10 md:-left-16 p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-white/60 animate-float-delayed z-20 min-w-[130px]">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11">
                             <svg className="w-full h-full -rotate-90">
                               <circle cx="22" cy="22" r="18" fill="none" stroke="#F3F4F6" strokeWidth="4" />
                               <circle cx="22" cy="22" r="18" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray="113" strokeDashoffset="34" strokeLinecap="round" />
                             </svg>
                             <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
                               70%
                             </div>
                          </div>
                          <div>
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Load</div>
                             <div className="text-base font-bold text-[#222222]">Optimal</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative background blobs */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#4CAF93]/15 to-transparent rounded-full blur-3xl -z-10" />
                   </div>
                </div>
              </motion.div>
              
              <motion.div {...fadeInUp} className="order-1 md:order-2">
                <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">
                  <span dangerouslySetInnerHTML={{ __html: t('home.state.title') }} />
                </h2>
                
                <div className="space-y-8 mt-12">
                  {[
                    { icon: Heart, key: 'home.state.mood' },
                    { icon: Activity, key: 'home.state.body' },
                    { icon: Zap, key: 'home.state.activity' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5 items-start group">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] text-[#4CAF93] flex items-center justify-center shrink-0 group-hover:bg-[#4CAF93] group-hover:text-white transition-colors duration-300">
                        <item.icon size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#222222] mb-1">{t(item.key)}</h3>
                        <p className="text-[#666666] font-light text-sm">{t(`${item.key}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Suggestion Layer (The Core Value) */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="container">
            <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">
                <span dangerouslySetInnerHTML={{ __html: t('home.suggestion.title') }} />
              </h2>
              <p className="text-lg text-[#666666] font-light max-w-xl mx-auto">
                {t('home.suggestion.desc')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
              {/* Card 1: Low Energy */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-transparent hover:border-[#4CAF93]/20 transition-all"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium">Rest Day</span>
                  <Moon className="text-gray-400" size={24} />
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-xl opacity-50">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    <span className="text-gray-400 line-through">HIIT Workout</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-xl border-l-4 border-[#4CAF93]">
                    <div className="w-4 h-4 rounded-full border-2 border-[#4CAF93]" />
                    <span className="text-[#222222] font-medium">10 min Meditation</span>
                  </div>
                </div>
                <p className="text-sm text-[#999999] italic">"HRV is low today. Let's focus on recovery."</p>
              </motion.div>

              {/* Card 2: High Energy */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-transparent hover:border-[#4CAF93]/20 transition-all"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium">Peak State</span>
                  <Sun className="text-orange-400" size={24} />
                </div>
                 <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-xl border-l-4 border-orange-400">
                    <div className="w-4 h-4 rounded-full border-2 border-orange-400" />
                    <span className="text-[#222222] font-medium">Deep Work Session</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-xl border-l-4 border-orange-400">
                    <div className="w-4 h-4 rounded-full border-2 border-orange-400" />
                    <span className="text-[#222222] font-medium">5km Run</span>
                  </div>
                </div>
                <p className="text-sm text-[#999999] italic">"Your energy is high! Great time to tackle hard tasks."</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Execution Layer (No Pressure) */}
        <section className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp} className="max-w-md">
                <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">
                  <span dangerouslySetInnerHTML={{ __html: t('home.execution.title') }} />
                </h2>
                <p className="text-lg text-[#666666] font-light leading-relaxed mb-8">
                  {t('home.execution.desc')}
                </p>
                <div className="flex items-center gap-2 text-[#4CAF93] font-medium">
                  <CheckCircle2 size={20} />
                  <span>Zero-friction Logging</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                {/* Visualizing simple check-in without complex metrics */}
                 <div className="w-full max-w-md mx-auto aspect-square bg-[#F8F9FA] rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-gray-100 rounded-full scale-90" />
                    <div className="absolute inset-0 border border-gray-100 rounded-full scale-75" />
                    
                    <div className="w-48 h-48 bg-white rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#4CAF93]/10 text-[#4CAF93] flex items-center justify-center mb-3">
                        <CheckCircle2 size={32} />
                      </div>
                      <span className="text-gray-900 font-medium">Done</span>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-10 right-10 bg-white px-4 py-2 rounded-xl shadow-sm text-sm text-gray-500">
                      Just a tap
                    </div>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Review Layer (Long Termism) */}
        <section className="py-24 md:py-32 bg-[#1A1A1A] text-white">
          <div className="container">
             <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                <motion.div {...fadeInUp} className="order-2 md:order-1">
                   {/* Dark mode chart visualization */}
                   <div className="bg-[#2A2A2A] rounded-3xl p-8 border border-white/5 shadow-2xl">
                      <div className="flex justify-between items-end mb-8">
                         <div>
                            <div className="text-white/40 text-sm mb-1">Weekly Trend</div>
                            <div className="text-2xl font-light">Consistency Score</div>
                         </div>
                         <div className="text-[#4CAF93]">+12%</div>
                      </div>
                      <div className="h-48 w-full flex items-end gap-1">
                         {[30, 45, 35, 60, 55, 70, 65, 50, 60, 75, 80, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-[#4CAF93]/20 rounded-t-sm relative group">
                               <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-[#4CAF93] rounded-t-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                         ))}
                      </div>
                      <div className="mt-6 flex justify-between text-xs text-white/20">
                         <span>Week 1</span>
                         <span>Week 4</span>
                         <span>Week 8</span>
                         <span>Week 12</span>
                      </div>
                   </div>
                </motion.div>

                <motion.div {...fadeInUp} className="order-1 md:order-2">
                   <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">
                    <span dangerouslySetInnerHTML={{ __html: t('home.review.title') }} />
                  </h2>
                  <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
                    {t('home.review.desc')}
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Monthly Heatmaps",
                      "Recovery correlation",
                      "Long-term adaptation"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF93]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
             </div>
          </div>
        </section>

        {/* 6. Summary Layer (The "Why") */}
        <section className="py-32 bg-white text-center">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto border border-[#F0F0F0] rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#4CAF93] to-transparent opacity-50" />
               
               <span className="text-[#4CAF93] text-sm tracking-[0.2em] uppercase font-medium mb-6 block">Philosophy</span>
               <h2 className="text-3xl md:text-5xl font-light mb-8 text-[#222222]">
                 {t('home.summary.title')}
               </h2>
               <p className="text-xl md:text-2xl text-[#666666] font-light italic font-serif">
                 "{t('home.summary.desc')}"
               </p>

               {/* Decorative background elements */}
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gray-50 rounded-full -z-10" />
               <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-50 rounded-full -z-10" />
            </motion.div>
          </div>
        </section>

        {/* 7. CTA (Trust) */}
        <section id="download" className="py-24 md:py-32 bg-[#FAFAFA] border-t border-[#EAEAEA]">
          <div className="container text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-light mb-10 text-[#222222] leading-tight">
                <span dangerouslySetInnerHTML={{ __html: t('home.cta.title') }} />
              </h2>
              
              <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <a 
                    href="https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464" 
                    target="_blank"
                    className="btn-primary flex items-center justify-center gap-3 px-10 py-5 text-lg w-full sm:w-auto min-w-[240px] rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <Smartphone size={22} />
                    {t('home.cta.btn')}
                  </a>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-[#999999] opacity-80">
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> iOS Ready</span>
                  <span className="w-1 h-1 bg-[#CCCCCC] rounded-full" />
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Privacy First</span>
                  <span className="w-1 h-1 bg-[#CCCCCC] rounded-full" />
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> No Ads</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}