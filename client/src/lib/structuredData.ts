import { appStoreUrl, operatingSystemLabel, siteUrl, type SiteLanguage } from "@/lib/productFacts";

const schemaCopy: Record<
  SiteLanguage,
  {
    organizationDescription: string;
    websiteDescription: string;
    softwareDescription: string;
  }
> = {
  zh: {
    organizationDescription: "DropDrop 是一款温和的 iOS 习惯追踪应用，会结合 HRV、心情与活动信号帮助用户安排更适合当下状态的节奏。",
    websiteDescription: "DropDrop 官网提供产品信息、FAQ、方法论与中英文习惯养成内容，重点关注温和、状态感知的行为改变。",
    softwareDescription: "DropDrop 是一款温和的 iOS 习惯追踪应用，会结合 HRV、心情与活动信号帮助用户安排更适合今天状态的习惯。",
  },
  en: {
    organizationDescription: "DropDrop is a gentle iOS habit tracker that uses HRV, mood, and activity signals to help people build habits that fit their current state.",
    websiteDescription: "The DropDrop website provides product pages, FAQs, trust pages, and bilingual habit-building content focused on gentle, state-aware behavior change.",
    softwareDescription: "DropDrop is a gentle iOS habit tracker that uses HRV, mood, and activity signals to guide habits that fit today.",
  },
};

export const getOrganizationSchema = (language: SiteLanguage) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DropDrop',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description: schemaCopy[language].organizationDescription,
  sameAs: [appStoreUrl],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Chinese']
  }
});

export const getWebsiteSchema = (language: SiteLanguage) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DropDrop',
  url: siteUrl,
  description: schemaCopy[language].websiteDescription,
  inLanguage: ['en-US', 'zh-CN']
});

export const getSoftwareAppSchema = (language: SiteLanguage) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DropDrop',
  description: schemaCopy[language].softwareDescription,
  applicationCategory: 'HealthApplication',
  operatingSystem: operatingSystemLabel,
  url: siteUrl,
  downloadUrl: appStoreUrl,
  sameAs: [appStoreUrl],
  image: `${siteUrl}/images/logo.png`,
  screenshot: [
    `${siteUrl}/images/minPlan.webp`,
    `${siteUrl}/images/habit.webp`,
    `${siteUrl}/images/today.webp`,
    `${siteUrl}/images/statics.webp`
  ]
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const pageSchema = ({
  type = 'WebPage',
  name,
  description,
  url,
  language = 'en',
}: {
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage';
  name: string;
  description: string;
  url: string;
  language?: SiteLanguage;
}) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  description,
  url,
  inLanguage: language === 'zh' ? 'zh-CN' : 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'DropDrop',
    url: siteUrl
  }
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const blogPostSchema = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  keywords,
  wordCount,
  articleSection,
  language = 'en'
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
  articleSection?: string;
  language?: SiteLanguage;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description: description,
  image: image,
  thumbnailUrl: image,
  datePublished: datePublished,
  dateModified: dateModified,
  ...(wordCount && { wordCount }),
  ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
  ...(articleSection && { articleSection }),
  inLanguage: language === 'zh' ? 'zh-CN' : 'en-US',
  author: {
    '@type': 'Person',
    name: author
  },
  publisher: {
    '@type': 'Organization',
    name: 'DropDrop',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logo.png`
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url
  }
});

export const howToSchema = ({
  name,
  description,
  steps
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string; image?: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    url: step.url,
    image: step.image
  }))
});
