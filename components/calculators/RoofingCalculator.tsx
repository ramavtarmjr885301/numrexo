"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate roof area?",
        a: "For flat roof: area = length × width. For sloped roof: area = (length × width) × pitch factor. Pitch factor: 4/12 = 1.05, 6/12 = 1.12, 8/12 = 1.20, 12/12 = 1.41.",
    },
    {
        q: "What is roof pitch?",
        a: "Roof pitch is the slope expressed as rise over run. Example: 6/12 means roof rises 6 inches for every 12 inches horizontally.",
    },
    {
        q: "How many roofing sheets do I need?",
        a: "Divide total roof area by sheet coverage area. Add 10-15% for overlap and waste.",
    },
    {
        q: "What is the standard roofing sheet size?",
        a: "Standard metal roofing sheets: 8-12 feet length, 3 feet width.",
    },
];

const ROOF_PITCH_FACTORS = [
    { pitch: "Flat (0/12)", factor: 1.00 },
    { pitch: "2/12 (Low)", factor: 1.01 },
    { pitch: "4/12 (Standard)", factor: 1.05 },
    { pitch: "6/12 (Medium)", factor: 1.12 },
    { pitch: "8/12 (Steep)", factor: 1.20 },
    { pitch: "10/12 (Very Steep)", factor: 1.30 },
    { pitch: "12/12 (Extreme)", factor: 1.41 },
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
    name: "Roofing Calculator – Estimate Roofing Materials",
    description: "Calculate roof area, roofing sheets, and materials needed for your roofing project.",
    url: "https://www.numrexo.com/construction/roofing-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Roof area calculation", "Pitch factor", "Sheet quantity", "Cost estimation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Roofing Calculator", item: "https://www.numrexo.com/construction/roofing-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoofingCalculator() {
    const [roofLength, setRoofLength] = useState("");
    const [roofWidth, setRoofWidth] = useState("");
    const [roofPitch, setRoofPitch] = useState("4/12");
    const [sheetLength, setSheetLength] = useState("");
    const [sheetWidth, setSheetWidth] = useState("3");
    const [wastePercent, setWastePercent] = useState("10");
    const [pricePerSheet, setPricePerSheet] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getPitchFactor = (pitch: string): number => {
        const found = ROOF_PITCH_FACTORS.find(p => p.pitch === pitch);
        return found ? found.factor : 1.05;
    };

    const calculate = () => {
        const length = parseFloat(roofLength);
        const width = parseFloat(roofWidth);

        if (!length || !width || length <= 0 || width <= 0) {
            alert("Please enter valid roof dimensions");
            return;
        }

        const pitchFactor = getPitchFactor(roofPitch);
        const flatArea = length * width;
        const slopedArea = flatArea * pitchFactor;

        const sheetLen = parseFloat(sheetLength);
        const sheetWid = parseFloat(sheetWidth);

        let sheetsNeeded = null;
        let sheetCoverage = null;

        if (!isNaN(sheetLen) && sheetLen > 0) {
            const effectiveLength = sheetLen - 0.5;
            const effectiveWidth = sheetWid - 0.167;
            sheetCoverage = effectiveLength * effectiveWidth;
            sheetsNeeded = Math.ceil(slopedArea / sheetCoverage);
            sheetsNeeded = Math.ceil(sheetsNeeded * (1 + parseFloat(wastePercent) / 100));
        }

        let totalCost = null;
        const price = parseFloat(pricePerSheet);
        if (!isNaN(price) && price > 0 && sheetsNeeded) {
            totalCost = sheetsNeeded * price;
        }

        setResult({
            flatArea: flatArea.toFixed(2),
            slopedArea: slopedArea.toFixed(2),
            pitchFactor: pitchFactor,
            pitchName: roofPitch,
            sheetsNeeded: sheetsNeeded || null,
            sheetCoverage: sheetCoverage ? sheetCoverage.toFixed(2) : null,
            wastePercent: parseFloat(wastePercent),
            totalCost: totalCost ? totalCost.toFixed(2) : null,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Roofing Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Roofing Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Estimate roofing materials for your project</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Roof Length (ft)</label><input type="number" step="0.5" placeholder="40" value={roofLength} onChange={(e) => setRoofLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Roof Width (ft)</label><input type="number" step="0.5" placeholder="20" value={roofWidth} onChange={(e) => setRoofWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Roof Pitch</label><select value={roofPitch} onChange={(e) => setRoofPitch(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ROOF_PITCH_FACTORS.map(p => <option key={p.pitch} value={p.pitch}>{p.pitch}</option>)}</select></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Sheet Length (ft)</label><input type="number" step="0.5" placeholder="10" value={sheetLength} onChange={(e) => setSheetLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Sheet Width (ft)</label><input type="number" step="0.5" placeholder="3" value={sheetWidth} onChange={(e) => setSheetWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Waste Percentage (%)</label><div className="relative"><input type="number" step="1" placeholder="10" value={wastePercent} onChange={(e) => setWastePercent(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per Sheet (₹)</label><input type="number" step="100" placeholder="500" value={pricePerSheet} onChange={(e) => setPricePerSheet(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold hover:shadow-lg">Calculate Roofing →</button>
                    </div>
                </div>

                <ResultBox
                    title="Roofing Estimate"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Enter roof dimensions"
                    mainResult={result ? { label: "Sloped Roof Area", value: `${result.slopedArea} sq ft`, color: "text-amber-400" } : undefined}
                    extraRows={result ? [
                        { label: "Flat Area", value: `${result.flatArea} sq ft` },
                        { label: "Pitch Factor", value: `${result.pitchFactor.toFixed(3)} (${result.pitchName})` },
                        ...(result.sheetsNeeded ? [
                            { label: "Sheets Required", value: `${result.sheetsNeeded} sheets`, valueColor: "text-yellow-400" },
                            { label: "Coverage per Sheet", value: `${result.sheetCoverage} sq ft` },
                            { label: "Waste Added", value: `${result.wastePercent}%` },
                            { label: "Estimated Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-green-400" },
                        ] : []),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Roofing Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate roof area including pitch factor. Estimate number of roofing sheets needed for your project.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Roof Pitch Factors</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Pitch</th><th className="text-left py-3 px-4 text-gray-400">Factor</th><th className="text-left py-3 px-4 text-gray-400">Multiply Area By</th></tr></thead>
                        <tbody>
                            {ROOF_PITCH_FACTORS.map((pitch, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-yellow-400">{pitch.pitch}</td><td className="py-2 px-4 text-gray-300">{pitch.factor.toFixed(3)}</td><td className="py-2 px-4 text-gray-400">× {pitch.factor.toFixed(3)}</td></tr>))}
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