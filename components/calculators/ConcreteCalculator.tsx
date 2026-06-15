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
    {
        q: "What is the difference between M15, M20, and M25 concrete?",
        a: "M15 (1:2:4) - 15 MPa strength: Used for footings, boundary walls, non-structural. M20 (1:1.5:3) - 20 MPa: Standard for residential slabs, beams, columns. M25 (1:1:2) - 25 MPa: Used for commercial buildings, bridges, high-rises. Higher grade = stronger but more expensive.",
    },
    {
        q: "How much water should I add to concrete mix?",
        a: "Water-to-cement ratio should be 0.4-0.5. For 50kg cement bag, add 20-25 liters water. Less water = stronger concrete but harder to work with. More water = weaker concrete but easier to pour. Use plasticizers for better workability without extra water.",
    },
    {
        q: "What is the concrete grade for foundations?",
        a: "For residential foundations: M20 (1:1.5:3) is standard. For 2-3 story buildings: M20-M25. For heavy commercial/industrial: M25-M30. Always consult structural engineer for your specific soil conditions and load requirements.",
    },
    {
        q: "How long does concrete take to cure?",
        a: "Initial set: 2-4 hours. Final set: 24-48 hours. Walking: 24 hours. Light traffic (cars): 7 days. Full strength (100%): 28 days. First 7 days are critical - keep concrete moist (water curing) for maximum strength. Cover with plastic or wet burlap.",
    },
    {
        q: "What is the concrete coverage per bag?",
        a: "One 50kg cement bag covers roughly: Slab (4\" thick): 4-5 sq ft. Slab (6\" thick): 2.5-3 sq ft. Footings (12\" thick): 1-1.5 sq ft. For 100 sq ft slab at 4\" thickness: need 20-25 bags of cement.",
    },
    {
        q: "How to calculate concrete for circular columns?",
        a: "Formula: Volume = π × r² × height. π = 3.14, r = radius (diameter÷2). Example: Column diameter 1.5 ft, height 10 ft → r=0.75, area=3.14×0.75²=1.77 sq ft → volume=1.77×10=17.7 cu ft = 0.5 m³.",
    },
    {
        q: "What is the concrete wastage factor?",
        a: "Standard wastage: 5-10% for slabs, 10-15% for columns, 15-20% for footings. Always add wastage factor to your calculated volume. Reasons: spillage, uneven ground, formwork leakage, over-excavation. Better to have 5-10% extra than to run out mid-pour.",
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

    const resetForm = () => {
        setShape("slab");
        setLength("");
        setWidth("");
        setHeight("");
        setDiameter("");
        setUnit("feet");
        setMixRatio("1:1.5:3");
        setResult(null);
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
                        {(shape === "slab" || shape === "footing") && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><div className="relative"><input type="number" placeholder="10" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><div className="relative"><input type="number" placeholder="10" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div></div></>)}
                        {shape === "column" && (<div><label className="block text-xs font-semibold text-gray-400 mb-2">Diameter</label><div className="relative"><input type="number" placeholder="1" step="0.1" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div></div>)}
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Height / Thickness</label><div className="relative"><input type="number" placeholder={shape === "slab" ? "0.33" : "8"} step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit}</span></div><p className="text-xs text-gray-500 mt-1">{shape === "slab" ? "Typical slab: 4-6 inches (0.33-0.5 feet)" : shape === "column" ? "Typical column: 8-12 feet" : "Typical footing: 1-2 feet"}</p></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold hover:shadow-lg transition-all">Calculate Concrete →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Concrete Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Concrete Calculator</strong> helps contractors, DIY enthusiasts, and homeowners estimate the exact amount of concrete needed for slabs, columns, and footings. Save money by ordering the right quantity - no more, no less.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Nothing's worse than running out of concrete halfway through a pour. Or worse - ordering too much and paying for disposal. Our calculator helps you hit that sweet spot. Professional contractors always add 10% extra - it's not being wasteful, it's being realistic.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Concrete Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select <strong className="text-white">structure type</strong> — Slab (floors, driveways), Column (pillars, supports), or Footing (foundations).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Choose <strong className="text-white">unit</strong> — Feet (US) or Meters (metric).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter dimensions — length, width, height/thickness. For columns, enter diameter instead of length/width.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Concrete"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Accurate Concrete Estimation Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Cost Savings</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Concrete costs ₹4,000-8,000 per cubic meter. Over-ordering by 1 m³ wastes ₹5,000+. Under-ordering causes delays and weak cold joints.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Less Waste</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Disposing extra concrete is expensive and environmentally harmful. Calculate accurately to reduce construction waste and save disposal fees.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Stronger Structure</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Proper concrete volume ensures no cold joints or weak sections. Continuous pour = stronger monolithic structure.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Time Efficiency</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">No multiple trips to purchase more concrete. No delays waiting for ready-mix trucks. Pour once, pour right.</p>
                    </div>
                </div>
            </section>

            {/* Concrete Mix Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Concrete Mix Ratio Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Grade</th><th className="text-left py-3 px-4 text-gray-400">Mix Ratio</th><th className="text-left py-3 px-4 text-gray-400">Strength (MPa)</th><th className="text-left py-3 px-4 text-gray-400">Typical Use</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">M15</td><td className="py-2 px-4 text-yellow-400">1:2:4</td><td className="py-2 px-4">15 MPa</td><td className="py-2 px-4">Footings, boundary walls</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">M20</td><td className="py-2 px-4 text-yellow-400">1:1.5:3</td><td className="py-2 px-4">20 MPa</td><td className="py-2 px-4">Residential slabs, beams, columns</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">M25</td><td className="py-2 px-4 text-yellow-400">1:1:2</td><td className="py-2 px-4">25 MPa</td><td className="py-2 px-4">Commercial buildings, bridges</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">M30</td><td className="py-2 px-4 text-yellow-400">1:0.75:1.5</td><td className="py-2 px-4">30 MPa</td><td className="py-2 px-4">High-rise buildings, heavy loads</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Volume Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Concrete Volume Formulas by Shape</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">📐 Rectangular Slab</h3>
                        <p className="text-white font-mono text-sm">L × W × H</p>
                        <p className="text-gray-500 text-xs mt-1">Example: 10ft × 10ft × 0.33ft = 33 cu ft</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">⭕ Circular Column</h3>
                        <p className="text-white font-mono text-sm">π × r² × H</p>
                        <p className="text-gray-500 text-xs mt-1">Example: 3.14 × (1.5²) × 10ft = 70.7 cu ft</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🔲 Rectangular Footing</h3>
                        <p className="text-white font-mono text-sm">L × W × H</p>
                        <p className="text-gray-500 text-xs mt-1">Example: 6ft × 6ft × 1.5ft = 54 cu ft</p>
                    </div>
                </div>
            </section>

            {/* Cost Estimation Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Concrete Cost Estimation Guide (India)</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Ready-mix concrete:</strong> M20 grade costs ₹4,500-6,500 per m³ + transportation (₹500-2,000 per trip).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Site-mix concrete (materials only):</strong> Cement ₹350-400/bag, Sand ₹800-1,200/tonne, Aggregate ₹1,000-1,500/tonne.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Labor cost:</strong> ₹500-1,000 per m³ for mixing, pouring, and finishing.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Formwork/shuttering:</strong> ₹500-800 per sq ft of contact area.</span></li>
                </ul>
            </section>

            {/* Pro Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Pro Tips for Concrete Pouring</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Always add 10% waste:</strong> Ground isn't perfectly level, forms can leak, some concrete stays in the truck. This buffer saves you from disaster.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Order ready-mix for large pours:</strong> For over 5 m³, ready-mix truck is cheaper and more consistent than mixing on-site.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Pour within 90 minutes:</strong> Concrete starts setting after 90 minutes. Plan your pour so you finish before that.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Cure for 7 days minimum:</strong> Keep concrete moist with water curing or wet burlap. This increases strength by 50% vs uncured concrete.</span></li>
                </ul>
            </section>

            {/* Getting Your Concrete Quantity Right */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Getting Your Concrete Quantity Right</h2><p className="text-gray-400 text-sm leading-relaxed">Nothing's worse than running out of concrete halfway through a pour. Or worse - ordering too much and paying for disposal. Our calculator helps you hit that sweet spot. Remember to add 10% extra for waste, spillage, and variations in ground level. Professional contractors always do this - it's not being wasteful, it's being realistic.</p></section>

            {/* Concrete Mix Ratio Guide (Visual) */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Concrete Mix Ratio Guide</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-lg mb-1">🏠</div><h3 className="text-sm font-semibold text-blue-400">M20 (1:1.5:3)</h3><p className="text-xs text-gray-400">Residential slabs, beams, columns. Most common for home construction.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-lg mb-1">🏭</div><h3 className="text-sm font-semibold text-blue-400">M25 (1:1:2)</h3><p className="text-xs text-gray-400">Commercial buildings, bridges. Stronger, used for heavy loads.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-lg mb-1">🚧</div><h3 className="text-sm font-semibold text-blue-400">M15 (1:2:4)</h3><p className="text-xs text-gray-400">Footings, boundary walls, non-structural. Lower strength, cheaper.</p></div></div></section>

            {/* FAQ Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}