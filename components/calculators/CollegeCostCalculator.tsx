"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What costs should I include in college planning?",
        a: "Include tuition, fees, room & board, books, supplies, transportation, and personal expenses. Don't forget inflation - college costs typically rise 3-5% annually.",
    },
    {
        q: "How much should I save for college?",
        a: "A common rule is to save 1/3 of expected costs, pay 1/3 from current income, and cover 1/3 from loans/scholarships. Use this calculator to estimate your specific needs.",
    },
    {
        q: "What is the 529 plan?",
        a: "A 529 plan is a tax-advantaged savings plan designed for education costs. Earnings grow tax-free and withdrawals for qualified expenses are also tax-free.",
    },
];

export default function CollegeCostCalculator() {
    const [tuition, setTuition] = useState("");
    const [roomBoard, setRoomBoard] = useState("");
    const [books, setBooks] = useState("");
    const [transport, setTransport] = useState("");
    const [other, setOther] = useState("");
    const [years, setYears] = useState("4");
    const [inflation, setInflation] = useState("5");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const annualTuition = parseFloat(tuition) || 0;
        const annualRoomBoard = parseFloat(roomBoard) || 0;
        const annualBooks = parseFloat(books) || 0;
        const annualTransport = parseFloat(transport) || 0;
        const annualOther = parseFloat(other) || 0;
        const numYears = parseInt(years) || 4;
        const inflationRate = (parseFloat(inflation) || 5) / 100;

        let totalCost = 0;
        let yearlyBreakdown = [];

        for (let i = 0; i < numYears; i++) {
            const yearCost = (annualTuition + annualRoomBoard + annualBooks + annualTransport + annualOther) * Math.pow(1 + inflationRate, i);
            yearlyBreakdown.push(yearCost);
            totalCost += yearCost;
        }

        setResult({
            totalCost: totalCost.toFixed(2),
            averagePerYear: (totalCost / numYears).toFixed(2),
            firstYearCost: yearlyBreakdown[0].toFixed(2),
            lastYearCost: yearlyBreakdown[yearlyBreakdown.length - 1].toFixed(2),
            yearlyBreakdown: yearlyBreakdown,
            years: numYears,
        });
    };

    const reset = () => {
        setTuition("");
        setRoomBoard("");
        setBooks("");
        setTransport("");
        setOther("");
        setYears("4");
        setInflation("5");
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://www.numrexo.com/education" className="hover:text-gray-300">Education Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">College Cost Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">College Cost Details</h3>
                        <p className="text-xs text-gray-500">Enter annual costs for one year (current prices)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Tuition & Fees (₹/year)</label>
                            <input type="number" step="10000" placeholder="e.g., 200000" value={tuition} onChange={(e) => setTuition(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Room & Board (₹/year)</label>
                            <input type="number" step="5000" placeholder="e.g., 80000" value={roomBoard} onChange={(e) => setRoomBoard(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Books & Supplies (₹/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 15000" value={books} onChange={(e) => setBooks(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Transportation (₹/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 10000" value={transport} onChange={(e) => setTransport(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Personal/Miscellaneous (₹/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 20000" value={other} onChange={(e) => setOther(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Number of Years</label>
                                <select value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                    <option value="1">1 year</option><option value="2">2 years</option><option value="3">3 years</option>
                                    <option value="4">4 years</option><option value="5">5 years</option><option value="6">6+ years</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Inflation (%)</label>
                                <input type="number" step="0.5" placeholder="5" value={inflation} onChange={(e) => setInflation(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="College Cost Summary"
                    isEmpty={!result}
                    emptyIcon="🎓"
                    emptyText="Enter college costs to see total expense"
                    mainResult={result ? { label: "Total College Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Average Per Year", value: `₹${parseFloat(result.averagePerYear).toLocaleString()}` },
                        { label: "First Year Cost", value: `₹${parseFloat(result.firstYearCost).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "Final Year Cost", value: `₹${parseFloat(result.lastYearCost).toLocaleString()}`, valueColor: "text-orange-400" },
                        { label: "Total Years", value: result.years },
                    ] : []}
                />
            </div>

            {result && result.yearlyBreakdown && (
                <div className="mb-8 bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Year-by-Year Breakdown</h3>
                    <div className="space-y-2">
                        {result.yearlyBreakdown.map((cost: number, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-400">Year {idx + 1}</span>
                                <span className="text-white font-medium">₹{Math.round(cost).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About College Cost Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Plan your education budget with inflation-adjusted projections. Includes tuition, housing, books, and all associated expenses.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}