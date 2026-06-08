"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate wallpaper needed for a room?",
        a: "Calculate wall area = perimeter × height. Subtract doors and windows. Divide by roll coverage (usually 30-35 sq ft per roll in India). Add 10-15% for pattern matching and waste.",
    },
    {
        q: "What is the standard wallpaper roll size?",
        a: "In India, standard wallpaper rolls are 10 meters long and 0.53 meters wide (about 33 feet × 1.7 feet = 56 sq ft). Actual coverage is less due to pattern matching.",
    },
    {
        q: "How much extra wallpaper should I buy?",
        a: "Buy 10-15% extra for waste. For patterned wallpaper, add 15-20% for pattern matching. Keep extra rolls for future repairs.",
    },
    {
        q: "What is pattern repeat in wallpaper?",
        a: "Pattern repeat is the distance between matching points in the pattern. Standard repeats: 0cm (solid), 25cm, 53cm, 64cm. Higher pattern repeat means more waste.",
    },
];

const WALLPAPER_ROLL = {
    lengthM: 10,
    widthM: 0.53,
    areaSqFt: 56.8, // 10 * 0.53 * 10.764
};

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
    name: "Wallpaper Calculator – Estimate Wallpaper Quantity",
    description: "Calculate how many wallpaper rolls you need for your room. Includes doors, windows, and pattern matching.",
    url: "https://www.numrexo.com/construction/wallpaper-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Wallpaper quantity calculator", "Pattern repeat adjustment", "Cost estimation", "Waste calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Wallpaper Calculator", item: "https://www.numrexo.com/construction/wallpaper-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function WallpaperCalculator() {
    const [roomLength, setRoomLength] = useState("");
    const [roomWidth, setRoomWidth] = useState("");
    const [roomHeight, setRoomHeight] = useState("");
    const [doorCount, setDoorCount] = useState("");
    const [windowCount, setWindowCount] = useState("");
    const [patternRepeat, setPatternRepeat] = useState("0");
    const [pricePerRoll, setPricePerRoll] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const length = parseFloat(roomLength);
        const width = parseFloat(roomWidth);
        const height = parseFloat(roomHeight);

        if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
            alert("Please enter valid room dimensions");
            return;
        }

        const doorArea = (parseFloat(doorCount) || 0) * 20; // 20 sq ft per door
        const windowArea = (parseFloat(windowCount) || 0) * 15; // 15 sq ft per window

        const wallPerimeter = 2 * (length + width);
        const wallArea = wallPerimeter * height;
        const netWallArea = wallArea - doorArea - windowArea;

        const repeat = parseFloat(patternRepeat);
        const wastePercent = repeat > 0 ? 15 + (repeat / 100) * 5 : 10;

        const rollArea = WALLPAPER_ROLL.areaSqFt;
        let rollsNeeded = netWallArea / rollArea;
        rollsNeeded = rollsNeeded * (1 + wastePercent / 100);
        const rollsRounded = Math.ceil(rollsNeeded);

        let totalCost = null;
        const price = parseFloat(pricePerRoll);
        if (!isNaN(price) && price > 0) {
            totalCost = rollsRounded * price;
        }

        setResult({
            wallArea: wallArea.toFixed(2),
            netWallArea: netWallArea.toFixed(2),
            rollsNeeded: rollsNeeded.toFixed(2),
            rollsRequired: rollsRounded,
            wastePercent: wastePercent.toFixed(1),
            totalCost: totalCost ? totalCost.toFixed(2) : null,
            patternRepeat: repeat,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Wallpaper Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Wallpaper Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Estimate wallpaper rolls needed for your room</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Room Length (ft)</label><input type="number" step="0.5" placeholder="12" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Room Width (ft)</label><input type="number" step="0.5" placeholder="10" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Room Height (ft)</label><input type="number" step="0.5" placeholder="8" value={roomHeight} onChange={(e) => setRoomHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Doors</label><input type="number" placeholder="1" value={doorCount} onChange={(e) => setDoorCount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Windows</label><input type="number" placeholder="2" value={windowCount} onChange={(e) => setWindowCount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Pattern Repeat (cm)</label><div className="relative"><input type="number" step="1" placeholder="0" value={patternRepeat} onChange={(e) => setPatternRepeat(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div><p className="text-xs text-gray-500 mt-1">0 for solid, 25-64cm for patterned</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per Roll (₹) - Optional</label><input type="number" step="100" placeholder="1500" value={pricePerRoll} onChange={(e) => setPricePerRoll(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold hover:shadow-lg">Calculate Wallpaper →</button>
                    </div>
                </div>

                <ResultBox
                    title="Wallpaper Estimate"
                    isEmpty={!result}
                    emptyIcon="🖼️"
                    emptyText="Enter room dimensions"
                    mainResult={result ? { label: "Rolls Required", value: `${result.rollsRequired} rolls`, color: "text-pink-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Wall Area", value: `${result.wallArea} sq ft` },
                        { label: "Net Wall Area (after doors/windows)", value: `${result.netWallArea} sq ft`, valueColor: "text-yellow-400" },
                        { label: "Waste & Pattern Matching", value: `${result.wastePercent}%` },
                        { label: "Exact Rolls Needed", value: `${result.rollsNeeded} rolls` },
                        ...(result.totalCost ? [{ label: "Estimated Total Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-green-400" }] : []),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Wallpaper Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Estimate how many wallpaper rolls you need for your room. Accounts for doors, windows, and pattern matching waste.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Standard Wallpaper Roll Specifications</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Parameter</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Roll Length</td><td className="py-2 px-4 text-yellow-400">10 meters (33 feet)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Roll Width</td><td className="py-2 px-4 text-yellow-400">0.53 meters (1.7 feet)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Area per Roll</td><td className="py-2 px-4 text-yellow-400">56.8 sq ft (approx)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Coverage after waste</td><td className="py-2 px-4">~45-50 sq ft per roll</td></tr>
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