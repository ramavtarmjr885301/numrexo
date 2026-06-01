// components/calculators/WaterIntakeCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How much water should I drink daily?",
        a: "General recommendation: 2.7-3.7 liters per day (11-15 cups). However, individual needs vary based on weight, activity level, climate, and health. Our calculator provides personalized recommendations based on your weight and activity level.",
    },
    {
        q: "Does coffee and tea count as water intake?",
        a: "Yes! Moderate caffeine (2-3 cups) contributes to hydration. However, sugary drinks, alcohol, and excessive caffeine can have diuretic effects. Water should still be your primary source of hydration.",
    },
    {
        q: "What are signs of dehydration?",
        a: "Early signs: dry mouth, dark urine, headache, fatigue, dizziness. Severe signs: confusion, rapid heartbeat, fainting. Drink water before feeling thirsty - thirst indicates you're already dehydrated.",
    },
    {
        q: "Can I drink too much water?",
        a: "Yes, overhydration (hyponatremia) is rare but dangerous. It occurs when you drink more water than your kidneys can process (>1 liter per hour). Listen to your body and don't force excessive water intake.",
    },
];

const WATER_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Water Intake Calculator – Daily Hydration Calculator",
    description: "Calculate your daily water intake needs based on weight and activity level. Stay properly hydrated for better health and energy.",
    url: "https://www.numrexo.com/health/water-intake-calculator",
    applicationCategory: "HealthApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function WaterIntakeCalculator() {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("moderate");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const activityMultipliers = {
        sedentary: { name: "Sedentary", multiplier: 0, extra: "No regular exercise" },
        light: { name: "Light", multiplier: 0.2, extra: "1-2 days/week" },
        moderate: { name: "Moderate", multiplier: 0.5, extra: "3-5 days/week" },
        active: { name: "Active", multiplier: 0.8, extra: "6-7 days/week" },
        very: { name: "Very Active", multiplier: 1.2, extra: "2x/day training" },
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

        setResult({
            totalWater: totalWater.toFixed(1),
            glasses: Math.round(glasses),
            baseWater: baseWater.toFixed(1),
            activityWater: activityWater.toFixed(1),
            weight: w,
            activityLevel: activityMultipliers[activity as keyof typeof activityMultipliers]?.name,
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WATER_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/health" className="hover:text-gray-300">Health Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Water Intake Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Personal Details</h3>
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
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
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate Water Intake →
                        </button>
                    </div>
                </div>

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

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                    About Water Intake Calculator
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Proper hydration is essential for <strong className="text-gray-300">energy, brain function,
                        digestion, and overall health</strong>. Our water intake calculator provides personalized
                    recommendations based on your body weight and physical activity level.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The calculation uses the standard 30-35 ml per kg of body weight formula, with additional
                    water for physical activity. Stay hydrated for better health!
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Hydration Formula
                </h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        Daily Water (liters) = (Weight in kg × 0.033) + Activity Adjustment
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                        Example: 70kg × 0.033 = 2.31 liters base + 0.5 liters for moderate activity = 2.81 liters
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Benefits of Proper Hydration
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">⚡</div>
                        <div className="text-xs font-semibold">More Energy</div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">🧠</div>
                        <div className="text-xs font-semibold">Better Focus</div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">💪</div>
                        <div className="text-xs font-semibold">Muscle Function</div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">✨</div>
                        <div className="text-xs font-semibold">Healthy Skin</div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
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