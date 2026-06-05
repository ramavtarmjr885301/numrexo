"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert degrees to radians?",
        a: "Multiply degrees by π/180 (0.0174533). Example: 90° × 0.0174533 = 1.5708 radians. 180° = π radians.",
    },
    {
        q: "How to convert radians to degrees?",
        a: "Multiply radians by 180/π (57.2958). Example: 1 radian × 57.2958 = 57.2958°. π radians = 180°.",
    },
    {
        q: "What is a gradian?",
        a: "A gradian (gon) divides a right angle into 100 parts. 1 gradian = 0.9 degrees. 400 gradians = full circle (360°). Used in surveying and some European countries.",
    },
    {
        q: "What is the difference between degree, minute, and second?",
        a: "1 degree = 60 minutes ('), 1 minute = 60 seconds (''). Used for precise navigation and astronomy. Example: 30° 15' 30'' = 30.2583 degrees.",
    },
];

const ANGLE_UNITS = [
    { value: "degree", label: "Degree (°)", toDegree: 1 },
    { value: "radian", label: "Radian (rad)", toDegree: 57.2957795 },
    { value: "gradian", label: "Gradian (gon)", toDegree: 0.9 },
    { value: "arcminute", label: "Arcminute (')", toDegree: 1 / 60 },
    { value: "arcsecond", label: "Arcsecond ('')", toDegree: 1 / 3600 },
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
    name: "Angle Converter – Convert Angle Units",
    description: "Convert between degrees, radians, gradians, arcminutes, and arcseconds.",
    url: "https://www.numrexo.com/conversion/angle-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["5 angle units", "Degrees to radians", "Navigation conversions", "Surveying"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Angle Converter", item: "https://www.numrexo.com/conversion/angle-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AngleConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("degree");
    const [toUnit, setToUnit] = useState("radian");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = ANGLE_UNITS.find(u => u.value === fromUnit)!;
        const to = ANGLE_UNITS.find(u => u.value === toUnit)!;
        const inDegrees = val * from.toDegree;
        const converted = inDegrees / to.toDegree;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Angle Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Angle Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between angle measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ANGLE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ANGLE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Angle" isEmpty={!result} emptyIcon="📐" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-indigo-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Angle Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between degrees, radians, gradians, arcminutes, and arcseconds. Perfect for geometry, trigonometry, navigation, and surveying.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Angle Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">180°</td><td className="py-2 px-4">Radians</td><td className="py-2 px-4 text-yellow-400">π rad (3.14159 rad)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">90°</td><td className="py-2 px-4">Radians</td><td className="py-2 px-4 text-yellow-400">π/2 rad (1.5708 rad)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Radian</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">57.2958°</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Gradian</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">0.9°</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Arcminute</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">0.0166667°</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Arcsecond</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">0.00027778°</td></tr>
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