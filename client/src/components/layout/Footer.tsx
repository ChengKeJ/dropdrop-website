import { PrefetchLink } from "@/components/PrefetchLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { appStoreUrl } from "@/lib/productFacts";

export function Footer() {
  const { t, language } = useLanguage();
  const methodologyLabel = language === "zh" ? "研究方法论" : "Methodology";
  const editorialLabel = language === "zh" ? "编辑政策" : "Editorial Policy";
  const featuresHref = language === "zh" ? "/zh#features" : "/#features";

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <PrefetchLink href="/" className="flex items-center gap-3 mb-6">
              <img src="/images/logo.webp" alt="DropDrop Logo" className="w-8 h-8 rounded-lg" width="32" height="32" />
              <span className="text-xl font-medium tracking-tight text-[#222222]">DropDrop</span>
            </PrefetchLink>
            <p className="text-[#666666] font-light leading-relaxed max-w-xs mb-8">
              {t('footer.slogan')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[#222222] font-medium mb-6">{t('footer.product')}</h4>
            <ul className="space-y-4 text-[#666666] font-light">
              <li><a href={featuresHref} className="hover:text-[#4CAF93] transition-colors">{t('footer.features')}</a></li>
              <li><PrefetchLink href="/changelog" className="hover:text-[#4CAF93] transition-colors">{t('footer.changelog')}</PrefetchLink></li>
              <li><PrefetchLink href="/faq" className="hover:text-[#4CAF93] transition-colors">{t('footer.faq')}</PrefetchLink></li>
              <li><a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4CAF93] transition-colors">{t('footer.download')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#222222] font-medium mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-[#666666] font-light">
              <li><PrefetchLink href="/about" className="hover:text-[#4CAF93] transition-colors">{t('footer.about')}</PrefetchLink></li>
              <li><PrefetchLink href="/blog" className="hover:text-[#4CAF93] transition-colors">{t('footer.blog')}</PrefetchLink></li>
              <li><PrefetchLink href="/research-methodology" className="hover:text-[#4CAF93] transition-colors">{methodologyLabel}</PrefetchLink></li>
              <li><PrefetchLink href="/editorial-policy" className="hover:text-[#4CAF93] transition-colors">{editorialLabel}</PrefetchLink></li>
              <li><a href="mailto:support@dropdrophabit.com" className="hover:text-[#4CAF93] transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="text-[#222222] font-medium mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-[#666666] font-light">
              <li><PrefetchLink href="/privacy" className="hover:text-[#4CAF93] transition-colors">{t('footer.privacy')}</PrefetchLink></li>
              <li><PrefetchLink href="/terms" className="hover:text-[#4CAF93] transition-colors">{t('footer.terms')}</PrefetchLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#999999] text-sm font-light">
            &copy; {new Date().getFullYear()} DropDrop. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4CAF93]" />
              <span className="text-xs text-[#999999] font-medium uppercase tracking-[0.2em]">Designed with Care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
