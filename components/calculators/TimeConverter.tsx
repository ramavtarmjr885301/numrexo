"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How many seconds in an hour?",
        a: "1 hour = 3,600 seconds. 60 minutes × 60 seconds = 3,600 seconds. This is one of the most common time conversions used in everyday life - from cooking timers to workout sessions. Remember: 1 hour = 60 minutes = 3,600 seconds. For quick mental math: 1 hour is about 4 minutes × 900 seconds, or 1/24th of a day.",
    },
    {
        q: "How many minutes in a day?",
        a: "1 day = 1,440 minutes. 24 hours × 60 minutes = 1,440 minutes. This equals 86,400 seconds per day. This conversion is useful for planning daily schedules, calculating work hours, and understanding time allocation. A typical workday (8 hours) = 480 minutes. A full week (7 days) = 10,080 minutes.",
    },
    {
        q: "How to convert milliseconds to seconds?",
        a: "1 second = 1,000 milliseconds. Divide milliseconds by 1,000. Example: 5,000 ms ÷ 1,000 = 5 seconds. To convert seconds to milliseconds, multiply by 1,000 (e.g., 3 seconds = 3,000 ms). Milliseconds are used in sports timing (track events), computing (response times), photography (shutter speeds), and scientific measurements.",
    },
    {
        q: "What is a leap year?",
        a: "A leap year has 366 days (February 29). Occurs every 4 years, except century years not divisible by 400. Examples: 2024 was a leap year, 2028 will be next. 1900 was NOT a leap year (divisible by 100 but not 400). 2000 WAS a leap year (divisible by 400). This system keeps our calendar aligned with Earth's orbit around the sun (365.2422 days). Leap years add approximately 5 hours 48 minutes to the year.",
    },
    {
        q: "How many weeks in a year?",
        a: "A year has exactly 52 weeks and 1 day (365 days), or 52 weeks and 2 days in a leap year (366 days). 52 weeks × 7 days = 364 days. The extra day(s) mean that each year starts on a different day of the week. This is why calendars change each year. In business, a fiscal year is often divided into 13 four-week periods or 52 weeks.",
    },
    {
        q: "How many hours in a year?",
        a: "A common year has 8,760 hours (365 × 24). A leap year has 8,784 hours (366 × 24). 8,760 hours includes: Average work hours (2,080 hours for a full-time job), Sleep (2,920 hours at 8 hours/night), Weekends/leisure (2,592 hours), Meals (1,095 hours at 3 hours/day). This perspective helps understand how we spend our annual time.",
    },
    {
        q: "What is the difference between calendar month and lunar month?",
        a: "Calendar month (standard): 28-31 days based on the Gregorian calendar. Lunar month (moon cycle): 29.53 days (new moon to new moon). 12 lunar months = 354.36 days (11 days shorter than a solar year). This is why Islamic holidays shift through the seasons. Our converter uses average calendar month (30.44 days) for simplicity. For precise calculations, use specific months or lunar calendars.",
    },
    {
        q: "How to convert between time zones?",
        a: "Time zones are based on UTC (Coordinated Universal Time). To convert: 1) Find your UTC offset (e.g., EST = UTC-5, IST = UTC+5:30), 2) Add/subtract the difference. Example: EST (12:00) to IST (+9:30) = 12:00 + 9:30 = 21:30 (9:30 PM). Key time zones: UTC (London), EST (NYC), PST (LA), IST (India), JST (Japan), AEST (Australia). Our converter focuses on time units, not time zones.",
    },
    {
        q: "What is the ISO standard for time?",
        a: "ISO 8601 is the international standard for date and time representation: YYYY-MM-DD for dates, and HH:MM:SS for times. Example: 2024-08-15T14:30:00. This format is unambiguous and used in computing, databases, and international communication. Advantages: 1) Chronological sorting works automatically, 2) No confusion between US (MM/DD) and UK (DD/MM) formats, 3) Includes timezone info (e.g., 2024-08-15T14:30:00Z for UTC).",
    },
    {
        q: "How to calculate time between two dates?",
        a: "Time between dates = Date2 - Date1. Steps: 1) Convert both dates to a common unit (e.g., days since epoch), 2) Subtract. Example: Jan 1 to Dec 31 = 365 days (non-leap). For precise calculations: Include time of day (hours/minutes/seconds), Account for leap years, Daylight Saving Time changes, Time zone differences. Our converter handles unit conversions; for date calculations, use our dedicated date calculator or use online date difference tools.",
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
    name: "Time Converter – Convert Time Units",
    description: "Convert between milliseconds, seconds, minutes, hours, days, weeks, months, and years.",
    url: "https://www.numrexo.com/conversion/time-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["8 time units", "Seconds to hours", "Days to years", "Precise conversion"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://www.numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Time Converter", item: "https://www.numrexo.com/conversion/time-converter" },
    ],
});

const TIME_UNITS = [
    { value: "millisecond", label: "Millisecond (ms)", toSecond: 0.001, emoji: "⚡" },
    { value: "second", label: "Second (s)", toSecond: 1, emoji: "⏱️" },
    { value: "minute", label: "Minute (min)", toSecond: 60, emoji: "⏰" },
    { value: "hour", label: "Hour (h)", toSecond: 3600, emoji: "🕐" },
    { value: "day", label: "Day (d)", toSecond: 86400, emoji: "📅" },
    { value: "week", label: "Week (wk)", toSecond: 604800, emoji: "📆" },
    { value: "month", label: "Month (avg)", toSecond: 2629746, emoji: "📊" },
    { value: "year", label: "Year (avg)", toSecond: 31556952, emoji: "🎯" },
];

const TIME_REFERENCES = [
    { unit: "Millisecond", value: "1/1,000 second", example: "Camera shutter speed" },
    { unit: "Second", value: "1 second", example: "Heartbeat" },
    { unit: "Minute", value: "60 seconds", example: "Short break" },
    { unit: "Hour", value: "60 minutes", example: "TV episode" },
    { unit: "Day", value: "24 hours", example: "One rotation" },
    { unit: "Week", value: "7 days", example: "Calendar week" },
    { unit: "Month", value: "30.44 days", example: "Calendar month" },
    { unit: "Year", value: "365.24 days", example: "Earth orbit" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimeConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("hour");
    const [toUnit, setToUnit] = useState("minute");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setValue("");
        setFromUnit("hour");
        setToUnit("minute");
        setResult(null);
    };

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            alert("Please enter a valid number");
            return;
        }

        const from = TIME_UNITS.find(u => u.value === fromUnit)!;
        const to = TIME_UNITS.find(u => u.value === toUnit)!;
        const inSeconds = val * from.toSecond;
        const converted = inSeconds / to.toSecond;

        setResult({
            value: val,
            fromUnit: from.label,
            toUnit: to.label,
            converted: converted.toFixed(6),
            fromEmoji: from.emoji,
            toEmoji: to.emoji,
        });
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        if (value) setTimeout(convert, 10);
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
                        <span itemProp="name" className="text-gray-300">Time Converter</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Time Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert between time measurement units</p>
                    </div>
                    <div className="p-6 space-y-4">
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
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                >
                                    {TIME_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={swapUnits}
                                className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all text-xl"
                                aria-label="Swap units"
                            >
                                🔄
                            </button>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-400 mb-2">To</label>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                >
                                    {TIME_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.emoji} {u.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={convert}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all"
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
                    title="Converted Time"
                    isEmpty={!result}
                    emptyIcon="⏰"
                    emptyText="Enter value and press Convert"
                    mainResult={result ? {
                        label: `${result.fromEmoji} ${result.value} ${result.fromUnit} =`,
                        value: `${result.converted} ${result.toUnit}`,
                        color: "text-indigo-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "From", value: result.fromUnit },
                        { label: "To", value: result.toUnit },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Time Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Time Converter</strong> is a comprehensive tool for converting between different time units. Convert between milliseconds, seconds, minutes, hours, days, weeks, months, and years with high precision.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Time conversion is essential in many fields: Project planning (estimating durations), Science and engineering (calculating speeds, frequencies), Scheduling (converting between time zones and units), and Daily life (cooking, workouts, travel planning).
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our converter handles 8 common time units with precise conversion factors. Whether you're converting milliseconds to minutes or days to years, you'll get accurate results instantly.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Time Converter</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">time value</strong> you want to convert.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">"From"</strong> unit (millisecond to year).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">"To"</strong> unit (millisecond to year).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Convert"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">"Swap"</strong> (🔄) to quickly reverse the conversion.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Time Converter?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2">✓ Project Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between hours, days, and weeks for project timelines. Calculate deadlines and milestones with precision.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Scientific Calculations</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert between milliseconds, seconds, and minutes for physics, engineering, and data analysis applications.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Travel Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand flight durations, layover times, and itinerary planning. Convert between hours and minutes easily.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Daily Life</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Convert cooking times, workout durations, and daily schedules. Understand how you spend your time.</p>
                    </div>
                </div>
            </section>

            {/* Time Reference Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Time Unit Reference</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Unit</th>
                                <th className="text-left py-3 px-4 text-gray-400">Value in Seconds</th>
                                <th className="text-left py-3 px-4 text-gray-400">Example Use</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TIME_REFERENCES.map((ref, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-gray-300">{ref.unit}</td>
                                    <td className="py-2 px-4 text-yellow-400 font-mono">{ref.value}</td>
                                    <td className="py-2 px-4 text-gray-400">{ref.example}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Month and year values are averages. Actual months vary (28-31 days) and years can be 365 or 366 days.
                    </p>
                </div>
            </section>

            {/* Common Conversions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Time Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">From</th>
                                <th className="text-left py-3 px-4 text-gray-400">To</th>
                                <th className="text-left py-3 px-4 text-gray-400">Value</th>
                                <th className="text-left py-3 px-4 text-gray-400">Formula</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 Hour</td>
                                <td className="py-2 px-4 text-gray-300">Minutes</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">60 minutes</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">× 60</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 Day</td>
                                <td className="py-2 px-4 text-gray-300">Hours</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">24 hours</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">× 24</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 Week</td>
                                <td className="py-2 px-4 text-gray-300">Days</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">7 days</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">× 7</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 Year</td>
                                <td className="py-2 px-4 text-gray-300">Days</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">365 days</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">× 365</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 Second</td>
                                <td className="py-2 px-4 text-gray-300">Milliseconds</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">1,000 ms</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">× 1,000</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1 Month</td>
                                <td className="py-2 px-4 text-gray-300">Days</td>
                                <td className="py-2 px-4 text-yellow-400 font-mono">30.44 days</td>
                                <td className="py-2 px-4 text-gray-500 text-xs">Average</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Month value is an average (365.24 days ÷ 12 months = 30.44 days/month).
                    </p>
                </div>
            </section>

            {/* Time Facts */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Interesting Time Facts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-indigo-500/30 transition-all">
                        <div className="text-2xl mb-1">🌍</div>
                        <h4 className="text-sm font-semibold text-indigo-400 mb-1">Earth's Rotation</h4>
                        <p className="text-xs text-gray-400">One day is actually 23 hours, 56 minutes, 4 seconds (sidereal day). We use 24-hour solar days for convenience.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-indigo-500/30 transition-all">
                        <div className="text-2xl mb-1">⏳</div>
                        <h4 className="text-sm font-semibold text-indigo-400 mb-1">Leap Seconds</h4>
                        <p className="text-xs text-gray-400">Occasionally, leap seconds are added to keep atomic clocks aligned with Earth's slowing rotation. 27 leap seconds have been added since 1972.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-indigo-500/30 transition-all">
                        <div className="text-2xl mb-1">📅</div>
                        <h4 className="text-sm font-semibold text-indigo-400 mb-1">Calendar History</h4>
                        <p className="text-xs text-gray-400">The Gregorian calendar (introduced 1582) improved the Julian calendar by adjusting leap years. It's now used by most countries worldwide.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-indigo-500/30 transition-all">
                        <div className="text-2xl mb-1">🧪</div>
                        <h4 className="text-sm font-semibold text-indigo-400 mb-1">Atomic Time</h4>
                        <p className="text-xs text-gray-400">Atomic clocks measure time using cesium-133 atoms. They're accurate to 1 second in 100 million years. UTC is based on atomic time.</p>
                    </div>
                </div>
            </section>

            {/* Conversion Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Time Conversion Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Remember the base conversions:</strong> 60 seconds = 1 minute, 60 minutes = 1 hour, 24 hours = 1 day. These are the foundation of all time conversions.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use decimal for precision:</strong> For exact conversions, use decimals. Example: 2.5 hours = 150 minutes (2.5 × 60). This avoids rounding errors.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Month conversion varies:</strong> Months have 28-31 days. Use "average month" (30.44 days) for approximations. For exact calculations, specify the actual months.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check leap years:</strong> When calculating year-based conversions, consider if the period includes a leap year (366 days). Every 4th year is a leap year (except century years).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use for productivity:</strong> Convert tasks from minutes to hours to better understand time allocation. Example: 30 minutes/day = 182.5 hours/year.</span>
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