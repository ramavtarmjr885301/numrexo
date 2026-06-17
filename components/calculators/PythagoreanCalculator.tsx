"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is the Pythagorean Theorem?",
        a: "The Pythagorean Theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. Formula: a² + b² = c², where c is the hypotenuse (longest side). Named after Greek mathematician Pythagoras (570-495 BCE).",
    },
    {
        q: "How to find the hypotenuse?",
        a: "If you know both legs (a and b), use: c = √(a² + b²). Example: a=3, b=4 → c = √(9+16) = √25 = 5. This is the classic 3-4-5 right triangle, often used in construction for checking right angles.",
    },
    {
        q: "How to find a missing leg?",
        a: "If you know the hypotenuse and one leg: a = √(c² - b²). Example: c=5, b=4 → a = √(25-16) = √9 = 3. This formula works for any right triangle where you know two sides.",
    },
    {
        q: "What is a Pythagorean triple?",
        a: "A Pythagorean triple is a set of three integers that satisfy a² + b² = c². Common triples: 3-4-5, 5-12-13, 7-24-25, 8-15-17, 9-40-41. These are useful in geometry problems and construction.",
    },
    {
        q: "How to check if a triangle is right-angled?",
        a: "Check if a² + b² = c² (where c is the longest side). If true, it's a right triangle. Example: sides 6,8,10 → 36+64=100 → 100=100 → Yes, it's a right triangle.",
    },
    {
        q: "What is the Pythagorean Theorem?",
        a: "The Pythagorean Theorem: In any right triangle, the square of the hypotenuse (longest side) equals the sum of the squares of the other two sides. Formula: a² + b² = c². One of the most important theorems in geometry, used in construction, navigation, and physics.",
    },
    {
        q: "How to find the hypotenuse?",
        a: "If you know both legs: Hypotenuse = √(a² + b²). Example: a=5, b=12 → c = √(25+144) = √169 = 13. The 5-12-13 triangle is a Pythagorean triple. Our calculator does this instantly.",
    },
    {
        q: "How to find a missing leg?",
        a: "If you know hypotenuse and one leg: Missing leg = √(c² - a²). Example: c=13, a=5 → b = √(169-25) = √144 = 12. Works for any right triangle with two known sides.",
    },
    {
        q: "What is a Pythagorean triple?",
        a: "Pythagorean triples are integer solutions to a² + b² = c². Common triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25, 9-40-41, 20-21-29. Multiples also work: 6-8-10, 9-12-15. Our calculator identifies if your triangle is a Pythagorean triple.",
    },
    {
        q: "How to check if a triangle is right-angled?",
        a: "Check if a² + b² = c² (c = longest side). Example: 8-15-17 → 64+225=289 → 289=289 → Right triangle! If not equal, it's not a right triangle. Use our 'Check Right Triangle' mode for instant verification.",
    },
];

const PYTHAGOREAN_TRIPLES = [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
    { a: 6, b: 8, c: 10 },
    { a: 7, b: 24, c: 25 },
    { a: 8, b: 15, c: 17 },
    { a: 9, b: 12, c: 15 },
    { a: 9, b: 40, c: 41 },
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
    name: "Pythagorean Theorem Calculator – Right Triangle Solver",
    description: "Calculate hypotenuse or missing leg of a right triangle using the Pythagorean theorem (a² + b² = c²).",
    url: "https://www.numrexo.com/math/pythagorean-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Hypotenuse calculation", "Missing leg calculation", "Check right triangle", "Pythagorean triples"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Pythagorean Theorem Calculator", item: "https://www.numrexo.com/math/pythagorean-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PythagoreanCalculator() {
    const [calcType, setCalcType] = useState<"hypotenuse" | "leg" | "check">("hypotenuse");
    const [sideA, setSideA] = useState("");
    const [sideB, setSideB] = useState("");
    const [hypotenuse, setHypotenuse] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateHypotenuse = () => {
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);

        if (!a || !b || a <= 0 || b <= 0) {
            alert("Please enter valid values for both legs");
            return;
        }

        const c = Math.sqrt(a * a + b * b);
        const isTriple = Number.isInteger(c);

        setResult({
            result: c.toFixed(4),
            formula: `${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}`,
            sideA: a,
            sideB: b,
            type: "hypotenuse",
            isTriple,
        });
    };

    const calculateLeg = () => {
        const c = parseFloat(hypotenuse);
        const a = parseFloat(sideA);

        if (!c || !a || c <= 0 || a <= 0) {
            alert("Please enter valid values for hypotenuse and one leg");
            return;
        }

        if (a >= c) {
            alert("Leg cannot be greater than or equal to hypotenuse");
            return;
        }

        const b = Math.sqrt(c * c - a * a);
        const isTriple = Number.isInteger(b);

        setResult({
            result: b.toFixed(4),
            formula: `√(${c}² - ${a}²) = √(${c * c} - ${a * a}) = √${c * c - a * a}`,
            hypotenuse: c,
            leg: a,
            type: "leg",
            isTriple,
        });
    };

    const calculateCheck = () => {
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);
        const c = parseFloat(hypotenuse);

        if (!a || !b || !c || a <= 0 || b <= 0 || c <= 0) {
            alert("Please enter valid values for all three sides");
            return;
        }

        const sides = [a, b, c].sort((x, y) => x - y);
        const isRightTriangle = Math.abs(sides[0] * sides[0] + sides[1] * sides[1] - sides[2] * sides[2]) < 0.0001;

        setResult({
            result: isRightTriangle ? "Yes, this is a right triangle" : "No, this is NOT a right triangle",
            isRightTriangle,
            sides: { a, b, c },
            type: "check",
        });
    };

    const calculate = () => {
        if (calcType === "hypotenuse") calculateHypotenuse();
        else if (calcType === "leg") calculateLeg();
        else calculateCheck();
    };

    const resetForm = () => {
        setCalcType("hypotenuse");
        setSideA("");
        setSideB("");
        setHypotenuse("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Pythagorean Theorem Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Pythagorean Theorem: a² + b² = c²</h3>
                        <p className="text-xs text-gray-500 mt-1">Solve right triangles instantly</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">What do you want to find?</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "hypotenuse" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("hypotenuse")}>Find Hypotenuse</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "leg" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("leg")}>Find Missing Leg</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "check" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("check")}>Check Right Triangle</button>
                            </div>
                        </div>

                        {calcType === "hypotenuse" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side a (leg)</label><input type="number" placeholder="3" value={sideA} onChange={(e) => setSideA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side b (leg)</label><input type="number" placeholder="4" value={sideB} onChange={(e) => setSideB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </>
                        )}

                        {calcType === "leg" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Hypotenuse (c)</label><input type="number" placeholder="5" value={hypotenuse} onChange={(e) => setHypotenuse(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Known Leg (a or b)</label><input type="number" placeholder="3" value={sideA} onChange={(e) => setSideA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </>
                        )}

                        {calcType === "check" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side a</label><input type="number" placeholder="3" value={sideA} onChange={(e) => setSideA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side b</label><input type="number" placeholder="4" value={sideB} onChange={(e) => setSideB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side c (largest)</label><input type="number" placeholder="5" value={hypotenuse} onChange={(e) => setHypotenuse(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Result"
                    isEmpty={!result}
                    emptyIcon="📐"
                    emptyText="Enter values and press Calculate"
                    mainResult={result ? {
                        label: calcType === "hypotenuse" ? "Hypotenuse (c)" : calcType === "leg" ? "Missing Leg" : "Triangle Check",
                        value: calcType === "check" ? result.result : result.result,
                        color: calcType === "check" ? (result.isRightTriangle ? "text-green-400" : "text-red-400") : "text-green-400"
                    } : undefined}
                    extraRows={result ? [
                        ...(calcType === "hypotenuse" ? [
                            { label: "Formula", value: result.formula },
                            { label: "Pythagorean Triple", value: result.isTriple ? "Yes! ✓" : "No", valueColor: result.isTriple ? "text-green-400" : "text-gray-400" },
                        ] : []),
                        ...(calcType === "leg" ? [
                            { label: "Formula", value: result.formula },
                            { label: "Pythagorean Triple", value: result.isTriple ? "Yes! ✓" : "No", valueColor: result.isTriple ? "text-green-400" : "text-gray-400" },
                        ] : []),
                        ...(calcType === "check" ? [
                            { label: "a² + b²", value: `${result.sides.a * result.sides.a} + ${result.sides.b * result.sides.b} = ${result.sides.a * result.sides.a + result.sides.b * result.sides.b}` },
                            { label: "c²", value: result.sides.c * result.sides.c },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Pythagorean Theorem Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Pythagorean Theorem Calculator</strong> helps you solve right triangles instantly. Whether you need to find the hypotenuse, a missing leg, or check if a triangle is right-angled, our calculator provides accurate results with step-by-step formulas.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Perfect for students, teachers, carpenters, architects, and anyone working with triangles. The Pythagorean theorem (a² + b² = c²) is one of the most fundamental concepts in geometry.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Pythagorean Theorem Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select what you want to find: <strong className="text-white">Hypotenuse</strong>, <strong className="text-white">Missing Leg</strong>, or <strong className="text-white">Check Right Triangle</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">known side lengths</strong> (legs for hypotenuse, hypotenuse + one leg for missing leg, all three sides for check).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate"</strong> to see your result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> View the calculated side length, formula used, and check if it's a Pythagorean triple.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try a different calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Pythagorean Theorem Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Quick Solutions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get instant answers to right triangle problems. No manual square root calculations needed.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Construction & Carpentry</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Check right angles and calculate diagonal lengths. Essential for building, framing, and layout.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Education & Homework</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Check your Pythagorean theorem homework answers. Understand the formula with step-by-step solutions.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Multiple Modes</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find hypotenuse, missing leg, or verify right triangles. All in one calculator.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications of Pythagorean Theorem</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🔨</span><span><strong className="text-gray-300">Construction:</strong> Checking right angles in buildings, ensuring walls are perpendicular, calculating diagonal bracing lengths.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🔨</span><span><strong className="text-gray-300">Navigation:</strong> Calculating shortest distances between two points (as the crow flies).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🔨</span><span><strong className="text-gray-300">Sports:</strong> Calculating distances in baseball (base paths), football (field goal angles), and golf (shots).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🔨</span><span><strong className="text-gray-300">Computer Graphics:</strong> Calculating distances between pixels, object collision detection, 3D rendering.</span></li>
                </ul>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-xl mb-2">a² + b² = c²</p>
                    <p className="text-gray-500 text-sm">Where c is the hypotenuse (longest side), a and b are the legs</p>
                    <p className="text-gray-500 text-xs mt-2">To find hypotenuse: c = √(a² + b²) | To find leg: a = √(c² - b²)</p>
                </div>
            </section>

            {/* Pythagorean Triples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Pythagorean Triples (Integer Solutions)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">a</th><th className="text-left py-3 px-4 text-gray-400">b</th><th className="text-left py-3 px-4 text-gray-400">c (hypotenuse)</th></tr></thead>
                        <tbody>
                            {PYTHAGOREAN_TRIPLES.map((triple, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-yellow-400">{triple.a}</td><td className="py-3 px-4 text-yellow-400">{triple.b}</td><td className="py-3 px-4 text-green-400">{triple.c}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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