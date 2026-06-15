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
    {
        q: "How to find Beta for a stock?",
        a: "You can find Beta on financial websites like Yahoo Finance, Google Finance, Moneycontrol, or your brokerage platform. Beta is calculated based on 3-5 years of historical price data comparing stock returns to market index returns.",
    },
    {
        q: "What is a good expected return using CAPM?",
        a: "A good expected return should exceed the risk-free rate by enough to justify the stock's risk. For a stock with Beta=1.2, if Rf=7% and Market Return=12%, expected return = 13%. Higher Beta stocks need higher expected returns to be attractive investments.",
    },
    {
        q: "Is CAPM still relevant today?",
        a: "CAPM remains widely used in academic finance and professional investing despite known limitations. It's simple, intuitive, and useful for comparing investments. However, many practitioners also use multi-factor models like Fama-French for more accuracy.",
    },
    {
        q: "What are the limitations of CAPM?",
        a: "CAPM limitations include: assumes single risk factor (Beta), uses historical Beta which may not predict future risk, assumes markets are efficient, ignores company-specific risks, and assumes investors can borrow at risk-free rate (unrealistic for retail investors).",
    },
    {
        q: "How to use CAPM for stock valuation?",
        a: "Use CAPM expected return as the discount rate for Dividend Discount Model (DDM) or Discounted Cash Flow (DCF). Compare intrinsic value to current price: if intrinsic value > market price, stock may be undervalued.",
    },
    {
        q: "What is Alpha in investing?",
        a: "Alpha = Actual Return - Expected Return (from CAPM). Positive Alpha means stock outperformed its risk-adjusted expected return (manager skill). Negative Alpha means underperformance. Warren Buffett's Berkshire Hathaway has historically generated positive Alpha.",
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

    const resetForm = () => {
        setRiskFreeRate("");
        setMarketReturn("");
        setBeta("");
        setResult(null);
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
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Risk-Free Rate (%)</label><div className="relative"><input type="number" step="0.1" placeholder="7" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">10-year government bond yield</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected Market Return (%)</label><div className="relative"><input type="number" step="0.1" placeholder="12" value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Nifty/Sensex expected return (10-14%)</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Stock Beta (β)</label><div className="relative"><input type="number" step="0.01" placeholder="1.2" value={beta} onChange={(e) => setBeta(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><p className="text-xs text-gray-500 mt-1">β=1 = market average, β{'>'}1 = higher risk/return</p></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Expected Return →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About CAPM Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Capital Asset Pricing Model (CAPM) Calculator</strong> helps investors calculate the expected return of a stock based on its risk level. Developed by William Sharpe in the 1960s (Nobel Prize-winning work), CAPM remains one of the most widely used models in finance for estimating required returns and valuing risky assets.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're evaluating individual stocks, building a portfolio, or analyzing investment opportunities, CAPM provides a systematic way to determine if a stock offers adequate return for its risk. The model considers three key inputs: risk-free rate, expected market return, and the stock's Beta (volatility relative to market).
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This CAPM Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the current <strong className="text-white">Risk-Free Rate</strong> — typically the 10-year government bond yield (India ~7%, US ~4%).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">Expected Market Return</strong> — historical average return of Nifty/Sensex (10-14%) or S&P 500 (8-10%).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the stock's <strong className="text-white">Beta (β)</strong> — available on Yahoo Finance, Moneycontrol, or your brokerage platform.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Expected Return"</strong> to see the CAPM result and risk analysis.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and analyze a different stock.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use CAPM for Investment Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2">✓ Risk-Adjusted Returns</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">CAPM tells you if a stock's expected return adequately compensates for its risk. Higher Beta stocks must offer higher returns to be worthwhile.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Stock Valuation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Use CAPM expected return as discount rate for DCF or Dividend Discount Model to calculate intrinsic value of stocks.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Portfolio Construction</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Build efficient portfolios by selecting stocks with favorable expected returns relative to their risk (Beta).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Performance Evaluation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate Alpha = Actual Return - Expected Return. Positive Alpha indicates manager skill or undervalued stock.</p>
                    </div>
                </div>
            </section>

            {/* Beta Interpretation Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Beta Interpretation Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Beta Range</th><th className="text-left py-3 px-4 text-gray-400">Risk Level</th><th className="text-left py-3 px-4 text-gray-400">Example Sectors</th><th className="text-left py-3 px-4 text-gray-400">Interpretation</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">&lt; 0.5</td><td className="py-2 px-4 text-green-400">Very Low</td><td className="py-2 px-4">Utilities, Consumer Staples</td><td className="py-2 px-4">Defensive, stable during downturns</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.5 - 1.0</td><td className="py-2 px-4 text-blue-400">Low</td><td className="py-2 px-4">Large-cap, Healthcare</td><td className="py-2 px-4">Less volatile than market</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1.0</td><td className="py-2 px-4 text-yellow-400">Market Average</td><td className="py-2 px-4">Index Funds, Diversified</td><td className="py-2 px-4">Moves exactly with market</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1.0 - 1.5</td><td className="py-2 px-4 text-orange-400">High</td><td className="py-2 px-4">Technology, Financials</td><td className="py-2 px-4">More volatile than market</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">&gt; 1.5</td><td className="py-2 px-4 text-red-400">Very High</td><td className="py-2 px-4">Small-cap, Crypto, Growth</td><td className="py-2 px-4">Speculative, high risk/reward</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Real-World Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World CAPM Examples</h2>
                <div className="space-y-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Example 1: Defensive Stock (Beta = 0.6)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Risk-Free Rate = 7%, Market Return = 12% → Expected Return = 7 + 0.6×(12-7) = 10%. Lower return than market (12%) but with much lower risk. Suitable for conservative investors.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Example 2: Average Stock (Beta = 1.0)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Risk-Free Rate = 7%, Market Return = 12% → Expected Return = 7 + 1.0×(12-7) = 12%. Exactly matches market return with market-average risk.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Example 3: Aggressive Growth Stock (Beta = 1.5)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Risk-Free Rate = 7%, Market Return = 12% → Expected Return = 7 + 1.5×(12-7) = 14.5%. Higher expected return (14.5%) but with significantly higher risk. Suitable for aggressive investors.</p>
                    </div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">CAPM Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-lg mb-2">E(R) = Rf + β × (Rm - Rf)</p>
                    <p className="text-gray-500 text-sm">Where: Rf = Risk-Free Rate, β = Beta, Rm = Market Return</p>
                    <p className="text-gray-500 text-xs mt-2">Example: Rf=7%, β=1.2, Rm=12% → Expected Return = 7 + 1.2×(5) = 13%</p>
                </div>
            </section>

            {/* Limitations Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Limitations of CAPM</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Assumes single risk factor:</strong> CAPM considers only market risk (Beta), ignoring company-specific risks like management quality, competition, regulatory changes.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Uses historical Beta:</strong> Past volatility may not predict future risk. Beta can change significantly over time as company fundamentals change.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Assumes efficient markets:</strong> CAPM works best in efficient markets where prices reflect all available information. Less accurate in emerging markets like India.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">⚠️</span><span><strong className="text-gray-300">Risk-free borrowing unrealistic:</strong> CAPM assumes investors can borrow at risk-free rate, which isn't true for retail investors who pay higher interest rates.</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}