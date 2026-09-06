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
    {
        q: "Can CAGR be negative?",
        a: "Yes, CAGR can be negative if your investment loses value over time. Example: ₹10,000 invested becomes ₹8,000 after 3 years = negative CAGR of -7.2%. Negative CAGR helps you understand losses in bear markets and poor-performing investments.",
    },
    {
        q: "What is the difference between CAGR and XIRR?",
        a: "CAGR assumes a single lump sum investment with no intermediate cash flows. XIRR (Extended Internal Rate of Return) handles multiple investments at different times, like SIPs. For SIP investments, use XIRR; for lump sum, use CAGR.",
    },
    {
        q: "How to use CAGR for comparing mutual funds?",
        a: "Compare 3-year, 5-year, and 10-year CAGR of different mutual funds in the same category. Higher CAGR over longer periods indicates better fund performance. Also compare with benchmark index CAGR (like Nifty 50 CAGR) to see if fund beat the market.",
    },
    {
        q: "What is the CAGR of Nifty 50 historically?",
        a: "Nifty 50 has delivered approximately 14-16% CAGR over the last 20 years (2004-2024), including multiple bull and bear cycles. This demonstrates the power of long-term equity investing despite short-term volatility.",
    },
    {
        q: "How does inflation affect CAGR?",
        a: "Real CAGR = Nominal CAGR - Inflation Rate. If your investment gives 12% CAGR but inflation is 6%, your real return is only 6%. Always consider inflation-adjusted returns for accurate wealth creation assessment.",
    },
    {
        q: "What is a realistic CAGR for retirement planning?",
        a: "For retirement planning, use conservative estimates: Equity (10-12%), Debt (6-7%), Overall portfolio (8-10%). Avoid over-optimistic assumptions like 20%+ CAGR for long-term planning. Better to underestimate and save more.",
    },
];

const CAGR_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAGR Calculator – Compound Annual Growth Rate Calculator",
    description: "Calculate Compound Annual Growth Rate (CAGR) for your investments. Compare mutual fund, stock, and business performance over time.",
    url: "https://numrexo.com/finance/cagr-calculator",
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

    const resetForm = () => {
        setStartValue("");
        setEndValue("");
        setYears("");
        setResult(null);
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate CAGR →
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                            >
                                Reset
                            </button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About CAGR Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    <strong className="text-gray-300">Compound Annual Growth Rate (CAGR)</strong> is the most accurate
                    way to measure investment performance over time. It represents the mean annual growth rate,
                    smoothing out volatility to give you a clear picture of returns. Unlike absolute returns which ignore time,
                    CAGR accounts for the investment period and provides a standardized metric for comparing different investments.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Use our CAGR calculator to compare mutual funds, stocks, or any investment that has grown
                    over multiple years. Perfect for financial planning and investment analysis. Whether you're evaluating
                    your portfolio's performance, comparing two different investment options, or planning for retirement,
                    CAGR gives you the apples-to-apples comparison you need.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our calculator also shows Total Return and Absolute Return, giving you a comprehensive view of your
                    investment's performance. Understanding CAGR helps you make informed decisions about where to invest
                    your money for long-term wealth creation.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This CAGR Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">Starting Value</strong> — the initial amount you invested (lump sum).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">Ending Value</strong> — the final amount your investment has grown to.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">Number of Years</strong> — the total investment period.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">Calculate CAGR</strong> to see your compound annual growth rate.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and analyze a different investment.</p>
                </div>
            </section>

            {/* Benefits of CAGR Analysis */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why CAGR is the Gold Standard for Investment Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-2">✓ Smooths Market Volatility</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">CAGR ignores annual fluctuations and provides a steady average return. Perfect for comparing investments with different volatility patterns.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compares Different Time Periods</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">A 3-year investment with 40% return vs 5-year with 50% return — CAGR tells you which performed better annually.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Standardized Metric</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Mutual fund houses and stock exchanges use CAGR as the standard performance metric. Easy to compare across schemes.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Long-term Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Use historical CAGR to estimate future wealth. Plan retirement, children's education, and major purchases with realistic projections.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World CAGR Examples</h2>
                <div className="space-y-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Example 1: Mutual Fund Performance</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Investment: ₹50,000 in an equity fund | After 7 years: ₹1,20,000 | CAGR = (1,20,000/50,000)^(1/7)-1 = 13.4% | Total Return = 140% | Beats typical FD returns of 6-7% significantly.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Example 2: Stock Market Investment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Investment: ₹2,00,000 in blue-chip stocks | After 10 years: ₹5,00,000 | CAGR = (5,00,000/2,00,000)^(1/10)-1 = 9.6% | Though below market averages, still better than debt funds.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Example 3: Business Growth</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Business revenue: ₹10 lakhs in Year 1 | Revenue after 5 years: ₹30 lakhs | CAGR = (30/10)^(1/5)-1 = 24.6% | Exceptional growth rate, indicating successful scaling.</p>
                    </div>
                </div>
            </section>

            {/* CAGR Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">CAGR Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2 text-center">
                        CAGR = (End Value ÷ Start Value)^(1 ÷ Years) - 1 × 100
                    </p>
                    <p className="text-gray-500 text-xs mb-2 text-center">
                        Example: ₹10,000 to ₹25,000 in 5 years = (25,000/10,000)^(1/5) - 1 = 20.11% CAGR
                    </p>
                    <p className="text-gray-500 text-xs text-center">
                        Formula breakdown: End Value/Start Value = Growth factor | 1/Years = Annualizing | -1 = Convert to percentage
                    </p>
                </div>
            </section>

            {/* Expected CAGR Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Expected CAGR by Investment Type</h2>
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
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Fixed Deposits</td><td className="py-2 px-4 text-right text-blue-400">6-7%</td><td className="py-2 px-4">Very Low</td></tr>
                            <tr><td className="py-2 px-4">PPF/EPF</td><td className="py-2 px-4 text-right text-blue-400">7-8%</td><td className="py-2 px-4">Negligible</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Limitations */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Limitations of CAGR</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Assumes steady growth:</strong> CAGR smooths out volatility and doesn't show year-to-year fluctuations. An investment with 15% CAGR could have negative years and highly positive years.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Not for SIPs:</strong> CAGR assumes lump sum investment with no intermediate cash flows. Use XIRR for SIP calculations.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Past ≠ Future:</strong> Historical CAGR doesn't guarantee future returns. Markets change, funds change managers, economic conditions evolve.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">No risk measure:</strong> CAGR alone doesn't tell you about risk. Two funds with 12% CAGR can have vastly different risk profiles.</span></li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
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