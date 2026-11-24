# 🏪 Kirana Khata 2.0 — Modern Bahi-Khata & Counter Fintech

> **"Udhaar bhi. Ustaad bhi."**  
> An artisanal, tactile digital bahi-khata designed for Indian Kirana shopkeepers to record sales and credit, send respectful reminders, and accept instant UPI payments with one hand behind a busy counter.

[![Vercel Deployment](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://kirana-khata-chi.vercel.app)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

🔗 **Live Production URL:** **[https://kirana-khata-chi.vercel.app](https://kirana-khata-chi.vercel.app)**

---

## 📱 The Design Challenge & Philosophy

Kirana store owners still track millions in credit (*udhaar*) using paper diaries (*Lal Bahi-Khata*). Existing fintech apps often fail behind physical counters because they:
1. Require two hands and extensive keyboard typing.
2. Rely on cold, aggressive debt collection that damages neighborhood relationships (*Sambandh*).
3. Use corporate generic blue/purple SaaS templates.

**Kirana Khata** solves this with a warm, artisanal Indian aesthetic and a **45% Bottom Thumb-Zone Ergonomic Architecture**.

---

## 🎨 Artisan Color Palette

| Role | Name | Hex Code | Visual Tone |
| :--- | :--- | :--- | :--- |
| **Main Background** | Warm Porcelain | `#FAF6EF` | Creamy paper warmth eliminating harsh screen glare under shop lights |
| **Secondary Surface** | Soft Sand | `#F2E8D9` | Tactile card base with subtle warm borders |
| **Primary Accent** | Burnt Terracotta | `#C85C32` | Inspired by earthen clay pots and traditional bahi books |
| **Accent Highlight** | Apricot | `#E98A55` | Glowing status badges and notifications |
| **Main Text** | Deep Espresso | `#29211D` | High-contrast, sharp legible typography |
| **Positive / Jama** | Muted Olive | `#71835C` | Peaceful settlement indicator |
| **Success Background** | Sage Mist | `#E7EBDD` | Soft badge background for settled accounts |
| **Divider** | Warm Linen | `#E5D9CA` | Subtle physical separation borders |

---

## ✨ Key Screens & Features

### 🚀 0. Launch Splash & Onboarding Flow
- **Brand Identity:** Stylized leaf-accented `K` emblem and *"Udhaar bhi. Ustaad bhi."* motto.
- **5-Slide Visual Carousel:** *"Your Shop. Now Smarter"*, *"Record Credit in Seconds"*, *"Get Paid with UPI"*, *"Smart Reminders"*, and *"Grow Your Business"*.

### 🏪 1. Counter Home Dashboard
- **Market Vasooli Card:** Espresso gradient banner highlighting total market udhaar, today's recovered cash, and active accounts.
- **1-Tap Frequent Customer Avatars:** Fast counter access to regular customers (Ramesh Dairy, Gupta Ji, Sunita Didi).
- **Fast Filter Tabs:** Instant switching between *All Accounts*, *Baki (Pending)*, and *Chukta (Settled)*.

### ⚡ 2. Under-10-Second Quick Add Entry
- **Counter NumPad:** Large thumb-friendly numeric keys with built-in `00` key and instant backspace.
- **Speed-Run Timer Badge:** Live counter timer display (`⚡ 3s / target <10s`).
- **Quick Preset Chips:** `+₹50`, `+₹100`, `+₹200`, `+₹500` to avoid typing zeros with dirty or busy hands.
- **Celebratory Confetti:** Dynamic earthen confetti on confirmation.

### 📖 3. Customer Ledger (Bahi-Khata Sheet)
- **Net Balance Card:** Total due in Burnt Terracotta or green *"Hisaab Chukta"* badge.
- **Paid vs. Owes Financial Grid:** Clear separation of **Kul Diya (Given / Total Udhaar)** vs. **Kul Liya (Paid / Total Received)**.
- **Dual-Column Ledger Feed:** Detailed chronological transactions with items, timestamps, and payment mode tags (`CASH` or `UPI`).

### 💬 4. WhatsApp Payment Reminder Flow
- **3-Tone Relationship Switcher:**
  - `🙏 Namaste` (Warm & friendly neighborhood tone)
  - `📅 Month-End` (Formal accounting reminder)
  - `🚨 Overdue` (Firm notice for balances pending >7 days)
- **Auto-Embedded UPI Deep-Link:** Automatically generates `upi://pay?pa=...` so customers can pay in one tap from WhatsApp.

### 📱 5. Instant Dynamic Counter UPI QR
- **Pre-Encoded Amounts:** Encodes the customer's exact pending due amount so they don't have to type it.
- **NPCI Verified:** Works with PhonePe, Google Pay, Paytm, and BHIM with zero merchant surcharge.
- **Simulate Payment:** 1-tap counter test to simulate instant settlement with celebratory visual feedback.

### 🎙️ 6. Hands-Free Bol-Khata (Voice AI Logging)
- Pulsing acoustic waveform that parses local spoken phrases (e.g., *"Ramesh bhaiya 350 udhaar atta aur tel"*) into structured customer entries in 0.4 seconds.

### 👤 7. Naya Grahak (Add Customer) Flow
- Fast bottom sheet with 12 avatar icons, phone number auto-formatting, and opening balance tracking.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Glassmorphism
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/) (Spring physics: `damping: 26, stiffness: 280`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visuals:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Hosting:** [Vercel](https://vercel.com/)

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/AbdulRehan-7designs/kirana-khata.git

# Navigate into the project directory
cd kirana-khata

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📄 License
MIT © [Abdul Rehan](https://github.com/AbdulRehan-7designs)
