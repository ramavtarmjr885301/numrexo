// components/calculators/ProfitMarginCalculator.tsx
"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";

const FAQ_DATA = [
    { q: "What is profit margin and how to calculate it?", a: "Profit margin is the percentage of revenue that remains as profit. Formula: (Revenue - Cost) ÷ Revenue × 100. Example: $1000 revenue, $600 cost = 40% profit margin." },
    { q: "What is a good profit margin?", a: "Good profit margins by industry: Software/Apps (70-80%), Services (50-60%), Retail (20-30%), Manufacturing (15-25%), Food/Restaurants (10-15%). Small businesses should aim for 20-30%." },
    { q: "What is the difference between markup and margin?", a: "Margin = Profit ÷ Revenue (tells profit per sale). Markup = Profit ÷ Cost (tells how much to increase cost). For $600 cost selling at $1000: Margin = 40%, Markup = 66.7%." },
    { q: "How to calculate profit margin percentage?", a: "Formula: ((Revenue - Cost) ÷ Revenue) × 100. Example: $100,000 revenue, $70,000 cost → (30,000 ÷ 100,000) × 100 = 30% profit margin. Higher margin means more profit per sale." },
    { q: "What is net profit margin vs gross profit margin?", a: "Gross Profit Margin = (Revenue - COGS) ÷ Revenue × 100 (includes only direct costs). Net Profit Margin = (Revenue - ALL expenses) ÷ Revenue × 100 (includes taxes, interest, overhead). Net margin is usually 5-15% lower than gross margin." },
    { q: "How to increase profit margin?", a: "Strategies: 1) Increase prices (if market allows), 2) Reduce cost of goods sold (negotiate suppliers), 3) Reduce operating expenses (cut waste, optimize processes), 4) Increase sales volume to spread fixed costs, 5) Improve product mix (sell higher-margin products)." },
    { q: "What is operating profit margin?", a: "Operating Profit Margin = Operating Income ÷ Revenue × 100. Operating income = Revenue - COGS - Operating Expenses (SG&A, R&D, depreciation). Excludes interest and taxes. Shows operational efficiency before financing and tax decisions." },
    { q: "How to calculate profit margin in Excel?", a: "Formula: =(Revenue - Cost)/Revenue. Format as percentage. Example: A1=Revenue, B1=Cost. Enter =(A1-B1)/A1. Multiply by 100 for percentage format. Use our calculator for quick results." },

];

const PROFIT_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Profit Margin Calculator – Business Profit Calculator",
    description: "Calculate profit margin, markup percentage, and profit amount for your business.",
    url: "https://numrexo.com/business/profit-margin-calculator",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function ProfitMarginCalculator() {
    const { symbol } = useCurrency();
    const [cost, setCost] = useState("600");
    const [revenue, setRevenue] = useState("1000");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const r = parseFloat(revenue);

        if (!c || !r || c <= 0 || r <= 0) {
            setResult(null);
            return;
        }

        if (c >= r) {
            setResult(null);
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

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [cost, revenue]);

    const resetForm = () => {
        setCost("");
        setRevenue("");
        setResult(null);
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PROFIT_SCHEMA }} />

            {/* Breadcrumb Navigation */}
            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
                    <li><a href="/" className="hover:text-ink-soft">Home</a></li>
                    <li className="text-ink-soft">/</li>
                    <li><a href="/business" className="hover:text-ink-soft">Business Calculators</a></li>
                    <li className="text-ink-soft">/</li>
                    <li><span className="text-ink-soft">Profit Margin Calculator</span></li>
                </ol>
            </nav>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Business Details</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">
                                Cost Price (Production/Delivery)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="600"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">
                                Selling Price (Revenue)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="1000"
                                    value={revenue}
                                    onChange={(e) => setRevenue(e.target.value)}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Profit Margin →
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                            >
                                Reset
                            </button>
                        </div>
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
                        color: "text-green-600"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Profit Amount", value: `${symbol}${result.profit}`, valueColor: "text-green-600" },
                        { label: "Markup Percentage", value: `${result.markup}%` },
                        { label: "Cost Price", value: `${symbol}${result.cost}` },
                        { label: "Selling Price", value: `${symbol}${result.revenue}` }
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Profit Margin Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Profit Margin Calculator</strong> is an essential tool for business owners, entrepreneurs, and financial analysts. Calculate profit margin, markup percentage, and profit amount to optimize your pricing strategy and maximize profitability.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Understanding your profit margins helps you make better business decisions, set competitive prices, and identify areas for cost reduction. Whether you're a retail store, service provider, or manufacturer, this calculator provides instant insights.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Profit Margin Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Enter your <strong className="text-ink">cost price</strong> (production, manufacturing, or delivery cost).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Enter your <strong className="text-ink">selling price</strong> (revenue per unit or total revenue).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Click <strong className="text-ink">"Calculate Profit Margin"</strong> to see your results.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> View profit margin, profit amount, and markup percentage.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> Use the <strong className="text-ink">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Profit Margin Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Pricing Optimization</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Set the right price for your products. Know exactly how much profit you make per sale. Avoid under-pricing.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Cost Analysis</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Identify if your costs are too high. Find opportunities to reduce expenses and increase margins.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Competitor Comparison</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Compare your margins with industry averages. See if you're competitive or leaving money on the table.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Business Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Plan your pricing strategy for new products. Calculate break-even points and target margins.</p>
                    </div>
                </div>
            </section>

            {/* Profit Margin by Industry */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Profit Margin by Industry</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Industry</th><th className="text-left py-3 px-4 text-ink-faint">Avg. Net Margin</th><th className="text-left py-3 px-4 text-ink-faint">Typical Gross Margin</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Software/Apps</td><td className="py-2 px-4 text-yellow-700">70-80%</td><td className="py-2 px-4">80-90%</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Consulting/Services</td><td className="py-2 px-4 text-yellow-700">50-60%</td><td className="py-2 px-4">60-70%</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Real Estate</td><td className="py-2 px-4 text-yellow-700">40-50%</td><td className="py-2 px-4">50-60%</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Retail</td><td className="py-2 px-4 text-yellow-700">20-30%</td><td className="py-2 px-4">30-40%</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Manufacturing</td><td className="py-2 px-4 text-yellow-700">15-25%</td><td className="py-2 px-4">25-35%</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Food/Restaurants</td><td className="py-2 px-4 text-yellow-700">10-15%</td><td className="py-2 px-4">20-30%</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Profit Margin vs Markup */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Profit Margin vs Markup — What's the Difference?</h2>
                <div className="bg-surface border border-hairline rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-ink-faint"><strong className="text-ink">Same Example:</strong> Cost $600, Selling $1000</p>
                            <p className="text-sm text-green-600 mt-2">Profit Margin = 40% (based on selling price)</p>
                            <p className="text-sm text-blue-600">Markup = 66.7% (based on cost price)</p>
                        </div>
                        <div className="border-t md:border-t-0 md:border-l border-hairline pt-4 md:pt-0 md:pl-4">
                            <p className="text-sm text-ink-faint"><strong className="text-ink">When to use:</strong></p>
                            <p className="text-sm text-ink-faint">• <strong>Margin</strong> = Financial reporting, profit analysis</p>
                            <p className="text-sm text-ink-faint">• <strong>Markup</strong> = Pricing products, setting retail prices</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips to Improve Profit Margin */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Tips to Improve Your Profit Margin</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Increase prices strategically:</strong> Even 5% price increase can boost margins by 20-30% if demand is inelastic.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Reduce cost of goods sold:</strong> Negotiate with suppliers, buy in bulk, find cheaper alternatives, reduce waste.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Optimize product mix:</strong> Focus on selling higher-margin products. Use loss leaders only when necessary.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Reduce operating expenses:</strong> Cut unnecessary overhead, outsource non-core functions, automate processes.</span></li>
                </ul>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Profit Margin Formula</h2>
                <div className="bg-surface border border-hairline rounded-xl p-5">
                    <p className="text-ink font-mono text-sm mb-2">
                        Profit Margin = (Revenue - Cost) ÷ Revenue × 100
                    </p>
                    <p className="text-ink-faint text-xs">
                        Example: ($1000 - $600) ÷ $1000 × 100 = 40% profit margin
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">
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