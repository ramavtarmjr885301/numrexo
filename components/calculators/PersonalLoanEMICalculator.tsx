"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a personal loan EMI calculator?",
        a: "A personal loan EMI calculator helps you estimate your monthly loan payments based on the loan amount, interest rate, and tenure. It uses the standard EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is total number of payments.",
    },
    {
        q: "How is personal loan EMI calculated?",
        a: "Personal loan EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). Here P is the loan amount, r is the monthly interest rate (annual rate/12), and n is the loan tenure in months. This formula ensures equal monthly payments throughout the loan tenure.",
    },
    {
        q: "What is a good personal loan interest rate?",
        a: "Personal loan interest rates in India typically range from 10% to 24% per annum. A good rate depends on your credit score, income, and lender. For salaried individuals with good credit scores (750+), rates can be as low as 10-12%. Self-employed individuals may get rates between 12-18%.",
    },
    {
        q: "How does credit score affect personal loan EMI?",
        a: "Credit score significantly impacts your personal loan EMI. A higher credit score (750+) qualifies you for lower interest rates, reducing your monthly EMI. For example, on a ₹5 lakh loan for 3 years, a 1% lower interest rate can save you approximately ₹150 per month in EMI.",
    },
    {
        q: "What is the maximum tenure for a personal loan?",
        a: "Personal loan tenures typically range from 1 to 5 years (12-60 months). Some banks offer up to 7 years for large loan amounts. Longer tenures mean lower EMIs but higher total interest payments. Choose a tenure that balances affordable EMIs with manageable total interest.",
    },
    {
        q: "Can I prepay my personal loan?",
        a: "Yes, most lenders allow prepayment of personal loans. However, many charge a prepayment penalty (typically 2-5% of the outstanding amount). Some lenders allow prepayment after 6-12 months without penalty. Always check your loan agreement for prepayment terms.",
    },
    {
        q: "What is the difference between flat rate and reducing balance rate?",
        a: "Flat rate calculates interest on the full principal throughout the tenure, while reducing balance calculates interest on the outstanding principal. Reducing balance is more common and results in lower total interest. Always ask for reducing balance rate when comparing personal loans.",
    },
    {
        q: "What documents are required for a personal loan?",
        a: "Common documents include: Identity proof (Aadhaar, PAN), Address proof, Income proof (salary slips, bank statements), Employment proof, and sometimes collateral documents. Salaried individuals need last 3 months' salary slips and bank statements.",
    },
    {
        q: "How much personal loan can I get?",
        a: "The loan amount depends on your income, credit score, existing loans, and lender's policies. Usually, you can get up to 10-20 times your monthly net income. For example, with a ₹50,000 monthly salary, you may qualify for ₹5-10 lakh loan. Use our calculator to check your EMI affordability.",
    },
    {
        q: "What are processing fees for personal loans?",
        a: "Processing fees range from 0.5% to 3% of the loan amount plus GST. For a ₹5 lakh loan, fees can be ₹2,500 to ₹15,000. Some lenders offer zero processing fees during promotional periods. Always factor processing fees into your total loan cost.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "Shorter tenure means higher EMI but lower total interest. Longer tenure means lower EMI but higher total interest. For a ₹5 lakh loan at 12% interest: 3 years EMI ₹16,607, total interest ₹97,852; 5 years EMI ₹11,122, total interest ₹167,320. Balance affordability with total cost.",
    },
    {
        q: "What is the EMI for a ₹1 lakh personal loan?",
        a: "For a ₹1 lakh loan at 12% interest: 1 year EMI ₹8,885, total interest ₹6,620; 2 years EMI ₹4,707, total interest ₹12,968; 3 years EMI ₹3,321, total interest ₹19,556. Use our calculator to check EMIs for different loan amounts and tenures.",
    },
    {
        q: "Can I get a personal loan with a low CIBIL score?",
        a: "While a low CIBIL score (below 650) makes approval difficult, some NBFCs and fintech lenders offer loans at higher interest rates. You can also improve approval chances by adding a co-applicant, providing collateral, or demonstrating strong income stability.",
    },
    {
        q: "What is the difference between secured and unsecured personal loans?",
        a: "Unsecured personal loans don't require collateral and have higher interest rates. Secured personal loans require assets (like FD or property) as collateral and offer lower interest rates. Most personal loans are unsecured, making them accessible but costlier.",
    },
    {
        q: "How to reduce personal loan EMI?",
        a: "Ways to reduce EMI: 1) Choose a longer tenure, 2) Improve credit score for better rates, 3) Make a larger down payment if available, 4) Compare lenders for best rates, 5) Consider balance transfer to a lower rate lender, 6) Use our calculator to find optimal loan structure.",
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
    name: "Personal Loan EMI Calculator – Calculate Your Monthly Loan Payments",
    description: "Calculate your personal loan EMI with our free calculator. Plan your loan repayments, compare interest rates, and find the best loan tenure for your needs.",
    url: "https://numrexo.com/finance/personal-loan-emi-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Monthly EMI calculation",
        "Interest & principal breakdown",
        "Amortization schedule",
        "Total interest payment",
        "Loan tenure comparison",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Personal Loan EMI Calculator", item: "https://numrexo.com/finance/personal-loan-emi-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PersonalLoanEMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setResult(null);
    };

    const calculateEMI = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);

        if (isNaN(principal) || principal <= 0) {
            alert("Please enter a valid loan amount greater than zero");
            return;
        }

        if (isNaN(rate) || rate < 0) {
            alert("Please enter a valid interest rate");
            return;
        }

        if (isNaN(months) || months <= 0) {
            alert("Please enter a valid loan tenure greater than zero");
            return;
        }

        const monthlyRate = rate / 100 / 12;
        let emi = 0;

        if (monthlyRate === 0) {
            emi = principal / months;
        } else {
            emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        // Generate amortization schedule
        const schedule = [];
        let balance = principal;
        for (let i = 1; i <= Math.min(months, 60); i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = emi - interestPayment;
            balance = balance - principalPayment;

            schedule.push({
                month: i,
                emi: emi,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.max(0, balance),
            });
        }

        // Calculate summary statistics
        const averageInterest = totalInterest / months;
        const principalPercentage = (principal / totalPayment) * 100;
        const interestPercentage = (totalInterest / totalPayment) * 100;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        const monthlyPayment = emi;
        const monthlyIncome = principal * 0.3; // Assuming 30% of income for EMI

        if (monthlyPayment <= principal * 0.2) {
            rating = "Very Affordable ★★★★★";
            ratingColor = "text-green-400";
        } else if (monthlyPayment <= principal * 0.3) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-400";
        } else if (monthlyPayment <= principal * 0.4) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-400";
        } else if (monthlyPayment <= principal * 0.5) {
            rating = "Stretching ★★";
            ratingColor = "text-orange-400";
        } else {
            rating = "Highly Stretching ★";
            ratingColor = "text-red-400";
        }

        setResult({
            emi: emi,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
            principal: principal,
            months: months,
            rate: rate,
            monthlyRate: monthlyRate,
            schedule: schedule,
            averageInterest: averageInterest,
            principalPercentage: principalPercentage,
            interestPercentage: interestPercentage,
            rating: rating,
            ratingColor: ratingColor,
            emiFormatted: emi.toFixed(2),
            totalPaymentFormatted: totalPayment.toFixed(2),
            totalInterestFormatted: totalInterest.toFixed(2),
        });
    };

    // Preset loan amounts
    const presetAmounts = [100000, 250000, 500000, 1000000, 2000000];
    const presetRates = [10, 12, 14, 16, 18, 20];
    const presetTenures = [12, 24, 36, 48, 60];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/finance" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Finance Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Personal Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Personal Loan EMI Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Calculate your monthly loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Loan Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1000"
                                    placeholder="e.g., 500000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setLoanAmount(amount.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        ₹{amount >= 1000000 ? `${amount / 1000000}L` : `${amount / 1000}K`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g., 12"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetRates.map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => setInterestRate(rate.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        {rate}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Loan Tenure */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Tenure (months)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="e.g., 36"
                                    value={tenure}
                                    onChange={(e) => setTenure(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">months</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetTenures.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => setTenure(month.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        {month}M
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3">
                            <button
                                onClick={calculateEMI}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Calculate EMI →
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
                    title="Your Monthly EMI"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter loan details and press Calculate"
                    mainResult={result ? {
                        label: "Monthly EMI",
                        value: `₹${result.emiFormatted}`,
                        color: "text-blue-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Affordability Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: `₹${result.totalPaymentFormatted}`, valueColor: "text-yellow-400" },
                        { label: "Total Interest", value: `₹${result.totalInterestFormatted}`, valueColor: "text-orange-400" },
                        { label: "Principal Amount", value: `₹${result.principal.toFixed(2)}` },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months` },
                        { label: "Principal % of Total", value: `${result.principalPercentage.toFixed(1)}%`, valueColor: "text-green-400" },
                        { label: "Interest % of Total", value: `${result.interestPercentage.toFixed(1)}%`, valueColor: "text-orange-400" },
                        { label: "Average Interest per Month", value: `₹${result.averageInterest.toFixed(2)}` },
                    ] : []}
                />
            </div>

            {/* Amortization Schedule */}
            {result && result.schedule && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Amortization Schedule</h2>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-[#111827]">
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 px-4 text-gray-400">Month</th>
                                        <th className="text-right py-3 px-4 text-gray-400">EMI</th>
                                        <th className="text-right py-3 px-4 text-gray-400">Principal</th>
                                        <th className="text-right py-3 px-4 text-gray-400">Interest</th>
                                        <th className="text-right py-3 px-4 text-gray-400">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.schedule.map((row: any) => (
                                        <tr key={row.month} className="border-b border-gray-800/50 hover:bg-white/5">
                                            <td className="py-2 px-4 text-gray-300">{row.month}</td>
                                            <td className="py-2 px-4 text-right text-gray-300">₹{row.emi.toFixed(0)}</td>
                                            <td className="py-2 px-4 text-right text-green-400">₹{row.principal.toFixed(0)}</td>
                                            <td className="py-2 px-4 text-right text-orange-400">₹{row.interest.toFixed(0)}</td>
                                            <td className="py-2 px-4 text-right text-gray-300">₹{row.balance.toFixed(0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Showing first 60 months of amortization schedule</p>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Personal Loan EMI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Personal Loan EMI Calculator</strong> helps you estimate your monthly loan payments accurately. Whether you're planning to take a loan for a wedding, travel, home renovation, or debt consolidation, this calculator gives you a clear picture of your repayment obligations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the standard EMI formula to provide accurate results. It accounts for the loan amount, interest rate, and tenure to calculate your monthly payments. You can also see the total interest payable and the amortization schedule, which shows how each payment splits between principal and interest over time.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your EMI helps you budget better and avoid over-borrowing. Use our calculator to compare different loan options and find the one that best fits your financial situation.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Personal Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">loan amount</strong> you wish to borrow (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">annual interest rate</strong> offered by your lender (preset rates available).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">loan tenure</strong> in months (preset tenures for common options).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate EMI"</strong> to see your monthly payment and full amortization schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review the <strong className="text-white">affordability rating</strong> and total cost breakdown to make an informed decision.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Personal Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your exact monthly payment before taking a loan. Plan your monthly budget around your EMI obligations. Avoid over-committing and maintain healthy cash flow.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Lenders</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI offers from different banks and NBFCs. Find the best interest rate and tenure combination. Understand how even a small rate difference affects your total payment.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Tenure Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find the ideal tenure that balances affordable EMI with total interest cost. Understand the trade-off between lower EMIs and higher total interest over longer tenures.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Financial Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan your long-term financial goals. Understand the impact of EMI on your savings and investment capacity. Make smarter borrowing decisions for your financial future.</p>
                    </div>
                </div>
            </section>

            {/* EMI Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Personal Loan EMI Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center">
                    <p className="text-white font-mono text-lg mb-3">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                        <div>
                            <span className="text-blue-400 font-bold">EMI</span>
                            <span className="text-gray-500 block text-xs">Monthly Payment</span>
                        </div>
                        <div>
                            <span className="text-blue-400 font-bold">P</span>
                            <span className="text-gray-500 block text-xs">Principal (Loan Amount)</span>
                        </div>
                        <div>
                            <span className="text-blue-400 font-bold">r</span>
                            <span className="text-gray-500 block text-xs">Monthly Interest Rate</span>
                        </div>
                        <div>
                            <span className="text-blue-400 font-bold">n</span>
                            <span className="text-gray-500 block text-xs">Total Payments (months)</span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">The calculator uses the reducing balance method for accurate EMI calculation.</p>
                </div>
            </section>

            {/* Interest Rate Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Interest Rate Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Interest Rate</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹5L, 3Y)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">10%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,134</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹80,824</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,80,824</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">12%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,607</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹97,852</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,97,852</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">14%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹17,096</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1,15,456</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,15,456</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">16%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹17,599</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1,33,564</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,33,564</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">18%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹18,116</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1,52,176</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,52,176</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Comparison shows impact of interest rate on EMI and total cost for a ₹5 lakh loan over 3 years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tenure Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Tenure</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹5L, 12%)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">12 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,423</td>
                                <td className="py-2 px-4 text-right text-green-400">₹33,076</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,33,076</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">24 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹23,537</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹64,888</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,64,888</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">36 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,607</td>
                                <td className="py-2 px-4 text-right text-red-400">₹97,852</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,97,852</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">48 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹13,166</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1,31,968</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,31,968</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">60 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹11,122</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1,67,320</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,67,320</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Longer tenures reduce EMI but significantly increase total interest paid</p>
            </section>

            {/* Eligibility Criteria */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Personal Loan Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✅ Salaried Individuals</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 21-60 years</li>
                            <li>• Minimum monthly income: ₹25,000</li>
                            <li>• Work experience: 1+ years (6+ months in current job)</li>
                            <li>• CIBIL score: 700+ preferred</li>
                            <li>• Valid identity and address proof</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✅ Self-Employed</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 25-65 years</li>
                            <li>• ITR filing: 2+ years</li>
                            <li>• Business vintage: 3+ years</li>
                            <li>• Annual turnover: ₹5 lakhs+</li>
                            <li>• Profitability track record</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">* Eligibility criteria vary by lender. Always check with your bank for specific requirements.</p>
            </section>

            {/* Tips for Lower EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Lower Personal Loan EMI</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Improve Credit Score:</strong> A higher credit score (750+) qualifies you for lower interest rates. Check your score regularly and correct any errors.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Longer Tenure:</strong> While total interest is higher, longer tenure significantly reduces monthly EMI. Ideal for tight monthly budgets.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare Multiple Lenders:</strong> Different lenders offer different rates. Even a 1% difference can save thousands in interest. Use our calculator to compare offers.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider Balance Transfer:</strong> If you have an existing loan, transfer to a lender offering lower rates. This can significantly reduce your EMI and total interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Opt for Part Payment:</strong> Many lenders allow part payments without penalty. Use bonuses or salary hikes to reduce principal, lowering your EMI.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Add-on Products Wisely:</strong> Some banks offer lower rates if you buy loan insurance or open a salary account. Evaluate if these add-ons are worth it.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes to Avoid */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Taking a Personal Loan</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Over-borrowing:</strong> Borrow only what you need. Higher loan amount means higher EMI and more interest. Use our calculator to find your comfortable EMI.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring Processing Fees:</strong> Processing fees add to your loan cost. Always factor them into your total loan cost while comparing lenders.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Missing EMI Payments:</strong> Late EMI payments hurt your credit score. Set up auto-debit to avoid missed payments and penalties.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Checking Prepayment Terms:</strong> Some lenders charge high prepayment penalties. Read your loan agreement carefully before signing.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Multiple Loan Applications:</strong> Multiple loan applications lower your credit score. Research thoroughly and apply to select lenders only.</span>
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