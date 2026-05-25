"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n)) {
      alert("Please enter valid values");
      return;
    }

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const estimatedReturns = futureValue - totalInvestment;

    setResult({
      futureValue: Math.round(futureValue).toLocaleString("en-IN"),
      totalInvestment: Math.round(totalInvestment).toLocaleString("en-IN"),
      estimatedReturns: Math.round(estimatedReturns).toLocaleString("en-IN"),
      wealthRatio: ((estimatedReturns / totalInvestment) * 100).toFixed(1),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">SIP Investment Details</h3>
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
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return</label>
            <div className="relative">
              <input
                type="number"
                placeholder="12"
                step="0.5"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Time Period</label>
            <div className="relative">
              <input
                type="number"
                placeholder="10"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate SIP Returns →
          </button>
        </div>
      </div>

      <ResultBox
        title="SIP Returns"
        isEmpty={!result}
        emptyIcon="📈"
        emptyText="Enter SIP details and press Calculate"
        mainResult={result ? {
          label: "Estimated Future Value",
          value: `₹${result.futureValue}`,
          color: "text-green-400",
        } : undefined}
        extraRows={result ? [
          { label: "Total Investment", value: `₹${result.totalInvestment}` },
          { label: "Estimated Returns", value: `₹${result.estimatedReturns}`, valueColor: "text-green-400" },
          { label: "Wealth Gain Ratio", value: `${result.wealthRatio}%` },
        ] : undefined}
      />
    </div>
  );
}