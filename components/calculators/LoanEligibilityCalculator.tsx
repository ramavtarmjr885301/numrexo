// components/calculators/LoanEligibilityCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How do banks decide my loan eligibility?",
        a: "Banks look at three main things: your monthly income, your existing EMIs, and the loan tenure. They typically allow your total EMIs to be 40-50% of your monthly income (this is called FOIR - Fixed Obligation to Income Ratio). So if you earn ₹1 lakh per month, your total EMIs (including this new loan) should stay under ₹40-50k. Our calculator uses this same logic.",
    },
    {
        q: "Does my credit score affect how much loan I can get?",
        a: "Big time. A great credit score (750+) means banks will trust you more - they might offer you a higher loan amount or lower interest rate. With a low score (below 650), banks might reduce the loan amount by 20-30% or reject your application entirely. Always check your credit score before applying for a big loan.",
    },
    {
        q: "What documents do I need for a home loan?",
        a: "The basics: last 3-6 months bank statements, last 2-3 years IT returns (for salaried) or profit/loss statements (for self-employed), identity proof (Aadhar/PAN), address proof, property documents. Self-employed people need to show business continuity - they usually want to see at least 3-5 years of tax returns.",
    },
];

const LOAN_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan Eligibility Calculator – Check How Much You Can Borrow",
    description: "Find out your home loan, personal loan, or car loan eligibility based on your income and existing EMIs.",
    url: "https://www.numrexo.com/finance/loan-eligibility-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function LoanEligibilityCalculator() {
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [existingEMI, setExistingEMI] = useState("0");
    const [interestRate, setInterestRate] = useState("9");
    const [tenure, setTenure] = useState("20");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const income = parseFloat(monthlyIncome);
        const existing = parseFloat(existingEMI);
        const rate = parseFloat(interestRate) / 100 / 12;
        const months = parseFloat(tenure) * 12;

        if (!income || income <= 0) {
            alert("Please enter your monthly income");
            return;
        }

        // Banks allow 40-50% of income for total EMIs
        const maxEMI = income * 0.45; // Using 45% as standard
        const availableEMI = maxEMI - existing;

        if (availableEMI <= 0) {
            setResult({ eligible: false, maxLoan: 0, availableEMI: 0, message: "Your existing EMIs already exceed the recommended limit. Consider paying off existing loans first." });
            return;
        }

        // Calculate loan amount from EMI
        // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
        // P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
        const factor = Math.pow(1 + rate, months);
        const maxLoan = availableEMI * (factor - 1) / (rate * factor);

        const monthlyIncomeFormatted = income.toLocaleString("en-IN");
        const maxLoanFormatted = Math.round(maxLoan).toLocaleString("en-IN");

        setResult({
            eligible: true,
            maxLoan: Math.round(maxLoan),
            maxLoanFormatted,
            availableEMI: Math.round(availableEMI),
            monthlyIncome: monthlyIncomeFormatted,
            existingEMI: existing.toLocaleString("en-IN"),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LOAN_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Loan Eligibility Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your Financial Profile</h3><p className="text-xs text-gray-500 mt-1">Based on standard bank eligibility criteria</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Your Monthly Income (after taxes)</label><div className="relative"><input type="number" placeholder="50000" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Existing Monthly EMIs (car loan, personal loan, etc.)</label><div className="relative"><input type="number" placeholder="0" value={existingEMI} onChange={(e) => setExistingEMI(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected Interest Rate (%)</label><div className="relative"><input type="number" placeholder="9" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Home loans: 8.5-9.5% | Personal loans: 11-15% | Car loans: 9-11%</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Loan Tenure (years)</label><div className="relative"><input type="number" placeholder="20" value={tenure} onChange={(e) => setTenure(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div><p className="text-xs text-gray-500 mt-1">Home loans: up to 30 years | Personal loans: up to 5 years | Car loans: up to 7 years</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Check Your Eligibility →</button>
                    </div>
                </div>

                <ResultBox
                    title="Loan Eligibility Result"
                    isEmpty={!result}
                    emptyIcon="✅"
                    emptyText="Enter your income and press Calculate"
                    mainResult={result?.eligible ? { label: "You May Qualify For", value: `₹${result.maxLoanFormatted}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Your Monthly Income", value: `₹${result.monthlyIncome}` },
                        { label: "Available EMI Capacity", value: `₹${result.availableEMI.toLocaleString()}`, valueColor: result.eligible ? "text-green-400" : "text-red-400" },
                        { label: "Existing EMIs", value: `₹${result.existingEMI}` },
                        ...(result.eligible === false ? [{ label: "Note", value: result.message, valueColor: "text-red-400" }] : []),
                    ] : undefined}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">How Banks Calculate Your Loan Eligibility</h2><p className="text-gray-400 text-sm leading-relaxed">Banks want to be sure you can comfortably repay the loan. They typically use a formula called FOIR (Fixed Obligation to Income Ratio) - basically, your total monthly EMI payments shouldn't exceed 40-50% of your monthly take-home salary. We've used 45% in this calculator, which is a middle-ground benchmark most banks follow.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Tips to Increase Your Loan Eligibility</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">📈</div><h3 className="text-sm font-semibold text-green-400 mb-1">Add a Co-Applicant</h3><p className="text-xs text-gray-400">Include your spouse's income. Banks combine both incomes, which can double your eligibility.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">💳</div><h3 className="text-sm font-semibold text-green-400 mb-1">Improve Your Credit Score</h3><p className="text-xs text-gray-400">A score above 750 can increase eligible amount by 10-15% and get you better rates.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">📉</div><h3 className="text-sm font-semibold text-green-400 mb-1">Pay Off Small Loans First</h3><p className="text-xs text-gray-400">Closing credit cards or small personal loans frees up EMI capacity for the new loan.</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">⏰</div><h3 className="text-sm font-semibold text-green-400 mb-1">Choose Longer Tenure</h3><p className="text-xs text-gray-400">A longer loan tenure means smaller EMIs, which increases eligibility (but you'll pay more interest).</p></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}