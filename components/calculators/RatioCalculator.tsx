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
            // Three-term ratio
            const divisor = gcdThree(a, b, c);
            const simplified = `${a / divisor}:${b / divisor}:${c / divisor}`;
            setResult({
                original: `${a}:${b}:${c}`,
                simplified,
                divisor,
                type: "three",
            });
        } else {
            // Two-term ratio
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
                                <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">First Number</label><input type="number" placeholder="12" value={ratioA} onChange={(e) => setRatioA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Second Number</label><input type="number" placeholder="18" value={ratioB} onChange={(e) => setRatioB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Third Number (Optional)</label><input type="number" placeholder="Leave empty for 2-number ratio" value={ratioC} onChange={(e) => setRatioC(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            </>
                        )}

                        {calcType === "missing" && (
                            <>
                                <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">First Number (a)</label><input type="number" placeholder="2" value={knownA} onChange={(e) => setKnownA(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Second Number (b)</label><input type="number" placeholder="3" value={knownB} onChange={(e) => setKnownB(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Third Number (c) - Find d</label><input type="number" placeholder="4" value={missingX} onChange={(e) => setMissingX(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><p className="text-xs text-gray-500 mt-1">a:b = c:d, find d</p></div>
                            </>
                        )}

                        {calcType === "aspect" && (
                            <>
                                <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Width</label><input type="number" placeholder="1920" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Height</label><input type="number" placeholder="1080" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Target Width (Optional)</label><input type="number" placeholder="Enter to calculate matching height" value={targetWidth} onChange={(e) => setTargetWidth(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            </>
                        )}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Ratio Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Simplify ratios, find missing values in proportions, and calculate aspect ratios. Perfect for students, designers, and anyone working with proportions.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Ratio Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Ratio</th><th className="text-left py-3 px-4 text-gray-400">Use Case</th><th className="text-left py-3 px-4 text-gray-400">Equivalent Ratios</th></tr></thead>
                        <tbody>
                            {RATIO_EXAMPLES.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-yellow-400">{row.ratio}</td><td className="py-3 px-4 text-gray-300">{row.description}</td><td className="py-3 px-4 text-gray-400">{row.equivalent}</td></tr>))}
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