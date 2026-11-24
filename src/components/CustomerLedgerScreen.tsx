import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Phone, 
  Send, 
  QrCode, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Customer, KhataTransaction } from '../data/khataData';

interface CustomerLedgerScreenProps {
  customer: Customer;
  transactions: KhataTransaction[];
  onBack: () => void;
  onOpenReminder: () => void;
  onOpenQr: (amount: number) => void;
  onAddTransaction: (type: 'credit' | 'payment') => void;
}

export const CustomerLedgerScreen: React.FC<CustomerLedgerScreenProps> = ({
  customer,
  transactions,
  onBack,
  onOpenReminder,
  onOpenQr,
  onAddTransaction
}) => {
  const customerTxs = transactions.filter(t => t.customerId === customer.id);

  // Calculate detailed financial breakdown
  const totalGiven = customerTxs
    .filter(t => t.type === 'credit')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalPaid = customerTxs
    .filter(t => t.type === 'payment')
    .reduce((acc, t) => acc + t.amount, 0);

  // Remaining net due
  const netDue = customer.udhaarDue;

  return (
    <div className="flex flex-col h-full bg-[#FAF6EF] text-[#29211D] overflow-y-auto pb-28 select-none">
      
      {/* Sleek Header */}
      <div className="px-4 py-3 warm-glass border-b border-[#E5D9CA] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white border border-[#E5D9CA] flex items-center justify-center text-[#29211D] shadow-warm-sm"
          >
            <ArrowLeft className="w-5 h-5 text-[#29211D]" />
          </motion.button>
          <div>
            <h1 className="font-extrabold text-[15px] text-[#29211D] leading-tight flex items-center gap-1.5">
              <span>{customer.name}</span>
            </h1>
            <p className="text-[11px] text-[#766A61] font-medium">{customer.phone} • {customer.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.a 
            whileTap={{ scale: 0.9 }}
            href={`tel:${customer.phone}`}
            className="w-10 h-10 rounded-2xl bg-[#E7EBDD] text-[#71835C] border border-[#71835C]/20 flex items-center justify-center shadow-warm-sm"
          >
            <Phone className="w-4 h-4" />
          </motion.a>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onOpenReminder}
            className="w-10 h-10 rounded-2xl bg-[#E98A55]/15 text-[#C85C32] border border-[#E98A55]/30 flex items-center justify-center shadow-warm-sm"
            title="Send WhatsApp Reminder"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        
        {/* Main Due Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[28px] bg-white border border-[#E5D9CA] p-5 shadow-warm-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#F2E8D9]/40 rounded-bl-[100px] pointer-events-none" />

          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-extrabold text-[#766A61] uppercase tracking-widest block">
                Net Remaining Due (Kul Baki)
              </span>
              <div className="text-3xl font-black text-[#C85C32] tracking-tight mt-1 flex items-baseline">
                <span className="text-2xl mr-1 font-extrabold text-[#E98A55]">₹</span>
                {netDue.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold shadow-sm ${
                netDue === 0 
                  ? 'bg-[#E7EBDD] text-[#71835C] border-[#71835C]/30' 
                  : 'bg-[#FAF6EF] text-[#766A61] border-[#E5D9CA]'
              }`}>
                {netDue === 0 ? <CheckCircle2 className="w-3.5 h-3.5 text-[#71835C]" /> : <ShieldCheck className="w-3.5 h-3.5 text-[#71835C]" />}
                {netDue === 0 ? 'Hisaab Chukta' : customer.trustScore}
              </span>
              {netDue > 0 && (
                <div className="text-[10px] text-[#766A61] font-semibold mt-1 flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3 text-[#C85C32]" />
                  Pending {customer.pendingDays} days
                </div>
              )}
            </div>
          </div>

          {/* Detailed Paid vs Owes Breakdown Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-[#E5D9CA]/80">
            {/* Total Given (Udhaar) */}
            <div className="bg-[#FAF6EF] rounded-2xl p-2.5 border border-[#E5D9CA]">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#766A61] uppercase tracking-wider">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C85C32]" />
                Kul Diya (Given)
              </div>
              <div className="text-base font-black text-[#C85C32] mt-0.5">
                ₹{totalGiven.toLocaleString('en-IN')}
              </div>
              <span className="text-[9px] text-[#766A61]">Sales on credit</span>
            </div>

            {/* Total Paid (Jama) */}
            <div className="bg-[#E7EBDD]/60 rounded-2xl p-2.5 border border-[#71835C]/30">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#71835C] uppercase tracking-wider">
                <ArrowDownLeft className="w-3.5 h-3.5 text-[#71835C]" />
                Kul Liya (Paid)
              </div>
              <div className="text-base font-black text-[#71835C] mt-0.5">
                ₹{totalPaid.toLocaleString('en-IN')}
              </div>
              <span className="text-[9px] text-[#71835C]/80">Amount received</span>
            </div>
          </div>

          {/* Quick settlement action buttons */}
          <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-[#E5D9CA]/60">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenQr(customer.udhaarDue)}
              className="py-2.5 px-3 rounded-2xl bg-[#F2E8D9] border border-[#E5D9CA] text-xs font-black text-[#29211D] flex items-center justify-center gap-1.5 shadow-warm-sm active:bg-[#E5D9CA]"
            >
              <QrCode className="w-4 h-4 text-[#C85C32]" />
              Counter QR
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenReminder}
              className="py-2.5 px-3 rounded-2xl bg-[#C85C32] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-glow-terracotta active:brightness-95"
            >
              <Send className="w-4 h-4 text-[#E98A55]" />
              Remind (WhatsApp)
            </motion.button>
          </div>
        </motion.div>

        {/* Ledger Column Headings */}
        <div className="flex items-center justify-between text-[10px] font-extrabold text-[#766A61] px-2 uppercase tracking-widest pt-1">
          <span>Entries ({customerTxs.length})</span>
          <div className="flex gap-8">
            <span className="text-[#C85C32]">Diya (Gave)</span>
            <span className="text-[#71835C]">Liya (Got)</span>
          </div>
        </div>

        {/* Traditional Two-Column Ledger Entry Feed */}
        <div className="space-y-2">
          {customerTxs.length === 0 ? (
            <div className="text-center py-8 text-[#766A61] text-xs bg-white rounded-3xl border border-[#E5D9CA] p-5 shadow-warm-sm">
              <FileSpreadsheet className="w-8 h-8 text-[#E5D9CA] mx-auto mb-2" />
              Koi entry nahi hai. Niche diye button se pehla udhaar ya jama karein.
            </div>
          ) : (
            customerTxs.map((tx, idx) => {
              const isCredit = tx.type === 'credit';
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-2xl border border-[#E5D9CA] p-3 flex items-center justify-between shadow-warm-sm hover:border-[#C85C32]/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 shadow-warm-inner ${
                      isCredit ? 'bg-[#C85C32]/10 text-[#C85C32]' : 'bg-[#71835C]/10 text-[#71835C]'
                    }`}>
                      {isCredit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-[#29211D]">{tx.items || 'Kirana items'}</div>
                      <div className="text-[10px] text-[#766A61] flex items-center gap-1.5 mt-0.5 font-medium">
                        <span>{tx.timestamp}</span>
                        {tx.method && (
                          <span className="bg-[#FAF6EF] text-[#29211D] font-bold px-1.5 py-0.2 rounded border border-[#E5D9CA]">
                            {tx.method.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-black text-sm tracking-tight ${isCredit ? 'text-[#C85C32]' : 'text-[#71835C]'}`}>
                      {isCredit ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                    </div>
                    <span className={`text-[9px] uppercase font-black ${isCredit ? 'text-[#C85C32]' : 'text-[#71835C]'}`}>
                      {isCredit ? 'Udhaar' : 'Paid'}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
