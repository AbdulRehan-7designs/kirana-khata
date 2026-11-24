import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, MessageCircle, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Customer } from '../data/khataData';

interface PaymentReminderModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSendSuccess: () => void;
}

export const PaymentReminderModal: React.FC<PaymentReminderModalProps> = ({
  isOpen,
  customer,
  onClose,
  onSendSuccess
}) => {
  const [tone, setTone] = useState<'friendly' | 'respectful' | 'firm'>('friendly');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !customer) return null;

  const upiLink = `upi://pay?pa=lakshmikirana@upi&pn=LakshmiStore&am=${customer.udhaarDue}&cu=INR`;

  const getToneMessage = () => {
    switch (tone) {
      case 'friendly':
        return `Namaste ${customer.name} Ji! 🙏 Asha hai aap kushal hain. Lakshmi Kirana ka pichhla hisaab ₹${customer.udhaarDue} baki hai. Fursat milte hi UPI se bhej dijiye: ${upiLink} - Dhanyawad!`;
      case 'respectful':
        return `Aadarniya ${customer.name} Ji, mahine ka hisaab chukta karne ka samay hai. Kul hisaab ₹${customer.udhaarDue} hai. Kripya is link se bhuqtan karein: ${upiLink}`;
      case 'firm':
        return `Notice: ${customer.name} Ji, aapka ₹${customer.udhaarDue} ka udhaar pichhle ${customer.pendingDays} dinon se baki hai. Naya saman lene se pehle kripya chukta karein: ${upiLink}`;
    }
  };

  const currentMessage = getToneMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="w-full max-w-[420px] bg-[#FAF6EF] rounded-t-[36px] p-5 shadow-2xl border-t border-[#E5D9CA] flex flex-col"
      >
        <div className="w-12 h-1.5 rounded-full bg-[#E5D9CA] mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#E98A55]/20 text-[#C85C32] flex items-center justify-center shadow-sm">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#29211D]">Payment Reminder Flow</h2>
              <p className="text-[10px] text-[#766A61] font-medium">Respectful recovery • Auto UPI deep link</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2E8D9] text-[#766A61] flex items-center justify-center hover:bg-[#E5D9CA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tone Selector Pills */}
        <div className="mb-3">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#766A61] mb-1.5 block">
            Choose Tone (Vyavhaar ke anusaar)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'friendly', label: '🙏 Namaste', desc: 'Friendly' },
              { id: 'respectful', label: '📅 Month-End', desc: 'Formal' },
              { id: 'firm', label: '🚨 Overdue', desc: 'Firm' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id as any)}
                className={`p-2 rounded-2xl border text-center transition-all ${
                  tone === t.id 
                    ? 'bg-[#C85C32] text-white border-[#C85C32] shadow-glow-terracotta' 
                    : 'bg-white text-[#29211D] border-[#E5D9CA] hover:border-[#C85C32]/30'
                }`}
              >
                <div className="text-xs font-black leading-tight">{t.label}</div>
                <div className={`text-[9px] mt-0.5 font-medium ${tone === t.id ? 'text-[#FAF6EF]/80' : 'text-[#766A61]'}`}>
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Preview Card */}
        <div className="bg-[#E7EBDD] border border-[#71835C]/30 rounded-[22px] p-3.5 mb-3 text-xs text-[#29211D] shadow-inner relative">
          <div className="flex items-center gap-1.5 font-extrabold text-[11px] text-[#71835C] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            WhatsApp Preview for {customer.name}:
          </div>
          <p className="leading-relaxed bg-white/95 p-3 rounded-xl border border-[#71835C]/20 text-[11px] font-medium text-[#29211D] shadow-sm">
            "{currentMessage}"
          </p>
        </div>

        {/* UPI Auto-Embedded Badge */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F2E8D9] rounded-2xl border border-[#E5D9CA] mb-3 text-xs shadow-warm-sm">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#29211D] text-[11px]">Auto-embedded UPI:</span>
            <span className="font-mono text-xs text-[#C85C32] font-black">₹{customer.udhaarDue}</span>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] font-bold text-[#766A61] hover:text-[#29211D] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#71835C]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Action Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onSendSuccess}
          className="w-full py-4 rounded-2xl bg-[#71835C] text-white font-black text-xs flex items-center justify-center gap-2 shadow-glow-olive hover:brightness-105 transition-all"
        >
          <Send className="w-4 h-4 text-white" />
          <span>Send via WhatsApp (1-Tap)</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
