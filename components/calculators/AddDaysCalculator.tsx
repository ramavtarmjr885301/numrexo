"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I work out a date a set number of days from now?",
        a: "Pick the start date, type the number of days, and choose add or subtract. The calculator moves across month ends and leap years for you, which is where hand-counting usually goes wrong — 31 January plus 30 days is 2 March in a normal year and 1 March in a leap year.",
    },
    {
        q: "Does day one count as the start date or the day after?",
        a: "This is the mistake that costs people deadlines. Here, adding 30 days to 1 January gives 31 January — the start date is day zero, and the count begins the following day. Contracts and court rules often say the opposite, counting the start date as day one. If a document specifies a method, follow the document; if it does not, most jurisdictions default to excluding the first day and including the last.",
    },
    {
        q: "What is the difference between calendar days and business days?",
        a: "Calendar days count everything. Business days skip Saturdays and Sundays, and usually public holidays too. A '30-day' notice period is almost always calendar days, while a '10-day' processing time from a bank or government office is almost always business days — and the two can be three weeks apart. This calculator counts calendar days.",
    },
    {
        q: "How do I count backwards to find a deadline?",
        a: "Choose subtract and enter the number of days. This is how you find the last date to give notice: take the date the notice has to land, subtract the notice period, and you have the day it must go out. Give yourself a margin if it is going by post.",
    },
    {
        q: "Does it handle leap years?",
        a: "Yes. February gets its 29th day in leap years automatically, so a span that crosses one lands a day later than the same span in an ordinary year. Century years are handled correctly too: 1900 was not a leap year, 2000 was, and 2100 will not be.",
    },
    {
        q: "What are the usual reasons people need this?",
        a: "Notice periods on a lease or an employment contract, return and refund windows, warranty expiry, visa validity, probation end dates, project milestones counted from a kick-off, and prescription refill dates. In each case the answer needs to be a date, not an approximation.",
    },
    {
        q: "How many days are in a month for this calculation?",
        a: "The real number. The calculator moves through the actual calendar rather than assuming 30-day months, so adding 90 days to 1 January gives 1 April in a normal year, while adding three months would also give 1 April — the two agree here and often do not. If a contract says months, count months; if it says days, count days.",
    },
    {
        q: "Can I find the date a specific number of weeks away?",
        a: "Multiply by seven and enter that. Twelve weeks is 84 days, and because it is a whole number of weeks the answer always falls on the same weekday as the start date — useful for anything scheduled fortnightly or monthly-by-weeks.",
    },
    {
        q: "Why does the weekday matter in the result?",
        a: "Because a deadline that lands on a weekend or a public holiday usually rolls to the next working day, and in a few contexts back to the previous one. The result shows the weekday so you can spot that immediately rather than after the fact.",
    },
    {
        q: "Is anything I enter saved?",
        a: "No. The date arithmetic happens in your browser and nothing leaves it.",
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
    url: "https://numrexo.com/time/add-days-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Add days to date", "Subtract days from date", "Leap year support", "Future and past dates"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Add Days to Date Calculator", item: "https://numrexo.com/time/add-days-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddDaysCalculator() {
    const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [days, setDays] = useState("30");
    const [operation, setOperation] = useState<"add" | "subtract">("add");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        if (!startDate) {
            setResult(null);
            return;
        }

        const daysNum = parseInt(days);
        if (isNaN(daysNum)) {
            setResult(null);
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

    const resetForm = () => {
        setStartDate("");
        setDays("");
        setOperation("add");
        setResult(null);
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [startDate, days, operation]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a><meta itemProp="position" content="2" /></li>
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
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Date Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Add or subtract days from any date and get the answer as a date and a weekday. It walks the real
                    calendar — actual month lengths, leap years, century rules — rather than assuming 30-day months,
                    which is where counting on your fingers tends to fall over.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Most people arrive here with a deadline: a notice period, a return window, a visa validity, a
                    probation end date. For those, the weekday in the result is worth as much as the date itself.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">The Off-by-One Problem</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        The single most common error in date arithmetic is disagreeing about whether the start date
                        counts as day one.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside mb-3">
                        <li>This calculator treats the start date as day zero: 1 January + 30 days = <span className="text-white">31 January</span>.</li>
                        <li>Counting the start date as day one gives <span className="text-white">30 January</span> for the same span.</li>
                    </ul>
                    <p className="text-gray-500 text-xs">
                        A day either way rarely matters for a holiday countdown and matters a great deal for a legal
                        notice. If a contract sets out how to count, follow it. Where nothing is stated, the common
                        convention is to exclude the first day and include the last.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Calendar Days vs Business Days</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Span</th><th className="text-right py-3 px-4 text-gray-400">Calendar days</th><th className="text-right py-3 px-4 text-gray-400">Roughly, in business days</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">One week</td><td className="py-2 px-4 text-right">7</td><td className="py-2 px-4 text-right">5</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Two weeks</td><td className="py-2 px-4 text-right">14</td><td className="py-2 px-4 text-right">10</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">One month</td><td className="py-2 px-4 text-right">30</td><td className="py-2 px-4 text-right">21-22</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Three months</td><td className="py-2 px-4 text-right">90</td><td className="py-2 px-4 text-right">64-65</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    This calculator counts calendar days. Business-day figures above exclude weekends only — public
                    holidays would shorten them further, and they differ by country.
                </p>
            </section>

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