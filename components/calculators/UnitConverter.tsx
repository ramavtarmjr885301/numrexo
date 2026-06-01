"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

type ConversionType = "length" | "weight" | "volume" | "temperature" | "area" | "speed";

const CONVERSIONS = {
  length: {
    name: "Length",
    icon: "📏",
    units: ["Meters", "Kilometers", "Miles", "Feet", "Inches", "Centimeters", "Yards", "Millimeters"],
    convert: (value: number, from: string, to: string) => {
      const toMeters: Record<string, number> = {
        Meters: 1, Kilometers: 0.001, Miles: 0.000621371, Feet: 3.28084,
        Inches: 39.3701, Centimeters: 100, Yards: 1.09361, Millimeters: 1000,
      };
      const fromMeters = value / toMeters[from];
      return fromMeters * toMeters[to];
    },
  },
  weight: {
    name: "Weight",
    icon: "⚖️",
    units: ["Kilograms", "Grams", "Pounds", "Ounces", "Tons", "Milligrams", "Stones"],
    convert: (value: number, from: string, to: string) => {
      const toKg: Record<string, number> = {
        Kilograms: 1, Grams: 1000, Pounds: 2.20462, Ounces: 35.274,
        Tons: 0.001, Milligrams: 1000000, Stones: 0.157473,
      };
      const fromKg = value / toKg[from];
      return fromKg * toKg[to];
    },
  },
  volume: {
    name: "Volume",
    icon: "🧊",
    units: ["Liters", "Milliliters", "Gallons", "Quarts", "Pints", "Cups", "Fluid Ounces", "Cubic Meters"],
    convert: (value: number, from: string, to: string) => {
      const toLiters: Record<string, number> = {
        Liters: 1, Milliliters: 1000, Gallons: 0.264172, Quarts: 1.05669,
        Pints: 2.11338, Cups: 4.22675, "Fluid Ounces": 33.814, "Cubic Meters": 0.001,
      };
      const fromLiters = value / toLiters[from];
      return fromLiters * toLiters[to];
    },
  },
  temperature: {
    name: "Temperature",
    icon: "🌡️",
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
  area: {
    name: "Area",
    icon: "📐",
    units: ["Square Meters", "Square Kilometers", "Square Miles", "Square Feet", "Square Yards", "Acres", "Hectares"],
    convert: (value: number, from: string, to: string) => {
      const toSqMeters: Record<string, number> = {
        "Square Meters": 1, "Square Kilometers": 0.000001, "Square Miles": 3.861e-7,
        "Square Feet": 10.7639, "Square Yards": 1.19599, "Acres": 0.000247105, "Hectares": 0.0001,
      };
      const fromSqMeters = value / toSqMeters[from];
      return fromSqMeters * toSqMeters[to];
    },
  },
  speed: {
    name: "Speed",
    icon: "🚀",
    units: ["km/h", "mph", "m/s", "knots", "ft/s"],
    convert: (value: number, from: string, to: string) => {
      const toKmph: Record<string, number> = {
        "km/h": 1, "mph": 0.621371, "m/s": 0.277778, "knots": 0.539957, "ft/s": 0.911344,
      };
      const fromKmph = value / toKmph[from];
      return fromKmph * toKmph[to];
    },
  },
};

const CONVERSION_TYPES = Object.keys(CONVERSIONS) as ConversionType[];

const FAQ_DATA = [
  { q: "How do I convert between metric and imperial units?", a: "Our unit converter handles all metric-imperial conversions automatically. For length: 1 inch = 2.54 cm, 1 foot = 0.3048 meters, 1 mile = 1.609 km. For weight: 1 pound = 0.4536 kg, 1 ounce = 28.35 grams. For volume: 1 gallon = 3.785 liters, 1 fluid ounce = 29.57 ml." },
  { q: "What is the difference between mass and weight?", a: "Mass measures the amount of matter (kilograms, pounds). Weight measures gravitational force (Newtons). On Earth, they're used interchangeably because gravity is constant. Our weight converter actually converts mass units (kg to lbs), which is correct for everyday use." },
  { q: "Why are there different temperature scales?", a: "Celsius (metric) is used worldwide for science and daily life, with water freezing at 0° and boiling at 100°. Fahrenheit is used mainly in the US, with water freezing at 32° and boiling at 212°. Kelvin is the scientific absolute scale starting at absolute zero (-273.15°C)." },
  { q: "How many square feet are in an acre?", a: "1 acre = 43,560 square feet. Common conversions: 0.5 acres = 21,780 sq ft, 0.25 acres = 10,890 sq ft. Our area converter handles acres, hectares, square meters, and square feet for land and property measurements." },
  { q: "What is a knot in speed measurement?", a: "A knot (nautical mile per hour) is used for maritime and aviation navigation. 1 knot = 1.852 km/h = 1.151 mph. Kts are preferred because they relate directly to latitude/longitude coordinates (1 nautical mile = 1 minute of latitude)." },
];

const UNIT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unit Converter – Metric to Imperial Converter",
  description: "Convert between metric and imperial units for length, weight, volume, temperature, area, and speed. Free online unit conversion tool.",
  url: "https://www.numrexo.com/conversion/unit-converter",
  applicationCategory: "UtilityApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function UnitConverter() {
  const [conversionType, setConversionType] = useState<ConversionType>("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const conversion = CONVERSIONS[conversionType];
  const units = conversion.units;

  // Set default units when conversion type changes
  const handleTypeChange = (type: ConversionType) => {
    setConversionType(type);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setResult(null);
    setValue("");
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
      convertedValue: convertedValue.toFixed(6),
      fromUnit,
      toUnit,
      type: conversion.name,
    });
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (value) {
      setTimeout(() => convert(), 10);
    }
  };

  // Common conversions for quick reference
  const commonConversions = {
    length: [{ from: "Meters", to: "Feet", factor: 3.28084 }, { from: "Kilometers", to: "Miles", factor: 0.621371 }, { from: "Centimeters", to: "Inches", factor: 0.393701 }],
    weight: [{ from: "Kilograms", to: "Pounds", factor: 2.20462 }, { from: "Grams", to: "Ounces", factor: 0.035274 }, { from: "Tons", to: "Kilograms", factor: 1000 }],
    volume: [{ from: "Liters", to: "Gallons", factor: 0.264172 }, { from: "Milliliters", to: "Fluid Ounces", factor: 0.033814 }, { from: "Cups", to: "Milliliters", factor: 236.588 }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: UNIT_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
          <li className="text-gray-700">/</li>
          <li><a href="https://www.numrexo.com/conversion" className="hover:text-gray-300">Converters</a></li>
          <li className="text-gray-700">/</li>
          <li><span className="text-gray-300">Unit Converter</span></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Unit Converter</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Conversion Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CONVERSION_TYPES.map((type) => (
                  <button
                    key={type}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${conversionType === type ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                      }`}
                    onClick={() => handleTypeChange(type)}
                  >
                    <span>{CONVERSIONS[type].icon}</span>
                    <span>{CONVERSIONS[type].name}</span>
                  </button>
                ))}
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
                className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-lg"
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
          extraRows={result ? [
            { label: "Conversion Type", value: result.type },
          ] : undefined}
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Unit Converter</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our <strong className="text-gray-300">free unit converter</strong> handles all common unit conversions: length (meters to feet, km to miles), weight (kg to lbs, grams to ounces), volume (liters to gallons), temperature (Celsius to Fahrenheit), area (square feet to acres), and speed (km/h to mph).
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Perfect for students, engineers, travelers, cooks, and anyone needing quick, accurate unit conversions. Supports both metric and imperial systems with high precision (6 decimal places).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Reference Conversions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(commonConversions).map(([type, conversions]) => (
            <div key={type} className="bg-[#111827] border border-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-400 mb-3 capitalize">{type}</h3>
              {conversions.map((conv, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400">{conv.from} → {conv.to}</span>
                  <span className="text-gray-300 font-mono">× {conv.factor}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

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
                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
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