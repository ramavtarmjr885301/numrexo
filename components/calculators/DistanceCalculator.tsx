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
    url: "https://www.numrexo.com/math/distance-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["2D distance calculation", "Step-by-step solution", "Midpoint calculation", "Slope calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Distance Formula Calculator", item: "https://www.numrexo.com/math/distance-calculator" },
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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a><meta itemProp="position" content="2" /></li>
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
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">x₁</label><input type="number" placeholder="1" value={x1} onChange={(e) => setX1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">y₁</label><input type="number" placeholder="2" value={y1} onChange={(e) => setY1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">x₂</label><input type="number" placeholder="4" value={x2} onChange={(e) => setX2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">y₂</label><input type="number" placeholder="6" value={y2} onChange={(e) => setY2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Distance →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Distance Formula Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the straight-line distance between any two points in 2D space. Also find midpoint, slope, and change in x and y coordinates. Perfect for geometry and coordinate math.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Distance Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-xl mb-2">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
                    <p className="text-gray-500 text-sm">Also finds: Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)</p>
                    <p className="text-gray-500 text-sm">Slope = (y₂ - y₁) / (x₂ - x₁)</p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Step-by-Step Example</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-300 mb-2">Find distance between (1,2) and (4,6):</p>
                    <p className="text-gray-400 text-sm">1. Δx = 4 - 1 = 3</p>
                    <p className="text-gray-400 text-sm">2. Δy = 6 - 2 = 4</p>
                    <p className="text-gray-400 text-sm">3. Δx² = 9, Δy² = 16</p>
                    <p className="text-gray-400 text-sm">4. Sum = 9 + 16 = 25</p>
                    <p className="text-gray-400 text-sm">5. d = √25 = 5 units</p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Quick Examples</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setX1("0"); setY1("0"); setX2("3"); setY2("4"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">(0,0) to (3,4) → distance 5</button>
                    <button onClick={() => { setX1("1"); setY1("1"); setX2("4"); setY2("5"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">(1,1) to (4,5) → distance 5</button>
                    <button onClick={() => { setX1("-2"); setY1("-3"); setX2("2"); setY2("3"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">(-2,-3) to (2,3) → distance ≈ 7.21</button>
                    <button onClick={() => { setX1("0"); setY1("0"); setX2("0"); setY2("5"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">(0,0) to (0,5) → vertical line</button>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div>
            </section>
        </>
    );
}