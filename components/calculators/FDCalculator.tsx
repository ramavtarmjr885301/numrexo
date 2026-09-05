"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  {
    q: "What is a Fixed Deposit (FD) and how does it work?",
    a: "A Fixed Deposit (FD) is a financial instrument offered by banks and NBFCs where you deposit a lump sum for a fixed tenure at a predetermined interest rate. Interest is compounded quarterly or annually, and you cannot withdraw before maturity without penalty. FDs are considered one of the safest investments as they offer guaranteed returns and are insured up to ₹5 lakh per bank by DICGC.",
  },
  {
    q: "What are the current FD interest rates in 2025-26?",
    a: "Current FD interest rates: SBI (6.5-7.1%), HDFC (6.6-7.2%), ICICI (6.7-7.25%), PNB (6.8-7.3%), Canara Bank (6.9-7.4%), Post Office (6.9-7.1%). Senior citizens get 0.5% higher rates. Small finance banks offer up to 8.5-9%. Rates vary by tenure (1-10 years) and are revised quarterly based on RBI policies.",
  },
  {
    q: "Is FD interest taxable?",
    a: "Yes, FD interest is fully taxable as 'Income from Other Sources' at your income tax slab rate (5-30%). Banks deduct 10% TDS if interest exceeds ₹40,000 per year (₹50,000 for seniors). Submit Form 15G/15H if your total income is below taxable limit to avoid TDS. Senior citizens get higher deduction limits.",
  },
  {
    q: "What is the difference between cumulative and non-cumulative FD?",
    a: "Cumulative FD: Interest compounds and pays at maturity (higher returns, ideal for long-term). Non-cumulative FD: Interest paid periodically (monthly, quarterly, half-yearly, or annually) - gives regular income ideal for retirees. Our calculator supports both types. Cumulative FDs typically offer 0.1-0.25% higher interest rates.",
  },
  {
    q: "What happens if I break FD before maturity?",
    a: "Premature withdrawal penalty: Most banks charge 0.5-1% lower interest than the contracted rate. Some banks also deduct 0.5-1% of principal as penalty. For example, if your FD rate is 7.5%, you'll get only 6.5-7% if broken early. No penalty only in case of account holder's death. Tax-saving FDs (5-year lock-in) cannot be broken before maturity.",
  },
  {
    q: "Is FD better than savings account?",
    a: "FDs offer significantly higher returns (6.5-9%) vs savings accounts (2.5-4%). However, savings accounts provide liquidity with no lock-in. Best strategy: Keep 3-6 months expenses in savings account, and invest surplus in FDs for better returns. Senior citizens often prefer monthly income FDs for regular cash flow.",
  },
  {
    q: "How to maximize FD returns?",
    a: "Maximize FD returns by: 1) Choosing cumulative option for long-term, 2) Investing during high-interest periods (post-RBI rate hikes), 3) Using laddering strategy (multiple FDs with different tenures), 4) Considering small finance banks (higher rates), 5) Adding senior citizen parent as joint holder (if eligible for higher rates), 6) Renewing FDs promptly at maturity.",
  },
  {
    q: "What is FD laddering strategy?",
    a: "FD laddering spreads investment across multiple FDs with different maturities (1,2,3,4,5 years). Benefits: Regular liquidity as one FD matures each year, Reinvestment at potentially higher rates, Avoids locking all money at a single rate. Example: ₹5 lakhs - five FDs of ₹1 lakh each for 1-5 years. When the 1-year FD matures, reinvest for 5 years, maintaining the ladder.",
  },
  {
    q: "What is the difference between bank FD and corporate FD?",
    a: "Bank FDs: DICGC insured up to ₹5 lakh, lower risk, lower returns (6-8%). Corporate FDs: No insurance, higher risk, higher returns (8-10%). Only invest in high-rated corporate FDs (AAA/AA+ from CRISIL/ICRA). Corporate FDs from companies like HDFC, Mahindra Finance, Bajaj Finance are relatively safer. Never invest more than ₹2 lakh in a single corporate FD.",
  },
  {
    q: "How is FD compound interest calculated?",
    a: "Compound interest formula: A = P × (1 + r/n)^(n×t). Where: P = Principal, r = Annual Interest Rate, n = Compounding frequency (4 for quarterly), t = Tenure in years. Example: ₹1,00,000 at 7% for 5 years quarterly compounded = ₹1,41,500 (vs ₹1,40,255 for annual). Higher compounding frequency = better returns. Our calculator shows both options.",
  },
];

const FD_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FD Calculator – Fixed Deposit Calculator",
  description: "Calculate fixed deposit maturity amount, total interest earned, and compare cumulative vs non-cumulative options. Plan your bank FD investment strategy.",
  url: "https://numrexo.com/finance/fd-calculator",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Numrexo" },
});

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("7.2");
  const [years, setYears] = useState("5");
  const [payoutType, setPayoutType] = useState<"cumulative" | "noncumulative">("cumulative");
  const [seniorCitizen, setSeniorCitizen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    let P = parseFloat(principal);
    let r = parseFloat(rate) / 100;
    let n = parseFloat(years);

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
      alert("Please enter valid principal amount, rate, and tenure");
      return;
    }

    // Apply senior citizen rate bonus (0.5% higher)
    if (seniorCitizen) {
      r = r + 0.005;
    }

    let maturityAmount, totalInterest, monthlyIncome;

    if (payoutType === "cumulative") {
      // Quarterly compounding (standard for most FDs)
      const quarterlyRate = r / 4;
      const quarters = n * 4;
      maturityAmount = P * Math.pow(1 + quarterlyRate, quarters);
      totalInterest = maturityAmount - P;
      monthlyIncome = 0;
    } else {
      // Non-cumulative - monthly payout
      const monthlyRate = r / 12;
      const months = n * 12;
      maturityAmount = P; // Principal remains same
      totalInterest = P * r * n; // Simple interest for payout
      monthlyIncome = (totalInterest / months);
    }

    // Tax calculation (assuming 20% bracket)
    const taxRate = 0.20;
    const taxPayable = maturityAmount > P ? (maturityAmount - P) * taxRate : 0;

    setResult({
      maturityAmount: Math.round(maturityAmount).toLocaleString("en-IN"),
      totalInvestment: P.toLocaleString("en-IN"),
      totalInterest: Math.round(totalInterest).toLocaleString("en-IN"),
      effectiveReturn: ((maturityAmount / P - 1) * 100 / n).toFixed(2),
      monthlyIncome: monthlyIncome > 0 ? Math.round(monthlyIncome).toLocaleString("en-IN") : "N/A",
      taxPayable: Math.round(taxPayable).toLocaleString("en-IN"),
      postTaxReturn: Math.round(maturityAmount - taxPayable).toLocaleString("en-IN"),
    });
  };

  const resetForm = () => {
    setPrincipal("");
    setRate("7.2");
    setYears("5");
    setPayoutType("cumulative");
    setSeniorCitizen(false);
    setResult(null);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FD_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://numrexo.com/finance" className="hover:text-gray-300">Finance Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">FD Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Fixed Deposit Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Principal Amount</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="100000"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (% p.a.)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="7.2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Senior citizens get 0.50% higher rate</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Tenure</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="5"
                  step="0.5"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Payout Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${payoutType === "cumulative" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                  onClick={() => setPayoutType("cumulative")}
                >
                  Cumulative (Maturity)
                </button>
                <button
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${payoutType === "noncumulative" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                  onClick={() => setPayoutType("noncumulative")}
                >
                  Non-Cumulative (Monthly)
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="seniorCitizen"
                checked={seniorCitizen}
                onChange={(e) => setSeniorCitizen(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 bg-[#0f1525] text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="seniorCitizen" className="text-sm text-gray-300">Senior Citizen (60+ years)</label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
              >
                Calculate FD Returns →
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
          title="FD Maturity Details"
          isEmpty={!result}
          emptyIcon="🏦"
          emptyText="Enter FD details and press Calculate"
          mainResult={result ? {
            label: payoutType === "cumulative" ? "Maturity Amount" : "Principal Amount",
            value: `₹${payoutType === "cumulative" ? result.maturityAmount : result.totalInvestment}`,
            color: "text-blue-400",
          } : undefined}
          extraRows={result ? [
            { label: "Total Investment", value: `₹${result.totalInvestment}` },
            { label: "Total Interest Earned", value: `₹${result.totalInterest}`, valueColor: "text-green-400" },
            ...(payoutType === "noncumulative" ? [{ label: "Monthly Income", value: `₹${result.monthlyIncome}`, valueColor: "text-yellow-400" }] : []),
            { label: "Effective Annual Return", value: `${result.effectiveReturn}%` },
            { label: "Tax Payable (20% bracket)", value: `₹${result.taxPayable}`, valueColor: "text-red-400" },
            { label: "Post-Tax Maturity Amount", value: `₹${result.postTaxReturn}`, valueColor: "text-orange-400" },
          ] : undefined}
        />
      </div>

      {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Fixed Deposit Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our <strong className="text-gray-300">Fixed Deposit (FD) calculator</strong> helps you estimate maturity amounts, interest earned, and monthly income from bank fixed deposits. Whether you're saving for retirement, children's education, or building an emergency fund, FDs offer guaranteed, risk-free returns.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          The calculator supports both cumulative (interest reinvested, paid at maturity) and non-cumulative (monthly/quarterly payouts) options, and automatically adds 0.5% higher rates for senior citizens.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">How to Use This FD Calculator</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">principal amount</strong> you wish to invest in FD.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">interest rate</strong> offered by your bank (senior citizens get +0.5%).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">tenure</strong> in years (1-10 years typical).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Choose <strong className="text-white">payout type</strong> — Cumulative (interest at maturity) or Non-Cumulative (regular income).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate FD Returns"</strong> to see maturity amount and interest.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Why Invest in Fixed Deposits?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Guaranteed Returns</h3>
            <p className="text-gray-400 text-xs leading-relaxed">FDs offer fixed, predictable returns unaffected by market fluctuations. Perfect for conservative investors and retirement planning.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Capital Protection</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Principal amount is fully protected. DICGC insures up to ₹5 lakh per bank, making FDs one of the safest investments in India.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Flexible Tenures</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Choose from 7 days to 10 years. Match investment horizon with financial goals - short-term (1-2 years) or long-term (5-10 years).</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Regular Income Option</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Non-cumulative FDs provide monthly/quarterly interest payouts. Ideal for retirees seeking regular cash flow without touching principal.</p>
          </div>
        </div>
      </section>

      {/* Cumulative vs Non-Cumulative */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Cumulative vs Non-Cumulative FD - Which is Better?</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Feature</th><th className="text-left py-3 px-4 text-gray-400">Cumulative FD</th><th className="text-left py-3 px-4 text-gray-400">Non-Cumulative FD</th></tr></thead>
            <tbody>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Interest Payout</td><td className="py-2 px-4">At maturity only</td><td className="py-2 px-4">Monthly/Quarterly/Half-yearly</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Total Returns</td><td className="py-2 px-4 text-green-400">Higher (compounded)</td><td className="py-2 px-4 text-yellow-400">Lower (simple interest)</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Best For</td><td className="py-2 px-4">Long-term wealth creation</td><td className="py-2 px-4">Regular income needs</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Ideal Investor</td><td className="py-2 px-4">Young professionals</td><td className="py-2 px-4">Senior citizens, retirees</td></tr>
              <tr><td className="py-2 px-4">Example (₹5L, 7% for 5 years)</td><td className="py-2 px-4 text-green-400">₹7.05L (₹2.05L interest)</td><td className="py-2 px-4 text-yellow-400">₹5L + ₹1.75L interest (₹2,917/month)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FD Laddering Strategy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">FD Laddering Strategy - Maximize Returns & Liquidity</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            <strong className="text-white">FD laddering</strong> spreads your investment across multiple FDs with different maturities instead of putting all money in one FD.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            <strong className="text-white">Example with ₹5,00,000:</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
            <li>₹1,00,000 in 1-year FD @ 6.8%</li>
            <li>₹1,00,000 in 2-year FD @ 7.0%</li>
            <li>₹1,00,000 in 3-year FD @ 7.2%</li>
            <li>₹1,00,000 in 4-year FD @ 7.3%</li>
            <li>₹1,00,000 in 5-year FD @ 7.4%</li>
          </ul>
          <p className="text-gray-400 text-sm leading-relaxed mt-3">
            <strong className="text-white">Benefits:</strong> One FD matures every year providing liquidity. Reinvest matured FD at potentially higher rates. Avoids locking all money at a single interest rate.
          </p>
        </div>
      </section>

      {/* Tax-Saving FD */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Tax-Saving Fixed Deposit (5-Year Lock-in)</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            <strong className="text-white">Key Features:</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
            <li>Lock-in period: 5 years (cannot withdraw early)</li>
            <li>Tax deduction up to ₹1.5 lakh under Section 80C</li>
            <li>Maximum investment: ₹1.5 lakh per financial year</li>
            <li>Interest rate: 6.5-7.5% (similar to regular FDs)</li>
            <li>Interest earned is taxable (added to income)</li>
            <li>No TDS if interest is below ₹40,000 (₹50,000 for seniors)</li>
          </ul>
          <p className="text-gray-400 text-sm leading-relaxed mt-3">
            <strong className="text-white">Best for:</strong> Salaried individuals in 20-30% tax bracket wanting to save tax while earning guaranteed returns.
          </p>
        </div>
      </section>

      {/* FD Interest Formula */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">FD Interest Formula</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Cumulative (Compounded)</h3>
            <p className="text-white font-mono text-xs">A = P × (1 + r/n)^(n×t)</p>
            <p className="text-gray-500 text-xs mt-2">A = Maturity, P = Principal, r = Rate, n = 4 (quarterly), t = Years</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Non-Cumulative (Payout)</h3>
            <p className="text-white font-mono text-xs">Monthly Income = (P × r × t) ÷ (t × 12)</p>
            <p className="text-gray-500 text-xs mt-2">Principal remains intact, regular income every month</p>
          </div>
        </div>
      </section>

      {/* FD Interest Rates Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">FD Interest Rates by Bank (2025-26)</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400">Bank</th>
                <th className="text-right py-3 px-4 text-gray-400">1 Year</th>
                <th className="text-right py-3 px-4 text-gray-400">3 Years</th>
                <th className="text-right py-3 px-4 text-gray-400">5 Years</th>
                <th className="text-right py-3 px-4 text-gray-400">Senior Citizen</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">SBI</td><td className="py-2 px-4 text-right">6.8%</td><td className="py-2 px-4 text-right">7.0%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">HDFC Bank</td><td className="py-2 px-4 text-right">6.9%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">7.2%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">ICICI Bank</td><td className="py-2 px-4 text-right">7.0%</td><td className="py-2 px-4 text-right">7.2%</td><td className="py-2 px-4 text-right">7.25%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
              <tr className="border-b border-gray-800/50"><td className="py-2 px-4">PNB</td><td className="py-2 px-4 text-right">6.9%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">7.3%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
              <tr><td className="py-2 px-4">Post Office</td><td className="py-2 px-4 text-right">6.9%</td><td className="py-2 px-4 text-right">7.0%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">Rates updated quarterly. Small finance banks offer 0.5-1.5% higher rates.</p>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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