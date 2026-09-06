"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How is water bill calculated?",
        a: "Water bill = (Water consumption × Rate per unit) + Fixed charges + Sewage charges + Taxes. Most utilities use tiered rates — higher consumption = higher per-unit rate. Fixed charges cover infrastructure maintenance, meter reading, and administrative costs. Sewer charges are typically 80-100% of your water usage charge. Our calculator includes all these components for accurate estimation.",
    },
    {
        q: "What is average water consumption per person?",
        a: "Average person uses 100-150 gallons (380-570 liters) per day. Family of 4: 12,000-18,000 gallons per month. Breakdown: Bathing (20-30 gallons/day), Toilet flushing (20-30 gallons/day), Laundry (15-25 gallons/day), Dishwashing (5-10 gallons/day), Cooking/drinking (5-10 gallons/day), Outdoor use (20-50 gallons/day in summer). Usage varies by region, season, and household habits.",
    },
    {
        q: "How to reduce water bill?",
        a: "Fix leaks (saves 10,000+ gallons/year), install low-flow fixtures (saves 30%), shorter showers (5 minutes instead of 10 saves 2,000+ gallons/year), full loads for dishwasher/washer, collect rainwater for garden, use broom instead of hose for cleaning, water plants early morning/late evening to reduce evaporation, install smart irrigation controllers, and consider greywater recycling systems.",
    },
    {
        q: "What are water bill charges?",
        a: "Typical charges: Consumption charge (per gallon/liter based on usage), Service/Delivery charge (fixed monthly fee for infrastructure), Sewer charge (often 80-100% of water usage charge), Taxes and regulatory fees (varies by location), Stormwater fees (in some areas), and Meter service fees. Our calculator includes consumption, fixed, and sewer charges for accurate estimation.",
    },
    {
        q: "What are tiered water rates?",
        a: "Tiered rates charge higher rates for higher consumption to encourage conservation. Example tiers: Tier 1: 0-2,000 gallons @ $0.006/gal, Tier 2: 2,001-6,000 gallons @ $0.008/gal, Tier 3: 6,001-12,000 gallons @ $0.010/gal, Tier 4: 12,000+ gallons @ $0.012/gal. This structure rewards low usage and penalizes excessive consumption. Our calculator includes both single and tiered rate options.",
    },
    {
        q: "How much water does a family of 4 use?",
        a: "Family of 4 uses approximately 12,000-18,000 gallons per month (15,000 average). Breakdown per month: Toilets (3,000-4,000 gal), Showers (3,000-4,000 gal), Laundry (2,000-3,000 gal), Dishwashing (1,000-1,500 gal), Cooking/Drinking (500-1,000 gal), Outdoor/Other (2,000-4,000 gal). Using water-efficient fixtures can reduce usage by 30-40%.",
    },
    {
        q: "What is the difference between water consumption and water usage?",
        a: "Water consumption refers to water that is used and not returned to the source (e.g., drinking, cooking, irrigation). Water usage is the total water drawn from the supply (including water that returns through sewer systems). Most water bills charge based on total usage, with sewer charges based on a percentage of usage. Our calculator estimates both usage and consumption-based charges.",
    },
    {
        q: "How do water utilities determine rates?",
        a: "Water utilities determine rates based on: 1) Cost of water supply (treatment, pumping), 2) Infrastructure maintenance (pipelines, reservoirs), 3) Administration and billing costs, 4) Regulatory compliance, 5) Conservation incentives. Rates are often approved by public utility commissions or city councils. Many utilities use tiered rates to encourage conservation. Rates vary significantly between urban and rural areas.",
    },
    {
        q: "What is a typical water bill in the US?",
        a: "Average US water bill is $70-100/month. Breakdown by state: California ($80-120/month), Texas ($60-100/month), Florida ($50-80/month), New York ($70-100/month), Illinois ($60-90/month). Urban areas typically have higher rates than rural areas. Bills include water, sewer, and sometimes stormwater charges. Our calculator helps you estimate your specific bill based on your usage and rate structure.",
    },
    {
        q: "How to read your water bill?",
        a: "Water bill components: 1) Account information (name, address, account number), 2) Billing period (dates covered), 3) Meter readings (current and previous), 4) Usage (total gallons used), 5) Charges breakdown (consumption, fixed, sewer, taxes), 6) Payment due date, 7) Usage history (compare with previous months), 8) Conservation tips. Understanding your bill helps you identify usage patterns and find ways to save.",
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
    url: "https://numrexo.com/finance/water-bill-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Water bill estimation", "Tiered rate calculation", "Consumption tracking", "Cost breakdown"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Water Bill Calculator", item: "https://numrexo.com/finance/water-bill-calculator" },
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

    const resetForm = () => {
        setUnit("gallons");
        setConsumption("");
        setPeopleCount("");
        setFixedCharge("15");
        setTieredRate("single");
        setSewerRate("80");
        setResult(null);
    };

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

    const getTierDetails = (usage: number): string[] => {
        if (!tieredRate) return ["Single rate applied to all usage"];

        const details: string[] = [];
        if (unit === "gallons") {
            if (usage > 0) details.push(`Tier 1 (0-2,000 gal): ${Math.min(usage, 2000)} gal @ $0.006/gal`);
            if (usage > 2000) details.push(`Tier 2 (2,001-6,000 gal): ${Math.min(usage - 2000, 4000)} gal @ $0.008/gal`);
            if (usage > 6000) details.push(`Tier 3 (6,001-12,000 gal): ${Math.min(usage - 6000, 6000)} gal @ $0.010/gal`);
            if (usage > 12000) details.push(`Tier 4 (12,000+ gal): ${usage - 12000} gal @ $0.012/gal`);
        } else {
            if (usage > 0) details.push(`Tier 1 (0-7,500 L): ${Math.min(usage, 7500)} L @ $0.0016/L`);
            if (usage > 7500) details.push(`Tier 2 (7,501-23,000 L): ${Math.min(usage - 7500, 15500)} L @ $0.0021/L`);
            if (usage > 23000) details.push(`Tier 3 (23,001-45,000 L): ${Math.min(usage - 23000, 22000)} L @ $0.0026/L`);
            if (usage > 45000) details.push(`Tier 4 (45,000+ L): ${usage - 45000} L @ $0.0032/L`);
        }
        return details;
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
        const tierDetails = getTierDetails(usage);

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
            tierDetails,
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
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/finance" itemProp="item" className="hover:text-gray-300">Finance Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Water Bill Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Water Bill Estimator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate your monthly water bill</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Unit</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "gallons" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setUnit("gallons")}
                                >
                                    Gallons
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "liters" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setUnit("liters")}
                                >
                                    Liters
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Water Consumption</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="8000"
                                    value={consumption}
                                    onChange={(e) => setConsumption(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit === "gallons" ? "gal" : "L"}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Or enter number of people below to estimate</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Number of People (optional)</label>
                            <input
                                type="number"
                                placeholder="4"
                                value={peopleCount}
                                onChange={(e) => setPeopleCount(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Rate Structure</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${tieredRate === "single" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setTieredRate("single")}
                                >
                                    Single Rate
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${tieredRate === "tiered" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setTieredRate("tiered")}
                                >
                                    Tiered Rate
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Fixed Service Charge ($)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="15"
                                    value={fixedCharge}
                                    onChange={(e) => setFixedCharge(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Sewer Charge (% of usage)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="1"
                                        placeholder="80"
                                        value={sewerRate}
                                        onChange={(e) => setSewerRate(e.target.value)}
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
                                Calculate Bill →
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
                        { label: "Usage Equivalent", value: `${result.gallonsToLiters} L` },
                        ...(result.tiered && result.tierDetails.length > 0 ? result.tierDetails.map((detail: string, i: number) => ({
                            label: `Tier ${i + 1}`,
                            value: detail,
                            valueColor: "text-gray-400"
                        })) : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Water Bill Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Water Bill Calculator</strong> helps you estimate your monthly water bill based on consumption, rate structure, and service charges. It includes both single and tiered rate options, fixed service charges, and sewer fees.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Understanding your water bill can help you identify areas to save money and conserve water. Many utilities use tiered rates to encourage conservation — higher usage means higher rates. Our calculator helps you understand how your usage affects your bill.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're a homeowner trying to budget, or someone looking to reduce their water consumption, this calculator provides valuable insights into your water costs.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Water Bill Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select your <strong className="text-white">unit</strong> (Gallons or Liters).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">monthly water consumption</strong> or number of people.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Choose <strong className="text-white">rate structure</strong> (Single or Tiered).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter <strong className="text-white">fixed service charge</strong> and <strong className="text-white">sewer charge percentage</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Bill"</strong> to see your estimated bill.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Water Bill Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your monthly water costs in advance. Plan your household budget with accurate water bill estimates.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Rate Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare single vs tiered rate structures. See how different rate systems affect your total bill.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Conservation Insights</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand how your consumption habits affect your bill. Identify opportunities to save water and money.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Expense Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track your water expenses over time. Monitor changes in consumption and identify potential leaks.</p>
                    </div>
                </div>
            </section>

            {/* Household Usage Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical Water Bill by Household Size</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Household Size</th>
                                <th className="text-left py-3 px-4 text-gray-400">Avg Monthly Usage</th>
                                <th className="text-left py-3 px-4 text-gray-400">Est. Monthly Bill</th>
                                <th className="text-left py-3 px-4 text-gray-400">Water Saved (with efficient fixtures)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">1 person</td>
                                <td className="py-3 px-4 text-gray-400">3,600 gal</td>
                                <td className="py-3 px-4 text-yellow-400">$35-50</td>
                                <td className="py-3 px-4 text-green-400">Save 1,000+ gal</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">2 persons</td>
                                <td className="py-3 px-4 text-gray-400">6,000 gal</td>
                                <td className="py-3 px-4 text-yellow-400">$50-70</td>
                                <td className="py-3 px-4 text-green-400">Save 2,000+ gal</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">3 persons</td>
                                <td className="py-3 px-4 text-gray-400">9,000 gal</td>
                                <td className="py-3 px-4 text-yellow-400">$70-95</td>
                                <td className="py-3 px-4 text-green-400">Save 3,000+ gal</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">4 persons</td>
                                <td className="py-3 px-4 text-gray-400">12,000 gal</td>
                                <td className="py-3 px-4 text-yellow-400">$90-120</td>
                                <td className="py-3 px-4 text-green-400">Save 4,000+ gal</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">5 persons</td>
                                <td className="py-3 px-4 text-gray-400">15,000 gal</td>
                                <td className="py-3 px-4 text-yellow-400">$110-150</td>
                                <td className="py-3 px-4 text-green-400">Save 5,000+ gal</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Estimates based on national averages. Actual bills vary by location, rate structure, and usage habits.
                    </p>
                </div>
            </section>

            {/* Tiered Rate Structure */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tiered Rate Structure (Gallons)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Tier</th>
                                <th className="text-left py-3 px-4 text-gray-400">Usage Range (gal)</th>
                                <th className="text-left py-3 px-4 text-gray-400">Rate per Gallon</th>
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Tier 1</td>
                                <td className="py-3 px-4 text-gray-400">0 - 2,000</td>
                                <td className="py-3 px-4 text-green-400">$0.006</td>
                                <td className="py-3 px-4 text-gray-400">Efficient usage</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Tier 2</td>
                                <td className="py-3 px-4 text-gray-400">2,001 - 6,000</td>
                                <td className="py-3 px-4 text-yellow-400">$0.008</td>
                                <td className="py-3 px-4 text-gray-400">Average usage</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Tier 3</td>
                                <td className="py-3 px-4 text-gray-400">6,001 - 12,000</td>
                                <td className="py-3 px-4 text-orange-400">$0.010</td>
                                <td className="py-3 px-4 text-gray-400">High usage</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Tier 4</td>
                                <td className="py-3 px-4 text-gray-400">12,000+</td>
                                <td className="py-3 px-4 text-red-400">$0.012</td>
                                <td className="py-3 px-4 text-gray-400">Excessive usage</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Tiered rates encourage conservation by charging more for higher consumption. Our calculator automatically applies tiered rates.
                    </p>
                </div>
            </section>

            {/* Water Saving Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Water Saving Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-lg">💧</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-200">Fix Leaks Immediately</h4>
                                <p className="text-xs text-gray-400">A dripping faucet wastes 3,000+ gallons/year. A running toilet wastes 6,000+ gallons/year.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-lg">🚿</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-200">Install Low-Flow Fixtures</h4>
                                <p className="text-xs text-gray-400">Low-flow showerheads save 2,700+ gallons/year. Aerators on faucets save 1,000+ gallons/year.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-lg">🧺</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-200">Run Full Loads</h4>
                                <p className="text-xs text-gray-400">Dishwasher and washing machine use same water regardless of load size. Wait until full to save water.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-lg">⏱️</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-200">Take Shorter Showers</h4>
                                <p className="text-xs text-gray-400">5-minute shower saves 2,000+ gallons/year. Install a shower timer to track your usage.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-lg">🌧️</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-200">Collect Rainwater</h4>
                                <p className="text-xs text-gray-400">Use rain barrels for garden watering. A 1,000 sq ft roof collects 600+ gallons per inch of rain.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-lg">🧹</span>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-200">Use Broom Instead of Hose</h4>
                                <p className="text-xs text-gray-400">Sweeping driveways saves 10+ gallons per minute compared to hosing. Simple change, big impact.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Water Bill Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Water Bill Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check for leaks regularly:</strong> Read your meter before and after a 2-hour period with no water use. If it changed, you have a leak.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Install smart irrigation controllers:</strong> These adjust watering based on weather, saving 8,000+ gallons/year.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Water plants early morning:</strong> Less evaporation means less water needed. Save 2,000+ gallons/year.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider a water audit:</strong> Many utilities offer free water audits to identify savings opportunities.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Set conservation goals:</strong> Track your usage monthly and set reduction goals. Even 10% savings adds up over time.</span>
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