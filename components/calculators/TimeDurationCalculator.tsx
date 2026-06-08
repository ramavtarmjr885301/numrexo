"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate time duration between two times?",
        a: "Subtract the start time from the end time. Example: 9:00 AM to 5:00 PM = 8 hours. Our calculator handles AM/PM and 24-hour formats automatically.",
    },
    {
        q: "How to calculate overnight time duration?",
        a: "For times that cross midnight, add 24 hours to the end time. Example: 10:00 PM to 2:00 AM = (2 + 24) - 22 = 4 hours.",
    },
    {
        q: "How to add or subtract time from a given time?",
        a: "Add or subtract hours and minutes. Example: 9:00 AM + 3 hours 30 minutes = 12:30 PM. Our calculator supports both adding and subtracting time.",
    },
    {
        q: "What is the difference between 12-hour and 24-hour format?",
        a: "12-hour format uses AM/PM (1-12). 24-hour format uses 0-23 (e.g., 2 PM = 14:00). Our calculator supports both formats.",
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
    name: "Time Duration Calculator – Calculate Time Difference",
    description: "Calculate duration between two times, add or subtract hours and minutes. Perfect for work hours, travel time, and scheduling.",
    url: "https://www.numrexo.com/time/time-duration-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Time difference", "Add/subtract time", "Hours and minutes", "Overnight calculations"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://www.numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Time Duration Calculator", item: "https://www.numrexo.com/time/time-duration-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimeDurationCalculator() {
    const [calcType, setCalcType] = useState<"difference" | "add" | "subtract">("difference");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [baseTime, setBaseTime] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const timeToMinutes = (time: string): number => {
        if (!time) return NaN;
        const [hourStr, minuteStr] = time.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);

        if (isNaN(hour) || isNaN(minute)) return NaN;

        return hour * 60 + minute;
    };

    const minutesToTime = (minutes: number): string => {
        let totalMinutes = minutes;
        let hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        hours = hours % 24;

        return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
    };

    const calculateDifference = () => {
        if (!startTime || !endTime) {
            alert("Please enter both start and end times");
            return;
        }

        let startMinutes = timeToMinutes(startTime);
        let endMinutes = timeToMinutes(endTime);

        if (isNaN(startMinutes) || isNaN(endMinutes)) {
            alert("Please enter valid times");
            return;
        }

        let diffMinutes = endMinutes - startMinutes;
        let overnight = false;

        if (diffMinutes < 0) {
            diffMinutes += 24 * 60;
            overnight = true;
        }

        const hoursDiff = Math.floor(diffMinutes / 60);
        const minutesDiff = diffMinutes % 60;

        setResult({
            type: "difference",
            startTime,
            endTime,
            hours: hoursDiff,
            minutes: minutesDiff,
            totalMinutes: diffMinutes,
            overnight,
        });
    };

    const calculateAddSubtract = () => {
        if (!baseTime) {
            alert("Please enter a base time");
            return;
        }

        const hoursNum = parseInt(hours) || 0;
        const minutesNum = parseInt(minutes) || 0;

        if (hoursNum === 0 && minutesNum === 0) {
            alert("Please enter hours or minutes to add/subtract");
            return;
        }

        let baseMinutes = timeToMinutes(baseTime);
        if (isNaN(baseMinutes)) {
            alert("Please enter a valid base time");
            return;
        }

        let totalChange = hoursNum * 60 + minutesNum;
        if (calcType === "subtract") {
            totalChange = -totalChange;
        }

        let newMinutes = baseMinutes + totalChange;

        // Handle wrap around 24 hours
        newMinutes = ((newMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);

        const newTime = minutesToTime(newMinutes);

        setResult({
            type: calcType,
            baseTime,
            hoursChange: hoursNum,
            minutesChange: minutesNum,
            newTime,
            totalMinutesChange: Math.abs(totalChange),
        });
    };

    const calculate = () => {
        if (calcType === "difference") {
            calculateDifference();
        } else {
            calculateAddSubtract();
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Time Duration Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Time Duration Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate time difference or add/subtract time</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "difference" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("difference")}>Time Difference</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "add" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("add")}>Add Time</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "subtract" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("subtract")}>Subtract Time</button>
                            </div>
                        </div>

                        {calcType === "difference" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Start Time</label><input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">End Time</label><input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            </>
                        )}

                        {(calcType === "add" || calcType === "subtract") && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Base Time</label><input type="time" value={baseTime} onChange={(e) => setBaseTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Hours</label><input type="number" placeholder="0" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Minutes</label><input type="number" placeholder="0" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                                </div>
                            </>
                        )}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                    </div>
                </div>

                <ResultBox
                    title="Time Result"
                    isEmpty={!result}
                    emptyIcon="⏱️"
                    emptyText="Enter time values and press Calculate"
                    mainResult={result ? {
                        label: calcType === "difference" ? "Time Duration" : `${calcType === "add" ? "New Time" : "Result Time"}`,
                        value: calcType === "difference" ? `${result.hours}h ${result.minutes}m` : result.newTime,
                        color: "text-purple-400"
                    } : undefined}
                    extraRows={result ? [
                        ...(calcType === "difference" ? [
                            { label: "Period", value: `${result.startTime} → ${result.endTime}${result.overnight ? " (overnight)" : ""}` },
                            { label: "Total Minutes", value: `${result.totalMinutes} minutes` },
                        ] : [
                            { label: "Base Time", value: result.baseTime },
                            { label: `${calcType === "add" ? "Added" : "Subtracted"}`, value: `${result.hoursChange}h ${result.minutesChange}m` },
                            { label: "Total Change", value: `${result.totalMinutesChange} minutes` },
                        ]),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Time Duration Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate duration between two times, or add/subtract hours and minutes from a base time. Perfect for work hours, travel time, cooking, and scheduling.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Quick Examples</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setCalcType("difference"); setStartTime("09:00"); setEndTime("17:00"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">9 AM to 5 PM (8 hours)</button>
                    <button onClick={() => { setCalcType("difference"); setStartTime("22:00"); setEndTime("06:00"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">10 PM to 6 AM (8 hours overnight)</button>
                    <button onClick={() => { setCalcType("add"); setBaseTime("09:00"); setHours("3"); setMinutes("30"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">9 AM + 3h30m = 12:30 PM</button>
                    <button onClick={() => { setCalcType("subtract"); setBaseTime("14:00"); setHours("2"); setMinutes("15"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">2 PM - 2h15m = 11:45 AM</button>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}