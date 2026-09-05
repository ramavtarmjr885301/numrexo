"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate time duration between two times?",
        a: "Subtract the start time from the end time. Example: 9:00 AM to 5:00 PM = 8 hours. Our calculator handles AM/PM and 24-hour formats automatically. Simply enter your start and end times, and the calculator will give you the exact duration in hours and minutes. This is perfect for calculating work hours, travel time, or any event duration.",
    },
    {
        q: "How to calculate overnight time duration?",
        a: "For times that cross midnight, add 24 hours to the end time. Example: 10:00 PM to 2:00 AM = (2 + 24) - 22 = 4 hours. Our calculator automatically detects overnight periods and handles the calculation correctly. This is especially useful for night shifts, overnight travel, or events that span across midnight.",
    },
    {
        q: "How to add or subtract time from a given time?",
        a: "Add or subtract hours and minutes from a base time. Example: 9:00 AM + 3 hours 30 minutes = 12:30 PM. Our calculator supports both adding and subtracting time. This is useful for scheduling, cooking, or planning activities that start at a specific time and last for a known duration.",
    },
    {
        q: "What is the difference between 12-hour and 24-hour format?",
        a: "12-hour format uses AM/PM (1-12) where 12:00 AM is midnight and 12:00 PM is noon. 24-hour format uses 0-23 (e.g., 2 PM = 14:00, midnight = 00:00). Our calculator supports both formats automatically. The 24-hour format is commonly used in military, aviation, and many countries worldwide to avoid AM/PM confusion.",
    },
    {
        q: "How to calculate time difference in minutes only?",
        a: "To get time difference in minutes: 1) Convert both times to minutes from midnight, 2) Subtract start from end. Example: 9:00 AM (540 minutes) to 5:00 PM (1020 minutes) = 480 minutes (8 hours × 60). Our calculator shows both hours/minutes and total minutes, making it easy to use the result in any format you need.",
    },
    {
        q: "What is the best way to calculate work hours?",
        a: "To calculate work hours: 1) Enter start time (clock-in), 2) Enter end time (clock-out), 3) Subtract lunch breaks if applicable. Example: 9:00 AM to 5:30 PM = 8.5 hours. If you take a 30-minute lunch, actual work time = 8 hours. Our calculator helps you track work hours accurately, which is essential for payroll, timesheets, and productivity tracking.",
    },
    {
        q: "How to calculate time between two dates?",
        a: "Time between dates calculates the exact duration in days, hours, and minutes between two calendar dates. This is different from time-of-day duration (which our calculator focuses on). For date calculations, use a date difference calculator. Our time duration calculator is specifically for time-of-day differences (within a 24-hour period).",
    },
    {
        q: "What is the difference between elapsed time and duration?",
        a: "Elapsed time is the amount of time that passes from a start to an end point (e.g., 9 AM to 5 PM = 8 hours). Duration is often used interchangeably but can refer to the length of an event or period. Our calculator measures elapsed time between two points in a day, which is the most common use case for time duration calculations.",
    },
    {
        q: "How to calculate time for cooking or baking?",
        a: "For cooking: 1) Note the start time (when you put food in), 2) Add the recipe's cooking time using our 'Add Time' feature. Example: If you put a roast in at 2:30 PM and it needs 2 hours 15 minutes, the calculator shows it will be ready at 4:45 PM. Our 'Add Time' feature is perfect for meal planning and ensuring food is ready on time.",
    },
    {
        q: "What is the significance of time zones in duration calculations?",
        a: "Time zones affect duration calculations when events span different zones. Our calculator assumes both times are in the same time zone. For international travel or global meetings, you need to: 1) Convert all times to a common time zone (e.g., UTC), 2) Then calculate the difference. Always specify the time zone for each time to avoid confusion in cross-border calculations.",
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
    url: "https://numrexo.com/time/time-duration-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Time difference", "Add/subtract time", "Hours and minutes", "Overnight calculations"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Time Duration Calculator", item: "https://numrexo.com/time/time-duration-calculator" },
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

    const resetForm = () => {
        setCalcType("difference");
        setStartTime("");
        setEndTime("");
        setHours("");
        setMinutes("");
        setBaseTime("");
        setResult(null);
    };

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Time Duration Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Time Duration Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate time difference or add/subtract time</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "difference" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("difference")}
                                >
                                    Difference
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "add" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("add")}
                                >
                                    Add Time
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "subtract" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("subtract")}
                                >
                                    Subtract Time
                                </button>
                            </div>
                        </div>

                        {calcType === "difference" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Start Time</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">End Time</label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                                    />
                                </div>
                            </>
                        )}

                        {(calcType === "add" || calcType === "subtract") && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Base Time</label>
                                    <input
                                        type="time"
                                        value={baseTime}
                                        onChange={(e) => setBaseTime(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Hours</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={hours}
                                            onChange={(e) => setHours(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Minutes</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={minutes}
                                            onChange={(e) => setMinutes(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate →
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
                            { label: "Hours", value: `${result.hours}h` },
                            { label: "Minutes", value: `${result.minutes}m` },
                        ] : [
                            { label: "Base Time", value: result.baseTime },
                            { label: `${calcType === "add" ? "Added" : "Subtracted"}`, value: `${result.hoursChange}h ${result.minutesChange}m` },
                            { label: "Total Change", value: `${result.totalMinutesChange} minutes` },
                            { label: "Result Time", value: result.newTime },
                        ]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Time Duration Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Time Duration Calculator</strong> helps you calculate the time difference between two times, or add/subtract hours and minutes from a base time. It's perfect for work hours, travel time, cooking, scheduling, and any scenario where you need to work with time calculations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're tracking your work hours, planning a trip, following a recipe, or scheduling meetings across time zones, our calculator provides accurate results in hours, minutes, and total minutes.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The calculator automatically handles overnight periods (times that cross midnight) and supports both 12-hour and 24-hour time formats. Simply enter your times and get instant results.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Time Duration Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">calculation type</strong> (Time Difference, Add Time, or Subtract Time).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> For Difference: Enter <strong className="text-white">start time</strong> and <strong className="text-white">end time</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For Add/Subtract: Enter <strong className="text-white">base time</strong>, and the <strong className="text-white">hours and minutes</strong> to add or subtract.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use the quick example buttons to test the calculator.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Time Duration Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Work Hour Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate your exact work hours for payroll, timesheets, and productivity tracking. Know exactly how long you've worked.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Travel Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate travel duration between departure and arrival times. Plan your journey with accurate time estimates.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Cooking & Baking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Add cooking times to your start time to know exactly when your food will be ready. Perfect for meal planning.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Event Scheduling</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate event durations and end times. Plan meetings, appointments, and activities with precision.</p>
                    </div>
                </div>
            </section>

            {/* Quick Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => { setCalcType("difference"); setStartTime("09:00"); setEndTime("17:00"); }}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                        🏢 9 AM to 5 PM<br /><span className="text-gray-500 text-xs">8 hours work day</span>
                    </button>
                    <button
                        onClick={() => { setCalcType("difference"); setStartTime("22:00"); setEndTime("06:00"); }}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                        🌙 10 PM to 6 AM<br /><span className="text-gray-500 text-xs">8 hours overnight</span>
                    </button>
                    <button
                        onClick={() => { setCalcType("add"); setBaseTime("09:00"); setHours("3"); setMinutes("30"); }}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                        ➕ 9 AM + 3h30m<br /><span className="text-gray-500 text-xs">12:30 PM result</span>
                    </button>
                    <button
                        onClick={() => { setCalcType("subtract"); setBaseTime("14:00"); setHours("2"); setMinutes("15"); }}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                        ➖ 2 PM - 2h15m<br /><span className="text-gray-500 text-xs">11:45 AM result</span>
                    </button>
                    <button
                        onClick={() => { setCalcType("difference"); setStartTime("08:30"); setEndTime("16:45"); }}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                        ⏰ 8:30 AM to 4:45 PM<br /><span className="text-gray-500 text-xs">8h 15m duration</span>
                    </button>
                    <button
                        onClick={() => { setCalcType("add"); setBaseTime("11:00"); setHours("1"); setMinutes("45"); }}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all"
                    >
                        🍳 11 AM + 1h45m<br /><span className="text-gray-500 text-xs">12:45 PM result</span>
                    </button>
                </div>
            </section>

            {/* Time Format Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Time Format Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">12-Hour Format (AM/PM)</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• 12:00 AM = Midnight</li>
                                <li>• 6:00 AM = Early morning</li>
                                <li>• 12:00 PM = Noon</li>
                                <li>• 6:00 PM = Evening</li>
                                <li>• 11:59 PM = Late night</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-yellow-400 mb-2">24-Hour Format</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• 00:00 = Midnight</li>
                                <li>• 06:00 = 6:00 AM</li>
                                <li>• 12:00 = Noon</li>
                                <li>• 18:00 = 6:00 PM</li>
                                <li>• 23:59 = 11:59 PM</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs pt-3 border-t border-gray-800 mt-3">
                        Our calculator works with both formats automatically. Simply enter your time in HH:MM format (e.g., 09:00, 17:30, 23:15).
                    </p>
                </div>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <div className="text-2xl mb-1">🏢</div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-1">Work Hours Tracking</h4>
                        <p className="text-xs text-gray-400">Calculate daily work hours, overtime, and total weekly hours. Perfect for timesheets and payroll calculations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <div className="text-2xl mb-1">✈️</div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-1">Travel Planning</h4>
                        <p className="text-xs text-gray-400">Calculate flight durations, layover times, and total travel time. Plan your journey with accurate time estimates.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <div className="text-2xl mb-1">🍳</div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-1">Cooking & Baking</h4>
                        <p className="text-xs text-gray-400">Know exactly when your food will be ready. Add cooking times to your start time for perfect meal planning.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <div className="text-2xl mb-1">📊</div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-1">Project Planning</h4>
                        <p className="text-xs text-gray-400">Calculate task durations, meeting lengths, and project timelines. Stay on schedule with accurate time estimates.</p>
                    </div>
                </div>
            </section>

            {/* Time Calculation Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Time Calculation Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use 24-hour format for clarity:</strong> 24-hour format avoids AM/PM confusion, especially for overnight calculations. Our calculator supports both formats.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Always check for overnight periods:</strong> When calculating time difference, if start time is later than end time, it crosses midnight. Our calculator detects this automatically.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">For work hours, remember lunch breaks:</strong> Calculate your total time at work, then subtract lunch break duration. Example: 9 AM to 5:30 PM (8.5 hours) - 0.5 hour lunch = 8 hours worked.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use minutes for precision:</strong> When calculating time differences, convert everything to minutes for accuracy, then convert back to hours and minutes.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider time zones:</strong> For cross-border calculations, always convert all times to a common time zone (like UTC) before calculating durations.</span>
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
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
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