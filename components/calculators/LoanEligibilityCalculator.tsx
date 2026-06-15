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
    {
        q: "What is FOIR and how is it calculated?",
        a: "FOIR (Fixed Obligation to Income Ratio) = (Total Monthly EMIs ÷ Monthly Income) × 100. Banks prefer FOIR below 45-50%. Example: Income ₹80,000, existing EMIs ₹15,000 → FOIR = 18.75%. You can take new loan EMI up to ₹21,000 (45% of income = ₹36,000 - ₹15,000 = ₹21,000). Higher FOIR reduces eligibility.",
    },
    {
        q: "Does my age affect loan eligibility?",
        a: "Yes. Younger applicants (25-35 years) get higher loans due to longer working life remaining. Age limit: Home loan up to 65-70 years, Personal loan up to 60 years. 10 years before retirement, eligibility reduces by 15-20%. Apply early in career for maximum loan amount.",
    },
    {
        q: "Can self-employed individuals get higher loans?",
        a: "Self-employed can get same or higher loans if business income is stable and growing. Banks require 3-5 years ITR with minimum profit. Salaried: 3 months payslip + bank statement. Self-employed: 3 years ITR + GST returns + P&L statement. Business vintage minimum 3 years.",
    },
    {
        q: "How does job stability affect loan approval?",
        a: "Minimum employment: Salaried: 1-2 years continuous with current employer. Self-employed: 3-5 years business continuity. Frequent job changes (<6 months tenure) may reduce eligibility by 10-15%. Government/PSU employees get highest eligibility (up to 50-55% of income).",
    },
    {
        q: "What is the minimum income required for a home loan?",
        a: "Minimum monthly income: Home loan ₹25,000-30,000 (loan amount ₹15-20L), Personal loan ₹20,000, Car loan ₹20,000. Higher income = higher eligibility. In metros, banks prefer ₹50,000+ for loans above ₹50L. Add co-applicant income to qualify if income is low.",
    },
    {
        q: "How to calculate loan eligibility for a joint loan?",
        a: "Joint loan: Banks combine both incomes, reduce by 5-10% for joint expenses. Calculate combined FOIR, then loan amount. Example: Income ₹1.2L + ₹80k = ₹2L. Combined FOIR 45% = ₹90k EMIs allowed. Subtract existing EMIs, then calculate loan amount. Co-borrowers improve eligibility significantly.",
    },
    {
        q: "Does loan eligibility differ by bank?",
        a: "Yes! SBI offers up to 50% FOIR, HDFC 45%, ICICI 48%, PNB 50%. Private banks may offer higher amounts at higher rates. PSU banks have stricter documentation but lower rates. Always check 3-4 banks. Our calculator uses conservative 45% FOIR (general benchmark).",
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

    const resetForm = () => {
        setMonthlyIncome("");
        setExistingEMI("0");
        setInterestRate("9");
        setTenure("20");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LOAN_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Loan Eligibility Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Your Financial Profile</h3>
                        <p className="text-xs text-gray-500 mt-1">Based on standard bank eligibility criteria</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Your Monthly Income (after taxes)</label>
                            <div className="relative">
                                <input type="number" placeholder="50000" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Existing Monthly EMIs (car loan, personal loan, etc.)</label>
                            <div className="relative">
                                <input type="number" placeholder="0" value={existingEMI} onChange={(e) => setExistingEMI(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Interest Rate (%)</label>
                            <div className="relative">
                                <input type="number" placeholder="9" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Home loans: 8.5-9.5% | Personal loans: 11-15% | Car loans: 9-11%</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Tenure (years)</label>
                            <div className="relative">
                                <input type="number" placeholder="20" value={tenure} onChange={(e) => setTenure(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Home loans: up to 30 years | Personal loans: up to 5 years | Car loans: up to 7 years</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Check Your Eligibility →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Loan Eligibility Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Loan Eligibility Calculator</strong> helps you estimate how much loan you can qualify for based on your monthly income, existing EMIs, interest rate, and loan tenure. Perfect for home loans, personal loans, car loans, and education loans.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Banks use the FOIR (Fixed Obligation to Income Ratio) method to calculate eligibility. Our calculator uses 45% FOIR, which is the standard benchmark used by most Indian banks.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Loan Eligibility Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">monthly income</strong> (after taxes).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">existing monthly EMIs</strong> (car loan, personal loan, credit card EMIs).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">expected interest rate</strong> for your new loan.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter the <strong className="text-white">loan tenure</strong> (years) you're planning for.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Check Your Eligibility"</strong> to see maximum loan amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Loan Eligibility Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Avoid Rejection</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your eligibility before applying. Loan rejection hurts credit score. Apply only to banks where you qualify.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Negotiate Better</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your maximum eligible amount. Don't let banks offer you less than what you qualify for.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Plan Your Finances</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate how much house/car you can afford. Plan down payment accordingly.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Compare Banks</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Different banks have different FOIR limits (40-50%). Check eligibility across multiple banks.</p>
                    </div>
                </div>
            </section>

            {/* Factors Affecting Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Factors That Affect Your Loan Eligibility</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Monthly Income:</strong> Higher income = higher eligibility. Banks prefer 40-50% FOIR.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Existing EMIs:</strong> Car loans, personal loans, credit card EMIs reduce eligibility.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Credit Score (CIBIL):</strong> 750+ gives highest eligibility. Below 650 reduces amount by 20-30%.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Loan Tenure:</strong> Longer tenure = lower EMI = higher eligibility.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">•</span><span><strong className="text-gray-300">Age & Retirement:</strong> Applicants under 35 get higher eligibility. Loans must close before retirement (age 60-65).</span></li>
                </ul>
            </section>

            {/* Loan Eligibility by Loan Type */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Loan Eligibility by Loan Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Loan Type</th><th className="text-left py-3 px-4 text-gray-400">FOIR Limit</th><th className="text-left py-3 px-4 text-gray-400">Max Tenure</th><th className="text-left py-3 px-4 text-gray-400">Interest Rate</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Home Loan</td><td className="py-2 px-4 text-yellow-400">45-50%</td><td className="py-2 px-4">30 years</td><td className="py-2 px-4">8.4-9.5%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Car Loan</td><td className="py-2 px-4 text-yellow-400">40-45%</td><td className="py-2 px-4">7 years</td><td className="py-2 px-4">9-12%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Personal Loan</td><td className="py-2 px-4 text-yellow-400">35-40%</td><td className="py-2 px-4">5 years</td><td className="py-2 px-4">11-18%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Education Loan</td><td className="py-2 px-4 text-yellow-400">40-45%</td><td className="py-2 px-4">15 years</td><td className="py-2 px-4">8-13%</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Documents Required */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Documents Required for Loan Application</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Salaried Applicants</h3>
                        <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                            <li>Last 3 months payslips</li>
                            <li>Last 6 months bank statements</li>
                            <li>Form 16 / ITR for 2 years</li>
                            <li>Identity proof (Aadhar/PAN)</li>
                            <li>Address proof</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Self-Employed Applicants</h3>
                        <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                            <li>Last 3 years ITR with computation</li>
                            <li>Last 3 years P&L, Balance Sheet</li>
                            <li>Last 6 months bank statements</li>
                            <li>GST returns (if applicable)</li>
                            <li>Business proof (registration/license)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How Banks Calculate */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How Banks Calculate Your Loan Eligibility</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Banks want to be sure you can comfortably repay the loan. They typically use a formula called FOIR (Fixed Obligation to Income Ratio) - basically, your total monthly EMI payments shouldn't exceed 40-50% of your monthly take-home salary. We've used 45% in this calculator, which is a middle-ground benchmark most banks follow.</p>
            </section>

            {/* Tips to Increase Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tips to Increase Your Loan Eligibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">📈</div>
                        <h3 className="text-sm font-semibold text-green-400 mb-1">Add a Co-Applicant</h3>
                        <p className="text-xs text-gray-400">Include your spouse's income. Banks combine both incomes, which can double your eligibility.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">💳</div>
                        <h3 className="text-sm font-semibold text-green-400 mb-1">Improve Your Credit Score</h3>
                        <p className="text-xs text-gray-400">A score above 750 can increase eligible amount by 10-15% and get you better rates.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">📉</div>
                        <h3 className="text-sm font-semibold text-green-400 mb-1">Pay Off Small Loans First</h3>
                        <p className="text-xs text-gray-400">Closing credit cards or small personal loans frees up EMI capacity for the new loan.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <div className="text-2xl mb-1">⏰</div>
                        <h3 className="text-sm font-semibold text-green-400 mb-1">Choose Longer Tenure</h3>
                        <p className="text-xs text-gray-400">A longer loan tenure means smaller EMIs, which increases eligibility (but you'll pay more interest).</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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