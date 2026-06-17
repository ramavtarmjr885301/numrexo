"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a weighted grade?",
        a: "A weighted grade means different assignments count differently toward your final grade. For example, a final exam might count for 40% of your grade while homework only counts for 10%. Weighted grading is more fair because it emphasizes more important assessments. Most high schools and colleges use weighted grading systems. The total of all category weights should always equal 100%.",
    },
    {
        q: "How do I calculate my weighted grade?",
        a: "Multiply each grade by its weight percentage, then add all the results. Example: Homework (85% × 15%) = 12.75, Quizzes (78% × 20%) = 15.6, Midterm (82% × 25%) = 20.5, Final (88% × 40%) = 35.2 → Total = 84.05%. Our calculator does this automatically for all your categories.",
    },
    {
        q: "What is the difference between weighted and unweighted GPA?",
        a: "Unweighted GPA treats all classes equally (4.0 max). Weighted GPA gives extra points for honors, AP, or IB classes (5.0 or 6.0 max). Example: A in regular class = 4.0, A in AP class = 5.0. Weighted GPA rewards students who take challenging courses. Many colleges look at weighted GPA to compare students across different schools.",
    },
    {
        q: "Can categories have different weights?",
        a: "Yes! In most courses, categories like Homework, Quizzes, Tests, and Final each have different weights. Example: Homework 15%, Quizzes 20%, Midterm 25%, Final 40%. The total weight of all categories should add to 100%. Our calculator lets you add, remove, and customize categories with any weights you need.",
    },
    {
        q: "How do I raise my weighted grade?",
        a: "Focus on high-weight categories first. A 10% improvement on a 40% final exam increases your grade by 4%, but the same improvement on 10% homework only increases by 1%. Study smarter, not just harder. Prioritize your time on the categories that count most toward your final grade.",
    },
    {
        q: "What's a good weighted GPA?",
        a: "A weighted GPA of 4.0+ is excellent (means you're taking honors/AP classes). 3.5-3.9 is very good. 3.0-3.4 is good. For competitive colleges, aim for 4.0+ weighted GPA. Remember: weighted GPAs are school-specific - colleges understand that different schools have different weighting policies.",
    },
    {
        q: "How do I add categories to the calculator?",
        a: "Click the '+ Add Category' button at the top right of the form. Enter a name, your grade percentage, and the weight for that category. You can add as many categories as you need. You can also remove categories by clicking the ✕ button next to any category. The total weight should add to 100% for accurate results.",
    },
    {
        q: "What GPA scale does the calculator use?",
        a: "The calculator uses the standard 4.0 unweighted GPA scale: A+ (4.0), A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), F (0.0). This is the most common scale used in US high schools and colleges. Weighted GPAs can be higher than 4.0 when honors/AP classes are included.",
    },
    {
        q: "How accurate is the weighted grade calculator?",
        a: "The calculator is mathematically accurate to 2 decimal places. For the most accurate results, ensure all category grades and weights are entered correctly. The calculator will warn you if the total weight doesn't equal 100%. Always double-check your inputs against your syllabus or grade book for maximum accuracy.",
    },
    {
        q: "What if my teacher uses a different grading scale?",
        a: "The calculator is fully customizable - you can change category names, weights, and grades to match any grading system. If your teacher uses a different letter grade scale (e.g., 90% = A instead of 93%), you can adjust the grade boundaries in your own calculation. The weighted grade formula remains the same regardless of the scale.",
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
    name: "Weighted Grade Calculator – Category-Based Grade Calculator",
    description: "Calculate your weighted grade by category. Perfect for students tracking grades across homework, quizzes, tests, and finals.",
    url: "https://www.numrexo.com/education/weighted-grade-calculator",
    applicationCategory: "EducationApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Category-based grading", "Weighted average calculation", "Grade point conversion", "Progress tracking"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Education Calculators", item: "https://www.numrexo.com/education" },
        { "@type": "ListItem", position: 3, name: "Weighted Grade Calculator", item: "https://www.numrexo.com/education/weighted-grade-calculator" },
    ],
});

const WEIGHT_EXAMPLES = [
    { category: "📝 Homework", typicalWeight: "10-15%", tip: "Do all assignments, even small ones" },
    { category: "📋 Quizzes", typicalWeight: "15-20%", tip: "Study weekly, don't cram" },
    { category: "📊 Projects/Labs", typicalWeight: "15-25%", tip: "Start early, ask for feedback" },
    { category: "📚 Midterm Exam", typicalWeight: "20-25%", tip: "Review all material before midterm" },
    { category: "🎯 Final Exam", typicalWeight: "25-40%", tip: "Start studying at least 2 weeks early" },
    { category: "🗣️ Participation", typicalWeight: "5-10%", tip: "Speak up in class, attend every session" },
    { category: "📖 Reading Quizzes", typicalWeight: "5-10%", tip: "Keep up with assigned readings" },
    { category: "✍️ Essays/Papers", typicalWeight: "15-25%", tip: "Use writing center for feedback" },
];

const GPA_SCALE = [
    { letter: "A+", min: 97, gpa: 4.0, description: "Excellent" },
    { letter: "A", min: 93, gpa: 4.0, description: "Excellent" },
    { letter: "A-", min: 90, gpa: 3.7, description: "Very Good" },
    { letter: "B+", min: 87, gpa: 3.3, description: "Good" },
    { letter: "B", min: 83, gpa: 3.0, description: "Good" },
    { letter: "B-", min: 80, gpa: 2.7, description: "Above Average" },
    { letter: "C+", min: 77, gpa: 2.3, description: "Average" },
    { letter: "C", min: 73, gpa: 2.0, description: "Average" },
    { letter: "C-", min: 70, gpa: 1.7, description: "Below Average" },
    { letter: "D+", min: 67, gpa: 1.3, description: "Poor" },
    { letter: "D", min: 60, gpa: 1.0, description: "Poor" },
    { letter: "F", min: 0, gpa: 0.0, description: "Failing" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WeightedGradeCalculator() {
    const [categories, setCategories] = useState([
        { name: "Homework", grade: "", weight: "15" },
        { name: "Quizzes", grade: "", weight: "20" },
        { name: "Midterm", grade: "", weight: "25" },
        { name: "Final Exam", grade: "", weight: "40" },
    ]);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setCategories([
            { name: "Homework", grade: "", weight: "15" },
            { name: "Quizzes", grade: "", weight: "20" },
            { name: "Midterm", grade: "", weight: "25" },
            { name: "Final Exam", grade: "", weight: "40" },
        ]);
        setResult(null);
    };

    const addCategory = () => {
        setCategories([...categories, { name: `Category ${categories.length + 1}`, grade: "", weight: "" }]);
    };

    const removeCategory = (index: number) => {
        if (categories.length > 1) {
            const updated = [...categories];
            updated.splice(index, 1);
            setCategories(updated);
        }
    };

    const updateCategory = (index: number, field: string, value: string) => {
        const updated = [...categories];
        updated[index] = { ...updated[index], [field]: value };
        setCategories(updated);
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalWeight = 0;

        for (let i = 0; i < categories.length; i++) {
            const grade = parseFloat(categories[i].grade);
            const weight = parseFloat(categories[i].weight);

            if (!isNaN(grade) && !isNaN(weight) && weight > 0) {
                totalPoints += (grade * weight) / 100;
                totalWeight += weight;
            }
        }

        if (totalWeight === 0) {
            alert("Please enter at least one category with valid grade and weight");
            return;
        }

        if (Math.abs(totalWeight - 100) > 0.5) {
            alert(`Warning: Total weight is ${totalWeight}%. It should be 100% for accurate results.`);
        }

        const weightedGrade = totalPoints;
        let letterGrade = "";
        let gpa = 0;
        let gradeDescription = "";

        for (const scale of GPA_SCALE) {
            if (weightedGrade >= scale.min) {
                letterGrade = scale.letter;
                gpa = scale.gpa;
                gradeDescription = scale.description;
                break;
            }
        }

        setResult({
            weightedGrade: weightedGrade.toFixed(2),
            letterGrade,
            gpa: gpa.toFixed(2),
            gradeDescription,
            totalWeight,
            categoriesCount: categories.length,
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
                        <span itemProp="name" className="text-gray-300">Weighted Grade Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Grade Categories</h3>
                            <p className="text-xs text-gray-500 mt-1">Enter grade and weight for each category</p>
                        </div>
                        <button
                            onClick={addCategory}
                            className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            + Add Category
                        </button>
                    </div>
                    <div className="p-6 space-y-3">
                        {categories.map((category, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={category.name}
                                    onChange={(e) => updateCategory(i, "name", e.target.value)}
                                    className="w-28 px-2 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                                />
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Grade %"
                                        value={category.grade}
                                        onChange={(e) => updateCategory(i, "grade", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        value={category.weight}
                                        onChange={(e) => updateCategory(i, "weight", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                                {categories.length > 1 && (
                                    <button
                                        onClick={() => removeCategory(i)}
                                        className="px-2 py-2 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex gap-3 pt-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Weighted Grade →
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
                    title="Your Weighted Grade"
                    isEmpty={!result}
                    emptyIcon="⚖️"
                    emptyText="Enter your grade categories and press Calculate"
                    mainResult={result ? {
                        label: "Weighted Grade",
                        value: `${result.weightedGrade}%`,
                        color: result.weightedGrade >= 60 ? "text-green-400" : "text-red-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Letter Grade", value: result.letterGrade, valueColor: "text-yellow-400" },
                        { label: `Grade Description`, value: result.gradeDescription },
                        { label: "GPA (4.0 scale)", value: result.gpa },
                        { label: "Total Weight", value: `${result.totalWeight}%` },
                        { label: "Categories Used", value: result.categoriesCount },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Weighted Grade Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Weighted Grade Calculator</strong> helps you calculate your overall course grade when different categories have different weights. Perfect for students who want to track their progress across homework, quizzes, tests, and finals.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Simply enter your grade percentage for each category and the weight assigned by your teacher. The calculator will compute your overall weighted grade and show your letter grade and GPA equivalent. You can add or remove categories to match your specific course structure.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding weighted grades helps you prioritize your study time effectively. Focus on high-weight categories for the biggest impact on your final grade.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Weighted Grade Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">category names</strong> (e.g., Homework, Quizzes, Final Exam).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">grade percentage</strong> for each category.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">weight</strong> for each category (should total 100%).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Add Category"</strong> to add more categories if needed.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Weighted Grade"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Weighted Grade Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Track Your Progress</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly where you stand in each class. No more guessing your overall grade before finals.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Prioritize Study Time</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Identify which categories count most toward your final grade. Study smarter, not harder.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Customizable Categories</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Add, remove, or rename categories to match any course structure. Works for any grading system.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ GPA Conversion</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See your grade as a letter grade and GPA equivalent. Understand where you stand for college admissions.</p>
                    </div>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Weighted Grade Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2 text-center">
                        Weighted Grade = Σ (Category Grade × Category Weight ÷ 100)
                    </p>
                    <p className="text-gray-500 text-xs text-center mt-2">
                        Example: Homework (85% × 15%) + Quizzes (78% × 20%) + Midterm (82% × 25%) + Final (88% × 40%) = 84.05%
                    </p>
                </div>
            </section>

            {/* Typical Weight Distribution Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical Grade Category Weights</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Category</th>
                                <th className="text-left py-3 px-4 text-gray-400">Typical Weight</th>
                                <th className="text-left py-3 px-4 text-gray-400">Study Tip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {WEIGHT_EXAMPLES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.category}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.typicalWeight}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">{row.tip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Weights vary by teacher and subject. Always check your course syllabus for exact weights.
                    </p>
                </div>
            </section>

            {/* GPA Scale Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Letter Grade to GPA Scale</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Letter Grade</th>
                                <th className="text-left py-3 px-4 text-gray-400">Minimum Percentage</th>
                                <th className="text-left py-3 px-4 text-gray-400">GPA (4.0 Scale)</th>
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GPA_SCALE.map((row, i) => (
                                <tr key={i} className={`border-b border-gray-800/50 hover:bg-white/5 ${i === 0 ? 'text-green-400' : i < 4 ? 'text-blue-400' : i < 8 ? 'text-yellow-400' : i < 11 ? 'text-orange-400' : 'text-red-400'}`}>
                                    <td className="py-2 px-4 font-bold">{row.letter}</td>
                                    <td className="py-2 px-4">{row.min}%</td>
                                    <td className="py-2 px-4">{row.gpa.toFixed(1)}</td>
                                    <td className="py-2 px-4 text-gray-400">{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * This is the standard unweighted GPA scale. Weighted GPAs can exceed 4.0 with honors/AP classes.
                    </p>
                </div>
            </section>

            {/* Weighted vs Unweighted GPA Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Weighted vs Unweighted GPA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">📊 Unweighted GPA (4.0 Scale)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• A = 4.0 (93-100%)</li>
                            <li>• B = 3.0 (83-86%)</li>
                            <li>• C = 2.0 (73-76%)</li>
                            <li>• D = 1.0 (60-66%)</li>
                            <li>• Same for all classes</li>
                            <li>• Doesn't account for difficulty</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">⭐ Weighted GPA (5.0/6.0 Scale)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Honors/AP classes get +0.5/1.0 boost</li>
                            <li>• A in AP = 5.0</li>
                            <li>• A in Honors = 4.5</li>
                            <li>• Rewards challenging courses</li>
                            <li>• Shows academic rigor</li>
                            <li>• Preferred by competitive colleges</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Grade Improvement Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Grade Improvement Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Focus on high-weight categories:</strong> A 10% improvement on a 40% final helps more than 10% on 10% homework. Prioritize your time accordingly.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Don't neglect small assignments:</strong> Missing a 5% assignment means you can only get 95% max in that category. Every point counts.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use this calculator weekly:</strong> Track your progress regularly. Know where you stand before it's too late to improve.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Ask about extra credit:</strong> Some teachers offer extra credit that can boost specific categories. Always ask if it's available.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Review past exams:</strong> Understand what you missed. Similar concepts often appear on future assessments.</span>
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