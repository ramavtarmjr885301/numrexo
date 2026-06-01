// components/calculators/ProfitMarginCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function ProfitMarginCalculator() {
    const [cost, setCost] = useState("");
    const [revenue, setRevenue] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const r = parseFloat(revenue);
        if (!c || !r || c <= 0 || r <= 0) { alert("Please enter valid cost and revenue"); return; }

        const profit = r - c;
        const margin = (profit / r) * 100;
        const markup = (profit / c) * 100;

        setResult({ profit: profit.toFixed(2), margin: margin.toFixed(1), markup: markup.toFixed(1), cost: c, revenue: r });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Business Details</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Cost Price (Production)</label><div className="relative"><input type="number" placeholder="500" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Selling Price (Revenue)</label><div className="relative"><input type="number" placeholder="1000" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold">Calculate Profit Margin →</button></div></div><ResultBox title="Profit Analysis" isEmpty={!result} emptyIcon="📊" emptyText="Enter cost and selling price" mainResult={result ? { label: "Profit Margin", value: `${result.margin}%`, color: "text-green-400" } : undefined} extraRows={result ? [{ label: "Profit Amount", value: `₹${result.profit}`, valueColor: "text-green-400" }, { label: "Markup Percentage", value: `${result.markup}%` }, { label: "Cost Price", value: `₹${result.cost}` }, { label: "Selling Price", value: `₹${result.revenue}` }] : undefined} /></div>);
}