"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to scale a recipe up or down?",
        a: "Multiply or divide all ingredient quantities by the scaling factor. Example: Double recipe = multiply all ingredients by 2. Half recipe = divide all ingredients by 2.",
    },
    {
        q: "What is the difference between weight and volume measurements?",
        a: "Weight (grams, ounces) is more accurate for baking. Volume (cups, tablespoons) varies by ingredient.",
    },
    {
        q: "How to convert tablespoons to teaspoons?",
        a: "1 tablespoon = 3 teaspoons. 1 teaspoon = 1/3 tablespoon.",
    },
    {
        q: "What are standard recipe measurement units?",
        a: "Volume: teaspoon (tsp), tablespoon (Tbsp), cup (c), milliliter (ml). Weight: gram (g), kilogram (kg), ounce (oz), pound (lb).",
    },
];

// Define proper types for measurement units
type VolumeUnit = {
    value: string;
    label: string;
    category: "volume";
    toMl: number;
};

type WeightUnit = {
    value: string;
    label: string;
    category: "weight";
    toGram: number;
};

type MeasurementUnit = VolumeUnit | WeightUnit;

const MEASUREMENT_UNITS: MeasurementUnit[] = [
    { value: "tsp", label: "Teaspoon (tsp)", category: "volume", toMl: 5 },
    { value: "tbsp", label: "Tablespoon (Tbsp)", category: "volume", toMl: 15 },
    { value: "cup", label: "Cup (c)", category: "volume", toMl: 240 },
    { value: "ml", label: "Milliliter (ml)", category: "volume", toMl: 1 },
    { value: "liter", label: "Liter (L)", category: "volume", toMl: 1000 },
    { value: "gram", label: "Gram (g)", category: "weight", toGram: 1 },
    { value: "kg", label: "Kilogram (kg)", category: "weight", toGram: 1000 },
    { value: "oz", label: "Ounce (oz)", category: "weight", toGram: 28.35 },
    { value: "lb", label: "Pound (lb)", category: "weight", toGram: 453.6 },
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
    name: "Recipe Converter – Scale Recipes Up or Down",
    description: "Scale recipes for any number of servings. Convert between measurement units easily.",
    url: "https://www.numrexo.com/cooking/recipe-converter",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Scale recipes", "Measurement conversion", "Serving adjustment", "Unit converter"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://www.numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Recipe Converter", item: "https://www.numrexo.com/cooking/recipe-converter" },
    ],
});

interface Ingredient {
    id: number;
    name: string;
    amount: string;
    unit: string;
}

interface ScaledIngredient {
    name: string;
    original: string;
    scaled: string;
}

interface ScaleResult {
    factor: string;
    scaledIngredients: ScaledIngredient[];
    originalServings: number;
    targetServings: number;
    type: "scale";
}

interface UnitResult {
    fromValue: number;
    fromUnit: string;
    toUnit: string;
    converted: string;
    type: "unit";
}

type ResultType = ScaleResult | UnitResult | null;

// Type guard functions
function isVolumeUnit(unit: MeasurementUnit): unit is VolumeUnit {
    return unit.category === "volume";
}

function isWeightUnit(unit: MeasurementUnit): unit is WeightUnit {
    return unit.category === "weight";
}

export default function RecipeConverter() {
    const [calcType, setCalcType] = useState<"scale" | "unit">("scale");
    const [servings, setServings] = useState<string>("");
    const [originalServings, setOriginalServings] = useState<string>("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: 1, name: "", amount: "", unit: "cup" }]);
    const [fromUnit, setFromUnit] = useState<string>("cup");
    const [toUnit, setToUnit] = useState<string>("ml");
    const [convertValue, setConvertValue] = useState<string>("");
    const [result, setResult] = useState<ResultType>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addIngredient = (): void => {
        const newId = Math.max(...ingredients.map(i => i.id), 0) + 1;
        setIngredients([...ingredients, { id: newId, name: "", amount: "", unit: "cup" }]);
    };

    const removeIngredient = (id: number): void => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter(i => i.id !== id));
        }
    };

    const updateIngredient = (id: number, field: keyof Ingredient, value: string): void => {
        setIngredients(ingredients.map(ing => ing.id === id ? { ...ing, [field]: value } : ing));
    };

    const calculateScale = (): void => {
        const original = parseFloat(originalServings);
        const target = parseFloat(servings);

        if (isNaN(original) || isNaN(target) || original <= 0 || target <= 0) {
            alert("Please enter valid serving sizes");
            return;
        }

        const factor = target / original;
        const scaledIngredients: ScaledIngredient[] = [];

        for (const ing of ingredients) {
            if (ing.name && ing.amount) {
                const amount = parseFloat(ing.amount);
                if (!isNaN(amount)) {
                    const scaledAmount = (amount * factor).toFixed(2);
                    scaledIngredients.push({
                        name: ing.name,
                        original: `${amount} ${ing.unit}`,
                        scaled: `${scaledAmount} ${ing.unit}`,
                    });
                }
            }
        }

        setResult({
            factor: factor.toFixed(2),
            scaledIngredients,
            originalServings: original,
            targetServings: target,
            type: "scale",
        });
    };

    const calculateUnit = (): void => {
        const value = parseFloat(convertValue);
        if (isNaN(value) || value <= 0) {
            alert("Please enter a valid value");
            return;
        }

        const from = MEASUREMENT_UNITS.find(u => u.value === fromUnit);
        const to = MEASUREMENT_UNITS.find(u => u.value === toUnit);

        if (!from || !to) {
            alert("Invalid units selected");
            return;
        }

        // Volume to Volume conversion
        if (isVolumeUnit(from) && isVolumeUnit(to)) {
            const inMl = value * from.toMl;
            const converted = inMl / to.toMl;
            setResult({
                fromValue: value,
                fromUnit: from.label,
                toUnit: to.label,
                converted: converted.toFixed(2),
                type: "unit",
            });
        }
        // Weight to Weight conversion
        else if (isWeightUnit(from) && isWeightUnit(to)) {
            const inGram = value * from.toGram;
            const converted = inGram / to.toGram;
            setResult({
                fromValue: value,
                fromUnit: from.label,
                toUnit: to.label,
                converted: converted.toFixed(2),
                type: "unit",
            });
        }
        else {
            alert("Cannot convert between volume and weight units (e.g., cups to grams) without ingredient density. Use the scale recipe feature instead.");
        }
    };

    const handleConvert = (): void => {
        if (calcType === "scale") {
            calculateScale();
        } else {
            calculateUnit();
        }
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/cooking" itemProp="item" className="hover:text-gray-300">Cooking Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Recipe Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Recipe Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Scale recipes or convert units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Conversion Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "scale" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("scale")}>Scale Recipe</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "unit" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("unit")}>Convert Units</button>
                            </div>
                        </div>

                        {calcType === "scale" ? (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Original Servings</label><input type="number" placeholder="4" value={originalServings} onChange={(e) => setOriginalServings(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Desired Servings</label><input type="number" placeholder="8" value={servings} onChange={(e) => setServings(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold text-gray-400">Ingredients</label>
                                    <button onClick={addIngredient} className="text-xs text-blue-400 hover:text-blue-300">+ Add Ingredient</button>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {ingredients.map(ing => (
                                        <div key={ing.id} className="flex gap-2 items-center">
                                            <input type="text" placeholder="Ingredient" value={ing.name} onChange={(e) => updateIngredient(ing.id, "name", e.target.value)} className="flex-1 px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                            <div className="w-24 relative"><input type="number" step="0.1" placeholder="Amount" value={ing.amount} onChange={(e) => updateIngredient(ing.id, "amount", e.target.value)} className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div>
                                            <div className="w-28"><select value={ing.unit} onChange={(e) => updateIngredient(ing.id, "unit", e.target.value)} className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                                <option value="tsp">tsp</option><option value="tbsp">Tbsp</option><option value="cup">cup</option><option value="ml">ml</option><option value="g">g</option><option value="kg">kg</option><option value="oz">oz</option><option value="lb">lb</option>
                                            </select></div>
                                            {ingredients.length > 1 && <button onClick={() => removeIngredient(ing.id)} className="px-2 py-2 text-red-400">✕</button>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" step="0.1" placeholder="1" value={convertValue} onChange={(e) => setConvertValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{MEASUREMENT_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                                    <button onClick={() => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); }} className="mt-6 p-2 rounded-lg bg-gray-700">🔄</button>
                                    <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{MEASUREMENT_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                                </div>
                            </>
                        )}

                        <button onClick={handleConvert} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox
                    title={calcType === "scale" ? "Scaled Recipe" : "Unit Conversion"}
                    isEmpty={!result}
                    emptyIcon="📖"
                    emptyText="Enter recipe details"
                    mainResult={result ? (calcType === "scale" ? { label: "Scaling Factor", value: `${(result as ScaleResult).factor}x`, color: "text-orange-400" } : { label: "Converted Value", value: `${(result as UnitResult).converted} ${(result as UnitResult).toUnit}`, color: "text-orange-400" }) : undefined}
                    extraRows={result ? [
                        ...(calcType === "scale" ? [
                            { label: "Original Servings", value: `${(result as ScaleResult).originalServings}` },
                            { label: "New Servings", value: `${(result as ScaleResult).targetServings}` },
                            ...(result as ScaleResult).scaledIngredients.map((ing: ScaledIngredient, i: number) => ({ label: ing.name, value: `${ing.scaled} (was ${ing.original})`, valueColor: "text-yellow-400" })),
                        ] : [
                            { label: "Original Value", value: `${(result as UnitResult).fromValue} ${(result as UnitResult).fromUnit}` },
                        ]),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Recipe Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Scale recipes up or down for any number of servings. Convert between measurement units like cups to ml, grams to ounces.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Measurement Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">1 cup</td><td className="py-2 px-4">ml</td><td className="py-2 px-4 text-yellow-400">240 ml</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 tbsp</td><td className="py-2 px-4">tsp</td><td className="py-2 px-4 text-yellow-400">3 tsp</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 oz</td><td className="py-2 px-4">g</td><td className="py-2 px-4 text-yellow-400">28.35 g</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 lb</td><td className="py-2 px-4">g</td><td className="py-2 px-4 text-yellow-400">453.6 g</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}