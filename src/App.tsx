import React, { useState, useEffect } from 'react';
import {
  ActiveScreen,
  HouseholdInfo,
  Language,
  TransactionRecord,
  VoucherCategory,
  VoucherItem,
} from './types';
import {
  DEFAULT_HOUSEHOLD,
  INITIAL_TRANSACTIONS,
  generateInitialVouchers,
} from './data/mockData';
import { GovBanner } from './components/GovBanner';
import { Navbar } from './components/Navbar';
import { BrowserBar } from './components/BrowserBar';
import { DashboardView } from './components/DashboardView';
import { VoucherSelectView } from './components/VoucherSelectView';
import { VoucherRedeemView } from './components/VoucherRedeemView';
import { HowToIdentifyModal } from './components/HowToIdentifyModal';
import { ShareModal } from './components/ShareModal';
import { InfoHelpModal } from './components/InfoHelpModal';
import { HistoryModal } from './components/HistoryModal';
import { WhereToUseModal } from './components/WhereToUseModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<VoucherCategory>('sg60');
  const [language, setLanguage] = useState<Language>('en');

  // Household & Vouchers State with LocalStorage
  const [household, setHousehold] = useState<HouseholdInfo>(() => {
    const saved = localStorage.getItem('sg60_household');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_HOUSEHOLD, ...parsed, address: DEFAULT_HOUSEHOLD.address };
      } catch {
        return DEFAULT_HOUSEHOLD;
      }
    }
    return DEFAULT_HOUSEHOLD;
  });

  const [sg60Vouchers, setSg60Vouchers] = useState<VoucherItem[]>(() => {
    const saved = localStorage.getItem('sg60_vouchers_list');
    return saved ? JSON.parse(saved) : generateInitialVouchers(317, false);
  });

  const [supermarketVouchers, setSupermarketVouchers] = useState<VoucherItem[]>(() => {
    const saved = localStorage.getItem('sg60_supermarket_list');
    return saved ? JSON.parse(saved) : generateInitialVouchers(300, true);
  });

  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = localStorage.getItem('sg60_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [selectedVouchersForRedeem, setSelectedVouchersForRedeem] = useState<VoucherItem[]>([]);

  // Modals state
  const [isIdentifyModalOpen, setIsIdentifyModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isWhereToUseModalOpen, setIsWhereToUseModalOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sg60_household', JSON.stringify(household));
  }, [household]);

  useEffect(() => {
    localStorage.setItem('sg60_vouchers_list', JSON.stringify(sg60Vouchers));
  }, [sg60Vouchers]);

  useEffect(() => {
    localStorage.setItem('sg60_supermarket_list', JSON.stringify(supermarketVouchers));
  }, [supermarketVouchers]);

  useEffect(() => {
    localStorage.setItem('sg60_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculated current balances
  const currentSG60Balance = sg60Vouchers
    .filter((v) => !v.spent)
    .reduce((acc, v) => acc + v.denomination, 0);

  const currentSupermarketBalance = supermarketVouchers
    .filter((v) => !v.spent)
    .reduce((acc, v) => acc + v.denomination, 0);

  // Screen Actions
  const handleSelectCategory = (cat: VoucherCategory) => {
    setSelectedCategory(cat);
    setActiveScreen('select');
  };

  const handleProceedToRedeem = (vouchersToSpend: VoucherItem[]) => {
    setSelectedVouchersForRedeem(vouchersToSpend);
    setActiveScreen('redeem');
  };

  const handleConfirmRedemptionByAmount = (merchantName: string, amountToDeduct: number) => {
    let remaining = amountToDeduct;

    if (selectedCategory === 'sg60') {
      setSg60Vouchers((prev) =>
        prev.map((v) => {
          if (!v.spent && remaining > 0) {
            if (v.denomination <= remaining) {
              remaining -= v.denomination;
              return { ...v, spent: true };
            } else {
              const remainingDenom = v.denomination - remaining;
              remaining = 0;
              return { ...v, denomination: remainingDenom };
            }
          }
          return v;
        })
      );
    } else {
      setSupermarketVouchers((prev) =>
        prev.map((v) => {
          if (!v.spent && remaining > 0) {
            if (v.denomination <= remaining) {
              remaining -= v.denomination;
              return { ...v, spent: true };
            } else {
              const remainingDenom = v.denomination - remaining;
              remaining = 0;
              return { ...v, denomination: remainingDenom };
            }
          }
          return v;
        })
      );
    }

    const now = new Date();
    const formattedTime =
      now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ', ' +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      timestamp: formattedTime,
      category: selectedCategory,
      amount: amountToDeduct,
      merchantName: merchantName,
      voucherCount: Math.ceil(amountToDeduct / 2),
      status: 'completed',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleConfirmRedemption = (merchantName: string, spentVouchers: VoucherItem[]) => {
    const spentIds = spentVouchers.map((v) => v.id);
    const totalAmount = spentVouchers.reduce((acc, v) => acc + v.denomination, 0);

    if (selectedCategory === 'sg60') {
      setSg60Vouchers((prev) =>
        prev.map((v) => (spentIds.includes(v.id) ? { ...v, spent: true } : v))
      );
    } else {
      setSupermarketVouchers((prev) =>
        prev.map((v) => (spentIds.includes(v.id) ? { ...v, spent: true } : v))
      );
    }

    const now = new Date();
    const formattedTime =
      now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ', ' +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      timestamp: formattedTime,
      category: selectedCategory,
      amount: totalAmount,
      merchantName: merchantName,
      voucherCount: spentVouchers.length,
      status: 'completed',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleResetBalance = () => {
    setSg60Vouchers(generateInitialVouchers(317, false));
    setSupermarketVouchers(generateInitialVouchers(300, true));
    setTransactions(INITIAL_TRANSACTIONS);
    setActiveScreen('dashboard');
    setIsHistoryModalOpen(false);
  };

  const handleGlobalBack = () => {
    if (activeScreen === 'redeem') {
      setActiveScreen('select');
    } else if (activeScreen === 'select') {
      setActiveScreen('dashboard');
    }
  };

  return (
    <div className="bg-gov-navy min-h-screen font-sans antialiased text-gray-900 flex flex-col justify-between">
      {/* Container Wrapper */}
      <div className="w-full max-w-md mx-auto min-h-screen relative flex flex-col bg-gov-navy">
        {/* Top Government Banner */}
        <GovBanner
          language={language}
          onOpenIdentifyModal={() => setIsIdentifyModalOpen(true)}
        />

        {/* Dashboard Navigation Bar (Logo + Language Toggle) */}
        {activeScreen === 'dashboard' && (
          <Navbar language={language} onLanguageChange={setLanguage} />
        )}

        {/* Main View Switcher */}
        <div className="flex-1">
          {activeScreen === 'dashboard' && (
            <DashboardView
              household={household}
              sg60Balance={currentSG60Balance}
              supermarketBalance={currentSupermarketBalance}
              language={language}
              onSelectCategory={handleSelectCategory}
              onOpenHistory={() => setIsHistoryModalOpen(true)}
              onOpenShare={() => setIsShareModalOpen(true)}
              onOpenInfo={() => setIsInfoModalOpen(true)}
            />
          )}

          {activeScreen === 'select' && (
            <VoucherSelectView
              category={selectedCategory}
              balance={selectedCategory === 'sg60' ? currentSG60Balance : currentSupermarketBalance}
              language={language}
              onBack={() => setActiveScreen('dashboard')}
              onOpenWhereToUse={() => setIsWhereToUseModalOpen(true)}
              onConfirmRedemption={handleConfirmRedemptionByAmount}
            />
          )}

          {activeScreen === 'redeem' && (
            <VoucherRedeemView
              category={selectedCategory}
              selectedVouchers={selectedVouchersForRedeem}
              language={language}
              onBack={() => setActiveScreen('select')}
              onConfirmRedemption={handleConfirmRedemption}
            />
          )}
        </div>

        {/* Bottom Simulated Mobile Browser Navigation Bar */}
        <BrowserBar
          onBack={handleGlobalBack}
          canGoBack={activeScreen !== 'dashboard'}
        />

        {/* Modals */}
        <HowToIdentifyModal
          isOpen={isIdentifyModalOpen}
          onClose={() => setIsIdentifyModalOpen(false)}
        />

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          household={household}
        />

        <InfoHelpModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
        />

        <HistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          transactions={transactions}
          onResetBalance={handleResetBalance}
        />

        <WhereToUseModal
          isOpen={isWhereToUseModalOpen}
          onClose={() => setIsWhereToUseModalOpen(false)}
          category={selectedCategory}
        />
      </div>
    </div>
  );
}
