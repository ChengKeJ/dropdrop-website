import { Button } from "@/components/ui/button";
import {
  Menu, X, ArrowRight, Sparkles, Zap,
  Droplets, Activity, Trophy, Bell,
  Target, Smartphone, CloudDownload,
  CheckCircle2, Star, ShieldCheck, Heart,
  ChevronLeft, ChevronRight
} from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useThrottle } from "@/hooks/useThrottle";
import { SEOHead } from "@/components/SEO/SEOHead";
import { organizationSchema, websiteSchema, mobileAppSchema } from "@/lib/structuredData";
import { Link } from "wouter";

/**
 * DropDrop Official Website - Premium Edition
 * Design: Ultra-Modern + Glassmorphism + Smooth Animations
 * International: Chinese + English
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'center',
    containScroll: 'trimSnaps' 
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Optimized scroll handler with throttling
  const handleScroll = useThrottle(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 50);
    }
  }, 100);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (typeof document === 'undefined') return;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <SEOHead
        title={language === 'zh'
          ? 'DropDrop - 养成好习惯，从现在开始 | 专业习惯追踪应用'
          : 'DropDrop - Build Good Habits | Professional Habit Tracker App'}
        description={language === 'zh'
          ? 'DropDrop 是一款专业的习惯追踪应用，帮助你通过可视化进度、智能提醒和成就系统，坚持不懈地养成更好的习惯。支持iOS和Android平台。'
          : 'DropDrop is a professional habit tracking app that helps you build better habits through visual progress, smart reminders, and achievement systems. Available on iOS and Android.'}
        canonical="https://dropdrophabit.com/"
        ogImage="https://dropdrophabit.com/images/og-dropdrop.png"
        structuredData={[organizationSchema, websiteSchema, mobileAppSchema]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 overflow-hidden bg-noise selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      {/* Optimized Background Elements - CSS Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/10 via-purple-300/10 to-transparent rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-cyan-300/10 via-blue-300/10 to-transparent rounded-full blur-[100px] animate-[float_25s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gradient-to-br from-pink-300/5 to-purple-300/5 rounded-full blur-[80px] animate-[pulse_15s_ease-in-out_infinite]" />
      </div>

      {/* Navigation - Glassmorphism */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-white/40"
            : "bg-transparent backdrop-blur-none border-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
              <img src="/images/logo.png" alt="DropDrop Habit Tracker App Logo" className="relative w-9 h-9 md:w-11 md:h-11 shadow-sm rounded-xl bg-white p-0.5" />
            </div>
            <span className="text-xl md:text-2xl font-bold font-serif tracking-tight text-slate-800">
              DropDrop
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <motion.button
              whileHover={{ y: -1, color: "#0F172A" }}
              onClick={() => scrollToSection('features')}
              className="text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm tracking-wide"
            >
              {t('nav.features')}
            </motion.button>
            <motion.button
              whileHover={{ y: -1, color: "#0F172A" }}
              onClick={() => scrollToSection('showcase')}
              className="text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm tracking-wide"
            >
              {t('nav.showcase')}
            </motion.button>
            <motion.button
              whileHover={{ y: -1, color: "#0F172A" }}
              onClick={() => scrollToSection('download')}
              className="text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm tracking-wide"
            >
              {t('nav.download')}
            </motion.button>
            <div className="w-px h-4 bg-slate-200" />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 text-[#1E293B] hover:bg-gray-100 rounded-lg transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
            >
              <div className="container py-4 space-y-1">
                {[
                  { key: 'features', label: t('nav.features') },
                  { key: 'showcase', label: t('nav.showcase') },
                  { key: 'download', label: t('nav.download') },
                ].map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.key)}
                    className="block w-full text-left px-4 py-3 text-[#64748B] hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-[#1E293B] rounded-lg transition-all font-medium"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Ultra Premium */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-32 md:pt-44 pb-20 md:pb-36 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-white/60"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold font-serif text-slate-900 mb-8 leading-[1.1] tracking-tight"
            >
              {t('hero.title.main')}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {t('hero.title.highlight')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto px-4 md:px-0 font-light"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-5 justify-center px-4 md:px-0 mb-20"
            >
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('download')}
                className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold text-lg overflow-hidden shadow-xl shadow-slate-900/20 ring-1 ring-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                <span className="relative flex items-center justify-center gap-2">
                  {t('hero.cta.download')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('showcase')}
                className="px-8 py-4 bg-white/60 backdrop-blur-md border border-white/60 text-slate-700 rounded-2xl font-semibold text-lg hover:bg-white/80 hover:border-white transition-all shadow-lg shadow-slate-200/20"
              >
                {t('hero.cta.demo')}
              </motion.button>
            </motion.div>

            {/* Stats - Glassmorphism Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: '10万+', label: t('hero.stats.users') },
                { value: '500万+', label: t('hero.stats.checkins') },
                { value: '4.8★', label: t('hero.stats.rating') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="p-6 bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm md:text-base text-[#64748B] font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl blur-xl"
        />
      </motion.section>

      {/* App Showcase Section - Creative Bento Grid */}
      <section id="showcase" className="py-24 md:py-40 relative bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-3xl mb-8"
            >
              <Zap className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 mb-6 tracking-tight">
              {t('showcase.title')}
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('showcase.subtitle')}
            </p>
          </motion.div>

          {/* Bento Grid - Desktop - Balanced Layout */}
          <div className="hidden md:grid grid-cols-12 gap-8 mb-24 max-w-7xl mx-auto h-[680px]">
            {/* Large Card - Left (Main Feature) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-6 bg-slate-50/50 rounded-[3rem] overflow-hidden relative group h-full flex flex-col items-center justify-end border border-white/60 shadow-2xl shadow-slate-200/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white opacity-100" />
              
              {/* Dynamic Halo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-[80px] animate-pulse" />

              {/* Text Label - Moved to Top Left for Visibility */}
              <div className="absolute top-10 left-10 z-20 max-w-xs">
                <div className="backdrop-blur-md bg-white/40 p-6 rounded-[2rem] border border-white/60 shadow-sm">
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">{t('showcase.screen1.title')}</h3>
                  <p className="text-slate-600 font-light text-base">{t('showcase.screen1.desc')}</p>
                </div>
              </div>

              {/* Main Image with Phone Mockup - Adjusted Positioning */}
              <div className="relative z-10 translate-y-12 transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                <div className="relative rounded-[3rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden h-[580px] w-auto ring-1 ring-white/20">
                  <img
                    src="/images/plan.png"
                    alt="DropDrop habit planning screen showing weekly goal setting and customizable habit schedules"
                    className="h-full w-full object-cover bg-white"
                    loading="eager"
                  />
                  {/* Screen Glare/Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Two Stacked Cards */}
            <div className="col-span-6 flex flex-col gap-8 h-full">
              
              {/* Top Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex-1 bg-orange-50/40 rounded-[3rem] overflow-hidden relative group flex flex-row items-center border border-orange-100/60 shadow-xl shadow-orange-100/20"
              >
                <div className="w-[45%] h-full flex flex-col justify-center pl-10 pr-2 z-10">
                  <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm w-fit mb-4">
                    <div className="p-3 bg-orange-100 rounded-2xl w-fit mb-3">
                      <Target className="w-6 h-6 text-orange-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight">{t('showcase.screen2.title')}</h3>
                  </div>
                  <p className="text-slate-600 font-light text-sm pl-2 leading-relaxed">{t('showcase.screen2.desc')}</p>
                </div>
                <div className="w-[55%] h-full relative flex items-center justify-center">
                  {/* Tilted Partial Mockup - Pulled closer */}
                  <div className="absolute h-[125%] w-auto top-12 right-[-10px] transition-transform duration-700 group-hover:translate-x-[-10px] group-hover:rotate-2 shadow-2xl origin-top-right">
                    <div className="rounded-[2.5rem] border-[8px] border-slate-900/5 shadow-2xl overflow-hidden h-full bg-white">
                      <img
                        src="/images/habit.png"
                        alt="DropDrop today screen displaying daily habit check-ins with streak tracking and progress visualization"
                        className="h-full w-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex-1 bg-purple-50/40 rounded-[3rem] overflow-hidden relative group flex flex-row items-center border border-purple-100/60 shadow-xl shadow-purple-100/20"
              >
                <div className="w-[55%] h-full relative flex items-center justify-center order-2">
                   <div className="absolute h-[120%] w-auto top-10 left-0 transition-transform duration-700 group-hover:scale-105 shadow-2xl origin-top-left">
                     <div className="rounded-[2.5rem] border-[8px] border-slate-900/5 shadow-2xl overflow-hidden h-full bg-white">
                      <img
                        src="/images/statics.png"
                        alt="DropDrop statistics dashboard with charts showing habit completion rates and detailed analytics"
                        className="h-full w-auto object-cover"
                        loading="lazy"
                      />
                     </div>
                   </div>
                </div>
                <div className="w-[45%] h-full flex flex-col justify-center items-end pr-10 pl-2 z-10 order-1 text-right">
                  <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm w-fit mb-4 flex flex-col items-end">
                    <div className="p-3 bg-purple-100 rounded-2xl w-fit mb-3">
                      <Activity className="w-6 h-6 text-purple-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight">{t('showcase.screen4.title')}</h3>
                  </div>
                  <p className="text-slate-600 font-light text-sm pr-2 leading-relaxed">{t('showcase.screen4.desc')}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Screenshots Carousel - Mobile */}
          <div className="md:hidden relative px-4 mb-16">
            <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-6 w-max">
                {[
                  { title: t('showcase.screen1.title'), desc: t('showcase.screen1.desc'), img: 'minPlan.png' },
                  { title: t('showcase.screen2.title'), desc: t('showcase.screen2.desc'), img: 'habit.png' },
                  { title: t('showcase.screen3.title'), desc: t('showcase.screen3.desc'), img: 'today.png' },
                  { title: t('showcase.screen4.title'), desc: t('showcase.screen4.desc'), img: 'statics.png' },
                ].map((screen, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl w-72 flex-shrink-0 border border-slate-100"
                  >
                    <div className="aspect-[4/5] overflow-hidden flex items-center justify-center bg-slate-50">
                      <img
                        src={`/images/${screen.img}`}
                        alt={`${screen.title} - ${screen.desc}`}
                        className="h-[90%] w-auto object-contain drop-shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg font-serif text-slate-900 mb-2">{screen.title}</h3>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">{screen.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto px-4 md:px-0"
          >
            {[
              { Icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50', ring: 'ring-blue-100', title: t('showcase.feature1.title'), desc: t('showcase.feature1.desc') },
              { Icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50', ring: 'ring-purple-100', title: t('showcase.feature2.title'), desc: t('showcase.feature2.desc') },
              { Icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50', ring: 'ring-amber-100', title: t('showcase.feature3.title'), desc: t('showcase.feature3.desc') },
              { Icon: Bell, color: 'text-emerald-500', bg: 'bg-emerald-50', ring: 'ring-emerald-100', title: t('showcase.feature4.title'), desc: t('showcase.feature4.desc') },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="text-center group cursor-default"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-[2rem] ${feature.bg} flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ring-1 ${feature.ring} group-hover:ring-4 group-hover:ring-opacity-50`}>
                  <feature.Icon className={`w-9 h-9 ${feature.color} transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-lg tracking-tight">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Custom CSS for animations */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-gradient {
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </section>

      {/* Features Section - Premium Cards */}
      <section id="features" className="py-20 md:py-32 relative bg-gradient-to-b from-transparent to-white/50">
        <div className="container px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block p-4 bg-white rounded-3xl shadow-xl shadow-purple-500/10 mb-6"
            >
              <Target className="w-10 h-10 text-purple-600" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] mb-6">
              {t('features.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            {/* Carousel Navigation Buttons - Desktop */}
            <div className="hidden md:flex justify-end gap-4 mb-8">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="p-3 rounded-full bg-white/50 border border-white/60 hover:bg-white hover:scale-110 transition-all shadow-sm backdrop-blur-sm text-slate-600 hover:text-blue-600"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="p-3 rounded-full bg-white/50 border border-white/60 hover:bg-white hover:scale-110 transition-all shadow-sm backdrop-blur-sm text-slate-600 hover:text-blue-600"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Embla Carousel Viewport */}
            <div className="overflow-visible" ref={emblaRef}>
              <div className="flex -ml-6 md:-ml-8 touch-pan-y py-12">
                {[
                  {
                    title: t('features.tracking.title'),
                    desc: t('features.tracking.desc'),
                    items: [t('features.tracking.item1'), t('features.tracking.item2'), t('features.tracking.item3')],
                    img: 'today.png',
                    secondaryImg: 'habit.png',
                    gradient: 'from-blue-400 to-indigo-500',
                    Icon: Droplets,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50/50'
                  },
                  {
                    title: t('features.analytics.title'),
                    desc: t('features.analytics.desc'),
                    items: [t('features.analytics.item1'), t('features.analytics.item2'), t('features.analytics.item3')],
                    img: 'statics.png',
                    secondaryImg: 'minPlan.png',
                    gradient: 'from-purple-400 to-pink-500',
                    Icon: Activity,
                    color: 'text-purple-600',
                    bg: 'bg-purple-50/50'
                  },
                  {
                    title: t('features.reminders.title'),
                    desc: t('features.reminders.desc'),
                    items: [t('features.reminders.item1'), t('features.reminders.item2'), t('features.reminders.item3')],
                    img: 'minPlan.png',
                    secondaryImg: 'today.png',
                    gradient: 'from-orange-400 to-rose-500',
                    Icon: Bell,
                    color: 'text-orange-600',
                    bg: 'bg-orange-50/50'
                  },
                ].map((feature, index) => (
                  <div className="flex-[0_0_100%] sm:flex-[0_0_420px] min-w-0 pl-6 md:pl-8" key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="group relative h-full select-none"
                    >
                      <div className="relative bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 h-full flex flex-col overflow-hidden border border-white/60 cursor-grab active:cursor-grabbing hover:-translate-y-2">
                        
                        {/* Image Area - Ethereal & Clean */}
                        <div className="relative h-[480px] w-full flex items-end justify-center pt-12">
                          {/* Soft Atmosphere Background */}
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br ${feature.gradient} opacity-[0.06] blur-[120px] rounded-full`} />
                          
                          {/* Layered Composition */}
                          <div className="relative w-full h-full flex items-end justify-center px-8 pb-4">
                            {/* Secondary Image - Background Layer */}
                            <motion.div
                              className="absolute h-[75%] w-auto left-4 bottom-16 opacity-40 blur-[1px] -rotate-12 scale-90 transform group-hover:-translate-x-6 group-hover:-rotate-[15deg] transition-all duration-1000 ease-out pointer-events-none origin-bottom-left z-0"
                            >
                              <div className="rounded-[2rem] border-[4px] border-slate-900/10 shadow-lg overflow-hidden h-full bg-white">
                                <img
                                  src={`/images/${feature.secondaryImg}`}
                                  alt=""
                                  className="h-full w-auto object-cover"
                                />
                              </div>
                            </motion.div>
                            
                            {/* Primary Image - Center Layer */}
                            <div className="relative h-[95%] w-auto z-10 transform group-hover:scale-[1.02] transition-all duration-1000 ease-out origin-bottom">
                              <div className="rounded-[2.5rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden h-full ring-1 ring-white/20">
                                <img
                                  src={`/images/${feature.img}`}
                                  alt={`${feature.title} - ${feature.desc}`}
                                  className="h-full w-auto object-cover bg-white"
                                  loading="lazy"
                                />
                                {/* Screen Glare */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                              </div>
                            </div>

                            {/* Minimal Decorative Light */}
                            <div className={`absolute top-32 right-16 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-20 blur-3xl z-0`} />
                          </div>

                          {/* Seamless Gradient Fade to Content */}
                          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white via-white/90 to-transparent z-20" />
                        </div>

                        {/* Content Area - Centered & Elegant */}
                        <div className="px-10 pb-14 pt-0 flex flex-col flex-grow relative z-30 bg-white">
                          
                          <div className="text-center">
                            {/* Floating Minimal Icon */}
                            <div className={`inline-flex p-4 rounded-3xl ${feature.bg} mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                              <feature.Icon className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
                            </div>

                            {/* Serif Title */}
                            <h3 className="text-3xl font-serif font-bold text-slate-800 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                              {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-sm mx-auto">
                              {feature.desc}
                            </p>
                          </div>

                          {/* Feature List - Centered Pills */}
                          <div className="flex flex-wrap justify-center gap-3 pt-8 border-t border-slate-100/80">
                            {feature.items.map((item, i) => (
                              <div
                                key={i}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 group/item hover:bg-white hover:shadow-sm transition-all"
                              >
                                <CheckCircle2 className={`w-4 h-4 ${feature.color}`} strokeWidth={2.5} />
                                <span className="text-sm font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Section - Ultra Modern */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block p-4 bg-white rounded-3xl shadow-xl shadow-amber-500/10 mb-6">
                <Sparkles className="w-10 h-10 text-amber-500" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] mb-6">
                {t('premium.title.line1')}
                <br />
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {t('premium.title.line2')}
                </span>
              </h2>
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
                {t('premium.subtitle')}
              </p>
              <div className="space-y-6 mb-8">
                {[
                  { Icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50', title: t('premium.feature1.title'), desc: t('premium.feature1.desc') },
                  { Icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50', title: t('premium.feature2.title'), desc: t('premium.feature2.desc') },
                  { Icon: Bell, color: 'text-pink-500', bg: 'bg-pink-50', title: t('premium.feature3.title'), desc: t('premium.feature3.desc') },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                      <feature.Icon className={`w-7 h-7 ${feature.color}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1E293B] mb-1">{feature.title}</h3>
                      <p className="text-[#64748B]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(74, 137, 220, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl w-full md:w-auto"
              >
                {t('premium.cta')}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-first md:order-last relative"
            >
              <div className="relative group perspective-1000">
                {/* Glowing Background - Dynamic */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-[2rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                {/* Main Glass Card */}
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-1 shadow-2xl overflow-hidden transform transition-transform duration-700 group-hover:rotate-y-2">
                  
                  {/* Inner Dark Card */}
                  <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-[1.8rem] p-8 md:p-10 text-white relative overflow-hidden">
                    
                    {/* Decorative Shine */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    
                    <div className="space-y-6 relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-white/90">Pro Access</h3>
                          <p className="text-white/50 text-sm">Unlock full potential</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Pricing Tier: Free */}
                      <div className="group/item flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
                        <div>
                          <p className="font-semibold text-white/90">{t('premium.plan.free')}</p>
                          <p className="text-xs text-white/40">Basic features</p>
                        </div>
                        <span className="text-xl font-bold text-white/80 group-hover/item:text-white transition-colors">¥0</span>
                      </div>

                      {/* Pricing Tier: Pro (Featured) */}
                      <div className="group/item relative p-5 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 scale-[1.02] shadow-lg shadow-blue-900/20">
                        <div className="absolute -top-3 right-4">
                          <span className="bg-gradient-to-r from-amber-300 to-orange-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            POPULAR
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white text-lg">{t('premium.plan.pro')}</p>
                            <p className="text-xs text-blue-200/60">{t('premium.plan.annual')}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-white">¥9.99</span>
                            <span className="text-sm text-white/50">/mo</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Tier: Trial */}
                      <div className="group/item flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
                        <div>
                          <p className="font-semibold text-white/90">{t('premium.plan.trial')}</p>
                          <p className="text-xs text-white/40">{t('premium.plan.trial.desc')}</p>
                        </div>
                        <span className="text-sm font-medium text-emerald-400">Free 7 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Section - Premium */}
      <section id="download" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="container text-center px-4 md:px-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block p-4 bg-white rounded-3xl shadow-xl shadow-blue-500/10 mb-6">
              <CloudDownload className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] mb-6">
              {t('download.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] mb-12 max-w-3xl mx-auto">
              {t('download.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto sm:max-w-none mb-16">
              <motion.a
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                href="https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{t('download.appstore')}</span>
                </div>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{t('download.googleplay')}</span>
                </div>
              </motion.button>
            </div>

            {/* QR Code - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              className="inline-block bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-2xl"
            >
              <p className="text-sm font-semibold text-[#64748B] mb-4">{t('download.qr')}</p>
              <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                <span className="text-6xl">📱</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium */}
      <footer className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated Background Massive Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="container px-4 md:px-0 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-20">
            <div className="col-span-2 md:col-span-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
                  <img src="/images/logo.png" alt="DropDrop Habit Tracker App Logo" className="relative w-12 h-12 shadow-2xl rounded-xl bg-white p-0.5" loading="lazy" />
                </div>
                <span className="text-3xl font-serif font-bold tracking-tight text-white">DropDrop</span>
              </motion.div>
              <p className="text-slate-400 text-base leading-relaxed font-light">
                {t('footer.slogan')}
              </p>
            </div>

            {[
              {
                title: t('footer.product'),
                links: [
                  { label: t('footer.features'), onClick: () => scrollToSection('features') },
                  { label: t('footer.pricing'), onClick: () => scrollToSection('pricing') },
                  { label: t('footer.download'), onClick: () => scrollToSection('download') },
                ]
              },
              {
                title: t('footer.company'),
                links: [
                  { label: t('footer.about'), href: '/about' },
                  { label: t('footer.blog'), href: '/blog' },
                  { label: t('footer.contact'), href: 'mailto:support@dropdrophabit.com' },
                ]
              },
              {
                title: t('footer.legal'),
                links: [
                  { label: t('footer.privacy'), href: '/privacy' },
                  { label: t('footer.terms'), href: '/terms' },
                ]
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-serif font-bold mb-6 text-xl text-white tracking-wide">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.onClick ? (
                        <motion.button
                          whileHover={{ x: 4, color: "#fff" }}
                          onClick={link.onClick}
                          className="text-slate-400 hover:text-white transition-colors text-sm font-light tracking-wide"
                        >
                          {link.label}
                        </motion.button>
                      ) : link.href?.startsWith('mailto:') ? (
                        <motion.a
                          whileHover={{ x: 4, color: "#fff" }}
                          href={link.href}
                          className="text-slate-400 hover:text-white transition-colors text-sm font-light tracking-wide"
                        >
                          {link.label}
                        </motion.a>
                      ) : (
                        <Link href={link.href || '#'}>
                          <motion.a
                            whileHover={{ x: 4, color: "#fff" }}
                            className="text-slate-400 hover:text-white transition-colors text-sm font-light tracking-wide cursor-pointer"
                          >
                            {link.label}
                          </motion.a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-slate-800/50 pt-12 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-slate-500 text-sm font-light">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-8">
              <span className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer font-light">Twitter</span>
              <span className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer font-light">Instagram</span>
              <span className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer font-light">Threads</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
    </>
  );
}
