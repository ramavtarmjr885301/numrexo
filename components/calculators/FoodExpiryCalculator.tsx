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
    {
        q: "Can I eat food after the expiry date?",
        a: "For 'Best by' dates: Usually safe if stored properly and no signs of spoilage. For 'Use by' dates: Do not consume after this date - safety risk. For baby formula: Never use after expiry date. Use your senses - if it smells bad, looks bad, or tastes off, discard immediately.",
    },
    {
        q: "How to store food to last longer?",
        a: "Keep fridge at 40°F (4°C) or below. Freezer at 0°F (-18°C). Store raw meat on bottom shelf to prevent drips. Keep dairy in coldest part (not door). Use airtight containers for leftovers. Don't overpack fridge - air needs to circulate. Label and date everything.",
    },
    {
        q: "What foods should never be frozen?",
        a: "Never freeze: Eggs in shell (expand and crack), Canned foods (can burst), Mayonnaise (separates), Cream-based sauces (curdle), Fresh lettuce/cucumbers (become mushy), Whole raw potatoes (turn black), Cooked pasta (mushy when thawed). These foods lose texture and quality when frozen.",
    },
    {
        q: "How to tell if chicken has gone bad?",
        a: "Signs of spoiled chicken: Gray/green color (fresh chicken is pink), Sticky/slimy texture, Sour/ammonia smell, Expired use-by date. Discard immediately if any signs present. Raw chicken lasts 1-2 days in fridge, 9-12 months in freezer.",
    },
    {
        q: "Can refrigerated food be refrozen after thawing?",
        a: "Safe to refreeze if thawed in refrigerator (within 1-2 days). Do NOT refreeze if thawed at room temperature (bacteria grows). Quality may decrease with each freeze-thaw cycle. Cook meat before refreezing for best results.",
    },
    {
        q: "What is the 2-hour rule for food safety?",
        a: "Perishable food must be refrigerated within 2 hours of cooking. In hot weather (90°F/32°C+), reduce to 1 hour. Bacteria doubles every 20 minutes at room temperature. After 2 hours, food enters 'danger zone' (40°F-140°F) where bacteria grows rapidly.",
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
    url: "https://numrexo.com/cooking/food-expiry-calculator",
    applicationCategory: "CookingApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Food storage times", "Fridge vs freezer", "Safety guidelines", "Expiration dates"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Cooking Calculators", item: "https://numrexo.com/cooking" },
        { "@type": "ListItem", position: 3, name: "Food Expiry Calculator", item: "https://numrexo.com/cooking/food-expiry-calculator" },
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

    const resetForm = () => {
        setSelectedFood(FOOD_STORAGE[0].name);
        setStorageMethod("fridge");
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
                            <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white cursor-pointer">
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
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Check Storage Time →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Food Expiry Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Food Expiry Calculator</strong> helps you determine how long different foods last in the refrigerator or freezer. Follow these science-based guidelines from food safety authorities to reduce food waste and prevent foodborne illness.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're meal prepping, cleaning out your fridge, or planning grocery shopping, knowing proper food storage times saves money and keeps your family safe.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Food Expiry Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">food item</strong> from the dropdown list (15+ common foods).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Choose <strong className="text-white">storage method</strong> — Refrigerator or Freezer.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Check Storage Time"</strong> to see how long it lasts.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Read important notes for that specific food item.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear selection and check another food.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Food Expiry Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Reduce Food Waste</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Stop throwing away food that's still safe. Learn actual storage times vs guessing. Save money on groceries by using food before it spoils.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Prevent Food Poisoning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">48 million Americans get food poisoning annually. Follow proper storage times to keep your family safe. Know when to discard vs when food is still good.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Meal Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan weekly meals based on how long ingredients last. Cook leftovers within recommended times. Freeze extras before they spoil.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Bulk Buying Guide</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know which foods freeze well for bulk purchases. Buy meat on sale and freeze. Stock up during sales without waste.</p>
                    </div>
                </div>
            </section>

            {/* Temperature Guidelines */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Food Storage Temperature Guidelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">❄️ Refrigerator (40°F / 4°C)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Keep fridge at 40°F or below. Use a thermometer to verify. Don't overpack — air needs to circulate. Store raw meat on bottom shelf. Keep dairy in coldest part (not door).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-2">🧊 Freezer (0°F / -18°C)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Keep freezer at 0°F or below. Food stays safe indefinitely at this temperature, but quality decreases over time. Use freezer-safe containers. Label and date everything.</p>
                    </div>
                </div>
            </section>

            {/* Signs of Food Spoilage */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Signs of Food Spoilage - When to Throw Away</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">🔴</span><span><strong className="text-gray-300">Unusual Odor:</strong> Sour, rancid, ammonia, or off smells indicate bacterial growth. Trust your nose — if it smells bad, throw it out.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">🔴</span><span><strong className="text-gray-300">Mold Growth:</strong> Any visible mold on soft foods (bread, cheese, leftovers) means discard entire item. For hard cheese, cut off 1-inch around mold.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">🔴</span><span><strong className="text-gray-300">Texture Changes:</strong> Slimy surface on meat, mushy vegetables, or separated liquids indicate spoilage.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">🔴</span><span><strong className="text-gray-300">Color Changes:</strong> Gray/green meat, brown guacamole, discolored fruits indicate spoilage.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-red-400 mt-0.5">🔴</span><span><strong className="text-gray-300">Bulging Cans:</strong> Never eat from bulging, leaking, or rusted cans — risk of botulism.</span></li>
                </ul>
            </section>

            {/* Food Safety Statistics */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Food Safety Facts & Statistics</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>• <strong>48 million Americans</strong> get food poisoning each year</li>
                        <li>• <strong>128,000 hospitalizations</strong> and <strong>3,000 deaths</strong> annually from foodborne illness</li>
                        <li>• <strong>90% of food waste</strong> happens at consumer level due to confusion about date labels</li>
                        <li>• Proper storage can extend food life by <strong>50-100%</strong></li>
                        <li>• <strong>$1,500 per family</strong> wasted annually on spoiled food</li>
                    </ul>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Food Expiry Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Check how long different foods last in the refrigerator or freezer. Follow these guidelines for food safety and quality.</p>
            </section>

            {/* Complete Food Storage Chart */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Complete Food Storage Chart</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">Food Item</th><th className="text-left py-3 px-4 text-gray-400">Refrigerator</th><th className="text-left py-3 px-4 text-gray-400">Freezer</th><th className="text-left py-3 px-4 text-gray-400">Notes</th></tr></thead>
                        <tbody>
                            {FOOD_STORAGE.map((item, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{item.name}</td><td className="py-2 px-4 text-yellow-400">{item.fridge}</td><td className="py-2 px-4 text-blue-400">{item.freezer}</td><td className="py-2 px-4 text-gray-500 text-xs">{item.notes}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Food Safety Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Food Safety Tips</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Keep fridge at 40°F (4°C) or below</strong> — Bacteria grows rapidly above this temperature.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Freezer should be at 0°F (-18°C)</strong> — Food stays safe indefinitely at this temperature.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">When in doubt, throw it out</strong> — Don't risk food poisoning for a few dollars.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Label and date frozen foods</strong> — Use within recommended times for best quality.</span></li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}