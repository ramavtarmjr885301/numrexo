"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  {
    q: "What is PPF and who can open it?",
    a: "Public Provident Fund (PPF) is a government-backed, tax-saving investment scheme in India. Any Indian resident can open a PPF account at any post office or authorized bank (SBI, HDFC, ICICI, etc.). Minors can open through guardians. NRIs can maintain existing accounts but cannot open new ones. Maximum 1 account per person.",
  },
  {
    q: "What is the current PPF interest rate?",
    a: "PPF interest rates are set quarterly by the Government of India. Current rate (2025-26) is 7.1% per annum. Interest is calculated monthly on the lowest balance between the 5th and last day of each month, but credited annually on March 31st. Rates are typically 7-8% and have been stable for decades.",
  },
  {
    q: "What is the minimum and maximum PPF investment?",
    a: "Minimum annual deposit is ₹500. Maximum is ₹1,50,000 per financial year. You can invest in lump sum or up to 12 installments per year. Deposits above ₹1.5 lakh earn no interest and don't qualify for tax benefits. For minors, the limit applies per guardian (not per child).",
  },
  {
    q: "What is the PPF lock-in period?",
    a: "PPF has a 15-year lock-in period from account opening. Partial withdrawals allowed from year 7 (max 50% of previous year's balance). Loan facility available from year 3-5 (25% of balance). After 15 years, you can extend in 5-year blocks with or without further contributions.",
  },
  {
    q: "Is PPF tax-free?",
    a: "Yes! PPF follows EEE (Exempt-Exempt-Exempt) tax status: Deposits qualify for Section 80C deduction up to ₹1.5 lakh, Interest earned is completely tax-free, Maturity amount is tax-free. This makes PPF one of the most tax-efficient investments in India, with effective returns of 7-9% post-tax.",
  },
  {
    q: "Can I withdraw PPF before 15 years?",
    a: "Premature closure is allowed only for: Medical emergencies (life-threatening illness), Higher education expenses (children), Change of residency (moving abroad). Premature closure incurs 1% penalty on interest. Partial withdrawals are easier: from year 7, you can withdraw up to 50% of the previous year's balance.",
  },
  {
    q: "Can I extend PPF after 15 years?",
    a: "Yes! You can extend PPF in 5-year blocks: Block 1 (15-20 years), Block 2 (20-25 years), etc. During extension, you can choose to: Continue contributing (withdraw up to 60% of balance), or Stop contributing (withdraw any amount anytime). Extended PPF continues earning interest and tax benefits.",
  },
  {
    q: "How is PPF interest calculated?",
    a: "PPF interest is calculated monthly on the minimum balance between the 5th and last day of each month. Interest is credited annually on March 31st. Example: Deposit ₹1,00,000 on April 1st at 7.1% = ₹7,100 interest for the year. Depositing before the 5th of each month maximizes interest earnings.",
  },
  {
    q: "PPF vs FD vs Mutual Funds - which is better?",
    a: "PPF (7-8% returns): Best for risk-free, tax-free, long-term (15+ years) goals. FD (6-7% returns): Good for 1-5 year goals, but interest is taxable. Debt Mutual Funds (7-9% returns): Better liquidity, but taxed as capital gains. For retirement/kid's education, PPF is excellent. For 3-5 year goals, FDs are better. For wealth creation (10+ years), equity mutual funds (10-12% returns) are superior.",
  },
  {
    q: "How much PPF maturity amount after 15 years?",
    a: "At 7.1% interest, investing ₹1.5 lakh annually for 15 years gives maturity of approximately ₹40 lakhs (total investment ₹22.5 lakhs, interest ₹17.5 lakhs). For maximum benefit, invest ₹1.5 lakh every year before April 5th to earn interest for the full year. Our calculator shows exact projections.",
  },
];

const PPF_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PPF Calculator – Public Provident Fund Calculator",
  description: "Calculate PPF maturity amount, total interest earned, and tax benefits. Plan your 15-year PPF investment strategy for retirement and tax saving.",
  url: "https://numrexo.com/finance/ppf-calculator",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Numrexo" },
});

export default function PPFCalculator() {
  const [annualInvestment, setAnnualInvestment] = useState("");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const P = parseFloat(annualInvestment);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n) || P < 500 || P > 150000) {
      alert("Please enter valid values. Annual investment must be between ₹500 and ₹1,50,000");
      return;
    }

    if (n < 15) {
      alert("PPF has a minimum 15-year lock-in period. Please enter 15 years or more.");
      return;
    }

    const maturityAmount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const totalInterest = maturityAmount - totalInvestment;
    const taxSaving80C = Math.min(P, 150000) * 0.3;
    const effectiveReturn = ((maturityAmount / totalInvestment) * 100 / n).toFixed(2);

    setResult({
      maturityAmount: Math.round(maturityAmount).toLocaleString("en-IN"),
      totalInvestment: Math.round(totalInvestment).toLocaleString("en-IN"),
      totalInterest: Math.round(totalInterest).toLocaleString("en-IN"),
      interestPercentage: ((totalInterest / totalInvestment) * 100).toFixed(1),
      taxSaving: Math.round(taxSaving80C).toLocaleString("en-IN"),
      effectiveReturn,
      years: n,
      annualInvestment: P,
    });
  };

  const resetForm = () => {
    setAnnualInvestment("");
    setRate("7.1");
    setYears("15");
    setResult(null);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PPF_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://numrexo.com/finance" className="hover:text-gray-300">Finance Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">PPF Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">PPF Investment Details</h3>
            <p className="text-xs text-gray-500 mt-1">Government of India, EEE Tax Benefit</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Annual Investment (Min ₹500, Max ₹1,50,000)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="50000"
                  min="500"
                  max="150000"
                  value={annualInvestment}
                  onChange={(e) => setAnnualInvestment(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹/year</span>
              </div>
              <p className="text-xs text-green-500 mt-1">✓ Up to ₹1.5 lakh tax deduction under Section 80C</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Interest Rate (Current: 7.1% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="7.1"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Rate set quarterly by Govt of India (compounded annually)</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                Tenure (Minimum 15 years)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="15"
                  min="15"
                  max="50"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">15-year lock-in, extendable in 5-year blocks</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all"
              >
                Calculate PPF Returns →
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <ResultBox
          title="PPF Maturity Amount"
          isEmpty={!result}
          emptyIcon="💰"
          emptyText="Enter PPF details and press Calculate"
          mainResult={result ? {
            label: "Total Maturity Amount (Tax-Free)",
            value: `₹${result.maturityAmount}`,
            color: "text-indigo-400",
          } : undefined}
          extraRows={result ? [
            { label: "Total Investment (15 years)", value: `₹${result.totalInvestment}` },
            { label: "Total Interest Earned", value: `₹${result.totalInterest}`, valueColor: "text-green-400" },
            { label: "Interest-to-Investment Ratio", value: `${result.interestPercentage}%` },
            { label: "Tax Saving (30% bracket)", value: `₹${result.taxSaving}`, valueColor: "text-yellow-400" },
            { label: "Effective Annual Return", value: `${result.effectiveReturn}% (post-tax)` },
          ] : undefined}
        />
      </div>

      {/* ─── EXPANDED SEO CONTENT (~1750 WORDS) ─── */}

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About PPF Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          The <strong className="text-gray-300">Public Provident Fund (PPF)</strong> is one of India's most popular long-term, tax-free investment schemes. Backed by the Government of India, PPF offers guaranteed returns with EEE (Exempt-Exempt-Exempt) tax status - deposits, interest, and maturity are all tax-free.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our PPF calculator helps you project your maturity amount, total interest earned, and tax savings. Perfect for retirement planning, children's education, and building a risk-free corpus.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">How to Use This PPF Calculator</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">annual investment</strong> (₹500 to ₹1,50,000).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">current PPF interest rate</strong> (7.1% as of 2025-26).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">tenure</strong> (minimum 15 years).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate PPF Returns"</strong> to see your maturity amount.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> View total investment, interest earned, and tax savings.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Why Use a PPF Calculator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-indigo-400 mb-2">✓ Retirement Planning</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Project your retirement corpus with tax-free PPF returns. Plan your golden years with confidence.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Tax Saving</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Calculate your Section 80C tax savings. Understand the true post-tax return of PPF investment.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Goal Planning</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Plan for children's education, wedding, or home purchase with a safe, guaranteed investment.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Compare Options</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Compare PPF with FD, mutual funds, and other investment options. Choose the best for your goals.</p>
          </div>
        </div>
      </section>

      {/* PPF Formula */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">PPF Formula & Calculation</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-white font-mono text-sm mb-2">Maturity = P × ((1 + r)ⁿ - 1) / r × (1 + r)</p>
          <p className="text-gray-500 text-xs mb-2">Where: P = Annual Investment, r = Annual Interest Rate, n = Number of Years</p>
          <p className="text-gray-500 text-xs">Interest is calculated monthly (on lowest balance 5th-30th) but credited annually on March 31st.</p>
        </div>
      </section>

      {/* Year by Year Breakdown */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">PPF Investment Calculator - Year by Year</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400">Year</th>
                  <th className="text-right py-3 px-4 text-gray-400">Annual Investment</th>
                  <th className="text-right py-3 px-4 text-gray-400">Cumulative Investment</th>
                  <th className="text-right py-3 px-4 text-gray-400">Interest @7.1%</th>
                  <th className="text-right py-3 px-4 text-gray-400">Year End Balance</th>
                </tr>
              </thead>
              <tbody>
                {result && (() => {
                  const P = result.annualInvestment;
                  const r = 0.071;
                  const rows = [];
                  let balance = 0;
                  for (let i = 1; i <= Math.min(result.years, 10); i++) {
                    balance = (balance + P) * (1 + r);
                    rows.push(
                      <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                        <td className="py-2 px-4 text-gray-300">{i}</td>
                        <td className="py-2 px-4 text-right text-gray-400">₹{P.toLocaleString("en-IN")}</td>
                        <td className="py-2 px-4 text-right text-gray-400">₹{(P * i).toLocaleString("en-IN")}</td>
                        <td className="py-2 px-4 text-right text-green-400">₹{Math.round(balance - (P * i)).toLocaleString("en-IN")}</td>
                        <td className="py-2 px-4 text-right text-white font-semibold">₹{Math.round(balance).toLocaleString("en-IN")}</td>
                      </tr>
                    );
                  }
                  return rows;
                })()}
                {!result && (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-500">Enter values above to see year-by-year breakdown</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {result && result.years > 10 && (
            <div className="p-4 text-center text-gray-500 text-xs border-t border-gray-800">
              + {result.years - 10} more years (full breakdown available in detailed report)
            </div>
          )}
        </div>
      </section>

      {/* PPF Key Benefits */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">PPF Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="text-sm font-semibold text-green-400 mb-1">Tax-Free Returns (EEE)</h3>
            <p className="text-xs text-gray-400">Deposits, interest, and maturity - all completely tax-free under Section 80C.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="text-sm font-semibold text-green-400 mb-1">Government Backed</h3>
            <p className="text-xs text-gray-400">Sovereign guarantee - your principal is 100% safe with no market risk.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="text-sm font-semibold text-green-400 mb-1">Compounding Benefits</h3>
            <p className="text-xs text-gray-400">15+ years of tax-free compounding generates substantial wealth.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-2">🏦</div>
            <h3 className="text-sm font-semibold text-green-400 mb-1">Easy Access</h3>
            <p className="text-xs text-gray-400">Open at any post office or authorized bank (SBI, HDFC, ICICI).</p>
          </div>
        </div>
      </section>

      {/* PPF vs FD vs Mutual Funds */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">PPF vs FD vs Mutual Funds</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Feature</th><th className="text-left py-3 px-4 text-gray-400">PPF</th><th className="text-left py-3 px-4 text-gray-400">FD</th><th className="text-left py-3 px-4 text-gray-400">Mutual Funds</th></tr></thead>
            <tbody>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Returns</td><td className="py-2 px-4 text-yellow-400">7-8%</td><td className="py-2 px-4 text-yellow-400">6-7%</td><td className="py-2 px-4 text-yellow-400">8-12%</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Tax Status</td><td className="py-2 px-4 text-green-400">EEE (Tax-Free)</td><td className="py-2 px-4 text-red-400">Taxable</td><td className="py-2 px-4 text-yellow-400">LTCG/STCG</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Lock-in</td><td className="py-2 px-4">15 years</td><td className="py-2 px-4">1-5 years</td><td className="py-2 px-4">None</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Risk</td><td className="py-2 px-4 text-green-400">Very Low</td><td className="py-2 px-4 text-green-400">Very Low</td><td className="py-2 px-4 text-yellow-400">Moderate-High</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}