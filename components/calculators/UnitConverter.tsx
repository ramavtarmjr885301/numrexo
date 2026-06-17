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
        Meters: 1,
        Kilometers: 1000,
        Miles: 1609.344,
        Feet: 0.3048,
        Inches: 0.0254,
        Centimeters: 0.01,
        Yards: 0.9144,
        Millimeters: 0.001,
      };
      const inMeters = value * toMeters[from];
      return inMeters / toMeters[to];
    },
  },
  weight: {
    name: "Weight",
    icon: "⚖️",
    units: ["Kilograms", "Grams", "Pounds", "Ounces", "Tons", "Milligrams", "Stones"],
    convert: (value: number, from: string, to: string) => {
      const toKg: Record<string, number> = {
        Kilograms: 1,
        Grams: 0.001,
        Pounds: 0.453592,
        Ounces: 0.0283495,
        Tons: 1000,
        Milligrams: 0.000001,
        Stones: 6.35029,
      };
      const inKg = value * toKg[from];
      return inKg / toKg[to];
    },
  },
  volume: {
    name: "Volume",
    icon: "🧊",
    units: ["Liters", "Milliliters", "Gallons", "Quarts", "Pints", "Cups", "Fluid Ounces", "Cubic Meters"],
    convert: (value: number, from: string, to: string) => {
      const toLiters: Record<string, number> = {
        Liters: 1,
        Milliliters: 0.001,
        Gallons: 3.78541,
        Quarts: 0.946353,
        Pints: 0.473176,
        Cups: 0.236588,
        "Fluid Ounces": 0.0295735,
        "Cubic Meters": 1000,
      };
      const inLiters = value * toLiters[from];
      return inLiters / toLiters[to];
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
        "Square Meters": 1,
        "Square Kilometers": 1000000,
        "Square Miles": 2589988.11,
        "Square Feet": 0.092903,
        "Square Yards": 0.836127,
        "Acres": 4046.86,
        "Hectares": 10000,
      };
      const inSqMeters = value * toSqMeters[from];
      return inSqMeters / toSqMeters[to];
    },
  },
  speed: {
    name: "Speed",
    icon: "🚀",
    units: ["km/h", "mph", "m/s", "knots", "ft/s"],
    convert: (value: number, from: string, to: string) => {
      const toKmph: Record<string, number> = {
        "km/h": 1,
        "mph": 1.60934,
        "m/s": 3.6,
        "knots": 1.852,
        "ft/s": 1.09728,
      };
      const inKmph = value * toKmph[from];
      return inKmph / toKmph[to];
    },
  },
};

const CONVERSION_TYPES = Object.keys(CONVERSIONS) as ConversionType[];

// ─── Expanded FAQ Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
  {
    q: "How do I convert between metric and imperial units?",
    a: "Our unit converter handles all metric-imperial conversions automatically. For length: 1 inch = 2.54 cm, 1 foot = 0.3048 meters, 1 mile = 1.609 km. For weight: 1 pound = 0.4536 kg, 1 ounce = 28.35 grams. For volume: 1 gallon = 3.785 liters, 1 fluid ounce = 29.57 ml. Simply select your units, enter the value, and get instant results with 6 decimal precision.",
  },
  {
    q: "What is the difference between mass and weight?",
    a: "Mass measures the amount of matter (kilograms, pounds). Weight measures gravitational force (Newtons). On Earth, they're used interchangeably because gravity is constant. Our weight converter actually converts mass units (kg to lbs), which is correct for everyday use. In physics, mass is constant everywhere, while weight changes with gravity (you weigh less on the Moon).",
  },
  {
    q: "Why are there different temperature scales?",
    a: "Celsius (metric) is used worldwide for science and daily life, with water freezing at 0° and boiling at 100°. Fahrenheit is used mainly in the US, with water freezing at 32° and boiling at 212°. Kelvin is the scientific absolute scale starting at absolute zero (-273.15°C). Kelvin is used in physics because it has no negative values, making calculations easier.",
  },
  {
    q: "How many square feet are in an acre?",
    a: "1 acre = 43,560 square feet. Common conversions: 0.5 acres = 21,780 sq ft, 0.25 acres = 10,890 sq ft. In metric: 1 acre = 4,046.86 square meters = 0.4047 hectares. Our area converter handles acres, hectares, square meters, and square feet for land and property measurements.",
  },
  {
    q: "What is a knot in speed measurement?",
    a: "A knot (nautical mile per hour) is used for maritime and aviation navigation. 1 knot = 1.852 km/h = 1.151 mph. Knots are preferred because they relate directly to latitude/longitude coordinates (1 nautical mile = 1 minute of latitude). Commercial aircraft cruise at 450-500 knots, while a fast ferry might travel at 30-40 knots.",
  },
  {
    q: "What is the difference between volume and capacity?",
    a: "Volume measures the three-dimensional space an object occupies (cubic meters, cubic feet). Capacity measures how much a container can hold (liters, gallons). For practical purposes, they're often used interchangeably. Example: A 2-liter bottle has a capacity of 2 liters and a volume of 2 liters. Our converter handles both volume and capacity units.",
  },
  {
    q: "How to convert between metric and US customary units?",
    a: "US customary units differ from imperial units: US gallon = 3.785 L (vs imperial gallon = 4.546 L), US fluid ounce = 29.57 mL (vs imperial = 28.41 mL). Our converter uses US customary units (most common). For length: 1 mile = 1,609 meters, 1 yard = 0.914 meters. Always check which system your measurement uses.",
  },
  {
    q: "What is the difference between area and square units?",
    a: "Area is the measure of a two-dimensional surface. Square units (m², ft²) are the units used to measure area. Example: A room that's 10m x 10m has an area of 100 square meters. Our area converter handles: Square meters (m²), Square feet (ft²), Square kilometers (km²), Square miles (mi²), Acres, Hectares.",
  },
  {
    q: "How to convert cooking measurements?",
    a: "Common cooking conversions: 1 cup = 236.588 ml, 1 tbsp = 14.787 ml, 1 tsp = 4.929 ml, 1 oz = 28.35 g (for weight). Our volume converter handles these conversions. For baking, weight measurements are more accurate than volume (e.g., 1 cup of flour can vary by 20-30g depending on how it's scooped). Use our weight converter for precise baking.",
  },
  {
    q: "What is the SI system of units?",
    a: "The SI (International System of Units) is the modern metric system, the most widely used measurement system. Base units: Meter (length), Kilogram (mass), Second (time), Ampere (electric current), Kelvin (temperature), Mole (amount of substance), Candela (luminous intensity). All other units are derived from these 7 base units. Our converter handles most common SI and imperial conversions.",
  },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const WEBAPP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unit Converter – Metric to Imperial Converter",
  description: "Convert between metric and imperial units for length, weight, volume, temperature, area, and speed. Free online unit conversion tool.",
  url: "https://www.numrexo.com/conversion/unit-converter",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["Length conversion", "Weight conversion", "Volume conversion", "Temperature conversion", "Area conversion", "Speed conversion"],
  author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
    { "@type": "ListItem", position: 3, name: "Unit Converter", item: "https://www.numrexo.com/conversion/unit-converter" },
  ],
});

// ─── Component ────────────────────────────────────────────────────────────────

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
    setToUnit(units.length > 1 ? units[1] : units[0]);
    setResult(null);
    setValue("");
  };

  const resetForm = () => {
    setConversionType("length");
    setValue("");
    setFromUnit(CONVERSIONS.length.units[0]);
    setToUnit(CONVERSIONS.length.units[1]);
    setResult(null);
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      alert("Please enter a valid number");
      return;
    }

    try {
      const convertedValue = conversion.convert(val, fromUnit, toUnit);
      setResult({
        value: val,
        convertedValue: convertedValue.toFixed(6),
        fromUnit,
        toUnit,
        type: conversion.name,
      });
    } catch (error) {
      alert("Error performing conversion. Please check your inputs.");
    }
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
    length: [
      { from: "Meters", to: "Feet", factor: 3.28084 },
      { from: "Kilometers", to: "Miles", factor: 0.621371 },
      { from: "Centimeters", to: "Inches", factor: 0.393701 }
    ],
    weight: [
      { from: "Kilograms", to: "Pounds", factor: 2.20462 },
      { from: "Grams", to: "Ounces", factor: 0.035274 },
      { from: "Tons", to: "Kilograms", factor: 1000 }
    ],
    volume: [
      { from: "Liters", to: "Gallons", factor: 0.264172 },
      { from: "Milliliters", to: "Fluid Ounces", factor: 0.033814 },
      { from: "Cups", to: "Milliliters", factor: 236.588 }
    ],
    temperature: [
      { from: "Celsius", to: "Fahrenheit", factor: "°F = (°C × 9/5) + 32" },
      { from: "Fahrenheit", to: "Celsius", factor: "°C = (°F - 32) × 5/9" },
      { from: "Celsius", to: "Kelvin", factor: "K = °C + 273.15" }
    ],
    area: [
      { from: "Square Meters", to: "Square Feet", factor: 10.7639 },
      { from: "Acres", to: "Square Feet", factor: 43560 },
      { from: "Hectares", to: "Acres", factor: 2.47105 }
    ],
    speed: [
      { from: "km/h", to: "mph", factor: 0.621371 },
      { from: "m/s", to: "km/h", factor: 3.6 },
      { from: "knots", to: "km/h", factor: 1.852 }
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
            <meta itemProp="position" content="1" />
          </li>
          <li className="text-gray-700">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a>
            <meta itemProp="position" content="2" />
          </li>
          <li className="text-gray-700">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <span itemProp="name" className="text-gray-300">Unit Converter</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input Form */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="font-semibold">Unit Converter</h3>
            <p className="text-xs text-gray-500 mt-1">Convert between 6 different unit types</p>
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
                step="any"
                placeholder="100"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                aria-label="Swap units"
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

            <div className="flex gap-3">
              <button
                onClick={convert}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg transition-all"
              >
                Convert →
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Result Box */}
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
            { label: "From", value: result.fromUnit },
            { label: "To", value: result.toUnit },
          ] : undefined}
        />
      </div>

      {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">About Unit Converter</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Our <strong className="text-gray-300">free unit converter</strong> handles all common unit conversions: length (meters to feet, km to miles), weight (kg to lbs, grams to ounces), volume (liters to gallons), temperature (Celsius to Fahrenheit), area (square feet to acres), and speed (km/h to mph).
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Perfect for students, engineers, travelers, cooks, and anyone needing quick, accurate unit conversions. Supports both metric and imperial systems with high precision (6 decimal places). The converter uses the most common US customary units for volume and other measurements.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          With 6 conversion types and support for over 30 different units, this is the most comprehensive unit conversion tool you'll find. All conversions are processed client-side for instant results without internet delays.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">How to Use This Unit Converter</h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">conversion type</strong> (Length, Weight, Volume, Temperature, Area, or Speed).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">value</strong> you want to convert.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">"From"</strong> unit (your current unit).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Select the <strong className="text-white">"To"</strong> unit (your target unit).</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Convert"</strong> to see the result with 6 decimal precision.</p>
          <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Why Use a Unit Converter?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2">✓ Instant Results</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Get accurate conversions in real-time. No need for manual calculations or lookup tables. Simply enter values and get results instantly.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ 6 Conversion Types</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Length, weight, volume, temperature, area, and speed - all in one tool. Switch between types with a single click.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ High Precision</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Results are displayed with 6 decimal places for maximum accuracy. Perfect for engineering, science, and precise cooking measurements.</p>
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Metric & Imperial</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Convert between metric (meters, kilograms, liters) and imperial (feet, pounds, gallons) systems. Also handles US customary units.</p>
          </div>
        </div>
      </section>

      {/* Quick Reference Conversions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Reference Conversions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(commonConversions).map(([type, conversions]) => (
            <div key={type} className="bg-[#111827] border border-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-400 mb-3 capitalize">{type}</h3>
              {conversions.map((conv, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400">{conv.from} → {conv.to}</span>
                  <span className="text-gray-300 font-mono text-xs">{conv.factor}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Conversion Factor Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Common Conversion Factors</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                <th className="text-left py-3 px-4 text-gray-400">Category</th>
                <th className="text-left py-3 px-4 text-gray-400">From</th>
                <th className="text-left py-3 px-4 text-gray-400">To</th>
                <th className="text-left py-3 px-4 text-gray-400">Multiply By</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Length</td>
                <td className="py-2 px-4 text-gray-400">1 inch</td>
                <td className="py-2 px-4 text-gray-400">cm</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">2.54</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Length</td>
                <td className="py-2 px-4 text-gray-400">1 foot</td>
                <td className="py-2 px-4 text-gray-400">m</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">0.3048</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Length</td>
                <td className="py-2 px-4 text-gray-400">1 mile</td>
                <td className="py-2 px-4 text-gray-400">km</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">1.609</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Weight</td>
                <td className="py-2 px-4 text-gray-400">1 lb</td>
                <td className="py-2 px-4 text-gray-400">kg</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">0.4536</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Weight</td>
                <td className="py-2 px-4 text-gray-400">1 oz</td>
                <td className="py-2 px-4 text-gray-400">g</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">28.35</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Volume</td>
                <td className="py-2 px-4 text-gray-400">1 gallon</td>
                <td className="py-2 px-4 text-gray-400">L</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">3.785</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Volume</td>
                <td className="py-2 px-4 text-gray-400">1 cup</td>
                <td className="py-2 px-4 text-gray-400">ml</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">236.588</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-2 px-4 text-gray-300">Area</td>
                <td className="py-2 px-4 text-gray-400">1 acre</td>
                <td className="py-2 px-4 text-gray-400">sq ft</td>
                <td className="py-2 px-4 text-yellow-400 font-mono">43,560</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
            * These are standard conversion factors. Our calculator uses these exact values for precise conversions.
          </p>
        </div>
      </section>

      {/* Metric vs Imperial Guide */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Metric vs Imperial Guide</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2">📏 Metric System</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <span className="text-gray-300">Length:</span> Millimeters, Centimeters, Meters, Kilometers</li>
                <li>• <span className="text-gray-300">Weight:</span> Milligrams, Grams, Kilograms, Tonnes</li>
                <li>• <span className="text-gray-300">Volume:</span> Milliliters, Liters, Cubic Meters</li>
                <li>• <span className="text-gray-300">Temperature:</span> Celsius (°C), Kelvin (K)</li>
                <li>• Used in most countries worldwide</li>
                <li>• Base 10 system (easy to convert)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-400 mb-2">🇺🇸 Imperial/US Customary</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <span className="text-gray-300">Length:</span> Inches, Feet, Yards, Miles</li>
                <li>• <span className="text-gray-300">Weight:</span> Ounces, Pounds, Tons</li>
                <li>• <span className="text-gray-300">Volume:</span> Fluid Ounces, Cups, Pints, Quarts, Gallons</li>
                <li>• <span className="text-gray-300">Temperature:</span> Fahrenheit (°F)</li>
                <li>• Used mainly in USA, Liberia, Myanmar</li>
                <li>• Based on historical measurements</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3">
            Our converter handles both systems seamlessly. Select any unit from either system and convert instantly.
          </p>
        </div>
      </section>

      {/* Unit Converter Tips */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Unit Converter Tips</h2>
        <ul className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-cyan-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Remember common conversions:</strong> 1 inch = 2.54 cm, 1 kg = 2.204 lbs, 1 gallon = 3.785 L. These are useful for quick mental estimates.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-cyan-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Use the swap button:</strong> Click 🔄 to quickly reverse the conversion. Great for checking reciprocal conversions (e.g., mph to km/h and back).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-cyan-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Temperature tip:</strong> -40°C = -40°F (the crossover point). This is a good reference for extreme cold conversions.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-cyan-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Cooking conversions:</strong> 1 cup = 16 tablespoons = 48 teaspoons. Our volume converter handles all cooking measurements.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-400">
            <span className="text-cyan-400 mt-0.5">💡</span>
            <span><strong className="text-gray-300">Precision matters:</strong> Use 6 decimal places for engineering and scientific calculations. For everyday use, 2-3 decimal places are usually sufficient.</span>
          </li>
        </ul>
      </section>

      {/* FAQ Section */}
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