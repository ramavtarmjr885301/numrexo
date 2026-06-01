// components/calculators/RDCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function RDCalculator() {
    const [monthlyAmount, setMonthlyAmount] = useState("");
    const [rate, setRate] = useState("7.2");
    const [years, setYears] = useState("5");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const P = parseFloat(monthlyAmount);
        const r = parseFloat(rate) / 100 / 4; // Quarterly compounding for RDs
        const n = parseFloat(years) * 4;

        if (!P || !r || !n) { alert("Enter valid values"); return; }

        const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const totalInvestment = P * parseFloat(years) * 12;
        const totalInterest = maturity - totalInvestment;

        setResult({ maturity: Math.round(maturity).toLocaleString("en-IN"), totalInvestment: totalInvestment.toLocaleString("en-IN"), interest: Math.round(totalInterest).toLocaleString("en-IN") });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">RD Investment Details</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Deposit</label><div className="relative"><input type="number" placeholder="5000" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate</label><div className="relative"><input type="number" placeholder="7.2" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Tenure</label><div className="relative"><input type="number" placeholder="5" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold">Calculate RD Returns →</button></div></div><ResultBox title="RD Maturity Amount" isEmpty={!result} emptyIcon="🏦" emptyText="Enter RD investment details" mainResult={result ? { label: "Maturity Amount", value: `₹${result.maturity}`, color: "text-emerald-400" } : undefined} extraRows={result ? [{ label: "Total Investment", value: `₹${result.totalInvestment}` }, { label: "Total Interest", value: `₹${result.interest}`, valueColor: "text-green-400" }] : undefined} /></div>);
}