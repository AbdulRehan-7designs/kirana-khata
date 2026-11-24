import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UserPlus, Phone, MapPin, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Customer } from '../data/khataData';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (newCustomer: Customer) => void;
}

const AVATAR_OPTIONS = ['👨‍🌾', '👴', '👩', '🧔', '🧑‍🎨', '🥛', '📚', '🌸', '🛺', '💊', '🥖', '🏬'];

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onAddCustomer
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('👨‍🌾');
  const [openingBalance, setOpeningBalance] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initialDue = parseInt(openingBalance || '0', 10);

    const newCust: Customer = {
      id: `c_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim() ? (phone.startsWith('+91') ? phone : `+91 ${phone}`) : '+91 98000 00000',
      address: address.trim() || 'Local Customer',
      avatar: avatar,
      udhaarDue: isNaN(initialDue) ? 0 : initialDue,
      pendingDays: initialDue > 0 ? 1 : 0,
      trustScore: 'Regular',
      lastActive: 'Just added',
    };

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#C85C32', '#E98A55', '#71835C', '#FAF6EF']
    });

    onAddCustomer(newCust);
    onClose();

    // Reset form
    setName('');
    setPhone('');
    setAddress('');
    setOpeningBalance('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="w-full max-w-[420px] bg-[#FAF6EF] rounded-t-[36px] p-5 shadow-2xl border-t border-[#E5D9CA] flex flex-col max-h-[92vh] overflow-y-auto"
      >
        <div className="w-12 h-1.5 rounded-full bg-[#E5D9CA] mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#C85C32] text-white flex items-center justify-center shadow-glow-terracotta">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#29211D]">Naya Grahak Jodein</h2>
              <p className="text-[10px] text-[#766A61] font-medium">Add new customer to Bahi-Khata</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2E8D9] text-[#766A61] flex items-center justify-center hover:bg-[#E5D9CA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Avatar Selector Strip */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1.5 block">
              Choose Avatar Icon
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAvatar(opt)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 border transition-all ${
                    avatar === opt 
                      ? 'bg-[#F2E8D9] border-[#C85C32] scale-105 shadow-sm' 
                      : 'bg-white border-[#E5D9CA] hover:border-[#C85C32]/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1 block">
              Grahak Ka Naam (Name) *
            </label>
            <input 
              type="text"
              required
              placeholder="e.g. Raju Sharma, Verma Bhaiya..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#E5D9CA] rounded-2xl px-3.5 py-2.5 text-xs text-[#29211D] placeholder-[#766A61]/70 focus:outline-none focus:ring-2 focus:ring-[#C85C32]/30 shadow-warm-sm"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1 block">
              Mobile Number (For WhatsApp Reminders)
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#766A61]" />
              <input 
                type="tel"
                placeholder="98XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-[#E5D9CA] rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-[#29211D] placeholder-[#766A61]/70 focus:outline-none focus:ring-2 focus:ring-[#C85C32]/30 shadow-warm-sm"
              />
            </div>
          </div>

          {/* Address / Landmark */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1 block">
              Gali / Landmark (Address)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#766A61]" />
              <input 
                type="text"
                placeholder="e.g. Near Temple, Gali No. 2..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-[#E5D9CA] rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-[#29211D] placeholder-[#766A61]/70 focus:outline-none focus:ring-2 focus:ring-[#C85C32]/30 shadow-warm-sm"
              />
            </div>
          </div>

          {/* Starting Balance (Optional) */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1 block">
              Pichhla Udhaar / Opening Balance (₹)
            </label>
            <input 
              type="number"
              placeholder="0 (Agar pehle se baki hai)"
              value={openingBalance}
              onChange={(e) => setOpeningBalance(e.target.value)}
              className="w-full bg-white border border-[#E5D9CA] rounded-2xl px-3.5 py-2.5 text-xs text-[#29211D] placeholder-[#766A61]/70 focus:outline-none focus:ring-2 focus:ring-[#C85C32]/30 shadow-warm-sm"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={!name.trim()}
            className={`w-full py-3.5 mt-2 rounded-2xl font-black text-white text-xs flex items-center justify-center gap-2 transition-all ${
              !name.trim() 
                ? 'bg-[#A3968C] cursor-not-allowed opacity-60' 
                : 'bg-[#C85C32] shadow-glow-terracotta active:brightness-95'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Grahak Add Karein</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
