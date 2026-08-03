import { HouseholdInfo, Merchant, TransactionRecord, VoucherItem, Language } from '../types';

export const DEFAULT_HOUSEHOLD: HouseholdInfo = {
  address: 'CANBERRA ROAD, SINGAPORE',
  postalCode: '750402',
  maskedNric: 'S****567D',
  expiryDate: '31 Dec 2026',
  totalSG60Balance: 317,
  totalSupermarketBalance: 300,
};

// Helper to generate voucher items adding up to a total balance
export function generateInitialVouchers(totalBalance: number, isSupermarket = false): VoucherItem[] {
  const items: VoucherItem[] = [];
  let currentSum = 0;
  let idCounter = 1;

  if (isSupermarket) {
    // For supermarket vouchers, typically $10 and $5 denominations
    while (currentSum + 10 <= totalBalance) {
      items.push({ id: `sup-${idCounter++}`, denomination: 10, spent: false });
      currentSum += 10;
    }
    while (currentSum + 5 <= totalBalance) {
      items.push({ id: `sup-${idCounter++}`, denomination: 5, spent: false });
      currentSum += 5;
    }
  } else {
    // For SG60 / CDC heartland vouchers, $2, $5, $10
    // Generate $2 vouchers mostly as shown in screenshot
    while (currentSum + 2 <= totalBalance) {
      items.push({ id: `sg-${idCounter++}`, denomination: 2, spent: false });
      currentSum += 2;
    }
    while (currentSum + 5 <= totalBalance - currentSum) {
      items.push({ id: `sg-${idCounter++}`, denomination: 5, spent: false });
      currentSum += 5;
    }
    if (totalBalance - currentSum > 0) {
      items.push({ id: `sg-${idCounter++}`, denomination: totalBalance - currentSum, spent: false });
    }
  }

  return items;
}

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-101',
    timestamp: '01 Aug 2026, 12:45 PM',
    category: 'sg60',
    amount: 6,
    merchantName: 'Kim San Leng Coffee Shop (Admiralty)',
    voucherCount: 3,
    status: 'completed',
  },
  {
    id: 'tx-102',
    timestamp: '28 Jul 2026, 06:15 PM',
    category: 'supermarket',
    amount: 30,
    merchantName: 'NTUC FairPrice (Woodlands Mart)',
    voucherCount: 3,
    status: 'completed',
  },
  {
    id: 'tx-103',
    timestamp: '20 Jul 2026, 09:10 AM',
    category: 'sg60',
    amount: 4,
    merchantName: 'Swee Heng Bakery (Admiralty Link)',
    voucherCount: 2,
    status: 'completed',
  },
];

export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Kim San Leng Coffee Shop',
    category: 'hawker',
    address: 'Blk 688 Woodlands Drive 75, #01-01',
    postalCode: '730688',
    area: 'Woodlands / Admiralty',
    acceptedVoucherType: 'sg60',
  },
  {
    id: 'm2',
    name: 'NTUC FairPrice Supermarket',
    category: 'supermarket',
    address: '768 Woodlands Ave 6, #01-32 Woodlands Mart',
    postalCode: '730768',
    area: 'Woodlands / Admiralty',
    acceptedVoucherType: 'all',
  },
  {
    id: 'm3',
    name: 'Sheng Siong Supermarket',
    category: 'supermarket',
    address: 'Blk 785E Woodlands Rise, #01-01',
    postalCode: '735785',
    area: 'Woodlands',
    acceptedVoucherType: 'all',
  },
  {
    id: 'm4',
    name: 'Swee Heng Bakery',
    category: 'heartland',
    address: '402 Admiralty Link, #01-08',
    postalCode: '750402',
    area: 'Admiralty',
    acceptedVoucherType: 'sg60',
  },
  {
    id: 'm5',
    name: 'Giant Express',
    category: 'supermarket',
    address: 'Blk 678A Woodlands Ave 6, #01-12',
    postalCode: '731678',
    area: 'Admiralty',
    acceptedVoucherType: 'all',
  },
  {
    id: 'm6',
    name: 'Old Chang Kee',
    category: 'hawker',
    address: '678 Admiralty MRT Station, #01-03',
    postalCode: '739980',
    area: 'Admiralty MRT',
    acceptedVoucherType: 'sg60',
  },
  {
    id: 'm7',
    name: 'Cold Storage Supermarket',
    category: 'supermarket',
    address: '1 Woodlands Square, #B1-28 Causeway Point',
    postalCode: '738099',
    area: 'Woodlands MRT',
    acceptedVoucherType: 'supermarket',
  },
  {
    id: 'm8',
    name: 'Kopitiam @ Admiralty Place',
    category: 'hawker',
    address: '678A Woodlands Ave 6, #02-01',
    postalCode: '731678',
    area: 'Admiralty',
    acceptedVoucherType: 'sg60',
  },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    govAgency: 'A Singapore Government Agency Website',
    howToIdentify: 'How to identify',
    titleSG60: 'SG60 Vouchers (Seniors)',
    subtitle: 'Can be used wherever CDC Vouchers are accepted',
    useBy: 'Use by 31 Dec 2026',
    shareVouchers: 'Share vouchers',
    infoHelp: 'Info & help',
    tapToUse: 'TAP TO USE',
    history: 'History',
    sg60CardTitle: 'SG60 Vouchers',
    supermarketCardTitle: 'SG60 Supermarket Vouchers',
    showToShop: 'Show to shop',
    whereToUse: 'Where to use?',
    balance: 'Balance',
    back: 'Back',
    selectVouchers: 'Select vouchers to spend',
    totalSelected: 'Total Selected',
    generateQR: 'Generate QR Code',
    builtBy: 'BUILT BY',
    openGovProducts: 'OPEN GOVERNMENT PRODUCTS',
  },
  zh: {
    govAgency: '新加坡政府机构官方网站',
    howToIdentify: '如何识别官方网站',
    titleSG60: 'SG60 建国礼包礼券（乐龄人士）',
    subtitle: '适用于所有接受 CDC 社区理事会礼券的商家',
    useBy: '有效期至 2026年12月31日',
    shareVouchers: '共享礼券',
    infoHelp: '信息与帮助',
    tapToUse: '点击使用',
    history: '使用历史记录',
    sg60CardTitle: 'SG60 邻里购物券',
    supermarketCardTitle: 'SG60 超市专用礼券',
    showToShop: '出示给店家扫描',
    whereToUse: '可在何处使用？',
    balance: '余额',
    back: '返回',
    selectVouchers: '选择您要消费的礼券',
    totalSelected: '已选总额',
    generateQR: '生成二维码',
    builtBy: '技术支持',
    openGovProducts: 'OPEN GOVERNMENT PRODUCTS',
  },
  ms: {
    govAgency: 'Laman Web Agensi Kerajaan Singapura',
    howToIdentify: 'Cara mengenal pasti',
    titleSG60: 'Baucar SG60 (Warga Emas)',
    subtitle: 'Boleh digunakan di mana-mana sahaja Baucar CDC diterima',
    useBy: 'Guna sebelum 31 Dis 2026',
    shareVouchers: 'Kongsi baucar',
    infoHelp: 'Maklumat & bantuan',
    tapToUse: 'TEKAN UNTUK GUNA',
    history: 'Sejarah',
    sg60CardTitle: 'Baucar SG60',
    supermarketCardTitle: 'Baucar Pasar Raya SG60',
    showToShop: 'Tunjukkan kepada kedai',
    whereToUse: 'Di mana hendak guna?',
    balance: 'Baki',
    back: 'Kembali',
    selectVouchers: 'Pilih baucar untuk dibelanjakan',
    totalSelected: 'Jumlah Dipilih',
    generateQR: 'Jana Kod QR',
    builtBy: 'DIBINA OLEH',
    openGovProducts: 'OPEN GOVERNMENT PRODUCTS',
  },
  ta: {
    govAgency: 'சிங்கப்பூர் அரசு நிறுவன இணையதளம்',
    howToIdentify: 'அடையாளம் காண்பது எப்படி',
    titleSG60: 'SG60 கூப்பன்கள் (முதியவர்கள்)',
    subtitle: 'CDC கூப்பன்கள் ஏற்றுக்கொள்ளப்படும் இடங்களில் பயன்படுத்தலாம்',
    useBy: '31 டிசம்பர் 2026 வரை செல்லுபடியாகும்',
    shareVouchers: 'கூப்பன்களைப் பகிரவும்',
    infoHelp: 'தகவல் & உதவி',
    tapToUse: 'பயன்படுத்த தட்டவும்',
    history: 'வரலாறு',
    sg60CardTitle: 'SG60 கூப்பன்கள்',
    supermarketCardTitle: 'SG60 சூப்பர் மார்க்கெட் கூப்பன்கள்',
    showToShop: 'கடையில் காட்டவும்',
    whereToUse: 'எங்கு பயன்படுத்த வேண்டும்?',
    balance: 'மீதி தொகையை',
    back: 'பின்னால்',
    selectVouchers: 'பயன்படுத்த கூப்பன்களைத் தேர்ந்தெடுக்கவும்',
    totalSelected: 'தேர்ந்தெடுக்கப்பட்ட தொகை',
    generateQR: 'QR குறியீட்டை உருவாக்கவும்',
    builtBy: 'உருவாக்கியவர்',
    openGovProducts: 'OPEN GOVERNMENT PRODUCTS',
  },
};
