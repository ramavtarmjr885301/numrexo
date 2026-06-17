"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate roof area?",
        a: "For flat roof: area = length × width. For sloped roof: area = (length × width) × pitch factor. Pitch factor: 4/12 = 1.05, 6/12 = 1.12, 8/12 = 1.20, 12/12 = 1.41. The pitch factor accounts for the extra surface area created by the slope. Always measure the length and width of the building footprint, then multiply by the pitch factor for accurate sloped roof area.",
    },
    {
        q: "What is roof pitch?",
        a: "Roof pitch is the slope expressed as rise over run. Example: 6/12 means roof rises 6 inches for every 12 inches horizontally. Common pitches: 4/12 (standard), 6/12 (medium), 8/12 (steep). Higher pitches create more usable attic space but require more materials and are more expensive to install. The pitch directly affects the roof area and material calculations.",
    },
    {
        q: "How many roofing sheets do I need?",
        a: "Divide total roof area by sheet coverage area. Add 10-15% for overlap and waste. Formula: Sheets = (Roof Area × (1 + Waste%)) ÷ (Sheet Length × Effective Width). Effective width accounts for side overlap (typically 2-4 inches). Always round up to the nearest whole sheet. For complex roof shapes, add an additional 5-10% for cuts and fitting.",
    },
    {
        q: "What is the standard roofing sheet size?",
        a: "Standard metal roofing sheets: 8-12 feet length (custom cut available), 3 feet width (36 inches). Effective coverage width is typically 3 feet minus overlap (usually 2-4 inches). Common lengths: 8ft, 10ft, 12ft. For larger roofs, longer sheets are preferred to minimize horizontal seams and reduce leak potential.",
    },
    {
        q: "How to calculate roof pitch factor?",
        a: "Pitch factor = √(rise² + run²) ÷ run. For 6/12 pitch: √(6² + 12²) ÷ 12 = √(36 + 144) ÷ 12 = √180 ÷ 12 = 13.416 ÷ 12 = 1.118. This factor is multiplied by the flat area to get the sloped area. The formula works for all roof pitches, from flat to very steep. Use our built-in pitch factor table for quick reference.",
    },
    {
        q: "What type of roofing materials are available?",
        a: "Common roofing materials: 1) Metal sheets (Corrugated, Colorbond) - durable, 40-70 years, ₹50-200/sq ft. 2) Clay tiles - traditional, 50-100 years, ₹100-300/sq ft. 3) Asphalt shingles - affordable, 20-30 years, ₹30-80/sq ft. 4) Polycarbonate sheets - lightweight, 10-15 years, ₹80-200/sq ft. 5) RCC - permanent, 50+ years, ₹150-400/sq ft. Choose based on budget, climate, and aesthetic preference.",
    },
    {
        q: "How much waste should I add for roofing?",
        a: "Recommended waste percentages: Simple rectangular roof: 10%, Complex roof with valleys: 15%, Hip roof: 15-20%, Multiple dormers: 20-25%, Tiled roof: 15-20% (breakage), Metal sheets: 10-15% (cuts and overlaps). Always order extra material from the same batch to ensure color consistency. For your first roofing project, consider adding 15-20% waste for learning curve.",
    },
    {
        q: "How to estimate roofing labor costs?",
        a: "Labor costs for roofing: Metal sheets: ₹30-60/sq ft, Clay tiles: ₹60-120/sq ft, Asphalt shingles: ₹25-50/sq ft, Polycarbonate: ₹20-40/sq ft. Labor is typically 30-50% of total project cost. Additional charges: 20-30% for steep roofs (6/12+), 15-25% for complex shapes, Demolition of old roof: ₹10-30/sq ft. Always get multiple quotes and check contractor credentials.",
    },
    {
        q: "How to account for roof overhangs?",
        a: "Roof overhangs (eaves) typically extend 1-2 feet beyond the building walls. To calculate total roof area with overhangs: (Length + 2×Overhang) × (Width + 2×Overhang) × Pitch Factor. Example: Building 40×20ft with 1ft overhang = (40+2) × (20+2) = 42×22 = 924 sq ft flat area. Then multiply by pitch factor. Always include overhangs in material calculations for proper coverage.",
    },
    {
        q: "What is the difference between gross and net roof area?",
        a: "Gross roof area includes the entire roof surface including overhangs. Net roof area is the actual building footprint (wall-to-wall). Gross area is used for material ordering, while net area is used for building plan calculations. Difference: Gross = Net + Overhang × Perimeter + Corner adjustments. For accurate material ordering, always use gross roof area and add waste allowance.",
    },
];

const ROOF_PITCH_FACTORS = [
    { pitch: "Flat (0/12)", factor: 1.000, description: "Flat roof" },
    { pitch: "2/12 (Low)", factor: 1.014, description: "Minimum slope" },
    { pitch: "4/12 (Standard)", factor: 1.054, description: "Most common pitch" },
    { pitch: "6/12 (Medium)", factor: 1.118, description: "Walkable pitch" },
    { pitch: "8/12 (Steep)", factor: 1.202, description: "Steep, difficult to walk" },
    { pitch: "10/12 (Very Steep)", factor: 1.302, description: "Very steep" },
    { pitch: "12/12 (Extreme)", factor: 1.414, description: "Maximum practical pitch" },
];

const MATERIAL_TYPES = [
    { type: "Metal Sheets", lifespan: "40-70 years", price: "₹50-200/sq ft", maintenance: "Low" },
    { type: "Clay Tiles", lifespan: "50-100 years", price: "₹100-300/sq ft", maintenance: "Medium" },
    { type: "Asphalt Shingles", lifespan: "20-30 years", price: "₹30-80/sq ft", maintenance: "Medium" },
    { type: "Polycarbonate", lifespan: "10-15 years", price: "₹80-200/sq ft", maintenance: "Low" },
    { type: "RCC (Concrete)", lifespan: "50+ years", price: "₹150-400/sq ft", maintenance: "Low" },
];

const STANDARD_SHEET_SIZES = [
    { length: "8 ft", width: "3 ft", coverage: "24 sq ft", use: "Small roofs, garages" },
    { length: "10 ft", width: "3 ft", coverage: "30 sq ft", use: "Medium roofs" },
    { length: "12 ft", width: "3 ft", coverage: "36 sq ft", use: "Large roofs, commercial" },
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
    name: "Roofing Calculator – Estimate Roofing Materials",
    description: "Calculate roof area, roofing sheets, and materials needed for your roofing project.",
    url: "https://www.numrexo.com/construction/roofing-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Roof area calculation", "Pitch factor", "Sheet quantity", "Cost estimation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Roofing Calculator", item: "https://www.numrexo.com/construction/roofing-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoofingCalculator() {
    const [roofLength, setRoofLength] = useState("");
    const [roofWidth, setRoofWidth] = useState("");
    const [roofPitch, setRoofPitch] = useState("4/12 (Standard)");
    const [sheetLength, setSheetLength] = useState("");
    const [sheetWidth, setSheetWidth] = useState("3");
    const [wastePercent, setWastePercent] = useState("10");
    const [pricePerSheet, setPricePerSheet] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getPitchFactor = (pitch: string): number => {
        const found = ROOF_PITCH_FACTORS.find(p => p.pitch === pitch);
        return found ? found.factor : 1.054;
    };

    const resetForm = () => {
        setRoofLength("");
        setRoofWidth("");
        setRoofPitch("4/12 (Standard)");
        setSheetLength("");
        setSheetWidth("3");
        setWastePercent("10");
        setPricePerSheet("");
        setResult(null);
    };

    const calculate = () => {
        const length = parseFloat(roofLength);
        const width = parseFloat(roofWidth);

        if (!length || !width || length <= 0 || width <= 0) {
            alert("Please enter valid roof dimensions");
            return;
        }

        const pitchFactor = getPitchFactor(roofPitch);
        const flatArea = length * width;
        const slopedArea = flatArea * pitchFactor;

        const sheetLen = parseFloat(sheetLength);
        const sheetWid = parseFloat(sheetWidth);

        let sheetsNeeded = null;
        let sheetCoverage = null;

        if (!isNaN(sheetLen) && sheetLen > 0 && sheetWid > 0) {
            const effectiveLength = sheetLen - 0.5;
            const effectiveWidth = sheetWid - 0.167;
            sheetCoverage = effectiveLength * effectiveWidth;
            sheetsNeeded = Math.ceil(slopedArea / sheetCoverage);
            sheetsNeeded = Math.ceil(sheetsNeeded * (1 + parseFloat(wastePercent) / 100));
        }

        let totalCost = null;
        const price = parseFloat(pricePerSheet);
        if (!isNaN(price) && price > 0 && sheetsNeeded) {
            totalCost = sheetsNeeded * price;
        }

        setResult({
            flatArea: flatArea.toFixed(2),
            slopedArea: slopedArea.toFixed(2),
            pitchFactor: pitchFactor,
            pitchName: roofPitch,
            sheetsNeeded: sheetsNeeded || null,
            sheetCoverage: sheetCoverage ? sheetCoverage.toFixed(2) : null,
            wastePercent: parseFloat(wastePercent),
            totalCost: totalCost ? totalCost.toFixed(2) : null,
            length: length,
            width: width,
            sheetLength: sheetLen || null,
            sheetWidth: sheetWid || null,
        });
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
                        <a href="https://www.numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Roofing Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Roofing Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Estimate roofing materials for your project</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Roof Length (ft)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="40"
                                    value={roofLength}
                                    onChange={(e) => setRoofLength(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Roof Width (ft)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="20"
                                    value={roofWidth}
                                    onChange={(e) => setRoofWidth(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Roof Pitch</label>
                            <select
                                value={roofPitch}
                                onChange={(e) => setRoofPitch(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                            >
                                {ROOF_PITCH_FACTORS.map(p => <option key={p.pitch} value={p.pitch}>{p.pitch} - Factor {p.factor.toFixed(3)}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Sheet Length (ft)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="10"
                                    value={sheetLength}
                                    onChange={(e) => setSheetLength(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Sheet Width (ft)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="3"
                                    value={sheetWidth}
                                    onChange={(e) => setSheetWidth(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Waste Percentage (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="10"
                                    value={wastePercent}
                                    onChange={(e) => setWastePercent(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Price per Sheet (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="100"
                                    placeholder="500"
                                    value={pricePerSheet}
                                    onChange={(e) => setPricePerSheet(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Roofing →
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
                    title="Roofing Estimate"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Enter roof dimensions to calculate"
                    mainResult={result ? { label: "Sloped Roof Area", value: `${result.slopedArea} sq ft`, color: "text-amber-400" } : undefined}
                    extraRows={result ? [
                        { label: "Flat Area", value: `${result.flatArea} sq ft` },
                        { label: "Pitch Factor", value: `${result.pitchFactor.toFixed(3)} (${result.pitchName})` },
                        { label: "Roof Dimensions", value: `${result.length} × ${result.width} ft` },
                        ...(result.sheetsNeeded ? [
                            { label: "Sheets Required", value: `${result.sheetsNeeded} sheets`, valueColor: "text-yellow-400" },
                            { label: "Coverage per Sheet", value: `${result.sheetCoverage} sq ft` },
                            { label: "Waste Added", value: `${result.wastePercent}%` },
                            { label: "Estimated Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-green-400" },
                            { label: "Sheet Size Used", value: `${result.sheetLength || 'N/A'} × ${result.sheetWidth || 'N/A'} ft` },
                        ] : [
                            { label: "Enter Sheet Size", value: "To calculate sheets needed", valueColor: "text-gray-500" },
                        ]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Roofing Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Roofing Calculator</strong> helps you estimate the total roof area, number of roofing sheets, and total material cost for your roofing project. It accounts for roof pitch factors, sheet sizes, waste percentage, and material costs to provide accurate estimates.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're building a new home, replacing an old roof, or planning a renovation, this calculator provides essential information for budgeting and material planning. It supports various roof pitches from flat to extreme slopes and multiple sheet sizes.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The calculator automatically applies the correct pitch factor based on your roof slope, calculates both flat and sloped areas, and provides sheet quantity estimates with waste allowance. This ensures you order the right amount of materials for your project.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Roofing Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">roof length</strong> and <strong className="text-white">width</strong> in feet (building footprint dimensions).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select <strong className="text-white">roof pitch</strong> from the dropdown (flat to extreme).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter <strong className="text-white">sheet length</strong> and <strong className="text-white">width</strong> (your chosen roofing material dimensions).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Set <strong className="text-white">waste percentage</strong> (10% standard, 15-20% for complex roofs).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> (Optional) Enter <strong className="text-white">price per sheet</strong> for cost estimation.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">"Calculate Roofing"</strong> to see results. Use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Roofing Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-amber-400 mb-2">✓ Accurate Material Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how many sheets you need. Avoid over-ordering or running out of materials mid-project.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Estimation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate total material costs upfront. Plan your budget with confidence and avoid unexpected expenses.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Pitch Factor Accuracy</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Automatic pitch factor application ensures accurate area calculation for sloped roofs. No manual math required.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Waste Management</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Account for material waste and overlaps. Ensure you have enough material for cuts, mistakes, and repairs.</p>
                    </div>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Roofing Calculation Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-amber-400 mb-2">Area Calculation</h3>
                        <p className="text-white font-mono text-sm mb-2">Sloped Area = Length × Width × Pitch Factor</p>
                        <p className="text-gray-500 text-xs mb-2">Where: Pitch Factor = √(Rise² + Run²) ÷ Run</p>
                        <p className="text-gray-500 text-xs">Example: 40×20ft with 6/12 pitch → 40×20×1.118 = 894.4 sq ft</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Sheet Calculation</h3>
                        <p className="text-white font-mono text-sm mb-2">Sheets = (Area × (1 + Waste%)) ÷ (Length × Effective Width)</p>
                        <p className="text-gray-500 text-xs mb-2">Effective Width = Sheet Width - 2 inches (overlap allowance)</p>
                        <p className="text-gray-500 text-xs">Example: 894.4 sq ft with 10% waste, 10×3ft sheets → (894.4×1.1) ÷ (10×2.83) = 34.8 → 35 sheets</p>
                    </div>
                </div>
            </section>

            {/* Pitch Factors Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Roof Pitch Factors</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Pitch</th>
                                <th className="text-left py-3 px-4 text-gray-400">Factor</th>
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                                <th className="text-left py-3 px-4 text-gray-400">Multiply Area By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ROOF_PITCH_FACTORS.map((pitch, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-yellow-400">{pitch.pitch}</td>
                                    <td className="py-2 px-4 text-gray-300">{pitch.factor.toFixed(3)}</td>
                                    <td className="py-2 px-4 text-gray-400">{pitch.description}</td>
                                    <td className="py-2 px-4 text-gray-400">× {pitch.factor.toFixed(3)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Higher pitch factors mean more roof area and more materials needed. Choose the correct pitch for accurate calculations.
                    </p>
                </div>
            </section>

            {/* Standard Sheet Sizes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Standard Roofing Sheet Sizes</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Length</th>
                                <th className="text-left py-3 px-4 text-gray-400">Width</th>
                                <th className="text-left py-3 px-4 text-gray-400">Coverage Area</th>
                                <th className="text-left py-3 px-4 text-gray-400">Best Used For</th>
                            </tr>
                        </thead>
                        <tbody>
                            {STANDARD_SHEET_SIZES.map((size, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{size.length}</td>
                                    <td className="py-3 px-4 text-gray-300">{size.width}</td>
                                    <td className="py-3 px-4 text-amber-400">{size.coverage}</td>
                                    <td className="py-3 px-4 text-gray-400">{size.use}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Standard metal roofing sheets are available in various lengths. Custom sizes can be ordered from manufacturers.
                    </p>
                </div>
            </section>

            {/* Material Types */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Roofing Material Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Material</th>
                                <th className="text-left py-3 px-4 text-gray-400">Lifespan</th>
                                <th className="text-left py-3 px-4 text-gray-400">Price Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Maintenance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MATERIAL_TYPES.map((material, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300 font-medium">{material.type}</td>
                                    <td className="py-3 px-4 text-green-400">{material.lifespan}</td>
                                    <td className="py-3 px-4 text-yellow-400">{material.price}</td>
                                    <td className={`py-3 px-4 ${material.maintenance === "Low" ? "text-green-400" :
                                        material.maintenance === "Medium" ? "text-yellow-400" :
                                            "text-red-400"
                                        }`}>{material.maintenance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Prices vary by region, quality, and quantity. Always compare multiple suppliers for the best deal.
                    </p>
                </div>
            </section>

            {/* Roofing Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Roofing Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-amber-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Always measure twice:</strong> Double-check your roof measurements. Even small errors can lead to significant material waste or shortage.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-amber-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Order 10-15% extra:</strong> Always order more material than calculated. You'll need extra for cuts, overlaps, and potential damage during installation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-amber-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider future repairs:</strong> Keep extra sheets from the same batch for future repairs. Color matching can be difficult later.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-amber-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check local building codes:</strong> Ensure your roofing material and installation method comply with local regulations and building codes.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-amber-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Professional installation:</strong> For complex roofs or expensive materials, hire professional roofers. DIY can save money but mistakes are costly.</span>
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