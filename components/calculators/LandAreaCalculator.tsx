"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate land area?",
        a: "For rectangular plots: area = length × width. For irregular shapes, divide into rectangles/triangles. Use our calculator for common plot shapes.",
    },
    {
        q: "What is an acre in square feet?",
        a: "1 acre = 43,560 square feet. 1 acre = 4,840 square yards. 1 acre = 0.4047 hectares. 1 hectare = 2.471 acres.",
    },
    {
        q: "What is a ground in land measurement?",
        a: "1 ground = 2,400 square feet (commonly used in South India). 1 ground = 240 sq yards. 1 ground = 0.055 acres.",
    },
    {
        q: "What are common land measurement units in India?",
        a: "Square feet (sq ft), Square yard (sq yd), Acre, Hectare, Ground (South India), Bigha (North India), Guntha (Maharashtra), Cent (South India - 1 cent = 435.6 sq ft).",
    },
];

const LAND_UNITS = [
    { value: "sqft", label: "Square Feet (sq ft)", toSqFt: 1 },
    { value: "sqyd", label: "Square Yard (sq yd)", toSqFt: 9 },
    { value: "acre", label: "Acre", toSqFt: 43560 },
    { value: "hectare", label: "Hectare", toSqFt: 107639 },
    { value: "ground", label: "Ground", toSqFt: 2400 },
    { value: "cent", label: "Cent", toSqFt: 435.6 },
    { value: "bigha", label: "Bigha", toSqFt: 27000 },
    { value: "guntha", label: "Guntha", toSqFt: 1089 },
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
    name: "Land Area Calculator – Convert Land Units",
    description: "Calculate land area in square feet, acres, hectares, ground, cent, bigha, and guntha.",
    url: "https://www.numrexo.com/construction/land-area-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multiple land units", "Area conversion", "Irregular shape support", "Plot measurement"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Land Area Calculator", item: "https://www.numrexo.com/construction/land-area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LandAreaCalculator() {
    const [shape, setShape] = useState<"rectangle" | "triangle" | "circle">("rectangle");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [base, setBase] = useState("");
    const [height, setHeight] = useState("");
    const [radius, setRadius] = useState("");
    const [fromUnit, setFromUnit] = useState("sqft");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let areaInSqFt = 0;
        let calculationDetail = "";

        const from = LAND_UNITS.find(u => u.value === fromUnit)!;
        const unitFactor = from.toSqFt;

        if (shape === "rectangle") {
            const l = parseFloat(length);
            const w = parseFloat(width);
            if (!l || !w || l <= 0 || w <= 0) {
                alert("Please enter valid length and width");
                return;
            }
            areaInSqFt = l * w * unitFactor;
            calculationDetail = `${l} × ${w} = ${l * w} ${fromUnit} = ${areaInSqFt.toFixed(2)} sq ft`;
        }
        else if (shape === "triangle") {
            const b = parseFloat(base);
            const h = parseFloat(height);
            if (!b || !h || b <= 0 || h <= 0) {
                alert("Please enter valid base and height");
                return;
            }
            areaInSqFt = 0.5 * b * h * unitFactor;
            calculationDetail = `½ × ${b} × ${h} = ${0.5 * b * h} ${fromUnit} = ${areaInSqFt.toFixed(2)} sq ft`;
        }
        else {
            const r = parseFloat(radius);
            if (!r || r <= 0) {
                alert("Please enter valid radius");
                return;
            }
            areaInSqFt = Math.PI * r * r * unitFactor;
            calculationDetail = `π × ${r}² = ${(Math.PI * r * r).toFixed(2)} ${fromUnit} = ${areaInSqFt.toFixed(2)} sq ft`;
        }

        // Convert to other units
        const acres = areaInSqFt / 43560;
        const hectares = areaInSqFt / 107639;
        const grounds = areaInSqFt / 2400;
        const cents = areaInSqFt / 435.6;
        const bigha = areaInSqFt / 27000;
        const guntha = areaInSqFt / 1089;
        const sqYards = areaInSqFt / 9;

        setResult({
            areaSqFt: areaInSqFt.toFixed(2),
            acres: acres.toFixed(4),
            hectares: hectares.toFixed(4),
            grounds: grounds.toFixed(2),
            cents: cents.toFixed(2),
            bigha: bigha.toFixed(4),
            guntha: guntha.toFixed(2),
            sqYards: sqYards.toFixed(2),
            calculationDetail,
            shape,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Land Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Land Area Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate area of your plot in multiple units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Plot Shape</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "rectangle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("rectangle")}>Rectangle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "triangle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("triangle")}>Triangle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "circle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("circle")}>Circle</button>
                            </div>
                        </div>

                        {shape === "rectangle" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><input type="number" step="0.01" placeholder="100" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" step="0.01" placeholder="50" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            </div>
                        )}

                        {shape === "triangle" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Base</label><input type="number" step="0.01" placeholder="100" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" step="0.01" placeholder="80" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            </div>
                        )}

                        {shape === "circle" && (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label><input type="number" step="0.01" placeholder="50" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        )}

                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Measurement Unit</label>
                            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                {LAND_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                        </div>

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold hover:shadow-lg">Calculate Area →</button>
                    </div>
                </div>

                <ResultBox
                    title="Land Area Results"
                    isEmpty={!result}
                    emptyIcon="🌾"
                    emptyText="Enter plot dimensions"
                    mainResult={result ? { label: "Area (Square Feet)", value: `${parseFloat(result.areaSqFt).toLocaleString()} sq ft`, color: "text-emerald-400" } : undefined}
                    extraRows={result ? [
                        { label: "Acres", value: result.acres, valueColor: "text-yellow-400" },
                        { label: "Hectares", value: result.hectares },
                        { label: "Grounds", value: result.grounds },
                        { label: "Cents", value: result.cents },
                        { label: "Bigha", value: result.bigha },
                        { label: "Guntha", value: result.guntha },
                        { label: "Square Yards", value: result.sqYards },
                        { label: "Calculation", value: result.calculationDetail },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Land Area Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate land area for rectangular, triangular, or circular plots. Convert between square feet, acres, hectares, ground, cent, bigha, and guntha.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Land Unit Conversions (1 Unit =)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Unit</th><th className="text-left py-3 px-4 text-gray-400">Square Feet</th><th className="text-left py-3 px-4 text-gray-400">Square Yards</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Acre</td><td className="py-2 px-4">43,560</td><td className="py-2 px-4">4,840</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Hectare</td><td className="py-2 px-4">107,639</td><td className="py-2 px-4">11,960</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Ground</td><td className="py-2 px-4">2,400</td><td className="py-2 px-4">266.67</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Cent</td><td className="py-2 px-4">435.6</td><td className="py-2 px-4">48.4</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Bigha</td><td className="py-2 px-4">27,000</td><td className="py-2 px-4">3,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Guntha</td><td className="py-2 px-4">1,089</td><td className="py-2 px-4">121</td></tr>
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