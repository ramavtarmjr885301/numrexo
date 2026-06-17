"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is rental yield and how is it calculated?",
        a: "Rental yield is the annual return on a rental property. Formula: Gross Rental Yield = (Annual Rent ÷ Property Value) × 100. Net Rental Yield = (Annual Rent - Annual Expenses) ÷ Property Value × 100. A good rental yield is 4-8% in most markets. The gross yield gives you a quick snapshot of potential returns, while net yield provides a more realistic picture by accounting for all operating expenses and vacancy losses.",
    },
    {
        q: "What is a good rental yield?",
        a: "Good rental yield by city: Tier 2 cities: 5-8%, Tier 1 cities: 3-5%, Commercial property: 6-10%, Vacation rentals: 8-12%. Lower yields in expensive cities like Mumbai (2-3%) but higher appreciation. Generally, yields above 6% are considered excellent, 4-6% are good, 3-4% are average, and below 3% are poor. However, always consider capital appreciation potential when evaluating investment properties.",
    },
    {
        q: "What expenses to include in net rental yield?",
        a: "Include: Property tax (0.5-1% of value), Maintenance (1-2% of value), Insurance (0.5-1% of value), Property management (5-10% of rent), Vacancy loss (5-10% of rent), Repairs, Society/Association fees, Legal fees, and Marketing costs. These expenses can reduce your gross yield by 20-40%, so always calculate net yield for accurate investment assessment. Our calculator includes all major expense categories for comprehensive analysis.",
    },
    {
        q: "How to calculate ROI on rental property?",
        a: "ROI = (Annual Profit ÷ Total Investment) × 100. Total Investment includes down payment, stamp duty, registration, legal fees, renovation costs. Annual Profit = Rental Income - Loan EMI - Expenses. ROI gives you the actual return on your invested capital, which is different from yield. For financed properties, ROI can be significantly higher than yield due to leverage effects. A good ROI for rental properties is typically 8-12% or higher.",
    },
    {
        q: "What's the difference between gross and net rental yield?",
        a: "Gross yield only considers annual rent divided by property value, while net yield subtracts all expenses including property tax, maintenance, insurance, management fees, vacancy costs, and repairs. Net yield provides a more realistic picture of actual returns. For example, a property with 7% gross yield might only give 4-5% net yield after deducting 30-40% in expenses. Always use net yield for investment decisions.",
    },
    {
        q: "How does vacancy rate affect rental yield?",
        a: "Vacancy rate significantly impacts yield. For every 1% vacancy rate, your effective yield drops by approximately 0.3-0.5%. For example, a property with 8% gross yield and 10% vacancy effectively yields 7.2% gross (8% × 0.9). In high-demand areas with 2-3% vacancy, yields remain stable. In lower-demand areas with 15-20% vacancy, yields can drop dramatically. Always research local vacancy rates before investing.",
    },
    {
        q: "Is rental yield the only factor to consider?",
        a: "No. Other important factors: Capital appreciation (property value growth), Rental demand (tenant availability), Location quality (infrastructure, connectivity), Property age (maintenance costs), Tenant quality (payment history), Legal issues (clear title), Future development plans (new metro, schools), and Economic growth (job creation). Rental yield is a starting point, but a comprehensive analysis including all factors leads to better investment decisions.",
    },
    {
        q: "What are the tax implications of rental income?",
        a: "Rental income is taxed under 'Income from House Property' in India. Key points: 30% standard deduction for repairs and maintenance, Interest on home loan is deductible (up to ₹2,00,000 for self-occupied, no limit for let-out), Property tax paid is deductible, TDS at 10% if rent exceeds ₹2,40,000 annually. For commercial properties, TDS at 10% applies regardless of amount. Consult a tax professional for specific guidance on your situation.",
    },
    {
        q: "How to increase rental yield on property?",
        a: "Increase rental yield through: 1) Increase rent (market rates, renovations), 2) Reduce vacancy (better marketing, property management), 3) Lower expenses (negotiate maintenance contracts, reduce vacancy), 4) Add amenities (parking, storage, AC), 5) Improve energy efficiency (lower utility costs), 6) Furnish property for higher rent, 7) Subdivide larger spaces, 8) Use short-term rentals (Airbnb) for higher returns. Even small improvements can significantly boost your net yield.",
    },
    {
        q: "What is the ideal property value-to-rent ratio?",
        a: "The property value-to-rent ratio is the inverse of gross yield. Lower ratios mean better rental returns. 15:1 (6.67% yield) is considered good, 20:1 (5% yield) is average, 25:1 (4% yield) is poor, 30:1 (3.33% yield) is very poor. Calculate using: Property Value ÷ Annual Rent = Value-to-Rent Ratio. Look for properties with ratios under 20 for good rental returns. This is a quick screening tool for investment properties.",
    },
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
    name: "Rental Yield Calculator – Calculate Property ROI",
    description: "Calculate gross and net rental yield for investment properties. Evaluate real estate returns.",
    url: "https://www.numrexo.com/finance/rental-yield-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Gross rental yield", "Net rental yield", "Expense tracking", "ROI calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Rental Yield Calculator", item: "https://www.numrexo.com/finance/rental-yield-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function RentalYieldCalculator() {
    const [propertyValue, setPropertyValue] = useState("");
    const [monthlyRent, setMonthlyRent] = useState("");
    const [propertyTax, setPropertyTax] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [insurance, setInsurance] = useState("");
    const [managementFee, setManagementFee] = useState("");
    const [vacancyRate, setVacancyRate] = useState("5");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const value = parseFloat(propertyValue);
        const monthly = parseFloat(monthlyRent);
        const tax = parseFloat(propertyTax) || 0;
        const maint = parseFloat(maintenance) || 0;
        const ins = parseFloat(insurance) || 0;
        const mgmtFee = parseFloat(managementFee) || 0;
        const vacancy = parseFloat(vacancyRate) / 100;

        if (!value || value <= 0 || !monthly || monthly <= 0) {
            alert("Please enter property value and monthly rent");
            return;
        }

        const annualRent = monthly * 12;
        const grossYield = (annualRent / value) * 100;

        const annualExpenses = tax + maint + ins + (mgmtFee / 100 * annualRent);
        const vacancyLoss = annualRent * vacancy;
        const netAnnualIncome = annualRent - annualExpenses - vacancyLoss;
        const netYield = (netAnnualIncome / value) * 100;

        const monthlyCashFlow = netAnnualIncome / 12;
        const yearsToRecover = value / netAnnualIncome;

        let yieldRating = "";
        let ratingColor = "";
        if (grossYield >= 8) { yieldRating = "Excellent"; ratingColor = "text-green-400"; }
        else if (grossYield >= 6) { yieldRating = "Good"; ratingColor = "text-blue-400"; }
        else if (grossYield >= 4) { yieldRating = "Average"; ratingColor = "text-yellow-400"; }
        else { yieldRating = "Poor"; ratingColor = "text-red-400"; }

        setResult({
            grossYield: grossYield.toFixed(2),
            netYield: netYield.toFixed(2),
            annualRent: annualRent.toFixed(2),
            netAnnualIncome: netAnnualIncome.toFixed(2),
            monthlyCashFlow: monthlyCashFlow.toFixed(2),
            yearsToRecover: yearsToRecover.toFixed(1),
            yieldRating,
            ratingColor,
            annualExpenses: annualExpenses.toFixed(2),
            vacancyLoss: vacancyLoss.toFixed(2),
            valueToRentRatio: (value / annualRent).toFixed(1),
        });
    };

    const resetForm = () => {
        setPropertyValue("");
        setMonthlyRent("");
        setPropertyTax("");
        setMaintenance("");
        setInsurance("");
        setManagementFee("");
        setVacancyRate("5");
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
                        <a href="https://www.numrexo.com/finance" itemProp="item" className="hover:text-gray-300">Finance Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Rental Yield Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Rental Yield Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate return on rental property investment</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Property Value (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="100000"
                                    placeholder="5000000"
                                    value={propertyValue}
                                    onChange={(e) => setPropertyValue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Rent (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1000"
                                    placeholder="25000"
                                    value={monthlyRent}
                                    onChange={(e) => setMonthlyRent(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-4 mt-2">
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Annual Expenses (Optional)</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Property Tax</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1000"
                                            placeholder="0"
                                            value={propertyTax}
                                            onChange={(e) => setPropertyTax(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Maintenance</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1000"
                                            placeholder="0"
                                            value={maintenance}
                                            onChange={(e) => setMaintenance(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Insurance</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1000"
                                            placeholder="0"
                                            value={insurance}
                                            onChange={(e) => setInsurance(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Management Fee (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1"
                                            placeholder="0"
                                            value={managementFee}
                                            onChange={(e) => setManagementFee(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Vacancy Rate (%)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="1"
                                        placeholder="5"
                                        value={vacancyRate}
                                        onChange={(e) => setVacancyRate(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Rental Yield →
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

                {/* Results Display */}
                <ResultBox
                    title="Rental Yield Analysis"
                    isEmpty={!result}
                    emptyIcon="🏘️"
                    emptyText="Enter property details to calculate yield"
                    mainResult={result ? { label: "Gross Rental Yield", value: `${result.grossYield}%`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Net Rental Yield", value: `${result.netYield}%`, valueColor: "text-yellow-400" },
                        { label: "Yield Rating", value: result.yieldRating, valueColor: result.ratingColor },
                        { label: "Value-to-Rent Ratio", value: `${result.valueToRentRatio}:1`, valueColor: "text-purple-400" },
                        { label: "Annual Rent", value: `₹${parseFloat(result.annualRent).toLocaleString()}` },
                        { label: "Annual Expenses", value: `₹${parseFloat(result.annualExpenses).toLocaleString()}`, valueColor: "text-red-400" },
                        { label: "Vacancy Loss", value: `₹${parseFloat(result.vacancyLoss).toLocaleString()}`, valueColor: "text-orange-400" },
                        { label: "Net Annual Income", value: `₹${parseFloat(result.netAnnualIncome).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Monthly Cash Flow", value: `₹${parseFloat(result.monthlyCashFlow).toLocaleString()}` },
                        { label: "Payback Period", value: `${result.yearsToRecover} years` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Rental Yield Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Rental Yield Calculator</strong> helps investors evaluate the return on rental property investments. It calculates both gross and net rental yields by considering property value, monthly rent, and various expenses including property tax, maintenance, insurance, management fees, and vacancy rates.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're a first-time investor or an experienced landlord, this calculator provides essential insights to make informed real estate investment decisions. It includes yield ratings, payback period analysis, and monthly cash flow projections to help you compare different properties effectively.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Rental Yield Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">property value</strong> (market value or purchase price).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">monthly rent</strong> you expect to receive.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter <strong className="text-white">annual expenses</strong> (property tax, maintenance, insurance).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter <strong className="text-white">management fee</strong> and <strong className="text-white">vacancy rate</strong> percentages.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Rental Yield"</strong> to see results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Rental Yield Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Investment Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare yields across different properties and cities. Make data-driven decisions on where to invest for maximum returns.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Expense Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand how different expenses impact your net yield. Identify areas where you can reduce costs and improve returns.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Cash Flow Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your monthly cash flow before investing. Ensure the property generates positive cash flow for financial sustainability.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Risk Assessment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Evaluate payback period and yield ratings. Understand the risk-return profile of different investment properties.</p>
                    </div>
                </div>
            </section>

            {/* City-wise Yield Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Rental Yield by City (India 2025-26)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">City</th>
                                <th className="text-left py-3 px-4 text-gray-400">Gross Yield</th>
                                <th className="text-left py-3 px-4 text-gray-400">Net Yield</th>
                                <th className="text-left py-3 px-4 text-gray-400">Appreciation</th>
                                <th className="text-left py-3 px-4 text-gray-400">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Mumbai</td>
                                <td className="py-2 px-4 text-yellow-400">2.5-3.5%</td>
                                <td className="py-2 px-4 text-gray-400">1.5-2.5%</td>
                                <td className="py-2 px-4 text-green-400">High</td>
                                <td className="py-2 px-4 text-red-400">Poor</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Delhi NCR</td>
                                <td className="py-2 px-4 text-yellow-400">3-4%</td>
                                <td className="py-2 px-4 text-gray-400">2-3%</td>
                                <td className="py-2 px-4 text-yellow-400">Medium</td>
                                <td className="py-2 px-4 text-yellow-400">Average</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Bangalore</td>
                                <td className="py-2 px-4 text-yellow-400">3.5-4.5%</td>
                                <td className="py-2 px-4 text-gray-400">2.5-3.5%</td>
                                <td className="py-2 px-4 text-green-400">High</td>
                                <td className="py-2 px-4 text-yellow-400">Average</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Pune</td>
                                <td className="py-2 px-4 text-yellow-400">4-5%</td>
                                <td className="py-2 px-4 text-gray-400">3-4%</td>
                                <td className="py-2 px-4 text-yellow-400">Medium</td>
                                <td className="py-2 px-4 text-blue-400">Good</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Chennai</td>
                                <td className="py-2 px-4 text-yellow-400">3.5-4.5%</td>
                                <td className="py-2 px-4 text-gray-400">2.5-3.5%</td>
                                <td className="py-2 px-4 text-yellow-400">Medium</td>
                                <td className="py-2 px-4 text-yellow-400">Average</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Hyderabad</td>
                                <td className="py-2 px-4 text-yellow-400">4-5.5%</td>
                                <td className="py-2 px-4 text-gray-400">3-4%</td>
                                <td className="py-2 px-4 text-green-400">High</td>
                                <td className="py-2 px-4 text-blue-400">Good</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Ahmedabad</td>
                                <td className="py-2 px-4 text-yellow-400">4.5-6%</td>
                                <td className="py-2 px-4 text-gray-400">3.5-4.5%</td>
                                <td className="py-2 px-4 text-yellow-400">Medium</td>
                                <td className="py-2 px-4 text-green-400">Excellent</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Kolkata</td>
                                <td className="py-2 px-4 text-yellow-400">4-5%</td>
                                <td className="py-2 px-4 text-gray-400">3-4%</td>
                                <td className="py-2 px-4 text-red-400">Low</td>
                                <td className="py-2 px-4 text-blue-400">Good</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Yields are approximate and vary by specific location within each city. Always verify current market rates before making investment decisions.
                    </p>
                </div>
            </section>

            {/* Residential vs Commercial Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Residential vs Commercial Rental Yield</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-blue-400">Residential Property</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Yield: 3-6% typical</li>
                                <li>• Lower management effort</li>
                                <li>• Stable tenant base</li>
                                <li>• Lower vacancy rates</li>
                                <li>• Lower maintenance costs</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-orange-400">Commercial Property</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Yield: 6-10% typical</li>
                                <li>• Higher management effort</li>
                                <li>• Longer lease terms</li>
                                <li>• Higher capital requirement</li>
                                <li>• Higher maintenance costs</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3">
                        Commercial properties typically offer higher yields but require more capital and management expertise. Residential properties offer stability and easier tenant management. Choose based on your investment goals and risk tolerance.
                    </p>
                </div>
            </section>

            {/* Investment Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips to Maximize Rental Yield</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Research local market:</strong> Know the going rents and vacancy rates in your target area. Study rental trends and seasonal variations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Minimize vacancies:</strong> Use professional property management, maintain good tenant relations, and respond quickly to maintenance requests.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Reduce expenses:</strong> Negotiate maintenance contracts, pay property tax on time (avoid penalties), and consider energy-efficient upgrades to lower utility costs.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Add value:</strong> Furnish property for higher rent, add parking spaces, upgrade appliances, or split larger spaces into multiple rental units.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Review rent regularly:</strong> Increase rent by 5-10% annually (or as per market), ensure leases align with market rates, and include escalation clauses in rental agreements.</span>
                    </li>
                </ul>
            </section>

            {/* FAQs Section */}
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