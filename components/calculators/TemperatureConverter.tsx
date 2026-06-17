"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert Celsius to Fahrenheit?",
        a: "Multiply Celsius by 9/5, then add 32. Formula: °F = (°C × 9/5) + 32. Example: 25°C × 9/5 = 45 + 32 = 77°F. This is the most common temperature conversion used in everyday life - for weather, cooking, and travel. A quick mental approximation: double Celsius and add 30 (e.g., 25°C × 2 = 50 + 30 = 80°F, close to 77°F).",
    },
    {
        q: "How to convert Fahrenheit to Celsius?",
        a: "Subtract 32 from Fahrenheit, then multiply by 5/9. Formula: °C = (°F - 32) × 5/9. Example: 77°F - 32 = 45 × 5/9 = 25°C. A quick mental approximation: subtract 30 and divide by 2 (e.g., 77°F - 30 = 47 ÷ 2 = 23.5°C, close to 25°C). This conversion is commonly needed when traveling to countries using Celsius.",
    },
    {
        q: "How to convert Celsius to Kelvin?",
        a: "Add 273.15 to Celsius. Formula: K = °C + 273.15. Example: 25°C + 273.15 = 298.15 K. Kelvin is the scientific temperature scale starting at absolute zero (0 K). It's used in physics, chemistry, and engineering. Unlike Celsius and Fahrenheit, Kelvin has no negative values. Water freezes at 273.15 K and boils at 373.15 K.",
    },
    {
        q: "What is absolute zero?",
        a: "Absolute zero is the lowest possible temperature (0 Kelvin, -273.15°C, -459.67°F). At this temperature, particles stop moving completely, and no thermal energy exists. It's the theoretical limit where entropy reaches its minimum value. Achieving absolute zero is impossible in practice, but scientists have reached temperatures just billionths of a degree above it. Absolute zero is the foundation of thermodynamics.",
    },
    {
        q: "What is normal body temperature?",
        a: "Normal human body temperature is approximately 37°C (98.6°F). However, this is an average - normal ranges from 36.1°C to 37.2°C (97°F to 99°F). Body temperature varies by: Time of day (lowest in morning, highest in afternoon), Age (older adults have lower temperatures), Activity level (increases with exercise), and Menstrual cycle (higher during ovulation). Fever starts at 38°C (100.4°F) and indicates infection or illness.",
    },
    {
        q: "What are common cooking temperatures in Celsius?",
        a: "Common oven temperatures: 120°C (250°F) - Low/slow cooking, 150°C (300°F) - Roasting vegetables, 180°C (350°F) - Standard baking (cakes, cookies), 200°C (400°F) - Roasting meats, 220°C (425°F) - Pizza and bread, 240°C (475°F) - Broiling. Meat temperatures (internal): Chicken: 74°C (165°F), Pork: 63°C (145°F), Beef (medium): 63°C (145°F), Fish: 63°C (145°F).",
    },
    {
        q: "What is the freezing and boiling point of water?",
        a: "Water freezes at 0°C (32°F, 273.15 K) and boils at 100°C (212°F, 373.15 K) at standard atmospheric pressure (sea level). These values change with altitude - at higher elevations, water boils at lower temperatures (e.g., in Denver, water boils at 95°C). The freezing point can be lowered with salt or other solutes (freezing point depression). These reference points define the Celsius scale.",
    },
    {
        q: "What is the difference between Celsius and Fahrenheit?",
        a: "Celsius (metric) uses water's freezing (0°C) and boiling (100°C) points as 0 and 100. Fahrenheit (imperial) sets these at 32°F and 212°F (180-degree difference). Conversion: °F = (°C × 1.8) + 32. Key differences: 1 degree Celsius = 1.8 degrees Fahrenheit (larger unit), Celsius is used worldwide (except US, some Caribbean nations), Fahrenheit is more precise for weather (finer gradations). At -40°, both scales are equal (-40°C = -40°F).",
    },
    {
        q: "What is Kelvin used for?",
        a: "Kelvin is the SI base unit for temperature, used primarily in science: Physics (thermodynamics calculations), Chemistry (gas laws, reaction rates), Astronomy (star temperatures, cosmic microwave background), Engineering (heat transfer, material science). Key Kelvin facts: 0 K = absolute zero, no negative values (starts at 0), same scale as Celsius (1K = 1°C). Examples: Room temperature ≈ 293 K, Human body ≈ 310 K, Sun's surface ≈ 5,778 K, Boiling water ≈ 373 K.",
    },
    {
        q: "How do I convert between all three temperature scales?",
        a: "Celsius to Fahrenheit: °F = (°C × 9/5) + 32, Celsius to Kelvin: K = °C + 273.15, Fahrenheit to Celsius: °C = (°F - 32) × 5/9, Kelvin to Celsius: °C = K - 273.15, Fahrenheit to Kelvin: K = (°F + 459.67) × 5/9, Kelvin to Fahrenheit: °F = (K × 9/5) - 459.67. Our converter handles all these conversions automatically. Remember: -40°C = -40°F (the crossover point).",
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

    const resetForm = () => {
        setValue("");
        setFromUnit("celsius");
        setToUnit("fahrenheit");
        setResult(null);
    };

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
        
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">
                <span itemProp="name">Home</span> {/* ✅ Span added */}
            </a>
            <meta itemProp="position" content="1" />
        </li>
        
        <li className="text-gray-700">/</li>
        
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">
                <span itemProp="name">Conversion Calculators</span> {/* ✅ Span added */}
            </a>
            <meta itemProp="position" content="2" />
        </li>
        
        <li className="text-gray-700">/</li>
        
        <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-300">Temperature Converter</span> {/* ✅ Span added */}
            <meta itemProp="position" content="3" />
        </li>
        
    </ol>
</nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Temperature Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between Celsius, Fahrenheit, and Kelvin</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Temperature</label>
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
                                    onChange={(e) => setFromUnit(e.target.value as any)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                >
                                    <option value="celsius">Celsius (°C)</option>
                                    <option value="fahrenheit">Fahrenheit (°F)</option>
                                    <option value="kelvin">Kelvin (K)</option>
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
                                    onChange={(e) => setToUnit(e.target.value as any)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                >
                                    <option value="celsius">Celsius (°C)</option>
                                    <option value="fahrenheit">Fahrenheit (°F)</option>
                                    <option value="kelvin">Kelvin (K)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={convert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all"
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
                    title="Converted Temperature"
                    isEmpty={!result}
                    emptyIcon="🌡️"
                    emptyText="Enter temperature and press Convert"
                    mainResult={result ? {
                        label: `${result.value}${result.fromUnit} =`,
                        value: `${result.converted}${result.toUnit}`,
                        color: "text-orange-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Original Value", value: `${result.value}${result.fromUnit}` },
                        { label: "Converted Value", value: `${result.converted}${result.toUnit}` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Temperature Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Temperature Converter</strong> is a free, accurate tool for converting temperatures between Celsius, Fahrenheit, and Kelvin. Whether you're checking the weather, following a recipe, or doing scientific calculations, this converter provides instant, precise results.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Temperature conversion is essential in many fields: Cooking (ovens and recipes use different scales), Weather (different countries use Celsius or Fahrenheit), Science and engineering (Kelvin is the standard), Travel (understanding local weather), and Medicine (body temperature monitoring).
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our converter handles all three scales with high precision. Simply enter your temperature, select the source and target units, and get instant results with detailed conversion information.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Temperature Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">temperature value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">"From"</strong> unit (Celsius, Fahrenheit, or Kelvin).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">"To"</strong> unit (Celsius, Fahrenheit, or Kelvin).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">"Swap"</strong> (🔄) to quickly reverse the conversion.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Temperature Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">✓ Cooking & Baking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert oven temperatures for international recipes. Know the right temperature for baking, roasting, and candy-making.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Weather & Travel</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand temperatures in different countries. Convert weather forecasts when traveling internationally.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Science & Education</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Perfect for students, scientists, and engineers working with temperature in physics, chemistry, and biology.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Health & Medicine</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert body temperature readings between Celsius and Fahrenheit. Understand fever thresholds and normal ranges.</p>
                    </div>
                </div>
            </section>

            {/* Temperature References */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Temperature References</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                                <th className="text-left py-3 px-4 text-gray-400">Celsius</th>
                                <th className="text-left py-3 px-4 text-gray-400">Fahrenheit</th>
                                <th className="text-left py-3 px-4 text-gray-400">Kelvin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Absolute Zero</td>
                                <td className="py-2 px-4 text-gray-400">-273.15°C</td>
                                <td className="py-2 px-4 text-gray-400">-459.67°F</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">0 K</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Water Freezes</td>
                                <td className="py-2 px-4 text-blue-400">0°C</td>
                                <td className="py-2 px-4 text-blue-400">32°F</td>
                                <td className="py-2 px-4 text-gray-400">273.15 K</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Room Temperature</td>
                                <td className="py-2 px-4 text-green-400">20-22°C</td>
                                <td className="py-2 px-4 text-green-400">68-72°F</td>
                                <td className="py-2 px-4 text-gray-400">293-295 K</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Body Temperature</td>
                                <td className="py-2 px-4 text-yellow-400">37°C</td>
                                <td className="py-2 px-4 text-yellow-400">98.6°F</td>
                                <td className="py-2 px-4 text-gray-400">310.15 K</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Summer Day</td>
                                <td className="py-2 px-4 text-orange-400">30°C</td>
                                <td className="py-2 px-4 text-orange-400">86°F</td>
                                <td className="py-2 px-4 text-gray-400">303.15 K</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Water Boils</td>
                                <td className="py-2 px-4 text-red-400">100°C</td>
                                <td className="py-2 px-4 text-red-400">212°F</td>
                                <td className="py-2 px-4 text-gray-400">373.15 K</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Sun's Surface</td>
                                <td className="py-2 px-4 text-red-500">5,505°C</td>
                                <td className="py-2 px-4 text-red-500">9,941°F</td>
                                <td className="py-2 px-4 text-yellow-400">5,778 K</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are approximate values. Actual temperatures can vary based on conditions.
                    </p>
                </div>
            </section>

            {/* Cooking Temperatures */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Cooking Temperatures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-orange-400 mb-2">🔥 Oven Temperatures</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• <span className="text-gray-300">120°C (250°F):</span> Low/slow cooking</li>
                            <li>• <span className="text-gray-300">150°C (300°F):</span> Roasting vegetables</li>
                            <li>• <span className="text-gray-300">180°C (350°F):</span> Standard baking</li>
                            <li>• <span className="text-gray-300">200°C (400°F):</span> Roasting meats</li>
                            <li>• <span className="text-gray-300">220°C (425°F):</span> Pizza and bread</li>
                            <li>• <span className="text-gray-300">240°C (475°F):</span> Broiling</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-green-400 mb-2">🥩 Internal Meat Temperatures</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• <span className="text-gray-300">Chicken:</span> 74°C (165°F)</li>
                            <li>• <span className="text-gray-300">Pork:</span> 63°C (145°F)</li>
                            <li>• <span className="text-gray-300">Beef (medium):</span> 63°C (145°F)</li>
                            <li>• <span className="text-gray-300">Fish:</span> 63°C (145°F)</li>
                            <li>• <span className="text-gray-300">Veal:</span> 63°C (145°F)</li>
                            <li>• <span className="text-gray-300">Lamb:</span> 63°C (145°F)</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">* Always use a meat thermometer for food safety. USDA recommends these minimum temperatures.</p>
            </section>

            {/* Conversion Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Temperature Conversion Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember key reference points:</strong> 0°C = 32°F (water freezes), 100°C = 212°F (water boils), 37°C = 98.6°F (body temp), -40°C = -40°F (crossover point).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Mental approximation for cooking:</strong> Celsius to Fahrenheit: multiply by 2 and add 30 (e.g., 180°C × 2 = 360 + 30 = 390°F, close to 350°F).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Kelvin for science:</strong> Kelvin = Celsius + 273.15. No negative values in Kelvin makes it ideal for scientific calculations (e.g., gas laws, thermodynamics).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check weather conversion:</strong> 20°C = 68°F (pleasant), 30°C = 86°F (warm), 10°C = 50°F (chilly). Good benchmarks for travel planning.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Altitude affects boiling point:</strong> At higher altitudes, water boils at lower temperatures. Use our converter to adjust cooking times for your elevation.</span>
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