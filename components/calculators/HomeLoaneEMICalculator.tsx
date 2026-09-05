"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a home loan EMI calculator?",
        a: "A home loan EMI calculator helps you estimate your monthly mortgage payments based on the loan amount, interest rate, and tenure. It uses the standard EMI formula to calculate equal monthly installments, helping you plan your home purchase budget effectively.",
    },
    {
        q: "How is home loan EMI calculated?",
        a: "Home loan EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). P is the loan amount, r is the monthly interest rate (annual rate/12), and n is the loan tenure in months. This formula ensures equal monthly payments throughout the loan tenure.",
    },
    {
        q: "What is the current home loan interest rate?",
        a: "Home loan interest rates in India typically range from 8.5% to 11% per annum, depending on the lender, loan amount, tenure, and your credit score. SBI, HDFC, and ICICI offer rates between 8.5-9.5% for salaried individuals with good credit scores.",
    },
    {
        q: "What is the maximum tenure for a home loan?",
        a: "Home loan tenures typically range from 5 to 30 years (60-360 months). Longer tenures mean lower EMIs but higher total interest payments. Most lenders offer up to 30 years for home loans, subject to your age and retirement age.",
    },
    {
        q: "How does credit score affect home loan interest rate?",
        a: "A good credit score (750+) helps you get lower interest rates on home loans. For example, a 1% lower interest rate on a ₹50 lakh loan for 20 years can save you approximately ₹3,300 per month in EMI and over ₹8 lakh in total interest.",
    },
    {
        q: "What is the difference between fixed and floating interest rates?",
        a: "Fixed rate remains constant throughout the loan tenure, offering predictability but higher rates. Floating rate changes with market conditions (RBI repo rate), offering lower rates but with uncertainty. Floating rates are more common and typically cheaper in the long run.",
    },
    {
        q: "What documents are required for a home loan?",
        a: "Common documents include: Identity proof (Aadhaar, PAN), Address proof, Income proof (salary slips, ITR, bank statements), Property documents, Employment proof, and credit score report. Salaried individuals need last 3 months' salary slips and 6 months' bank statements.",
    },
    {
        q: "How much home loan can I get?",
        a: "The loan amount depends on your income, credit score, existing loans, and property value. Usually, you can get up to 80-90% of the property value (LTV ratio). For a ₹50,000 monthly salary, you may qualify for ₹30-40 lakh home loan.",
    },
    {
        q: "What are processing fees for home loans?",
        a: "Processing fees typically range from 0.5% to 1% of the loan amount plus GST. For a ₹50 lakh loan, fees can be ₹25,000 to ₹50,000. Some lenders offer zero processing fees during promotional periods or for specific customer segments.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "Shorter tenure means higher EMI but lower total interest. Longer tenure means lower EMI but higher total interest. For a ₹50 lakh loan at 9%: 15 years EMI ₹50,710 (total interest ₹41.28L); 30 years EMI ₹40,230 (total interest ₹94.83L). Balance affordability with total cost.",
    },
    {
        q: "Can I prepay my home loan?",
        a: "Yes, most lenders allow prepayment of home loans. For floating rate loans, there's usually no prepayment penalty. For fixed rate loans, prepayment charges may apply (2-5%). Some lenders allow partial prepayment without penalty, reducing your principal and future EMIs.",
    },
    {
        q: "What is the EMI for a ₹30 lakh home loan?",
        a: "For a ₹30 lakh loan at 9% interest: 15 years EMI ₹30,426, total interest ₹24.77L; 20 years EMI ₹26,986, total interest ₹34.77L; 25 years EMI ₹25,178, total interest ₹45.53L. Use our calculator to check EMIs for different loan amounts and tenures.",
    },
    {
        q: "What is the difference between home loan and mortgage?",
        a: "A home loan is specifically for purchasing a residential property, while a mortgage is a broader term for loans secured by property. Home loans are for buying, constructing, or renovating homes, while mortgages can be for any purpose using property as collateral.",
    },
    {
        q: "What is LTV ratio in home loans?",
        a: "Loan-to-Value (LTV) ratio is the percentage of the property value that the bank is willing to finance. For properties up to ₹30 lakhs, LTV can be up to 90%; for ₹30-75 lakhs, up to 80%; for above ₹75 lakhs, up to 75%. Higher LTV means lower down payment requirement.",
    },
    {
        q: "How to reduce home loan EMI?",
        a: "Ways to reduce EMI: 1) Choose a longer tenure, 2) Improve credit score for better rates, 3) Make a larger down payment, 4) Compare lenders for best rates, 5) Consider switching to floating rate, 6) Make partial prepayments, 7) Use our calculator to find the optimal loan structure.",
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
    name: "Home Loan EMI Calculator – Calculate Your Monthly Mortgage Payments",
    description: "Calculate your home loan EMI with our free calculator. Plan your home purchase, compare interest rates, and find the best loan tenure for your dream home.",
    url: "https://numrexo.com/finance/home-loan-emi-calculator",
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
        { "@type": "ListItem", position: 3, name: "Home Loan EMI Calculator", item: "https://numrexo.com/finance/home-loan-emi-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeLoanEMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [processingFee, setProcessingFee] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setProcessingFee("");
        setResult(null);
    };

    const calculateEMI = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);
        const fee = parseFloat(processingFee) || 0;

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
        const totalCostWithFee = totalPayment + fee;

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
        const emiToIncomeRatio = emi / (principal / 30); // Assuming 30% of income for EMI

        if (emiToIncomeRatio <= 0.2) {
            rating = "Very Affordable ★★★★★";
            ratingColor = "text-green-400";
        } else if (emiToIncomeRatio <= 0.3) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-400";
        } else if (emiToIncomeRatio <= 0.4) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-400";
        } else if (emiToIncomeRatio <= 0.5) {
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
            totalCostWithFee: totalCostWithFee,
            processingFee: fee,
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
            totalCostWithFeeFormatted: totalCostWithFee.toFixed(2),
        });
    };

    // Preset values
    const presetAmounts = [1000000, 2500000, 5000000, 7500000, 10000000];
    const presetRates = [7, 8, 9, 10, 11];
    const presetTenures = [60, 120, 180, 240, 300, 360];

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
                        <span itemProp="name" className="text-gray-300">Home Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Home Loan EMI Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Calculate your monthly mortgage payments</p>
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

                        {/* Processing Fee (Optional) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Processing Fee (₹) <span className="text-gray-500">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="100"
                                    placeholder="e.g., 25000"
                                    value={processingFee}
                                    onChange={(e) => setProcessingFee(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Processing fees typically range from 0.5% to 1% of loan amount</p>
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
                    emptyIcon="🏡"
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
                        { label: "Processing Fee", value: `₹${result.processingFee.toFixed(2)}`, valueColor: "text-purple-400" },
                        { label: "Total Cost with Fee", value: `₹${result.totalCostWithFeeFormatted}`, valueColor: "text-red-400" },
                        { label: "Principal Amount", value: `₹${result.principal.toFixed(2)}` },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months / 12).toFixed(0)} years)` },
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
                <h2 className="text-xl font-semibold text-white mb-3">About Home Loan EMI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Home Loan EMI Calculator</strong> is a powerful financial tool that helps you estimate your monthly mortgage payments accurately. Whether you're planning to buy your first home, upgrade to a bigger house, or invest in property, this calculator gives you a clear picture of your repayment obligations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the standard EMI formula to provide accurate results for home loans. It accounts for the loan amount, interest rate, tenure, and even processing fees to calculate your monthly payments. You can also see the total interest payable, total cost including fees, and a detailed amortization schedule.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your home loan EMI helps you budget better, plan your finances, and make informed decisions about your dream home. Use our calculator to compare different loan options and find the one that best fits your financial situation.
                </p>
            </section>

            {/* Types of Home Loans */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Types of Home Loans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🏠 Fixed Rate</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Interest rate remains constant</li>
                            <li>• Predictable monthly payments</li>
                            <li>• Higher rates than floating</li>
                            <li>• Best for long-term stability</li>
                            <li>• No rate change risk</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">📈 Floating Rate</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Rate changes with market</li>
                            <li>• Lower initial rates</li>
                            <li>• Potential for savings</li>
                            <li>• Most common in India</li>
                            <li>• Rate reset periodically</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🔒 Hybrid</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Fixed for initial period</li>
                            <li>• Then converts to floating</li>
                            <li>• Best of both worlds</li>
                            <li>• Initial payment certainty</li>
                            <li>• Long-term flexibility</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Home Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">loan amount</strong> you wish to borrow (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">annual interest rate</strong> offered by your lender.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">loan tenure</strong> in months (preset tenures available).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Optionally enter the <strong className="text-white">processing fee</strong> to see total cost.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate EMI"</strong> to see your monthly payment and full amortization schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Review the <strong className="text-white">affordability rating</strong> and use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Home Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your exact monthly payment before taking a home loan. Plan your monthly budget around your EMI obligations and avoid over-committing.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Lenders</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI offers from different banks and NBFCs. Find the best interest rate and tenure combination for your dream home.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Tenure Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find the ideal tenure that balances affordable EMI with total interest cost. Understand the trade-off between lower EMIs and higher total interest.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Financial Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan your long-term financial goals. Understand the impact of home loan EMI on your savings and investment capacity.</p>
                    </div>
                </div>
            </section>

            {/* Home Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Home Loan EMI Formula</h2>
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
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹50L, 20Y)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">8%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹41,823</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹50.37L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,00.37L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">9%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,986</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹57.97L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,07.97L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">10%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹48,251</td>
                                <td className="py-2 px-4 text-right text-red-400">₹65.80L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,15.80L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">11%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹51,609</td>
                                <td className="py-2 px-4 text-right text-red-400">₹73.86L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,23.86L</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Comparison shows impact of interest rate on EMI and total cost for a ₹50 lakh loan over 20 years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tenure Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Tenure</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹50L, 9%)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">10 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹63,341</td>
                                <td className="py-2 px-4 text-right text-green-400">₹26.01L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹76.01L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">15 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹50,710</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹41.28L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹91.28L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">20 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹44,986</td>
                                <td className="py-2 px-4 text-right text-red-400">₹57.97L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,07.97L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">25 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹41,964</td>
                                <td className="py-2 px-4 text-right text-red-400">₹75.89L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,25.89L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">30 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹40,230</td>
                                <td className="py-2 px-4 text-right text-red-400">₹94.83L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,44.83L</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Longer tenures reduce EMI but significantly increase total interest paid</p>
            </section>

            {/* Home Loan Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Home Loan Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✅ Salaried Individuals</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 21-60 years</li>
                            <li>• Minimum monthly income: ₹25,000</li>
                            <li>• Work experience: 2+ years</li>
                            <li>• CIBIL score: 700+ preferred</li>
                            <li>• Valid identity and address proof</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✅ Self-Employed</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 25-65 years</li>
                            <li>• ITR filing: 3+ years</li>
                            <li>• Business vintage: 5+ years</li>
                            <li>• Annual turnover: ₹10 lakhs+</li>
                            <li>• Profitability track record</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">* Eligibility criteria vary by lender. Always check with your bank for specific requirements.</p>
            </section>

            {/* Tips for Lower Home Loan EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Lower Home Loan EMI</h2>
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
                        <span><strong className="text-gray-300">Make Larger Down Payment:</strong> A higher down payment reduces the loan amount, lowering both EMI and total interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare Multiple Lenders:</strong> Different lenders offer different rates. Even a 0.5% difference can save lakhs in interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider Floating Rate:</strong> Floating rates are typically lower than fixed rates and can save you money over the long term.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Make Partial Prepayments:</strong> Use bonuses or savings to make partial prepayments, reducing your principal and future EMIs.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Taking a Home Loan</h2>
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
                        <span><strong className="text-gray-300">Choosing the Wrong Tenure:</strong> Choose a tenure that balances EMI affordability with total interest. Don't just go for the lowest EMI without considering total cost.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Checking Hidden Charges:</strong> Read your loan agreement carefully for prepayment penalties, late payment fees, and other charges.</span>
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