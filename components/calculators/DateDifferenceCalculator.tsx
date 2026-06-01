// components/calculators/DateDifferenceCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function DateDifferenceCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) { alert("Please select valid dates"); return; }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30.44);
        const diffYears = diffDays / 365.25;

        setResult({ days: diffDays, weeks: diffWeeks, months: diffMonths, years: diffYears.toFixed(1) });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Select Dates</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">End Date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold">Calculate Difference →</button></div></div><ResultBox title="Date Difference" isEmpty={!result} emptyIcon="📅" emptyText="Select two dates to calculate difference" mainResult={result ? { label: "Total Days", value: `${result.days} days`, color: "text-teal-400" } : undefined} extraRows={result ? [{ label: "Weeks", value: `${result.weeks} weeks` }, { label: "Months", value: `${result.months} months` }, { label: "Years", value: `${result.years} years` }] : undefined} /></div>);
}