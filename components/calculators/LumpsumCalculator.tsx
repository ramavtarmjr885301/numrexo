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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                        </div>
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate Lumpsum Returns →
                        </button>
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

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                    About Lumpsum Calculator
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    A <strong className="text-gray-300">lumpsum investment</strong> involves investing a large amount
                    of money all at once. This calculator helps you estimate the future value of your one-time
                    investment based on expected annual returns and investment tenure.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Perfect for calculating returns on bonuses, inheritances, or any large sum you wish to
                    invest for long-term wealth creation.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Lumpsum Formula
                </h2>
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