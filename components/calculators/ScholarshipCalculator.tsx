"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What types of scholarships are available?",
        a: "Merit-based (academic/excellence), need-based (financial need), athletic, demographic-specific, field-of-study, and talent-based scholarships.",
    },
    {
        q: "How do I maximize my scholarship chances?",
        a: "Apply early, maintain strong academics, write compelling essays, get good recommendation letters, and apply for multiple smaller scholarships.",
    },
    {
        q: "Is scholarship income taxable?",
        a: "Scholarships used for tuition, fees, books, and supplies are tax-free. Amounts used for room, board, and other living expenses are taxable.",
    },
    {
        q: "Can I get scholarships after starting college?",
        a: "Yes! Many scholarships are available for current students based on academic performance, major, extracurricular activities, and research.",
    },
];

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

    const reset = () => {
        setTotalCost("");
        setMeritScholarship("");
        setNeedScholarship("");
        setExternalScholarship("");
        setGrants("");
        setWorkStudy("");
        setFamilyContribution("");
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
                    <li><span className="text-gray-300">Scholarship Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Scholarship & Aid Details</h3>
                        <p className="text-xs text-gray-500">Enter all funding sources to see your coverage gap</p>
                    </div>
                    <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-gray-700">
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total College Cost (₹/year)</label>
                            <input type="number" step="10000" placeholder="e.g., 300000" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold text-teal-400 mb-2">💰 Scholarships (Tax-Free)</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Merit-Based Scholarship</label>
                                    <input type="number" step="5000" placeholder="0" value={meritScholarship} onChange={(e) => setMeritScholarship(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Need-Based Scholarship</label>
                                    <input type="number" step="5000" placeholder="0" value={needScholarship} onChange={(e) => setNeedScholarship(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">External/Private Scholarships</label>
                                    <input type="number" step="5000" placeholder="0" value={externalScholarship} onChange={(e) => setExternalScholarship(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">🎓 Other Financial Aid</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Grants (Pell, State, etc.)</label>
                                    <input type="number" step="5000" placeholder="0" value={grants} onChange={(e) => setGrants(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Work-Study Amount</label>
                                    <input type="number" step="2000" placeholder="0" value={workStudy} onChange={(e) => setWorkStudy(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold text-yellow-400 mb-2">🏠 Family Contribution</h4>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Expected Family Contribution (EFC)</label>
                                <input type="number" step="5000" placeholder="0" value={familyContribution} onChange={(e) => setFamilyContribution(e.target.value)} className="w-full px-4 py-2 bg-[#1a2235] border border-gray-600 rounded-lg text-white" />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Calculate Coverage →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
                        </div>
                    </div>
                </div>

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

            {result && result.remainingCost > 0 && (
                <div className="mb-8 bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">💡 Suggestions to Cover Gap: ₹{result.remainingCost.toLocaleString()}</h3>
                    <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                        <li>Apply for 5-10 more smaller scholarships (₹10,000-50,000 each)</li>
                        <li>Consider part-time job during school year (₹15,000-30,000/month)</li>
                        <li>Look for department-specific or major-based awards</li>
                        <li>Ask about payment plans or reduced tuition options</li>
                    </ul>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Scholarship Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Track all your scholarships, grants, and financial aid to understand your true out-of-pocket college costs. Identify funding gaps and plan accordingly.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Scholarship Application Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">📝</div>
                        <p className="text-xs text-gray-400">Customize each essay to the scholarship's mission</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">⏰</div>
                        <p className="text-xs text-gray-400">Apply early - rolling deadlines fill quickly</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">📋</div>
                        <p className="text-xs text-gray-400">Keep recommendation letters ready in advance</p>
                    </div>
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