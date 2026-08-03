import React from 'react';
import { TRANSLATIONS } from '../data/mockData';
import { Language } from '../types';

interface GovBannerProps {
  language: Language;
  onOpenIdentifyModal: () => void;
}

export const GovBanner: React.FC<GovBannerProps> = ({ language, onOpenIdentifyModal }) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-white px-4 py-2 flex items-center justify-between text-[11px] sm:text-xs border-b border-gray-100 z-30 select-none">
      <div className="flex items-center space-x-2">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2WxJDODiqIUc8ToOdvGBkQ24J9JPEzK9g2YhtWYpXkmYDStEAwioFzkUWUWTjRcZJKF4Kjs_SaJtTgAIZXIvEnKrFdumLOTub-B4Bb0GC3UoebsORfdi3KiYNQ07OJ5bACke-SgEPiO114JDEfVjaC5NEUGBML9Yboc8mXorVsgBP8GrnQjkrHtcziNByw7Wtjrpw2Iqvxkp2wiC4oAWua2Rld55nYHuQj7LgijtOywGLk-Ap_3Sn"
          alt="Singapore Crest"
          className="w-4 h-4 object-contain"
        />
        <span className="text-gray-700 font-medium">{t.govAgency}</span>
      </div>
      <button
        onClick={onOpenIdentifyModal}
        className="text-blue-600 hover:text-blue-800 flex items-center font-medium cursor-pointer transition-colors"
      >
        <span>{t.howToIdentify}</span>
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </header>
  );
};
