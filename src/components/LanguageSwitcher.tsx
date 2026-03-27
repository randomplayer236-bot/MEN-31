import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: 'FR' },
    { code: 'ar', name: 'AR' },
    { code: 'en', name: 'EN' },
  ];

  return (
    <div className="flex space-x-3 rtl:space-x-reverse">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            i18n.changeLanguage(lang.code);
            document.documentElement.dir = lang.code === 'ar' ? 'rtl' : 'ltr';
          }}
          className={`text-sm font-bold px-3 py-1.5 border transition-colors ${
            i18n.language === lang.code 
              ? 'bg-gold border-gold text-white' 
              : 'border-white/20 text-white/60 hover:border-white'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};
