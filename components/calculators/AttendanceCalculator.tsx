"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is the minimum attendance requirement in colleges?",
        a: "Most Indian universities require 75% attendance to be eligible for exams. Some colleges have 80% or 85% requirements. Always check your institution's specific policy.",
    },
    {
        q: "How is attendance percentage calculated?",
        a: "Attendance % = (Total Classes Attended ÷ Total Classes Held) × 100. Holidays and authorized leaves may be treated differently based on your institution's rules.",
    },
    {
        q: "What happens if my attendance is below 75%?",
        a: "You may be debarred from exams, need to pay a fine, complete extra assignments, or appear for a medical certificate. Some colleges grant condonation (relaxation) up to 5-10%.",
    },
    {
        q: "How many more classes do I need to attend to reach 75%?",
        a: "Use the 'Target Attendance' feature above. Enter your current attendance and target percentage to calculate exactly how many consecutive classes you need to attend.",
    },
];

export default function AttendanceCalculator() {
    const [classesAttended, setClassesAttended] = useState("");
    const [classesHeld, setClassesHeld] = useState("");
    const [targetPercentage, setTargetPercentage] = useState("75");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const attended = parseFloat(classesAttended) || 0;
        const held = parseFloat(classesHeld) || 0;

        if (held <= 0) {
            alert("Please enter total classes held");
            return;
        }

        const currentPercentage = (attended / held) * 100;

        let status = "";
        let statusColor = "";
        if (currentPercentage >= 85) {
            status = "Excellent - Safe Zone ✅";
            statusColor = "text-green-400";
        } else if (currentPercentage >= 75) {
            status = "Good - Minimum Met ✅";
            statusColor = "text-teal-400";
        } else if (currentPercentage >= 65) {
            status = "Warning - Risk Zone ⚠️";
            statusColor = "text-yellow-400";
        } else {
            status = "Critical - High Risk ❌";
            statusColor = "text-red-400";
        }

        // Calculate needed classes to reach target
        const target = parseFloat(targetPercentage) || 75;
        let neededClasses = 0;
        let canReach = true;

        if (target > currentPercentage) {
            // Formula: (attended + x) / (held + x) = target/100
            // Solve for x: 100(attended + x) = target(held + x)
            // 100*attended + 100x = target*held + target*x
            // 100x - target*x = target*held - 100*attended
            // x(100 - target) = target*held - 100*attended
            // x = (target*held - 100*attended) / (100 - target)
            const numerator = target * held - 100 * attended;
            const denominator = 100 - target;

            if (denominator > 0 && numerator > 0) {
                neededClasses = Math.ceil(numerator / denominator);
            } else {
                canReach = false;
            }
        }

        // Maximum possible percentage if attending all future classes
        const maxPercentage = 100;

        // Classes that can be missed while staying above target
        let canMiss = 0;
        if (currentPercentage > target) {
            // Formula: (attended) / (held + x) = target/100
            // 100*attended = target(held + x)
            // 100*attended / target = held + x
            // x = (100*attended / target) - held
            const maxHeld = (100 * attended) / target;
            canMiss = Math.floor(maxHeld - held);
            if (canMiss < 0) canMiss = 0;
        }

        const totalClassesNeeded = held + neededClasses;
        const projectedAttended = attended + neededClasses;

        setResult({
            currentPercentage: currentPercentage.toFixed(2),
            status: status,
            statusColor: statusColor,
            attended: attended,
            held: held,
            neededClasses: neededClasses,
            canReach: canReach,
            targetPercentage: target,
            canMiss: canMiss,
            totalClassesAfterTarget: totalClassesNeeded,
            projectedAttended: projectedAttended,
            shortfall: currentPercentage < 75 ? (75 - currentPercentage).toFixed(2) : 0,
            excess: currentPercentage > 75 ? (currentPercentage - 75).toFixed(2) : 0,
        });
    };

    const reset = () => {
        setClassesAttended("");
        setClassesHeld("");
        setTargetPercentage("75");
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://numrexo.com/education" className="hover:text-gray-300">Education Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Attendance Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Attendance Details</h3>
                        <p className="text-xs text-gray-500">Enter your current attendance record</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total Classes Attended</label>
                            <input type="number" step="1" placeholder="e.g., 45" value={classesAttended} onChange={(e) => setClassesAttended(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total Classes Held</label>
                            <input type="number" step="1" placeholder="e.g., 60" value={classesHeld} onChange={(e) => setClassesHeld(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Target Attendance Percentage (%)</label>
                            <select value={targetPercentage} onChange={(e) => setTargetPercentage(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                <option value="60">60% (Minimum for some colleges)</option>
                                <option value="65">65%</option>
                                <option value="70">70%</option>
                                <option value="75">75% (Standard Requirement)</option>
                                <option value="80">80% (Strict Requirement)</option>
                                <option value="85">85% (Very Strict)</option>
                                <option value="90">90%</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Attendance Summary"
                    isEmpty={!result}
                    emptyIcon="📖"
                    emptyText="Enter your attendance to calculate percentage"
                    mainResult={result ? { label: "Current Attendance", value: `${result.currentPercentage}%`, color: result.statusColor } : undefined}
                    extraRows={result ? [
                        { label: "Status", value: result.status, valueColor: result.statusColor },
                        { label: "Classes Attended", value: result.attended },
                        { label: "Classes Held", value: result.held },
                        ...(result.shortfall > 0 ? [{ label: "Shortfall from 75%", value: `${result.shortfall}%`, valueColor: "text-red-400" }] : []),
                        ...(result.excess > 0 ? [{ label: "Above 75%", value: `${result.excess}%`, valueColor: "text-green-400" }] : []),
                        ...(result.canMiss > 0 ? [{ label: "Classes you can skip", value: result.canMiss, valueColor: "text-yellow-400" }] : []),
                        ...(result.neededClasses > 0 && result.canReach ? [{ label: `Classes needed to reach ${result.targetPercentage}%`, value: result.neededClasses, valueColor: "text-orange-400" }] : []),
                        ...(result.neededClasses > 0 && !result.canReach ? [{ label: "Target Unreachable", value: "Even attending all classes won't reach target", valueColor: "text-red-400" }] : []),
                    ] : []}
                />
            </div>

            {result && result.neededClasses > 0 && result.canReach && (
                <div className="mb-8 bg-[#111827] border border-teal-500/30 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-teal-400 mb-2">📌 Action Plan</h3>
                    <p className="text-gray-300 text-sm">
                        You need to attend <span className="text-teal-400 font-bold">{result.neededClasses}</span> more classes out of the next{' '}
                        <span className="text-teal-400 font-bold">{result.neededClasses}</span> classes without missing any to reach <span className="font-bold">{result.targetPercentage}%</span> attendance.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        After attending {result.neededClasses} classes, total classes held will be {result.totalClassesAfterTarget} and you would have attended {result.projectedAttended} classes.
                    </p>
                </div>
            )}

            {result && result.canMiss > 0 && (
                <div className="mb-8 bg-[#111827] border border-green-500/30 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-green-400 mb-2">✅ Safe Zone</h3>
                    <p className="text-gray-300 text-sm">
                        You can afford to miss up to <span className="text-green-400 font-bold">{result.canMiss}</span> more classes and still maintain {result.targetPercentage}% attendance.
                    </p>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Attendance Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Track your attendance percentage, find out how many more classes you need to meet requirements, and plan your attendance strategy for exams.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Attendance Requirements in India</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-xl mb-1">🏫</div>
                        <p className="text-xs font-semibold text-white">75%</p>
                        <p className="text-xs text-gray-500">Most Universities</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-xl mb-1">⚕️</div>
                        <p className="text-xs font-semibold text-white">80-85%</p>
                        <p className="text-xs text-gray-500">Medical Colleges</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-xl mb-1">🔧</div>
                        <p className="text-xs font-semibold text-white">75-80%</p>
                        <p className="text-xs text-gray-500">Engineering Colleges</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <div className="text-xl mb-1">🎓</div>
                        <p className="text-xs font-semibold text-white">60-70%</p>
                        <p className="text-xs text-gray-500">Open Universities</p>
                    </div>
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