"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert kilograms to pounds?",
        a: "1 kilogram = 2.20462 pounds. Multiply kilograms by 2.20462. Example: 10 kg × 2.20462 = 22.0462 lbs. For quick mental math: multiply by 2.2 (e.g., 10 kg × 2.2 = 22 lbs, close enough for daily use). This conversion is commonly needed for fitness tracking, travel luggage, and international shipping.",
    },
    {
        q: "How to convert pounds to kilograms?",
        a: "1 pound = 0.453592 kilograms. Multiply pounds by 0.453592. Example: 10 lbs × 0.453592 = 4.53592 kg. For quick estimation: divide by 2.2 (e.g., 10 lbs ÷ 2.2 = 4.54 kg, very close). This is useful when converting body weight or following international recipes.",
    },
    {
        q: "How many grams in an ounce?",
        a: "1 ounce = 28.3495 grams. Multiply ounces by 28.3495. Example: 5 oz × 28.3495 = 141.7475 g. For quick mental math: multiply by 28 (5 oz × 28 = 140 g, close enough). This conversion is essential for cooking, baking, and measuring precious metals.",
    },
    {
        q: "What is the difference between mass and weight?",
        a: "Mass is the amount of matter in an object (measured in kg, g, lbs). Weight is the force of gravity on that mass (measured in Newtons). On Earth, we use them interchangeably because gravity is constant. However, on the Moon, your mass stays the same but your weight is 1/6 of what it is on Earth. Our converter measures mass, which is correct for everyday use.",
    },
    {
        q: "How to convert between metric and imperial weight units?",
        a: "Metric system (grams, kilograms, tonnes) is base-10 and used worldwide. Imperial system (ounces, pounds, stones) is used in the US, UK, and a few other countries. Key conversions: 1 kg = 2.20462 lbs, 1 lb = 0.453592 kg, 1 oz = 28.3495 g, 1 stone = 6.35029 kg. Our converter handles all these conversions automatically.",
    },
    {
        q: "What is a stone in weight measurement?",
        a: "A stone (st) is a British imperial weight unit equal to 14 pounds (6.35029 kg). It's commonly used in the UK and Ireland to measure body weight. Example: 10 stone = 140 lbs = 63.5 kg. Our converter supports stones for users in the UK and Ireland.",
    },
    {
        q: "What is the difference between ounce and troy ounce?",
        a: "A standard ounce (avoirdupois) = 28.3495 grams, used for most everyday measurements. A troy ounce = 31.1035 grams, used exclusively for precious metals (gold, silver, platinum). A troy ounce is about 10% heavier than a standard ounce. Our converter uses standard ounces for everyday weight conversions.",
    },
    {
        q: "How to convert cooking measurements by weight?",
        a: "Common cooking weight conversions: 1 cup of flour = 120-150g (depends on how it's scooped), 1 cup of sugar = 200g, 1 stick of butter = 113g, 1 ounce of chocolate = 28g. For accuracy in baking, use weight measurements (grams) rather than volume (cups). Our weight converter helps you convert between grams, ounces, and pounds for recipes.",
    },
    {
        q: "What is the average weight of common objects?",
        a: "Average weights: Apple: 150-200g, Banana: 120-150g, Loaf of bread: 500-800g, Laptop: 1.5-2.5kg, Bowling ball: 6-7kg, Human adult: 60-80kg, Car: 1,200-2,000kg, Elephant: 4,000-6,000kg. Our weight converter helps you understand these weights in different units.",
    },
    {
        q: "How to convert body weight between kg and stone?",
        a: "To convert kg to stone: weight in kg ÷ 6.35029. Example: 70 kg ÷ 6.35029 = 11.02 stone. To convert stone to kg: weight in stone × 6.35029. Example: 11 stone × 6.35029 = 69.85 kg. This is commonly needed for UK users tracking their weight, as body weight is often measured in stones and pounds.",
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
    name: "Weight Converter – Convert Weight Units",
    description: "Convert between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.",
    url: "https://numrexo.com/conversion/weight-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 weight units", "Metric to imperial", "Kitchen to body weight", "Instant conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Weight Converter", item: "https://numrexo.com/conversion/weight-converter" },
    ],
});

const WEIGHT_UNITS = [
    { value: "milligram", label: "Milligram (mg)", toKg: 0.000001, emoji: "⚕️" },
    { value: "gram", label: "Gram (g)", toKg: 0.001, emoji: "🧪" },
    { value: "kilogram", label: "Kilogram (kg)", toKg: 1, emoji: "⚖️" },
    { value: "tonne", label: "Tonne (t)", toKg: 1000, emoji: "🏗️" },
    { value: "ounce", label: "Ounce (oz)", toKg: 0.0283495, emoji: "📦" },
    { value: "pound", label: "Pound (lb)", toKg: 0.453592, emoji: "💪" },
    { value: "stone", label: "Stone (st)", toKg: 6.35029, emoji: "🇬🇧" },
];

const COMMON_CONVERSIONS = [
    { from: "1 Kilogram", to: "Pounds", factor: "2.20462" },
    { from: "1 Pound", to: "Kilograms", factor: "0.453592" },
    { from: "1 Gram", to: "Ounces", factor: "0.035274" },
    { from: "1 Ounce", to: "Grams", factor: "28.3495" },
    { from: "1 Stone", to: "Kilograms", factor: "6.35029" },
    { from: "1 Tonne", to: "Kilograms", factor: "1000" },
    { from: "1 Milligram", to: "Grams", factor: "0.001" },
    { from: "1 Pound", to: "Ounces", factor: "16" },
];

const WEIGHT_REFERENCES = [
    { item: "🍎 Apple", weight: "150-200g", inKg: "0.15-0.2 kg", inLbs: "0.33-0.44 lbs" },
    { item: "🍌 Banana", weight: "120-150g", inKg: "0.12-0.15 kg", inLbs: "0.26-0.33 lbs" },
    { item: "🍞 Loaf of Bread", weight: "500-800g", inKg: "0.5-0.8 kg", inLbs: "1.1-1.76 lbs" },
    { item: "💻 Laptop", weight: "1.5-2.5kg", inKg: "1.5-2.5 kg", inLbs: "3.3-5.5 lbs" },
    { item: "🎳 Bowling Ball", weight: "6-7kg", inKg: "6-7 kg", inLbs: "13.2-15.4 lbs" },
    { item: "🧑 Human Adult", weight: "60-80kg", inKg: "60-80 kg", inLbs: "132-176 lbs" },
    { item: "🚗 Car", weight: "1,200-2,000kg", inKg: "1,200-2,000 kg", inLbs: "2,646-4,409 lbs" },
    { item: "🐘 Elephant", weight: "4,000-6,000kg", inKg: "4,000-6,000 kg", inLbs: "8,818-13,228 lbs" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WeightConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("kilogram");
    const [toUnit, setToUnit] = useState("pound");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setValue("");
        setFromUnit("kilogram");
        setToUnit("pound");
        setResult(null);
    };

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid number");
            return;
        }

        const from = WEIGHT_UNITS.find(u => u.value === fromUnit)!;
        const to = WEIGHT_UNITS.find(u => u.value === toUnit)!;
        const inKg = val * from.toKg;
        const converted = inKg / to.toKg;

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
                        <span itemProp="name" className="text-gray-300">Weight Converter</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Weight Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between metric and imperial weight units</p>
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
                                    {WEIGHT_UNITS.map(u => (
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
                                    {WEIGHT_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={convert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
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
                    title="Converted Weight"
                    isEmpty={!result}
                    emptyIcon="⚖️"
                    emptyText="Enter value and press Convert"
                    mainResult={result ? {
                        label: `${result.fromEmoji} ${result.value} ${result.fromUnit} =`,
                        value: `${result.converted} ${result.toUnit}`,
                        color: "text-green-400"
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
                <h2 className="text-xl font-semibold text-white mb-3">About Weight Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Weight Converter</strong> is a comprehensive tool for converting between different weight measurement units. It handles milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Weight conversion is essential in many fields: Cooking and baking (recipe scaling), Fitness and health (body weight tracking), Shipping and logistics (package weights), Science and laboratory work, International trade and commerce.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our converter supports 7 weight units with high precision (6 decimal places). Whether you're converting kitchen measurements, tracking your fitness progress, or calculating shipping weights, you'll get accurate results instantly.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Weight Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">weight value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">"From"</strong> unit (milligram, gram, kilogram, tonne, ounce, pound, or stone).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">"To"</strong> unit (milligram, gram, kilogram, tonne, ounce, pound, or stone).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">"Swap"</strong> (🔄) to quickly reverse the conversion.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Weight Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Cooking & Baking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert recipes between grams, ounces, and pounds. Perfect for following international recipes with precision.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Fitness & Health</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track your body weight in kilograms, pounds, or stones. Convert between units for fitness goals and progress tracking.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Shipping & Logistics</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate package weights in different units. Convert between metric and imperial for international shipping.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Science & Education</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Perfect for students and scientists working with weight and mass. Accurate conversions for experiments and calculations.</p>
                    </div>
                </div>
            </section>

            {/* Common Conversions Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Weight Conversions</h2>
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

            {/* Weight Reference Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Everyday Object Weights</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Object</th>
                                <th className="text-left py-3 px-4 text-gray-400">Weight Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">In Kilograms</th>
                                <th className="text-left py-3 px-4 text-gray-400">In Pounds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {WEIGHT_REFERENCES.map((ref, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-gray-300">{ref.item}</td>
                                    <td className="py-2 px-4 text-gray-400">{ref.weight}</td>
                                    <td className="py-2 px-4 text-yellow-400">{ref.inKg}</td>
                                    <td className="py-2 px-4 text-gray-400">{ref.inLbs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are approximate average weights. Actual weights vary by brand, model, and specific item.
                    </p>
                </div>
            </section>

            {/* Metric vs Imperial Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Metric vs Imperial Weight Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-green-500/20">
                            <h4 className="text-sm font-semibold text-green-400 mb-2">📏 Metric System</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• <span className="text-gray-300">Milligram (mg):</span> 1/1,000,000 kg</li>
                                <li>• <span className="text-gray-300">Gram (g):</span> 1/1,000 kg</li>
                                <li>• <span className="text-gray-300">Kilogram (kg):</span> Base unit</li>
                                <li>• <span className="text-gray-300">Tonne (t):</span> 1,000 kg</li>
                                <li>• Used in most countries worldwide</li>
                                <li>• Base 10 system (easy to convert)</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-blue-500/20">
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">🇺🇸 Imperial/US Customary</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• <span className="text-gray-300">Ounce (oz):</span> 28.35 g</li>
                                <li>• <span className="text-gray-300">Pound (lb):</span> 0.454 kg</li>
                                <li>• <span className="text-gray-300">Stone (st):</span> 6.35 kg</li>
                                <li>• Used mainly in USA, UK, Ireland</li>
                                <li>• Based on historical measurements</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3">
                        Our converter handles both systems seamlessly. Select any unit from either system and convert instantly.
                    </p>
                </div>
            </section>

            {/* Weight Unit Facts */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Interesting Weight Facts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-green-500/30 transition-all">
                        <div className="text-2xl mb-1">⚖️</div>
                        <h4 className="text-sm font-semibold text-gray-200">Kilogram Standard</h4>
                        <p className="text-xs text-gray-400">The kilogram was once defined by a physical object (Le Grand K). Since 2019, it's based on the Planck constant - a fundamental physics constant.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-green-500/30 transition-all">
                        <div className="text-2xl mb-1">📦</div>
                        <h4 className="text-sm font-semibold text-gray-200">Avoirdupois vs Troy</h4>
                        <p className="text-xs text-gray-400">The avoirdupois pound (used for most things) = 16 oz. The troy pound (used for precious metals) = 12 troy oz. A troy ounce is heavier than a standard ounce.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-green-500/30 transition-all">
                        <div className="text-2xl mb-1">🇬🇧</div>
                        <h4 className="text-sm font-semibold text-gray-200">Stone Age</h4>
                        <p className="text-xs text-gray-400">The stone as a weight unit comes from the practice of using literal stones as weights. It's still used in the UK and Ireland for body weight.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-green-500/30 transition-all">
                        <div className="text-2xl mb-1">🚀</div>
                        <h4 className="text-sm font-semibold text-gray-200">Weight on Other Planets</h4>
                        <p className="text-xs text-gray-400">Your mass is constant, but your weight changes with gravity. You'd weigh 1/6 of your Earth weight on the Moon, and 2.5x more on Jupiter!</p>
                    </div>
                </div>
            </section>

            {/* Weight Converter Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Weight Conversion Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember key conversions:</strong> 1 kg = 2.2046 lbs, 1 lb = 0.4536 kg, 1 oz = 28.35 g, 1 stone = 14 lbs. These are the most commonly used conversions.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use mental math for quick estimates:</strong> Multiply kg by 2.2 for lbs (close enough). Divide lbs by 2.2 for kg. For ounces, multiply grams by 28 for rough estimates.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Cooking conversions:</strong> 1 cup of flour = 120-150g, 1 cup of sugar = 200g. For accuracy in baking, always use weight measurements (grams) rather than volume.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use the swap button:</strong> Click 🔄 to quickly check reciprocal conversions. For example, kg to lbs and back to verify your calculations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Know your unit abbreviations:</strong> mg (milligram), g (gram), kg (kilogram), t (tonne), oz (ounce), lb (pound), st (stone). These are used worldwide.</span>
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