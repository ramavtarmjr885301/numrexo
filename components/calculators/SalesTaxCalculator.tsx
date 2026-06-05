"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is sales tax and how does it work?",
        a: "Sales tax is a consumption tax imposed by state and local governments on the sale of goods and services. Unlike VAT which is collected at each stage, sales tax is only collected at the final point of sale to the end consumer. Rates vary by state, county, and city in the US.",
    },
    {
        q: "What is the difference between sales tax and VAT?",
        a: "Sales tax is collected only at the final sale to the consumer. VAT (Value Added Tax) is collected at every stage of production and distribution. Sales tax is common in the United States, while VAT is used in most other countries including Europe, Canada (GST), Australia, and India.",
    },
    {
        q: "How to calculate sales tax?",
        a: "To add sales tax: Total Price = Original Price × (1 + Sales Tax Rate/100). Example: $100 at 8% sales tax = $100 × 1.08 = $108. To remove sales tax: Original Price = Total Price ÷ (1 + Sales Tax Rate/100). Example: $108 ÷ 1.08 = $100.",
    },
    {
        q: "What are the sales tax rates by US state?",
        a: "State sales tax rates vary: California (7.25%), Texas (6.25%), New York (4%), Florida (6%), Illinois (6.25%), Pennsylvania (6%), Ohio (5.75%), Georgia (4%), North Carolina (4.75%), Michigan (6%). Local taxes can add 1-5% more.",
    },
    {
        q: "What items are exempt from sales tax?",
        a: "Common exemptions include groceries (in most states), prescription drugs, medical devices, some agricultural supplies, manufacturing equipment, and clothing (in some states like Massachusetts, Pennsylvania, Minnesota). Each state has its own exemption rules.",
    },
    {
        q: "Do online purchases have sales tax?",
        a: "Yes. Following the 2018 Supreme Court decision (South Dakota v. Wayfair), states can require online retailers to collect sales tax even if they don't have a physical presence in the state. Most major online retailers now charge sales tax based on the buyer's location.",
    },
];

const US_STATE_RATES = [
    { state: "California", rate: "7.25%", localMax: "10.25%", notes: "Highest combined rate can exceed 10%" },
    { state: "Texas", rate: "6.25%", localMax: "8.25%", notes: "No state tax on groceries" },
    { state: "New York", rate: "4%", localMax: "8.875%", notes: "NYC adds 4.5% local tax" },
    { state: "Florida", rate: "6%", localMax: "7.5%", notes: "No state tax on groceries" },
    { state: "Illinois", rate: "6.25%", localMax: "10.25%", notes: "Home rule communities add tax" },
    { state: "Pennsylvania", rate: "6%", localMax: "8%", notes: "Clothing exempt" },
    { state: "Ohio", rate: "5.75%", localMax: "8%", notes: "No tax on groceries" },
    { state: "Georgia", rate: "4%", localMax: "8%", notes: "Local option sales tax" },
    { state: "Michigan", rate: "6%", localMax: "6%", notes: "No local sales tax" },
    { state: "Washington", rate: "6.5%", localMax: "10.4%", notes: "High combined rates" },
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
    name: "Sales Tax Calculator – US Sales Tax Calculator",
    description: "Calculate sales tax for any US state. Add or remove sales tax from any amount. Includes state-by-state rates.",
    url: "https://www.numrexo.com/tax/sales-tax-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Add sales tax", "Remove sales tax", "US state rates", "Instant calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Tax Calculators", item: "https://www.numrexo.com/tax" },
        { "@type": "ListItem", position: 3, name: "Sales Tax Calculator", item: "https://www.numrexo.com/tax/sales-tax-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalesTaxCalculator() {
    const [amount, setAmount] = useState("");
    const [taxRate, setTaxRate] = useState("8");
    const [calcType, setCalcType] = useState<"add" | "remove">("add");
    const [selectedState, setSelectedState] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleStateSelect = (state: string, rate: string) => {
        setSelectedState(state);
        setTaxRate(rate.replace("%", ""));
    };

    const calculate = () => {
        const a = parseFloat(amount);
        const r = parseFloat(taxRate) / 100;

        if (!a || a <= 0 || isNaN(a)) {
            alert("Please enter a valid amount");
            return;
        }

        let preTax, taxAmount, postTax;

        if (calcType === "add") {
            preTax = a;
            taxAmount = a * r;
            postTax = a + taxAmount;
        } else {
            postTax = a;
            preTax = a / (1 + r);
            taxAmount = postTax - preTax;
        }

        setResult({
            preTax: preTax.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            postTax: postTax.toFixed(2),
            taxRate: parseFloat(taxRate),
            calcType,
            selectedState: selectedState || "Custom",
        });
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
                        <a href="https://www.numrexo.com/tax" itemProp="item" className="hover:text-gray-300">Tax Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Sales Tax Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Sales Tax Calculation</h3>
                        <p className="text-xs text-gray-500 mt-1">For US states and local taxes</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Amount ($)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="100"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Sales Tax Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="8"
                                    step="0.1"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Or Select State (Quick Rate)</label>
                            <select
                                value={selectedState}
                                onChange={(e) => {
                                    const selected = e.target.value;
                                    if (selected) {
                                        const stateData = US_STATE_RATES.find(s => s.state === selected);
                                        if (stateData) {
                                            handleStateSelect(stateData.state, stateData.rate);
                                        }
                                    }
                                }}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                            >
                                <option value="">Select a state</option>
                                {US_STATE_RATES.map((state) => (
                                    <option key={state.state} value={state.state}>{state.state} ({state.rate})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "add" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("add")}
                                >
                                    Add Sales Tax
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "remove" ? "bg-orange-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("remove")}
                                >
                                    Remove Sales Tax
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate Sales Tax →
                        </button>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Sales Tax Breakdown"
                    isEmpty={!result}
                    emptyIcon="🧾"
                    emptyText="Enter amount and press Calculate"
                    mainResult={result ? {
                        label: calcType === "add" ? "Total with Tax" : "Price without Tax",
                        value: `$${calcType === "add" ? result.postTax : result.preTax}`,
                        color: "text-green-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: calcType === "add" ? "Price before tax" : "Total with tax", value: `$${calcType === "add" ? result.preTax : result.postTax}` },
                        { label: `Sales Tax (${result.taxRate}%)`, value: `$${result.taxAmount}`, valueColor: "text-yellow-400" },
                        { label: calcType === "add" ? "Final price" : "Original price", value: `$${calcType === "add" ? result.postTax : result.preTax}` },
                        { label: "Location", value: result.selectedState },
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Sales Tax Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Sales Tax Calculator</strong> helps you calculate sales tax for purchases in the United States. Whether you're shopping online, planning a budget, or running a business, this calculator gives you instant and accurate sales tax calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Sales tax rates vary by state, county, and city. This calculator includes base state rates and allows you to add local taxes for more accurate results.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sales Tax Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Add Sales Tax</h3>
                        <p className="text-white font-mono text-sm mb-2">Total = Amount × (1 + Tax Rate/100)</p>
                        <p className="text-gray-500 text-xs">Example: $100 × 1.08 = $108 (Tax $8)</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Remove Sales Tax</h3>
                        <p className="text-white font-mono text-sm mb-2">Pre-Tax = Total ÷ (1 + Tax Rate/100)</p>
                        <p className="text-gray-500 text-xs">Example: $108 ÷ 1.08 = $100 (Tax $8)</p>
                    </div>
                </div>
            </section>

            {/* US State Rates Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sales Tax Rates by US State</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">State</th>
                                <th className="text-left py-3 px-4 text-gray-400">State Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Max Combined</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {US_STATE_RATES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.state}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.rate}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.localMax}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">Note: Local city/county taxes can add additional 1-5% to the base state rate.</p>
            </section>

            {/* Limitations Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Sales tax varies by location</strong> — Different cities and counties within the same state can have different total tax rates.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Some items are exempt</strong> — Groceries, prescription drugs, and clothing are tax-exempt in many states.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Online purchases now taxable</strong> — Most states require online retailers to collect sales tax based on the buyer's location.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Businesses need to register</strong> — If you sell products, you may need to register for a sales tax permit in your state.</span>
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