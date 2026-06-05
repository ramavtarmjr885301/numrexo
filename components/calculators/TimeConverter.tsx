"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How many seconds in an hour?",
        a: "1 hour = 3,600 seconds. 60 minutes × 60 seconds = 3,600 seconds.",
    },
    {
        q: "How many minutes in a day?",
        a: "1 day = 1,440 minutes. 24 hours × 60 minutes = 1,440 minutes.",
    },
    {
        q: "How to convert milliseconds to seconds?",
        a: "1 second = 1,000 milliseconds. Divide milliseconds by 1,000. Example: 5,000 ms ÷ 1,000 = 5 seconds.",
    },
    {
        q: "What is a leap year?",
        a: "A leap year has 366 days (February 29). Occurs every 4 years, except century years not divisible by 400. 2024 was a leap year, 2028 will be next.",
    },
];

const TIME_UNITS = [
    { value: "millisecond", label: "Millisecond (ms)", toSecond: 0.001 },
    { value: "second", label: "Second (s)", toSecond: 1 },
    { value: "minute", label: "Minute (min)", toSecond: 60 },
    { value: "hour", label: "Hour (h)", toSecond: 3600 },
    { value: "day", label: "Day (d)", toSecond: 86400 },
    { value: "week", label: "Week (wk)", toSecond: 604800 },
    { value: "month", label: "Month (avg)", toSecond: 2629746 },
    { value: "year", label: "Year (avg)", toSecond: 31556952 },
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimeConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("hour");
    const [toUnit, setToUnit] = useState("minute");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { alert("Please enter a valid number"); return; }

        const from = TIME_UNITS.find(u => u.value === fromUnit)!;
        const to = TIME_UNITS.find(u => u.value === toUnit)!;
        const inSeconds = val * from.toSecond;
        const converted = inSeconds / to.toSecond;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(6) });
    };

    const swapUnits = () => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); if (value) setTimeout(convert, 10); };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Time Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Time Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between time measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{TIME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{TIME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <button onClick={convert} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg">Convert →</button>
                    </div>
                </div>

                <ResultBox title="Converted Time" isEmpty={!result} emptyIcon="⏰" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-indigo-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Time Converter</h2><p className="text-gray-400 text-sm leading-relaxed">Convert between milliseconds, seconds, minutes, hours, days, weeks, months, and years. Perfect for scheduling, project planning, and science.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Time Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                        <tbody>
                            <tr><td className="py-2 px-4">1 Hour</td><td className="py-2 px-4">Minutes</td><td className="py-2 px-4 text-yellow-400">60 minutes</td></tr>
                            <tr><td className="py-2 px-4">1 Day</td><td className="py-2 px-4">Hours</td><td className="py-2 px-4 text-yellow-400">24 hours</td></tr>
                            <tr><td className="py-2 px-4">1 Week</td><td className="py-2 px-4">Days</td><td className="py-2 px-4 text-yellow-400">7 days</td></tr>
                            <tr><td className="py-2 px-4">1 Year</td><td className="py-2 px-4">Days</td><td className="py-2 px-4 text-yellow-400">365 days</td></tr>
                        </tbody></table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}