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
    <div className="bg-gov-navy min-h-screen text-white select-none pb-20">
      {/* Hero Header Section */}
      <main className="px-6 pb-8 pt-2 max-w-md mx-auto">
        <h1 className="text-white text-3xl font-extrabold tracking-tight mb-1">
          {t.titleSG60}
        </h1>
        <p className="text-white/80 text-sm mb-6 leading-snug">
          {t.subtitle}
        </p>

        {/* Details List */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start space-x-3 text-white/90">
            <Clock className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{t.useBy}</p>
          </div>
          <div className="flex items-start space-x-3 text-white/90">
            <Building2 className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium leading-tight tracking-wide uppercase">
              {household.address}
            </p>
          </div>
        </div>

        {/* Action Buttons (Share & Info) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenShare}
            className="bg-white/20 hover:bg-white/30 active:scale-[0.98] text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 backdrop-blur-sm transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-semibold">{t.shareVouchers}</span>
          </button>
          <button
            onClick={onOpenInfo}
            className="bg-white/20 hover:bg-white/30 active:scale-[0.98] text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 backdrop-blur-sm transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">{t.infoHelp}</span>
          </button>
        </div>
      </main>

      {/* Main White Content Card Section */}
      <section className="bg-white text-gray-900 rounded-t-[32px] min-h-[60vh] px-6 pt-8 pb-24 shadow-2xl max-w-md mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-500 font-bold uppercase tracking-wider text-xs">
            {t.tapToUse}
          </h2>
          <button
            onClick={onOpenHistory}
            className="text-gov-navy flex items-center text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            <History className="w-4 h-4 mr-1 text-gov-navy" />
            <span className="underline decoration-1 underline-offset-4">{t.history}</span>
          </button>
        </div>

        {/* Voucher Cards */}
        <div className="space-y-4">
          {/* Card 1: SG60 Vouchers */}
          <button
            onClick={() => onSelectCategory('sg60')}
            className="w-full bg-white border border-gray-100/80 rounded-2xl p-4 flex items-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:scale-[0.99] transition-all text-left cursor-pointer group"
          >
            <div className="w-16 h-16 bg-[#2ea4a8] rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#258d91] transition-colors">
              <Ticket className="w-9 h-9 text-white" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-gray-800 font-bold text-lg leading-tight">
                {t.sg60CardTitle}
              </h3>
            </div>
            <div className="flex items-center">
              <div className="text-right">
                <span className="text-gray-900 text-xs font-bold">$</span>
                <span className="text-gray-900 text-3xl font-extrabold tracking-tight ml-0.5">
                  {sg60Balance}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card 2: SG60 Supermarket Vouchers */}
          <button
            onClick={() => onSelectCategory('supermarket')}
            className="w-full bg-white border border-gray-100/80 rounded-2xl p-4 flex items-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:scale-[0.99] transition-all text-left cursor-pointer group"
          >
            <div className="w-16 h-16 bg-[#eb9f16] rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#d48c0f] transition-colors">
              <ShoppingCart className="w-9 h-9 text-white" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-gray-800 font-bold text-lg leading-tight">
                {t.supermarketCardTitle}
              </h3>
            </div>
            <div className="flex items-center">
              <div className="text-right">
                <span className="text-gray-900 text-xs font-bold">$</span>
                <span className="text-gray-900 text-3xl font-extrabold tracking-tight ml-0.5">
                  {supermarketBalance}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Footer Branding */}
        <footer className="mt-16 flex flex-col items-center justify-center pb-8 opacity-80">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400 font-bold tracking-widest text-[10px] uppercase">
              {t.builtBy}
            </span>
            <div className="flex items-center">
              <svg className="w-9 h-9 text-blue-500" viewBox="0 0 100 100">
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
              <div className="ml-2 flex flex-col">
                <span className="text-gray-900 font-extrabold text-xs uppercase leading-none tracking-tighter">
                  OPEN
                </span>
                <span className="text-gray-900 font-extrabold text-xs uppercase leading-none tracking-tighter">
                  GOVERNMENT
                </span>
                <span className="text-gray-900 font-extrabold text-xs uppercase leading-none tracking-tighter">
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
