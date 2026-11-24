import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  BookOpen, 
  QrCode, 
  BellRing, 
  Store, 
  TrendingUp, 
  Zap,
  Repeat
} from 'lucide-react';

interface OpeningLaunchScreenProps {
  onGetStarted: () => void;
}

export const OpeningLaunchScreen: React.FC<OpeningLaunchScreenProps> = ({ onGetStarted }) => {
  const [step, setStep] = useState<'splash' | 'onboarding'>('splash');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Smart Dukaan",
      tagline: "Your Shop. Now Smarter.",
      desc: "Keep track of sales, credit, reminders and payments — all in one place behind a busy counter.",
      icon: (
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[#E98A55]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-br from-[#F2E8D9] to-[#FAF6EF] border-2 border-[#E5D9CA] shadow-warm-lg flex flex-col items-center justify-center p-3 text-center">
            <span className="text-5xl mb-2">🏪</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#C85C32] bg-[#FAF6EF] px-2 py-0.5 rounded-full border border-[#E5D9CA]">
              KIRANA DESK
            </span>
            <span className="text-[11px] font-bold text-[#29211D] mt-1">Lakshmi Store</span>
          </div>
        </div>
      ),
      pill: "A Smarter Way to Run Your Kirana",
    },
    {
      badge: "No More Notebooks",
      tagline: "Record Credit in Seconds",
      desc: "Add udhaar, track payments and never miss a single rupee — all from your phone in under 10 seconds.",
      icon: (
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[#C85C32]/15 rounded-full blur-2xl pointer-events-none" />
          {/* Traditional Bahi book transitioning to phone */}
          <div className="relative w-40 h-32 rounded-2xl bg-[#C85C32] text-white p-3 shadow-warm-lg border border-white/20 transform -rotate-3">
            <div className="text-[9px] font-bold tracking-widest text-[#FAF6EF]/80 uppercase">बही-खाता (Notebook)</div>
            <div className="bg-white/90 text-[#29211D] rounded-xl p-2 mt-1.5 space-y-1 text-[10px] font-bold shadow-inner">
              <div className="flex justify-between border-b border-[#E5D9CA] pb-0.5">
                <span>Ramesh</span> <span className="text-[#C85C32]">₹450</span>
              </div>
              <div className="flex justify-between border-b border-[#E5D9CA] pb-0.5">
                <span>Ayesha</span> <span className="text-[#C85C32]">₹320</span>
              </div>
              <div className="flex justify-between text-[#71835C]">
                <span>Imran</span> <span>₹800 ✓</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#71835C] text-white flex items-center justify-center shadow-md">
              <Check className="w-4 h-4" />
            </div>
          </div>
        </div>
      ),
      pill: "⚡ 3-Tap Counter Speed",
    },
    {
      badge: "Fast. Safe. Easy.",
      tagline: "Get Paid with Instant UPI",
      desc: "Let your customers pay instantly with PhonePe, GPay, Paytm or BHIM with zero transaction fees.",
      icon: (
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[#71835C]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative w-36 h-36 rounded-3xl bg-white border-2 border-[#71835C]/30 shadow-warm-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-4 bg-[#71835C]/20 rounded-md text-[8px] font-black text-[#71835C] flex items-center justify-center mb-1">
              UPI
            </div>
            {/* Simulated mini QR */}
            <div className="w-16 h-16 bg-[#FAF6EF] border border-[#E5D9CA] rounded-xl p-1.5 flex flex-wrap gap-1 items-center justify-center">
              <div className="w-5 h-5 bg-[#29211D] rounded" />
              <div className="w-5 h-5 bg-[#C85C32] rounded" />
              <div className="w-5 h-5 bg-[#71835C] rounded" />
              <div className="w-5 h-5 bg-[#29211D] rounded" />
            </div>
            <span className="text-[10px] font-black text-[#71835C] mt-1.5 flex items-center gap-1">
              <Check className="w-3 h-3" /> Auto-Settled
            </span>
          </div>
        </div>
      ),
      pill: "0% Surcharge NPCI QR",
    },
    {
      badge: "No Awkward Talks",
      tagline: "Smart WhatsApp Reminders",
      desc: "Send friendly reminders via WhatsApp or SMS. Get paid without damaging neighborhood relationships.",
      icon: (
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[#E98A55]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="w-40 bg-white rounded-2xl p-3 border border-[#E5D9CA] shadow-warm-lg text-left">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-full bg-[#71835C] text-white flex items-center justify-center text-[10px]">
                💬
              </div>
              <span className="text-[10px] font-bold text-[#71835C]">WhatsApp Reminder</span>
            </div>
            <div className="bg-[#FAF6EF] rounded-xl p-2 text-[10px] text-[#29211D] font-medium border border-[#E5D9CA]/60">
              "Hi Ramesh, your pending khata is <strong className="text-[#C85C32]">₹1,850</strong>. Click to pay via UPI."
            </div>
          </div>
        </div>
      ),
      pill: "🙏 Sambandh Bane Rahein",
    },
    {
      badge: "More Sales. Less Stress.",
      tagline: "Grow Your Kirana Business",
      desc: "Stay organized, serve customers faster and build stronger community trust every single day.",
      icon: (
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[#C85C32]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-br from-[#C85C32] to-[#B54F27] text-white p-3 shadow-glow-terracotta flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-1">📈</span>
            <span className="text-xl font-black">94%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FAF6EF]/80">Recovery Health</span>
          </div>
        </div>
      ),
      pill: "Vyapaar Mein Unnati",
    }
  ];

  // 1. BRAND SPLASH VIEW (Screen shown in the image mockup)
  if (step === 'splash') {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-[#1C4C3E] via-[#143B30] to-[#0D2821] text-[#FAF6EF] p-6 justify-between select-none relative overflow-hidden">
        {/* Soft atmospheric glow & leaves */}
        <div className="absolute top-12 -left-12 w-48 h-48 bg-[#4E8B75]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 -right-16 w-56 h-56 bg-[#E98A55]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative leaf motifs */}
        <div className="absolute top-10 right-8 text-2xl opacity-60 pointer-events-none">🍃</div>
        <div className="absolute bottom-24 left-6 text-xl opacity-40 pointer-events-none">🌿</div>

        {/* Top spacer */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#FAF6EF]/70">
            KIRANA FINTECH
          </span>
          <button 
            onClick={() => setStep('onboarding')}
            className="text-xs font-bold text-[#E98A55] hover:underline px-2 py-1"
          >
            Skip →
          </button>
        </div>

        {/* Center Brand Identity (Exact logo matching the reference) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center my-auto"
        >
          {/* Custom Kirana 'K' Leaf Icon from image */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#FAF6EF] to-[#F2E8D9] shadow-2xl flex items-center justify-center p-3 relative border border-white/20">
              {/* Stylized K + Leaf glyph */}
              <div className="relative flex items-center justify-center">
                <span className="text-5xl font-black text-[#C85C32] tracking-tighter">K</span>
                {/* Green Leaf Accent */}
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#4E8B75] rounded-tl-full rounded-br-full shadow-sm border border-white/30 transform rotate-12" />
              </div>
            </div>
            {/* Soft shadow glow */}
            <div className="absolute -bottom-2 inset-x-3 h-4 bg-black/40 blur-md rounded-full pointer-events-none" />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white mb-1">
            Kirana
          </h1>
          <p className="text-sm font-semibold text-[#E98A55] tracking-wide">
            Udhaar bhi. Ustaad bhi.
          </p>

          <div className="mt-6 flex flex-col items-center gap-2 max-w-xs">
            <p className="text-xs text-[#FAF6EF]/75 leading-relaxed font-normal">
              A Smarter Way to Run Your Kirana. Keep sales, credit, reminders &amp; UPI in one hand.
            </p>
          </div>

          {/* Quick Feature Badges from reference image */}
          <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-xs text-left">
            {[
              { icon: '⚡', label: 'Track Sales & Credit' },
              { icon: '🔔', label: 'Send Reminders' },
              { icon: '📱', label: 'Accept UPI Payments' },
              { icon: '📈', label: 'Grow Your Business' },
            ].map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 flex items-center gap-2">
                <span className="text-sm">{f.icon}</span>
                <span className="text-[10px] font-bold text-[#FAF6EF]">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="pt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep('onboarding')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C85C32] to-[#E98A55] text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:brightness-105 transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-[10px] text-center text-[#FAF6EF]/50 mt-2 font-medium">
            Made for Indian Kirana Shopkeepers Behind the Counter
          </p>
        </div>
      </div>
    );
  }

  // 2. INTERACTIVE ONBOARDING SLIDES (Matching screens from the image)
  const current = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className="flex flex-col h-full bg-[#FAF6EF] text-[#29211D] p-6 justify-between select-none relative overflow-hidden">
      
      {/* Top Header with Skip */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#C85C32] text-white flex items-center justify-center font-black text-xs shadow-sm">
            K
          </div>
          <span className="text-xs font-black tracking-tight text-[#29211D]">Kirana</span>
        </div>
        <button 
          onClick={onGetStarted}
          className="text-xs font-bold text-[#766A61] hover:text-[#C85C32] transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto flex flex-col items-center text-center"
        >
          {/* Top category chip */}
          <span className="px-3 py-1 rounded-full bg-[#F2E8D9] border border-[#E5D9CA] text-[10px] font-black text-[#C85C32] uppercase tracking-wider mb-4 shadow-sm">
            {current.pill}
          </span>

          {/* Visual Illustration Area */}
          <div className="my-3">
            {current.icon}
          </div>

          <h2 className="text-2xl font-black text-[#29211D] tracking-tight mt-2 max-w-xs">
            {current.tagline}
          </h2>

          <p className="text-xs text-[#766A61] leading-relaxed mt-2 max-w-xs font-medium">
            {current.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Controls: Dots + Action Button */}
      <div className="pt-4 space-y-4">
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx 
                  ? 'w-7 bg-[#C85C32]' 
                  : 'w-2 bg-[#E5D9CA]'
              }`}
            />
          ))}
        </div>

        {/* Next / Start Button */}
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isLast) {
                onGetStarted();
              } else {
                setCurrentSlide(prev => prev + 1);
              }
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C85C32] to-[#E98A55] text-white font-black text-sm flex items-center justify-center gap-2 shadow-glow-terracotta active:brightness-95 transition-all"
          >
            <span>{isLast ? "Let's Go →" : "Next"}</span>
            {!isLast && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
