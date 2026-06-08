"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is a good running pace?",
        a: "Beginner: 8-10 min/km, Intermediate: 5-7 min/km, Advanced: 4-5 min/km, Elite: under 4 min/km. Your pace depends on fitness level, distance, and training.",
    },
    {
        q: "How to improve running pace?",
        a: "Incorporate interval training, tempo runs, strength training, and proper recovery. Consistency and gradual progression (10% rule) are key to improvement.",
    },
    {
        q: "What's the difference between pace and speed?",
        a: "Pace is time per distance (e.g., minutes per km), speed is distance per time (e.g., km per hour). Pace is more common for running, speed for cycling/driving.",
    },
    {
        q: "How accurate is this pace calculator?",
        a: "Very accurate for most activities. Uses standard formulas. For running, consider terrain, elevation, and weather conditions which can affect actual performance.",
    },
];

export default function PaceCalculator() {
    const [calculationType, setCalculationType] = useState<"pace" | "time" | "distance">("pace");

    // For Pace calculation (calculate pace from time & distance)
    const [timeHours, setTimeHours] = useState("");
    const [timeMinutes, setTimeMinutes] = useState("");
    const [timeSeconds, setTimeSeconds] = useState("");
    const [distance, setDistance] = useState("");
    const [distanceUnit, setDistanceUnit] = useState<"km" | "miles">("km");

    // For Time calculation (calculate time from pace & distance)
    const [paceMinutes, setPaceMinutes] = useState("");
    const [paceSeconds, setPaceSeconds] = useState("");
    const [paceUnit, setPaceUnit] = useState<"km" | "mile">("km");
    const [timeDistance, setTimeDistance] = useState("");

    // For Distance calculation (calculate distance from pace & time)
    const [distPaceMinutes, setDistPaceMinutes] = useState("");
    const [distPaceSeconds, setDistPaceSeconds] = useState("");
    const [distTimeHours, setDistTimeHours] = useState("");
    const [distTimeMinutes, setDistTimeMinutes] = useState("");
    const [distTimeSeconds, setDistTimeSeconds] = useState("");

    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const formatTime = (totalSeconds: number) => {
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

    const formatPace = (secondsPerUnit: number, isKm: boolean) => {
        const minutes = Math.floor(secondsPerUnit / 60);
        const seconds = Math.round(secondsPerUnit % 60);
        const unit = isKm ? "km" : "mile";
        return `${minutes}:${seconds.toString().padStart(2, "0")} min/${unit}`;
    };

    const calculatePace = () => {
        const hours = parseFloat(timeHours) || 0;
        const minutes = parseFloat(timeMinutes) || 0;
        const seconds = parseFloat(timeSeconds) || 0;
        const dist = parseFloat(distance) || 0;

        if (dist <= 0) {
            alert("Please enter a valid distance");
            return;
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        if (totalSeconds <= 0) {
            alert("Please enter valid time");
            return;
        }

        const secondsPerUnit = totalSeconds / dist;
        const pace = formatPace(secondsPerUnit, distanceUnit === "km");

        // Calculate speed
        const speedKmph = (dist / (totalSeconds / 3600));
        const speedMph = speedKmph * 0.621371;

        // Predictions for common distances
        const predictTime = (targetDist: number) => {
            const targetSeconds = secondsPerUnit * targetDist;
            return formatTime(targetSeconds);
        };

        setResult({
            type: "pace",
            pace: pace,
            speedKmph: speedKmph.toFixed(2),
            speedMph: speedMph.toFixed(2),
            distance: dist,
            distanceUnit: distanceUnit,
            totalTime: formatTime(totalSeconds),
            fiveK: predictTime(5),
            tenK: predictTime(10),
            halfMarathon: predictTime(21.0975),
            marathon: predictTime(42.195),
        });
    };

    const calculateTime = () => {
        const paceMin = parseFloat(paceMinutes) || 0;
        const paceSec = parseFloat(paceSeconds) || 0;
        const dist = parseFloat(timeDistance) || 0;

        if (dist <= 0) {
            alert("Please enter a valid distance");
            return;
        }

        const totalPaceSeconds = (paceMin * 60) + paceSec;
        if (totalPaceSeconds <= 0) {
            alert("Please enter valid pace");
            return;
        }

        const totalSeconds = totalPaceSeconds * dist;
        const timeString = formatTime(totalSeconds);

        // Convert distance to km for speed calculation
        let distInKm = dist;
        if (paceUnit === "mile") {
            distInKm = dist * 1.60934;
        }
        const speedKmph = distInKm / (totalSeconds / 3600);
        const speedMph = speedKmph * 0.621371;

        setResult({
            type: "time",
            time: timeString,
            totalSeconds: totalSeconds,
            distance: dist,
            distanceUnit: paceUnit === "km" ? "km" : "miles",
            pace: `${paceMin}:${paceSec.toString().padStart(2, "0")} min/${paceUnit}`,
            speedKmph: speedKmph.toFixed(2),
            speedMph: speedMph.toFixed(2),
        });
    };

    const calculateDistance = () => {
        const paceMin = parseFloat(distPaceMinutes) || 0;
        const paceSec = parseFloat(distPaceSeconds) || 0;
        const hours = parseFloat(distTimeHours) || 0;
        const minutes = parseFloat(distTimeMinutes) || 0;
        const seconds = parseFloat(distTimeSeconds) || 0;

        const totalPaceSeconds = (paceMin * 60) + paceSec;
        const totalTimeSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (totalPaceSeconds <= 0) {
            alert("Please enter valid pace");
            return;
        }
        if (totalTimeSeconds <= 0) {
            alert("Please enter valid time");
            return;
        }

        const distanceKm = totalTimeSeconds / totalPaceSeconds;
        const distanceMiles = distanceKm * 0.621371;

        const speedKmph = distanceKm / (totalTimeSeconds / 3600);
        const speedMph = speedKmph * 0.621371;

        setResult({
            type: "distance",
            distanceKm: distanceKm.toFixed(2),
            distanceMiles: distanceMiles.toFixed(2),
            pace: `${paceMin}:${paceSec.toString().padStart(2, "0")} min/km`,
            time: formatTime(totalTimeSeconds),
            speedKmph: speedKmph.toFixed(2),
            speedMph: speedMph.toFixed(2),
        });
    };

    const calculate = () => {
        if (calculationType === "pace") calculatePace();
        else if (calculationType === "time") calculateTime();
        else calculateDistance();
    };

    const reset = () => {
        setTimeHours("");
        setTimeMinutes("");
        setTimeSeconds("");
        setDistance("");
        setPaceMinutes("");
        setPaceSeconds("");
        setTimeDistance("");
        setDistPaceMinutes("");
        setDistPaceSeconds("");
        setDistTimeHours("");
        setDistTimeMinutes("");
        setDistTimeSeconds("");
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://www.numrexo.com/fitness" className="hover:text-gray-300">Fitness Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Pace Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Pace Calculator</h3>
                        <p className="text-xs text-gray-500">Calculate pace, time, or distance for running/walking</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Calculation Type Selection */}
                        <div className="flex gap-2 p-1 bg-[#0f1525] rounded-lg">
                            <button onClick={() => { setCalculationType("pace"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${calculationType === "pace" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Find Pace</button>
                            <button onClick={() => { setCalculationType("time"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${calculationType === "time" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Find Time</button>
                            <button onClick={() => { setCalculationType("distance"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${calculationType === "distance" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Find Distance</button>
                        </div>

                        {calculationType === "pace" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Time</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="1" placeholder="Hours" value={timeHours} onChange={(e) => setTimeHours(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <input type="number" step="1" placeholder="Minutes" value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <input type="number" step="1" placeholder="Seconds" value={timeSeconds} onChange={(e) => setTimeSeconds(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.1" placeholder="Distance" value={distance} onChange={(e) => setDistance(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value as "km" | "miles")} className="w-24 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                            <option value="km">km</option>
                                            <option value="miles">miles</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {calculationType === "time" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Pace</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.5" placeholder="Minutes" value={paceMinutes} onChange={(e) => setPaceMinutes(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <input type="number" step="1" placeholder="Seconds" value={paceSeconds} onChange={(e) => setPaceSeconds(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <select value={paceUnit} onChange={(e) => setPaceUnit(e.target.value as "km" | "mile")} className="w-20 px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                            <option value="km">/km</option>
                                            <option value="mile">/mile</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label>
                                    <input type="number" step="0.1" placeholder="Distance" value={timeDistance} onChange={(e) => setTimeDistance(e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                </div>
                            </>
                        )}

                        {calculationType === "distance" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Pace (min/km)</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="0.5" placeholder="Minutes" value={distPaceMinutes} onChange={(e) => setDistPaceMinutes(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <input type="number" step="1" placeholder="Seconds" value={distPaceSeconds} onChange={(e) => setDistPaceSeconds(e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Time</label>
                                    <div className="flex gap-2">
                                        <input type="number" step="1" placeholder="Hours" value={distTimeHours} onChange={(e) => setDistTimeHours(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <input type="number" step="1" placeholder="Minutes" value={distTimeMinutes} onChange={(e) => setDistTimeMinutes(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                        <input type="number" step="1" placeholder="Seconds" value={distTimeSeconds} onChange={(e) => setDistTimeSeconds(e.target.value)} className="w-1/3 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Pace Result"
                    isEmpty={!result}
                    emptyIcon="🏃"
                    emptyText="Enter your activity details"
                    mainResult={result ? {
                        label: result.type === "pace" ? "Your Pace" : (result.type === "time" ? "Total Time" : "Distance Covered"),
                        value: result.type === "pace" ? result.pace : (result.type === "time" ? result.time : `${result.distanceKm} km`),
                        color: "text-teal-400"
                    } : undefined}
                    extraRows={result ? [
                        ...(result.type === "pace" ? [
                            { label: "Speed", value: `${result.speedKmph} km/h | ${result.speedMph} mph` },
                            { label: "Total Time", value: result.totalTime },
                            { label: "5K Prediction", value: result.fiveK, valueColor: "text-yellow-400" },
                            { label: "10K Prediction", value: result.tenK, valueColor: "text-yellow-400" },
                            { label: "Half Marathon", value: result.halfMarathon },
                            { label: "Marathon", value: result.marathon },
                        ] : []),
                        ...(result.type === "time" ? [
                            { label: "Pace", value: result.pace },
                            { label: "Speed", value: `${result.speedKmph} km/h | ${result.speedMph} mph` },
                            { label: "Distance", value: `${result.distance} ${result.distanceUnit}` },
                        ] : []),
                        ...(result.type === "distance" ? [
                            { label: "Distance (Miles)", value: `${result.distanceMiles} miles` },
                            { label: "Pace", value: result.pace },
                            { label: "Time", value: result.time },
                            { label: "Speed", value: `${result.speedKmph} km/h | ${result.speedMph} mph` },
                        ] : []),
                    ] : []}
                />
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Pace Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate running pace, race time, or distance for your workouts. Perfect for runners, cyclists, and walkers to plan training and predict race times.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Pace Chart (min/km)</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-teal-400 font-bold">5:00/km</span><p className="text-gray-500">25:00 (5K)</p><p className="text-gray-600 text-[10px]">50:00 (10K)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-teal-400 font-bold">5:30/km</span><p className="text-gray-500">27:30 (5K)</p><p className="text-gray-600 text-[10px]">55:00 (10K)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-teal-400 font-bold">6:00/km</span><p className="text-gray-500">30:00 (5K)</p><p className="text-gray-600 text-[10px]">1:00:00 (10K)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2"><span className="text-teal-400 font-bold">7:00/km</span><p className="text-gray-500">35:00 (5K)</p><p className="text-gray-600 text-[10px]">1:10:00 (10K)</p></div>
                </div>
            </section>

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