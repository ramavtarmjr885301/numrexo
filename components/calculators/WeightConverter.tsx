"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert kilograms to pounds?",
        a: "1 kilogram = 2.20462 pounds. Multiply kilograms by 2.20462. Example: 10 kg × 2.20462 = 22.0462 lbs.",
    },
    {
        q: "How to convert pounds to kilograms?",
        a: "1 pound = 0.453592 kilograms. Multiply pounds by 0.453592. Example: 10 lbs × 0.453592 = 4.53592 kg.",
    },
    {
        q: "How many grams in an ounce?",
        a: "1 ounce = 28.3495 grams. Multiply ounces by 28.3495. Example: 5 oz × 28.3495 = 141.7475 g.",
    },
    {
        q: "What is the difference between mass and weight?",
        a: "Mass is the amount of matter (kg, g, lbs). Weight is the force of gravity on mass (Newtons). On Earth, we use them interchangeably because gravity is constant.",
    },
];

const WEIGHT_UNITS = [
    { value: "milligram", label: "Milligram (mg)", toKg: 0.000001 },
    { value: "gram", label: "Gram (g)", toKg: 0.001 },
    { value: "kilogram", label: "Kilogram (kg)", toKg: 1 },
    { value: "tonne", label: "Tonne (t)", toKg: 1000 },
    { value: "ounce", label: "Ounce (oz)", toKg: 0.0283495 },
    { value: "pound", label: "Pound (lb)", toKg: 0.453592 },
    { value: "stone", label: "Stone (st)", toKg: 6.35029 },
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
    name: "Weight Converter – Convert Weight Units",
    description: "Convert between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.",
    url: "https://www.numrexo.com/conversion/weight-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 weight units", "Metric to imperial", "Kitchen to body weight", "Instant conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Weight Converter", item: "https://www.numrexo.com/conversion/weight-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function WeightConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("kilogram");
    const [toUnit, setToUnit] = useState("pound");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = WEIGHT_UNITS.find(u => u.value === fromUnit)!;
        const to = WEIGHT_UNITS.find(u => u.value === toUnit)!;
        const inKg = val * from.toKg;
        const converted = inKg / to.toKg;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Weight Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Weight Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between metric and imperial weight units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{WEIGHT_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{WEIGHT_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Weight" isEmpty={!result} emptyIcon="⚖️" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-green-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Weight Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones. Perfect for cooking, shipping, fitness, and science.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Weight Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">Kilogram</td><td className="py-2 px-4">Pound</td><td className="py-2 px-4 text-yellow-400">2.20462</td></tr>
                            <tr><td className="py-2 px-4">Pound</td><td className="py-2 px-4">Kilogram</td><td className="py-2 px-4 text-yellow-400">0.453592</td></tr>
                            <tr><td className="py-2 px-4">Gram</td><td className="py-2 px-4">Ounce</td><td className="py-2 px-4 text-yellow-400">0.035274</td></tr>
                            <tr><td className="py-2 px-4">Ounce</td><td className="py-2 px-4">Gram</td><td className="py-2 px-4 text-yellow-400">28.3495</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}