"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    const a = parseFloat(age);

    if (!w || !h || !n || !wa || !a) {
      alert("Please enter all required values");
      return;
    }

    let bodyFatPercentage;
    let category;
    let colorClass;

    if (gender === "male") {
      // US Navy Method for Men
      bodyFatPercentage = 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      // US Navy Method for Women (requires hip measurement)
      if (!hi) {
        alert("Please enter hip measurement for women");
        return;
      }
      bodyFatPercentage = 163.205 * Math.log10(wa + hi - n) - 97.684 * Math.log10(h) - 78.387;
    }

    bodyFatPercentage = Math.max(4, Math.min(50, bodyFatPercentage)); // Clamp between 4% and 50%

    // Categories based on gender and body fat percentage
    if (gender === "male") {
      if (bodyFatPercentage < 6) category = "Essential Fat";
      else if (bodyFatPercentage < 14) category = "Athletes";
      else if (bodyFatPercentage < 18) category = "Fitness";
      else if (bodyFatPercentage < 25) category = "Average";
      else category = "Obese";
      
      if (bodyFatPercentage < 14) colorClass = "text-green-400";
      else if (bodyFatPercentage < 18) colorClass = "text-blue-400";
      else if (bodyFatPercentage < 25) colorClass = "text-yellow-400";
      else colorClass = "text-red-400";
    } else {
      if (bodyFatPercentage < 14) category = "Essential Fat";
      else if (bodyFatPercentage < 21) category = "Athletes";
      else if (bodyFatPercentage < 25) category = "Fitness";
      else if (bodyFatPercentage < 32) category = "Average";
      else category = "Obese";
      
      if (bodyFatPercentage < 21) colorClass = "text-green-400";
      else if (bodyFatPercentage < 25) colorClass = "text-blue-400";
      else if (bodyFatPercentage < 32) colorClass = "text-yellow-400";
      else colorClass = "text-red-400";
    }

    const leanBodyMass = w * (1 - bodyFatPercentage / 100);
    const bodyFatMass = w * (bodyFatPercentage / 100);

    setResult({
      bodyFatPercentage: bodyFatPercentage.toFixed(1),
      category,
      colorClass,
      leanBodyMass: leanBodyMass.toFixed(1),
      bodyFatMass: bodyFatMass.toFixed(1),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Body Fat Measurement</h3>
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
                  gender === "female" ? "bg-pink-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setGender("female")}
              >
                Female
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Age</label>
            <input
              type="number"
              placeholder="30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
            />
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
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Neck Circumference</label>
            <div className="relative">
              <input
                type="number"
                placeholder="38"
                step="0.5"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Waist Circumference</label>
            <div className="relative">
              <input
                type="number"
                placeholder="80"
                step="0.5"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
            </div>
          </div>
          {gender === "female" && (
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Hip Circumference</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="95"
                  step="0.5"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
              </div>
            </div>
          )}
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate Body Fat →
          </button>
        </div>
      </div>

      <ResultBox
        title="Body Fat Analysis"
        isEmpty={!result}
        emptyIcon="📏"
        emptyText="Enter your measurements and press Calculate"
        mainResult={result ? {
          label: "Body Fat Percentage",
          value: `${result.bodyFatPercentage}%`,
          color: result.colorClass,
        } : undefined}
        extraRows={result ? [
          { label: "Category", value: result.category, valueColor: result.colorClass },
          { label: "Lean Body Mass", value: `${result.leanBodyMass} kg` },
          { label: "Body Fat Mass", value: `${result.bodyFatMass} kg` },
        ] : undefined}
      />
    </div>
  );
}