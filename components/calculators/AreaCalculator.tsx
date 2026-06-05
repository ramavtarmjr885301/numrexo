"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate area of a square?",
        a: "Area = side × side (s²). Example: side = 5 cm → area = 25 cm². Square area is the simplest — just multiply side by itself.",
    },
    {
        q: "How to calculate area of a rectangle?",
        a: "Area = length × width. Example: length = 10 cm, width = 5 cm → area = 50 cm². This formula works for any rectangle.",
    },
    {
        q: "How to calculate area of a circle?",
        a: "Area = π × r², where r is the radius. π ≈ 3.14159. Example: radius = 5 cm → area = 3.14 × 25 = 78.5 cm².",
    },
    {
        q: "How to calculate area of a triangle?",
        a: "Area = ½ × base × height. Example: base = 10 cm, height = 6 cm → area = 30 cm².",
    },
    {
        q: "What is the difference between area and perimeter?",
        a: "Area measures the space inside a shape (square units). Perimeter measures the distance around a shape (linear units).",
    },
];

const SHAPE_FORMULAS = [
    { shape: "Square", formula: "side²", example: "side 5cm = 25cm²" },
    { shape: "Rectangle", formula: "length × width", example: "10cm × 5cm = 50cm²" },
    { shape: "Circle", formula: "π × r²", example: "radius 5cm = 78.5cm²" },
    { shape: "Triangle", formula: "½ × base × height", example: "base 10cm, height 6cm = 30cm²" },
    { shape: "Parallelogram", formula: "base × height", example: "base 8cm, height 4cm = 32cm²" },
    { shape: "Trapezoid", formula: "½ × (a+b) × h", example: "bases 8cm,6cm, height 5cm = 35cm²" },
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
    name: "Area Calculator – Calculate Area of Shapes",
    description: "Calculate area of squares, rectangles, circles, triangles, and more.",
    url: "https://www.numrexo.com/math/area-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multiple shapes", "Square, rectangle, circle, triangle", "Parallelogram, trapezoid"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Area Calculator", item: "https://www.numrexo.com/math/area-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AreaCalculator() {
    const [shape, setShape] = useState<"square" | "rectangle" | "circle" | "triangle" | "parallelogram" | "trapezoid">("square");
    const [side, setSide] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [radius, setRadius] = useState("");
    const [base, setBase] = useState("");
    const [height, setHeight] = useState("");
    const [baseA, setBaseA] = useState("");
    const [baseB, setBaseB] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let area = 0;
        let formula = "";
        let calculation = "";

        switch (shape) {
            case "square":
                const s = parseFloat(side);
                if (!s || s <= 0) { alert("Please enter side length"); return; }
                area = s * s;
                formula = "Side × Side";
                calculation = `${s} × ${s} = ${area}`;
                break;
            case "rectangle":
                const l = parseFloat(length);
                const w = parseFloat(width);
                if (!l || !w || l <= 0 || w <= 0) { alert("Please enter length and width"); return; }
                area = l * w;
                formula = "Length × Width";
                calculation = `${l} × ${w} = ${area}`;
                break;
            case "circle":
                const r = parseFloat(radius);
                if (!r || r <= 0) { alert("Please enter radius"); return; }
                area = Math.PI * r * r;
                formula = "π × r²";
                calculation = `π × ${r}² = ${area.toFixed(4)}`;
                break;
            case "triangle":
                const b = parseFloat(base);
                const h = parseFloat(height);
                if (!b || !h || b <= 0 || h <= 0) { alert("Please enter base and height"); return; }
                area = 0.5 * b * h;
                formula = "½ × Base × Height";
                calculation = `½ × ${b} × ${h} = ${area}`;
                break;
            case "parallelogram":
                const baseP = parseFloat(base);
                const heightP = parseFloat(height);
                if (!baseP || !heightP || baseP <= 0 || heightP <= 0) { alert("Please enter base and height"); return; }
                area = baseP * heightP;
                formula = "Base × Height";
                calculation = `${baseP} × ${heightP} = ${area}`;
                break;
            case "trapezoid":
                const a = parseFloat(baseA);
                const bT = parseFloat(baseB);
                const hT = parseFloat(height);
                if (!a || !bT || !hT || a <= 0 || bT <= 0 || hT <= 0) { alert("Please enter both bases and height"); return; }
                area = 0.5 * (a + bT) * hT;
                formula = "½ × (a + b) × h";
                calculation = `½ × (${a} + ${bT}) × ${hT} = ${area}`;
                break;
        }

        setResult({
            area: area.toFixed(4),
            formula,
            calculation,
            shape,
            unit: "square units",
        });
    };

    const getShapeName = () => {
        const names = {
            square: "Square", rectangle: "Rectangle", circle: "Circle", triangle: "Triangle",
            parallelogram: "Parallelogram", trapezoid: "Trapezoid"
        };
        return names[shape];
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Area Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Area Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate area of any shape</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Select Shape</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "square" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("square")}>Square</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "rectangle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("rectangle")}>Rectangle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "circle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("circle")}>Circle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "triangle" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("triangle")}>Triangle</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "parallelogram" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("parallelogram")}>Parallelogram</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "trapezoid" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("trapezoid")}>Trapezoid</button>
                            </div>
                        </div>

                        {shape === "square" && <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side Length</label><input type="number" placeholder="5" value={side} onChange={(e) => setSide(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>}
                        {shape === "rectangle" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><input type="number" placeholder="10" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" placeholder="5" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></>)}
                        {shape === "circle" && <div><label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label><input type="number" placeholder="5" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>}
                        {shape === "triangle" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base</label><input type="number" placeholder="10" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="6" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></>)}
                        {shape === "parallelogram" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base</label><input type="number" placeholder="8" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="4" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></>)}
                        {shape === "trapezoid" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base a (top)</label><input type="number" placeholder="8" value={baseA} onChange={(e) => setBaseA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base b (bottom)</label><input type="number" placeholder="12" value={baseB} onChange={(e) => setBaseB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="5" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></>)}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Area →</button>
                    </div>
                </div>

                <ResultBox
                    title={`${getShapeName()} Area`}
                    isEmpty={!result}
                    emptyIcon="📏"
                    emptyText="Enter measurements and press Calculate"
                    mainResult={result ? { label: "Area", value: `${result.area} sq units`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Formula", value: result.formula },
                        { label: "Calculation", value: result.calculation },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Area Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the area of squares, rectangles, circles, triangles, parallelograms, and trapezoids.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Area Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Shape</th><th className="text-left py-3 px-4 text-gray-400">Formula</th><th className="text-left py-3 px-4 text-gray-400">Example</th></tr></thead>
                        <tbody>
                            {SHAPE_FORMULAS.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-yellow-400">{row.shape}</td><td className="py-3 px-4 text-gray-300">{row.formula}</td><td className="py-3 px-4 text-gray-400">{row.example}</td></tr>))}
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