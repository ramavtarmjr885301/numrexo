"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [calcType, setCalcType] = useState<"exclusive" | "inclusive">("exclusive");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(gstRate) / 100;
    if (!a || !r) return;

    let pre: number, gst: number, post: number;
    if (calcType === "exclusive") {
      pre = a;
      gst = a * r;
      post = a + gst;
    } else {
      post = a;
      pre = a / (1 + r);
      gst = post - pre;
    }
    const cgst = gst / 2;
    const sgst = gst / 2;

    setResult({ pre: pre.toFixed(2), gst: gst.toFixed(2), post: post.toFixed(2), cgst: cgst.toFixed(2), sgst: sgst.toFixed(2) });
  };

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(parseFloat(num));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Input Form */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">GST Calculation</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">GST Rate</label>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors cursor-pointer"
            >
              <option value="3">3% – Gold, Silver</option>
              <option value="5">5% – Essential goods</option>
              <option value="12">12% – Processed food, phones</option>
              <option value="18">18% – Most services</option>
              <option value="28">28% – Luxury goods</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  calcType === "exclusive"
                    ? "bg-green-500 text-white"
                    : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                }`}
                onClick={() => setCalcType("exclusive")}
              >
                Add GST
              </button>
              <button
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  calcType === "inclusive"
                    ? "bg-green-500 text-white"
                    : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                }`}
                onClick={() => setCalcType("inclusive")}
              >
                Remove GST
              </button>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all"
          >
            Calculate GST →
          </button>
        </div>
      </div>

      {/* Result */}
      <ResultBox
        title="GST Breakdown"
        isEmpty={!result}
        emptyIcon="🧾"
        emptyText="Enter amount to calculate GST"
        mainResult={result ? {
          label: calcType === "exclusive" ? "Total Amount (with GST)" : "Original Amount (without GST)",
          value: `₹${formatNumber(calcType === "exclusive" ? result.post : result.pre)}`,
          unit: `including ${gstRate}% GST`,
          color: "text-green-400",
        } : undefined}
        extraRows={result ? [
          { label: "Pre-GST Amount", value: `₹${formatNumber(result.pre)}` },
          { label: `Total GST (${gstRate}%)`, value: `₹${formatNumber(result.gst)}`, valueColor: "text-green-400" },
          { label: `CGST (${parseFloat(gstRate) / 2}%)`, value: `₹${formatNumber(result.cgst)}` },
          { label: `SGST (${parseFloat(gstRate) / 2}%)`, value: `₹${formatNumber(result.sgst)}` },
          { label: "Final Amount", value: `₹${formatNumber(result.post)}`, valueColor: "text-green-400" },
        ] : undefined}
      />
    </div>
  );
}