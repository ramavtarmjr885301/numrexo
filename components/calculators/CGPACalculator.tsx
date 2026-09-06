"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is CGPA and how is it calculated?",
        a: "CGPA (Cumulative Grade Point Average) is the average of grade points across all semesters. Formula: CGPA = Total Grade Points ÷ Total Credits. Most universities use a 10-point scale where 10 = A+, 9 = A, 8 = B+, etc. A CGPA of 8.0 means you're performing well above average.",
    },
    {
        q: "How to convert CGPA to percentage?",
        a: "Different universities have different conversion formulas. Most common: Percentage = CGPA × 9.5 (for 10-point scale). Example: CGPA 8.0 × 9.5 = 76%. Some universities use 10-point multiplier: Percentage = CGPA × 10. Always check your university's official conversion formula.",
    },
    {
        q: "What is a good CGPA?",
        a: "A CGPA of 8.0+ is generally considered very good. 7.0-7.9 is good. 6.0-6.9 is average. Below 6.0 needs improvement. For placements, companies often have cutoffs of 6.0, 6.5, or 7.0. For higher studies abroad, aim for 8.0+.",
    },
    {
        q: "What is the difference between GPA and CGPA?",
        a: "GPA is for a single semester. CGPA is cumulative across all semesters. Example: Semester 1 GPA = 7.5, Semester 2 GPA = 8.0 → CGPA after 2 semesters = (7.5 + 8.0) ÷ 2 = 7.75. CGPA gives your overall academic performance picture.",
    },
    {
        q: "How to calculate SGPA from marks?",
        a: "SGPA (Semester Grade Point Average) = (Credit × Grade Point for each course) ÷ Total Credits. Example: Course A: 3 credits, grade 8, Course B: 4 credits, grade 7 → SGPA = (3×8 + 4×7) ÷ 7 = 7.43. Our calculator handles this automatically.",
    },
    {
        q: "What is the 10-point CGPA scale?",
        a: "The 10-point scale is most common in Indian universities. Grade points: A+ (10), A (9), B+ (8), B (7), C+ (6), C (5), D (4), F (0). Percentage equivalent approximately: CGPA × 9.5. This scale makes it easy to compare performance across different universities.",
    },
    {
        q: "What is the difference between absolute and relative grading?",
        a: "Absolute grading uses fixed cutoffs (90% = A, 80% = B). Relative grading compares you to peers (top 10% get A, next 20% get B). Most Indian universities use absolute grading. IITs and NITs often use relative grading. CGPA calculation differs slightly between systems.",
    },
    {
        q: "How to improve CGPA in final semesters?",
        a: "Focus on high-credit courses (they impact CGPA more), aim for A/A+ grades in easier electives, retake failed subjects, maintain consistency in labs and projects, and seek professor feedback early. Improving CGPA by 0.5 points in last semesters is realistic with focused effort.",
    },
    {
        q: "What CGPA is needed for studying abroad?",
        a: "Top US/UK universities expect 8.5-9.0+ CGPA for MS programs. Good universities: 7.5-8.5. Minimum requirement: usually 6.0-6.5. Strong research/projects can compensate for slightly lower CGPA. Canadian universities often convert to 4.0 scale (8.0+ CGPA ≈ 3.3-3.5 GPA).",
    },
    {
        q: "How to calculate CGPA with failed subjects?",
        a: "Failed subjects (F grade) still earn 0 grade points but count in total credits attempted. Example: 3-credit course failed → contributes 0 points but adds 3 to total credits, significantly lowering CGPA. Retaking passes the course but original F remains on transcript at many universities.",
    },
    {
        q: "What is the CGPA requirement for college placements?",
        a: "Company CGPA cutoffs: Top MNCs (7.5-8.5), Good companies (6.5-7.5), Mass recruiters (6.0+). No-backlog and no-active backlog required at most companies. Some companies allow CGPA rounding (6.98 ≈ 7.0). BPO/KPO roles sometimes accept 5.5+ with good communication skills.",
    },
];

const GRADE_SCALE = [
    { grade: "A+", points: "10", percentage: "90-100%", performance: "Outstanding" },
    { grade: "A", points: "9", percentage: "80-89%", performance: "Excellent" },
    { grade: "B+", points: "8", percentage: "70-79%", performance: "Very Good" },
    { grade: "B", points: "7", percentage: "60-69%", performance: "Good" },
    { grade: "C+", points: "6", percentage: "55-59%", performance: "Above Average" },
    { grade: "C", points: "5", percentage: "50-54%", performance: "Average" },
    { grade: "D", points: "4", percentage: "40-49%", performance: "Pass" },
    { grade: "F", points: "0", percentage: "Below 40%", performance: "Fail" },
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
    name: "CGPA Calculator – Cumulative Grade Point Average Calculator",
    description: "Calculate CGPA from multiple semesters. Convert CGPA to percentage. Perfect for university students tracking academic performance.",
    url: "https://numrexo.com/education/cgpa-calculator",
    applicationCategory: "EducationApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["CGPA calculation", "SGPA per semester", "Percentage conversion", "Grade point tracking"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Education Calculators", item: "https://numrexo.com/education" },
        { "@type": "ListItem", position: 3, name: "CGPA Calculator", item: "https://numrexo.com/education/cgpa-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CGPACalculator() {
    const [semesters, setSemesters] = useState([{ gpa: "", credits: "" }]);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const addSemester = () => {
        setSemesters([...semesters, { gpa: "", credits: "" }]);
    };

    const removeSemester = (index: number) => {
        if (semesters.length > 1) {
            const updated = [...semesters];
            updated.splice(index, 1);
            setSemesters(updated);
        }
    };

    const updateSemester = (index: number, field: string, value: string) => {
        const updated = [...semesters];
        updated[index] = { ...updated[index], [field]: value };
        setSemesters(updated);
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        for (let i = 0; i < semesters.length; i++) {
            const gpa = parseFloat(semesters[i].gpa);
            const credits = parseFloat(semesters[i].credits);

            if (!isNaN(gpa) && !isNaN(credits) && credits > 0) {
                totalPoints += gpa * credits;
                totalCredits += credits;
            }
        }

        if (totalCredits === 0) {
            alert("Please enter at least one semester with valid GPA and credits");
            return;
        }

        const cgpa = totalPoints / totalCredits;
        const percentage = cgpa * 9.5;
        let performance = "";

        if (cgpa >= 8.5) performance = "Outstanding (First Class with Distinction)";
        else if (cgpa >= 7.5) performance = "Excellent (First Class)";
        else if (cgpa >= 6.5) performance = "Very Good (Second Class)";
        else if (cgpa >= 5.5) performance = "Good (Pass Class)";
        else if (cgpa >= 4.5) performance = "Average";
        else performance = "Needs Improvement";

        setResult({
            cgpa: cgpa.toFixed(2),
            percentage: percentage.toFixed(2),
            performance,
            totalCredits,
            semesterCount: semesters.length,
        });
    };

    const resetForm = () => {
        setSemesters([{ gpa: "", credits: "" }]);
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
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/education" itemProp="item" className="hover:text-gray-300">Education Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">CGPA Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Semester Details</h3>
                            <p className="text-xs text-gray-500 mt-1">Enter GPA and credits for each semester</p>
                        </div>
                        <button
                            onClick={addSemester}
                            className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            + Add Semester
                        </button>
                    </div>
                    <div className="p-6 space-y-3">
                        {semesters.map((semester, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <div className="w-16 text-sm text-gray-400">Sem {i + 1}</div>
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="GPA"
                                        value={semester.gpa}
                                        onChange={(e) => updateSemester(i, "gpa", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="Credits"
                                        value={semester.credits}
                                        onChange={(e) => updateSemester(i, "credits", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                {semesters.length > 1 && (
                                    <button
                                        onClick={() => removeSemester(i)}
                                        className="px-2 py-2 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 mt-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate CGPA →
                            </button>
                            <button
                                onClick={resetForm}
                                className="mt-4 px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Your CGPA Result"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Add semesters and calculate CGPA"
                    mainResult={result ? {
                        label: "Cumulative CGPA",
                        value: result.cgpa,
                        color: "text-indigo-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Percentage (approx)", value: `${result.percentage}%`, valueColor: "text-yellow-400" },
                        { label: "Performance Level", value: result.performance },
                        { label: "Total Credits", value: result.totalCredits },
                        { label: "Semesters Completed", value: result.semesterCount },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About CGPA Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">CGPA Calculator</strong> helps you calculate your Cumulative Grade Point Average across all semesters. Perfect for university students who need to track their overall academic performance, plan for placements, or apply for higher studies abroad.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Enter your SGPA (Semester GPA) and credit hours for each semester. The calculator will compute your overall CGPA, approximate percentage, and performance level. Understanding your CGPA helps you set realistic academic goals and identify areas for improvement.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This CGPA Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Click <strong className="text-white">"+ Add Semester"</strong> for each completed semester in your academic program.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">Semester GPA (SGPA)</strong> for each semester (typically on a 10-point scale).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">total credits</strong> for each semester (sum of all course credits).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate CGPA"</strong> to see your overall CGPA, approximate percentage, and performance level.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Tracking Your CGPA Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2">✓ Placement Eligibility</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Most companies have CGPA cutoffs (6.0-8.5). Track your CGPA to ensure you meet eligibility criteria for campus placements and internships.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Higher Studies Abroad</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Top universities require 8.5+ CGPA for MS/MBA programs. Knowing your CGPA helps you plan which universities to target.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Scholarship Eligibility</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Many scholarships (merit-based, government, private) require minimum CGPA thresholds. Track to stay eligible.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Academic Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Identify which semesters need improvement. Plan course selection and study strategies to boost your overall CGPA.</p>
                    </div>
                </div>
            </section>

            {/* University-Specific Conversion Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">University-Specific CGPA to Percentage Formulas</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">University</th>
                                <th className="text-left py-3 px-4 text-gray-400">Conversion Formula</th>
                                <th className="text-left py-3 px-4 text-gray-400">Example (CGPA 8.0)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">DTU / NSIT / IIIT-Delhi</td><td className="py-2 px-4 text-yellow-400">Percentage = CGPA × 10</td><td className="py-2 px-4 text-green-400">80%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Mumbai University</td><td className="py-2 px-4 text-yellow-400">Percentage = (CGPA - 0.75) × 10</td><td className="py-2 px-4 text-green-400">72.5%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Anna University</td><td className="py-2 px-4 text-yellow-400">Percentage = CGPA × 10 - 7.5</td><td className="py-2 px-4 text-green-400">72.5%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">VTU (Visvesvaraya Tech)</td><td className="py-2 px-4 text-yellow-400">Percentage = (CGPA - 0.5) × 10</td><td className="py-2 px-4 text-green-400">75%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Pune University</td><td className="py-2 px-4 text-yellow-400">Percentage = CGPA × 8.8</td><td className="py-2 px-4 text-green-400">70.4%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Most Other Universities</td><td className="py-2 px-4 text-yellow-400">Percentage = CGPA × 9.5</td><td className="py-2 px-4 text-green-400">76%</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">*Always verify with your university's official conversion policy. Our calculator uses 9.5 as default.</p>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">CGPA Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2 text-center">
                        CGPA = (Σ GPA × Credits) ÷ Σ Credits
                    </p>
                    <p className="text-gray-500 text-xs text-center">
                        Example: Sem1 (GPA 7.5, Credits 20), Sem2 (GPA 8.0, Credits 22) → CGPA = (7.5×20 + 8.0×22) ÷ 42 = 7.76
                    </p>
                </div>
            </section>

            {/* Semester Planning Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Semester Planning Tips to Improve CGPA</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Focus on high-credit courses:</strong> A 4-credit course affects CGPA more than a 2-credit course. Perform better in high-credit subjects.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Aim for A/A+ in electives:</strong> Choose elective courses that interest you and where scoring high is achievable.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Retake failed subjects:</strong> Repeating a failed subject can significantly improve your CGPA.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Maintain consistency:</strong> Consistent 7.5+ across all semesters is better than one 9.0 and one 6.0.</span></li>
                </ul>
            </section>

            {/* Grade Scale Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">10-Point CGPA Scale (Most Universities)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Letter Grade</th>
                                <th className="text-left py-3 px-4 text-gray-400">Grade Points</th>
                                <th className="text-left py-3 px-4 text-gray-400">Percentage Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GRADE_SCALE.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.grade}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.points}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.percentage}</td>
                                    <td className="py-3 px-4 text-gray-500">{row.performance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Important Things Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know About CGPA</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Different universities, different scales</strong> — Some use 10-point, others use 4-point. Our calculator uses the 10-point scale common in India.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Include all semesters</strong> — For accurate CGPA, include every completed semester, even if you had low grades.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Check your university's formula</strong> — Percentage conversion varies. Use our result as an estimate, not official calculation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Keep improving</strong> — CGPA can increase in later semesters. Focus on consistent performance.</span>
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