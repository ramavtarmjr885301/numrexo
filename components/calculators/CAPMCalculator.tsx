"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is CAPM and how is it used?",
        a: "CAPM (Capital Asset Pricing Model) calculates the expected return of an investment based on its risk. Formula: Expected Return = Risk-Free Rate + Beta × (Market Return - Risk-Free Rate). Used to value stocks and evaluate if an investment offers adequate return for its risk.",
    },
    {
        q: "What is Beta in CAPM?",
        a: "Beta measures a stock's volatility compared to the market. Beta = 1 means stock moves with market. Beta > 1 means more volatile (higher risk, higher return). Beta < 1 means less volatile (lower risk, lower return).",
    },
    {
        q: "What is a good Beta value?",
        a: "Beta 0.5-1: Low volatility (utilities, consumer staples). Beta 1-1.5: Average volatility (most stocks). Beta 1.5-2: High volatility (tech, growth stocks). Beta 2+: Very high risk (crypto, small caps).",
    },
    {
        q: "What is the risk-free rate?",
        a: "Risk-free rate is the return on a risk-free investment, typically 10-year government bond yield. In India, it's around 7-7.5%. In US, it's around 4-5%. Used as baseline for expected returns.",
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
    name: "CAPM Calculator – Capital Asset Pricing Model",
    description: "Calculate expected return of a stock using CAPM formula. Evaluate if an investment offers adequate return for its risk.",
    url: "https://www.numrexo.com/investment/capm-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Expected return calculation", "Beta analysis", "Risk assessment", "Stock valuation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Investment Calculators", item: "https://www.numrexo.com/investment" },
        { "@type": "ListItem", position: 3, name: "CAPM Calculator", item: "https://www.numrexo.com/investment/capm-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CAPMCalculator() {
    const [riskFreeRate, setRiskFreeRate] = useState("");
    const [marketReturn, setMarketReturn] = useState("");
    const [beta, setBeta] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const rf = parseFloat(riskFreeRate);
        const mr = parseFloat(marketReturn);
        const b = parseFloat(beta);

        if (isNaN(rf) || isNaN(mr) || isNaN(b)) {
            alert("Please enter valid values for all fields");
            return;
        }

        const expectedReturn = rf + b * (mr - rf);
        const riskPremium = mr - rf;
        const stockRiskPremium = b * riskPremium;

        let riskLevel = "";
        if (b < 0.5) riskLevel = "Very Low Risk (Defensive)";
        else if (b < 1) riskLevel = "Low Risk";
        else if (b === 1) riskLevel = "Market Average Risk";
        else if (b < 1.5) riskLevel = "High Risk (Aggressive)";
        else riskLevel = "Very High Risk (Speculative)";

        setResult({
            expectedReturn: expectedReturn.toFixed(2),
            riskFreeRate: rf,
            marketReturn: mr,
            beta: b,
            riskPremium: riskPremium.toFixed(2),
            stockRiskPremium: stockRiskPremium.toFixed(2),
            riskLevel,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/investment" itemProp="item" className="hover:text-gray-300">Investment Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">CAPM Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">CAPM Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Expected Return = Rf + β × (Rm - Rf)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Risk-Free Rate (%)</label><div className="relative"><input type="number" step="0.1" placeholder="7" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">10-year government bond yield</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected Market Return (%)</label><div className="relative"><input type="number" step="0.1" placeholder="12" value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Nifty/Sensex expected return (10-14%)</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Stock Beta (β)</label><div className="relative"><input type="number" step="0.01" placeholder="1.2" value={beta} onChange={(e) => setBeta(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><p className="text-xs text-gray-500 mt-1">β=1 = market average, β{'>'}1 = higher risk/return</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg">Calculate Expected Return →</button>
                    </div>
                </div>

                <ResultBox
                    title="CAPM Result"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter values to calculate"
                    mainResult={result ? { label: "Expected Return", value: `${result.expectedReturn}%`, color: "text-indigo-400" } : undefined}
                    extraRows={result ? [
                        { label: "Risk-Free Rate", value: `${result.riskFreeRate}%` },
                        { label: "Market Return", value: `${result.marketReturn}%` },
                        { label: "Beta", value: result.beta, valueColor: "text-yellow-400" },
                        { label: "Market Risk Premium", value: `${result.riskPremium}%` },
                        { label: "Stock Risk Premium", value: `${result.stockRiskPremium}%` },
                        { label: "Risk Level", value: result.riskLevel },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About CAPM Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the expected return of a stock using the Capital Asset Pricing Model (CAPM). Helps determine if a stock offers adequate return for its risk level.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">CAPM Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-lg mb-2">E(R) = Rf + β × (Rm - Rf)</p>
                    <p className="text-gray-500 text-sm">Where: Rf = Risk-Free Rate, β = Beta, Rm = Market Return</p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}