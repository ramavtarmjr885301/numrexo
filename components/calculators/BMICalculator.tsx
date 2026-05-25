"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let h: number, w: number;
    
    if (unit === "metric") {
      h = parseFloat(heightCm) / 100;
      w = parseFloat(weight);
    } else {
      const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      h = totalIn * 0.0254;
      w = parseFloat(weight) * 0.453592;
    }
    
    if (!h || !w || h <= 0 || w <= 0 || isNaN(h) || isNaN(w)) {
      alert("Please enter valid height and weight values");
      return;
    }

    const bmi = w / (h * h);
    let category: string, colorClass: string;
    
    if (bmi < 16) { category = "Severe Thinness"; colorClass = "text-blue-400"; }
    else if (bmi < 17) { category = "Moderate Thinness"; colorClass = "text-blue-400"; }
    else if (bmi < 18.5) { category = "Mild Thinness"; colorClass = "text-blue-400"; }
    else if (bmi < 25) { category = "Normal"; colorClass = "text-green-400"; }
    else if (bmi < 30) { category = "Overweight"; colorClass = "text-yellow-400"; }
    else if (bmi < 35) { category = "Obese I"; colorClass = "text-orange-400"; }
    else if (bmi < 40) { category = "Obese II"; colorClass = "text-red-400"; }
    else { category = "Obese III"; colorClass = "text-red-400"; }

    let healthyRange: string;
    if (unit === "metric") {
      const minKg = 18.5 * h * h;
      const maxKg = 25 * h * h;
      healthyRange = `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg`;
    } else {
      const minLbs = 18.5 * h * h / 0.453592;
      const maxLbs = 25 * h * h / 0.453592;
      healthyRange = `${minLbs.toFixed(0)} – ${maxLbs.toFixed(0)} lbs`;
    }

    const gaugePos = Math.min(Math.max((bmi - 10) / 35 * 100, 2), 98);

    setResult({ 
      bmi: bmi.toFixed(1), 
      category, 
      colorClass, 
      healthyRange, 
      gaugePos 
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Input Form */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-800">
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-all ${
              unit === "metric"
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() => setUnit("metric")}
          >
            Metric Units
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-all ${
              unit === "imperial"
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() => setUnit("imperial")}
          >
            US / Imperial
          </button>
        </div>

        <div className="p-6 space-y-4">
          {unit === "metric" ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Height (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="170"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Weight (kg)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="65"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="5"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="10"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">in</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Weight (lbs)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="160"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">lbs</span>
                </div>
              </div>
            </>
          )}
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Calculate BMI →
          </button>
        </div>
      </div>

      {/* Result */}
      <ResultBox
        title="Your Result"
        isEmpty={!result}
        emptyIcon="⚖️"
        emptyText="Enter your height and weight, then press Calculate"
        mainResult={result ? {
          label: "Your BMI",
          value: result.bmi,
          unit: "kg/m²",
          color: result.colorClass,
        } : undefined}
        extraRows={result ? [
          { label: "Category", value: result.category, valueColor: result.colorClass },
          { label: "Healthy Weight Range", value: result.healthyRange },
        ] : undefined}
      >
        {result && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg transition-all"
                style={{ left: `${result.gaugePos}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-2">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        )}
      </ResultBox>
    </div>
  );
}





























// "use client";

// import { useState } from "react";
// import ResultBox from "@/components/common/ResultBox";

// export default function BMICalculator() {
//   const [unit, setUnit] = useState<"metric" | "imperial">("metric");
//   const [heightCm, setHeightCm] = useState("");
//   const [heightFt, setHeightFt] = useState("");
//   const [heightIn, setHeightIn] = useState("");
//   const [weight, setWeight] = useState("");
//   const [result, setResult] = useState<any>(null);

//   const calculate = () => {
//     let h: number, w: number;
//     if (unit === "metric") {
//       h = parseFloat(heightCm) / 100;
//       w = parseFloat(weight);
//     } else {
//       const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
//       h = totalIn * 0.0254;
//       w = parseFloat(weight) * 0.453592;
//     }
//     if (!h || !w || h <= 0 || w <= 0) return;

//     const bmi = w / (h * h);
//     let category: string, colorClass: string;
//     if (bmi < 16) { category = "Severe Thinness"; colorClass = "blue"; }
//     else if (bmi < 17) { category = "Moderate Thinness"; colorClass = "blue"; }
//     else if (bmi < 18.5) { category = "Mild Thinness"; colorClass = "blue"; }
//     else if (bmi < 25) { category = "Normal"; colorClass = "green"; }
//     else if (bmi < 30) { category = "Overweight"; colorClass = "yellow"; }
//     else if (bmi < 35) { category = "Obese I"; colorClass = "orange"; }
//     else if (bmi < 40) { category = "Obese II"; colorClass = "red"; }
//     else { category = "Obese III"; colorClass = "red"; }

//     let healthyRange: string;
//     if (unit === "metric") {
//       const minKg = 18.5 * h * h;
//       const maxKg = 25 * h * h;
//       healthyRange = `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg`;
//     } else {
//       const minLbs = 18.5 * h * h / 0.453592;
//       const maxLbs = 25 * h * h / 0.453592;
//       healthyRange = `${minLbs.toFixed(0)} – ${maxLbs.toFixed(0)} lbs`;
//     }

//     setResult({ bmi: bmi.toFixed(1), category, colorClass, healthyRange });
//   };

//   const getColorClass = () => {
//     switch (result?.colorClass) {
//       case "green": return "text-green-400";
//       case "yellow": return "text-yellow-400";
//       case "orange": return "text-orange-400";
//       case "red": return "text-red-400";
//       default: return "text-blue-400";
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//       {/* Input Form */}
//       <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
//         <div className="flex border-b border-gray-800">
//           {["metric", "imperial"].map((u) => (
//             <button
//               key={u}
//               className={`flex-1 py-3 text-sm font-semibold transition-all ${
//                 unit === u
//                   ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
//                   : "text-gray-500 hover:text-gray-300"
//               }`}
//               onClick={() => setUnit(u as "metric" | "imperial")}
//             >
//               {u === "metric" ? "Metric Units" : "US / Imperial"}
//             </button>
//           ))}
//         </div>

//         <div className="p-6 space-y-4">
//           {unit === "metric" ? (
//             <>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     placeholder="170"
//                     value={heightCm}
//                     onChange={(e) => setHeightCm(e.target.value)}
//                     className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 mb-2">Weight</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     placeholder="65"
//                     value={weight}
//                     onChange={(e) => setWeight(e.target.value)}
//                     className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 mb-2">Height</label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder="5"
//                       value={heightFt}
//                       onChange={(e) => setHeightFt(e.target.value)}
//                       className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder="10"
//                       value={heightIn}
//                       onChange={(e) => setHeightIn(e.target.value)}
//                       className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">in</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 mb-2">Weight</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     placeholder="160"
//                     value={weight}
//                     onChange={(e) => setWeight(e.target.value)}
//                     className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none transition-colors"
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">lbs</span>
//                 </div>
//               </div>
//             </>
//           )}
//           <button
//             onClick={calculate}
//             className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
//           >
//             Calculate BMI →
//           </button>
//         </div>
//       </div>

//       {/* Result */}
//       <ResultBox
//         title="Your Result"
//         isEmpty={!result}
//         emptyIcon="📊"
//         emptyText="Enter your details and press Calculate"
//         mainResult={result ? {
//           label: "Body Mass Index",
//           value: result.bmi,
//           unit: "kg/m²",
//           color: getColorClass(),
//         } : undefined}
//         extraRows={result ? [
//           { label: "Category", value: result.category, valueColor: getColorClass() },
//           { label: "Healthy Weight Range", value: result.healthyRange },
//         ] : undefined}
//       >
//         {result && (
//           <div className="mt-4 pt-4 border-t border-gray-800">
//             <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 relative">
//               <div
//                 className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-lg transition-all"
//                 style={{ left: `${Math.min(Math.max((parseFloat(result.bmi) - 10) / 35 * 100, 2), 98)}%` }}
//               />
//             </div>
//             <div className="flex justify-between text-[10px] text-gray-500 mt-2">
//               <span>Underweight</span>
//               <span>Normal</span>
//               <span>Overweight</span>
//               <span>Obese</span>
//             </div>
//           </div>
//         )}
//       </ResultBox>
//     </div>
//   );
// }