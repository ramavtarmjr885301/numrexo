"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is slope in math?",
        a: "Slope measures the steepness of a line. Formula: slope = (y₂ - y₁) / (x₂ - x₁). Positive slope = line goes up, negative slope = line goes down, zero slope = horizontal line, undefined slope = vertical line.",
    },
    {
        q: "How to find slope from two points?",
        a: "Use the formula: m = (y₂ - y₁) / (x₂ - x₁). Example: Points (1,2) and (4,8) → m = (8-2)/(4-1) = 6/3 = 2.",
    },
    {
        q: "What does slope-intercept form mean?",
        a: "y = mx + b, where m = slope, b = y-intercept (where line crosses y-axis). Example: y = 2x + 3 has slope 2, crosses y-axis at (0,3).",
    },
    {
        q: "What is a positive slope?",
        a: "A positive slope means as x increases, y increases. The line goes up from left to right. Example: y = 2x + 1.",
    },
    {
        q: "What is a negative slope?",
        a: "A negative slope means as x increases, y decreases. The line goes down from left to right. Example: y = -2x + 1.",
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
                slope: "Undefined (Vertical line)",
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
        if (slope > 0) slopeType = "Positive (line goes up)";
        else if (slope < 0) slopeType = "Negative (line goes down)";
        else slopeType = "Zero (horizontal line)";

        setResult({
            slope: slope.toFixed(4),
            slopeType,
            equation,
            intercept: intercept.toFixed(4),
            angle: angle.toFixed(2),
            isVertical: false,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Slope Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Slope Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Find slope between two points (x₁,y₁) and (x₂,y₂)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">x₁</label><input type="number" placeholder="1" value={x1} onChange={(e) => setX1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">y₁</label><input type="number" placeholder="2" value={y1} onChange={(e) => setY1(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">x₂</label><input type="number" placeholder="4" value={x2} onChange={(e) => setX2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">y₂</label><input type="number" placeholder="8" value={y2} onChange={(e) => setY2(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Slope →</button>
                    </div>
                </div>

                <ResultBox
                    title="Slope Result"
                    isEmpty={!result}
                    emptyIcon="📈"
                    emptyText="Enter two points and press Calculate"
                    mainResult={result ? { label: "Slope (m)", value: result.isVertical ? result.slope : result.slope, color: "text-orange-400" } : undefined}
                    extraRows={result ? [
                        ...(result.isVertical ? [] : [
                            { label: "Slope Type", value: result.slopeType },
                            { label: "Equation", value: result.equation, valueColor: "text-green-400" },
                            { label: "y-intercept (b)", value: result.intercept },
                            { label: "Angle (degrees)", value: `${result.angle}°` },
                        ]),
                        { label: "Points", value: `${result.point1} → ${result.point2}` },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Slope Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the slope between any two points, find the line equation, y-intercept, and angle of inclination. Perfect for algebra students and coordinate geometry.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Slope Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-xl mb-2">m = (y₂ - y₁) / (x₂ - x₁)</p>
                    <p className="text-gray-500 text-sm">Slope-Intercept Form: y = mx + b</p>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Slope Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Points</th><th className="text-left py-3 px-4 text-gray-400">Slope</th><th className="text-left py-3 px-4 text-gray-400">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">(1,2) and (4,8)</td><td className="py-2 px-4 text-yellow-400">2</td><td className="py-2 px-4">Positive slope → line goes up</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">(1,8) and (4,2)</td><td className="py-2 px-4 text-yellow-400">-2</td><td className="py-2 px-4">Negative slope → line goes down</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">(1,5) and (4,5)</td><td className="py-2 px-4 text-yellow-400">0</td><td className="py-2 px-4">Zero slope → horizontal line</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">(2,1) and (2,5)</td><td className="py-2 px-4 text-yellow-400">Undefined</td><td className="py-2 px-4">Undefined → vertical line</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div>
            </section>
        </>
    );
}