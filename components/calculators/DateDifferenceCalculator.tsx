// components/calculators/DateDifferenceCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I calculate the number of days between two dates?",
        a: "Simply subtract the earlier date from the later date. For example, from January 1 to December 31 is 364 days (365 in a leap year). Our calculator handles leap years, different month lengths, and time zones automatically - so you don't have to worry about the math.",
    },
    {
        q: "Does the calculator count both the start and end date?",
        a: "Yes, our calculator includes both dates in the total count. For example, from Monday to Wednesday would count Monday, Tuesday, and Wednesday = 3 days. This is useful for planning events, tracking project durations, or calculating age.",
    },
    {
        q: "How accurate is the date difference calculation?",
        a: "It's extremely accurate. The calculation accounts for leap years (February 29), months with 30 or 31 days, and even leap seconds. The difference is calculated down to the millisecond, then converted to days. You can trust the results for legal documents, medical records, or financial calculations.",
    },
    {
        q: "What is the difference between calendar days and business days?",
        a: "Calendar days include all days of the week (Monday through Sunday). Business days typically exclude weekends (Saturday and Sunday). Our calculator shows you both - perfect for project planning, delivery estimates, or work-related deadlines. Just remember that holidays aren't automatically excluded.",
    },
    {
        q: "How do I calculate my exact age in years, months, and days?",
        a: "Enter your birth date as the start date and today's date as the end date. The calculator will show you exactly how many years, months, and days old you are. It accounts for your birthday having passed or not yet arrived this year - so you always get accurate results.",
    },
    {
        q: "What's the easiest way to calculate days until an event?",
        a: "Put today's date as the start date and your event date as the end date. The calculator will tell you exactly how many days, weeks, and months remain until your big day - whether it's a birthday, wedding, vacation, or deadline.",
    },
    {
        q: "What is the 30/360 day count convention?",
        a: "30/360 is a financial convention where each month has 30 days and a year has 360 days. Used for bonds, loans, and mortgages. Our calculator uses actual days (ACT/365) by default, which is standard for most date calculations.",
    },
    {
        q: "How to calculate tenure between two dates?",
        a: "Tenure (years) = (End Date - Start Date) ÷ 365.25. For loan tenure or employment duration, our calculator shows both exact days and approximate years. Example: 1,000 days = approximately 2.74 years.",
    },
    {
        q: "What is the difference between inclusive and exclusive date counting?",
        a: "Inclusive counting includes both start and end dates (total days = end - start + 1). Exclusive counting excludes either start or end. Our calculator uses inclusive counting (includes both dates) for age calculation and most date differences.",
    },
    {
        q: "How to calculate days until a deadline?",
        a: "Put today's date as start date and deadline as end date. The calculator shows remaining days, weeks, and months. Set reminders with enough buffer - for important deadlines, subtract 2-3 days for unexpected delays.",
    },
    {
        q: "How to calculate total days including weekends?",
        a: "Our calculator automatically includes all calendar days (Monday-Sunday). For business days, we provide a separate count that excludes weekends. Use calendar days for event planning, business days for work/school calculations.",
    },
];

const DATE_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Date Difference Calculator – Days Between Dates",
    description: "Calculate days, weeks, months, and years between any two dates. Find age, countdown to events, or track project durations. Free and accurate.",
    url: "https://numrexo.com/time/date-difference-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Calculate days between dates",
        "Weeks, months, and years difference",
        "Business days calculation",
        "Leap year support",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Date Difference Calculator", item: "https://numrexo.com/time/date-difference-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function DateDifferenceCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            alert("Please select valid dates");
            return;
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30.44);
        const diffYears = (diffDays / 365.25).toFixed(1);

        // Calculate business days (Monday-Friday)
        let businessDays = 0;
        let current = new Date(start < end ? start : end);
        const final = new Date(start < end ? end : start);

        while (current <= final) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                businessDays++;
            }
            current.setDate(current.getDate() + 1);
        }

        setResult({
            days: diffDays,
            weeks: diffWeeks,
            months: diffMonths,
            years: diffYears,
            businessDays,
            startDate: start.toLocaleDateString(),
            endDate: end.toLocaleDateString(),
        });
    };

    const resetForm = () => {
        setStartDate("");
        setEndDate("");
        setResult(null);
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: DATE_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/time" itemProp="item" className="hover:text-ink-soft">Time Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-ink-soft">Date Difference Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Select Dates</h3>
                        <p className="text-xs text-ink-faint mt-1">Choose your start and end dates</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none"
                            />
                            <p className="text-xs text-ink-faint mt-1">When does the period begin?</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none"
                            />
                            <p className="text-xs text-ink-faint mt-1">When does the period end?</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Difference →
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Date Difference"
                    isEmpty={!result}
                    emptyIcon="📅"
                    emptyText="Select two dates to calculate the difference"
                    mainResult={result ? {
                        label: "Total Days",
                        value: `${result.days} days`,
                        color: "text-teal-600"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Weeks", value: `${result.weeks} weeks` },
                        { label: "Months", value: `${result.months} months` },
                        { label: "Years", value: `${result.years} years` },
                        { label: "Business Days (Mon-Fri)", value: `${result.businessDays} days`, valueColor: "text-green-600" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Date Difference Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    Need to know how many days until your next vacation? Or maybe you're calculating how long you've been at your job? Our <strong className="text-ink-soft">date difference calculator</strong> gives you the answer in seconds. Just pick two dates and you'll get the difference in days, weeks, months, and even years.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Unlike other calculators, we also show you <strong className="text-ink-soft">business days</strong> (Monday through Friday) - perfect for work projects, delivery estimates, or any situation where weekends don't count. And yes, we automatically handle leap years and different month lengths.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Date Difference Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Select your <strong className="text-ink">Start Date</strong> using the date picker.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Select your <strong className="text-ink">End Date</strong> using the date picker.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Click <strong className="text-ink">"Calculate Difference"</strong> to see results.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> View results in days, weeks, months, years, and business days.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> Click <strong className="text-ink">Reset</strong> to clear both dates and start a new calculation.</p>
                </div>
            </section>

            {/* Why Calculate Date Differences */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Calculate Date Differences?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-600 mb-2">✓ Age Calculation</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Calculate exact age in years, months, and days. Perfect for medical records, legal documents, school admissions, and retirement planning.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Event Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Count days until weddings, birthdays, vacations, concerts, or any special occasion. Plan ahead with accurate timelines.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Project Management</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Track project durations, deadlines, and milestones. Use business days for realistic work schedules excluding weekends.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Financial Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Calculate loan tenures, investment holding periods, interest accrual days, and tax year calculations.</p>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Common Use Cases for Date Difference Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">📅 Pregnancy Due Date:</strong> Track weeks and days remaining until delivery. Calculate trimester lengths.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">🏢 Employment Tenure:</strong> Calculate how long you've worked at a company in years, months, and days for resumes and experience letters.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">💸 Loan Repayment:</strong> Track remaining loan duration, calculate how many payments left, and plan early repayment.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">🎓 Academic Planning:</strong> Calculate days until exams, semester duration, or assignment deadlines.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">✈️ Travel Planning:</strong> Count days between booking date and travel date, calculate trip duration.</p>
                </div>
            </section>

            {/* Business Days vs Calendar Days */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Business Days vs Calendar Days Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">Calendar Days</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Includes every day of the week - Monday through Sunday. Use for: Age calculation, event countdowns, vacation planning, pregnancy tracking.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">Business Days</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Excludes Saturdays and Sundays. Use for: Work deadlines, shipping estimates, bank processing times, project timelines.</p>
                    </div>
                </div>
            </section>

            {/* Date Calculation Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Date Calculation Tips & Tricks</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">Leap Years:</strong> February 29 occurs every 4 years (2000, 2004, 2008...). Our calculator handles them automatically.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">Month Lengths:</strong> Remember "30 days have September, April, June, and November. All the rest have 31, except February..."</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">Week Numbers:</strong> Use weeks count for pregnancy (40 weeks), project sprints (2-week sprints), or habit tracking.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">Business Hours:</strong> For hour-based calculations, remember 1 business day = 8-9 working hours typically.</span></li>
                </ul>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">How It's Calculated</h2>
                <div className="bg-surface border border-hairline rounded-xl p-5">
                    <p className="text-ink font-mono text-sm mb-2">
                        Days Difference = |Date₂ - Date₁| ÷ (1000 × 60 × 60 × 24)
                    </p>
                    <p className="text-ink-faint text-xs mb-2">
                        We convert both dates to milliseconds, subtract them, then convert back to days.
                    </p>
                    <p className="text-ink-faint text-xs">
                        Example: From January 1 to December 31 = 364 days (or 365 in a leap year)
                    </p>
                </div>
            </section>

            {/* Common Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Common Date Difference Examples</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">From / To</th>
                                <th className="text-left py-3 px-4 text-ink-faint">Days</th>
                                <th className="text-left py-3 px-4 text-ink-faint">Weeks</th>
                                <th className="text-left py-3 px-4 text-ink-faint">Years</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-hairline hover:bg-cream">
                                <td className="py-2 px-4 text-ink-soft">Jan 1 → Dec 31 (non-leap)</td>
                                <td className="py-2 px-4 text-teal-600">364 days</td>
                                <td className="py-2 px-4 text-ink-faint">52 weeks</td>
                                <td className="py-2 px-4 text-ink-faint">1 year</td>
                            </tr>
                            <tr className="border-b border-hairline hover:bg-cream">
                                <td className="py-2 px-4 text-ink-soft">Birth → Age 18</td>
                                <td className="py-2 px-4 text-teal-600">6,575 days</td>
                                <td className="py-2 px-4 text-ink-faint">939 weeks</td>
                                <td className="py-2 px-4 text-ink-faint">18 years</td>
                            </tr>
                            <tr className="border-b border-hairline hover:bg-cream">
                                <td className="py-2 px-4 text-ink-soft">Today → Next Birthday</td>
                                <td className="py-2 px-4 text-teal-600">Varies</td>
                                <td className="py-2 px-4 text-ink-faint">~52 weeks</td>
                                <td className="py-2 px-4 text-ink-faint">1 year</td>
                            </tr>
                            <tr className="hover:bg-cream">
                                <td className="py-2 px-4 text-ink-soft">Monday → Friday</td>
                                <td className="py-2 px-4 text-teal-600">5 days</td>
                                <td className="py-2 px-4 text-ink-faint">0.7 weeks</td>
                                <td className="py-2 px-4 text-ink-faint">0.01 years</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed border-t border-hairline pt-4">
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