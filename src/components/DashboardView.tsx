import React from 'react';
import { Clock, Building2, Share2, HelpCircle, History, ChevronRight, Ticket, ShoppingCart } from 'lucide-react';
import { HouseholdInfo, Language, VoucherCategory } from '../types';
import { TRANSLATIONS } from '../data/mockData';

interface DashboardViewProps {
  household: HouseholdInfo;
  sg60Balance: number;
  supermarketBalance: number;
  language: Language;
  onSelectCategory: (category: VoucherCategory) => void;
  onOpenHistory: () => void;
  onOpenShare: () => void;
  onOpenInfo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  household,
  sg60Balance,
  supermarketBalance,
  language,
  onSelectCategory,
  onOpenHistory,
  onOpenShare,
  onOpenInfo,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-gov-navy h-full flex flex-col justify-between text-white select-none overflow-hidden">
      {/* Hero Header Section */}
      <main className="px-5 pb-4 pt-1 max-w-md mx-auto w-full shrink-0">
        <h1 className="text-white text-2xl font-extrabold tracking-tight mb-0.5">
          {t.titleSG60}
        </h1>
        <p className="text-white/80 text-xs mb-3 leading-snug">
          {t.subtitle}
        </p>

        {/* Details List */}
        <div className="space-y-1.5 mb-3 text-xs">
          <div className="flex items-center space-x-2 text-white/90">
            <Clock className="w-4 h-4 shrink-0" />
            <p className="font-medium">{t.useBy}</p>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <Building2 className="w-4 h-4 shrink-0" />
            <p className="font-medium leading-tight tracking-wide uppercase truncate">
              {household.address}
            </p>
          </div>
        </div>

        {/* Action Buttons (Share & Info) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenShare}
            className="bg-white/20 hover:bg-white/30 active:scale-[0.98] text-white py-2 px-3 rounded-full flex items-center justify-center space-x-1.5 backdrop-blur-sm transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{t.shareVouchers}</span>
          </button>
          <button
            onClick={onOpenInfo}
            className="bg-white/20 hover:bg-white/30 active:scale-[0.98] text-white py-3 px-4 rounded-full flex items-center justify-center space-x-1.5 backdrop-blur-sm transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{t.infoHelp}</span>
          </button>
        </div>
      </main>

      {/* Main White Content Card Section */}
      <section className="bg-white text-gray-900 rounded-t-2xl flex-1 px-5 pt-4 pb-14 shadow-2xl max-w-md mx-auto w-full flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Section Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">
              {t.tapToUse}
            </h2>
            <button
              onClick={onOpenHistory}
              className="text-gov-navy flex items-center text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            >
              <History className="w-3.5 h-3.5 mr-1 text-gov-navy" />
              <span className="underline decoration-1 underline-offset-4">{t.history}</span>
            </button>
          </div>

          {/* Voucher Cards */}
          <div className="space-y-2.5">
            {/* Card 1: SG60 Vouchers */}
            <button
              onClick={() => onSelectCategory('sg60')}
              className="w-full bg-white border border-gray-100/80 rounded-xl p-3 flex items-center shadow-xs hover:shadow-md active:scale-[0.99] transition-all text-left cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#2ea4a8] rounded-lg flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#258d91] transition-colors">
                <Ticket className="w-7 h-7 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-gray-800 font-bold text-base leading-tight">
                  {t.sg60CardTitle}
                </h3>
              </div>
              <div className="flex items-center">
                <div className="text-right">
                  <span className="text-gray-900 text-xs font-bold">$</span>
                  <span className="text-gray-900 text-2xl font-extrabold tracking-tight ml-0.5">
                    {sg60Balance}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Card 2: SG60 Supermarket Vouchers */}
            <button
              onClick={() => onSelectCategory('supermarket')}
              className="w-full bg-white border border-gray-100/80 rounded-xl p-3 flex items-center shadow-xs hover:shadow-md active:scale-[0.99] transition-all text-left cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#eb9f16] rounded-lg flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#d48c0f] transition-colors">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-gray-800 font-bold text-base leading-tight">
                  {t.supermarketCardTitle}
                </h3>
              </div>
              <div className="flex items-center">
                <div className="text-right">
                  <span className="text-gray-900 text-xs font-bold">$</span>
                  <span className="text-gray-900 text-2xl font-extrabold tracking-tight ml-0.5">
                    {supermarketBalance}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Footer Branding */}
        <footer className="mt-4 flex flex-col items-center justify-center opacity-80 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-bold tracking-widest text-[9px] uppercase">
              {t.builtBy}
            </span>
            <div className="flex items-center">
              <svg className="w-7 h-7 text-blue-500" viewBox="0 0 100 100">
                <path
                  d="M30 20 C10 20 10 80 30 80"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                <path
                  d="M70 20 C90 20 90 80 70 80"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="ml-1.5 flex flex-col">
                <span className="text-gray-900 font-extrabold text-[10px] uppercase leading-none tracking-tighter">
                  OPEN
                </span>
                <span className="text-gray-900 font-extrabold text-[10px] uppercase leading-none tracking-tighter">
                  GOVERNMENT
                </span>
                <span className="text-gray-900 font-extrabold text-[10px] uppercase leading-none tracking-tighter">
                  PRODUCTS
                </span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};
