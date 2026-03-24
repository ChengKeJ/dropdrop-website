const SITE_URL = 'https://www.dropdrophabit.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DropDrop',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: '专业的习惯追踪应用，帮助你养成更好的习惯',
  sameAs: [
    'https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['Chinese', 'English']
  }
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DropDrop',
  url: SITE_URL,
  description: 'A bilingual habit tracking website focused on gentle, HRV-aware behavior change.',
  inLanguage: ['zh-CN', 'en-US']
};

export const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DropDrop',
  description: 'A habit tracking app focused on gentle, HRV-aware behavior change.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  url: SITE_URL,
  image: `${SITE_URL}/images/logo.png`,
  screenshot: [
    `${SITE_URL}/images/minPlan.png`,
    `${SITE_URL}/images/habit.png`,
    `${SITE_URL}/images/today.png`,
    `${SITE_URL}/images/statics.png`
  ]
};

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
}: {
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage';
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  description,
  url,
  inLanguage: ['zh-CN', 'en-US'],
  isPartOf: {
    '@type': 'WebSite',
    name: 'DropDrop',
    url: SITE_URL
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
  articleSection
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
  author: {
    '@type': 'Person',
    name: author
  },
  publisher: {
    '@type': 'Organization',
    name: 'DropDrop',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.png`
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
