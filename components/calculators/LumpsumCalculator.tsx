// components/calculators/LumpsumCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is lumpsum investment?",
        a: "Lumpsum investment is a one-time investment of a large amount. It's ideal for bonuses, inheritances, or accumulated savings. Returns grow through compounding over time, making it suitable for long-term wealth creation.",
    },
    {
        q: "What is a good return on lumpsum investment?",
        a: "Expected returns by investment type: Equity Mutual Funds (10-14% p.a.), Hybrid Funds (8-10% p.a.), Debt Funds (6-8% p.a.), Fixed Deposits (6-7% p.a.), PPF (7.1% p.a.). Higher returns come with higher risk.",
    },
    {
        q: "What is the formula for lumpsum calculation?",
        a: "A = P × (1 + r)^n, where P = Principal, r = Annual Return Rate, n = Number of Years. Example: ₹1,00,000 at 12% for 10 years = ₹3,10,584.",
    },
    {
        q: "Is lumpsum better than SIP?",
        a: "Lumpsum is better if you have a large amount ready and market timing is favorable. SIP is better for regular monthly savers and rupee cost averaging. For most investors, a combination of both works well.",
    },
    {
        q: "What is the power of compounding in lumpsum?",
        a: "Compounding means earning interest on interest. Example: ₹1L at 12% for 20 years grows to ₹9.65L (9.6x returns!). The longer you stay invested, the more powerful compounding becomes. Albert Einstein called compounding the 'eighth wonder of the world'.",
    },
    {
        q: "How to choose the right investment tenure?",
        a: "Short-term (1-3 years): Debt funds, FD (6-8% returns). Medium-term (3-7 years): Hybrid funds, balanced advantage (8-10% returns). Long-term (7+ years): Equity funds (10-14% returns). Longer tenure = higher risk but much higher returns due to compounding.",
    },
    {
        q: "What is the effect of inflation on lumpsum returns?",
        a: "Inflation (5-6% annually) reduces purchasing power. Real return = Nominal return - Inflation rate. Example: 12% return - 6% inflation = 6% real return. ₹1L after 10 years at 12% = ₹3.1L but inflation-adjusted value = ₹1.73L. Always consider inflation in retirement planning.",
    },
    {
        q: "How to calculate lumpsum for retirement planning?",
        a: "Retirement goal calculator: Current age 30, retire at 60 (30 years). Need ₹1Cr at retirement. Required lumpsum today = ₹1Cr ÷ (1.12)^30 = ₹1Cr ÷ 29.96 = ₹33.4 lakhs. Lower current lumpsum needed if starting earlier. Use our calculator to plan backwards.",
    },
    {
        q: "What is the rule of 72 for lumpsum investments?",
        a: "Rule of 72: Years to double money = 72 ÷ Interest rate. Example: 12% returns → 72÷12 = 6 years to double. 10% returns → 72÷10 = 7.2 years to double. Great for quick mental math. Use our calculator for exact compounding calculations.",
    },
    {
        q: "How to withdraw lumpsum investments tax-efficiently?",
        a: "LTCG tax: Equity funds (>1 year) - 10% on gains above ₹1L/year. Debt funds (>3 years) - 20% with indexation. Strategy: Withdraw up to ₹1L gains tax-free each year from equity. Use systematic withdrawal plans (SWP) for regular income. Hold for 3+ years for indexation benefits.",
    },
];

const LUMPSUM_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Lumpsum Calculator – One-time Investment Calculator",
    description: "Calculate returns on your one-time investment. Estimate future value, total profit, and CAGR for lumpsum investments.",
    url: "https://www.numrexo.com/investment/lumpsum-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function LumpsumCalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("12");
    const [years, setYears] = useState("10");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const n = parseFloat(years);

        if (!P || !r || !n || P <= 0 || r <= 0 || n <= 0) {
            alert("Please enter valid values");
            return;
        }

        const maturity = P * Math.pow(1 + r, n);
        const totalInterest = maturity - P;
        const cagr = r * 100;

        setResult({
            maturity: Math.round(maturity).toLocaleString("en-IN"),
            principal: P.toLocaleString("en-IN"),
            interest: Math.round(totalInterest).toLocaleString("en-IN"),
            cagr: cagr.toFixed(1),
            years: n,
            rate: (r * 100).toFixed(1),
        });
    };

    const resetForm = () => {
        setPrincipal("");
        setRate("12");
        setYears("10");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LUMPSUM_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/investment" className="hover:text-gray-300">Investment Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Lumpsum Calculator</span></li>
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
                                Principal Amount
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="100000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Expected Annual Return
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="12"
                                    step="0.5"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Equity: 10-14% | Hybrid: 8-10% | Debt: 6-8%
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Time Period
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="10"
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
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Lumpsum Returns →
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
                    title="Investment Returns"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter investment details and press Calculate"
                    mainResult={result ? {
                        label: "Maturity Amount",
                        value: `₹${result.maturity}`,
                        color: "text-indigo-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Principal Amount", value: `₹${result.principal}` },
                        { label: "Total Interest", value: `₹${result.interest}`, valueColor: "text-green-400" },
                        { label: "CAGR Return", value: `${result.cagr}%` },
                        { label: "Tenure", value: `${result.years} years at ${result.rate}% p.a.` }
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Lumpsum Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    A <strong className="text-gray-300">lumpsum investment</strong> involves investing a large amount of money all at once. This calculator helps you estimate the future value of your one-time investment based on expected annual returns and investment tenure.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Perfect for calculating returns on bonuses, inheritances, or any large sum you wish to invest for long-term wealth creation. See the power of compounding in action.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Lumpsum Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">principal amount</strong> you wish to invest as a one-time lumpsum.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">expected annual return</strong> percentage (based on investment type).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">investment tenure</strong> in years.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Lumpsum Returns"</strong> to see maturity amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> View principal, total interest earned, and CAGR returns.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Lumpsum Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2">✓ Financial Goal Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan for retirement, children's education, or buying a house. Know exactly how much your lumpsum will grow over time.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Investment Options</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare FD (6-7%), Debt funds (7-9%), and Equity funds (10-14%). Choose the best option for your risk profile.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Inflation Adjustment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate real returns after inflation (5-6%). Know your actual purchasing power growth, not just nominal returns.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Retirement Corpus Estimation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate how much your current savings will grow by retirement. Plan additional savings needed to reach your goal.</p>
                    </div>
                </div>
            </section>

            {/* Expected Returns by Investment Type */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Expected Returns by Investment Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Investment Type</th><th className="text-left py-3 px-4 text-gray-400">Expected Returns</th><th className="text-left py-3 px-4 text-gray-400">Risk Level</th><th className="text-left py-3 px-4 text-gray-400">Best For</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Equity Mutual Funds</td><td className="py-2 px-4 text-yellow-400">10-14%</td><td className="py-2 px-4">High</td><td className="py-2 px-4">Long-term (7+ years)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Hybrid Funds</td><td className="py-2 px-4 text-yellow-400">8-10%</td><td className="py-2 px-4">Moderate</td><td className="py-2 px-4">Medium-term (3-7 years)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Debt Funds</td><td className="py-2 px-4 text-yellow-400">6-8%</td><td className="py-2 px-4">Low</td><td className="py-2 px-4">Short-term (1-3 years)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Fixed Deposits</td><td className="py-2 px-4 text-yellow-400">6-7%</td><td className="py-2 px-4">Very Low</td><td className="py-2 px-4">Capital protection</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">PPF / EPF</td><td className="py-2 px-4 text-yellow-400">7-8%</td><td className="py-2 px-4">Very Low</td><td className="py-2 px-4">Tax-saving retirement</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Power of Compounding Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Power of Compounding: ₹1 Lakh Investment</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Tenure</th><th className="text-left py-3 px-4 text-gray-400">At 8% Returns</th><th className="text-left py-3 px-4 text-gray-400">At 10% Returns</th><th className="text-left py-3 px-4 text-gray-400">At 12% Returns</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">5 years</td><td className="py-2 px-4">₹1.47L</td><td className="py-2 px-4 text-yellow-400">₹1.61L</td><td className="py-2 px-4">₹1.76L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">10 years</td><td className="py-2 px-4">₹2.16L</td><td className="py-2 px-4 text-yellow-400">₹2.59L</td><td className="py-2 px-4">₹3.10L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">15 years</td><td className="py-2 px-4">₹3.17L</td><td className="py-2 px-4 text-yellow-400">₹4.18L</td><td className="py-2 px-4">₹5.47L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">20 years</td><td className="py-2 px-4">₹4.66L</td><td className="py-2 px-4 text-yellow-400">₹6.73L</td><td className="py-2 px-4">₹9.65L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">30 years</td><td className="py-2 px-4">₹10.06L</td><td className="py-2 px-4 text-yellow-400">₹17.45L</td><td className="py-2 px-4">₹29.96L</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">*Higher returns over longer tenure = exponential growth due to compounding.</p>
            </section>

            {/* Lumpsum vs SIP Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Lumpsum vs SIP Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Lumpsum</h3>
                        <p className="text-xs text-gray-400">• One-time large investment</p>
                        <p className="text-xs text-gray-400">• Higher potential returns if timed well</p>
                        <p className="text-xs text-gray-400">• Market timing matters</p>
                        <p className="text-xs text-gray-400">• Best for bull markets</p>
                        <p className="text-xs text-gray-400">• Lower cost (no transaction fees)</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">SIP</h3>
                        <p className="text-xs text-gray-400">• Regular monthly investments</p>
                        <p className="text-xs text-gray-400">• Rupee cost averaging benefits</p>
                        <p className="text-xs text-gray-400">• No market timing needed</p>
                        <p className="text-xs text-gray-400">• Best for volatile markets</p>
                        <p className="text-xs text-gray-400">• Disciplined saving habit</p>
                    </div>
                </div>
            </section>

            {/* Lumpsum Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Lumpsum Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        A = P × (1 + r)^n
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                        Where: A = Maturity Amount, P = Principal, r = Annual Return Rate, n = Number of Years
                    </p>
                    <p className="text-gray-500 text-xs">
                        Example: ₹1,00,000 at 12% for 10 years = ₹3,10,584
                    </p>
                </div>
            </section>

            {/* Lumpsum vs SIP Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Lumpsum vs SIP Comparison
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Lumpsum</h3>
                        <p className="text-xs text-gray-400">• One-time large investment</p>
                        <p className="text-xs text-gray-400">• Higher potential returns if timed well</p>
                        <p className="text-xs text-gray-400">• Market timing matters</p>
                        <p className="text-xs text-gray-400">• Best for bull markets</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">SIP</h3>
                        <p className="text-xs text-gray-400">• Regular monthly investments</p>
                        <p className="text-xs text-gray-400">• Rupee cost averaging benefits</p>
                        <p className="text-xs text-gray-400">• No market timing needed</p>
                        <p className="text-xs text-gray-400">• Best for volatile markets</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
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