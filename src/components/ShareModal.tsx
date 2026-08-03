import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageSquare, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { HouseholdInfo } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  household: HouseholdInfo;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, household }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://redeem.gov.sg/claim/sg60-${household.postalCode.toLowerCase()}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-gov-navy font-bold mb-2">
          <Share2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl">Share Vouchers</h2>
        </div>
        <p className="text-xs text-gray-500 mb-5">
          Share your household SG60 voucher link with family members living at <strong>{household.address}</strong>.
        </p>

        {/* Share Link Box */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-5">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
            Household Voucher Link
          </label>
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200">
            <span className="text-xs font-mono text-gray-700 truncate mr-2">{shareUrl}</span>
            <button
              onClick={handleCopy}
              className="bg-gov-navy text-white text-xs px-3 py-1.5 rounded-md font-medium flex items-center shrink-0 hover:bg-opacity-90 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Household Share QR */}
        <div className="flex flex-col items-center bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-5">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-2">
            <QRCodeSVG value={shareUrl} size={130} level="M" />
          </div>
          <p className="text-xs text-gray-600 font-medium flex items-center">
            <QrCode className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Family members can scan this QR code to access
          </p>
        </div>

        {/* Quick Action Apps */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Here is our household SG60 Vouchers link: ${shareUrl}`)}`, '_blank');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </button>
          <button
            onClick={handleCopy}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
