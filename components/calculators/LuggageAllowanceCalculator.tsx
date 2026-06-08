"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is the standard checked baggage allowance?",
        a: "Economy class: Usually 1-2 bags up to 23kg (50lbs) each. Business/First: 2-3 bags up to 32kg (70lbs) each. Low-cost airlines may charge extra.",
    },
    {
        q: "What is the standard carry-on size?",
        a: "Most airlines: 22 x 14 x 9 inches (56 x 36 x 23 cm). Weight limit: 7-10kg (15-22lbs). Always check airline-specific rules.",
    },
    {
        q: "How much does excess baggage cost?",
        a: "Domestic: $30-100 per extra bag. International: $100-200 per extra bag. Overweight fees: $50-150 per bag. Over size fees: $100-200 per bag.",
    },
    {
        q: "What are baggage fees for budget airlines?",
        a: "Ryanair, EasyJet, Spirit, Frontier: Checked bag $25-50, Carry-on $20-40, Priority boarding adds cost. Always prepay online for better rates.",
    },
];

const AIRLINE_BAGGAGE = [
    { airline: "Emirates (Economy)", checked: "2 bags x 23kg", carryon: "1 bag x 7kg", cabin: "1 personal item" },
    { airline: "Singapore Airlines (Economy)", checked: "2 bags x 23kg", carryon: "1 bag x 7kg", cabin: "1 personal item" },
    { airline: "Qatar Airways (Economy)", checked: "2 bags x 23kg", carryon: "1 bag x 7kg", cabin: "1 personal item" },
    { airline: "American Airlines (Economy)", checked: "1 bag x 23kg", carryon: "1 bag + 1 personal", cabin: "22x14x9 in" },
    { airline: "Delta (Economy)", checked: "1 bag x 23kg", carryon: "1 bag + 1 personal", cabin: "22x14x9 in" },
    { airline: "United (Economy)", checked: "1 bag x 23kg", carryon: "1 bag + 1 personal", cabin: "22x14x9 in" },
    { airline: "Ryanair (Value)", checked: "Paid only", carryon: "1 small bag", cabin: "40x20x25 cm" },
    { airline: "EasyJet (Standard)", checked: "Paid only", carryon: "1 bag + 1 small", cabin: "56x45x25 cm" },
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
    name: "Luggage Allowance Calculator – Check Baggage Limits",
    description: "Check airline baggage allowances. Calculate excess baggage fees and weight limits.",
    url: "https://www.numrexo.com/travel/luggage-allowance-calculator",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Baggage allowance", "Excess baggage fee", "Weight limit checker", "Airline comparison"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://www.numrexo.com/travel" },
        { "@type": "ListItem", position: 3, name: "Luggage Allowance Calculator", item: "https://www.numrexo.com/travel/luggage-allowance-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LuggageAllowanceCalculator() {
    const [calcType, setCalcType] = useState<"allowance" | "excess">("allowance");
    const [airline, setAirline] = useState(AIRLINE_BAGGAGE[0].airline);
    const [bagWeight, setBagWeight] = useState("");
    const [bagCount, setBagCount] = useState("1");
    const [excessWeight, setExcessWeight] = useState("");
    const [excessBags, setExcessBags] = useState("");
    const [feePerKg, setFeePerKg] = useState("15");
    const [feePerBag, setFeePerBag] = useState("75");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getAirlineAllowance = () => {
        const selected = AIRLINE_BAGGAGE.find(a => a.airline === airline);
        return selected || AIRLINE_BAGGAGE[0];
    };

    const calculateAllowance = () => {
        const allowance = getAirlineAllowance();
        setResult({
            type: "allowance",
            airline: allowance.airline,
            checked: allowance.checked,
            carryon: allowance.carryon,
            cabin: allowance.cabin,
        });
    };

    const calculateExcess = () => {
        const weight = parseFloat(excessWeight);
        const bags = parseFloat(excessBags);
        const feeKg = parseFloat(feePerKg);
        const feeBag = parseFloat(feePerBag);

        let weightFee = 0;
        let bagFee = 0;

        if (!isNaN(weight) && weight > 0 && feeKg > 0) {
            weightFee = weight * feeKg;
        }
        if (!isNaN(bags) && bags > 0 && feeBag > 0) {
            bagFee = bags * feeBag;
        }

        const totalFee = weightFee + bagFee;

        setResult({
            type: "excess",
            weightFee: weightFee.toFixed(2),
            bagFee: bagFee.toFixed(2),
            totalFee: totalFee.toFixed(2),
            excessWeight: weight || 0,
            excessBags: bags || 0,
        });
    };

    const calculate = () => {
        if (calcType === "allowance") {
            calculateAllowance();
        } else {
            calculateExcess();
        }
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/travel" itemProp="item" className="hover:text-gray-300">Travel Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Luggage Allowance Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Baggage Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Check allowances or calculate excess fees</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "allowance" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("allowance")}>Baggage Allowance</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "excess" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("excess")}>Excess Baggage Fee</button>
                            </div>
                        </div>

                        {calcType === "allowance" ? (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Select Airline</label><select value={airline} onChange={(e) => setAirline(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{AIRLINE_BAGGAGE.map(a => <option key={a.airline} value={a.airline}>{a.airline}</option>)}</select></div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Excess Weight (kg)</label><input type="number" placeholder="5" value={excessWeight} onChange={(e) => setExcessWeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Extra Bags</label><input type="number" placeholder="1" value={excessBags} onChange={(e) => setExcessBags(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Fee per kg ($)</label><div className="relative"><input type="number" step="1" placeholder="15" value={feePerKg} onChange={(e) => setFeePerKg(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Fee per extra bag ($)</label><div className="relative"><input type="number" step="10" placeholder="75" value={feePerBag} onChange={(e) => setFeePerBag(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                                </div>
                            </>
                        )}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                    </div>
                </div>

                <ResultBox
                    title={calcType === "allowance" ? "Baggage Allowance" : "Excess Baggage Fee"}
                    isEmpty={!result}
                    emptyIcon="🧳"
                    emptyText="Enter baggage details"
                    mainResult={result ? (calcType === "allowance" ? { label: result.airline, value: "Allowance", color: "text-orange-400" } : { label: "Total Excess Fee", value: `$${result.totalFee}`, color: "text-orange-400" }) : undefined}
                    extraRows={result ? [
                        ...(calcType === "allowance" ? [
                            { label: "Checked Baggage", value: result.checked, valueColor: "text-yellow-400" },
                            { label: "Carry-on Allowance", value: result.carryon },
                            { label: "Cabin Size", value: result.cabin },
                        ] : [
                            { label: "Excess Weight", value: `${result.excessWeight} kg ($${result.weightFee})` },
                            { label: "Extra Bags", value: `${result.excessBags} bag(s) ($${result.bagFee})` },
                        ]),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Luggage Allowance Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Check baggage allowances for major airlines and calculate excess baggage fees before you fly.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Airline Baggage Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">Airline</th><th className="text-left py-3 px-4 text-gray-400">Checked</th><th className="text-left py-3 px-4 text-gray-400">Carry-on</th><th className="text-left py-3 px-4 text-gray-400">Cabin Size</th></tr></thead>
                        <tbody>
                            {AIRLINE_BAGGAGE.map((bag, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{bag.airline}</td><td className="py-2 px-4 text-yellow-400">{bag.checked}</td><td className="py-2 px-4 text-gray-400">{bag.carryon}</td><td className="py-2 px-4 text-gray-500 text-xs">{bag.cabin}</td></tr>))}
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