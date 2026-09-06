"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate land area?",
        a: "For rectangular plots: area = length × width. For irregular shapes, divide into rectangles/triangles. Use our calculator for common plot shapes.",
    },
    {
        q: "What is an acre in square feet?",
        a: "1 acre = 43,560 square feet. 1 acre = 4,840 square yards. 1 acre = 0.4047 hectares. 1 hectare = 2.471 acres.",
    },
    {
        q: "What is a ground in land measurement?",
        a: "1 ground = 2,400 square feet (commonly used in South India). 1 ground = 240 sq yards. 1 ground = 0.055 acres.",
    },
    {
        q: "What are common land measurement units in India?",
        a: "Square feet (sq ft), Square yard (sq yd), Acre, Hectare, Ground (South India), Bigha (North India), Guntha (Maharashtra), Cent (South India - 1 cent = 435.6 sq ft).",
    },
    {
        q: "How to calculate irregular plot area?",
        a: "Divide irregular plot into triangles/rectangles. Calculate each section separately, sum all areas. For curved boundaries, use graph paper method or GPS area measurement apps. For legal purposes, hire a licensed surveyor for exact measurements.",
    },
    {
        q: "What is the difference between bigha and acre?",
        a: "Bigha size varies by state: UP (1 bigha = 27,000 sq ft), Rajasthan (1 bigha = 24,000 sq ft), Punjab (1 bigha = 18,000 sq ft). 1 acre = 43,560 sq ft. Bigha is traditional, acre is standard. Always confirm local bigha size before transaction.",
    },
    {
        q: "How to measure land area without equipment?",
        a: "Use Google Maps (measure distance tool). Use pacing method (average step length ~2.5 ft). Use known reference (standard parking space ~180 sq ft). For rough estimates, count tiles (standard tile 2x2 ft = 4 sq ft). For legal purposes, always get professional survey.",
    },
    {
        q: "What is the standard land measurement unit in India?",
        a: "Standard unit: Square feet (sq ft) and Square meter (sq m) for registration. Traditional units by region: North (Bigha, Biswa), South (Ground, Cent), West (Guntha), East (Katha, Dhur). RERA mandates sq ft disclosure for real estate.",
    },
    {
        q: "How to convert square feet to cents?",
        a: "1 cent = 435.6 sq ft. Formula: Cents = Sq Ft ÷ 435.6. Example: 1,000 sq ft ÷ 435.6 = 2.3 cents. Common sizes: 1,000 sq ft = 2.3 cents, 2,000 sq ft = 4.6 cents, 5,000 sq ft = 11.5 cents.",
    },
    {
        q: "What is the land measurement for property registration?",
        a: "Property registration requires exact area in sq ft or sq m. Convert traditional units to sq ft before registration. Required documents: Survey map (cadastral map), Title deed, Land measurement certificate from licensed surveyor. Always verify measurements before purchase.",
    },
];

const LAND_UNITS = [
    { value: "sqft", label: "Square Feet (sq ft)", toSqFt: 1 },
    { value: "sqyd", label: "Square Yard (sq yd)", toSqFt: 9 },
    { value: "acre", label: "Acre", toSqFt: 43560 },
    { value: "hectare", label: "Hectare", toSqFt: 107639 },
    { value: "ground", label: "Ground", toSqFt: 2400 },
    { value: "cent", label: "Cent", toSqFt: 435.6 },
    { value: "bigha", label: "Bigha", toSqFt: 27000 },
    { value: "guntha", label: "Guntha", toSqFt: 1089 },
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
    name: "Land Area Calculator – Convert Land Units",
    description: "Calculate land area in square feet, acres, hectares, ground, cent, bigha, and guntha.",
    url: "https://numrexo.com/construction/land-area-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multiple land units", "Area conversion", "Irregular shape support", "Plot measurement"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Land Area Calculator", item: "https://numrexo.com/construction/land-area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LandAreaCalculator() {
    const [shape, setShape] = useState<"rectangle" | "triangle" | "circle">("rectangle");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [base, setBase] = useState("");
    const [height, setHeight] = useState("");
    const [radius, setRadius] = useState("");
    const [fromUnit, setFromUnit] = useState("sqft");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let areaInSqFt = 0;
        let calculationDetail = "";

        const from = LAND_UNITS.find(u => u.value === fromUnit)!;
        const unitFactor = from.toSqFt;

        if (shape === "rectangle") {
            const l = parseFloat(length);
            const w = parseFloat(width);
            if (!l || !w || l <= 0 || w <= 0) {
                alert("Please enter valid length and width");
                return;
            }
            areaInSqFt = l * w * unitFactor;
            calculationDetail = `${l} × ${w} = ${l * w} ${fromUnit} = ${areaInSqFt.toFixed(2)} sq ft`;
        }
        else if (shape === "triangle") {
            const b = parseFloat(base);
            const h = parseFloat(height);
            if (!b || !h || b <= 0 || h <= 0) {
                alert("Please enter valid base and height");
                return;
            }
            areaInSqFt = 0.5 * b * h * unitFactor;
            calculationDetail = `½ × ${b} × ${h} = ${0.5 * b * h} ${fromUnit} = ${areaInSqFt.toFixed(2)} sq ft`;
        }
        else {
            const r = parseFloat(radius);
            if (!r || r <= 0) {
                alert("Please enter valid radius");
                return;
            }
            areaInSqFt = Math.PI * r * r * unitFactor;
            calculationDetail = `π × ${r}² = ${(Math.PI * r * r).toFixed(2)} ${fromUnit} = ${areaInSqFt.toFixed(2)} sq ft`;
        }

        // Convert to other units
        const acres = areaInSqFt / 43560;
        const hectares = areaInSqFt / 107639;
        const grounds = areaInSqFt / 2400;
        const cents = areaInSqFt / 435.6;
        const bigha = areaInSqFt / 27000;
        const guntha = areaInSqFt / 1089;
        const sqYards = areaInSqFt / 9;

        setResult({
            areaSqFt: areaInSqFt.toFixed(2),
            acres: acres.toFixed(4),
            hectares: hectares.toFixed(4),
            grounds: grounds.toFixed(2),
            cents: cents.toFixed(2),
            bigha: bigha.toFixed(4),
            guntha: guntha.toFixed(2),
            sqYards: sqYards.toFixed(2),
            calculationDetail,
            shape,
        });
    };

    const resetForm = () => {
        setShape("rectangle");
        setLength("");
        setWidth("");
        setBase("");
        setHeight("");
        setRadius("");
        setFromUnit("sqft");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Land Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Land Area Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate area of your plot in multiple units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Plot Shape</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "rectangle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("rectangle")}>Rectangle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "triangle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("triangle")}>Triangle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "circle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("circle")}>Circle</button>
                            </div>
                        </div>

                        {shape === "rectangle" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><input type="number" step="0.01" placeholder="100" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" step="0.01" placeholder="50" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </div>
                        )}

                        {shape === "triangle" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Base</label><input type="number" step="0.01" placeholder="100" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" step="0.01" placeholder="80" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </div>
                        )}

                        {shape === "circle" && (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label><input type="number" step="0.01" placeholder="50" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        )}

                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Measurement Unit</label>
                            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white cursor-pointer">
                                {LAND_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Area →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Land Area Results"
                    isEmpty={!result}
                    emptyIcon="🌾"
                    emptyText="Enter plot dimensions"
                    mainResult={result ? { label: "Area (Square Feet)", value: `${parseFloat(result.areaSqFt).toLocaleString()} sq ft`, color: "text-emerald-400" } : undefined}
                    extraRows={result ? [
                        { label: "Acres", value: result.acres, valueColor: "text-yellow-400" },
                        { label: "Hectares", value: result.hectares },
                        { label: "Grounds", value: result.grounds },
                        { label: "Cents", value: result.cents },
                        { label: "Bigha", value: result.bigha },
                        { label: "Guntha", value: result.guntha },
                        { label: "Square Yards", value: result.sqYards },
                        { label: "Calculation", value: result.calculationDetail },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Land Area Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Land Area Calculator</strong> helps property buyers, sellers, real estate agents, and surveyors calculate plot area in multiple units. Calculate area for rectangular, triangular, or circular plots instantly.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Convert between 8 land units: Square Feet (sq ft), Square Yard (sq yd), Acre, Hectare, Ground, Cent, Bigha, and Guntha. Essential for property registration, land purchase, and real estate transactions in India.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Land Area Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select your <strong className="text-white">plot shape</strong> — Rectangle, Triangle, or Circle.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">dimensions</strong> (length & width for rectangle, base & height for triangle, radius for circle).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">measurement unit</strong> you used (feet, yards, etc.).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Area"</strong> to see results in all land units.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Land Area Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-emerald-400 mb-2">✓ Property Purchase</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Verify seller's land area claims before buying. Compare price per square foot across different properties. Avoid overpaying for land.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Registration Documents</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert traditional units (Bigha, Ground, Cent) to sq ft for legal registration. Ensure documents have accurate measurements.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Construction Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate buildable area from total land. Plan house layout, setbacks, and open space requirements.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Land Investment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare land prices across different measurement systems. Calculate return on investment accurately.</p>
                    </div>
                </div>
            </section>

            {/* Land Units by Region */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Land Measurement Units by Region (India)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Region</th>
                                <th className="text-left py-3 px-4 text-gray-400">Common Units</th>
                                <th className="text-left py-3 px-4 text-gray-400">Conversion to sq ft</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">North India (UP, Delhi)</td>
                                <td className="py-2 px-4">Bigha, Biswa, Kanal, Marla</td>
                                <td className="py-2 px-4 text-yellow-400">1 Bigha = 27,000 sq ft</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">South India (TN, Kerala)</td>
                                <td className="py-2 px-4">Ground, Cent, Ankanam</td>
                                <td className="py-2 px-4 text-yellow-400">1 Ground = 2,400 sq ft, 1 Cent = 435.6 sq ft</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">West India (Maharashtra)</td>
                                <td className="py-2 px-4">Guntha, Ankana</td>
                                <td className="py-2 px-4 text-yellow-400">1 Guntha = 1,089 sq ft</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">East India (West Bengal)</td>
                                <td className="py-2 px-4">Katha, Dhur, Chatak</td>
                                <td className="py-2 px-4 text-yellow-400">1 Katha = 720 sq ft (varies)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Land Unit Conversion Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Land Unit Conversions (1 Unit =)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Unit</th><th className="text-left py-3 px-4 text-gray-400">Square Feet</th><th className="text-left py-3 px-4 text-gray-400">Square Yards</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Acre</td><td className="py-2 px-4">43,560</td><td className="py-2 px-4">4,840</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Hectare</td><td className="py-2 px-4">107,639</td><td className="py-2 px-4">11,960</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Ground</td><td className="py-2 px-4">2,400</td><td className="py-2 px-4">266.67</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Cent</td><td className="py-2 px-4">435.6</td><td className="py-2 px-4">48.4</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Bigha (UP)</td><td className="py-2 px-4">27,000</td><td className="py-2 px-4">3,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4 text-yellow-400">1 Guntha</td><td className="py-2 px-4">1,089</td><td className="py-2 px-4">121</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* How to Calculate Irregular Plot */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Calculate Irregular Plot Area</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        <strong className="text-white">Step-by-step method for irregular plots:</strong>
                    </p>
                    <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
                        <li>Divide the irregular plot into triangles and rectangles</li>
                        <li>Measure each section separately (length, width, base, height)</li>
                        <li>Calculate area of each section using appropriate formula</li>
                        <li>Sum all section areas to get total plot area</li>
                        <li>Add 5% buffer for curved boundaries</li>
                    </ol>
                    <p className="text-gray-500 text-xs mt-3">For legal purposes (registration, sale deed), always get a licensed surveyor to measure irregular plots with GPS equipment.</p>
                </div>
            </section>

            {/* Formulas Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Land Area Calculation Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3">
                        <div className="text-emerald-400 text-sm font-bold mb-1">Rectangle</div>
                        <p className="text-white text-xs">Area = L × W</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3">
                        <div className="text-emerald-400 text-sm font-bold mb-1">Triangle</div>
                        <p className="text-white text-xs">Area = ½ × B × H</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3">
                        <div className="text-emerald-400 text-sm font-bold mb-1">Circle</div>
                        <p className="text-white text-xs">Area = π × r²</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Land Area Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate land area for rectangular, triangular, or circular plots. Convert between square feet, acres, hectares, ground, cent, bigha, and guntha.</p>
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