"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate wallpaper needed for a room?",
        a: "Calculate wall area = perimeter × height. Subtract doors and windows. Divide by roll coverage (usually 30-35 sq ft per roll in India). Add 10-15% for pattern matching and waste. For patterned wallpaper, add 15-20% waste. Always round up to the nearest whole roll. Our calculator handles all these calculations automatically.",
    },
    {
        q: "What is the standard wallpaper roll size?",
        a: "In India, standard wallpaper rolls are 10 meters long and 0.53 meters wide (about 33 feet × 1.7 feet = 56.8 sq ft). Actual coverage is less due to pattern matching (typically 45-50 sq ft usable). European rolls are often 10m × 0.53m, while American rolls are 33ft × 21ft (single roll) or double rolls. Always check your specific roll dimensions.",
    },
    {
        q: "How much extra wallpaper should I buy?",
        a: "Buy 10-15% extra for waste. For patterned wallpaper, add 15-20% for pattern matching. Keep at least 1 extra roll for future repairs (damage, stains, renovations). For large pattern repeats (64cm+), add up to 25% waste. Our calculator automatically adjusts waste based on pattern repeat.",
    },
    {
        q: "What is pattern repeat in wallpaper?",
        a: "Pattern repeat is the distance between matching points in the pattern. Standard repeats: 0cm (solid/no pattern), 25cm (small pattern), 53cm (medium), 64cm (large). Higher pattern repeat means more waste when matching patterns across strips. For random/vinyl patterns, repeat is minimal. Our calculator adjusts waste based on pattern repeat.",
    },
    {
        q: "What types of wallpaper are available?",
        a: "Wallpaper types: 1) Vinyl - durable, washable, ₹500-2000/roll, 2) Non-woven - breathable, easy to install, ₹800-3000/roll, 3) Paper - traditional, affordable, ₹400-1500/roll, 4) Fabric/textile - luxurious, ₹2000-8000/roll, 5) Metallic - reflective, ₹1500-5000/roll, 6) Grasscloth - natural, ₹3000-10000/roll, 7) Peel-and-stick - removable, ₹1000-4000/roll.",
    },
    {
        q: "How to calculate wallpaper for a room with sloped ceilings?",
        a: "For sloped ceilings: 1) Measure wall height at both ends, 2) Calculate average height, 3) Use average for wall area, 4) For dormers/alcoves, measure separately, 5) Add 20-25% extra for waste. For cathedral ceilings, consider using professional help. Our calculator works best for standard rectangular rooms with flat ceilings.",
    },
    {
        q: "What is the difference between single roll and double roll?",
        a: "Single roll: 33ft × 21in = 56.8 sq ft (US standard). Double roll: two single rolls packaged together (same total area). European rolls: 10m × 0.53m = 56.8 sq ft (similar to US single roll). Always check the actual square footage on the roll, not just the 'roll' count. Our calculator uses the standard Indian/European roll size.",
    },
    {
        q: "How to match wallpaper patterns?",
        a: "Pattern matching methods: 1) Straight match - patterns match horizontally across strips, 2) Drop match - patterns stagger vertically (common), 3) Random match - no alignment needed (vinyl, textured). Matching affects waste: straight match adds 10-15% waste, drop match adds 15-20%, random match adds 5-10%. Always order matching batch numbers for color consistency.",
    },
    {
        q: "How to calculate wallpaper for multiple rooms?",
        a: "For multiple rooms: 1) Calculate each room separately, 2) Add individual requirements, 3) Order all rolls from same batch for color consistency, 4) Add 10-15% extra total for waste, 5) Consider buying extra for future repairs. Total rolls = sum of individual room rolls + 1-2 extra rolls (for repairs). Our calculator can be used for each room individually.",
    },
    {
        q: "What are common wallpaper installation mistakes?",
        a: "Common mistakes to avoid: 1) Not ordering enough (always buy extra), 2) Not checking batch numbers (color variations between batches), 3) Not preparing walls properly (clean, smooth, primed), 4) Not using wallpaper primer/sealer, 5) Rushing the hanging process (paste needs time to activate), 6) Not matching patterns correctly, 7) Not allowing for drying time, 8) Using wrong paste for the wallpaper type.",
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
    name: "Wallpaper Calculator – Estimate Wallpaper Quantity",
    description: "Calculate how many wallpaper rolls you need for your room. Includes doors, windows, and pattern matching.",
    url: "https://numrexo.com/construction/wallpaper-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Wallpaper quantity calculator", "Pattern repeat adjustment", "Cost estimation", "Waste calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Wallpaper Calculator", item: "https://numrexo.com/construction/wallpaper-calculator" },
    ],
});

const WALLPAPER_ROLL = {
    lengthM: 10,
    widthM: 0.53,
    areaSqFt: 56.8, // 10 * 0.53 * 10.764
};

const WALLPAPER_TYPES = [
    { type: "Vinyl", price: "₹500-2000/roll", durability: "High", washable: "Yes", bestFor: "Kitchens, Bathrooms" },
    { type: "Non-woven", price: "₹800-3000/roll", durability: "Medium", washable: "Yes", bestFor: "Living Rooms, Bedrooms" },
    { type: "Paper", price: "₹400-1500/roll", durability: "Low", washable: "No", bestFor: "Bedrooms (low traffic)" },
    { type: "Fabric/Textile", price: "₹2000-8000/roll", durability: "High", washable: "No", bestFor: "Feature Walls" },
    { type: "Metallic", price: "₹1500-5000/roll", durability: "Medium", washable: "Yes", bestFor: "Accent Walls" },
    { type: "Grasscloth", price: "₹3000-10000/roll", durability: "Medium", washable: "No", bestFor: "Elegant Spaces" },
    { type: "Peel-and-stick", price: "₹1000-4000/roll", durability: "Low", washable: "Yes", bestFor: "Rentals, DIY" },
];

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

    const resetForm = () => {
        setRoomLength("");
        setRoomWidth("");
        setRoomHeight("");
        setDoorCount("");
        setWindowCount("");
        setPatternRepeat("0");
        setPricePerRoll("");
        setResult(null);
    };

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
            doorArea: doorArea,
            windowArea: windowArea,
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
                        <a href="https://numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Wallpaper Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Wallpaper Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Estimate wallpaper rolls needed for your room</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Room Length (ft)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="12"
                                    value={roomLength}
                                    onChange={(e) => setRoomLength(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Room Width (ft)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="10"
                                    value={roomWidth}
                                    onChange={(e) => setRoomWidth(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Room Height (ft)</label>
                            <input
                                type="number"
                                step="0.5"
                                placeholder="8"
                                value={roomHeight}
                                onChange={(e) => setRoomHeight(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Number of Doors</label>
                                <input
                                    type="number"
                                    placeholder="1"
                                    value={doorCount}
                                    onChange={(e) => setDoorCount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Number of Windows</label>
                                <input
                                    type="number"
                                    placeholder="2"
                                    value={windowCount}
                                    onChange={(e) => setWindowCount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Pattern Repeat (cm)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="0"
                                    value={patternRepeat}
                                    onChange={(e) => setPatternRepeat(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">0 for solid, 25-64cm for patterned</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Price per Roll (₹) - Optional</label>
                            <input
                                type="number"
                                step="100"
                                placeholder="1500"
                                value={pricePerRoll}
                                onChange={(e) => setPricePerRoll(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Wallpaper →
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
                        { label: "Pattern Repeat", value: `${result.patternRepeat} cm` },
                        ...(result.totalCost ? [{ label: "Estimated Total Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-green-400" }] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Wallpaper Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Wallpaper Calculator</strong> helps you estimate exactly how many wallpaper rolls you need for your room. It accounts for room dimensions, doors, windows, and pattern matching waste to ensure you order the right amount.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're redecorating a single room or planning a full home renovation, this calculator prevents over-ordering (saving money) or under-ordering (avoiding color batch mismatch issues).
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our calculator uses standard Indian/European roll sizes (10m × 0.53m = 56.8 sq ft) and adjusts waste based on pattern repeat. It also provides cost estimates when you enter the price per roll.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Wallpaper Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">room dimensions</strong> (length, width, height in feet).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">number of doors and windows</strong> (to subtract from wall area).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">pattern repeat</strong> in cm (0 for solid, 25-64cm for patterned).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> (Optional) Enter the <strong className="text-white">price per roll</strong> for cost estimation.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Wallpaper"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Wallpaper Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2">✓ Accurate Quantity</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how many rolls to order. Avoid over-purchasing or running out of wallpaper mid-project.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Cost Estimation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get a clear idea of your total wallpaper cost. Plan your renovation budget with confidence.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Waste Calculation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Our calculator automatically adds the right amount of waste based on pattern repeat. No more guesswork.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Batch Matching</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Order all your wallpaper at once from the same batch. Avoid color variations between different batches.</p>
                    </div>
                </div>
            </section>

            {/* Standard Roll Specifications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Standard Wallpaper Roll Specifications</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Parameter</th>
                                <th className="text-left py-3 px-4 text-gray-400">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Roll Length</td>
                                <td className="py-3 px-4 text-yellow-400">10 meters (33 feet)</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Roll Width</td>
                                <td className="py-3 px-4 text-yellow-400">0.53 meters (1.7 feet)</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Total Area per Roll</td>
                                <td className="py-3 px-4 text-yellow-400">56.8 sq ft</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Usable Area (after waste)</td>
                                <td className="py-3 px-4 text-gray-400">~45-50 sq ft</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">US Single Roll</td>
                                <td className="py-3 px-4 text-gray-400">33ft × 21in (56.8 sq ft)</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Standard Indian and European rolls. Always check the specific roll dimensions before ordering.
                    </p>
                </div>
            </section>

            {/* Wallpaper Types */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Wallpaper Types Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Price Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Durability</th>
                                <th className="text-left py-3 px-4 text-gray-400">Washable</th>
                                <th className="text-left py-3 px-4 text-gray-400">Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            {WALLPAPER_TYPES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.type}</td>
                                    <td className="py-3 px-4 text-yellow-400 text-xs">{row.price}</td>
                                    <td className={`py-3 px-4 ${row.durability === "High" ? "text-green-400" : row.durability === "Medium" ? "text-yellow-400" : "text-red-400"}`}>{row.durability}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.washable}</td>
                                    <td className="py-3 px-4 text-gray-400 text-xs">{row.bestFor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Prices are approximate and vary by brand, design, and retailer.
                    </p>
                </div>
            </section>

            {/* Pattern Repeat Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Pattern Repeat Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-green-500/20">
                            <p className="text-xs text-gray-400">Solid/No Pattern</p>
                            <p className="text-sm text-green-400 font-bold">0 cm</p>
                            <p className="text-xs text-gray-500">10% waste</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-yellow-500/20">
                            <p className="text-xs text-gray-400">Small Pattern</p>
                            <p className="text-sm text-yellow-400 font-bold">25 cm</p>
                            <p className="text-xs text-gray-500">15% waste</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-orange-500/20">
                            <p className="text-xs text-gray-400">Medium Pattern</p>
                            <p className="text-sm text-orange-400 font-bold">53 cm</p>
                            <p className="text-xs text-gray-500">18% waste</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-red-500/20">
                            <p className="text-xs text-gray-400">Large Pattern</p>
                            <p className="text-sm text-red-400 font-bold">64 cm+</p>
                            <p className="text-xs text-gray-500">20-25% waste</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3 text-center">
                        Higher pattern repeat = more waste when matching patterns across wallpaper strips.
                    </p>
                </div>
            </section>

            {/* Wallpaper Installation Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Wallpaper Installation Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-pink-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Order all rolls from the same batch:</strong> Different batches can have slight color variations. Order all your wallpaper at once to ensure color consistency.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-pink-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Prepare walls properly:</strong> Clean, smooth, and prime walls before hanging wallpaper. Use a wallpaper primer/sealer for best results.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-pink-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Buy extra for repairs:</strong> Keep at least 1 extra roll for future repairs (stains, damage, or future touch-ups).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-pink-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check pattern match type:</strong> Different patterns require different matching methods. Read the instructions carefully before starting.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-pink-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Allow for drying time:</strong> Don't rush the installation. Allow proper drying time between hanging and trimming for best results.</span>
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