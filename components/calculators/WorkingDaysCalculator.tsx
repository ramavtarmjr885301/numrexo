"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What are working days?",
        a: "Working days (business days) are Monday through Friday, excluding weekends. Some calculations also exclude public holidays. Our calculator excludes Saturdays and Sundays.",
    },
    {
        q: "How to calculate working days between two dates?",
        a: "Count all days from start to end, then subtract weekends (Saturdays and Sundays). Example: Monday to Friday = 5 working days. Monday to next Monday = 6 working days (excludes the weekend).",
    },
    {
        q: "What is the difference between calendar days and working days?",
        a: "Calendar days include all days of the week. Working days exclude weekends. For project planning, working days are more useful for estimating delivery times.",
    },
    {
        q: "Does the calculator include the start date?",
        a: "Yes, both start and end dates are included in the calculation. For example, Monday to Wednesday counts Monday, Tuesday, Wednesday = 3 working days.",
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
    name: "Working Days Calculator – Business Days Calculator",
    description: "Calculate the number of working days between two dates. Excludes weekends (Saturday & Sunday). Perfect for project planning and delivery estimates.",
    url: "https://www.numrexo.com/time/work-days-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Working days calculation", "Exclude weekends", "Project planning", "Delivery estimates"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://www.numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Working Days Calculator", item: "https://www.numrexo.com/time/work-days-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkingDaysCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            alert("Please select valid start and end dates");
            return;
        }

        if (start > end) {
            alert("Start date must be before end date");
            return;
        }

        let workingDays = 0;
        let totalDays = 0;
        let weekends = 0;
        let current = new Date(start);

        while (current <= end) {
            totalDays++;
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                workingDays++;
            } else {
                weekends++;
            }
            current.setDate(current.getDate() + 1);
        }

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        setResult({
            startDate: start.toLocaleDateString('en-US', options),
            endDate: end.toLocaleDateString('en-US', options),
            workingDays,
            totalDays,
            weekends,
            weeks: Math.floor(totalDays / 7),
            remainingDays: totalDays % 7,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Working Days Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Working Days Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate business days between two dates (Mon-Fri)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">End Date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg">Calculate Working Days →</button>
                    </div>
                </div>

                <ResultBox
                    title="Working Days Result"
                    isEmpty={!result}
                    emptyIcon="💼"
                    emptyText="Select start and end dates"
                    mainResult={result ? { label: "Working Days", value: `${result.workingDays} days`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Days (including weekends)", value: `${result.totalDays} days` },
                        { label: "Weekends", value: `${result.weekends} days`, valueColor: "text-yellow-400" },
                        { label: "Weeks", value: `${result.weeks} weeks + ${result.remainingDays} days` },
                        { label: "Period", value: `${result.startDate} → ${result.endDate}` },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Working Days Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the number of working days (Monday-Friday) between any two dates. Perfect for project planning, delivery estimates, and business timelines.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Quick Examples</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setStartDate("2024-12-16"); setEndDate("2024-12-20"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">Dec 16-20, 2024 (5 working days)</button>
                    <button onClick={() => { setStartDate("2024-12-16"); setEndDate("2024-12-23"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">Dec 16-23, 2024 (6 working days)</button>
                    <button onClick={() => { setStartDate("2024-12-01"); setEndDate("2024-12-31"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">December 2024 (22 working days)</button>
                    <button onClick={() => { setStartDate("2025-01-01"); setEndDate("2025-12-31"); }} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg">Full Year 2025 (~261 working days)</button>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}