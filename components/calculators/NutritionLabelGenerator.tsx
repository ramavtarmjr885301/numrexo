"use client";

import { useState } from "react";
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
];

const DAILY_VALUES = [
    { nutrient: "Total Fat", dv: "78g", limit: "Limit", color: "text-yellow-400" },
    { nutrient: "Saturated Fat", dv: "20g", limit: "Limit", color: "text-yellow-400" },
    { nutrient: "Cholesterol", dv: "300mg", limit: "Limit", color: "text-yellow-400" },
    { nutrient: "Sodium", dv: "2300mg", limit: "Limit", color: "text-yellow-400" },
    { nutrient: "Total Carbohydrate", dv: "275g", limit: "Get Enough", color: "text-green-400" },
    { nutrient: "Dietary Fiber", dv: "28g", limit: "Get Enough", color: "text-green-400" },
    { nutrient: "Protein", dv: "50g", limit: "Get Enough", color: "text-green-400" },
    { nutrient: "Vitamin D", dv: "20mcg", limit: "Get Enough", color: "text-green-400" },
    { nutrient: "Calcium", dv: "1300mg", limit: "Get Enough", color: "text-green-400" },
    { nutrient: "Iron", dv: "18mg", limit: "Get Enough", color: "text-green-400" },
    { nutrient: "Potassium", dv: "4700mg", limit: "Get Enough", color: "text-green-400" },
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
    url: "https://www.numrexo.com/health/nutrition-label-generator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Nutrition label generation", "Calorie calculation", "% Daily Value", "Macro breakdown"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://www.numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Nutrition Label Generator", item: "https://www.numrexo.com/health/nutrition-label-generator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function NutritionLabelGenerator() {
    const [servingSize, setServingSize] = useState("");
    const [servingsPerContainer, setServingsPerContainer] = useState("");
    const [calories, setCalories] = useState("");
    const [totalFat, setTotalFat] = useState("");
    const [saturatedFat, setSaturatedFat] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [sodium, setSodium] = useState("");
    const [totalCarbs, setTotalCarbs] = useState("");
    const [fiber, setFiber] = useState("");
    const [sugar, setSugar] = useState("");
    const [protein, setProtein] = useState("");
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
            alert("Please enter serving size");
            return;
        }

        // Calculate % Daily Values (based on 2000 calorie diet)
        const fatDV = fat ? ((fat / 78) * 100).toFixed(0) : "0";
        const satFatDV = satFat ? ((satFat / 20) * 100).toFixed(0) : "0";
        const cholDV = chol ? ((chol / 300) * 100).toFixed(0) : "0";
        const sodDV = sod ? ((sod / 2300) * 100).toFixed(0) : "0";
        const carbsDV = carbs ? ((carbs / 275) * 100).toFixed(0) : "0";
        const fiberDV = fib ? ((fib / 28) * 100).toFixed(0) : "0";
        const proteinDV = prot ? ((prot / 50) * 100).toFixed(0) : "0";

        // Calculate calories from macros if not provided
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Nutrition Label Generator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Nutrition Facts</h3>
                        <p className="text-xs text-gray-500 mt-1">Enter nutritional information per serving</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Serving Size (g)</label><input type="number" placeholder="100" value={servingSize} onChange={(e) => setServingSize(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Servings Per Container</label><input type="number" placeholder="1" value={servingsPerContainer} onChange={(e) => setServingsPerContainer(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Calories (optional)</label><input type="number" placeholder="Auto-calculated from macros" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Total Fat (g)</label><input type="number" step="0.1" placeholder="0" value={totalFat} onChange={(e) => setTotalFat(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Saturated Fat (g)</label><input type="number" step="0.1" placeholder="0" value={saturatedFat} onChange={(e) => setSaturatedFat(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Cholesterol (mg)</label><input type="number" placeholder="0" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Sodium (mg)</label><input type="number" placeholder="0" value={sodium} onChange={(e) => setSodium(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Total Carbs (g)</label><input type="number" step="0.1" placeholder="0" value={totalCarbs} onChange={(e) => setTotalCarbs(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Dietary Fiber (g)</label><input type="number" step="0.1" placeholder="0" value={fiber} onChange={(e) => setFiber(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Total Sugar (g)</label><input type="number" step="0.1" placeholder="0" value={sugar} onChange={(e) => setSugar(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Protein (g)</label><input type="number" step="0.1" placeholder="0" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Generate Label →</button>
                    </div>
                </div>

                <ResultBox
                    title="Nutrition Facts Label"
                    isEmpty={!result}
                    emptyIcon="🏷️"
                    emptyText="Enter nutrition information and press Generate"
                    mainResult={result ? { label: "Calories per Serving", value: `${result.calories} kcal`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Serving Size", value: `${result.servingSize}g (${result.servingsPerContainer} servings/container)` },
                        { label: "Total Fat", value: `${result.totalFat}g (${result.fatDV}% DV)`, valueColor: "text-yellow-400" },
                        { label: "Saturated Fat", value: `${result.saturatedFat}g (${result.satFatDV}% DV)` },
                        { label: "Cholesterol", value: `${result.cholesterol}mg (${result.cholDV}% DV)` },
                        { label: "Sodium", value: `${result.sodium}mg (${result.sodDV}% DV)` },
                        { label: "Total Carbohydrate", value: `${result.totalCarbs}g (${result.carbsDV}% DV)` },
                        { label: "Dietary Fiber", value: `${result.fiber}g (${result.fiberDV}% DV)`, valueColor: "text-green-400" },
                        { label: "Total Sugars", value: `${result.sugar}g` },
                        { label: "Protein", value: `${result.protein}g (${result.proteinDV}% DV)`, valueColor: "text-green-400" },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Nutrition Label Generator</h2><p className="text-gray-400 text-sm leading-relaxed">Create a professional nutrition facts label for your food products. Enter serving size, macros, and get % Daily Values based on a 2,000 calorie diet.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">% Daily Value Reference (2,000 Calorie Diet)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Nutrient</th>
                                <th className="text-left py-3 px-4 text-gray-400">Daily Value</th>
                                <th className="text-left py-3 px-4 text-gray-400">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DAILY_VALUES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.nutrient}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.dv}</td>
                                    <td className={`py-3 px-4 ${row.limit === "Limit" ? "text-red-400" : "text-green-400"}`}>{row.limit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">How to Read % Daily Value</h2><ul className="space-y-3"><li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">5% DV or less</strong> — Low. Choose foods with low % DV for nutrients to limit (fat, sodium).</span></li><li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">20% DV or more</strong> — High. Choose foods with high % DV for beneficial nutrients (fiber, vitamins).</span></li><li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">% DV is per serving</strong> — If you eat 2 servings, multiply all values by 2.</span></li></ul></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div></section>
        </>
    );
}