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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FRACTION_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/math" className="hover:text-gray-300">Math Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Fraction Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Fraction Operation</h3></div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">First Fraction</label><div className="grid grid-cols-2 gap-2"><input type="number" placeholder="1" value={num1} onChange={(e) => setNum1(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="text-gray-500 self-center text-center">—</span><input type="number" placeholder="2" value={den1} onChange={(e) => setDen1(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Second Fraction</label><div className="grid grid-cols-2 gap-2"><input type="number" placeholder="1" value={num2} onChange={(e) => setNum2(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="text-gray-500 self-center text-center">—</span><input type="number" placeholder="3" value={den2} onChange={(e) => setDen2(e.target.value)} className="px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Operation</label><div className="grid grid-cols-4 gap-2"><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "add" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("add")}>+ Add</button><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "subtract" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("subtract")}>- Subtract</button><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "multiply" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("multiply")}>× Multiply</button><button className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${operation === "divide" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("divide")}>÷ Divide</button></div></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Fraction Operations Made Simple</h2><p className="text-gray-400 text-sm leading-relaxed">Whether you're helping your kid with homework or need to scale a recipe, our fraction calculator handles it all - addition, subtraction, multiplication, and division. Shows you the step-by-step math so you actually learn how it works.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}