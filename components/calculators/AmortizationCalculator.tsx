"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is an amortization calculator?",
        a: "An amortization calculator helps you understand how your loan payments are split between principal and interest over time. It generates a detailed amortization schedule showing each payment's breakdown, helping you see how your loan balance decreases over the loan tenure.",
    },
    {
        q: "What is amortization?",
        a: "Amortization is the process of paying off a loan through regular payments over time. Each payment covers both interest and principal. Early payments are mostly interest, while later payments are mostly principal. This is how most home loans, car loans, and personal loans work.",
    },
    {
        q: "How does an amortization schedule work?",
        a: "An amortization schedule shows each payment's breakdown: EMI amount, principal portion, interest portion, and remaining balance. It helps you see how much interest you're paying and when you'll own the asset free and clear. The schedule runs from the first payment to the last.",
    },
    {
        q: "What is the difference between amortization and simple interest?",
        a: "Amortization uses reducing balance method where interest is calculated on the outstanding principal. Simple interest calculates interest on the original principal throughout the tenure. Amortization is more common and results in lower total interest compared to simple interest.",
    },
    {
        q: "How is interest calculated in an amortization schedule?",
        a: "Interest is calculated on the outstanding principal balance each month. The formula is: Interest = Outstanding Principal × Monthly Interest Rate. As you pay down the principal, the interest portion decreases, and the principal portion increases in each subsequent payment.",
    },
    {
        q: "What is the total interest paid over the loan tenure?",
        a: "Total interest is the sum of all interest payments over the loan tenure. It depends on the loan amount, interest rate, and tenure. For a ₹50 lakh home loan at 9% for 20 years, total interest would be approximately ₹58 lakh, which is more than the principal amount.",
    },
    {
        q: "How does prepayment affect amortization?",
        a: "Prepayment reduces the outstanding principal, which reduces the total interest paid. It can shorten the loan tenure or reduce future EMIs. Even small prepayments early in the loan tenure can save significant interest because interest is calculated on the outstanding balance.",
    },
    {
        q: "How does loan tenure affect amortization?",
        a: "Longer tenure means lower EMI but higher total interest. Shorter tenure means higher EMI but lower total interest. For example, a ₹50 lakh loan at 9%: 15 years total interest ₹41.28L, 30 years total interest ₹94.83L. The amortization schedule shows this clearly.",
    },
    {
        q: "What is the principal portion in early payments?",
        a: "In early payments, the principal portion is very small because most of the payment goes toward interest. For example, in the first payment of a ₹50 lakh, 9%, 20-year loan, interest is ₹37,500 and principal is only ₹7,486. The principal portion increases gradually.",
    },
    {
        q: "What is the difference between amortization and depreciation?",
        a: "Amortization is for intangible assets and loans, while depreciation is for tangible assets. In loans, amortization refers to paying off debt over time. In accounting, amortization spreads the cost of intangible assets over their useful life.",
    },
    {
        q: "How does interest rate affect amortization?",
        a: "Higher interest rates mean more interest in early payments and slower principal reduction. A 1% increase in interest rate can significantly increase total interest and extend the time to pay off the principal. For a ₹50 lakh loan over 20 years, 1% increase adds about ₹6-7 lakh in total interest.",
    },
    {
        q: "What is the amortization formula?",
        a: "The amortization formula calculates EMI: EMI = P × r × (1+r)^n / ((1+r)^n - 1). Then each month: Interest = Balance × r, Principal = EMI - Interest, New Balance = Balance - Principal. This is repeated for each month of the loan tenure.",
    },
    {
        q: "How can I reduce my total interest through amortization?",
        a: "Ways to reduce total interest: 1) Make prepayments, 2) Choose shorter tenure, 3) Get lower interest rate, 4) Make larger down payment, 5) Pay extra each month, 6) Choose bi-weekly payments instead of monthly. Even small extra payments early save significant interest.",
    },
    {
        q: "What is negative amortization?",
        a: "Negative amortization occurs when your payment is less than the interest due, causing the principal balance to increase. This can happen with interest-only loans or payment-option ARMs. It's risky and should be avoided as it increases your overall debt.",
    },
    {
        q: "Why does amortization matter for home loans?",
        a: "Amortization matters because home loans are the largest debt most people take. Understanding amortization helps you make informed decisions about prepayments, loan tenure, and interest rates. It also helps you plan your finances better and save money on interest.",
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
    name: "Amortization Calculator – Loan Amortization Schedule Generator",
    description: "Generate a complete loan amortization schedule with our free calculator. See how your payments are split between principal and interest over the life of your loan.",
    url: "https://numrexo.com/finance/amortization-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Complete amortization schedule",
        "Principal & interest breakdown",
        "Monthly payment calculation",
        "Total interest analysis",
        "Visual payment distribution",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Amortization Calculator", item: "https://numrexo.com/finance/amortization-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AmortizationCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [extraPayment, setExtraPayment] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setExtraPayment("");
        setResult(null);
    };

    const calculateAmortization = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);
        const extra = parseFloat(extraPayment) || 0;

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

        // Generate full amortization schedule
        const schedule = [];
        let balance = principal;
        let totalInterest = 0;
        let totalPrincipalPaid = 0;
        let actualMonths = months;
        let emiWithExtra = emi + extra;

        for (let i = 1; i <= months; i++) {
            const interestPayment = balance * monthlyRate;
            let principalPayment = 0;

            if (extra > 0) {
                // With extra payment
                const regularPrincipal = emi - interestPayment;
                const extraPrincipal = extra;
                principalPayment = regularPrincipal + extraPrincipal;
                if (principalPayment > balance + interestPayment) {
                    principalPayment = balance + interestPayment;
                    emiWithExtra = principalPayment + interestPayment;
                }
            } else {
                // Regular payment
                principalPayment = emi - interestPayment;
            }

            // Ensure principal doesn't exceed balance + interest
            if (principalPayment > balance + interestPayment) {
                principalPayment = balance + interestPayment;
            }

            balance = balance - principalPayment;
            totalInterest += interestPayment;
            totalPrincipalPaid += principalPayment;

            schedule.push({
                month: i,
                emi: extra > 0 ? Math.min(emiWithExtra, principalPayment + interestPayment) : emi,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.max(0, balance),
                isExtraPayment: extra > 0 && i > 0,
            });

            if (balance <= 0) {
                actualMonths = i;
                break;
            }
        }

        // Calculate summary statistics
        const totalPayment = totalPrincipalPaid + totalInterest;
        const principalPercentage = (principal / totalPayment) * 100;
        const interestPercentage = (totalInterest / totalPayment) * 100;
        const interestSaved = extra > 0 ? (months * emi - totalPayment) - (months * emi - (principal + totalInterest)) : 0;
        const monthsSaved = extra > 0 ? months - actualMonths : 0;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        const interestToPrincipalRatio = totalInterest / principal;

        if (interestToPrincipalRatio <= 0.5) {
            rating = "Excellent ★★★★★";
            ratingColor = "text-green-400";
        } else if (interestToPrincipalRatio <= 1.0) {
            rating = "Good ★★★★";
            ratingColor = "text-blue-400";
        } else if (interestToPrincipalRatio <= 1.5) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-400";
        } else if (interestToPrincipalRatio <= 2.0) {
            rating = "High ★★";
            ratingColor = "text-orange-400";
        } else {
            rating = "Very High ★";
            ratingColor = "text-red-400";
        }

        setResult({
            emi: emi,
            emiWithExtra: extra > 0 ? emi + extra : emi,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
            totalPrincipal: principal,
            months: months,
            actualMonths: actualMonths,
            rate: rate,
            extraPayment: extra,
            schedule: schedule,
            principalPercentage: principalPercentage,
            interestPercentage: interestPercentage,
            interestSaved: interestSaved,
            monthsSaved: monthsSaved,
            interestToPrincipalRatio: interestToPrincipalRatio,
            rating: rating,
            ratingColor: ratingColor,
            emiFormatted: emi.toFixed(2),
            emiWithExtraFormatted: (emi + extra).toFixed(2),
            totalPaymentFormatted: totalPayment.toFixed(2),
            totalInterestFormatted: totalInterest.toFixed(2),
            totalPrincipalFormatted: principal.toFixed(2),
            interestSavedFormatted: interestSaved.toFixed(2),
        });
    };

    // Preset values
    const presetAmounts = [1000000, 2500000, 5000000, 7500000, 10000000];
    const presetRates = [7, 8, 9, 10, 11];
    const presetTenures = [60, 120, 180, 240, 300, 360];
    const presetExtraPayments = [0, 1000, 2000, 5000, 10000];

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
                        <span itemProp="name" className="text-gray-300">Amortization Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Amortization Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Generate your loan amortization schedule</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Loan Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="100000"
                                    placeholder="e.g., 5000000"
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
                                        {amount >= 10000000 ? `₹${amount / 10000000}Cr` : `₹${amount / 100000}L`}
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
                                    placeholder="e.g., 9"
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
                                    placeholder="e.g., 240"
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
                                        {month >= 240 ? `${month / 12}Y` : `${month}M`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Extra Payment */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Extra Monthly Payment (₹) <span className="text-gray-500">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="500"
                                    placeholder="e.g., 5000"
                                    value={extraPayment}
                                    onChange={(e) => setExtraPayment(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetExtraPayments.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setExtraPayment(amount.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        {amount === 0 ? "None" : `₹${amount / 1000}K`}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Even small extra payments can save significant interest</p>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3">
                            <button
                                onClick={calculateAmortization}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Generate Schedule →
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
                    title="Amortization Summary"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter loan details and press Generate Schedule"
                    mainResult={result ? {
                        label: "Monthly EMI",
                        value: `₹${result.emiFormatted}`,
                        color: "text-blue-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Amortization Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: `₹${result.totalPaymentFormatted}`, valueColor: "text-yellow-400" },
                        { label: "Total Interest", value: `₹${result.totalInterestFormatted}`, valueColor: "text-orange-400" },
                        { label: "Principal Amount", value: `₹${result.totalPrincipalFormatted}` },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months / 12).toFixed(1)} years)` },
                        ...(result.extraPayment > 0 ? [
                            { label: "Extra Payment", value: `₹${result.extraPayment.toFixed(2)}/month`, valueColor: "text-green-400" },
                            { label: "EMI with Extra Payment", value: `₹${result.emiWithExtraFormatted}`, valueColor: "text-green-400" },
                            { label: "Actual Repayment Period", value: `${result.actualMonths} months (${(result.actualMonths / 12).toFixed(1)} years)`, valueColor: "text-green-400" },
                            { label: "Months Saved", value: `${result.monthsSaved} months ${result.monthsSaved > 0 ? '🎉' : ''}`, valueColor: "text-green-400" },
                            { label: "Interest Saved", value: `₹${result.interestSavedFormatted}`, valueColor: "text-green-400" },
                        ] : []),
                        { label: "Principal % of Total", value: `${result.principalPercentage.toFixed(1)}%`, valueColor: "text-green-400" },
                        { label: "Interest % of Total", value: `${result.interestPercentage.toFixed(1)}%`, valueColor: "text-orange-400" },
                        { label: "Interest to Principal Ratio", value: result.interestToPrincipalRatio.toFixed(2), valueColor: result.interestToPrincipalRatio < 1 ? "text-green-400" : "text-orange-400" },
                    ] : []}
                />
            </div>

            {/* Amortization Schedule */}
            {result && result.schedule && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Full Amortization Schedule</h2>
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
                                        {result.extraPayment > 0 && (
                                            <th className="text-center py-3 px-4 text-green-400">Extra Payment 💰</th>
                                        )}
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
                                            {result.extraPayment > 0 && (
                                                <td className="py-2 px-4 text-center text-green-400">
                                                    {row.isExtraPayment ? '✅' : '-'}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-2 flex gap-4 text-xs">
                        <p className="text-gray-600">Showing complete amortization schedule</p>
                        {result.extraPayment > 0 && (
                            <p className="text-green-400">✅ Extra payments applied</p>
                        )}
                    </div>
                </section>
            )}

            {/* Payment Distribution Summary */}
            {result && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Payment Distribution</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                            <h4 className="text-xs text-gray-500 mb-1">Principal</h4>
                            <p className="text-2xl font-bold text-green-400">{result.principalPercentage.toFixed(1)}%</p>
                            <p className="text-xs text-gray-500 mt-1">₹{result.totalPrincipalFormatted}</p>
                        </div>
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                            <h4 className="text-xs text-gray-500 mb-1">Interest</h4>
                            <p className="text-2xl font-bold text-orange-400">{result.interestPercentage.toFixed(1)}%</p>
                            <p className="text-xs text-gray-500 mt-1">₹{result.totalInterestFormatted}</p>
                        </div>
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                            <h4 className="text-xs text-gray-500 mb-1">Total</h4>
                            <p className="text-2xl font-bold text-yellow-400">100%</p>
                            <p className="text-xs text-gray-500 mt-1">₹{result.totalPaymentFormatted}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Amortization Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Amortization Calculator</strong> helps you understand how your loan payments are distributed between principal and interest over time. It generates a complete amortization schedule showing every payment's breakdown, helping you plan your finances better.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the standard amortization formula to generate accurate schedules for any loan type - home loans, car loans, personal loans, or any other installment loan. You can also see the impact of extra payments on your total interest and loan tenure.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your amortization schedule helps you make informed decisions about prepayments, loan tenure, and interest rates. It's an essential tool for anyone with a long-term loan.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Amortization Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">loan amount</strong> (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">interest rate</strong> offered by your lender.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">loan tenure</strong> in months.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Optionally add an <strong className="text-white">extra monthly payment</strong> to see interest savings.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Generate Schedule"</strong> to see your complete amortization schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Review the <strong className="text-white">payment distribution</strong> and use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an Amortization Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ See Payment Breakdown</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand exactly how much of each payment goes toward principal versus interest. See how your loan balance decreases over time.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Plan Prepayments</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Use extra payment analysis to see how additional payments reduce your total interest and shorten your loan tenure.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Compare Loan Options</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare different interest rates, tenures, and extra payment scenarios to find the best loan structure for your needs.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Financial Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan your long-term finances by understanding when your loan will be paid off and how much interest you'll pay.</p>
                    </div>
                </div>
            </section>

            {/* Amortization Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Amortization Formula</h2>
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
                    <p className="text-gray-500 text-xs mt-4">Each month: Interest = Balance × r | Principal = EMI - Interest | New Balance = Balance - Principal</p>
                </div>
            </section>

            {/* Amortization Example */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Amortization Example</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Month</th>
                                <th className="text-right py-3 px-4 text-gray-400">EMI</th>
                                <th className="text-right py-3 px-4 text-gray-400">Principal</th>
                                <th className="text-right py-3 px-4 text-gray-400">Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">1</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,986</td>
                                <td className="py-2 px-4 text-right text-green-400">₹7,486</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹37,500</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹49,92,514</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">2</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,986</td>
                                <td className="py-2 px-4 text-right text-green-400">₹7,542</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹37,444</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹49,84,972</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">3</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,986</td>
                                <td className="py-2 px-4 text-right text-green-400">₹7,599</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹37,387</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹49,77,373</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">...</td>
                                <td className="py-2 px-4 text-right text-gray-300">...</td>
                                <td className="py-2 px-4 text-right text-green-400">...</td>
                                <td className="py-2 px-4 text-right text-orange-400">...</td>
                                <td className="py-2 px-4 text-right text-gray-300">...</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">240</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,986</td>
                                <td className="py-2 px-4 text-right text-green-400">₹44,653</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹333</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Example: ₹50 lakh home loan at 9% for 20 years (240 months)</p>
            </section>

            {/* Extra Payment Impact */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Impact of Extra Payments</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Extra Payment</th>
                                <th className="text-right py-3 px-4 text-gray-400">Tenure Saved</th>
                                <th className="text-right py-3 px-4 text-gray-400">Interest Saved</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Savings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">₹0</td>
                                <td className="py-2 px-4 text-right text-gray-300">0 months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">₹1,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">5 months</td>
                                <td className="py-2 px-4 text-right text-green-400">₹43,212</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹48,212</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">₹2,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">10 months</td>
                                <td className="py-2 px-4 text-right text-green-400">₹84,568</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹94,568</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">₹5,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">22 months</td>
                                <td className="py-2 px-4 text-right text-green-400">₹1,87,432</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹2,02,432</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">₹10,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">38 months</td>
                                <td className="py-2 px-4 text-right text-green-400">₹3,12,876</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹3,42,876</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Based on ₹50 lakh home loan at 9% for 20 years</p>
            </section>

            {/* Tips for Using Amortization */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Using Amortization to Save Money</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Make Extra Payments Early:</strong> Extra payments in the first few years save the most interest because interest is calculated on the outstanding balance.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Shorter Tenure:</strong> While EMI is higher, total interest is significantly lower. Use the amortization schedule to see the difference.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Bi-Weekly Payments:</strong> Making half-payments every two weeks results in 13 full payments per year instead of 12, saving interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Refinance When Rates Drop:</strong> Even a 0.5% rate drop can save significant interest. Check your amortization schedule to see the impact.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Round Up Your EMI:</strong> Rounding up your EMI to the nearest hundred or thousand can shave months off your loan tenure.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Using Amortization</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring Extra Payment Impact:</strong> Even small extra payments can save thousands in interest. Always consider making extra payments when possible.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Understanding Early Payments:</strong> In early years, most of your payment goes toward interest. This is normal and part of the amortization process.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Overlooking Refinancing Opportunities:</strong> Regularly check if refinancing at lower rates can reduce your interest burden.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Choosing Longest Tenure:</strong> While it reduces EMI, it significantly increases total interest. Use amortization to see the difference.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Using Extra Payment Feature:</strong> Our calculator shows exactly how extra payments affect your loan. Use this to plan your prepayments effectively.</span>
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