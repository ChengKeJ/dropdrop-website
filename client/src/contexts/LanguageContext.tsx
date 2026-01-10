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

    // Hero Section
    'hero.badge': '专业习惯追踪应用',
    'hero.title.main': '养成好习惯',
    'hero.title.highlight': '从每一滴开始',
    'hero.description': 'DropDrop 帮助你通过可视化进度、智能提醒和成就系统，坚持不懈地养成更好的习惯。',
    'hero.cta.download': '立即下载',
    'hero.cta.demo': '查看演示',
    'hero.stats.users': '活跃用户',
    'hero.stats.checkins': '习惯打卡',
    'hero.stats.rating': '用户评分',

    // Showcase Section
    'showcase.title': '简洁优雅的设计',
    'showcase.subtitle': '精心打磨的界面，让习惯追踪成为一种享受',
    'showcase.screen1.title': '健康计划',
    'showcase.screen1.desc': '定制专属成长路径',
    'showcase.screen2.title': '丰富习惯库',
    'showcase.screen2.desc': '多种习惯任你选择',
    'showcase.screen3.title': '每日打卡',
    'showcase.screen3.desc': '轻松完成每日目标',
    'showcase.screen4.title': '数据统计',
    'showcase.screen4.desc': '可视化进度追踪',
    'showcase.feature1.title': '每日打卡',
    'showcase.feature1.desc': '轻松记录进度',
    'showcase.feature2.title': '数据分析',
    'showcase.feature2.desc': '可视化统计',
    'showcase.feature3.title': '成就系统',
    'showcase.feature3.desc': '解锁奖章',
    'showcase.feature4.title': '智能提醒',
    'showcase.feature4.desc': '不错过任何时刻',

    // Features Section
    'features.title': '强大的功能',
    'features.subtitle': 'DropDrop 提供了一套完整的工具，帮助你更有效地管理和追踪日常习惯',
    'features.tracking.title': '习惯追踪',
    'features.tracking.desc': '直观的圆形进度指示器实时显示你的完成度，每一次打卡都是向目标迈进的一步。',
    'features.tracking.item1': '每日打卡提醒',
    'features.tracking.item2': '连续天数统计',
    'features.tracking.item3': '自定义目标设置',
    'features.analytics.title': '数据分析',
    'features.analytics.desc': '详细的统计图表和热力图帮助你深入了解习惯养成的规律和进度。',
    'features.analytics.item1': '完成率统计',
    'features.analytics.item2': '热力图展示',
    'features.analytics.item3': '趋势分析',
    'features.reminders.title': '智能提醒',
    'features.reminders.desc': '灵活的提醒设置确保你不会错过任何一个重要的习惯养成时刻。',
    'features.reminders.item1': '自定义提醒时间',
    'features.reminders.item2': '多种提醒方式',
    'features.reminders.item3': '智能推送通知',

    // Premium Section
    'premium.title.line1': '升级会员',
    'premium.title.line2': '解锁更多功能',
    'premium.subtitle': 'DropDrop Pro 会员提供无限习惯创建、云端同步、自定义主题等高级功能，帮助你更好地管理生活。',
    'premium.feature1.title': '无限习惯创建',
    'premium.feature1.desc': '创建无限数量的习惯，不受任何限制',
    'premium.feature2.title': '高级数据分析',
    'premium.feature2.desc': '获取更详细的数据分析和趋势预测',
    'premium.feature3.title': '云端同步备份',
    'premium.feature3.desc': '跨设备同步你的所有数据，永不丢失',
    'premium.cta': '了解会员计划',
    'premium.plan.free': '免费版',
    'premium.plan.pro': 'Pro 会员',
    'premium.plan.trial': '14 天免费试用',
    'premium.plan.trial.desc': '立即体验所有功能',
    'premium.plan.annual': '或 ¥99/年，省 17%',

    // Download Section
    'download.title': '立即开始养成好习惯',
    'download.subtitle': 'DropDrop 现已在 iOS 和 Android 上线。下载应用，开始你的习惯养成之旅。',
    'download.appstore': 'App Store',
    'download.googleplay': 'Google Play',
    'download.qr': '扫码下载',

    // Footer
    'footer.slogan': '养成好习惯，从每一滴开始',
    'footer.product': '产品',
    'footer.features': '功能',
    'footer.pricing': '定价',
    'footer.download': '下载',
    'footer.company': '公司',
    'footer.about': '关于我们',
    'footer.blog': '博客',
    'footer.contact': '联系我们',
    'footer.legal': '法律',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.copyright': '© 2025 DropDrop. All rights reserved.',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.showcase': 'Showcase',
    'nav.download': 'Download',

    // Hero Section
    'hero.badge': 'Professional Habit Tracker',
    'hero.title.main': 'Build Good Habits',
    'hero.title.highlight': 'Drop by Drop',
    'hero.description': 'DropDrop helps you build better habits through visual progress tracking, smart reminders, and achievement systems.',
    'hero.cta.download': 'Download Now',
    'hero.cta.demo': 'View Demo',
    'hero.stats.users': 'Active Users',
    'hero.stats.checkins': 'Habit Check-ins',
    'hero.stats.rating': 'User Rating',

    // Showcase Section
    'showcase.title': 'Clean & Elegant Design',
    'showcase.subtitle': 'Carefully crafted interface makes habit tracking a pleasure',
    'showcase.screen1.title': 'Health Plan',
    'showcase.screen1.desc': 'Customize your growth path',
    'showcase.screen2.title': 'Habit Library',
    'showcase.screen2.desc': 'Choose from various habits',
    'showcase.screen3.title': 'Daily Check-in',
    'showcase.screen3.desc': 'Complete daily goals easily',
    'showcase.screen4.title': 'Statistics',
    'showcase.screen4.desc': 'Visual progress tracking',
    'showcase.feature1.title': 'Daily Check-in',
    'showcase.feature1.desc': 'Track progress easily',
    'showcase.feature2.title': 'Data Analytics',
    'showcase.feature2.desc': 'Visual statistics',
    'showcase.feature3.title': 'Achievements',
    'showcase.feature3.desc': 'Unlock badges',
    'showcase.feature4.title': 'Smart Reminders',
    'showcase.feature4.desc': 'Never miss a moment',

    // Features Section
    'features.title': 'Powerful Features',
    'features.subtitle': 'DropDrop provides a complete set of tools to help you manage and track your daily habits effectively',
    'features.tracking.title': 'Habit Tracking',
    'features.tracking.desc': 'Intuitive circular progress indicators show your completion in real-time. Every check-in is a step towards your goal.',
    'features.tracking.item1': 'Daily check-in reminders',
    'features.tracking.item2': 'Streak counting',
    'features.tracking.item3': 'Custom goal settings',
    'features.analytics.title': 'Data Analytics',
    'features.analytics.desc': 'Detailed statistics and heatmaps help you understand your habit-building patterns and progress.',
    'features.analytics.item1': 'Completion rate stats',
    'features.analytics.item2': 'Heatmap visualization',
    'features.analytics.item3': 'Trend analysis',
    'features.reminders.title': 'Smart Reminders',
    'features.reminders.desc': 'Flexible reminder settings ensure you never miss an important moment in your habit-building journey.',
    'features.reminders.item1': 'Custom reminder times',
    'features.reminders.item2': 'Multiple reminder types',
    'features.reminders.item3': 'Smart push notifications',

    // Premium Section
    'premium.title.line1': 'Upgrade to Premium',
    'premium.title.line2': 'Unlock More Features',
    'premium.subtitle': 'DropDrop Pro membership offers unlimited habit creation, cloud sync, custom themes, and more to help you manage your life better.',
    'premium.feature1.title': 'Unlimited Habits',
    'premium.feature1.desc': 'Create unlimited habits without restrictions',
    'premium.feature2.title': 'Advanced Analytics',
    'premium.feature2.desc': 'Get detailed analytics and trend predictions',
    'premium.feature3.title': 'Cloud Backup',
    'premium.feature3.desc': 'Sync all your data across devices, never lose anything',
    'premium.cta': 'Learn About Pro',
    'premium.plan.free': 'Free',
    'premium.plan.pro': 'Pro',
    'premium.plan.trial': '14-Day Free Trial',
    'premium.plan.trial.desc': 'Experience all features now',
    'premium.plan.annual': 'or $99/year, save 17%',

    // Download Section
    'download.title': 'Start Building Better Habits Today',
    'download.subtitle': 'DropDrop is now available on iOS and Android. Download the app and start your habit-building journey.',
    'download.appstore': 'App Store',
    'download.googleplay': 'Google Play',
    'download.qr': 'Scan to Download',

    // Footer
    'footer.slogan': 'Build good habits, drop by drop',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.download': 'Download',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2025 DropDrop. All rights reserved.',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or detect from browser
    const saved = localStorage.getItem('dropdrop-language') as Language;
    if (saved && (saved === 'zh' || saved === 'en')) {
      return saved;
    }

    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dropdrop-language', lang);
    // Update HTML lang attribute for SEO
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Set initial HTML lang attribute
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, []);

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
