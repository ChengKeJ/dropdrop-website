import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  structuredData?: object | object[];
}

export function SEOHead({
  title = 'DropDrop - 养成好习惯，从现在开始',
  description = 'DropDrop 是一款专业的习惯追踪应用',
  canonical = 'https://dropdrophabit.com',
  ogImage = 'https://dropdrophabit.com/images/og-dropdrop.png',
  ogType = 'website',
  article,
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  const { language } = useLanguage();

  const lang = language === 'zh' ? 'zh-CN' : 'en';
  const alternateLang = language === 'zh' ? 'en' : 'zh';

  // Prepare structured data as array
  const structuredDataArray = structuredData
    ? (Array.isArray(structuredData) ? structuredData : [structuredData])
    : [];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Hreflang Tags for Multilingual SEO */}
      <link rel="alternate" hrefLang="zh" href={`${canonical}${canonical.includes('?') ? '&' : '?'}lang=zh`} />
      <link rel="alternate" hrefLang="en" href={`${canonical}${canonical.includes('?') ? '&' : '?'}lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang} />
      <meta property="og:site_name" content="DropDrop" />

      {/* Article-specific OG tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag) => (
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

      {/* Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
