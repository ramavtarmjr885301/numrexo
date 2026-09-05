"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert km/h to mph?",
        a: "1 km/h = 0.621371 mph. Multiply km/h by 0.621371. Example: 100 km/h × 0.621371 = 62.14 mph. This is the most common speed conversion for drivers traveling between countries using different speed units. Many European cars display speeds in km/h, while UK and US use mph. Remember: 100 km/h is approximately 62 mph, a good mental reference for quick conversions.",
    },
    {
        q: "How to convert mph to km/h?",
        a: "1 mph = 1.60934 km/h. Multiply mph by 1.60934. Example: 60 mph × 1.60934 = 96.56 km/h. For quick mental conversion, multiply mph by 1.6. Example: 60 mph × 1.6 = 96 km/h (very close to the exact 96.56 km/h). This is useful when driving in countries that use metric system.",
    },
    {
        q: "What is the speed of sound?",
        a: "The speed of sound (Mach 1) is approximately 1,235 km/h (767 mph) at sea level at 20°C (68°F). It varies with temperature (higher temperature = faster speed) and altitude (decreases with altitude). At 0°C, it's 1,194 km/h (742 mph). At 15°C, it's 1,225 km/h (761 mph). The speed of sound is used in aviation to measure aircraft speed in Mach numbers.",
    },
    {
        q: "What is a knot?",
        a: "A knot (kn) is one nautical mile per hour (1.852 km/h or 1.151 mph). Used for maritime and aviation navigation because it's based on the Earth's circumference. 1 nautical mile = 1 minute of latitude = 1.852 km. Knots are preferred in aviation and shipping because they directly relate to the Earth's coordinates. For reference, a typical commercial aircraft cruises at 450-500 knots, while a fast ferry might travel at 30-40 knots.",
    },
    {
        q: "What is the difference between m/s and km/h?",
        a: "m/s (meters per second) is the SI unit for speed, commonly used in physics and science. km/h is more practical for everyday use like driving. Conversion: 1 m/s = 3.6 km/h. Example: 10 m/s × 3.6 = 36 km/h. To convert km/h to m/s, divide by 3.6. Example: 72 km/h ÷ 3.6 = 20 m/s. m/s is often used in sports science and weather reports.",
    },
    {
        q: "What is the speed of light?",
        a: "The speed of light in vacuum is exactly 299,792,458 m/s, approximately 1,079,252,848.8 km/h or 670,616,629 mph. It's the fastest speed possible in the universe according to Einstein's theory of relativity. At this speed, light could circle the Earth 7.5 times in one second. In everyday terms, 1 light-year = the distance light travels in one year ≈ 9.46 trillion km. This is the cosmic speed limit.",
    },
    {
        q: "How fast can humans run?",
        a: "Usain Bolt holds the world record at 44.72 km/h (27.8 mph or 12.42 m/s) over 100 meters. Average running speeds: Sprinting: 15-20 mph (24-32 km/h), Jogging: 4-6 mph (6-10 km/h), Walking: 3-4 mph (5-6.5 km/h), Marathon pace: 6-8 mph (10-13 km/h). Human speed is limited by muscle contraction speed and ground contact time. Cheetahs can reach 100 km/h, showing how animals have evolved for speed.",
    },
    {
        q: "What are typical vehicle speeds?",
        a: "Typical vehicle speeds: City driving: 30-50 km/h (20-30 mph), Highway: 100-120 km/h (60-75 mph), High-speed rail: 200-350 km/h (125-220 mph), Commercial aircraft cruising: 800-900 km/h (500-560 mph), Supersonic aircraft: Mach 2+ (over 2,000 km/h), Formula 1 car: 370+ km/h (230+ mph), Bullet train: 320 km/h (200 mph). Speed limits vary by country: UK motorway: 70 mph, Germany autobahn: no limit (recommended 130 km/h), US interstate: 65-80 mph.",
    },
    {
        q: "How to convert between m/s and mph?",
        a: "To convert m/s to mph: multiply by 2.23694. Example: 10 m/s × 2.23694 = 22.37 mph. To convert mph to m/s: divide by 2.23694. Example: 60 mph ÷ 2.23694 = 26.82 m/s. This conversion is useful for comparing human running speeds (often measured in m/s) with vehicle speeds (often measured in mph). A sprint of 10 m/s is roughly 22.37 mph.",
    },
    {
        q: "What is the difference between speed and velocity?",
        a: "Speed is a scalar quantity - it only has magnitude (how fast something is moving). Velocity is a vector quantity - it has both magnitude AND direction. Example: '60 km/h' is speed, but '60 km/h north' is velocity. Speed is always positive, while velocity can be positive or negative depending on direction. In everyday conversation, people often use 'speed' and 'velocity' interchangeably, but in physics they have distinct meanings. Our converter works for both speed and velocity magnitude.",
    },
];

const SPEED_UNITS = [
    { value: "kmh", label: "Kilometers per hour (km/h)", toKmh: 1, emoji: "🚗" },
    { value: "mph", label: "Miles per hour (mph)", toKmh: 1.60934, emoji: "🇺🇸" },
    { value: "ms", label: "Meters per second (m/s)", toKmh: 3.6, emoji: "🏃" },
    { value: "knot", label: "Knot (kn)", toKmh: 1.852, emoji: "⛵" },
    { value: "fts", label: "Feet per second (ft/s)", toKmh: 1.09728, emoji: "✈️" },
];

const SPEED_REFERENCES = [
    { item: "Walking speed", speed: "5 km/h", emoji: "🚶" },
    { item: "Jogging speed", speed: "8-10 km/h", emoji: "🏃" },
    { item: "Usain Bolt record", speed: "44.72 km/h", emoji: "⚡" },
    { item: "City driving", speed: "30-50 km/h", emoji: "🏙️" },
    { item: "Highway speed", speed: "100-120 km/h", emoji: "🛣️" },
    { item: "Sound barrier (Mach 1)", speed: "1,235 km/h", emoji: "💥" },
    { item: "Commercial aircraft", speed: "800-900 km/h", emoji: "🛩️" },
    { item: "Speed of light", speed: "1.08 billion km/h", emoji: "💡" },
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
    url: "https://numrexo.com/conversion/speed-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["5 speed units", "km/h to mph", "Driving speed", "Aviation knots"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Speed Converter", item: "https://numrexo.com/conversion/speed-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpeedConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("kmh");
    const [toUnit, setToUnit] = useState("mph");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setValue("");
        setFromUnit("kmh");
        setToUnit("mph");
        setResult(null);
    };

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
            alert("Please enter a valid positive number");
            return;
        }

        const from = SPEED_UNITS.find(u => u.value === fromUnit)!;
        const to = SPEED_UNITS.find(u => u.value === toUnit)!;
        const inKmh = val * from.toKmh;
        const converted = inKmh / to.toKmh;

        setResult({
            value: val,
            fromUnit: from.label,
            fromUnitShort: from.value,
            toUnit: to.label,
            toUnitShort: to.value,
            converted: converted.toFixed(4),
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
                        <span itemProp="name" className="text-gray-300">Speed Converter</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Speed Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between speed measurement units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Value</label>
                            <input
                                type="number"
                                placeholder="100"
                                step="any"
                                min="0"
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
                                    {SPEED_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={swapUnits}
                                className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all text-xl"
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
                                    {SPEED_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={convert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold hover:shadow-lg transition-all"
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
                    title="Converted Speed"
                    isEmpty={!result}
                    emptyIcon="🚀"
                    emptyText="Enter value and press Convert"
                    mainResult={result ? {
                        label: `${result.fromEmoji} ${result.value} ${result.fromUnitShort} =`,
                        value: `${result.converted} ${result.toUnitShort}`,
                        color: "text-yellow-400"
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
                <h2 className="text-xl font-semibold text-white mb-3">About Speed Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Speed Converter</strong> is a versatile tool that converts between different speed measurement units including kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), knots (kn), and feet per second (ft/s). Whether you're driving, running, flying, or sailing, this converter provides instant, accurate conversions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Speed conversion is essential in many fields: Driving between countries with different speed units, Aviation and maritime navigation (knots), Sports science (m/s for running speeds), Physics and engineering (m/s is the SI unit), Weather reporting (wind speeds in km/h or mph).
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our converter handles all common speed units with high precision. Simply enter your value, select the source and target units, and get instant results with clear, easy-to-read output.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Speed Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">speed value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">"From"</strong> unit (your current unit).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">"To"</strong> unit (your target unit).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">"Swap"</strong> button (🔄) to quickly reverse the conversion.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Speed Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ International Travel</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between km/h and mph when driving in different countries. Understand speed limits and vehicle speeds instantly.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Aviation & Maritime</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between knots, km/h, and mph for flight planning, navigation, and weather reporting. Essential for pilots and sailors.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Sports & Fitness</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert running speeds between m/s and km/h. Track your performance and compare with international standards.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Science & Engineering</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between SI units (m/s) and practical units (km/h, mph) for physics calculations, engineering projects, and scientific research.</p>
                    </div>
                </div>
            </section>

            {/* Common Conversions Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Speed Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">From</th>
                                <th className="text-left py-3 px-4 text-gray-400">To</th>
                                <th className="text-left py-3 px-4 text-gray-400">Multiply By</th>
                                <th className="text-left py-3 px-4 text-gray-400">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">km/h</td>
                                <td className="py-2 px-4 text-gray-300">mph</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">0.621371</td>
                                <td className="py-2 px-4 text-gray-400">100 km/h → 62.14 mph</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">mph</td>
                                <td className="py-2 px-4 text-gray-300">km/h</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">1.60934</td>
                                <td className="py-2 px-4 text-gray-400">60 mph → 96.56 km/h</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">m/s</td>
                                <td className="py-2 px-4 text-gray-300">km/h</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">3.6</td>
                                <td className="py-2 px-4 text-gray-400">10 m/s → 36 km/h</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">km/h</td>
                                <td className="py-2 px-4 text-gray-300">m/s</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">0.277778</td>
                                <td className="py-2 px-4 text-gray-400">72 km/h → 20 m/s</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">knot</td>
                                <td className="py-2 px-4 text-gray-300">km/h</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">1.852</td>
                                <td className="py-2 px-4 text-gray-400">30 knots → 55.56 km/h</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">knot</td>
                                <td className="py-2 px-4 text-gray-300">mph</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">1.15078</td>
                                <td className="py-2 px-4 text-gray-400">30 knots → 34.52 mph</td>
                            </tr>
                            <tr className="hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">mph</td>
                                <td className="py-2 px-4 text-gray-300">m/s</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">0.44704</td>
                                <td className="py-2 px-4 text-gray-400">60 mph → 26.82 m/s</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are standard conversion factors. Our calculator uses precise values for accurate results.
                    </p>
                </div>
            </section>

            {/* Speed References */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Speed Reference Guide</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SPEED_REFERENCES.map((ref, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-yellow-500/30 transition-all">
                            <div className="text-2xl mb-1">{ref.emoji}</div>
                            <p className="text-xs text-gray-300 font-medium">{ref.item}</p>
                            <p className="text-sm text-yellow-400 font-mono">{ref.speed}</p>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">* Reference speeds are approximate and may vary.</p>
            </section>

            {/* Conversion Factors */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Understanding Speed Conversion Factors</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-yellow-400 mb-2">📊 Key Facts</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• 1 km/h = 0.2778 m/s</li>
                                <li>• 1 m/s = 3.6 km/h</li>
                                <li>• 1 mph = 1.609 km/h</li>
                                <li>• 1 knot = 1.852 km/h</li>
                                <li>• 1 ft/s = 0.3048 m/s</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 Quick Mental Math</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• km/h → mph: multiply by 0.6 (approx)</li>
                                <li>• mph → km/h: multiply by 1.6 (approx)</li>
                                <li>• m/s → km/h: multiply by 3.6</li>
                                <li>• km/h → m/s: divide by 3.6</li>
                                <li>• 100 km/h ≈ 62 mph</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Speed Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Speed Conversion Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-yellow-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember common conversions:</strong> 100 km/h = 62.14 mph, 60 mph = 96.56 km/h. These are good benchmarks for quick mental estimation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-yellow-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use approximate factors:</strong> For quick estimates, multiply km/h by 0.6 for mph, and mph by 1.6 for km/h. Close enough for practical purposes.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-yellow-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Know your units:</strong> m/s is for science, km/h for driving in most countries, mph for UK/US driving, knots for aviation/maritime. Use the right unit for your context.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-yellow-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check your speedometer:</strong> Many modern cars can switch between km/h and mph. Know which one your speedometer displays, especially when driving abroad.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-yellow-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Weather reports:</strong> Wind speeds are often reported in km/h, mph, or knots depending on the country and context. Use our converter to understand wind conditions.</span>
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