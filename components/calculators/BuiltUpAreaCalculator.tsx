"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is built-up area?",
        a: "Built-up area is the total covered area of a property including carpet area plus wall thickness. It includes all rooms, balcony, and terrace. It excludes common areas like lobby, stairs, and lifts.",
    },
    {
        q: "How to calculate built-up area from carpet area?",
        a: "Built-up Area = Carpet Area × 1.15 to 1.20 (for wall thickness). Example: 1000 sq ft carpet area × 1.18 = 1180 sq ft built-up area.",
    },
    {
        q: "What is the difference between built-up area and super built-up area?",
        a: "Built-up area includes carpet area + walls + balcony. Super built-up area adds common areas (lobby, stairs, lifts, garden).",
    },
    {
        q: "Why is built-up area important?",
        a: "Builders often quote prices on super built-up area. Knowing built-up area helps you calculate actual cost per usable square foot.",
    },
    {
        q: "What is carpet area vs built-up area vs super built-up area?",
        a: "Carpet area is the actual usable floor area inside walls. Built-up area adds wall thickness and balcony. Super built-up area adds common amenities like lobby, stairs, lifts, clubhouse, garden, and parking. Understanding these differences helps you evaluate property prices accurately and avoid overpaying for unusable space.",
    },
    {
        q: "What is a typical wall thickness factor in Indian real estate?",
        a: "In Indian real estate, wall thickness typically adds 15-20% to carpet area. Luxury apartments may have thicker walls (20-25%) while budget housing may have 10-15%. Always ask the builder for the exact loading factor before signing any agreement.",
    },
    {
        q: "How to negotiate property price based on built-up area?",
        a: "Ask the builder to disclose all three areas: carpet, built-up, and super built-up. Calculate cost per square foot for carpet area — this is what you actually use. Compare multiple properties using carpet area, not super built-up area, for fair comparison.",
    },
    {
        q: "What is the RERA rule on built-up area disclosure?",
        a: "RERA mandates builders to disclose carpet area, built-up area, and super built-up area in the sales agreement. Builders cannot charge for common areas arbitrarily. RERA also limits the loading factor to reasonable percentages.",
    },
    {
        q: "How to calculate cost per square foot for carpet area?",
        a: "Divide total property cost by carpet area. Example: ₹1 crore ÷ 1000 sq ft carpet = ₹10,000 per sq ft. This is your true cost per usable square foot. Compare this with other properties to find the best value.",
    },
    {
        q: "Does balcony count as built-up area?",
        a: "Yes, balcony area is typically included in built-up area. Some builders include 50% of open balcony area while others include 100% in super built-up area. Check your agreement carefully for balcony calculation methodology.",
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
    name: "Built-up Area Calculator – Calculate Total Covered Area",
    description: "Calculate built-up area from carpet area. Includes wall thickness and balcony. Perfect for home buyers and real estate investors.",
    url: "https://www.numrexo.com/construction/built-up-area-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Built-up area calculation", "Wall thickness factor", "Super built-up conversion", "Cost analysis", "RERA compliant"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://www.numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Built-up Area Calculator", item: "https://www.numrexo.com/construction/built-up-area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BuiltUpAreaCalculator() {
    const [carpetArea, setCarpetArea] = useState("");
    const [wallFactor, setWallFactor] = useState("18");
    const [balconyArea, setBalconyArea] = useState("");
    const [pricePerSqFt, setPricePerSqFt] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const carpet = parseFloat(carpetArea);
        if (!carpet || carpet <= 0) {
            alert("Please enter a valid carpet area");
            return;
        }

        const wallPct = parseFloat(wallFactor) / 100;
        const balcony = parseFloat(balconyArea) || 0;

        const builtUpArea = carpet * (1 + wallPct) + balcony;
        const superBuiltUpArea = builtUpArea * 1.25;

        let totalCost = null;
        let costPerSqFtBuiltUp = null;
        let carpetCostPerSqFt = null;

        const price = parseFloat(pricePerSqFt);
        if (!isNaN(price) && price > 0) {
            totalCost = price * superBuiltUpArea;
            costPerSqFtBuiltUp = totalCost / builtUpArea;
            carpetCostPerSqFt = totalCost / carpet;
        }

        setResult({
            carpetArea: carpet,
            builtUpArea: builtUpArea.toFixed(2),
            superBuiltUpArea: superBuiltUpArea.toFixed(2),
            wallPercentage: parseFloat(wallFactor),
            wallArea: (builtUpArea - carpet - balcony).toFixed(2),
            balconyArea: balcony,
            totalCost: totalCost ? totalCost.toFixed(2) : null,
            costPerSqFtBuiltUp: costPerSqFtBuiltUp ? costPerSqFtBuiltUp.toFixed(2) : null,
            carpetCostPerSqFt: carpetCostPerSqFt ? carpetCostPerSqFt.toFixed(2) : null,
        });
    };

    const resetForm = () => {
        setCarpetArea("");
        setWallFactor("18");
        setBalconyArea("");
        setPricePerSqFt("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/construction" itemProp="item" className="hover:text-gray-300">Construction Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Built-up Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Built-up Area Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate total covered area including walls</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Carpet Area (sq ft)</label><div className="relative"><input type="number" step="0.1" placeholder="1000" value={carpetArea} onChange={(e) => setCarpetArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Wall Thickness Factor (%)</label><div className="relative"><input type="number" step="0.5" placeholder="18" value={wallFactor} onChange={(e) => setWallFactor(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Standard: 15-20%</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Balcony Area (sq ft)</label><div className="relative"><input type="number" step="0.1" placeholder="0" value={balconyArea} onChange={(e) => setBalconyArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per sq ft (Super Built-up)</label><div className="relative"><input type="number" step="0.1" placeholder="5000" value={pricePerSqFt} onChange={(e) => setPricePerSqFt(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Area Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏢"
                    emptyText="Enter carpet area to calculate"
                    mainResult={result ? { label: "Built-up Area", value: `${result.builtUpArea} sq ft`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Carpet Area", value: `${result.carpetArea} sq ft` },
                        { label: "Super Built-up Area", value: `${result.superBuiltUpArea} sq ft`, valueColor: "text-yellow-400" },
                        { label: "Wall Area", value: `${result.wallArea} sq ft` },
                        { label: "Balcony Area", value: `${result.balconyArea} sq ft` },
                        ...(result.totalCost ? [
                            { label: "Total Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, valueColor: "text-blue-400" },
                            { label: "Cost/sq ft (Built-up)", value: `₹${result.costPerSqFtBuiltUp}` },
                            { label: "Cost/sq ft (Carpet)", value: `₹${result.carpetCostPerSqFt}` },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1600 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Built-up Area Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Built-up Area Calculator</strong> is an essential tool for home buyers, real estate investors, property agents, and construction professionals. It helps you calculate the total covered area of a property including wall thickness and balcony — something that builders often don't explain clearly.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    In Indian real estate, understanding the difference between carpet area, built-up area, and super built-up area can save you lakhs of rupees. Builders often quote prices on super built-up area which includes common spaces like lobbies, stairs, lifts, gardens, and clubhouses. This calculator helps you cut through the confusion and find out what you're actually paying for.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're buying an apartment, a villa, or a commercial space, knowing your built-up area helps you negotiate better and avoid paying premium prices for unusable space. Our calculator is RERA-compliant and follows standard real estate calculation methods.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Built-up Area Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">Carpet Area</strong> — the actual usable floor area inside the walls (available in your property agreement).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Set the <strong className="text-white">Wall Thickness Factor</strong> — typically 15-20% for most residential properties. Luxury apartments may have 20-25% for thicker walls.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter <strong className="text-white">Balcony Area</strong> (if any) — this is usually included in built-up area.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Optional: Enter the <strong className="text-white">Price per square foot</strong> quoted by the builder (usually on super built-up area) to see your true cost per usable square foot.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">Calculate</strong> to see your built-up area, super built-up area, wall area, and detailed cost analysis.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start fresh for a new property comparison.</p>
                </div>
            </section>

            {/* Understanding Area Types */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Understanding Carpet Area, Built-up Area, and Super Built-up Area</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Carpet Area</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">The actual usable floor area inside the walls. What you can actually stand on and use. This excludes wall thickness, balcony, and common areas. RERA mandates disclosure of carpet area in sales agreements.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Built-up Area</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Carpet area + wall thickness + balcony. This is the total covered area of your apartment. Typically 15-20% more than carpet area.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Super Built-up Area</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Built-up area + common areas (lobby, stairs, lifts, garden, clubhouse, parking). Builders often quote prices on super built-up area. Typically 25-35% more than carpet area.</p>
                    </div>
                </div>
            </section>

            {/* Why This Matters */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Built-up Area Matters for Home Buyers</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">1. Avoid Overpaying:</strong> Builders often quote ₹5,000-10,000 per square foot on super built-up area. The same property may cost ₹8,000-15,000 per square foot on carpet area. Our calculator shows your true cost.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">2. Compare Properties Fairly:</strong> One builder may have 20% loading while another has 30% loading. Comparing carpet area gives you an apples-to-apples comparison.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">3. RERA Compliance:</strong> Under RERA, builders must disclose carpet area in the agreement. Use our calculator to verify that the built-up area quoted matches RERA standards.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">4. Negotiation Power:</strong> Armed with accurate built-up and carpet area calculations, you can negotiate better prices with builders who inflate super built-up area.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">5. Resale Value:</strong> Properties with lower loading factors (smaller difference between carpet and super built-up) have better resale value because buyers pay for usable space, not common areas.</p>
                </div>
            </section>

            {/* Real Estate Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Examples</h2>
                <div className="space-y-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Example 1: Budget Apartment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Carpet Area: 800 sq ft | Wall Factor: 15% | Balcony: 0 sq ft → Built-up Area: 920 sq ft | Super Built-up: 1,150 sq ft (25% loading). If builder quotes ₹5,000/sq ft on super built-up, total cost = ₹57.5 lakhs. Your actual cost per carpet sq ft = ₹71,875!</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Example 2: Luxury Apartment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Carpet Area: 1,500 sq ft | Wall Factor: 20% | Balcony: 100 sq ft → Built-up Area: 1,900 sq ft | Super Built-up: 2,470 sq ft (30% loading). Builder quote ₹12,000/sq ft on super built-up = ₹2.96 crores. True cost per carpet sq ft = ₹19,733!</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Example 3: Premium Villa</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Carpet Area: 2,000 sq ft | Wall Factor: 18% | Balcony: 200 sq ft → Built-up Area: 2,560 sq ft | Super Built-up: 3,200 sq ft (25% loading). Builder quote ₹8,000/sq ft on super built-up = ₹2.56 crores. True cost per carpet sq ft = ₹12,800.</p>
                    </div>
                </div>
            </section>

            {/* Area Conversion Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Area Conversion Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Area Type</th><th className="text-left py-3 px-4 text-gray-400">Conversion Factor</th><th className="text-left py-3 px-4 text-gray-400">Example (1000 sq ft carpet)</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Carpet to Built-up</td><td className="py-2 px-4">× 1.15 to 1.20</td><td className="py-2 px-4 text-yellow-400">1,150 - 1,200 sq ft</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Built-up to Super</td><td className="py-2 px-4">× 1.20 to 1.30</td><td className="py-2 px-4 text-yellow-400">1,380 - 1,560 sq ft</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Carpet to Super</td><td className="py-2 px-4">× 1.40 to 1.55</td><td className="py-2 px-4 text-yellow-400">1,400 - 1,550 sq ft</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Tips for Home Buyers */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Tips for Home Buyers</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span>Always ask the builder for carpet area, built-up area, and super built-up area in writing before signing.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span>Compare multiple properties using cost per square foot of carpet area, not super built-up area.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span>Lower loading factor (10-20%) means you're paying less for common areas — better value for money.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span>RERA mandates that builders cannot charge for common areas arbitrarily beyond reasonable limits.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span>Use our calculator before visiting any property to understand what you're actually paying for.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span>Check if balcony area is included at 50% or 100% — some builders include only 50% in super built-up area.</span></li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}