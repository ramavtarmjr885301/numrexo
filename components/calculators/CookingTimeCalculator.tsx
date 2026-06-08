"use client";

import { useState } from "react";
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
    url: "https://www.numrexo.com/cooking/cooking-time-calculator",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Temperature adjustment", "Quantity scaling", "Pan size adjustment", "Altitude adjustment"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://www.numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Cooking Time Calculator", item: "https://www.numrexo.com/cooking/cooking-time-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CookingTimeCalculator() {
    const [adjustmentType, setAdjustmentType] = useState<"temp" | "quantity" | "pan" | "altitude">("temp");
    const [originalTime, setOriginalTime] = useState("");
    const [originalTemp, setOriginalTemp] = useState("");
    const [newTemp, setNewTemp] = useState("");
    const [originalQuantity, setOriginalQuantity] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [panAdjustment, setPanAdjustment] = useState<"larger" | "smaller" | "none">("none");
    const [altitude, setAltitude] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateTempAdjustment = () => {
        const time = parseFloat(originalTime);
        const oldTemp = parseFloat(originalTemp);
        const newTempVal = parseFloat(newTemp);

        if (!time || time <= 0 || !oldTemp || oldTemp <= 0 || !newTempVal || newTempVal <= 0) {
            alert("Please enter valid time and temperatures");
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
            alert("Please enter valid time and quantities");
            return;
        }

        // For baked goods, time increases by ~15-20% for double quantity
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
            alert("Please enter valid cooking time");
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
            alert("Please enter valid cooking time and altitude");
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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/cooking" itemProp="item" className="hover:text-gray-300">Cooking Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Cooking Time Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Cooking Time Adjuster</h3>
                        <p className="text-xs text-gray-500 mt-1">Adjust cooking time for various factors</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Adjustment Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "temp" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setAdjustmentType("temp")}>Temperature</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "quantity" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setAdjustmentType("quantity")}>Quantity</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "pan" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setAdjustmentType("pan")}>Pan Size</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${adjustmentType === "altitude" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setAdjustmentType("altitude")}>Altitude</button>
                            </div>
                        </div>

                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Original Cooking Time (minutes)</label><input type="number" step="1" placeholder="30" value={originalTime} onChange={(e) => setOriginalTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>

                        {adjustmentType === "temp" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Original Temperature</label><div className="relative"><input type="number" step="5" placeholder="350" value={originalTemp} onChange={(e) => setOriginalTemp(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°F/°C</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">New Temperature</label><div className="relative"><input type="number" step="5" placeholder="400" value={newTemp} onChange={(e) => setNewTemp(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°F/°C</span></div></div>
                            </>
                        )}

                        {adjustmentType === "quantity" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Original Quantity</label><div className="relative"><input type="number" step="0.1" placeholder="1" value={originalQuantity} onChange={(e) => setOriginalQuantity(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg/lb</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">New Quantity</label><div className="relative"><input type="number" step="0.1" placeholder="2" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg/lb</span></div></div>
                            </>
                        )}

                        {adjustmentType === "pan" && (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Pan Size Change</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`py-2 rounded-lg text-sm font-medium transition-all ${panAdjustment === "larger" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setPanAdjustment("larger")}>Larger Pan</button>
                                    <button className={`py-2 rounded-lg text-sm font-medium transition-all ${panAdjustment === "smaller" ? "bg-red-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setPanAdjustment("smaller")}>Smaller Pan</button>
                                </div>
                            </div>
                        )}

                        {adjustmentType === "altitude" && (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Altitude (feet)</label><div className="relative"><input type="number" step="100" placeholder="5000" value={altitude} onChange={(e) => setAltitude(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span></div></div>
                        )}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                    </div>
                </div>

                <ResultBox
                    title="Adjusted Cooking Time"
                    isEmpty={!result}
                    emptyIcon="⏲️"
                    emptyText="Enter cooking details"
                    mainResult={result ? { label: "New Cooking Time", value: `${result.newTime} minutes`, color: "text-orange-400" } : undefined}
                    extraRows={result ? [
                        { label: "Original Time", value: `${result.originalTime} minutes` },
                        { label: "Change", value: `${result.difference > 0 ? '+' : ''}${result.difference} minutes`, valueColor: result.difference > 0 ? "text-red-400" : "text-green-400" },
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Cooking Time Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Adjust cooking times for temperature changes, quantity scaling, pan size, and altitude. Perfect for baking, roasting, and recipe adaptation.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Reference Cooking Times</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Food</th><th className="text-left py-3 px-4 text-gray-400">Weight</th><th className="text-left py-3 px-4 text-gray-400">Time</th><th className="text-left py-3 px-4 text-gray-400">Temperature</th></tr></thead>
                        <tbody>
                            {COOKING_TIPS.map((item, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-yellow-400">{item.food}</td><td className="py-2 px-4 text-gray-300">{item.weight}</td><td className="py-2 px-4 text-gray-400">{item.time}</td><td className="py-2 px-4 text-gray-400">{item.temp}</td></tr>))}
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