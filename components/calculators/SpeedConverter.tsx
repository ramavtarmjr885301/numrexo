"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert km/h to mph?",
        a: "1 km/h = 0.621371 mph. Multiply km/h by 0.621371. Example: 100 km/h × 0.621371 = 62.14 mph.",
    },
    {
        q: "How to convert mph to km/h?",
        a: "1 mph = 1.60934 km/h. Multiply mph by 1.60934. Example: 60 mph × 1.60934 = 96.56 km/h.",
    },
    {
        q: "What is the speed of sound?",
        a: "The speed of sound (Mach 1) is approximately 1,235 km/h (767 mph) at sea level. It varies with temperature and altitude.",
    },
    {
        q: "What is a knot?",
        a: "A knot is one nautical mile per hour (1.852 km/h). Used for maritime and aviation navigation. 1 knot = 1.151 mph.",
    },
];

const SPEED_UNITS = [
    { value: "kmh", label: "Kilometers per hour (km/h)", toKmh: 1 },
    { value: "mph", label: "Miles per hour (mph)", toKmh: 1.60934 },
    { value: "ms", label: "Meters per second (m/s)", toKmh: 3.6 },
    { value: "knot", label: "Knot (kn)", toKmh: 1.852 },
    { value: "fts", label: "Feet per second (ft/s)", toKmh: 1.09728 },
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
    name: "Speed Converter – Convert Speed Units",
    description: "Convert between km/h, mph, m/s, knots, and ft/s. Perfect for driving, running, and aviation.",
    url: "https://www.numrexo.com/conversion/speed-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["5 speed units", "km/h to mph", "Driving speed", "Aviation knots"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Speed Converter", item: "https://www.numrexo.com/conversion/speed-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpeedConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("kmh");
    const [toUnit, setToUnit] = useState("mph");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = SPEED_UNITS.find(u => u.value === fromUnit)!;
        const to = SPEED_UNITS.find(u => u.value === toUnit)!;
        const inKmh = val * from.toKmh;
        const converted = inKmh / to.toKmh;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(4) });
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Speed Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Speed Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between speed measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{SPEED_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{SPEED_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Speed" isEmpty={!result} emptyIcon="🚀" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-yellow-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Speed Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between km/h, mph, m/s, knots, and ft/s. Perfect for driving, running, cycling, and aviation.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Speed Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">km/h</td><td className="py-2 px-4">mph</td><td className="py-2 px-4 text-yellow-400">0.621371</td></tr>
                            <tr><td className="py-2 px-4">mph</td><td className="py-2 px-4">km/h</td><td className="py-2 px-4 text-yellow-400">1.60934</td></tr>
                            <tr><td className="py-2 px-4">m/s</td><td className="py-2 px-4">km/h</td><td className="py-2 px-4 text-yellow-400">3.6</td></tr>
                            <tr><td className="py-2 px-4">knot</td><td className="py-2 px-4">km/h</td><td className="py-2 px-4 text-yellow-400">1.852</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}