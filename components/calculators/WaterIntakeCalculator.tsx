// components/calculators/WaterIntakeCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function WaterIntakeCalculator() {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("moderate");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const w = parseFloat(weight);
        if (!w || w <= 0) { alert("Enter valid weight"); return; }

        let baseWater = w * 0.033; // 33ml per kg
        const activityMultiplier = { sedentary: 0, light: 0.2, moderate: 0.5, active: 0.8, very: 1.2 };
        const activityWater = baseWater * (activityMultiplier[activity as keyof typeof activityMultiplier] || 0.5);
        const totalWater = baseWater + activityWater;
        const glasses = totalWater / 0.25; // 250ml glasses

        setResult({ totalWater: totalWater.toFixed(1), glasses: Math.round(glasses), baseWater: baseWater.toFixed(1), activityWater: activityWater.toFixed(1) });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Personal Details</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Body Weight</label><div className="relative"><input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Activity Level</label><select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white"><option value="sedentary">Sedentary (little exercise)</option><option value="light">Light (1-2x/week)</option><option value="moderate">Moderate (3-5x/week)</option><option value="active">Active (6-7x/week)</option><option value="very">Very Active (2x/day)</option></select></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold">Calculate Water Intake →</button></div></div><ResultBox title="Daily Water Intake" isEmpty={!result} emptyIcon="💧" emptyText="Enter your weight" mainResult={result ? { label: "Water Needed Daily", value: `${result.totalWater} liters`, color: "text-blue-400" } : undefined} extraRows={result ? [{ label: "Glasses (250ml)", value: `${result.glasses} glasses` }, { label: "Base Need", value: `${result.baseWater} liters` }, { label: "Activity Adjustment", value: `${result.activityWater} liters` }] : undefined} /></div>);
}