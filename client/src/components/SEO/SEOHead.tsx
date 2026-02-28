import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  keywords?: string[]; // SEO keywords
  noindex?: boolean;
  structuredData?: object | object[];
  preloadImages?: string[];
}

export function SEOHead({
  title = "DropDrop - 养成好习惯，从现在开始",
  description = "DropDrop 是一款专业的习惯追踪应用",
  canonical = "https://dropdrophabit.com",
  ogImage = "https://dropdrophabit.com/images/logo.png",
  ogType = "website",
  article,
  keywords,
  noindex = false,
  structuredData,
  preloadImages = [],
}: SEOHeadProps) {
  const { language } = useLanguage();

  const lang = language === "zh" ? "zh-CN" : "en";

  // Assume 'canonical' prop is the base URL (Default EN version), e.g., "https://dropdrophabit.com/about"
  // Remove trailing slash for consistency
  const baseUrl =
    canonical.endsWith("/") && canonical.length > 1
      ? canonical.slice(0, -1)
      : canonical;

  // Construct language-specific URLs
  // EN is default (root), ZH is prefixed
  const origin = "https://dropdrophabit.com";
  const path = baseUrl.replace(origin, "");

  const enUrl = baseUrl; // Default English URL
  const zhUrl = `${origin}/zh${path === "/" ? "" : path}`; // Prefixed Chinese URL

  const currentCanonical = language === "zh" ? zhUrl : enUrl;

  // Prepare structured data as array
  const structuredDataArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={currentCanonical} />

      {/* Hreflang Tags for Multilingual SEO */}
      <link rel="alternate" hrefLang="zh" href={zhUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={zhUrl} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="DropDrop Blog RSS Feed"
        href="/feed.xml"
      />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang} />
      <meta property="og:site_name" content="DropDrop" />

      {/* Article-specific OG tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta
              property="article:published_time"
              content={article.publishedTime}
            />
          )}
          {article.modifiedTime && (
            <meta
              property="article:modified_time"
              content={article.modifiedTime}
            />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Preload Critical Images */}
      {preloadImages.map((src, index) => (
        <link key={index} rel="preload" as="image" href={src} />
      ))}

      {/* Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
