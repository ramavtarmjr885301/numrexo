"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate volume of a cube?",
        a: "Volume = side × side × side (s³). Example: side = 5 cm → volume = 125 cm³. All edges of a cube are equal in length. A cube is a special case of a rectangular prism where all dimensions are equal. The volume of a cube increases exponentially with the side length - doubling the side length multiplies the volume by 8.",
    },
    {
        q: "How to calculate volume of a rectangular prism (box)?",
        a: "Volume = length × width × height. Example: length 10cm, width 5cm, height 4cm → volume = 200 cm³. This is the most common volume calculation used in everyday life - for shipping boxes, storage containers, room capacity, and more. All angles are 90° (right angles).",
    },
    {
        q: "How to calculate volume of a cylinder?",
        a: "Volume = π × r² × h, where r is radius, h is height. Example: radius 5cm, height 10cm → volume = 3.14 × 25 × 10 = 785 cm³. Cylinders are common in everyday objects: pipes, cans, cups, tanks, and pillars. The radius is half the diameter of the circular base.",
    },
    {
        q: "How to calculate volume of a sphere?",
        a: "Volume = 4/3 × π × r³. Example: radius 6cm → volume = 4/3 × 3.14 × 216 = 904.3 cm³. Spheres are found in nature (bubbles, planets) and man-made objects (balls, marbles, bearings). The volume of a sphere is the largest possible volume for a given surface area.",
    },
    {
        q: "How to calculate volume of a cone?",
        a: "Volume = 1/3 × π × r² × h. Example: radius 4cm, height 9cm → volume = 1/3 × 3.14 × 16 × 9 = 150.7 cm³. A cone has exactly one-third the volume of a cylinder with the same base radius and height. Cones are common in everyday life: party hats, traffic cones, ice cream cones, and funnels.",
    },
    {
        q: "What are the units of volume?",
        a: "Volume is measured in cubic units: cubic centimeters (cm³), cubic meters (m³), cubic feet (ft³), cubic inches (in³), liters (L), gallons (gal), and milliliters (mL). 1 L = 1,000 cm³ = 0.001 m³. 1 gallon = 3.785 L = 3,785 cm³. Volume units can be converted using our unit converter. For everyday use, liters and gallons are common for liquids, while cubic meters and cubic feet are used for solids and spaces.",
    },
    {
        q: "What is the difference between volume and capacity?",
        a: "Volume measures the three-dimensional space an object occupies (e.g., a solid object). Capacity measures how much a container can hold (e.g., how much liquid it can contain). For example, a glass has a volume (the space it takes up) and a capacity (how much liquid it can hold). While the units are the same (cubic units, liters), capacity is used for containers like bottles, tanks, and vessels.",
    },
    {
        q: "What is the volume of a pyramid?",
        a: "Volume of a pyramid = 1/3 × Base Area × Height. For a square pyramid: V = 1/3 × side² × height. Example: square base 6cm, height 10cm → V = 1/3 × 36 × 10 = 120 cm³. A pyramid has one-third the volume of a prism with the same base and height. Pyramids are found in ancient monuments, modern architecture, and geometry problems.",
    },
    {
        q: "How to calculate volume of a triangular prism?",
        a: "Volume of a triangular prism = Area of triangle base × Length. Area of triangle = 1/2 × base × height. Formula: V = 1/2 × b × h × L. Example: triangle base 6cm, triangle height 4cm, length 10cm → V = 1/2 × 6 × 4 × 10 = 120 cm³. Triangular prisms are common in architecture (roofs), optics (prisms), and structural engineering.",
    },
    {
        q: "What is the relationship between volume and density?",
        a: "Density = Mass ÷ Volume (ρ = m/V). This means volume is used to determine the density of objects. For example, 1 kg of lead occupies less volume than 1 kg of wood because lead is denser. Density is measured in g/cm³ or kg/m³. Water has a density of 1 g/cm³ (1,000 kg/m³). This relationship is fundamental in physics, engineering, and everyday life.",
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

const VOLUME_FORMULAS = [
    { shape: "📦 Cube", formula: "side³", example: "side 5cm = 125cm³" },
    { shape: "📐 Rectangular Prism", formula: "length × width × height", example: "10×5×4 = 200cm³" },
    { shape: "🥫 Cylinder", formula: "π × r² × h", example: "r=5cm, h=10cm = 785cm³" },
    { shape: "⚽ Sphere", formula: "4/3 × π × r³", example: "r=6cm = 904cm³" },
    { shape: "🍦 Cone", formula: "1/3 × π × r² × h", example: "r=4cm, h=9cm = 151cm³" },
    { shape: "🔺 Pyramid", formula: "1/3 × Base Area × h", example: "base 6×6, h=10 = 120cm³" },
    { shape: "🔻 Triangular Prism", formula: "1/2 × b × h × L", example: "b=6, h=4, L=10 = 120cm³" },
];

const REAL_WORLD_EXAMPLES = [
    { item: "📦 Shipping Box", shape: "Rectangular Prism", application: "Calculate shipping volume for packages" },
    { item: "🥫 Soup Can", shape: "Cylinder", application: "Calculate liquid capacity of cans" },
    { item: "⚽ Sports Ball", shape: "Sphere", application: "Calculate air volume in balls" },
    { item: "🍦 Ice Cream Cone", shape: "Cone", application: "Calculate ice cream capacity" },
    { item: "🏠 Building", shape: "Rectangular Prism", application: "Calculate building volume for HVAC" },
    { item: "🌍 Earth", shape: "Sphere", application: "Calculate planetary volume" },
];

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

    const resetForm = () => {
        setShape("cube");
        setSide("");
        setLength("");
        setWidth("");
        setHeight("");
        setRadius("");
        setResult(null);
    };

    const calculate = () => {
        let volume = 0;
        let formula = "";
        let calculation = "";
        let shapeName = "";

        switch (shape) {
            case "cube": {
                const s = parseFloat(side);
                if (!s || s <= 0) { alert("Please enter side length"); return; }
                volume = s * s * s;
                formula = "side × side × side (s³)";
                calculation = `${s} × ${s} × ${s} = ${volume.toFixed(4)}`;
                shapeName = "Cube";
                break;
            }
            case "prism": {
                const l = parseFloat(length);
                const w = parseFloat(width);
                const h = parseFloat(height);
                if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) {
                    alert("Please enter length, width, and height");
                    return;
                }
                volume = l * w * h;
                formula = "length × width × height";
                calculation = `${l} × ${w} × ${h} = ${volume.toFixed(4)}`;
                shapeName = "Rectangular Prism";
                break;
            }
            case "cylinder": {
                const r = parseFloat(radius);
                const h = parseFloat(height);
                if (!r || !h || r <= 0 || h <= 0) {
                    alert("Please enter radius and height");
                    return;
                }
                volume = Math.PI * r * r * h;
                formula = "π × r² × h";
                calculation = `π × ${r}² × ${h} = ${volume.toFixed(4)}`;
                shapeName = "Cylinder";
                break;
            }
            case "sphere": {
                const r = parseFloat(radius);
                if (!r || r <= 0) { alert("Please enter radius"); return; }
                volume = (4 / 3) * Math.PI * r * r * r;
                formula = "4/3 × π × r³";
                calculation = `4/3 × π × ${r}³ = ${volume.toFixed(4)}`;
                shapeName = "Sphere";
                break;
            }
            case "cone": {
                const r = parseFloat(radius);
                const h = parseFloat(height);
                if (!r || !h || r <= 0 || h <= 0) {
                    alert("Please enter radius and height");
                    return;
                }
                volume = (1 / 3) * Math.PI * r * r * h;
                formula = "1/3 × π × r² × h";
                calculation = `1/3 × π × ${r}² × ${h} = ${volume.toFixed(4)}`;
                shapeName = "Cone";
                break;
            }
        }

        setResult({
            volume: volume.toFixed(4),
            formula,
            calculation,
            shape: shapeName,
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
                        <span itemProp="name" className="text-gray-300">Volume Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Volume Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate volume of 3D shapes</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Select Shape</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "cube" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setShape("cube")}
                                >
                                    📦 Cube
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "prism" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setShape("prism")}
                                >
                                    📐 Prism
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "cylinder" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setShape("cylinder")}
                                >
                                    🥫 Cylinder
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "sphere" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setShape("sphere")}
                                >
                                    ⚽ Sphere
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${shape === "cone" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setShape("cone")}
                                >
                                    🍦 Cone
                                </button>
                            </div>
                        </div>

                        {shape === "cube" && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Side Length</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="5"
                                    value={side}
                                    onChange={(e) => setSide(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        )}

                        {shape === "prism" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Length</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="10"
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Width</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="5"
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="4"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </>
                        )}

                        {(shape === "cylinder" || shape === "cone") && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="5"
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="10"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </>
                        )}

                        {shape === "sphere" && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Radius</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="6"
                                    value={radius}
                                    onChange={(e) => setRadius(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Volume →
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
                    title={`${getShapeName()} Volume`}
                    isEmpty={!result}
                    emptyIcon="🧊"
                    emptyText="Enter measurements and press Calculate"
                    mainResult={result ? { label: "Volume", value: `${result.volume} cu units`, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Shape", value: result.shape },
                        { label: "Formula", value: result.formula },
                        { label: "Calculation", value: result.calculation },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Volume Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Volume Calculator</strong> helps you calculate the volume of common 3D shapes including cubes, rectangular prisms, cylinders, spheres, and cones. Whether you're a student, engineer, teacher, or professional, this calculator provides instant volume calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Volume is the measure of three-dimensional space occupied by an object. It's essential in mathematics, physics, engineering, architecture, and everyday life. Understanding volume helps with construction, packaging, shipping, and scientific calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our calculator shows the formula and step-by-step calculation for each shape, making it perfect for learning and teaching as well as practical applications.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Volume Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">shape</strong> (Cube, Rectangular Prism, Cylinder, Sphere, or Cone).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">required measurements</strong> (side, length, width, height, or radius).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Volume"</strong> to get the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Review the <strong className="text-white">volume, formula, and step-by-step calculation</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Change the shape or measurements to calculate different volumes.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Volume Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Quick Calculations</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get instant volume calculations without manual math. Perfect for homework, projects, and professional work.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ 5 Common Shapes</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Cubes, rectangular prisms, cylinders, spheres, and cones - all in one tool. The most commonly used 3D shapes.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Step-by-Step Results</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See the formula and calculation process. Understand how the volume is calculated for each shape.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Educational & Practical</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Perfect for students learning geometry, teachers preparing lessons, and professionals needing quick volume calculations.</p>
                    </div>
                </div>
            </section>

            {/* Volume Formulas Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Volume Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Shape</th>
                                <th className="text-left py-3 px-4 text-gray-400">Formula</th>
                                <th className="text-left py-3 px-4 text-gray-400">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VOLUME_FORMULAS.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-yellow-400">{row.shape}</td>
                                    <td className="py-3 px-4 text-gray-300">{row.formula}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.example}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * π (pi) ≈ 3.14159. All measurements should be in the same unit (e.g., all in cm, all in inches).
                    </p>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {REAL_WORLD_EXAMPLES.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-purple-500/30 transition-all">
                            <h4 className="text-sm font-semibold text-gray-200">{item.item}</h4>
                            <p className="text-xs text-blue-400">{item.shape}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.application}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Volume Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Volume Comparison Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-green-500/20">
                            <p className="text-xs text-gray-400">Cube (side 5cm)</p>
                            <p className="text-lg text-green-400 font-bold">125 cm³</p>
                            <p className="text-xs text-gray-500">Smallest volume</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-yellow-500/20">
                            <p className="text-xs text-gray-400">Sphere (r=5cm)</p>
                            <p className="text-lg text-yellow-400 font-bold">523.6 cm³</p>
                            <p className="text-xs text-gray-500">4.2× cube volume</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 text-center border border-purple-500/20">
                            <p className="text-xs text-gray-400">Cylinder (r=5cm, h=10cm)</p>
                            <p className="text-lg text-purple-400 font-bold">785.4 cm³</p>
                            <p className="text-xs text-gray-500">6.3× cube volume</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3 text-center">
                        Different shapes with same dimensions can have vastly different volumes. The cylinder holds the most volume among these examples.
                    </p>
                </div>
            </section>

            {/* Volume Calculator Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Volume Calculation Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use consistent units:</strong> All measurements must be in the same unit (e.g., all cm, all inches). Mixing units will give incorrect results.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember π (pi):</strong> π ≈ 3.14159. For quick estimates, 3.14 is usually sufficient. For exact calculations, use the π button on your calculator.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Volume increases exponentially:</strong> Doubling the side length of a cube increases volume by 8 times. Doubling the radius of a sphere increases volume by 8 times.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use the right formula:</strong> Each shape has a specific formula. Using the wrong formula is the most common mistake. Our calculator selects the correct formula automatically.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check your answer:</strong> Volume should be in cubic units. If you get a result in square units, you've used the wrong formula. Our calculator shows both the formula and result.</span>
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