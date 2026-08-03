import React, { useState } from 'react';
import { X, MapPin, Search, Store, ShoppingCart, Utensils, CheckCircle2, Navigation } from 'lucide-react';
import { MOCK_MERCHANTS } from '../data/mockData';
import { VoucherCategory } from '../types';

interface WhereToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: VoucherCategory;
}

export const WhereToUseModal: React.FC<WhereToUseModalProps> = ({ isOpen, onClose, category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'hawker' | 'supermarket' | 'heartland'>('all');
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');

  if (!isOpen) return null;

  const filteredMerchants = MOCK_MERCHANTS.filter((m) => {
    const matchesCategory =
      !category ||
      m.acceptedVoucherType === 'all' ||
      m.acceptedVoucherType === category;

    const matchesFilter = selectedFilter === 'all' || m.category === selectedFilter;

    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.postalCode.includes(searchQuery) ||
      m.area.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl relative max-h-[88vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-gov-navy font-bold mb-1">
          <MapPin className="w-5 h-5 text-teal-600" />
          <h2 className="text-xl">Where to use vouchers?</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Participating heartland merchants, hawker stalls, and supermarkets in Singapore.
        </p>

        {/* View Toggle (List vs Map) */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-3">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'list' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Merchant List
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'map' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Interactive Map
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search postal code, area (e.g. Admiralty, 750402)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex space-x-1.5 mb-3 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('hawker')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center space-x-1 cursor-pointer ${
              selectedFilter === 'hawker'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>Hawkers / Coffee Shops</span>
          </button>
          <button
            onClick={() => setSelectedFilter('supermarket')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center space-x-1 cursor-pointer ${
              selectedFilter === 'supermarket'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Supermarkets</span>
          </button>
          <button
            onClick={() => setSelectedFilter('heartland')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center space-x-1 cursor-pointer ${
              selectedFilter === 'heartland'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Store className="w-3 h-3" />
            <span>Heartland Shops</span>
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'list' ? (
          <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
            {filteredMerchants.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xs">
                No matching merchants found in this area.
              </div>
            ) : (
              filteredMerchants.map((m) => (
                <div
                  key={m.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-2.5">
                      <div className="p-2 bg-white rounded-lg border border-gray-200 text-teal-700 shrink-0 mt-0.5">
                        {m.category === 'supermarket' ? (
                          <ShoppingCart className="w-4 h-4 text-amber-500" />
                        ) : m.category === 'hawker' ? (
                          <Utensils className="w-4 h-4 text-teal-600" />
                        ) : (
                          <Store className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900">{m.name}</h4>
                        <p className="text-[11px] text-gray-500">{m.address}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium">
                            {m.area}
                          </span>
                          <span className="text-[10px] text-emerald-600 flex items-center font-medium">
                            <CheckCircle2 className="w-3 h-3 mr-0.5" />
                            {m.acceptedVoucherType === 'all'
                              ? 'Accepts All Vouchers'
                              : m.acceptedVoucherType === 'supermarket'
                              ? 'Supermarket Vouchers'
                              : 'SG60 Heartland Vouchers'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Map Simulation View */
          <div className="flex-1 rounded-xl bg-gray-100 overflow-hidden relative border border-gray-200 flex flex-col justify-between p-4 min-h-[220px]">
            {/* Map styling mock */}
            <div className="absolute inset-0 bg-[#e5e9f0] opacity-80 pointer-events-none">
              <svg className="w-full h-full text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,20 Q50,40 100,10 M0,80 Q50,60 100,90" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <path d="M30,0 Q40,50 35,100 M70,0 Q60,50 65,100" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Simulated Map Pins */}
            <div className="relative z-10 flex-1">
              <div className="absolute top-[25%] left-[30%] bg-teal-600 text-white p-1.5 rounded-full shadow-lg text-xs font-bold flex items-center space-x-1 animate-bounce">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px]">Woodlands Mart</span>
              </div>
              <div className="absolute top-[55%] left-[65%] bg-amber-500 text-white p-1.5 rounded-full shadow-lg text-xs font-bold flex items-center space-x-1">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-[10px]">NTUC FairPrice</span>
              </div>
              <div className="absolute top-[70%] left-[20%] bg-teal-600 text-white p-1.5 rounded-full shadow-lg text-xs font-bold flex items-center space-x-1">
                <Utensils className="w-4 h-4" />
                <span className="text-[10px]">Admiralty Coffee Shop</span>
              </div>
            </div>

            <div className="relative z-10 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-gray-200 shadow-sm text-xs">
              <div className="flex items-center justify-between text-gray-800 font-semibold mb-0.5">
                <span className="flex items-center">
                  <Navigation className="w-3.5 h-3.5 text-blue-600 mr-1" />
                  Near Admiralty / Woodlands
                </span>
                <span className="text-[11px] text-gray-500">8 merchant locations found</span>
              </div>
              <p className="text-[10px] text-gray-500">Look for the red SG60/CDC voucher decal at storefronts.</p>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100 text-right">
          <button
            onClick={onClose}
            className="bg-gov-navy text-white px-5 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
