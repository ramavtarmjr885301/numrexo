// components/calculators/GPACalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const GRADE_POINTS: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0,
};

const FAQ_DATA = [
    { q: "What is GPA and how is it calculated?", a: "GPA (Grade Point Average) is calculated by dividing total grade points earned by total credit hours attempted. Grade points = Grade value × Credit hours. Example: A (4.0) in 3-credit course = 12 grade points." },
    { q: "What is a good GPA?", a: "Generally: 3.5-4.0 = Excellent, 3.0-3.4 = Good, 2.5-2.9 = Average, Below 2.5 = Needs improvement. Ivy League graduate schools often expect 3.5+." },
    { q: "How to calculate GPA from percentage?", a: "Convert percentage to grade points using your institution's scale. Common scale: 90-100% = A (4.0), 80-89% = B (3.0), 70-79% = C (2.0), etc. Our calculator supports direct grade entry." },
    { q: "What is the difference between weighted and unweighted GPA?", a: "Unweighted GPA (0-4.0 scale) treats all courses equally. Weighted GPA (0-5.0 scale) adds extra points for AP/IB/Honors courses (AP = +1.0, Honors = +0.5). Weighted GPA better reflects course difficulty. Our calculator uses unweighted standard scale." },
    { q: "How to calculate GPA on a 4.0 scale?", a: "Standard 4.0 scale: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. Formula: (Grade Points × Credits) ÷ Total Credits. Example: A (3 credits) + B (3 credits) = (4×3)+(3×3)=21 ÷6=3.5 GPA." },
    { q: "What is a good GPA for graduate school?", a: "Top graduate schools (MIT, Stanford, Harvard) expect 3.7+. Good schools expect 3.3-3.7. Minimum for most programs is 3.0. Some fields (Engineering, CS) accept slightly lower GPAs with strong GRE/research experience." },
    { q: "How to convert GPA to percentage?", a: "No universal conversion. Common approximations: GPA × 25 = %. Example: 3.5 × 25 = 87.5%. Australian scale: 7.0 scale ÷ 7 × 100. Indian universities: Some use 10-point scale (8.0 = 75%). Check your institution's official conversion table." },
    { q: "What is cumulative GPA vs semester GPA?", a: "Semester GPA = grades from one semester only. Cumulative GPA = average of ALL semesters. Example: Semester 1 GPA 3.0, Semester 2 GPA 4.0 = Cumulative 3.5. Cumulative matters for graduation and job applications." },
    { q: "How to calculate GPA with pass/fail courses?", a: "Pass/Fail courses do NOT affect GPA. They count for credits but have no grade points. Example: A (3cr) + Pass (3cr) + B (3cr) = (4×3)+(0×3)+(3×3)=21 ÷9=2.33 GPA (Pass excluded from points but included in credits)." },
    { q: "How to raise your GPA quickly?", a: "Strategies: 1) Retake low-grade courses (grade replacement), 2) Take more credits (new A's outweigh old C's), 3) Focus on high-credit courses (they impact GPA more), 4) Get tutoring for weak subjects, 5) Talk to professors about extra credit." },
];

export default function GPACalculator() {
    const [courses, setCourses] = useState([{ grade: "A", credits: "3" }]);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addCourse = () => setCourses([...courses, { grade: "A", credits: "3" }]);
    const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index));
    const updateCourse = (index: number, field: string, value: string) => {
        const updated = [...courses];
        updated[index] = { ...updated[index], [field]: value };
        setCourses(updated);
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const credits = parseFloat(course.credits);
            const gradePoint = GRADE_POINTS[course.grade] || 0;
            if (!isNaN(credits) && credits > 0) {
                totalPoints += gradePoint * credits;
                totalCredits += credits;
            }
        });

        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        let letterGrade = "";
        if (gpa >= 3.5) letterGrade = "A/A+";
        else if (gpa >= 3.0) letterGrade = "B+";
        else if (gpa >= 2.5) letterGrade = "B";
        else if (gpa >= 2.0) letterGrade = "C";
        else if (gpa >= 1.5) letterGrade = "D";
        else letterGrade = "F";

        setResult({ gpa: gpa.toFixed(2), letterGrade, totalCredits, totalPoints: totalPoints.toFixed(2) });
    };

    const resetForm = () => {
        setCourses([{ grade: "A", credits: "3" }]);
        setResult(null);
    };

    return (
        <>
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/education" className="hover:text-gray-300">Education Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">GPA Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="font-semibold">Course Details</h3>
                        <button onClick={addCourse} className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">+ Add Course</button>
                    </div>
                    <div className="p-6 space-y-3">
                        {courses.map((course, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <select value={course.grade} onChange={(e) => updateCourse(i, "grade", e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm cursor-pointer">
                                    {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                                <div className="relative w-24">
                                    <input type="number" placeholder="3" value={course.credits} onChange={(e) => updateCourse(i, "credits", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">cr</span>
                                </div>
                                {courses.length > 1 && <button onClick={() => removeCourse(i)} className="px-2 py-2 text-red-400 hover:text-red-300 transition-colors">✕</button>}
                            </div>
                        ))}
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 mt-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate GPA →</button>
                            <button onClick={resetForm} className="mt-4 px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Your GPA"
                    isEmpty={!result}
                    emptyIcon="📚"
                    emptyText="Add courses and calculate GPA"
                    mainResult={result ? { label: "Cumulative GPA", value: result.gpa, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Letter Grade", value: result.letterGrade },
                        { label: "Total Credits", value: result.totalCredits },
                        { label: "Total Grade Points", value: result.totalPoints }
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About GPA Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">GPA Calculator</strong> helps students calculate their Grade Point Average based on course grades and credit hours. Whether you're in high school, college, or graduate school, know your exact standing.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Simply add your courses, select letter grades (A+, A, B+, etc.), and enter credit hours. The calculator instantly computes your GPA on a 4.0 scale, letter grade equivalent, and total grade points.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This GPA Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Click <strong className="text-white">"+ Add Course"</strong> for each course you've taken.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">letter grade</strong> you received (A+, A, B+, B, etc.).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">credit hours</strong> for each course (e.g., 3 credits).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate GPA"</strong> to see your cumulative GPA.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all courses and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a GPA Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Track Academic Progress</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your exact standing each semester. Monitor improvement over time. Identify courses dragging down your GPA.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Scholarship Eligibility</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Many scholarships require minimum GPAs (3.0-3.5). Calculate if you qualify before applying.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Graduate School Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your competitiveness for graduate programs. Calculate projected GPA after remaining courses.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Academic Probation Warning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Identify if you're at risk of academic probation. Calculate what grades you need to improve.</p>
                    </div>
                </div>
            </section>

            {/* GPA Scale Reference */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">4.0 GPA Scale Reference</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Letter Grade</th>
                                <th className="text-left py-3 px-4 text-gray-400">Grade Points</th>
                                <th className="text-left py-3 px-4 text-gray-400">Percentage Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Performance Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-green-400">A+/A</td>
                                <td className="py-2 px-4">4.0</td>
                                <td className="py-2 px-4">90-100%</td>
                                <td className="py-2 px-4">Excellent</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-blue-400">A-</td>
                                <td className="py-2 px-4">3.7</td>
                                <td className="py-2 px-4">85-89%</td>
                                <td className="py-2 px-4">Very Good</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-blue-400">B+</td>
                                <td className="py-2 px-4">3.3</td>
                                <td className="py-2 px-4">80-84%</td>
                                <td className="py-2 px-4">Good Plus</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-blue-400">B</td>
                                <td className="py-2 px-4">3.0</td>
                                <td className="py-2 px-4">75-79%</td>
                                <td className="py-2 px-4">Good</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-yellow-400">B-</td>
                                <td className="py-2 px-4">2.7</td>
                                <td className="py-2 px-4">70-74%</td>
                                <td className="py-2 px-4">Satisfactory</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-yellow-400">C+</td>
                                <td className="py-2 px-4">2.3</td>
                                <td className="py-2 px-4">65-69%</td>
                                <td className="py-2 px-4">Average Plus</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-yellow-400">C</td>
                                <td className="py-2 px-4">2.0</td>
                                <td className="py-2 px-4">60-64%</td>
                                <td className="py-2 px-4">Average</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-orange-400">C-</td>
                                <td className="py-2 px-4">1.7</td>
                                <td className="py-2 px-4">55-59%</td>
                                <td className="py-2 px-4">Below Average</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-red-400">D</td>
                                <td className="py-2 px-4">1.0</td>
                                <td className="py-2 px-4">50-54%</td>
                                <td className="py-2 px-4">Passing</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-red-400">F</td>
                                <td className="py-2 px-4">0.0</td>
                                <td className="py-2 px-4">Below 50%</td>
                                <td className="py-2 px-4">Failing</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* How to Improve Your GPA */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Improve Your GPA</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Retake low-grade courses:</strong> Many schools replace failing grades when you retake and pass.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Focus on high-credit courses:</strong> A 4-credit A affects GPA more than a 1-credit A.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Seek tutoring early:</strong> Don't wait until finals. Use campus tutoring centers for difficult subjects.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Talk to professors:</strong> Ask about extra credit, grade adjustments, or incomplete policies.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Time management:</strong> Create study schedules. Prioritize assignments by weight and due date.</span></li>
                </ul>
            </section>

            {/* International GPA Conversion */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">International GPA Conversion Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Country</th><th className="text-left py-3 px-4 text-gray-400">Scale</th><th className="text-left py-3 px-4 text-gray-400">Approx. 4.0 Equivalent</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">India (Percentage)</td><td className="py-2 px-4">0-100%</td><td className="py-2 px-4 text-yellow-400">85%+ = 4.0</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">India (10-point CGPA)</td><td className="py-2 px-4">0-10</td><td className="py-2 px-4 text-yellow-400">8.5+ = 4.0</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">UK</td><td className="py-2 px-4">First Class, Upper Second</td><td className="py-2 px-4 text-yellow-400">First Class = 3.7-4.0</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Germany</td><td className="py-2 px-4">1.0-6.0 (1.0 best)</td><td className="py-2 px-4 text-yellow-400">1.0-1.5 = 4.0</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Australia</td><td className="py-2 px-4">7.0 scale</td><td className="py-2 px-4 text-yellow-400">7.0 = 4.0</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}