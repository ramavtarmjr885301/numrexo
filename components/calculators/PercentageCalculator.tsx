"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

type CalcType = "percentage" | "percentageOf" | "increase" | "decrease";

interface ExtraRow {
  label: string;
  value: string;
  valueColor?: string;
}

interface MainResult {
  label: string;
  value: string;
  color: string;
}

interface ResultState {
  mainResult: MainResult;
  extraRows: ExtraRow[];
}

export default function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalcType>("percentage");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<ResultState | null>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || (calcType !== "percentage" && isNaN(v2))) {
      alert("Please enter valid numbers");
      return;
    }

    let mainResult: MainResult = { label: "", value: "", color: "text-blue-400" };
    let extraRows: ExtraRow[] = [];

    switch (calcType) {
      case "percentage":
        // What is X% of Y?
        if (!isNaN(v2)) {
          const calculatedValue = (v1 / 100) * v2;
          mainResult = { 
            label: `${v1}% of ${v2} is`, 
            value: calculatedValue.toFixed(2), 
            color: "text-blue-400" 
          };
        }
        break;
      case "percentageOf":
        // X is what percent of Y?
        const percent = (v1 / v2) * 100;
        mainResult = { 
          label: `${v1} is what percent of ${v2}?`, 
          value: `${percent.toFixed(2)}%`, 
          color: "text-green-400" 
        };
        extraRows = [{ 
          label: "Fraction", 
          value: `${v1}/${v2} = ${(v1/v2).toFixed(4)}` 
        }];
        break;
      case "increase":
        // Percentage increase from X to Y
        const increase = ((v2 - v1) / v1) * 100;
        const increaseAmount = v2 - v1;
        mainResult = { 
          label: `Percentage Increase from ${v1} to ${v2}`, 
          value: `${increase.toFixed(2)}%`, 
          color: "text-green-400" 
        };
        extraRows = [
          { label: "Increase Amount", value: increaseAmount.toFixed(2) },
          { label: "Final Value", value: v2.toFixed(2) },
        ];
        break;
      case "decrease":
        // Percentage decrease from X to Y
        const decrease = ((v1 - v2) / v1) * 100;
        const decreaseAmount = v1 - v2;
        mainResult = { 
          label: `Percentage Decrease from ${v1} to ${v2}`, 
          value: `${decrease.toFixed(2)}%`, 
          color: "text-red-400" 
        };
        extraRows = [
          { label: "Decrease Amount", value: decreaseAmount.toFixed(2) },
          { label: "Final Value", value: v2.toFixed(2) },
        ];
        break;
    }

    setResult({ mainResult, extraRows });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Percentage Calculator</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  calcType === "percentage" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setCalcType("percentage")}
              >
                % of Number
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  calcType === "percentageOf" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setCalcType("percentageOf")}
              >
                is what %?
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  calcType === "increase" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setCalcType("increase")}
              >
                % Increase
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  calcType === "decrease" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => setCalcType("decrease")}
              >
                % Decrease
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">
              {calcType === "percentage" ? "Percentage" : calcType === "percentageOf" ? "First Number" : "Original Value"}
            </label>
            <input
              type="number"
              placeholder={calcType === "percentage" ? "15" : "50"}
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">
              {calcType === "percentage" ? "Number" : calcType === "percentageOf" ? "Second Number" : "New Value"}
            </label>
            <input
              type="number"
              placeholder={calcType === "percentage" ? "200" : "200"}
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Calculate →
          </button>
        </div>
      </div>

      <ResultBox
        title="Result"
        isEmpty={!result}
        emptyIcon="%"
        emptyText="Enter values and press Calculate"
        mainResult={result?.mainResult}
        extraRows={result?.extraRows}
      />
    </div>
  );
}