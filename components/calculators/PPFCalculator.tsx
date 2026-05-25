"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function PPFCalculator() {
  const [annualInvestment, setAnnualInvestment] = useState("");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(annualInvestment);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n)) {
      alert("Please enter valid values");
      return;
    }

    // PPF maturity calculation (annual compounding)
    const maturityAmount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const totalInterest = maturityAmount - totalInvestment;

    setResult({
      maturityAmount: Math.round(maturityAmount).toLocaleString("en-IN"),
      totalInvestment: Math.round(totalInvestment).toLocaleString("en-IN"),
      totalInterest: Math.round(totalInterest).toLocaleString("en-IN"),
      interestPercentage: ((totalInterest / totalInvestment) * 100).toFixed(1),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">PPF Investment Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Investment (Min ₹500, Max ₹1,50,000)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="50000"
                min="500"
                max="150000"
                value={annualInvestment}
                onChange={(e) => setAnnualInvestment(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹/year</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (Current: 7.1%)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="7.1"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Tenure (Min 15 years, extendable in 5-year blocks)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="15"
                min="15"
                max="50"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate PPF Returns →
          </button>
        </div>
      </div>

      <ResultBox
        title="PPF Maturity Amount"
        isEmpty={!result}
        emptyIcon="💰"
        emptyText="Enter PPF details and press Calculate"
        mainResult={result ? {
          label: "Maturity Amount",
          value: `₹${result.maturityAmount}`,
          color: "text-indigo-400",
        } : undefined}
        extraRows={result ? [
          { label: "Total Investment", value: `₹${result.totalInvestment}` },
          { label: "Total Interest Earned", value: `₹${result.totalInterest}`, valueColor: "text-green-400" },
          { label: "Interest-to-Investment Ratio", value: `${result.interestPercentage}%` },
          { label: "Tax Benefit", value: "Up to ₹1,50,000 under Section 80C" },
        ] : undefined}
      />
    </div>
  );
}