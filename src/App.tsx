import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Customer, 
  KhataTransaction, 
  INITIAL_CUSTOMERS, 
  INITIAL_TRANSACTIONS 
} from './data/khataData';
import { HomeScreen } from './components/HomeScreen';
import { QuickAddModal } from './components/QuickAddModal';
import { CustomerLedgerScreen } from './components/CustomerLedgerScreen';
import { PaymentReminderModal } from './components/PaymentReminderModal';
import { CounterQrModal } from './components/CounterQrModal';
import { VoiceLogModal } from './components/VoiceLogModal';
import { AnalyticsVasooliScreen } from './components/AnalyticsVasooliScreen';
import { OpeningLaunchScreen } from './components/OpeningLaunchScreen';
import { AddCustomerModal } from './components/AddCustomerModal';
import { 
  Zap, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Eye,
  HandMetal,
  BookOpen,
  PlusCircle,
  BarChart3,
  QrCode as QrIcon,
  Mic as MicIcon,
  Store as StoreIcon
} from 'lucide-react';

export type ScreenId = 'launch' | 'home' | 'quick-add' | 'ledger' | 'reminder' | 'qr' | 'voice' | 'analytics';

export function App() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [transactions, setTransactions] = useState<KhataTransaction[]>(INITIAL_TRANSACTIONS);
  
  // Navigation State - Defaults to launch screen!
  const [activeScreen, setActiveScreen] = useState<ScreenId>('launch');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(INITIAL_CUSTOMERS[0]);
  
  // Modals
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState<'credit' | 'payment'>('credit');
  const [quickAddCustomer, setQuickAddCustomer] = useState<Customer | null>(null);

  const [reminderOpen, setReminderOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrAmount, setQrAmount] = useState<number | undefined>(undefined);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);

  // Status Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenQuickAdd = (type: 'credit' | 'payment', customer?: Customer) => {
    setQuickAddType(type);
    setQuickAddCustomer(customer || selectedCustomer || customers[0]);
    setQuickAddOpen(true);
  };

  const handleConfirmQuickAdd = (data: {
    customerId: string;
    customerName: string;
    amount: number;
    items: string;
    type: 'credit' | 'payment';
  }) => {
    const newTx: KhataTransaction = {
      id: `tx_${Date.now()}`,
      customerId: data.customerId,
      customerName: data.customerName,
      type: data.type,
      amount: data.amount,
      items: data.items,
      timestamp: 'Just now',
    };

    setTransactions(prev => [newTx, ...prev]);

    setCustomers(prev => prev.map(c => {
      if (c.id === data.customerId) {
        const diff = data.type === 'credit' ? data.amount : -data.amount;
        return {
          ...c,
          udhaarDue: Math.max(0, c.udhaarDue + diff),
          lastActive: 'Just now',
          pendingDays: data.type === 'credit' ? Math.max(1, c.pendingDays) : (c.udhaarDue - data.amount <= 0 ? 0 : c.pendingDays)
        };
      }
      return c;
    }));

    setQuickAddOpen(false);
    showToast(`✓ Entry saved: ₹${data.amount} for ${data.customerName}`);
  };

  const handleOpenQr = (amount?: number) => {
    setQrAmount(amount);
    setQrModalOpen(true);
  };

  const handleSimulateQrPayment = () => {
    if (selectedCustomer && qrAmount) {
      handleConfirmQuickAdd({
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        amount: qrAmount,
        items: 'Instant Counter QR Pay',
        type: 'payment'
      });
    }
    setQrModalOpen(false);
    showToast(`✓ ₹${qrAmount || 500} payment received via UPI`);
  };

  const handleVoiceLogged = (data: { customerName: string; amount: number; items: string }) => {
    const targetCust = customers.find(c => c.name.toLowerCase().includes(data.customerName.toLowerCase())) || customers[0];
    handleConfirmQuickAdd({
      customerId: targetCust.id,
      customerName: targetCust.name,
      amount: data.amount,
      items: data.items,
      type: 'credit'
    });
    setVoiceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#241C18] text-[#FAF6EF] flex flex-col items-center justify-center p-2 sm:p-6 font-sans">
      
      {/* Top Header / Challenge Showcase Bar */}
      <div className="w-full max-w-5xl mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E98A55] inline-block animate-ping" />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#FAF6EF] flex items-center gap-2">
              KIRANA KHATA <span className="text-[#E98A55] font-extrabold text-sm px-2 py-0.5 rounded-lg bg-[#E98A55]/15 border border-[#E98A55]/30">ONE-HAND 2.0</span>
            </h1>
          </div>
          <p className="text-xs text-[#E5D9CA]/80 mt-0.5">
            Artisanal Bahi-Khata Meets Ultra-Fast Fintech • Warm Porcelain, Burnt Terracotta &amp; Muted Olive
          </p>
        </div>

        {/* 6 Screen Quick-Nav Switcher */}
        <div className="flex items-center gap-1.5 bg-[#312621] p-1.5 rounded-2xl border border-[#766A61]/30 overflow-x-auto max-w-full shadow-warm-inner">
          {[
            { id: 'launch', label: '🚀 0. Launch & Splash' },
            { id: 'home', label: '1. Store Dashboard' },
            { id: 'quick-add', label: '2. <10s Quick-Add' },
            { id: 'ledger', label: '3. Customer Ledger' },
            { id: 'reminder', label: '4. WhatsApp Reminder' },
            { id: 'qr', label: '5. Instant UPI QR' },
            { id: 'voice', label: '6. Hands-Free Voice' },
            { id: 'analytics', label: '7. Vasooli Health' },
          ].map(screen => (
            <motion.button
              key={screen.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (screen.id === 'quick-add') {
                  handleOpenQuickAdd('credit');
                } else if (screen.id === 'reminder') {
                  setReminderOpen(true);
                } else if (screen.id === 'qr') {
                  handleOpenQr(selectedCustomer?.udhaarDue || 1250);
                } else if (screen.id === 'voice') {
                  setVoiceModalOpen(true);
                } else {
                  setActiveScreen(screen.id as ScreenId);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                activeScreen === screen.id 
                  ? 'bg-[#C85C32] text-white shadow-glow-terracotta' 
                  : 'text-[#E5D9CA] hover:bg-white/10'
              }`}
            >
              {screen.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Device Frame with Soft Tactile Bezel */}
      <div className="relative w-full max-w-[420px] h-[844px] bg-[#FAF6EF] rounded-[48px] shadow-2xl border-[10px] border-[#312621] overflow-hidden flex flex-col ring-1 ring-white/10">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="h-6 w-full bg-[#FAF6EF] flex justify-center items-center pt-2 relative z-40">
          <div className="w-24 h-4 bg-[#29211D] rounded-full shadow-inner flex items-center justify-end px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#71835C] animate-pulse"></span>
          </div>
        </div>

        {/* Dynamic Screen Viewport with smooth spring transitions */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeScreen === 'launch' && (
              <motion.div
                key="launch"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <OpeningLaunchScreen onGetStarted={() => setActiveScreen('home')} />
              </motion.div>
            )}

            {activeScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <HomeScreen
                  customers={customers}
                  transactions={transactions}
                  onOpenQuickAdd={handleOpenQuickAdd}
                  onSelectCustomer={(cust) => {
                    setSelectedCustomer(cust);
                    setActiveScreen('ledger');
                  }}
                  onOpenQr={handleOpenQr}
                  onOpenVoice={() => setVoiceModalOpen(true)}
                  onOpenAnalytics={() => setActiveScreen('analytics')}
                  onOpenAddCustomer={() => setAddCustomerOpen(true)}
                />
              </motion.div>
            )}

            {activeScreen === 'ledger' && selectedCustomer && (
              <motion.div
                key="ledger"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <CustomerLedgerScreen
                  customer={selectedCustomer}
                  transactions={transactions}
                  onBack={() => setActiveScreen('home')}
                  onOpenReminder={() => setReminderOpen(true)}
                  onOpenQr={(amt) => handleOpenQr(amt)}
                  onAddTransaction={(type) => handleOpenQuickAdd(type, selectedCustomer)}
                />
              </motion.div>
            )}

            {activeScreen === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <AnalyticsVasooliScreen
                  customers={customers}
                  onBack={() => setActiveScreen('home')}
                  onRemindAll={() => {
                    showToast('✓ WhatsApp reminders queued for all 3 overdue grahaks');
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Modals Overlays */}
        <AnimatePresence>
          {quickAddOpen && (
            <QuickAddModal
              isOpen={quickAddOpen}
              type={quickAddType}
              initialCustomer={quickAddCustomer}
              customers={customers}
              onClose={() => setQuickAddOpen(false)}
              onConfirm={handleConfirmQuickAdd}
            />
          )}

          {reminderOpen && (
            <PaymentReminderModal
              isOpen={reminderOpen}
              customer={selectedCustomer || customers[0]}
              onClose={() => setReminderOpen(false)}
              onSendSuccess={() => {
                setReminderOpen(false);
                showToast(`✓ Reminder sent via WhatsApp to ${selectedCustomer?.name || 'Customer'}`);
              }}
            />
          )}

          {qrModalOpen && (
            <CounterQrModal
              isOpen={qrModalOpen}
              amount={qrAmount}
              customerName={selectedCustomer?.name}
              onClose={() => setQrModalOpen(false)}
              onSimulatePaid={handleSimulateQrPayment}
            />
          )}

          {voiceModalOpen && (
            <VoiceLogModal
              isOpen={voiceModalOpen}
              onClose={() => setVoiceModalOpen(false)}
              onVoiceLogged={handleVoiceLogged}
            />
          )}

          {addCustomerOpen && (
            <AddCustomerModal
              isOpen={addCustomerOpen}
              onClose={() => setAddCustomerOpen(false)}
              onAddCustomer={(newCust) => {
                setCustomers(prev => [newCust, ...prev]);
                setSelectedCustomer(newCust);
                showToast(`✓ Naya grahak ${newCust.name} joda gaya!`);
              }}
            />
          )}
        </AnimatePresence>

        {/* Native Mobile Bottom Navigation Bar with Direct Counter Actions */}
        {activeScreen !== 'launch' && (
          <div className="absolute bottom-0 inset-x-0 bg-[#FAF6EF]/95 backdrop-blur-md border-t border-[#E5D9CA] px-4 pt-2.5 pb-4 z-40 flex items-center justify-between shadow-warm-lg">
            {/* 1. Home / Dukaan */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeScreen === 'home' ? 'text-[#C85C32]' : 'text-[#766A61] hover:text-[#29211D]'
              }`}
            >
              <StoreIcon className="w-5 h-5" />
              <span className="text-[10px] font-black">Dukaan</span>
            </motion.button>

            {/* 2. Customer Ledger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveScreen('ledger')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeScreen === 'ledger' ? 'text-[#C85C32]' : 'text-[#766A61] hover:text-[#29211D]'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-black">Ledger</span>
            </motion.button>

            {/* 3. Center Counter Action: + Diya (Udhaar) in Terracotta */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => handleOpenQuickAdd('credit')}
              className="px-3.5 py-2.5 rounded-2xl bg-[#C85C32] text-white font-black text-xs flex items-center gap-1.5 shadow-glow-terracotta border border-white/20 active:brightness-95"
            >
              <span>+ Diya</span>
            </motion.button>

            {/* 4. Center Counter Action: + Liya (Jama) in Olive */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => handleOpenQuickAdd('payment')}
              className="px-3.5 py-2.5 rounded-2xl bg-[#71835C] text-white font-black text-xs flex items-center gap-1.5 shadow-glow-olive border border-white/20 active:brightness-95"
            >
              <span>+ Liya</span>
            </motion.button>

            {/* 5. Vasooli Analytics */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveScreen('analytics')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeScreen === 'analytics' ? 'text-[#C85C32]' : 'text-[#766A61] hover:text-[#29211D]'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-black">Vasooli</span>
            </motion.button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
