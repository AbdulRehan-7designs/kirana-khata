import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { Customer } from '../data/khataData';

interface AnalyticsVasooliScreenProps {
  customers: Customer[];
  onBack: () => void;
  onRemindAll: () => void;
}

export const AnalyticsVasooliScreen: React.FC<AnalyticsVasooliScreenProps> = ({
  customers,
  onBack,
  onRemindAll
}) => {
  const totalUdhaar = customers.reduce((acc, c) => acc + c.udhaarDue, 0);
  const overdueCustomers = customers.filter(c => c.pendingDays > 7);

  return (
    <div className="flex flex-col h-full bg-[#FAF6EF] text-[#29211D] overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-4 py-3 bg-[#FAF6EF] border-b border-[#E5D9CA] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#F2E8D9] flex items-center justify-center text-[#29211D]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-sm text-[#29211D]">Vasooli Health &amp; Analytics</h1>
            <p className="text-[11px] text-[#766A61]">Kirana Vyapaar Insights</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#E7EBDD] text-[#71835C] text-xs font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Grade A+
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Recovery Score Radial/Ring Card */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white border border-[#E5D9CA] p-5 shadow-sm text-center"
        >
          <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-8 border-[#71835C] bg-[#E7EBDD]/40 mb-3 shadow-inner">
            <span className="text-3xl font-black text-[#29211D]">94%</span>
            <span className="text-[10px] font-bold uppercase text-[#71835C]">Recovery Rate</span>
          </div>

          <h2 className="font-extrabold text-sm text-[#29211D]">Healthy Cashflow!</h2>
          <p className="text-xs text-[#766A61] max-w-xs mx-auto mt-1">
            Grahak settle udhaar within an average of 4.8 days. 3x faster than paper diaries.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E5D9CA] text-center">
            <div className="bg-[#FAF6EF] p-2 rounded-2xl">
              <span className="text-[10px] text-[#766A61] block font-semibold">Total Given</span>
              <span className="font-bold text-xs text-[#29211D]">₹48,500</span>
            </div>
            <div className="bg-[#FAF6EF] p-2 rounded-2xl">
              <span className="text-[10px] text-[#766A61] block font-semibold">Collected</span>
              <span className="font-bold text-xs text-[#71835C]">₹42,020</span>
            </div>
            <div className="bg-[#FAF6EF] p-2 rounded-2xl">
              <span className="text-[10px] text-[#766A61] block font-semibold">Remaining</span>
              <span className="font-bold text-xs text-[#C85C32]">₹{totalUdhaar}</span>
            </div>
          </div>
        </motion.div>

        {/* Priority Vasooli Action Card */}
        <div className="rounded-3xl bg-[#F2E8D9] border border-[#E5D9CA] p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C85C32]" />
              <h3 className="font-bold text-xs text-[#29211D]">Action Needed ({overdueCustomers.length})</h3>
            </div>
            <span className="text-xs text-[#C85C32] font-bold">&gt; 7 Days Overdue</span>
          </div>

          <div className="space-y-2 mb-3">
            {overdueCustomers.map(c => (
              <div key={c.id} className="bg-white p-3 rounded-2xl border border-[#E5D9CA] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#29211D]">{c.name}</div>
                  <div className="text-[10px] text-[#C85C32] font-semibold">{c.pendingDays} days pending</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xs text-[#C85C32]">₹{c.udhaarDue}</div>
                  <span className="text-[9px] text-[#766A61]">Follow up</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onRemindAll}
            className="w-full py-3 rounded-2xl bg-[#C85C32] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#C85C32]/30 active:scale-95 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-[#E98A55]" />
            Send 1-Click WhatsApp Reminders to Overdue
          </button>
        </div>
      </div>
    </div>
  );
};
