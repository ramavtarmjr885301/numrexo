"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I calculate the area of a square or rectangle?",
        a: "A square is side × side; a rectangle is length × width. Both must be in the same unit before you multiply — a length in feet and a width in inches gives a meaningless number, and it is the most common error on this page.",
    },
    {
        q: "How do I calculate the area of a circle?",
        a: "Area = π × r², where r is the radius. If you measured across the circle rather than from the centre, that is the diameter — halve it first. Using the diameter by mistake gives four times the true area, which is a mistake worth checking for whenever a result looks impossibly large.",
    },
    {
        q: "How do I calculate the area of a triangle?",
        a: "Half the base times the perpendicular height: A = ½ × b × h. The height must be measured at a right angle to the base, not along a sloping side. When you only know the three side lengths, Heron's formula gets there instead: with s as half the perimeter, A = √(s(s−a)(s−b)(s−c)).",
    },
    {
        q: "What is the difference between area and perimeter?",
        a: "Area is the surface enclosed, measured in squared units; perimeter is the distance around the edge, measured in plain units. Paint and flooring are priced by area, fencing and skirting board by perimeter — and two rooms with the same perimeter can have very different areas.",
    },
    {
        q: "Why do square units convert differently from ordinary units?",
        a: "Because the conversion factor gets squared. One metre is 3.28084 feet, but one square metre is 3.28084² = 10.7639 square feet. Forgetting to square the factor is the single biggest source of wrong answers when converting an area between systems.",
    },
    {
        q: "How do I work out the area of an irregular shape?",
        a: "Split it into rectangles, triangles and part-circles, work out each one, and add them. An L-shaped room is two rectangles; a room with a bay window is a rectangle plus a segment. For a genuinely irregular plot, surveyors use the shoelace formula on the corner coordinates, which is the same idea done algebraically.",
    },
    {
        q: "How much paint or flooring do I need for a given area?",
        a: "Work out the area, then add a waste allowance — usually 5-10% for flooring, more like 15% if the material is laid diagonally or has a pattern to match. For paint, subtract the doors and windows, then check the coverage on the tin, which is typically quoted in square metres per litre per coat.",
    },
    {
        q: "How large is an acre or a hectare?",
        a: "An acre is 4,046.86 m² or 43,560 ft². A hectare is 10,000 m², which is 2.471 acres. A useful mental picture: a hectare is roughly a square 100 m on each side, and an acre is a bit smaller than a football pitch.",
    },
    {
        q: "What is a parallelogram's area, and why is it not the side lengths multiplied?",
        a: "It is base × perpendicular height, the same as a rectangle. The slanted side is longer than the height, so multiplying the two side lengths overstates the area. Lean a rectangle over and its area does not change even though one pair of sides now measures longer diagonally.",
    },
    {
        q: "How do I find the area of a trapezoid?",
        a: "Average the two parallel sides and multiply by the distance between them: A = ½ × (a + b) × h. It is the formula that turns up constantly in land measurement, because a plot with one irregular boundary can often be treated as a run of trapezoids.",
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
    url: "https://numrexo.com/math/area-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multiple shapes", "Square, rectangle, circle, triangle", "Parallelogram, trapezoid"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Area Calculator", item: "https://numrexo.com/math/area-calculator" },
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
                if (!s || s <= 0) { setResult(null); return; }
                area = s * s;
                formula = "Side × Side";
                calculation = `${s} × ${s} = ${area}`;
                break;
            case "rectangle":
                const l = parseFloat(length);
                const w = parseFloat(width);
                if (!l || !w || l <= 0 || w <= 0) { setResult(null); return; }
                area = l * w;
                formula = "Length × Width";
                calculation = `${l} × ${w} = ${area}`;
                break;
            case "circle":
                const r = parseFloat(radius);
                if (!r || r <= 0) { setResult(null); return; }
                area = Math.PI * r * r;
                formula = "π × r²";
                calculation = `π × ${r}² = ${area.toFixed(4)}`;
                break;
            case "triangle":
                const b = parseFloat(base);
                const h = parseFloat(height);
                if (!b || !h || b <= 0 || h <= 0) { setResult(null); return; }
                area = 0.5 * b * h;
                formula = "½ × Base × Height";
                calculation = `½ × ${b} × ${h} = ${area}`;
                break;
            case "parallelogram":
                const baseP = parseFloat(base);
                const heightP = parseFloat(height);
                if (!baseP || !heightP || baseP <= 0 || heightP <= 0) { setResult(null); return; }
                area = baseP * heightP;
                formula = "Base × Height";
                calculation = `${baseP} × ${heightP} = ${area}`;
                break;
            case "trapezoid":
                const a = parseFloat(baseA);
                const bT = parseFloat(baseB);
                const hT = parseFloat(height);
                if (!a || !bT || !hT || a <= 0 || bT <= 0 || hT <= 0) { setResult(null); return; }
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

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [shape, side, length, width, radius, base, height, baseA, baseB]);

    const resetForm = () => {
        setShape("square");
        setSide("");
        setLength("");
        setWidth("");
        setRadius("");
        setBase("");
        setHeight("");
        setBaseA("");
        setBaseB("");
        setResult(null);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a><meta itemProp="position" content="2" /></li>
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

                        {shape === "square" && <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side Length</label><input type="number" placeholder="5" value={side} onChange={(e) => setSide(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>}
                        {shape === "rectangle" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><input type="number" placeholder="10" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" placeholder="5" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></>)}
                        {shape === "circle" && <div><label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label><input type="number" placeholder="5" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>}
                        {shape === "triangle" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base</label><input type="number" placeholder="10" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="6" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></>)}
                        {shape === "parallelogram" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base</label><input type="number" placeholder="8" value={base} onChange={(e) => setBase(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="4" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></>)}
                        {shape === "trapezoid" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base a (top)</label><input type="number" placeholder="8" value={baseA} onChange={(e) => setBaseA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Base b (bottom)</label><input type="number" placeholder="12" value={baseB} onChange={(e) => setBaseB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="5" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></>)}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Area →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Area Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Works out the area of a square, rectangle, circle, triangle, parallelogram or trapezoid from the
                    measurements you have. Most people arrive here with a practical job behind the question — paint,
                    flooring, turf, a plot of land — so the sections below cover the two things that actually cause
                    wrong answers: mixing units, and converting an area between systems.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Getting the Units Right</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed">
                        When you convert a length you use the factor once. When you convert an area you use it twice,
                        because both dimensions convert.
                    </p>
                    <p className="text-white font-mono text-sm">1 m = 3.28084 ft &nbsp;→&nbsp; 1 m² = 3.28084² = 10.7639 ft²</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        So a 40 m² apartment is 431 ft², not 131 ft². The same trap catches inches to feet — there are
                        144 square inches in a square foot, not 12 — and it is why a quote that looks an order of
                        magnitude out usually is.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Area Units, Side by Side</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Unit</th><th className="text-right py-3 px-4 text-gray-400">In square metres</th><th className="text-right py-3 px-4 text-gray-400">In square feet</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 square foot</td><td className="py-2 px-4 text-right">0.0929</td><td className="py-2 px-4 text-right">1</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 square yard</td><td className="py-2 px-4 text-right">0.8361</td><td className="py-2 px-4 text-right">9</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 square metre</td><td className="py-2 px-4 text-right">1</td><td className="py-2 px-4 text-right">10.764</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 acre</td><td className="py-2 px-4 text-right">4,046.86</td><td className="py-2 px-4 text-right">43,560</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 hectare</td><td className="py-2 px-4 text-right">10,000</td><td className="py-2 px-4 text-right">107,639</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Working Out an Irregular Room</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        Almost no real room is a clean rectangle. The reliable method is to break it into shapes you
                        can measure and add them up.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside">
                        <li>An L-shaped room: two rectangles. Measure both, add.</li>
                        <li>A room with an alcove: the main rectangle plus the alcove rectangle.</li>
                        <li>A bay window: a rectangle plus a trapezoid, using the depth of the bay as the height.</li>
                        <li>A rounded corner: subtract the corner square, add a quarter circle.</li>
                    </ul>
                    <p className="text-gray-500 text-xs mt-3">
                        Measure at floor level rather than at waist height — skirting boards, radiators and out-of-square
                        walls all mean the two are not the same number.
                    </p>
                </div>
            </section>

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