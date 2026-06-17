// components/calculators/QuadraticSolver.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is a quadratic equation?",
        a: "A quadratic equation is any equation that can be written as ax² + bx + c = 0, where a, b, and c are numbers, and a isn't zero. It's called 'quadratic' because 'quadratus' is Latin for square - the x² term. These pop up everywhere in physics, engineering, and finance.",
    },
    {
        q: "What's the quadratic formula?",
        a: "x = [-b ± √(b² - 4ac)] / (2a). The ± means you usually get two answers. The part inside the square root (b² - 4ac) is called the discriminant - it tells you how many real solutions you'll get.",
    },
    {
        q: "What does the discriminant tell me?",
        a: "If b² - 4ac > 0: Two different real solutions (graph crosses x-axis twice). If b² - 4ac = 0: One real solution (graph just touches x-axis). If b² - 4ac < 0: No real solutions (graph never touches x-axis - you get complex/imaginary numbers).",
    },
    {
        q: "How to solve quadratic equations by factoring?",
        a: "Step 1: Write equation in standard form (ax² + bx + c = 0). Step 2: Find two numbers that multiply to ac and add to b. Step 3: Rewrite bx as sum of those two numbers. Step 4: Factor by grouping. Step 5: Set each factor to zero. Example: x² + 5x + 6 = 0 → (x+2)(x+3)=0 → x=-2 or x=-3.",
    },
    {
        q: "What are complex roots?",
        a: "Complex roots occur when discriminant is negative (b² - 4ac < 0). They involve imaginary numbers (i = √-1). Example: x² + 1 = 0 → x = ±√-1 = ±i. Complex roots always come in conjugate pairs: a + bi and a - bi.",
    },
    {
        q: "How to find the vertex of a parabola?",
        a: "Vertex formula: x = -b/(2a). Then substitute back to find y. Example: y = x² - 4x + 3 → x = 4/2 = 2 → y = 4-8+3 = -1 → Vertex at (2,-1). The vertex is either the minimum (if a>0) or maximum (if a<0) point of the parabola.",
    },
    {
        q: "What is the sum and product of roots?",
        a: "For ax² + bx + c = 0: Sum of roots = -b/a. Product of roots = c/a. Example: 2x² - 6x + 4 = 0 → Sum = 6/2 = 3, Product = 4/2 = 2. Roots are 1 and 2 (1+2=3, 1×2=2).",
    },
    {
        q: "What is a quadratic equation?",
        a: "A quadratic equation is ax² + bx + c = 0 (a≠0). Degree 2 polynomial. Forms a parabola when graphed. Examples: x² - 4 = 0, 2x² + 3x - 5 = 0, -x² + 6x - 9 = 0. Solutions are x-intercepts (roots).",
    },
    {
        q: "What's the quadratic formula?",
        a: "x = [-b ± √(b² - 4ac)] / (2a). Derived by completing the square. Gives exact solutions for any quadratic. Works even when factoring isn't possible. Memorize it - you'll use it throughout algebra and calculus.",
    },
    {
        q: "What does the discriminant tell me?",
        a: "Discriminant (Δ) = b² - 4ac. Δ > 0: Two distinct real roots (parabola crosses x-axis twice). Δ = 0: One real root (parabola touches x-axis at vertex). Δ < 0: Two complex roots (parabola doesn't touch x-axis). Our calculator shows discriminant value and type.",
    },
];

const QUADRATIC_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Quadratic Equation Solver – ax² + bx + c = 0",
    description: "Solve quadratic equations instantly. Get real and complex roots, discriminant, and step-by-step solutions.",
    url: "https://www.numrexo.com/math/quadratic-solver",
    applicationCategory: "MathApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function QuadraticSolver() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [c, setC] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const aVal = parseFloat(a);
        const bVal = parseFloat(b);
        const cVal = parseFloat(c);

        if (isNaN(aVal) || aVal === 0) {
            alert("Please enter a non-zero value for 'a' (coefficient of x²)");
            return;
        }

        const discriminant = bVal * bVal - 4 * aVal * cVal;
        const vertexX = -bVal / (2 * aVal);
        const vertexY = aVal * vertexX * vertexX + bVal * vertexX + cVal;

        let root1 = "", root2 = "", solutionType = "";
        let discriminantType = "";

        if (discriminant > 0) {
            const sqrtD = Math.sqrt(discriminant);
            const r1 = (-bVal + sqrtD) / (2 * aVal);
            const r2 = (-bVal - sqrtD) / (2 * aVal);
            root1 = r1.toFixed(4);
            root2 = r2.toFixed(4);
            solutionType = "Two distinct real roots";
            discriminantType = "Positive (Two real solutions)";
        } else if (discriminant === 0) {
            const root = -bVal / (2 * aVal);
            root1 = root.toFixed(4);
            root2 = root1;
            solutionType = "One real root (double root)";
            discriminantType = "Zero (One real solution)";
        } else {
            const realPart = (-bVal / (2 * aVal)).toFixed(4);
            const imagPart = (Math.sqrt(-discriminant) / (2 * aVal)).toFixed(4);
            root1 = `${realPart} + ${imagPart}i`;
            root2 = `${realPart} - ${imagPart}i`;
            solutionType = "Two complex conjugate roots";
            discriminantType = "Negative (Complex solutions)";
        }

        setResult({
            a: aVal,
            b: bVal,
            c: cVal,
            discriminant: discriminant.toFixed(4),
            discriminantType,
            root1,
            root2,
            solutionType,
            vertexX: vertexX.toFixed(4),
            vertexY: vertexY.toFixed(4),
        });
    };

    const resetForm = () => {
        setA("");
        setB("");
        setC("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: QUADRATIC_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/math" className="hover:text-gray-300">Math Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Quadratic Equation Solver</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Enter Your Equation</h3>
                        <p className="text-xs text-gray-500 mt-1">ax² + bx + c = 0</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">a (x² coefficient)</label>
                                <input type="number" placeholder="1" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">b (x coefficient)</label>
                                <input type="number" placeholder="-3" value={b} onChange={(e) => setB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">c (constant)</label>
                                <input type="number" placeholder="2" value={c} onChange={(e) => setC(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Solve Equation →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Solution"
                    isEmpty={!result}
                    emptyIcon="📐"
                    emptyText="Enter coefficients a, b, and c"
                    mainResult={result ? { label: "Equation", value: `${result.a}x² ${result.b >= 0 ? '+' : ''}${result.b}x ${result.c >= 0 ? '+' : ''}${result.c} = 0`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Root 1 (x₁)", value: result.root1, valueColor: "text-yellow-400" },
                        { label: "Root 2 (x₂)", value: result.root2, valueColor: "text-yellow-400" },
                        { label: "Solution Type", value: result.solutionType },
                        { label: "Discriminant (Δ)", value: result.discriminant },
                        { label: "Discriminant Info", value: result.discriminantType },
                        { label: "Vertex Point", value: `(${result.vertexX}, ${result.vertexY})` },
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Understanding Quadratic Equations</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Quadratic equations show up more often than you'd think - calculating projectile motion, optimizing profits in business, even designing suspension bridges. The standard form is <strong className="text-white">ax² + bx + c = 0</strong>, where a, b, c are numbers and a ≠ 0.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our quadratic solver handles real and complex roots, shows the discriminant, and provides the vertex of the parabola. Perfect for students, engineers, and professionals.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Quadratic Equation Solver</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">coefficient 'a'</strong> (x² term - cannot be zero).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">coefficient 'b'</strong> (x term).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">constant 'c'</strong> (constant term).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Solve Equation"</strong> to see the roots.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> View roots, discriminant, vertex, and solution type.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Quadratic Equation Solver?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Instant Solutions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get roots immediately. No manual calculations needed. Perfect for checking homework answers.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Discriminant Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand the nature of roots. See if solutions are real, repeated, or complex.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Vertex Calculation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find the vertex of the parabola. Know the minimum or maximum point of the quadratic.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Complex Roots</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Handle equations with imaginary solutions. Perfect for advanced math and engineering.</p>
                    </div>
                </div>
            </section>

            {/* Discriminant Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Discriminant Guide - What It Tells You</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Discriminant (Δ)</th>
                                <th className="text-left py-3 px-4 text-gray-400">Nature of Roots</th>
                                <th className="text-left py-3 px-4 text-gray-400">Graph Behavior</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-green-400">Δ &gt; 0</td>
                                <td className="py-2 px-4">Two distinct real roots</td>
                                <td className="py-2 px-4">Parabola crosses x-axis twice</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-yellow-400">Δ = 0</td>
                                <td className="py-2 px-4">One real root (double root)</td>
                                <td className="py-2 px-4">Parabola touches x-axis at vertex</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-red-400">Δ &lt; 0</td>
                                <td className="py-2 px-4">Two complex conjugate roots</td>
                                <td className="py-2 px-4">Parabola never touches x-axis</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications of Quadratic Equations</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🚀</span><span><strong className="text-gray-300">Projectile Motion:</strong> Calculating trajectory of thrown objects, rockets, and sports balls.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🚀</span><span><strong className="text-gray-300">Business & Finance:</strong> Profit optimization, break-even analysis, revenue maximization.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🚀</span><span><strong className="text-gray-300">Engineering:</strong> Bridge design, suspension cables, structural analysis, signal processing.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">🚀</span><span><strong className="text-gray-300">Physics:</strong> Free-fall motion, kinetic energy, optics, electromagnetic waves.</span></li>
                </ul>
            </section>

            {/* Methods to Solve */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Methods to Solve Quadratic Equations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">1. Factoring</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Best when equation factors easily. Find two numbers that multiply to ac and add to b.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">2. Quadratic Formula</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Works for ALL equations. x = [-b ± √(b²-4ac)] / 2a. Our calculator uses this method.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">3. Completing the Square</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Useful for deriving formula and for equations with perfect squares.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">4. Graphing</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find x-intercepts of parabola. Good for visualizing solutions.</p>
                    </div>
                </div>
            </section>

            {/* The Quadratic Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">The Quadratic Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-lg text-center mb-2">x = [-b ± √(b² - 4ac)] / (2a)</p>
                    <p className="text-gray-500 text-xs text-center">Example: x² - 3x + 2 = 0 → a=1, b=-3, c=2 → x = (3 ± √(9-8)) / 2 = (3 ± 1)/2 → x = 2 or x = 1</p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}