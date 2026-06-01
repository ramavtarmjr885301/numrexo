"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  { q: "What is a SIP and how does it work?", a: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly/quarterly) in mutual funds. You get more units when prices are low and fewer when prices are high, benefiting from rupee cost averaging." },
  { q: "What is the minimum SIP amount?", a: "Most mutual funds allow SIPs starting from just ₹500 per month. Some funds offer as low as ₹100 for specific schemes like children's funds or ELSS." },
  { q: "How are SIP returns calculated?", a: "SIP returns use the future value of an annuity formula: FV = P × ((1 + r)ⁿ - 1) / r × (1 + r), where P is monthly investment, r is monthly return rate, and n is number of months." },
  { q: "What is the difference between SIP and lump sum?", a: "SIP spreads investment over time, reducing timing risk and enabling rupee cost averaging. Lump sum invests everything at once, which can yield higher returns if timed correctly but carries more risk." },
  { q: "Is SIP good for long-term wealth creation?", a: "Yes! SIPs are excellent for long-term goals. Investing ₹10,000 monthly for 20 years at 12% returns can grow to approximately ₹1 crore. The power of compounding works exceptionally well with regular investments." },
  { q: "Can I modify or stop my SIP?", a: "Yes, most mutual funds allow you to increase, decrease, pause, or stop your SIP anytime without penalties. You can also skip installments if needed. No exit load applies to stopping a SIP." },
  { q: "What are the tax implications of SIP?", a: "For equity funds, LTCG over ₹1 lakh per year is taxed at 10%. STCG (holding under 1 year) is taxed at 15%. For debt funds, capital gains are added to income and taxed per your slab rate. ELSS SIPs qualify for Section 80C deduction up to ₹1.5 lakh." },
  { q: "What is XIRR in SIP?", a: "XIRR (Extended Internal Rate of Return) is the true annualized return of your SIP, accounting for multiple investments at different times. Our calculator shows absolute returns and approximate CAGR. For exact XIRR, use investment tracking software." },
];

const SIP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SIP Calculator – Systematic Investment Plan Calculator",
  description: "Calculate returns on your mutual fund SIP investments. Estimate future value, total investment, and wealth gained with power of compounding.",
  url: "https://www.numrexo.com/finance/sip-calculator",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Numrexo" },
});

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
      alert("Please enter valid investment amount, return rate, and tenure");
      return;
    }

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const estimatedReturns = futureValue - totalInvestment;
    const wealthRatio = (futureValue / totalInvestment).toFixed(2);

    setResult({
      futureValue: Math.round(futureValue).toLocaleString("en-IN"),
      totalInvestment: Math.round(totalInvestment).toLocaleString("en-IN"),
      estimatedReturns: Math.round(estimatedReturns).toLocaleString("en-IN"),
      wealthRatio,
      monthlyAmount: P,
      years: parseFloat(years),
      returnRate: parseFloat(annualReturn),
    });
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SIP_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/finance" className="hover:text-gray-300">Finance Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">SIP Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">SIP Investment Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Investment</label>
              <div className="relative">
                <input type="number" placeholder="5000" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return Rate</label>
              <div className="relative">
                <input type="number" placeholder="12" step="0.5" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Equity funds: 10-14% | Hybrid funds: 8-10% | Debt funds: 6-8%</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Time Period</label>
              <div className="relative">
                <input type="number" placeholder="10" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
              </div>
            </div>
            <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">
              Calculate SIP Returns →
            </button>
          </div>
        </div>

        <ResultBox
          title="SIP Returns"
          isEmpty={!result}
          emptyIcon="📈"
          emptyText="Enter SIP details and press Calculate"
          mainResult={result ? { label: "Estimated Future Value", value: `₹${result.futureValue}`, color: "text-green-400" } : undefined}
          extraRows={result ? [
            { label: "Total Investment", value: `₹${result.totalInvestment}` },
            { label: "Estimated Returns", value: `₹${result.estimatedReturns}`, valueColor: "text-green-400" },
            { label: "Wealth Multiplier", value: `${result.wealthRatio}x` },
          ] : undefined}
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About SIP Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed">A Systematic Investment Plan (SIP) is one of the most effective ways to build long-term wealth through mutual funds. This calculator helps you estimate the future value of your regular investments, accounting for compounding returns.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">SIP Formula</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-white font-mono text-sm mb-2">FV = P × [ (1 + r)ⁿ - 1 ] / r × (1 + r)</p>
          <p className="text-gray-500 text-xs">Where: P = Monthly Investment, r = Monthly Return Rate (Annual/12/100), n = Number of Months</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}