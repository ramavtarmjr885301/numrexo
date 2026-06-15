"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is markup and how is it calculated?",
        a: "Markup is the amount you add to the cost price to determine the selling price. Formula: Markup = (Selling Price - Cost Price) ÷ Cost Price × 100. Example: Cost ₹100, Selling ₹150 → Markup = (150-100) ÷ 100 × 100 = 50%. A 50% markup means you added 50% to your cost.",
    },
    {
        q: "What is the difference between markup and margin?",
        a: "Markup is based on cost price. Margin is based on selling price. Same numbers give different percentages. Example: Cost ₹100, Selling ₹150 → Markup = 50%, Margin = 33.3%. Margin tells profit per sale, markup tells how much to increase cost. Never confuse them — it can ruin your pricing.",
    },
    {
        q: "How to calculate selling price from cost and markup?",
        a: "Selling Price = Cost Price × (1 + Markup/100). Example: Cost ₹100, want 50% markup → Selling Price = 100 × 1.50 = ₹150. Use this when you know your cost and desired profit percentage.",
    },
    {
        q: "What is a good markup percentage?",
        a: "Good markup varies by industry: Retail clothing (50-100%), Electronics (20-40%), Food/Restaurants (60-80%), Professional services (100-300%), Manufacturing (20-50%), Wholesale (10-20%). Higher markups mean higher profit but may reduce sales volume.",
    },
    {
        q: "How to calculate cost price from selling price and markup?",
        a: "Cost Price = Selling Price ÷ (1 + Markup/100). Example: Selling ₹150, markup 50% → Cost = 150 ÷ 1.50 = ₹100. Useful when you know competitor's selling price and want to work backwards.",
    },
    {
        q: "What is keystone markup?",
        a: "Keystone markup is doubling the cost price — a 100% markup. Example: Cost ₹50, Selling ₹100. Common in retail, especially for jewelry, gifts, and specialty items. It's easy to calculate but not always optimal for all products.",
    },
    {
        q: "How to calculate selling price with markup and tax?",
        a: "Selling Price = (Cost × (1 + Markup/100)) × (1 + Tax/100). Example: Cost ₹100, Markup 50%, GST 18% = (100 × 1.5) × 1.18 = ₹177. Add tax after markup, not before. Our calculator shows pre-tax and post-tax prices.",
    },
    {
        q: "What is a good markup percentage for retail?",
        a: "Retail markups: Clothing (50-100%), Shoes (40-60%), Electronics (20-40%), Jewelry (200-400%), Furniture (50-100%), Grocery (10-20%). Start with industry average, adjust based on your location, competition, and target profit margin.",
    },
    {
        q: "How to calculate markup for services?",
        a: "Service markup = (Hourly Rate - Hourly Cost) ÷ Hourly Cost × 100. Include employee salary, benefits, overhead, tools, training. Typical service markups: Consulting (200-300%), IT services (150-250%), Cleaning (100-150%), Repair (100-200%).",
    },
    {
        q: "What is the difference between markup and profit?",
        a: "Markup % is the percentage added to cost price. Profit is actual money earned. Example: Cost ₹100, 50% markup = ₹150 selling price. If you sell 100 units, revenue ₹15,000, profit ₹5,000 (₹50/unit). Markup helps set price, profit measures success.",
    },
];

const MARKUP_EXAMPLES = [
    { industry: "Retail Clothing", typicalMarkup: "50-100%", typicalMargin: "33-50%", notes: "Fashion has high markups" },
    { industry: "Electronics", typicalMarkup: "20-40%", typicalMargin: "17-29%", notes: "Competitive pricing" },
    { industry: "Restaurants", typicalMarkup: "60-80%", typicalMargin: "38-44%", notes: "Food cost is key" },
    { industry: "Professional Services", typicalMarkup: "100-300%", typicalMargin: "50-75%", notes: "Labor-based pricing" },
    { industry: "Wholesale", typicalMarkup: "10-20%", typicalMargin: "9-17%", notes: "Volume-based business" },
    { industry: "Jewelry", typicalMarkup: "200-400%", typicalMargin: "67-80%", notes: "Very high markup" },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

const FAQ_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
});

const WEBAPP_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Markup Calculator – Profit Margin and Markup Calculator",
    description: "Calculate markup percentage, selling price, and profit margin for your products. Perfect for retail and business pricing.",
    url: "https://www.numrexo.com/business/markup-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Markup calculation", "Selling price from cost", "Cost price from selling price", "Margin conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Business Calculators", item: "https://www.numrexo.com/business" },
        { "@type": "ListItem", position: 3, name: "Markup Calculator", item: "https://www.numrexo.com/business/markup-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function MarkupCalculator() {
    const [calcType, setCalcType] = useState<"markup" | "price" | "cost">("markup");
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [markupPercent, setMarkupPercent] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        if (calcType === "markup") {
            const cost = parseFloat(costPrice);
            const selling = parseFloat(sellingPrice);

            if (!cost || !selling || cost <= 0 || selling <= 0) {
                alert("Please enter valid cost price and selling price");
                return;
            }

            if (selling < cost) {
                alert("Selling price cannot be less than cost price (that would be a loss)");
                return;
            }

            const markup = ((selling - cost) / cost) * 100;
            const margin = ((selling - cost) / selling) * 100;
            const profit = selling - cost;

            setResult({
                markup: markup.toFixed(2),
                margin: margin.toFixed(2),
                profit: profit.toFixed(2),
                cost: cost.toFixed(2),
                selling: selling.toFixed(2),
                calcType: "markup",
            });
        }
        else if (calcType === "price") {
            const cost = parseFloat(costPrice);
            const markup = parseFloat(markupPercent);

            if (!cost || cost <= 0) {
                alert("Please enter valid cost price");
                return;
            }
            if (!markup || markup <= 0) {
                alert("Please enter valid markup percentage");
                return;
            }

            const selling = cost * (1 + markup / 100);
            const margin = (selling - cost) / selling * 100;
            const profit = selling - cost;

            setResult({
                sellingPrice: selling.toFixed(2),
                margin: margin.toFixed(2),
                profit: profit.toFixed(2),
                cost: cost.toFixed(2),
                markup: markup.toFixed(2),
                calcType: "price",
            });
        }
        else if (calcType === "cost") {
            const selling = parseFloat(sellingPrice);
            const markup = parseFloat(markupPercent);

            if (!selling || selling <= 0) {
                alert("Please enter valid selling price");
                return;
            }
            if (!markup || markup <= 0) {
                alert("Please enter valid markup percentage");
                return;
            }

            const cost = selling / (1 + markup / 100);
            const margin = (selling - cost) / selling * 100;
            const profit = selling - cost;

            setResult({
                costPrice: cost.toFixed(2),
                margin: margin.toFixed(2),
                profit: profit.toFixed(2),
                selling: selling.toFixed(2),
                markup: markup.toFixed(2),
                calcType: "cost",
            });
        }
    };

    const resetForm = () => {
        setCalcType("markup");
        setCostPrice("");
        setSellingPrice("");
        setMarkupPercent("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/business" itemProp="item" className="hover:text-gray-300">Business Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Markup Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Markup & Pricing Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Set your prices to make profit</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">What do you want to calculate?</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "markup" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("markup")}
                                >
                                    Find Markup %
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "price" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("price")}
                                >
                                    Find Selling Price
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "cost" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("cost")}
                                >
                                    Find Cost Price
                                </button>
                            </div>
                        </div>

                        {calcType === "markup" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Cost Price (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="100"
                                            value={costPrice}
                                            onChange={(e) => setCostPrice(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Selling Price (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="150"
                                            value={sellingPrice}
                                            onChange={(e) => setSellingPrice(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {calcType === "price" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Cost Price (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="100"
                                            value={costPrice}
                                            onChange={(e) => setCostPrice(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Desired Markup (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="50"
                                            value={markupPercent}
                                            onChange={(e) => setMarkupPercent(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {calcType === "cost" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Selling Price (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="150"
                                            value={sellingPrice}
                                            onChange={(e) => setSellingPrice(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Markup Applied (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="50"
                                            value={markupPercent}
                                            onChange={(e) => setMarkupPercent(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate →
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

                {/* Result Box */}
                <ResultBox
                    title="Markup Results"
                    isEmpty={!result}
                    emptyIcon="🏷️"
                    emptyText="Enter your numbers and press Calculate"
                    mainResult={result ? {
                        label: calcType === "markup" ? "Markup Percentage" : calcType === "price" ? "Selling Price" : "Cost Price",
                        value: calcType === "markup" ? `${result.markup}%` : calcType === "price" ? `₹${result.sellingPrice}` : `₹${result.costPrice}`,
                        color: "text-green-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Profit Margin", value: `${result.margin}%`, valueColor: "text-yellow-400" },
                        { label: "Profit Amount", value: `₹${result.profit}`, valueColor: "text-green-400" },
                        ...(calcType === "markup" ? [
                            { label: "Cost Price", value: `₹${result.cost}` },
                            { label: "Selling Price", value: `₹${result.selling}` },
                        ] : calcType === "price" ? [
                            { label: "Cost Price", value: `₹${result.cost}` },
                            { label: "Markup Used", value: `${result.markup}%` },
                        ] : [
                            { label: "Selling Price", value: `₹${result.selling}` },
                            { label: "Markup Used", value: `${result.markup}%` },
                        ]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Markup Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Markup Calculator</strong> helps you set the right prices for your products. Whether you're a retailer, manufacturer, or service provider, knowing your markup is essential for profitability.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Markup is the percentage you add to your cost price to determine selling price. Don't confuse it with margin — markup is based on cost, margin is based on selling price. Use this calculator to find markup, selling price, or cost price.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Markup Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select what you want to calculate: <strong className="text-white">Markup %</strong>, <strong className="text-white">Selling Price</strong>, or <strong className="text-white">Cost Price</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the two known values (Cost & Selling for markup, Cost & Markup for selling price, Selling & Markup for cost price).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> View markup percentage, profit margin, and profit amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Markup Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Set Profitable Prices</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Ensure every product sold covers costs and generates profit. Avoid under-pricing that eats your margins or over-pricing that kills sales.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Compare Competitors</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Reverse-engineer competitor pricing. Calculate their markup and profit margin from selling price.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Multiple Products</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Apply different markups to different product categories. High markup for premium items, lower for volume products.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Discount Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate how much discount you can offer without losing money. Know your break-even point.</p>
                    </div>
                </div>
            </section>

            {/* Markup vs Margin Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Markup vs Margin — Don't Confuse Them!</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-400"><strong className="text-white">Same Example:</strong> Cost ₹100, Selling ₹150</p>
                            <p className="text-sm text-blue-400 mt-2">Markup = 50% (based on cost)</p>
                            <p className="text-sm text-green-400">Margin = 33.3% (based on selling price)</p>
                        </div>
                        <div className="border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-4">
                            <p className="text-sm text-gray-400"><strong className="text-white">Quick Conversion:</strong></p>
                            <p className="text-sm text-gray-400">Margin = Markup ÷ (1 + Markup)</p>
                            <p className="text-sm text-gray-400">Markup = Margin ÷ (1 - Margin)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Markup Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Markup Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Markup %</h3>
                        <p className="text-white font-mono text-xs">(SP - CP) ÷ CP × 100</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Selling Price</h3>
                        <p className="text-white font-mono text-xs">CP × (1 + Markup/100)</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Cost Price</h3>
                        <p className="text-white font-mono text-xs">SP ÷ (1 + Markup/100)</p>
                    </div>
                </div>
            </section>

            {/* Markup Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical Markup by Industry</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Industry</th>
                                <th className="text-left py-3 px-4 text-gray-400">Typical Markup</th>
                                <th className="text-left py-3 px-4 text-gray-400">Equivalent Margin</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MARKUP_EXAMPLES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.industry}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.typicalMarkup}</td>
                                    <td className="py-3 px-4 text-green-400">{row.typicalMargin}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Pricing Strategy Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Pricing Strategy Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Research competitors:</strong> Don't price in a vacuum. Know what similar products sell for.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Consider perceived value:</strong> Higher price can signal higher quality for luxury items.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Test different prices:</strong> A/B test pricing to find the sweet spot between volume and margin.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Include all costs:</strong> Shipping, payment processing, returns, storage — all reduce your actual profit.</span></li>
                </ul>
            </section>

            {/* Important Things */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Markup is not profit</strong> — Your actual profit also depends on how many units you sell. High markup with low sales = low profit.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Consider your market</strong> — Too high markup may reduce sales. Too low markup may leave money on the table. Research competitor pricing.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Different products, different markups</strong> — You can have high markup on some items (loss leaders) and lower on others to drive traffic.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Include all costs</strong> — Your cost price should include shipping, packaging, overhead, and other expenses, not just the product cost.</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}