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
      zh: "DropDrop 是否免费使用？",
      en: "Is DropDrop free to use?",
    },
    answer: {
      zh: "DropDrop 提供免费版本，包含基础的习惯追踪功能。Pro 会员（¥9.99/月或¥99/年）提供无限习惯创建、高级数据分析、云端同步等高级功能。",
      en: "DropDrop offers a free version with basic habit tracking features. Pro membership ($9.99/month or $99/year) provides unlimited habit creation, advanced analytics, cloud sync, and more premium features.",
    },
    category: "Pricing",
  },
  {
    question: {
      zh: "我可以在多个设备上使用 DropDrop 吗？",
      en: "Can I use DropDrop on multiple devices?",
    },
    answer: {
      zh: "是的！Pro 会员可以在 iOS 和 Android 设备上同步所有数据。免费版用户的数据仅保存在本地设备。",
      en: "Yes! Pro members can sync all data across iOS and Android devices. Free users' data is stored locally on their device only.",
    },
    category: "Features",
  },
  {
    question: {
      zh: "如何设置习惯提醒？",
      en: "How do I set up habit reminders?",
    },
    answer: {
      zh: '在创建或编辑习惯时，点击"提醒"选项，选择你希望收到提醒的时间。你可以为每个习惯设置多个提醒时间。',
      en: 'When creating or editing a habit, tap the "Reminders" option and select when you want to be reminded. You can set multiple reminder times for each habit.',
    },
    category: "Usage",
  },
  {
    question: {
      zh: "我的数据安全吗？",
      en: "Is my data secure?",
    },
    answer: {
      zh: "DropDrop 非常重视数据安全。所有数据都经过加密存储，Pro 会员的云端数据使用行业标准的加密传输。我们不会与第三方分享你的个人数据。",
      en: "DropDrop takes data security seriously. All data is encrypted at rest, and Pro cloud data uses industry-standard encryption in transit. We never share your personal data with third parties.",
    },
    category: "Privacy",
  },
  {
    question: {
      zh: "我可以追踪多少个习惯？",
      en: "How many habits can I track?",
    },
    answer: {
      zh: "免费版可以追踪最多 3 个习惯。升级到 Pro 会员后，你可以创建和追踪无限数量的习惯。",
      en: "The free version allows tracking up to 3 habits. With Pro membership, you can create and track unlimited habits.",
    },
    category: "Features",
  },
  {
    question: {
      zh: "如果我错过一天打卡会怎样？",
      en: "What happens if I miss a day?",
    },
    answer: {
      zh: "偶尔错过一天不会影响你的整体进度！DropDrop 会记录你的完成率和统计数据。我们的理念是鼓励持续进步，而不是追求完美。",
      en: "Missing a day occasionally won't impact your overall progress! DropDrop tracks your completion rate and statistics. Our philosophy is to encourage consistent progress, not perfection.",
    },
    category: "Usage",
  },
  {
    question: {
      zh: "我可以导出我的习惯数据吗？",
      en: "Can I export my habit data?",
    },
    answer: {
      zh: "是的，Pro 会员可以将习惯数据导出为 CSV 或 PDF 格式，方便备份或分析。",
      en: "Yes, Pro members can export habit data in CSV or PDF format for backup or analysis.",
    },
    category: "Features",
  },
  {
    question: {
      zh: "DropDrop 支持哪些语言？",
      en: "What languages does DropDrop support?",
    },
    answer: {
      zh: "目前 DropDrop 支持简体中文和英语。我们计划在未来添加更多语言支持。",
      en: "Currently DropDrop supports Simplified Chinese and English. We plan to add more languages in the future.",
    },
    category: "General",
  },
  {
    question: {
      zh: "如何取消 Pro 会员订阅？",
      en: "How do I cancel my Pro subscription?",
    },
    answer: {
      zh: "你可以随时在 App Store 或 Google Play 的订阅设置中取消订阅。取消后，你的 Pro 功能将在当前计费周期结束时到期。",
      en: "You can cancel your subscription anytime in the App Store or Google Play subscription settings. After cancellation, your Pro features will remain active until the end of the current billing period.",
    },
    category: "Pricing",
  },
  {
    question: {
      zh: "我可以获得退款吗？",
      en: "Can I get a refund?",
    },
    answer: {
      zh: "退款政策由 App Store 和 Google Play 管理。如果你在订阅后 48 小时内不满意，请联系相应平台的客服申请退款。",
      en: "Refund policies are managed by the App Store and Google Play. If you are unsatisfied within 48 hours of subscribing, please contact the respective platform support to request a refund.",
    },
    category: "Pricing",
  },
];

export function getFAQsByCategory(
  language: "zh" | "en"
): Record<string, FAQItem[]> {
  const categorized: Record<string, FAQItem[]> = {};

  faqData.forEach(faq => {
    if (!categorized[faq.category]) {
      categorized[faq.category] = [];
    }
    categorized[faq.category].push(faq);
  });

  return categorized;
}
