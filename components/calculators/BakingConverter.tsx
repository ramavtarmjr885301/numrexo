"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "Why do serious recipes give weights instead of cups?",
        a: "Because a cup measures volume, and flour is compressible. Scoop a cup straight from the bag and you can pack in 150 g; spoon it in loosely and level it off and you get about 120 g. That is a quarter more flour in the same cup, which is the difference between a tender cake and a dry one. A gram is a gram however you get it into the bowl.",
    },
    {
        q: "How many grams is a cup of flour?",
        a: "About 120-125 g for plain or all-purpose flour, spooned into the cup and levelled with a straight edge. Bread flour sits a touch higher, cake flour a touch lower, and wholemeal higher again. If a recipe was written in cups and you are converting, assume the spoon-and-level method unless it says otherwise — most American recipe writers use it.",
    },
    {
        q: "How many grams is a cup of sugar?",
        a: "Granulated white sugar is about 200 g a cup, and unlike flour it barely changes with how you fill it, because the crystals do not compress. Brown sugar is different: recipes almost always mean it packed, which brings a cup to roughly 213-220 g. Loose brown sugar can be 50 g lighter, so the word 'packed' is doing real work.",
    },
    {
        q: "How much does a stick of butter weigh?",
        a: "One US stick is 113 g — a quarter pound, half a cup, or 8 tablespoons. So a tablespoon of butter is about 14 g. In the UK and Europe butter comes in 250 g blocks instead, which is why American recipes calling for 'one stick' need converting rather than eyeballing.",
    },
    {
        q: "Is a cup the same size everywhere?",
        a: "No, and this catches people out. A US customary cup is 236.6 ml, a US legal cup used on nutrition labels is 240 ml, an Australian and New Zealand metric cup is 250 ml, and the old imperial cup was 284 ml. Between a US cup and a metric cup that is a 6% difference — enough to matter in a cake, not enough to notice in a soup.",
    },
    {
        q: "Do I need to convert liquids too?",
        a: "For water and milk you can treat millilitres and grams as the same, because their density is close enough to 1 g/ml for baking. Honey, syrup and oil are not: honey is about 340 g a cup, where water is about 240 g. Measure sticky liquids by weight if you can — it is also far less wasteful than scraping a measuring cup.",
    },
    {
        q: "What is the right way to measure flour in a cup if I have no scale?",
        a: "Fluff the flour in the bag or tub with a fork, spoon it lightly into the cup without tapping or pressing, then sweep the excess off with the back of a knife. Never scoop with the measuring cup itself and never bang it on the counter. Done consistently, this gets you close to the 120 g figure most recipes assume.",
    },
    {
        q: "Why does my cake come out dry when I follow the recipe exactly?",
        a: "Too much flour is the usual culprit, and cup measuring is the usual cause. A recipe calling for three cups can easily receive 450 g instead of the 360 g intended, which changes the whole ratio of flour to liquid and fat. Converting the recipe to weights once, and writing the grams on it, fixes the problem permanently.",
    },
    {
        q: "Does it matter for bread more than for cakes?",
        a: "It matters for both, but differently. Bread is usually written as baker&apos;s percentages against flour weight, so an error in the flour throws off the hydration and you feel it in the dough. Cakes are less forgiving of the error itself: there is no kneading stage where you can judge and adjust, so what goes in the tin is what you get.",
    },
    {
        q: "Which scale should I buy?",
        a: "Any digital kitchen scale that reads in 1 g steps and has a tare button. Tare is the part that matters — you put the bowl on, zero it, add flour to the target, zero again, add sugar. One bowl, no measuring cups to wash, and the numbers are the same every time.",
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
    url: "https://numrexo.com/cooking/baking-converter",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Cups to grams", "Grams to cups", "Ingredient database", "Accurate baking measurements"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Baking Converter", item: "https://numrexo.com/cooking/baking-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BakingConverter() {
    const [ingredient, setIngredient] = useState(INGREDIENTS[0].name);
    const [conversionType, setConversionType] = useState<"cupsToGrams" | "gramsToCups">("cupsToGrams");
    const [value, setValue] = useState("1");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val) || val <= 0) {
            setResult(null);
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

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { convert(); }, [ingredient, conversionType, value]);

    const resetForm = () => {
        setIngredient(INGREDIENTS[0].name);
        setConversionType("cupsToGrams");
        setValue("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/cooking" itemProp="item" className="hover:text-gray-300">Cooking Calculators</a><meta itemProp="position" content="2" /></li>
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
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">{conversionType === "cupsToGrams" ? "Cups" : "Grams"}</label><input type="number" step="0.1" placeholder="1" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="flex gap-3">
                            <button onClick={convert} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold hover:shadow-lg transition-all">Convert →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Baking Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Converts common baking ingredients between cups, tablespoons and grams. Each ingredient has its
                    own conversion because each has its own density — a cup of flour and a cup of honey are the same
                    volume and nowhere near the same weight.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    If you are converting a recipe rather than a single ingredient, it is worth writing the gram
                    figures onto the recipe itself. You only have to do it once.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Why a Cup of Flour Has No Fixed Weight</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        Flour compresses. How much ends up in the cup depends entirely on how it got there.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside mb-3">
                        <li>Spooned in loosely and levelled: <span className="text-white">~120 g</span></li>
                        <li>Scooped straight from the bag: <span className="text-white">~140-150 g</span></li>
                        <li>Scooped and tapped down: <span className="text-white">160 g or more</span></li>
                    </ul>
                    <p className="text-gray-500 text-xs">
                        Across three cups that spread is well over 100 g of flour — roughly an extra cup you never
                        meant to add. It is the most common reason a cake comes out dry when the recipe was followed
                        to the letter.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">One Cup, by Ingredient</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Ingredient</th><th className="text-right py-3 px-4 text-gray-400">1 cup ≈</th><th className="text-right py-3 px-4 text-gray-400">1 tbsp ≈</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Plain / all-purpose flour</td><td className="py-2 px-4 text-right">120 g</td><td className="py-2 px-4 text-right">8 g</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Granulated sugar</td><td className="py-2 px-4 text-right">200 g</td><td className="py-2 px-4 text-right">12.5 g</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Brown sugar, packed</td><td className="py-2 px-4 text-right">215 g</td><td className="py-2 px-4 text-right">13.5 g</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Butter</td><td className="py-2 px-4 text-right">227 g (2 sticks)</td><td className="py-2 px-4 text-right">14 g</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Water or milk</td><td className="py-2 px-4 text-right">240 g</td><td className="py-2 px-4 text-right">15 g</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Honey or syrup</td><td className="py-2 px-4 text-right">340 g</td><td className="py-2 px-4 text-right">21 g</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Cocoa powder</td><td className="py-2 px-4 text-right">85 g</td><td className="py-2 px-4 text-right">5 g</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    Figures are for a US cup of 240 ml, flour spooned and levelled. Treat them as close approximations —
                    brands and grinds vary by a few grams either way.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Not Every Cup Is the Same Cup</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Where</th><th className="text-right py-3 px-4 text-gray-400">Volume</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">US customary cup</td><td className="py-2 px-4 text-right">236.6 ml</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">US legal cup (nutrition labels)</td><td className="py-2 px-4 text-right">240 ml</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Australia and New Zealand</td><td className="py-2 px-4 text-right">250 ml</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Imperial cup (older UK recipes)</td><td className="py-2 px-4 text-right">284 ml</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    A US cup against an Australian one is about 6% apart. Negligible in a stew, noticeable in a sponge,
                    and worth checking where a recipe came from before you scale it up.
                </p>
            </section>

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