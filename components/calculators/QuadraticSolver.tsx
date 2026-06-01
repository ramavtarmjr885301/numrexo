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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: QUADRATIC_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/math" className="hover:text-gray-300">Math Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Quadratic Equation Solver</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Enter Your Equation</h3><p className="text-xs text-gray-500 mt-1">ax² + bx + c = 0</p></div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">a (x² coefficient)</label><input type="number" placeholder="1" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">b (x coefficient)</label><input type="number" placeholder="-3" value={b} onChange={(e) => setB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">c (constant)</label><input type="number" placeholder="2" value={c} onChange={(e) => setC(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Solve Equation →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Understanding Quadratic Equations</h2><p className="text-gray-400 text-sm leading-relaxed">Quadratic equations show up more often than you'd think - calculating projectile motion, optimizing profits in business, even designing suspension bridges. The standard form is ax² + bx + c = 0, where a, b, c are numbers and a ≠ 0. Our solver handles real and complex roots.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">The Quadratic Formula</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-lg text-center mb-2">x = [-b ± √(b² - 4ac)] / (2a)</p><p className="text-gray-500 text-xs text-center">Example: x² - 3x + 2 = 0 → a=1, b=-3, c=2 → x = (3 ± √(9-8)) / 2 = (3 ± 1)/2 → x = 2 or x = 1</p></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}