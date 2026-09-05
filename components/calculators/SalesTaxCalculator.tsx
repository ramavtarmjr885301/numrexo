"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is sales tax and how does it work?",
        a: "Sales tax is a consumption tax imposed by state and local governments on the sale of goods and services. Unlike VAT which is collected at each stage, sales tax is only collected at the final point of sale to the end consumer. Rates vary by state, county, and city in the US. Businesses are responsible for collecting and remitting sales tax to the appropriate tax authorities. The tax is typically calculated as a percentage of the purchase price and added at checkout.",
    },
    {
        q: "What is the difference between sales tax and VAT?",
        a: "Sales tax is collected only at the final sale to the consumer (B2C). VAT (Value Added Tax) is collected at every stage of production and distribution (B2B and B2C). Sales tax is common in the United States, while VAT is used in most other countries including Europe (20% average), Canada (GST 5%), Australia (GST 10%), and India (GST 5-28%). VAT allows businesses to claim credits for tax paid on inputs, while sales tax doesn't provide this mechanism.",
    },
    {
        q: "How to calculate sales tax?",
        a: "To add sales tax: Total Price = Original Price × (1 + Sales Tax Rate/100). Example: $100 at 8% sales tax = $100 × 1.08 = $108 (Tax = $8). To remove sales tax: Original Price = Total Price ÷ (1 + Sales Tax Rate/100). Example: $108 ÷ 1.08 = $100 (Tax = $8). Always round to 2 decimal places for final amounts. For multiple items, calculate tax on the subtotal (pre-tax amount).",
    },
    {
        q: "What are the sales tax rates by US state?",
        a: "State sales tax rates vary: California (7.25%), Texas (6.25%), New York (4%), Florida (6%), Illinois (6.25%), Pennsylvania (6%), Ohio (5.75%), Georgia (4%), North Carolina (4.75%), Michigan (6%). Local taxes can add 1-5% more. Combined rates: Alabama (up to 11%), Louisiana (up to 11.45%), Tennessee (up to 9.75%), Arkansas (up to 11.5%). Always check your specific city and county for the exact combined rate.",
    },
    {
        q: "What items are exempt from sales tax?",
        a: "Common exemptions include: Groceries (in 30+ states including Texas, Florida, California), Prescription drugs (all states), Medical devices (varies by state), Agricultural supplies, Manufacturing equipment, Clothing (Massachusetts, Pennsylvania, Minnesota, New Jersey), School supplies (during tax holidays), Energy-efficient products (varies by state). Each state has its own exemption rules and requirements for documentation.",
    },
    {
        q: "Do online purchases have sales tax?",
        a: "Yes. Following the 2018 Supreme Court decision (South Dakota v. Wayfair), states can require online retailers to collect sales tax even if they don't have a physical presence in the state. Most major online retailers now charge sales tax based on the buyer's location. Small businesses may have different requirements based on their sales volume (economic nexus thresholds typically $100,000-$500,000 in annual sales).",
    },
    {
        q: "What is the difference between state and local sales tax?",
        a: "State sales tax is set by the state government and applies uniformly across the state (e.g., California 7.25%). Local sales tax (city/county) is added on top and varies by specific location. Example: Los Angeles has 9.5% total (7.25% state + 2.25% local), while San Francisco has 8.5%. Some areas have special district taxes for transportation or other services. Always check the combined rate for accurate calculations.",
    },
    {
        q: "How to calculate sales tax for businesses?",
        a: "Business sales tax management: 1) Determine where you have nexus (physical presence or economic), 2) Register with state tax authorities, 3) Collect correct rate based on buyer's location, 4) File and remit tax regularly (monthly/quarterly/annually), 5) Maintain exemption certificates for tax-exempt customers, 6) Use sales tax automation software for multi-state compliance. Penalties for non-compliance can be severe (up to 50% of tax due).",
    },
    {
        q: "What are sales tax holidays?",
        a: "Sales tax holidays are temporary periods (usually 1-3 days) when certain items are exempt from sales tax. Common holidays: Back-to-school (August, clothing/supplies), Emergency preparedness (hurricane supplies), Energy-efficient appliances (various dates), Small Business Saturday. States with regular holidays: Texas, Florida, Massachusetts, Connecticut, South Carolina. Check your state's official website for exact dates and qualifying items.",
    },
    {
        q: "What is the difference between sales tax and use tax?",
        a: "Sales tax is collected at the point of sale by the retailer. Use tax is a complementary tax paid by consumers who purchase items without paying sales tax (e.g., online purchases from out-of-state sellers). Use tax rate is typically the same as the sales tax rate in your area. Consumers are supposed to self-report and pay use tax on their tax returns, but compliance is low. Many states are working to improve use tax collection through online marketplace laws.",
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
    { state: "Arizona", rate: "5.6%", localMax: "9.2%", notes: "Transaction privilege tax" },
    { state: "Massachusetts", rate: "6.25%", localMax: "6.25%", notes: "Clothing exempt under $175" },
];

const INTERNATIONAL_TAX_RATES = [
    { country: "United Kingdom", rate: "20%", type: "VAT", notes: "Standard rate 20%" },
    { country: "Germany", rate: "19%", type: "VAT", notes: "Reduced rate 7%" },
    { country: "France", rate: "20%", type: "VAT", notes: "Reduced rate 5.5%" },
    { country: "Italy", rate: "22%", type: "VAT", notes: "Reduced rate 10%" },
    { country: "Spain", rate: "21%", type: "VAT", notes: "Reduced rate 10%" },
    { country: "Canada", rate: "5%", type: "GST", notes: "Provinces add PST" },
    { country: "Australia", rate: "10%", type: "GST", notes: "Standard rate 10%" },
    { country: "India", rate: "18%", type: "GST", notes: "5-28% depending on product" },
    { country: "Japan", rate: "10%", type: "Consumption Tax", notes: "Standard rate 10%" },
    { country: "Brazil", rate: "17-18%", type: "ICMS", notes: "Varies by state" },
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
    url: "https://numrexo.com/tax/sales-tax-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Add sales tax", "Remove sales tax", "US state rates", "Instant calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Tax Calculators", item: "https://numrexo.com/tax" },
        { "@type": "ListItem", position: 3, name: "Sales Tax Calculator", item: "https://numrexo.com/tax/sales-tax-calculator" },
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

    const resetForm = () => {
        setAmount("");
        setTaxRate("8");
        setCalcType("add");
        setSelectedState("");
        setResult(null);
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
            selectedState: selectedState || "Custom Rate",
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
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/tax" itemProp="item" className="hover:text-gray-300">Tax Calculators</a>
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Sales Tax →
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
                        { label: "Calculation Type", value: calcType === "add" ? "Added tax to amount" : "Removed tax from amount" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Sales Tax Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Sales Tax Calculator</strong> helps you calculate sales tax for purchases in the United States and around the world. Whether you're shopping online, planning a budget, or running a business, this calculator gives you instant and accurate sales tax calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Sales tax rates vary by state, county, and city. This calculator includes base state rates and allows you to add local taxes for more accurate results. You can either enter a custom tax rate or select from a list of US states to automatically fill the correct rate.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The calculator supports two modes: Add Sales Tax (calculates the total including tax) and Remove Sales Tax (calculates the pre-tax amount from a total including tax). This is useful for both consumers and business owners.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Sales Tax Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">amount</strong> in dollars (pre-tax or total depending on calculation type).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">sales tax rate</strong> as a percentage.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Alternatively, <strong className="text-white">select a state</strong> from the dropdown to auto-fill the rate.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Choose <strong className="text-white">"Add Sales Tax"</strong> or <strong className="text-white">"Remove Sales Tax"</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Sales Tax"</strong> to see the breakdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start fresh.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Sales Tax Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Accurate Budgeting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much you'll pay in taxes. Plan your purchases and avoid surprises at checkout.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Business Compliance</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate correct sales tax for invoices. Ensure you're collecting and remitting the right amount.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Multi-State Shopping</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare prices across different states. See how much tax you'll pay based on your location.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Online Purchase Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate total cost for online purchases. Know the final price including shipping and taxes.</p>
                    </div>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sales Tax Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Add Sales Tax</h3>
                        <p className="text-white font-mono text-sm mb-2">Total = Amount × (1 + Tax Rate/100)</p>
                        <p className="text-gray-500 text-xs mb-2">Tax = Amount × Tax Rate/100</p>
                        <p className="text-gray-500 text-xs">Example: $100 × 1.08 = $108 (Tax $8)</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Remove Sales Tax</h3>
                        <p className="text-white font-mono text-sm mb-2">Pre-Tax = Total ÷ (1 + Tax Rate/100)</p>
                        <p className="text-gray-500 text-xs mb-2">Tax = Total - Pre-Tax</p>
                        <p className="text-gray-500 text-xs">Example: $108 ÷ 1.08 = $100 (Tax $8)</p>
                    </div>
                </div>
            </section>

            {/* US State Rates Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sales Tax Rates by US State</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
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
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Local city/county taxes can add additional 1-5% to the base state rate. Always check your specific location for the exact combined rate.
                    </p>
                </div>
            </section>

            {/* International Tax Rates */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">International Sales Tax / VAT Rates</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Country</th>
                                <th className="text-left py-3 px-4 text-gray-400">Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {INTERNATIONAL_TAX_RATES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.country}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.rate}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.type}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * VAT rates vary by product category. Reduced rates apply to essential items like food and medicine. Always check local regulations.
                    </p>
                </div>
            </section>

            {/* Exempt Items Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Sales Tax Exemptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Frequently Exempt</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Groceries (most states)</li>
                            <li>• Prescription drugs</li>
                            <li>• Medical devices</li>
                            <li>• Agricultural supplies</li>
                            <li>• Manufacturing equipment</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">State-Specific</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Clothing (MA, PA, MN, NJ)</li>
                            <li>• School supplies (during holidays)</li>
                            <li>• Energy-efficient products</li>
                            <li>• Back-to-school items</li>
                            <li>• Emergency supplies</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Always verify exemptions with your state's tax authority. Requirements vary and documentation may be needed.</p>
            </section>

            {/* Sales Tax Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Sales Tax Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Know your local rate:</strong> Always check your specific city and county rates. Combined rates can be significantly higher than state rates.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Save exemption certificates:</strong> Businesses should maintain valid certificates for tax-exempt sales. Audits can go back 3-5 years.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use automated tax software:</strong> For multi-state businesses, consider sales tax automation tools to reduce compliance risk.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Watch for tax holidays:</strong> Plan major purchases during sales tax holidays to save 5-10% on qualifying items.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Understand economic nexus:</strong> If you sell online, know the thresholds for each state where you have customers ($100,000-$500,000 in sales).</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
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