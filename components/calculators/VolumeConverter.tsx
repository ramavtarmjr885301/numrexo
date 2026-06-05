"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert liters to gallons?",
        a: "1 liter = 0.264172 gallons. Multiply liters by 0.264172. Example: 10 liters × 0.264172 = 2.64172 gallons.",
    },
    {
        q: "How to convert gallons to liters?",
        a: "1 gallon = 3.78541 liters. Multiply gallons by 3.78541. Example: 5 gallons × 3.78541 = 18.92705 liters.",
    },
    {
        q: "How many milliliters in a cup?",
        a: "1 US cup = 236.588 milliliters. For cooking, 1 cup is often rounded to 240 ml.",
    },
    {
        q: "What is the difference between US gallon and UK gallon?",
        a: "US gallon = 3.785 liters, UK gallon = 4.546 liters. This converter uses US gallons, the most common standard.",
    },
];

const VOLUME_UNITS = [
    { value: "milliliter", label: "Milliliter (ml)", toLiter: 0.001 },
    { value: "liter", label: "Liter (L)", toLiter: 1 },
    { value: "cubic_meter", label: "Cubic Meter (m³)", toLiter: 1000 },
    { value: "gallon_us", label: "Gallon (US gal)", toLiter: 3.78541 },
    { value: "quart_us", label: "Quart (US qt)", toLiter: 0.946353 },
    { value: "pint_us", label: "Pint (US pt)", toLiter: 0.473176 },
    { value: "cup_us", label: "Cup (US cup)", toLiter: 0.236588 },
    { value: "fluid_ounce_us", label: "Fluid Ounce (US fl oz)", toLiter: 0.0295735 },
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
    name: "Volume Converter – Convert Volume Units",
    description: "Convert between liters, milliliters, gallons, quarts, pints, cups, and fluid ounces.",
    url: "https://www.numrexo.com/conversion/volume-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["8 volume units", "Cooking measurements", "Liquid conversions", "Instant conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Volume Converter", item: "https://www.numrexo.com/conversion/volume-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function VolumeConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("liter");
    const [toUnit, setToUnit] = useState("gallon_us");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = VOLUME_UNITS.find(u => u.value === fromUnit)!;
        const to = VOLUME_UNITS.find(u => u.value === toUnit)!;
        const inLiter = val * from.toLiter;
        const converted = inLiter / to.toLiter;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Volume Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Volume Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between volume measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{VOLUME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{VOLUME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Volume" isEmpty={!result} emptyIcon="🧊" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-cyan-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Volume Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between liters, milliliters, gallons, quarts, pints, cups, and fluid ounces. Perfect for cooking, science, and everyday measurements.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Volume Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">Liter</td><td className="py-2 px-4">Gallon</td><td className="py-2 px-4 text-yellow-400">0.264172</td></tr>
                            <tr><td className="py-2 px-4">Gallon</td><td className="py-2 px-4">Liter</td><td className="py-2 px-4 text-yellow-400">3.78541</td></tr>
                            <tr><td className="py-2 px-4">Milliliter</td><td className="py-2 px-4">Fluid Ounce</td><td className="py-2 px-4 text-yellow-400">0.033814</td></tr>
                            <tr><td className="py-2 px-4">Cup</td><td className="py-2 px-4">Milliliter</td><td className="py-2 px-4 text-yellow-400">236.588</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}