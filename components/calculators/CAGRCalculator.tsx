// components/calculators/CAGRCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function CAGRCalculator() {
    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const sv = parseFloat(startValue);
        const ev = parseFloat(endValue);
        const n = parseFloat(years);
        if (!sv || !ev || !n || sv <= 0 || ev <= 0 || n <= 0) { alert("Enter valid values"); return; }

        const cagr = (Math.pow(ev / sv, 1 / n) - 1) * 100;
        const totalReturn = ((ev - sv) / sv) * 100;

        setResult({ cagr: cagr.toFixed(2), totalReturn: totalReturn.toFixed(1), startValue: sv, endValue: ev, years: n });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Investment Details</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Starting Value</label><div className="relative"><input type="number" placeholder="10000" value={startValue} onChange={(e) => setStartValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Ending Value</label><div className="relative"><input type="number" placeholder="25000" value={endValue} onChange={(e) => setEndValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Years</label><div className="relative"><input type="number" placeholder="5" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold">Calculate CAGR →</button></div></div><ResultBox title="CAGR Analysis" isEmpty={!result} emptyIcon="📈" emptyText="Enter investment values" mainResult={result ? { label: "Compound Annual Growth Rate", value: `${result.cagr}%`, color: "text-cyan-400" } : undefined} extraRows={result ? [{ label: "Total Return", value: `${result.totalReturn}%`, valueColor: "text-green-400" }, { label: "Starting Value", value: `₹${result.startValue}` }, { label: "Ending Value", value: `₹${result.endValue}` }, { label: "Period", value: `${result.years} years` }] : undefined} /></div>);
}