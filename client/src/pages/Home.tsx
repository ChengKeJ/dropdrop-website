import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo, memo } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useThrottle } from "@/hooks/useThrottle";
import {
  DropIcon,
  ChartIcon,
  TrophyIcon,
  ClockIcon,
  TargetIcon,
  SparklesIcon,
  DownloadIcon,
  SmartphoneIcon,
  CheckIcon
} from "@/components/IllustratedIcons";

/**
 * DropDrop Official Website - Premium Edition
 * Design: Ultra-Modern + Glassmorphism + Smooth Animations
 * International: Chinese + English
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Optimized scroll handler with throttling
  const handleScroll = useThrottle(() => {
    setIsScrolled(window.scrollY > 50);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Optimized Background Elements - CSS Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Navigation - Glassmorphism */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-50" />
              <img src="/images/logo.png" alt="DropDrop" className="relative w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DropDrop
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, color: "#1E293B" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('features')}
              className="text-[#64748B] hover:text-[#1E293B] transition-colors font-medium"
            >
              {t('nav.features')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: "#1E293B" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('showcase')}
              className="text-[#64748B] hover:text-[#1E293B] transition-colors font-medium"
            >
              {t('nav.showcase')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: "#1E293B" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('download')}
              className="text-[#64748B] hover:text-[#1E293B] transition-colors font-medium"
            >
              {t('nav.download')}
            </motion.button>
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
        className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden"
      >
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/30 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1E293B] mb-6 leading-tight"
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
              className="text-lg md:text-xl text-[#64748B] mb-10 leading-relaxed max-w-2xl mx-auto px-4 md:px-0"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(74, 137, 220, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('download')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg overflow-hidden shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {t('hero.cta.download')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('showcase')}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-[#1E293B] rounded-xl font-semibold text-lg hover:bg-white hover:border-blue-300 transition-all shadow-lg"
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

      {/* App Showcase Section - Premium */}
      <section id="showcase" className="py-20 md:py-32 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl mb-6"
            >
              <Zap className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] mb-6">
              {t('showcase.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto px-4">
              {t('showcase.subtitle')}
            </p>
          </motion.div>

          {/* Screenshots Grid - Desktop */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 mb-16 max-w-7xl mx-auto">
            {[
              { title: t('showcase.screen1.title'), desc: t('showcase.screen1.desc'), img: 'app-screenshot-1.png', color: 'from-blue-500/10 to-cyan-500/10' },
              { title: t('showcase.screen2.title'), desc: t('showcase.screen2.desc'), img: 'app-screenshot-2.png', color: 'from-purple-500/10 to-pink-500/10' },
              { title: t('showcase.screen3.title'), desc: t('showcase.screen3.desc'), img: 'app-screenshot-3.png', color: 'from-green-500/10 to-emerald-500/10' },
              { title: t('showcase.screen4.title'), desc: t('showcase.screen4.desc'), img: 'app-screenshot-4.png', color: 'from-orange-500/10 to-red-500/10' },
            ].map((screen, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${screen.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[9/19] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={`/images/${screen.img}`}
                      alt={screen.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = '/images/feature-tracking.png';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-[#1E293B] mb-2 group-hover:text-blue-600 transition-colors">{screen.title}</h3>
                    <p className="text-sm text-[#64748B]">{screen.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Screenshots Carousel - Mobile */}
          <div className="md:hidden relative px-4 mb-16">
            <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-6 w-max">
                {[
                  { title: t('showcase.screen1.title'), desc: t('showcase.screen1.desc'), img: 'app-screenshot-1.png' },
                  { title: t('showcase.screen2.title'), desc: t('showcase.screen2.desc'), img: 'app-screenshot-2.png' },
                  { title: t('showcase.screen3.title'), desc: t('showcase.screen3.desc'), img: 'app-screenshot-3.png' },
                  { title: t('showcase.screen4.title'), desc: t('showcase.screen4.desc'), img: 'app-screenshot-4.png' },
                ].map((screen, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-xl w-72 flex-shrink-0"
                  >
                    <div className="aspect-[9/19] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={`/images/${screen.img}`}
                        alt={screen.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/feature-tracking.png';
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-[#1E293B] mb-2">{screen.title}</h3>
                      <p className="text-sm text-[#64748B]">{screen.desc}</p>
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
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto px-4 md:px-0"
          >
            {[
              { IconComponent: DropIcon, title: t('showcase.feature1.title'), desc: t('showcase.feature1.desc') },
              { IconComponent: ChartIcon, title: t('showcase.feature2.title'), desc: t('showcase.feature2.desc') },
              { IconComponent: TrophyIcon, title: t('showcase.feature3.title'), desc: t('showcase.feature3.desc') },
              { IconComponent: ClockIcon, title: t('showcase.feature4.title'), desc: t('showcase.feature4.desc') },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="text-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  <feature.IconComponent size={isMobile ? 80 : 96} />
                </div>
                <h4 className="font-bold text-[#1E293B] mb-2 text-base md:text-lg">{feature.title}</h4>
                <p className="text-sm md:text-base text-[#64748B]">{feature.desc}</p>
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
              className="inline-block p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl mb-6"
            >
              <TargetIcon size={48} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] mb-6">
              {t('features.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {[
              {
                title: t('features.tracking.title'),
                desc: t('features.tracking.desc'),
                items: [t('features.tracking.item1'), t('features.tracking.item2'), t('features.tracking.item3')],
                img: 'feature-tracking.png',
                gradient: 'from-blue-500 to-cyan-500',
                IconComponent: DropIcon
              },
              {
                title: t('features.analytics.title'),
                desc: t('features.analytics.desc'),
                items: [t('features.analytics.item1'), t('features.analytics.item2'), t('features.analytics.item3')],
                img: 'feature-analytics.png',
                gradient: 'from-purple-500 to-pink-500',
                IconComponent: ChartIcon
              },
              {
                title: t('features.reminders.title'),
                desc: t('features.reminders.desc'),
                items: [t('features.reminders.item1'), t('features.reminders.item2'), t('features.reminders.item3')],
                img: 'feature-reminders.png',
                gradient: 'from-orange-500 to-red-500',
                IconComponent: ClockIcon
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group relative"
              >
                <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Icon Badge */}
                  <div className="inline-block mb-6">
                    <feature.IconComponent size={64} />
                  </div>

                  {/* Image */}
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={`/images/${feature.img}`}
                      alt={feature.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-[#64748B] mb-6 leading-relaxed">
                    {feature.desc}
                  </p>
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[#1E293B]"
                      >
                        <div className="flex-shrink-0 w-6 h-6">
                          <CheckIcon size={24} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
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
              <div className="inline-block mb-6">
                <SparklesIcon size={56} />
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
                  { IconComponent: SmartphoneIcon, title: t('premium.feature1.title'), desc: t('premium.feature1.desc') },
                  { IconComponent: ChartIcon, title: t('premium.feature2.title'), desc: t('premium.feature2.desc') },
                  { IconComponent: ClockIcon, title: t('premium.feature3.title'), desc: t('premium.feature3.desc') },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 transform transition-transform duration-300 group-hover:scale-110">
                      <feature.IconComponent size={56} />
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
              className="order-first md:order-last"
            >
              <div className="relative">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20" />

                {/* Pricing Cards */}
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-3xl p-1 shadow-2xl">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12">
                    <div className="space-y-6">
                      {/* Free Plan */}
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-transform duration-300 hover:scale-[1.02]">
                        <p className="text-sm font-semibold text-white/70 mb-2">{t('premium.plan.free')}</p>
                        <p className="text-4xl font-bold text-white">¥0</p>
                      </div>

                      {/* Pro Plan - Highlighted */}
                      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/40 shadow-2xl transition-transform duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-semibold text-white/90">{t('premium.plan.pro')}</p>
                          <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                            <span className="text-xs font-bold text-gray-900">⭐ Popular</span>
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-white mb-2">¥9.99<span className="text-lg font-normal text-white/70">/月</span></p>
                        <p className="text-sm text-white/70">{t('premium.plan.annual')}</p>
                      </div>

                      {/* Trial */}
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-transform duration-300 hover:scale-[1.02]">
                        <p className="text-sm font-semibold text-white/90 mb-2">{t('premium.plan.trial')}</p>
                        <p className="text-lg text-white/80">{t('premium.plan.trial.desc')}</p>
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
            <div className="inline-block mb-6">
              <DownloadIcon size={56} />
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
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
        </div>

        <div className="container px-4 md:px-0 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-75" />
                  <img src="/images/logo.png" alt="DropDrop" className="relative w-10 h-10" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DropDrop</span>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer.slogan')}
              </p>
            </div>

            {[
              {
                title: t('footer.product'),
                links: [
                  { label: t('footer.features'), onClick: () => scrollToSection('features') },
                  { label: t('footer.pricing'), href: '#' },
                  { label: t('footer.download'), onClick: () => scrollToSection('download') },
                ]
              },
              {
                title: t('footer.company'),
                links: [
                  { label: t('footer.about'), href: '#' },
                  { label: t('footer.blog'), href: '#' },
                  { label: t('footer.contact'), href: '#' },
                ]
              },
              {
                title: t('footer.legal'),
                links: [
                  { label: t('footer.privacy'), href: '#' },
                  { label: t('footer.terms'), href: '#' },
                ]
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold mb-4 text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.onClick ? (
                        <motion.button
                          whileHover={{ x: 5, color: "#fff" }}
                          onClick={link.onClick}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </motion.button>
                      ) : (
                        <motion.a
                          whileHover={{ x: 5, color: "#fff" }}
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </motion.a>
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
            className="border-t border-gray-700/50 pt-8"
          >
            <p className="text-gray-400 text-sm text-center">
              {t('footer.copyright')}
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
