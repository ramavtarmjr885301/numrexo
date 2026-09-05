"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is the distance formula?",
        a: "The distance formula calculates the straight-line distance between two points: d = √[(x₂ - x₁)² + (y₂ - y₁)²]. Derived from the Pythagorean theorem.",
    },
    {
        q: "How to find distance between two points?",
        a: "Subtract x coordinates (Δx), subtract y coordinates (Δy), square both, add them, then take square root. Example: (1,2) and (4,6) → Δx=3, Δy=4 → d = √(9+16) = √25 = 5.",
    },
    {
        q: "What is the difference between distance and displacement?",
        a: "Distance is the total path length (scalar). Displacement is straight-line distance from start to end (vector). The distance formula gives displacement, not total path length.",
    },
    {
        q: "Can distance be negative?",
        a: "No, distance is always positive because we square the differences before adding them. The formula uses absolute differences.",
    },
    {
        q: "What is the distance formula in 3D?",
        a: "For 3D coordinates (x₁,y₁,z₁) and (x₂,y₂,z₂): d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]. Add the squared difference in z-coordinates. Used in 3D modeling, physics, and engineering.",
    },
    {
        q: "How to find distance between two points on a graph?",
        a: "1) Locate both points on coordinate plane. 2) Count horizontal distance (Δx) and vertical distance (Δy). 3) Apply distance formula: √(Δx² + Δy²). On graph paper, you can also draw right triangle and measure hypotenuse.",
    },
    {
        q: "What is the distance from a point to a line?",
        a: "Formula: d = |Ax₁ + By₁ + C| ÷ √(A² + B²) for line Ax + By + C = 0. Example: Distance from (3,4) to line 3x+4y-5=0 = |9+16-5| ÷ 5 = 20÷5 = 4 units.",
    },
    {
        q: "How to calculate distance using latitude and longitude?",
        a: "Use Haversine formula: d = 2R × arcsin(√[sin²(Δφ/2) + cos φ₁ cos φ₂ sin²(Δλ/2)]). R = Earth's radius (6,371 km). This gives great-circle distance between two points on Earth's surface.",
    },
    {
        q: "What is Manhattan distance vs Euclidean distance?",
        a: "Euclidean distance = straight line (our formula). Manhattan distance = |x₂-x₁| + |y₂-y₁| (city block distance). Example: (0,0) to (3,4): Euclidean=5, Manhattan=7. Manhattan used in grid-based pathfinding.",
    },
    {
        q: "How to find distance between two points without a calculator?",
        a: "For perfect squares: Check if Δx² + Δy² is perfect square (0,1,4,9,16,25,36,49,64,81,100). For (3,4): 9+16=25, √25=5. For non-perfect squares, leave as √(sum). Example: (1,2) to (4,6) gives √(9+16)=√25=5.",
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
    name: "Distance Formula Calculator – Find Distance Between Points",
    description: "Calculate the straight-line distance between two points in 2D space using the distance formula.",
    url: "https://numrexo.com/math/distance-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["2D distance calculation", "Step-by-step solution", "Midpoint calculation", "Slope calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Distance Formula Calculator", item: "https://numrexo.com/math/distance-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function DistanceCalculator() {
    const [x1, setX1] = useState("");
    const [y1, setY1] = useState("");
    const [x2, setX2] = useState("");
    const [y2, setY2] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const a = parseFloat(x1);
        const b = parseFloat(y1);
        const c = parseFloat(x2);
        const d = parseFloat(y2);

        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
            alert("Please enter valid coordinates for both points");
            return;
        }

        const deltaX = c - a;
        const deltaY = d - b;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const midpointX = (a + c) / 2;
        const midpointY = (b + d) / 2;
        const slope = deltaX !== 0 ? (deltaY / deltaX) : undefined;

        setResult({
            distance: distance.toFixed(4),
            deltaX: deltaX.toFixed(4),
            deltaY: deltaY.toFixed(4),
            midpoint: `(${midpointX.toFixed(4)}, ${midpointY.toFixed(4)})`,
            slope: slope !== undefined ? slope.toFixed(4) : "Undefined (vertical line)",
            point1: `(${a}, ${b})`,
            point2: `(${c}, ${d})`,
        });
    };

    const resetForm = () => {
        setX1("");
        setY1("");
        setX2("");
        setY2("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Distance Formula Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Distance Formula: d = √[(x₂-x₁)² + (y₂-y₁)²]</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate distance between two points</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">x₁</label><input type="number" placeholder="1" value={x1} onChange={(e) => setX1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">y₁</label><input type="number" placeholder="2" value={y1} onChange={(e) => setY1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">x₂</label><input type="number" placeholder="4" value={x2} onChange={(e) => setX2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">y₂</label><input type="number" placeholder="6" value={y2} onChange={(e) => setY2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Distance →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Distance Result"
                    isEmpty={!result}
                    emptyIcon="📍"
                    emptyText="Enter coordinates and press Calculate"
                    mainResult={result ? { label: "Distance", value: result.distance, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Δx (change in x)", value: result.deltaX },
                        { label: "Δy (change in y)", value: result.deltaY },
                        { label: "Midpoint", value: result.midpoint, valueColor: "text-yellow-400" },
                        { label: "Slope", value: result.slope },
                        { label: "Points", value: `${result.point1} → ${result.point2}` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Distance Formula Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Distance Formula Calculator</strong> helps you find the straight-line distance between any two points in a 2D coordinate plane. Whether you're a student learning geometry, a teacher preparing lessons, or a professional in engineering, this tool makes distance calculations instant and accurate.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Beyond just distance, our calculator also provides the midpoint, slope, and changes in x and y coordinates — everything you need for complete coordinate geometry analysis.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Distance Formula Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">x₁ and y₁ coordinates</strong> of the first point.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">x₂ and y₂ coordinates</strong> of the second point.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Distance"</strong> to see the results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> View distance, midpoint, slope, and coordinate changes.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all coordinates and start a new calculation.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Tip:</strong> Use the Quick Examples buttons to try pre-filled coordinates.</p>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications of Distance Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">📍 Navigation & GPS</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">GPS systems calculate straight-line distance between coordinates to determine shortest routes and estimate travel times.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">📐 Construction & Surveying</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Surveyors use distance formula to measure land boundaries, building layouts, and property lines accurately.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">🎮 Game Development</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Game engines use distance formula for collision detection, enemy AI range, and camera positioning.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✈️ Aviation & Maritime</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Pilots and ship captains use great-circle distance (based on spherical coordinates) for route planning.</p>
                    </div>
                </div>
            </section>

            {/* 3D Distance Formula Extension */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">3D Distance Formula (Extension to Three Dimensions)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]</p>
                    <p className="text-gray-500 text-xs">For 3D points (x₁,y₁,z₁) and (x₂,y₂,z₂). Add the squared difference in z-coordinates to the 2D formula. Used in 3D modeling, physics simulations, and engineering design.</p>
                </div>
            </section>

            {/* Advanced Concepts */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Advanced Coordinate Geometry Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Midpoint Formula</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">M = ((x₁+x₂)/2, (y₁+y₂)/2). Finds the point exactly halfway between two points. Useful for line bisectors and finding centers.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">Slope Formula</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">m = (y₂-y₁)/(x₂-x₁). Measures steepness of a line. Positive slope = upward, negative = downward, zero = horizontal, undefined = vertical.</p>
                    </div>
                </div>
            </section>

            {/* Distance Formula Proof */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Distance Formula Proof (Derived from Pythagorean Theorem)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                        The distance formula is derived from the <strong className="text-white">Pythagorean theorem</strong>: a² + b² = c².
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        In coordinate geometry, the horizontal leg is Δx = |x₂-x₁|, vertical leg is Δy = |y₂-y₁|, and the straight-line distance is the hypotenuse. Therefore, d² = (Δx)² + (Δy)², so d = √[(Δx)² + (Δy)²].
                    </p>
                </div>
            </section>

            {/* Step-by-Step Example */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Step-by-Step Example</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-300 mb-2">Find distance between (1,2) and (4,6):</p>
                    <p className="text-gray-400 text-sm">1. Δx = 4 - 1 = 3</p>
                    <p className="text-gray-400 text-sm">2. Δy = 6 - 2 = 4</p>
                    <p className="text-gray-400 text-sm">3. Δx² = 9, Δy² = 16</p>
                    <p className="text-gray-400 text-sm">4. Sum = 9 + 16 = 25</p>
                    <p className="text-gray-400 text-sm">5. d = √25 = 5 units</p>
                    <p className="text-gray-500 text-xs mt-2">Midpoint = (2.5, 4). Slope = 4/3 ≈ 1.33</p>
                </div>
            </section>

            {/* Distance Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Distance Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-xl mb-2">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
                    <p className="text-gray-500 text-sm">Also finds: Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)</p>
                    <p className="text-gray-500 text-sm">Slope = (y₂ - y₁) / (x₂ - x₁)</p>
                </div>
            </section>

            {/* Quick Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Examples</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setX1("0"); setY1("0"); setX2("3"); setY2("4"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all">(0,0) to (3,4) → distance 5</button>
                    <button onClick={() => { setX1("1"); setY1("1"); setX2("4"); setY2("5"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all">(1,1) to (4,5) → distance 5</button>
                    <button onClick={() => { setX1("-2"); setY1("-3"); setX2("2"); setY2("3"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all">(-2,-3) to (2,3) → distance ≈ 7.21</button>
                    <button onClick={() => { setX1("0"); setY1("0"); setX2("0"); setY2("5"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all">(0,0) to (0,5) → vertical line</button>
                </div>
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