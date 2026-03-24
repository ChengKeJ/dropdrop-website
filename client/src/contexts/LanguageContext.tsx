import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { 
  Language, 
  getLanguageFromPath, 
  getLocalizedPath 
} from '@/lib/i18n';
import { translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  localizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  base?: string;
}

export function LanguageProvider({ children, base = '' }: LanguageProviderProps) {
  // Use centralized logic to determine language
  // 'base' prop from App.tsx corresponds to the router base path (e.g. '/zh' or '')
  const language = getLanguageFromPath(base);

  // Sync language to document
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    localStorage.setItem('dropdrop-language', language);
  }, [language]);

  const setLanguage = (targetLang: Language) => {
    if (targetLang === language) return;

    // Use centralized logic to calculate new path
    // We use window.location.pathname to get the full path including base
    const currentFullPath = window.location.pathname;
    const newPath = getLocalizedPath(currentFullPath, targetLang);

    // Force full navigation to re-mount Router with new base
    window.location.href = newPath;
  };

  const t = (key: string): string => {
    // @ts-ignore - dynamic key access
    return translations[language][key] || key;
  };

  // Helper for components to generate correct links
  const localizedPath = (path: string) => {
    return getLocalizedPath(path, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
