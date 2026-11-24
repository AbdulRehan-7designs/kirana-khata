import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CounterQrModalProps {
  isOpen: boolean;
  amount?: number;
  customerName?: string;
  onClose: () => void;
  onSimulatePaid: () => void;
}

export const CounterQrModal: React.FC<CounterQrModalProps> = ({
  isOpen,
  amount,
  customerName,
  onClose,
  onSimulatePaid
}) => {
  if (!isOpen) return null;

  const handleSimulate = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onSimulatePaid();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm bg-[#FAF6EF] rounded-3xl p-5 border border-[#E5D9CA] shadow-2xl relative text-center"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2E8D9] text-[#766A61] flex items-center justify-center hover:bg-[#E5D9CA]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#C85C32] text-white mx-auto flex items-center justify-center font-bold text-xl mb-2 shadow-md shadow-[#C85C32]/25">
          खा
        </div>

        <h3 className="font-black text-base text-[#29211D]">Lakshmi Kirana Store</h3>
        <p className="text-xs text-[#766A61]">Counter Instant UPI QR</p>

        {/* Dynamic Amount Badge */}
        {amount && amount > 0 ? (
          <div className="my-3 py-2 px-4 rounded-2xl bg-[#E7EBDD] border border-[#71835C]/30 inline-block">
            <span className="text-xs text-[#71835C] font-semibold">Pre-set Amount for {customerName || 'Grahak'}:</span>
            <div className="text-2xl font-black text-[#29211D]">₹{amount.toLocaleString('en-IN')}</div>
          </div>
        ) : (
          <div className="my-3 py-1.5 px-3 rounded-xl bg-[#F2E8D9] border border-[#E5D9CA] inline-block text-xs font-semibold text-[#766A61]">
            Counter Any-Amount QR
          </div>
        )}

        {/* Stylized QR Matrix Card */}
        <div className="bg-white p-4 rounded-2xl border-2 border-[#C85C32]/30 shadow-md inline-block my-2">
          <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="currentColor">
            <rect width="100" height="100" fill="#FFFFFF" />
            <rect x="5" y="5" width="28" height="28" rx="4" fill="#29211D" />
            <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
            <rect x="13" y="13" width="12" height="12" rx="2" fill="#C85C32" />

            <rect x="67" y="5" width="28" height="28" rx="4" fill="#29211D" />
            <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
            <rect x="75" y="13" width="12" height="12" rx="2" fill="#C85C32" />

            <rect x="5" y="67" width="28" height="28" rx="4" fill="#29211D" />
            <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF" />
            <rect x="13" y="75" width="12" height="12" rx="2" fill="#C85C32" />

            <rect x="38" y="10" width="6" height="6" fill="#29211D" />
            <rect x="48" y="14" width="6" height="6" fill="#29211D" />
            <rect x="38" y="24" width="6" height="6" fill="#29211D" />
            <rect x="52" y="24" width="6" height="6" fill="#29211D" />
            
            <rect x="10" y="42" width="6" height="6" fill="#29211D" />
            <rect x="22" y="48" width="6" height="6" fill="#29211D" />
            <rect x="38" y="42" width="8" height="8" rx="2" fill="#C85C32" />
            <rect x="50" y="44" width="6" height="6" fill="#29211D" />
            <rect x="64" y="40" width="6" height="6" fill="#29211D" />
            <rect x="78" y="45" width="6" height="6" fill="#29211D" />
            <rect x="88" y="40" width="6" height="6" fill="#29211D" />

            <rect x="40" y="60" width="6" height="6" fill="#29211D" />
            <rect x="54" y="62" width="6" height="6" fill="#29211D" />
            <rect x="68" y="68" width="6" height="6" fill="#29211D" />
            <rect x="80" y="60" width="6" height="6" fill="#29211D" />
            <rect x="85" y="74" width="6" height="6" fill="#29211D" />
            <rect x="72" y="82" width="6" height="6" fill="#29211D" />
            <rect x="42" y="78" width="8" height="8" rx="2" fill="#C85C32" />
          </svg>

          <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-[#E5D9CA] text-[10px] font-bold text-[#766A61]">
            <span>GPay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#71835C] font-semibold my-2">
          <ShieldCheck className="w-4 h-4" />
          Zero Merchant Surcharge (NPCI)
        </div>

        {/* Demo Button to simulate customer paying */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSimulate}
          className="w-full mt-3 py-3 rounded-2xl bg-[#71835C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#71835C]/25"
        >
          <Check className="w-4 h-4" />
          <span>Simulate Received (Chukta)</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
