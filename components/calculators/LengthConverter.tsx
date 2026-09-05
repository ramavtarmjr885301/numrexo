"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert inches to centimeters?",
        a: "1 inch = 2.54 centimeters. Multiply inches by 2.54. Example: 10 inches × 2.54 = 25.4 cm.",
    },
    {
        q: "How to convert feet to meters?",
        a: "1 foot = 0.3048 meters. Multiply feet by 0.3048. Example: 10 feet × 0.3048 = 3.048 meters.",
    },
    {
        q: "How to convert miles to kilometers?",
        a: "1 mile = 1.60934 kilometers. Multiply miles by 1.60934. Example: 10 miles × 1.60934 = 16.0934 km.",
    },
    {
        q: "What is the metric system?",
        a: "The metric system uses meters, grams, liters. It's based on powers of 10, making conversions easy. Most countries use metric. US uses imperial (feet, pounds, gallons).",
    },
    {
        q: "How to convert meters to feet?",
        a: "1 meter = 3.28084 feet. Multiply meters by 3.28084. Example: 10 meters × 3.28084 = 32.8084 feet.",
    },
    {
        q: "What is the difference between metric and imperial systems?",
        a: "Metric: Based on powers of 10 (millimeter, centimeter, meter, kilometer). Used by 95% of countries. Imperial: US customary units (inch, foot, yard, mile).",
    },
    {
        q: "How to convert kilometers to miles?",
        a: "1 kilometer = 0.621371 miles. Multiply km by 0.621371. Example: 10 km × 0.621371 = 6.21371 miles.",
    },
    {
        q: "How to convert cm to inches manually?",
        a: "Divide cm by 2.54. Example: 100 cm ÷ 2.54 = 39.37 inches.",
    },
    {
        q: "What is the most common length unit?",
        a: "Globally: Meter (metric system) is most common. US/UK: Foot and inch for daily use.",
    },
    {
        q: "How to convert yards to meters?",
        a: "1 yard = 0.9144 meters. Multiply yards by 0.9144. Example: 10 yards × 0.9144 = 9.144 meters.",
    },
];

const LENGTH_UNITS = [
    { value: "millimeter", label: "Millimeter (mm)", toMeters: 0.001 },
    { value: "centimeter", label: "Centimeter (cm)", toMeters: 0.01 },
    { value: "meter", label: "Meter (m)", toMeters: 1 },
    { value: "kilometer", label: "Kilometer (km)", toMeters: 1000 },
    { value: "inch", label: "Inch (in)", toMeters: 0.0254 },
    { value: "foot", label: "Foot (ft)", toMeters: 0.3048 },
    { value: "yard", label: "Yard (yd)", toMeters: 0.9144 },
    { value: "mile", label: "Mile (mi)", toMeters: 1609.344 },
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
    name: "Length Converter – Convert Length Units",
    description: "Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
    url: "https://numrexo.com/conversion/length-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["8 length units", "Metric to imperial", "Instant conversion", "Precise results"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Length Converter", item: "https://numrexo.com/conversion/length-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LengthConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("meter");
    const [toUnit, setToUnit] = useState("foot");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid number");
            return;
        }

        const from = LENGTH_UNITS.find(u => u.value === fromUnit)!;
        const to = LENGTH_UNITS.find(u => u.value === toUnit)!;

        const inMeters = val * from.toMeters;
        const converted = inMeters / to.toMeters;

        setResult({
            value: val,
            fromUnit: from.label,
            toUnit: to.label,
            converted: converted.toFixed(6),
        });
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        if (value) setTimeout(convert, 10);
    };

    const resetForm = () => {
        setValue("");
        setFromUnit("meter");
        setToUnit("foot");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Length Converter</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Length Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between metric and imperial length units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Value</label>
                            <input
                                type="number"
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
                                >
                                    {LENGTH_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                            </div>
                            <button
                                onClick={swapUnits}
                                className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                            >
                                🔄
                            </button>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
                                >
                                    {LENGTH_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={convert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
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

                <ResultBox
                    title="Converted Length"
                    isEmpty={!result}
                    emptyIcon="📏"
                    emptyText="Enter value and press Convert"
                    mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-blue-400" } : undefined}
                    extraRows={[]}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Length Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles. Perfect for construction, travel, and everyday measurements.</p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Length Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">numeric value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">from unit</strong> (e.g., Meter, Foot, Inch).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">to unit</strong> you want to convert to.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the converted value.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">swap button (🔄)</strong> to quickly reverse the units.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">Reset</strong> to clear all inputs and start a new conversion.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Length Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ International Travel</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert road distances, luggage dimensions, and height requirements when traveling abroad.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Construction & DIY</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert blueprints, material dimensions, and room sizes between metric and imperial.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Sewing & Crafting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert fabric measurements and pattern dimensions for international patterns.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Education & Homework</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Check unit conversion homework and learn metric to imperial conversions.</p>
                    </div>
                </div>
            </section>

            {/* Length Units Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Length Units Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Metric System</h3>
                        <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                            <li>Millimeter (mm) = 0.001 meters</li>
                            <li>Centimeter (cm) = 0.01 meters</li>
                            <li>Meter (m) = base unit</li>
                            <li>Kilometer (km) = 1,000 meters</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Imperial System</h3>
                        <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                            <li>Inch (in) = 2.54 cm</li>
                            <li>Foot (ft) = 12 inches</li>
                            <li>Yard (yd) = 3 feet</li>
                            <li>Mile (mi) = 1,760 yards</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Real-World Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Real-World Length Conversion Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Item</th>
                                <th className="text-left py-3 px-4 text-gray-400">Imperial</th>
                                <th className="text-left py-3 px-4 text-gray-400">Metric</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Credit Card</td>
                                <td className="py-2 px-4">3.37 inches</td>
                                <td className="py-2 px-4 text-yellow-400">8.56 cm</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">A4 Paper</td>
                                <td className="py-2 px-4">11.7 × 8.3 inches</td>
                                <td className="py-2 px-4 text-yellow-400">29.7 × 21 cm</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Football Field</td>
                                <td className="py-2 px-4">100 yards</td>
                                <td className="py-2 px-4 text-yellow-400">91.44 meters</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Marathon</td>
                                <td className="py-2 px-4">26.2 miles</td>
                                <td className="py-2 px-4 text-yellow-400">42.195 km</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Average Person Height</td>
                                <td className="py-2 px-4">5'9"</td>
                                <td className="py-2 px-4 text-yellow-400">175 cm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Conversion Formulas Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Length Conversion Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">From</th>
                                <th className="text-left py-3 px-4 text-gray-400">To</th>
                                <th className="text-left py-3 px-4 text-gray-400">Formula</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Inch</td>
                                <td className="py-2 px-4">Centimeter</td>
                                <td className="py-2 px-4 text-yellow-400">× 2.54</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Foot</td>
                                <td className="py-2 px-4">Meter</td>
                                <td className="py-2 px-4 text-yellow-400">× 0.3048</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Mile</td>
                                <td className="py-2 px-4">Kilometer</td>
                                <td className="py-2 px-4 text-yellow-400">× 1.60934</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Yard</td>
                                <td className="py-2 px-4">Meter</td>
                                <td className="py-2 px-4 text-yellow-400">× 0.9144</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Meter</td>
                                <td className="py-2 px-4">Foot</td>
                                <td className="py-2 px-4 text-yellow-400">× 3.28084</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Kilometer</td>
                                <td className="py-2 px-4">Mile</td>
                                <td className="py-2 px-4 text-yellow-400">× 0.621371</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Common Length Conversions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Length Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">From</th>
                                <th className="text-left py-3 px-4 text-gray-400">To</th>
                                <th className="text-left py-3 px-4 text-gray-400">Multiply By</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Inch</td>
                                <td className="py-2 px-4">Centimeter</td>
                                <td className="py-2 px-4 text-yellow-400">2.54</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Foot</td>
                                <td className="py-2 px-4">Meter</td>
                                <td className="py-2 px-4 text-yellow-400">0.3048</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Mile</td>
                                <td className="py-2 px-4">Kilometer</td>
                                <td className="py-2 px-4 text-yellow-400">1.60934</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Yard</td>
                                <td className="py-2 px-4">Meter</td>
                                <td className="py-2 px-4 text-yellow-400">0.9144</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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