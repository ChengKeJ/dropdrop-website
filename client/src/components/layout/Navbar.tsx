import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { PrefetchLink } from "../PrefetchLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { appStoreUrl } from "@/lib/productFacts";

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7FAFE]/78 backdrop-blur-xl border-b border-[#E1EAF4]/80">
      <div className="container h-16 flex items-center justify-between">
        <PrefetchLink
          href="/"
          className="flex items-center gap-3 hover:opacity-100 transition-opacity z-50"
        >
          <img
            src="/images/logo.webp"
            alt="DropDrop Logo"
            className="w-8 h-8 rounded-lg"
            width="32"
            height="32"
          />
          <span className="text-lg font-medium tracking-tight text-[#172033]">
            DropDrop
          </span>
        </PrefetchLink>

        {/* Desktop Menu */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <PrefetchLink
              href="/blog"
              className="text-sm text-[#64748B] hover:text-[#172033] transition-colors"
            >
              {t("nav.blog")}
            </PrefetchLink>
            <PrefetchLink
              href="/about"
              className="text-sm text-[#64748B] hover:text-[#172033] transition-colors"
            >
              {t("nav.about")}
            </PrefetchLink>
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-4 py-2 md:px-5 md:py-2 bg-[#172033] text-white text-[13px] md:text-sm rounded-full hover:bg-[#243044] transition-colors whitespace-nowrap shadow-[0_12px_26px_-20px_rgba(23,32,51,0.7)]"
          >
            {t("nav.download_app")}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-[#172033] z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            className="fixed inset-0 top-0 pt-24 bg-[#F7FAFE] z-40 md:hidden overflow-hidden flex flex-col px-6"
          >
            <div className="flex flex-col gap-6 text-lg font-medium text-[#172033]">
              <PrefetchLink
                href="/blog"
                className="py-2 border-b border-[#E1EAF4]"
              >
                {t("nav.blog")}
              </PrefetchLink>
              <PrefetchLink
                href="/about"
                className="py-2 border-b border-[#E1EAF4]"
              >
                {t("nav.about")}
              </PrefetchLink>
              <div className="py-2 flex justify-between items-center border-b border-[#E1EAF4]">
                <span>Language</span>
                <LanguageSwitcher />
              </div>
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 btn-primary w-full text-center py-4 rounded-full"
              >
                {t("nav.download_app")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
