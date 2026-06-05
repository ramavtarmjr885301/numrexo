"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What are the main body types?",
        a: "There are five main body types: Pear (hips wider than shoulders), Apple (waist wider than hips), Hourglass (bust and hips balanced with narrow waist), Rectangle (shoulders, waist, and hips similar), and Inverted Triangle (shoulders wider than hips). Each body type has different characteristics and clothing recommendations.",
    },
    {
        q: "How do I measure myself correctly?",
        a: "Use a flexible measuring tape. For shoulders: measure around the fullest part. For bust: measure around the fullest part of your chest. For waist: measure at the narrowest point (usually belly button level). For hips: measure around the widest part of your buttocks. Stand straight and don't pull the tape too tight.",
    },
    {
        q: "Can my body type change?",
        a: "Yes, body type can change with weight loss/gain, muscle building, pregnancy, and aging. For example, weight gain around the midsection can change an hourglass to an apple shape. Building shoulder muscles can create a more inverted triangle shape. Body type is not fixed for life.",
    },
    {
        q: "Why is knowing my body type important?",
        a: "Knowing your body type helps you choose clothes that flatter your figure, set realistic fitness goals, and understand where you naturally store fat. It also helps personal trainers design effective workout plans tailored to your body shape.",
    },
    {
        q: "What is the most common body type?",
        a: "The pear shape (triangle) is the most common body type among women, with about 20% of women having this shape. Rectangle and hourglass shapes are also common. Apple and inverted triangle shapes are less common but still normal.",
    },
    {
        q: "How to dress for my body type?",
        a: "Pear shape: Highlight upper body with bright colors and patterns. Apple shape: Create waist definition with empire waistlines. Hourglass: Emphasize waist with belts and fitted clothing. Rectangle: Create curves with peplum tops and A-line skirts. Inverted Triangle: Balance shoulders with A-line skirts and wide-leg pants.",
    },
];

const BODY_TYPES = [
    { type: "Pear (Triangle)", shoulderHips: "Hips > Shoulders", description: "Hips are wider than shoulders", icon: "🍐" },
    { type: "Apple (Round)", shoulderHips: "Waist > Hips", description: "Weight carried around midsection", icon: "🍎" },
    { type: "Hourglass", shoulderHips: "Shoulders ≈ Hips, Waist < 0.75x", description: "Bust and hips balanced, narrow waist", icon: "⏳" },
    { type: "Rectangle", shoulderHips: "Shoulders ≈ Hips, Waist > 0.75x", description: "Straight up and down figure", icon: "📏" },
    { type: "Inverted Triangle", shoulderHips: "Shoulders > Hips", description: "Broad shoulders, narrower hips", icon: "🔻" },
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
    name: "Body Type Calculator – Find Your Body Shape",
    description: "Determine your body shape using shoulder, bust, waist, and hip measurements. Get personalized fashion and fitness advice.",
    url: "https://www.numrexo.com/health/body-type-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Body shape detection", "Measurement guide", "Fashion tips", "Fitness recommendations"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://www.numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Body Type Calculator", item: "https://www.numrexo.com/health/body-type-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BodyTypeCalculator() {
    const [gender, setGender] = useState<"male" | "female">("female");
    const [shoulders, setShoulders] = useState("");
    const [bust, setBust] = useState("");
    const [waist, setWaist] = useState("");
    const [hips, setHips] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const s = parseFloat(shoulders);
        const b = parseFloat(bust);
        const w = parseFloat(waist);
        const h = parseFloat(hips);

        if (!s || !w || !h || s <= 0 || w <= 0 || h <= 0) {
            alert("Please enter at least shoulder, waist, and hip measurements");
            return;
        }

        let bodyType = "";
        let description = "";
        let tips = "";

        // For women
        if (gender === "female") {
            const shoulderHipRatio = s / h;
            const waistHipRatio = w / h;
            const waistShoulderRatio = w / s;

            if (Math.abs(s - h) <= 2 && waistHipRatio < 0.75) {
                bodyType = "Hourglass";
                description = "Your bust and hips are balanced with a significantly narrower waist.";
                tips = "Highlight your waist with belts, fitted clothing, wrap dresses, and peplum tops. Avoid boxy cuts that hide your curves.";
            } else if (h > s + 2 && waistHipRatio < 0.85) {
                bodyType = "Pear (Triangle)";
                description = "Your hips are wider than your shoulders. You have a defined waist.";
                tips = "Draw attention to your upper body with bright colors, statement necklaces, and off-shoulder tops. Wear A-line skirts and dark colors on bottom.";
            } else if (s > h + 2 && waistHipRatio < 0.85) {
                bodyType = "Inverted Triangle";
                description = "Your shoulders are wider than your hips. You have a defined waist.";
                tips = "Balance your shoulders with A-line skirts, wide-leg pants, and V-neck tops. Avoid shoulder pads and puffy sleeves.";
            } else if (waistHipRatio >= 0.85 && waistShoulderRatio >= 0.75) {
                bodyType = "Apple (Round)";
                description = "Your waist is the widest part of your body.";
                tips = "Create waist definition with empire waistlines, wrap dresses, and A-line silhouettes. Avoid tight clothing around midsection.";
            } else {
                bodyType = "Rectangle";
                description = "Your shoulders, waist, and hips are relatively balanced with minimal curves.";
                tips = "Create curves with peplum tops, belted waists, and A-line skirts. Avoid boxy, shapeless clothing.";
            }
        } else {
            // For men - simpler classification
            const shoulderWaistRatio = s / w;
            const waistHipRatio = w / h;

            if (shoulderWaistRatio > 1.3) {
                bodyType = "V-Shape (Inverted Triangle)";
                description = "Broad shoulders with a narrower waist and hips.";
                tips = "Focus on building leg muscles to balance your physique. V-neck shirts and fitted jackets work well.";
            } else if (waistHipRatio > 0.95) {
                bodyType = "Apple / Oval";
                description = "Weight carried around the midsection.";
                tips = "Focus on cardio and core exercises. Wear darker colors around midsection, vertical stripes.";
            } else if (shoulderWaistRatio < 1.1 && waistHipRatio < 0.9) {
                bodyType = "Rectangle";
                description = "Shoulders, waist, and hips are similar in width.";
                tips = "Build shoulder and back muscles for V-shape. Tailored clothing works well for this body type.";
            } else {
                bodyType = "Athletic / Trapezoid";
                description = "Balanced proportions with good muscle definition.";
                tips = "Maintain balanced training. Most clothing styles work well for this body type.";
            }
        }

        setResult({
            bodyType,
            description,
            tips,
            measurements: {
                shoulders: s,
                bust: b || 0,
                waist: w,
                hips: h,
            },
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/health" itemProp="item" className="hover:text-gray-300">Health Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Body Type Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Body Type Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Enter your body measurements</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Gender</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "female" ? "bg-pink-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setGender("female")}>Female</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${gender === "male" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setGender("male")}>Male</button>
                            </div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Shoulder Width (cm)</label><div className="relative"><input type="number" step="0.5" placeholder="100" value={shoulders} onChange={(e) => setShoulders(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div></div>
                        {gender === "female" && (<div><label className="block text-xs font-semibold text-gray-400 mb-2">Bust / Chest (cm)</label><div className="relative"><input type="number" step="0.5" placeholder="90" value={bust} onChange={(e) => setBust(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div></div>)}
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Waist (cm)</label><div className="relative"><input type="number" step="0.5" placeholder="75" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Hip (cm)</label><div className="relative"><input type="number" step="0.5" placeholder="100" value={hips} onChange={(e) => setHips(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span></div></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg transition-all">Find My Body Type →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your Body Type"
                    isEmpty={!result}
                    emptyIcon="👤"
                    emptyText="Enter your measurements and press Calculate"
                    mainResult={result ? { label: "Body Shape", value: result.bodyType, color: "text-pink-400" } : undefined}
                    extraRows={result ? [
                        { label: "Description", value: result.description },
                        { label: "Style Tips", value: result.tips, valueColor: "text-yellow-400" },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Body Type Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Find your body shape using your shoulder, bust, waist, and hip measurements. Get personalized fashion advice and fitness recommendations based on your unique body type.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Body Types Reference</h2><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-400">Body Type</th>
                            <th className="text-left py-3 px-4 text-gray-400">Characteristics</th>
                            <th className="text-left py-3 px-4 text-gray-400">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BODY_TYPES.map((row, i) => (
                            <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4"><span className="text-xl mr-2">{row.icon}</span>{row.type}</td>
                                <td className="py-3 px-4 text-yellow-400">{row.shoulderHips}</td>
                                <td className="py-3 px-4 text-gray-400">{row.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">How to Take Accurate Measurements</h2><ul className="space-y-3"><li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Shoulders:</strong> Measure around the fullest part of your shoulders, keeping tape level.</span></li><li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Bust/Chest:</strong> Measure around the fullest part of your chest, keeping tape straight.</span></li><li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Waist:</strong> Measure at the narrowest point, usually just above belly button.</span></li><li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Hips:</strong> Measure around the widest part of your buttocks.</span></li></ul></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div></section>
        </>
    );
}