import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Delete, Check, UserCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Customer } from '../data/khataData';

interface QuickAddModalProps {
  isOpen: boolean;
  type: 'credit' | 'payment';
  initialCustomer?: Customer | null;
  customers: Customer[];
  onClose: () => void;
  onConfirm: (data: { customerId: string; customerName: string; amount: number; items: string; type: 'credit' | 'payment' }) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  type,
  initialCustomer,
  customers,
  onClose,
  onConfirm
}) => {
  const [selectedCust, setSelectedCust] = useState<Customer | null>(initialCustomer || customers[0] || null);
  const [amountStr, setAmountStr] = useState<string>('');
  const [itemNote, setItemNote] = useState<string>('Daily Grocery');
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (isOpen) {
      setTimer(0);
      setAmountStr('');
      setSelectedCust(initialCustomer || customers[0] || null);
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, initialCustomer, customers]);

  if (!isOpen) return null;

  const handleNumClick = (digit: string) => {
    if (amountStr.length >= 6) return;
    setAmountStr(prev => prev + digit);
  };

  const handleBackspace = () => {
    setAmountStr(prev => prev.slice(0, -1));
  };

  const handleAddPreset = (val: number) => {
    const cur = parseInt(amountStr || '0', 10);
    setAmountStr(String(cur + val));
  };

  const handleDone = () => {
    const amount = parseInt(amountStr, 10);
    if (!amount || amount <= 0 || !selectedCust) return;

    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#C85C32', '#E98A55', '#71835C', '#FAF6EF']
    });

    onConfirm({
      customerId: selectedCust.id,
      customerName: selectedCust.name,
      amount,
      items: itemNote,
      type
    });
  };

  const isCredit = type === 'credit';
  const accentColor = isCredit ? '#C85C32' : '#71835C';
  const glowShadow = isCredit ? 'shadow-glow-terracotta' : 'shadow-glow-olive';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="w-full max-w-[420px] bg-[#FAF6EF] rounded-t-[36px] p-5 shadow-2xl border-t border-[#E5D9CA] flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Grab indicator */}
        <div className="w-12 h-1.5 rounded-full bg-[#E5D9CA] mx-auto mb-3" />

        {/* Header Bar & Speed Timer Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black text-white flex items-center gap-1.5 shadow-sm" style={{ backgroundColor: accentColor }}>
              {isCredit ? 'Diya (Gave Udhaar)' : 'Liya (Payment Received)'}
            </span>
            <span className="text-[11px] font-mono font-bold text-[#766A61] bg-[#F2E8D9] border border-[#E5D9CA] px-2.5 py-0.5 rounded-lg flex items-center gap-1">
              <span>⚡</span> {timer}s / &lt;10s
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2E8D9] text-[#766A61] flex items-center justify-center hover:bg-[#E5D9CA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer Select Slider (Top One-Hand Tap) */}
        <div className="mb-2.5">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1.5 block">
            Select Grahak (Customer)
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {customers.map((c) => {
              const isSelected = selectedCust?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCust(c)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                    isSelected 
                      ? 'bg-[#29211D] text-white border-[#29211D] shadow-warm-sm' 
                      : 'bg-white text-[#29211D] border-[#E5D9CA] hover:border-[#C85C32]/30'
                  }`}
                >
                  <span className="text-sm">{c.avatar}</span>
                  <span>{c.name.split(' ')[0]}</span>
                  {isSelected && <UserCheck className="w-3.5 h-3.5 text-[#E98A55]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Big Crisp Amount Card */}
        <div className="bg-white rounded-[24px] border border-[#E5D9CA] p-4 text-center my-1 relative shadow-warm-md">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#766A61]">Enter Amount</div>
          <div className="text-4xl font-black tracking-tight text-[#29211D] flex items-center justify-center min-h-[52px]">
            <span className="text-2xl text-[#E98A55] mr-1.5 font-bold">₹</span>
            {amountStr ? parseInt(amountStr, 10).toLocaleString('en-IN') : <span className="text-[#E5D9CA]/90">0</span>}
          </div>

          {/* Quick preset chips */}
          <div className="flex justify-center gap-1.5 mt-2">
            {[50, 100, 200, 500].map((val) => (
              <button
                key={val}
                onClick={() => handleAddPreset(val)}
                className="px-3 py-1 rounded-xl bg-[#FAF6EF] border border-[#E5D9CA] text-xs font-extrabold text-[#29211D] active:scale-95 hover:border-[#C85C32]/40 transition-all shadow-sm"
              >
                +₹{val}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Item Note Chips */}
        <div className="flex items-center gap-1.5 my-2 overflow-x-auto scrollbar-none py-0.5">
          {['Ration / Kirana', 'Milk & Bread', 'Mustard Oil', 'Spices', 'Tobacco'].map((chip) => (
            <button
              key={chip}
              onClick={() => setItemNote(chip)}
              className={`text-[11px] px-3 py-1 rounded-full border whitespace-nowrap transition-all ${
                itemNote === chip 
                  ? 'bg-[#E98A55]/20 border-[#E98A55] text-[#C85C32] font-black shadow-sm' 
                  : 'bg-white border-[#E5D9CA] text-[#766A61] font-semibold'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Tactile Counter NumPad (High-contrast, generous tap target) */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((digit) => (
            <motion.button
              key={digit}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleNumClick(digit)}
              className="h-12 rounded-2xl bg-white border border-[#E5D9CA] text-xl font-black text-[#29211D] shadow-warm-sm flex items-center justify-center active:bg-[#F2E8D9] transition-colors"
            >
              {digit}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleBackspace}
            className="h-12 rounded-2xl bg-[#F2E8D9] border border-[#E5D9CA] text-[#29211D] flex items-center justify-center active:bg-[#E5D9CA] transition-colors shadow-warm-sm"
          >
            <Delete className="w-5 h-5 text-[#C85C32]" />
          </motion.button>
        </div>

        {/* 10-Second Confirmation Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={!amountStr || parseInt(amountStr, 10) <= 0}
          onClick={handleDone}
          className={`w-full py-4 mt-3 rounded-2xl font-black text-white text-sm flex items-center justify-center gap-2 transition-all ${
            !amountStr || parseInt(amountStr, 10) <= 0 
              ? 'bg-[#A3968C] cursor-not-allowed opacity-60' 
              : `${glowShadow} active:brightness-95`
          }`}
          style={{ backgroundColor: !amountStr ? '#A3968C' : accentColor }}
        >
          <Check className="w-5 h-5" />
          <span>Confirm {isCredit ? 'Udhaar' : 'Jama'} (₹{amountStr || 0})</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
