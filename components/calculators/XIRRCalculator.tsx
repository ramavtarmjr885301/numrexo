"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is XIRR and how is it different from CAGR?",
        a: "XIRR (Extended Internal Rate of Return) calculates returns for irregular cash flows (investments at different times). CAGR works only for single investment with one final value. XIRR is more accurate for SIPs, multiple investments, and partial withdrawals.",
    },
    {
        q: "When should I use XIRR?",
        a: "Use XIRR when you have multiple investments at different dates (SIPs, multiple purchases of same stock), or when you make partial withdrawals. It gives you the true annualized return.",
    },
    {
        q: "What is a good XIRR?",
        a: "For equity mutual funds: 12-15% is good, 15-20% is excellent. For debt funds: 7-9%. For PPF/EPF: 7-8%. Compare with benchmark index returns (Nifty 12-14% historical).",
    },
    {
        q: "How accurate is XIRR calculation?",
        a: "XIRR is very accurate for irregular cash flows. Our calculator uses the Newton-Raphson method for precise calculation. It's the industry standard used by financial professionals.",
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function XIRRCalculator() {
    const [cashFlows, setCashFlows] = useState<CashFlow[]>([
        { id: 1, date: "", amount: "" },
    ]);
    const [finalValue, setFinalValue] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                if (!isNaN(amount) && amount !== 0) {
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

        if (xirr === 0 || isNaN(xirr)) {
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

        setResult({
            xirr: xirr.toFixed(2),
            totalInvestment: totalInvestment.toFixed(2),
            finalValue: finalAmt.toFixed(2),
            totalReturn: totalReturn.toFixed(2),
            absoluteReturn: absoluteReturn.toFixed(2),
            cashFlowCount: cashFlows.filter(cf => cf.date && cf.amount).length,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">XIRR Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div><h3 className="font-semibold">Cash Flows</h3><p className="text-xs text-gray-500">Enter all investments (negative) and final value (positive)</p></div>
                        <button onClick={addCashFlow} className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600">+ Add Investment</button>
                    </div>
                    <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
                        {cashFlows.map((cf, i) => (
                            <div key={cf.id} className="flex gap-2 items-center">
                                <div className="w-6 text-sm text-gray-500">{i + 1}</div>
                                <div className="flex-1"><input type="date" value={cf.date} onChange={(e) => updateCashFlow(cf.id, "date", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div>
                                <div className="flex-1 relative"><input type="number" step="100" placeholder="Amount" value={cf.amount} onChange={(e) => updateCashFlow(cf.id, "amount", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div>
                                {cashFlows.length > 1 && <button onClick={() => removeCashFlow(cf.id)} className="px-2 py-2 text-red-400">✕</button>}
                            </div>
                        ))}
                    </div>
                    <div className="p-6 border-t border-gray-800 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Current/Final Value (₹)</label><input type="number" step="100" placeholder="100000" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">As on Date</label><input type="date" value={finalDate} onChange={(e) => setFinalDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Calculate XIRR →</button>
                    </div>
                </div>

                <ResultBox
                    title="XIRR Result"
                    isEmpty={!result}
                    emptyIcon="📈"
                    emptyText="Enter investments and final value"
                    mainResult={result ? { label: "XIRR (Annualized Return)", value: `${result.xirr}%`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Investment", value: `₹${parseFloat(result.totalInvestment).toLocaleString()}` },
                        { label: "Final Value", value: `₹${parseFloat(result.finalValue).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "Total Return", value: `₹${parseFloat(result.totalReturn).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Absolute Return", value: `${result.absoluteReturn}%` },
                        { label: "Number of Investments", value: result.cashFlowCount },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About XIRR Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate XIRR for irregular cash flows. Perfect for SIP investments, multiple stock purchases, and portfolios with partial withdrawals.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">XIRR Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-sm mb-2">Σ [CFᵢ / (1 + XIRR)^(dᵢ/365)] = 0</p>
                    <p className="text-gray-500 text-xs">Where CFᵢ = cash flow, dᵢ = days from first investment</p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">XIRR vs CAGR Comparison</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-blue-400 mb-2">CAGR</h3><p className="text-xs text-gray-400">• Single investment</p><p className="text-xs text-gray-400">• One start date</p><p className="text-xs text-gray-400">• One end date</p><p className="text-xs text-gray-400">• No intermediate cash flows</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-teal-400 mb-2">XIRR</h3><p className="text-xs text-gray-400">• Multiple investments</p><p className="text-xs text-gray-400">• Different dates</p><p className="text-xs text-gray-400">• Partial withdrawals</p><p className="text-xs text-gray-400">• SIPs and irregular flows</p></div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}