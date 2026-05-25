"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n)) {
      alert("Please enter valid values");
      return;
    }

    const maturityAmount = P * Math.pow(1 + r, n);
    const totalInterest = maturityAmount - P;

    setResult({
      maturityAmount: Math.round(maturityAmount).toLocaleString("en-IN"),
      totalInterest: Math.round(totalInterest).toLocaleString("en-IN"),
      principal: P.toLocaleString("en-IN"),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">FD Investment Details</h3>
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
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate</label>
            <div className="relative">
              <input
                type="number"
                placeholder="7.5"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Time Period</label>
            <div className="relative">
              <input
                type="number"
                placeholder="5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate FD Returns →
          </button>
        </div>
      </div>

      <ResultBox
        title="FD Returns"
        isEmpty={!result}
        emptyIcon="🏦"
        emptyText="Enter FD details and press Calculate"
        mainResult={result ? {
          label: "Maturity Amount",
          value: `₹${result.maturityAmount}`,
          color: "text-green-400",
        } : undefined}
        extraRows={result ? [
          { label: "Principal Amount", value: `₹${result.principal}` },
          { label: "Total Interest Earned", value: `₹${result.totalInterest}`, valueColor: "text-green-400" },
        ] : undefined}
      />
    </div>
  );
}