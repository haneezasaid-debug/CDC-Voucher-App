import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'ms', label: 'Malay', native: 'Bahasa Melayu' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
];

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="px-6 py-4 flex justify-between items-center select-none relative z-20">
      {/* SG60 Vouchers Badge */}
      <div className="bg-white rounded-lg px-3 py-1.5 sm:py-2 flex items-center space-x-1.5 shadow-sm">
        <div className="flex items-center">
          <span className="bg-red-600 text-white font-extrabold px-1 rounded text-xs tracking-tight">SG</span>
          <span className="text-red-600 font-extrabold text-xs ml-0.5">60</span>
        </div>
        <div className="text-gov-navy font-bold text-base sm:text-lg flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>ouchers</span>
        </div>
      </div>

      {/* Language Selector Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border border-white/30 rounded-md px-3 py-1.5 flex items-center space-x-2 text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
        >
          <Globe className="w-4 h-4 text-white" />
          <span className="text-sm font-medium">{currentLang.label}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50 text-gray-800">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  language === lang.code ? 'font-bold text-gov-navy bg-blue-50/50' : 'text-gray-700'
                }`}
              >
                <div>
                  <div>{lang.label}</div>
                  <div className="text-xs text-gray-400 font-normal">{lang.native}</div>
                </div>
                {language === lang.code && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
