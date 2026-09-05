"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is the formula for calculating speed?",
        a: "Speed = Distance ÷ Time. For example, if you travel 100 km in 2 hours, your speed is 50 km/h. This is the fundamental formula used in physics and everyday travel planning.",
    },
    {
        q: "How to calculate distance from speed and time?",
        a: "Distance = Speed × Time. If you drive at 60 km/h for 3 hours, you cover 180 km. Make sure units match (km/h with hours, m/s with seconds).",
    },
    {
        q: "How to convert between km/h and m/s?",
        a: "To convert km/h to m/s, multiply by 5/18 (or 0.27778). To convert m/s to km/h, multiply by 18/5 (or 3.6). Example: 72 km/h = 72 × 5/18 = 20 m/s.",
    },
    {
        q: "What is average speed vs instantaneous speed?",
        a: "Average speed is total distance divided by total time. Instantaneous speed is speed at a specific moment. Average speed is what you calculate here - useful for trip planning.",
    },
    {
        q: "What is the difference between average speed and instantaneous speed?",
        a: "Average speed = total distance ÷ total time (what you calculate here). Instantaneous speed is your speed at one exact moment (what your speedometer shows). Average speed is more useful for trip planning.",
    },
    {
        q: "How to convert between km/h and m/s easily?",
        a: "km/h to m/s: Divide by 3.6 (multiply by 5/18). m/s to km/h: Multiply by 3.6 (multiply by 18/5). Example: 100 km/h ÷ 3.6 = 27.78 m/s. 30 m/s × 3.6 = 108 km/h.",
    },
    {
        q: "What is the speed of sound and light in km/h?",
        a: "Speed of sound = 1,235 km/h (343 m/s). Speed of light = 1,079,000,000 km/h (300,000 km/s). Light travels around Earth 7.5 times per second.",
    },
    {
        q: "How to calculate travel time for a road trip?",
        a: "Divide total distance by average speed. Add 15-20% extra for traffic, breaks, refueling. Example: 400 km at 80 km/h = 5 hours driving time + 1 hour breaks = 6 hours total.",
    },
    {
        q: "What is the formula for time when distance and speed are given?",
        a: "Time = Distance ÷ Speed. Example: 240 km ÷ 60 km/h = 4 hours. For minutes: (Distance ÷ Speed) × 60. For seconds: (Distance ÷ Speed) × 3600.",
    },
    {
        q: "How to calculate average speed when multiple speeds are involved?",
        a: "Use harmonic mean: Average Speed = Total Distance ÷ Total Time. Example: 100 km at 50 km/h (2 hours) + 100 km at 100 km/h (1 hour) = 200 km ÷ 3 hours = 66.67 km/h.",
    },
];

export default function DistanceSpeedTimeCalculator() {
    const [calculationType, setCalculationType] = useState<"speed" | "distance" | "time">("speed");

    // For Speed calculation (calculate speed from distance & time)
    const [distance, setDistance] = useState("");
    const [distanceUnit, setDistanceUnit] = useState<"km" | "miles" | "meters">("km");
    const [timeHours, setTimeHours] = useState("");
    const [timeMinutes, setTimeMinutes] = useState("");
    const [timeSeconds, setTimeSeconds] = useState("");

    // For Distance calculation (calculate distance from speed & time)
    const [speed, setSpeed] = useState("");
    const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph" | "ms">("kmh");
    const [distTimeHours, setDistTimeHours] = useState("");
    const [distTimeMinutes, setDistTimeMinutes] = useState("");
    const [distTimeSeconds, setDistTimeSeconds] = useState("");
    const [distOutputUnit, setDistOutputUnit] = useState<"km" | "miles" | "meters">("km");

    // For Time calculation (calculate time from distance & speed)
    const [timeDistance, setTimeDistance] = useState("");
    const [timeDistanceUnit, setTimeDistanceUnit] = useState<"km" | "miles" | "meters">("km");
    const [timeSpeed, setTimeSpeed] = useState("");
    const [timeSpeedUnit, setTimeSpeedUnit] = useState<"kmh" | "mph" | "ms">("kmh");

    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Unit conversion helpers
    const distanceToKm = (value: number, unit: string): number => {
        if (unit === "km") return value;
        if (unit === "miles") return value * 1.60934;
        if (unit === "meters") return value / 1000;
        return value;
    };

    const kmToDistance = (value: number, unit: string): number => {
        if (unit === "km") return value;
        if (unit === "miles") return value / 1.60934;
        if (unit === "meters") return value * 1000;
        return value;
    };

    const speedToKmh = (value: number, unit: string): number => {
        if (unit === "kmh") return value;
        if (unit === "mph") return value * 1.60934;
        if (unit === "ms") return value * 3.6;
        return value;
    };

    const kmhToSpeed = (value: number, unit: string): number => {
        if (unit === "kmh") return value;
        if (unit === "mph") return value / 1.60934;
        if (unit === "ms") return value / 3.6;
        return value;
    };

    const formatTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.round(totalSeconds % 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    };

    const getTotalSeconds = (hours: number, minutes: number, seconds: number): number => {
        return (hours * 3600) + (minutes * 60) + seconds;
    };

    const calculateSpeed = () => {
        const dist = parseFloat(distance) || 0;
        const hours = parseFloat(timeHours) || 0;
        const minutes = parseFloat(timeMinutes) || 0;
        const seconds = parseFloat(timeSeconds) || 0;

        if (dist <= 0) {
            alert("Please enter a valid distance");
            return;
        }

        const totalSeconds = getTotalSeconds(hours, minutes, seconds);
        if (totalSeconds <= 0) {
            alert("Please enter valid time");
            return;
        }

        const distInKm = distanceToKm(dist, distanceUnit);
        const totalHours = totalSeconds / 3600;
        const speedKmh = distInKm / totalHours;
        const speedMph = speedKmh / 1.60934;
        const speedMs = speedKmh / 3.6;

        setResult({
            type: "speed",
            speedKmh: speedKmh.toFixed(2),
            speedMph: speedMph.toFixed(2),
            speedMs: speedMs.toFixed(2),
            distance: dist,
            distanceUnit: distanceUnit,
            time: formatTime(totalSeconds),
        });
    };

    const calculateDistance = () => {
        const spd = parseFloat(speed) || 0;
        const hours = parseFloat(distTimeHours) || 0;
        const minutes = parseFloat(distTimeMinutes) || 0;
        const seconds = parseFloat(distTimeSeconds) || 0;

        if (spd <= 0) {
            alert("Please enter valid speed");
            return;
        }

        const totalSeconds = getTotalSeconds(hours, minutes, seconds);
        if (totalSeconds <= 0) {
            alert("Please enter valid time");
            return;
        }

        const speedKmh = speedToKmh(spd, speedUnit);
        const totalHours = totalSeconds / 3600;
        const distanceKm = speedKmh * totalHours;
        const distanceConverted = kmToDistance(distanceKm, distOutputUnit);

        setResult({
            type: "distance",
            distance: distanceConverted.toFixed(2),
            distanceUnit: distOutputUnit,
            distanceKm: distanceKm.toFixed(2),
            distanceMiles: (distanceKm / 1.60934).toFixed(2),
            speed: spd,
            speedUnit: speedUnit,
            time: formatTime(totalSeconds),
        });
    };

    const calculateTime = () => {
        const dist = parseFloat(timeDistance) || 0;
        const spd = parseFloat(timeSpeed) || 0;

        if (dist <= 0) {
            alert("Please enter valid distance");
            return;
        }
        if (spd <= 0) {
            alert("Please enter valid speed");
            return;
        }

        const distInKm = distanceToKm(dist, timeDistanceUnit);
        const speedKmh = speedToKmh(spd, timeSpeedUnit);

        const totalHours = distInKm / speedKmh;
        const totalSeconds = totalHours * 3600;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.round(totalSeconds % 60);

        setResult({
            type: "time",
            time: formatTime(totalSeconds),
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            distance: dist,
            distanceUnit: timeDistanceUnit,
            speed: spd,
            speedUnit: timeSpeedUnit,
        });
    };

    const calculate = () => {
        if (calculationType === "speed") calculateSpeed();
        else if (calculationType === "distance") calculateDistance();
        else calculateTime();
    };

    const reset = () => {
        setDistance("");
        setTimeHours("");
        setTimeMinutes("");
        setTimeSeconds("");
        setSpeed("");
        setDistTimeHours("");
        setDistTimeMinutes("");
        setDistTimeSeconds("");
        setTimeDistance("");
        setTimeSpeed("");
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://numrexo.com/calculator" className="hover:text-gray-300">Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Distance/Speed/Time Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Distance / Speed / Time</h3>
                        <p className="text-xs text-gray-500">Calculate any one value given the other two</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Calculation Type Selection */}
                        <div className="flex gap-2 p-1 bg-[#0f1525] rounded-lg">
                            <button onClick={() => { setCalculationType("speed"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${calculationType === "speed" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Find Speed</button>
                            <button onClick={() => { setCalculationType("distance"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${calculationType === "distance" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Find Distance</button>
                            <button onClick={() => { setCalculationType("time"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${calculationType === "time" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Find Time</button>
                        </div>

                        {calculationType === "speed" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.1" placeholder="Distance" value={distance} onChange={(e) => setDistance(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value as "km" | "miles" | "meters")} className="w-24 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                            <option value="km">km</option>
                                            <option value="miles">miles</option>
                                            <option value="meters">meters</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Time</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="1" placeholder="Hours" value={timeHours} onChange={(e) => setTimeHours(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <input type="number" step="1" placeholder="Minutes" value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <input type="number" step="1" placeholder="Seconds" value={timeSeconds} onChange={(e) => setTimeSeconds(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                    </div>
                                </div>
                            </>
                        )}

                        {calculationType === "distance" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Speed</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.1" placeholder="Speed" value={speed} onChange={(e) => setSpeed(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value as "kmh" | "mph" | "ms")} className="w-28 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                            <option value="kmh">km/h</option>
                                            <option value="mph">mph</option>
                                            <option value="ms">m/s</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Time</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="1" placeholder="Hours" value={distTimeHours} onChange={(e) => setDistTimeHours(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <input type="number" step="1" placeholder="Minutes" value={distTimeMinutes} onChange={(e) => setDistTimeMinutes(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <input type="number" step="1" placeholder="Seconds" value={distTimeSeconds} onChange={(e) => setDistTimeSeconds(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Output Unit</label>
                                    <select value={distOutputUnit} onChange={(e) => setDistOutputUnit(e.target.value as "km" | "miles" | "meters")} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                        <option value="km">Kilometers (km)</option>
                                        <option value="miles">Miles</option>
                                        <option value="meters">Meters</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {calculationType === "time" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.1" placeholder="Distance" value={timeDistance} onChange={(e) => setTimeDistance(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <select value={timeDistanceUnit} onChange={(e) => setTimeDistanceUnit(e.target.value as "km" | "miles" | "meters")} className="w-24 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                            <option value="km">km</option>
                                            <option value="miles">miles</option>
                                            <option value="meters">meters</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Speed</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.1" placeholder="Speed" value={timeSpeed} onChange={(e) => setTimeSpeed(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        <select value={timeSpeedUnit} onChange={(e) => setTimeSpeedUnit(e.target.value as "kmh" | "mph" | "ms")} className="w-28 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                            <option value="kmh">km/h</option>
                                            <option value="mph">mph</option>
                                            <option value="ms">m/s</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Result"
                    isEmpty={!result}
                    emptyIcon="📐"
                    emptyText="Enter values to calculate"
                    mainResult={result ? {
                        label: result.type === "speed" ? "Speed" : (result.type === "distance" ? "Distance" : "Time"),
                        value: result.type === "speed" ? `${result.speedKmh} km/h` : (result.type === "distance" ? `${result.distance} ${result.distanceUnit}` : result.time),
                        color: "text-teal-400"
                    } : undefined}
                    extraRows={result ? [
                        ...(result.type === "speed" ? [
                            { label: "Speed (mph)", value: `${result.speedMph} mph` },
                            { label: "Speed (m/s)", value: `${result.speedMs} m/s` },
                            { label: "Distance", value: `${result.distance} ${result.distanceUnit}` },
                            { label: "Time", value: result.time },
                        ] : []),
                        ...(result.type === "distance" ? [
                            { label: "Distance (km)", value: `${result.distanceKm} km` },
                            { label: "Distance (miles)", value: `${result.distanceMiles} miles` },
                            { label: "Speed", value: `${result.speed} ${result.speedUnit}` },
                            { label: "Time", value: result.time },
                        ] : []),
                        ...(result.type === "time" ? [
                            { label: "Time (Hours)", value: result.hours },
                            { label: "Time (Minutes)", value: result.minutes },
                            { label: "Time (Seconds)", value: result.seconds },
                            { label: "Distance", value: `${result.distance} ${result.distanceUnit}` },
                            { label: "Speed", value: `${result.speed} ${result.speedUnit}` },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Distance/Speed/Time Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Distance/Speed/Time Calculator</strong> helps you solve any motion problem using the fundamental formula. Whether you're planning a road trip, training for a marathon, or solving physics homework, get instant results with unit conversions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Calculate speed from distance and time, distance from speed and time, or time from distance and speed. Supports multiple units including kilometers, miles, meters, km/h, mph, and m/s. Perfect for travel, sports, and science.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Distance/Speed/Time Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select what you want to <strong className="text-white">calculate</strong> — Speed, Distance, or Time.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">two known values</strong> (Distance & Time for Speed, Speed & Time for Distance, Distance & Speed for Time).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select appropriate <strong className="text-white">units</strong> for distance, speed, and output.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate"</strong> to see the result with multiple unit conversions.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Why Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Distance/Speed/Time Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ Travel Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Estimate arrival times, fuel stops, and total trip duration. Plan road trips with accurate time calculations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Fitness Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate running pace, cycling speed, or walking time. Set achievable fitness goals based on speed.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Education & Homework</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Solve physics problems instantly. Check your manual calculations with accurate results.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Business Logistics</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate delivery times, shipping durations, and fleet management estimates.</p>
                    </div>
                </div>
            </section>

            {/* Unit Conversion Reference */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Unit Conversion Reference</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Convert From</th><th className="text-left py-3 px-4 text-gray-400">Convert To</th><th className="text-left py-3 px-4 text-gray-400">Formula</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">km/h</td><td className="py-2 px-4">m/s</td><td className="py-2 px-4 text-yellow-400">÷ 3.6</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">m/s</td><td className="py-2 px-4">km/h</td><td className="py-2 px-4 text-yellow-400">× 3.6</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">km/h</td><td className="py-2 px-4">mph</td><td className="py-2 px-4 text-yellow-400">÷ 1.60934</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">mph</td><td className="py-2 px-4">km/h</td><td className="py-2 px-4 text-yellow-400">× 1.60934</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">km</td><td className="py-2 px-4">miles</td><td className="py-2 px-4 text-yellow-400">÷ 1.60934</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">miles</td><td className="py-2 px-4">km</td><td className="py-2 px-4 text-yellow-400">× 1.60934</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Quick Reference Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Reference Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-teal-400 text-xl mb-1">S = D / T</div>
                        <p className="text-xs text-gray-500">Speed = Distance ÷ Time</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-teal-400 text-xl mb-1">D = S × T</div>
                        <p className="text-xs text-gray-500">Distance = Speed × Time</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-teal-400 text-xl mb-1">T = D / S</div>
                        <p className="text-xs text-gray-500">Time = Distance ÷ Speed</p>
                    </div>
                </div>
            </section>

            {/* Speed Reference Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Speed References</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-yellow-400 font-bold">Walking</span><p className="text-gray-400">3-5 km/h</p><p className="text-gray-600 text-[10px]">1.8-3.1 mph</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-green-400 font-bold">Running</span><p className="text-gray-400">8-12 km/h</p><p className="text-gray-600 text-[10px]">5-7.5 mph</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-blue-400 font-bold">Cycling</span><p className="text-gray-400">15-25 km/h</p><p className="text-gray-600 text-[10px]">9-15.5 mph</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-red-400 font-bold">Car (City)</span><p className="text-gray-400">30-50 km/h</p><p className="text-gray-600 text-[10px]">18-31 mph</p></div>
                </div>
            </section>

            {/* Practical Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Practical Examples & Scenarios</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">🚗 Road Trip:</strong> 400 km distance at 80 km/h average speed = 5 hours driving time. Add 15% for breaks = 5.75 hours (5h 45m).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">🏃 Running:</strong> 10 km run in 50 minutes = 12 km/h average speed (5 min/km pace). Good for intermediate runners.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">✈️ Flight:</strong> 5,000 km distance at 900 km/h cruising speed = 5.56 hours flight time + 1 hour takeoff/landing = 6.5 hours total.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">🚴 Cycling:</strong> 60 km ride at 20 km/h average = 3 hours. Strong headwind reduces speed to 15 km/h = 4 hours.</p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}