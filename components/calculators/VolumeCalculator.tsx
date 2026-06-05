"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate volume of a cube?",
        a: "Volume = side × side × side (s³). Example: side = 5 cm → volume = 125 cm³. All edges of a cube are equal.",
    },
    {
        q: "How to calculate volume of a rectangular prism (box)?",
        a: "Volume = length × width × height. Example: length 10cm, width 5cm, height 4cm → volume = 200 cm³.",
    },
    {
        q: "How to calculate volume of a cylinder?",
        a: "Volume = π × r² × h, where r is radius, h is height. Example: radius 5cm, height 10cm → volume = 3.14 × 25 × 10 = 785 cm³.",
    },
    {
        q: "How to calculate volume of a sphere?",
        a: "Volume = 4/3 × π × r³. Example: radius 6cm → volume = 4/3 × 3.14 × 216 = 904.3 cm³.",
    },
    {
        q: "How to calculate volume of a cone?",
        a: "Volume = 1/3 × π × r² × h. Example: radius 4cm, height 9cm → volume = 1/3 × 3.14 × 16 × 9 = 150.7 cm³.",
    },
];

const VOLUME_FORMULAS = [
    { shape: "Cube", formula: "side³", example: "side 5cm = 125cm³" },
    { shape: "Rectangular Prism", formula: "length × width × height", example: "10×5×4 = 200cm³" },
    { shape: "Cylinder", formula: "π × r² × h", example: "r=5cm, h=10cm = 785cm³" },
    { shape: "Sphere", formula: "4/3 × π × r³", example: "r=6cm = 904cm³" },
    { shape: "Cone", formula: "1/3 × π × r² × h", example: "r=4cm, h=9cm = 151cm³" },
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
    name: "Volume Calculator – Calculate Volume of 3D Shapes",
    description: "Calculate volume of cubes, rectangular prisms, cylinders, spheres, and cones. Free online volume calculator.",
    url: "https://www.numrexo.com/math/volume-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Cube, prism, cylinder", "Sphere, cone", "Step-by-step calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Volume Calculator", item: "https://www.numrexo.com/math/volume-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function VolumeCalculator() {
    const [shape, setShape] = useState<"cube" | "prism" | "cylinder" | "sphere" | "cone">("cube");
    const [side, setSide] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [radius, setRadius] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let volume = 0;
        let formula = "";
        let calculation = "";

        switch (shape) {
            case "cube":
                const s = parseFloat(side);
                if (!s || s <= 0) { alert("Please enter side length"); return; }
                volume = s * s * s;
                formula = "side × side × side (s³)";
                calculation = `${s} × ${s} × ${s} = ${volume}`;
                break;
            case "prism":
                const l = parseFloat(length);
                const w = parseFloat(width);
                const h = parseFloat(height);
                if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) { alert("Please enter length, width, and height"); return; }
                volume = l * w * h;
                formula = "length × width × height";
                calculation = `${l} × ${w} × ${h} = ${volume}`;
                break;
            case "cylinder":
                const r = parseFloat(radius);
                const hCyl = parseFloat(height);
                if (!r || !hCyl || r <= 0 || hCyl <= 0) { alert("Please enter radius and height"); return; }
                volume = Math.PI * r * r * hCyl;
                formula = "π × r² × h";
                calculation = `π × ${r}² × ${hCyl} = ${volume.toFixed(4)}`;
                break;
            case "sphere":
                const rS = parseFloat(radius);
                if (!rS || rS <= 0) { alert("Please enter radius"); return; }
                volume = (4 / 3) * Math.PI * rS * rS * rS;
                formula = "4/3 × π × r³";
                calculation = `4/3 × π × ${rS}³ = ${volume.toFixed(4)}`;
                break;
            case "cone":
                const rC = parseFloat(radius);
                const hC = parseFloat(height);
                if (!rC || !hC || rC <= 0 || hC <= 0) { alert("Please enter radius and height"); return; }
                volume = (1 / 3) * Math.PI * rC * rC * hC;
                formula = "1/3 × π × r² × h";
                calculation = `1/3 × π × ${rC}² × ${hC} = ${volume.toFixed(4)}`;
                break;
        }

        setResult({
            volume: volume.toFixed(4),
            formula,
            calculation,
            shape,
            unit: "cubic units",
        });
    };

    const getShapeName = () => {
        const names = { cube: "Cube", prism: "Rectangular Prism", cylinder: "Cylinder", sphere: "Sphere", cone: "Cone" };
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Volume Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Volume Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate volume of 3D shapes</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Select Shape</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "cube" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("cube")}>Cube</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "prism" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("prism")}>Rectangular Prism</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "cylinder" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("cylinder")}>Cylinder</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "sphere" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("sphere")}>Sphere</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "cone" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setShape("cone")}>Cone</button>
                            </div>
                        </div>

                        {shape === "cube" && <div><label className="block text-xs font-semibold text-gray-400 mb-2">Side Length</label><input type="number" placeholder="5" value={side} onChange={(e) => setSide(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>}
                        {shape === "prism" && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Length</label><input type="number" placeholder="10" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" placeholder="5" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="4" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></>)}
                        {(shape === "cylinder" || shape === "cone") && (<><div><label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label><input type="number" placeholder="5" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="10" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></>)}
                        {shape === "sphere" && <div><label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label><input type="number" placeholder="6" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Volume →</button>
                    </div>
                </div>

                <ResultBox
                    title={`${getShapeName()} Volume`}
                    isEmpty={!result}
                    emptyIcon="🧊"
                    emptyText="Enter measurements and press Calculate"
                    mainResult={result ? { label: "Volume", value: `${result.volume} cu units`, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Formula", value: result.formula },
                        { label: "Calculation", value: result.calculation },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Volume Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the volume of cubes, rectangular prisms, cylinders, spheres, and cones. Perfect for students, engineers, and professionals.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Volume Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Shape</th><th className="text-left py-3 px-4 text-gray-400">Formula</th><th className="text-left py-3 px-4 text-gray-400">Example</th></tr></thead>
                        <tbody>
                            {VOLUME_FORMULAS.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-yellow-400">{row.shape}</td><td className="py-3 px-4 text-gray-300">{row.formula}</td><td className="py-3 px-4 text-gray-400">{row.example}</td></tr>))}
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