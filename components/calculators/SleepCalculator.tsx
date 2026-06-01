// components/calculators/SleepCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

export default function SleepCalculator() {
    const [wakeTime, setWakeTime] = useState("07:00");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const [hours, minutes] = wakeTime.split(":").map(Number);
        const wakeDate = new Date();
        wakeDate.setHours(hours, minutes, 0);

        const sleepCycles = [4.5, 6, 7.5, 9, 10.5];
        const bedTimes = sleepCycles.map(cycles => {
            const bedDate = new Date(wakeDate.getTime() - cycles * 60 * 60 * 1000);
            return bedDate;
        });

        setResult({ wakeTime, bedTimes });
    };

    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Wake-up Time</h3></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-gray-400 mb-2">What time do you need to wake up?</label><input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div><button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold">Calculate Bedtime →</button></div></div><ResultBox title="Recommended Bedtimes" isEmpty={!result} emptyIcon="😴" emptyText="Enter your wake-up time" mainResult={{ label: "Best Sleep Duration", value: "7.5 hours (5 cycles)", color: "text-purple-400" }} extraRows={result ? result.bedTimes.map((bt: Date, i: number) => ({ label: `${[4.5, 6, 7.5, 9, 10.5][i]} hours sleep`, value: bt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })) : []} /></div>);
}