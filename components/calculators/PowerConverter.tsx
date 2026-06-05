"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert watts to horsepower?",
        a: "1 horsepower (HP) = 745.7 watts. Divide watts by 745.7. Example: 1000 W ÷ 745.7 = 1.34 HP.",
    },
    {
        q: "What is the difference between watt and kilowatt?",
        a: "1 kilowatt (kW) = 1,000 watts. Used for larger power measurements like appliances and cars. 1 HP = 0.7457 kW.",
    },
    {
        q: "How many watts in 1 HP?",
        a: "1 mechanical horsepower = 745.7 watts. Metric horsepower (PS) = 735.5 watts. This converter uses mechanical HP.",
    },
    {
        q: "What is the difference between watt and watt-hour?",
        a: "Watt measures power (rate of energy). Watt-hour measures energy (power × time). 100W bulb for 10 hours = 1,000 Wh = 1 kWh.",
    },
];

const POWER_UNITS = [
    { value: "watt", label: "Watt (W)", toWatt: 1 },
    { value: "kilowatt", label: "Kilowatt (kW)", toWatt: 1000 },
    { value: "megawatt", label: "Megawatt (MW)", toWatt: 1000000 },
    { value: "horsepower", label: "Horsepower (HP)", toWatt: 745.7 },
    { value: "btu_per_hour", label: "BTU per hour (BTU/h)", toWatt: 0.293071 },
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
    name: "Power Converter – Convert Power Units",
    description: "Convert between watts, kilowatts, megawatts, horsepower, and BTU per hour.",
    url: "https://www.numrexo.com/conversion/power-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["5 power units", "Watts to HP", "kW to HP", "Electrical and mechanical"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Power Converter", item: "https://www.numrexo.com/conversion/power-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PowerConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("kilowatt");
    const [toUnit, setToUnit] = useState("horsepower");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = POWER_UNITS.find(u => u.value === fromUnit)!;
        const to = POWER_UNITS.find(u => u.value === toUnit)!;
        const inWatt = val * from.toWatt;
        const converted = inWatt / to.toWatt;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Power Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Power Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between power measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{POWER_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{POWER_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Power" isEmpty={!result} emptyIcon="🔌" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-red-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Power Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between watts, kilowatts, megawatts, horsepower, and BTU per hour. Perfect for electrical, mechanical, and HVAC applications.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Power Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kW</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-400">1.34102</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">HP</td><td className="py-2 px-4">kW</td><td className="py-2 px-4 text-yellow-400">0.7457</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">W</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-400">0.001341</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">BTU/h</td><td className="py-2 px-4">W</td><td className="py-2 px-4 text-yellow-400">0.293071</td></tr>
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