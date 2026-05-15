import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  ImagePlus,
  Layers3,
  LineChart,
  Route,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SEOHead } from "@/components/SEO/SEOHead";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/useMobile";
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getSoftwareAppSchema,
} from "@/lib/structuredData";
import { appStoreUrl } from "@/lib/productFacts";
import { Testimonials } from "@/components/home/Testimonials";

type ScreenImage = {
  src: string;
  alt: string;
  id: number;
};

type FeatureCard = {
  image: string;
  icon: typeof ClipboardList;
  titleKey: string;
  descKey: string;
  badgeKey: string;
  tone: string;
  stackClass: string;
};

const phoneFrameClass =
  "relative overflow-hidden bg-white rounded-[1.9rem] md:rounded-[2.35rem] border-[5px] md:border-[7px] border-white shadow-[0_24px_60px_-32px_rgba(18,31,53,0.32)] ring-1 ring-[#DDE7F2]/70";

const miniPhoneFrameClass =
  "relative overflow-hidden bg-white rounded-[1.55rem] border-[4px] border-white shadow-[0_18px_42px_-30px_rgba(18,31,53,0.36)] ring-1 ring-[#DDE7F2]/70";

const sectionHeadingClass =
  "text-3xl md:text-5xl font-light leading-tight tracking-tight text-[#172033]";

const mutedTextClass = "text-[#64748B] font-light leading-relaxed";

export default function Home() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [featureActiveIndex, setFeatureActiveIndex] = useState(1);

  const heroImages: ScreenImage[] = [
    {
      src: "/images/home-v109-today.webp",
      alt: "DropDrop today progress and habits",
      id: 0,
    },
    {
      src: "/images/home-v109-health.webp",
      alt: "DropDrop health readiness and adaptive plan",
      id: 1,
    },
    {
      src: "/images/home-v109-analytics.webp",
      alt: "DropDrop advanced analytics",
      id: 2,
    },
  ];

  const featureScreens: FeatureCard[] = [
    {
      image: "/images/home-v109-task.webp",
      icon: ClipboardList,
      titleKey: "home.v109.tasks.title",
      descKey: "home.v109.tasks.desc",
      badgeKey: "home.v109.tasks.badge",
      tone: "text-blue-600 bg-blue-50 border-blue-100",
      stackClass:
        "left-[-4%] top-12 w-[38%] max-w-[150px] -rotate-[5deg] sm:left-[2%] sm:max-w-[178px] md:left-[8%] md:top-16 md:max-w-[230px]",
    },
    {
      image: "/images/home-v109-spark.webp",
      icon: ImagePlus,
      titleKey: "home.v109.spark.title",
      descKey: "home.v109.spark.desc",
      badgeKey: "home.v109.spark.badge",
      tone: "text-emerald-700 bg-emerald-50 border-emerald-100",
      stackClass:
        "left-[18%] top-3 w-[41%] max-w-[160px] rotate-[2deg] sm:left-[22%] sm:max-w-[194px] md:left-[24%] md:top-4 md:max-w-[242px]",
    },
    {
      image: "/images/home-v109-timeline.webp",
      icon: Route,
      titleKey: "home.v109.timeline.title",
      descKey: "home.v109.timeline.desc",
      badgeKey: "home.v109.timeline.badge",
      tone: "text-sky-700 bg-sky-50 border-sky-100",
      stackClass:
        "left-[40%] top-12 w-[38%] max-w-[150px] -rotate-[1deg] sm:left-[42%] sm:max-w-[178px] md:left-[40%] md:top-16 md:max-w-[230px]",
    },
    {
      image: "/images/home-v109-month.webp",
      icon: CalendarDays,
      titleKey: "home.v109.calendar.title",
      descKey: "home.v109.calendar.desc",
      badgeKey: "home.v109.calendar.badge",
      tone: "text-violet-700 bg-violet-50 border-violet-100",
      stackClass:
        "left-[62%] top-5 w-[38%] max-w-[150px] rotate-[4deg] sm:left-[62%] sm:max-w-[178px] md:left-[56%] md:top-8 md:max-w-[234px]",
    },
  ];

  const activeFeature = featureScreens[featureActiveIndex];
  const ActiveFeatureIcon = activeFeature.icon;

  const getPosition = (index: number) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex - 1 + heroImages.length) % heroImages.length)
      return "left";
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
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
    left: {
      x: isMobile ? "-120%" : "-125%",
      scale: 0.85,
      zIndex: 10,
      rotate: -10,
      opacity: 0.78,
      filter: "blur(0.5px)",
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
    right: {
      x: isMobile ? "20%" : "25%",
      scale: 0.85,
      zIndex: 10,
      rotate: 10,
      opacity: 0.78,
      filter: "blur(0.5px)",
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: "easeOut" as const },
  };

  const structuredData = [
    getOrganizationSchema(language as "zh" | "en"),
    getWebsiteSchema(language as "zh" | "en"),
    getSoftwareAppSchema(language as "zh" | "en"),
  ];

  return (
    <>
      <SEOHead
        title={t("seo.title")}
        description={t("seo.description")}
        canonical="https://www.dropdrophabit.com/"
        structuredData={structuredData}
        preloadImages={["/images/home-v109-health.webp"]}
      />

      <div className="min-h-screen bg-[#F7FAFE] text-[#172033] font-sans selection:bg-[#4CAF93] selection:text-white">
        <Navbar />

        <section className="relative pt-32 pb-20 md:pt-48 md:pb-36 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(91,141,214,0.10),transparent_60%)] pointer-events-none" />
          <div className="container relative">
            <motion.div
              style={{ opacity, scale }}
              className="max-w-4xl mx-auto text-center relative z-20"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE8F4] bg-white/75 px-4 py-2 text-sm font-medium text-[#52657B] shadow-soft backdrop-blur-md mb-7">
                <Sparkles size={15} className="text-[#5E8CD7]" />
                {t("home.v109.badge")}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.08] mb-8 text-[#172033] tracking-tight">
                <span
                  dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
                />
              </h1>
              <p className="text-lg md:text-xl text-[#64748B] leading-relaxed mb-10 font-light max-w-2xl mx-auto">
                {t("home.hero.subtitle")}
              </p>

              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-3 px-10 py-4 text-base md:text-lg shadow-soft rounded-full transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Smartphone size={20} />
                {t("home.hero.cta")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-16 md:mt-28 max-w-[1000px] mx-auto h-[370px] md:h-[720px] flex justify-center items-start perspective-1000"
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
                    className={`absolute left-1/2 top-4 md:top-0 w-[184px] md:w-[318px] origin-center ${
                      isCenter
                        ? "cursor-default"
                        : "cursor-pointer hover:brightness-105"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <div className={phoneFrameClass}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full block"
                        width="330"
                        height="716"
                        // @ts-ignore fetchPriority is supported by modern browsers.
                        fetchPriority={isCenter ? "high" : "auto"}
                      />
                      {!isCenter && (
                        <div className="absolute inset-0 bg-white/16 hover:bg-white/8 transition-colors" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
              <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[68%] bg-gradient-to-b from-[#6D96D9]/10 to-[#4CAF93]/4 rounded-full blur-3xl -z-30 pointer-events-none" />
            </motion.div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 py-14 md:py-20 bg-white">
          <div className="container">
            <motion.div
              {...fadeInUp}
              className="max-w-3xl mx-auto text-center mb-8 md:mb-10"
            >
              <span className="text-[#5E8CD7] text-sm tracking-[0.18em] uppercase font-semibold">
                {t("home.v109.section")}
              </span>
              <h2 className="mt-5 text-3xl md:text-4xl font-light leading-tight tracking-tight text-[#172033]">
                <span
                  dangerouslySetInnerHTML={{ __html: t("home.v109.title") }}
                />
              </h2>
              <p
                className={`mx-auto mt-3 max-w-[20rem] overflow-hidden text-sm [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:mt-4 md:max-w-none md:text-base md:[display:block] ${mutedTextClass}`}
              >
                {t("home.v109.desc")}
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="relative mx-auto max-w-6xl overflow-visible px-1 pb-10 pt-2 sm:px-4 md:pb-14 md:pt-4"
            >
              <div className="relative z-10 md:hidden">
                <div className="-mx-5 flex snap-x overflow-x-auto px-5 pb-7 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {featureScreens.map((feature, index) => {
                    const isActiveFeature = index === featureActiveIndex;

                    return (
                      <motion.button
                        key={feature.titleKey}
                        type="button"
                        animate={{
                          scale: isActiveFeature ? 1 : 0.92,
                          opacity: isActiveFeature ? 1 : 0.62,
                          y: isActiveFeature ? -6 : 10,
                        }}
                        transition={{
                          duration: 0.34,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onClick={() => setFeatureActiveIndex(index)}
                        aria-label={t(feature.titleKey)}
                        aria-pressed={isActiveFeature}
                        className={`relative block w-[52%] max-w-[190px] flex-[0_0_52%] snap-center rounded-[1.55rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#5E8CD7]/45 ${
                          index > 0 ? "-ml-[3.6rem]" : ""
                        } ${
                          index === 0
                            ? "-rotate-[5deg]"
                            : index === 1
                              ? "rotate-[2deg]"
                              : index === 2
                                ? "-rotate-[1deg]"
                                : "rotate-[4deg]"
                        }`}
                        style={{ zIndex: isActiveFeature ? 40 : index + 10 }}
                      >
                        <div
                          className={`${miniPhoneFrameClass} ${
                            isActiveFeature
                              ? "shadow-[0_24px_58px_-32px_rgba(24,39,75,0.46)]"
                              : "shadow-[0_16px_42px_-34px_rgba(24,39,75,0.34)]"
                          }`}
                        >
                          <img
                            src={feature.image}
                            alt={t(feature.titleKey)}
                            className="block h-full w-full"
                            width="210"
                            height="455"
                            loading="lazy"
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pointer-events-none absolute inset-x-12 bottom-20 h-20 rounded-full bg-[#C8D7EA]/16 blur-3xl" />

                <div className="mx-auto mt-1 flex w-fit items-center gap-2 rounded-full border border-[#E5EEF7]/80 bg-white/72 px-2 py-1.5 shadow-[0_14px_38px_-32px_rgba(24,39,75,0.38)] backdrop-blur-md">
                  {featureScreens.map((feature, index) => {
                    const Icon = feature.icon;
                    const isSelected = index === featureActiveIndex;

                    return (
                      <button
                        key={feature.titleKey}
                        type="button"
                        onClick={() => setFeatureActiveIndex(index)}
                        aria-label={t(feature.titleKey)}
                        aria-pressed={isSelected}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                          isSelected
                            ? "bg-[#172033] shadow-[0_10px_26px_-18px_rgba(24,39,75,0.45)]"
                            : "bg-white/60 hover:bg-white"
                        }`}
                      >
                        <Icon
                          size={14}
                          className={
                            isSelected ? "text-white" : "text-[#8A98AA]"
                          }
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="mx-auto mt-4 w-[min(18rem,100%)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature.titleKey}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="rounded-full border border-[#E5EEF7]/90 bg-white/76 px-3.5 py-3 shadow-[0_14px_34px_-30px_rgba(24,39,75,0.34)] backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${activeFeature.tone}`}
                        >
                          <ActiveFeatureIcon size={15} />
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A98AA]">
                            {t(activeFeature.badgeKey)}
                          </div>
                          <h3 className="truncate text-[15px] font-semibold leading-tight tracking-tight text-[#172033]">
                            {t(activeFeature.titleKey)}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative z-10 hidden h-[500px] md:block">
                <div className="pointer-events-none absolute inset-x-12 bottom-12 h-24 rounded-full bg-[#C8D7EA]/16 blur-3xl" />
                {featureScreens.map((feature, index) => {
                  const isActiveFeature = index === featureActiveIndex;

                  return (
                    <motion.button
                      key={feature.titleKey}
                      type="button"
                      animate={{
                        scale: isActiveFeature ? 1.05 : 0.96,
                        opacity: isActiveFeature ? 1 : 0.74,
                        y: isActiveFeature ? -10 : 0,
                      }}
                      transition={{
                        duration: 0.36,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => setFeatureActiveIndex(index)}
                      aria-label={t(feature.titleKey)}
                      aria-pressed={isActiveFeature}
                      className={`absolute block origin-center cursor-pointer rounded-[1.55rem] text-left outline-none transition-[filter] hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-[#5E8CD7]/45 ${feature.stackClass}`}
                      style={{ zIndex: isActiveFeature ? 40 : index + 10 }}
                    >
                      <div
                        className={`${miniPhoneFrameClass} ${
                          isActiveFeature
                            ? "shadow-[0_26px_66px_-34px_rgba(24,39,75,0.48)]"
                            : "shadow-[0_16px_44px_-34px_rgba(24,39,75,0.36)]"
                        }`}
                      >
                        <img
                          src={feature.image}
                          alt={t(feature.titleKey)}
                          className="block h-full w-full"
                          width="210"
                          height="455"
                          loading="lazy"
                        />
                      </div>
                    </motion.button>
                  );
                })}

                <div className="absolute bottom-[4.9rem] left-1/2 z-50 w-[min(18rem,calc(100%-2rem))] -translate-x-1/2 md:bottom-40 md:left-auto md:right-0 md:w-auto md:max-w-[240px] md:translate-x-0 lg:-right-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature.titleKey}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="relative rounded-full border border-[#E5EEF7]/90 bg-white/76 px-3.5 py-3 shadow-[0_14px_34px_-30px_rgba(24,39,75,0.34)] backdrop-blur-md md:rounded-[1.15rem] md:p-3.5"
                    >
                      <div className="absolute -left-10 top-7 hidden h-px w-10 bg-[#D5E1EF] md:block" />
                      <div className="flex items-center gap-2.5 md:items-start">
                        <span
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${activeFeature.tone}`}
                        >
                          <ActiveFeatureIcon size={15} />
                        </span>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A98AA]">
                            {t(activeFeature.badgeKey)}
                          </div>
                          <h3 className="mt-0.5 text-[15px] font-semibold leading-tight tracking-tight text-[#172033] md:text-lg">
                            {t(activeFeature.titleKey)}
                          </h3>
                          <p className="mt-1.5 hidden overflow-hidden text-xs font-light leading-relaxed text-[#64748B] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] md:block">
                            {t(activeFeature.descKey)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="hidden justify-center md:mt-24 md:flex">
                <div className="flex items-center gap-2 rounded-full border border-[#E5EEF7]/80 bg-white/70 px-2 py-1.5 shadow-[0_14px_38px_-32px_rgba(24,39,75,0.38)] backdrop-blur-md">
                  {featureScreens.map((feature, index) => {
                    const Icon = feature.icon;
                    const isSelected = index === featureActiveIndex;

                    return (
                      <button
                        key={feature.titleKey}
                        type="button"
                        onClick={() => setFeatureActiveIndex(index)}
                        aria-label={t(feature.titleKey)}
                        aria-pressed={isSelected}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                          isSelected
                            ? "bg-[#172033] shadow-[0_10px_26px_-18px_rgba(24,39,75,0.45)]"
                            : "bg-white/60 hover:bg-white"
                        }`}
                      >
                        <Icon
                          size={14}
                          className={
                            isSelected ? "text-white" : "text-[#8A98AA]"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-22 md:py-32 bg-[#F7FAFE]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-center">
              <motion.div
                {...fadeInUp}
                className="order-2 md:order-1 flex justify-center"
              >
                <div className="relative w-[250px] md:w-[302px]">
                  <div className={phoneFrameClass}>
                    <img
                      src="/images/home-v109-health.webp"
                      alt="DropDrop health readiness"
                      className="block w-full"
                      width="320"
                      height="693"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -right-8 top-24 hidden rounded-2xl border border-[#E1EAF4] bg-white/88 px-4 py-3 shadow-[0_18px_44px_-28px_rgba(24,39,75,0.45)] backdrop-blur md:block">
                    <div className="flex items-center gap-3">
                      <HeartPulse className="text-[#5E8CD7]" size={21} />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#98A2B3]">
                          {t("home.state.signal")}
                        </div>
                        <div className="text-sm font-semibold text-[#172033]">
                          {t("home.state.ready")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="order-1 md:order-2">
                <h2 className={`${sectionHeadingClass} mb-7`}>
                  <span
                    dangerouslySetInnerHTML={{ __html: t("home.state.title") }}
                  />
                </h2>
                <p className={`text-lg mb-10 ${mutedTextClass}`}>
                  {t("home.state.intro")}
                </p>
                <div className="space-y-7">
                  {[
                    { icon: HeartPulse, key: "home.state.body" },
                    { icon: Activity, key: "home.state.mood" },
                    { icon: Bell, key: "home.state.activity" },
                  ].map(item => (
                    <div
                      key={item.key}
                      className="flex gap-5 items-start group"
                    >
                      <div className="w-12 h-12 rounded-[1.1rem] bg-white text-[#5E8CD7] flex items-center justify-center shrink-0 shadow-soft ring-1 ring-[#E1EAF4] group-hover:bg-[#5E8CD7] group-hover:text-white transition-colors duration-300">
                        <item.icon size={22} strokeWidth={1.7} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#172033] mb-1">
                          {t(item.key)}
                        </h3>
                        <p className="text-[#64748B] font-light text-sm">
                          {t(`${item.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-22 md:py-32 bg-white overflow-hidden">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-center max-w-6xl mx-auto">
              <motion.div {...fadeInUp} className="max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#DCE8F4] bg-[#F4F8FD] px-4 py-2 text-sm font-semibold text-[#456FAE]">
                  <Layers3 size={16} />
                  {t("home.suggestion.badge")}
                </span>
                <h2 className={`mt-7 mb-7 ${sectionHeadingClass}`}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: t("home.suggestion.title"),
                    }}
                  />
                </h2>
                <p className={`text-lg md:text-xl ${mutedTextClass}`}>
                  {t("home.suggestion.desc")}
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="relative grid grid-cols-2 gap-4 md:gap-5"
              >
                <div className="pt-12">
                  <div className={phoneFrameClass}>
                    <img
                      src="/images/home-v109-today.webp"
                      alt="DropDrop today habits"
                      className="block w-full"
                      width="260"
                      height="564"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <div className={phoneFrameClass}>
                    <img
                      src="/images/home-v109-timeline.webp"
                      alt="DropDrop timeline mode"
                      className="block w-full"
                      width="260"
                      height="564"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-36 bg-[#101722] text-white overflow-hidden">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div
                {...fadeInUp}
                className="order-2 md:order-1 grid grid-cols-2 gap-4 md:gap-5 relative"
              >
                <div className="absolute inset-x-0 top-1/2 h-48 -translate-y-1/2 bg-[#6D96D9]/10 blur-3xl pointer-events-none" />
                <div className="pt-10">
                  <div className={phoneFrameClass}>
                    <img
                      src="/images/home-v109-analytics.webp"
                      alt="DropDrop advanced analytics screen"
                      className="block w-full"
                      width="280"
                      height="607"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <div className={phoneFrameClass}>
                    <img
                      src="/images/statics.webp"
                      alt="DropDrop weekly statistics screen"
                      className="block w-full"
                      width="280"
                      height="607"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="order-1 md:order-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/78">
                  <LineChart size={16} />
                  {t("home.review.badge")}
                </span>
                <h2 className="mt-7 text-3xl md:text-5xl font-light mb-7 leading-tight tracking-tight text-white">
                  <span
                    dangerouslySetInnerHTML={{ __html: t("home.review.title") }}
                  />
                </h2>
                <p className="text-lg text-white/64 font-light leading-relaxed mb-9">
                  {t("home.review.desc")}
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: BarChart3, key: "home.review.item1" },
                    { icon: CalendarDays, key: "home.review.item2" },
                    { icon: CheckCircle2, key: "home.review.item3" },
                  ].map(item => (
                    <li
                      key={item.key}
                      className="flex items-center gap-3 text-white/80 font-light"
                    >
                      <item.icon size={18} className="text-[#82D5C8]" />
                      {t(item.key)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="py-24 md:py-28 bg-white text-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto border border-[#E1EAF4] rounded-[1.75rem] p-9 md:p-16 relative overflow-hidden bg-[#FBFDFF] shadow-[0_18px_54px_-44px_rgba(24,39,75,0.42)]"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5E8CD7] to-transparent opacity-80" />
              <span className="text-[#5E8CD7] text-sm tracking-[0.18em] uppercase font-semibold mb-6 block">
                {t("home.summary.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-light mb-8 text-[#172033]">
                {t("home.summary.title")}
              </h2>
              <p className="text-xl md:text-2xl text-[#64748B] font-light italic font-serif">
                "{t("home.summary.desc")}"
              </p>
            </motion.div>
          </div>
        </section>

        <section
          id="download"
          className="py-24 md:py-32 bg-[#F7FAFE] border-t border-[#E1EAF4]"
        >
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-light mb-10 text-[#172033] leading-tight tracking-tight">
                <span
                  dangerouslySetInnerHTML={{ __html: t("home.cta.title") }}
                />
              </h2>

              <div className="flex flex-col items-center gap-9">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-3 px-10 py-5 text-lg w-full sm:w-auto min-w-[240px] rounded-full shadow-soft transition-all hover:-translate-y-0.5"
                >
                  <Smartphone size={22} />
                  {t("home.cta.btn")}
                </a>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#8190A3]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> iOS Ready
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Privacy First
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> No Ads
                  </span>
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
