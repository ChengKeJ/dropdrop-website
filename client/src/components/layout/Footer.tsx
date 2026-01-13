import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 bg-white text-center text-[#999999] text-sm font-light">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} DropDrop. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacy" className="hover:text-[#222222] transition-colors">{t('footer.privacy')}</Link>
          <Link href="/terms" className="hover:text-[#222222] transition-colors">{t('footer.terms')}</Link>
          <Link href="/faq" className="hover:text-[#222222] transition-colors">{t('footer.faq')}</Link>
          <a href="mailto:support@dropdrophabit.com" className="hover:text-[#222222] transition-colors">{t('footer.contact')}</a>
        </div>
      </div>
    </footer>
  );
}
