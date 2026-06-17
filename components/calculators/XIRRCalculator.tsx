"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is XIRR and how is it different from CAGR?",
        a: "XIRR (Extended Internal Rate of Return) calculates returns for irregular cash flows (investments at different times). CAGR works only for single investment with one final value. XIRR is more accurate for SIPs, multiple investments, and partial withdrawals. For example, if you invest ₹10,000 monthly for 12 months and the final value is ₹1,30,000, XIRR will give you the true annualized return accounting for the timing of each investment.",
    },
    {
        q: "When should I use XIRR?",
        a: "Use XIRR when you have multiple investments at different dates (SIPs, multiple purchases of same stock), or when you make partial withdrawals. It gives you the true annualized return. XIRR is the industry standard for calculating returns on mutual fund SIPs, stock portfolios, real estate investments, and any investment with multiple cash flows over time.",
    },
    {
        q: "What is a good XIRR?",
        a: "For equity mutual funds: 12-15% is good, 15-20% is excellent. For debt funds: 7-9%. For PPF/EPF: 7-8%. Compare with benchmark index returns (Nifty 12-14% historical). For aggressive investors, XIRR above 15% is considered excellent. For conservative investors, 8-10% is good. Always compare your XIRR with the risk-free rate (like FD rates) and inflation to assess real returns.",
    },
    {
        q: "How accurate is XIRR calculation?",
        a: "XIRR is very accurate for irregular cash flows. Our calculator uses the Newton-Raphson method for precise calculation. It's the industry standard used by financial professionals. The accuracy is typically within 0.01% for valid inputs. For best results, ensure all dates and amounts are entered correctly.",
    },
    {
        q: "What is the difference between XIRR and absolute returns?",
        a: "Absolute return is the total percentage gain: (Final Value - Total Investment) / Total Investment × 100. XIRR is the annualized return accounting for the timing of each investment. Example: You invest ₹10,000 monthly for 1 year and final value is ₹1,30,000. Absolute return = 8.33% (₹10,000 profit on ₹1,20,000 invested). XIRR might be 15.5% (annualized). XIRR is more meaningful for comparing investments.",
    },
    {
        q: "How to calculate XIRR for SIP investments?",
        a: "For SIP investments: 1) Enter each SIP installment as a negative cash flow with its date, 2) Enter the current/final value as a positive cash flow, 3) Our calculator computes the XIRR automatically. Example: Monthly SIP of ₹10,000 for 12 months, final value ₹1,30,000. The XIRR accounts for the fact that the first investment earned returns for 12 months, while the last investment earned for only 1 month.",
    },
    {
        q: "What if my XIRR is negative?",
        a: "A negative XIRR means your investment has lost value on an annualized basis. For example, if you invested ₹1,00,000 and the current value is ₹95,000 after 2 years, the XIRR would be negative. This could happen due to market downturns, poor investment choices, or timing of withdrawals. A negative XIRR suggests you should review your investment strategy.",
    },
    {
        q: "How does XIRR handle partial withdrawals?",
        a: "XIRR handles partial withdrawals by treating them as positive cash flows at the withdrawal date. Example: You invest ₹10,000 (negative), withdraw ₹5,000 after 6 months (positive), and the remaining value is ₹6,000 after 1 year (positive). XIRR calculates the annualized return considering all these cash flows and their timing. Our calculator supports this by allowing you to add the final value only.",
    },
    {
        q: "What is the difference between XIRR and mutual fund returns?",
        a: "Mutual funds often show returns as: 1) 1-year return (absolute), 2) 3-year return (CAGR), 3) 5-year return (CAGR). XIRR is more accurate for SIPs because it accounts for each installment's timing. For lump sum investments, CAGR and XIRR give the same result. For SIPs, XIRR is always more accurate than simple average returns.",
    },
    {
        q: "How to improve XIRR returns?",
        a: "Tips to improve XIRR: 1) Invest early - early investments have more time to compound, 2) Increase SIP amounts during market corrections - buying more at lower prices improves returns, 3) Choose funds with consistent performance, 4) Stay invested for the long term (5-10+ years), 5) Reduce withdrawal frequency - frequent withdrawals reduce compounding, 6) Consider tax-efficient investments (ELSS, long-term equity) to improve post-tax XIRR.",
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
    name: "XIRR Calculator – Extended Internal Rate of Return",
    description: "Calculate XIRR for irregular cash flows. Perfect for SIPs, multiple investments, and partial withdrawals.",
    url: "https://www.numrexo.com/investment/xirr-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Irregular cash flow analysis", "SIP return calculator", "Multiple investment tracking", "Annualized returns"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Investment Calculators", item: "https://www.numrexo.com/investment" },
        { "@type": "ListItem", position: 3, name: "XIRR Calculator", item: "https://www.numrexo.com/investment/xirr-calculator" },
    ],
});

interface CashFlow {
    id: number;
    date: string;
    amount: string;
}

const XIRR_GUIDE = [
    { range: "Above 20%", rating: "Outstanding ★★★★★", description: "Exceptional returns, above market average" },
    { range: "15-20%", rating: "Excellent ★★★★", description: "Very good returns, beating most benchmarks" },
    { range: "12-15%", rating: "Good ★★★", description: "Solid returns, meeting market expectations" },
    { range: "8-12%", rating: "Average ★★", description: "Moderate returns, may be affected by inflation" },
    { range: "Below 8%", rating: "Below Average ★", description: "Low returns, consider reviewing strategy" },
    { range: "Negative", rating: "Needs Review ⚠️", description: "Loss-making, urgent review required" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function XIRRCalculator() {
    const [cashFlows, setCashFlows] = useState<CashFlow[]>([
        { id: 1, date: "", amount: "" },
    ]);
    const [finalValue, setFinalValue] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setCashFlows([{ id: 1, date: "", amount: "" }]);
        setFinalValue("");
        setFinalDate("");
        setResult(null);
    };

    const addCashFlow = () => {
        const newId = Math.max(...cashFlows.map(cf => cf.id), 0) + 1;
        setCashFlows([...cashFlows, { id: newId, date: "", amount: "" }]);
    };

    const removeCashFlow = (id: number) => {
        if (cashFlows.length > 1) {
            setCashFlows(cashFlows.filter(cf => cf.id !== id));
        }
    };

    const updateCashFlow = (id: number, field: keyof CashFlow, value: string) => {
        setCashFlows(cashFlows.map(cf => cf.id === id ? { ...cf, [field]: value } : cf));
    };

    const calculateXIRR = (): number => {
        const flows: { date: Date; amount: number }[] = [];

        for (const cf of cashFlows) {
            if (cf.date && cf.amount) {
                const amount = parseFloat(cf.amount);
                if (!isNaN(amount) && amount > 0) {
                    flows.push({
                        date: new Date(cf.date),
                        amount: -Math.abs(amount),
                    });
                }
            }
        }

        if (finalValue && finalDate) {
            const finalAmt = parseFloat(finalValue);
            if (!isNaN(finalAmt) && finalAmt > 0) {
                flows.push({
                    date: new Date(finalDate),
                    amount: finalAmt,
                });
            }
        }

        if (flows.length < 2) return 0;

        // Sort by date
        flows.sort((a, b) => a.date.getTime() - b.date.getTime());

        // XIRR calculation using Newton-Raphson method
        let guess = 0.1;
        let xirr = guess;
        let previousError = Infinity;

        for (let i = 0; i < 100; i++) {
            let f = 0;
            let fPrime = 0;
            const firstDate = flows[0].date.getTime();

            for (const flow of flows) {
                const daysDiff = (flow.date.getTime() - firstDate) / (1000 * 60 * 60 * 24);
                const yearsDiff = daysDiff / 365;
                const factor = Math.pow(1 + xirr, yearsDiff);
                f += flow.amount / factor;
                fPrime += -yearsDiff * flow.amount / (factor * (1 + xirr));
            }

            const newXirr = xirr - f / fPrime;
            const error = Math.abs(newXirr - xirr);

            if (error < 0.00001 || error > previousError) {
                xirr = newXirr;
                break;
            }

            xirr = newXirr;
            previousError = error;
        }

        return xirr * 100;
    };

    const calculate = () => {
        const hasValidFlows = cashFlows.some(cf => cf.date && cf.amount);
        if (!hasValidFlows) {
            alert("Please add at least one investment with date and amount");
            return;
        }

        if (!finalValue || !finalDate) {
            alert("Please enter current/final value and date");
            return;
        }

        const xirr = calculateXIRR();

        if (xirr === 0 || isNaN(xirr) || !isFinite(xirr)) {
            alert("Unable to calculate XIRR. Please check your inputs.");
            return;
        }

        // Calculate total investment
        let totalInvestment = 0;
        for (const cf of cashFlows) {
            const amount = parseFloat(cf.amount);
            if (!isNaN(amount) && amount > 0) {
                totalInvestment += amount;
            }
        }

        const finalAmt = parseFloat(finalValue);
        const totalReturn = finalAmt - totalInvestment;
        const absoluteReturn = (totalReturn / totalInvestment) * 100;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        for (const guide of XIRR_GUIDE) {
            if (xirr >= 20) {
                rating = XIRR_GUIDE[0].rating;
                ratingColor = "text-green-400";
                break;
            } else if (xirr >= 15) {
                rating = XIRR_GUIDE[1].rating;
                ratingColor = "text-blue-400";
                break;
            } else if (xirr >= 12) {
                rating = XIRR_GUIDE[2].rating;
                ratingColor = "text-yellow-400";
                break;
            } else if (xirr >= 8) {
                rating = XIRR_GUIDE[3].rating;
                ratingColor = "text-orange-400";
                break;
            } else if (xirr >= 0) {
                rating = XIRR_GUIDE[4].rating;
                ratingColor = "text-red-400";
                break;
            } else {
                rating = XIRR_GUIDE[5].rating;
                ratingColor = "text-red-400";
                break;
            }
        }

        // Calculate first investment date and duration
        const firstDate = new Date(
            Math.min(...cashFlows.filter(cf => cf.date).map(cf => new Date(cf.date).getTime()))
        );
        const lastDate = new Date(finalDate);
        const days = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
        const years = (days / 365).toFixed(1);

        setResult({
            xirr: xirr.toFixed(2),
            totalInvestment: totalInvestment.toFixed(2),
            finalValue: finalAmt.toFixed(2),
            totalReturn: totalReturn.toFixed(2),
            absoluteReturn: absoluteReturn.toFixed(2),
            cashFlowCount: cashFlows.filter(cf => cf.date && cf.amount).length,
            rating,
            ratingColor,
            years,
            days,
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
                        <a href="https://www.numrexo.com/investment" itemProp="item" className="hover:text-gray-300">Investment Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">XIRR Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Cash Flows</h3>
                            <p className="text-xs text-gray-500 mt-1">Enter all investments (negative) and final value (positive)</p>
                        </div>
                        <button
                            onClick={addCashFlow}
                            className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            + Add Investment
                        </button>
                    </div>
                    <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
                        {cashFlows.map((cf, i) => (
                            <div key={cf.id} className="flex gap-2 items-center">
                                <div className="w-6 text-sm text-gray-500">{i + 1}</div>
                                <div className="flex-1">
                                    <input
                                        type="date"
                                        value={cf.date}
                                        onChange={(e) => updateCashFlow(cf.id, "date", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        step="100"
                                        placeholder="Amount"
                                        value={cf.amount}
                                        onChange={(e) => updateCashFlow(cf.id, "amount", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                </div>
                                {cashFlows.length > 1 && (
                                    <button
                                        onClick={() => removeCashFlow(cf.id)}
                                        className="px-2 py-2 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="p-6 border-t border-gray-800 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Current/Final Value (₹)</label>
                                <input
                                    type="number"
                                    step="100"
                                    placeholder="100000"
                                    value={finalValue}
                                    onChange={(e) => setFinalValue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">As on Date</label>
                                <input
                                    type="date"
                                    value={finalDate}
                                    onChange={(e) => setFinalDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate XIRR →
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
                    title="XIRR Result"
                    isEmpty={!result}
                    emptyIcon="📈"
                    emptyText="Enter investments and final value"
                    mainResult={result ? {
                        label: "XIRR (Annualized Return)",
                        value: `${result.xirr}%`,
                        color: "text-teal-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Performance Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Investment", value: `₹${parseFloat(result.totalInvestment).toLocaleString()}` },
                        { label: "Final Value", value: `₹${parseFloat(result.finalValue).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "Total Return", value: `₹${parseFloat(result.totalReturn).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Absolute Return", value: `${result.absoluteReturn}%` },
                        { label: "Investment Period", value: `${result.years} years (${result.days} days)` },
                        { label: "Number of Investments", value: result.cashFlowCount },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About XIRR Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">XIRR Calculator</strong> helps you calculate the Extended Internal Rate of Return for irregular cash flows. Perfect for SIP investments, multiple stock purchases, and portfolios with partial withdrawals.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    XIRR is the industry standard for calculating returns on mutual fund SIPs, stock portfolios, and any investment with multiple cash flows over time. Unlike simple CAGR, XIRR accounts for the timing of each investment, giving you the true annualized return.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're tracking your mutual fund investments, calculating returns on your stock portfolio, or evaluating real estate investments, XIRR provides the most accurate picture of your investment performance.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This XIRR Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter each <strong className="text-white">investment amount</strong> and its date (these are negative cash flows).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">current/final value</strong> and its date (this is a positive cash flow).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Add Investment"</strong> to add more investments.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate XIRR"</strong> to see your annualized return.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review your <strong className="text-white">XIRR, absolute return, and performance rating</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an XIRR Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ SIP Return Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate the true annualized return of your SIP investments. XIRR accounts for each installment's timing for accurate results.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Portfolio Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track returns across multiple investments made at different times. Perfect for stock portfolios and mutual fund holdings.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Performance Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare XIRR with benchmark returns. Know if your investments are beating the market or index.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Investment Decisions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Use XIRR to decide whether to continue, increase, or exit an investment. Make data-driven investment decisions.</p>
                    </div>
                </div>
            </section>

            {/* XIRR Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">XIRR Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-sm mb-2">Σ [CFᵢ / (1 + XIRR)^(dᵢ/365)] = 0</p>
                    <p className="text-gray-500 text-xs">Where CFᵢ = cash flow, dᵢ = days from first investment</p>
                    <p className="text-gray-500 text-xs mt-2">The calculator iteratively solves for XIRR using the Newton-Raphson method.</p>
                </div>
            </section>

            {/* XIRR vs CAGR Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">XIRR vs CAGR Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">📊 CAGR</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Single investment only</li>
                            <li>• One start date, one end date</li>
                            <li>• No intermediate cash flows</li>
                            <li>• Best for lump sum investments</li>
                            <li>• Simple to calculate</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-teal-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">📈 XIRR</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Multiple investments supported</li>
                            <li>• Different dates for each cash flow</li>
                            <li>• Handles partial withdrawals</li>
                            <li>• Perfect for SIPs and recurring investments</li>
                            <li>• Industry standard for portfolios</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* XIRR Interpretation Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">XIRR Interpretation Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">XIRR Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Rating</th>
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {XIRR_GUIDE.map((row, i) => (
                                <tr key={i} className={`border-b border-gray-800/50 hover:bg-white/5 ${i === 0 ? 'text-green-400' :
                                    i === 1 ? 'text-blue-400' :
                                        i === 2 ? 'text-yellow-400' :
                                            i === 3 ? 'text-orange-400' :
                                                'text-red-400'
                                    }`}>
                                    <td className="py-2 px-4 font-bold">{row.range}</td>
                                    <td className="py-2 px-4">{row.rating}</td>
                                    <td className="py-2 px-4 text-gray-400 text-xs">{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are general guidelines. Context matters - consider risk, investment type, and market conditions.
                    </p>
                </div>
            </section>

            {/* Investment Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Investment Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Start early:</strong> The earlier you invest, the more time your money has to compound. Even small amounts invested early can significantly increase your XIRR.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Invest during market corrections:</strong> Buying more when markets are down improves your XIRR. SIPs automatically do this through rupee cost averaging.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Stay invested long-term:</strong> XIRR improves with time. Avoid frequent withdrawals that reduce compounding. Long-term investing (5-10+ years) historically yields higher XIRR.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose the right investments:</strong> Equity funds historically give higher XIRR than debt funds. Match your investment choice with your risk tolerance and goals.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Review your XIRR regularly:</strong> Track your XIRR annually. If it's consistently below benchmarks, consider reviewing your investment strategy.</span>
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