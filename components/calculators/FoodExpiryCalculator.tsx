"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How long does food last in the fridge?",
        a: "Cooked leftovers: 3-4 days. Raw meat/poultry: 1-2 days. Cooked meat: 3-4 days. Eggs: 3-5 weeks. Dairy: 1-2 weeks. Always check for signs of spoilage before eating.",
    },
    {
        q: "How long does food last in the freezer?",
        a: "Raw meat: 4-12 months. Cooked meat: 2-6 months. Vegetables: 8-12 months. Bread: 3-6 months. Frozen food stays safe indefinitely but quality decreases over time.",
    },
    {
        q: "What is the difference between 'best by' and 'use by' dates?",
        a: "'Best by' is quality date — food may still be safe after. 'Use by' is safety date — don't consume after. 'Sell by' is for stores, not consumers.",
    },
    {
        q: "How to tell if food has gone bad?",
        a: "Signs of spoilage: Unusual odor, mold growth, change in color or texture, slimy surface, bulging cans. When in doubt, throw it out.",
    },
];

interface FoodCategory {
    name: string;
    fridge: string;
    freezer: string;
    notes: string;
}

const FOOD_STORAGE: FoodCategory[] = [
    { name: "Cooked Leftovers", fridge: "3-4 days", freezer: "2-3 months", notes: "Refrigerate within 2 hours" },
    { name: "Raw Chicken/Turkey", fridge: "1-2 days", freezer: "9-12 months", notes: "Cook within 1-2 days" },
    { name: "Raw Beef/Pork/Lamb", fridge: "3-5 days", freezer: "4-12 months", notes: "Can be frozen for longer" },
    { name: "Raw Fish/Seafood", fridge: "1-2 days", freezer: "3-6 months", notes: "Use quickly for best quality" },
    { name: "Eggs", fridge: "3-5 weeks", freezer: "Not recommended", notes: "Don't freeze in shell" },
    { name: "Milk", fridge: "5-7 days", freezer: "3 months", notes: "May separate when thawed" },
    { name: "Yogurt", fridge: "1-2 weeks", freezer: "1-2 months", notes: "Texture may change" },
    { name: "Hard Cheese", fridge: "3-4 weeks", freezer: "6 months", notes: "Cut off mold from hard cheese" },
    { name: "Soft Cheese", fridge: "1 week", freezer: "3 months", notes: "Discard if mold appears" },
    { name: "Bread", fridge: "1-2 weeks", freezer: "3-6 months", notes: "Freeze for longer storage" },
    { name: "Fruits", fridge: "1-2 weeks", freezer: "8-12 months", notes: "Wash before eating" },
    { name: "Vegetables", fridge: "3-5 days", freezer: "8-12 months", notes: "Blanch before freezing" },
    { name: "Cooked Rice/Pasta", fridge: "3-5 days", freezer: "1-2 months", notes: "Reheat to 165°F" },
    { name: "Soups/Stews", fridge: "3-4 days", freezer: "2-3 months", notes: "Cool before refrigerating" },
    { name: "Opened Jar Sauce", fridge: "1-3 months", freezer: "Not recommended", notes: "Check for mold" },
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
    name: "Food Expiry Calculator – Food Storage Guide",
    description: "Check how long food lasts in fridge and freezer. Food storage times and safety guidelines.",
    url: "https://www.numrexo.com/cooking/food-expiry-calculator",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Food storage times", "Fridge vs freezer", "Safety guidelines", "Expiration dates"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://www.numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Food Expiry Calculator", item: "https://www.numrexo.com/cooking/food-expiry-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function FoodExpiryCalculator() {
    const [selectedFood, setSelectedFood] = useState(FOOD_STORAGE[0].name);
    const [storageMethod, setStorageMethod] = useState<"fridge" | "freezer">("fridge");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const food = FOOD_STORAGE.find(f => f.name === selectedFood);
        if (!food) return;

        const expiryTime = storageMethod === "fridge" ? food.fridge : food.freezer;

        setResult({
            food: food.name,
            storageMethod: storageMethod === "fridge" ? "Refrigerator" : "Freezer",
            expiryTime,
            notes: food.notes,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Food Expiry Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Food Storage Guide</h3>
                        <p className="text-xs text-gray-500 mt-1">Check how long food lasts in fridge or freezer</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Food Item</label>
                            <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                {FOOD_STORAGE.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Storage Method</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${storageMethod === "fridge" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setStorageMethod("fridge")}>Refrigerator</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${storageMethod === "freezer" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setStorageMethod("freezer")}>Freezer</button>
                            </div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg">Check Storage Time →</button>
                    </div>
                </div>

                <ResultBox
                    title="Storage Information"
                    isEmpty={!result}
                    emptyIcon="🥫"
                    emptyText="Select a food item"
                    mainResult={result ? { label: `${result.food} in ${result.storageMethod}`, value: result.expiryTime, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Important Notes", value: result.notes, valueColor: "text-yellow-400" },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Food Expiry Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Check how long different foods last in the refrigerator or freezer. Follow these guidelines for food safety and quality.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Complete Food Storage Chart</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">Food Item</th><th className="text-left py-3 px-4 text-gray-400">Refrigerator</th><th className="text-left py-3 px-4 text-gray-400">Freezer</th><th className="text-left py-3 px-4 text-gray-400">Notes</th></tr></thead>
                        <tbody>
                            {FOOD_STORAGE.map((item, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{item.name}</td><td className="py-2 px-4 text-yellow-400">{item.fridge}</td><td className="py-2 px-4 text-blue-400">{item.freezer}</td><td className="py-2 px-4 text-gray-500 text-xs">{item.notes}</td>49</tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Food Safety Tips</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Keep fridge at 40°F (4°C) or below</strong> — Bacteria grows rapidly above this temperature.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Freezer should be at 0°F (-18°C)</strong> — Food stays safe indefinitely at this temperature.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">When in doubt, throw it out</strong> — Don't risk food poisoning for a few dollars.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Label and date frozen foods</strong> — Use within recommended times for best quality.</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}