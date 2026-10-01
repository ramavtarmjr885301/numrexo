"use client";

import { useEffect, useState } from "react";
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
    {
        q: "How to convert BTU to watts?",
        a: "1 BTU per hour = 0.293071 watts. Multiply BTU/h by 0.293071 to get watts. Example: 1000 BTU/h × 0.293071 = 293.07 W.",
    },
    {
        q: "What is the power consumption of common appliances?",
        a: "LED bulb: 10W, Laptop: 50W, TV: 100-200W, Refrigerator: 150W, AC: 1500W, Microwave: 1000W, Washing machine: 500W, Water heater: 2000W, Iron: 1000W.",
    },
    {
        q: "How to calculate electrical power from voltage and current?",
        a: "Power (W) = Voltage (V) × Current (A). Example: 230V × 5A = 1150W. For AC circuits, add power factor: P = V × I × PF (power factor usually 0.8-0.95).",
    },
    {
        q: "How do I estimate my electricity bill from appliance wattage?",
        a: "Energy (kWh) = Power (kW) × Hours used. Example: a 1500W AC run for 5 hours = 1.5 kW × 5h = 7.5 kWh. Multiply the kWh by your electricity board's per-unit rate to estimate the cost — check a recent bill for your exact rate, since it varies by state and slab.",
    },
    {
        q: "Why do generators and UPS systems list both VA and watts?",
        a: "VA (volt-amperes) is apparent power; watts is real power. For purely resistive loads they're equal, but for motors and electronics the power factor makes watts lower than VA — commonly watts ≈ VA × 0.8. Sizing a generator or UPS on VA alone can under-estimate the load it can actually run; check both figures against your equipment's rated wattage.",
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
    url: "https://numrexo.com/conversion/power-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["5 power units", "Watts to HP", "kW to HP", "Electrical and mechanical"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Power Converter", item: "https://numrexo.com/conversion/power-converter" },
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
        if (isNaN(val)) { setResult(null); return; }

        const from = POWER_UNITS.find(u => u.value === fromUnit)!;
        const to = POWER_UNITS.find(u => u.value === toUnit)!;
        const inWatt = val * from.toWatt;
        const converted = inWatt / to.toWatt;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(6) });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { convert(); }, [value, fromUnit, toUnit]);

    const swapUnits = () => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); if (value) setTimeout(convert, 10); };

    const resetForm = () => {
        setValue("");
        setFromUnit("kilowatt");
        setToUnit("horsepower");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/conversion" itemProp="item" className="hover:text-ink-soft">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-ink-soft">Power Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Power Converter</h3>
                        <p className="text-xs text-ink-faint mt-1">Convert between power measurement units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Value</label>
                            <input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-ink-faint mb-2">From</label>
                                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none cursor-pointer">
                                    {POWER_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                            </div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">🔄</button>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-ink-faint mb-2">To</label>
                                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none cursor-pointer">
                                    {POWER_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={convert} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg transition-all">Convert →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox title="Converted Power" isEmpty={!result} emptyIcon="🔌" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-red-600" } : undefined} extraRows={[]} />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Power Converter</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Power Converter</strong> helps you convert between different power units including watts, kilowatts, megawatts, horsepower, and BTU per hour. Perfect for electrical engineering, mechanical systems, HVAC, and automotive applications.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Whether you're calculating appliance power consumption, engine output, or cooling capacity, our converter provides accurate results instantly.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Power Converter</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Enter the <strong className="text-ink">numeric value</strong> you want to convert.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Select the <strong className="text-ink">from unit</strong> (W, kW, MW, HP, or BTU/h).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Select the <strong className="text-ink">to unit</strong> you want to convert to.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> Click <strong className="text-ink">"Convert"</strong> to see the converted value.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> Use the <strong className="text-ink">swap button (🔄)</strong> to quickly reverse the units.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 6:</strong> Click <strong className="text-ink">Reset</strong> to clear all inputs and start a new conversion.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Power Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-600 mb-2">✓ Electrical Engineering</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Convert between watts, kilowatts, and megawatts for electrical systems. Calculate power consumption and capacity.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Automotive & Engines</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Convert horsepower to kW and vice versa. Compare engine outputs across different measurement systems.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ HVAC & Cooling</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Convert BTU per hour to watts for air conditioning and heating systems. Calculate cooling capacity.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Appliance Comparison</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Compare power ratings of different appliances. Understand energy consumption in common units.</p>
                    </div>
                </div>
            </section>

            {/* Power Units Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Power Units Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-600 mb-2">Watt (W)</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">SI unit of power. 1 watt = 1 joule/second. Used for small devices (LED bulbs, phone chargers, laptops).</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">Kilowatt (kW)</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">1,000 watts. Used for larger appliances (AC, water heater, EV motors). Common unit for electricity bills.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">Horsepower (HP)</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">1 HP = 745.7 W. Used for engines, motors, and cars. Originally defined by James Watt for steam engines.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">BTU per hour (BTU/h)</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">British Thermal Unit per hour. Used for HVAC and cooling systems. 1 BTU/h = 0.293 W.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Power Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Real-World Power Examples</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Item</th><th className="text-left py-3 px-4 text-ink-faint">Power (W)</th><th className="text-left py-3 px-4 text-ink-faint">Power (HP)</th><th className="text-left py-3 px-4 text-ink-faint">Power (BTU/h)</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">LED Bulb</td><td className="py-2 px-4">10W</td><td className="py-2 px-4 text-yellow-700">0.013 HP</td><td className="py-2 px-4">34 BTU/h</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Laptop</td><td className="py-2 px-4">50W</td><td className="py-2 px-4 text-yellow-700">0.067 HP</td><td className="py-2 px-4">171 BTU/h</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Refrigerator</td><td className="py-2 px-4">150W</td><td className="py-2 px-4 text-yellow-700">0.20 HP</td><td className="py-2 px-4">512 BTU/h</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Car Engine</td><td className="py-2 px-4">74,570W</td><td className="py-2 px-4 text-yellow-700">100 HP</td><td className="py-2 px-4">254,500 BTU/h</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">AC (1.5 Ton)</td><td className="py-2 px-4">1500W</td><td className="py-2 px-4 text-yellow-700">2.01 HP</td><td className="py-2 px-4">5,118 BTU/h</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Power Conversion Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Power Conversion Formulas</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">From</th><th className="text-left py-3 px-4 text-ink-faint">To</th><th className="text-left py-3 px-4 text-ink-faint">Formula</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">kW</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-700">× 1.34102</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">HP</td><td className="py-2 px-4">kW</td><td className="py-2 px-4 text-yellow-700">× 0.7457</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">W</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-700">× 0.001341</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">BTU/h</td><td className="py-2 px-4">W</td><td className="py-2 px-4 text-yellow-700">× 0.293071</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">MW</td><td className="py-2 px-4">kW</td><td className="py-2 px-4 text-yellow-700">× 1000</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">BTU/h</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-700">× 0.000393</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Common Power Conversions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Common Power Conversions</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">From</th><th className="text-left py-3 px-4 text-ink-faint">To</th><th className="text-left py-3 px-4 text-ink-faint">Multiply By</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">kW</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-700">1.34102</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">HP</td><td className="py-2 px-4">kW</td><td className="py-2 px-4 text-yellow-700">0.7457</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">W</td><td className="py-2 px-4">HP</td><td className="py-2 px-4 text-yellow-700">0.001341</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">BTU/h</td><td className="py-2 px-4">W</td><td className="py-2 px-4 text-yellow-700">0.293071</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-ink-faint leading-relaxed">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}