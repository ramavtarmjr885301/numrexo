"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is built-up area?",
        a: "Built-up area is the total covered area of a property including carpet area plus wall thickness. It includes all rooms, balcony, and terrace. It excludes common areas like lobby, stairs, and lifts.",
    },
    {
        q: "How to calculate built-up area from carpet area?",
        a: "Built-up Area = Carpet Area × 1.15 to 1.20 (for wall thickness). Example: 1000 sq ft carpet area × 1.18 = 1180 sq ft built-up area.",
    },
    {
        q: "What is the difference between built-up area and super built-up area?",
        a: "Built-up area includes carpet area + walls + balcony. Super built-up area adds common areas (lobby, stairs, lifts, garden).",
    },
    {
        q: "Why is built-up area important?",
        a: "Builders often quote prices on super built-up area. Knowing built-up area helps you calculate actual cost per usable square foot.",
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
    name: "Built-up Area Calculator – Calculate Total Covered Area",
    description: "Calculate built-up area from carpet area. Includes wall thickness and balcony.",
    url: "https://www.numrexo.com/construction/built-up-area-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Built-up area calculation", "Wall thickness factor", "Super built-up conversion", "Cost analysis"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Built-up Area Calculator", item: "https://www.numrexo.com/construction/built-up-area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BuiltUpAreaCalculator() {
    const [carpetArea, setCarpetArea] = useState("");
    const [wallFactor, setWallFactor] = useState("18");
    const [balconyArea, setBalconyArea] = useState("");
    const [pricePerSqFt, setPricePerSqFt] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const carpet = parseFloat(carpetArea);
        if (!carpet || carpet <= 0) {
            alert("Please enter a valid carpet area");
            return;
        }

        const wallPct = parseFloat(wallFactor) / 100;
        const balcony = parseFloat(balconyArea) || 0;

        const builtUpArea = carpet * (1 + wallPct) + balcony;
        const superBuiltUpArea = builtUpArea * 1.25;

        let totalCost = null;
        let costPerSqFtBuiltUp = null;
        let carpetCostPerSqFt = null;

        const price = parseFloat(pricePerSqFt);
        if (!isNaN(price) && price > 0) {
            totalCost = price * superBuiltUpArea;
            costPerSqFtBuiltUp = totalCost / builtUpArea;
            carpetCostPerSqFt = totalCost / carpet;
        }

        setResult({
            carpetArea: carpet,
            builtUpArea: builtUpArea.toFixed(2),
            superBuiltUpArea: superBuiltUpArea.toFixed(2),
            wallPercentage: parseFloat(wallFactor),
            wallArea: (builtUpArea - carpet - balcony).toFixed(2),
            balconyArea: balcony,
            totalCost: totalCost ? totalCost.toFixed(2) : null,
            costPerSqFtBuiltUp: costPerSqFtBuiltUp ? costPerSqFtBuiltUp.toFixed(2) : null,
            carpetCostPerSqFt: carpetCostPerSqFt ? carpetCostPerSqFt.toFixed(2) : null,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Built-up Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Built-up Area Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate total covered area including walls</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Carpet Area (sq ft)</label><div className="relative"><input type="number" step="0.1" placeholder="1000" value={carpetArea} onChange={(e) => setCarpetArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Wall Thickness Factor (%)</label><div className="relative"><input type="number" step="0.5" placeholder="18" value={wallFactor} onChange={(e) => setWallFactor(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Standard: 15-20%</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Balcony Area (sq ft)</label><div className="relative"><input type="number" step="0.1" placeholder="0" value={balconyArea} onChange={(e) => setBalconyArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per sq ft (Super Built-up)</label><div className="relative"><input type="number" step="0.1" placeholder="5000" value={pricePerSqFt} onChange={(e) => setPricePerSqFt(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                    </div>
                </div>

                <ResultBox
                    title="Area Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏢"
                    emptyText="Enter carpet area to calculate"
                    mainResult={result ? { label: "Built-up Area", value: `${result.builtUpArea} sq ft`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Carpet Area", value: `${result.carpetArea} sq ft` },
                        { label: "Super Built-up Area", value: `${result.superBuiltUpArea} sq ft`, valueColor: "text-yellow-400" },
                        { label: "Wall Area", value: `${result.wallArea} sq ft` },
                        { label: "Balcony Area", value: `${result.balconyArea} sq ft` },
                        ...(result.totalCost ? [
                            { label: "Total Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-blue-400" },
                            { label: "Cost/sq ft (Built-up)", value: `₹${result.costPerSqFtBuiltUp}` },
                            { label: "Cost/sq ft (Carpet)", value: `₹${result.carpetCostPerSqFt}` },
                        ] : []),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Built-up Area Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate built-up area from carpet area including wall thickness and balcony. Also estimate super built-up area and effective cost.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Area Conversion Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Area Type</th><th className="text-left py-3 px-4 text-gray-400">Conversion Factor</th><th className="text-left py-3 px-4 text-gray-400">Example (1000 sq ft carpet)</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Carpet to Built-up</td><td className="py-2 px-4">× 1.15 to 1.20</td><td className="py-2 px-4 text-yellow-400">1,150 - 1,200 sq ft</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Built-up to Super</td><td className="py-2 px-4">× 1.20 to 1.30</td><td className="py-2 px-4 text-yellow-400">1,380 - 1,560 sq ft</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Carpet to Super</td><td className="py-2 px-4">× 1.40 to 1.55</td><td className="py-2 px-4 text-yellow-400">1,400 - 1,550 sq ft</td></tr>
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