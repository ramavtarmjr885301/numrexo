"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is rental yield and how is it calculated?",
        a: "Rental yield is the annual return on a rental property. Formula: Gross Rental Yield = (Annual Rent ÷ Property Value) × 100. Net Rental Yield = (Annual Rent - Annual Expenses) ÷ Property Value × 100. A good rental yield is 4-8% in most markets.",
    },
    {
        q: "What is a good rental yield?",
        a: "Good rental yield by city: Tier 2 cities: 5-8%, Tier 1 cities: 3-5%, Commercial property: 6-10%, Vacation rentals: 8-12%. Lower yields in expensive cities like Mumbai (2-3%) but higher appreciation.",
    },
    {
        q: "What expenses to include in net rental yield?",
        a: "Include: Property tax (0.5-1% of value), Maintenance (1-2% of value), Insurance (0.5-1% of value), Property management (5-10% of rent), Vacancy loss (5-10% of rent), Repairs, Society/Association fees.",
    },
    {
        q: "How to calculate ROI on rental property?",
        a: "ROI = (Annual Profit ÷ Total Investment) × 100. Total Investment includes down payment, stamp duty, registration, legal fees, renovation costs. Annual Profit = Rental Income - Loan EMI - Expenses.",
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
        if (grossYield >= 8) yieldRating = "Excellent";
        else if (grossYield >= 6) yieldRating = "Good";
        else if (grossYield >= 4) yieldRating = "Average";
        else yieldRating = "Poor";

        setResult({
            grossYield: grossYield.toFixed(2),
            netYield: netYield.toFixed(2),
            annualRent: annualRent.toFixed(2),
            netAnnualIncome: netAnnualIncome.toFixed(2),
            monthlyCashFlow: monthlyCashFlow.toFixed(2),
            yearsToRecover: yearsToRecover.toFixed(1),
            yieldRating,
            annualExpenses: annualExpenses.toFixed(2),
            vacancyLoss: vacancyLoss.toFixed(2),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/finance" itemProp="item" className="hover:text-gray-300">Finance Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Rental Yield Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Rental Yield Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate return on rental property investment</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Value (₹)</label><div className="relative"><input type="number" step="100000" placeholder="5000000" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Rent (₹)</label><div className="relative"><input type="number" step="1000" placeholder="25000" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>

                        <div className="border-t border-gray-800 pt-4 mt-2">
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Annual Expenses (Optional)</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Tax</label><div className="relative"><input type="number" step="1000" placeholder="0" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Maintenance</label><div className="relative"><input type="number" step="1000" placeholder="0" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Insurance</label><div className="relative"><input type="number" step="1000" placeholder="0" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Management Fee (%)</label><div className="relative"><input type="number" step="1" placeholder="0" value={managementFee} onChange={(e) => setManagementFee(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            </div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2 mt-2">Vacancy Rate (%)</label><div className="relative"><input type="number" step="1" placeholder="5" value={vacancyRate} onChange={(e) => setVacancyRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Calculate Rental Yield →</button>
                    </div>
                </div>

                <ResultBox
                    title="Rental Yield Analysis"
                    isEmpty={!result}
                    emptyIcon="🏘️"
                    emptyText="Enter property details"
                    mainResult={result ? { label: "Gross Rental Yield", value: `${result.grossYield}%`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Net Rental Yield (after expenses)", value: `${result.netYield}%`, valueColor: "text-yellow-400" },
                        { label: "Yield Rating", value: result.yieldRating, valueColor: "text-green-400" },
                        { label: "Annual Rent", value: `₹${parseFloat(result.annualRent).toLocaleString()}` },
                        { label: "Annual Expenses", value: `₹${parseFloat(result.annualExpenses).toLocaleString()}`, valueColor: "text-red-400" },
                        { label: "Net Annual Income", value: `₹${parseFloat(result.netAnnualIncome).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Monthly Cash Flow", value: `₹${parseFloat(result.monthlyCashFlow).toLocaleString()}` },
                        { label: "Payback Period", value: `${result.yearsToRecover} years` },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Rental Yield Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate gross and net rental yield for your investment property. Compare properties and make informed real estate investment decisions.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Rental Yield by City (India)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">City</th><th className="text-left py-3 px-4 text-gray-400">Gross Yield</th><th className="text-left py-3 px-4 text-gray-400">Net Yield (approx)</th><th className="text-left py-3 px-4 text-gray-400">Appreciation</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Mumbai</td><td className="py-2 px-4 text-yellow-400">2.5-3.5%</td><td className="py-2 px-4">1.5-2.5%</td><td className="py-2 px-4">High</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Delhi NCR</td><td className="py-2 px-4 text-yellow-400">3-4%</td><td className="py-2 px-4">2-3%</td><td className="py-2 px-4">Medium</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Bangalore</td><td className="py-2 px-4 text-yellow-400">3.5-4.5%</td><td className="py-2 px-4">2.5-3.5%</td><td className="py-2 px-4">High</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Pune</td><td className="py-2 px-4 text-yellow-400">4-5%</td><td className="py-2 px-4">3-4%</td><td className="py-2 px-4">Medium</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Chennai</td><td className="py-2 px-4 text-yellow-400">3.5-4.5%</td><td className="py-2 px-4">2.5-3.5%</td><td className="py-2 px-4">Medium</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Hyderabad</td><td className="py-2 px-4 text-yellow-400">4-5.5%</td><td className="py-2 px-4">3-4%</td><td className="py-2 px-4">High</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Ahmedabad</td><td className="py-2 px-4 text-yellow-400">4.5-6%</td><td className="py-2 px-4">3.5-4.5%</td><td className="py-2 px-4">Medium</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Kolkata</td><td className="py-2 px-4 text-yellow-400">4-5%</td><td className="py-2 px-4">3-4%</td><td className="py-2 px-4">Low</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}