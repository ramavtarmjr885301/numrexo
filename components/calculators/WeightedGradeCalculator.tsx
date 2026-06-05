"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a weighted grade?",
        a: "A weighted grade means different assignments count differently toward your final grade. For example, a final exam might count for 40% of your grade while homework only counts for 10%. Weighted grading is more fair because it emphasizes more important assessments. Most high schools and colleges use weighted grading systems.",
    },
    {
        q: "How do I calculate my weighted grade?",
        a: "Multiply each grade by its weight percentage, then add all the results. Example: Homework (85% × 10%) = 8.5, Quizzes (78% × 20%) = 15.6, Midterm (82% × 30%) = 24.6, Final (88% × 40%) = 35.2 → Total = 83.9%.",
    },
    {
        q: "What is the difference between weighted and unweighted GPA?",
        a: "Unweighted GPA treats all classes equally (4.0 max). Weighted GPA gives extra points for honors, AP, or IB classes (5.0 or 6.0 max). Example: A in regular class = 4.0, A in AP class = 5.0. Weighted GPA rewards students who take challenging courses.",
    },
    {
        q: "Can categories have different weights?",
        a: "Yes! In most courses, categories like Homework, Quizzes, Tests, and Final each have different weights. Example: Homework 15%, Quizzes 20%, Midterm 25%, Final 40%. The total weight of all categories should add to 100%.",
    },
    {
        q: "How do I raise my weighted grade?",
        a: "Focus on high-weight categories first. A 10% improvement on a 40% final exam increases your grade by 4%, but the same improvement on 10% homework only increases by 1%. Study smarter, not just harder.",
    },
    {
        q: "What's a good weighted GPA?",
        a: "A weighted GPA of 4.0+ is excellent (means you're taking honors/AP classes). 3.5-3.9 is very good. 3.0-3.4 is good. For competitive colleges, aim for 4.0+ weighted GPA.",
    },
];

const WEIGHT_EXAMPLES = [
    { category: "Homework", typicalWeight: "10-15%", tip: "Do all assignments, even small ones" },
    { category: "Quizzes", typicalWeight: "15-20%", tip: "Study weekly, don't cram" },
    { category: "Projects/Labs", typicalWeight: "15-25%", tip: "Start early, ask for feedback" },
    { category: "Midterm Exam", typicalWeight: "20-25%", tip: "Review all material before midterm" },
    { category: "Final Exam", typicalWeight: "25-40%", tip: "Start studying at least 2 weeks early" },
    { category: "Participation", typicalWeight: "5-10%", tip: "Speak up in class, attend every session" },
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

        if (weightedGrade >= 97) { letterGrade = "A+"; gpa = 4.0; }
        else if (weightedGrade >= 93) { letterGrade = "A"; gpa = 4.0; }
        else if (weightedGrade >= 90) { letterGrade = "A-"; gpa = 3.7; }
        else if (weightedGrade >= 87) { letterGrade = "B+"; gpa = 3.3; }
        else if (weightedGrade >= 83) { letterGrade = "B"; gpa = 3.0; }
        else if (weightedGrade >= 80) { letterGrade = "B-"; gpa = 2.7; }
        else if (weightedGrade >= 77) { letterGrade = "C+"; gpa = 2.3; }
        else if (weightedGrade >= 73) { letterGrade = "C"; gpa = 2.0; }
        else if (weightedGrade >= 70) { letterGrade = "C-"; gpa = 1.7; }
        else if (weightedGrade >= 67) { letterGrade = "D+"; gpa = 1.3; }
        else if (weightedGrade >= 60) { letterGrade = "D"; gpa = 1.0; }
        else { letterGrade = "F"; gpa = 0.0; }

        setResult({
            weightedGrade: weightedGrade.toFixed(2),
            letterGrade,
            gpa: gpa.toFixed(2),
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
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        value={category.weight}
                                        onChange={(e) => updateCategory(i, "weight", e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                                {categories.length > 1 && (
                                    <button
                                        onClick={() => removeCategory(i)}
                                        className="px-2 py-2 text-red-400 hover:text-red-300"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={calculate}
                            className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate Weighted Grade →
                        </button>
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
                        { label: "GPA (4.0 scale)", value: result.gpa },
                        { label: "Total Weight", value: `${result.totalWeight}%` },
                        { label: "Categories Used", value: result.categoriesCount },
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Weighted Grade Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Weighted Grade Calculator</strong> helps you calculate your overall course grade when different categories have different weights. Perfect for students who want to track their progress across homework, quizzes, tests, and finals.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Simply enter your grade percentage for each category and the weight assigned by your teacher. The calculator will compute your overall weighted grade and show your letter grade and GPA equivalent.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Weighted Grade Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2 text-center">
                        Weighted Grade = Σ (Category Grade × Category Weight ÷ 100)
                    </p>
                    <p className="text-gray-500 text-xs text-center mt-2">
                        Example: Homework (85% × 15%) + Quizzes (78% × 20%) + Midterm (82% × 25%) + Final (88% × 40%) = 83.9%
                    </p>
                </div>
            </section>

            {/* Typical Weight Distribution Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical Grade Category Weights</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
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
                </div>
            </section>

            {/* Weighted vs Unweighted GPA Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Weighted vs Unweighted GPA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Unweighted GPA (4.0 Scale)</h3>
                        <p className="text-xs text-gray-400">• A = 4.0 (93-100%)</p>
                        <p className="text-xs text-gray-400">• B = 3.0 (83-86%)</p>
                        <p className="text-xs text-gray-400">• C = 2.0 (73-76%)</p>
                        <p className="text-xs text-gray-400">• Same for all classes</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Weighted GPA (5.0/6.0 Scale)</h3>
                        <p className="text-xs text-gray-400">• Honors/AP classes get +0.5/1.0 boost</p>
                        <p className="text-xs text-gray-400">• A in AP = 5.0</p>
                        <p className="text-xs text-gray-400">• A in Honors = 4.5</p>
                        <p className="text-xs text-gray-400">• Rewards challenging courses</p>
                    </div>
                </div>
            </section>

            {/* Study Strategy Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Study Strategies for Weighted Grades</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Prioritize high-weight categories</strong> — A 10% improvement on a 40% final helps more than 10% on 10% homework.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Don't neglect small assignments</strong> — Missing a 5% assignment means you can only get 95% max in that category.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Track your progress weekly</strong> — Use this calculator to know where you stand before finals.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Ask about extra credit</strong> — Some teachers offer extra credit that can boost specific categories.</span>
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