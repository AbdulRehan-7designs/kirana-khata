export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  udhaarDue: number; // positive if customer owes
  pendingDays: number;
  trustScore: 'Star Grahak' | 'Regular' | 'Follow Up';
  lastActive: string;
}

export interface KhataTransaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'credit' | 'payment'; // credit = diya udhaar, payment = liya jama
  amount: number;
  items: string;
  timestamp: string;
  method?: 'cash' | 'upi';
}

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Ramesh Bhaiya (Dairy)',
    phone: '+91 98201 44521',
    address: 'Chowk Stall #2',
    avatar: '🥛',
    udhaarDue: 1850,
    pendingDays: 4,
    trustScore: 'Star Grahak',
    lastActive: '12m ago',
  },
  {
    id: 'c2',
    name: 'Gupta Ji Teacher',
    phone: '+91 97110 82910',
    address: 'House 14, Gali No. 3',
    avatar: '📚',
    udhaarDue: 3420,
    pendingDays: 14,
    trustScore: 'Follow Up',
    lastActive: 'Today, 2:15 PM',
  },
  {
    id: 'c3',
    name: 'Sunita Didi',
    phone: '+91 98452 11093',
    address: 'Apt 202, Shanti Nivas',
    avatar: '🌸',
    udhaarDue: 460,
    pendingDays: 2,
    trustScore: 'Star Grahak',
    lastActive: 'Yesterday',
  },
  {
    id: 'c4',
    name: 'Asif Bhai Auto',
    phone: '+91 99018 73204',
    address: 'Auto Stand Corner',
    avatar: '🛺',
    udhaarDue: 750,
    pendingDays: 8,
    trustScore: 'Regular',
    lastActive: '3 days ago',
  },
  {
    id: 'c5',
    name: 'Manoj Tailor',
    phone: '+91 94231 65789',
    address: 'Near Old Post Office',
    avatar: '✂️',
    udhaarDue: 0,
    pendingDays: 0,
    trustScore: 'Star Grahak',
    lastActive: 'Settled today',
  },
  {
    id: 'c6',
    name: 'Pooja Medical',
    phone: '+91 93214 78541',
    address: 'Shop 10, Main Bazaar',
    avatar: '💊',
    udhaarDue: 2100,
    pendingDays: 11,
    trustScore: 'Follow Up',
    lastActive: '5 days ago',
  }
];

export const INITIAL_TRANSACTIONS: KhataTransaction[] = [
  {
    id: 'tx1',
    customerId: 'c1',
    customerName: 'Ramesh Bhaiya (Dairy)',
    type: 'credit',
    amount: 350,
    items: 'Atta 5kg + Fortune Mustard Oil',
    timestamp: 'Today, 4:20 PM',
  },
  {
    id: 'tx2',
    customerId: 'c2',
    customerName: 'Gupta Ji Teacher',
    type: 'credit',
    amount: 1200,
    items: 'Basmati Rice + Spices Box',
    timestamp: 'Today, 2:15 PM',
  },
  {
    id: 'tx3',
    customerId: 'c5',
    customerName: 'Manoj Tailor',
    type: 'payment',
    amount: 980,
    items: 'Full Month Settle via PhonePe',
    timestamp: 'Today, 1:40 PM',
    method: 'upi',
  },
  {
    id: 'tx4',
    customerId: 'c3',
    customerName: 'Sunita Didi',
    type: 'credit',
    amount: 180,
    items: 'Milk packets & Marie Gold',
    timestamp: 'Yesterday, 8:10 PM',
  },
  {
    id: 'tx5',
    customerId: 'c4',
    customerName: 'Asif Bhai Auto',
    type: 'credit',
    amount: 400,
    items: 'Tobacco, Matches & Cold Drinks',
    timestamp: '22 Nov, 6:00 PM',
  },
];
