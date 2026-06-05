"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert inches to centimeters?",
        a: "1 inch = 2.54 centimeters. Multiply inches by 2.54. Example: 10 inches × 2.54 = 25.4 cm.",
    },
    {
        q: "How to convert feet to meters?",
        a: "1 foot = 0.3048 meters. Multiply feet by 0.3048. Example: 10 feet × 0.3048 = 3.048 meters.",
    },
    {
        q: "How to convert miles to kilometers?",
        a: "1 mile = 1.60934 kilometers. Multiply miles by 1.60934. Example: 10 miles × 1.60934 = 16.0934 km.",
    },
    {
        q: "What is the metric system?",
        a: "The metric system uses meters, grams, liters. It's based on powers of 10, making conversions easy. Most countries use metric. US uses imperial (feet, pounds, gallons).",
    },
];

const LENGTH_UNITS = [
    { value: "millimeter", label: "Millimeter (mm)", toMeters: 0.001 },
    { value: "centimeter", label: "Centimeter (cm)", toMeters: 0.01 },
    { value: "meter", label: "Meter (m)", toMeters: 1 },
    { value: "kilometer", label: "Kilometer (km)", toMeters: 1000 },
    { value: "inch", label: "Inch (in)", toMeters: 0.0254 },
    { value: "foot", label: "Foot (ft)", toMeters: 0.3048 },
    { value: "yard", label: "Yard (yd)", toMeters: 0.9144 },
    { value: "mile", label: "Mile (mi)", toMeters: 1609.344 },
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
    name: "Length Converter – Convert Length Units",
    description: "Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
    url: "https://www.numrexo.com/conversion/length-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["8 length units", "Metric to imperial", "Instant conversion", "Precise results"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Length Converter", item: "https://www.numrexo.com/conversion/length-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LengthConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("meter");
    const [toUnit, setToUnit] = useState("foot");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid number");
            return;
        }

        const from = LENGTH_UNITS.find(u => u.value === fromUnit)!;
        const to = LENGTH_UNITS.find(u => u.value === toUnit)!;

        const inMeters = val * from.toMeters;
        const converted = inMeters / to.toMeters;

        setResult({
            value: val,
            fromUnit: from.label,
            toUnit: to.label,
            converted: converted.toFixed(6),
        });
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        if (value) setTimeout(convert, 10);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Length Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Length Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between metric and imperial length units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{LENGTH_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{LENGTH_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Length" isEmpty={!result} emptyIcon="📏" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-blue-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Length Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles. Perfect for construction, travel, and everyday measurements.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Length Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">Inch</td><td className="py-2 px-4">Centimeter</td><td className="py-2 px-4 text-yellow-400">2.54</td></tr>
                            <tr><td className="py-2 px-4">Foot</td><td className="py-2 px-4">Meter</td><td className="py-2 px-4 text-yellow-400">0.3048</td></tr>
                            <tr><td className="py-2 px-4">Mile</td><td className="py-2 px-4">Kilometer</td><td className="py-2 px-4 text-yellow-400">1.60934</td></tr>
                            <tr><td className="py-2 px-4">Yard</td><td className="py-2 px-4">Meter</td><td className="py-2 px-4 text-yellow-400">0.9144</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}