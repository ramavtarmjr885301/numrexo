"use client";

import { useState } from "react";
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
];

export default function PercentageMarksCalculator() {
    const [mode, setMode] = useState<"single" | "multiple" | "cgpa">("single");
    const [obtainedMarks, setObtainedMarks] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [subjects, setSubjects] = useState<{ id: number; obtained: string; total: string }[]>([
        { id: 1, obtained: "", total: "" },
    ]);
    const [cgpa, setCgpa] = useState("");
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
            alert("Please enter valid total marks");
            return;
        }

        const percentage = (obtained / total) * 100;
        let grade = "";
        let gradeColor = "";

        if (percentage >= 90) { grade = "A+ (Outstanding)"; gradeColor = "text-purple-400"; }
        else if (percentage >= 80) { grade = "A (Excellent)"; gradeColor = "text-green-400"; }
        else if (percentage >= 70) { grade = "B+ (Very Good)"; gradeColor = "text-teal-400"; }
        else if (percentage >= 60) { grade = "B (Good)"; gradeColor = "text-blue-400"; }
        else if (percentage >= 50) { grade = "C (Average)"; gradeColor = "text-yellow-400"; }
        else if (percentage >= 40) { grade = "D (Pass)"; gradeColor = "text-orange-400"; }
        else { grade = "F (Fail)"; gradeColor = "text-red-400"; }

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
            alert("Please enter valid marks for at least one subject");
            return;
        }

        const overallPercentage = (totalObtained / totalMax) * 100;
        let grade = "";
        let gradeColor = "";

        if (overallPercentage >= 90) { grade = "A+ (Outstanding)"; gradeColor = "text-purple-400"; }
        else if (overallPercentage >= 80) { grade = "A (Excellent)"; gradeColor = "text-green-400"; }
        else if (overallPercentage >= 70) { grade = "B+ (Very Good)"; gradeColor = "text-teal-400"; }
        else if (overallPercentage >= 60) { grade = "B (Good)"; gradeColor = "text-blue-400"; }
        else if (overallPercentage >= 50) { grade = "C (Average)"; gradeColor = "text-yellow-400"; }
        else if (overallPercentage >= 40) { grade = "D (Pass)"; gradeColor = "text-orange-400"; }
        else { grade = "F (Fail)"; gradeColor = "text-red-400"; }

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
            alert("Please enter valid CGPA (0-10)");
            return;
        }

        const percentage = cgpaValue * factor;
        let grade = "";
        let gradeColor = "";

        if (percentage >= 90) { grade = "A+ (Outstanding)"; gradeColor = "text-purple-400"; }
        else if (percentage >= 80) { grade = "A (Excellent)"; gradeColor = "text-green-400"; }
        else if (percentage >= 70) { grade = "B+ (Very Good)"; gradeColor = "text-teal-400"; }
        else if (percentage >= 60) { grade = "B (Good)"; gradeColor = "text-blue-400"; }
        else if (percentage >= 50) { grade = "C (Average)"; gradeColor = "text-yellow-400"; }
        else if (percentage >= 40) { grade = "D (Pass)"; gradeColor = "text-orange-400"; }
        else { grade = "F (Fail)"; gradeColor = "text-red-400"; }

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
        setObtainedMarks("");
        setTotalMarks("");
        setSubjects([{ id: 1, obtained: "", total: "" }]);
        setCgpa("");
        setConversionFactor("9.5");
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://www.numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://www.numrexo.com/education" className="hover:text-gray-300">Education Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Percentage Marks Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Marks Calculator</h3>
                        <p className="text-xs text-gray-500">Calculate percentage from marks or CGPA</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Mode Selection */}
                        <div className="flex gap-2 p-1 bg-[#0f1525] rounded-lg">
                            <button onClick={() => { setMode("single"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${mode === "single" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Single Subject</button>
                            <button onClick={() => { setMode("multiple"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${mode === "multiple" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>Multiple Subjects</button>
                            <button onClick={() => { setMode("cgpa"); setResult(null); }} className={`flex-1 py-2 text-sm rounded-md transition ${mode === "cgpa" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>CGPA to %</button>
                        </div>

                        {mode === "single" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Marks Obtained</label>
                                    <input type="number" step="0.5" placeholder="e.g., 85" value={obtainedMarks} onChange={(e) => setObtainedMarks(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Total Marks</label>
                                    <input type="number" step="1" placeholder="e.g., 100" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                                </div>
                            </>
                        )}

                        {mode === "multiple" && (
                            <>
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold text-gray-400">Subjects</label>
                                    <button onClick={addSubject} className="text-xs px-2 py-1 bg-teal-500/20 text-teal-400 rounded hover:bg-teal-500/30">+ Add Subject</button>
                                </div>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {subjects.map((sub, idx) => (
                                        <div key={sub.id} className="flex gap-2 items-center">
                                            <div className="w-7 text-xs text-gray-500">{idx + 1}</div>
                                            <div className="flex-1"><input type="number" step="0.5" placeholder="Obtained" value={sub.obtained} onChange={(e) => updateSubject(sub.id, "obtained", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div>
                                            <div className="flex-1"><input type="number" step="1" placeholder="Total" value={sub.total} onChange={(e) => updateSubject(sub.id, "total", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div>
                                            {subjects.length > 1 && <button onClick={() => removeSubject(sub.id)} className="px-2 py-2 text-red-400">✕</button>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {mode === "cgpa" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">CGPA (0-10 scale)</label>
                                    <input type="number" step="0.01" placeholder="e.g., 8.5" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Conversion Factor</label>
                                    <select value={conversionFactor} onChange={(e) => setConversionFactor(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                        <option value="9.5">9.5 (Standard CBSE)</option>
                                        <option value="10">10 (Some Universities)</option>
                                        <option value="9">9 (Other Boards)</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
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
                            { label: "Marks Lost", value: result.marksLost, valueColor: "text-red-400" },
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
                <div className="mb-8 bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Subject-wise Breakdown</h3>
                    <div className="space-y-2">
                        {result.subjectBreakdown.map((sub: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm border-b border-gray-700 pb-2">
                                <span className="text-gray-400">Subject {idx + 1}</span>
                                <span className="text-gray-400">{sub.obtained}/{sub.total}</span>
                                <span className="text-white font-medium">{sub.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Percentage Marks Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate percentage from marks for single or multiple subjects. Also convert CGPA to percentage using standard conversion formulas.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Grading Scale Reference</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2 text-center"><span className="text-purple-400 font-bold">90%+</span><p className="text-xs text-gray-500">A+ (Outstanding)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2 text-center"><span className="text-green-400 font-bold">80-89%</span><p className="text-xs text-gray-500">A (Excellent)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2 text-center"><span className="text-teal-400 font-bold">70-79%</span><p className="text-xs text-gray-500">B+ (Very Good)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2 text-center"><span className="text-blue-400 font-bold">60-69%</span><p className="text-xs text-gray-500">B (Good)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2 text-center"><span className="text-yellow-400 font-bold">50-59%</span><p className="text-xs text-gray-500">C (Average)</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-lg p-2 text-center"><span className="text-orange-400 font-bold">40-49%</span><p className="text-xs text-gray-500">D (Pass)</p></div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}