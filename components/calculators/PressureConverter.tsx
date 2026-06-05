"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert PSI to bar?",
        a: "1 PSI = 0.0689476 bar. Multiply PSI by 0.0689476. Example: 100 PSI × 0.0689476 = 6.89476 bar.",
    },
    {
        q: "What is atmospheric pressure?",
        a: "Standard atmospheric pressure at sea level is 14.7 PSI, 101.325 kPa, or 1.01325 bar. Used as reference for pressure measurements.",
    },
    {
        q: "What is the difference between bar and PSI?",
        a: "Bar is metric unit (1 bar = 100,000 Pa). PSI is imperial unit (pounds per square inch). 1 bar ≈ 14.5 PSI. Both measure pressure, used in different countries.",
    },
    {
        q: "What is Pascal?",
        a: "Pascal (Pa) is the SI unit of pressure. 1 Pascal = 1 Newton per square meter. Kilopascal (kPa) and Megapascal (MPa) are common for higher pressures.",
    },
];

const PRESSURE_UNITS = [
    { value: "pascal", label: "Pascal (Pa)", toPascal: 1 },
    { value: "kpa", label: "Kilopascal (kPa)", toPascal: 1000 },
    { value: "mpa", label: "Megapascal (MPa)", toPascal: 1000000 },
    { value: "bar", label: "Bar", toPascal: 100000 },
    { value: "psi", label: "PSI (lb/in²)", toPascal: 6894.76 },
    { value: "atm", label: "Atmosphere (atm)", toPascal: 101325 },
    { value: "torr", label: "Torr (mmHg)", toPascal: 133.322 },
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
    name: "Pressure Converter – Convert Pressure Units",
    description: "Convert between Pascal, kPa, MPa, bar, PSI, atmosphere, and torr.",
    url: "https://www.numrexo.com/conversion/pressure-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 pressure units", "PSI to bar", "Atmospheric pressure", "Scientific conversions"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Pressure Converter", item: "https://www.numrexo.com/conversion/pressure-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PressureConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("psi");
    const [toUnit, setToUnit] = useState("bar");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = PRESSURE_UNITS.find(u => u.value === fromUnit)!;
        const to = PRESSURE_UNITS.find(u => u.value === toUnit)!;
        const inPascal = val * from.toPascal;
        const converted = inPascal / to.toPascal;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Pressure Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Pressure Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between pressure measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{PRESSURE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{PRESSURE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Pressure" isEmpty={!result} emptyIcon="🎈" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-blue-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Pressure Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between Pascal, kPa, MPa, bar, PSI, atmosphere, and torr. Perfect for engineering, weather, and science applications.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Pressure Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">PSI</td><td className="py-2 px-4">bar</td><td className="py-2 px-4 text-yellow-400">0.0689476</td></tr>
                            <tr><td className="py-2 px-4">bar</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">14.5038</td></tr>
                            <tr><td className="py-2 px-4">atm</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">14.6959</td></tr>
                            <tr><td className="py-2 px-4">kPa</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">0.145038</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}