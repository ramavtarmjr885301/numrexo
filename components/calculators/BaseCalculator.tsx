// components/calculators/BaseCalculator.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";
import ResultBox from "@/components/common/ResultBox";

interface InputField {
  id: string;
  label: string;
  type: "number" | "select" | "radio";
  placeholder?: string;
  suffix?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

interface BaseCalculatorProps {
  title: string;
  inputs: InputField[];
  calculate: (values: Record<string, any>) => {
    mainResult: { label: string; value: string; unit?: string; color?: string };
    extraRows: Array<{ label: string; value: string; valueColor?: string }>;
    chartData?: any;
  };
  renderCustomResult?: (result: any) => ReactNode;
}

export default function BaseCalculator({ title, inputs, calculate, renderCustomResult }: BaseCalculatorProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (id: string, value: any) => {
    setValues({ ...values, [id]: value });
  };

  const handleCalculate = () => {
    const calculated = calculate(values);
    setResult(calculated);
  };

  // Results update as you type — the answer is no longer hidden behind a button press.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleCalculate(); }, [values]);

  const resetForm = () => {
    setValues({});
    setResult(null);
  };

  const isFormValid = () => {
    return inputs.every(input => {
      if (input.required && !values[input.id]) return false;
      return true;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Input Form */}
      <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-hairline">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="p-6 space-y-4">
          {inputs.map((input) => (
            <div key={input.id}>
              <label className="block text-xs font-semibold text-ink-faint mb-2">
                {input.label}
              </label>
              {input.type === "number" && (
                <div className="relative">
                  <input
                    type="number"
                    placeholder={input.placeholder}
                    value={values[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    min={input.min}
                    max={input.max}
                    step={input.step || "any"}
                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {input.suffix && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">
                      {input.suffix}
                    </span>
                  )}
                </div>
              )}
              {input.type === "select" && input.options && (
                <select
                  value={values[input.id] || input.options[0]?.value}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none transition-colors cursor-pointer"
                >
                  {input.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
              {input.type === "radio" && input.options && (
                <div className="grid grid-cols-2 gap-3">
                  {input.options.map((opt) => (
                    <button
                      key={opt.value}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${values[input.id] === opt.value
                        ? "bg-blue-600 text-white"
                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                        }`}
                      onClick={() => handleInputChange(input.id, opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={handleCalculate}
              disabled={!isFormValid()}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate →
            </button>
            <button
              onClick={resetForm}
              className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      <ResultBox
        title="Your Result"
        isEmpty={!result}
        emptyIcon="📊"
        emptyText="Enter values and press Calculate"
        mainResult={result?.mainResult}
        extraRows={result?.extraRows}
      >
        {result && renderCustomResult && renderCustomResult(result)}
      </ResultBox>
    </div>
  );
}