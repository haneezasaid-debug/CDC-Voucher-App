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
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-6">
      {/* Top Header Bar */}
      <header className="bg-gov-navy text-white py-3 px-4 sm:px-6 border-b border-teal-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center space-x-1.5 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UX &amp; Interactive Spec Comparison</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              SG60 Vouchers: Redemption Redesign
            </h1>
          </div>

          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="self-start sm:self-auto bg-teal-600 hover:bg-teal-500 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Launch Full App</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 space-y-4">
        {/* Two-Column Side-by-Side Screen Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* ================= LEFT COLUMN: ORIGINAL ================= */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
            {/* Column Label */}
            <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <h2 className="text-sm font-bold tracking-wide">Original Flow</h2>
              </div>
              <span className="text-[11px] bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
                Fixed $2 Vouchers + 2 Screens
              </span>
            </div>

            {/* Screen Mockup Container */}
            <div className="p-3 bg-slate-100 flex flex-col items-center">
              {/* Phone Frame */}
              <div className="w-full max-w-[290px] bg-white rounded-[24px] shadow-lg border-2 border-slate-300 overflow-hidden relative min-h-[440px] max-h-[460px] flex flex-col">
                {/* Phone Notch */}
                <div className="w-24 h-3 bg-slate-800 rounded-b-lg mx-auto mb-0.5"></div>

                {originalStep === 'grid' ? (
                  /* Original Screen 1: Voucher Grid */
                  <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
                    <div className="header-pattern pt-2.5 pb-5 px-3.5 text-white relative">
                      <div className="flex items-center text-[10px] font-semibold mb-1 text-teal-100">
                        <ChevronLeft className="w-3 h-3 mr-0.5" />
                        Back
                      </div>
                      <h3 className="text-lg font-extrabold mb-1">SG60 Vouchers</h3>
                      <div className="inline-flex items-center bg-[#004d40] text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                        <MapPin className="w-3 h-3 mr-1 text-teal-200" />
                        Where to use?
                      </div>
                    </div>

                    <div className="flex-1 bg-white -mt-2 rounded-t-xl p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-baseline mb-2 bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                        <span className="text-[10px] font-semibold text-gray-600">Balance</span>
                        <span className="text-lg font-extrabold text-gray-900">$317</span>
                      </div>

                      <p className="text-[11px] font-bold text-gray-700 mb-1">Select $2 vouchers:</p>

                      {/* Grid of $2 Vouchers */}
                      <div className="grid grid-cols-3 gap-1.5 mb-2 overflow-y-auto max-h-[140px] p-0.5">
                        {[1, 2, 3, 4, 5, 6].map((idx) => {
                          const isSelected = idx <= originalSelectedCount;
                          return (
                            <button
                              key={idx}
                              onClick={() => setOriginalSelectedCount(idx)}
                              className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer relative ${
                                isSelected
                                  ? 'border-teal-600 bg-teal-50/80 ring-1 ring-teal-500/20'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="text-xs font-bold text-gray-800">$2</div>
                              <div className="text-[9px] text-gray-400">Voucher</div>
                              {isSelected && (
                                <div className="absolute top-0.5 right-0.5 bg-teal-600 text-white rounded-full p-0.5">
                                  <Check className="w-2 h-2" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-auto pt-1.5 border-t border-gray-100">
                        <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1.5">
                          <span>Selected:</span>
                          <span className="text-teal-700 text-xs">${originalSelectedCount * 2}</span>
                        </div>
                        <button
                          onClick={() => setOriginalStep('qr')}
                          className="w-full bg-gov-navy text-white font-bold py-2 rounded-full text-[11px] shadow-xs flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-teal-300" />
                          <span>Show QR Code (${originalSelectedCount * 2})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Original Screen 2: Separate QR Page */
                  <div className="flex-1 bg-gray-50 flex flex-col p-3 animate-fade-in justify-between">
                    <button
                      onClick={() => setOriginalStep('grid')}
                      className="flex items-center text-[11px] font-bold text-gov-navy mb-2 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
                      Back to Vouchers
                    </button>

                    <div className="bg-white rounded-xl shadow-xs p-3.5 border border-gray-200 text-center">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-xs font-bold text-gray-800">Show to shop</span>
                        <span className="text-xl font-extrabold text-gray-900">${originalSelectedCount * 2}</span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 my-2"></div>
                      <div className="p-2 bg-white border border-gray-200 rounded-lg inline-block mb-1">
                        <QRCodeSVG value="https://redeem.gov.sg/mock-original" size={100} />
                      </div>
                      <p className="text-[10px] text-gray-500">Use by 31 Dec 2026</p>
                    </div>

                    <button
                      onClick={() => setOriginalStep('grid')}
                      className="mt-auto w-full bg-gray-200 text-gray-800 font-bold py-2 rounded-full text-[11px] cursor-pointer"
                    >
                      Done / Close QR
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: REVAMPED ================= */}
          <div className="bg-white rounded-2xl shadow-md border border-teal-200 overflow-hidden flex flex-col">
            {/* Column Label */}
            <div className="bg-gov-navy text-white px-4 py-2.5 flex items-center justify-between border-b border-teal-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h2 className="text-sm font-bold tracking-wide">Revamped Flow</h2>
              </div>
              <span className="text-[11px] bg-teal-800 text-teal-200 px-2.5 py-0.5 rounded-full font-mono font-semibold">
                Custom Input + Keypad + 2-Screen Flow
              </span>
            </div>

            {/* Screen Mockup Container */}
            <div className="p-3 bg-slate-100 flex flex-col items-center">
              {/* Phone Frame */}
              <div className="w-full max-w-[290px] bg-white rounded-[24px] shadow-lg border-2 border-teal-600/30 overflow-hidden relative min-h-[440px] max-h-[460px] flex flex-col">
                {/* Phone Notch */}
                <div className="w-24 h-3 bg-slate-800 rounded-b-lg mx-auto mb-0.5"></div>

                {showRevampedQr && isValidRevamped ? (
                  /* Revamped Screen 2: Dedicated QR Page */
                  <div className="flex-1 bg-gray-50 flex flex-col p-3 animate-fade-in justify-between">
                    <button
                      onClick={() => {
                        setShowRevampedQr(false);
                        setShowKeypad(true);
                      }}
                      className="flex items-center text-[11px] font-bold text-gov-navy mb-2 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
                      <span>Back to Amount Entry</span>
                    </button>

                    <div className="bg-white rounded-xl shadow-xs p-3.5 border border-gray-200 text-center">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-xs font-bold text-gray-800">Show to shop</span>
                        <span className="text-2xl font-extrabold text-gray-900">${revampedAmount}</span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 my-2"></div>
                      <div className="p-2 bg-white border border-gray-200 rounded-lg inline-block relative">
                        <QRCodeSVG value={`https://redeem.gov.sg/custom-${revampedAmount}`} size={100} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-white p-0.5 rounded shadow-2xs border border-gray-200 text-[8px] font-extrabold text-red-600">
                            SG60
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2 font-medium">Use by 31 Dec 2026</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowRevampedQr(false);
                        setShowKeypad(true);
                      }}
                      className="mt-auto w-full bg-gov-navy text-white font-bold py-2 rounded-full text-[11px] shadow-xs cursor-pointer"
                    >
                      Adjust Amount / Done
                    </button>
                  </div>
                ) : (
                  /* Revamped Screen 1: Amount Entry + Keypad */
                  <div className="flex-1 bg-gray-50 flex flex-col overflow-y-auto">
                    <div className="header-pattern pt-2.5 pb-5 px-3.5 text-white relative">
                      <div className="flex items-center text-[10px] font-semibold mb-1 text-teal-100">
                        <ChevronLeft className="w-3 h-3 mr-0.5" />
                        Back
                      </div>
                      <h3 className="text-lg font-extrabold mb-1">SG60 Vouchers</h3>
                      <div className="inline-flex items-center bg-[#004d40] text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                        <MapPin className="w-3 h-3 mr-1 text-teal-200" />
                        Where to use?
                      </div>
                    </div>

                    <div className="flex-1 bg-white -mt-2 rounded-t-xl p-3 flex flex-col justify-between">
                      {/* Balance */}
                      <div className="flex justify-between items-baseline mb-2 bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                        <span className="text-[10px] font-semibold text-gray-600">Balance</span>
                        <span className="text-lg font-extrabold text-gray-900">$317</span>
                      </div>

                      {/* Amount Input */}
                      <div className="mb-2">
                        <label className="block text-[11px] font-bold text-gray-800 mb-0.5">
                          Amount to redeem
                        </label>
                        <div
                          onClick={() => setShowKeypad(true)}
                          className={`flex items-center border rounded-lg px-2.5 py-1.5 cursor-pointer bg-gray-50 ${
                            showKeypad ? 'border-gov-navy ring-1 ring-gov-navy/20 bg-white' : 'border-gray-200'
                          } ${errorMsg ? 'border-red-500 bg-red-50/20' : ''}`}
                        >
                          <span className="text-sm font-extrabold text-gray-600 mr-1">$</span>
                          <span className="text-sm font-bold flex-1 text-gray-900">
                            {revampedAmount || <span className="text-gray-400">Enter amount</span>}
                          </span>
                          {showKeypad && <span className="w-0.5 h-4 bg-teal-600 animate-pulse rounded-full"></span>}
                        </div>

                        {errorMsg && (
                          <p className="text-[10px] font-semibold text-red-600 mt-0.5 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-0.5 shrink-0" />
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
                        className="w-full bg-gov-navy text-white font-bold py-2 rounded-full text-[11px] shadow-xs flex items-center justify-center space-x-1 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none mb-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5 text-teal-300" />
                        <span>Generate QR</span>
                      </button>

                      {/* Embedded Keypad Mockup */}
                      {showKeypad && (
                        <div className="bg-slate-100 rounded-xl p-1.5 border border-slate-200">
                          <div className="flex justify-between items-center text-[9px] font-bold text-gray-500 mb-1 px-1">
                            <span>Keypad</span>
                            <button
                              onClick={() => setShowKeypad(false)}
                              className="text-gov-navy font-bold hover:underline cursor-pointer"
                            >
                              Hide
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
                              <button
                                key={key}
                                onClick={() => handleKeypress(key)}
                                className="h-7 bg-white text-gov-navy font-bold text-xs rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-center hover:bg-slate-50 active:bg-slate-200 cursor-pointer"
                              >
                                {key === 'backspace' ? <Delete className="w-3 h-3 text-gray-700" /> : key}
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
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-100">
            <div className="bg-teal-100 text-teal-800 p-1.5 rounded-xl">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gov-navy">What Changed &amp; Why</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-800 leading-tight">
                <strong className="text-gov-navy block mb-0.5">Custom Amount Input</strong> Replaced fixed $2 grid with custom input to redeem exact amount.
              </p>
            </div>

            <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-800 leading-tight">
                <strong className="text-gov-navy block mb-0.5">Inline Validation</strong> Immediate check (&gt;$0 and ≤ balance) prevents over-redemption.
              </p>
            </div>

            <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-800 leading-tight">
                <strong className="text-gov-navy block mb-0.5">Numeric Keypad</strong> Fast, thumb-friendly on-screen keypad modeled after PayNow/SGQR.
              </p>
            </div>

            <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-800 leading-tight">
                <strong className="text-gov-navy block mb-0.5">2-Screen QR Flow</strong> Clean second screen for QR prevents keypad clutter at checkout.
              </p>
            </div>

            <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-800 leading-tight">
                <strong className="text-gov-navy block mb-0.5">Zero Waste QR</strong> Generated QR reflects exact bill amount to eliminate leftover vouchers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
