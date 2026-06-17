"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert liters to gallons?",
        a: "1 liter = 0.264172 gallons (US). Multiply liters by 0.264172. Example: 10 liters × 0.264172 = 2.64172 gallons. For quick mental math: 4 liters ≈ 1 gallon (actually 3.785 liters = 1 gallon). This conversion is commonly needed when traveling between countries using different measurement systems.",
    },
    {
        q: "How to convert gallons to liters?",
        a: "1 US gallon = 3.78541 liters. Multiply gallons by 3.78541. Example: 5 gallons × 3.78541 = 18.92705 liters. For quick estimation: 1 gallon ≈ 3.8 liters. This is useful when buying liquids in countries that use the metric system.",
    },
    {
        q: "How many milliliters in a cup?",
        a: "1 US cup = 236.588 milliliters. For cooking, 1 cup is often rounded to 240 ml. In the UK/Australia, 1 cup = 250 ml. Always check which standard your recipe uses - US vs metric cups can affect your cooking results. Our converter uses US cups, the most common standard in cooking measurements.",
    },
    {
        q: "What is the difference between US gallon and UK gallon?",
        a: "US gallon = 3.785 liters, UK gallon = 4.546 liters. This difference is significant - a UK gallon is about 20% larger than a US gallon. This converter uses US gallons, the most common standard. Always check which gallon standard your recipe or application uses to avoid errors.",
    },
    {
        q: "How many fluid ounces in a liter?",
        a: "1 liter = 33.814 fluid ounces (US). For quick mental math: 1 liter ≈ 34 fl oz. To convert liters to fluid ounces, multiply by 33.814. Example: 2 liters = 67.63 fl oz. This conversion is useful for beverages, cooking, and measuring liquids in recipes.",
    },
    {
        q: "How to convert between US and metric cooking measurements?",
        a: "Common conversions: 1 cup = 236.588 ml, 1 tbsp = 14.787 ml, 1 tsp = 4.929 ml, 1 fl oz = 29.5735 ml. For baking, use weight measurements for accuracy. Our volume converter handles all these conversions. For dry ingredients, 1 cup of flour ≈ 120g, 1 cup of sugar ≈ 200g.",
    },
    {
        q: "What is the difference between fluid ounce and ounce?",
        a: "Fluid ounce (fl oz) measures volume (liquid), while ounce (oz) measures weight/mass. 1 fluid ounce of water weighs approximately 1 ounce, but this varies with density. For example, 1 fl oz of honey weighs more than 1 fl oz of water. Always use fluid ounces for liquids and ounces for solids.",
    },
    {
        q: "How many quarts in a gallon?",
        a: "1 gallon = 4 quarts. 1 quart = 2 pints = 4 cups = 32 fluid ounces. This hierarchy is important in US customary measurements: Gallon → Quart → Pint → Cup → Fluid Ounce. Our converter handles all these conversions automatically.",
    },
    {
        q: "What are common volume units for cooking?",
        a: "Common cooking volume units: 1 cup = 16 tablespoons = 48 teaspoons = 8 fluid ounces, 1 tablespoon = 3 teaspoons = 1/2 fluid ounce, 1 quart = 4 cups = 32 fluid ounces, 1 gallon = 4 quarts = 16 cups. Our volume converter includes all these units for easy recipe scaling.",
    },
    {
        q: "How to convert between cubic meters and liters?",
        a: "1 cubic meter (m³) = 1,000 liters. To convert: multiply cubic meters by 1,000. Example: 0.5 m³ × 1,000 = 500 liters. To convert liters to cubic meters, divide by 1,000. Example: 2,500 L ÷ 1,000 = 2.5 m³. This is useful for water tanks, swimming pools, and large volume measurements.",
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

const VOLUME_UNITS = [
    { value: "milliliter", label: "Milliliter (ml)", toLiter: 0.001, emoji: "💧" },
    { value: "liter", label: "Liter (L)", toLiter: 1, emoji: "🫗" },
    { value: "cubic_meter", label: "Cubic Meter (m³)", toLiter: 1000, emoji: "📦" },
    { value: "gallon_us", label: "Gallon (US gal)", toLiter: 3.78541, emoji: "⛽" },
    { value: "quart_us", label: "Quart (US qt)", toLiter: 0.946353, emoji: "🪣" },
    { value: "pint_us", label: "Pint (US pt)", toLiter: 0.473176, emoji: "🍺" },
    { value: "cup_us", label: "Cup (US cup)", toLiter: 0.236588, emoji: "🥤" },
    { value: "fluid_ounce_us", label: "Fluid Ounce (US fl oz)", toLiter: 0.0295735, emoji: "🧪" },
];

const COMMON_CONVERSIONS = [
    { from: "1 Liter", to: "Gallons", factor: "0.264172" },
    { from: "1 Gallon", to: "Liters", factor: "3.78541" },
    { from: "1 Milliliter", to: "Fluid Ounces", factor: "0.033814" },
    { from: "1 Cup", to: "Milliliters", factor: "236.588" },
    { from: "1 Quart", to: "Liters", factor: "0.946353" },
    { from: "1 Pint", to: "Milliliters", factor: "473.176" },
    { from: "1 Fluid Ounce", to: "Milliliters", factor: "29.5735" },
    { from: "1 Cubic Meter", to: "Liters", factor: "1000" },
];

const COOKING_CONVERSIONS = [
    { measurement: "1 Cup", ml: "236.588 ml", tbsp: "16 tbsp", tsp: "48 tsp", floz: "8 fl oz" },
    { measurement: "1/2 Cup", ml: "118.294 ml", tbsp: "8 tbsp", tsp: "24 tsp", floz: "4 fl oz" },
    { measurement: "1/3 Cup", ml: "78.863 ml", tbsp: "5 tbsp + 1 tsp", tsp: "16 tsp", floz: "2.67 fl oz" },
    { measurement: "1/4 Cup", ml: "59.147 ml", tbsp: "4 tbsp", tsp: "12 tsp", floz: "2 fl oz" },
    { measurement: "1 Tablespoon", ml: "14.787 ml", tbsp: "1 tbsp", tsp: "3 tsp", floz: "0.5 fl oz" },
    { measurement: "1 Teaspoon", ml: "4.929 ml", tbsp: "1/3 tbsp", tsp: "1 tsp", floz: "0.167 fl oz" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function VolumeConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("liter");
    const [toUnit, setToUnit] = useState("gallon_us");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setValue("");
        setFromUnit("liter");
        setToUnit("gallon_us");
        setResult(null);
    };

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid number");
            return;
        }

        const from = VOLUME_UNITS.find(u => u.value === fromUnit)!;
        const to = VOLUME_UNITS.find(u => u.value === toUnit)!;
        const inLiter = val * from.toLiter;
        const converted = inLiter / to.toLiter;

        setResult({
            value: val,
            fromUnit: from.label,
            toUnit: to.label,
            converted: converted.toFixed(6),
            fromEmoji: from.emoji,
            toEmoji: to.emoji,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Volume Converter</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Volume Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between volume measurement units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Value</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="100"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">From</label>
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                >
                                    {VOLUME_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={swapUnits}
                                className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-xl"
                                aria-label="Swap units"
                            >
                                🔄
                            </button>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                >
                                    {VOLUME_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={convert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Convert →
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Converted Volume"
                    isEmpty={!result}
                    emptyIcon="🧊"
                    emptyText="Enter value and press Convert"
                    mainResult={result ? {
                        label: `${result.fromEmoji} ${result.value} ${result.fromUnit} =`,
                        value: `${result.converted} ${result.toUnit}`,
                        color: "text-cyan-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "From", value: result.fromUnit },
                        { label: "To", value: result.toUnit },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Volume Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Volume Converter</strong> is a comprehensive tool for converting between different volume measurement units. It handles liters, milliliters, gallons, quarts, pints, cups, fluid ounces, and cubic meters.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Volume conversion is essential in many fields: Cooking and baking (recipe scaling), Science and laboratory work (measuring liquids), Construction (concrete, water tanks), Automotive (fuel consumption), and Everyday life (understanding product sizes).
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our converter supports 8 volume units with high precision (6 decimal places). Whether you're scaling a recipe, calculating fuel economy, or doing scientific calculations, you'll get accurate results instantly.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Volume Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">volume value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">"From"</strong> unit (liter, gallon, cup, etc.).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">"To"</strong> unit (liter, gallon, cup, etc.).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">"Swap"</strong> (🔄) to quickly reverse the conversion.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Volume Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-2">✓ Cooking & Baking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Scale recipes easily. Convert between cups, milliliters, fluid ounces, and more. Perfect for international recipes.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ International Travel</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand fuel efficiency, drink sizes, and product volumes in different countries. Convert between gallons and liters easily.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Science & Education</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Perfect for students and scientists working with liquids and volumes. Accurate conversions for experiments and calculations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Everyday Use</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between different volume units for shopping, home improvement, and daily activities. Understand product sizes better.</p>
                    </div>
                </div>
            </section>

            {/* Common Conversions Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Volume Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">From</th>
                                <th className="text-left py-3 px-4 text-gray-400">To</th>
                                <th className="text-left py-3 px-4 text-gray-400">Multiply By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMMON_CONVERSIONS.map((conv, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-gray-300">{conv.from}</td>
                                    <td className="py-2 px-4 text-gray-300">{conv.to}</td>
                                    <td className="py-2 px-4 text-yellow-400 font-mono">{conv.factor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are standard conversion factors. Our calculator uses these exact values for precise conversions.
                    </p>
                </div>
            </section>

            {/* Cooking Conversions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Cooking Measurement Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Measurement</th>
                                <th className="text-left py-3 px-4 text-gray-400">Milliliters</th>
                                <th className="text-left py-3 px-4 text-gray-400">Tablespoons</th>
                                <th className="text-left py-3 px-4 text-gray-400">Teaspoons</th>
                                <th className="text-left py-3 px-4 text-gray-400">Fluid Ounces</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COOKING_CONVERSIONS.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-yellow-400 font-medium">{row.measurement}</td>
                                    <td className="py-2 px-4 text-gray-300">{row.ml}</td>
                                    <td className="py-2 px-4 text-gray-300">{row.tbsp}</td>
                                    <td className="py-2 px-4 text-gray-300">{row.tsp}</td>
                                    <td className="py-2 px-4 text-gray-300">{row.floz}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are US customary measurements. UK/Australian cups may differ (250 ml vs 236.588 ml).
                    </p>
                </div>
            </section>

            {/* US vs UK Gallons */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">US vs UK Gallons</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-green-500/20">
                            <h4 className="text-sm font-semibold text-green-400 mb-1">🇺🇸 US Gallon</h4>
                            <p className="text-xs text-gray-400">1 US gallon = 3.785 liters</p>
                            <p className="text-xs text-gray-400">128 fluid ounces</p>
                            <p className="text-xs text-gray-400">Used in US, Latin America</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-blue-500/20">
                            <h4 className="text-sm font-semibold text-blue-400 mb-1">🇬🇧 UK Gallon</h4>
                            <p className="text-xs text-gray-400">1 UK gallon = 4.546 liters</p>
                            <p className="text-xs text-gray-400">160 fluid ounces</p>
                            <p className="text-xs text-gray-400">Used in UK, Canada (older)</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3">
                        A UK gallon is approximately 20% larger than a US gallon. Always check which standard your recipe or application uses to avoid errors.
                    </p>
                </div>
            </section>

            {/* Volume Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Volume Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-cyan-500/20">
                            <p className="text-xs text-gray-400">1 Cup</p>
                            <p className="text-sm text-cyan-400 font-bold">236.6 ml</p>
                            <p className="text-xs text-gray-500">8 fl oz</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-cyan-500/20">
                            <p className="text-xs text-gray-400">1 Quart</p>
                            <p className="text-sm text-cyan-400 font-bold">946.4 ml</p>
                            <p className="text-xs text-gray-500">4 cups</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-cyan-500/20">
                            <p className="text-xs text-gray-400">1 Gallon</p>
                            <p className="text-sm text-cyan-400 font-bold">3.785 L</p>
                            <p className="text-xs text-gray-500">4 quarts</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-cyan-500/20">
                            <p className="text-xs text-gray-400">1 Cubic Meter</p>
                            <p className="text-sm text-cyan-400 font-bold">1,000 L</p>
                            <p className="text-xs text-gray-500">264 gallons</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Volume Converter Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Volume Conversion Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember the gallon relationship:</strong> 1 gallon = 4 quarts = 8 pints = 16 cups = 128 fluid ounces. This hierarchy helps with quick mental conversions.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">For cooking, use weight when possible:</strong> Volume measurements can be inconsistent (flour compacts). For baking, weight measurements (grams) are more accurate.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check your gallon type:</strong> Always know whether you're using US or UK gallons. A 20% difference can significantly affect your calculations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use the swap button:</strong> Click 🔄 to quickly check reciprocal conversions. For example, liters to gallons and back to verify your calculations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Know your cooking equivalents:</strong> 1 cup = 16 tbsp = 48 tsp, 1 tbsp = 3 tsp. These are essential for recipe scaling.</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}