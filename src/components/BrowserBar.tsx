import React from 'react';
import { ChevronLeft, RotateCw, MoreHorizontal, ShieldCheck } from 'lucide-react';

interface BrowserBarProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export const BrowserBar: React.FC<BrowserBarProps> = ({ onBack, canGoBack = false }) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#f8f8f8]/95 backdrop-blur-md border-t border-gray-200/80 px-4 py-3 flex items-center justify-between z-40 max-w-md mx-auto shadow-lg select-none">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`p-2 rounded-full transition-colors ${
          canGoBack ? 'text-gray-800 hover:bg-gray-200 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Previous screen"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex-1 mx-3 bg-gray-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between border border-gray-300/40">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-4 h-4 rounded bg-gray-400/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3 h-3 text-gray-700" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">redeem.gov.sg</span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1 hover:bg-gray-300/50 rounded-full text-gray-600 transition-colors"
          title="Refresh page"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <button
        onClick={() => {
          alert('redeem.gov.sg - Official Singapore Government Vouchers Portal');
        }}
        className="p-2 text-gray-700 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
        aria-label="Browser options"
      >
        <MoreHorizontal className="w-6 h-6" />
      </button>
    </footer>
  );
};
