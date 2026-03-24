import { Home } from "lucide-react";
import { PrefetchLink } from "@/components/PrefetchLink";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEO/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans flex flex-col">
      <SEOHead
        title="404 Not Found - DropDrop"
        description={language === 'zh' ? '未找到你请求的页面。' : 'The requested page could not be found.'}
        noindex={true}
      />
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="container max-w-lg mx-auto px-4 text-center">
          <span className="text-[#4CAF93] font-medium tracking-widest text-sm uppercase mb-6 block">404 Error</span>
          <h1 className="text-4xl md:text-5xl font-light mb-8">
            {language === 'zh' ? '迷失在习惯森林' : 'Lost in the habit forest'}
          </h1>
          <p className="text-[#666666] mb-12 font-light leading-relaxed">
            {language === 'zh' ? (
              <>
                抱歉，您寻找的页面似乎已经“休息”了。<br />
                不如回到首页，看看今天的身体状态？
              </>
            ) : (
              <>
                The page you requested is not available right now.<br />
                Head back home and continue building habits with less friction.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrefetchLink href="/" className="btn-primary flex items-center justify-center gap-2">
              <Home size={18} />
              {language === 'zh' ? '回到首页' : 'Back to home'}
            </PrefetchLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
