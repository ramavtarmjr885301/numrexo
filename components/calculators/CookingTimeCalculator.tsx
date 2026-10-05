"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to adjust cooking time for different temperatures?",
        a: "When changing temperature, use this formula: New Time = Original Time × (Original Temp ÷ New Temp). Example: 30 min at 350°F changed to 400°F = 30 × (350 ÷ 400) = 26 minutes.",
    },
    {
        q: "How to convert cooking time for different pan sizes?",
        a: "Larger pan = thinner food = faster cooking. Smaller pan = thicker food = slower cooking. Generally, increase time by 20% for smaller pan, decrease by 15% for larger pan.",
    },
    {
        q: "What is the standard cooking time adjustment for altitude?",
        a: "Above 3,000 feet: Increase cooking time by 10%. Above 5,000 feet: Increase by 15-20%. Above 7,000 feet: Increase by 25%. Water boils at lower temperatures at higher altitudes.",
    },
    {
        q: "How to scale cooking time for different quantities?",
        a: "Double recipe doesn't mean double time. For baked goods, increase time by 15-20%. For stovetop, same time just bigger pan. For roasted meats, add 10-15 minutes per extra pound.",
    },
    {
        q: "How to convert cooking time for convection vs conventional oven?",
        a: "Convection ovens cook 20-25% faster than conventional ovens. Reduce temperature by 25°F (15°C) and reduce cooking time by 20-25%. Example: Conventional 350°F for 30 min → Convection 325°F for 24 minutes. Check doneness early.",
    },
    {
        q: "What is the resting time adjustment for meats?",
        a: "Meat continues cooking after removing from oven (carryover cooking). Add 5-10°F (3-5°C) final temperature rise during rest. Rest time: Small cuts (5 min), whole chicken (10-15 min), turkey (20-30 min), roast beef (15-20 min). Rest covered with foil.",
    },
    {
        q: "How to adjust cooking time for frozen vs fresh food?",
        a: "Frozen food takes 40-50% longer than fresh. No thawing needed but add extra time. Example: Fresh 30 min → Frozen 45 min. For casseroles: add 15-20 minutes. For vegetables: no time adjustment, just cook from frozen directly.",
    },
    {
        q: "What is the carryover cooking effect?",
        a: "Carryover cooking is when food continues cooking after removing from heat source. Internal temperature rises 5-15°F (3-8°C). Pull roasts 5-10°F below target temperature. Bread/cakes: no carryover (remove immediately). Pasta: no carryover (drain immediately).",
    },
    {
        q: "How to adjust cooking time for different oven types?",
        a: "Gas ovens: Cook evenly but may have hot spots. Electric ovens: Consistent heat but slower preheat. Convection: Fastest (20% less time). Toaster oven: Reduce time by 10-15%. Air fryer: Reduce time by 20-30% and temperature by 25°F.",
    },
    {
        q: "What is the 15-minute rule for recipe scaling?",
        a: "For doubled recipes, check doneness at original time + 15 minutes, then every 5 minutes. For halved recipes, check at 75% of original time, then every 3 minutes. Use visual cues (toothpick test, color, internal temperature) as final doneness indicators.",
    },
];

const COOKING_TIPS = [
    { food: "Whole Chicken", weight: "1.5 kg", time: "90 min", temp: "180°C" },
    { food: "Roast Beef", weight: "1 kg", time: "60 min", temp: "190°C" },
    { food: "Roast Potatoes", weight: "1 kg", time: "50 min", temp: "200°C" },
    { food: "Lasagna", weight: "2 kg", time: "45 min", temp: "180°C" },
    { food: "Bread Loaf", weight: "500g", time: "30 min", temp: "200°C" },
    { food: "Cake", weight: "2 kg", time: "35 min", temp: "180°C" },
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
    name: "Cooking Time Calculator – Adjust Cooking Times",
    description: "Adjust cooking time for temperature changes, pan size, quantity, and altitude. Perfect for baking and roasting.",
    url: "https://numrexo.com/cooking/cooking-time-calculator",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Temperature adjustment", "Quantity scaling", "Pan size adjustment", "Altitude adjustment"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Cooking Time Calculator", item: "https://numrexo.com/cooking/cooking-time-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CookingTimeCalculator() {
    const [adjustmentType, setAdjustmentType] = useState<"temp" | "quantity" | "pan" | "altitude">("temp");
    const [originalTime, setOriginalTime] = useState("30");
    const [originalTemp, setOriginalTemp] = useState("350");
    const [newTemp, setNewTemp] = useState("400");
    const [originalQuantity, setOriginalQuantity] = useState("1");
    const [newQuantity, setNewQuantity] = useState("2");
    const [panAdjustment, setPanAdjustment] = useState<"larger" | "smaller" | "none">("larger");
    const [altitude, setAltitude] = useState("5000");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateTempAdjustment = () => {
        const time = parseFloat(originalTime);
        const oldTemp = parseFloat(originalTemp);
        const newTempVal = parseFloat(newTemp);

        if (!time || time <= 0 || !oldTemp || oldTemp <= 0 || !newTempVal || newTempVal <= 0) {
            setResult(null);
            return;
        }

        const newTime = time * (oldTemp / newTempVal);
        const difference = newTime - time;
        const adjustmentPercent = ((newTime - time) / time) * 100;

        setResult({
            originalTime: time,
            newTime: newTime.toFixed(1),
            difference: difference.toFixed(1),
            adjustmentPercent: adjustmentPercent.toFixed(1),
            originalTemp: oldTemp,
            newTemp: newTempVal,
            type: "temp",
        });
    };

    const calculateQuantityAdjustment = () => {
        const time = parseFloat(originalTime);
        const oldQty = parseFloat(originalQuantity);
        const newQty = parseFloat(newQuantity);

        if (!time || time <= 0 || !oldQty || oldQty <= 0 || !newQty || newQty <= 0) {
            setResult(null);
            return;
        }

        const ratio = newQty / oldQty;
        let newTime;

        if (ratio <= 0.5) {
            newTime = time * 0.7;
        } else if (ratio <= 1) {
            newTime = time * (0.8 + ratio * 0.2);
        } else if (ratio <= 1.5) {
            newTime = time * (1 + (ratio - 1) * 0.15);
        } else {
            newTime = time * (1.075 + (ratio - 1) * 0.05);
        }

        const difference = newTime - time;
        const adjustmentPercent = ((newTime - time) / time) * 100;

        setResult({
            originalTime: time,
            newTime: newTime.toFixed(1),
            difference: difference.toFixed(1),
            adjustmentPercent: adjustmentPercent.toFixed(1),
            originalQuantity: oldQty,
            newQuantity: newQty,
            type: "quantity",
        });
    };

    const calculatePanAdjustment = () => {
        const time = parseFloat(originalTime);
        if (!time || time <= 0) {
            setResult(null);
            return;
        }

        let newTime;
        let adjustmentPercent;

        if (panAdjustment === "larger") {
            newTime = time * 0.85;
            adjustmentPercent = -15;
        } else if (panAdjustment === "smaller") {
            newTime = time * 1.2;
            adjustmentPercent = 20;
        } else {
            newTime = time;
            adjustmentPercent = 0;
        }

        setResult({
            originalTime: time,
            newTime: newTime.toFixed(1),
            difference: (newTime - time).toFixed(1),
            adjustmentPercent: adjustmentPercent.toFixed(1),
            panAdjustment: panAdjustment === "larger" ? "Larger Pan" : panAdjustment === "smaller" ? "Smaller Pan" : "No adjustment",
            type: "pan",
        });
    };

    const calculateAltitudeAdjustment = () => {
        const time = parseFloat(originalTime);
        const alt = parseFloat(altitude);

        if (!time || time <= 0 || !alt || alt <= 0) {
            setResult(null);
            return;
        }

        let newTime;
        let adjustmentPercent;

        if (alt >= 7000) {
            newTime = time * 1.25;
            adjustmentPercent = 25;
        } else if (alt >= 5000) {
            newTime = time * 1.2;
            adjustmentPercent = 20;
        } else if (alt >= 3000) {
            newTime = time * 1.1;
            adjustmentPercent = 10;
        } else {
            newTime = time;
            adjustmentPercent = 0;
        }

        setResult({
            originalTime: time,
            newTime: newTime.toFixed(1),
            difference: (newTime - time).toFixed(1),
            adjustmentPercent: adjustmentPercent.toFixed(1),
            altitude: alt,
            type: "altitude",
        });
    };

    const calculate = () => {
        if (adjustmentType === "temp") calculateTempAdjustment();
        else if (adjustmentType === "quantity") calculateQuantityAdjustment();
        else if (adjustmentType === "pan") calculatePanAdjustment();
        else calculateAltitudeAdjustment();
    };

    const resetForm = () => {
        setAdjustmentType("temp");
        setOriginalTime("30");
        setOriginalTemp("350");
        setNewTemp("400");
        setOriginalQuantity("1");
        setNewQuantity("2");
        setPanAdjustment("larger");
        setAltitude("5000");
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [adjustmentType, originalTime, originalTemp, newTemp, originalQuantity, newQuantity, panAdjustment, altitude]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Home</span></a><meta itemProp="position" content="1" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/cooking" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Cooking Calculators</span></a><meta itemProp="position" content="2" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-ink-soft">Cooking Time Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Cooking Time Adjuster</h3>
                        <p className="text-xs text-ink-faint mt-1">Adjust cooking time for various factors</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Adjustment Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "temp" ? "bg-blue-600 text-white" : "bg-surface border border-hairline"}`} onClick={() => setAdjustmentType("temp")}>Temperature</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "quantity" ? "bg-blue-600 text-white" : "bg-surface border border-hairline"}`} onClick={() => setAdjustmentType("quantity")}>Quantity</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "pan" ? "bg-blue-600 text-white" : "bg-surface border border-hairline"}`} onClick={() => setAdjustmentType("pan")}>Pan Size</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "altitude" ? "bg-blue-600 text-white" : "bg-surface border border-hairline"}`} onClick={() => setAdjustmentType("altitude")}>Altitude</button>
                            </div>
                        </div>

                        <div><label className="block text-xs font-semibold text-ink-faint mb-2">Original Cooking Time (minutes)</label><input type="number" step="1" placeholder="30" value={originalTime} onChange={(e) => setOriginalTime(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>

                        {adjustmentType === "temp" && (
                            <>
                                <div><label className="block text-xs font-semibold text-ink-faint mb-2">Original Temperature</label><div className="relative"><input type="number" step="5" placeholder="350" value={originalTemp} onChange={(e) => setOriginalTemp(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">°F/°C</span></div></div>
                                <div><label className="block text-xs font-semibold text-ink-faint mb-2">New Temperature</label><div className="relative"><input type="number" step="5" placeholder="400" value={newTemp} onChange={(e) => setNewTemp(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">°F/°C</span></div></div>
                            </>
                        )}

                        {adjustmentType === "quantity" && (
                            <>
                                <div><label className="block text-xs font-semibold text-ink-faint mb-2">Original Quantity</label><div className="relative"><input type="number" step="0.1" placeholder="1" value={originalQuantity} onChange={(e) => setOriginalQuantity(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">kg/lb</span></div></div>
                                <div><label className="block text-xs font-semibold text-ink-faint mb-2">New Quantity</label><div className="relative"><input type="number" step="0.1" placeholder="2" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">kg/lb</span></div></div>
                            </>
                        )}

                        {adjustmentType === "pan" && (
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Pan Size Change</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`py-2 rounded-lg text-sm font-medium transition-all ${panAdjustment === "larger" ? "bg-green-500 text-white" : "bg-surface border border-hairline"}`} onClick={() => setPanAdjustment("larger")}>Larger Pan</button>
                                    <button className={`py-2 rounded-lg text-sm font-medium transition-all ${panAdjustment === "smaller" ? "bg-red-500 text-white" : "bg-surface border border-hairline"}`} onClick={() => setPanAdjustment("smaller")}>Smaller Pan</button>
                                </div>
                            </div>
                        )}

                        {adjustmentType === "altitude" && (
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Altitude (feet)</label><div className="relative"><input type="number" step="100" placeholder="5000" value={altitude} onChange={(e) => setAltitude(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">ft</span></div></div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Adjusted Cooking Time"
                    isEmpty={!result}
                    emptyIcon="⏲️"
                    emptyText="Enter cooking details"
                    mainResult={result ? { label: "New Cooking Time", value: `${result.newTime} minutes`, color: "text-orange-600" } : undefined}
                    extraRows={result ? [
                        { label: "Original Time", value: `${result.originalTime} minutes` },
                        { label: "Change", value: `${result.difference > 0 ? '+' : ''}${result.difference} minutes`, valueColor: result.difference > 0 ? "text-red-600" : "text-green-600" },
                        { label: "Adjustment", value: `${result.adjustmentPercent}%` },
                        ...(result.type === "temp" ? [
                            { label: "Temperature Change", value: `${result.originalTemp}° → ${result.newTemp}°` },
                        ] : []),
                        ...(result.type === "quantity" ? [
                            { label: "Quantity Change", value: `${result.originalQuantity} → ${result.newQuantity}` },
                        ] : []),
                        ...(result.type === "pan" ? [
                            { label: "Pan Adjustment", value: result.panAdjustment },
                        ] : []),
                        ...(result.type === "altitude" ? [
                            { label: "Altitude", value: `${result.altitude} feet` },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Cooking Time Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Cooking Time Calculator</strong> helps home cooks and professional chefs adjust cooking times for temperature changes, quantity scaling, pan size variations, and altitude differences. Perfect for baking, roasting, and recipe adaptation.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Never ruin another dish because you guessed the time wrong. Whether you're scaling a cake recipe, using a different pan, cooking at high altitude, or adjusting oven temperature — our calculator takes the guesswork out of cooking times.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Cooking Time Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Select <strong className="text-ink">adjustment type</strong> — Temperature, Quantity, Pan Size, or Altitude.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Enter the <strong className="text-ink">original cooking time</strong> from your recipe.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Enter the <strong className="text-ink">original and new values</strong> (temperature, quantity, or altitude).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> Click <strong className="text-ink">"Calculate"</strong> to see your adjusted cooking time.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> Use the <strong className="text-ink">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Accurate Cooking Time Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-600 mb-2">✓ Perfect Doneness</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Avoid undercooked (unsafe) or overcooked (dry) food. Get the perfect texture and doneness every time.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Reduce Food Waste</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">No more ruined dinners. Save money by cooking food correctly the first time, not throwing away mistakes.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Save Time</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Know exactly when your food will be ready. No more guessing and checking every few minutes.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Scale Recipes Confidently</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Double or halve recipes without ruining them. Adjust cooking times accurately for different quantities.</p>
                    </div>
                </div>
            </section>

            {/* Temperature Conversion Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Temperature Conversion & Adjustment Guide</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Original Temp</th><th className="text-left py-3 px-4 text-ink-faint">New Temp</th><th className="text-left py-3 px-4 text-ink-faint">Time Adjustment</th><th className="text-left py-3 px-4 text-ink-faint">Example (30 min recipe)</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">350°F</td><td className="py-2 px-4">375°F</td><td className="py-2 px-4 text-green-600">-7%</td><td className="py-2 px-4">28 minutes</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">350°F</td><td className="py-2 px-4">400°F</td><td className="py-2 px-4 text-green-600">-13%</td><td className="py-2 px-4">26 minutes</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">350°F</td><td className="py-2 px-4">325°F</td><td className="py-2 px-4 text-red-600">+8%</td><td className="py-2 px-4">32 minutes</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">350°F</td><td className="py-2 px-4">300°F</td><td className="py-2 px-4 text-red-600">+17%</td><td className="py-2 px-4">35 minutes</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">350°F</td><td className="py-2 px-4">425°F</td><td className="py-2 px-4 text-green-600">-18%</td><td className="py-2 px-4">25 minutes</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Cooking Time Adjustment Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Cooking Time Adjustment Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">Temperature Adjustment</h3>
                        <p className="text-ink font-mono text-sm">New Time = Original Time × (Original Temp ÷ New Temp)</p>
                        <p className="text-ink-faint text-xs mt-1">Example: 30 min × (350 ÷ 400) = 26.25 min</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">Quantity Adjustment</h3>
                        <p className="text-ink font-mono text-sm">New Time = Original Time × (1 + (New Qty - Original Qty) × 0.1)</p>
                        <p className="text-ink-faint text-xs mt-1">Example: 30 min × (1 + 0.5×0.1) = 31.5 min for 1.5× quantity</p>
                    </div>
                </div>
            </section>

            {/* Pro Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Pro Tips for Perfect Cooking Results</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-orange-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Use an oven thermometer:</strong> Most ovens are off by 25-50°F. Trust the thermometer, not the dial.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-orange-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Rotate pans halfway:</strong> Ovens have hot spots. Rotating ensures even cooking and browning.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-orange-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Preheat fully (15-20 min):</strong> Don't rush preheating. A fully heated oven cooks more consistently.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-orange-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Check doneness with thermometer:</strong> Time is a guideline, internal temperature is truth. For meats: chicken 165°F, beef 135-145°F (medium-rare to medium).</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-orange-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Rest before serving:</strong> Meats need 5-15 minutes rest. This redistributes juices. Cakes need 10 minutes in pan before removing.</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-ink mb-3">About Cooking Time Calculator</h2><p className="text-ink-faint text-sm leading-relaxed">Adjust cooking times for temperature changes, quantity scaling, pan size, and altitude. Perfect for baking, roasting, and recipe adaptation.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-ink mb-4">Reference Cooking Times</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Food</th><th className="text-left py-3 px-4 text-ink-faint">Weight</th><th className="text-left py-3 px-4 text-ink-faint">Time</th><th className="text-left py-3 px-4 text-ink-faint">Temperature</th></tr></thead>
                        <tbody>
                            {COOKING_TIPS.map((item, i) => (<tr key={i} className="border-b border-hairline hover:bg-cream"><td className="py-2 px-4 text-yellow-700">{item.food}</td><td className="py-2 px-4 text-ink-soft">{item.weight}</td><td className="py-2 px-4 text-ink-faint">{item.time}</td><td className="py-2 px-4 text-ink-faint">{item.temp}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-ink">{item.q}</span><span className={`text-ink-faint text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}