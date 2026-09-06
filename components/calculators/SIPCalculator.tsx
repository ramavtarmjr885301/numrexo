"use client";

import { useState, useEffect } from "react";

import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
  {
    q: "What is a SIP and how does it work?",
    a: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly/quarterly) in mutual funds. You get more units when prices are low and fewer when prices are high, benefiting from rupee cost averaging. This disciplined approach removes the need to time the market and harnesses the power of compounding to build wealth over the long term. SIPs are ideal for salaried individuals looking to invest regularly without worrying about market volatility.",
  },
  {
    q: "What is the minimum SIP amount?",
    a: "Most mutual funds allow SIPs starting from just ₹500 per month. Some funds offer as low as ₹100 for specific schemes like children's funds or ELSS. The low minimum makes SIPs accessible to almost everyone, regardless of income level. You can start with a small amount and gradually increase your investment as your income grows. Many fund houses also offer daily, weekly, or quarterly SIP options for added flexibility.",
  },
  {
    q: "How are SIP returns calculated?",
    a: "SIP returns use the future value of an annuity formula: FV = P × ((1 + r)ⁿ - 1) / r × (1 + r), where P is monthly investment, r is monthly return rate (annual return divided by 12 and 100), and n is number of months. This formula accounts for the compounding effect on each monthly investment. Our calculator uses this exact formula to provide accurate estimates of your future corpus based on your investment amount, expected returns, and tenure.",
  },
  {
    q: "What is the difference between SIP and lump sum?",
    a: "SIP spreads investment over time, reducing timing risk and enabling rupee cost averaging. You buy more units when markets are down and fewer when markets are up, smoothing out your average purchase price. Lump sum invests everything at once, which can yield higher returns if timed correctly but carries more risk if you invest at market peaks. For most retail investors, SIPs are recommended as they remove the emotional bias of market timing.",
  },
  {
    q: "Is SIP good for long-term wealth creation?",
    a: "Yes! SIPs are excellent for long-term goals. Investing ₹10,000 monthly for 20 years at 12% returns can grow to approximately ₹1 crore. The power of compounding works exceptionally well with regular investments. The longer you stay invested, the more significant the compounding effect becomes. For example, a 10-year SIP of ₹10,000 at 12% returns yields about ₹23 lakhs, while 20 years yields approximately ₹1 crore – more than 4x the amount in double the time.",
  },
  {
    q: "Can I modify or stop my SIP?",
    a: "Yes, most mutual funds allow you to increase, decrease, pause, or stop your SIP anytime without penalties. You can also skip installments if needed. No exit load applies to stopping a SIP. However, if you redeem your mutual fund units before the specified holding period (usually 1-3 years for equity funds), exit load may apply. Most fund houses have online portals where you can modify your SIP with just a few clicks.",
  },
  {
    q: "What are the tax implications of SIP?",
    a: "For equity funds, LTCG (holding over 1 year) above ₹1 lakh per year is taxed at 10%. STCG (holding under 1 year) is taxed at 15%. For debt funds, capital gains are added to income and taxed per your income slab. ELSS SIPs qualify for Section 80C deduction up to ₹1.5 lakh, making them tax-efficient for long-term goals. Indexation benefit is available for debt funds held for 3+ years, significantly reducing tax liability.",
  },
  {
    q: "What is XIRR in SIP?",
    a: "XIRR (Extended Internal Rate of Return) is the true annualized return of your SIP, accounting for multiple investments at different times. Unlike simple returns, XIRR considers the timing of each investment and is the most accurate measure of SIP performance. Our calculator shows absolute returns and approximate CAGR. For exact XIRR, use investment tracking software or mutual fund apps which automatically calculate this for your portfolio.",
  },
  {
    q: "What are the different types of SIPs?",
    a: "Major SIP types include: 1) Regular SIP - fixed amount monthly, 2) Top-up SIP - increase investment annually, 3) Flexible SIP - vary amounts based on market conditions, 4) Perpetual SIP - no end date, 5) Trigger SIP - invest based on market triggers, 6) Multi SIP - invest in multiple funds through one SIP. Each type serves different investment goals. Top-up SIPs are popular for salaried individuals who get annual increments.",
  },
  {
    q: "How to choose the right mutual fund for SIP?",
    a: "Choosing the right fund: 1) Check past performance (5-10 years), 2) Compare fund returns vs benchmark, 3) Assess fund manager's track record, 4) Consider expense ratio (lower is better), 5) Match with your risk tolerance (equity vs debt), 6) Check fund house reputation, 7) Look at AUM size (₹500+ crore is stable), 8) Consider exit load period, 9) Review portfolio holdings quality, 10) Use our SIP calculator to project returns at different rates. Always invest based on your financial goals and risk profile.",
  },
];

const FUND_TYPE_RETURNS = [
  { type: "Large Cap Equity Funds", expectedReturn: "10-14%", risk: "Moderate", timeHorizon: "5+ years" },
  { type: "Mid Cap Equity Funds", expectedReturn: "12-16%", risk: "High", timeHorizon: "7+ years" },
  { type: "Small Cap Equity Funds", expectedReturn: "14-18%", risk: "Very High", timeHorizon: "10+ years" },
  { type: "Hybrid Funds", expectedReturn: "8-12%", risk: "Moderate", timeHorizon: "3-5 years" },
  { type: "Debt Funds", expectedReturn: "6-9%", risk: "Low", timeHorizon: "1-3 years" },
  { type: "ELSS Funds (Tax Saving)", expectedReturn: "10-14%", risk: "Moderate", timeHorizon: "3+ years" },
  { type: "Index Funds", expectedReturn: "8-12%", risk: "Moderate", timeHorizon: "5+ years" },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const WEBAPP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SIP Calculator – Systematic Investment Plan Calculator",
  description: "Calculate returns on your mutual fund SIP investments. Estimate future value, total investment, and wealth gained with power of compounding.",
  url: "https://numrexo.com/finance/sip-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["SIP return calculation", "Wealth multiplier", "Investment projection", "Compounding analysis"],
  author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
    { "@type": "ListItem", position: 3, name: "SIP Calculator", item: "https://numrexo.com/finance/sip-calculator" },
  ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const resetForm = () => {
    setMonthlyInvestment("");
    setAnnualReturn("12");
    setYears("10");
    setResult(null);
  };
useEffect(() => {
    document.title = "SIP Calculator – Calculate Mutual Fund SIP Returns Online | Numrexo";

    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent =
      "Free SIP Calculator to estimate your mutual fund investment returns. Calculate future value, total investment & wealth gained through the power of compounding.";

    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionContent);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }
  }, []);
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
        
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">
                <span itemProp="name">Home</span> {/* ✅ Span added */}
            </a>
            <meta itemProp="position" content="1" />
        </li>
        
        <li className="text-gray-700">/</li>
        
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            {/* ✅ URL aur Span dono fix kar diye hain */}
            <a href="https://numrexo.com/investment" itemProp="item" className="hover:text-gray-300">
                <span itemProp="name">Investment Calculators</span> 
            </a>
            <meta itemProp="position" content="2" />
        </li>
        
        <li className="text-gray-700">/</li>
        
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-300">SIP Calculator</span> {/* ✅ Span added */}
            <meta itemProp="position" content="3" />
        </li>
        
    </ol>
</nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">SIP Investment Details</h3>
            <p className="text-xs text-gray-500 mt-1">Plan your monthly mutual fund investments</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Investment</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="5000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum ₹500 per month</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return Rate</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="12"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Equity funds: 10-14% | Hybrid funds: 8-10% | Debt funds: 6-8%</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Time Period</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="10"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 1 year for meaningful returns</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
              >
                Calculate SIP Returns →
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

        {/* Result Box */}
        <ResultBox
          title="SIP Returns"
          isEmpty={!result}
          emptyIcon="📈"
          emptyText="Enter SIP details and press Calculate"
          mainResult={result ? { label: "Estimated Future Value", value: `₹${result.futureValue}`, color: "text-green-400" } : undefined}
          extraRows={result ? [
            { label: "Total Investment", value: `₹${result.totalInvestment}` },
            { label: "Estimated Returns", value: `₹${result.estimatedReturns}`, valueColor: "text-green-400" },
            { label: "Wealth Multiplier", value: `${result.wealthRatio}x`, valueColor: "text-yellow-400" },
            { label: "Monthly Investment", value: `₹${result.monthlyAmount.toLocaleString()}` },
            { label: "Tenure", value: `${result.years} years at ${result.returnRate}% p.a.` },
          ] : undefined}
        />
      </div>

      {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About SIP Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          A <strong className="text-gray-300">Systematic Investment Plan (SIP)</strong> is one of the most effective ways to build long-term wealth through mutual funds. This calculator helps you estimate the future value of your regular investments, accounting for compounding returns. By investing a fixed amount monthly, you benefit from rupee cost averaging and the power of compounding.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our SIP calculator uses the future value of annuity formula to provide accurate projections based on your monthly investment, expected returns, and investment tenure. It shows you the total investment, estimated returns, and wealth multiplier to help you visualize the growth of your investments.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Whether you're planning for retirement, your child's education, or any other long-term goal, this calculator helps you determine how much you need to invest monthly to achieve your financial targets.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">How to Use This SIP Calculator</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">monthly investment amount</strong> (minimum ₹500).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Set the <strong className="text-white">expected annual return rate</strong> based on fund type.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Choose your <strong className="text-white">investment tenure</strong> in years.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate SIP Returns"</strong> to see your results.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review your <strong className="text-white">future value, total investment, and estimated returns</strong>.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to try different scenarios.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Why Use a SIP Calculator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Goal Planning</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Determine how much to invest monthly to reach your financial goals. Plan for retirement, education, or any other long-term objective.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Return Comparison</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Compare projected returns across different investment amounts, tenures, and expected rates. Make informed investment decisions.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Power of Compounding</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Visualize how compounding works over time. See how your wealth multiplies with regular investments and long-term discipline.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Budget Planning</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Find the right balance between your monthly investment and other expenses. Create a realistic investment plan for your financial future.</p>
          </div>
        </div>
      </section>

      {/* Fund Type Returns Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Expected Returns by Fund Type</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                <th className="text-left py-3 px-4 text-gray-400">Fund Type</th>
                <th className="text-left py-3 px-4 text-gray-400">Expected Return</th>
                <th className="text-left py-3 px-4 text-gray-400">Risk Level</th>
                <th className="text-left py-3 px-4 text-gray-400">Time Horizon</th>
              </tr>
            </thead>
            <tbody>
              {FUND_TYPE_RETURNS.map((fund, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className="py-3 px-4 text-gray-300">{fund.type}</td>
                  <td className="py-3 px-4 text-yellow-400">{fund.expectedReturn}</td>
                  <td className={`py-3 px-4 ${fund.risk === "Very High" ? "text-red-400" :
                    fund.risk === "High" ? "text-orange-400" :
                      fund.risk === "Moderate" ? "text-yellow-400" :
                        "text-green-400"
                    }`}>{fund.risk}</td>
                  <td className="py-3 px-4 text-gray-400">{fund.timeHorizon}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
            * Returns are historical averages and not guaranteed. Past performance doesn't guarantee future results. Consult a financial advisor for personalized advice.
          </p>
        </div>
      </section>

      {/* SIP vs Lump Sum Comparison */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">SIP vs Lump Sum: Which is Better?</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0f1525] border border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">📊 Systematic Investment Plan (SIP)</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>✅ Rupee cost averaging</li>
                <li>✅ Reduced market timing risk</li>
                <li>✅ Disciplined investing habit</li>
                <li>✅ Accessible with small amounts</li>
                <li>✅ Best for long-term wealth building</li>
              </ul>
            </div>
            <div className="bg-[#0f1525] border border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-orange-400 mb-2">💰 Lump Sum Investment</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>✅ Higher returns if timed correctly</li>
                <li>✅ Full capital deployment</li>
                <li>✅ Suitable for windfall gains</li>
                <li>❌ Market timing risk</li>
                <li>❌ Requires larger capital</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3">
            For most retail investors, SIPs are recommended as they remove the emotional bias of market timing and inculcate disciplined investing habits. Lump sum investments can be considered during market corrections or for specific short-term goals.
          </p>
        </div>
      </section>

      {/* Power of Compounding */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">The Power of Compounding</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">₹5,000 Monthly</h4>
            <p className="text-xs text-gray-400">10 years at 12%</p>
            <p className="text-lg font-bold text-green-400 mt-2">₹11.6 Lakhs</p>
            <p className="text-xs text-gray-500">Investment: ₹6 Lakhs</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center border-purple-500/30">
            <h4 className="text-sm font-semibold text-purple-400 mb-2">₹10,000 Monthly</h4>
            <p className="text-xs text-gray-400">15 years at 12%</p>
            <p className="text-lg font-bold text-yellow-400 mt-2">₹50.4 Lakhs</p>
            <p className="text-xs text-gray-500">Investment: ₹18 Lakhs</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center border-green-500/30">
            <h4 className="text-sm font-semibold text-green-400 mb-2">₹10,000 Monthly</h4>
            <p className="text-xs text-gray-400">20 years at 12%</p>
            <p className="text-lg font-bold text-green-400 mt-2">₹1 Crore+</p>
            <p className="text-xs text-gray-500">Investment: ₹24 Lakhs</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">* The longer you stay invested, the more powerful the compounding effect becomes.</p>
      </section>

      {/* SIP Investment Tips */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Smart SIP Investment Tips</h2>
        <ul className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-purple-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Start early:</strong> Even small amounts invested early can grow significantly. A 25-year-old investing ₹5,000 monthly could accumulate over ₹1.5 crores by age 60 at 12% returns.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-purple-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Use Top-up SIP:</strong> Increase your SIP amount by 10-15% annually when your income grows. This accelerates wealth creation significantly.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-purple-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Diversify across fund types:</strong> Don't put all your money in one fund. Spread across large cap, mid cap, and hybrid funds based on your risk profile.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-purple-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Stay invested for the long term:</strong> SIPs work best over 5+ years. Avoid stopping or redeeming during market volatility.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-purple-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Review your portfolio annually:</strong> Check fund performance, switch if underperforming for 2-3 years, and rebalance your asset allocation.</span>
          </li>
        </ul>
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
                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
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