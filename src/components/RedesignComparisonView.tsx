import React, { useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  QrCode,
  Check,
  AlertCircle,
  Delete,
  ArrowRight,
  Sparkles,
  Smartphone,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface RedesignComparisonViewProps {
  onBackToApp?: () => void;
}

export const RedesignComparisonView: React.FC<RedesignComparisonViewProps> = ({ onBackToApp }) => {
  // State for interactive Revamped mockup
  const [revampedAmount, setRevampedAmount] = useState<string>('15');
  const [showRevampedQr, setShowRevampedQr] = useState<boolean>(true);
  const [showKeypad, setShowKeypad] = useState<boolean>(true);

  // State for interactive Original mockup
  const [originalSelectedCount, setOriginalSelectedCount] = useState<number>(2); // $4 total
  const [originalStep, setOriginalStep] = useState<'grid' | 'qr'>('grid');

  const balance = 317;
  const numRevamped = parseFloat(revampedAmount);
  const isValidRevamped = !isNaN(numRevamped) && numRevamped > 0 && numRevamped <= balance;

  let errorMsg = '';
  if (numRevamped > balance) {
    errorMsg = `Amount exceeds available balance ($${balance})`;
  } else if (numRevamped <= 0 && revampedAmount !== '') {
    errorMsg = 'Amount must be greater than $0';
  }

  const handleKeypress = (key: string) => {
    setShowRevampedQr(false);
    if (key === 'backspace') {
      setRevampedAmount((prev) => prev.slice(0, -1));
    } else if (key === '.') {
      if (!revampedAmount.includes('.')) {
        setRevampedAmount((prev) => (prev === '' ? '0.' : prev + '.'));
      }
    } else {
      if (revampedAmount.includes('.')) {
        const parts = revampedAmount.split('.');
        if (parts[1] && parts[1].length >= 2) return;
      }
      if (revampedAmount === '0') {
        setRevampedAmount(key);
      } else {
        setRevampedAmount((prev) => prev + key);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-16">
      {/* Top Header Bar */}
      <header className="bg-gov-navy text-white py-6 px-4 sm:px-8 border-b border-teal-800 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>UX & Interactive Spec Comparison</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SG60 Vouchers: Redemption Redesign
            </h1>
          </div>

          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="self-start md:self-auto bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Full App</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Two-Column Side-by-Side Screen Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ================= LEFT COLUMN: ORIGINAL ================= */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Column Label */}
            <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <h2 className="text-lg font-bold tracking-wide">Original Flow</h2>
              </div>
              <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full font-mono">
                Fixed $2 Vouchers + 2 Screens
              </span>
            </div>

            {/* Screen Mockup Container */}
            <div className="p-4 sm:p-6 bg-slate-100 flex flex-col items-center">
              {/* Phone Frame */}
              <div className="w-full max-w-[380px] bg-white rounded-[32px] shadow-2xl border-4 border-slate-300 overflow-hidden relative min-h-[640px] flex flex-col">
                {/* Phone Notch */}
                <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-1"></div>

                {originalStep === 'grid' ? (
                  /* Original Screen 1: Voucher Grid */
                  <div className="flex-1 bg-gray-50 flex flex-col">
                    <div className="header-pattern pt-4 pb-8 px-5 text-white relative">
                      <div className="flex items-center text-xs font-semibold mb-2 text-teal-100">
                        <ChevronLeft className="w-4 h-4 mr-0.5" />
                        Back
                      </div>
                      <h3 className="text-2xl font-extrabold mb-3">SG60 Vouchers</h3>
                      <div className="inline-flex items-center bg-[#004d40] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-teal-200" />
                        Where to use?
                      </div>
                    </div>

                    <div className="flex-1 bg-white -mt-3 rounded-t-2xl p-4 flex flex-col">
                      <div className="flex justify-between items-baseline mb-4 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                        <span className="text-xs font-semibold text-gray-600">Balance</span>
                        <span className="text-2xl font-extrabold text-gray-900">$317</span>
                      </div>

                      <p className="text-xs font-bold text-gray-700 mb-2">Select $2 vouchers to spend:</p>

                      {/* Grid of $2 Vouchers */}
                      <div className="grid grid-cols-3 gap-2 mb-4 overflow-y-auto max-h-[220px] p-1">
                        {[1, 2, 3, 4, 5, 6].map((idx) => {
                          const isSelected = idx <= originalSelectedCount;
                          return (
                            <button
                              key={idx}
                              onClick={() => setOriginalSelectedCount(idx)}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                                isSelected
                                  ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="text-xs font-bold text-gray-800">$2</div>
                              <div className="text-[10px] text-gray-400">Voucher</div>
                              {isSelected && (
                                <div className="absolute top-1 right-1 bg-teal-600 text-white rounded-full p-0.5">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-auto pt-2 border-t border-gray-100">
                        <div className="flex justify-between text-xs font-bold text-gray-800 mb-2">
                          <span>Selected Amount:</span>
                          <span className="text-teal-700 text-sm">${originalSelectedCount * 2}</span>
                        </div>
                        <button
                          onClick={() => setOriginalStep('qr')}
                          className="w-full bg-gov-navy text-white font-bold py-3 rounded-full text-xs shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <QrCode className="w-4 h-4 text-teal-300" />
                          <span>Show QR Code (${originalSelectedCount * 2})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Original Screen 2: Separate QR Page */
                  <div className="flex-1 bg-gray-50 flex flex-col p-4 animate-fade-in">
                    <button
                      onClick={() => setOriginalStep('grid')}
                      className="flex items-center text-xs font-bold text-gov-navy mb-3 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back to Vouchers
                    </button>

                    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 text-center">
                      <div className="flex justify-between items-baseline mb-3">
                        <span className="text-sm font-bold text-gray-800">Show to shop</span>
                        <span className="text-2xl font-extrabold text-gray-900">${originalSelectedCount * 2}</span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 my-3"></div>
                      <div className="p-3 bg-white border border-gray-200 rounded-xl inline-block mb-3">
                        <QRCodeSVG value="https://redeem.gov.sg/mock-original" size={140} />
                      </div>
                      <p className="text-[11px] text-gray-500">Use by 31 Dec 2026</p>
                    </div>

                    <button
                      onClick={() => setOriginalStep('grid')}
                      className="mt-auto w-full bg-gray-200 text-gray-800 font-bold py-2.5 rounded-full text-xs cursor-pointer"
                    >
                      Done / Close QR
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: REVAMPED ================= */}
          <div className="bg-white rounded-3xl shadow-xl border border-teal-200 overflow-hidden flex flex-col">
            {/* Column Label */}
            <div className="bg-gov-navy text-white px-6 py-4 flex items-center justify-between border-b border-teal-800">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <h2 className="text-lg font-bold tracking-wide">Revamped Flow</h2>
              </div>
              <span className="text-xs bg-teal-800 text-teal-200 px-3 py-1 rounded-full font-mono font-semibold">
                Custom Input + Keypad + 2-Screen Flow
              </span>
            </div>

            {/* Screen Mockup Container */}
            <div className="p-4 sm:p-6 bg-slate-100 flex flex-col items-center">
              {/* Phone Frame */}
              <div className="w-full max-w-[380px] bg-white rounded-[32px] shadow-2xl border-4 border-teal-600/30 overflow-hidden relative min-h-[640px] flex flex-col">
                {/* Phone Notch */}
                <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-1"></div>

                {showRevampedQr && isValidRevamped ? (
                  /* Revamped Screen 2: Dedicated QR Page */
                  <div className="flex-1 bg-gray-50 flex flex-col p-4 animate-fade-in">
                    <button
                      onClick={() => {
                        setShowRevampedQr(false);
                        setShowKeypad(true);
                      }}
                      className="flex items-center text-xs font-bold text-gov-navy mb-3 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      <span>Back to Amount Entry</span>
                    </button>

                    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 text-center">
                      <div className="flex justify-between items-baseline mb-3">
                        <span className="text-sm font-bold text-gray-800">Show to shop</span>
                        <span className="text-3xl font-extrabold text-gray-900">${revampedAmount}</span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 my-3"></div>
                      <div className="p-3 bg-white border border-gray-200 rounded-xl inline-block relative">
                        <QRCodeSVG value={`https://redeem.gov.sg/custom-${revampedAmount}`} size={140} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-white p-1 rounded shadow-sm border border-gray-200 text-[9px] font-extrabold text-red-600">
                            SG60
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-3 font-medium">Use by 31 Dec 2026</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowRevampedQr(false);
                        setShowKeypad(true);
                      }}
                      className="mt-auto w-full bg-gov-navy text-white font-bold py-3 rounded-full text-xs shadow-md cursor-pointer"
                    >
                      Adjust Amount / Done
                    </button>
                  </div>
                ) : (
                  /* Revamped Screen 1: Amount Entry + Keypad */
                  <div className="flex-1 bg-gray-50 flex flex-col overflow-y-auto">
                    <div className="header-pattern pt-4 pb-8 px-5 text-white relative">
                      <div className="flex items-center text-xs font-semibold mb-2 text-teal-100">
                        <ChevronLeft className="w-4 h-4 mr-0.5" />
                        Back
                      </div>
                      <h3 className="text-2xl font-extrabold mb-3">SG60 Vouchers</h3>
                      <div className="inline-flex items-center bg-[#004d40] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-teal-200" />
                        Where to use?
                      </div>
                    </div>

                    <div className="flex-1 bg-white -mt-3 rounded-t-2xl p-4 flex flex-col">
                      {/* Balance */}
                      <div className="flex justify-between items-baseline mb-3 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                        <span className="text-xs font-semibold text-gray-600">Balance</span>
                        <span className="text-2xl font-extrabold text-gray-900">$317</span>
                      </div>

                      {/* Amount Input */}
                      <div className="mb-3">
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          Amount to redeem
                        </label>
                        <div
                          onClick={() => setShowKeypad(true)}
                          className={`flex items-center border rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50 ${
                            showKeypad ? 'border-gov-navy ring-2 ring-gov-navy/20 bg-white' : 'border-gray-200'
                          } ${errorMsg ? 'border-red-500 bg-red-50/20' : ''}`}
                        >
                          <span className="text-lg font-extrabold text-gray-600 mr-1.5">$</span>
                          <span className="text-lg font-bold flex-1 text-gray-900">
                            {revampedAmount || <span className="text-gray-400">Enter amount</span>}
                          </span>
                          {showKeypad && <span className="w-0.5 h-5 bg-teal-600 animate-pulse rounded-full"></span>}
                        </div>

                        {errorMsg && (
                          <p className="text-[11px] font-semibold text-red-600 mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                            <span>{errorMsg}</span>
                          </p>
                        )}
                      </div>

                      {/* Generate QR Button */}
                      <button
                        onClick={() => {
                          if (isValidRevamped) {
                            setShowRevampedQr(true);
                            setShowKeypad(false);
                          }
                        }}
                        disabled={!isValidRevamped}
                        className="w-full bg-gov-navy text-white font-bold py-3 rounded-full text-xs shadow-md flex items-center justify-center space-x-1 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                      >
                        <QrCode className="w-4 h-4 text-teal-300" />
                        <span>Generate QR</span>
                      </button>

                      {/* Embedded Keypad Mockup */}
                      {showKeypad && (
                        <div className="mt-3 bg-slate-100 rounded-2xl p-2.5 border border-slate-200">
                          <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 mb-1.5 px-1">
                            <span>Numeric Keypad</span>
                            <button
                              onClick={() => setShowKeypad(false)}
                              className="text-gov-navy font-bold hover:underline cursor-pointer"
                            >
                              Hide
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
                              <button
                                key={key}
                                onClick={() => handleKeypress(key)}
                                className="h-9 bg-white text-gov-navy font-bold text-sm rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center hover:bg-slate-50 active:bg-slate-200 cursor-pointer"
                              >
                                {key === 'backspace' ? <Delete className="w-4 h-4 text-gray-700" /> : key}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= WHAT CHANGED & WHY LIST SECTION ================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
            <div className="bg-teal-100 text-teal-800 p-2.5 rounded-2xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gov-navy">What Changed &amp; Why</h2>
              <p className="text-xs text-gray-500">Summary of design decisions &amp; user experience improvements</p>
            </div>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="bg-emerald-50 text-emerald-600 rounded-full p-1 mt-0.5 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-tight">
                <strong className="text-gov-navy">Custom Amount Input:</strong> Replaced fixed $2 voucher grid with a custom amount input — lets users redeem the exact amount needed instead of over- or under-redeeming
              </p>
            </li>

            <li className="flex items-start space-x-3">
              <div className="bg-emerald-50 text-emerald-600 rounded-full p-1 mt-0.5 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-tight">
                <strong className="text-gov-navy">Inline Validation:</strong> Added inline validation (amount must be &gt; $0 and ≤ balance) — prevents invalid or excessive redemption
              </p>
            </li>

            <li className="flex items-start space-x-3">
              <div className="bg-emerald-50 text-emerald-600 rounded-full p-1 mt-0.5 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-tight">
                <strong className="text-gov-navy">Numeric Keypad:</strong> Added an on-screen numeric keypad — faster, thumb-friendly entry, consistent with familiar PayNow/SGQR-style patterns
              </p>
            </li>

            <li className="flex items-start space-x-3">
              <div className="bg-emerald-50 text-emerald-600 rounded-full p-1 mt-0.5 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-tight">
                <strong className="text-gov-navy">Dedicated 2-Screen QR Flow:</strong> Moved the QR code to a clean second screen with a top Back button — prevents screen overcrowding with the keypad while making the QR easy to view and present at checkout
              </p>
            </li>

            <li className="flex items-start space-x-3">
              <div className="bg-emerald-50 text-emerald-600 rounded-full p-1 mt-0.5 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-tight">
                <strong className="text-gov-navy">Zero Waste QR:</strong> QR reflects the exact custom amount — eliminates voucher wastage from fixed denomination mismatches
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};
