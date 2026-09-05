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
    {
        q: "What is the 40-week pregnancy timeline?",
        a: "Week 1-4: Fertilization and implantation. Week 5-8: Heartbeat begins, organs start forming. Week 9-12: Fingers, toes, facial features develop. Week 13-16: Baby can suck thumb, gender visible. Week 17-20: Movement felt (quickening). Week 21-24: Viability outside womb. Week 25-28: Brain rapidly developing, lungs maturing. Week 29-32: Growth spurt, baby turns head-down. Week 33-36: Baby gains weight, lungs fully mature. Week 37-40: Full term, ready for birth.",
    },
    {
        q: "What is the difference between gestational age and fetal age?",
        a: "Gestational age: Measured from LMP (first day of last period) - this is what doctors use. Fetal age: Measured from actual conception date. Fetal age is 2 weeks less than gestational age. Example: 8 weeks gestational = 6 weeks fetal. Ultrasound dating uses gestational age.",
    },
    {
        q: "What are the trimesters of pregnancy?",
        a: "First Trimester (Weeks 1-12): Morning sickness, fatigue, breast tenderness, frequent urination. Baby's organs forming, heartbeat by week 6. Second Trimester (Weeks 13-27): 'Honeymoon period' - less nausea, baby movement felt, gender visible. Third Trimester (Weeks 28-40): Back pain, swelling, Braxton Hicks, baby positions for birth, lungs maturing.",
    },
    {
        q: "When should I see a doctor after positive pregnancy test?",
        a: "Schedule first prenatal visit at 8 weeks (from LMP). Earlier if: 1) High-risk pregnancy (35+ years, medical conditions), 2) Previous miscarriage, 3) IVF/IUI pregnancy, 4) Bleeding or severe pain. First visit includes: Ultrasound (confirm heartbeat/dates), Blood tests (blood type, anemia, infections), Blood pressure check, Urine test (protein, sugar).",
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
    url: "https://numrexo.com/health/pregnancy-due-date-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Due date calculation", "Current week tracking", "Trimester information", "Pregnancy milestones"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Pregnancy Due Date Calculator", item: "https://numrexo.com/health/pregnancy-due-date-calculator" },
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

    const resetForm = () => {
        setCalcMethod("lmp");
        setLmpDate("");
        setConceptionDate("");
        setCycleLength("28");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/health" itemProp="item" className="hover:text-gray-300">Health Calculators</a><meta itemProp="position" content="2" /></li>
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
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Average Cycle Length (days)</label><div className="relative"><input type="number" placeholder="28" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">days</span></div><p className="text-xs text-gray-500 mt-1">Standard cycle is 28 days. Adjust if your cycle is longer or shorter.</p></div>
                            </>
                        ) : (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Date of Conception</label><input type="date" value={conceptionDate} onChange={(e) => setConceptionDate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /></div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg transition-all">Calculate Due Date →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Pregnancy Due Date Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Pregnancy Due Date Calculator</strong> helps expectant mothers estimate their baby's arrival date. Using Naegele's Rule (LMP + 280 days) or conception date + 266 days, our calculator provides a reliable due date estimate.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Track your pregnancy week by week, know which trimester you're in, and see how many days and weeks are left until your due date. Perfect for expecting parents planning for their baby's arrival.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Pregnancy Due Date Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select <strong className="text-white">calculation method</strong> — LMP (Last Menstrual Period) or Conception Date.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">first day of your last period</strong> (LMP method) or <strong className="text-white">conception date</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> (For LMP) Enter your <strong className="text-white">average cycle length</strong> (standard is 28 days).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Due Date"</strong> to see your estimated delivery date.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> View due date, current week, days left, and trimester information.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Pregnancy Due Date Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2">✓ Plan for Baby's Arrival</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your estimated due date to plan maternity leave, baby nursery, hospital bags, and family support.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Track Pregnancy Progress</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know which week and trimester you're in. Understand your baby's development milestones.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Medical Appointment Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Schedule prenatal visits, ultrasounds, and important tests at the right gestational age.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Multiple Methods</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate due date using LMP (Naegele's Rule) or conception date. Works for irregular cycles too.</p>
                    </div>
                </div>
            </section>

            {/* How Due Date is Calculated */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">How Due Date is Calculated</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2">Naegele's Rule (LMP Method)</h3>
                        <p className="text-white font-mono text-sm">Due Date = LMP + 280 days (40 weeks)</p>
                        <p className="text-gray-500 text-xs mt-2">Based on 28-day cycle with ovulation on day 14</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2">Conception Method</h3>
                        <p className="text-white font-mono text-sm">Due Date = Conception + 266 days (38 weeks)</p>
                        <p className="text-gray-500 text-xs mt-2">Use if you know exactly when you conceived</p>
                    </div>
                </div>
            </section>

            {/* Pregnancy Trimesters */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Pregnancy Trimesters</h2>
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

            {/* Pregnancy Week by Week */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Pregnancy Week by Week Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div><span className="text-pink-400 font-medium">Weeks 1-4:</span> Fertilization, implantation, heart begins beating</div>
                        <div><span className="text-pink-400 font-medium">Weeks 5-8:</span> Organs forming, heartbeat visible on ultrasound</div>
                        <div><span className="text-pink-400 font-medium">Weeks 9-12:</span> Fingers, toes, facial features developing</div>
                        <div><span className="text-pink-400 font-medium">Weeks 13-16:</span> Baby can suck thumb, gender visible</div>
                        <div><span className="text-pink-400 font-medium">Weeks 17-20:</span> Movement felt (quickening), hair growing</div>
                        <div><span className="text-pink-400 font-medium">Weeks 21-24:</span> Viability outside womb, eyes open</div>
                        <div><span className="text-pink-400 font-medium">Weeks 25-28:</span> Brain developing, lungs maturing</div>
                        <div><span className="text-pink-400 font-medium">Weeks 29-32:</span> Growth spurt, baby turns head-down</div>
                        <div><span className="text-pink-400 font-medium">Weeks 33-36:</span> Gaining weight, lungs fully mature</div>
                        <div><span className="text-pink-400 font-medium">Weeks 37-40:</span> Full term, ready for birth!</div>
                    </div>
                </div>
            </section>

            {/* Important Notes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Notes</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Due date is an estimate</strong> — Only 5% of babies arrive exactly on their due date.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Full term is 39-40 weeks</strong> — Babies born at 37 weeks are early term, 41 weeks is late term.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Consult your doctor</strong> — This calculator provides estimates. Always follow your healthcare provider's advice.</span></li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
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