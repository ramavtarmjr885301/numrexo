"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I calculate my overall grade?",
        a: "Your overall grade is the weighted average of all assignments, tests, and exams. Multiply each score by its weight percentage, add them up, then divide by total weight. Example: Homework (20% weight, 85 score) = 17 points, Midterm (30% weight, 78 score) = 23.4 points, Final (50% weight, 82 score) = 41 points → Total = 81.4 out of 100.",
    },
    {
        q: "What's the difference between weighted and unweighted grades?",
        a: "Unweighted grades treat every assignment equally. Weighted grades give more importance to certain assignments (like exams count more than homework). Most courses use weighted grading because finals and midterms better measure overall understanding.",
    },
    {
        q: "What is the minimum passing grade?",
        a: "In most US schools, 60% (D-) is the minimum passing grade. In India, 33-40% is passing depending on the board. In many professional courses, 50% is the passing mark. Always check your course syllabus for exact requirements.",
    },
    {
        q: "How to calculate what I need on my final exam?",
        a: "Use the formula: Needed = (Desired Overall - Current Weighted Score) ÷ Final Exam Weight. Example: Desired 85%, current weighted 80% with 70% of course done, final worth 30% → Needed = (85 - 80) ÷ 0.30 = 16.67% on final (very easy). If needed > 100%, you can't reach your goal.",
    },
    {
        q: "What is a good grade point average?",
        a: "In the 4.0 scale: 3.5-4.0 = Excellent, 3.0-3.4 = Good, 2.5-2.9 = Average, Below 2.5 = Needs improvement. For scholarships, aim for 3.5+. For graduate school, 3.0+ is often required.",
    },
    {
        q: "How do I convert percentage to GPA?",
        a: "Common conversion: 90-100% = 4.0, 80-89% = 3.0, 70-79% = 2.0, 60-69% = 1.0, Below 60% = 0.0. Some schools use plus/minus system (A- = 3.7, B+ = 3.3). Check your institution's specific conversion chart.",
    },
    {
        q: "What is the difference between weighted and unweighted grades?",
        a: "Weighted grades assign different importance to assignments. Example: Final exam 50% of grade, homework 20%, quizzes 30%. Unweighted treats everything equally. Most college courses use weighted grading.",
    },
    {
        q: "How to calculate what I need on my final exam?",
        a: "Formula: Needed = (Desired - Current × (1 - FinalWt/100)) ÷ (FinalWt/100). Example: Desired 85%, Current 80%, Final 30% → Need 96.7% on final. If result >100%, goal impossible.",
    },
    {
        q: "What is a good GPA?",
        a: "3.5-4.0 = Excellent, 3.0-3.4 = Good, 2.5-2.9 = Average, Below 2.5 = Needs improvement. Top graduate schools expect 3.5+. Scholarships often require 3.0+.",
    },
    {
        q: "How to convert percentage to GPA?",
        a: "Common 4.0 scale: 90-100% = 4.0, 80-89% = 3.0, 70-79% = 2.0, 60-69% = 1.0. Some use plus/minus: A- = 3.7, B+ = 3.3. Check your school's scale.",
    },
];

const GRADE_LETTERS = [
    { letter: "A+", minPercent: 97, maxPercent: 100, gpa: 4.0, performance: "Excellent" },
    { letter: "A", minPercent: 93, maxPercent: 96, gpa: 4.0, performance: "Excellent" },
    { letter: "A-", minPercent: 90, maxPercent: 92, gpa: 3.7, performance: "Excellent" },
    { letter: "B+", minPercent: 87, maxPercent: 89, gpa: 3.3, performance: "Very Good" },
    { letter: "B", minPercent: 83, maxPercent: 86, gpa: 3.0, performance: "Good" },
    { letter: "B-", minPercent: 80, maxPercent: 82, gpa: 2.7, performance: "Good" },
    { letter: "C+", minPercent: 77, maxPercent: 79, gpa: 2.3, performance: "Satisfactory" },
    { letter: "C", minPercent: 73, maxPercent: 76, gpa: 2.0, performance: "Satisfactory" },
    { letter: "C-", minPercent: 70, maxPercent: 72, gpa: 1.7, performance: "Below Average" },
    { letter: "D+", minPercent: 67, maxPercent: 69, gpa: 1.3, performance: "Poor" },
    { letter: "D", minPercent: 60, maxPercent: 66, gpa: 1.0, performance: "Poor" },
    { letter: "F", minPercent: 0, maxPercent: 59, gpa: 0.0, performance: "Fail" },
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
    name: "Grade Calculator – Weighted Grade Calculator",
    description: "Calculate your course grade with weighted assignments. Find out what you need on your final exam to pass the class.",
    url: "https://www.numrexo.com/education/grade-calculator",
    applicationCategory: "EducationApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Weighted grade calculation", "Final exam needed", "Letter grade conversion", "GPA equivalent"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Education Calculators", item: "https://www.numrexo.com/education" },
        { "@type": "ListItem", position: 3, name: "Grade Calculator", item: "https://www.numrexo.com/education/grade-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function GradeCalculator() {
    const [calcType, setCalcType] = useState<"weighted" | "final">("weighted");
    const [assignments, setAssignments] = useState([{ name: "Assignment 1", score: "", weight: "" }]);
    const [desiredGrade, setDesiredGrade] = useState("");
    const [currentGrade, setCurrentGrade] = useState("");
    const [finalWeight, setFinalWeight] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addAssignment = () => {
        setAssignments([...assignments, { name: `Assignment ${assignments.length + 1}`, score: "", weight: "" }]);
    };

    const removeAssignment = (index: number) => {
        if (assignments.length > 1) {
            const updated = [...assignments];
            updated.splice(index, 1);
            setAssignments(updated);
        }
    };

    const updateAssignment = (index: number, field: string, value: string) => {
        const updated = [...assignments];
        updated[index] = { ...updated[index], [field]: value };
        setAssignments(updated);
    };

    const calculateWeighted = () => {
        let totalPoints = 0;
        let totalWeight = 0;

        for (let i = 0; i < assignments.length; i++) {
            const score = parseFloat(assignments[i].score);
            const weight = parseFloat(assignments[i].weight);

            if (!isNaN(score) && !isNaN(weight)) {
                totalPoints += (score * weight) / 100;
                totalWeight += weight;
            }
        }

        if (totalWeight === 0) {
            alert("Please enter at least one assignment with valid score and weight");
            return;
        }

        let currentGradeValue = totalPoints;
        if (totalWeight < 100) {
            currentGradeValue = (totalPoints / totalWeight) * 100;
        }

        // Find letter grade
        let letterGrade = "F";
        let gpa = 0;
        let performance = "";

        for (let i = 0; i < GRADE_LETTERS.length; i++) {
            if (currentGradeValue >= GRADE_LETTERS[i].minPercent && currentGradeValue <= GRADE_LETTERS[i].maxPercent) {
                letterGrade = GRADE_LETTERS[i].letter;
                gpa = GRADE_LETTERS[i].gpa;
                performance = GRADE_LETTERS[i].performance;
                break;
            }
        }

        setResult({
            currentGrade: currentGradeValue.toFixed(2),
            letterGrade,
            gpa: gpa.toFixed(2),
            performance,
            totalWeight,
            calcType: "weighted",
        });
    };

    const calculateFinal = () => {
        const desired = parseFloat(desiredGrade);
        const current = parseFloat(currentGrade);
        const finalWt = parseFloat(finalWeight);

        if (!desired || !current || !finalWt) {
            alert("Please enter desired grade, current grade, and final exam weight");
            return;
        }

        if (finalWt <= 0 || finalWt >= 100) {
            alert("Final exam weight must be between 1 and 99");
            return;
        }

        const currentWeight = 100 - finalWt;
        const neededOnFinal = (desired - (current * currentWeight / 100)) / (finalWt / 100);

        let possible = true;
        let message = "";

        if (neededOnFinal > 100) {
            possible = false;
            message = `You need ${neededOnFinal.toFixed(1)}% on the final, which is impossible. Your desired grade is not achievable.`;
        } else if (neededOnFinal < 0) {
            possible = true;
            message = `You already have ${current}% and don't need to take the final to achieve ${desired}%.`;
        } else {
            message = `You need to score at least ${neededOnFinal.toFixed(1)}% on your final exam.`;
        }

        setResult({
            neededOnFinal: neededOnFinal.toFixed(1),
            possible,
            message,
            currentGrade: current,
            desiredGrade: desired,
            finalWeight: finalWt,
            calcType: "final",
        });
    };

    const resetForm = () => {
        setCalcType("weighted");
        setAssignments([{ name: "Assignment 1", score: "", weight: "" }]);
        setDesiredGrade("");
        setCurrentGrade("");
        setFinalWeight("");
        setResult(null);
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
                        <span itemProp="name" className="text-gray-300">Grade Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Grade Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate your course grade or what you need on the final</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">What do you want to calculate?</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "weighted" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("weighted")}
                                >
                                    Current Grade
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "final" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("final")}
                                >
                                    Final Exam Needed
                                </button>
                            </div>
                        </div>

                        {calcType === "weighted" ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold text-gray-400">Assignments</label>
                                    <button
                                        onClick={addAssignment}
                                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        + Add Assignment
                                    </button>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {assignments.map((assignment, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={assignment.name}
                                                onChange={(e) => updateAssignment(i, "name", e.target.value)}
                                                className="w-24 px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                                            />
                                            <div className="flex-1 relative">
                                                <input
                                                    type="number"
                                                    placeholder="Score"
                                                    value={assignment.score}
                                                    onChange={(e) => updateAssignment(i, "score", e.target.value)}
                                                    className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                            </div>
                                            <div className="flex-1 relative">
                                                <input
                                                    type="number"
                                                    placeholder="Weight"
                                                    value={assignment.weight}
                                                    onChange={(e) => updateAssignment(i, "weight", e.target.value)}
                                                    className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                            </div>
                                            {assignments.length > 1 && (
                                                <button
                                                    onClick={() => removeAssignment(i)}
                                                    className="px-2 py-2 text-red-400 hover:text-red-300"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Desired Overall Grade (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="85"
                                            value={desiredGrade}
                                            onChange={(e) => setDesiredGrade(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Current Grade (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="75"
                                            value={currentGrade}
                                            onChange={(e) => setCurrentGrade(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Final Exam Weight (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="30"
                                            value={finalWeight}
                                            onChange={(e) => setFinalWeight(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={calcType === "weighted" ? calculateWeighted : calculateFinal}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                {calcType === "weighted" ? "Calculate Grade →" : "Calculate Final Needed →"}
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
                    title={calcType === "weighted" ? "Your Current Grade" : "Final Exam Analysis"}
                    isEmpty={!result}
                    emptyIcon="📝"
                    emptyText={calcType === "weighted" ? "Add assignments and calculate" : "Enter your grades and press Calculate"}
                    mainResult={result ? (calcType === "weighted" ? {
                        label: "Current Grade",
                        value: `${result.currentGrade}%`,
                        color: result.currentGrade >= 60 ? "text-green-400" : "text-red-400"
                    } : {
                        label: "Final Exam Needed",
                        value: `${result.neededOnFinal}%`,
                        color: result.possible ? "text-yellow-400" : "text-red-400"
                    }) : undefined}
                    extraRows={result ? [
                        ...(calcType === "weighted" ? [
                            { label: "Letter Grade", value: result.letterGrade, valueColor: "text-yellow-400" },
                            { label: "GPA (4.0 scale)", value: result.gpa },
                            { label: "Performance", value: result.performance },
                            { label: "Total Weight", value: `${result.totalWeight}%` },
                        ] : [
                            { label: "Current Grade", value: `${result.currentGrade}%` },
                            { label: "Desired Grade", value: `${result.desiredGrade}%`, valueColor: "text-green-400" },
                            { label: "Final Exam Weight", value: `${result.finalWeight}%` },
                            { label: "Status", value: result.message, valueColor: result.possible ? "text-yellow-400" : "text-red-400" },
                        ]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Grade Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Grade Calculator</strong> helps you calculate your weighted course grade and determine what you need on your final exam. Perfect for students who want to track their progress and plan their study strategy.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Use the "Current Grade" mode to calculate your overall grade based on weighted assignments. Use the "Final Exam Needed" mode to find out exactly what score you need on your final to achieve your desired grade.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Grade Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select what you want to calculate: <strong className="text-white">"Current Grade"</strong> or <strong className="text-white">"Final Exam Needed"</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> For Current Grade: Add assignments with their scores and weight percentages.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For Final Exam Needed: Enter desired grade, current grade, and final exam weight.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Grade Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Track Academic Progress</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your exact standing at any point in the semester. Identify which assignments are dragging down your grade.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Set Realistic Goals</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate what score you need on the final to achieve your target grade. Adjust goals based on feasibility.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Reduce Exam Stress</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Knowing exactly what you need on the final removes uncertainty. Focus study time effectively.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Scholarship Eligibility</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track your GPA to ensure you maintain scholarship requirements. Plan ahead for grade improvement.</p>
                    </div>
                </div>
            </section>

            {/* Grade Scale Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Standard Grade Scale (4.0 GPA)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Letter Grade</th>
                                <th className="text-left py-3 px-4 text-gray-400">Percentage Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">GPA</th>
                                <th className="text-left py-3 px-4 text-gray-400">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GRADE_LETTERS.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-gray-300">{row.letter}</td>
                                    <td className="py-2 px-4 text-gray-400">{row.minPercent}-{row.maxPercent}%</td>
                                    <td className="py-2 px-4 text-yellow-400">{row.gpa}</td>
                                    <td className="py-2 px-4 text-gray-500">{row.performance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Grade Calculation Formulas */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Grade Calculation Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Weighted Grade</h3>
                        <p className="text-white font-mono text-sm mb-2">Grade = Σ (Score × Weight ÷ 100)</p>
                        <p className="text-gray-500 text-xs">Example: HW (85×20%) + Mid (78×30%) + Final (82×50%) = 81.4%</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Final Exam Needed</h3>
                        <p className="text-white font-mono text-sm mb-2">Needed = (Desired - Current × (1 - FinalWt/100)) ÷ (FinalWt/100)</p>
                        <p className="text-gray-500 text-xs">Example: Desired 85%, Current 80%, Final 30% → Need 96.7%</p>
                    </div>
                </div>
            </section>

            {/* Study Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tips to Improve Your Grade</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">📝</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Do All Assignments</h3>
                        <p className="text-xs text-gray-400">Even small assignments add up. Missing one could drop your grade significantly.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">⏰</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Don't Procrastinate</h3>
                        <p className="text-xs text-gray-400">Start studying early. Cramming the night before rarely works for finals.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">👨‍🏫</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Ask for Help</h3>
                        <p className="text-xs text-gray-400">Talk to your teacher, join study groups, or get a tutor if you're struggling.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">📊</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Track Your Progress</h3>
                        <p className="text-xs text-gray-400">Use this calculator regularly to know where you stand before finals.</p>
                    </div>
                </div>
            </section>

            {/* Important Things */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Weights should add to 100%</strong> — For accurate calculation, ensure your assignment weights total 100%.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Grade scales vary by school</strong> — Some schools use plus/minus grading. Check your school's specific scale.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Extra credit not included</strong> — This calculator doesn't account for extra credit points that could boost your grade.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Check your syllabus</strong> — Always refer to your course syllabus for official grading policies.</span>
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