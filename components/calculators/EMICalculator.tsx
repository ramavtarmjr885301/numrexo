"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
  {
    q: "What is EMI and how is it calculated?",
    a: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It consists of principal repayment + interest. Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P = Principal, r = Monthly Interest Rate (Annual/12/100), n = Number of Monthly Installments. Our calculator uses this standard reducing balance method used by all major banks.",
  },
  {
    q: "What are the current home loan interest rates?",
    a: "Current home loan rates (2025-26): SBI (8.4-9.2%), HDFC (8.5-9.3%), ICICI (8.6-9.4%), PNB (8.3-9.1%), LIC Housing (8.5-9.2%). Rates depend on: Loan amount (₹30L-₹5Cr), Credit score (750+ gets best rates), Loan-to-Value ratio (LTV), Salaried vs Self-employed, and Type of rate (Fixed vs Floating).",
  },
  {
    q: "What affects my EMI amount?",
    a: "Three main factors affect EMI: 1) Loan Amount - Higher principal = Higher EMI, 2) Interest Rate - Higher rate = Higher EMI, 3) Tenure - Longer tenure = Lower EMI but more total interest. Example: ₹50L loan at 9%: 10 years = ₹63,333 EMI (₹26L interest), 20 years = ₹44,986 EMI (₹58L interest). Choose shorter tenure for less total interest.",
  },
  {
    q: "What is the difference between flat and reducing balance interest?",
    a: "Flat Rate: Interest calculated on full principal throughout tenure (cheaper for bank). Reducing Balance: Interest only on outstanding principal (cheaper for borrower). Most banks use reducing balance. Example: ₹10L at 10% for 5 years: Flat rate EMI = ₹25,000 (Total ₹15L). Reducing balance EMI = ₹21,247 (Total ₹12.75L). Always choose reducing balance loans.",
  },
  {
    q: "How to reduce my EMI or loan burden?",
    a: "Ways to reduce EMI: 1) Make a larger down payment (₹5L extra = ₹1,500 lower EMI), 2) Negotiate lower interest rate (0.5% reduction saves ₹1,000/month on ₹50L), 3) Extend tenure (but increases total interest), 4) Make partial prepayments (lump sum reduces principal), 5) Transfer loan to lower rate lender.",
  },
  {
    q: "What is the EMI for different loan types?",
    a: "Typical EMI ranges (₹10L loan, 5 years): Home Loan (8.5%) = ₹20,500, Car Loan (10%) = ₹21,247, Personal Loan (13%) = ₹22,750, Education Loan (9.5%) = ₹20,000, Gold Loan (12%) = ₹22,244. Rates vary by credit score and lender. Our calculator works for ALL loan types.",
  },
  {
    q: "What is loan amortization schedule?",
    a: "An amortization schedule shows each EMI's split between principal and interest. Initially, interest portion is high (70-80% of EMI). Gradually, principal portion increases. After 60% of tenure, principal exceeds interest. Understanding amortization helps with prepayment planning. Use our detailed table to plan extra payments.",
  },
  {
    q: "Should I choose fixed or floating interest rate?",
    a: "Fixed Rate: EMI constant, protects against rate hikes, but initial rate is 1-2% higher. Floating Rate: EMI changes with market rates, lower initial rate, benefits when rates fall. Recommendation: For loans under 5 years, choose fixed. For 10-30 years, choose floating (historically saves 2-3% over long term).",
  },
  {
    q: "How to calculate home loan EMI for tax benefits?",
    a: "Home loan offers tax benefits: Section 80C (Principal repayment up to ₹1.5L), Section 24(b) (Interest up to ₹2L for self-occupied property). For rental property, no upper limit on interest deduction. Example: ₹50L loan, 9%, 20 years: Annual EMI = ₹5.4L (Principal ₹1.1L + Interest ₹4.3L). You can deduct ₹1.5L principal + ₹2L interest (if self-occupied).",
  },
  {
    q: "What is EMI eligibility and how much loan can I get?",
    a: "Banks use FOIR (Fixed Obligation to Income Ratio): Your total EMIs should not exceed 40-50% of monthly income. Max Loan = (Monthly Income × 50% - Existing EMIs) × [((1+r)^n - 1)/(r×(1+r)^n)]. Example: ₹1L/month income, no existing loans, 9% rate, 20 years = Max loan ≈ ₹75-80L. Use our EMI inverse calculator to find eligible loan amount.",
  },
];

const EMI_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EMI Calculator – Loan EMI Calculator",
  description: "Calculate monthly EMI for home loan, car loan, personal loan, and education loan. Free loan EMI calculator with amortization schedule and prepayment benefits.",
  url: "https://www.numrexo.com/finance/emi-calculator",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "Numrexo" },
});

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [prepayment, setPrepayment] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculate = () => {
    let P = parseFloat(principal);
    let r = parseFloat(rate) / 12 / 100;
    let n = parseFloat(tenure);
    let prepay = parseFloat(prepayment) || 0;

    if (tenureType === "years") n = n * 12;
    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      alert("Please enter valid loan amount, interest rate, and tenure");
      return;
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;
    const intPct = ((totalInterest / P) * 100).toFixed(1);

    // Calculate prepayment benefit
    let reducedTenure = n;
    let interestSaved = 0;
    if (prepay > 0 && prepay <= P) {
      const newPrincipal = P - prepay;
      const newEmi = (newPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      // Binary search to find reduced tenure
      let low = 1, high = n, mid;
      while (low <= high) {
        mid = Math.floor((low + high) / 2);
        const testEmi = (newPrincipal * r * Math.pow(1 + r, mid)) / (Math.pow(1 + r, mid) - 1);
        if (testEmi <= emi) {
          reducedTenure = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }
      const newTotalAmount = emi * reducedTenure;
      const newTotalInterest = newTotalAmount - newPrincipal;
      interestSaved = totalInterest - newTotalInterest - prepay;
    }

    setResult({
      emi: Math.round(emi).toLocaleString("en-IN"),
      totalAmount: Math.round(totalAmount).toLocaleString("en-IN"),
      totalInterest: Math.round(totalInterest).toLocaleString("en-IN"),
      intPct,
      principal: P.toLocaleString("en-IN"),
      tenureMonths: n,
      prepay: prepay > 0 ? prepay.toLocaleString("en-IN") : null,
      reducedTenure: reducedTenure < n ? reducedTenure : null,
      interestSaved: interestSaved > 0 ? Math.round(interestSaved).toLocaleString("en-IN") : null,
    });
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EMI_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/finance" className="hover:text-gray-300">Finance Calculators</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">EMI Calculator</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Loan Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (Principal)</label>
              <div className="relative">
                <input type="number" placeholder="5000000" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Interest Rate</label>
              <div className="relative">
                <input type="number" placeholder="8.5" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Tenure</label>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="5" value={tenure} onChange={(e) => setTenure(e.target.value)} className="px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <select value={tenureType} onChange={(e) => setTenureType(e.target.value as "years" | "months")} className="px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Prepayment (Optional)</label>
              <div className="relative">
                <input type="number" placeholder="0" value={prepayment} onChange={(e) => setPrepayment(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Extra payment to reduce loan tenure and interest</p>
            </div>
            <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate EMI →</button>
          </div>
        </div>

        <ResultBox
          title="EMI Breakdown"
          isEmpty={!result}
          emptyIcon="🏦"
          emptyText="Enter loan details to calculate EMI"
          mainResult={result ? { label: "Monthly EMI", value: `₹${result.emi}`, color: "text-purple-400" } : undefined}
          extraRows={result ? [
            { label: "Principal Amount", value: `₹${result.principal}` },
            { label: "Total Interest Payable", value: `₹${result.totalInterest}`, valueColor: "text-red-400" },
            { label: "Total Amount (Principal + Interest)", value: `₹${result.totalAmount}` },
            { label: "Interest % of Principal", value: `${result.intPct}%` },
            ...(result.prepay ? [
              { label: "Prepayment Amount", value: `₹${result.prepay}`, valueColor: "text-green-400" },
              { label: "Reduced Tenure", value: `${result.reducedTenure} months`, valueColor: "text-green-400" },
              { label: "Interest Saved", value: `₹${result.interestSaved}`, valueColor: "text-green-400" },
            ] : []),
          ] : undefined}
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About EMI Calculator</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our <strong className="text-gray-300">EMI calculator</strong> helps you calculate monthly installments for home loans, car loans, personal loans, education loans, and any other fixed-rate loan. Based on the standard reducing balance method used by all major banks in India.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          The calculator also shows prepayment benefits - how making extra payments can reduce your loan tenure and save thousands in interest.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">EMI Formula</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-white font-mono text-sm mb-2">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div><span className="text-gray-500">P =</span> <span className="text-white">Principal Loan Amount</span></div>
            <div><span className="text-gray-500">r =</span> <span className="text-white">Monthly Interest Rate (Annual/12/100)</span></div>
            <div><span className="text-gray-500">n =</span> <span className="text-white">Number of Monthly Installments</span></div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Loan EMI Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-lg mb-1">🏠</div>
            <h3 className="text-sm font-semibold text-white">Home Loan</h3>
            <p className="text-xs text-gray-400 mt-2">₹50L, 9%, 20 years</p>
            <p className="text-lg font-bold text-purple-400 mt-1">₹44,986</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-lg mb-1">🚗</div>
            <h3 className="text-sm font-semibold text-white">Car Loan</h3>
            <p className="text-xs text-gray-400 mt-2">₹10L, 10%, 5 years</p>
            <p className="text-lg font-bold text-purple-400 mt-1">₹21,247</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <div className="text-lg mb-1">💳</div>
            <h3 className="text-sm font-semibold text-white">Personal Loan</h3>
            <p className="text-xs text-gray-400 mt-2">₹5L, 13%, 3 years</p>
            <p className="text-lg font-bold text-purple-400 mt-1">₹16,830</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
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