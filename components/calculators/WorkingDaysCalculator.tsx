"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What are working days?",
        a: "Working days (business days) are Monday through Friday, excluding weekends. Some calculations also exclude public holidays. Our calculator excludes Saturdays and Sundays. Working days are used in business contexts for project deadlines, delivery estimates, and work schedules. The standard work week in most countries is 5 working days (Monday to Friday).",
    },
    {
        q: "How to calculate working days between two dates?",
        a: "Count all days from start to end, then subtract weekends (Saturdays and Sundays). Example: Monday to Friday = 5 working days. Monday to next Monday = 6 working days (excludes the weekend). Our calculator does this automatically - just select your start and end dates. Both the start and end dates are included in the count.",
    },
    {
        q: "What is the difference between calendar days and working days?",
        a: "Calendar days include all days of the week (Monday through Sunday). Working days exclude weekends (Saturday and Sunday). For project planning, working days are more useful for estimating delivery times because work typically doesn't happen on weekends. Example: 7 calendar days = 5 working days (Monday-Friday).",
    },
    {
        q: "Does the calculator include the start date?",
        a: "Yes, both start and end dates are included in the calculation. For example, Monday to Wednesday counts Monday, Tuesday, Wednesday = 3 working days. This is standard for date difference calculations. If you want to exclude the start date, you can manually adjust your end date to the day before.",
    },
    {
        q: "How many working days are in a year?",
        a: "A typical year has approximately 260-262 working days. This includes: 365 days - 104 weekend days (52 weeks × 2) - 10-12 public holidays = 249-253 working days depending on your country. In the US, 2025 has 251 working days. In the UK, it's about 253 working days. Our calculator helps you calculate exact working days for any date range.",
    },
    {
        q: "Do public holidays affect working days?",
        a: "This calculator excludes weekends only (Saturday and Sunday). Public holidays vary by country, state, and organization. For example: US federal holidays (10-11 days), UK bank holidays (8-10 days), India has 21 public holidays. If you need to exclude public holidays, you'll need to manually account for them based on your location.",
    },
    {
        q: "What is a standard work week?",
        a: "A standard work week is typically 5 working days (Monday-Friday) with 40 hours (8 hours/day). Some countries have different work weeks: France: 35 hours, UAE: Monday-Friday (with Friday-Saturday weekend), Israel: Sunday-Thursday, Saudi Arabia: Sunday-Thursday. Our calculator uses the Monday-Friday standard, which is most common globally.",
    },
    {
        q: "How are working days used in business?",
        a: "Working days are used in business for: 1) Project deadlines and milestones, 2) Delivery estimates (shipping times), 3) Payment terms (net 30 days means 30 calendar days), 4) Leave and attendance tracking, 5) Service level agreements (SLAs), 6) Contract duration calculations, 7) Software development sprints, 8) Invoice and payment processing.",
    },
    {
        q: "What is the difference between business days and working days?",
        a: "Business days and working days are often used interchangeably. Both typically mean Monday-Friday, excluding weekends. However, in some contexts: Business days may also exclude public holidays, Working days may include days when work is actually performed (including some Saturdays in certain industries), Business days are more common in legal and financial contexts.",
    },
    {
        q: "How to calculate working days for shipping?",
        a: "For shipping estimates: 1) Count only business days (Monday-Friday), 2) Exclude weekends, 3) Some services count the pickup day as day 1, 4) Overnight shipping = 1 business day, 5) 2-day shipping = 2 business days, 6) Standard shipping = 3-5 business days. Always check with the carrier for their specific business day definition.",
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

const MONTHLY_WORKING_DAYS = [
    { month: "January", workingDays: "22-23", notes: "New Year's Day holiday" },
    { month: "February", workingDays: "20-21", notes: "Shortest month" },
    { month: "March", workingDays: "21-22", notes: "No major holidays" },
    { month: "April", workingDays: "21-22", notes: "Easter/Spring holidays" },
    { month: "May", workingDays: "21-22", notes: "Memorial Day (US)" },
    { month: "June", workingDays: "21-22", notes: "Summer starts" },
    { month: "July", workingDays: "22-23", notes: "Independence Day (US)" },
    { month: "August", workingDays: "22-23", notes: "Summer holidays" },
    { month: "September", workingDays: "21-22", notes: "Labor Day (US)" },
    { month: "October", workingDays: "22-23", notes: "Columbus Day (US)" },
    { month: "November", workingDays: "20-21", notes: "Thanksgiving (US)" },
    { month: "December", workingDays: "21-22", notes: "Christmas holidays" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkingDaysCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setStartDate("");
        setEndDate("");
        setResult(null);
    };

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

        // Calculate weeks breakdown
        const weeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;

        setResult({
            startDate: start.toLocaleDateString('en-US', options),
            endDate: end.toLocaleDateString('en-US', options),
            workingDays,
            totalDays,
            weekends,
            weeks,
            remainingDays,
            startDateRaw: startDate,
            endDateRaw: endDate,
        });
    };

    // Helper to set quick examples
    const setExample = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        // Auto-calculate after setting
        setTimeout(() => {
            const s = new Date(start);
            const e = new Date(end);
            if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && s <= e) {
                calculate();
            }
        }, 50);
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
                        <a href="https://www.numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Working Days Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Working Days Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate business days between two dates (Mon-Fri)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Working Days →
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
                    title="Working Days Result"
                    isEmpty={!result}
                    emptyIcon="💼"
                    emptyText="Select start and end dates"
                    mainResult={result ? { label: "Working Days", value: `${result.workingDays} days`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Days (including weekends)", value: `${result.totalDays} days` },
                        { label: "Weekends", value: `${result.weekends} days`, valueColor: "text-yellow-400" },
                        { label: "Weeks Breakdown", value: `${result.weeks} weeks + ${result.remainingDays} days` },
                        { label: "Period", value: `${result.startDate} → ${result.endDate}` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Working Days Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Working Days Calculator</strong> helps you calculate the number of business days (Monday-Friday) between any two dates. Perfect for project planning, delivery estimates, and business timelines.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Unlike calendar days which include weekends, working days are more useful for business contexts where work typically doesn't happen on Saturdays and Sundays. Both the start and end dates are included in the calculation.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're estimating project completion dates, shipping delivery times, or calculating work periods, this calculator provides accurate working day counts instantly.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Working Days Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select your <strong className="text-white">start date</strong> using the date picker.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select your <strong className="text-white">end date</strong> using the date picker.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Working Days"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Review your <strong className="text-white">working days, total days, and weekend days</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use the quick example buttons to test the calculator.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Working Days Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Project Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Estimate project completion dates accurately. Know exactly how many working days you have to complete deliverables.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Delivery Estimates</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate shipping and delivery times. Know when packages will arrive based on business days.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Work Schedule Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan work schedules, shifts, and staffing needs. Understand how many working days are available.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Contract Deadlines</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate business day deadlines for contracts, payments, and legal documents. Ensure compliance with timelines.</p>
                    </div>
                </div>
            </section>

            {/* Quick Examples */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => setExample("2024-12-16", "2024-12-20")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-green-500/50 transition-all"
                    >
                        📅 Dec 16-20, 2024<br /><span className="text-gray-500 text-xs">5 working days</span>
                    </button>
                    <button
                        onClick={() => setExample("2024-12-16", "2024-12-23")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-green-500/50 transition-all"
                    >
                        📅 Dec 16-23, 2024<br /><span className="text-gray-500 text-xs">6 working days</span>
                    </button>
                    <button
                        onClick={() => setExample("2024-12-01", "2024-12-31")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-green-500/50 transition-all"
                    >
                        📅 December 2024<br /><span className="text-gray-500 text-xs">22 working days</span>
                    </button>
                    <button
                        onClick={() => setExample("2025-01-01", "2025-12-31")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-green-500/50 transition-all"
                    >
                        📅 Full Year 2025<br /><span className="text-gray-500 text-xs">~261 working days</span>
                    </button>
                    <button
                        onClick={() => setExample("2025-01-01", "2025-01-15")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-green-500/50 transition-all"
                    >
                        📅 Jan 1-15, 2025<br /><span className="text-gray-500 text-xs">10 working days</span>
                    </button>
                    <button
                        onClick={() => setExample("2025-02-01", "2025-02-28")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-green-500/50 transition-all"
                    >
                        📅 February 2025<br /><span className="text-gray-500 text-xs">20 working days</span>
                    </button>
                </div>
            </section>

            {/* Monthly Working Days Reference */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Working Days by Month (2025)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Month</th>
                                <th className="text-left py-3 px-4 text-gray-400">Working Days</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MONTHLY_WORKING_DAYS.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-gray-300">{row.month}</td>
                                    <td className="py-2 px-4 text-yellow-400">{row.workingDays}</td>
                                    <td className="py-2 px-4 text-gray-500 text-xs">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Approximate working days per month (excluding weekends). Actual days vary by year and public holidays.
                    </p>
                </div>
            </section>

            {/* Project Timeline Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Project Timeline Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Always add buffer time:</strong> Add 15-20% extra working days to your estimates for unexpected delays. Projects almost always take longer than planned.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider holidays:</strong> Check if any public holidays fall within your date range. These reduce available working days significantly.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Plan in working days, not calendar days:</strong> When communicating deadlines with clients or team members, use working days to avoid confusion about weekend availability.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use project management tools:</strong> Integrate working day calculations into your project management software for accurate milestone planning.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Account for team schedules:</strong> If your team works a different schedule (e.g., 4-day work week), adjust your working day definition accordingly.</span>
                    </li>
                </ul>
            </section>

            {/* Working Days Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Working Days Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Both dates are included:</strong> Our calculator includes both the start and end dates in the count. If you want to exclude the start date, use the day after.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Weekend definition:</strong> Our calculator considers Saturday and Sunday as weekends. Some countries have different weekend days (e.g., Friday-Saturday).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Legal and financial use:</strong> Many legal documents use 'business days' for deadlines. Always clarify if the count includes the start date or excludes it.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Shipping estimates:</strong> Shipping carriers typically count business days from the pickup date. Check their specific business day policy.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Save your results:</strong> Take a screenshot or note your working day count for reference. Useful for project documentation.</span>
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