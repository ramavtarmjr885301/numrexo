"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is APY and how is it different from APR?",
        a: "APY (Annual Percentage Yield) includes compound interest. APR (Annual Percentage Rate) does not. For savings, APY matters more because it shows what you'll actually earn. Example: 5% APR compounded monthly = 5.12% APY. Always compare APY when choosing savings accounts or CDs.",
    },
    {
        q: "How is APY calculated?",
        a: "Formula: APY = (1 + r/n)^n - 1, where r = interest rate, n = compounding frequency per year. Example: 5% interest compounded monthly = (1 + 0.05/12)^12 - 1 = 5.116%. The more frequent the compounding, the higher the APY.",
    },
    {
        q: "What compounding frequencies are common?",
        a: "Daily (365 times/year): Highest returns. Monthly (12 times/year): Most common for savings accounts. Quarterly (4 times/year): Common for CDs. Semi-annually (2 times/year): Some bonds. Annually (1 time/year): Lowest returns. More frequent = better returns.",
    },
    {
        q: "How much difference does compounding frequency make?",
        a: "On ₹1,00,000 at 5% for 1 year: Annual compounding = ₹5,000 interest, Monthly = ₹5,116 interest, Daily = ₹5,127 interest. The difference grows larger over time and with higher rates.",
    },
    {
        q: "What is a good APY for a savings account?",
        a: "In 2024-25, good savings APY: High-yield accounts: 4-5%, Traditional banks: 0.01-0.50%, Online banks: 4-5.5%, CDs: 4.5-5.5%. Always compare APY, not just interest rate.",
    },
    {
        q: "How to compare APY across different accounts?",
        a: "Always compare APY directly — it already includes compounding effects. A 5% APY from daily compounding earns the same as 5% APY from monthly compounding. Higher APY = better return, regardless of compounding frequency.",
    },
];

const APY_EXAMPLES = [
    { rate: "4%", monthly: "4.07%", daily: "4.08%", continuous: "4.08%" },
    { rate: "5%", monthly: "5.12%", daily: "5.13%", continuous: "5.13%" },
    { rate: "6%", monthly: "6.17%", daily: "6.18%", continuous: "6.18%" },
    { rate: "7%", monthly: "7.23%", daily: "7.25%", continuous: "7.25%" },
    { rate: "8%", monthly: "8.30%", daily: "8.33%", continuous: "8.33%" },
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
    name: "APY Calculator – Annual Percentage Yield Calculator",
    description: "Calculate Annual Percentage Yield (APY) for savings accounts, CDs, and investments. Compare APY across different compounding frequencies.",
    url: "https://www.numrexo.com/finance/apy-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["APY calculation", "Multiple compounding frequencies", "Interest earned", "Rate comparison"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "APY Calculator", item: "https://www.numrexo.com/finance/apy-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function APYCalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("1");
    const [compoundFrequency, setCompoundFrequency] = useState<"daily" | "monthly" | "quarterly" | "semi-annual" | "annual">("monthly");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getCompoundingPeriods = () => {
        switch (compoundFrequency) {
            case "daily": return 365;
            case "monthly": return 12;
            case "quarterly": return 4;
            case "semi-annual": return 2;
            case "annual": return 1;
            default: return 12;
        }
    };

    const getFrequencyName = () => {
        switch (compoundFrequency) {
            case "daily": return "Daily";
            case "monthly": return "Monthly";
            case "quarterly": return "Quarterly";
            case "semi-annual": return "Semi-annually";
            case "annual": return "Annually";
            default: return "Monthly";
        }
    };

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = getCompoundingPeriods();

        if (!p || p <= 0 || !r || r <= 0 || !t || t <= 0) {
            alert("Please enter valid principal, rate, and years");
            return;
        }

        const apy = (Math.pow(1 + r / n, n) - 1) * 100;
        const finalAmount = p * Math.pow(1 + r / n, n * t);
        const totalInterest = finalAmount - p;

        setResult({
            apy: apy.toFixed(3),
            finalAmount: finalAmount.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            principal: p.toFixed(2),
            rate: (r * 100).toFixed(2),
            years: t,
            frequency: getFrequencyName(),
        });
    };

    const resetForm = () => {
        setPrincipal("");
        setRate("");
        setYears("1");
        setCompoundFrequency("monthly");
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
                        <span itemProp="name" className="text-gray-300">APY Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">APY Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate true annual return with compound interest</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Principal Amount (₹)</label>
                            <div className="relative">
                                <input type="number" placeholder="10000" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (%)</label>
                            <div className="relative">
                                <input type="number" step="0.1" placeholder="5" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Compounding Frequency</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${compoundFrequency === "daily" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCompoundFrequency("daily")}>Daily</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${compoundFrequency === "monthly" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCompoundFrequency("monthly")}>Monthly</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${compoundFrequency === "quarterly" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCompoundFrequency("quarterly")}>Quarterly</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${compoundFrequency === "semi-annual" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCompoundFrequency("semi-annual")}>Semi-Annual</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${compoundFrequency === "annual" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCompoundFrequency("annual")}>Annual</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Number of Years</label>
                            <div className="relative">
                                <input type="number" step="0.5" placeholder="1" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Calculate APY →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="APY Results"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter your investment details"
                    mainResult={result ? { label: "Annual Percentage Yield (APY)", value: `${result.apy}%`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Final Amount", value: `₹${parseFloat(result.finalAmount).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Total Interest Earned", value: `₹${parseFloat(result.totalInterest).toLocaleString()}` },
                        { label: "Principal Amount", value: `₹${parseFloat(result.principal).toLocaleString()}` },
                        { label: "Interest Rate (APR)", value: `${result.rate}%` },
                        { label: "Compounding", value: result.frequency },
                        { label: "Time Period", value: `${result.years} years` },
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About APY Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">The <strong className="text-gray-300">Annual Percentage Yield (APY) Calculator</strong> helps you calculate the true return on your savings or investments, including the effect of compound interest.</p>
                <p className="text-gray-400 text-sm leading-relaxed">When comparing savings accounts, CDs, or investment products, always compare APY — it already includes the compounding effect.</p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">APY Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2 text-center">APY = (1 + r/n)^n - 1</p>
                    <p className="text-gray-500 text-xs text-center">Where: r = interest rate, n = compounding frequency per year</p>
                    <p className="text-gray-500 text-xs text-center mt-2">Example: 5% compounded monthly = (1 + 0.05/12)^12 - 1 = 5.12% APY</p>
                </div>
            </section>

            {/* APY Comparison Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">APY Comparison by Compounding Frequency</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Interest Rate (APR)</th>
                                <th className="text-left py-3 px-4 text-gray-400">Monthly APY</th>
                                <th className="text-left py-3 px-4 text-gray-400">Daily APY</th>
                                <th className="text-left py-3 px-4 text-gray-400">Continuous APY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {APY_EXAMPLES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-yellow-400">{row.rate}%</td>
                                    <td className="py-3 px-4 text-gray-300">{row.monthly}%</td>
                                    <td className="py-3 px-4 text-gray-300">{row.daily}%</td>
                                    <td className="py-3 px-4 text-gray-300">{row.continuous}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* APY vs APR Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">APY vs APR — What's the Difference?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">APY (Annual Percentage Yield)</h3>
                        <p className="text-xs text-gray-400">• Includes compound interest</p>
                        <p className="text-xs text-gray-400">• Used for savings accounts, CDs, investments</p>
                        <p className="text-xs text-gray-400">• Shows what you actually earn</p>
                        <p className="text-xs text-gray-400">• Higher = better for savers</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">APR (Annual Percentage Rate)</h3>
                        <p className="text-xs text-gray-400">• Does NOT include compounding</p>
                        <p className="text-xs text-gray-400">• Used for loans, credit cards, mortgages</p>
                        <p className="text-xs text-gray-400">• Shows base interest rate</p>
                        <p className="text-xs text-gray-400">• Lower = better for borrowers</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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