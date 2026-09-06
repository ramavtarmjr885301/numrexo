"use client";

// app/HomePageClient.tsx
//
// Client half of the homepage. It used to be app/page.tsx with "use client" at
// the top, which meant the file could not export metadata at all — so the
// homepage silently inherited the site-wide default title from app/layout.tsx.


import { useRouter } from "next/navigation";
import { Calculator } from "lucide-react";
import CalculatorCard from "@/components/common/CalculatorCard";
import { CALCULATORS_REGISTRY, getPopularCalculators } from "@/data/calculatorsRegistry";

// ─── Static Data ──────────────────────────────────────────────────────────────

const STATS = [
  { value: `${CALCULATORS_REGISTRY.length}+`, label: "Calculators" },
  { value: "100%", label: "Free Forever" },
  { value: "0", label: "Sign-up Required" },
];

const FAQS = [
  {
    q: "Is Numrexo completely free?",
    a: "Yes. Every calculator on Numrexo is 100% free forever — no subscriptions, no hidden fees, no account required.",
  },
  {
    q: "Does Numrexo store my data?",
    a: "No. All calculations run entirely in your browser. We never store, transmit, or share your data.",
  },
  {
    q: "How accurate are the results?",
    a: "We use standard WHO, financial, and mathematical formulas. BMI follows WHO guidelines; EMI uses the standard amortization formula.",
  },
  {
    q: "Can I use Numrexo on mobile?",
    a: "Yes — Numrexo is fully mobile-optimized and works on all screen sizes without any app download.",
  },
  {
    q: "How do I calculate my EMI?",
    a: "Open the EMI Calculator, enter loan amount, interest rate (annual), and tenure (months). Your monthly EMI appears instantly.",
  },
  {
    q: "Which calculator helps check healthy weight?",
    a: "The BMI Calculator. Enter your height and weight; it shows your BMI and weight category per WHO standards.",
  },
];

const CALCULATOR_LINKS = [
  { label: "BMI Calculator", href: "/health/bmi-calculator" },
  { label: "EMI Calculator", href: "/finance/emi-calculator" },
  { label: "Percentage Calculator", href: "/math/percentage-calculator" },
  { label: "Age Calculator", href: "/math/age-calculator" },
  { label: "GST Calculator", href: "/tax/gst-calculator" },
  { label: "SIP Calculator", href: "/investment/sip-calculator" },
];

const SEO_CONTENT = [
  <>
    <strong className="text-white">Numrexo</strong> is a free online calculator
    platform built for speed, accuracy, and simplicity. Whether you need to
    calculate your{" "}
    <a href="/health/bmi-calculator" className="text-white hover:text-blue-400 transition-colors">Body Mass Index (BMI)</a>,
    figure out your monthly{" "}
    <a href="/finance/emi-calculator" className="text-white hover:text-blue-400 transition-colors">loan EMI</a>,
    work out a{" "}
    <a href="/math/percentage-calculator" className="text-white hover:text-blue-400 transition-colors">percentage change</a>,
    or estimate your{" "}
    <a href="/tax/gst-calculator" className="text-white hover:text-blue-400 transition-colors">GST</a>{" "}
    or{" "}
    <a href="/investment/sip-calculator" className="text-white hover:text-blue-400 transition-colors">SIP returns</a>{" "}
    — Numrexo has a purpose-built calculator for every need.
  </>,
  <>
    Our{" "}
    <a href="/health/bmi-calculator" className="text-white hover:text-blue-400 transition-colors">BMI Calculator</a>{" "}
    uses the WHO standard formula for instant health insights. The{" "}
    <a href="/finance/emi-calculator" className="text-white hover:text-blue-400 transition-colors">EMI Calculator</a>{" "}
    applies the standard amortization formula used by banks globally — perfect for
    planning home loans, car loans, or personal loans.
  </>,
  <>
    The{" "}
    <a href="/math/percentage-calculator" className="text-white hover:text-blue-400 transition-colors">Percentage Calculator</a>{" "}
    handles increase, decrease, and difference in seconds. The{" "}
    <a href="/math/age-calculator" className="text-white hover:text-blue-400 transition-colors">Age Calculator</a>{" "}
    gives your exact age in years, months, and days — useful for official
    documents, medical records, or just curiosity.
  </>,
  <>
    <strong className="text-white">Privacy first:</strong> every calculation
    happens entirely in your browser. No account, no email, no tracking — just
    instant answers on{" "}
    <strong className="text-white">desktop, tablet, and mobile</strong>.
  </>,
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePageClient() {
  const router = useRouter();
  const popularCalculators = getPopularCalculators(6);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="text-sm font-semibold text-blue-400">✦ Free · Fast · Accurate</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Free Online Calculators
            <br />
            for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Every Need
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Accurate, free online calculators for BMI, EMI, percentage, age,
            GST, and SIP — designed for instant results, zero sign-up.
          </p>

          <button
            onClick={() => router.push("/calculators")}
            aria-label="Browse all free online calculators on Numrexo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <Calculator size={20} aria-hidden="true" />
            Browse Calculators →
          </button>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 mt-12 pt-8 border-t border-gray-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATORS GRID ── */}
      <section className="px-6 py-12 md:py-16" aria-labelledby="calculators-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Popular Tools</span>
            <h2 id="calculators-heading" className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              Our Calculators
            </h2>
            <p className="text-gray-400">Accurate results, clean UI, no registration required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map((calc) => (
              <CalculatorCard
                key={calc.id}
                calculator={calc}
                onClick={() => router.push(calc.path)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ── */}
      <section className="px-6 py-14 md:py-20" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Why Use Numrexo Free Online Calculators?
          </h2>

          <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
            {SEO_CONTENT.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-14 md:py-20 bg-[#0f1525]" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Help</span>
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-white font-medium text-[15px] list-none select-none hover:text-blue-400 transition-colors">
                  {faq.q}
                  <span className="ml-4 text-blue-400 group-open:rotate-180 transition-transform text-lg" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <p className="px-6 pb-5 pt-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 m-0">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}















// "use client";

// import { useRouter } from "next/navigation";
// import { getPopularCalculators } from "@/data/calculatorsRegistry";

// // Icon mapping — apne registry ke calc.id se match karo
// const ICON_MAP: Record<string, string> = {
//   "bmi-calculator": "ti-heart-rate-monitor",
//   "emi-calculator": "ti-cash",
//   "percentage-calculator": "ti-percentage",
//   "age-calculator": "ti-calendar",
//   "gst-calculator": "ti-receipt-tax",
//   "sip-calculator": "ti-trending-up",
// };

// const COLOR_THEMES = ["g-blue", "g-teal", "g-purple", "g-amber", "g-coral", "g-green"];

// export default function DiamondCalculatorCards() {
//   const router = useRouter();
//   const calculators = getPopularCalculators(6);

//   return (
//     <>
//       <style>{`
//         .diamond-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 150px);
//           grid-template-rows: repeat(2, 150px);
//           gap: 32px;
//           justify-content: center;
//         }
//         @media (max-width: 540px) {
//           .diamond-grid {
//             grid-template-columns: repeat(2, 130px);
//             grid-template-rows: repeat(3, 130px);
//             gap: 20px;
//           }
//         }
//         .diamond-cell {
//           width: 150px; height: 150px;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .gem {
//           width: 104px; height: 104px;
//           position: relative;
//           transform: rotate(45deg);
//           cursor: pointer;
//           border-radius: 18px;
//           border: 1px solid;
//           animation: gem-float 3s ease-in-out infinite;
//           transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s;
//         }
//         .diamond-cell:nth-child(2) .gem { animation-delay: 0.25s; }
//         .diamond-cell:nth-child(3) .gem { animation-delay: 0.5s; }
//         .diamond-cell:nth-child(4) .gem { animation-delay: 0.75s; }
//         .diamond-cell:nth-child(5) .gem { animation-delay: 1s; }
//         .diamond-cell:nth-child(6) .gem { animation-delay: 1.25s; }

//         @keyframes gem-float {
//           0%, 100% { transform: rotate(45deg) translateY(0px); }
//           50%       { transform: rotate(45deg) translateY(-8px); }
//         }

//         .gem:hover {
//           animation: none;
//           transform: rotate(45deg) scale(1.14);
//         }

//         .gem-inner {
//           position: absolute; inset: 0;
//           display: flex; flex-direction: column;
//           align-items: center; justify-content: center;
//           gap: 7px;
//           transform: rotate(-45deg);
//         }
//         .gem-icon {
//           width: 36px; height: 36px;
//           border-radius: 10px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 18px;
//         }
//         .gem-label {
//           font-size: 9.5px; font-weight: 500;
//           text-align: center; line-height: 1.35; max-width: 72px;
//         }

//         .g-blue   { background: #dceefb; border-color: #85B7EB; }
//         .g-teal   { background: #d2f0e5; border-color: #5DCAA5; }
//         .g-purple { background: #e6e5fd; border-color: #AFA9EC; }
//         .g-amber  { background: #fdefd6; border-color: #EF9F27; }
//         .g-coral  { background: #fde8e1; border-color: #F0997B; }
//         .g-green  { background: #e2f1d4; border-color: #97C459; }

//         .g-blue .gem-icon   { background: #B5D4F4; color: #185FA5; }
//         .g-teal .gem-icon   { background: #9FE1CB; color: #0F6E56; }
//         .g-purple .gem-icon { background: #CECBF6; color: #534AB7; }
//         .g-amber .gem-icon  { background: #FAC775; color: #854F0B; }
//         .g-coral .gem-icon  { background: #F5C4B3; color: #993C1D; }
//         .g-green .gem-icon  { background: #C0DD97; color: #3B6D11; }

//         .g-blue .gem-label   { color: #185FA5; }
//         .g-teal .gem-label   { color: #0F6E56; }
//         .g-purple .gem-label { color: #534AB7; }
//         .g-amber .gem-label  { color: #854F0B; }
//         .g-coral .gem-label  { color: #993C1D; }
//         .g-green .gem-label  { color: #3B6D11; }

//         @media (prefers-color-scheme: dark) {
//           .g-blue   { background: #0C447C; border-color: #185FA5; }
//           .g-teal   { background: #085041; border-color: #0F6E56; }
//           .g-purple { background: #3C3489; border-color: #534AB7; }
//           .g-amber  { background: #633806; border-color: #854F0B; }
//           .g-coral  { background: #712B13; border-color: #993C1D; }
//           .g-green  { background: #27500A; border-color: #3B6D11; }

//           .g-blue .gem-icon   { background: #185FA5; color: #B5D4F4; }
//           .g-teal .gem-icon   { background: #0F6E56; color: #9FE1CB; }
//           .g-purple .gem-icon { background: #534AB7; color: #CECBF6; }
//           .g-amber .gem-icon  { background: #854F0B; color: #FAC775; }
//           .g-coral .gem-icon  { background: #993C1D; color: #F5C4B3; }
//           .g-green .gem-icon  { background: #3B6D11; color: #C0DD97; }

//           .g-blue .gem-label   { color: #B5D4F4; }
//           .g-teal .gem-label   { color: #9FE1CB; }
//           .g-purple .gem-label { color: #CECBF6; }
//           .g-amber .gem-label  { color: #FAC775; }
//           .g-coral .gem-label  { color: #F5C4B3; }
//           .g-green .gem-label  { color: #C0DD97; }
//         }
//       `}</style>

//       {/* Tabler Icons CDN — required for ti-* icon classes */}
//       <link
//         rel="stylesheet"
//         href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
//       />

//       <div className="diamond-grid">
//         {calculators.map((calc, idx) => {
//           const iconClass = ICON_MAP[calc.id] ?? "ti-calculator";
//           const theme = COLOR_THEMES[idx % COLOR_THEMES.length];

//           return (
//             <div key={calc.id} className="diamond-cell">
//               <div
//                 className={`gem ${theme}`}
//                 onClick={() => router.push(calc.path)}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`Open ${calc.name}`}
//                 onKeyDown={(e) => e.key === "Enter" && router.push(calc.path)}
//               >
//                 <div className="gem-inner">
//                   <div className="gem-icon">
//                     <i className={`ti ${iconClass}`} aria-hidden="true" />
//                   </div>
//                   <div className="gem-label">{calc.name}</div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
