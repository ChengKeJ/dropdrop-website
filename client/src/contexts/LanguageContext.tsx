import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    // Navigation
    'nav.features': '功能',
    'nav.showcase': '应用预览',
    'nav.download': '下载',
    'nav.blog': '博客',
    'nav.about': '关于',
    'nav.download_app': '下载 App',

    // SEO
    'seo.title': 'DropDrop - 让身体状态决定今天的习惯 | 科学温和的习惯追踪',
    'seo.description': '基于 HRV、心情与活动数据，为你生成真正适合今天的习惯与计划。不逼你自律，而是帮你找到最舒服的节奏。',

    // Home Section (New Structure)
    'home.hero.title': '让身体状态，<br />决定今天的习惯',
    'home.hero.subtitle': '结合 HRV、心情与行为记录，为你生成更符合当下状态的习惯建议。',
    'home.hero.cta': '开始体验',

    // State Layer (Understanding)
    'home.state.title': '从理解状态开始，<br />而不是强迫执行',
    'home.state.mood': '心情记录',
    'home.state.mood.desc': '帮助识别心理负荷',
    'home.state.body': '身体数据',
    'home.state.body.desc': '反映当前恢复与压力',
    'home.state.activity': '行为记录',
    'home.state.activity.desc': '补充真实生活节奏',

    // Suggestion Layer (Today)
    'home.suggestion.title': '今天该做什么，<br />不是固定的',
    'home.suggestion.desc': '基于你的当前状态，系统会从精选习惯中，给出更适合今天的建议。',
    'home.suggestion.rest_mode': '休息模式',
    'home.suggestion.peak_state': '巅峰状态',

    // Execution Layer (Recording)
    'home.execution.title': '记录，是为了调整，<br />而不是评判',
    'home.execution.desc': '简单的习惯记录，帮助系统理解哪些节奏对你更友好，而不是制造完成压力。',

    // Review Layer (Long-term)
    'home.review.title': '看趋势，<br />而不是盯数字',
    'home.review.desc': '我们更关注长期变化，而不是每天的完成率。',

    // Summary Layer (Consolidation)
    'home.summary.title': '所有功能，只为一件事服务',
    'home.summary.desc': '在合适的状态下，用合适的节奏，建立可持续的习惯。',

    // CTA Layer
    'home.cta.title': '你不需要更努力，<br />只需要更合适的方式。',
    'home.cta.btn': '下载 App',

    // Legacy keys (kept for compatibility if referenced elsewhere)
    'hero.badge': '专业习惯追踪应用',
    'hero.title.main': '养成好习惯',
    'hero.title.highlight': '从现在开始',
    'hero.description': 'DropDrop 帮助你通过可视化进度、智能提醒和成就系统，坚持不懈地养成更好的习惯。',
    'hero.cta.download': '立即下载',
    'hero.cta.demo': '查看演示',

    // Blog
    'blog.title': '博客',
    'blog.subtitle': '探索习惯养成的科学方法',
    'blog.readMore': '阅读更多',
    'blog.backToBlog': '返回博客',
    'blog.minuteRead': '分钟阅读',

    // FAQ
    'faq.title': '常见问题',
    'faq.subtitle': '找到关于 DropDrop 的所有问题答案',
    'faq.stillQuestions': '还有其他问题？',
    'faq.contactSupport': '联系支持',

    // About
    'about.title': '关于我们',
    'about.mission': '我们的使命',
    'about.team': '团队介绍',

    // Privacy
    'privacy.title': '隐私政策',
    'privacy.updated': '最后更新',

    // Terms
    'terms.title': '服务条款',
    'terms.updated': '最后更新',

    // Footer
    'footer.slogan': '养成好习惯，从现在开始',
    'footer.privacy': '隐私政策',
    'footer.terms': '用户协议',
    'footer.faq': 'FAQ',
    'footer.contact': '联系我们',
    'footer.product': '产品',
    'footer.features': '功能',
    'footer.pricing': '定价',
    'footer.download': '下载',
    'footer.company': '公司',
    'footer.about': '关于我们',
    'footer.blog': '博客',
    'footer.legal': '法律',
    'footer.copyright': '© 2025 DropDrop. All rights reserved.',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.showcase': 'Showcase',
    'nav.download': 'Download',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.download_app': 'Download App',

    // SEO
    'seo.title': 'DropDrop - Let Your Body State Determine Today\'s Habits | Gentle Habit Tracker',
    'seo.description': 'Generate habit suggestions tailored to your current state based on HRV, mood, and activity data. No forced discipline, just finding your right rhythm.',

    // Home Section (New Structure)
    'home.hero.title': 'Let your body state,<br />determine today’s habits',
    'home.hero.subtitle': 'Generate habit suggestions based on HRV, mood, and activity data, tailored to your current state.',
    'home.hero.cta': 'Start Experience',

    // State Layer (Understanding)
    'home.state.title': 'Start with understanding,<br />not forcing',
    'home.state.mood': 'Mood Tracking',
    'home.state.mood.desc': 'Identifies mental load',
    'home.state.body': 'Body Metrics',
    'home.state.body.desc': 'Reflects recovery & stress',
    'home.state.activity': 'Activity Log',
    'home.state.activity.desc': 'Captures life rhythm',

    // Suggestion Layer (Today)
    'home.suggestion.title': 'What to do today<br />is not fixed',
    'home.suggestion.desc': 'Based on your current state, the system suggests the most suitable habits for today.',
    'home.suggestion.rest_mode': 'Rest Mode',
    'home.suggestion.peak_state': 'Peak State',

    // Execution Layer (Recording)
    'home.execution.title': 'Record to adjust,<br />not to judge',
    'home.execution.desc': 'Simple tracking helps the system learn what rhythm works for you, without creating pressure.',

    // Review Layer (Long-term)
    'home.review.title': 'Focus on trends,<br />not just numbers',
    'home.review.desc': 'We focus on long-term changes and sustainability, rather than just daily completion rates.',

    // Summary Layer (Consolidation)
    'home.summary.title': 'All features serve one purpose',
    'home.summary.desc': 'To build sustainable habits with the right rhythm, in the right state.',

    // CTA Layer
    'home.cta.title': 'You don’t need to try harder,<br />just find a better way.',
    'home.cta.btn': 'Download App',

    // Legacy keys
    'hero.badge': 'Professional Habit Tracker',
    'hero.title.main': 'Build Good Habits',
    'hero.title.highlight': 'by DropDrop',
    'hero.description': 'DropDrop helps you build better habits through visual progress tracking, smart reminders, and achievement systems.',
    'hero.cta.download': 'Download Now',
    'hero.cta.demo': 'View Demo',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Explore science-based habit building',
    'blog.readMore': 'Read More',
    'blog.backToBlog': 'Back to Blog',
    'blog.minuteRead': 'min read',

    // FAQ
    'faq.title': 'FAQ',
    'faq.subtitle': 'Find answers to all your questions',
    'faq.stillQuestions': 'Still Have Questions?',
    'faq.contactSupport': 'Contact Support',

    // About
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.team': 'Meet the Team',

    // Privacy
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Last Updated',

    // Terms
    'terms.title': 'Terms of Service',
    'terms.updated': 'Last Updated',

    // Footer
    'footer.slogan': 'Build good habits, by DropDrop',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact Us',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.download': 'Download',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.blog': 'Blog',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2025 DropDrop. All rights reserved.',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize with default language (will be updated in useEffect)
  const [language, setLanguageState] = useState<Language>('zh');

  // Detect and set language on client side only
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check URL parameter first (highest priority)
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language;

    if (langParam && (langParam === 'zh' || langParam === 'en')) {
      setLanguageState(langParam);
      document.documentElement.lang = langParam === 'zh' ? 'zh-CN' : 'en';
      localStorage.setItem('dropdrop-language', langParam);
      return;
    }

    // Get saved language from localStorage
    const saved = localStorage.getItem('dropdrop-language') as Language;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLanguageState(saved);
      document.documentElement.lang = saved === 'zh' ? 'zh-CN' : 'en';
      return;
    }

    // Detect browser language (lowest priority)
    const browserLang = navigator.language.toLowerCase();
    const detectedLang = browserLang.startsWith('zh') ? 'zh' : 'en';
    setLanguageState(detectedLang);
    document.documentElement.lang = detectedLang === 'zh' ? 'zh-CN' : 'en';
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Only access localStorage and document on client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('dropdrop-language', lang);
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

      // Update URL parameter without reload
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.pushState({}, '', url);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}