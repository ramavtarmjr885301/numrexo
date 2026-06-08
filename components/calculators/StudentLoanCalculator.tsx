"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is the difference between subsidized and unsubsidized loans?",
        a: "Subsidized loans don't accrue interest while you're in school or during grace periods. Unsubsidized loans start accruing interest immediately.",
    },
    {
        q: "Should I pay off student loans early?",
        a: "Generally yes, but first build an emergency fund and contribute to retirement accounts if your employer offers matching. Compare interest rates - pay highest rates first.",
    },
    {
        q: "What is loan consolidation?",
        a: "Combining multiple federal student loans into one loan with a single monthly payment. It simplifies repayment but may increase total interest paid if you extend the term.",
    },
    {
        q: "How does loan forbearance work?",
        a: "Forbearance allows temporary payment postponement, but interest continues to accrue. Use only for short-term financial hardships.",
    },
];

export default function StudentLoanCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("10");
    const [extraPayment, setExtraPayment] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const principal = parseFloat(loanAmount) || 0;
        const rate = (parseFloat(interestRate) || 0) / 100 / 12;
        const months = (parseFloat(loanTerm) || 10) * 12;
        const extra = parseFloat(extraPayment) || 0;

        if (principal <= 0 || rate <= 0) {
            alert("Please enter valid loan amount and interest rate");
            return;
        }

        // Standard monthly payment (EMI)
        let monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

        if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
            alert("Unable to calculate. Please check your inputs.");
            return;
        }

        const totalPaymentStandard = monthlyPayment * months;
        const totalInterestStandard = totalPaymentStandard - principal;

        // With extra payment
        let remainingBalance = principal;
        let monthsSaved = 0;
        let totalInterestWithExtra = 0;
        let actualMonths = 0;
        const monthlyWithExtra = monthlyPayment + extra;

        for (let i = 1; i <= months; i++) {
            const interestPayment = remainingBalance * rate;
            const principalPayment = Math.min(monthlyWithExtra - interestPayment, remainingBalance);

            totalInterestWithExtra += interestPayment;
            remainingBalance -= principalPayment;
            actualMonths = i;

            if (remainingBalance <= 0.01) break;
        }

        const timeSavedMonths = months - actualMonths;
        const timeSavedYears = Math.floor(timeSavedMonths / 12);
        const timeSavedRemainingMonths = timeSavedMonths % 12;
        const interestSaved = totalInterestStandard - totalInterestWithExtra;

        setResult({
            monthlyPayment: monthlyPayment.toFixed(2),
            totalPayment: totalPaymentStandard.toFixed(2),
            totalInterest: totalInterestStandard.toFixed(2),
            monthlyWithExtra: (monthlyPayment + extra).toFixed(2),
            newMonths: actualMonths,
            timeSavedYears: timeSavedYears,
            timeSavedMonths: timeSavedRemainingMonths,
            interestSaved: interestSaved.toFixed(2),
            extraPayment: extra.toFixed(2),
        });
    };

    const reset = () => {
        setLoanAmount("");
        setInterestRate("");
        setLoanTerm("10");
        setExtraPayment("");
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
                    <li><span className="text-gray-300">Student Loan Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Loan Details</h3>
                        <p className="text-xs text-gray-500">Enter your student loan information</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total Loan Amount (₹)</label>
                            <input type="number" step="10000" placeholder="e.g., 500000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Interest Rate (%)</label>
                            <input type="number" step="0.5" placeholder="e.g., 8.5" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Term (Years)</label>
                            <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                <option value="5">5 years</option><option value="10">10 years (Standard)</option>
                                <option value="15">15 years</option><option value="20">20 years</option><option value="25">25 years</option>
                                <option value="30">30 years</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Extra Monthly Payment (₹)</label>
                            <input type="number" step="500" placeholder="0" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" />
                            <p className="text-xs text-gray-500 mt-1">Optional: Pay extra to save interest</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Loan Repayment Summary"
                    isEmpty={!result}
                    emptyIcon="📚"
                    emptyText="Enter loan details to calculate EMI"
                    mainResult={result ? { label: "Monthly Payment (EMI)", value: `₹${parseFloat(result.monthlyPayment).toLocaleString()}`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Payment (Principal + Interest)", value: `₹${parseFloat(result.totalPayment).toLocaleString()}` },
                        { label: "Total Interest Paid", value: `₹${parseFloat(result.totalInterest).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "With Extra ₹${parseFloat(result.extraPayment).toLocaleString()}/month", value: `₹${parseFloat(result.monthlyWithExtra).toLocaleString()}` },
                        { label: "New Loan Term", value: `${result.newMonths} months (${Math.floor(result.newMonths / 12)} years ${result.newMonths % 12} months)` },
                        { label: "Time Saved", value: `${result.timeSavedYears}y ${result.timeSavedMonths}m`, valueColor: "text-green-400" },
                        { label: "Interest Saved", value: `₹${parseFloat(result.interestSaved).toLocaleString()}`, valueColor: "text-green-400" },
                    ] : []}
                />
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Student Loan Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate monthly student loan payments, total interest cost, and see how extra payments can save you money and time.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Amortization Insight</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-gray-300 text-sm">🏦 Paying just ₹500-1000 extra per month can save thousands in interest and cut years off your loan term.</p>
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