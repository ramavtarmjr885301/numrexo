// components/calculators/FuelCostCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    { q: "How to calculate fuel cost for a trip?", a: "Fuel Cost = Distance × Fuel Price ÷ Mileage (km/l) or Distance × Fuel Price × Fuel Economy (l/100km). Our calculator handles both metrics." },
    { q: "What is good fuel economy?", a: "Cars: 15-20 km/l (good), 20-25+ km/l (excellent). SUVs: 10-15 km/l. Motorcycles: 35-50 km/l. EVs: cost equivalent to 25-30 km/l." },
];

export default function FuelCostCalculator() {
    const [distance, setDistance] = useState("");
    const [fuelPrice, setFuelPrice] = useState("105");
    const [mileage, setMileage] = useState("");
    const [unit, setUnit] = useState<"kml" | "lp100km">("kml");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const d = parseFloat(distance);
        const p = parseFloat(fuelPrice);
        const m = parseFloat(mileage);

        if (!d || !p || !m || d <= 0 || p <= 0 || m <= 0) { alert("Please enter valid values"); return; }

        let fuelNeeded, totalCost;
        if (unit === "kml") { fuelNeeded = d / m; totalCost = fuelNeeded * p; }
        else { fuelNeeded = (d * m) / 100; totalCost = fuelNeeded * p; }

        setResult({ totalCost: Math.round(totalCost).toLocaleString("en-IN"), fuelNeeded: fuelNeeded.toFixed(1), distance: d, costPerKm: (totalCost / d).toFixed(2) });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Trip Details</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label><div className="relative"><input type="number" placeholder="500" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">km</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Fuel Price</label><div className="relative"><input type="number" placeholder="105" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹/liter</span></div></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Fuel Efficiency</label><div className="grid grid-cols-2 gap-3 mb-2"><button className={`py-1 text-sm rounded ${unit === "kml" ? "bg-blue-500" : "bg-gray-700"}`} onClick={() => setUnit("kml")}>km/liter</button><button className={`py-1 text-sm rounded ${unit === "lp100km" ? "bg-blue-500" : "bg-gray-700"}`} onClick={() => setUnit("lp100km")}>liters/100km</button></div><div className="relative"><input type="number" placeholder={unit === "kml" ? "18" : "8"} value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit === "kml" ? "km/l" : "L/100km"}</span></div></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold">Calculate Fuel Cost →</button></div></div><ResultBox title="Trip Cost" isEmpty={!result} emptyIcon="⛽" emptyText="Enter trip details to calculate fuel cost" mainResult={result ? { label: "Total Fuel Cost", value: `₹${result.totalCost}`, color: "text-blue-400" } : undefined} extraRows={result ? [{ label: "Fuel Needed", value: `${result.fuelNeeded} liters` }, { label: "Distance", value: `${result.distance} km` }, { label: "Cost per Kilometer", value: `₹${result.costPerKm}` }] : undefined} /></div>);
}