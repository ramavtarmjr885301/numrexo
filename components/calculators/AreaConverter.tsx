"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert square meters to square feet?",
        a: "1 square meter = 10.7639 square feet. Multiply square meters by 10.7639. Example: 100 m² × 10.7639 = 1,076.39 ft².",
    },
    {
        q: "How to convert acres to square meters?",
        a: "1 acre = 4,046.86 square meters. Multiply acres by 4,046.86. Example: 2 acres × 4,046.86 = 8,093.72 m².",
    },
    {
        q: "How many square feet in an acre?",
        a: "1 acre = 43,560 square feet. This is a standard conversion used in real estate and land measurement.",
    },
    {
        q: "What is the difference between hectare and acre?",
        a: "1 hectare = 2.471 acres = 10,000 m². Hectare is metric, acre is imperial. Used for land measurement.",
    },
];

const AREA_UNITS = [
    { value: "sq_meter", label: "Square Meter (m²)", toSqMeter: 1 },
    { value: "sq_kilometer", label: "Square Kilometer (km²)", toSqMeter: 1000000 },
    { value: "sq_mile", label: "Square Mile (mi²)", toSqMeter: 2589988.11 },
    { value: "sq_foot", label: "Square Foot (ft²)", toSqMeter: 0.092903 },
    { value: "sq_yard", label: "Square Yard (yd²)", toSqMeter: 0.836127 },
    { value: "acre", label: "Acre (ac)", toSqMeter: 4046.86 },
    { value: "hectare", label: "Hectare (ha)", toSqMeter: 10000 },
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
    name: "Area Converter – Convert Area Units",
    description: "Convert between square meters, square feet, acres, hectares, and more. Perfect for real estate and land measurement.",
    url: "https://www.numrexo.com/conversion/area-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 area units", "Real estate conversions", "Land measurement", "Instant conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Area Converter", item: "https://www.numrexo.com/conversion/area-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AreaConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("sq_meter");
    const [toUnit, setToUnit] = useState("sq_foot");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = AREA_UNITS.find(u => u.value === fromUnit)!;
        const to = AREA_UNITS.find(u => u.value === toUnit)!;
        const inSqMeter = val * from.toSqMeter;
        const converted = inSqMeter / to.toSqMeter;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(6) });
    };

    const swapUnits = () => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); if (value) setTimeout(convert, 10); };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Area Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Area Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between area measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{AREA_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{AREA_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Area" isEmpty={!result} emptyIcon="📐" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-teal-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Area Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between square meters, square feet, acres, hectares, and more. Perfect for real estate, construction, and land measurement.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Area Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">Square Meter</td><td className="py-2 px-4">Square Foot</td><td className="py-2 px-4 text-yellow-400">10.7639</td></tr>
                            <tr><td className="py-2 px-4">Acre</td><td className="py-2 px-4">Square Foot</td><td className="py-2 px-4 text-yellow-400">43,560</td></tr>
                            <tr><td className="py-2 px-4">Acre</td><td className="py-2 px-4">Square Meter</td><td className="py-2 px-4 text-yellow-400">4,046.86</td></tr>
                            <tr><td className="py-2 px-4">Hectare</td><td className="py-2 px-4">Acre</td><td className="py-2 px-4 text-yellow-400">2.471</td></tr>
                            <tr><td className="py-2 px-4">Square Mile</td><td className="py-2 px-4">Acre</td><td className="py-2 px-4 text-yellow-400">640</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}