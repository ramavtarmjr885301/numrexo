"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const ACTIVITIES = [
  { value: "running", label: "🏃 Running (8 km/h)", met: 8 },
  { value: "walking", label: "🚶 Walking (5 km/h)", met: 3.5 },
  { value: "cycling", label: "🚴 Cycling (moderate)", met: 6.8 },
  { value: "swimming", label: "🏊 Swimming (moderate)", met: 7 },
  { value: "yoga", label: "🧘 Yoga", met: 3 },
  { value: "gym", label: "💪 Weight Training", met: 6 },
  { value: "dancing", label: "💃 Dancing", met: 5 },
  { value: "jumping", label: "🦘 Jumping Rope", met: 11.8 },
  { value: "stairs", label: "🪜 Climbing Stairs", met: 8.8 },
  { value: "football", label: "⚽ Football", met: 7.5 },
];

export default function CalorieBurnCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("running");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const selectedActivity = ACTIVITIES.find(a => a.value === activity);

    if (!w || !d || !selectedActivity) {
      alert("Please enter all values");
      return;
    }

    const caloriesPerMinute = (selectedActivity.met * 3.5 * w) / 200;
    const totalCalories = caloriesPerMinute * d;
    const caloriesPerHour = caloriesPerMinute * 60;

    setResult({
      totalCalories: Math.round(totalCalories),
      caloriesPerMinute: caloriesPerMinute.toFixed(1),
      caloriesPerHour: Math.round(caloriesPerHour),
      activity: selectedActivity.label,
      duration: d,
      weight: w,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Activity Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Your Weight</label>
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
            <label className="block text-xs font-semibold text-gray-400 mb-2">Activity Type</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
            >
              {ACTIVITIES.map((act) => (
                <option key={act.value} value={act.value}>
                  {act.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Duration</label>
            <div className="relative">
              <input
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">minutes</span>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate Calories Burned →
          </button>
        </div>
      </div>

      <ResultBox
        title="Calories Burned"
        isEmpty={!result}
        emptyIcon="🔥"
        emptyText="Enter your details and press Calculate"
        mainResult={result ? {
          label: "Total Calories Burned",
          value: `${result.totalCalories} kcal`,
          color: "text-orange-400",
        } : undefined}
        extraRows={result ? [
          { label: "Activity", value: result.activity },
          { label: "Duration", value: `${result.duration} minutes` },
          { label: "Calories per Minute", value: `${result.caloriesPerMinute} kcal` },
          { label: "Calories per Hour", value: `${result.caloriesPerHour} kcal` },
        ] : undefined}
      />
    </div>
  );
}