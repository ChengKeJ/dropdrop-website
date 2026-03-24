import {
  deviceAvailability,
  languageAvailabilityText,
  pricingPolicyText,
} from "@/lib/productFacts";

export interface FAQItem {
  question: {
    zh: string;
    en: string;
  };
  answer: {
    zh: string;
    en: string;
  };
  category: string;
}

export const faqData: FAQItem[] = [
  {
    question: {
      zh: 'DropDrop 是否免费使用？',
      en: 'Is DropDrop free to use?'
    },
    answer: {
      zh: `DropDrop 提供免费体验。${pricingPolicyText.zh}`,
      en: `DropDrop includes a free experience. ${pricingPolicyText.en}`
    },
    category: 'Pricing'
  },
  {
    question: {
      zh: '我可以在多个设备上使用 DropDrop 吗？',
      en: 'Can I use DropDrop on multiple devices?'
    },
    answer: {
      zh: `DropDrop 当前通过 App Store 提供，适用于 ${deviceAvailability.zh}。与账号、备份或同步相关的最新可用性，请以 App Store 页面和应用内说明为准。`,
      en: `DropDrop is currently distributed through the App Store for ${deviceAvailability.en}. For the latest details about account, backup, or sync availability, refer to the current App Store listing and in-app settings.`
    },
    category: 'Features'
  },
  {
    question: {
      zh: '如何设置习惯提醒？',
      en: 'How do I set up habit reminders?'
    },
    answer: {
      zh: '在创建或编辑习惯时，点击"提醒"选项，选择你希望收到提醒的时间。你可以为每个习惯设置多个提醒时间。',
      en: 'When creating or editing a habit, tap the "Reminders" option and select when you want to be reminded. You can set multiple reminder times for each habit.'
    },
    category: 'Usage'
  },
  {
    question: {
      zh: '我的数据安全吗？',
      en: 'Is my data secure?'
    },
    answer: {
      zh: 'DropDrop 非常重视数据安全。健康访问和账号行为遵循你在 Apple 设备上授予的权限，我们不会把你的个人数据出售给第三方。',
      en: 'DropDrop takes data security seriously. Health access and account behavior follow the permissions you grant on your Apple devices, and we do not sell your personal data to third parties.'
    },
    category: 'Privacy'
  },
  {
    question: {
      zh: '我可以追踪多少个习惯？',
      en: 'How many habits can I track?'
    },
    answer: {
      zh: '免费版可以追踪最多 3 个习惯。升级到 Pro 会员后，你可以创建和追踪无限数量的习惯。',
      en: 'The free version allows tracking up to 3 habits. With Pro membership, you can create and track unlimited habits.'
    },
    category: 'Features'
  },
  {
    question: {
      zh: '如果我错过一天打卡会怎样？',
      en: 'What happens if I miss a day?'
    },
    answer: {
      zh: '偶尔错过一天不会影响你的整体进度！DropDrop 会记录你的完成率和统计数据。我们的理念是鼓励持续进步，而不是追求完美。',
      en: 'Missing a day occasionally won\'t impact your overall progress! DropDrop tracks your completion rate and statistics. Our philosophy is to encourage consistent progress, not perfection.'
    },
    category: 'Usage'
  },
  {
    question: {
      zh: '我可以导出我的习惯数据吗？',
      en: 'Can I export my habit data?'
    },
    answer: {
      zh: '是的，Pro 会员可以将习惯数据导出为 CSV 或 PDF 格式，方便备份或分析。',
      en: 'Yes, Pro members can export habit data in CSV or PDF format for backup or analysis.'
    },
    category: 'Features'
  },
  {
    question: {
      zh: 'DropDrop 支持哪些语言？',
      en: 'What languages does DropDrop support?'
    },
    answer: {
      zh: languageAvailabilityText.zh,
      en: languageAvailabilityText.en
    },
    category: 'General'
  },
  {
    question: {
      zh: '如何取消 Pro 会员订阅？',
      en: 'How do I cancel my Pro subscription?'
    },
    answer: {
      zh: '你可以随时在 App Store 的订阅设置中取消。取消后，已购买的权益通常会持续到当前计费周期结束。',
      en: 'You can cancel anytime in the App Store subscription settings. After cancellation, paid features typically remain available until the end of the current billing period.'
    },
    category: 'Pricing'
  },
  {
    question: {
      zh: '我可以获得退款吗？',
      en: 'Can I get a refund?'
    },
    answer: {
      zh: '退款通常由 Apple 按 App Store 购买政策处理。如需帮助，请联系 Apple Support 并查看当前 App Store 退款说明。',
      en: 'Refunds are typically handled by Apple under App Store purchase policies. If you need help, contact Apple Support and review the current App Store refund guidance.'
    },
    category: 'Pricing'
  }
];

export function getFAQsByCategory(language: 'zh' | 'en'): Record<string, FAQItem[]> {
  const categorized: Record<string, FAQItem[]> = {};

  faqData.forEach(faq => {
    if (!categorized[faq.category]) {
      categorized[faq.category] = [];
    }
    categorized[faq.category].push(faq);
  });

  return categorized;
}
