"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate hotel cost per night?",
        a: "Hotel cost per night = Total stay cost ÷ Number of nights. Remember to include taxes and fees which can add 10-20% to the base rate.",
    },
    {
        q: "What are common hotel fees?",
        a: "Resort fees ($20-50/night), parking ($10-40/day), city tax (5-15%), tourism fees, and service charges. Always check before booking.",
    },
    {
        q: "How to split hotel cost with friends?",
        a: "Divide total cost by number of people. If rooms are different (single vs double), split room-wise first, then per person.",
    },
    {
        q: "What is the average hotel cost per night?",
        a: "Budget: $50-100, Mid-range: $100-200, Luxury: $200-500. Prices vary by city, season, and hotel rating.",
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
    name: "Hotel Cost Calculator – Estimate Hotel Expenses",
    description: "Calculate hotel stay costs including taxes, fees, and split between travelers.",
    url: "https://www.numrexo.com/travel/hotel-cost-calculator",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Cost calculation", "Tax and fees", "Split bill", "Per person cost"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://www.numrexo.com/travel" },
        { "@type": "ListItem", position: 3, name: "Hotel Cost Calculator", item: "https://www.numrexo.com/travel/hotel-cost-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function HotelCostCalculator() {
    const [pricePerNight, setPricePerNight] = useState("");
    const [nights, setNights] = useState("");
    const [rooms, setRooms] = useState("1");
    const [people, setPeople] = useState("");
    const [taxRate, setTaxRate] = useState("15");
    const [extraFees, setExtraFees] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const perNight = parseFloat(pricePerNight);
        const numNights = parseFloat(nights);
        const numRooms = parseFloat(rooms);
        const numPeople = parseFloat(people);
        const tax = parseFloat(taxRate) / 100;
        const fees = parseFloat(extraFees) || 0;

        if (!perNight || perNight <= 0 || !numNights || numNights <= 0) {
            alert("Please enter valid price per night and number of nights");
            return;
        }

        const subtotal = perNight * numNights * numRooms;
        const taxAmount = subtotal * tax;
        const total = subtotal + taxAmount + fees;
        const perNightTotal = total / numNights;

        let perPersonCost = null;
        let perPersonPerNight = null;

        if (numPeople && numPeople > 0) {
            perPersonCost = total / numPeople;
            perPersonPerNight = perNightTotal / numPeople;
        }

        setResult({
            subtotal: subtotal.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            extraFees: fees.toFixed(2),
            total: total.toFixed(2),
            perNight: perNightTotal.toFixed(2),
            perPersonCost: perPersonCost ? perPersonCost.toFixed(2) : null,
            perPersonPerNight: perPersonPerNight ? perPersonPerNight.toFixed(2) : null,
            nights: numNights,
            rooms: numRooms,
            people: numPeople || null,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/travel" itemProp="item" className="hover:text-gray-300">Travel Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Hotel Cost Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Hotel Cost Estimator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate total hotel stay cost</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per Night ($)</label><div className="relative"><input type="number" step="10" placeholder="150" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Nights</label><input type="number" placeholder="5" value={nights} onChange={(e) => setNights(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Rooms</label><input type="number" placeholder="1" value={rooms} onChange={(e) => setRooms(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of People (for split)</label><input type="number" placeholder="2" value={people} onChange={(e) => setPeople(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tax Rate (%)</label><div className="relative"><input type="number" step="1" placeholder="15" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Extra Fees ($)</label><div className="relative"><input type="number" step="10" placeholder="0" value={extraFees} onChange={(e) => setExtraFees(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg">Calculate Hotel Cost →</button>
                    </div>
                </div>

                <ResultBox
                    title="Hotel Cost Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏨"
                    emptyText="Enter hotel details"
                    mainResult={result ? { label: "Total Cost", value: `$${parseFloat(result.total).toLocaleString()}`, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Subtotal", value: `$${result.subtotal}` },
                        { label: "Taxes", value: `$${result.taxAmount}`, valueColor: "text-yellow-400" },
                        { label: "Extra Fees", value: `$${result.extraFees}` },
                        { label: "Cost per Night", value: `$${result.perNight}` },
                        ...(result.perPersonCost ? [
                            { label: "Cost per Person (total)", value: `$${result.perPersonCost}`, valueColor: "text-green-400" },
                            { label: "Cost per Person per Night", value: `$${result.perPersonPerNight}` },
                        ] : []),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Hotel Cost Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate total hotel stay cost including taxes and fees. Split costs between travelers easily.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Average Hotel Costs by City</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">City</th><th className="text-left py-3 px-4 text-gray-400">Budget</th><th className="text-left py-3 px-4 text-gray-400">Mid-Range</th><th className="text-left py-3 px-4 text-gray-400">Luxury</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">New York</td><td className="py-2 px-4 text-yellow-400">$150-250</td><td className="py-2 px-4">$250-400</td><td className="py-2 px-4">$500+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">London</td><td className="py-2 px-4 text-yellow-400">$100-200</td><td className="py-2 px-4">$200-350</td><td className="py-2 px-4">$400+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Paris</td><td className="py-2 px-4 text-yellow-400">$100-180</td><td className="py-2 px-4">$180-300</td><td className="py-2 px-4">$400+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Tokyo</td><td className="py-2 px-4 text-yellow-400">$80-150</td><td className="py-2 px-4">$150-250</td><td className="py-2 px-4">$350+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Dubai</td><td className="py-2 px-4 text-yellow-400">$70-150</td><td className="py-2 px-4">$150-300</td><td className="py-2 px-4">$400+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Singapore</td><td className="py-2 px-4 text-yellow-400">$80-150</td><td className="py-2 px-4">$150-250</td><td className="py-2 px-4">$350+</td></tr>
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