"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How is water bill calculated?",
        a: "Water bill = (Water consumption × Rate per unit) + Fixed charges + Sewage charges + Taxes. Most utilities use tiered rates — higher consumption = higher per-unit rate.",
    },
    {
        q: "What is average water consumption per person?",
        a: "Average person uses 100-150 gallons (380-570 liters) per day. Family of 4: 12,000-18,000 gallons per month. Includes drinking, bathing, laundry, and outdoor use.",
    },
    {
        q: "How to reduce water bill?",
        a: "Fix leaks (saves 10,000+ gallons/year), install low-flow fixtures (saves 30%), shorter showers, full loads for dishwasher/washer, collect rainwater for garden.",
    },
    {
        q: "What are water bill charges?",
        a: "Typical charges: Consumption charge (per gallon/liter), Service/Delivery charge (fixed monthly), Sewer charge (often 80-100% of water usage), Taxes and fees.",
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
    name: "Water Bill Calculator – Estimate Water Bill",
    description: "Calculate monthly water bill based on consumption, tiered rates, and service charges.",
    url: "https://www.numrexo.com/finance/water-bill-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Water bill estimation", "Tiered rate calculation", "Consumption tracking", "Cost breakdown"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Water Bill Calculator", item: "https://www.numrexo.com/finance/water-bill-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function WaterBillCalculator() {
    const [unit, setUnit] = useState<"gallons" | "liters">("gallons");
    const [consumption, setConsumption] = useState("");
    const [peopleCount, setPeopleCount] = useState("");
    const [fixedCharge, setFixedCharge] = useState("15");
    const [tieredRate, setTieredRate] = useState<"single" | "tiered">("single");
    const [sewerRate, setSewerRate] = useState("80");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getRate = (usage: number): number => {
        if (!tieredRate) return 0.008;

        if (unit === "gallons") {
            if (usage <= 2000) return 0.006;
            if (usage <= 6000) return 0.008;
            if (usage <= 12000) return 0.01;
            return 0.012;
        } else {
            if (usage <= 7500) return 0.0016;
            if (usage <= 23000) return 0.0021;
            if (usage <= 45000) return 0.0026;
            return 0.0032;
        }
    };

    const calculate = () => {
        let usage = parseFloat(consumption);
        const people = parseFloat(peopleCount);

        if (!usage || usage <= 0) {
            if (people && people > 0) {
                const avgDailyUsage = unit === "gallons" ? 120 : 450;
                const avgMonthly = people * avgDailyUsage * 30;
                usage = avgMonthly;
            } else {
                alert("Please enter water consumption or number of people");
                return;
            }
        }

        const rate = getRate(usage);
        const consumptionCharge = usage * rate;
        const fixed = parseFloat(fixedCharge) || 0;
        const sewerCharge = consumptionCharge * (parseFloat(sewerRate) / 100);
        const totalBill = consumptionCharge + fixed + sewerCharge;

        const gallonsToLiters = usage * 3.78541;

        setResult({
            consumption: usage.toFixed(0),
            unit,
            consumptionCharge: consumptionCharge.toFixed(2),
            fixedCharge: fixed.toFixed(2),
            sewerCharge: sewerCharge.toFixed(2),
            totalBill: totalBill.toFixed(2),
            rate: rate.toFixed(4),
            gallonsToLiters: gallonsToLiters.toFixed(0),
            tiered: tieredRate === "tiered",
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Water Bill Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Water Bill Estimator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate your monthly water bill</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Unit</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "gallons" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("gallons")}>Gallons</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "liters" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("liters")}>Liters</button>
                            </div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Water Consumption</label><div className="relative"><input type="number" placeholder="8000" value={consumption} onChange={(e) => setConsumption(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit === "gallons" ? "gal" : "L"}</span></div><p className="text-xs text-gray-500 mt-1">Or enter number of people below to estimate</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of People (optional)</label><input type="number" placeholder="4" value={peopleCount} onChange={(e) => setPeopleCount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Rate Structure</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${tieredRate === "single" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setTieredRate("single")}>Single Rate</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${tieredRate === "tiered" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setTieredRate("tiered")}>Tiered Rate</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Fixed Service Charge ($)</label><input type="number" step="0.5" placeholder="15" value={fixedCharge} onChange={(e) => setFixedCharge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Sewer Charge (% of usage)</label><div className="relative"><input type="number" step="1" placeholder="80" value={sewerRate} onChange={(e) => setSewerRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Calculate Bill →</button>
                    </div>
                </div>

                <ResultBox
                    title="Water Bill Breakdown"
                    isEmpty={!result}
                    emptyIcon="💧"
                    emptyText="Enter water consumption"
                    mainResult={result ? { label: "Total Monthly Bill", value: `$${result.totalBill}`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Water Consumption", value: `${parseFloat(result.consumption).toLocaleString()} ${result.unit}` },
                        { label: "Consumption Charge", value: `$${result.consumptionCharge}`, valueColor: "text-yellow-400" },
                        { label: "Fixed Service Charge", value: `$${result.fixedCharge}` },
                        { label: "Sewer Charge", value: `$${result.sewerCharge}` },
                        { label: "Rate per Unit", value: `${result.rate}/unit` },
                        { label: "Rate Type", value: result.tiered ? "Tiered (higher usage = higher rate)" : "Single rate" },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Water Bill Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Estimate your monthly water bill based on consumption, tiered rates, and service charges. Understand your water bill breakdown.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Typical Water Bill by Household Size</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Household Size</th><th className="text-left py-3 px-4 text-gray-400">Avg Monthly Usage (gal)</th><th className="text-left py-3 px-4 text-gray-400">Est. Monthly Bill</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 person</td><td className="py-2 px-4">3,600 gal</td><td className="py-2 px-4 text-yellow-400">$35-50</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">2 persons</td><td className="py-2 px-4">6,000 gal</td><td className="py-2 px-4 text-yellow-400">$50-70</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">3 persons</td><td className="py-2 px-4">9,000 gal</td><td className="py-2 px-4 text-yellow-400">$70-95</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">4 persons</td><td className="py-2 px-4">12,000 gal</td><td className="py-2 px-4 text-yellow-400">$90-120</td></tr>
                            <tr><td className="py-2 px-4">5 persons</td><td className="py-2 px-4">15,000 gal</td><td className="py-2 px-4 text-yellow-400">$110-150</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Ways to Reduce Your Water Bill</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Fix leaks immediately</strong> — A dripping faucet wastes 3,000+ gallons/year.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Install low-flow fixtures</strong> — Saves up to 30% on water usage.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Run full loads</strong> — Dishwasher and washing machine use same water regardless of load size.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Take shorter showers</strong> — 5-minute shower saves 2,000+ gallons/year.</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}