"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How many calories should I eat per day?",
        a: "The average adult needs 2,000-2,500 calories per day. Women typically need 1,600-2,400 calories, men need 2,000-3,000 calories. Your exact needs depend on age, weight, height, activity level, and goals (weight loss, maintenance, or gain). Use our BMR calculator for personalized results.",
    },
    {
        q: "How many calories to lose weight?",
        a: "To lose 0.5 kg per week, create a 500 calorie daily deficit (eat 500 less or burn 500 more). To lose 1 kg per week, aim for 1,000 calorie deficit. Never eat below 1,200 calories (women) or 1,500 calories (men) without medical supervision. Slow and steady weight loss is more sustainable.",
    },
    {
        q: "How to track calories accurately?",
        a: "Use a food scale for accuracy. Measure portions, don't guess. Track everything including oils, sauces, and drinks. Use our food database or nutrition labels. Consistency matters more than perfection. Track for at least a week to see patterns.",
    },
    {
        q: "What is the difference between calories and kilojoules?",
        a: "Calories and kilojoules both measure energy. 1 calorie = 4.184 kilojoules (kJ). Most countries use kilojoules, but the US uses calories. Our calculator converts between both. 2,000 calories = approximately 8,368 kJ.",
    },
    {
        q: "Do all calories count the same?",
        a: "For weight loss, a calorie is a calorie. But for health and satiety, 500 calories from chicken and vegetables is better than 500 calories from cookies. Protein and fiber keep you fuller longer, helping you eat less overall. Focus on nutrient-dense foods.",
    },
    {
        q: "How to calculate maintenance calories?",
        a: "Maintenance calories = BMR × Activity Factor. Activity factors: Sedentary (1.2), Light (1.375), Moderate (1.55), Active (1.725), Very Active (1.9). Use our calculator to find your exact maintenance calories based on your lifestyle.",
    },
    {
        q: "What is BMR and how does it affect calorie needs?",
        a: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest just to maintain vital functions like breathing, circulation, and cell production. It accounts for 60-75% of your daily calorie burn. Knowing your BMR helps you set accurate calorie targets for weight loss or gain.",
    },
    {
        q: "How to count calories when eating out?",
        a: "Most chain restaurants publish nutrition info online. For local restaurants, estimate by comparing to similar dishes from chain restaurants. Use visual cues: palm-sized protein = ~3-4 oz, fist-sized carbs = ~1 cup, thumb-sized fat = ~1 tbsp. When in doubt, overestimate by 10-20%.",
    },
    {
        q: "What is the difference between active and total calories?",
        a: "Active calories are burned through exercise and movement (walking, running, gym). Total calories = BMR + active calories + TEF (thermic effect of food). Most fitness trackers show both. For weight management, focus on total daily calorie balance.",
    },
    {
        q: "How accurate are calorie counts on food labels?",
        a: "FDA allows ±20% accuracy on nutrition labels. For whole foods (fruits, vegetables, meat), actual calories vary naturally. To improve accuracy: use a food scale, check multiple sources, and aim for consistency rather than absolute precision.",
    },
    {
        q: "Can I lose weight without counting calories?",
        a: "Yes — use portion control (fill half plate with vegetables), eat protein with every meal, drink water before meals, avoid liquid calories, eat slowly, stop when 80% full, and reduce processed foods. These habits naturally reduce calorie intake without tracking numbers.",
    },
];

const CALORIE_FOODS = [
    { food: "Apple (medium)", calories: "95", protein: "0.5g", carbs: "25g", fat: "0.3g" },
    { food: "Banana (medium)", calories: "105", protein: "1.3g", carbs: "27g", fat: "0.4g" },
    { food: "Chicken Breast (100g)", calories: "165", protein: "31g", carbs: "0g", fat: "3.6g" },
    { food: "White Rice (1 cup)", calories: "205", protein: "4g", carbs: "45g", fat: "0.4g" },
    { food: "Egg (large)", calories: "72", protein: "6g", carbs: "0.4g", fat: "5g" },
    { food: "Bread (1 slice)", calories: "79", protein: "3g", carbs: "14g", fat: "1g" },
    { food: "Milk (1 cup)", calories: "103", protein: "8g", carbs: "12g", fat: "2.4g" },
    { food: "Olive Oil (1 tbsp)", calories: "119", protein: "0g", carbs: "0g", fat: "13.5g" },
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
    name: "Calorie Counter – Daily Calorie Tracker",
    description: "Track your daily calorie intake. Add foods, calculate total calories, protein, carbs, and fat.",
    url: "https://numrexo.com/health/calorie-counter",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Food calorie database", "Macro tracking", "Daily total calculator", "Add custom foods"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Calorie Counter", item: "https://numrexo.com/health/calorie-counter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalorieCounter() {
    const [foods, setFoods] = useState([{ name: "", calories: "", protein: "", carbs: "", fat: "" }]);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addFood = () => {
        setFoods([...foods, { name: "", calories: "", protein: "", carbs: "", fat: "" }]);
    };

    const removeFood = (index: number) => {
        if (foods.length > 1) {
            const updated = [...foods];
            updated.splice(index, 1);
            setFoods(updated);
        }
    };

    const updateFood = (index: number, field: string, value: string) => {
        const updated = [...foods];
        updated[index] = { ...updated[index], [field]: value };
        setFoods(updated);
    };

    const addSampleFood = (food: typeof CALORIE_FOODS[0]) => {
        const newFood = {
            name: food.food,
            calories: food.calories,
            protein: food.protein.replace("g", ""),
            carbs: food.carbs.replace("g", ""),
            fat: food.fat.replace("g", ""),
        };
        setFoods([...foods, newFood]);
    };

    const calculate = () => {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let validFoods = 0;

        for (let i = 0; i < foods.length; i++) {
            const cal = parseFloat(foods[i].calories);
            const protein = parseFloat(foods[i].protein);
            const carbs = parseFloat(foods[i].carbs);
            const fat = parseFloat(foods[i].fat);

            if (!isNaN(cal) && cal > 0) {
                totalCalories += cal;
                validFoods++;
            }
            if (!isNaN(protein)) totalProtein += protein;
            if (!isNaN(carbs)) totalCarbs += carbs;
            if (!isNaN(fat)) totalFat += fat;
        }

        if (validFoods === 0) {
            alert("Please add at least one food item with calories");
            return;
        }

        setResult({
            totalCalories: Math.round(totalCalories),
            totalProtein: totalProtein.toFixed(1),
            totalCarbs: totalCarbs.toFixed(1),
            totalFat: totalFat.toFixed(1),
            foodCount: validFoods,
        });
    };

    const resetForm = () => {
        setFoods([{ name: "", calories: "", protein: "", carbs: "", fat: "" }]);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/health" itemProp="item" className="hover:text-gray-300">Health Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Calorie Counter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div><h3 className="font-semibold">Food Log</h3><p className="text-xs text-gray-500 mt-1">Track what you eat today</p></div>
                        <button onClick={addFood} className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600">+ Add Food</button>
                    </div>
                    <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
                        {foods.map((food, i) => (
                            <div key={i} className="flex flex-wrap gap-2 items-center border-b border-gray-800 pb-3">
                                <input type="text" placeholder="Food name" value={food.name} onChange={(e) => updateFood(i, "name", e.target.value)} className="flex-1 min-w-[100px] px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                <div className="w-20 relative"><input type="number" placeholder="Cal" value={food.calories} onChange={(e) => updateFood(i, "calories", e.target.value)} className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">cal</span></div>
                                <div className="w-20 relative"><input type="number" step="0.1" placeholder="P" value={food.protein} onChange={(e) => updateFood(i, "protein", e.target.value)} className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">g</span></div>
                                <div className="w-20 relative"><input type="number" step="0.1" placeholder="C" value={food.carbs} onChange={(e) => updateFood(i, "carbs", e.target.value)} className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">g</span></div>
                                <div className="w-20 relative"><input type="number" step="0.1" placeholder="F" value={food.fat} onChange={(e) => updateFood(i, "fat", e.target.value)} className="w-full px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">g</span></div>
                                {foods.length > 1 && <button onClick={() => removeFood(i)} className="px-2 py-2 text-red-400 hover:text-red-300">✕</button>}
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-4 border-t border-gray-800">
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Total →</button>
                            <button onClick={resetForm} className="px-5 py-2 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <div>
                    <ResultBox
                        title="Daily Total"
                        isEmpty={!result}
                        emptyIcon="🥗"
                        emptyText="Add foods and press Calculate"
                        mainResult={result ? { label: "Total Calories", value: `${result.totalCalories} kcal`, color: "text-orange-400" } : undefined}
                        extraRows={result ? [
                            { label: "Protein", value: `${result.totalProtein}g`, valueColor: "text-green-400" },
                            { label: "Carbohydrates", value: `${result.totalCarbs}g`, valueColor: "text-yellow-400" },
                            { label: "Fat", value: `${result.totalFat}g`, valueColor: "text-red-400" },
                        ] : []}
                    />

                    {/* Quick Add Section */}
                    <div className="mt-6 bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800">
                            <h3 className="font-semibold">Quick Add Foods</h3>
                            <p className="text-xs text-gray-500 mt-1">Click to add common foods</p>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-2">
                                {CALORIE_FOODS.map((food, i) => (
                                    <button key={i} onClick={() => addSampleFood(food)} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all">
                                        {food.food}<br /><span className="text-xs text-gray-500">{food.calories} cal</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section - Expanded */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Calorie Counter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Track your daily calorie and macronutrient intake with our free calorie counter. Add foods manually or use our quick-add database of common foods including fruits, proteins, grains, and oils. Perfect for weight loss, muscle gain, or maintaining a healthy lifestyle.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your calorie intake is the first step toward achieving your health and fitness goals. Whether you want to lose weight, build muscle, or simply eat healthier, tracking what you eat helps you make informed decisions about your nutrition.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Calorie Counter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Click <strong className="text-white">"+ Add Food"</strong> to add items to your daily food log.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">food name, calories, protein, carbs, and fat</strong> for each item (use nutrition labels or our quick-add database).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Use the <strong className="text-white">Quick Add Foods</strong> section to instantly add common items with pre-filled nutrition data.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Total"</strong> to see your daily totals for calories, protein, carbs, and fat.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all foods and start a fresh log for a new day.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Benefits of Tracking Your Calories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Weight Management</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how many calories you consume vs. burn. Create accurate deficits for weight loss or surpluses for muscle gain.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Macronutrient Awareness</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track protein, carbs, and fat to ensure balanced nutrition. Hit your macro targets for optimal health and performance.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Mindful Eating</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Become more aware of portion sizes and food choices. Reduce mindless snacking and emotional eating.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Goal Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Monitor progress toward weight loss, muscle gain, or maintenance goals. Adjust your intake based on real data.</p>
                    </div>
                </div>
            </section>

            {/* Sample Meal Plan */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Sample Daily Meal Plan (1,500 calories)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-2 px-3 text-gray-400">Meal</th><th className="text-left py-2 px-3 text-gray-400">Food</th><th className="text-right py-2 px-3 text-gray-400">Calories</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Breakfast</td><td className="py-2 px-3">2 eggs + 1 slice whole grain bread + 1 banana</td><td className="py-2 px-3 text-right text-yellow-400">350</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Lunch</td><td className="py-2 px-3">150g chicken breast + 1 cup brown rice + 1 cup broccoli</td><td className="py-2 px-3 text-right text-yellow-400">500</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Snack</td><td className="py-2 px-3">1 apple + 1 tbsp peanut butter</td><td className="py-2 px-3 text-right text-yellow-400">150</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-3">Dinner</td><td className="py-2 px-3">150g fish + 1 cup quinoa + mixed vegetables</td><td className="py-2 px-3 text-right text-yellow-400">500</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">*Adjust portions based on your calorie needs. Active individuals may need 2,000-2,500 calories.</p>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Daily Calorie Reference</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h3 className="text-sm font-semibold text-blue-400 mb-2">For Weight Loss</h3><p className="text-gray-400 text-sm">• Reduce 500 calories/day = 0.5 kg/week</p><p className="text-gray-400 text-sm">• Reduce 1000 calories/day = 1 kg/week</p><p className="text-gray-400 text-sm">• Minimum: 1200 (women) / 1500 (men)</p></div><div><h3 className="text-sm font-semibold text-green-400 mb-2">For Weight Gain</h3><p className="text-gray-400 text-sm">• Add 300-500 calories/day = 0.25-0.5 kg/week</p><p className="text-gray-400 text-sm">• Focus on protein-rich foods</p><p className="text-gray-400 text-sm">• Combine with strength training</p></div></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Macro Guidelines</h2><div className="grid grid-cols-3 gap-4 text-center"><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">🍗</div><div className="text-sm font-semibold text-green-400">Protein</div><div className="text-xs text-gray-400">10-35% of calories</div><div className="text-xs text-gray-500 mt-1">~0.8g per kg body weight</div></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">🍚</div><div className="text-sm font-semibold text-yellow-400">Carbs</div><div className="text-xs text-gray-400">45-65% of calories</div><div className="text-xs text-gray-500 mt-1">Main energy source</div></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">🧈</div><div className="text-sm font-semibold text-red-400">Fat</div><div className="text-xs text-gray-400">20-35% of calories</div><div className="text-xs text-gray-500 mt-1">Essential for hormones</div></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div></section>
        </>
    );
}