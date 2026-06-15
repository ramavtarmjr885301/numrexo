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
    {
        q: "How to convert between joules and kilojoules?",
        a: "1 kJ = 1,000 J. To convert J to kJ: divide by 1,000. To convert kJ to J: multiply by 1,000. Example: 5,000 J = 5 kJ. 2.5 kJ = 2,500 J.",
    },
    {
        q: "What is the relationship between power and energy?",
        a: "Energy = Power × Time. Power (watts) × Time (seconds) = Energy (joules). Example: 100W bulb × 3,600 seconds (1 hour) = 360,000 J = 0.1 kWh.",
    },
    {
        q: "How many joules in a calorie?",
        a: "1 calorie (cal) = 4.184 joules (J). This is the standard conversion factor based on the specific heat capacity of water. 1 kilocalorie (kcal) = 4,184 J.",
    },
    {
        q: "What is the difference between watt and watt-hour?",
        a: "Watt (W) is power (rate of energy use). Watt-hour (Wh) is total energy used. Example: 60W bulb running for 2 hours consumes 120 Wh = 0.12 kWh.",
    },
    {
        q: "How to calculate energy efficiency?",
        a: "Efficiency (%) = (Output Energy ÷ Input Energy) × 100. Example: Motor with 1,000 J input produces 800 J output = 80% efficiency. Our converter helps with unit consistency.",
    },
    {
        q: "What is the energy consumption of common appliances?",
        a: "Energy per hour: LED bulb (10W = 0.01 kWh), Laptop (50W = 0.05 kWh), AC (1,500W = 1.5 kWh), Refrigerator (150W = 0.15 kWh), Microwave (1,000W = 1 kWh).",
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

    const resetForm = () => {
        setValue("");
        setFromUnit("joule");
        setToUnit("calorie");
        setResult(null);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Energy Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Energy Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between energy measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ENERGY_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ENERGY_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={convert} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Convert →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox title="Converted Energy" isEmpty={!result} emptyIcon="⚡" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-green-400" } : undefined} extraRows={[]} />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Energy Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Energy Converter</strong> helps you convert between different energy units including joules, calories, kilocalories, watt-hours, kilowatt-hours, and electronvolts. Perfect for physics students, nutrition tracking, electrical engineering, and everyday energy calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding energy units is essential for calculating electricity bills (kWh), food energy (calories/kcal), mechanical work (joules), and particle physics (electronvolts).
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Energy Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">numeric value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">from unit</strong> (e.g., Joule, Calorie, kWh).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">to unit</strong> you want to convert to.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the converted value.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">swap button (🔄)</strong> to quickly reverse the units.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">Reset</strong> to clear all inputs and start a new conversion.</p>
                </div>
            </section>

            {/* Why Use Energy Converter Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an Energy Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Electricity Bill Calculation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert appliance wattage to kWh to understand your electricity consumption and monthly bills.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Nutrition Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert food calories (kcal) to joules or kilojoules for scientific tracking or international food labels.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Physics & Engineering</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between joules, electronvolts, and other units for physics calculations, thermodynamics, and mechanical work.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Energy Efficiency</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare energy consumption across different devices and systems using consistent units.</p>
                    </div>
                </div>
            </section>

            {/* Energy Units Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Energy Units Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Joule (J)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">SI unit of energy. The energy required to apply 1 newton of force over 1 meter. 4,184 J = 1 food Calorie (kcal).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Calorie (cal)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Energy to heat 1g water by 1°C. 1 cal = 4.184 J. Food Calories (capital C) = 1 kcal = 1,000 cal.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Watt-hour (Wh)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Energy used by 1 watt for 1 hour. 1 Wh = 3,600 J. Electricity bills use kWh (1,000 Wh).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">Electronvolt (eV)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Energy gained by an electron accelerated through 1 volt. Used in particle physics. 1 eV = 1.602 × 10⁻¹⁹ J.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Energy Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Energy Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Activity/Device</th><th className="text-left py-3 px-4 text-gray-400">Energy</th><th className="text-left py-3 px-4 text-gray-400">In Other Units</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">LED bulb (10W for 1 hour)</td><td className="py-2 px-4">36,000 J</td><td className="py-2 px-4 text-yellow-400">0.01 kWh, 8,604 cal</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Apple (medium)</td><td className="py-2 px-4">305,000 J</td><td className="py-2 px-4 text-yellow-400">72,900 cal, 73 kcal</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Running (30 min)</td><td className="py-2 px-4">1,256,000 J</td><td className="py-2 px-4 text-yellow-400">300 kcal, 1.256 MJ</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">AC (1.5 kW for 1 hour)</td><td className="py-2 px-4">5,400,000 J</td><td className="py-2 px-4 text-yellow-400">1.5 kWh, 1,290 kcal</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Energy Conversion Formulas Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Energy Conversion Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Formula</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Joule</td><td className="py-2 px-4">Calorie</td><td className="py-2 px-4 text-yellow-400">÷ 4.184</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Calorie</td><td className="py-2 px-4">Joule</td><td className="py-2 px-4 text-yellow-400">× 4.184</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kWh</td><td className="py-2 px-4">Joule</td><td className="py-2 px-4 text-yellow-400">× 3,600,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kWh</td><td className="py-2 px-4">kcal</td><td className="py-2 px-4 text-yellow-400">× 860</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">eV</td><td className="py-2 px-4">Joule</td><td className="py-2 px-4 text-yellow-400">× 1.602 × 10⁻¹⁹</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Common Energy Conversions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Energy Conversions</h2>
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
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div>
            </section>
        </>
    );
}