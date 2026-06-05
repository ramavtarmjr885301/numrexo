"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert Celsius to Fahrenheit?",
        a: "Multiply Celsius by 9/5, then add 32. Formula: °F = (°C × 9/5) + 32. Example: 25°C × 9/5 = 45 + 32 = 77°F.",
    },
    {
        q: "How to convert Fahrenheit to Celsius?",
        a: "Subtract 32 from Fahrenheit, then multiply by 5/9. Formula: °C = (°F - 32) × 5/9. Example: 77°F - 32 = 45 × 5/9 = 25°C.",
    },
    {
        q: "How to convert Celsius to Kelvin?",
        a: "Add 273.15 to Celsius. Formula: K = °C + 273.15. Example: 25°C + 273.15 = 298.15 K. Kelvin is the scientific temperature scale starting at absolute zero.",
    },
    {
        q: "What is absolute zero?",
        a: "Absolute zero is the lowest possible temperature (0 Kelvin, -273.15°C, -459.67°F). At this temperature, particles stop moving completely.",
    },
    {
        q: "What is normal body temperature?",
        a: "Normal human body temperature is 37°C (98.6°F). Fever starts at 38°C (100.4°F).",
    },
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
    name: "Temperature Converter – Celsius, Fahrenheit, Kelvin",
    description: "Convert between Celsius, Fahrenheit, and Kelvin. Free online temperature converter for cooking, weather, and science.",
    url: "https://www.numrexo.com/conversion/temperature-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Celsius to Fahrenheit", "Fahrenheit to Celsius", "Celsius to Kelvin", "Instant conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Temperature Converter", item: "https://www.numrexo.com/conversion/temperature-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function TemperatureConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState<"celsius" | "fahrenheit" | "kelvin">("celsius");
    const [toUnit, setToUnit] = useState<"celsius" | "fahrenheit" | "kelvin">("fahrenheit");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid temperature");
            return;
        }

        let celsius: number;

        // Convert from any unit to Celsius first
        if (fromUnit === "celsius") celsius = val;
        else if (fromUnit === "fahrenheit") celsius = (val - 32) * 5 / 9;
        else celsius = val - 273.15;

        // Convert from Celsius to target unit
        let converted: number;
        let targetLabel = "";

        if (toUnit === "celsius") {
            converted = celsius;
            targetLabel = "°C";
        } else if (toUnit === "fahrenheit") {
            converted = (celsius * 9 / 5) + 32;
            targetLabel = "°F";
        } else {
            converted = celsius + 273.15;
            targetLabel = "K";
        }

        const fromLabels = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };

        setResult({
            value: val,
            fromUnit: fromLabels[fromUnit],
            toUnit: targetLabel,
            converted: converted.toFixed(2),
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Temperature Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Temperature Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between Celsius, Fahrenheit, and Kelvin</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Temperature</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value as any)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white"><option value="celsius">Celsius (°C)</option><option value="fahrenheit">Fahrenheit (°F)</option><option value="kelvin">Kelvin (K)</option></select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value as any)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white"><option value="celsius">Celsius (°C)</option><option value="fahrenheit">Fahrenheit (°F)</option><option value="kelvin">Kelvin (K)</option></select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Temperature" isEmpty={!result} emptyIcon="🌡️" emptyText="Enter temperature and press Convert" mainResult={result ? { label: `${result.value}${result.fromUnit} =`, value: `${result.converted}${result.toUnit}`, color: "text-orange-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Temperature Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between Celsius, Fahrenheit, and Kelvin. Perfect for cooking, weather, science, and travel.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Temperature Conversion Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">°F = (°C × 9/5) + 32</p>
                    <p className="text-white font-mono text-sm mb-2">°C = (°F - 32) × 5/9</p>
                    <p className="text-white font-mono text-sm">K = °C + 273.15</p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Temperature References</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Description</th><th className="text-left py-3 px-4 text-gray-400">Celsius</th><th className="text-left py-3 px-4 text-gray-400">Fahrenheit</th><th className="text-left py-3 px-4 text-gray-400">Kelvin</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Absolute Zero</td><td className="py-2 px-4">-273.15°C</td><td className="py-2 px-4">-459.67°F</td><td className="py-2 px-4 text-yellow-400">0 K</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Water Freezes</td><td className="py-2 px-4">0°C</td><td className="py-2 px-4">32°F</td><td className="py-2 px-4">273.15 K</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Room Temperature</td><td className="py-2 px-4">20-22°C</td><td className="py-2 px-4">68-72°F</td><td className="py-2 px-4">293-295 K</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Body Temperature</td><td className="py-2 px-4">37°C</td><td className="py-2 px-4">98.6°F</td><td className="py-2 px-4">310.15 K</td></tr>
                            <tr><td className="py-2 px-4">Water Boils</td><td className="py-2 px-4">100°C</td><td className="py-2 px-4">212°F</td><td className="py-2 px-4">373.15 K</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}