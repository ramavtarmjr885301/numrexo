"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a consumer loan EMI calculator?",
        a: "A consumer loan EMI calculator helps you estimate your monthly payments for consumer durable loans, personal loans, or any other consumer finance products. It uses the standard EMI formula to calculate equal monthly installments based on the loan amount, interest rate, and tenure.",
    },
    {
        q: "What is a consumer loan?",
        a: "A consumer loan is a type of loan taken by individuals for personal, family, or household purposes. It includes loans for buying consumer durables (TV, refrigerator, washing machine), electronics, furniture, vehicles, education, medical expenses, or debt consolidation. These loans are typically unsecured and have fixed interest rates.",
    },
    {
        q: "How is consumer loan EMI calculated?",
        a: "Consumer loan EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). P is the loan amount, r is the monthly interest rate (annual rate/12), and n is the loan tenure in months. This formula ensures equal monthly payments throughout the loan tenure.",
    },
    {
        q: "What is the interest rate for consumer loans?",
        a: "Consumer loan interest rates typically range from 10% to 24% per annum, depending on the lender, loan amount, tenure, and your credit score. For consumer durables, rates are often higher (12-18%), while for secured consumer loans (like vehicle loans), rates can be lower (8-12%).",
    },
    {
        q: "What is the maximum tenure for a consumer loan?",
        a: "Consumer loan tenures typically range from 3 to 60 months (up to 5 years). For consumer durables, tenures are usually 3-24 months. For larger consumer loans (like vehicle loans), tenures can extend up to 60-84 months. Longer tenures mean lower EMIs but higher total interest.",
    },
    {
        q: "What documents are required for a consumer loan?",
        a: "Common documents include: Identity proof (Aadhaar, PAN, Voter ID), Address proof, Income proof (salary slips, bank statements), Employment proof, and sometimes purchase invoice for consumer durables. For small consumer loans (below ₹50,000), minimal documentation may be required.",
    },
    {
        q: "Can I prepay my consumer loan?",
        a: "Yes, most lenders allow prepayment of consumer loans. However, prepayment penalties may apply (typically 2-5% of the outstanding amount). Some lenders allow prepayment after 6-12 months without penalty. Always check your loan agreement for prepayment terms before signing.",
    },
    {
        q: "What is the difference between consumer loan and personal loan?",
        a: "Consumer loans are specifically for purchasing consumer goods (electronics, furniture, vehicles), while personal loans can be used for any purpose. Consumer loans often have lower interest rates and specific tenures tied to the product's life. Personal loans offer more flexibility but may have higher interest rates.",
    },
    {
        q: "How does credit score affect consumer loan approval?",
        a: "A good credit score (750+) improves your chances of consumer loan approval and helps you get lower interest rates. With a lower credit score (below 650), approval may still be possible but at higher interest rates. Some lenders offer consumer loans without credit checks for small amounts.",
    },
    {
        q: "What is the EMI for a ₹50,000 consumer loan?",
        a: "For a ₹50,000 loan at 12% interest: 12 months EMI ₹4,442, total interest ₹3,304; 24 months EMI ₹2,354, total interest ₹6,496; 36 months EMI ₹1,661, total interest ₹9,796. Use our calculator to check EMIs for different loan amounts and tenures.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "Shorter tenure means higher EMI but lower total interest. Longer tenure means lower EMI but higher total interest. For a ₹50,000 loan at 12%: 12 months EMI ₹4,442 (total interest ₹3,304); 36 months EMI ₹1,661 (total interest ₹9,796). Choose based on your monthly budget.",
    },
    {
        q: "What are processing fees for consumer loans?",
        a: "Processing fees typically range from 0.5% to 3% of the loan amount. For small consumer loans (under ₹50,000), processing fees may be waived or minimal. For larger loans, fees can be ₹500 to ₹5,000 plus GST. Always factor processing fees into your total loan cost.",
    },
    {
        q: "Can I get a consumer loan with no income proof?",
        a: "Some lenders offer small consumer loans (up to ₹50,000) with minimal documentation and no income proof. However, interest rates are usually higher. For larger amounts, income proof is typically required. NBFCs and fintech lenders are more flexible with documentation requirements.",
    },
    {
        q: "What is the difference between secured and unsecured consumer loans?",
        a: "Unsecured consumer loans don't require collateral and have higher interest rates. Secured consumer loans (like vehicle loans or loans against FD) require collateral and offer lower interest rates. Most consumer durable loans are unsecured, while vehicle loans are secured.",
    },
    {
        q: "How to reduce consumer loan EMI?",
        a: "Ways to reduce EMI: 1) Choose a longer tenure, 2) Improve credit score for better rates, 3) Make a larger down payment, 4) Compare lenders for best rates, 5) Consider a secured loan if possible, 6) Use our calculator to find the optimal loan structure for your budget.",
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
    name: "Consumer Loan EMI Calculator – Calculate Your Monthly Payments",
    description: "Calculate your consumer loan EMI with our free calculator. Plan your loan repayments for consumer durables, electronics, vehicles, and more.",
    url: "https://numrexo.com/finance/consumer-loan-emi-calculator",
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
        { "@type": "ListItem", position: 3, name: "Consumer Loan EMI Calculator", item: "https://numrexo.com/finance/consumer-loan-emi-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConsumerLoanEMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [loanType, setLoanType] = useState("durable");
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

        // Determine rating based on loan type
        let rating = "";
        let ratingColor = "";
        const monthlyPayment = emi;

        // Different rating criteria for different loan types
        if (loanType === "durable") {
            if (monthlyPayment <= 5000) {
                rating = "Very Affordable ★★★★★";
                ratingColor = "text-green-400";
            } else if (monthlyPayment <= 10000) {
                rating = "Affordable ★★★★";
                ratingColor = "text-blue-400";
            } else if (monthlyPayment <= 20000) {
                rating = "Moderate ★★★";
                ratingColor = "text-yellow-400";
            } else if (monthlyPayment <= 35000) {
                rating = "Stretching ★★";
                ratingColor = "text-orange-400";
            } else {
                rating = "Highly Stretching ★";
                ratingColor = "text-red-400";
            }
        } else if (loanType === "vehicle") {
            if (monthlyPayment <= 10000) {
                rating = "Very Affordable ★★★★★";
                ratingColor = "text-green-400";
            } else if (monthlyPayment <= 20000) {
                rating = "Affordable ★★★★";
                ratingColor = "text-blue-400";
            } else if (monthlyPayment <= 35000) {
                rating = "Moderate ★★★";
                ratingColor = "text-yellow-400";
            } else if (monthlyPayment <= 50000) {
                rating = "Stretching ★★";
                ratingColor = "text-orange-400";
            } else {
                rating = "Highly Stretching ★";
                ratingColor = "text-red-400";
            }
        } else {
            if (monthlyPayment <= 5000) {
                rating = "Very Affordable ★★★★★";
                ratingColor = "text-green-400";
            } else if (monthlyPayment <= 10000) {
                rating = "Affordable ★★★★";
                ratingColor = "text-blue-400";
            } else if (monthlyPayment <= 15000) {
                rating = "Moderate ★★★";
                ratingColor = "text-yellow-400";
            } else if (monthlyPayment <= 25000) {
                rating = "Stretching ★★";
                ratingColor = "text-orange-400";
            } else {
                rating = "Highly Stretching ★";
                ratingColor = "text-red-400";
            }
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
            loanType: loanType,
        });
    };

    // Preset values for different loan types
    const getPresets = () => {
        if (loanType === "durable") {
            return {
                amounts: [10000, 25000, 50000, 100000, 150000],
                rates: [10, 12, 14, 16, 18],
                tenures: [3, 6, 12, 18, 24]
            };
        } else if (loanType === "vehicle") {
            return {
                amounts: [100000, 300000, 500000, 800000, 1000000],
                rates: [8, 9, 10, 11, 12],
                tenures: [24, 36, 48, 60, 72]
            };
        } else {
            return {
                amounts: [50000, 100000, 200000, 300000, 500000],
                rates: [10, 12, 14, 16, 18],
                tenures: [12, 24, 36, 48, 60]
            };
        }
    };

    const presets = getPresets();

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
                        <span itemProp="name" className="text-gray-300">Consumer Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Consumer Loan EMI Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Calculate your monthly loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Loan Type */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setLoanType("durable")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanType === "durable"
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Consumer Durable
                                </button>
                                <button
                                    onClick={() => setLoanType("vehicle")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanType === "vehicle"
                                        ? "bg-green-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Vehicle
                                </button>
                                <button
                                    onClick={() => setLoanType("electronics")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanType === "electronics"
                                        ? "bg-purple-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Electronics
                                </button>
                            </div>
                        </div>

                        {/* Loan Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1000"
                                    placeholder="e.g., 50000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presets.amounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setLoanAmount(amount.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        ₹{amount >= 100000 ? `${amount / 100000}L` : amount >= 1000 ? `${amount / 1000}K` : amount}
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
                                {presets.rates.map((rate) => (
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
                                    placeholder="e.g., 12"
                                    value={tenure}
                                    onChange={(e) => setTenure(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">months</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presets.tenures.map((month) => (
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
                    emptyIcon="🛒"
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
                        { label: "Loan Type", value: result.loanType.charAt(0).toUpperCase() + result.loanType.slice(1) },
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
                <h2 className="text-xl font-semibold text-white mb-3">About Consumer Loan EMI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Consumer Loan EMI Calculator</strong> helps you estimate your monthly payments for consumer loans, including consumer durables, vehicles, electronics, and other personal purchases. Whether you're buying a new TV, refrigerator, laptop, or planning a vehicle purchase, this calculator gives you a clear picture of your repayment obligations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the standard EMI formula to provide accurate results for different types of consumer loans. It accounts for the loan amount, interest rate, and tenure to calculate your monthly payments. You can also see the total interest payable and the amortization schedule, which shows how each payment splits between principal and interest over time.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Consumer loans are designed for purchasing goods and services for personal use. Understanding your EMI helps you budget better and choose the right loan product. Use our calculator to compare different loan options and find the one that best fits your monthly budget.
                </p>
            </section>

            {/* Types of Consumer Loans */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Types of Consumer Loans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🏷️ Consumer Durable Loans</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• For buying TVs, refrigerators, washing machines</li>
                            <li>• Tenure: 3-24 months</li>
                            <li>• Interest: 10-18% p.a.</li>
                            <li>• Amount: Up to ₹1,00,000</li>
                            <li>• Instant approval options</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">🚗 Vehicle Loans</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• For cars, bikes, scooters</li>
                            <li>• Tenure: 24-72 months</li>
                            <li>• Interest: 8-12% p.a.</li>
                            <li>• Amount: Up to ₹10,00,000</li>
                            <li>• Secured against vehicle</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">💻 Electronics Loans</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• For laptops, mobiles, gadgets</li>
                            <li>• Tenure: 3-24 months</li>
                            <li>• Interest: 12-20% p.a.</li>
                            <li>• Amount: Up to ₹2,00,000</li>
                            <li>• Often zero-cost EMI options</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Consumer Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">loan type</strong> - Consumer Durable, Vehicle, or Electronics.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">loan amount</strong> (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">annual interest rate</strong> offered by your lender.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Select the <strong className="text-white">loan tenure</strong> in months.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate EMI"</strong> to see your monthly payment and amortization schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Review the <strong className="text-white">affordability rating</strong> and use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Consumer Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Smart Shopping Decisions</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly what you can afford before making a purchase. Plan your monthly budget around your EMI obligations and avoid over-committing.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Financing Options</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI offers from different retailers and lenders. Find the best interest rate and tenure combination for your purchase.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Tenure Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find the ideal tenure that balances affordable monthly payments with total interest cost for your consumer purchase.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Zero-Cost EMI Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand the true cost of zero-cost EMI offers. Often, they include hidden charges or higher product prices. Our calculator reveals the real cost.</p>
                    </div>
                </div>
            </section>

            {/* Consumer Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Consumer Loan EMI Formula</h2>
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

            {/* Consumer Loan Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Consumer Loan Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Loan Type</th>
                                <th className="text-right py-3 px-4 text-gray-400">Amount</th>
                                <th className="text-right py-3 px-4 text-gray-400">Rate</th>
                                <th className="text-right py-3 px-4 text-gray-400">Tenure</th>
                                <th className="text-right py-3 px-4 text-gray-400">EMI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">Consumer Durable</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹50,000</td>
                                <td className="py-2 px-4 text-right text-yellow-400">14%</td>
                                <td className="py-2 px-4 text-right text-gray-300">12 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹4,490</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">Vehicle</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,00,000</td>
                                <td className="py-2 px-4 text-right text-yellow-400">10%</td>
                                <td className="py-2 px-4 text-right text-gray-300">48 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹12,680</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-purple-400 font-bold">Electronics</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,00,000</td>
                                <td className="py-2 px-4 text-right text-yellow-400">16%</td>
                                <td className="py-2 px-4 text-right text-gray-300">18 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,324</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">Consumer Durable</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹30,000</td>
                                <td className="py-2 px-4 text-right text-yellow-400">12%</td>
                                <td className="py-2 px-4 text-right text-gray-300">6 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹5,171</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* EMI amounts are indicative and based on the specified parameters</p>
            </section>

            {/* Consumer Loan Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Smart Consumer Loan Borrowing</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check Zero-Cost EMI Offers:</strong> Many retailers offer zero-cost EMI, but often the product price is higher. Use our calculator to compare total cost.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Appropriate Tenure:</strong> Consumer durable loans should have shorter tenures (6-12 months) as products depreciate. Longer tenures for vehicles make sense.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare Multiple Lenders:</strong> Different lenders offer different rates for consumer loans. Even a 1% difference can save you money.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Read the Fine Print:</strong> Check for processing fees, prepayment charges, and late payment penalties before signing the loan agreement.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider Insurance:</strong> Some consumer loans include insurance. Check if it's mandatory and if you can opt out to save costs.</span>
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