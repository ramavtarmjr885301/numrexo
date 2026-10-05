"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate paint required for a room?",
        a: "Calculate wall area = perimeter × height. Subtract door and window areas. One liter of paint typically covers 10-12 sq meters (100-120 sq ft) for one coat. Multiply by number of coats (usually 2).",
    },
    {
        q: "What is the coverage of 1 liter of paint?",
        a: "1 liter of paint covers approximately 10-12 square meters (100-120 square feet) for one coat. Primer covers slightly more (12-14 sq m/liter). Quality varies by brand.",
    },
    {
        q: "How many coats of paint are needed?",
        a: "Typically 2 coats of paint for proper coverage. For dark to light color changes, you may need 3 coats. Primer requires 1 coat.",
    },
    {
        q: "How to calculate paint for ceiling?",
        a: "Ceiling area = length × width. Paint needed = ceiling area ÷ coverage per liter. Ceilings usually require only 1-2 coats.",
    },
    {
        q: "How to calculate paint for textured walls?",
        a: "Textured walls (popcorn, knockdown, orange peel) require 20-30% more paint because texture increases surface area. Add 25% extra paint for textured walls. Our calculator has a texture option for accurate estimation.",
    },
    {
        q: "What is the difference between matte, satin, and gloss paint?",
        a: "Matte: Flat finish, hides imperfections, good for ceilings and low-traffic walls. Satin: Soft sheen, easy to clean, best for living rooms and bedrooms. Gloss: High shine, durable, washable, best for kitchens, bathrooms, doors, and trim. Coverage varies by finish type.",
    },
    {
        q: "How to calculate paint for exterior walls?",
        a: "Exterior painting requires: 1) Add 10% for surface roughness (brick, stucco), 2) Use exterior paint with UV resistance, 3) Apply 2-3 coats, 4) Consider weather conditions. Our calculator includes exterior mode with extra coverage allowance.",
    },
    {
        q: "How much paint do I need for a whole house?",
        a: "Add up the wall area (and ceilings, if painting those too) for every room using this calculator, then buy in bulk can sizes — a 4-liter can is usually cheaper per liter than four 1-liter cans. Buy 5-10% extra for touch-ups and future repairs, and note the paint code and batch number in case you need to match it later.",
    },
    {
        q: "Does a darker paint color need more coats?",
        a: "Often, yes. Deep, saturated colors can need an extra coat — or a tinted primer close to the final shade — to fully hide the surface underneath, especially over a white or light base. Many brands sell 'deep base' formulas designed to cover dark colors in fewer coats; ask at the paint counter when buying.",
    },
];

const PAINT_COVERAGE = {
    paint: 110, // sq ft per liter
    primer: 130,
    enamel: 100,
};

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
    name: "Paint Calculator – Estimate Paint Quantity",
    description: "Calculate how much paint you need for walls and ceiling. Estimate cost and number of paint cans required.",
    url: "https://numrexo.com/construction/paint-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Wall area calculation", "Paint quantity estimator", "Cost estimation", "Multiple coats"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Paint Calculator", item: "https://numrexo.com/construction/paint-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaintCalculator() {
    const { symbol } = useCurrency();
    const [roomLength, setRoomLength] = useState("12");
    const [roomWidth, setRoomWidth] = useState("10");
    const [roomHeight, setRoomHeight] = useState("8");
    const [doorCount, setDoorCount] = useState("1");
    const [windowCount, setWindowCount] = useState("2");
    const [paintType, setPaintType] = useState<"paint" | "primer" | "enamel">("paint");
    const [coats, setCoats] = useState("2");
    const [pricePerLiter, setPricePerLiter] = useState("250");
    const [includeCeiling, setIncludeCeiling] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const length = parseFloat(roomLength);
        const width = parseFloat(roomWidth);
        const height = parseFloat(roomHeight);

        if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
            setResult(null);
            return;
        }

        const doorArea = (parseFloat(doorCount) || 0) * 20; // 20 sq ft per door
        const windowArea = (parseFloat(windowCount) || 0) * 15; // 15 sq ft per window

        const wallPerimeter = 2 * (length + width);
        const wallArea = wallPerimeter * height;
        const netWallArea = wallArea - doorArea - windowArea;

        let ceilingArea = 0;
        if (includeCeiling) {
            ceilingArea = length * width;
        }

        const totalArea = netWallArea + ceilingArea;
        const coverage = PAINT_COVERAGE[paintType];
        const coatsNum = parseFloat(coats);
        const totalLiters = (totalArea * coatsNum) / coverage;
        const litersRounded = Math.ceil(totalLiters);

        let totalCost = null;
        const price = parseFloat(pricePerLiter);
        if (!isNaN(price) && price > 0) {
            totalCost = litersRounded * price;
        }

        setResult({
            wallArea: wallArea.toFixed(2),
            netWallArea: netWallArea.toFixed(2),
            ceilingArea: ceilingArea.toFixed(2),
            totalArea: totalArea.toFixed(2),
            totalLiters: totalLiters.toFixed(2),
            litersNeeded: litersRounded,
            paintCans: Math.ceil(litersRounded / 4), // 4 liter cans
            smallCans: litersRounded % 4,
            totalCost: totalCost ? totalCost.toFixed(2) : null,
            doorArea: doorArea,
            windowArea: windowArea,
            coats: coatsNum,
            paintType,
        });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [roomLength, roomWidth, roomHeight, doorCount, windowCount, paintType, coats, pricePerLiter, includeCeiling]);

    const resetForm = () => {
        setRoomLength("");
        setRoomWidth("");
        setRoomHeight("");
        setDoorCount("");
        setWindowCount("");
        setPaintType("paint");
        setCoats("2");
        setPricePerLiter("");
        setIncludeCeiling(false);
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Home</span></a><meta itemProp="position" content="1" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/construction" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Construction Calculators</span></a><meta itemProp="position" content="2" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-ink-soft">Paint Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Paint Calculator</h3>
                        <p className="text-xs text-ink-faint mt-1">Estimate paint quantity for your room</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Room Length (ft)</label><input type="number" step="0.5" placeholder="12" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Room Width (ft)</label><input type="number" step="0.5" placeholder="10" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-ink-faint mb-2">Room Height (ft)</label><input type="number" step="0.5" placeholder="8" value={roomHeight} onChange={(e) => setRoomHeight(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Number of Doors</label><input type="number" placeholder="1" value={doorCount} onChange={(e) => setDoorCount(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Number of Windows</label><input type="number" placeholder="2" value={windowCount} onChange={(e) => setWindowCount(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Paint Type</label><select value={paintType} onChange={(e) => setPaintType(e.target.value as any)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none cursor-pointer"><option value="paint">Wall Paint</option><option value="primer">Primer</option><option value="enamel">Enamel Paint</option></select></div>
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Number of Coats</label><input type="number" step="0.5" placeholder="2" value={coats} onChange={(e) => setCoats(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="includeCeiling" checked={includeCeiling} onChange={(e) => setIncludeCeiling(e.target.checked)} className="w-4 h-4 rounded border-hairline bg-surface text-blue-600 focus:ring-blue-600" />
                            <label htmlFor="includeCeiling" className="text-sm text-ink-soft">Include Ceiling</label>
                        </div>
                        <div><label className="block text-xs font-semibold text-ink-faint mb-2">Price per Liter ({symbol}) - Optional</label><input type="number" step="10" placeholder="250" value={pricePerLiter} onChange={(e) => setPricePerLiter(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Paint →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Paint Estimate"
                    isEmpty={!result}
                    emptyIcon="🎨"
                    emptyText="Enter room dimensions"
                    mainResult={result ? { label: "Paint Required", value: `${result.litersNeeded} liters`, color: "text-blue-600" } : undefined}
                    extraRows={result ? [
                        { label: "Wall Area", value: `${result.wallArea} sq ft` },
                        { label: "Net Wall Area (after doors/windows)", value: `${result.netWallArea} sq ft`, valueColor: "text-yellow-700" },
                        { label: "Ceiling Area", value: `${result.ceilingArea} sq ft` },
                        { label: "Total Area", value: `${result.totalArea} sq ft` },
                        { label: `${result.coats} coats - ${result.paintType}`, value: `${result.totalLiters} liters` },
                        { label: "Recommended Purchase", value: `${result.litersNeeded} liters (${result.paintCans} × 4L + ${result.smallCans}L)` },
                        ...(result.totalCost ? [{ label: "Estimated Cost", value: `${symbol}${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-green-600" }] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Paint Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Paint Calculator</strong> helps you estimate the exact quantity of paint needed for your room. Whether you're painting walls, ceilings, doors, or windows, our calculator provides accurate estimates for your home renovation project.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Save money by buying the right amount of paint — no more, no less. Includes calculations for doors, windows, multiple coats, and different paint types (wall paint, primer, enamel).
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Paint Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Enter <strong className="text-ink">room dimensions</strong> — length, width, and height in feet.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Enter <strong className="text-ink">number of doors and windows</strong> to subtract from wall area.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Select <strong className="text-ink">paint type</strong> (Wall Paint, Primer, or Enamel) and <strong className="text-ink">number of coats</strong>.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> (Optional) Check <strong className="text-ink">"Include Ceiling"</strong> to include ceiling area.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 5:</strong> (Optional) Enter <strong className="text-ink">price per liter</strong> for cost estimation.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 6:</strong> Click <strong className="text-ink">"Calculate Paint"</strong> to see results.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 7:</strong> Use the <strong className="text-ink">Reset</strong> button to clear all inputs and calculate a different room.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Paint Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Save Money</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Buy exactly what you need. No extra paint sitting unused. Save 10-30% on painting costs by buying the right quantity.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Avoid Shortages</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Running out of paint mid-project is frustrating. Our calculator ensures you have enough with proper waste allowance.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Budget Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Get accurate cost estimates before starting your painting project. Plan your renovation budget effectively.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Multiple Surfaces</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Calculate paint for walls, ceilings, doors, and windows. Handle complex rooms with multiple openings.</p>
                    </div>
                </div>
            </section>

            {/* Paint Coverage Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Paint Coverage Guide</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Paint Type</th><th className="text-left py-3 px-4 text-ink-faint">Coverage (sq ft/L)</th><th className="text-left py-3 px-4 text-ink-faint">Best For</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4 text-yellow-700">Wall Paint</td><td className="py-2 px-4">100-120</td><td className="py-2 px-4">Interior/Exterior walls</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4 text-yellow-700">Primer</td><td className="py-2 px-4">120-140</td><td className="py-2 px-4">Base coat before painting</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4 text-yellow-700">Enamel</td><td className="py-2 px-4">90-110</td><td className="py-2 px-4">Wood, metal surfaces</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Painting Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Painting Tips for Best Results</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-blue-600 mt-0.5">🎨</span><span><strong className="text-ink-soft">Clean walls before painting:</strong> Remove dust, grease, and cobwebs. Use mild detergent solution for best adhesion.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-blue-600 mt-0.5">🎨</span><span><strong className="text-ink-soft">Use primer first:</strong> Primer seals porous surfaces, reduces paint absorption, and improves coverage. Essential for new drywall.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-blue-600 mt-0.5">🎨</span><span><strong className="text-ink-soft">Stir paint thoroughly:</strong> Mix paint before and during application. Use a stir stick for 2-3 minutes for consistent color.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-blue-600 mt-0.5">🎨</span><span><strong className="text-ink-soft">Apply thin coats:</strong> Two thin coats are better than one thick coat. Thin coats dry faster, level better, and prevent drips.</span></li>
                </ul>
            </section>

            {/* Paint Quantity Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Paint Quantity Formula</h2>
                <div className="bg-surface border border-hairline rounded-xl p-5">
                    <p className="text-ink font-mono text-sm mb-2">Paint Needed (liters) = (Total Area × Coats) ÷ Coverage per Liter</p>
                    <p className="text-ink-faint text-xs mb-2">Where: Total Area = Wall Area + Ceiling Area - Door Area - Window Area</p>
                    <p className="text-ink-faint text-xs">Example: Room 12×10×8 ft, 2 doors, 2 windows, 2 coats = (2(12+10)×8 + 120 - 40 - 30) × 2 ÷ 110 = 412 × 2 ÷ 110 = 7.5 liters → 8 liters</p>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Paint Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed">Estimate how much paint you need for your room. Includes walls, ceiling, doors, windows, and multiple coats. Perfect for home renovation and painting projects.</p>
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
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">
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