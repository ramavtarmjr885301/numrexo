"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert joules to calories?",
        a: "1 calorie = 4.184 joules. Divide joules by 4.184. Example: 100 J ÷ 4.184 = 23.9 calories. Food calories (kcal) are 1000x larger: 1 kcal = 4184 J.",
    },
    {
        q: "What is the difference between calorie and kilocalorie?",
        a: "1 kilocalorie (kcal) = 1,000 calories. Food labels use Calories (capital C) which actually means kilocalories. 1 food Calorie = 1 kcal = 4,184 joules.",
    },
    {
        q: "What is a watt-hour?",
        a: "Watt-hour (Wh) is energy used by 1 watt for 1 hour. 1 Wh = 3,600 joules. Kilowatt-hour (kWh) is used for electricity bills: 1 kWh = 3.6 million joules.",
    },
    {
        q: "How many joules in 1 kWh?",
        a: "1 kWh = 3,600,000 joules (3.6 × 10⁶ J). This is the standard unit for electrical energy consumption.",
    },
];

const ENERGY_UNITS = [
    { value: "joule", label: "Joule (J)", toJoule: 1 },
    { value: "kilojoule", label: "Kilojoule (kJ)", toJoule: 1000 },
    { value: "calorie", label: "Calorie (cal)", toJoule: 4.184 },
    { value: "kilocalorie", label: "Kilocalorie (kcal)", toJoule: 4184 },
    { value: "watt_hour", label: "Watt-hour (Wh)", toJoule: 3600 },
    { value: "kilowatt_hour", label: "Kilowatt-hour (kWh)", toJoule: 3600000 },
    { value: "ev", label: "Electronvolt (eV)", toJoule: 1.60218e-19 },
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
    name: "Energy Converter – Convert Energy Units",
    description: "Convert between joules, calories, kilocalories, watt-hours, kilowatt-hours, and electronvolts.",
    url: "https://www.numrexo.com/conversion/energy-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 energy units", "Joules to calories", "kWh conversion", "Physics and nutrition"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Energy Converter", item: "https://www.numrexo.com/conversion/energy-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function EnergyConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("joule");
    const [toUnit, setToUnit] = useState("calorie");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = ENERGY_UNITS.find(u => u.value === fromUnit)!;
        const to = ENERGY_UNITS.find(u => u.value === toUnit)!;
        const inJoule = val * from.toJoule;
        const converted = inJoule / to.toJoule;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Energy Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Energy Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between energy measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ENERGY_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ENERGY_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Energy" isEmpty={!result} emptyIcon="⚡" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-green-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Energy Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between joules, calories, kilocalories, watt-hours, kilowatt-hours, and electronvolts. Perfect for physics, nutrition, and electricity calculations.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Energy Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Joule</td><td className="py-2 px-4">Calorie</td><td className="py-2 px-4 text-yellow-400">0.239006</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Calorie</td><td className="py-2 px-4">Joule</td><td className="py-2 px-4 text-yellow-400">4.184</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kWh</td><td className="py-2 px-4">Joule</td><td className="py-2 px-4 text-yellow-400">3,600,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kcal</td><td className="py-2 px-4">kJ</td><td className="py-2 px-4 text-yellow-400">4.184</td></tr>
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