import React, { useState } from 'react';
import { X, HelpCircle, Phone, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface InfoHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQS = [
  {
    q: 'What are SG60 Vouchers?',
    a: 'SG60 Vouchers are part of Singapore’s SG60 celebrations to support citizens and seniors with daily expenses at heartland hawkers, shops, and supermarkets.',
  },
  {
    q: 'Where can I spend SG60 Vouchers?',
    a: 'SG60 Heartland Vouchers can be spent at participating hawkers and heartland merchant shops displaying the SG60/CDC voucher decal. Supermarket Vouchers can be spent at NTUC FairPrice, Sheng Siong, Giant, Cold Storage, and Prime Supermarket.',
  },
  {
    q: 'Can multiple family members use the same vouchers?',
    a: 'Yes! Vouchers are assigned per household. Any household member can access and redeem the vouchers via the shared link using Singpass.',
  },
  {
    q: 'Do SG60 Vouchers expire?',
    a: 'Yes, SG60 Vouchers are valid for use until 31 December 2026.',
  },
  {
    q: 'What if I select the wrong voucher amount?',
    a: 'Selected vouchers remain active until scanned by a merchant. If you do not show the QR code, the unused balance returns to your household account.',
  },
];

export const InfoHelpModal: React.FC<InfoHelpModalProps> = ({ isOpen, onClose }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isOpen) return null;

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
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl">Info & Help</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">Frequently asked questions and support for SG60 Vouchers.</p>

        {/* FAQs List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {FAQS.map((faq, idx) => {
            const isExpanded = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenFaq(isExpanded ? null : idx)}
                  className="w-full text-left p-3.5 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 pr-2">{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-3.5 text-xs text-gray-600 border-t border-gray-100 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Hotline Section */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between bg-blue-50/60 p-3 rounded-xl">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-xs font-bold text-gray-800">CDC Hotline</div>
              <div className="text-[11px] text-gray-600">6225 5324 (Mon–Fri 8:30am–6pm)</div>
            </div>
          </div>
          <a
            href="tel:62255324"
            className="bg-gov-navy text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
};
