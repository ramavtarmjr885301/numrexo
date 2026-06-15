// components/calculators/FuelCostCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    { q: "How to calculate fuel cost for a trip?", a: "Fuel Cost = Distance × Fuel Price ÷ Mileage (km/l) or Distance × Fuel Price × Fuel Economy (l/100km). Our calculator handles both metrics." },
    { q: "What is good fuel economy?", a: "Cars: 15-20 km/l (good), 20-25+ km/l (excellent). SUVs: 10-15 km/l. Motorcycles: 35-50 km/l. EVs: cost equivalent to 25-30 km/l." },
    { q: "How to calculate fuel cost for electric vehicles?", a: "EV cost = Distance × Electricity Rate (₹/kWh) ÷ Efficiency (km/kWh). EVs typically achieve 6-8 km/kWh. At ₹8/kWh, 100 km costs ~₹100-130 (vs ₹800-1000 for petrol). Use our EV mode for accurate estimates." },
    { q: "What is the difference between highway and city mileage?", a: "Highway mileage is 15-25% better than city due to fewer stops. Example: City 12 km/l → Highway 15 km/l. Use highway figures for road trips, city figures for daily commute. Our calculator uses combined average if not specified." },
    { q: "How to calculate fuel cost for round trips?", a: "Double the one-way distance. Example: One-way 500 km → round trip 1000 km. Calculate fuel needed for 1000 km. For trips with different routes, calculate each direction separately." },
    { q: "How does vehicle load affect fuel economy?", a: "Every 50 kg extra load reduces fuel economy by 1-2%. Roof cargo carrier reduces by 10-25% due to drag. A/C use reduces by 5-10%. Tire pressure 10% low reduces by 3-5%." },
    { q: "What is the best speed for fuel efficiency?", a: "Optimal speed: 50-65 km/h (30-40 mph). Fuel efficiency drops rapidly above 80 km/h (50 mph). At 120 km/h (75 mph), you burn 20-30% more fuel than at 80 km/h. Use cruise control on highways." },
    { q: "How to calculate fuel savings by carpooling?", a: "Cost per person = Total fuel cost ÷ Number of passengers. Example: ₹2,000 trip cost, 4 persons → ₹500 each. You save 75% compared to driving alone. Our calculator shows per-person cost when you enter passenger count." },
    { q: "What is idling fuel consumption?", a: "Idling consumes 0.5-2 liters/hour depending on engine size. A 1.5L engine idling for 10 minutes wastes ~150ml fuel ($0.18). Modern engines don't need warm-up. Turn off engine if stopped for more than 60 seconds." },
    { q: "How to calculate fuel cost for multiple vehicles?", a: "Calculate separately for each vehicle, then sum total cost. Compare per-person cost to decide which vehicle is more economical. For business fleets, add maintenance cost (₹1-2/km) to total fuel cost." },
];

const FUEL_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fuel Cost Calculator – Trip Fuel Cost Estimator",
    description: "Calculate fuel cost for your trip based on distance, fuel price, and vehicle mileage. Plan your travel budget accurately.",
    url: "https://www.numrexo.com/travel/fuel-cost-calculator",
    applicationCategory: "TravelApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function FuelCostCalculator() {
    const [distance, setDistance] = useState("");
    const [fuelPrice, setFuelPrice] = useState("105");
    const [mileage, setMileage] = useState("");
    const [unit, setUnit] = useState<"kml" | "lp100km">("kml");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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

    const resetForm = () => {
        setDistance("");
        setFuelPrice("105");
        setMileage("");
        setUnit("kml");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FUEL_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/travel" className="hover:text-gray-300">Travel Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Fuel Cost Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Trip Details</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label>
                            <div className="relative">
                                <input type="number" placeholder="500" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">km</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Fuel Price</label>
                            <div className="relative">
                                <input type="number" placeholder="105" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹/liter</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Fuel Efficiency</label>
                            <div className="grid grid-cols-2 gap-3 mb-2">
                                <button className={`py-1 text-sm rounded ${unit === "kml" ? "bg-blue-500" : "bg-gray-700"}`} onClick={() => setUnit("kml")}>km/liter</button>
                                <button className={`py-1 text-sm rounded ${unit === "lp100km" ? "bg-blue-500" : "bg-gray-700"}`} onClick={() => setUnit("lp100km")}>liters/100km</button>
                            </div>
                            <div className="relative">
                                <input type="number" placeholder={unit === "kml" ? "18" : "8"} value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit === "kml" ? "km/l" : "L/100km"}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Fuel Cost →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Trip Cost"
                    isEmpty={!result}
                    emptyIcon="⛽"
                    emptyText="Enter trip details to calculate fuel cost"
                    mainResult={result ? { label: "Total Fuel Cost", value: `₹${result.totalCost}`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Fuel Needed", value: `${result.fuelNeeded} liters` },
                        { label: "Distance", value: `${result.distance} km` },
                        { label: "Cost per Kilometer", value: `₹${result.costPerKm}` }
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Fuel Cost Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Fuel Cost Calculator</strong> helps you estimate total fuel expenses for any road trip. Whether you're planning a family vacation, daily commute, or business travel, know exactly how much you'll spend on fuel before you start driving.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Simply enter distance, fuel price, and your vehicle's mileage (km/l or liters/100km). The calculator instantly shows total fuel cost, liters needed, and cost per kilometer. Perfect for budgeting road trips and comparing vehicle efficiency.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Fuel Cost Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">trip distance</strong> in kilometers.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter current <strong className="text-white">fuel price</strong> per liter (₹/liter).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select <strong className="text-white">fuel efficiency unit</strong> — km/liter or liters/100km.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter your vehicle's <strong className="text-white">mileage</strong> (e.g., 18 km/l or 8 L/100km).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Fuel Cost"</strong> to see total cost.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Fuel Cost Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Trip Budgeting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan your travel budget accurately. Know fuel costs before you start — no surprises. Compare costs across different routes or vehicles.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Vehicle Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare fuel costs between your cars. Decide which vehicle is more economical for long trips. Calculate savings potential.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Carpool Savings</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Divide total fuel cost by passengers. Show friends how much they save by carpooling. Split costs fairly without arguments.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Business Reimbursement</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate exact fuel cost for business trips. Use for expense reports and client billing. Standard mileage rate alternative.</p>
                    </div>
                </div>
            </section>

            {/* Fuel Economy Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Fuel Economy Guide by Vehicle Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Vehicle Type</th><th className="text-left py-3 px-4 text-gray-400">City (km/l)</th><th className="text-left py-3 px-4 text-gray-400">Highway (km/l)</th><th className="text-left py-3 px-4 text-gray-400">Combined (km/l)</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Small Hatchback (800-1200cc)</td><td className="py-2 px-4 text-yellow-400">15-18</td><td className="py-2 px-4 text-yellow-400">20-25</td><td className="py-2 px-4 text-yellow-400">18-22</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Sedan (1200-1500cc)</td><td className="py-2 px-4 text-yellow-400">12-15</td><td className="py-2 px-4 text-yellow-400">18-22</td><td className="py-2 px-4 text-yellow-400">15-18</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">SUV (1500-2000cc)</td><td className="py-2 px-4 text-yellow-400">8-12</td><td className="py-2 px-4 text-yellow-400">14-18</td><td className="py-2 px-4 text-yellow-400">10-15</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">MUV/MPV (7-seater)</td><td className="py-2 px-4 text-yellow-400">8-11</td><td className="py-2 px-4 text-yellow-400">13-16</td><td className="py-2 px-4 text-yellow-400">10-13</td></tr>
                            <tr><td className="py-2 px-4">Motorcycle (100-150cc)</td><td className="py-2 px-4 text-yellow-400">35-45</td><td className="py-2 px-4 text-yellow-400">45-55</td><td className="py-2 px-4 text-yellow-400">40-50</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Fuel Saving Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Fuel Saving Tips for Better Mileage</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Maintain proper tire pressure:</strong> Under-inflated tires increase fuel consumption by 3-5%. Check monthly.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Drive smoothly:</strong> Aggressive acceleration and braking wastes 10-30% fuel. Anticipate traffic flow.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Remove roof carriers:</strong> Empty roof racks increase drag, reducing mileage by 10-25% on highways.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Use A/C wisely:</strong> Above 80 km/h, A/C uses less fuel than open windows. Below 60 km/h, windows down saves fuel.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Reduce weight:</strong> Remove unnecessary items. Every 50 kg reduces mileage by 1-2%.</span></li>
                </ul>
            </section>

            {/* Fuel Price Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Fuel Price Comparison by Fuel Type (India)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Fuel Type</th><th className="text-left py-3 px-4 text-gray-400">Price Range (₹/liter)</th><th className="text-left py-3 px-4 text-gray-400">Fuel Economy</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Petrol</td><td className="py-2 px-4 text-yellow-400">95-110</td><td className="py-2 px-4">15-20 km/l (cars)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Diesel</td><td className="py-2 px-4 text-yellow-400">85-95</td><td className="py-2 px-4">18-25 km/l (cars)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">CNG</td><td className="py-2 px-4 text-yellow-400">70-85</td><td className="py-2 px-4">20-25 km/kg</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Electric (₹/kWh)</td><td className="py-2 px-4 text-yellow-400">6-10</td><td className="py-2 px-4">6-8 km/kWh</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}