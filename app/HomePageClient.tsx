"use client";

// app/HomePageClient.tsx
//
// Client half of the homepage. It used to be app/page.tsx with "use client" at
// the top, which meant the file could not export metadata at all — so the
// homepage silently inherited the site-wide default title from app/layout.tsx.
//
// Patch 16: rebuilt to match Numrexo redesign.html - a search-first hero with
// a live mini-calculator next to it, a "pick up where you left off" card fed
// by lib/recentCalculators.ts, a "Most used" row, the full category directory,
// and a value-props band - on the new light theme.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock } from "lucide-react";
import CalculatorCard from "@/components/common/CalculatorCard";
import FeaturedCalculator from "@/components/home/FeaturedCalculator";
import {
  CALCULATORS_REGISTRY,
  CATEGORIES,
  getPopularCalculators,
  getCalculatorsByCategory,
} from "@/data/calculatorsRegistry";
import { readRecentCalculators, RecentCalculatorEntry } from "@/lib/recentCalculators";

// ─── Static Data ──────────────────────────────────────────────────────────────

const POPULAR_PILLS = getPopularCalculators(5);

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

const VALUE_PROPS = [
  {
    icon: "⚡",
    title: "Answers while you type",
    body: "No Calculate button on most tools. Change a number, the result moves with it.",
  },
  {
    icon: "＝",
    title: "The formula, shown",
    body: "Every result explains how it was worked out, so you can check it — not just trust it.",
  },
  {
    icon: "🔒",
    title: "Private by design",
    body: "Calculations run in your browser. No account, no email, nothing stored.",
  },
  {
    icon: "🧮",
    title: `${CALCULATORS_REGISTRY.length}+ calculators, one site`,
    body: "Finance, health, math, conversions and everyday life — no jumping between apps.",
  },
];

const SEO_CONTENT = [
  <>
    <strong className="text-ink">Numrexo</strong> is a free online calculator
    platform built for speed, accuracy, and simplicity. Whether you need to
    calculate your{" "}
    <a href="/health/bmi-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">Body Mass Index (BMI)</a>,
    figure out your monthly{" "}
    <a href="/finance/emi-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">loan EMI</a>,
    work out a{" "}
    <a href="/math/percentage-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">percentage change</a>,
    or estimate your{" "}
    <a href="/tax/gst-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">GST</a>{" "}
    or{" "}
    <a href="/investment/sip-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">SIP returns</a>{" "}
    — Numrexo has a purpose-built calculator for every need.
  </>,
  <>
    Our{" "}
    <a href="/health/bmi-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">BMI Calculator</a>{" "}
    uses the WHO standard formula for instant health insights. The{" "}
    <a href="/finance/emi-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">EMI Calculator</a>{" "}
    applies the standard amortization formula used by banks globally — perfect for
    planning home loans, car loans, or personal loans.
  </>,
  <>
    The{" "}
    <a href="/math/percentage-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">Percentage Calculator</a>{" "}
    handles increase, decrease, and difference in seconds. The{" "}
    <a href="/math/age-calculator" className="text-ink hover:text-blue-600 transition-colors underline decoration-hairline underline-offset-2">Age Calculator</a>{" "}
    gives your exact age in years, months, and days — useful for official
    documents, medical records, or just curiosity.
  </>,
  <>
    <strong className="text-ink">Privacy first:</strong> every calculation
    happens entirely in your browser — your numbers never leave your device.
    No account or email required, just{" "}
    <strong className="text-ink">instant answers on desktop, tablet, and mobile</strong>.
  </>,
];

// ─── Small live widget (Percent / Calculator / Convert) ────────────────────
//
// Matches the mockup's 3-tab card next to the hero. Deliberately tiny tools -
// the point is "type a number, see an answer instantly", as a taste of what
// every calculator on the site does, not a replacement for the full pages.

const LENGTH_UNITS: Record<string, number> = {
  Millimeters: 0.001,
  Centimeters: 0.01,
  Meters: 1,
  Kilometers: 1000,
  Inches: 0.0254,
  Feet: 0.3048,
  Miles: 1609.34,
};

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function LiveWidget() {
  const [tab, setTab] = useState<"percent" | "calculator" | "convert">("percent");

  // Percent tab
  const [pA, setPA] = useState("20");
  const [pB, setPB] = useState("150");
  const [pC, setPC] = useState("30");
  const [pD, setPD] = useState("150");
  const [pFrom, setPFrom] = useState("100");
  const [pTo, setPTo] = useState("125");

  // Calculator tab
  const [cA, setCA] = useState("20");
  const [cOp, setCOp] = useState<"+" | "-" | "×" | "÷">("+");
  const [cB, setCB] = useState("8");

  // Convert tab
  const [uValue, setUValue] = useState("10");
  const [uFrom, setUFrom] = useState("Kilometers");
  const [uTo, setUTo] = useState("Miles");

  const numA = parseFloat(pA) || 0;
  const numB = parseFloat(pB) || 0;
  const percentOf = (numA / 100) * numB;

  const numC = parseFloat(pC) || 0;
  const numD = parseFloat(pD) || 0;
  const whatPercent = numD !== 0 ? (numC / numD) * 100 : 0;

  const from = parseFloat(pFrom) || 0;
  const to = parseFloat(pTo) || 0;
  const change = from !== 0 ? ((to - from) / from) * 100 : 0;

  const calcA = parseFloat(cA) || 0;
  const calcB = parseFloat(cB) || 0;
  const calcResult =
    cOp === "+" ? calcA + calcB : cOp === "-" ? calcA - calcB : cOp === "×" ? calcA * calcB : calcB !== 0 ? calcA / calcB : 0;

  const uVal = parseFloat(uValue) || 0;
  const converted = (uVal * LENGTH_UNITS[uFrom]) / LENGTH_UNITS[uTo];

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "percent", label: "Percent" },
    { key: "calculator", label: "Calculator" },
    { key: "convert", label: "Convert" },
  ];

  return (
    <div className="bg-surface border border-hairline rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-cream mb-5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === t.key ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "percent" && (
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap text-sm text-ink-soft mb-1.5">
              <span>What is</span>
              <input
                value={pA}
                onChange={(e) => setPA(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
              />
              <span>% of</span>
              <input
                value={pB}
                onChange={(e) => setPB(e.target.value)}
                className="w-20 px-2 py-1.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
              />
            </div>
            <div className="text-2xl font-bold text-blue-600">= {formatNumber(percentOf)}</div>
          </div>

          <div className="border-t border-hairline pt-4">
            <div className="flex items-center gap-2 flex-wrap text-sm text-ink-soft mb-1.5">
              <input
                value={pC}
                onChange={(e) => setPC(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
              />
              <span>is what % of</span>
              <input
                value={pD}
                onChange={(e) => setPD(e.target.value)}
                className="w-20 px-2 py-1.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
              />
            </div>
            <div className="text-2xl font-bold text-blue-600">= {formatNumber(whatPercent)}%</div>
          </div>

          <div className="border-t border-hairline pt-4">
            <div className="flex items-center gap-2 flex-wrap text-sm text-ink-soft mb-1.5">
              <span>Change from</span>
              <input
                value={pFrom}
                onChange={(e) => setPFrom(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
              />
              <span>to</span>
              <input
                value={pTo}
                onChange={(e) => setPTo(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
              />
            </div>
            <div className={`text-2xl font-bold ${change >= 0 ? "text-blue-600" : "text-red-600"}`}>
              = {change >= 0 ? "+" : ""}
              {formatNumber(change)}%
            </div>
          </div>

          <a href="/math/percentage-calculator" className="block text-sm font-medium text-blue-600 hover:underline pt-1">
            Open the full Percentage Calculator →
          </a>
        </div>
      )}

      {tab === "calculator" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <input
              value={cA}
              onChange={(e) => setCA(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
            />
            <select
              value={cOp}
              onChange={(e) => setCOp(e.target.value as typeof cOp)}
              className="px-3 py-2.5 rounded-lg border border-hairline font-semibold text-ink focus:border-ink outline-none"
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="×">×</option>
              <option value="÷">÷</option>
            </select>
            <input
              value={cB}
              onChange={(e) => setCB(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none"
            />
          </div>
          <div className="text-3xl font-bold text-blue-600">= {formatNumber(calcResult)}</div>
          <p className="text-xs text-ink-faint">
            A quick sum. For step-by-step math, statistics and more, see{" "}
            <a href="/math" className="text-blue-600 hover:underline">all Math tools →</a>
          </p>
        </div>
      )}

      {tab === "convert" && (
        <div className="space-y-4">
          <div>
            <input
              value={uValue}
              onChange={(e) => setUValue(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-hairline text-center font-semibold text-ink focus:border-ink outline-none mb-2"
            />
            <select
              value={uFrom}
              onChange={(e) => setUFrom(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-hairline text-sm text-ink focus:border-ink outline-none"
            >
              {Object.keys(LENGTH_UNITS).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div className="text-center text-ink-faint text-sm">↓</div>
          <div>
            <div className="text-2xl font-bold text-blue-600 text-center mb-2">{formatNumber(converted)}</div>
            <select
              value={uTo}
              onChange={(e) => setUTo(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-hairline text-sm text-ink focus:border-ink outline-none"
            >
              {Object.keys(LENGTH_UNITS).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <a href="/conversion" className="block text-sm font-medium text-blue-600 hover:underline pt-1">
            More converters (weight, temperature, speed…) →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePageClient() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recent, setRecent] = useState<RecentCalculatorEntry[]>([]);

  useEffect(() => {
    setRecent(readRecentCalculators());
  }, []);

  const searchResults = CALCULATORS_REGISTRY.filter((calc) =>
    calc.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8);

  const categoryEntries = Object.entries(CATEGORIES).sort((a, b) => a[1].order - b[1].order);

  return (
    <>
      {/* ── HERO ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-4 text-xs sm:text-sm">
            <ol className="flex items-center gap-2 text-ink-faint">
              <li>Free forever</li>
              <li>·</li>
              <li>No sign-up</li>
              <li>·</li>
              <li>Answers as you type</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4 leading-tight">
                What do you want<br />to calculate?
              </h1>
              <p className="text-base sm:text-lg text-ink-soft mb-6 leading-relaxed max-w-lg">
                Type it the way you'd say it. {CALCULATORS_REGISTRY.length} free calculators for
                money, health, school and everyday life.
              </p>

              <div className="relative mb-4">
                <div className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-surface pl-4 pr-2 py-2">
                  <Search className="w-5 h-5 text-ink-faint flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder='Try "mortgage", "tip", "GPA" or "pounds to kg"'
                    className="flex-1 min-w-0 py-1.5 text-sm sm:text-base text-ink placeholder-ink-faint outline-none bg-transparent"
                  />
                  <button
                    onClick={() => router.push(`/calculators?search=${encodeURIComponent(searchTerm)}`)}
                    className="flex-shrink-0 px-4 sm:px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </button>
                </div>

                {showResults && searchTerm && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-hairline rounded-xl overflow-hidden shadow-lg z-30">
                    {searchResults.length > 0 ? (
                      searchResults.map((calc) => (
                        <a
                          key={calc.id}
                          href={calc.path}
                          className="flex items-center gap-3 p-3 hover:bg-cream transition-colors no-underline border-b border-hairline last:border-0"
                        >
                          <span className="text-xl">{calc.icon}</span>
                          <div>
                            <div className="text-ink text-sm font-medium">{calc.name}</div>
                            <div className="text-ink-faint text-xs">{calc.desc}</div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-ink-faint text-sm">No results for "{searchTerm}"</div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-ink-faint mr-1">Popular:</span>
                {POPULAR_PILLS.map((calc) => (
                  <a
                    key={calc.id}
                    href={calc.path}
                    className="px-3 py-1.5 rounded-full border border-hairline bg-surface text-sm text-ink-soft hover:border-blue-300 hover:text-ink transition-colors no-underline"
                  >
                    {calc.name.replace(" Calculator", "")}
                  </a>
                ))}
              </div>

              {recent.length > 0 && (
                <div className="bg-surface border border-hairline rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-ink">
                      <Clock className="w-4 h-4 text-ink-faint" />
                      Pick up where you left off
                    </div>
                    <span className="text-xs text-ink-faint">Saved on this device only</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <a
                        key={r.path}
                        href={r.path}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cream text-sm text-ink hover:bg-hairline transition-colors no-underline"
                      >
                        <span>{r.icon}</span>
                        <span className="font-medium">{r.name.replace(" Calculator", "")}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <LiveWidget />
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <FeaturedCalculator />

      {/* ── MOST USED ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-12" aria-labelledby="calculators-heading">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 id="calculators-heading" className="text-xl sm:text-2xl font-bold text-ink">
              Most used
            </h2>
            <a href="/calculators" className="text-sm font-medium text-blue-600 hover:underline">
              See all →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {getPopularCalculators(8).map((calc) => (
              <CalculatorCard key={calc.id} calculator={calc} onClick={() => router.push(calc.path)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERY CALCULATOR, ONE CLICK AWAY ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">Every calculator, one click away</h2>
            <span className="text-sm text-ink-faint">{CALCULATORS_REGISTRY.length} tools in {categoryEntries.length} groups</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryEntries.map(([key, cat]) => {
              const calcsInCategory = getCalculatorsByCategory(key);
              return (
                <div key={key} className="bg-surface border border-hairline rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{cat.icon}</span>
                    <h3 className="font-bold text-ink">{cat.name}</h3>
                    <span className="ml-auto text-xs text-ink-faint">{calcsInCategory.length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {calcsInCategory.slice(0, 6).map((calc) => (
                      <a
                        key={calc.id}
                        href={calc.path}
                        className="block text-sm text-blue-600 hover:underline no-underline"
                      >
                        {calc.name.replace(" Calculator", "")}
                      </a>
                    ))}
                    <a href={cat.basePath} className="block text-sm font-semibold text-ink hover:underline pt-1 underline">
                      All {calcsInCategory.length} {cat.name.split(" ")[0].toLowerCase()} tools →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto bg-blue-50 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {VALUE_PROPS.map((item) => (
              <div key={item.title}>
                <div className="text-xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ── */}
      <section className="px-4 sm:px-6 py-14 md:py-20" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-2xl md:text-3xl font-bold mb-6 text-center text-ink">
            Why Use Numrexo Free Online Calculators?
          </h2>

          <div className="space-y-5 text-ink-soft leading-relaxed text-[15px]">
            {SEO_CONTENT.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 sm:px-6 py-14 md:py-20 bg-cream" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Help</span>
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mt-2 text-ink">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="bg-surface border border-hairline rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-ink font-medium text-[15px] list-none select-none hover:text-blue-600 transition-colors">
                  {faq.q}
                  <span className="ml-4 text-blue-600 group-open:rotate-180 transition-transform text-lg" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <p className="px-6 pb-5 pt-4 text-ink-faint text-sm leading-relaxed border-t border-hairline m-0">
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
