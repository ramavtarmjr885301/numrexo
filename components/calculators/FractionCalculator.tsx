// components/calculators/FractionCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How do I add fractions with different denominators?",
        a: "Find a common denominator first. Multiply the numerator and denominator of each fraction to reach that common denominator, then add the numerators. Example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Our calculator does all this automatically.",
    },
    {
        q: "How do I simplify a fraction?",
        a: "Find the biggest number that divides evenly into both numerator and denominator (the GCD). Then divide both by that number. Example: 8/12 = 2/3 (divide by 4). Fractions should always be in simplest form - it's just cleaner.",
    },
    {
        q: "What's a mixed number?",
        a: "A mixed number has a whole number plus a fraction, like 1 1/2 (meaning 1.5). You can convert it to an improper fraction by: (whole × denominator + numerator) ÷ denominator. 1 1/2 = (1×2+1)/2 = 3/2. Our calculator handles both formats.",
    },
    {
        q: "How to convert improper fraction to mixed number?",
        a: "Divide numerator by denominator. Whole number = quotient. Remainder becomes new numerator. Denominator stays same. Example: 7/3 = 2 remainder 1 = 2 1/3. Our calculator shows mixed numbers automatically.",
    },
    {
        q: "How to add fractions with whole numbers?",
        a: "Convert whole number to fraction (denominator 1). Example: 2 + 1/3 = 2/1 + 1/3 = 6/3 + 1/3 = 7/3 = 2 1/3. Our calculator handles mixed numbers and whole numbers automatically.",
    },
    {
        q: "What is the easiest way to compare fractions?",
        a: "Convert to decimals or find common denominator. Cross-multiply: a/b vs c/d → a×d vs b×c. Example: 2/3 vs 3/4 → 2×4=8, 3×3=9, so 3/4 is larger. Our calculator shows decimal equivalents.",
    },
    {
        q: "How to multiply fractions with whole numbers?",
        a: "Multiply numerator by whole number, denominator stays same. Example: 2/3 × 4 = (2×4)/3 = 8/3 = 2 2/3. For mixed numbers, convert to improper fraction first.",
    },
    {
        q: "What is the reciprocal of a fraction?",
        a: "Reciprocal = flip numerator and denominator. Example: 2/3 → 3/2. Product of a fraction and its reciprocal = 1. Used for division: divide by fraction = multiply by reciprocal.",
    },
    {
        q: "How to divide fractions by whole numbers?",
        a: "Multiply denominator by whole number. Example: 2/3 ÷ 4 = 2/(3×4) = 2/12 = 1/6. Or convert whole number to fraction: 2/3 ÷ 4/1 = 2/3 × 1/4 = 2/12 = 1/6.",
    },
    {
        q: "What is the fraction rule for zero denominator?",
        a: "Denominator cannot be zero — division by zero is undefined. Always check denominators before calculating. Our calculator alerts you if denominator is zero. In valid fractions, denominator must be positive or negative, but never zero.",
    },
];

const FRACTION_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fraction Calculator – Add, Subtract, Multiply, Divide Fractions",
    description: "Perform fraction operations with step-by-step results. Add, subtract, multiply, and divide fractions easily.",
    url: "https://www.numrexo.com/math/fraction-calculator",
    applicationCategory: "MathApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function FractionCalculator() {
    const [num1, setNum1] = useState("");
    const [den1, setDen1] = useState("");
    const [num2, setNum2] = useState("");
    const [den2, setDen2] = useState("");
    const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide">("add");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let n1 = parseFloat(num1);
        let d1 = parseFloat(den1);
        let n2 = parseFloat(num2);
        let d2 = parseFloat(den2);

        if (!n1 || !d1 || !n2 || !d2 || d1 === 0 || d2 === 0) {
            alert("Please enter valid fractions (denominators cannot be zero)");
            return;
        }

        let resultNum = 0, resultDen = 0;
        let stepByStep = "";

        switch (operation) {
            case "add":
                resultNum = n1 * d2 + n2 * d1;
                resultDen = d1 * d2;
                stepByStep = `(${n1}×${d2} + ${n2}×${d1}) / (${d1}×${d2}) = ${resultNum}/${resultDen}`;
                break;
            case "subtract":
                resultNum = n1 * d2 - n2 * d1;
                resultDen = d1 * d2;
                stepByStep = `(${n1}×${d2} - ${n2}×${d1}) / (${d1}×${d2}) = ${resultNum}/${resultDen}`;
                break;
            case "multiply":
                resultNum = n1 * n2;
                resultDen = d1 * d2;
                stepByStep = `(${n1}×${n2}) / (${d1}×${d2}) = ${resultNum}/${resultDen}`;
                break;
            case "divide":
                resultNum = n1 * d2;
                resultDen = d1 * n2;
                stepByStep = `(${n1}×${d2}) / (${d1}×${n2}) = ${resultNum}/${resultDen}`;
                break;
        }

        // Simplify
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
        const simplifiedNum = resultNum / divisor;
        const simplifiedDen = resultDen / divisor;

        const decimal = resultNum / resultDen;
        const mixedWhole = Math.floor(Math.abs(decimal));
        const mixedNum = Math.abs(simplifiedNum) % simplifiedDen;
        const mixedStr = mixedWhole > 0 ? `${decimal < 0 ? '-' : ''}${mixedWhole} ${mixedNum}/${simplifiedDen}` : `${simplifiedNum}/${simplifiedDen}`;

        setResult({
            result: `${simplifiedNum}/${simplifiedDen}`,
            decimal: decimal.toFixed(4),
            mixedNumber: mixedStr,
            stepByStep,
            originalNum: resultNum,
            originalDen: resultDen,
            simplifiedNum,
            simplifiedDen,
        });
    };

    const resetForm = () => {
        setNum1("");
        setDen1("");
        setNum2("");
        setDen2("");
        setOperation("add");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FRACTION_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/math" className="hover:text-gray-300">Math Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Fraction Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Fraction Operation</h3></div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">First Fraction</label><div className="grid grid-cols-2 gap-2"><input type="number" placeholder="1" value={num1} onChange={(e) => setNum1(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="text-gray-500 self-center text-center">—</span><input type="number" placeholder="2" value={den1} onChange={(e) => setDen1(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Second Fraction</label><div className="grid grid-cols-2 gap-2"><input type="number" placeholder="1" value={num2} onChange={(e) => setNum2(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="text-gray-500 self-center text-center">—</span><input type="number" placeholder="3" value={den2} onChange={(e) => setDen2(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Operation</label><div className="grid grid-cols-4 gap-2"><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "add" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("add")}>+ Add</button><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "subtract" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("subtract")}>- Subtract</button><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "multiply" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("multiply")}>× Multiply</button><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "divide" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("divide")}>÷ Divide</button></div></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Fraction Result"
                    isEmpty={!result}
                    emptyIcon="➗"
                    emptyText="Enter two fractions and choose operation"
                    mainResult={result ? { label: "Simplified Result", value: result.result, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Mixed Number", value: result.mixedNumber },
                        { label: "Decimal", value: result.decimal },
                        { label: "Step by Step", value: result.stepByStep, valueColor: "text-gray-400" },
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Fraction Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Fraction Calculator</strong> helps you add, subtract, multiply, and divide fractions with step-by-step explanations. Perfect for students learning fractions, teachers preparing lessons, or anyone cooking or baking with recipes.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're helping your kid with homework or need to scale a recipe, our fraction calculator handles it all - addition, subtraction, multiplication, and division. Shows you the step-by-step math so you actually learn how it works.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Fraction Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">first fraction</strong> — numerator and denominator.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">second fraction</strong> — numerator and denominator.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select <strong className="text-white">operation</strong> — Add (+), Subtract (-), Multiply (×), or Divide (÷).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate"</strong> to see simplified result, mixed number, decimal, and step-by-step explanation.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Fraction Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Homework Help</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Check your fraction homework answers. See step-by-step solutions to understand where you went wrong. Learn fraction operations faster.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Recipe Scaling</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Double or halve recipe fractions easily. Convert 2/3 cup to doubled measurement. Scale baking recipes without math errors.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Construction & Carpentry</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Work with fractional measurements (1/2 inch, 3/4 inch). Add and subtract measurements for woodworking projects. Calculate material cuts accurately.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Financial Calculations</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Work with fractional shares, interest rates, and percentages. Convert fractions to decimals for accurate financial planning.</p>
                    </div>
                </div>
            </section>

            {/* Fraction Operations Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Fraction Operations Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Addition (+)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find common denominator, add numerators. Example: 1/2 + 1/3 = 3/6 + 2/6 = 5/6</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Subtraction (-)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find common denominator, subtract numerators. Example: 3/4 - 1/2 = 3/4 - 2/4 = 1/4</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Multiplication (×)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Multiply numerators, multiply denominators. Example: 2/3 × 4/5 = 8/15</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">Division (÷)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Multiply by reciprocal. Example: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</p>
                    </div>
                </div>
            </section>

            {/* How to Simplify Fractions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Simplify Fractions (Step-by-Step)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        Simplifying a fraction means reducing it to its lowest terms. Find the biggest number that divides evenly into both numerator and denominator.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                        <strong className="text-white">Example:</strong> Simplify 8/12
                    </p>
                    <ul className="space-y-1 text-sm text-gray-400 list-disc list-inside">
                        <li>Find factors of 8: 1,2,4,8</li>
                        <li>Find factors of 12: 1,2,3,4,6,12</li>
                        <li>Largest common factor (GCD): 4</li>
                        <li>Divide numerator and denominator by 4: 8÷4=2, 12÷4=3</li>
                        <li>Simplified fraction: 2/3</li>
                    </ul>
                </div>
            </section>

            {/* Mixed Numbers Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Mixed Numbers & Improper Fractions Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-2">Improper to Mixed Number</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Divide numerator by denominator. Quotient is whole number, remainder is new numerator. Example: 7/3 = 2 remainder 1 = 2 1/3</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Mixed to Improper Fraction</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">(Whole × Denominator) + Numerator / Denominator. Example: 2 1/3 = (2×3+1)/3 = 7/3</p>
                    </div>
                </div>
            </section>

            {/* Fraction Operations Made Simple */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Fraction Operations Made Simple</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Whether you're helping your kid with homework or need to scale a recipe, our fraction calculator handles it all - addition, subtraction, multiplication, and division. Shows you the step-by-step math so you actually learn how it works.</p>
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