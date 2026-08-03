import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, MapPin, QrCode, AlertCircle, Store, CheckCircle2, RefreshCw, Sparkles, Delete, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { Language, VoucherCategory } from '../types';
import { MOCK_MERCHANTS, TRANSLATIONS } from '../data/mockData';

interface VoucherSelectViewProps {
  category: VoucherCategory;
  balance: number;
  language: Language;
  onBack: () => void;
  onOpenWhereToUse: () => void;
  onConfirmRedemption: (merchantName: string, amount: number) => void;
}

export const VoucherSelectView: React.FC<VoucherSelectViewProps> = ({
  category,
  balance,
  language,
  onBack,
  onOpenWhereToUse,
  onConfirmRedemption,
}) => {
  const t = TRANSLATIONS[language];
  const [amountInput, setAmountInput] = useState<string>('');
  const [showQrCard, setShowQrCard] = useState<boolean>(false);
  const [generatedAmount, setGeneratedAmount] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isRedeemed, setIsRedeemed] = useState<boolean>(false);
  const [showKeypad, setShowKeypad] = useState<boolean>(true); // Open by default or on input focus
  const keypadRef = useRef<HTMLDivElement>(null);

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
    (m) => m.acceptedVoucherType === 'all' || m.acceptedVoucherType === category
  );

  useEffect(() => {
    if (suitableMerchants.length > 0 && !selectedMerchantId) {
      setSelectedMerchantId(suitableMerchants[0].id);
    }
  }, [suitableMerchants, selectedMerchantId]);

  const activeMerchant = suitableMerchants.find((m) => m.id === selectedMerchantId) || suitableMerchants[0];

  const isSupermarket = category === 'supermarket';
  const headerTitle = isSupermarket ? t.supermarketCardTitle : t.sg60CardTitle;

  // Validation logic
  const numAmount = parseFloat(amountInput);
  const isEmpty = amountInput.trim() === '';
  const isNaNValue = Number.isNaN(numAmount);
  const isTooLow = !isEmpty && !isNaNValue && numAmount <= 0;
  const isTooHigh = !isEmpty && !isNaNValue && numAmount > balance;
  const isValidAmount = !isEmpty && !isNaNValue && numAmount > 0 && numAmount <= balance;

  let errorMessage = '';
  if (isTooHigh) {
    errorMessage = `Amount exceeds available balance ($${balance})`;
  } else if (isTooLow) {
    errorMessage = 'Amount must be greater than $0';
  }

  const handleKeypadPress = (key: string) => {
    setShowQrCard(false);
    setIsRedeemed(false);

    if (key === 'backspace') {
      setAmountInput((prev) => prev.slice(0, -1));
      return;
    }

    if (key === '.') {
      if (amountInput.includes('.')) return; // Prevent multiple decimal points
      if (amountInput === '') {
        setAmountInput('0.');
        return;
      }
      setAmountInput((prev) => prev + '.');
      return;
    }

    // Digit key logic (0-9)
    if (amountInput.includes('.')) {
      const parts = amountInput.split('.');
      if (parts[1] && parts[1].length >= 2) {
        // Limit to 2 decimal places
        return;
      }
    }

    if (amountInput === '0') {
      if (key === '0') return;
      setAmountInput(key);
      return;
    }

    setAmountInput((prev) => prev + key);
  };

  const handleGenerateQr = () => {
    if (isValidAmount) {
      setGeneratedAmount(numAmount);
      setShowQrCard(true);
      setIsRedeemed(false);
      setShowKeypad(false); // Dismiss keypad on QR generation so full QR card is clearly visible
    }
  };

  const handleSimulateScan = () => {
    if (!generatedAmount) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsRedeemed(true);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onConfirmRedemption(activeMerchant ? activeMerchant.name : 'Participating Merchant', generatedAmount);
    }, 1200);
  };

  const qrPayload = `https://redeem.gov.sg/v1/scan?category=${category}&amount=${generatedAmount}&t=${Date.now()}`;

  return (
    <div className={`bg-gray-50 min-h-screen text-gray-900 select-none ${showKeypad ? 'pb-96' : 'pb-28'}`}>
      {/* Header Section with Wave Pattern Background */}
      <header
        className={`${
          isSupermarket ? 'header-pattern-supermarket' : 'header-pattern'
        } pt-6 pb-10 px-6 text-white relative overflow-hidden max-w-md mx-auto shadow-md`}
      >
        <div className="relative z-10">
          {/* Back Navigation Button */}
          <button
            onClick={onBack}
            className="flex items-center text-white font-semibold mb-5 text-base hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>{t.back}</span>
          </button>

          {/* Screen Title */}
          <h1 className="text-3xl font-extrabold tracking-tight mb-5">{headerTitle}</h1>

          {/* Where To Use Pill Button */}
          <button
            onClick={onOpenWhereToUse}
            className="flex items-center bg-[#004d40] hover:bg-[#00362d] text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 mr-2 text-teal-200" />
            <span>{t.whereToUse}</span>
          </button>
        </div>

        {/* Abstract Circle Shape Decoration */}
        <div className="absolute right-[-10%] top-[10%] opacity-20 pointer-events-none">
          <svg fill="white" height="260" viewBox="0 0 200 300" width="180">
            <path d="M180 50 Q160 0 100 0 T20 50 Q0 100 50 150 T100 250 Q150 300 200 250 T180 50" />
          </svg>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative -mt-4 bg-white rounded-t-3xl min-h-[70vh] px-5 pt-7 pb-10 max-w-md mx-auto shadow-xl">
        {/* Balance Display */}
        <div className="mb-6 flex items-baseline justify-between bg-teal-50/40 p-4 rounded-2xl border border-teal-100/60">
          <span className="text-gray-600 text-sm font-semibold">{t.balance}</span>
          <div className="flex items-baseline">
            <span className="text-gray-800 text-lg font-bold">$</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight ml-0.5">
              {balance}
            </span>
          </div>
        </div>

        {/* Amount Entry Input Form */}
        <div className="space-y-3 mb-6">
          <label htmlFor="amount-input" className="block text-sm font-bold text-gray-800">
            Amount to redeem
          </label>

          <div
            onClick={() => setShowKeypad(true)}
            className={`relative flex items-center cursor-pointer bg-gray-50 border rounded-2xl px-4 py-3.5 transition-all ${
              showKeypad ? 'border-gov-navy ring-2 ring-gov-navy/20 bg-white' : 'border-gray-200'
            } ${errorMessage ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/20' : ''}`}
          >
            <span className="text-xl font-extrabold text-gray-600 mr-2 select-none">
              $
            </span>
            <span
              id="amount-input"
              className={`text-xl font-bold flex-1 ${
                amountInput ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {amountInput || 'Enter amount'}
            </span>
            {/* Blinking Cursor when Keypad is active */}
            {showKeypad && (
              <span className="w-0.5 h-6 bg-teal-600 animate-pulse rounded-full"></span>
            )}
          </div>

          {/* Inline Validation Error Message */}
          {errorMessage && (
            <p className="text-xs font-semibold text-red-600 flex items-center space-x-1 animate-fade-in pl-1">
              <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          {/* Generate QR Button */}
          <button
            type="button"
            onClick={handleGenerateQr}
            disabled={!isValidAmount}
            className="w-full bg-gov-navy hover:bg-opacity-95 text-white font-bold py-3.5 px-6 rounded-full shadow-md text-base tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed active:scale-[0.99] mt-3"
          >
            <QrCode className="w-5 h-5 text-teal-300" />
            <span>Generate QR</span>
          </button>
        </div>

        {/* Revealed QR Card on Same Screen */}
        {showQrCard && generatedAmount !== null && !isRedeemed && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 relative border border-gray-100 transition-all duration-300 animate-slide-down">
            {/* Ticket Voucher Header */}
            <div className="flex justify-between items-baseline mb-4 px-1">
              <h2 className="text-2xl font-bold text-gray-800">{t.showToShop}</h2>
              <div className="flex items-start">
                <span className="text-sm font-bold text-gray-800 mt-1 mr-0.5">$</span>
                <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                  {generatedAmount}
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
              <div className="relative w-full aspect-square max-w-[240px] p-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                <QRCodeSVG value={qrPayload} size={200} level="H" />

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
              <div className="w-full mt-4 security-watermark border border-teal-200/60 rounded-xl p-2.5 flex items-center justify-center space-x-2 text-center shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] font-mono font-bold text-teal-900 tracking-wide">
                  {currentTime || 'VALID VOUCHER TIMESTAMP'}
                </span>
              </div>

              {/* Expiry Text */}
              <p className="mt-3 text-xs text-gray-500 font-medium tracking-wide">
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
                type="button"
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
                    <span>Simulate Merchant Scan (${generatedAmount})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Redemption Completed Message State */}
        {isRedeemed && generatedAmount !== null && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 animate-scale-up">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
              <Sparkles className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-extrabold text-gray-900 mb-1">Redemption Successful!</h2>
            <p className="text-xs text-gray-500 mb-5">
              ${generatedAmount} has been deducted from your voucher balance.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsRedeemed(false);
                setShowQrCard(false);
                setAmountInput('');
                setGeneratedAmount(null);
                setShowKeypad(true);
              }}
              className="w-full bg-gov-navy text-white py-3.5 rounded-full font-bold text-sm shadow-md cursor-pointer hover:bg-opacity-95"
            >
              Done
            </button>
          </div>
        )}
      </main>

      {/* Custom On-Screen Numeric Keypad Docked to Bottom */}
      {showKeypad && (
        <div
          ref={keypadRef}
          className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-slate-100/95 backdrop-blur-md border-t border-slate-200 rounded-t-3xl p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] animate-slide-up"
        >
          {/* Keypad Header */}
          <div className="flex items-center justify-between pb-3 px-1 mb-1 border-b border-slate-200/60">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Numeric Keypad
            </span>
            <button
              type="button"
              onClick={() => setShowKeypad(false)}
              className="text-xs font-bold text-gov-navy bg-white hover:bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              Done
            </button>
          </div>

          {/* Keypad Grid (3x4 Layout) */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleKeypadPress(digit)}
                className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:bg-slate-200 text-gov-navy font-bold text-2xl rounded-2xl shadow-xs border border-slate-200/60 flex items-center justify-center transition-all cursor-pointer select-none"
              >
                {digit}
              </button>
            ))}

            {/* Bottom Row: "." (decimal), "0", Backspace */}
            <button
              type="button"
              onClick={() => handleKeypadPress('.')}
              className="h-14 sm:h-16 bg-slate-200/80 hover:bg-slate-300 active:bg-slate-400 text-gov-navy font-extrabold text-2xl rounded-2xl shadow-xs flex items-center justify-center transition-all cursor-pointer select-none"
            >
              .
            </button>

            <button
              type="button"
              onClick={() => handleKeypadPress('0')}
              className="h-14 sm:h-16 bg-white hover:bg-slate-50 active:bg-slate-200 text-gov-navy font-bold text-2xl rounded-2xl shadow-xs border border-slate-200/60 flex items-center justify-center transition-all cursor-pointer select-none"
            >
              0
            </button>

            <button
              type="button"
              onClick={() => handleKeypadPress('backspace')}
              aria-label="Delete"
              className="h-14 sm:h-16 bg-slate-200/80 hover:bg-slate-300 active:bg-slate-400 text-gov-navy font-bold text-xl rounded-2xl shadow-xs flex items-center justify-center transition-all cursor-pointer select-none"
            >
              <Delete className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

