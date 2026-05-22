"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    let n = parseFloat(tenure);
    if (tenureType === "years") n = n * 12;
    if (!p || !r || !n) return;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmt = emi * n;
    const totalInt = totalAmt - p;
    const intPct = ((totalInt / p) * 100).toFixed(1);

    setResult({ emi: emi.toFixed(2), totalAmt: totalAmt.toFixed(2), totalInt: totalInt.toFixed(2), intPct, n });
  };

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(parseFloat(num));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Input Form */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Loan Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (Principal)</label>
            <div className="relative">
              <input
                type="number"
                placeholder="500000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Interest Rate</label>
            <div className="relative">
              <input
                type="number"
                placeholder="8.5"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Tenure</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="5"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
              />
              <select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value as "years" | "months")}
                className="px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors cursor-pointer"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Calculate EMI →
          </button>
        </div>
      </div>

      {/* Result */}
      <ResultBox
        title="EMI Breakdown"
        isEmpty={!result}
        emptyIcon="💰"
        emptyText="Enter loan details to calculate EMI"
        mainResult={result ? {
          label: "Monthly EMI",
          value: `₹${formatNumber(result.emi)}`,
          unit: result ? `for ${result.n} months` : undefined,
          color: "text-purple-400",
        } : undefined}
        extraRows={result ? [
          { label: "Principal Amount", value: `₹${formatNumber(principal)}`, valueColor: "text-purple-400" },
          { label: "Total Interest", value: `₹${formatNumber(result.totalInt)}`, valueColor: "text-red-400" },
          { label: "Total Amount", value: `₹${formatNumber(result.totalAmt)}` },
          { label: "Interest % of Principal", value: `${result.intPct}%` },
        ] : undefined}
      >
        {result && (
          <div className="mt-4 p-3 bg-purple-500/5 border border-purple-500/15 rounded-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              💡 Paying an extra ₹{Math.round(parseFloat(result.emi) * 0.1).toLocaleString("en-IN")}/month can reduce your loan tenure significantly.
            </p>
          </div>
        )}
      </ResultBox>
    </div>
  );
}