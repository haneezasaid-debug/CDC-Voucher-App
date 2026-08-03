import React, { useState } from 'react';
import { X, History, ShoppingCart, Store, RotateCcw, CheckCircle2 } from 'lucide-react';
import { TransactionRecord } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: TransactionRecord[];
  onResetBalance: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  transactions,
  onResetBalance,
}) => {
  const [filter, setFilter] = useState<'all' | 'sg60' | 'supermarket'>('all');

  if (!isOpen) return null;

  const filteredTxs = transactions.filter(
    (tx) => filter === 'all' || tx.category === filter
  );

  const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-gov-navy font-bold mb-1">
          <History className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl">Transaction History</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Total redeemed to date: <strong className="text-gray-900">${totalSpent}</strong>
        </p>

        {/* Filter Pills */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              filter === 'all'
                ? 'bg-gov-navy text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Transactions ({transactions.length})
          </button>
          <button
            onClick={() => setFilter('sg60')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center space-x-1 ${
              filter === 'sg60'
                ? 'bg-[#2ea4a8] text-white'
                : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
            }`}
          >
            <Store className="w-3 h-3" />
            <span>SG60</span>
          </button>
          <button
            onClick={() => setFilter('supermarket')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center space-x-1 ${
              filter === 'supermarket'
                ? 'bg-[#eb9f16] text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Supermarket</span>
          </button>
        </div>

        {/* Transaction Items */}
        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {filteredTxs.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No transactions recorded in this category yet.
            </div>
          ) : (
            filteredTxs.map((tx) => (
              <div
                key={tx.id}
                className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-100/60 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-white ${
                      tx.category === 'sg60' ? 'bg-[#2ea4a8]' : 'bg-[#eb9f16]'
                    }`}
                  >
                    {tx.category === 'sg60' ? (
                      <Store className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-gray-900 leading-snug">
                      {tx.merchantName || (tx.category === 'sg60' ? 'SG60 Heartland Shop' : 'Supermarket')}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{tx.timestamp}</p>
                    <div className="flex items-center space-x-1 mt-1 text-[10px] text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{tx.voucherCount} vouchers spent</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">-${tx.amount}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => {
              if (confirm('Reset voucher balances to default ($317 SG60 / $300 Supermarket)?')) {
                onResetBalance();
              }
            }}
            className="text-xs text-gray-500 hover:text-red-600 flex items-center font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset Demo Balances
          </button>
          <button
            onClick={onClose}
            className="bg-gov-navy text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
