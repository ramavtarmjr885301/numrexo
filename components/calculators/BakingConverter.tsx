"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "Why convert cups to grams for baking?",
        a: "Weight measurements (grams) are more accurate than volume (cups). Flour can vary from 120-150g per cup depending on how it's packed. For consistent baking results, use grams.",
    },
    {
        q: "How many grams in a cup of flour?",
        a: "1 cup of all-purpose flour = 120-125 grams. For best results, spoon flour into cup and level, don't scoop. Our calculator uses 125g per cup.",
    },
    {
        q: "How many grams in a cup of sugar?",
        a: "1 cup of granulated sugar = 200g. 1 cup of brown sugar (packed) = 220g. 1 cup of powdered sugar = 120g.",
    },
    {
        q: "How many grams in a tablespoon of butter?",
        a: "1 tablespoon of butter = 14 grams. 1 cup of butter = 227 grams (2 sticks).",
    },
];

interface IngredientDensity {
    name: string;
    cupsToGrams: number;
    gramsToCups: number;
}

const INGREDIENTS: IngredientDensity[] = [
    { name: "All-Purpose Flour", cupsToGrams: 125, gramsToCups: 0.008 },
    { name: "Whole Wheat Flour", cupsToGrams: 120, gramsToCups: 0.0083 },
    { name: "Bread Flour", cupsToGrams: 127, gramsToCups: 0.0079 },
    { name: "Cake Flour", cupsToGrams: 115, gramsToCups: 0.0087 },
    { name: "Granulated Sugar", cupsToGrams: 200, gramsToCups: 0.005 },
    { name: "Brown Sugar (packed)", cupsToGrams: 220, gramsToCups: 0.0045 },
    { name: "Powdered Sugar", cupsToGrams: 120, gramsToCups: 0.0083 },
    { name: "Butter", cupsToGrams: 227, gramsToCups: 0.0044 },
    { name: "Cocoa Powder", cupsToGrams: 100, gramsToCups: 0.01 },
    { name: "Honey", cupsToGrams: 340, gramsToCups: 0.0029 },
    { name: "Milk", cupsToGrams: 240, gramsToCups: 0.0042 },
    { name: "Oats", cupsToGrams: 90, gramsToCups: 0.0111 },
    { name: "Nuts (chopped)", cupsToGrams: 120, gramsToCups: 0.0083 },
    { name: "Chocolate Chips", cupsToGrams: 170, gramsToCups: 0.0059 },
    { name: "Coconut (shredded)", cupsToGrams: 80, gramsToCups: 0.0125 },
    { name: "Raisins", cupsToGrams: 150, gramsToCups: 0.0067 },
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
    name: "Baking Converter – Cups to Grams Converter",
    description: "Convert baking ingredients from cups to grams and grams to cups. Accurate measurements for perfect baking.",
    url: "https://www.numrexo.com/cooking/baking-converter",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Cups to grams", "Grams to cups", "Ingredient database", "Accurate baking measurements"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://www.numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Baking Converter", item: "https://www.numrexo.com/cooking/baking-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BakingConverter() {
    const [ingredient, setIngredient] = useState(INGREDIENTS[0].name);
    const [conversionType, setConversionType] = useState<"cupsToGrams" | "gramsToCups">("cupsToGrams");
    const [value, setValue] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val) || val <= 0) {
            alert("Please enter a valid value");
            return;
        }

        const ingredientData = INGREDIENTS.find(i => i.name === ingredient);
        if (!ingredientData) return;

        let convertedValue: number;
        let fromUnit: string;
        let toUnit: string;

        if (conversionType === "cupsToGrams") {
            convertedValue = val * ingredientData.cupsToGrams;
            fromUnit = "cups";
            toUnit = "grams";
        } else {
            convertedValue = val * ingredientData.gramsToCups;
            fromUnit = "grams";
            toUnit = "cups";
        }

        setResult({
            ingredient,
            originalValue: val,
            convertedValue: convertedValue.toFixed(2),
            fromUnit,
            toUnit,
            conversionType,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/cooking" itemProp="item" className="hover:text-gray-300">Cooking Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Baking Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Baking Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert cups to grams for accurate baking</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Ingredient</label>
                            <select value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                {INGREDIENTS.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Conversion Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${conversionType === "cupsToGrams" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setConversionType("cupsToGrams")}>Cups → Grams</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${conversionType === "gramsToCups" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setConversionType("gramsToCups")}>Grams → Cups</button>
                            </div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">{conversionType === "cupsToGrams" ? "Cups" : "Grams"}</label><input type="number" step="0.1" placeholder="1" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox
                    title="Converted Measurement"
                    isEmpty={!result}
                    emptyIcon="🥄"
                    emptyText="Enter value to convert"
                    mainResult={result ? { label: `${result.originalValue} ${result.fromUnit} =`, value: `${result.convertedValue} ${result.toUnit}`, color: "text-yellow-400" } : undefined}
                    extraRows={result ? [
                        { label: "Ingredient", value: result.ingredient },
                        { label: "Conversion", value: conversionType === "cupsToGrams" ? "Cups to Grams" : "Grams to Cups" },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Baking Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert common baking ingredients from cups to grams and grams to cups. Weight measurements are more accurate for consistent baking results.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Baking Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">Ingredient</th><th className="text-left py-3 px-4 text-gray-400">1 Cup = Grams</th><th className="text-left py-3 px-4 text-gray-400">1 Gram = Cups</th></tr></thead>
                        <tbody>
                            {INGREDIENTS.map((item, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{item.name}</td><td className="py-2 px-4 text-yellow-400">{item.cupsToGrams}g</td><td className="py-2 px-4 text-gray-400">{item.gramsToCups.toFixed(4)} cups</td></tr>))}
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