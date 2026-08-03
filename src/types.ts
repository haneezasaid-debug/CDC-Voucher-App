export type VoucherCategory = 'sg60' | 'supermarket';

export interface VoucherItem {
  id: string;
  denomination: number;
  spent: boolean;
}

export interface TransactionRecord {
  id: string;
  timestamp: string;
  category: VoucherCategory;
  amount: number;
  merchantName?: string;
  voucherCount: number;
  status: 'completed' | 'refunded';
}

export interface Merchant {
  id: string;
  name: string;
  category: 'hawker' | 'supermarket' | 'heartland';
  address: string;
  postalCode: string;
  area: string;
  acceptedVoucherType: 'all' | 'sg60' | 'supermarket';
}

export type Language = 'en' | 'zh' | 'ms' | 'ta';

export interface HouseholdInfo {
  address: string;
  postalCode: string;
  maskedNric: string;
  expiryDate: string;
  totalSG60Balance: number;
  totalSupermarketBalance: number;
}

export type ActiveScreen = 'dashboard' | 'select' | 'redeem' | 'comparison';
