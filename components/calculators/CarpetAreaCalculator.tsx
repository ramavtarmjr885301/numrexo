// "use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is carpet area?",
        a: "Carpet area is the actual usable area inside a property where you can lay a carpet. It includes bedrooms, living rooms, kitchen, and bathrooms. It excludes wall thickness, balcony, and common areas.",
    },
    {
        q: "How to calculate carpet area?",
        a: "Carpet Area = Length × Width of each room (sum of all rooms). For irregular shapes, divide into rectangles. Subtract wall thickness (usually 0.5-1 feet) from total built-up area.",
    },
    {
        q: "What is the difference between carpet area, built-up area, and super built-up area?",
        a: "Carpet area = usable area. Built-up area = carpet area + wall thickness. Super built-up area = built-up area + common areas (lobby, stairs, lift). Super built-up is usually 20-30% more than carpet area.",
    },
    {
        q: "Why is carpet area important for buyers?",
        a: "Carpet area is what you actually get to use. RERA (Real Estate Regulatory Authority) mandates that builders must disclose carpet area to protect buyers from inflated super built-up area claims.",
    },
    {
        q: "What is the standard wall thickness in Indian homes?",
        a: "Standard wall thickness in Indian homes: External walls: 9-12 inches (0.75-1 feet), Internal walls: 4-6 inches (0.33-0.5 feet). Wall area typically adds 15-20% to carpet area to calculate built-up area.",
    },
    {
        q: "How to calculate carpet area from built-up area?",
        a: "Carpet Area = Built-up Area ÷ 1.15 to 1.20 (depending on wall thickness). Example: 1200 sq ft built-up ÷ 1.18 = 1017 sq ft carpet area. Always ask builder for exact loading factor.",
    },
    {
        q: "What is RERA carpet area?",
        a: "As per RERA (Real Estate Regulatory Authority), carpet area includes net usable floor area of the apartment excluding external walls, service shafts, balcony, and common areas. Builders must legally disclose carpet area in sale agreements.",
    },
    {
        q: "How to measure irregular-shaped rooms?",
        a: "Divide irregular rooms into rectangles: Measure each rectangular section separately (Length × Width), sum all areas. For L-shaped rooms, split into two rectangles. For circular areas, use π × r² formula.",
    },
    {
        q: "What is loading factor in real estate?",
        a: "Loading factor = (Super Built-up Area - Carpet Area) ÷ Carpet Area × 100. Typical loading: 30-40% for luxury apartments, 20-30% for mid-range, 10-20% for budget housing. Lower loading means better value.",
    },
    {
        q: "How to verify builder's carpet area claims?",
        a: "1) Check RERA-registered carpet area in agreement, 2) Physically measure rooms after possession, 3) Use our calculator to cross-verify, 4) Compare with similar properties, 5) Consult a professional surveyor for disputes.",
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
    name: "Carpet Area Calculator – Calculate Usable Area",
    description: "Calculate carpet area of your property. Find actual usable area excluding walls. Essential for home buyers and real estate.",
    url: "https://numrexo.com/construction/carpet-area-calculator",
    applicationCategory: "ConstructionApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Carpet area calculation", "Multiple rooms", "Built-up area conversion", "RERA compliant"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: "https://numrexo.com/construction" },
        { "@type": "ListItem", position: 3, name: "Carpet Area Calculator", item: "https://numrexo.com/construction/carpet-area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

interface Room {
    id: number;
    length: string;
    width: string;
    name: string;
}

// Example 2-bedroom flat so the first render shows a worked result.
const DEFAULT_ROOMS: Room[] = [
    { id: 1, length: "15", width: "12", name: "Living Room" },
    { id: 2, length: "12", width: "14", name: "Master Bedroom" },
    { id: 3, length: "8", width: "10", name: "Kitchen" },
    { id: 4, length: "5", width: "7", name: "Bathroom" },
];

export default function CarpetAreaCalculator() {
    const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS.map(r => ({ ...r })));
    const [builtUpArea, setBuiltUpArea] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addRoom = () => {
        const newId = Math.max(...rooms.map(r => r.id), 0) + 1;
        setRooms([...rooms, { id: newId, length: "", width: "", name: `Room ${rooms.length + 1}` }]);
    };

    const removeRoom = (id: number) => {
        if (rooms.length > 1) {
            setRooms(rooms.filter(r => r.id !== id));
        }
    };

    const updateRoom = (id: number, field: string, value: string) => {
        setRooms(rooms.map(room => room.id === id ? { ...room, [field]: value } : room));
    };

    const calculate = () => {
        let totalArea = 0;
        let roomDetails: { name: string; area: number }[] = [];

        for (const room of rooms) {
            const length = parseFloat(room.length);
            const width = parseFloat(room.width);
            if (!isNaN(length) && !isNaN(width) && length > 0 && width > 0) {
                const area = length * width;
                totalArea += area;
                roomDetails.push({ name: room.name, area });
            }
        }

        if (totalArea === 0) {
            setResult(null);
            return;
        }

        const builtUp = parseFloat(builtUpArea);
        let wallArea = 0;
        let superBuiltUpArea = 0;
        let efficiency = 0;

        if (!isNaN(builtUp) && builtUp > 0) {
            wallArea = builtUp - totalArea;
            efficiency = (totalArea / builtUp) * 100;
        } else {
            const estimatedBuiltUp = totalArea * 1.18;
            wallArea = estimatedBuiltUp - totalArea;
            superBuiltUpArea = estimatedBuiltUp * 1.25;
            efficiency = (totalArea / estimatedBuiltUp) * 100;
        }

        setResult({
            carpetArea: totalArea.toFixed(2),
            roomDetails,
            roomCount: rooms.length,
            builtUpArea: builtUp ? builtUp.toFixed(2) : (totalArea * 1.18).toFixed(2),
            wallArea: wallArea.toFixed(2),
            superBuiltUpArea: superBuiltUpArea > 0 ? superBuiltUpArea.toFixed(2) : (totalArea * 1.475).toFixed(2),
            efficiency: efficiency.toFixed(1),
        });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [rooms, builtUpArea]);

    const resetForm = () => {
        setRooms(DEFAULT_ROOMS.map(r => ({ ...r })));
        setBuiltUpArea("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/construction" itemProp="item" className="hover:text-ink-soft">Construction Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-ink-soft">Carpet Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline flex justify-between items-center">
                        <div><h3 className="font-semibold">Room Details</h3><p className="text-xs text-ink-faint">Enter dimensions for each room</p></div>
                        <button onClick={addRoom} className="px-3 py-1 text-sm bg-blue-600 rounded-lg hover:bg-blue-600">+ Add Room</button>
                    </div>
                    <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
                        {rooms.map(room => (
                            <div key={room.id} className="flex flex-wrap gap-2 items-center border-b border-hairline pb-3">
                                <input type="text" placeholder="Room name" value={room.name} onChange={(e) => updateRoom(room.id, "name", e.target.value)} className="w-28 px-2 py-2 bg-surface border border-hairline rounded-lg text-ink text-sm" />
                                <div className="flex-1 relative"><input type="number" step="0.1" placeholder="Length" value={room.length} onChange={(e) => updateRoom(room.id, "length", e.target.value)} className="w-full px-3 py-2 bg-surface border border-hairline rounded-lg text-ink text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">ft</span></div>
                                <div className="flex-1 relative"><input type="number" step="0.1" placeholder="Width" value={room.width} onChange={(e) => updateRoom(room.id, "width", e.target.value)} className="w-full px-3 py-2 bg-surface border border-hairline rounded-lg text-ink text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">ft</span></div>
                                {rooms.length > 1 && <button onClick={() => removeRoom(room.id)} className="px-2 py-2 text-red-600 hover:text-red-600">✕</button>}
                            </div>
                        ))}
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        <div><label className="block text-xs font-semibold text-ink-faint mb-2">Built-up Area (Optional)</label><div className="relative"><input type="number" step="0.1" placeholder="Enter if known" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">sq ft</span></div><p className="text-xs text-ink-faint mt-1">If not entered, calculator will estimate</p></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Carpet Area →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Area Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Add rooms and enter dimensions"
                    mainResult={result ? { label: "Total Carpet Area", value: `${result.carpetArea} sq ft`, color: "text-blue-600" } : undefined}
                    extraRows={result ? [
                        ...result.roomDetails.map((room: any, i: number) => ({ label: `${room.name} Area`, value: `${room.area.toFixed(2)} sq ft` })),
                        { label: "Built-up Area", value: `${result.builtUpArea} sq ft`, valueColor: "text-yellow-700" },
                        { label: "Wall Area", value: `${result.wallArea} sq ft` },
                        { label: "Super Built-up Area (est.)", value: `${result.superBuiltUpArea} sq ft` },
                        { label: "Area Efficiency", value: `${result.efficiency}%` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Carpet Area Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Carpet Area Calculator</strong> helps home buyers, real estate investors, and property owners calculate the actual usable area of their property. Carpet area is the net usable floor area within the walls — the space where you can actually lay a carpet.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Understanding carpet area is crucial because builders often quote prices on super built-up area which includes common areas like lobbies, stairs, and lifts. Our calculator helps you determine the real area you're getting and verify builder claims, ensuring you don't overpay for unusable space.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Carpet Area Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Click <strong className="text-ink">"+ Add Room"</strong> to add each room in your property (bedrooms, living room, kitchen, bathrooms).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Enter the <strong className="text-ink">length and width</strong> of each room in feet. Use a measuring tape for accuracy.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> (Optional) Enter the <strong className="text-ink">built-up area</strong> if you know it from your property documents.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> Click <strong className="text-ink">"Calculate Carpet Area"</strong> to see your total carpet area, built-up area estimate, and area efficiency.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> Use the <strong className="text-ink">Reset</strong> button to clear all inputs and start a new calculation for a different property.</p>
                </div>
            </section>

            {/* Why Carpet Area Matters Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Carpet Area Matters for Home Buyers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ RERA Compliance</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">RERA mandates builders to disclose carpet area in sale agreements. Verify that the carpet area matches what you're paying for.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Fair Price Comparison</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Compare properties based on cost per square foot of carpet area — what you actually use — not inflated super built-up area.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Avoid Overpaying</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Some builders use loading factors as high as 40-50%. Our calculator shows your true area, helping you negotiate better prices.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Interior Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Accurate carpet area helps you plan furniture placement, flooring requirements, and interior design budgets correctly.</p>
                    </div>
                </div>
            </section>

            {/* Room Dimension Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Room Dimension Tips & Standard Sizes</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Room Type</th><th className="text-left py-3 px-4 text-ink-faint">Standard Size (ft)</th><th className="text-left py-3 px-4 text-ink-faint">Area (sq ft)</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Master Bedroom</td><td className="py-2 px-4">12 × 14</td><td className="py-2 px-4 text-yellow-700">168</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Living Room</td><td className="py-2 px-4">15 × 12</td><td className="py-2 px-4 text-yellow-700">180</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Kitchen</td><td className="py-2 px-4">8 × 10</td><td className="py-2 px-4 text-yellow-700">80</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Bathroom</td><td className="py-2 px-4">5 × 7</td><td className="py-2 px-4 text-yellow-700">35</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Dining Room</td><td className="py-2 px-4">10 × 12</td><td className="py-2 px-4 text-yellow-700">120</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">*These are standard sizes. Actual dimensions vary by property type and city.</p>
            </section>

            {/* RERA Rules */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">RERA Rules on Carpet Area</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span>Builders must <strong className="text-ink">mandatorily disclose carpet area</strong> in sale agreements as per RERA Act Section 4(2)(l)(D).</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span>RERA defines carpet area as <strong className="text-ink">net usable floor area</strong> excluding external walls, service shafts, balcony, and common areas.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span>Any <strong className="text-ink">deviation beyond 3%</strong> from disclosed carpet area requires buyer consent and price adjustment.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">✓</span><span>Builders cannot charge for <strong className="text-ink">common areas and amenities</strong> beyond the super built-up area.</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-ink mb-4">Area Types Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4"><h3 className="text-sm font-semibold text-green-600 mb-2">Carpet Area</h3><p className="text-xs text-ink-faint">Actual usable area inside walls. What RERA mandates disclosure of.</p></div>
                    <div className="bg-surface border border-hairline rounded-xl p-4"><h3 className="text-sm font-semibold text-yellow-700 mb-2">Built-up Area</h3><p className="text-xs text-ink-faint">Carpet area + wall thickness (usually 15-20% more).</p></div>
                    <div className="bg-surface border border-hairline rounded-xl p-4"><h3 className="text-sm font-semibold text-blue-600 mb-2">Super Built-up Area</h3><p className="text-xs text-ink-faint">Built-up area + common areas (lobby, stairs, lifts). 25-35% more than carpet area.</p></div>
                </div>
            </section>

            {/* Loading Factor Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Loading Factor Guide (Super Built-up vs Carpet Area)</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Property Type</th><th className="text-left py-3 px-4 text-ink-faint">Typical Loading</th><th className="text-left py-3 px-4 text-ink-faint">Carpet for 1000 sq ft Super</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Budget Housing</td><td className="py-2 px-4 text-green-600">15-20%</td><td className="py-2 px-4">830-870 sq ft</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Mid-Range Apartments</td><td className="py-2 px-4 text-yellow-700">25-30%</td><td className="py-2 px-4">770-800 sq ft</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Luxury Apartments</td><td className="py-2 px-4 text-orange-600">35-40%</td><td className="py-2 px-4">710-740 sq ft</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Premium Villas</td><td className="py-2 px-4 text-red-600">40-50%</td><td className="py-2 px-4">650-710 sq ft</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-ink">{item.q}</span><span className={`text-ink-faint text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}