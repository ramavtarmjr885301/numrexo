// components/calculators/IdealWeightCalculator.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is ideal body weight and how is it calculated?",
        a: "Ideal Body Weight (IBW) is an estimate of the optimal weight for a person based on height, gender, and body frame. The most common formulas are Robinson (1983), Miller (1983), Devine (1974), and Hamwi (1964). These formulas were originally developed for medical dosing but are now widely used for general health assessment.",
    },
    {
        q: "What is the Devine formula for ideal weight?",
        a: "The Devine formula (most commonly used): Men: 50 kg + 2.3 kg per inch over 5 feet. Women: 45.5 kg + 2.3 kg per inch over 5 feet. Example: 5'10\" man = 50 kg + (10 × 2.3) = 73 kg (161 lbs). This formula is the standard for medical dosing and is used by most health professionals.",
    },
    {
        q: "What is the Robinson formula?",
        a: "Robinson formula (more accurate for modern populations): Men: 52 kg + 1.9 kg per inch over 5 feet. Women: 49 kg + 1.7 kg per inch over 5 feet. Example: 5'10\" man = 52 kg + (10 × 1.9) = 71 kg. This formula is recommended for general population use.",
    },
    {
        q: "Does body frame size affect ideal weight?",
        a: "Yes! People with larger frames (wider wrists, broader shoulders) naturally weigh more than those with smaller frames. Frame size can add or subtract 10% from calculated ideal weight. Measure your wrist circumference: Men >7.5\" = large frame, <6.5\" = small frame. Women >6.5\" = large frame, <5.5\" = small frame.",
    },
    {
        q: "What is a healthy weight range?",
        a: "A healthy weight range is typically within ±10% of your ideal body weight. Using BMI as a guide: 18.5-24.9 is normal weight. For a 5'10\" person, healthy range is 129-174 lbs (59-79 kg). Ideal weight usually falls in the middle of this range (150-160 lbs).",
    },
    {
        q: "Does ideal weight change with age?",
        a: "Yes, ideal weight typically increases slightly with age. Adults may gain 1-2 kg per decade after 30 due to metabolic changes and muscle loss. For seniors (65+), a slightly higher BMI (23-27) is associated with better health outcomes than 'ideal' weight from formulas designed for younger adults.",
    },
    {
        q: "What is the Miller formula?",
        a: "Miller formula (1983): Men: 56.2 kg + 1.41 kg per inch over 5 feet. Women: 53.1 kg + 1.36 kg per inch over 5 feet. This formula gives slightly lower values than Devine and is preferred by some nutritionists for non-medical weight goals.",
    },
    {
        q: "How to calculate adjusted body weight for obesity?",
        a: "Adjusted Body Weight (ABW) = IBW + 0.4 × (Actual Weight - IBW). Used for calculating nutritional needs in overweight/obese patients. Example: 5'10\" man, IBW 160 lbs, actual 220 lbs = 160 + 0.4 × (220-160) = 160 + 24 = 184 lbs adjusted weight.",
    },
];

const IDEAL_WEIGHT_FORMULAS = [
    { formula: "Devine (Medical Standard)", men: "50 kg + 2.3 kg/inch over 5'", women: "45.5 kg + 2.3 kg/inch over 5'", color: "text-blue-400" },
    { formula: "Robinson (Recommended)", men: "52 kg + 1.9 kg/inch over 5'", women: "49 kg + 1.7 kg/inch over 5'", color: "text-green-400" },
    { formula: "Miller (Nutritionists)", men: "56.2 kg + 1.41 kg/inch over 5'", women: "53.1 kg + 1.36 kg/inch over 5'", color: "text-yellow-400" },
    { formula: "Hamwi (Traditional)", men: "48 kg + 2.7 kg/inch over 5'", women: "45.5 kg + 2.2 kg/inch over 5'", color: "text-purple-400" },
];

const FRAME_SIZES = [
    { frame: "Small Frame", men: "-10% from IBW", women: "-10% from IBW", wristMen: "< 6.5\"", wristWomen: "< 5.5\"" },
    { frame: "Medium Frame", men: "IBW (no adjustment)", women: "IBW (no adjustment)", wristMen: "6.5-7.5\"", wristWomen: "5.5-6.5\"" },
    { frame: "Large Frame", men: "+10% from IBW", women: "+10% from IBW", wristMen: "> 7.5\"", wristWomen: "> 6.5\"" },
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
    name: "Ideal Weight Calculator – Healthy Weight Range Calculator",
    description: "Calculate your ideal body weight using Devine, Robinson, Miller, and Hamwi formulas. Includes frame size adjustment for personalized results.",
    url: "https://www.numrexo.com/health/ideal-weight-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-US",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multiple formulas", "Frame size adjustment", "Height in feet/inches or cm", "Healthy weight range"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://www.numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Ideal Weight Calculator", item: "https://www.numrexo.com/health/ideal-weight-calculator" },
    ],
});

const HOWTO_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Your Ideal Body Weight",
    description: "Step-by-step guide to calculate ideal body weight using the Robinson, Devine, Miller, and Hamwi formulas.",
    totalTime: "PT1M",
    step: [
        {
            "@type": "HowToStep",
            position: 1,
            name: "Select your gender",
            text: "Choose Male or Female to apply the correct formula base weight.",
        },
        {
            "@type": "HowToStep",
            position: 2,
            name: "Enter your height",
            text: "Enter height in feet/inches (imperial) or centimeters (metric). For example, 5 feet 10 inches.",
        },
        {
            "@type": "HowToStep",
            position: 3,
            name: "Select your body frame size",
            text: "Measure wrist circumference to determine frame size: Small, Medium, or Large. This adjusts the result by ±10%.",
        },
        {
            "@type": "HowToStep",
            position: 4,
            name: "Click Calculate",
            text: "Press the Calculate button to see your ideal weight from all 4 formulas plus your healthy BMI range.",
        },
    ],
    tool: [
        { "@type": "HowToTool", name: "Ideal Weight Calculator at Numrexo" },
        { "@type": "HowToTool", name: "Measuring tape (for wrist circumference)" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function IdealWeightCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
    const [heightFt, setHeightFt] = useState("");
    const [heightIn, setHeightIn] = useState("");
    const [heightCm, setHeightCm] = useState("");
    const [frameSize, setFrameSize] = useState<"small" | "medium" | "large">("medium");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let heightInches: number;

        if (unit === "imperial") {
            const ft = parseFloat(heightFt) || 0;
            const inches = parseFloat(heightIn) || 0;
            heightInches = (ft * 12) + inches;
            if (heightInches <= 0) {
                alert("Please enter a valid height");
                return;
            }
        } else {
            const cm = parseFloat(heightCm);
            if (!cm || cm <= 0) {
                alert("Please enter a valid height");
                return;
            }
            heightInches = cm / 2.54;
        }

        const inchesOver5ft = Math.max(0, heightInches - 60);

        let devine, robinson, miller, hamwi;

        if (gender === "male") {
            devine = 50 + (2.3 * inchesOver5ft);
            robinson = 52 + (1.9 * inchesOver5ft);
            miller = 56.2 + (1.41 * inchesOver5ft);
            hamwi = 48 + (2.7 * inchesOver5ft);
        } else {
            devine = 45.5 + (2.3 * inchesOver5ft);
            robinson = 49 + (1.7 * inchesOver5ft);
            miller = 53.1 + (1.36 * inchesOver5ft);
            hamwi = 45.5 + (2.2 * inchesOver5ft);
        }

        let frameMultiplier = 1;
        if (frameSize === "small") frameMultiplier = 0.9;
        if (frameSize === "large") frameMultiplier = 1.1;

        const devineAdjusted = devine * frameMultiplier;
        const robinsonAdjusted = robinson * frameMultiplier;
        const millerAdjusted = miller * frameMultiplier;
        const hamwiAdjusted = hamwi * frameMultiplier;

        const heightMeters = heightInches * 0.0254;
        const healthyMinKg = 18.5 * heightMeters * heightMeters;
        const healthyMaxKg = 24.9 * heightMeters * heightMeters;
        const healthyMinLbs = healthyMinKg * 2.20462;
        const healthyMaxLbs = healthyMaxKg * 2.20462;

        setResult({
            heightInches: heightInches.toFixed(1),
            devine: Math.round(devineAdjusted),
            robinson: Math.round(robinsonAdjusted),
            miller: Math.round(millerAdjusted),
            hamwi: Math.round(hamwiAdjusted),
            healthyMin: unit === "metric" ? healthyMinKg.toFixed(1) : healthyMinLbs.toFixed(0),
            healthyMax: unit === "metric" ? healthyMaxKg.toFixed(1) : healthyMaxLbs.toFixed(0),
            unit: unit === "metric" ? "kg" : "lbs",
            frameSize,
        });
    };

    return (
        <>
            {/* ── Meta Tags ── */}
            <Head>
                <title>Ideal Weight Calculator – Find Your Healthy Weight Range (2025)</title>
                <meta
                    name="description"
                    content="Free ideal body weight calculator using Devine, Robinson, Miller & Hamwi formulas. Adjust for body frame size. Instantly find your healthy weight range in lbs or kg."
                />
                <meta name="keywords" content="ideal weight calculator, healthy weight calculator, ideal body weight, IBW calculator, Devine formula, Robinson formula, healthy weight range" />
                <link rel="canonical" href="https://www.numrexo.com/health/ideal-weight-calculator" />

                {/* Open Graph */}
                <meta property="og:title" content="Ideal Weight Calculator – Find Your Healthy Weight Range" />
                <meta property="og:description" content="Calculate your ideal body weight using 4 proven medical formulas. Free, instant, and accurate." />
                <meta property="og:url" content="https://www.numrexo.com/health/ideal-weight-calculator" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Numrexo" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Ideal Weight Calculator – Numrexo" />
                <meta name="twitter:description" content="Find your ideal body weight with 4 medical formulas. Adjust for frame size. Free calculator." />

                {/* Robots */}
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            </Head>

            {/* ── JSON-LD Schemas ── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: HOWTO_SCHEMA }} />

            {/* ────────────────────────────────────────────────────────────
                BREADCRUMB NAV — FIXED
                Added <span itemProp="name"> inside each <a> tag.
                Google requires BOTH itemProp="item" (URL) AND itemProp="name"
                (label) on each ListItem. Previously only "item" was present,
                causing the GSC error: "Either name or item.name should be
                specified in itemListElement".
            ──────────────────────────────────────────────────────────── */}
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/health" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Health Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Ideal Weight Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="flex border-b border-gray-800">
                        <button className={`flex-1 py-3 text-sm font-semibold transition-all ${gender === "male" ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setGender("male")}>Male</button>
                        <button className={`flex-1 py-3 text-sm font-semibold transition-all ${gender === "female" ? "text-pink-400 border-b-2 border-pink-500 bg-pink-500/5" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setGender("female")}>Female</button>
                    </div>
                    <div className="flex border-b border-gray-800">
                        <button className={`flex-1 py-3 text-sm font-semibold transition-all ${unit === "imperial" ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setUnit("imperial")}>Imperial (ft/in)</button>
                        <button className={`flex-1 py-3 text-sm font-semibold transition-all ${unit === "metric" ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5" : "text-gray-500 hover:text-gray-300"}`} onClick={() => setUnit("metric")}>Metric (cm)</button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
                            {unit === "imperial" ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input type="number" placeholder="5" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span>
                                    </div>
                                    <div className="relative">
                                        <input type="number" placeholder="10" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">in</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input type="number" placeholder="170" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Body Frame Size</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${frameSize === "small" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setFrameSize("small")}>Small</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${frameSize === "medium" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setFrameSize("medium")}>Medium</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${frameSize === "large" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setFrameSize("large")}>Large</button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Wrist measurement: Small = &lt;6.5&quot;(M)/&lt;5.5&quot;(F), Large = &gt;7.5&quot;(M)/&gt;6.5&quot;(F)</p>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Ideal Weight →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your Ideal Weight"
                    isEmpty={!result}
                    emptyIcon="⭐"
                    emptyText="Enter your height and press Calculate"
                    mainResult={result ? { label: "Recommended (Robinson)", value: `${result.robinson} ${result.unit}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Devine Formula", value: `${result.devine} ${result.unit}` },
                        { label: "Miller Formula", value: `${result.miller} ${result.unit}` },
                        { label: "Hamwi Formula", value: `${result.hamwi} ${result.unit}` },
                        { label: "Healthy Range", value: `${result.healthyMin} – ${result.healthyMax} ${result.unit}`, valueColor: "text-blue-400" },
                    ] : undefined}
                />
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Ideal Weight Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">The <strong className="text-gray-300">Ideal Body Weight (IBW)</strong> calculator helps you find your optimal weight range based on height, gender, and body frame size. Multiple formulas provide a range of recommendations.</p>
                <p className="text-gray-400 text-sm leading-relaxed">The Robinson formula is currently recommended for general population, while the Devine formula remains the medical standard for drug dosing calculations. Frame size adjustment adds or subtracts 10% for accuracy.</p>
            </section>

            <section className="mb-8">
                <h2 id="ideal-weight-formula" className="text-xl font-semibold text-white mb-4">Ideal Weight Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Formula</th><th className="text-left py-3 px-4 text-gray-400">Men (5 ft base)</th><th className="text-left py-3 px-4 text-gray-400">Women (5 ft base)</th></tr></thead>
                        <tbody>
                            {IDEAL_WEIGHT_FORMULAS.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className={`py-3 px-4 font-medium ${row.color}`}>{row.formula}</td><td className="py-3 px-4 text-gray-300">{row.men}</td><td className="py-3 px-4 text-gray-300">{row.women}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Body Frame Size Reference</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Frame Size</th><th className="text-left py-3 px-4 text-gray-400">Men (Wrist)</th><th className="text-left py-3 px-4 text-gray-400">Women (Wrist)</th><th className="text-left py-3 px-4 text-gray-400">Adjustment</th></tr></thead>
                        <tbody>
                            {FRAME_SIZES.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-gray-300">{row.frame}</td><td className="py-3 px-4 text-gray-300">{row.wristMen}</td><td className="py-3 px-4 text-gray-300">{row.wristWomen}</td><td className="py-3 px-4 text-gray-300">{row.frame === "Small Frame" ? "-10%" : row.frame === "Large Frame" ? "+10%" : "No adjustment"}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Healthy Weight Ranges by Height</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Women (5&apos;0&quot; - 5&apos;10&quot;)</h3>
                        <ul className="space-y-1 text-xs text-gray-400">
                            <li>• 5&apos;0&quot; (152 cm): 95-115 lbs (43-52 kg)</li>
                            <li>• 5&apos;2&quot; (157 cm): 105-125 lbs (48-57 kg)</li>
                            <li>• 5&apos;4&quot; (163 cm): 115-135 lbs (52-61 kg)</li>
                            <li>• 5&apos;6&quot; (168 cm): 125-145 lbs (57-66 kg)</li>
                            <li>• 5&apos;8&quot; (173 cm): 135-155 lbs (61-70 kg)</li>
                            <li>• 5&apos;10&quot; (178 cm): 145-165 lbs (66-75 kg)</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Men (5&apos;4&quot; - 6&apos;2&quot;)</h3>
                        <ul className="space-y-1 text-xs text-gray-400">
                            <li>• 5&apos;4&quot; (163 cm): 120-145 lbs (54-66 kg)</li>
                            <li>• 5&apos;6&quot; (168 cm): 130-155 lbs (59-70 kg)</li>
                            <li>• 5&apos;8&quot; (173 cm): 140-165 lbs (64-75 kg)</li>
                            <li>• 5&apos;10&quot; (178 cm): 150-175 lbs (68-79 kg)</li>
                            <li>• 6&apos;0&quot; (183 cm): 160-185 lbs (73-84 kg)</li>
                            <li>• 6&apos;2&quot; (188 cm): 170-195 lbs (77-88 kg)</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Limitations of Ideal Weight Formulas</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">While ideal weight calculators are helpful guides, they have important limitations:</p>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Don&apos;t account for muscle mass</strong> — Athletes may weigh more than IBW but have low body fat</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Originally for medical dosing</strong> — Not intended as beauty or fitness standards</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Ethnicity differences</strong> — Asian populations have different body composition</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Age not considered</strong> — Older adults may benefit from slightly higher weight</span></li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2" >
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}
                                itemScope
                                itemProp="acceptedAnswer"
                                itemType="https://schema.org/Answer"
                            >
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}