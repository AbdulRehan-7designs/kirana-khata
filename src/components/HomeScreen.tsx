import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Mic,
  QrCode,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Flame,
  UserPlus
} from 'lucide-react';
import { Customer, KhataTransaction } from '../data/khataData';

interface HomeScreenProps {
  customers: Customer[];
  transactions: KhataTransaction[];
  onOpenQuickAdd: (type: 'credit' | 'payment', customer?: Customer) => void;
  onSelectCustomer: (customer: Customer) => void;
  onOpenQr: (amount?: number) => void;
  onOpenVoice: () => void;
  onOpenAnalytics: () => void;
  onOpenAddCustomer: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  customers,
  transactions,
  onOpenQuickAdd,
  onSelectCustomer,
  onOpenQr,
  onOpenVoice,
  onOpenAnalytics,
  onOpenAddCustomer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'due' | 'settled'>('all');

  const totalUdhaar = customers.reduce((acc, c) => acc + c.udhaarDue, 0);
  const totalSettledToday = transactions
    .filter(t => t.type === 'payment' && t.timestamp.includes('Today'))
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
    if (!matchesSearch) return false;
    if (activeFilter === 'due') return c.udhaarDue > 0;
    if (activeFilter === 'settled') return c.udhaarDue === 0;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#FAF6EF] text-[#29211D] overflow-y-auto pb-28 select-none">

      {/* Sleek Top Navigation Bar with Warm Glass */}
      <div className="px-5 pt-3.5 pb-3 flex items-center justify-between border-b border-[#E5D9CA]/70 warm-glass sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C85C32] text-white flex items-center justify-center font-black text-lg shadow-glow-terracotta relative overflow-hidden group">
            <span className="relative z-10">खा</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-[15px] tracking-tight text-[#29211D]">Lakshmi Kirana</h1>
              <span className="w-2 h-2 rounded-full bg-[#71835C] ring-4 ring-[#71835C]/20 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-[#766A61] font-medium flex items-center gap-1">
              <span>Bahi Khata</span> • <span className="text-[#C85C32] font-semibold">One-Hand Desk</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onOpenQr()}
            className="w-10 h-10 rounded-2xl bg-white border border-[#E5D9CA] flex items-center justify-center text-[#29211D] shadow-warm-sm hover:border-[#C85C32]/40 transition-colors"
            title="Counter QR"
          >
            <QrCode className="w-4 h-4 text-[#C85C32]" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onOpenAnalytics}
            className="px-3 py-2 rounded-2xl bg-[#E7EBDD] text-[#71835C] border border-[#71835C]/25 text-xs font-bold flex items-center gap-1.5 shadow-warm-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#71835C]" />
            <span>94%</span>
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Softly Sculpted Espresso Financial Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[28px] espresso-gradient text-[#FAF6EF] p-5 shadow-warm-lg border border-white/10"
        >
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#C85C32]/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-[#E98A55]/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#E5D9CA]/80 font-bold flex items-center gap-1.5">
                Market Vasooli (Total Udhaar)
              </span>
              <div className="text-3xl font-black tracking-tight mt-1 flex items-baseline gap-1.5 text-white">
                <span className="text-[#E98A55] text-2xl font-normal">₹</span>
                {totalUdhaar.toLocaleString('en-IN')}
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E98A55] border border-[#E98A55]/30 text-[11px] font-bold flex items-center gap-1 shadow-sm">
              <TrendingDown className="w-3.5 h-3.5" />
              -12% wk
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-3.5 border-t border-white/10">
            <div className="bg-white/[0.08] backdrop-blur-sm rounded-2xl p-2.5 border border-white/5">
              <span className="text-[#E5D9CA]/70 block text-[11px] font-medium">Aaj Vasooli (Settled)</span>
              <span className="font-extrabold text-sm text-[#E7EBDD] flex items-center gap-1 mt-0.5">
                <ArrowDownLeft className="w-3.5 h-3.5 text-[#71835C]" />
                +₹{totalSettledToday.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-white/[0.08] backdrop-blur-sm rounded-2xl p-2.5 border border-white/5">
              <span className="text-[#E5D9CA]/70 block text-[11px] font-medium">Active Grahak</span>
              <span className="font-extrabold text-sm text-[#FAF6EF] flex items-center gap-1.5 mt-0.5">
                <span>👥</span> {customers.length} Accounts
              </span>
            </div>
          </div>
        </motion.div>

        {/* Counter Ergonomic Fast Bar: Soft Search + Voice Pill */}
        <div className="flex gap-2.5 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#766A61]" />
            <input
              type="text"
              placeholder="Search name, phone or bill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5D9CA] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#29211D] placeholder-[#766A61]/70 focus:outline-none focus:ring-2 focus:ring-[#C85C32]/30 shadow-warm-sm transition-all"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onOpenVoice}
            className="w-12 h-12 rounded-2xl bg-[#C85C32] text-white flex items-center justify-center shadow-glow-terracotta relative active:brightness-95 flex-shrink-0"
            title="Voice Record Entry"
          >
            <Mic className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E98A55] rounded-full border-2 border-[#FAF6EF] animate-ping" />
          </motion.button>
        </div>

        {/* 1-Tap Counter Frequent Customer Pills */}
        <div>
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#766A61] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#C85C32]" />
              Quick Counter Tap (Frequent)
            </h2>
            <button
              onClick={onOpenAddCustomer}
              className="text-[11px] text-[#C85C32] font-black hover:underline flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              + Naya Grahak
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
            {/* Quick Add New Customer Card */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onOpenAddCustomer}
              className="flex-shrink-0 bg-[#F2E8D9]/70 border-2 border-dashed border-[#C85C32]/50 rounded-2xl p-2.5 flex flex-col items-center justify-center min-w-[82px] text-center shadow-warm-sm hover:border-[#C85C32] transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#C85C32] mb-1 shadow-sm">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black text-[#C85C32]">+ Add</span>
              <span className="text-[9px] font-bold text-[#766A61]">Grahak</span>
            </motion.button>

            {customers.slice(0, 4).map((cust) => (
              <motion.button
                key={cust.id}
                whileTap={{ scale: 0.94 }}
                whileHover={{ y: -2 }}
                onClick={() => onOpenQuickAdd('credit', cust)}
                className="flex-shrink-0 bg-white border border-[#E5D9CA] rounded-2xl p-2.5 flex flex-col items-center min-w-[82px] text-center shadow-warm-sm hover:border-[#C85C32]/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F2E8D9] flex items-center justify-center text-xl mb-1 group-hover:scale-105 transition-transform">
                  {cust.avatar}
                </div>
                <span className="text-xs font-bold text-[#29211D] truncate w-16">{cust.name.split(' ')[0]}</span>
                <span className="text-[11px] font-extrabold text-[#C85C32] mt-0.5">₹{cust.udhaarDue}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filter Pill Strip */}
        <div className="flex items-center gap-1.5 bg-[#F2E8D9] p-1.5 rounded-2xl border border-[#E5D9CA]/60">
          {[
            { id: 'all', label: `All Grahak (${customers.length})` },
            { id: 'due', label: 'Baki (Pending)' },
            { id: 'settled', label: 'Chukta (Settled)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === f.id
                ? 'bg-white text-[#29211D] shadow-warm-sm'
                : 'text-[#766A61] hover:text-[#29211D]'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Customer Ledger Feed */}
        <div className="space-y-2.5">
          <AnimatePresence>
            {filteredCustomers.map((cust, idx) => {
              const isOverdue = cust.pendingDays > 7;
              return (
                <motion.div
                  key={cust.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectCustomer(cust)}
                  className="p-3.5 rounded-2xl bg-white border border-[#E5D9CA] shadow-warm-sm flex items-center justify-between cursor-pointer hover:border-[#C85C32]/30 active:bg-[#F2E8D9]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-[#F2E8D9] border border-[#E5D9CA]/70 flex items-center justify-center text-xl shadow-warm-inner">
                        {cust.avatar}
                      </div>
                      {isOverdue && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C85C32] border-2 border-white flex items-center justify-center text-[9px] text-white font-black shadow-sm">!</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#29211D] flex items-center gap-1.5">
                        {cust.name}
                        {cust.udhaarDue === 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7EBDD] text-[#71835C] font-extrabold border border-[#71835C]/20">
                            Chukta
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#766A61] flex items-center gap-1.5 mt-0.5">
                        <span>{cust.address}</span>
                        <span>•</span>
                        <span className={isOverdue ? 'text-[#C85C32] font-semibold' : ''}>
                          {cust.pendingDays > 0 ? `${cust.pendingDays}d pending` : 'All clear'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2.5">
                    <div>
                      <div className={`font-black text-sm tracking-tight ${cust.udhaarDue > 0 ? 'text-[#C85C32]' : 'text-[#71835C]'}`}>
                        ₹{cust.udhaarDue.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-[#766A61] font-semibold">
                        {cust.udhaarDue > 0 ? 'Due' : 'Paid'}
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-[#FAF6EF] flex items-center justify-center text-[#766A61]/70">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
