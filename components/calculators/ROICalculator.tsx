"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is ROI and how is it calculated?",
        a: "ROI (Return on Investment) measures the profitability of an investment. Formula: ROI = (Net Profit ÷ Cost of Investment) × 100. For example, if you invest ₹10,000 and earn ₹15,000, your net profit is ₹5,000, and ROI is 50%. Higher ROI means better investment returns.",
    },
    {
        q: "What is a good ROI percentage?",
        a: "A good ROI depends on the investment type and risk level. Stock market: 10-15% annually is considered good. Real estate: 8-12% annually. Mutual funds: 10-12% annually. Business investments: 20-30% is excellent. Generally, any ROI above 10% is considered good.",
    },
    {
        q: "What is the difference between ROI and CAGR?",
        a: "ROI measures total return over the entire investment period, ignoring time. CAGR (Compound Annual Growth Rate) measures the annualized return, accounting for time. For multi-year investments, CAGR is more accurate. Example: 100% ROI over 5 years = 14.87% CAGR.",
    },
    {
        q: "How to calculate ROI for marketing campaigns?",
        a: "Marketing ROI = (Revenue from Campaign - Campaign Cost) ÷ Campaign Cost × 100. Example: Spend ₹50,000 on ads, generate ₹2,00,000 in sales → ROI = (2,00,000 - 50,000) ÷ 50,000 × 100 = 300%. A positive ROI means profitable marketing.",
    },
    {
        q: "What is negative ROI and what does it mean?",
        a: "Negative ROI means you lost money on an investment. Example: Invest ₹1,00,000 and get back only ₹80,000 → ROI = -20%. Negative ROI indicates poor investment performance and suggests you should reconsider the investment strategy.",
    },
    {
        q: "How to calculate ROI for real estate?",
        a: "Real estate ROI = (Annual Rental Income - Expenses) ÷ Total Investment × 100. Example: Property cost ₹50 lakhs, annual rent ₹3 lakhs, expenses ₹50,000 → Net income ₹2.5 lakhs → ROI = 2.5 ÷ 50 × 100 = 5%. Also consider property appreciation for total return.",
    },
];

const ROI_EXAMPLES = [
    { investment: "Stock Market", typicalROI: "10-15%", risk: "High", timeHorizon: "3-5 years" },
    { investment: "Real Estate", typicalROI: "8-12%", risk: "Medium", timeHorizon: "5-10 years" },
    { investment: "Mutual Funds", typicalROI: "10-12%", risk: "Medium", timeHorizon: "3-5 years" },
    { investment: "Fixed Deposits", typicalROI: "6-7%", risk: "Low", timeHorizon: "1-5 years" },
    { investment: "Business", typicalROI: "20-30%", risk: "High", timeHorizon: "2-5 years" },
    { investment: "Gold", typicalROI: "8-10%", risk: "Low", timeHorizon: "5-10 years" },
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

        setResult({
            netProfit: netProfit.toFixed(2),
            roi: roi.toFixed(2),
            cagr: cagr ? cagr.toFixed(2) : null,
            cost: cost.toFixed(2),
            final: final.toFixed(2),
            years: yearsInvested || null,
            isProfit: netProfit >= 0,
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Add to see annualized returns (CAGR)</p>
                        </div>
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate ROI →
                        </button>
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
                        { label: "Net Profit / Loss", value: `₹${result.netProfit}`, valueColor: result.isProfit ? "text-green-400" : "text-red-400" },
                        { label: "Initial Investment", value: `₹${result.cost}` },
                        { label: "Final Value", value: `₹${result.final}` },
                        ...(result.cagr ? [{ label: "Annualized Return (CAGR)", value: `${result.cagr}%`, valueColor: "text-yellow-400" }] : []),
                        { label: "Status", value: result.isProfit ? "Profit" : "Loss", valueColor: result.isProfit ? "text-green-400" : "text-red-400" },
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About ROI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Return on Investment (ROI) Calculator</strong> helps you measure the profitability of your investments. Whether you're investing in stocks, real estate, business, or marketing campaigns, this calculator gives you instant ROI calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    ROI is expressed as a percentage and helps you compare different investment opportunities. A positive ROI means profit, while negative ROI indicates loss. For multi-year investments, we also calculate CAGR (Compound Annual Growth Rate).
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">ROI Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Basic ROI Formula</h3>
                        <p className="text-white font-mono text-sm mb-2">ROI = (Net Profit ÷ Cost of Investment) × 100</p>
                        <p className="text-gray-500 text-xs">Example: ₹1,00,000 to ₹1,50,000 → ROI = (50,000 ÷ 1,00,000) × 100 = 50%</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Annualized ROI (CAGR)</h3>
                        <p className="text-white font-mono text-sm mb-2">CAGR = (Final ÷ Initial)^(1/years) - 1 × 100</p>
                        <p className="text-gray-500 text-xs">Example: 50% ROI over 5 years → CAGR = 8.45% annually</p>
                    </div>
                </div>
            </section>

            {/* ROI Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical ROI by Investment Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Investment Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Typical ROI</th>
                                <th className="text-left py-3 px-4 text-gray-400">Risk Level</th>
                                <th className="text-left py-3 px-4 text-gray-400">Time Horizon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ROI_EXAMPLES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.investment}</td>
                                    <td className="py-3 px-4 text-green-400">{row.typicalROI}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.risk}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.timeHorizon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Limitations Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">ROI doesn't account for time</strong> — A 50% ROI over 1 year is better than 50% over 10 years. Use CAGR for time-adjusted returns.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Consider all costs</strong> — Include transaction fees, taxes, maintenance costs, and other expenses for accurate ROI.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Higher ROI = Higher risk</strong> — Generally, investments with higher potential returns come with higher risk of loss.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Past performance ≠ future results</strong> — Historical ROI doesn't guarantee future returns. Always do thorough research.</span>
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