"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200/80 shadow-inner backdrop-blur-sm">
      <button
        onClick={() => handleLocaleChange('uz')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          locale === 'uz' 
            ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-primary' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
        }`}
      >
        <img 
          src="https://flagcdn.com/w20/uz.png" 
          srcSet="https://flagcdn.com/w40/uz.png 2x" 
          width="16" 
          alt="Uzbekistan" 
          className="rounded-[2px]" 
        />
        <span>O'z</span>
      </button>
      <button
        onClick={() => handleLocaleChange('ru')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          locale === 'ru' 
            ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-primary' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
        }`}
      >
        <img 
          src="https://flagcdn.com/w20/ru.png" 
          srcSet="https://flagcdn.com/w40/ru.png 2x" 
          width="16" 
          alt="Russia" 
          className="rounded-[2px]" 
        />
        <span>Ру</span>
      </button>
    </div>
  );
}
