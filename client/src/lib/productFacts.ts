import rawProductFacts from "@/data/product-facts.json";

export type SiteLanguage = "zh" | "en";

interface ProductFacts {
  siteUrl: string;
  appStoreUrl: string;
  operatingSystems: string[];
  deviceAvailability: Record<SiteLanguage, string>;
}

export const productFacts = rawProductFacts as ProductFacts;

export const siteUrl = productFacts.siteUrl;
export const appStoreUrl = productFacts.appStoreUrl;
export const operatingSystemLabel = productFacts.operatingSystems.join(", ");
export const deviceAvailability = productFacts.deviceAvailability;

export const pricingPolicyText: Record<SiteLanguage, string> = {
  zh: "当前的订阅与内购信息以 App Store 页面和应用内购买界面为准。",
  en: "Current subscriptions and in-app purchase options are listed in the App Store and in the in-app purchase screen.",
};

export const languageAvailabilityText: Record<SiteLanguage, string> = {
  zh: "网站内容提供简体中文和英文版本；应用内语言支持请以 App Store 页面为准。",
  en: "The website is available in English and Simplified Chinese; refer to the App Store listing for current in-app language availability.",
};
