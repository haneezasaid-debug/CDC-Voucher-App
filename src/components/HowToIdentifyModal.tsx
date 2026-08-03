import React from 'react';
import { X, Lock, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface HowToIdentifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToIdentifyModal: React.FC<HowToIdentifyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-blue-700 font-bold mb-4">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-lg">How to identify official websites</h2>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-600 text-white rounded-md mt-0.5 shrink-0">
                <span className="font-bold text-xs">.gov.sg</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Official government website</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Official SG government websites end with <strong>.gov.sg</strong>. Always check the browser address bar.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Secure link</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Look for a lock icon or <strong>https://</strong> to know your connection is encrypted and safe.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-100">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">No OTP requests via WhatsApp</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Government agencies will never ask for your Singpass password or OTP via SMS or phone calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <a
            href="https://www.gov.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 font-medium flex items-center hover:underline"
          >
            Visit gov.sg <ExternalLink className="w-3 h-3 ml-1" />
          </a>
          <button
            onClick={onClose}
            className="bg-gov-navy text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
