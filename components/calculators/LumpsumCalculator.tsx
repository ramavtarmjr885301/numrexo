// components/calculators/LumpsumCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function LumpsumCalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("12");
    const [years, setYears] = useState("10");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const n = parseFloat(years);
        if (!P || !r || !n) { alert("Enter valid values"); return; }

        const maturity = P * Math.pow(1 + r, n);
        const totalInterest = maturity - P;

        setResult({ maturity: Math.round(maturity).toLocaleString("en-IN"), principal: P.toLocaleString("en-IN"), interest: Math.round(totalInterest).toLocaleString("en-IN"), cagr: r * 100 });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Investment Details</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Principal Amount</label><div className="relative"><input type="number" placeholder="100000" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return</label><div className="relative"><input type="number" placeholder="12" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Time Period</label><div className="relative"><input type="number" placeholder="10" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold">Calculate Lumpsum Returns →</button></div></div><ResultBox title="Investment Returns" isEmpty={!result} emptyIcon="💰" emptyText="Enter investment details" mainResult={result ? { label: "Maturity Amount", value: `₹${result.maturity}`, color: "text-indigo-400" } : undefined} extraRows={result ? [{ label: "Principal Amount", value: `₹${result.principal}` }, { label: "Total Interest", value: `₹${result.interest}`, valueColor: "text-green-400" }, { label: "CAGR Return", value: `${result.cagr}%` }] : undefined} /></div>);
}