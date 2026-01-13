import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-gray-100 transition-all duration-200"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 ${
                language === 'zh' ? 'bg-[#E8F5E9] text-[#4CAF93]' : 'text-[#666666]'
              }`}
            >
              <span className="text-xl">🇨🇳</span>
              <div className="flex-1">
                <div className="font-medium">中文</div>
                <div className="text-xs opacity-70">简体中文</div>
              </div>
              {language === 'zh' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-[#4CAF93] rounded-full"
                />
              )}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 ${
                language === 'en' ? 'bg-[#E8F5E9] text-[#4CAF93]' : 'text-[#666666]'
              }`}
            >
              <span className="text-xl">🇺🇸</span>
              <div className="flex-1">
                <div className="font-medium">English</div>
                <div className="text-xs opacity-70">English (US)</div>
              </div>
              {language === 'en' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-[#4CAF93] rounded-full"
                />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
