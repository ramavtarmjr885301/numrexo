"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function BMRCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a || isNaN(w) || isNaN(h) || isNaN(a)) {
      alert("Please enter valid values");
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    const maintenanceCalories = bmr * 1.375; // Light exercise

    setResult({
      bmr: Math.round(bmr).toLocaleString("en-IN"),
      maintenanceCalories: Math.round(maintenanceCalories).toLocaleString("en-IN"),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Personal Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  gender === "male" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setGender("male")}
              >
                Male
              </button>
              <button
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  gender === "female" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setGender("female")}
              >
                Female
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Age</label>
            <div className="relative">
              <input
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Weight</label>
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
            <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
            <div className="relative">
              <input
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate BMR →
          </button>
        </div>
      </div>

      <ResultBox
        title="BMR Result"
        isEmpty={!result}
        emptyIcon="🔥"
        emptyText="Enter your details and press Calculate"
        mainResult={result ? {
          label: "Your BMR",
          value: `${result.bmr} calories/day`,
          color: "text-red-400",
        } : undefined}
        extraRows={result ? [
          { label: "Daily Calories to Maintain Weight", value: `${result.maintenanceCalories} calories/day` },
        ] : undefined}
      />
    </div>
  );
}