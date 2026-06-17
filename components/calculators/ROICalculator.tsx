"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is ROI and how is it calculated?",
        a: "ROI (Return on Investment) measures the profitability of an investment. Formula: ROI = (Net Profit ÷ Cost of Investment) × 100. For example, if you invest ₹10,000 and earn ₹15,000, your net profit is ₹5,000, and ROI is 50%. Higher ROI means better investment returns. ROI is expressed as a percentage and helps compare different investment opportunities objectively.",
    },
    {
        q: "What is a good ROI percentage?",
        a: "A good ROI depends on the investment type and risk level. Stock market: 10-15% annually is considered good. Real estate: 8-12% annually. Mutual funds: 10-12% annually. Business investments: 20-30% is excellent. Fixed deposits: 6-7% is typical. Generally, any ROI above 10% is considered good for most investments. However, higher returns usually come with higher risk, so always balance return expectations with risk tolerance.",
    },
    {
        q: "What is the difference between ROI and CAGR?",
        a: "ROI measures total return over the entire investment period, ignoring time. CAGR (Compound Annual Growth Rate) measures the annualized return, accounting for time. For multi-year investments, CAGR is more accurate. Example: 100% ROI over 5 years = 14.87% CAGR. While ROI tells you the total gain, CAGR tells you the average yearly growth rate, making it easier to compare investments of different durations.",
    },
    {
        q: "How to calculate ROI for marketing campaigns?",
        a: "Marketing ROI = (Revenue from Campaign - Campaign Cost) ÷ Campaign Cost × 100. Example: Spend ₹50,000 on ads, generate ₹2,00,000 in sales → ROI = (2,00,000 - 50,000) ÷ 50,000 × 100 = 300%. A positive ROI means profitable marketing. For more accurate analysis, consider customer lifetime value (LTV), brand awareness impact, and long-term customer acquisition costs.",
    },
    {
        q: "What is negative ROI and what does it mean?",
        a: "Negative ROI means you lost money on an investment. Example: Invest ₹1,00,000 and get back only ₹80,000 → ROI = -20%. Negative ROI indicates poor investment performance and suggests you should reconsider the investment strategy. Common causes of negative ROI include poor market timing, high expenses, mismanagement, or unexpected market downturns. It's a red flag that requires immediate attention.",
    },
    {
        q: "How to calculate ROI for real estate?",
        a: "Real estate ROI = (Annual Rental Income - Expenses) ÷ Total Investment × 100. Example: Property cost ₹50 lakhs, annual rent ₹3 lakhs, expenses ₹50,000 → Net income ₹2.5 lakhs → ROI = 2.5 ÷ 50 × 100 = 5%. Also consider property appreciation for total return. Additional factors to include: stamp duty, registration fees, renovation costs, property tax, maintenance, insurance, and vacancy periods.",
    },
    {
        q: "What is the difference between ROI and ROE?",
        a: "ROI (Return on Investment) measures return on total investment amount. ROE (Return on Equity) measures return on shareholder's equity (net worth). ROE = Net Income ÷ Shareholder's Equity × 100. While ROI considers total capital invested, ROE focuses specifically on equity invested. For businesses, ROE is often used to measure management's effectiveness in generating returns from shareholders' investments.",
    },
    {
        q: "How does time affect ROI calculations?",
        a: "Time is crucial in ROI analysis. A 50% ROI in 1 year is significantly better than 50% ROI in 10 years. This is why CAGR (Compound Annual Growth Rate) is used for time-adjusted returns. The formula: CAGR = (Final Value ÷ Initial Value)^(1/years) - 1 × 100. Time also affects risk - longer investments typically have higher uncertainty but potentially higher returns due to compounding.",
    },
    {
        q: "What is the difference between simple ROI and annualized ROI?",
        a: "Simple ROI calculates total return without considering time: (Net Profit ÷ Investment) × 100. Annualized ROI (CAGR) calculates average yearly return: (Final ÷ Initial)^(1/years) - 1 × 100. Annualized ROI is more useful for comparing investments with different time periods. For example, a 100% ROI over 5 years equals 14.87% CAGR, which is helpful for benchmark comparisons.",
    },
    {
        q: "How to use ROI for investment decisions?",
        a: "Use ROI to: 1) Compare different investment opportunities, 2) Evaluate past investment performance, 3) Set investment goals, 4) Assess risk-adjusted returns, 5) Determine whether to hold or sell investments. Consider: ROI threshold (minimum acceptable return), Risk level (higher ROI = higher risk), Time horizon (short vs long term), Tax implications (pre-tax vs after-tax ROI), and Inflation impact (real vs nominal ROI).",
    },
];

const ROI_EXAMPLES = [
    { investment: "Stock Market", typicalROI: "10-15%", risk: "High", timeHorizon: "3-5 years" },
    { investment: "Real Estate", typicalROI: "8-12%", risk: "Medium", timeHorizon: "5-10 years" },
    { investment: "Mutual Funds (Equity)", typicalROI: "10-12%", risk: "Medium", timeHorizon: "3-5 years" },
    { investment: "Mutual Funds (Debt)", typicalROI: "6-9%", risk: "Low", timeHorizon: "1-3 years" },
    { investment: "Fixed Deposits", typicalROI: "6-7%", risk: "Low", timeHorizon: "1-5 years" },
    { investment: "Business", typicalROI: "20-30%", risk: "High", timeHorizon: "2-5 years" },
    { investment: "Gold", typicalROI: "8-10%", risk: "Low", timeHorizon: "5-10 years" },
    { investment: "Government Bonds", typicalROI: "6-8%", risk: "Very Low", timeHorizon: "5-10 years" },
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
    name: "ROI Calculator – Return on Investment Calculator",
    description: "Calculate Return on Investment (ROI) for stocks, real estate, business, and marketing campaigns. Instant and accurate.",
    url: "https://www.numrexo.com/business/roi-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Investment return calculation", "Profit/loss analysis", "Percentage return", "Annualized ROI"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Business Calculators", item: "https://www.numrexo.com/business" },
        { "@type": "ListItem", position: 3, name: "ROI Calculator", item: "https://www.numrexo.com/business/roi-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function ROICalculator() {
    const [investmentCost, setInvestmentCost] = useState("");
    const [finalValue, setFinalValue] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const cost = parseFloat(investmentCost);
        const final = parseFloat(finalValue);
        const yearsInvested = parseFloat(years);

        if (!cost || !final || cost <= 0 || final <= 0) {
            alert("Please enter valid investment cost and final value");
            return;
        }

        const netProfit = final - cost;
        const roi = (netProfit / cost) * 100;
        let cagr = null;

        if (yearsInvested && yearsInvested > 0) {
            cagr = (Math.pow(final / cost, 1 / yearsInvested) - 1) * 100;
        }

        let performanceRating = "";
        let ratingColor = "";
        if (roi >= 20) { performanceRating = "Excellent"; ratingColor = "text-green-400"; }
        else if (roi >= 10) { performanceRating = "Good"; ratingColor = "text-blue-400"; }
        else if (roi >= 0) { performanceRating = "Average"; ratingColor = "text-yellow-400"; }
        else { performanceRating = "Poor"; ratingColor = "text-red-400"; }

        setResult({
            netProfit: netProfit.toFixed(2),
            roi: roi.toFixed(2),
            cagr: cagr ? cagr.toFixed(2) : null,
            cost: cost.toFixed(2),
            final: final.toFixed(2),
            years: yearsInvested || null,
            isProfit: netProfit >= 0,
            performanceRating,
            ratingColor,
        });
    };

    const resetForm = () => {
        setInvestmentCost("");
        setFinalValue("");
        setYears("");
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
                        <span itemProp="name" className="text-gray-300">ROI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Investment Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate your investment returns</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Initial Investment (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="100000"
                                    value={investmentCost}
                                    onChange={(e) => setInvestmentCost(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Final Value (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="150000"
                                    value={finalValue}
                                    onChange={(e) => setFinalValue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Investment Period (Years) - Optional</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="5"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Add to see annualized returns (CAGR)</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate ROI →
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
                    title="ROI Analysis"
                    isEmpty={!result}
                    emptyIcon="📈"
                    emptyText="Enter investment details and press Calculate"
                    mainResult={result ? {
                        label: "Return on Investment (ROI)",
                        value: `${result.roi}%`,
                        color: result.isProfit ? "text-green-400" : "text-red-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Net Profit / Loss", value: `₹${parseFloat(result.netProfit).toLocaleString()}`, valueColor: result.isProfit ? "text-green-400" : "text-red-400" },
                        { label: "Performance Rating", value: result.performanceRating, valueColor: result.ratingColor },
                        { label: "Initial Investment", value: `₹${parseFloat(result.cost).toLocaleString()}` },
                        { label: "Final Value", value: `₹${parseFloat(result.final).toLocaleString()}` },
                        ...(result.cagr ? [{ label: "Annualized Return (CAGR)", value: `${result.cagr}%`, valueColor: "text-yellow-400" }] : []),
                        { label: "Status", value: result.isProfit ? "💰 Profit" : "⚠️ Loss", valueColor: result.isProfit ? "text-green-400" : "text-red-400" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About ROI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Return on Investment (ROI) Calculator</strong> helps you measure the profitability of your investments. Whether you're investing in stocks, real estate, business, or marketing campaigns, this calculator gives you instant ROI calculations with detailed analysis.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    ROI is expressed as a percentage and helps you compare different investment opportunities objectively. A positive ROI means profit, while negative ROI indicates loss. For multi-year investments, we also calculate CAGR (Compound Annual Growth Rate) to give you time-adjusted annualized returns.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our ROI calculator provides performance ratings (Excellent, Good, Average, Poor) to help you quickly assess your investment's performance against industry benchmarks. Whether you're a seasoned investor or just starting, this tool provides the insights you need for informed decision-making.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This ROI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">initial investment amount</strong> (the total money you put in).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">final value</strong> (the total amount you received or the current value).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> (Optional) Enter the <strong className="text-white">investment period</strong> in years to calculate CAGR.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate ROI"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review your <strong className="text-white">ROI, net profit, performance rating, and CAGR</strong> (if applicable).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an ROI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Investment Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare ROI across different investments (stocks, real estate, business, etc.) to identify the most profitable opportunities.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Performance Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track your investment performance over time. See if your investments are meeting your return expectations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Goal Setting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Set realistic ROI goals for your investments. Understand what returns you need to achieve your financial objectives.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Quick Decisions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Make faster investment decisions with instant ROI calculations. No complex spreadsheet formulas needed.</p>
                    </div>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">ROI Formula & Calculation Methodology</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Basic ROI Formula</h3>
                        <p className="text-white font-mono text-sm mb-2">ROI = (Net Profit ÷ Cost of Investment) × 100</p>
                        <p className="text-gray-500 text-xs mb-2">Where: Net Profit = Final Value - Initial Investment</p>
                        <p className="text-gray-500 text-xs">Example: ₹1,00,000 to ₹1,50,000 → ROI = (50,000 ÷ 1,00,000) × 100 = 50%</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Annualized ROI (CAGR)</h3>
                        <p className="text-white font-mono text-sm mb-2">CAGR = (Final ÷ Initial)^(1/years) - 1 × 100</p>
                        <p className="text-gray-500 text-xs mb-2">Use when comparing investments of different durations</p>
                        <p className="text-gray-500 text-xs">Example: 50% ROI over 5 years → CAGR = (1.5)^(1/5) - 1 × 100 = 8.45% annually</p>
                    </div>
                </div>
            </section>

            {/* ROI Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical ROI by Investment Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Investment Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Typical ROI</th>
                                <th className="text-left py-3 px-4 text-gray-400">Risk Level</th>
                                <th className="text-left py-3 px-4 text-gray-400">Time Horizon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ROI_EXAMPLES.map((row, i) => (
                                <tr key={i} className={`border-b border-gray-800/50 hover:bg-white/5 ${i === ROI_EXAMPLES.length - 1 ? 'border-b-0' : ''}`}>
                                    <td className="py-3 px-4 text-gray-300 font-medium">{row.investment}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.typicalROI}</td>
                                    <td className={`py-3 px-4 ${row.risk === "High" ? "text-red-400" :
                                        row.risk === "Medium" ? "text-yellow-400" :
                                            row.risk === "Low" ? "text-green-400" :
                                                "text-blue-400"
                                        }`}>{row.risk}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.timeHorizon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are historical average returns. Actual returns may vary based on market conditions and specific investment choices.
                    </p>
                </div>
            </section>

            {/* Risk vs Return Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Understanding Risk vs Return</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        There's a fundamental relationship between risk and return in investing. Generally, <strong className="text-white">higher potential returns come with higher risk</strong> of loss. Understanding this relationship is crucial for making informed investment decisions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0f1525] border border-gray-800 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-red-400 mb-2">High Risk (20-30% ROI)</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Business investments</li>
                                <li>• Startup equity</li>
                                <li>• Cryptocurrency</li>
                                <li>• Small-cap stocks</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] border border-gray-800 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-yellow-400 mb-2">Medium Risk (10-15% ROI)</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Large-cap stocks</li>
                                <li>• Mutual funds</li>
                                <li>• Real estate</li>
                                <li>• Index funds</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] border border-gray-800 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-green-400 mb-2">Low Risk (6-8% ROI)</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Fixed deposits</li>
                                <li>• Government bonds</li>
                                <li>• Gold</li>
                                <li>• Savings accounts</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] border border-gray-800 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-blue-400 mb-2">Very Low Risk (3-5% ROI)</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Savings accounts</li>
                                <li>• Treasury bills</li>
                                <li>• Money market funds</li>
                                <li>• Cash equivalents</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Investment Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Investment Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Diversify your portfolio:</strong> Don't put all your money in one investment. Spread across different asset classes to manage risk.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider the time factor:</strong> Use CAGR for multi-year investments. A 50% ROI over 5 years is different from 50% over 1 year.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Account for all costs:</strong> Include transaction fees, taxes, maintenance, and management charges for accurate ROI calculation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Set realistic expectations:</strong> Historical returns don't guarantee future performance. Research thoroughly before investing.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Review regularly:</strong> Monitor your investments quarterly. Use ROI calculations to decide whether to hold, sell, or buy more.</span>
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