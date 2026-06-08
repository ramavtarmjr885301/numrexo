"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert Celsius to Fahrenheit for oven?",
        a: "°F = (°C × 9/5) + 32. Example: 180°C × 9/5 = 324 + 32 = 356°F. Most recipes use 350°F (175°C) for baking.",
    },
    {
        q: "What is the gas mark equivalent?",
        a: "Gas marks are used in UK ovens. Gas Mark 1 = 275°F (135°C), Gas Mark 4 = 350°F (175°C), Gas Mark 6 = 400°F (200°C), Gas Mark 8 = 450°F (230°C).",
    },
    {
        q: "What are common oven temperature conversions?",
        a: "Slow oven: 300-325°F (150-160°C). Moderate oven: 350-375°F (175-190°C). Hot oven: 400-425°F (200-220°C). Very hot oven: 450-500°F (230-260°C).",
    },
    {
        q: "How to adjust cooking time for temperature conversion?",
        a: "If you change temperature, adjust time: Higher temp = shorter time (about 10% less per 25°F). Lower temp = longer time (about 10% more per 25°F).",
    },
];

const TEMPERATURE_SCALES = [
    { value: "celsius", label: "Celsius (°C)" },
    { value: "fahrenheit", label: "Fahrenheit (°F)" },
    { value: "gas", label: "Gas Mark" },
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
    name: "Oven Temperature Converter – Convert Oven Temperatures",
    description: "Convert oven temperatures between Celsius, Fahrenheit, and Gas Mark. Perfect for baking and cooking.",
    url: "https://www.numrexo.com/cooking/oven-temperature-converter",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Celsius to Fahrenheit", "Fahrenheit to Celsius", "Gas mark conversion", "Oven temperature guide"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://www.numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Oven Temperature Converter", item: "https://www.numrexo.com/cooking/oven-temperature-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5 / 9;
}

function celsiusToGasMark(celsius: number): number | null {
    const gasMarks: { [key: number]: number } = {
        120: 1, 135: 1, 140: 1, 150: 2, 160: 3, 170: 3, 175: 4,
        180: 4, 190: 5, 200: 6, 210: 6, 220: 7, 230: 8, 240: 9, 250: 10
    };
    const closest = Object.keys(gasMarks).map(Number).reduce((prev, curr) => {
        return Math.abs(curr - celsius) < Math.abs(prev - celsius) ? curr : prev;
    });
    return gasMarks[closest] || null;
}

function gasMarkToCelsius(gasMark: number): number {
    const gasToCelsius: { [key: number]: number } = {
        1: 135, 2: 150, 3: 160, 4: 175, 5: 190, 6: 200, 7: 220, 8: 230, 9: 240, 10: 250
    };
    return gasToCelsius[gasMark] || 175;
}

export default function OvenTemperatureConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("celsius");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid temperature");
            return;
        }

        let celsius: number | null = null;
        let fahrenheit: number | null = null;
        let gasMark: number | null = null;

        if (fromUnit === "celsius") {
            celsius = val;
            fahrenheit = celsiusToFahrenheit(celsius);
            gasMark = celsiusToGasMark(celsius);
        } else if (fromUnit === "fahrenheit") {
            fahrenheit = val;
            celsius = fahrenheitToCelsius(fahrenheit);
            gasMark = celsiusToGasMark(celsius);
        } else if (fromUnit === "gas") {
            gasMark = val;
            celsius = gasMarkToCelsius(gasMark);
            fahrenheit = celsiusToFahrenheit(celsius);
        }

        // Get oven description
        let description = "";
        if (celsius) {
            if (celsius < 110) description = "Very Slow / Warming";
            else if (celsius < 150) description = "Slow / Low";
            else if (celsius < 180) description = "Moderately Slow";
            else if (celsius < 200) description = "Moderate";
            else if (celsius < 220) description = "Moderately Hot";
            else if (celsius < 240) description = "Hot";
            else description = "Very Hot";
        }

        setResult({
            celsius: celsius?.toFixed(0),
            fahrenheit: fahrenheit?.toFixed(0),
            gasMark,
            description,
            originalValue: val,
            originalUnit: fromUnit,
        });
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/cooking" itemProp="item" className="hover:text-gray-300">Cooking Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Oven Temperature Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Oven Temperature Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between Celsius, Fahrenheit, and Gas Mark</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Temperature Value</label><input type="number" step="1" placeholder="180" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{TEMPERATURE_SCALES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}</select></div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox
                    title="Converted Temperatures"
                    isEmpty={!result}
                    emptyIcon="🔥"
                    emptyText="Enter temperature to convert"
                    mainResult={result ? { label: "Celsius", value: `${result.celsius}°C`, color: "text-red-400" } : undefined}
                    extraRows={result ? [
                        { label: "Fahrenheit", value: `${result.fahrenheit}°F`, valueColor: "text-yellow-400" },
                        { label: "Gas Mark", value: result.gasMark ? `Gas Mark ${result.gasMark}` : "Not applicable" },
                        { label: "Oven Type", value: result.description },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Oven Temperature Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert oven temperatures between Celsius, Fahrenheit, and Gas Mark. Perfect for international recipes and different oven types.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Oven Temperature Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Description</th><th className="text-left py-3 px-4 text-gray-400">Celsius</th><th className="text-left py-3 px-4 text-gray-400">Fahrenheit</th><th className="text-left py-3 px-4 text-gray-400">Gas Mark</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Very Slow/Warming</td><td className="py-2 px-4">110-120°C</td><td className="py-2 px-4">225-250°F</td><td className="py-2 px-4">1/4 - 1/2</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Slow/Low</td><td className="py-2 px-4">140-150°C</td><td className="py-2 px-4">275-300°F</td><td className="py-2 px-4">1-2</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Moderately Slow</td><td className="py-2 px-4">160°C</td><td className="py-2 px-4">325°F</td><td className="py-2 px-4">3</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Moderate</td><td className="py-2 px-4">175-190°C</td><td className="py-2 px-4">350-375°F</td><td className="py-2 px-4">4-5</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Moderately Hot</td><td className="py-2 px-4">200-210°C</td><td className="py-2 px-4">400-410°F</td><td className="py-2 px-4">6-7</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Hot</td><td className="py-2 px-4">220-230°C</td><td className="py-2 px-4">425-450°F</td><td className="py-2 px-4">7-8</td></tr>
                            <tr><td className="py-2 px-4">Very Hot</td><td className="py-2 px-4">240-260°C</td><td className="py-2 px-4">475-500°F</td><td className="py-2 px-4">9-10</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Recipe Temperatures</h2>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center"><p className="text-yellow-400">Cakes</p><p className="text-sm">180°C / 350°F / Gas 4</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center"><p className="text-yellow-400">Bread</p><p className="text-sm">200°C / 400°F / Gas 6</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center"><p className="text-yellow-400">Roast Meat</p><p className="text-sm">190°C / 375°F / Gas 5</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center"><p className="text-yellow-400">Pizza</p><p className="text-sm">220°C / 425°F / Gas 7</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center"><p className="text-yellow-400">Cookies</p><p className="text-sm">175°C / 350°F / Gas 4</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center"><p className="text-yellow-400">Pastry</p><p className="text-sm">190°C / 375°F / Gas 5</p></div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}