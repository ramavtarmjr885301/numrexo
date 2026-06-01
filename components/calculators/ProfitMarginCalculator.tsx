// components/calculators/ProfitMarginCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    { q: "What is profit margin and how to calculate it?", a: "Profit margin is the percentage of revenue that remains as profit. Formula: (Revenue - Cost) ÷ Revenue × 100. Example: ₹1000 revenue, ₹600 cost = 40% profit margin." },
    { q: "What is a good profit margin?", a: "Good profit margins by industry: Software/Apps (70-80%), Services (50-60%), Retail (20-30%), Manufacturing (15-25%), Food/Restaurants (10-15%). Small businesses should aim for 20-30%." },
    { q: "What is the difference between markup and margin?", a: "Margin = Profit ÷ Revenue (tells profit per sale). Markup = Profit ÷ Cost (tells how much to increase cost). For ₹600 cost selling at ₹1000: Margin = 40%, Markup = 66.7%." },
];

const PROFIT_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Profit Margin Calculator – Business Profit Calculator",
    description: "Calculate profit margin, markup percentage, and profit amount for your business.",
    url: "https://www.numrexo.com/business/profit-margin-calculator",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function ProfitMarginCalculator() {
    const [cost, setCost] = useState("");
    const [revenue, setRevenue] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const r = parseFloat(revenue);

        if (!c || !r || c <= 0 || r <= 0) {
            alert("Please enter valid cost and revenue");
            return;
        }

        if (c >= r) {
            alert("Cost must be less than revenue to have profit");
            return;
        }

        const profit = r - c;
        const margin = (profit / r) * 100;
        const markup = (profit / c) * 100;

        setResult({
            profit: profit.toFixed(2),
            margin: margin.toFixed(1),
            markup: markup.toFixed(1),
            cost: c,
            revenue: r
        });
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PROFIT_SCHEMA }} />

            {/* Breadcrumb Navigation */}
            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/business" className="hover:text-gray-300">Business Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Profit Margin Calculator</span></li>
                </ol>
            </nav>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Business Details</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Cost Price (Production/Delivery)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="600"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Selling Price (Revenue)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="1000"
                                    value={revenue}
                                    onChange={(e) => setRevenue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate Profit Margin →
                        </button>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Profit Analysis"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter cost and selling price"
                    mainResult={result ? {
                        label: "Profit Margin",
                        value: `${result.margin}%`,
                        color: "text-green-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Profit Amount", value: `₹${result.profit}`, valueColor: "text-green-400" },
                        { label: "Markup Percentage", value: `${result.markup}%` },
                        { label: "Cost Price", value: `₹${result.cost}` },
                        { label: "Selling Price", value: `₹${result.revenue}` }
                    ] : undefined}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                    About Profit Margin Calculator
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Essential tool for business owners! Calculate profit margin, markup, and profit amount
                    to optimize your pricing strategy. Understanding your profit margins helps you make
                    better business decisions and maximize profitability.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Profit Margin Formula
                </h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        Profit Margin = (Revenue - Cost) ÷ Revenue × 100
                    </p>
                    <p className="text-gray-500 text-xs">
                        Example: (₹1000 - ₹600) ÷ ₹1000 × 100 = 40% profit margin
                    </p>
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