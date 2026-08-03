import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2, ShieldAlert, Store, ShoppingCart, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { Language, VoucherCategory, VoucherItem } from '../types';
import { MOCK_MERCHANTS, TRANSLATIONS } from '../data/mockData';

interface VoucherRedeemViewProps {
  category: VoucherCategory;
  selectedVouchers: VoucherItem[];
  language: Language;
  onBack: () => void;
  onConfirmRedemption: (merchantName: string, selectedVouchers: VoucherItem[]) => void;
}

export const VoucherRedeemView: React.FC<VoucherRedeemViewProps> = ({
  category,
  selectedVouchers,
  language,
  onBack,
  onConfirmRedemption,
}) => {
  const t = TRANSLATIONS[language];
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('');
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const totalAmount = selectedVouchers.reduce((acc, v) => acc + v.denomination, 0);

  // Live anti-screenshot clock timestamp
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
          ', ' +
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter merchants compatible with this voucher category
  const suitableMerchants = MOCK_MERCHANTS.filter(
    (m) =>
      m.acceptedVoucherType === 'all' ||
      m.acceptedVoucherType === category
  );

  useEffect(() => {
    if (suitableMerchants.length > 0 && !selectedMerchantId) {
      setSelectedMerchantId(suitableMerchants[0].id);
    }
  }, [suitableMerchants, selectedMerchantId]);

  const activeMerchant = suitableMerchants.find((m) => m.id === selectedMerchantId) || suitableMerchants[0];

  // QR Code Payload encoding unique transaction token
  const qrPayload = `https://redeem.gov.sg/v1/scan?category=${category}&amount=${totalAmount}&vouchers=${selectedVouchers
    .map((v) => v.id)
    .join(',')}&t=${Date.now()}`;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsRedeemed(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onConfirmRedemption(activeMerchant ? activeMerchant.name : 'Participating Merchant', selectedVouchers);
    }, 1200);
  };

  const isSupermarket = category === 'supermarket';

  return (
    <div className="bg-white min-h-screen text-gray-900 select-none pb-28">
      {/* Top Header */}
      <header
        className={`pt-8 pb-20 px-6 text-white relative overflow-hidden max-w-md mx-auto ${
          isSupermarket ? 'bg-[#d98218]' : 'bg-[#27B1BE]'
        }`}
      >
        <div className="relative z-10">
          {/* Back Navigation */}
          <button
            onClick={onBack}
            className="flex items-center font-bold text-lg mb-6 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 mr-1" />
            <span>{t.back}</span>
          </button>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight">
            {isSupermarket ? t.supermarketCardTitle : t.sg60CardTitle}
          </h1>
        </div>

        {/* Background abstract circles */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-15 pointer-events-none overflow-hidden">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle cx="80" cy="40" r="30" fill="white" />
            <circle cx="110" cy="80" r="40" fill="white" />
          </svg>
        </div>
      </header>

      {/* Main Voucher Ticket Container */}
      <main className="px-4 -mt-14 z-10 relative max-w-md mx-auto">
        {!isRedeemed ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 relative border border-gray-100">
            {/* Ticket Voucher Header */}
            <div className="flex justify-between items-baseline mb-5 px-1">
              <h2 className="text-2xl font-bold text-gray-800">{t.showToShop}</h2>
              <div className="flex items-start">
                <span className="text-sm font-bold text-gray-800 mt-1 mr-0.5">$</span>
                <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                  {totalAmount}
                </span>
              </div>
            </div>

            {/* Perforated Dashed Line Divider with Side Ticket Notches */}
            <div className="relative flex items-center mb-6">
              <div className="ticket-notch-left -ml-6"></div>
              <div className="flex-grow border-t-2 border-dashed border-gray-200"></div>
              <div className="ticket-notch-right -mr-6"></div>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[260px] p-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                <QRCodeSVG value={qrPayload} size={220} level="H" />

                {/* Floating Logo Badge in Center of QR */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-1.5 rounded-lg shadow-md flex items-center space-x-1 border border-gray-200">
                    <div className="bg-red-600 text-white text-[9px] font-extrabold px-1 py-0.5 rounded-xs">
                      SG60
                    </div>
                    <span className="text-[10px] font-bold text-gray-900">Vouchers</span>
                  </div>
                </div>
              </div>

              {/* Anti-Screenshot Security Watermark Banner */}
              <div className="w-full mt-5 security-watermark border border-teal-200/60 rounded-xl p-2.5 flex items-center justify-center space-x-2 text-center shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] font-mono font-bold text-teal-900 tracking-wide">
                  {currentTime || 'VALID VOUCHER TIMESTAMP'}
                </span>
              </div>

              {/* Expiry Text */}
              <p className="mt-4 text-xs text-gray-500 font-medium tracking-wide">
                {t.useBy}
              </p>
            </div>

            {/* Merchant Scan Testing Simulator */}
            <div className="mt-6 pt-5 border-t border-gray-100 bg-gray-50/80 -mx-6 -mb-6 p-5 rounded-b-2xl">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center">
                  <Store className="w-3.5 h-3.5 mr-1 text-teal-600" />
                  Select Merchant Store
                </label>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                  Demo Scanner
                </span>
              </div>

              <select
                value={selectedMerchantId}
                onChange={(e) => setSelectedMerchantId(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 font-medium focus:ring-2 focus:ring-teal-500 mb-3"
              >
                {suitableMerchants.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.area})
                  </option>
                ))}
              </select>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Scanning voucher...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Merchant Scan (${totalAmount})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Redemption Success Screen */
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Sparkles className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Redemption Successful!</h2>
            <p className="text-xs text-gray-500 mb-5">
              ${totalAmount} has been deducted from your household voucher balance.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-left space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Merchant</span>
                <span className="font-bold text-gray-900">{activeMerchant?.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Category</span>
                <span className="font-semibold text-gray-800">
                  {isSupermarket ? 'SG60 Supermarket' : 'SG60 Heartland'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Amount Spent</span>
                <span className="font-bold text-emerald-600 text-sm">${totalAmount}</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-gray-200">
                <span className="text-gray-500">Date & Time</span>
                <span className="font-mono text-gray-600 text-[11px]">{currentTime}</span>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full bg-gov-navy hover:bg-opacity-95 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        )}

        {/* Open Government Products Branding Footer */}
        <div className="mt-16 flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center space-x-3 opacity-60">
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              BUILT BY
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 border-[4px] border-blue-600 rounded-full flex items-center justify-center border-l-transparent"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black leading-none text-gray-800">OPEN</span>
                <span className="text-[10px] font-black leading-none text-gray-800">GOVERNMENT</span>
                <span className="text-[10px] font-black leading-none text-gray-800">PRODUCTS</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
