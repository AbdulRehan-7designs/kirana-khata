import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Mic, Sparkles, Check } from 'lucide-react';

interface VoiceLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceLogged: (data: { customerName: string; amount: number; items: string }) => void;
}

export const VoiceLogModal: React.FC<VoiceLogModalProps> = ({
  isOpen,
  onClose,
  onVoiceLogged
}) => {
  const [phase, setPhase] = useState<'listening' | 'parsed' | 'confirmed'>('listening');
  const [spokenText, setSpokenText] = useState('');

  const sampleVoicePhrases = [
    { text: "Ramesh bhaiya 350 udhaar atta aur tel", name: "Ramesh Bhaiya", amount: 350, items: "Atta aur Tel" },
    { text: "Gupta ji 500 jama PhonePe se", name: "Gupta Ji", amount: 500, items: "UPI Payment" },
    { text: "Sunita didi 120 udhaar Maggie biscuit", name: "Sunita Didi", amount: 120, items: "Maggie & Biscuit" },
  ];

  const [selectedPhrase, setSelectedPhrase] = useState(sampleVoicePhrases[0]);

  useEffect(() => {
    if (isOpen) {
      setPhase('listening');
      setSpokenText('');
      const timer = setTimeout(() => {
        setSpokenText(selectedPhrase.text);
        setPhase('parsed');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedPhrase]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setPhase('confirmed');
    setTimeout(() => {
      onVoiceLogged({
        customerName: selectedPhrase.name,
        amount: selectedPhrase.amount,
        items: selectedPhrase.items
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-sm bg-[#FAF6EF] rounded-3xl p-5 border border-[#E5D9CA] shadow-2xl relative text-center"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2E8D9] text-[#766A61] flex items-center justify-center hover:bg-[#E5D9CA]"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-black text-base text-[#29211D]">Hands-Free Bol-Khata (Voice)</h3>
        <p className="text-xs text-[#766A61] mt-0.5">Counter par bina haath lagaye entry karein</p>

        {/* Pulsing Mic Waveform */}
        <div className="my-6 relative flex items-center justify-center">
          <motion.div
            animate={{ scale: phase === 'listening' ? [1, 1.35, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-24 h-24 rounded-full bg-[#C85C32]/20 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#C85C32] text-white flex items-center justify-center shadow-lg shadow-[#C85C32]/40">
              <Mic className="w-8 h-8" />
            </div>
          </motion.div>
        </div>

        {/* Transcription bubble */}
        <div className="bg-white rounded-2xl border border-[#E5D9CA] p-3.5 mb-4 shadow-sm min-h-[72px] flex items-center justify-center">
          {phase === 'listening' ? (
            <div className="flex items-center gap-2 text-xs text-[#766A61] font-medium animate-pulse">
              <Sparkles className="w-4 h-4 text-[#C85C32]" />
              Sun rahe hain... Bolna shuru karein
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-[11px] font-semibold text-[#766A61]">Recognized Speech:</div>
              <div className="text-xs font-bold text-[#29211D] mt-0.5">"{spokenText}"</div>
            </motion.div>
          )}
        </div>

        {/* AI Parsed Intent Card */}
        {phase === 'parsed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#E7EBDD] border border-[#71835C]/40 rounded-2xl p-3 mb-4 text-left"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#71835C] mb-1">
              ✓ AI Parsed in 0.4s:
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#29211D]">{selectedPhrase.name}</span>
              <span className="font-black text-sm text-[#C85C32]">₹{selectedPhrase.amount}</span>
            </div>
            <div className="text-[11px] text-[#766A61] mt-0.5">
              Items: {selectedPhrase.items}
            </div>
          </motion.div>
        )}

        {/* Sample phrases chips for instant test */}
        <div className="text-left mb-3">
          <div className="text-[10px] font-bold uppercase text-[#766A61] mb-1">Tap phrase to test:</div>
          <div className="flex flex-col gap-1.5">
            {sampleVoicePhrases.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedPhrase(p);
                  setPhase('listening');
                }}
                className={`text-left text-xs p-2 rounded-xl border transition-all ${
                  selectedPhrase.text === p.text 
                    ? 'bg-[#F2E8D9] border-[#C85C32] font-semibold text-[#29211D]' 
                    : 'bg-white border-[#E5D9CA] text-[#766A61]'
                }`}
              >
                "{p.text}"
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={phase === 'listening'}
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-2xl bg-[#C85C32] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#C85C32]/30 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span>Confirm &amp; Save Entry</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
