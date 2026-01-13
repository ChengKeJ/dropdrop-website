export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DropDrop',
  url: 'https://dropdrophabit.com',
  logo: 'https://dropdrophabit.com/images/logo.png',
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
  url: 'https://dropdrophabit.com',
  description: '专业的习惯追踪应用',
  inLanguage: ['zh-CN', 'en-US'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://dropdrophabit.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export const mobileAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'DropDrop',
  description: '专业的习惯追踪应用，帮助你养成更好的习惯',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1'
  },
  screenshot: [
    'https://dropdrophabit.com/images/minPlan.png',
    'https://dropdrophabit.com/images/habit.png',
    'https://dropdrophabit.com/images/today.png',
    'https://dropdrophabit.com/images/statics.png'
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
  url
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description: description,
  image: image,
  datePublished: datePublished,
  dateModified: dateModified,
  author: {
    '@type': 'Person',
    name: author
  },
  publisher: {
    '@type': 'Organization',
    name: 'DropDrop',
    logo: {
      '@type': 'ImageObject',
      url: 'https://dropdrophabit.com/images/logo.png'
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
