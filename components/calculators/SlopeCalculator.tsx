"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is slope in math?",
        a: "Slope measures the steepness of a line. Formula: slope = (y₂ - y₁) / (x₂ - x₁). Positive slope = line goes up from left to right, negative slope = line goes down from left to right, zero slope = horizontal line, undefined slope = vertical line. Slope is fundamental in algebra, calculus, and real-world applications like construction, economics, and physics. It tells you how fast y changes for every unit change in x.",
    },
    {
        q: "How to find slope from two points?",
        a: "Use the formula: m = (y₂ - y₁) / (x₂ - x₁). Example: Points (1,2) and (4,8) → m = (8-2)/(4-1) = 6/3 = 2. This means for every 1 unit increase in x, y increases by 2 units. Always subtract in the same order: y₂ - y₁ and x₂ - x₁. If x₁ = x₂, the slope is undefined (vertical line). This formula works for any two points on a straight line.",
    },
    {
        q: "What does slope-intercept form mean?",
        a: "y = mx + b, where m = slope, b = y-intercept (where line crosses y-axis). Example: y = 2x + 3 has slope 2, crosses y-axis at (0,3). This is the most useful form for graphing and understanding linear relationships. The slope tells you the rate of change, and the y-intercept gives you a starting point. Every straight line can be written in this form, except vertical lines which are x = constant.",
    },
    {
        q: "What is a positive slope?",
        a: "A positive slope means as x increases, y increases. The line goes up from left to right. Example: y = 2x + 1. Positive slopes indicate direct relationships - when one variable increases, the other increases. Common examples: Speed vs time (constant acceleration), Cost vs quantity (more items cost more), Distance vs time (moving away). The steeper the positive slope, the faster the increase.",
    },
    {
        q: "What is a negative slope?",
        a: "A negative slope means as x increases, y decreases. The line goes down from left to right. Example: y = -2x + 1. Negative slopes indicate inverse relationships - when one variable increases, the other decreases. Common examples: Price vs demand (higher price = less demand), Distance vs time (moving toward a destination), Temperature vs altitude (higher altitude = lower temperature).",
    },
    {
        q: "What is the difference between zero and undefined slope?",
        a: "Zero slope (m = 0) means the line is horizontal - y doesn't change as x changes. Equation: y = b (constant). Example: y = 5. Undefined slope means the line is vertical - x doesn't change as y changes. Equation: x = a (constant). Example: x = 3. Zero slope lines are functions (pass vertical line test), while undefined slope lines are NOT functions. Both are equally important in mathematics.",
    },
    {
        q: "How to find slope from an equation?",
        a: "To find slope from an equation: 1) Put in slope-intercept form (y = mx + b), 2) Identify m (coefficient of x). Examples: y = 3x + 7 → slope = 3, 2x + y = 5 → y = -2x + 5 → slope = -2. For equations not in y = form, solve for y first. This works for all linear equations. For non-linear equations, slope changes at every point (use calculus - derivative).",
    },
    {
        q: "What is the slope formula for parallel and perpendicular lines?",
        a: "Parallel lines have the SAME slope (m₁ = m₂). Example: y = 2x + 1 and y = 2x - 3 are parallel. Perpendicular lines have slopes that are negative reciprocals (m₁ × m₂ = -1). Example: slope 2 and -½ are perpendicular. Special case: horizontal lines (slope 0) are perpendicular to vertical lines (undefined slope). These properties are essential for geometry and practical applications like construction and design.",
    },
    {
        q: "How to find slope from a graph?",
        a: "To find slope from a graph: 1) Pick two points on the line, 2) Count rise (vertical change) and run (horizontal change), 3) Slope = rise/run. Example: Line goes up 3 units and right 2 units → slope = 3/2 = 1.5. For negative slopes, the line goes down as it moves right. For zero slope, the line is flat. For undefined slope, the line is vertical. This visual method is great for understanding the concept.",
    },
    {
        q: "What are real-world applications of slope?",
        a: "Real-world slope applications: 1) Road incline (grade) - a 6% grade means slope = 0.06, 2) Roof pitch - 6/12 pitch means slope = 0.5, 3) Stock market trends - upward/downward slopes show market direction, 4) Physics - acceleration (slope of velocity-time graph), 5) Economics - supply/demand curves, 6) Construction - wheelchair ramp slope (max 1:12), 7) Geography - river gradients, 8) Medicine - dosage calculations, 9) Business - profit margins over time, 10) Sports - analyzing athlete performance trends.",
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
    name: "Slope Calculator – Find Slope of a Line",
    description: "Calculate slope between two points. Find slope-intercept form, equation of line, and angle of inclination.",
    url: "https://www.numrexo.com/math/slope-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Slope calculation", "Slope-intercept form", "Angle of inclination", "Line equation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Slope Calculator", item: "https://www.numrexo.com/math/slope-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SlopeCalculator() {
    const [x1, setX1] = useState("");
    const [y1, setY1] = useState("");
    const [x2, setX2] = useState("");
    const [y2, setY2] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setX1("");
        setY1("");
        setX2("");
        setY2("");
        setResult(null);
    };

    const calculate = () => {
        const a = parseFloat(x1);
        const b = parseFloat(y1);
        const c = parseFloat(x2);
        const d = parseFloat(y2);

        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
            alert("Please enter valid coordinates for both points");
            return;
        }

        if (c === a) {
            // Vertical line
            setResult({
                slope: "Undefined",
                slopeType: "Undefined (Vertical line)",
                slopeValue: null,
                equation: `x = ${a}`,
                intercept: null,
                angle: 90,
                isVertical: true,
                point1: `(${a}, ${b})`,
                point2: `(${c}, ${d})`,
            });
            return;
        }

        const slope = (d - b) / (c - a);
        const intercept = b - slope * a;
        const equation = `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`;
        const angle = Math.atan(slope) * 180 / Math.PI;

        let slopeType = "";
        let slopeEmoji = "";
        if (slope > 0) {
            slopeType = "Positive ↗";
            slopeEmoji = "📈";
        } else if (slope < 0) {
            slopeType = "Negative ↘";
            slopeEmoji = "📉";
        } else {
            slopeType = "Zero →";
            slopeEmoji = "➡️";
        }

        setResult({
            slope: slope.toFixed(4),
            slopeType: `${slopeEmoji} ${slopeType}`,
            slopeValue: slope,
            equation,
            intercept: intercept.toFixed(4),
            angle: angle.toFixed(2),
            isVertical: false,
            point1: `(${a}, ${b})`,
            point2: `(${c}, ${d})`,
            formattedEquation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
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
                        <a href="https://www.numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Slope Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Slope Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Find slope between two points (x₁,y₁) and (x₂,y₂)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">x₁</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="1"
                                    value={x1}
                                    onChange={(e) => setX1(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">y₁</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="2"
                                    value={y1}
                                    onChange={(e) => setY1(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">x₂</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="4"
                                    value={x2}
                                    onChange={(e) => setX2(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">y₂</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="8"
                                    value={y2}
                                    onChange={(e) => setY2(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Slope →
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
                    title="Slope Result"
                    isEmpty={!result}
                    emptyIcon="📈"
                    emptyText="Enter two points and press Calculate"
                    mainResult={result ? { label: "Slope (m)", value: result.isVertical ? "Undefined" : result.slope, color: "text-orange-400" } : undefined}
                    extraRows={result ? [
                        ...(result.isVertical ? [] : [
                            { label: "Slope Type", value: result.slopeType },
                            { label: "Equation (Slope-Intercept)", value: result.equation, valueColor: "text-green-400" },
                            { label: "y-intercept (b)", value: result.intercept },
                            { label: "Angle of Inclination", value: `${result.angle}°` },
                        ]),
                        { label: "Points", value: `${result.point1} → ${result.point2}` },
                        ...(result.isVertical ? [
                            { label: "Equation", value: result.equation, valueColor: "text-green-400" },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Slope Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Slope Calculator</strong> helps you find the slope of a line passing through any two points. Simply enter the coordinates of two points (x₁,y₁) and (x₂,y₂), and our calculator will instantly compute the slope, line equation, y-intercept, and angle of inclination.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Slope is a fundamental concept in mathematics that measures the steepness of a line. It's used extensively in algebra, geometry, calculus, physics, economics, and real-world applications like construction, engineering, and data analysis.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're a student learning coordinate geometry, a professional working with data trends, or someone needing to calculate grade or pitch, our calculator provides accurate results with step-by-step insights.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Slope Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">x₁</strong> and <strong className="text-white">y₁</strong> coordinates for the first point.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">x₂</strong> and <strong className="text-white">y₂</strong> coordinates for the second point.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Slope"</strong> to get your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Review the <strong className="text-white">slope, equation, y-intercept, and angle</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different points.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Slope Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Instant Results</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">No more manual formula calculations. Get accurate slope, equation, and angle in seconds. Perfect for homework and real-world applications.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Multiple Outputs</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get slope value, line equation, y-intercept, angle of inclination, and slope type all in one place. Comprehensive results for complete understanding.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Educational Tool</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Perfect for students learning slope concepts. See the relationship between points and slope visually through clear, structured output.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Real-World Applications</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Use for construction (roof pitch), physics (acceleration), economics (trends), and more. Practical tool for professionals and students.</p>
                    </div>
                </div>
            </section>

            {/* Slope Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Slope Formula & Concepts</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="text-center mb-4">
                        <p className="text-white font-mono text-xl mb-2">m = (y₂ - y₁) / (x₂ - x₁)</p>
                        <p className="text-gray-500 text-sm">Slope-Intercept Form: y = mx + b</p>
                        <p className="text-gray-500 text-sm mt-1">Point-Slope Form: y - y₁ = m(x - x₁)</p>
                        <p className="text-gray-500 text-sm">Standard Form: Ax + By = C</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-green-500/20">
                            <div className="text-2xl">📈</div>
                            <p className="text-xs text-green-400">Positive</p>
                            <p className="text-xs text-gray-500">m &gt; 0</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-red-500/20">
                            <div className="text-2xl">📉</div>
                            <p className="text-xs text-red-400">Negative</p>
                            <p className="text-xs text-gray-500">m &lt; 0</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-yellow-500/20">
                            <div className="text-2xl">➡️</div>
                            <p className="text-xs text-yellow-400">Zero</p>
                            <p className="text-xs text-gray-500">m = 0</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-purple-500/20">
                            <div className="text-2xl">⬆️</div>
                            <p className="text-xs text-purple-400">Undefined</p>
                            <p className="text-xs text-gray-500">Vertical</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slope Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Slope Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Points</th>
                                <th className="text-left py-3 px-4 text-gray-400">Slope</th>
                                <th className="text-left py-3 px-4 text-gray-400">Equation</th>
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300 font-mono text-xs">(1,2) and (4,8)</td>
                                <td className="py-3 px-4 text-yellow-400 font-mono">2</td>
                                <td className="py-3 px-4 text-green-400 font-mono text-xs">y = 2x + 0</td>
                                <td className="py-3 px-4 text-gray-400">Positive ↗</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300 font-mono text-xs">(1,8) and (4,2)</td>
                                <td className="py-3 px-4 text-yellow-400 font-mono">-2</td>
                                <td className="py-3 px-4 text-green-400 font-mono text-xs">y = -2x + 10</td>
                                <td className="py-3 px-4 text-gray-400">Negative ↘</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300 font-mono text-xs">(1,5) and (4,5)</td>
                                <td className="py-3 px-4 text-yellow-400 font-mono">0</td>
                                <td className="py-3 px-4 text-green-400 font-mono text-xs">y = 5</td>
                                <td className="py-3 px-4 text-gray-400">Zero →</td>
                            </tr>
                            <tr className="hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300 font-mono text-xs">(2,1) and (2,5)</td>
                                <td className="py-3 px-4 text-red-400 font-mono">Undefined</td>
                                <td className="py-3 px-4 text-green-400 font-mono text-xs">x = 2</td>
                                <td className="py-3 px-4 text-gray-400">Vertical ⬆️</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Understanding slope types helps in graphing, data analysis, and real-world applications.
                    </p>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Slope Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-orange-400 mb-1">🏗️ Construction</h4>
                        <p className="text-xs text-gray-400">Roof pitch (6/12 = slope 0.5), road grade (6% = 0.06), wheelchair ramps (max 1:12 = 0.083).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-400/30 transition-all">
                        <h4 className="text-sm font-semibold text-blue-400 mb-1">📊 Economics</h4>
                        <p className="text-xs text-gray-400">Supply/demand curves (positive/negative slopes), cost functions, market trends, profit margins.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-yellow-400/30 transition-all">
                        <h4 className="text-sm font-semibold text-yellow-400 mb-1">⚛️ Physics</h4>
                        <p className="text-xs text-gray-400">Velocity-time graphs (acceleration), position-time graphs (speed), force-displacement relationships.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-400/30 transition-all">
                        <h4 className="text-sm font-semibold text-green-400 mb-1">🌍 Geography</h4>
                        <p className="text-xs text-gray-400">River gradients, terrain analysis, elevation maps, slope stability assessment, hiking trail difficulty.</p>
                    </div>
                </div>
            </section>

            {/* Math Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Slope Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember the formula order:</strong> Always subtract y₂ - y₁ and x₂ - x₁ in the same order. Mixing up the order gives the wrong sign!</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Visualize slope:</strong> "Rise over Run" - rise is vertical change (up/down), run is horizontal change (left/right). This makes slope intuitive.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check for vertical lines:</strong> If x₁ = x₂, slope is undefined. The equation is x = constant. These are not functions.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use slope to find relationships:</strong> Positive slope = direct relationship, negative slope = inverse relationship. This helps in data interpretation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Parallel and perpendicular:</strong> Parallel lines have same slope. Perpendicular lines have slopes that multiply to -1 (negative reciprocals).</span>
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