"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I calculate what I need on my final exam?",
        a: "Use the formula: Needed = (Desired Grade - Current Grade × (1 - Final Weight)) ÷ Final Weight. Example: Desired 85%, Current 80%, Final worth 30% → Needed = (85 - 80 × 0.7) ÷ 0.3 = 96.7%. This tells you the minimum score you need on your final to achieve your goal.",
    },
    {
        q: "What if I don't know my current grade?",
        a: "You can calculate your current grade using our Weighted Grade Calculator first. Enter all your completed assignments and their weights, then use that result here.",
    },
    {
        q: "Can I pass if I fail the final?",
        a: "It depends on your current grade and the final's weight. If you have a high current grade, you might still pass. Example: Current 90%, Final worth 20% → Even with 0% on final, final grade = 72% (passing). Use this calculator to find out your specific situation.",
    },
    {
        q: "What is the minimum grade I need to pass the class?",
        a: "Most schools require 60% (D-) to pass. Some require 70% (C-) for major courses. Professional courses may require 50%. Check your syllabus for the exact passing grade.",
    },
    {
        q: "How much will my grade drop if I skip the final?",
        a: "If you skip the final (score 0%), your grade drops by: Final Weight × Current Grade ÷ 100. Example: Current 85%, Final 30% → New grade = 85 - (30 × 0.85) = 59.5%. Skipping the final usually fails you.",
    },
    {
        q: "Should I study for the final or focus on other assignments?",
        a: "Prioritize the highest weighted items. Use our calculator to see what score you need. If you need 95%+ on the final, consider asking for extra credit or focusing on improving other categories instead.",
    },
];

const SCENARIO_EXAMPLES = [
    { currentGrade: "65%", desiredGrade: "70%", finalWeight: "30%", needed: "81.7%" },
    { currentGrade: "75%", desiredGrade: "80%", finalWeight: "25%", needed: "95.0%" },
    { currentGrade: "80%", desiredGrade: "85%", finalWeight: "20%", needed: "100.0%" },
    { currentGrade: "85%", desiredGrade: "90%", finalWeight: "40%", needed: "97.5%" },
    { currentGrade: "50%", desiredGrade: "60%", finalWeight: "35%", needed: "78.6%" },
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
    name: "Final Grade Calculator – What Do I Need on My Final Exam?",
    description: "Calculate exactly what score you need on your final exam to achieve your desired grade. Plan your study strategy effectively.",
    url: "https://www.numrexo.com/education/final-grade-calculator",
    applicationCategory: "EducationApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Final exam needed calculation", "Grade scenario planning", "Pass/fail analysis", "Study priority guide"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Education Calculators", item: "https://www.numrexo.com/education" },
        { "@type": "ListItem", position: 3, name: "Final Grade Calculator", item: "https://www.numrexo.com/education/final-grade-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function FinalGradeCalculator() {
    const [calcType, setCalcType] = useState<"needed" | "whatIf">("needed");
    const [currentGrade, setCurrentGrade] = useState("");
    const [desiredGrade, setDesiredGrade] = useState("");
    const [finalWeight, setFinalWeight] = useState("");
    const [finalScore, setFinalScore] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateNeeded = () => {
        const current = parseFloat(currentGrade);
        const desired = parseFloat(desiredGrade);
        const weight = parseFloat(finalWeight);

        if (!current || !desired || !weight) {
            alert("Please enter current grade, desired grade, and final exam weight");
            return;
        }

        if (current < 0 || current > 100 || desired < 0 || desired > 100) {
            alert("Grades must be between 0 and 100");
            return;
        }

        if (weight <= 0 || weight >= 100) {
            alert("Final exam weight must be between 1 and 99");
            return;
        }

        const currentWeight = 100 - weight;
        const needed = (desired - (current * currentWeight / 100)) / (weight / 100);

        let status = "";
        let advice = "";

        if (needed > 100) {
            status = "❌ Impossible";
            advice = `You need ${needed.toFixed(1)}% which is impossible. Your desired grade is not achievable. Consider lowering your goal or asking for extra credit.`;
        } else if (needed < 0) {
            status = "✅ Already Achieved";
            advice = `You already have ${current}% and don't need to take the final to achieve ${desired}%. But take it anyway to boost your grade!`;
        } else if (needed <= 60) {
            status = "🎯 Easy Target";
            advice = `You need ${needed.toFixed(1)}% on the final. This should be easily achievable with basic preparation.`;
        } else if (needed <= 80) {
            status = "📚 Moderate Challenge";
            advice = `You need ${needed.toFixed(1)}% on the final. Study well and you can do it. Focus on key topics.`;
        } else if (needed <= 95) {
            status = "🔥 Tough But Possible";
            advice = `You need ${needed.toFixed(1)}% on the final. This will require serious preparation. Consider studying with a group or getting a tutor.`;
        } else {
            status = "💀 Extremely Difficult";
            advice = `You need ${needed.toFixed(1)}% on the final. This is nearly impossible. Consider asking for extra credit or accepting a lower grade.`;
        }

        const finalGradeIf100 = (current * currentWeight / 100) + (100 * weight / 100);
        const finalGradeIf0 = (current * currentWeight / 100);

        setResult({
            needed: needed.toFixed(1),
            status,
            advice,
            finalGradeIf100: finalGradeIf100.toFixed(1),
            finalGradeIf0: finalGradeIf0.toFixed(1),
            currentGrade: current,
            desiredGrade: desired,
            finalWeight: weight,
            calcType: "needed",
        });
    };

    const calculateWhatIf = () => {
        const current = parseFloat(currentGrade);
        const score = parseFloat(finalScore);
        const weight = parseFloat(finalWeight);

        if (!current || !score || !weight) {
            alert("Please enter current grade, final exam score, and final exam weight");
            return;
        }

        const currentWeight = 100 - weight;
        const finalGrade = (current * currentWeight / 100) + (score * weight / 100);

        let letterGrade = "";
        if (finalGrade >= 90) letterGrade = "A";
        else if (finalGrade >= 80) letterGrade = "B";
        else if (finalGrade >= 70) letterGrade = "C";
        else if (finalGrade >= 60) letterGrade = "D";
        else letterGrade = "F";

        setResult({
            finalGrade: finalGrade.toFixed(1),
            letterGrade,
            currentGrade: current,
            finalScore: score,
            finalWeight: weight,
            calcType: "whatIf",
        });
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
                        <a href="https://www.numrexo.com/education" itemProp="item" className="hover:text-gray-300">Education Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Final Grade Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Final Grade Planning</h3>
                        <p className="text-xs text-gray-500 mt-1">Plan your final exam strategy</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">What do you want to calculate?</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "needed" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("needed")}
                                >
                                    Score Needed on Final
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "whatIf" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("whatIf")}
                                >
                                    What If Scenario
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Current Grade (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="75"
                                    value={currentGrade}
                                    onChange={(e) => setCurrentGrade(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>

                        {calcType === "needed" ? (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Desired Final Grade (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="85"
                                            value={desiredGrade}
                                            onChange={(e) => setDesiredGrade(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Final Exam Weight (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1"
                                            placeholder="30"
                                            value={finalWeight}
                                            onChange={(e) => setFinalWeight(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">What percentage of your grade is the final exam?</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Final Exam Score (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1"
                                            placeholder="85"
                                            value={finalScore}
                                            onChange={(e) => setFinalScore(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Final Exam Weight (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1"
                                            placeholder="30"
                                            value={finalWeight}
                                            onChange={(e) => setFinalWeight(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            onClick={calcType === "needed" ? calculateNeeded : calculateWhatIf}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            {calcType === "needed" ? "Calculate Needed Score →" : "Calculate Final Grade →"}
                        </button>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title={calcType === "needed" ? "Final Exam Analysis" : "What If Results"}
                    isEmpty={!result}
                    emptyIcon="🎯"
                    emptyText="Enter your grades and press Calculate"
                    mainResult={result ? (calcType === "needed" ? {
                        label: "Score Needed on Final",
                        value: `${result.needed}%`,
                        color: parseFloat(result.needed) <= 100 ? "text-yellow-400" : "text-red-400"
                    } : {
                        label: "Your Final Grade",
                        value: `${result.finalGrade}%`,
                        color: parseFloat(result.finalGrade) >= 60 ? "text-green-400" : "text-red-400"
                    }) : undefined}
                    extraRows={result ? [
                        ...(calcType === "needed" ? [
                            { label: "Status", value: result.status, valueColor: "text-yellow-400" },
                            { label: "Advice", value: result.advice },
                            { label: "If you score 100% on final", value: `${result.finalGradeIf100}%`, valueColor: "text-green-400" },
                            { label: "If you score 0% on final", value: `${result.finalGradeIf0}%`, valueColor: "text-red-400" },
                        ] : [
                            { label: "Letter Grade", value: result.letterGrade, valueColor: "text-yellow-400" },
                            { label: "Current Grade (before final)", value: `${result.currentGrade}%` },
                            { label: "Final Exam Score", value: `${result.finalScore}%` },
                            { label: "Final Weight", value: `${result.finalWeight}%` },
                        ]),
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Final Grade Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Final Grade Calculator</strong> helps you plan your final exam strategy. Find out exactly what score you need on your final to achieve your desired grade, or see what your final grade will be based on your expected exam score.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Use the "Score Needed" mode to set a goal and see if it's achievable. Use the "What If" mode to estimate your final grade based on how you think you'll do on the final.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Final Grade Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Score Needed on Final</h3>
                        <p className="text-white font-mono text-sm mb-2">Needed = (Desired - Current × (1 - Weight/100)) ÷ (Weight/100)</p>
                        <p className="text-gray-500 text-xs">Example: Desired 85%, Current 80%, Weight 30% → Need 96.7%</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Final Grade Calculator</h3>
                        <p className="text-white font-mono text-sm mb-2">Final = Current × (1 - Weight/100) + Score × (Weight/100)</p>
                        <p className="text-gray-500 text-xs">Example: Current 80%, Score 85%, Weight 30% → Final = 81.5%</p>
                    </div>
                </div>
            </section>

            {/* Example Scenarios Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Example Scenarios</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Current Grade</th>
                                <th className="text-left py-3 px-4 text-gray-400">Desired Grade</th>
                                <th className="text-left py-3 px-4 text-gray-400">Final Weight</th>
                                <th className="text-left py-3 px-4 text-gray-400">Score Needed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SCENARIO_EXAMPLES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.currentGrade}</td>
                                    <td className="py-3 px-4 text-gray-300">{row.desiredGrade}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.finalWeight}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.needed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Study Strategy Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Final Exam Study Tips</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Start early</strong> — Don't cram. Start studying at least 2 weeks before the final.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Focus on weak areas</strong> — Spend more time on topics you struggled with during the semester.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Practice past exams</strong> — Get previous years' finals from your teacher or upperclassmen.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Study in groups</strong> — Explaining concepts to others helps you learn better.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Get enough sleep</strong> — A tired brain performs worse. Sleep at least 7-8 hours before the exam.</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
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