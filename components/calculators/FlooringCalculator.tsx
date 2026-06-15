"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate flooring material needed?",
        a: "Calculate room area = length × width. Divide by tile/plank area. Add 10-15% wastage for cutting and breakage. Example: 200 sq ft room ÷ 2 sq ft tile = 100 tiles + 15% waste = 115 tiles.",
    },
    {
        q: "How much extra flooring should I buy?",
        a: "Buy 10-15% extra for waste. For diagonal installation, add 15-20%. For small rooms with many cuts, add 15%. For large rooms with simple layout, 10% is usually enough.",
    },
    {
        q: "What are standard tile sizes?",
        a: "Common tile sizes: 12x12 inches (1 sq ft), 18x18 inches (2.25 sq ft), 24x24 inches (4 sq ft), 12x24 inches (2 sq ft). For wood flooring: 3-5 inches wide, 3-6 feet long.",
    },
    {
        q: "How to calculate cost per square foot?",
        a: "Cost = Total cost of material ÷ total area. Add installation cost if applicable. Compare different materials to find best value.",
    },
    {
        q: "What is the difference between ceramic and vitrified tiles?",
        a: "Ceramic tiles: Lower cost (₹30-100/sq ft), lower water absorption (3-5%), suitable for walls and light traffic areas. Vitrified tiles: Higher cost (₹40-200/sq ft), very low water absorption (0.1-0.5%), suitable for high traffic areas, more durable, and stain-resistant.",
    },
    {
        q: "How to calculate flooring for irregular-shaped rooms?",
        a: "Break irregular rooms into rectangles. Example: L-shaped room = Rectangle A + Rectangle B. Calculate each rectangle separately, sum areas, then add 15% waste. For circular areas, use πr² formula.",
    },
    {
        q: "What is the best flooring for bathrooms?",
        a: "Best bathroom flooring: Ceramic tile (water-resistant, ₹30-100/sq ft), Vitrified tile (very low water absorption, ₹40-200/sq ft), Vinyl flooring (completely waterproof, ₹40-150/sq ft). Avoid wooden flooring in bathrooms (absorbs moisture, warps).",
    },
    {
        q: "How to calculate flooring for diagonal installation?",
        a: "Diagonal installation wastes 15-20% extra material (vs 10-15% for straight). Increase waste percentage to 15-20% in our calculator. Example: 200 sq ft room + 20% waste = 240 sq ft material needed.",
    },
    {
        q: "What is the labor cost for flooring installation?",
        a: "Labor costs (India): Tile installation ₹25-50/sq ft, Wooden flooring ₹30-60/sq ft, Laminate ₹15-30/sq ft, Vinyl ₹10-25/sq ft. Add 50% for small rooms. Get multiple quotes before hiring.",
    },
    {
        q: "How to calculate flooring for multiple rooms?",
        a: "Calculate each room separately, then sum material quantities. Add 10-15% waste per room (not total). Keep 5% extra for future repairs. Our calculator works for one room at a time; repeat for multiple rooms.",
    },
];

const FLOORING_TYPES = [
    { type: "Ceramic Tile", priceRange: "₹30-100/sq ft", durability: "High", waterResistant: "Yes" },
    { type: "Vitrified Tile", priceRange: "₹40-200/sq ft", durability: "Very High", waterResistant: "Yes" },
    { type: "Marble", priceRange: "₹80-500/sq ft", durability: "High", waterResistant: "Yes" },
    { type: "Granite", priceRange: "₹70-300/sq ft", durability: "Very High", waterResistant: "Yes" },
    { type: "Wooden Flooring", priceRange: "₹150-600/sq ft", durability: "Medium", waterResistant: "No" },
    { type: "Laminate", priceRange: "₹50-200/sq ft", durability: "Medium", waterResistant: "Partial" },
    { type: "Vinyl", priceRange: "₹40-150/sq ft", durability: "High", waterResistant: "Yes" },
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
    name: "Flooring Calculator – Tile and Flooring Estimator",
    description: "Calculate tiles or flooring material needed for any room. Estimate cost and waste percentage.",
    url: "https://www.numrexo.com/construction/flooring-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Tile quantity calculator", "Area calculation", "Waste percentage", "Cost estimation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Flooring Calculator", item: "https://www.numrexo.com/construction/flooring-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function FlooringCalculator() {
    const [roomLength, setRoomLength] = useState("");
    const [roomWidth, setRoomWidth] = useState("");
    const [tileLength, setTileLength] = useState("");
    const [tileWidth, setTileWidth] = useState("");
    const [wastePercent, setWastePercent] = useState("10");
    const [pricePerTile, setPricePerTile] = useState("");
    const [pricePerSqFt, setPricePerSqFt] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const length = parseFloat(roomLength);
        const width = parseFloat(roomWidth);
        const tileL = parseFloat(tileLength);
        const tileW = parseFloat(tileWidth);

        if (!length || !width || length <= 0 || width <= 0) {
            alert("Please enter valid room dimensions");
            return;
        }

        if (!tileL || !tileW || tileL <= 0 || tileW <= 0) {
            alert("Please enter valid tile dimensions");
            return;
        }

        const roomArea = length * width;
        const tileArea = (tileL * tileW) / 144; // convert sq inches to sq ft
        const waste = parseFloat(wastePercent) / 100;

        let tilesNeeded = Math.ceil(roomArea / tileArea);
        const tilesWithWaste = Math.ceil(tilesNeeded * (1 + waste));

        let totalCost = null;
        let costPerSqFt = null;

        const priceTile = parseFloat(pricePerTile);
        const priceSqFt = parseFloat(pricePerSqFt);

        if (!isNaN(priceTile) && priceTile > 0) {
            totalCost = tilesWithWaste * priceTile;
            costPerSqFt = totalCost / roomArea;
        } else if (!isNaN(priceSqFt) && priceSqFt > 0) {
            totalCost = roomArea * priceSqFt * (1 + waste);
            costPerSqFt = priceSqFt;
        }

        setResult({
            roomArea: roomArea.toFixed(2),
            tileArea: tileArea.toFixed(2),
            tilesNeeded,
            tilesWithWaste,
            wastePercent: parseFloat(wastePercent),
            totalCost: totalCost ? totalCost.toFixed(2) : null,
            costPerSqFt: costPerSqFt ? costPerSqFt.toFixed(2) : null,
            roomLength: length,
            roomWidth: width,
        });
    };

    const resetForm = () => {
        setRoomLength("");
        setRoomWidth("");
        setTileLength("");
        setTileWidth("");
        setWastePercent("10");
        setPricePerTile("");
        setPricePerSqFt("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Flooring Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Flooring Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate tiles or flooring material needed</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Room Length (ft)</label><input type="number" step="0.5" placeholder="12" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Room Width (ft)</label><input type="number" step="0.5" placeholder="10" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tile/Plank Length (inches)</label><input type="number" step="0.5" placeholder="12" value={tileLength} onChange={(e) => setTileLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tile/Plank Width (inches)</label><input type="number" step="0.5" placeholder="12" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Waste Percentage (%)</label><div className="relative"><input type="number" step="1" placeholder="10" value={wastePercent} onChange={(e) => setWastePercent(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Recommended: 10-15% for standard installation</p></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per Tile (₹)</label><input type="number" step="5" placeholder="50" value={pricePerTile} onChange={(e) => setPricePerTile(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per sq ft (₹)</label><input type="number" step="5" placeholder="25" value={pricePerSqFt} onChange={(e) => setPricePerSqFt(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Flooring →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Flooring Estimate"
                    isEmpty={!result}
                    emptyIcon="🪵"
                    emptyText="Enter room and tile dimensions"
                    mainResult={result ? { label: "Tiles Needed (including waste)", value: `${result.tilesWithWaste} tiles`, color: "text-orange-400" } : undefined}
                    extraRows={result ? [
                        { label: "Room Area", value: `${result.roomArea} sq ft` },
                        { label: "Tile Area", value: `${result.tileArea} sq ft` },
                        { label: "Tiles without waste", value: `${result.tilesNeeded} tiles` },
                        { label: `Waste (${result.wastePercent}%)`, value: `${result.tilesWithWaste - result.tilesNeeded} extra tiles`, valueColor: "text-yellow-400" },
                        ...(result.totalCost ? [{ label: "Estimated Total Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-green-400" }] : []),
                        ...(result.costPerSqFt ? [{ label: "Cost per sq ft", value: `₹${result.costPerSqFt}` }] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Flooring Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Flooring Calculator</strong> helps homeowners, contractors, and DIY enthusiasts calculate exactly how many tiles or flooring planks are needed for any room. Save money by buying the right quantity - no more, no less.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our calculator accounts for room dimensions, tile size, waste percentage (cutting and breakage), and cost estimation. Perfect for ceramic tiles, vitrified tiles, wooden flooring, laminate, vinyl, and marble.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Flooring Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">room dimensions</strong> — length and width in feet.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">tile/plank dimensions</strong> — length and width in inches.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Set <strong className="text-white">waste percentage</strong> (10% standard, 15-20% for diagonal).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> (Optional) Enter <strong className="text-white">price per tile or price per sq ft</strong> for cost estimate.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Flooring"</strong> to see tiles needed and cost.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and calculate a different room.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Flooring Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Avoid Overbuying</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Buy exactly what you need plus standard waste. No extra material sitting unused in storage. Save money on unnecessary purchases.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Prevent Shortages</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Nothing's worse than running out of tiles mid-project. Our calculator ensures you have enough with waste included.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get accurate cost estimates before starting. Compare different flooring materials and prices to fit your budget.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Material Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate quantity needed for different tile sizes. Compare total cost across multiple flooring options.</p>
                    </div>
                </div>
            </section>

            {/* Waste Percentage Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Waste Percentage Guide by Installation Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Installation Type</th><th className="text-left py-3 px-4 text-gray-400">Waste Percentage</th><th className="text-left py-3 px-4 text-gray-400">When to Use</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Standard/Straight</td><td className="py-2 px-4 text-yellow-400">10%</td><td className="py-2 px-4">Large rooms, rectangular shape, simple layout</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Small/Complex Rooms</td><td className="py-2 px-4 text-yellow-400">15%</td><td className="py-2 px-4">Small bathrooms, many corners, L-shaped rooms</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Diagonal Installation</td><td className="py-2 px-4 text-yellow-400">15-20%</td><td className="py-2 px-4">Flooring placed at 45-degree angle</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Pattern/Herringbone</td><td className="py-2 px-4 text-yellow-400">20-25%</td><td className="py-2 px-4">Complex patterns, many cuts required</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Cost Saving Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Cost Saving Tips for Flooring Installation</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Buy in bulk:</strong> Larger quantities often get wholesale discounts. Ask supplier for bulk pricing.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Compare material costs:</strong> Ceramic (₹30-100/sq ft) vs Vitrified (₹40-200/sq ft) vs Wood (₹150-600/sq ft).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">DIY installation:</strong> Save ₹25-50/sq ft by installing yourself. Watch YouTube tutorials for guidance.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Negotiate with multiple vendors:</strong> Get at least 3 quotes. Prices vary significantly between suppliers.</span></li>
                </ul>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Flooring Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate how many tiles or flooring planks you need for any room. Includes waste percentage for cutting and breakage.</p>
            </section>

            {/* Flooring Material Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Flooring Material Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Material</th><th className="text-left py-3 px-4 text-gray-400">Price Range (sq ft)</th><th className="text-left py-3 px-4 text-gray-400">Durability</th><th className="text-left py-3 px-4 text-gray-400">Water Resistant</th></tr></thead>
                        <tbody>
                            {FLOORING_TYPES.map((floor, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-yellow-400">{floor.type}</td><td className="py-2 px-4 text-gray-300">{floor.priceRange}</td><td className="py-2 px-4 text-gray-400">{floor.durability}</td><td className="py-2 px-4 text-gray-400">{floor.waterResistant}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}