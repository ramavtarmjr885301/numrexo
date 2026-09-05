"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert PSI to bar?",
        a: "1 PSI = 0.0689476 bar. Multiply PSI by 0.0689476. Example: 100 PSI × 0.0689476 = 6.89476 bar.",
    },
    {
        q: "What is atmospheric pressure?",
        a: "Standard atmospheric pressure at sea level is 14.7 PSI, 101.325 kPa, or 1.01325 bar. Used as reference for pressure measurements.",
    },
    {
        q: "What is the difference between bar and PSI?",
        a: "Bar is metric unit (1 bar = 100,000 Pa). PSI is imperial unit (pounds per square inch). 1 bar ≈ 14.5 PSI. Both measure pressure, used in different countries.",
    },
    {
        q: "What is Pascal?",
        a: "Pascal (Pa) is the SI unit of pressure. 1 Pascal = 1 Newton per square meter. Kilopascal (kPa) and Megapascal (MPa) are common for higher pressures.",
    },
    {
        q: "How to convert PSI to kPa?",
        a: "1 PSI = 6.89476 kPa. Multiply PSI by 6.89476. Example: 100 PSI × 6.89476 = 689.476 kPa.",
    },
    {
        q: "What is the difference between gauge pressure and absolute pressure?",
        a: "Gauge pressure (psig) measures pressure relative to atmospheric pressure. Absolute pressure (psia) includes atmospheric pressure (14.7 psi). Formula: Absolute = Gauge + Atmospheric. Example: 32 psig = 32 + 14.7 = 46.7 psia. Most tire pressure gauges measure gauge pressure.",
    },
    {
        q: "How to measure blood pressure in mmHg?",
        a: "Blood pressure is measured in mmHg (millimeters of mercury). Normal: 120/80 mmHg. 1 mmHg = 0.01934 PSI = 133.322 Pa. Our converter handles mmHg (torr) to all units.",
    },
    {
        q: "What is atmospheric pressure?",
        a: "Standard atmospheric pressure at sea level = 101.325 kPa = 14.6959 PSI = 1 atm = 760 mmHg. Changes with altitude: decreases by 1 kPa per 100m ascent. Used as reference for altitude and weather forecasting.",
    },
    {
        q: "What is the difference between bar and PSI?",
        a: "Bar (metric): 1 bar = 100,000 Pa = 14.5038 PSI. PSI (imperial): pounds per square inch. Bars used in Europe, weather reports, and scuba diving. PSI used in US, tire pressure, and industrial applications.",
    },
    {
        q: "What is Pascal?",
        a: "Pascal (Pa) = 1 Newton per square meter. kPa (kilopascal) = 1,000 Pa (used for tire pressure). MPa (megapascal) = 1,000,000 Pa (used for steel strength, hydraulics). 1 kPa = 0.145 PSI. 1 MPa = 145 PSI.",
    },
];

const PRESSURE_UNITS = [
    { value: "pascal", label: "Pascal (Pa)", toPascal: 1 },
    { value: "kpa", label: "Kilopascal (kPa)", toPascal: 1000 },
    { value: "mpa", label: "Megapascal (MPa)", toPascal: 1000000 },
    { value: "bar", label: "Bar", toPascal: 100000 },
    { value: "psi", label: "PSI (lb/in²)", toPascal: 6894.76 },
    { value: "atm", label: "Atmosphere (atm)", toPascal: 101325 },
    { value: "torr", label: "Torr (mmHg)", toPascal: 133.322 },
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
    name: "Pressure Converter – Convert Pressure Units",
    description: "Convert between Pascal, kPa, MPa, bar, PSI, atmosphere, and torr.",
    url: "https://numrexo.com/conversion/pressure-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["7 pressure units", "PSI to bar", "Atmospheric pressure", "Scientific conversions"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Pressure Converter", item: "https://numrexo.com/conversion/pressure-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PressureConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("psi");
    const [toUnit, setToUnit] = useState("bar");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = PRESSURE_UNITS.find(u => u.value === fromUnit)!;
        const to = PRESSURE_UNITS.find(u => u.value === toUnit)!;
        const inPascal = val * from.toPascal;
        const converted = inPascal / to.toPascal;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(6) });
    };

    const swapUnits = () => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); if (value) setTimeout(convert, 10); };

    const resetForm = () => {
        setValue("");
        setFromUnit("psi");
        setToUnit("bar");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Pressure Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Pressure Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between pressure measurement units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Value</label>
                            <input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">From</label>
                                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">
                                    {PRESSURE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                            </div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">🔄</button>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
                                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">
                                    {PRESSURE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={convert} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Convert →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox title="Converted Pressure" isEmpty={!result} emptyIcon="🎈" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-blue-400" } : undefined} extraRows={[]} />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Pressure Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Pressure Converter</strong> helps you convert between different pressure units including Pascal, kPa, MPa, bar, PSI, atmosphere, and torr. Perfect for engineering, weather, scuba diving, and scientific applications.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're checking tire pressure, analyzing weather data, or working on industrial systems, our converter provides accurate results instantly.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Pressure Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">numeric value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">from unit</strong> (Pa, kPa, MPa, bar, PSI, atm, torr).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">to unit</strong> you want to convert to.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the converted value.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">swap button (🔄)</strong> to quickly reverse the units.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">Reset</strong> to clear all inputs and start a new conversion.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Pressure Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Engineering & Manufacturing</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert hydraulic, pneumatic, and industrial pressure measurements across different unit systems.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Weather & Aviation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert atmospheric pressure readings for weather forecasting, altitude calculations, and aviation.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Scuba Diving</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert pressure readings for dive computers, tank pressure, and depth calculations. Essential for safe diving.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Science & Physics</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert pressure units for laboratory experiments, physics problems, and scientific research.</p>
                    </div>
                </div>
            </section>

            {/* Pressure Units Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Pressure Units Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Pascal (Pa)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">SI unit of pressure. 1 Pa = 1 N/m². Used in science and engineering. kPa and MPa are common multiples.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">PSI (lb/in²)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Imperial unit: pounds per square inch. Used for tire pressure, hydraulic systems, and industrial applications in US.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Bar</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">1 bar = 100,000 Pa. Used in weather, scuba diving, and European industry. 1 bar ≈ 14.5 PSI.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">Atmosphere (atm)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Standard atmospheric pressure at sea level. 1 atm = 101.325 kPa = 14.6959 PSI. Used as reference.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Pressure Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Real-World Pressure Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Application</th><th className="text-left py-3 px-4 text-gray-400">Pressure</th><th className="text-left py-3 px-4 text-gray-400">Equivalent</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Tire Pressure (Car)</td><td className="py-2 px-4 text-yellow-400">32 PSI</td><td className="py-2 px-4">2.2 bar, 220 kPa</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Atmospheric (Sea Level)</td><td className="py-2 px-4 text-yellow-400">14.7 PSI</td><td className="py-2 px-4">1 atm, 101.3 kPa</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Scuba Tank (Full)</td><td className="py-2 px-4 text-yellow-400">3000 PSI</td><td className="py-2 px-4">207 bar, 20.7 MPa</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Blood Pressure (Normal)</td><td className="py-2 px-4 text-yellow-400">120 mmHg</td><td className="py-2 px-4">16 kPa, 2.32 PSI</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Steam Boiler</td><td className="py-2 px-4 text-yellow-400">150 PSI</td><td className="py-2 px-4">10.3 bar, 1.03 MPa</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Pressure Conversion Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Pressure Conversion Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Formula</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">PSI</td><td className="py-2 px-4">bar</td><td className="py-2 px-4 text-yellow-400">× 0.0689476</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">bar</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">× 14.5038</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">atm</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">× 14.6959</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kPa</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">× 0.145038</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">mmHg (torr)</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">× 0.0193368</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">MPa</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">× 145.038</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Common Pressure Conversions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Pressure Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Multiply By</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">PSI</td><td className="py-2 px-4">bar</td><td className="py-2 px-4 text-yellow-400">0.0689476</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">bar</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">14.5038</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">atm</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">14.6959</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">kPa</td><td className="py-2 px-4">PSI</td><td className="py-2 px-4 text-yellow-400">0.145038</td></tr>
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
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}