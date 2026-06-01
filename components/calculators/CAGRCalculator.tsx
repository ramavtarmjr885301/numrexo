// components/calculators/CAGRCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is CAGR and why is it important?",
        a: "CAGR (Compound Annual Growth Rate) is the mean annual growth rate of an investment over a specified period longer than one year. It smooths out volatility and gives a clear picture of investment performance. CAGR is the industry standard for comparing investment returns.",
    },
    {
        q: "What is a good CAGR?",
        a: "Good CAGR by investment type: Equity Mutual Funds (12-15%), Direct Stocks (15-20%), Hybrid Funds (9-11%), Debt Funds (7-8%), Fixed Deposits (6-7%). For long-term wealth creation, aim for 12%+ CAGR.",
    },
    {
        q: "How is CAGR different from absolute return?",
        a: "Absolute return: (End Value - Start Value) ÷ Start Value × 100 (ignores time). CAGR accounts for investment period. Example: ₹10,000 to ₹20,000 in 5 years = Absolute return 100%, CAGR = 14.87%. CAGR is more accurate for comparing investments.",
    },
    {
        q: "How to calculate CAGR manually?",
        a: "CAGR = (End Value ÷ Start Value)^(1 ÷ Years) - 1 × 100. Example: ₹10,000 to ₹20,000 in 5 years = (20,000/10,000)^(1/5) - 1 = 14.87%. Our calculator does this instantly.",
    },
];

const CAGR_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAGR Calculator – Compound Annual Growth Rate Calculator",
    description: "Calculate Compound Annual Growth Rate (CAGR) for your investments. Compare mutual fund, stock, and business performance over time.",
    url: "https://www.numrexo.com/finance/cagr-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function CAGRCalculator() {
    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const sv = parseFloat(startValue);
        const ev = parseFloat(endValue);
        const n = parseFloat(years);

        if (!sv || !ev || !n || sv <= 0 || ev <= 0 || n <= 0) {
            alert("Please enter valid values");
            return;
        }

        if (sv >= ev) {
            alert("Ending value must be greater than starting value");
            return;
        }

        const cagr = (Math.pow(ev / sv, 1 / n) - 1) * 100;
        const totalReturn = ((ev - sv) / sv) * 100;
        const absoluteReturn = ev - sv;

        setResult({
            cagr: cagr.toFixed(2),
            totalReturn: totalReturn.toFixed(1),
            absoluteReturn: absoluteReturn.toLocaleString("en-IN"),
            startValue: sv.toLocaleString("en-IN"),
            endValue: ev.toLocaleString("en-IN"),
            years: n,
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CAGR_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">CAGR Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Investment Details</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Starting Value (Initial Investment)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="10000"
                                    value={startValue}
                                    onChange={(e) => setStartValue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Ending Value (Final Amount)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="25000"
                                    value={endValue}
                                    onChange={(e) => setEndValue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Number of Years
                            </label>
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
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate CAGR →
                        </button>
                    </div>
                </div>

                <ResultBox
                    title="CAGR Analysis"
                    isEmpty={!result}
                    emptyIcon="📈"
                    emptyText="Enter investment values and press Calculate"
                    mainResult={result ? {
                        label: "Compound Annual Growth Rate",
                        value: `${result.cagr}%`,
                        color: "text-cyan-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Total Return", value: `${result.totalReturn}%`, valueColor: "text-green-400" },
                        { label: "Absolute Return", value: `₹${result.absoluteReturn}` },
                        { label: "Starting Value", value: `₹${result.startValue}` },
                        { label: "Ending Value", value: `₹${result.endValue}` },
                        { label: "Period", value: `${result.years} years` }
                    ] : undefined}
                />
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                    About CAGR Calculator
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    <strong className="text-gray-300">Compound Annual Growth Rate (CAGR)</strong> is the most accurate
                    way to measure investment performance over time. It represents the mean annual growth rate,
                    smoothing out volatility to give you a clear picture of returns.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Use our CAGR calculator to compare mutual funds, stocks, or any investment that has grown
                    over multiple years. Perfect for financial planning and investment analysis.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    CAGR Formula
                </h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        CAGR = (End Value ÷ Start Value)^(1 ÷ Years) - 1 × 100
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                        Example: ₹10,000 to ₹25,000 in 5 years = (25,000/10,000)^(1/5) - 1 = 20.11% CAGR
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Expected CAGR by Investment Type
                </h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Investment Type</th>
                                <th className="text-right py-3 px-4 text-gray-400">Expected CAGR</th>
                                <th className="text-left py-3 px-4 text-gray-400">Risk Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Equity Mutual Funds</td><td className="py-2 px-4 text-right text-green-400">12-15%</td><td className="py-2 px-4">High</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Direct Stocks</td><td className="py-2 px-4 text-right text-green-400">15-20%</td><td className="py-2 px-4">Very High</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Hybrid Funds</td><td className="py-2 px-4 text-right text-yellow-400">9-11%</td><td className="py-2 px-4">Moderate</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Debt Funds</td><td className="py-2 px-4 text-right text-yellow-400">7-8%</td><td className="py-2 px-4">Low</td></tr>
                            <tr><td className="py-2 px-4">Fixed Deposits</td><td className="py-2 px-4 text-right text-blue-400">6-7%</td><td className="py-2 px-4">Very Low</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}