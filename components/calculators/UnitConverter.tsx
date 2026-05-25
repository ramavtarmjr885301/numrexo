"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

type ConversionType = "length" | "weight" | "volume" | "temperature";

const CONVERSIONS = {
  length: {
    units: ["Meters", "Kilometers", "Miles", "Feet", "Inches", "Centimeters", "Yards"],
    convert: (value: number, from: string, to: string) => {
      const toMeters: Record<string, number> = {
        Meters: 1,
        Kilometers: 0.001,
        Miles: 0.000621371,
        Feet: 3.28084,
        Inches: 39.3701,
        Centimeters: 100,
        Yards: 1.09361,
      };
      const fromMeters = value / toMeters[from];
      return fromMeters * toMeters[to];
    },
  },
  weight: {
    units: ["Kilograms", "Grams", "Pounds", "Ounces", "Tons", "Milligrams"],
    convert: (value: number, from: string, to: string) => {
      const toKg: Record<string, number> = {
        Kilograms: 1,
        Grams: 1000,
        Pounds: 2.20462,
        Ounces: 35.274,
        Tons: 0.001,
        Milligrams: 1000000,
      };
      const fromKg = value / toKg[from];
      return fromKg * toKg[to];
    },
  },
  volume: {
    units: ["Liters", "Milliliters", "Gallons", "Quarts", "Pints", "Cups", "Fluid Ounces"],
    convert: (value: number, from: string, to: string) => {
      const toLiters: Record<string, number> = {
        Liters: 1,
        Milliliters: 1000,
        Gallons: 0.264172,
        Quarts: 1.05669,
        Pints: 2.11338,
        Cups: 4.22675,
        "Fluid Ounces": 33.814,
      };
      const fromLiters = value / toLiters[from];
      return fromLiters * toLiters[to];
    },
  },
  temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (value: number, from: string, to: string) => {
      let celsius: number;
      if (from === "Celsius") celsius = value;
      else if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
      else celsius = value - 273.15;

      if (to === "Celsius") return celsius;
      if (to === "Fahrenheit") return (celsius * 9 / 5) + 32;
      return celsius + 273.15;
    },
  },
};

export default function UnitConverter() {
  const [conversionType, setConversionType] = useState<ConversionType>("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState<any>(null);

  const conversion = CONVERSIONS[conversionType];
  const units = conversion.units;

  // Set default units when conversion type changes
  const handleTypeChange = (type: ConversionType) => {
    setConversionType(type);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setResult(null);
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      alert("Please enter a valid number");
      return;
    }

    const convertedValue = conversion.convert(val, fromUnit, toUnit);
    setResult({
      value: val,
      convertedValue: convertedValue.toFixed(4),
      fromUnit,
      toUnit,
    });
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result) {
      convert();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="font-semibold">Unit Converter</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Conversion Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  conversionType === "length" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => handleTypeChange("length")}
              >
                📏 Length
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  conversionType === "weight" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => handleTypeChange("weight")}
              >
                ⚖️ Weight
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  conversionType === "volume" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => handleTypeChange("volume")}
              >
                🧊 Volume
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  conversionType === "temperature" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"
                }`}
                onClick={() => handleTypeChange("temperature")}
              >
                🌡️ Temperature
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Value</label>
            <input
              type="number"
              placeholder="100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <button
              onClick={swapUnits}
              className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              🔄
            </button>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={convert}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Convert →
          </button>
        </div>
      </div>

      <ResultBox
        title="Converted Result"
        isEmpty={!result}
        emptyIcon="📐"
        emptyText="Enter values and press Convert"
        mainResult={result ? {
          label: `${result.value} ${result.fromUnit} =`,
          value: `${result.convertedValue} ${result.toUnit}`,
          color: "text-cyan-400",
        } : undefined}
      />
    </div>
  );
}