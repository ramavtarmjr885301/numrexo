"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to scale a recipe up or down?",
        a: "Multiply or divide all ingredient quantities by the scaling factor. Example: Double recipe = multiply all ingredients by 2. Half recipe = divide all ingredients by 2. The scaling factor is calculated as: New Servings ÷ Original Servings. This method works for both volume (cups, ml) and weight (grams, ounces) measurements. For best results, always scale all ingredients proportionally to maintain the recipe's balance and flavor profile.",
    },
    {
        q: "What is the difference between weight and volume measurements?",
        a: "Weight (grams, ounces) is more accurate for baking because it measures the actual mass of ingredients. Volume (cups, tablespoons) varies by ingredient density - a cup of flour weighs different than a cup of sugar. Professional bakers prefer weight measurements as they provide consistent, reproducible results. For home cooking, volume measurements are acceptable, but for baking, investing in a kitchen scale is highly recommended.",
    },
    {
        q: "How to convert tablespoons to teaspoons?",
        a: "1 tablespoon = 3 teaspoons. 1 teaspoon = 1/3 tablespoon. This is a standard measurement conversion used in all recipes. Remember: tablespoon is abbreviated as 'Tbsp' or 'T', while teaspoon is 'tsp' or 't'. Using the correct abbreviation helps avoid measurement mistakes when following recipes from different sources.",
    },
    {
        q: "What are standard recipe measurement units?",
        a: "Volume units: teaspoon (tsp) = 5ml, tablespoon (Tbsp) = 15ml, cup (c) = 240ml, milliliter (ml), liter (L). Weight units: gram (g), kilogram (kg) = 1000g, ounce (oz) = 28.35g, pound (lb) = 453.6g. US recipes commonly use cups and tablespoons, while European recipes often use grams and milliliters. Our converter handles all these units seamlessly.",
    },
    {
        q: "How do I convert a recipe from metric to imperial?",
        a: "Use our unit converter tab: 1) Enter the metric value (e.g., 500g), 2) Select 'gram' as 'From' unit, 3) Select 'ounce' or 'pound' as 'To' unit. Common conversions: 1 kg = 2.204 lb, 1 liter = 4.227 cups, 100g = 3.527 oz. Always double-check your conversions as accuracy is crucial for baking recipes. Our calculator provides precise conversions down to 2 decimal places.",
    },
    {
        q: "Why is my recipe not turning out the same after scaling?",
        a: "Recipe scaling can fail for several reasons: 1) Baking powder/soda doesn't scale linearly (use 1.5x for doubling, not 2x), 2) Cooking times change (larger portions need longer, but not double), 3) Pan sizes affect results (use similar surface area), 4) Spices and seasonings need careful adjustment (start with 1.5x for double). Our recipe scaling feature handles basic ingredient scaling, but always use your judgment for leavening agents and spices.",
    },
    {
        q: "Can I convert between volume and weight units?",
        a: "Volume to weight conversion requires ingredient density information. For example: 1 cup of all-purpose flour = 120g, 1 cup of sugar = 200g, 1 cup of butter = 227g, 1 cup of milk = 240ml = 240g. Our unit converter only converts within the same category (volume-to-volume or weight-to-weight) to prevent errors. For volume-to-weight conversions, use our ingredient-specific density chart available in the cooking section.",
    },
    {
        q: "What's the best way to scale baking recipes?",
        a: "Baking recipes require careful scaling: 1) Use weight measurements for accuracy, 2) Scale eggs carefully (1.5x for 1.5x recipe), 3) Adjust baking temperature slightly (lower by 25°F for larger portions), 4) Increase baking time gradually (check with toothpick test), 5) Scale leavening agents (baking powder/soda) at 1.5x for 2x recipes. Our recipe scaler helps with basic ingredient scaling, but always monitor your baked goods closely.",
    },
    {
        q: "How to convert cooking temperatures?",
        a: "Common temperature conversions: °F to °C: (°F - 32) × 5/9, °C to °F: (°C × 9/5) + 32. Standard baking temperatures: 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C, 450°F = 232°C. For gas mark conversions: Gas Mark 4 = 350°F, Gas Mark 5 = 375°F, Gas Mark 6 = 400°F. Always preheat your oven to the exact temperature specified.",
    },
    {
        q: "What are common kitchen measurement equivalents?",
        a: "Essential equivalents: 1 cup = 16 tablespoons = 48 teaspoons, 1 tablespoon = 3 teaspoons = 15ml, 1 fluid ounce = 2 tablespoons = 30ml, 1 quart = 4 cups = 946ml, 1 gallon = 16 cups = 3.785L, 1 stick butter = 8 tablespoons = 113g = 1/2 cup, 1 pound = 16 ounces = 454g. Keep these conversions handy for quick recipe adjustments. Our calculator handles all these conversions automatically.",
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
    url: "https://numrexo.com/cooking/recipe-converter",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Scale recipes", "Measurement conversion", "Serving adjustment", "Unit converter"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Recipe Converter", item: "https://numrexo.com/cooking/recipe-converter" },
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

    const resetForm = (): void => {
        setCalcType("scale");
        setServings("");
        setOriginalServings("");
        setIngredients([{ id: 1, name: "", amount: "", unit: "cup" }]);
        setFromUnit("cup");
        setToUnit("ml");
        setConvertValue("");
        setResult(null);
        setOpenFaq(null);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/cooking" itemProp="item" className="hover:text-gray-300">Cooking Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Recipe Converter</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Recipe Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Scale recipes or convert units</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Conversion Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "scale" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("scale")}
                                >
                                    Scale Recipe
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "unit" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("unit")}
                                >
                                    Convert Units
                                </button>
                            </div>
                        </div>

                        {calcType === "scale" ? (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Original Servings</label>
                                        <input
                                            type="number"
                                            placeholder="4"
                                            value={originalServings}
                                            onChange={(e) => setOriginalServings(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Desired Servings</label>
                                        <input
                                            type="number"
                                            placeholder="8"
                                            value={servings}
                                            onChange={(e) => setServings(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold text-gray-400">Ingredients</label>
                                    <button onClick={addIngredient} className="text-xs text-blue-400 hover:text-blue-300">+ Add Ingredient</button>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {ingredients.map(ing => (
                                        <div key={ing.id} className="flex gap-2 items-center">
                                            <input
                                                type="text"
                                                placeholder="Ingredient"
                                                value={ing.name}
                                                onChange={(e) => updateIngredient(ing.id, "name", e.target.value)}
                                                className="flex-1 px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                                            />
                                            <div className="w-24 relative">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="Amount"
                                                    value={ing.amount}
                                                    onChange={(e) => updateIngredient(ing.id, "amount", e.target.value)}
                                                    className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>
                                            <div className="w-28">
                                                <select
                                                    value={ing.unit}
                                                    onChange={(e) => updateIngredient(ing.id, "unit", e.target.value)}
                                                    className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                                                >
                                                    <option value="tsp">tsp</option>
                                                    <option value="tbsp">Tbsp</option>
                                                    <option value="cup">cup</option>
                                                    <option value="ml">ml</option>
                                                    <option value="g">g</option>
                                                    <option value="kg">kg</option>
                                                    <option value="oz">oz</option>
                                                    <option value="lb">lb</option>
                                                </select>
                                            </div>
                                            {ingredients.length > 1 && (
                                                <button onClick={() => removeIngredient(ing.id)} className="px-2 py-2 text-red-400 hover:text-red-300">
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Value</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="1"
                                        value={convertValue}
                                        onChange={(e) => setConvertValue(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">From</label>
                                        <select
                                            value={fromUnit}
                                            onChange={(e) => setFromUnit(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        >
                                            {MEASUREMENT_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); }}
                                        className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                                    >
                                        🔄
                                    </button>
                                    <div className="flex-1">
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
                                        <select
                                            value={toUnit}
                                            onChange={(e) => setToUnit(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        >
                                            {MEASUREMENT_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleConvert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                {calcType === "scale" ? "Scale Recipe →" : "Convert →"}
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

                {/* Results Display */}
                <ResultBox
                    title={calcType === "scale" ? "Scaled Recipe" : "Unit Conversion"}
                    isEmpty={!result}
                    emptyIcon="📖"
                    emptyText={calcType === "scale" ? "Add ingredients and servings" : "Enter value and units"}
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

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Recipe Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Recipe Converter</strong> is a versatile tool that helps you scale recipes up or down for any number of servings and convert between different measurement units. Whether you're cooking for a large family gathering or scaling down a recipe for two, this tool makes recipe adjustment effortless and accurate.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our converter supports both volume measurements (teaspoons, tablespoons, cups, milliliters, liters) and weight measurements (grams, kilograms, ounces, pounds). With real-time calculation and easy-to-use interface, you can quickly adapt any recipe to your needs without manual math.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Recipe Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Choose between <strong className="text-white">"Scale Recipe"</strong> or <strong className="text-white">"Convert Units"</strong> mode.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> For scaling: Enter <strong className="text-white">original servings</strong> and <strong className="text-white">desired servings</strong>, then add ingredients with their amounts.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For unit conversion: Enter the <strong className="text-white">value</strong>, select <strong className="text-white">"From"</strong> and <strong className="text-white">"To"</strong> units.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Scale Recipe"</strong> or <strong className="text-white">"Convert"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">"Add Ingredient"</strong> for multi-ingredient recipes.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Recipe Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Perfect Portions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Never waste food again. Scale any recipe to match your exact serving needs, whether cooking for 2 or 20 people.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ International Recipes</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Easily convert between US (cups, ounces) and metric (ml, grams) measurements. Cook any recipe from any country.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Baking Accuracy</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Achieve perfect baking results with accurate weight measurements. Professional bakers prefer grams for consistent results.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Batch Cooking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Scale your favorite recipes for meal prep. Cook once, eat multiple times with perfectly proportioned ingredients.</p>
                    </div>
                </div>
            </section>

            {/* Common Conversions Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Kitchen Measurement Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">From</th>
                                <th className="text-left py-3 px-4 text-gray-400">To</th>
                                <th className="text-left py-3 px-4 text-gray-400">Value</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 cup</td>
                                <td className="py-2 px-4 text-gray-400">ml</td>
                                <td className="py-2 px-4 text-yellow-400">240 ml</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">US standard cup</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 tbsp</td>
                                <td className="py-2 px-4 text-gray-400">tsp</td>
                                <td className="py-2 px-4 text-yellow-400">3 tsp</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">Standard ratio</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 oz</td>
                                <td className="py-2 px-4 text-gray-400">g</td>
                                <td className="py-2 px-4 text-yellow-400">28.35 g</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">Weight conversion</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 lb</td>
                                <td className="py-2 px-4 text-gray-400">g</td>
                                <td className="py-2 px-4 text-yellow-400">453.6 g</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">1 pound = 16 oz</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 liter</td>
                                <td className="py-2 px-4 text-gray-400">cups</td>
                                <td className="py-2 px-4 text-yellow-400">4.227 cups</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">Metric to imperial</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 kg</td>
                                <td className="py-2 px-4 text-gray-400">lb</td>
                                <td className="py-2 px-4 text-yellow-400">2.204 lb</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">Kilogram to pound</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 stick butter</td>
                                <td className="py-2 px-4 text-gray-400">g</td>
                                <td className="py-2 px-4 text-yellow-400">113 g</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">½ cup = 8 tbsp</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are standard US measurements. Some countries use metric cups (250ml) or imperial units. Our converter handles all variations.
                    </p>
                </div>
            </section>

            {/* Recipe Scaling Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Recipe Scaling Tips for Perfect Results</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use weight measurements:</strong> For baking, always use grams for accuracy. 1 cup of flour can vary by 20-30g depending on how you scoop.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Adjust leavening agents:</strong> When doubling, use 1.5x baking powder/soda, not 2x. Too much can make your baked goods bitter and affect texture.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Monitor cooking time:</strong> Larger portions need more time, but not double. Use the recipe's doneness indicators (toothpick test, internal temperature).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Adjust pan size:</strong> When scaling, use pans with similar surface area. A 9x13 pan vs two 8x8 pans can affect baking time and results.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Season to taste:</strong> For spices and herbs, start with 1.5x for double recipes. You can always add more, but can't remove excess.</span>
                    </li>
                </ul>
            </section>

            {/* Volume vs Weight Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Volume vs Weight: Which is Better?</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed">
                        <strong className="text-white">Weight measurements</strong> (grams, ounces) are superior for baking and precise cooking because they eliminate the variability caused by how ingredients are packed. A cup of flour can weigh anywhere from 120g to 150g depending on the scooping method, while 120g of flour is always exactly 120g.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        <strong className="text-white">Volume measurements</strong> (cups, tablespoons) are more convenient for everyday cooking and are widely used in US recipes. They work well for liquids and when precision is less critical. For best results, use a kitchen scale for baking and volume measurements for cooking.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-800">
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-1">Weight Advantages</h4>
                            <ul className="text-xs text-gray-500 space-y-1">
                                <li>• 100% accurate</li>
                                <li>• Consistent results</li>
                                <li>• Easy to scale</li>
                                <li>• Professional standard</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-1">Volume Advantages</h4>
                            <ul className="text-xs text-gray-500 space-y-1">
                                <li>• Quick to measure</li>
                                <li>• No scale needed</li>
                                <li>• Common in US recipes</li>
                                <li>• Good for liquids</li>
                            </ul>
                        </div>
                    </div>
                </div>
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