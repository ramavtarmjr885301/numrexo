"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a nutrition label?",
        a: "A nutrition label shows the nutritional content of a food product. It includes serving size, calories, macronutrients (fat, carbs, protein), vitamins, minerals, and % Daily Values. Reading nutrition labels helps you make healthier food choices and track your nutrient intake.",
    },
    {
        q: "How to read a nutrition label?",
        a: "Start with serving size — all numbers on the label are per serving. Check calories per serving. Limit saturated fat, sodium, and added sugars. Get enough fiber, vitamins, and minerals. The % Daily Value tells you if a nutrient is high (20%+) or low (5%-).",
    },
    {
        q: "What are macros and micros?",
        a: "Macronutrients (macros) are nutrients your body needs in large amounts: carbohydrates, proteins, and fats. Micronutrients (micros) are vitamins and minerals needed in smaller amounts: Vitamin A, C, D, calcium, iron, etc. Both are essential for health.",
    },
    {
        q: "What is the difference between total and added sugar?",
        a: "Total sugar includes both natural sugars (from fruits, milk) and added sugars (from processing). Added sugars are the ones you should limit. The FDA now requires labels to show both total and added sugars to help consumers make better choices.",
    },
    {
        q: "What is a good % Daily Value?",
        a: "5% DV or less is considered low. 20% DV or more is considered high. For nutrients you want to limit (saturated fat, sodium, added sugar), choose foods with lower % DV. For beneficial nutrients (fiber, vitamins, minerals), aim for higher % DV.",
    },
    {
        q: "How to calculate calories from macros?",
        a: "Carbs and protein provide 4 calories per gram. Fat provides 9 calories per gram. Example: 10g fat = 90 calories, 20g carbs = 80 calories, 10g protein = 40 calories, total = 210 calories. This helps verify label accuracy.",
    },
    {
        q: "How to calculate % Daily Value?",
        a: "% DV = (Amount in serving ÷ Daily Value) × 100. Example: 10g fat ÷ 78g (DV) × 100 = 12.8% DV. FDA sets Daily Values based on 2,000 calorie diet. Use our calculator to automatically calculate % DV for all nutrients.",
    },
    {
        q: "What is dietary fiber and why does it matter?",
        a: "Fiber supports digestion, helps steady blood sugar, and is linked to heart health. The FDA Daily Value for fiber is 28g on a 2,000-calorie diet. A food with 5g or more fiber per serving counts as a good source, and 20% DV or more counts as an excellent source.",
    },
    {
        q: "How do I compare nutrition labels between two products fairly?",
        a: "Check the serving size first — similar products often list different serving sizes, which skews a direct comparison. If serving sizes differ, recalculate both to a common base like per 100g or per 100 calories before comparing calories, sugar, or fat side by side.",
    },
];

const DAILY_VALUES = [
    { nutrient: "Total Fat", dv: "78g", limit: "Limit", color: "text-yellow-700" },
    { nutrient: "Saturated Fat", dv: "20g", limit: "Limit", color: "text-yellow-700" },
    { nutrient: "Cholesterol", dv: "300mg", limit: "Limit", color: "text-yellow-700" },
    { nutrient: "Sodium", dv: "2300mg", limit: "Limit", color: "text-yellow-700" },
    { nutrient: "Total Carbohydrate", dv: "275g", limit: "Get Enough", color: "text-green-600" },
    { nutrient: "Dietary Fiber", dv: "28g", limit: "Get Enough", color: "text-green-600" },
    { nutrient: "Protein", dv: "50g", limit: "Get Enough", color: "text-green-600" },
    { nutrient: "Vitamin D", dv: "20mcg", limit: "Get Enough", color: "text-green-600" },
    { nutrient: "Calcium", dv: "1300mg", limit: "Get Enough", color: "text-green-600" },
    { nutrient: "Iron", dv: "18mg", limit: "Get Enough", color: "text-green-600" },
    { nutrient: "Potassium", dv: "4700mg", limit: "Get Enough", color: "text-green-600" },
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
    name: "Nutrition Label Generator – Create Nutrition Facts",
    description: "Generate a nutrition facts label for your food product. Calculate calories, macros, and % daily values.",
    url: "https://numrexo.com/health/nutrition-label-generator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Nutrition label generation", "Calorie calculation", "% Daily Value", "Macro breakdown"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Nutrition Label Generator", item: "https://numrexo.com/health/nutrition-label-generator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function NutritionLabelGenerator() {
    const [servingSize, setServingSize] = useState("100");
    const [servingsPerContainer, setServingsPerContainer] = useState("1");
    const [calories, setCalories] = useState("");
    const [totalFat, setTotalFat] = useState("0");
    const [saturatedFat, setSaturatedFat] = useState("0");
    const [cholesterol, setCholesterol] = useState("0");
    const [sodium, setSodium] = useState("0");
    const [totalCarbs, setTotalCarbs] = useState("0");
    const [fiber, setFiber] = useState("0");
    const [sugar, setSugar] = useState("0");
    const [protein, setProtein] = useState("0");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const serving = parseFloat(servingSize);
        const servings = parseFloat(servingsPerContainer) || 1;
        const cal = parseFloat(calories);
        const fat = parseFloat(totalFat);
        const satFat = parseFloat(saturatedFat);
        const chol = parseFloat(cholesterol);
        const sod = parseFloat(sodium);
        const carbs = parseFloat(totalCarbs);
        const fib = parseFloat(fiber);
        const sugarAmt = parseFloat(sugar);
        const prot = parseFloat(protein);

        if (!serving || serving <= 0) {
            setResult(null);
            return;
        }

        const fatDV = fat ? ((fat / 78) * 100).toFixed(0) : "0";
        const satFatDV = satFat ? ((satFat / 20) * 100).toFixed(0) : "0";
        const cholDV = chol ? ((chol / 300) * 100).toFixed(0) : "0";
        const sodDV = sod ? ((sod / 2300) * 100).toFixed(0) : "0";
        const carbsDV = carbs ? ((carbs / 275) * 100).toFixed(0) : "0";
        const fiberDV = fib ? ((fib / 28) * 100).toFixed(0) : "0";
        const proteinDV = prot ? ((prot / 50) * 100).toFixed(0) : "0";

        let calculatedCalories = cal;
        if (!cal && (fat || carbs || prot)) {
            calculatedCalories = (fat || 0) * 9 + (carbs || 0) * 4 + (prot || 0) * 4;
        }

        setResult({
            servingSize: serving,
            servingsPerContainer: servings,
            calories: calculatedCalories ? calculatedCalories.toFixed(0) : "0",
            totalFat: fat || 0,
            saturatedFat: satFat || 0,
            cholesterol: chol || 0,
            sodium: sod || 0,
            totalCarbs: carbs || 0,
            fiber: fib || 0,
            sugar: sugarAmt || 0,
            protein: prot || 0,
            fatDV,
            satFatDV,
            cholDV,
            sodDV,
            carbsDV,
            fiberDV,
            proteinDV,
        });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [servingSize, servingsPerContainer, calories, totalFat, saturatedFat, cholesterol, sodium, totalCarbs, fiber, sugar, protein]);

    const resetForm = () => {
        setServingSize("");
        setServingsPerContainer("");
        setCalories("");
        setTotalFat("");
        setSaturatedFat("");
        setCholesterol("");
        setSodium("");
        setTotalCarbs("");
        setFiber("");
        setSugar("");
        setProtein("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Home</span></a><meta itemProp="position" content="1" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/health" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Health Calculators</span></a><meta itemProp="position" content="2" /></li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-ink-soft">Nutrition Label Generator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Nutrition Facts</h3>
                        <p className="text-xs text-ink-faint mt-1">Enter nutritional information per serving</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Serving Size (g)</label><input type="number" placeholder="100" value={servingSize} onChange={(e) => setServingSize(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-ink-faint mb-2">Servings Per Container</label><input type="number" placeholder="1" value={servingsPerContainer} onChange={(e) => setServingsPerContainer(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-ink-faint mb-2">Calories (optional)</label><input type="number" placeholder="Auto-calculated from macros" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-ink-faint mb-2">Total Fat (g)</label><input type="number" step="0.1" placeholder="0" value={totalFat} onChange={(e) => setTotalFat(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-ink-faint mb-2">Saturated Fat (g)</label><input type="number" step="0.1" placeholder="0" value={saturatedFat} onChange={(e) => setSaturatedFat(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-ink-faint mb-2">Cholesterol (mg)</label><input type="number" placeholder="0" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-ink-faint mb-2">Sodium (mg)</label><input type="number" placeholder="0" value={sodium} onChange={(e) => setSodium(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-ink-faint mb-2">Total Carbs (g)</label><input type="number" step="0.1" placeholder="0" value={totalCarbs} onChange={(e) => setTotalCarbs(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-ink-faint mb-2">Dietary Fiber (g)</label><input type="number" step="0.1" placeholder="0" value={fiber} onChange={(e) => setFiber(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-ink-faint mb-2">Total Sugar (g)</label><input type="number" step="0.1" placeholder="0" value={sugar} onChange={(e) => setSugar(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div><div><label className="block text-xs font-semibold text-ink-faint mb-2">Protein (g)</label><input type="number" step="0.1" placeholder="0" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Generate Label →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Nutrition Facts Label"
                    isEmpty={!result}
                    emptyIcon="🏷️"
                    emptyText="Enter nutrition information and press Generate"
                    mainResult={result ? { label: "Calories per Serving", value: `${result.calories} kcal`, color: "text-green-600" } : undefined}
                    extraRows={result ? [
                        { label: "Serving Size", value: `${result.servingSize}g (${result.servingsPerContainer} servings/container)` },
                        { label: "Total Fat", value: `${result.totalFat}g (${result.fatDV}% DV)`, valueColor: "text-yellow-700" },
                        { label: "Saturated Fat", value: `${result.saturatedFat}g (${result.satFatDV}% DV)` },
                        { label: "Cholesterol", value: `${result.cholesterol}mg (${result.cholDV}% DV)` },
                        { label: "Sodium", value: `${result.sodium}mg (${result.sodDV}% DV)` },
                        { label: "Total Carbohydrate", value: `${result.totalCarbs}g (${result.carbsDV}% DV)` },
                        { label: "Dietary Fiber", value: `${result.fiber}g (${result.fiberDV}% DV)`, valueColor: "text-green-600" },
                        { label: "Total Sugars", value: `${result.sugar}g` },
                        { label: "Protein", value: `${result.protein}g (${result.proteinDV}% DV)`, valueColor: "text-green-600" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Nutrition Label Generator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Nutrition Label Generator</strong> helps you create professional nutrition facts labels for food products. Enter serving size, macros, and get % Daily Values based on a 2,000 calorie diet. Perfect for food businesses, recipe developers, and health-conscious consumers.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Understanding nutrition labels is essential for making healthier food choices. Our generator follows FDA guidelines and shows calories, macronutrients, and % Daily Values for all key nutrients.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Nutrition Label Generator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Enter <strong className="text-ink">serving size</strong> (in grams) and <strong className="text-ink">servings per container</strong>.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> (Optional) Enter <strong className="text-ink">calories</strong> — if left blank, calculator auto-calculates from macros.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Enter <strong className="text-ink">macronutrients</strong> — Total Fat, Saturated Fat, Cholesterol, Sodium, Total Carbs, Fiber, Sugar, Protein.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> Click <strong className="text-ink">"Generate Label"</strong> to see your nutrition facts.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> View calories per serving, macro breakdown, and % Daily Values.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 6:</strong> Use the <strong className="text-ink">Reset</strong> button to clear all inputs and create a new label.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Nutrition Label Generator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Food Business Compliance</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Create FDA-compliant nutrition labels for packaged foods. Essential for selling products in retail stores or online.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Recipe Nutrition Analysis</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Analyze nutritional content of your recipes. Understand calories, macros, and nutrients in your meals.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Healthy Eating</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Understand what's in your food. Make informed choices about nutrition. Track your daily intake.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Meal Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Compare different products side by side. Plan meals that meet your nutritional goals.</p>
                    </div>
                </div>
            </section>

            {/* Understanding % Daily Value */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Understanding % Daily Value (DV)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Get Enough</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Aim for <strong className="text-ink">20% DV or more</strong> of: Dietary Fiber, Vitamin D, Calcium, Iron, Potassium. These nutrients support bone health, immune function, and overall wellness.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-600 mb-2">⚠️ Limit</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Choose foods with <strong className="text-ink">5% DV or less</strong> of: Saturated Fat, Sodium, Added Sugars. These nutrients are linked to heart disease, high blood pressure, and diabetes when consumed in excess.</p>
                    </div>
                </div>
            </section>

            {/* Calories from Macros */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Calculate Calories from Macros</h2>
                <div className="bg-surface border border-hairline rounded-xl p-5">
                    <p className="text-ink-faint text-sm leading-relaxed mb-3">
                        Each macronutrient provides a specific number of calories per gram:
                    </p>
                    <ul className="space-y-2 text-sm text-ink-faint">
                        <li><strong className="text-ink">Carbohydrates:</strong> 4 calories per gram</li>
                        <li><strong className="text-ink">Protein:</strong> 4 calories per gram</li>
                        <li><strong className="text-ink">Fat:</strong> 9 calories per gram</li>
                    </ul>
                    <p className="text-ink-faint text-sm leading-relaxed mt-3">
                        <strong className="text-ink">Example:</strong> 20g carbs = 80 cal, 10g protein = 40 cal, 10g fat = 90 cal → <strong className="text-green-600">Total = 210 calories</strong>
                    </p>
                </div>
            </section>

            {/* % Daily Value Reference Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">% Daily Value Reference (2,000 Calorie Diet)</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Nutrient</th>
                                <th className="text-left py-3 px-4 text-ink-faint">Daily Value</th>
                                <th className="text-left py-3 px-4 text-ink-faint">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DAILY_VALUES.map((row, i) => (
                                <tr key={i} className="border-b border-hairline hover:bg-cream">
                                    <td className="py-3 px-4 text-ink-soft">{row.nutrient}</td>
                                    <td className="py-3 px-4 text-yellow-700">{row.dv}</td>
                                    <td className={`py-3 px-4 ${row.limit === "Limit" ? "text-red-600" : "text-green-600"}`}>{row.limit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Nutrition Label Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Read % Daily Value</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">•</span><span><strong className="text-ink-soft">5% DV or less</strong> — Low. Choose foods with low % DV for nutrients to limit (fat, sodium).</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">•</span><span><strong className="text-ink-soft">20% DV or more</strong> — High. Choose foods with high % DV for beneficial nutrients (fiber, vitamins).</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">•</span><span><strong className="text-ink-soft">% DV is per serving</strong> — If you eat 2 servings, multiply all values by 2.</span></li>
                </ul>
            </section>

            {/* How to Read % Daily Value */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Read % Daily Value</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">•</span><span><strong className="text-ink-soft">5% DV or less</strong> — Low. Choose foods with low % DV for nutrients to limit (fat, sodium).</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">•</span><span><strong className="text-ink-soft">20% DV or more</strong> — High. Choose foods with high % DV for beneficial nutrients (fiber, vitamins).</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-green-600 mt-0.5">•</span><span><strong className="text-ink-soft">% DV is per serving</strong> — If you eat 2 servings, multiply all values by 2.</span></li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-ink" itemProp="name">{item.q}</span>
                                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-ink-faint leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}