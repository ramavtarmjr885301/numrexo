"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to simplify a ratio?",
        a: "Find the greatest common divisor (GCD) of both numbers and divide both by it. Example: 12:18 → GCD is 6 → 12÷6 = 2, 18÷6 = 3 → Simplified ratio = 2:3. Our calculator does this automatically for any ratio.",
    },
    {
        q: "How to calculate ratio of three numbers?",
        a: "Find the GCD of all three numbers, then divide each by the GCD. Example: 6:9:12 → GCD is 3 → 6÷3=2, 9÷3=3, 12÷3=4 → Simplified ratio = 2:3:4.",
    },
    {
        q: "How to find missing value in a ratio?",
        a: "Use cross multiplication. If a:b = c:x, then x = (b × c) ÷ a. Example: 2:3 = 4:x → x = (3 × 4) ÷ 2 = 6. Our calculator helps you find missing values in proportions.",
    },
    {
        q: "What is aspect ratio?",
        a: "Aspect ratio is the proportional relationship between width and height. Common ratios: 16:9 (widescreen), 4:3 (standard), 1:1 (square). Used for screens, images, and videos.",
    },
    {
        q: "How to convert ratio to percentage?",
        a: "To convert a:b to percentage, use: (a ÷ (a+b)) × 100. Example: 2:3 → (2÷5) × 100 = 40% and 60%. Useful for understanding proportions in data and statistics.",
    },
    {
        q: "What is the difference between ratio and proportion?",
        a: "A ratio compares two quantities (2:3). A proportion states that two ratios are equal (2:3 = 4:6). Proportions are used to find missing values. Our calculator handles both.",
    },
    {
        q: "How to simplify a ratio?",
        a: "Find GCD of both numbers, divide both by GCD. Example: 15:25 → GCD=5 → 15÷5=3, 25÷5=5 → 3:5. For 3 numbers, find GCD of all three.",
    },
    {
        q: "How to calculate ratio of three numbers?",
        a: "Find GCD of all three numbers: 6:9:12 → GCD=3 → 2:3:4. If no common divisor, ratio is already in simplest form. Our calculator handles both 2-number and 3-number ratios.",
    },
    {
        q: "How to find missing value in a ratio?",
        a: "Use cross multiplication: a:b = c:x → x = (b × c) ÷ a. Example: 3:4 = 9:x → x = (4×9)÷3 = 12. Our missing value mode does this instantly.",
    },
    {
        q: "What is aspect ratio?",
        a: "Aspect ratio is width:height. Common: 16:9 (HD TV/YouTube), 4:3 (old TV), 1:1 (Instagram), 21:9 (ultrawide). Use our aspect ratio mode to find matching dimensions.",
    },
];

const RATIO_EXAMPLES = [
    { ratio: "2:3", description: "Common for photography", equivalent: "4:6, 6:9, 8:12" },
    { ratio: "16:9", description: "Widescreen TV/Monitor", equivalent: "32:18, 48:27, 64:36" },
    { ratio: "4:3", description: "Standard TV/Old monitor", equivalent: "8:6, 12:9, 16:12" },
    { ratio: "1:1", description: "Square (Instagram)", equivalent: "2:2, 3:3, 4:4" },
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
    name: "Ratio Calculator – Simplify Ratios and Find Missing Values",
    description: "Simplify ratios, find missing values in proportions, and calculate aspect ratios. Free online ratio calculator.",
    url: "https://www.numrexo.com/math/ratio-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Simplify ratios", "Find missing values", "Aspect ratio calculator", "Equivalent ratios"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Ratio Calculator", item: "https://www.numrexo.com/math/ratio-calculator" },
    ],
});

function gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function gcdThree(a: number, b: number, c: number): number {
    return gcd(gcd(a, b), c);
}

export default function RatioCalculator() {
    const [calcType, setCalcType] = useState<"simplify" | "missing" | "aspect">("simplify");
    const [ratioA, setRatioA] = useState("");
    const [ratioB, setRatioB] = useState("");
    const [ratioC, setRatioC] = useState("");
    const [knownA, setKnownA] = useState("");
    const [knownB, setKnownB] = useState("");
    const [missingX, setMissingX] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [targetWidth, setTargetWidth] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateSimplify = () => {
        const a = parseFloat(ratioA);
        const b = parseFloat(ratioB);
        const c = ratioC ? parseFloat(ratioC) : null;

        if (!a || !b || a <= 0 || b <= 0) {
            alert("Please enter valid numbers for the ratio");
            return;
        }

        if (c !== null && !isNaN(c)) {
            const divisor = gcdThree(a, b, c);
            const simplified = `${a / divisor}:${b / divisor}:${c / divisor}`;
            setResult({
                original: `${a}:${b}:${c}`,
                simplified,
                divisor,
                type: "three",
            });
        } else {
            const divisor = gcd(a, b);
            const simplified = `${a / divisor}:${b / divisor}`;
            setResult({
                original: `${a}:${b}`,
                simplified,
                divisor,
                type: "two",
            });
        }
    };

    const calculateMissing = () => {
        const a = parseFloat(knownA);
        const b = parseFloat(knownB);
        const x = parseFloat(missingX);

        if (!a || !b || !x || a <= 0 || b <= 0 || x <= 0) {
            alert("Please enter valid numbers for the proportion");
            return;
        }

        const missing = (b * x) / a;
        setResult({
            proportion: `${a}:${b} = ${x}:${missing.toFixed(4)}`,
            missingValue: missing.toFixed(4),
            type: "missing",
        });
    };

    const calculateAspect = () => {
        const w = parseFloat(width);
        const h = parseFloat(height);
        const targetW = parseFloat(targetWidth);

        if (!w || !h || w <= 0 || h <= 0) {
            alert("Please enter valid width and height");
            return;
        }

        const divisor = gcd(w, h);
        const aspectRatio = `${w / divisor}:${h / divisor}`;

        let targetHeight = null;
        if (targetW && targetW > 0) {
            targetHeight = (targetW * h) / w;
        }

        setResult({
            aspectRatio,
            original: `${w} × ${h}`,
            targetHeight: targetHeight ? targetHeight.toFixed(2) : null,
            type: "aspect",
        });
    };

    const calculate = () => {
        if (calcType === "simplify") calculateSimplify();
        else if (calcType === "missing") calculateMissing();
        else calculateAspect();
    };

    const resetForm = () => {
        setCalcType("simplify");
        setRatioA("");
        setRatioB("");
        setRatioC("");
        setKnownA("");
        setKnownB("");
        setMissingX("");
        setWidth("");
        setHeight("");
        setTargetWidth("");
        setResult(null);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Ratio Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Ratio Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Simplify ratios, find missing values, calculate aspect ratios</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "simplify" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("simplify")}>Simplify</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "missing" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("missing")}>Find Missing</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "aspect" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("aspect")}>Aspect Ratio</button>
                            </div>
                        </div>

                        {calcType === "simplify" && (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">First Number</label><input type="number" placeholder="12" value={ratioA} onChange={(e) => setRatioA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Second Number</label><input type="number" placeholder="18" value={ratioB} onChange={(e) => setRatioB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                </div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Third Number (Optional)</label><input type="number" placeholder="Leave empty for 2-number ratio" value={ratioC} onChange={(e) => setRatioC(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </>
                        )}

                        {calcType === "missing" && (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">First Number (a)</label><input type="number" placeholder="2" value={knownA} onChange={(e) => setKnownA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Second Number (b)</label><input type="number" placeholder="3" value={knownB} onChange={(e) => setKnownB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                </div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Third Number (c) - Find d</label><input type="number" placeholder="4" value={missingX} onChange={(e) => setMissingX(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><p className="text-xs text-gray-500 mt-1">a:b = c:d, find d</p></div>
                            </>
                        )}

                        {calcType === "aspect" && (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" placeholder="1920" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="1080" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                </div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Target Width (Optional)</label><input type="number" placeholder="Enter to calculate matching height" value={targetWidth} onChange={(e) => setTargetWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Ratio Result"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter values and press Calculate"
                    mainResult={result ? {
                        label: calcType === "simplify" ? "Simplified Ratio" : calcType === "missing" ? "Missing Value" : "Aspect Ratio",
                        value: calcType === "simplify" ? result.simplified : calcType === "missing" ? result.missingValue : result.aspectRatio,
                        color: "text-purple-400"
                    } : undefined}
                    extraRows={result ? [
                        ...(calcType === "simplify" ? [{ label: "Original Ratio", value: result.original }] : []),
                        ...(calcType === "missing" ? [{ label: "Proportion", value: result.proportion }] : []),
                        ...(calcType === "aspect" ? [
                            { label: "Original Size", value: result.original },
                            ...(result.targetHeight ? [{ label: "Matching Height", value: `${result.targetHeight}px`, valueColor: "text-green-400" }] : []),
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Ratio Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Ratio Calculator</strong> helps you simplify ratios, find missing values in proportions, and calculate aspect ratios. Perfect for students, designers, photographers, and anyone working with proportions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're scaling recipes, resizing images, or solving math problems, our calculator provides instant, accurate results.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Ratio Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select calculation type: <strong className="text-white">Simplify</strong>, <strong className="text-white">Find Missing</strong>, or <strong className="text-white">Aspect Ratio</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> For Simplify: Enter 2 or 3 numbers to get the simplified ratio.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For Missing: Enter a:b = c:x to find the missing value x.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> For Aspect: Enter width and height to get the aspect ratio.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different values.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Ratio Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Simplify Ratios</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Reduce ratios to simplest form instantly. Perfect for math homework and everyday calculations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Find Missing Values</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Solve proportions quickly. Great for recipe scaling, map distances, and financial ratios.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Aspect Ratio</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate screen ratios, image dimensions, and video resolutions. Essential for designers and photographers.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Multiple Modes</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Three calculators in one. Simplify, find missing values, and calculate aspect ratios.</p>
                    </div>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications of Ratios</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">📐</span><span><strong className="text-gray-300">Cooking & Baking:</strong> Scaling recipes up or down. 2:1 ratio of flour to water for bread.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">📐</span><span><strong className="text-gray-300">Photography & Design:</strong> Aspect ratios for images (16:9, 4:3, 1:1). Maintaining proportions when resizing.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">📐</span><span><strong className="text-gray-300">Finance:</strong> Financial ratios (debt-to-equity, price-to-earnings). Analyzing company performance.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">📐</span><span><strong className="text-gray-300">Construction:</strong> Concrete mix ratios (1:2:4 for cement:sand:aggregate). Proportions in blueprints.</span></li>
                </ul>
            </section>

            {/* Ratio Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Ratio Formulas & Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Simplifying Ratios</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find GCD of all numbers, divide each by GCD. Example: 12:18 → GCD=6 → 2:3.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Cross Multiplication</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">a:b = c:x → x = (b × c) ÷ a. Example: 2:3 = 4:x → x = (3×4)÷2 = 6.</p>
                    </div>
                </div>
            </section>

            {/* Common Ratio Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Ratio Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Ratio</th><th className="text-left py-3 px-4 text-gray-400">Use Case</th><th className="text-left py-3 px-4 text-gray-400">Equivalent Ratios</th></tr></thead>
                        <tbody>
                            {RATIO_EXAMPLES.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-yellow-400">{row.ratio}</td><td className="py-3 px-4 text-gray-300">{row.description}</td><td className="py-3 px-4 text-gray-400">{row.equivalent}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}