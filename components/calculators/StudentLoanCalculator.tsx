"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is the difference between subsidized and unsubsidized loans?",
        a: "Subsidized loans don't accrue interest while you're in school, during grace periods (6 months after graduation), or during deferment periods. The government pays the interest during these times. Unsubsidized loans start accruing interest immediately from the day the loan is disbursed. Interest on unsubsidized loans continues to compound and is capitalized (added to principal) at repayment. Subsidized loans are need-based and have lower borrowing limits compared to unsubsidized loans.",
    },
    {
        q: "Should I pay off student loans early?",
        a: "Generally yes, but first build an emergency fund (3-6 months of expenses) and contribute to retirement accounts if your employer offers matching (it's free money). Compare interest rates - pay highest rates first (avalanche method). Consider: 1) Loan interest rate vs potential investment returns, 2) Tax benefits (student loan interest deduction), 3) Impact on credit score, 4) Loan forgiveness opportunities, 5) Your risk tolerance. If your loan rate is below 4-5%, investing might yield better returns.",
    },
    {
        q: "What is loan consolidation?",
        a: "Combining multiple federal student loans into one loan with a single monthly payment. Pros: Simplified repayment, extended repayment terms, fixed interest rate (weighted average of original loans). Cons: May increase total interest paid if extending term, loss of loan-specific benefits (e.g., interest rate discounts, borrower benefits), may reset forgiveness clock (for PSLF and IDR plans), and you can't selectively pay off high-interest loans. Federal consolidation is different from private refinancing.",
    },
    {
        q: "How does loan forbearance work?",
        a: "Forbearance allows temporary payment postponement (usually 6-12 months), but interest continues to accrue during the entire period. This accrued interest will be added to your principal (capitalized) at the end of forbearance, increasing your total loan cost. Use only for short-term financial hardships (job loss, medical emergencies). Always request forbearance before defaulting. Unlike deferment, forbearance doesn't require specific qualifying conditions.",
    },
    {
        q: "What is the difference between deferment and forbearance?",
        a: "Deferment is available for specific qualifying situations (active military duty, returning to school, unemployment, economic hardship) and sometimes includes no interest accrual on subsidized loans. Forbearance is broader but always accrues interest on all loans. Deferment is generally better because it may not increase your loan balance. Both postpone payments temporarily, but deferment is preferable when eligible.",
    },
    {
        q: "What are Income-Driven Repayment (IDR) plans?",
        a: "IDR plans cap monthly payments at 10-20% of your discretionary income. Four main plans: 1) REPAYE (10% of income, 25-year forgiveness), 2) PAYE (10% of income, 20-year forgiveness), 3) IBR (10-15% of income, 20-25-year forgiveness), 4) ICR (20% of income, 25-year forgiveness). Payments can be as low as $0 if income is low enough. Eligible for Public Service Loan Forgiveness (PSLF) after 10 years of qualifying payments.",
    },
    {
        q: "What is Public Service Loan Forgiveness (PSLF)?",
        a: "PSLF forgives remaining federal student loan balance after 120 qualifying monthly payments (10 years) while working full-time for a qualifying employer (government, non-profit, public service). Key requirements: 1) Must have Direct Loans, 2) Enrolled in an IDR plan, 3) Full-time employment (30+ hours/week), 4) Must make 120 qualifying payments. Employment must be certified annually. PSLF is completely tax-free (unlike other forgiveness programs). Approximately 70% of PSLF applications are denied due to technical errors.",
    },
    {
        q: "How does student loan refinancing work?",
        a: "Refinancing means getting a new private loan to pay off existing student loans. Pros: Lower interest rate (if you have good credit), one monthly payment, can release cosigners. Cons: Loss of federal loan protections (IDR, forbearance, forgiveness, deferment), variable rates can increase, may lose credit for PSLF payments, and requires good credit or cosigner. Refinance federal loans carefully - you can't undo it. Usually best for private loans or high-earning professionals.",
    },
    {
        q: "What is the avalanche method for paying off loans?",
        a: "The avalanche method prioritizes paying off loans with the highest interest rates first while making minimum payments on all others. This mathematically minimizes total interest paid. Example: Loans at 6%, 5%, 4% → pay extra toward 6% loan first. Alternative: Snowball method (smallest balance first) provides psychological wins but may cost more interest. Avalanche saves the most money over time. Use our calculator to see how extra payments on specific loans affect total interest.",
    },
    {
        q: "What happens if I default on student loans?",
        a: "Default occurs after 270 days (9 months) of non-payment for federal loans. Consequences: 1) Credit score drops 100-150 points, 2) Loans sent to collections (20%+ collection fees), 3) Wage garnishment (up to 15%), 4) Tax refund offset (Treasury offset), 5) Loss of eligibility for forbearance, deferment, IDR plans, PSLF, 6) Difficulty getting future federal student aid, 7) Cosigner is pursued. Rehabilitation program: 9 consecutive on-time payments to remove default status. Default should be avoided at all costs.",
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
    name: "Student Loan Calculator – Education Loan EMI Calculator",
    description: "Calculate student loan monthly payments, total interest, and see how extra payments can save money and time.",
    url: "https://numrexo.com/education/student-loan-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["EMI calculation", "Total interest", "Extra payment impact", "Time saved"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Education Calculators", item: "https://numrexo.com/education" },
        { "@type": "ListItem", position: 3, name: "Student Loan Calculator", item: "https://numrexo.com/education/student-loan-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudentLoanCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("10");
    const [extraPayment, setExtraPayment] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount("");
        setInterestRate("");
        setLoanTerm("10");
        setExtraPayment("");
        setResult(null);
    };

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

        // Calculate total payment with extra
        const totalPaymentWithExtra = totalInterestWithExtra + principal;

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
            totalPaymentWithExtra: totalPaymentWithExtra.toFixed(2),
            totalInterestWithExtra: totalInterestWithExtra.toFixed(2),
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
                        <span itemProp="name" className="text-gray-300">Student Loan Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Loan Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Enter your student loan information</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total Loan Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="10000"
                                    placeholder="e.g., 500000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Interest Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="e.g., 8.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Term (Years)</label>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                            >
                                <option value="5">5 years</option>
                                <option value="10">10 years (Standard)</option>
                                <option value="15">15 years</option>
                                <option value="20">20 years</option>
                                <option value="25">25 years</option>
                                <option value="30">30 years</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Extra Monthly Payment (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="500"
                                    placeholder="0"
                                    value={extraPayment}
                                    onChange={(e) => setExtraPayment(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Optional: Pay extra to save interest and time</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate →
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
                    title="Loan Repayment Summary"
                    isEmpty={!result}
                    emptyIcon="📚"
                    emptyText="Enter loan details to calculate EMI"
                    mainResult={result ? { label: "Monthly Payment (EMI)", value: `₹${parseFloat(result.monthlyPayment).toLocaleString()}`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Payment (Principal + Interest)", value: `₹${parseFloat(result.totalPayment).toLocaleString()}` },
                        { label: "Total Interest Paid", value: `₹${parseFloat(result.totalInterest).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "With Extra ₹${parseFloat(result.extraPayment).toLocaleString()}/month", value: `₹${parseFloat(result.monthlyWithExtra).toLocaleString()}`, valueColor: "text-blue-400" },
                        { label: "New Loan Term", value: `${result.newMonths} months (${Math.floor(result.newMonths / 12)} years ${result.newMonths % 12} months)` },
                        { label: "Time Saved", value: `${result.timeSavedYears}y ${result.timeSavedMonths}m`, valueColor: "text-green-400" },
                        { label: "Interest Saved", value: `₹${parseFloat(result.interestSaved).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Total Interest (with Extra)", value: `₹${parseFloat(result.totalInterestWithExtra).toLocaleString()}`, valueColor: "text-purple-400" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Student Loan Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Student Loan Calculator</strong> helps you understand the true cost of your education loans. Calculate monthly payments (EMI), total interest paid over the loan term, and see the impact of making extra payments to save money and time.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you have federal student loans, private loans, or education loans from banks, this calculator provides clear insights into your repayment journey. It's perfect for students, graduates, and parents planning for education expenses.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    By understanding your loan repayment details, you can make informed decisions about refinancing, consolidation, extra payments, and choosing the right repayment plan for your financial situation.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Student Loan Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">total loan amount</strong> (principal borrowed).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">annual interest rate</strong> (as a percentage).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select <strong className="text-white">loan term</strong> in years (5-30 years).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> (Optional) Enter <strong className="text-white">extra monthly payment</strong> to see savings.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate"</strong> to see your repayment summary.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Student Loan Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your monthly payment before you graduate. Plan your budget around your loan payments and avoid financial surprises.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Interest Savings</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See the impact of extra payments. Even small additional amounts can save thousands in interest over the loan term.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Term Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare different loan terms. Find the right balance between monthly affordability and total interest cost.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Financial Clarity</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand the full cost of your education. Make informed decisions about borrowing, repaying, and refinancing.</p>
                    </div>
                </div>
            </section>

            {/* Loan Types Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Types of Student Loans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-teal-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">🏛️ Federal Student Loans</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Fixed interest rates</li>
                            <li>• Income-driven repayment plans</li>
                            <li>• Public Service Loan Forgiveness</li>
                            <li>• Deferment and forbearance options</li>
                            <li>• No credit check required</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🏦 Private Student Loans</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Fixed or variable rates</li>
                            <li>• Credit score required</li>
                            <li>• Cosigner often needed</li>
                            <li>• No federal protections</li>
                            <li>• Higher borrowing limits</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Amortization Insight */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Amortization Insight</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl mb-1">📊</div>
                            <p className="text-sm font-semibold text-gray-200">Principal</p>
                            <p className="text-xs text-gray-500">Original loan amount</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-1">💰</div>
                            <p className="text-sm font-semibold text-yellow-400">Interest</p>
                            <p className="text-xs text-gray-500">Cost of borrowing</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-1">⏰</div>
                            <p className="text-sm font-semibold text-green-400">Extra Payments</p>
                            <p className="text-xs text-gray-500">Save time and money</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800 text-center">
                        <p className="text-gray-300 text-sm">🏦 Paying just ₹500-1000 extra per month can save thousands in interest and cut years off your loan term.</p>
                    </div>
                </div>
            </section>

            {/* Repayment Strategies */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Student Loan Repayment Strategies</h2>
                <div className="space-y-2">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-teal-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-teal-400">1️⃣ Avalanche Method</h4>
                        <p className="text-xs text-gray-400">Pay extra toward loans with the highest interest rate first while making minimum payments on others. Saves the most money in interest over time. Best for financially disciplined borrowers.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-blue-400">2️⃣ Snowball Method</h4>
                        <p className="text-xs text-gray-400">Pay extra toward the smallest balance first while making minimum payments on others. Provides psychological wins and momentum. Best for motivation and building positive repayment habits.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-yellow-400">3️⃣ Income-Driven Repayment</h4>
                        <p className="text-xs text-gray-400">Cap monthly payments at 10-20% of discretionary income. Qualify for forgiveness after 20-25 years. Best for borrowers with lower income relative to debt.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-green-400">4️⃣ Refinancing</h4>
                        <p className="text-xs text-gray-400">Replace existing loans with a new loan at lower interest rate. Can significantly reduce monthly payments or total interest. Best for borrowers with good credit and stable income.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-purple-400">5️⃣ Public Service Loan Forgiveness</h4>
                        <p className="text-xs text-gray-400">Make 120 qualifying payments while working in public service. Balance forgiven tax-free after 10 years. Best for government and non-profit employees.</p>
                    </div>
                </div>
            </section>

            {/* Student Loan Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Student Loan Repayment Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Start paying during grace period:</strong> Make interest-only payments while in school or during grace period to prevent interest capitalization and reduce total cost.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Automate payments for discounts:</strong> Many lenders offer 0.25% interest rate reduction for setting up auto-debit. This small discount adds up over time.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Pay bi-weekly instead of monthly:</strong> Making half payments every two weeks results in 13 full payments per year (one extra payment), accelerating payoff.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Direct extra payments to principal:</strong> Ensure that extra payments go toward principal, not future interest. Most lenders allow this designation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Re-evaluate annually:</strong> Review your loans yearly. Interest rates change, income grows, and new repayment options become available. Adjust your strategy accordingly.</span>
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