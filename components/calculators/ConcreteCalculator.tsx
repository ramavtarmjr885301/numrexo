// components/calculators/ConcreteCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How much concrete do I need for a slab?",
        a: "Measure length, width, and thickness in feet. Multiply them together: Length × Width × Thickness = cubic feet. Then divide by 27 to get cubic yards (since there are 27 cubic feet in a cubic yard). Always add 5-10% extra for waste, spillage, and uneven ground - concrete estimators who've been doing this for years still do this.",
    },
    {
        q: "What's the concrete mix ratio for M20 grade?",
        a: "M20 (most common for residential slabs) is 1:1.5:3 - that's 1 part cement, 1.5 parts sand, 3 parts aggregate. For 1 cubic meter of M20 concrete, you'll need roughly: 400 kg cement, 600 kg sand, 1200 kg aggregate, and 180 liters of water. Our calculator figures this out for you automatically.",
    },
    {
        q: "How many concrete bags do I need?",
        a: "One standard cement bag is 50 kg (or 1.25 cubic feet). For M20 grade, you need about 8 bags per cubic meter. For a 10'×10'×4\" slab (1.23 cubic meters), you'd need roughly 10 bags. But exact numbers depend on your mix ratio - stronger concrete needs more cement.",
    },
];

const CONCRETE_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Concrete Calculator – Estimate Concrete Volume",
    description: "Calculate concrete volume for slabs, footings, columns, and walls. Estimate cement bags, sand, and aggregate needed.",
    url: "https://www.numrexo.com/construction/concrete-calculator",
    applicationCategory: "ConstructionApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function ConcreteCalculator() {
    const [shape, setShape] = useState<"slab" | "column" | "footing">("slab");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [unit, setUnit] = useState<"feet" | "meters">("feet");
    const [mixRatio, setMixRatio] = useState("1:1.5:3");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let volume = 0;
        let lengthVal = parseFloat(length);
        let widthVal = parseFloat(width);
        let heightVal = parseFloat(height);
        let diameterVal = parseFloat(diameter);

        if (shape === "slab" && (!lengthVal || !widthVal || !heightVal)) {
            alert("Please enter length, width, and thickness");
            return;
        }
        if (shape === "column" && (!heightVal || !diameterVal)) {
            alert("Please enter height and diameter");
            return;
        }
        if (shape === "footing" && (!lengthVal || !widthVal || !heightVal)) {
            alert("Please enter length, width, and height");
            return;
        }

        if (shape === "slab") {
            volume = lengthVal * widthVal * heightVal;
        } else if (shape === "column") {
            const radius = diameterVal / 2;
            volume = Math.PI * radius * radius * heightVal;
        } else {
            volume = lengthVal * widthVal * heightVal;
        }

        // Convert to cubic meters if needed
        if (unit === "feet") {
            volume = volume / 35.315; // Convert cubic feet to cubic meters
        }

        const waste = volume * 0.1; // 10% extra
        const totalVolume = volume + waste;

        // M20 ratio (1:1.5:3) - cement : sand : aggregate
        const totalParts = 1 + 1.5 + 3;
        const cementVolume = totalVolume * (1 / totalParts);
        const sandVolume = totalVolume * (1.5 / totalParts);
        const aggregateVolume = totalVolume * (3 / totalParts);

        // Cement density: 1440 kg/m³, each bag 50kg
        const cementWeight = cementVolume * 1440;
        const cementBags = Math.ceil(cementWeight / 50);

        // Sand density: 1600 kg/m³
        const sandWeight = sandVolume * 1600;
        // Aggregate density: 1500 kg/m³
        const aggregateWeight = aggregateVolume * 1500;

        setResult({
            volume: totalVolume.toFixed(2),
            volumeCubicFeet: (totalVolume * 35.315).toFixed(2),
            cementBags,
            cementWeight: cementWeight.toFixed(0),
            sandWeight: sandWeight.toFixed(0),
            aggregateWeight: aggregateWeight.toFixed(0),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CONCRETE_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/construction" className="hover:text-gray-300">Construction Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Concrete Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Concrete Volume Calculator</h3><p className="text-xs text-gray-500 mt-1">Estimate materials for your project</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Structure Type</label><div className="grid grid-cols-3 gap-2"><button className={`py-2 rounded-lg text-sm transition-all ${shape === "slab" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("slab")}>Slab</button><button className={`py-2 rounded-lg text-sm transition-all ${shape === "column" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("column")}>Column</button><button className={`py-2 rounded-lg text-sm transition-all ${shape === "footing" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("footing")}>Footing</button></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Unit</label><div className="grid grid-cols-2 gap-2"><button className={`py-2 rounded-lg text-sm transition-all ${unit === "feet" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("feet")}>Feet</button><button className={`py-2 rounded-lg text-sm transition-all ${unit === "meters" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("meters")}>Meters</button></div></div>
                        {(shape === "slab" || shape === "footing") && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><div className="relative"><input type="number" placeholder="10" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><div className="relative"><input type="number" placeholder="10" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div></div></>)}
                        {shape === "column" && (<div><label className="block text-xs font-semibold text-gray-400 mb-2">Diameter</label><div className="relative"><input type="number" placeholder="1" step="0.1" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div></div>)}
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Height / Thickness</label><div className="relative"><input type="number" placeholder={shape === "slab" ? "0.33" : "8"} step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div><p className="text-xs text-gray-500 mt-1">{shape === "slab" ? "Typical slab: 4-6 inches (0.33-0.5 feet)" : shape === "column" ? "Typical column: 8-12 feet" : "Typical footing: 1-2 feet"}</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold hover:shadow-lg transition-all">Calculate Concrete →</button>
                    </div>
                </div>

                <ResultBox
                    title="Materials Needed (M20 Grade)"
                    isEmpty={!result}
                    emptyIcon="🧱"
                    emptyText="Enter dimensions and press Calculate"
                    mainResult={result ? { label: "Total Concrete Volume (+10% waste)", value: `${result.volume} m³ (${result.volumeCubicFeet} cu ft)`, color: "text-gray-400" } : undefined}
                    extraRows={result ? [
                        { label: "Cement Bags (50kg each)", value: `${result.cementBags} bags`, valueColor: "text-blue-400" },
                        { label: "Cement Weight", value: `${result.cementWeight} kg` },
                        { label: "Sand Required", value: `${result.sandWeight} kg`, valueColor: "text-yellow-400" },
                        { label: "Aggregate Required", value: `${result.aggregateWeight} kg` },
                    ] : undefined}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Getting Your Concrete Quantity Right</h2><p className="text-gray-400 text-sm leading-relaxed">Nothing's worse than running out of concrete halfway through a pour. Or worse - ordering too much and paying for disposal. Our calculator helps you hit that sweet spot. Remember to add 10% extra for waste, spillage, and variations in ground level. Professional contractors always do this - it's not being wasteful, it's being realistic.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Concrete Mix Ratio Guide</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-lg mb-1">🏠</div><h3 className="text-sm font-semibold text-blue-400">M20 (1:1.5:3)</h3><p className="text-xs text-gray-400">Residential slabs, beams, columns. Most common for home construction.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-lg mb-1">🏭</div><h3 className="text-sm font-semibold text-blue-400">M25 (1:1:2)</h3><p className="text-xs text-gray-400">Commercial buildings, bridges. Stronger, used for heavy loads.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-lg mb-1">🚧</div><h3 className="text-sm font-semibold text-blue-400">M15 (1:2:4)</h3><p className="text-xs text-gray-400">Footings, boundary walls, non-structural. Lower strength, cheaper.</p></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}