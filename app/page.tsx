"use client";

import { useRouter } from "next/navigation";
import { Calculator, Zap, Lock } from "lucide-react";
import CalculatorCard from "@/components/common/CalculatorCard";
import { CALCULATORS_REGISTRY, getPopularCalculators } from "@/data/calculatorsRegistry";

export default function HomePageClient() {
  const router = useRouter();
  const popularCalculators = getPopularCalculators(6);

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Instant results without page reloads. No waiting, no lag.",
    },
    {
      icon: Lock,
      title: "Privacy Safe",
      desc: "All calculations happen in your browser. We never store your data.",
    },
  ];

  const stats = [
    { value: `${CALCULATORS_REGISTRY.length}+`, label: "Calculators" },
    { value: "100%", label: "Free Forever" },
    { value: "0", label: "Sign-up Required" },
  ];

  const faqs = [
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

  const calculatorLinks = [
    { label: "BMI Calculator", href: "/calculators/bmi-calculator" },
    { label: "EMI Calculator", href: "/calculators/emi-calculator" },
    { label: "Percentage Calculator", href: "/calculators/percentage-calculator" },
    { label: "Age Calculator", href: "/calculators/age-calculator" },
    { label: "GST Calculator", href: "/calculators/gst-calculator" },
    { label: "SIP Calculator", href: "/calculators/sip-calculator" },
  ];

  return (
    <>
      {/* ── HERO SECTION — Design unchanged, H1 + subtitle SEO-optimized ── */}
      <section className="relative px-6 py-16 md:py-20 lg:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="text-sm font-semibold text-blue-400">
              ✦ Free · Fast · Accurate
            </span>
          </div>

          {/* 
            SEO FIX: H1 now contains primary keyword "Free Online Calculators"
            Visual design is 100% identical to before — same classes, same gradient span
          */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Free Online Calculators
            <br />
            for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Every Need
            </span>
          </h1>

          {/* SEO FIX: Subtitle now includes target keywords */}
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

          <div className="flex justify-center gap-8 md:gap-12 mt-12 pt-8 border-t border-gray-800">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATORS GRID — Unchanged, aria-labels added for SEO ── */}
      <section
        className="px-6 py-12 md:py-16"
        aria-labelledby="calculators-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Popular Tools
            </span>
            <h2
              id="calculators-heading"
              className="text-3xl md:text-4xl font-bold mt-2 mb-3"
            >
              Our Calculators
            </h2>
            <p className="text-gray-400">
              Accurate results, clean UI, no registration required.
            </p>
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

      {/* ── BENEFITS SECTION — Unchanged design, h4 → h3 for SEO hierarchy ── */}
      <section
        className="px-6 py-12 md:py-16 bg-[#0f1525]"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Why Numrexo
            </span>
            <h2
              id="benefits-heading"
              className="text-3xl md:text-4xl font-bold mt-2"
            >
              Built for Everyone
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all"
              >
                {/* SEO FIX: aria-hidden on decorative icons */}
                <benefit.icon
                  className="w-10 h-10 text-blue-400 mb-4"
                  aria-hidden="true"
                />
                {/* SEO FIX: h4 changed to h3 — correct heading hierarchy */}
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT SECTION — NEW (below fold, design matches site theme) ── */}
      <section
        className="px-6 py-14 md:py-20"
        aria-labelledby="about-calculators-heading"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            id="about-calculators-heading"
            className="text-2xl md:text-3xl font-bold mb-6 text-center"
          >
            Why Use Numrexo Free Online Calculators?
          </h2>

          <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
            <p>
              <strong className="text-white">Numrexo</strong> is a free online
              calculator platform built for speed, accuracy, and simplicity.
              Whether you need to calculate your{" "}
              <strong className="text-white">Body Mass Index (BMI)</strong>,
              figure out your monthly{" "}
              <strong className="text-white">
                loan EMI (Equated Monthly Installment)
              </strong>
              , work out a{" "}
              <strong className="text-white">percentage change</strong>, or
              estimate your{" "}
              <strong className="text-white">GST or SIP returns</strong> —
              Numrexo has a dedicated, purpose-built calculator for every need.
            </p>

            <p>
              Our <strong className="text-white">BMI Calculator</strong> uses
              the World Health Organization (WHO) standard formula, giving you
              instant insight into whether your weight falls in the healthy
              range. The{" "}
              <strong className="text-white">EMI Calculator</strong> applies the
              standard amortization formula used by banks globally, helping you
              plan home loans, car loans, or personal loans with complete
              transparency.
            </p>

            <p>
              The{" "}
              <strong className="text-white">Percentage Calculator</strong>{" "}
              handles percentage increase, decrease, and difference in
              seconds — perfect for students, teachers, shoppers, and business
              professionals. The{" "}
              <strong className="text-white">Age Calculator</strong> gives your
              exact age in years, months, and days — useful for official
              documents, medical records, or just satisfying curiosity.
            </p>

            <p>
              <strong className="text-white">Privacy first:</strong> every
              calculation happens entirely inside your browser. Numrexo never
              stores, logs, or shares your input data. No account, no email, no
              tracking — just instant answers.
            </p>

            <p>
              Numrexo works seamlessly on{" "}
              <strong className="text-white">
                all devices — desktop, tablet, and mobile
              </strong>
              . There is no app to download. Open your browser, pick a
              calculator, enter your values, and get results in under a second.
            </p>
          </div>

          {/* Internal links grid — SEO crawlability + UX */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {calculatorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={`Use the free ${link.label} on Numrexo`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-700 text-sm text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all text-center"
              >
                <Calculator size={14} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION — NEW (matches FAQPage JSON-LD schema in page.tsx) ── */}
      <section
        className="px-6 py-14 md:py-20 bg-[#0f1525]"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Help
            </span>
            <h2
              id="faq-heading"
              className="text-2xl md:text-3xl font-bold mt-2"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-white font-medium text-[15px] list-none select-none hover:text-blue-400 transition-colors">
                  {faq.q}
                  <span
                    className="ml-4 text-blue-400 group-open:rotate-180 transition-transform text-lg"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4 m-0">
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