"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate a future date?",
        a: "Add the number of days to the starting date. Example: Jan 1 + 30 days = Jan 31. Our calculator handles months with different lengths and leap years automatically.",
    },
    {
        q: "What is the difference between business days and calendar days?",
        a: "Calendar days include weekends and holidays. Business days (working days) exclude weekends (Saturday & Sunday). Some calculators also exclude public holidays.",
    },
    {
        q: "How to calculate a past date?",
        a: "Subtract days from the starting date. Example: Jan 31 - 30 days = Jan 1. Our calculator supports both future and past date calculations.",
    },
    {
        q: "Does the calculator account for leap years?",
        a: "Yes, our calculator automatically accounts for leap years (February 29) when adding or subtracting days across multiple years.",
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
    name: "Add Days to Date Calculator – Future Date Calculator",
    description: "Calculate future or past dates by adding or subtracting days. Perfect for deadlines, pregnancy due dates, and project planning.",
    url: "https://www.numrexo.com/time/add-days-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Add days to date", "Subtract days from date", "Leap year support", "Future and past dates"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://www.numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Add Days to Date Calculator", item: "https://www.numrexo.com/time/add-days-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddDaysCalculator() {
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState("");
    const [operation, setOperation] = useState<"add" | "subtract">("add");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        if (!startDate) {
            alert("Please select a start date");
            return;
        }

        const daysNum = parseInt(days);
        if (isNaN(daysNum)) {
            alert("Please enter a valid number of days");
            return;
        }

        const date = new Date(startDate);
        if (operation === "add") {
            date.setDate(date.getDate() + daysNum);
        } else {
            date.setDate(date.getDate() - daysNum);
        }

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        setResult({
            startDate: new Date(startDate).toLocaleDateString('en-US', options),
            resultDate: date.toLocaleDateString('en-US', options),
            daysAdded: daysNum,
            operation,
            dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
        });
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Add Days to Date Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Add or Subtract Days</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate future or past dates</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Operation</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${operation === "add" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("add")}>Add Days</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${operation === "subtract" ? "bg-orange-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setOperation("subtract")}>Subtract Days</button>
                            </div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Days</label><input type="number" placeholder="30" value={days} onChange={(e) => setDays(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                    </div>
                </div>

                <ResultBox
                    title="Result Date"
                    isEmpty={!result}
                    emptyIcon="📅"
                    emptyText="Enter date and days to calculate"
                    mainResult={result ? { label: `${operation === "add" ? "New Date" : "Past Date"}`, value: result.resultDate, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Start Date", value: result.startDate },
                        { label: "Day of Week", value: result.dayOfWeek, valueColor: "text-yellow-400" },
                        { label: "Days", value: `${operation === "add" ? "Added" : "Subtracted"}: ${result.daysAdded}` },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Add Days to Date Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate future or past dates by adding or subtracting days. Perfect for deadlines, project planning, pregnancy due dates, and countdowns.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Examples</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setStartDate(new Date().toISOString().split('T')[0]); setDays("30"); setOperation("add"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">30 days from today</button>
                    <button onClick={() => { setStartDate(new Date().toISOString().split('T')[0]); setDays("90"); setOperation("add"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">90 days from today</button>
                    <button onClick={() => { setStartDate("2024-12-25"); setDays("7"); setOperation("add"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">1 week after Christmas</button>
                    <button onClick={() => { setStartDate("2024-01-01"); setDays("30"); setOperation("add"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">30 days after New Year</button>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}