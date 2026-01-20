
import React from 'react';
import { LanguageCode } from '../types';

interface NavbarProps {
  currentLang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLangChange }) => {
  const navigation = [
    { name: currentLang === 'en' ? 'Solutions' : 'ဝန်ဆောင်မှုများ', href: '#solutions' },
    { name: currentLang === 'en' ? 'Contact' : 'ဆက်သွယ်ရန်', href: '#contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-black uppercase">
              SupaSolutions
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-2 ml-4 border-l border-gray-200 pl-4">
              <button
                onClick={() => onLangChange('en')}
                className={`text-[10px] font-bold tracking-widest transition-all ${
                  currentLang === 'en' ? 'text-black underline underline-offset-4' : 'text-gray-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLangChange('my')}
                className={`text-[10px] font-bold tracking-widest transition-all ${
                  currentLang === 'my' ? 'text-black underline underline-offset-4' : 'text-gray-400'
                }`}
              >
                MY
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
