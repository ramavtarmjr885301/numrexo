"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What types of scholarships are available?",
        a: "Scholarships come in many forms: Merit-based (academic excellence, high GPA, test scores), Need-based (financial need demonstrated through FAFSA/CSS Profile), Athletic (sports achievements), Demographic-specific (race, ethnicity, gender, first-generation), Field-of-study (STEM, arts, humanities), Talent-based (music, art, writing, performance), Military (veterans, dependents), Employer-sponsored (company scholarships for employees and dependents), Community service (volunteer work), and Leadership (student government, civic engagement). Apply to multiple types to maximize your chances.",
    },
    {
        q: "How do I maximize my scholarship chances?",
        a: "Top strategies: 1) Apply early and often - many scholarships have rolling deadlines, 2) Maintain strong academics (GPA > 3.5), 3) Write compelling, personalized essays for each scholarship, 4) Get excellent recommendation letters from teachers/mentors who know you well, 5) Apply for multiple smaller scholarships ($500-$5,000) - they have less competition, 6) Build a strong extracurricular profile, 7) Use scholarship matching websites, 8) Tailor each application to the scholarship's mission, 9) Proofread everything carefully, 10) Follow up after submission. Quantity + Quality = Success.",
    },
    {
        q: "Is scholarship income taxable?",
        a: "Scholarships used for qualified education expenses (tuition, fees, required books, supplies, and equipment) are tax-free. Amounts used for room, board, travel, and other living expenses are taxable as ordinary income. Key rules: 1) Must be a degree-seeking student, 2) Funds must be used for educational purposes, 3) Report taxable portion on Form 1040, 4) Some scholarship providers may issue Form 1098-T. Consult a tax professional for specific advice. Fellowship stipends are often fully taxable.",
    },
    {
        q: "Can I get scholarships after starting college?",
        a: "Yes! Many scholarships are available for current students including: Academic achievement scholarships (based on college GPA), Major-specific awards (declare your major to access more), Departmental scholarships (within your college/major), Study abroad scholarships, Research grants (undergraduate research), Leadership scholarships (student government, clubs), Internship funding, Graduate school preparation, and Special project funding. Check with your financial aid office and academic department regularly for new opportunities.",
    },
    {
        q: "What is the difference between scholarships and grants?",
        a: "Scholarships are typically merit-based (achievement, talent, specific criteria) and often have application requirements. Grants are generally need-based and awarded based on financial need (FAFSA). Both don't need to be repaid. Scholarships often have more competitive requirements, while grants are usually more need-driven. Examples: Pell Grant (need-based), Federal SEOG (need-based), State grants, Institutional merit scholarships, Private scholarships. Both are excellent forms of free money for college.",
    },
    {
        q: "How do I write a winning scholarship essay?",
        a: "Key tips for scholarship essays: 1) Research the scholarship's mission and values, 2) Tell a personal, authentic story that showcases your unique qualities, 3) Showcase your achievements and goals, 4) Explain how the scholarship will help you make an impact, 5) Be specific - use concrete examples, 6) Demonstrate leadership and community service, 7) Connect your goals to the scholarship's purpose, 8) Show passion and commitment, 9) Edit ruthlessly - cut unnecessary words, 10) Get feedback from teachers or mentors, 11) Proofread multiple times, 12) Follow word limits strictly. A compelling essay can overcome lower grades or test scores.",
    },
    {
        q: "What are the best scholarship search engines?",
        a: "Top scholarship search platforms: 1) Fastweb (largest database), 2) Scholarships.com (comprehensive), 3) Cappex (matches based on profile), 4) Chegg Scholarships (user-friendly), 5) College Board Scholarship Search (official), 6) Peterson's (reliable), 7) Niche (student reviews included), 8) ScholarshipOwl (quick application tools), 9) Going Merry (organized applications), 10) US Department of Labor (government database). Use multiple platforms and set up email alerts for new opportunities matching your profile. Avoid scams - legitimate scholarships never charge application fees.",
    },
    {
        q: "What is the FAFSA and why is it important?",
        a: "FAFSA (Free Application for Federal Student Aid) is the official form to apply for federal financial aid in the US. It determines eligibility for: Federal Pell Grants (up to $7,395/year), Federal Work-Study, Direct Subsidized Loans, Direct Unsubsidized Loans, PLUS Loans, and State grants. It's also used by many colleges for institutional aid. Submit early (October 1st) for maximum consideration. Common mistakes: 1) Missing deadlines, 2) Incorrect tax information (use IRS Data Retrieval Tool), 3) Missing required signatures, 4) Not including all required colleges. The FAFSA is FREE - never pay to file it.",
    },
    {
        q: "How do athletic scholarships work?",
        a: "Athletic scholarships are offered by NCAA Division I and II schools (Division III doesn't offer athletic scholarships). Key facts: 1) Coaches recruit athletes, 2) Scholarships can be full or partial, 3) They're typically one-year renewable, 4) Academic eligibility matters (minimum GPA/test scores), 5) Different sports have different scholarship limits (Football: 85 scholarships, Basketball: 13, Soccer: 9.9), 6) NAIA and NJCAA also offer scholarships, 7) Initial eligibility requirements include core courses and GPA, 8) Title IX ensures equal opportunities for women. Contact coaches early and create athletic highlight videos.",
    },
    {
        q: "What happens to scholarships if I transfer schools?",
        a: "Transferring can affect your scholarships: 1) Institutional scholarships usually don't transfer (check with new school), 2) Federal grants (Pell) transfer automatically, 3) Private scholarships - check provider rules, 4) State grants may have transfer restrictions, 5) Athletic scholarships require NCAA transfer rules, 6) Some scholarships require maintaining specific GPA at new school, 7) Notify all scholarship providers about your transfer, 8) Apply for new scholarships at your transfer institution, 9) Some schools offer transfer-specific scholarships, 10) Keep all documentation. Plan early and communicate with both schools' financial aid offices.",
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
    name: "Scholarship Calculator – Financial Aid Calculator",
    description: "Calculate your college funding gap. Track scholarships, grants, work-study, and family contributions to plan your education costs.",
    url: "https://numrexo.com/education/scholarship-calculator",
    applicationCategory: "EducationApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Scholarship tracking", "Financial aid calculation", "Funding gap analysis", "Coverage percentage"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Education Calculators", item: "https://numrexo.com/education" },
        { "@type": "ListItem", position: 3, name: "Scholarship Calculator", item: "https://numrexo.com/education/scholarship-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScholarshipCalculator() {
    const [totalCost, setTotalCost] = useState("");
    const [meritScholarship, setMeritScholarship] = useState("");
    const [needScholarship, setNeedScholarship] = useState("");
    const [externalScholarship, setExternalScholarship] = useState("");
    const [grants, setGrants] = useState("");
    const [workStudy, setWorkStudy] = useState("");
    const [familyContribution, setFamilyContribution] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setTotalCost("");
        setMeritScholarship("");
        setNeedScholarship("");
        setExternalScholarship("");
        setGrants("");
        setWorkStudy("");
        setFamilyContribution("");
        setResult(null);
    };

    const calculate = () => {
        const total = parseFloat(totalCost) || 0;
        const merit = parseFloat(meritScholarship) || 0;
        const need = parseFloat(needScholarship) || 0;
        const external = parseFloat(externalScholarship) || 0;
        const grantAmt = parseFloat(grants) || 0;
        const work = parseFloat(workStudy) || 0;
        const family = parseFloat(familyContribution) || 0;

        if (total <= 0) {
            alert("Please enter total college cost");
            return;
        }

        const totalScholarship = merit + need + external;
        const totalAid = totalScholarship + grantAmt + work;
        const remainingCost = total - totalAid - family;
        const percentageCovered = (totalAid / total) * 100;
        const scholarshipPercentage = (totalScholarship / total) * 100;

        let status = "";
        let statusColor = "";
        if (remainingCost <= 0) {
            status = "Fully Funded! 🎉";
            statusColor = "text-green-400";
        } else if (remainingCost <= total * 0.25) {
            status = "Nearly Covered - Small Gap";
            statusColor = "text-yellow-400";
        } else if (remainingCost <= total * 0.5) {
            status = "Partially Covered";
            statusColor = "text-orange-400";
        } else {
            status = "Significant Gap - Explore More Options";
            statusColor = "text-red-400";
        }

        setResult({
            totalCost: total,
            totalScholarship: totalScholarship,
            meritScholarship: merit,
            needScholarship: need,
            externalScholarship: external,
            grants: grantAmt,
            workStudy: work,
            familyContribution: family,
            totalAid: totalAid,
            remainingCost: remainingCost > 0 ? remainingCost : 0,
            surplus: remainingCost < 0 ? Math.abs(remainingCost) : 0,
            percentageCovered: percentageCovered.toFixed(1),
            scholarshipPercentage: scholarshipPercentage.toFixed(1),
            status: status,
            statusColor: statusColor,
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
                        <span itemProp="name" className="text-gray-300">Scholarship Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form - Removed max-h and overflow-y-auto */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Scholarship & Aid Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Enter all funding sources to see your coverage gap</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total College Cost (₹/year)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="10000"
                                    placeholder="e.g., 300000"
                                    value={totalCost}
                                    onChange={(e) => setTotalCost(e.target.value)}
                                    className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold text-teal-400 mb-2">💰 Scholarships (Tax-Free)</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Merit-Based Scholarship</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="5000"
                                            placeholder="0"
                                            value={meritScholarship}
                                            onChange={(e) => setMeritScholarship(e.target.value)}
                                            className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Need-Based Scholarship</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="5000"
                                            placeholder="0"
                                            value={needScholarship}
                                            onChange={(e) => setNeedScholarship(e.target.value)}
                                            className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">External/Private Scholarships</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="5000"
                                            placeholder="0"
                                            value={externalScholarship}
                                            onChange={(e) => setExternalScholarship(e.target.value)}
                                            className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">🎓 Other Financial Aid</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Grants (Pell, State, etc.)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="5000"
                                            placeholder="0"
                                            value={grants}
                                            onChange={(e) => setGrants(e.target.value)}
                                            className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Work-Study Amount</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="2000"
                                            placeholder="0"
                                            value={workStudy}
                                            onChange={(e) => setWorkStudy(e.target.value)}
                                            className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold text-yellow-400 mb-2">🏠 Family Contribution</h4>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Expected Family Contribution (EFC)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="5000"
                                        placeholder="0"
                                        value={familyContribution}
                                        onChange={(e) => setFamilyContribution(e.target.value)}
                                        className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Coverage →
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
                    title="Scholarship Coverage Summary"
                    isEmpty={!result}
                    emptyIcon="🏆"
                    emptyText="Enter all funding sources to see coverage"
                    mainResult={result ? { label: result.status, value: `${result.percentageCovered}% Covered`, color: result.statusColor } : undefined}
                    extraRows={result ? [
                        { label: "Total College Cost", value: `₹${result.totalCost.toLocaleString()}` },
                        { label: "Total Scholarships", value: `₹${result.totalScholarship.toLocaleString()}`, valueColor: "text-teal-400" },
                        { label: "Total Financial Aid", value: `₹${result.totalAid.toLocaleString()}`, valueColor: "text-blue-400" },
                        { label: "Family Contribution", value: `₹${result.familyContribution.toLocaleString()}` },
                        { label: "Remaining Cost to Pay", value: `₹${result.remainingCost.toLocaleString()}`, valueColor: result.remainingCost > 0 ? "text-red-400" : "text-green-400" },
                        ...(result.surplus > 0 ? [{ label: "Surplus (Refund)", value: `₹${result.surplus.toLocaleString()}`, valueColor: "text-green-400" }] : []),
                        { label: "Scholarship % of Total", value: `${result.scholarshipPercentage}%` },
                    ] : []}
                />
            </div>

            {/* Funding Gap Suggestions */}
            {result && result.remainingCost > 0 && (
                <div className="mb-8 bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">💡 Suggestions to Cover Gap: ₹{result.remainingCost.toLocaleString()}</h3>
                    <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                        <li>Apply for 5-10 more smaller scholarships (₹10,000-50,000 each) - many have less competition</li>
                        <li>Consider part-time job during school year (₹15,000-30,000/month potential earnings)</li>
                        <li>Look for department-specific or major-based awards within your college</li>
                        <li>Ask about payment plans or reduced tuition options (some schools offer installment plans)</li>
                        <li>Research work-study opportunities in your field of study for valuable experience</li>
                        <li>Consider federal student loans (subsidized first to minimize interest)</li>
                    </ul>
                </div>
            )}

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Scholarship Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Scholarship Calculator</strong> helps students and families track all sources of college funding to understand the true out-of-pocket cost. By entering scholarships, grants, work-study, and family contributions, you can see exactly how much financial aid you have and identify any funding gaps.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    This comprehensive tool covers all types of aid: merit-based scholarships, need-based scholarships, external scholarships, federal and state grants, work-study programs, and expected family contributions. The calculator provides a clear breakdown of your funding sources and shows your remaining cost or surplus.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your full financial picture is essential for making informed decisions about college affordability. This calculator helps you plan ahead, identify gaps early, and explore additional funding options to make your education affordable.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Scholarship Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">total college cost</strong> per year (tuition, fees, room, board, books).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Add <strong className="text-white">merit-based scholarships</strong> (academic, athletic, talent).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Add <strong className="text-white">need-based scholarships</strong> and <strong className="text-white">external scholarships</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter <strong className="text-white">grants</strong> (Pell, state, institutional) and <strong className="text-white">work-study</strong> amounts.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Add <strong className="text-white">expected family contribution</strong> (EFC).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">"Calculate Coverage"</strong> to see your funding breakdown and coverage percentage.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Scholarship Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ Financial Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand your true out-of-pocket college costs. Plan your finances years in advance with accurate projections.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Gap Identification</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Identify funding gaps early. See exactly how much more funding you need and where to focus your scholarship search.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Scholarship Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Keep track of all your scholarships and financial aid in one place. Never miss an opportunity to reduce your costs.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ College Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare financial aid offers from different colleges. See which school offers the best net price for your family.</p>
                    </div>
                </div>
            </section>

            {/* Scholarship Types Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Types of Scholarships & Grants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">🎯 Merit-Based</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Academic excellence (GPA, test scores)</li>
                            <li>• Athletic achievements</li>
                            <li>• Artistic/talent-based</li>
                            <li>• Leadership recognition</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🤝 Need-Based</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Federal Pell Grants</li>
                            <li>• State grants (need-based)</li>
                            <li>• Institutional need-based aid</li>
                            <li>• FAFSA-determined eligibility</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🌍 Specialized</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Demographic-specific (race, gender)</li>
                            <li>• First-generation student</li>
                            <li>• Military/veteran benefits</li>
                            <li>• Field-of-study specific</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">💼 External</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Private scholarship funds</li>
                            <li>• Corporate scholarships</li>
                            <li>• Community organizations</li>
                            <li>• Professional associations</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Scholarship Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Scholarship Application Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-teal-500/50 transition-all">
                        <div className="text-3xl mb-2">📝</div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-1">Personalize Essays</h4>
                        <p className="text-xs text-gray-400">Customize each essay to the scholarship's specific mission and values. Generic essays rarely win.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-teal-500/50 transition-all">
                        <div className="text-3xl mb-2">⏰</div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-1">Apply Early</h4>
                        <p className="text-xs text-gray-400">Rolling deadlines fill quickly. Submit applications as soon as they open for maximum chances.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-teal-500/50 transition-all">
                        <div className="text-3xl mb-2">📋</div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-1">Recommendations Ready</h4>
                        <p className="text-xs text-gray-400">Build relationships with teachers, counselors, and mentors who can write strong letters.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-teal-500/50 transition-all">
                        <div className="text-3xl mb-2">🔍</div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-1">Research Thoroughly</h4>
                        <p className="text-xs text-gray-400">Use multiple search engines and check local organizations. Many scholarships go unclaimed.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-teal-500/50 transition-all">
                        <div className="text-3xl mb-2">📊</div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-1">Track Applications</h4>
                        <p className="text-xs text-gray-400">Create a spreadsheet to track deadlines, requirements, and submission status for each scholarship.</p>
                    </div>
                </div>
            </section>

            {/* Scholarship Sources */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Top Scholarship Search Platforms</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-300 font-medium">Fastweb</p>
                        <p className="text-xs text-gray-500">Largest database</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-300 font-medium">Scholarships.com</p>
                        <p className="text-xs text-gray-500">Comprehensive search</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-300 font-medium">Cappex</p>
                        <p className="text-xs text-gray-500">Profile matching</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-300 font-medium">Chegg Scholarships</p>
                        <p className="text-xs text-gray-500">User-friendly</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-300 font-medium">Niche</p>
                        <p className="text-xs text-gray-500">Student reviews</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-300 font-medium">College Board</p>
                        <p className="text-xs text-gray-500">Official search tool</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Always use multiple platforms and set up email alerts for new opportunities matching your profile.</p>
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