// components/calculators/WaterIntakeCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How much water should I drink daily?",
        a: "General recommendation: 2.7-3.7 liters per day (11-15 cups). However, individual needs vary based on weight, activity level, climate, and health. Our calculator provides personalized recommendations based on your weight and activity level. The '8 glasses per day' rule is a minimum - most adults need more, especially if they exercise or live in hot climates.",
    },
    {
        q: "Does coffee and tea count as water intake?",
        a: "Yes! Moderate caffeine (2-3 cups) contributes to hydration. However, sugary drinks, alcohol, and excessive caffeine can have diuretic effects. Water should still be your primary source of hydration. Herbal teas and infused water are excellent alternatives. For every caffeinated drink, consider drinking an extra glass of water to compensate.",
    },
    {
        q: "What are signs of dehydration?",
        a: "Early signs: dry mouth, dark urine (amber color), headache, fatigue, dizziness, dry skin, and decreased urine output. Severe signs: confusion, rapid heartbeat, fainting, sunken eyes, and no urine output for 8+ hours. Drink water before feeling thirsty - thirst indicates you're already dehydrated. Monitor urine color: pale yellow = well hydrated, dark yellow = dehydrated.",
    },
    {
        q: "Can I drink too much water?",
        a: "Yes, overhydration (hyponatremia) is rare but dangerous. It occurs when you drink more water than your kidneys can process (>1 liter per hour or >4 liters in a short period). This dilutes sodium levels in your blood, causing cells to swell. Athletes and people with kidney conditions are at higher risk. Listen to your body and don't force excessive water intake.",
    },
    {
        q: "How does exercise affect water needs?",
        a: "Exercise significantly increases water needs. You lose 1-2 liters of water per hour through sweat during moderate exercise. For every 30 minutes of exercise, drink an extra 0.5-1 liter of water. For intense training (2x/day), add up to 1.2 liters extra. Our calculator adjusts for your activity level. Always drink water before, during, and after exercise.",
    },
    {
        q: "What is the best time to drink water?",
        a: "Best times for hydration: 1) Morning (1-2 glasses after waking - jumpstarts metabolism), 2) Before meals (30 minutes before - aids digestion), 3) During meals (in moderation), 4) Before and after exercise, 5) Before bed (small amount to avoid night-time dehydration). Space water intake throughout the day for optimal hydration.",
    },
    {
        q: "Does water intake vary by climate?",
        a: "Yes! In hot or humid climates, you need 0.5-1 liter more water daily due to increased sweating. In dry climates, you lose more water through breathing. At high altitudes, water needs increase by 1-1.5 liters. Our calculator uses a standard baseline; adjust based on your environment. If you're in extreme conditions, add 1-2 extra glasses daily.",
    },
    {
        q: "How does age affect water needs?",
        a: "Water needs change with age: Children (4-8 yrs): 1.2-1.7 L, Teens (9-13): 2.1-2.4 L, Adults: 2.7-3.7 L, Older adults (65+): Slightly less (2.5-3.2 L) but need to be more mindful as thirst sensation decreases with age. Older adults often forget to drink water and are at higher risk of dehydration. Set regular reminders to drink.",
    },
    {
        q: "What foods contain high water content?",
        a: "High-water foods (85-95% water): Cucumbers (96%), Celery (95%), Lettuce (95%), Watermelon (92%), Strawberries (91%), Grapefruit (91%), Cantaloupe (90%), Oranges (88%), Carrots (87%), Yogurt (85%). These contribute 20-30% of daily water intake. Eating fruits and vegetables is a delicious way to stay hydrated while getting essential nutrients.",
    },
    {
        q: "How to track daily water intake?",
        a: "Tracking methods: 1) Use a marked water bottle (know exactly how much you drink), 2) Set hourly reminders on phone, 3) Use apps (hydration trackers), 4) Drink a glass with each meal, 5) Use our calculator to set a goal, 6) Monitor urine color (pale yellow = good). Consistent tracking helps build the habit of regular hydration and prevents under-hydration.",
    },
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
    name: "Water Intake Calculator – Daily Hydration Calculator",
    description: "Calculate your daily water intake needs based on weight and activity level. Stay properly hydrated for better health and energy.",
    url: "https://numrexo.com/health/water-intake-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Personalized hydration", "Weight-based calculation", "Activity adjustment", "Glass count"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Water Intake Calculator", item: "https://numrexo.com/health/water-intake-calculator" },
    ],
});

const activityMultipliers = {
    sedentary: { name: "Sedentary", multiplier: 0, extra: "No regular exercise" },
    light: { name: "Light", multiplier: 0.2, extra: "1-2 days/week" },
    moderate: { name: "Moderate", multiplier: 0.5, extra: "3-5 days/week" },
    active: { name: "Active", multiplier: 0.8, extra: "6-7 days/week" },
    very: { name: "Very Active", multiplier: 1.2, extra: "2x/day training" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function WaterIntakeCalculator() {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("moderate");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setWeight("");
        setActivity("moderate");
        setResult(null);
    };

    const calculate = () => {
        const w = parseFloat(weight);
        if (!w || w <= 0) {
            alert("Please enter a valid weight");
            return;
        }

        // Base water: 30-35 ml per kg of body weight
        const baseWater = w * 0.033;
        const activityWater = baseWater * (activityMultipliers[activity as keyof typeof activityMultipliers]?.multiplier || 0.5);
        const totalWater = baseWater + activityWater;
        const glasses = totalWater / 0.25;

        const activityName = activityMultipliers[activity as keyof typeof activityMultipliers]?.name;

        setResult({
            totalWater: totalWater.toFixed(1),
            glasses: Math.round(glasses),
            baseWater: baseWater.toFixed(1),
            activityWater: activityWater.toFixed(1),
            weight: w,
            activityLevel: activityName,
        });
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
                        <a href="https://numrexo.com/health" itemProp="item" className="hover:text-gray-300">Health Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Water Intake Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Personal Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Get your personalized hydration recommendation</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Body Weight
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="70"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Activity Level
                            </label>
                            <select
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
                            >
                                <option value="sedentary">Sedentary (little or no exercise)</option>
                                <option value="light">Light (exercise 1-2 days/week)</option>
                                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                                <option value="active">Active (exercise 6-7 days/week)</option>
                                <option value="very">Very Active (intense training 2x/day)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                {activityMultipliers[activity as keyof typeof activityMultipliers]?.extra}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Water Intake →
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

                {/* Result Box */}
                <ResultBox
                    title="Daily Water Intake"
                    isEmpty={!result}
                    emptyIcon="💧"
                    emptyText="Enter your weight and press Calculate"
                    mainResult={result ? {
                        label: "Water Needed Daily",
                        value: `${result.totalWater} liters`,
                        color: "text-blue-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Glasses (250ml)", value: `${result.glasses} glasses`, valueColor: "text-green-400" },
                        { label: "Base Need (Resting)", value: `${result.baseWater} liters` },
                        { label: "Activity Adjustment", value: `${result.activityWater} liters` },
                        { label: "Weight", value: `${result.weight} kg` },
                        { label: "Activity Level", value: result.activityLevel }
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Water Intake Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Proper hydration is essential for <strong className="text-gray-300">energy, brain function,
                        digestion, and overall health</strong>. Our water intake calculator provides personalized
                    recommendations based on your body weight and physical activity level.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The calculation uses the standard 30-35 ml per kg of body weight formula, with additional
                    water for physical activity. This method is more accurate than the general "8 glasses per day"
                    rule because it accounts for your individual characteristics.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're an athlete, a busy professional, or just trying to improve your health,
                    this calculator helps you set the right hydration goal for your needs.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Water Intake Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">body weight</strong> in kilograms.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select your <strong className="text-white">activity level</strong> from the dropdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Water Intake"</strong> to get your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Review your <strong className="text-white">daily water goal in liters and glasses</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to try different weights or activity levels.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Benefits of Proper Hydration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">⚡ More Energy</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Even mild dehydration (1-2% of body weight) can cause fatigue and reduce energy levels. Proper hydration keeps your cells energized.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">🧠 Better Focus</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Your brain is 73% water. Dehydration impairs cognitive function, concentration, and memory. Stay hydrated for mental clarity.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">💪 Muscle Function</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Water lubricates joints and aids muscle contraction. Proper hydration reduces cramping and improves athletic performance.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✨ Healthy Skin</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Water helps maintain skin elasticity and moisture. Well-hydrated skin looks healthier, smoother, and more youthful.</p>
                    </div>
                </div>
            </section>

            {/* Hydration Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Hydration Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        Daily Water (liters) = (Weight in kg × 0.033) + Activity Adjustment
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-800">
                        <div>
                            <p className="text-xs text-gray-400"><strong className="text-gray-300">Base Need:</strong> 33 ml per kg of body weight</p>
                            <p className="text-xs text-gray-400"><strong className="text-gray-300">Example:</strong> 70kg × 0.033 = 2.31 liters base</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400"><strong className="text-gray-300">Activity Adjustment:</strong> 0-1.2 liters based on exercise</p>
                            <p className="text-xs text-gray-400"><strong className="text-gray-300">Example:</strong> 2.31L + 0.5L (moderate) = 2.81L total</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Water Intake by Age */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Water Intake Recommendations by Age</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Age Group</th>
                                <th className="text-left py-3 px-4 text-gray-400">Recommended Daily Intake</th>
                                <th className="text-left py-3 px-4 text-gray-400">Glasses (250ml)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Children (4-8 yrs)</td>
                                <td className="py-3 px-4 text-yellow-400">1.2-1.7 liters</td>
                                <td className="py-3 px-4 text-gray-400">5-7 glasses</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Teens (9-13 yrs)</td>
                                <td className="py-3 px-4 text-yellow-400">2.1-2.4 liters</td>
                                <td className="py-3 px-4 text-gray-400">8-10 glasses</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Adults (18-64 yrs)</td>
                                <td className="py-3 px-4 text-yellow-400">2.7-3.7 liters</td>
                                <td className="py-3 px-4 text-gray-400">11-15 glasses</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300">Older Adults (65+ yrs)</td>
                                <td className="py-3 px-4 text-yellow-400">2.5-3.2 liters</td>
                                <td className="py-3 px-4 text-gray-400">10-13 glasses</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * These are general guidelines. Individual needs vary based on weight, activity, and climate.
                    </p>
                </div>
            </section>

            {/* Signs of Dehydration */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Signs of Dehydration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🟡 Early Signs</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Dry mouth and throat</li>
                            <li>• Dark yellow urine</li>
                            <li>• Headache</li>
                            <li>• Fatigue and low energy</li>
                            <li>• Dizziness or lightheadedness</li>
                            <li>• Dry skin</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">🔴 Severe Signs</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Confusion or disorientation</li>
                            <li>• Rapid heartbeat</li>
                            <li>• Fainting or weakness</li>
                            <li>• Sunken eyes</li>
                            <li>• No urine output for 8+ hours</li>
                            <li>• Cold hands and feet</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">💡 Don't wait for thirst — it means you're already dehydrated. Drink water regularly throughout the day.</p>
            </section>

            {/* Hydration Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Hydration Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Start your day with water:</strong> Drink 1-2 glasses of water immediately after waking up. This jumpstarts your metabolism and rehydrates after sleep.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use a marked water bottle:</strong> A reusable bottle with time markers helps you track your intake throughout the day.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Set hourly reminders:</strong> Use your phone to set reminders to drink water every hour. Small sips add up!</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Eat water-rich foods:</strong> Cucumbers, watermelon, and strawberries have high water content and contribute to your daily hydration.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Monitor urine color:</strong> Pale yellow = well hydrated, dark yellow = dehydrated. Use this as your daily hydration indicator.</span>
                    </li>
                </ul>
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
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
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