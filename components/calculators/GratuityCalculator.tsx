// components/calculators/GratuityCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "Who is eligible for gratuity?",
        a: "You qualify for gratuity if you've worked continuously for at least 5 years with the same employer. This applies to both government and private sector employees. If you quit, resign, retire, or (heaven forbid) pass away, you or your family gets the payment. Even if you're fired (except for misconduct), you still get gratuity as long as you've completed 5 years.",
    },
    {
        q: "How is gratuity calculated?",
        a: "For companies covered under the Gratuity Act, the formula is: (Last drawn salary × 15 × Years of service) ÷ 26. 'Salary' includes basic + dearness allowance. For example, if your last basic was ₹50,000 and you worked 10 years: (50,000 × 15 × 10) ÷ 26 = ₹2,88,461. For employers not covered by the Act, the formula is a bit different (15/30 instead of 15/26).",
    },
    {
        q: "What is the maximum gratuity amount?",
        a: "The government has set a cap of ₹20 lakhs (2 million rupees) as the maximum tax-free gratuity. Anything above that is taxable. For government employees, the cap is ₹20 lakhs as well, but some states have different rules for their employees.",
    },
];

const GRATUITY_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gratuity Calculator – Calculate Your Retirement Benefit",
    description: "Calculate your gratuity amount based on last drawn salary and years of service. Know what you're entitled to when leaving a job.",
    url: "https://www.numrexo.com/finance/gratuity-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function GratuityCalculator() {
    const [lastSalary, setLastSalary] = useState("");
    const [years, setYears] = useState("");
    const [months, setMonths] = useState("0");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const salary = parseFloat(lastSalary);
        let y = parseFloat(years);
        const m = parseFloat(months);

        if (!salary || salary <= 0) {
            alert("Please enter your last drawn salary");
            return;
        }

        if (!y || y < 5) {
            alert("Gratuity requires minimum 5 years of continuous service");
            setResult({ eligible: false, message: "You need at least 5 years of service to be eligible for gratuity." });
            return;
        }

        // Convert months to years fraction
        y = y + (m / 12);
        const completedYears = Math.floor(y);

        // Formula: (Last drawn salary × 15 × Years of service) ÷ 26
        let gratuity = (salary * 15 * completedYears) / 26;
        const maxGratuity = 2000000;
        const taxableAmount = gratuity > maxGratuity ? gratuity - maxGratuity : 0;
        const taxFreeAmount = Math.min(gratuity, maxGratuity);

        setResult({
            eligible: true,
            gratuity: Math.round(gratuity).toLocaleString("en-IN"),
            taxFree: Math.round(taxFreeAmount).toLocaleString("en-IN"),
            taxable: Math.round(taxableAmount).toLocaleString("en-IN"),
            yearsOfService: completedYears,
            salary: salary.toLocaleString("en-IN"),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GRATUITY_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Gratuity Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your Employment Details</h3><p className="text-xs text-gray-500 mt-1">For employees covered under the Payment of Gratuity Act, 1972</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Last Drawn Basic Salary + DA</label><div className="relative"><input type="number" placeholder="50000" value={lastSalary} onChange={(e) => setLastSalary(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div><p className="text-xs text-gray-500 mt-1">Basic salary + Dearness Allowance (if applicable)</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Total Years of Service</label><div className="grid grid-cols-2 gap-3"><div className="relative"><input type="number" placeholder="10" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div><div className="relative"><input type="number" placeholder="0" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">months</span></div></div><p className="text-xs text-gray-500 mt-1">Need at least 5 years of continuous service to qualify</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Gratuity →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your Gratuity Amount"
                    isEmpty={!result}
                    emptyIcon="🎁"
                    emptyText="Enter your salary and years of service"
                    mainResult={result?.eligible ? { label: "Total Gratuity (Before Tax)", value: `₹${result.gratuity}`, color: "text-orange-400" } : undefined}
                    extraRows={result ? [
                        ...(result.eligible ? [
                            { label: "Tax-Free Amount (Up to ₹20 lakhs)", value: `₹${result.taxFree}`, valueColor: "text-green-400" },
                            { label: "Taxable Portion", value: `₹${result.taxable}` },
                            { label: "Your Last Salary (Basic+DA)", value: `₹${result.salary}` },
                            { label: "Completed Years of Service", value: `${result.yearsOfService} years` },
                        ] : [{ label: "Note", value: result.message, valueColor: "text-red-400" }]),
                    ] : undefined}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">What is Gratuity and Why Should You Care?</h2><p className="text-gray-400 text-sm leading-relaxed">Gratuity is basically your employer saying "thanks for sticking around" in cash form. You get it after 5+ years with the same company. The government mandates it under the Payment of Gratuity Act, so most companies have to pay it. It's a nice lump sum when you retire or move to a new job.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Gratuity Formula & Example</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm mb-2">Gratuity = (Last drawn salary × 15 × Years of service) ÷ 26</p><p className="text-gray-500 text-xs">Example: ₹50,000 basic salary, 10 years of service → (50,000 × 15 × 10) ÷ 26 = ₹2,88,461</p><p className="text-gray-500 text-xs mt-2">Note: The last year counts as a full year if you've worked more than 6 months. Less than 6 months? That half-year doesn't count toward gratuity calculation.</p></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}