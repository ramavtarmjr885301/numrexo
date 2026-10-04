"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How is percentage calculated from marks?",
        a: "Percentage = (Marks Obtained ÷ Total Marks) × 100. For multiple subjects, add all obtained marks and all total marks separately, then apply the same formula.",
    },
    {
        q: "What is CGPA and how to convert to percentage?",
        a: "CGPA (Cumulative Grade Point Average) is on a 10-point scale. Multiply CGPA by 9.5 to get approximate percentage. Example: 8.5 CGPA × 9.5 = 80.75%.",
    },
    {
        q: "What is a good percentage in exams?",
        a: "60%+ is generally considered passing with second class, 75%+ is first class/distinction, 85%+ is excellent, 90%+ is outstanding for competitive exams.",
    },
    {
        q: "How to calculate percentage of 6 subjects?",
        a: "Add marks of all 6 subjects, add total marks (usually 600 if each subject is 100), divide obtained by total and multiply by 100. Use the multi-subject mode above.",
    },
    {
        q: "How to convert CGPA to percentage for CBSE?",
        a: "CBSE formula: Percentage = CGPA × 9.5. This is the standard conversion used by CBSE for classes 9-12. Example: 8.5 CGPA = 80.75%. For other boards, conversion factor may be 10 or 9. Check your board's official conversion formula.",
    },
    {
        q: "What is the difference between CGPA and GPA?",
        a: "GPA (Grade Point Average) is for a single semester/term. CGPA (Cumulative GPA) is the average of all semesters combined. CGPA gives your overall academic performance. Example: Semester 1 GPA 7.5, Semester 2 GPA 8.0 → CGPA = 7.75.",
    },
    {
        q: "How does negative marking affect my percentage?",
        a: "With negative marking, wrong answers subtract marks (often a fraction of the marks per question), so your obtained marks can be lower than your count of correct answers suggests. Percentage = (Correct marks − Penalty marks) ÷ Total possible marks × 100 — always use net marks after penalties, not the raw number of correct answers.",
    },
    {
        q: "What's the difference between percentage and percentile in exams like JEE or NEET?",
        a: "Percentage reflects your raw score out of total marks. Percentile reflects your rank relative to everyone who took that exam session — a 95 percentile means you scored better than 95% of candidates. Exams like JEE Main use percentile specifically because papers across different sessions vary slightly in difficulty.",
    },
];

const DEFAULT_SUBJECTS = [
    { id: 1, obtained: "85", total: "100" },
    { id: 2, obtained: "78", total: "100" },
    { id: 3, obtained: "92", total: "100" },
    { id: 4, obtained: "88", total: "100" },
];

export default function PercentageMarksCalculator() {
    const [mode, setMode] = useState<"single" | "multiple" | "cgpa">("single");
    const [obtainedMarks, setObtainedMarks] = useState("425");
    const [totalMarks, setTotalMarks] = useState("500");
    const [subjects, setSubjects] = useState<{ id: number; obtained: string; total: string }[]>([
        ...DEFAULT_SUBJECTS,
    ]);
    const [cgpa, setCgpa] = useState("8.5");
    const [conversionFactor, setConversionFactor] = useState("9.5");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addSubject = () => {
        const newId = Math.max(...subjects.map(s => s.id), 0) + 1;
        setSubjects([...subjects, { id: newId, obtained: "", total: "" }]);
    };

    const removeSubject = (id: number) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter(s => s.id !== id));
        }
    };

    const updateSubject = (id: number, field: "obtained" | "total", value: string) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const calculateSingle = () => {
        const obtained = parseFloat(obtainedMarks) || 0;
        const total = parseFloat(totalMarks) || 0;

        if (total <= 0) {
            setResult(null);
            return;
        }

        const percentage = (obtained / total) * 100;
        let grade = "";
        let gradeColor = "";

        if (percentage >= 90) { grade = "A+ (Outstanding)"; gradeColor = "text-purple-600"; }
        else if (percentage >= 80) { grade = "A (Excellent)"; gradeColor = "text-green-600"; }
        else if (percentage >= 70) { grade = "B+ (Very Good)"; gradeColor = "text-teal-600"; }
        else if (percentage >= 60) { grade = "B (Good)"; gradeColor = "text-blue-600"; }
        else if (percentage >= 50) { grade = "C (Average)"; gradeColor = "text-yellow-700"; }
        else if (percentage >= 40) { grade = "D (Pass)"; gradeColor = "text-orange-600"; }
        else { grade = "F (Fail)"; gradeColor = "text-red-600"; }

        setResult({
            type: "single",
            percentage: percentage.toFixed(2),
            obtained: obtained,
            total: total,
            grade: grade,
            gradeColor: gradeColor,
            marksScored: obtained,
            marksLost: total - obtained,
        });
    };

    const calculateMultiple = () => {
        let totalObtained = 0;
        let totalMax = 0;
        const subjectBreakdown = [];

        for (const subject of subjects) {
            const obtained = parseFloat(subject.obtained) || 0;
            const total = parseFloat(subject.total) || 0;

            if (total > 0) {
                totalObtained += obtained;
                totalMax += total;
                const subPercent = (obtained / total) * 100;
                subjectBreakdown.push({
                    obtained: obtained,
                    total: total,
                    percentage: subPercent.toFixed(2),
                });
            }
        }

        if (totalMax <= 0) {
            setResult(null);
            return;
        }

        const overallPercentage = (totalObtained / totalMax) * 100;
        let grade = "";
        let gradeColor = "";

        if (overallPercentage >= 90) { grade = "A+ (Outstanding)"; gradeColor = "text-purple-600"; }
        else if (overallPercentage >= 80) { grade = "A (Excellent)"; gradeColor = "text-green-600"; }
        else if (overallPercentage >= 70) { grade = "B+ (Very Good)"; gradeColor = "text-teal-600"; }
        else if (overallPercentage >= 60) { grade = "B (Good)"; gradeColor = "text-blue-600"; }
        else if (overallPercentage >= 50) { grade = "C (Average)"; gradeColor = "text-yellow-700"; }
        else if (overallPercentage >= 40) { grade = "D (Pass)"; gradeColor = "text-orange-600"; }
        else { grade = "F (Fail)"; gradeColor = "text-red-600"; }

        setResult({
            type: "multiple",
            percentage: overallPercentage.toFixed(2),
            totalObtained: totalObtained,
            totalMax: totalMax,
            grade: grade,
            gradeColor: gradeColor,
            subjectCount: subjects.length,
            subjectBreakdown: subjectBreakdown,
        });
    };

    const calculateCGPA = () => {
        const cgpaValue = parseFloat(cgpa) || 0;
        const factor = parseFloat(conversionFactor) || 9.5;

        if (cgpaValue <= 0 || cgpaValue > 10) {
            setResult(null);
            return;
        }

        const percentage = cgpaValue * factor;
        let grade = "";
        let gradeColor = "";

        if (percentage >= 90) { grade = "A+ (Outstanding)"; gradeColor = "text-purple-600"; }
        else if (percentage >= 80) { grade = "A (Excellent)"; gradeColor = "text-green-600"; }
        else if (percentage >= 70) { grade = "B+ (Very Good)"; gradeColor = "text-teal-600"; }
        else if (percentage >= 60) { grade = "B (Good)"; gradeColor = "text-blue-600"; }
        else if (percentage >= 50) { grade = "C (Average)"; gradeColor = "text-yellow-700"; }
        else if (percentage >= 40) { grade = "D (Pass)"; gradeColor = "text-orange-600"; }
        else { grade = "F (Fail)"; gradeColor = "text-red-600"; }

        setResult({
            type: "cgpa",
            percentage: percentage.toFixed(2),
            cgpa: cgpaValue,
            conversionFactor: factor,
            grade: grade,
            gradeColor: gradeColor,
        });
    };

    const calculate = () => {
        if (mode === "single") calculateSingle();
        else if (mode === "multiple") calculateMultiple();
        else calculateCGPA();
    };

    const reset = () => {
        setObtainedMarks("425");
        setTotalMarks("500");
        setSubjects([...DEFAULT_SUBJECTS]);
        setCgpa("8.5");
        setConversionFactor("9.5");
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [mode, obtainedMarks, totalMarks, subjects, cgpa, conversionFactor]);

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
                    <li><a href="https://numrexo.com" className="hover:text-ink-soft">Home</a></li>
                    <li className="text-ink-soft">/</li>
                    <li><a href="https://numrexo.com/education" className="hover:text-ink-soft">Education Calculators</a></li>
                    <li className="text-ink-soft">/</li>
                    <li><span className="text-ink-soft">Percentage Marks Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">Marks Calculator</h3>
                        <p className="text-xs text-ink-faint">Calculate percentage from marks or CGPA</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Mode Selection */}
                        <div className="flex gap-2 p-1 bg-surface rounded-lg">
                            <button onClick={() => setMode("single")} className={`flex-1 py-2 text-sm rounded-md transition ${mode === "single" ? "bg-teal-500 text-white" : "text-ink-faint hover:text-ink"}`}>Single Subject</button>
                            <button onClick={() => setMode("multiple")} className={`flex-1 py-2 text-sm rounded-md transition ${mode === "multiple" ? "bg-teal-500 text-white" : "text-ink-faint hover:text-ink"}`}>Multiple Subjects</button>
                            <button onClick={() => setMode("cgpa")} className={`flex-1 py-2 text-sm rounded-md transition ${mode === "cgpa" ? "bg-teal-500 text-white" : "text-ink-faint hover:text-ink"}`}>CGPA to %</button>
                        </div>

                        {mode === "single" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-ink-faint mb-2">Marks Obtained</label>
                                    <input type="number" step="0.5" placeholder="e.g., 85" value={obtainedMarks} onChange={(e) => setObtainedMarks(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-ink-faint mb-2">Total Marks</label>
                                    <input type="number" step="1" placeholder="e.g., 100" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                </div>
                            </>
                        )}

                        {mode === "multiple" && (
                            <>
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold text-ink-faint">Subjects</label>
                                    <button onClick={addSubject} className="text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded hover:bg-teal-50">+ Add Subject</button>
                                </div>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {subjects.map((sub, idx) => (
                                        <div key={sub.id} className="flex gap-2 items-center">
                                            <div className="w-7 text-xs text-ink-faint">{idx + 1}</div>
                                            <div className="flex-1"><input type="number" step="0.5" placeholder="Obtained" value={sub.obtained} onChange={(e) => updateSubject(sub.id, "obtained", e.target.value)} className="w-full px-3 py-2 bg-surface border border-hairline rounded-lg text-ink text-sm focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                            <div className="flex-1"><input type="number" step="1" placeholder="Total" value={sub.total} onChange={(e) => updateSubject(sub.id, "total", e.target.value)} className="w-full px-3 py-2 bg-surface border border-hairline rounded-lg text-ink text-sm focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                            {subjects.length > 1 && <button onClick={() => removeSubject(sub.id)} className="px-2 py-2 text-red-600">✕</button>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {mode === "cgpa" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-ink-faint mb-2">CGPA (0-10 scale)</label>
                                    <input type="number" step="0.01" placeholder="e.g., 8.5" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-ink-faint mb-2">Conversion Factor</label>
                                    <select value={conversionFactor} onChange={(e) => setConversionFactor(e.target.value)} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none cursor-pointer">
                                        <option value="9.5">9.5 (Standard CBSE)</option>
                                        <option value="10">10 (Some Universities)</option>
                                        <option value="9">9 (Other Boards)</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Percentage Result"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter marks to calculate percentage"
                    mainResult={result ? { label: "Percentage", value: `${result.percentage}%`, color: result.gradeColor } : undefined}
                    extraRows={result ? [
                        { label: "Grade", value: result.grade, valueColor: result.gradeColor },
                        ...(result.type === "single" ? [
                            { label: "Marks Obtained", value: result.obtained },
                            { label: "Total Marks", value: result.total },
                            { label: "Marks Lost", value: result.marksLost, valueColor: "text-red-600" },
                        ] : []),
                        ...(result.type === "multiple" ? [
                            { label: "Total Obtained", value: result.totalObtained },
                            { label: "Total Maximum", value: result.totalMax },
                            { label: "Subjects", value: result.subjectCount },
                        ] : []),
                        ...(result.type === "cgpa" ? [
                            { label: "CGPA", value: result.cgpa },
                            { label: "Conversion Factor", value: result.conversionFactor },
                        ] : []),
                    ] : []}
                />
            </div>

            {result && result.type === "multiple" && result.subjectBreakdown && result.subjectBreakdown.length > 0 && (
                <div className="mb-8 bg-surface border border-hairline rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-ink mb-3">Subject-wise Breakdown</h3>
                    <div className="space-y-2">
                        {result.subjectBreakdown.map((sub: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm border-b border-hairline pb-2">
                                <span className="text-ink-faint">Subject {idx + 1}</span>
                                <span className="text-ink-faint">{sub.obtained}/{sub.total}</span>
                                <span className="text-ink font-medium">{sub.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Percentage Marks Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">Percentage Marks Calculator</strong> helps students, teachers, and parents calculate percentage from marks for single or multiple subjects. Also convert CGPA to percentage using standard conversion formulas.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Whether you're calculating exam scores, board results, or semester grades, our calculator provides accurate results with grade classification.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Percentage Marks Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Select <strong className="text-ink">calculation mode</strong> — Single Subject, Multiple Subjects, or CGPA to %.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Enter your marks or CGPA value in the input fields.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> For multiple subjects, click <strong className="text-ink">"+ Add Subject"</strong> to add more subjects.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> Click <strong className="text-ink">"Calculate"</strong> to see your percentage and grade.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 5:</strong> Use the <strong className="text-ink">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Percentage Marks Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-600 mb-2">✓ Exam Results</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Calculate your exam percentage instantly. Know your exact score without manual math errors.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Board Results</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Calculate CBSE, ICSE, or state board percentages. Convert CGPA to percentage using official formulas.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Multiple Subjects</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Handle any number of subjects. Perfect for semester results, annual exams, and competitive exams.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Grade Classification</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">See your letter grade along with percentage. Understand your performance level clearly.</p>
                    </div>
                </div>
            </section>

            {/* Grading Scale Reference */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Grading Scale Reference</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="bg-surface border border-hairline rounded-lg p-2 text-center"><span className="text-purple-600 font-bold">90%+</span><p className="text-xs text-ink-faint">A+ (Outstanding)</p></div>
                    <div className="bg-surface border border-hairline rounded-lg p-2 text-center"><span className="text-green-600 font-bold">80-89%</span><p className="text-xs text-ink-faint">A (Excellent)</p></div>
                    <div className="bg-surface border border-hairline rounded-lg p-2 text-center"><span className="text-teal-600 font-bold">70-79%</span><p className="text-xs text-ink-faint">B+ (Very Good)</p></div>
                    <div className="bg-surface border border-hairline rounded-lg p-2 text-center"><span className="text-blue-600 font-bold">60-69%</span><p className="text-xs text-ink-faint">B (Good)</p></div>
                    <div className="bg-surface border border-hairline rounded-lg p-2 text-center"><span className="text-yellow-700 font-bold">50-59%</span><p className="text-xs text-ink-faint">C (Average)</p></div>
                    <div className="bg-surface border border-hairline rounded-lg p-2 text-center"><span className="text-orange-600 font-bold">40-49%</span><p className="text-xs text-ink-faint">D (Pass)</p></div>
                </div>
            </section>

            {/* Marks to Percentage Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Marks to Percentage Conversion Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">Quick mental math:</strong> For exams out of 100, percentage is simply your marks. For others, use division.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">Multiple subjects:</strong> Always sum obtained marks and total marks separately, then apply formula.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">💡</span><span><strong className="text-ink-soft">CGPA conversion:</strong> CBSE standard is 9.5. Some universities use 10 or 9. Check official notification.</span></li>
                </ul>
            </section>

            {/* CGPA to Percentage Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">CGPA to Percentage Conversion Guide</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">CGPA</th><th className="text-left py-3 px-4 text-ink-faint">CBSE (×9.5)</th><th className="text-left py-3 px-4 text-ink-faint">Some Univ (×10)</th><th className="text-left py-3 px-4 text-ink-faint">Grade</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">10.0</td><td className="py-2 px-4 text-yellow-700">95%</td><td className="py-2 px-4">100%</td><td className="py-2 px-4 text-purple-600">A+</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">9.0</td><td className="py-2 px-4 text-yellow-700">85.5%</td><td className="py-2 px-4">90%</td><td className="py-2 px-4 text-green-600">A</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">8.0</td><td className="py-2 px-4 text-yellow-700">76%</td><td className="py-2 px-4">80%</td><td className="py-2 px-4 text-teal-600">B+</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">7.0</td><td className="py-2 px-4 text-yellow-700">66.5%</td><td className="py-2 px-4">70%</td><td className="py-2 px-4 text-blue-600">B</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">6.0</td><td className="py-2 px-4 text-yellow-700">57%</td><td className="py-2 px-4">60%</td><td className="py-2 px-4 text-yellow-700">C</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Percentage Marks Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed">Calculate percentage from marks for single or multiple subjects. Also convert CGPA to percentage using standard conversion formulas.</p>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}