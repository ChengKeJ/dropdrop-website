import { Link } from "wouter";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-[#E5E5E5]">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
          <img src="/images/logo.png" alt="DropDrop Logo" className="w-8 h-8 rounded-lg" />
          <span className="text-lg font-medium tracking-tight text-[#222222]">DropDrop</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/blog" className="text-sm text-[#666666] hover:text-[#222222] transition-colors">{t('nav.blog')}</Link>
            <Link href="/about" className="text-sm text-[#666666] hover:text-[#222222] transition-colors">{t('nav.about')}</Link>
          </div>
          <LanguageSwitcher />
          <a 
            href="/#download"
            className="px-4 py-2 md:px-5 md:py-2 bg-[#222222] text-white text-[13px] md:text-sm rounded-full hover:bg-[#000000] transition-colors whitespace-nowrap"
          >
            {t('nav.download_app')}
          </a>
        </div>
      </div>
    </nav>
  );
}
