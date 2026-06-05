"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How is my due date calculated?",
        a: "The most common method is Naegele's Rule: Add 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a 28-day cycle with ovulation on day 14. Only about 5% of babies arrive exactly on their due date — most come between 37 and 42 weeks.",
    },
    {
        q: "How accurate is the due date?",
        a: "Due dates are estimates, not guarantees. Only 5% of babies arrive exactly on their due date. 80% arrive between 38 and 42 weeks. First-time moms often go past their due date. Ultrasounds in the first trimester are most accurate for dating pregnancy.",
    },
    {
        q: "What if I have irregular cycles?",
        a: "If your cycles are irregular, the LMP method may not be accurate. Your doctor will use an early ultrasound (around 8-12 weeks) to determine gestational age and due date. The first trimester ultrasound is the most reliable method.",
    },
    {
        q: "What is the difference between LMP and conception date?",
        a: "LMP (Last Menstrual Period) is the first day of your last period. Conception usually happens about 14 days after LMP (around ovulation). Due date is calculated from LMP, not conception. If you know your conception date, add 266 days.",
    },
    {
        q: "What are the trimesters of pregnancy?",
        a: "First trimester: Week 1-12 (early development). Second trimester: Week 13-27 (growth and movement). Third trimester: Week 28-40 (final development and preparation for birth). Each trimester has different milestones and symptoms.",
    },
    {
        q: "When should I see a doctor after positive pregnancy test?",
        a: "Schedule your first prenatal visit around 8 weeks after your LMP. Earlier if you have medical conditions, previous complications, or are over 35. The first visit typically includes confirmation ultrasound, blood tests, and health history review.",
    },
];

const PREGNANCY_WEEKS = [
    { trimester: "First Trimester", weeks: "1-12", keyEvents: "Conception, heartbeat, organ formation", color: "text-blue-400" },
    { trimester: "Second Trimester", weeks: "13-27", keyEvents: "Movement felt, gender visible, growth spurt", color: "text-green-400" },
    { trimester: "Third Trimester", weeks: "28-40", keyEvents: "Brain development, lung maturity, position for birth", color: "text-purple-400" },
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
    name: "Pregnancy Due Date Calculator – Expected Delivery Date",
    description: "Calculate your pregnancy due date based on last menstrual period or conception date. Track your pregnancy week by week.",
    url: "https://www.numrexo.com/health/pregnancy-due-date-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Due date calculation", "Current week tracking", "Trimester information", "Pregnancy milestones"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://www.numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Pregnancy Due Date Calculator", item: "https://www.numrexo.com/health/pregnancy-due-date-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PregnancyDueDateCalculator() {
    const [calcMethod, setCalcMethod] = useState<"lmp" | "conception">("lmp");
    const [lmpDate, setLmpDate] = useState("");
    const [conceptionDate, setConceptionDate] = useState("");
    const [cycleLength, setCycleLength] = useState("28");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let dueDate: Date;
        let currentDate = new Date();

        if (calcMethod === "lmp") {
            if (!lmpDate) {
                alert("Please select your last menstrual period date");
                return;
            }
            const lmp = new Date(lmpDate);
            const cycleAdjust = (parseFloat(cycleLength) || 28) - 28;
            dueDate = new Date(lmp);
            dueDate.setDate(lmp.getDate() + 280 + cycleAdjust);
        } else {
            if (!conceptionDate) {
                alert("Please select your conception date");
                return;
            }
            const conception = new Date(conceptionDate);
            dueDate = new Date(conception);
            dueDate.setDate(conception.getDate() + 266);
        }

        const today = new Date();
        let currentWeek = 0;
        let daysLeft = 0;
        let trimester = "";

        if (today >= dueDate) {
            currentWeek = 40;
            daysLeft = 0;
            trimester = "Completed";
        } else if (today < dueDate) {
            const diffTime = dueDate.getTime() - today.getTime();
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const lmpForWeek = calcMethod === "lmp" ? new Date(lmpDate) : new Date(conceptionDate);
            lmpForWeek.setDate(lmpForWeek.getDate() - 14);
            const weeksPassed = (today.getTime() - lmpForWeek.getTime()) / (1000 * 60 * 60 * 24 * 7);
            currentWeek = Math.min(40, Math.max(1, Math.floor(weeksPassed)));

            if (currentWeek <= 12) trimester = "First Trimester (Weeks 1-12)";
            else if (currentWeek <= 27) trimester = "Second Trimester (Weeks 13-27)";
            else trimester = "Third Trimester (Weeks 28-40)";
        }

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        setResult({
            dueDate: dueDate.toLocaleDateString('en-US', options),
            currentWeek,
            daysLeft,
            trimester,
            isOverdue: today > dueDate,
            weeksLeft: Math.max(0, Math.floor(daysLeft / 7)),
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/health" itemProp="item" className="hover:text-gray-300">Health Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Pregnancy Due Date Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Pregnancy Due Date</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate your expected delivery date</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Method</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcMethod === "lmp" ? "bg-pink-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcMethod("lmp")}>Last Period (LMP)</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcMethod === "conception" ? "bg-pink-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcMethod("conception")}>Conception Date</button>
                            </div>
                        </div>

                        {calcMethod === "lmp" ? (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">First Day of Last Menstrual Period</label><input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Average Cycle Length (days)</label><div className="relative"><input type="number" placeholder="28" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">days</span></div><p className="text-xs text-gray-500 mt-1">Standard cycle is 28 days. Adjust if your cycle is longer or shorter.</p></div>
                            </>
                        ) : (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Date of Conception</label><input type="date" value={conceptionDate} onChange={(e) => setConceptionDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
                        )}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg transition-all">Calculate Due Date →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your Due Date"
                    isEmpty={!result}
                    emptyIcon="👶"
                    emptyText="Enter your date and press Calculate"
                    mainResult={result ? { label: "Estimated Due Date", value: result.dueDate, color: "text-pink-400" } : undefined}
                    extraRows={result ? [
                        { label: "Current Week", value: `${result.currentWeek} weeks ${result.isOverdue ? "(Overdue)" : ""}`, valueColor: "text-yellow-400" },
                        { label: "Days Left", value: `${result.daysLeft} days` },
                        { label: "Weeks Left", value: `${result.weeksLeft} weeks` },
                        { label: "Trimester", value: result.trimester },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Pregnancy Due Date Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate your estimated due date based on your last menstrual period or conception date. Track your pregnancy week by week and know which trimester you're in.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">How Due Date is Calculated</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-pink-400 mb-2">Naegele's Rule (LMP Method)</h3><p className="text-white font-mono text-sm">Due Date = LMP + 280 days (40 weeks)</p><p className="text-gray-500 text-xs mt-2">Based on 28-day cycle with ovulation on day 14</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-pink-400 mb-2">Conception Method</h3><p className="text-white font-mono text-sm">Due Date = Conception + 266 days (38 weeks)</p><p className="text-gray-500 text-xs mt-2">Use if you know exactly when you conceived</p></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Pregnancy Trimesters</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Trimester</th>
                                <th className="text-left py-3 px-4 text-gray-400">Weeks</th>
                                <th className="text-left py-3 px-4 text-gray-400">Key Events</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PREGNANCY_WEEKS.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.trimester}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.weeks} weeks</td>
                                    <td className="py-3 px-4 text-gray-400">{row.keyEvents}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Important Notes</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Due date is an estimate</strong> — Only 5% of babies arrive exactly on their due date.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Full term is 39-40 weeks</strong> — Babies born at 37 weeks are early term, 41 weeks is late term.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Consult your doctor</strong> — This calculator provides estimates. Always follow your healthcare provider's advice.</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}