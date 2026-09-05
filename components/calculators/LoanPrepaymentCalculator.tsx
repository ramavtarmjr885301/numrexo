"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a loan prepayment calculator?",
        a: "A loan prepayment calculator helps you understand how making extra payments or prepaying your loan can save you money on interest and reduce your loan tenure. It shows you the impact of lump sum payments or increased EMIs on your total interest and repayment period.",
    },
    {
        q: "What is loan prepayment?",
        a: "Loan prepayment is when you pay off a portion or all of your outstanding loan before the scheduled due date. This reduces your principal balance, which in turn reduces the total interest you pay over the life of the loan. It can be done as a lump sum payment or by increasing your monthly EMI.",
    },
    {
        q: "How does prepayment save money?",
        a: "Prepayment saves money by reducing the principal amount on which interest is calculated. Since interest is charged on the outstanding balance, paying early reduces both the principal and the total interest. Even small prepayments early in the loan tenure can save significant interest.",
    },
    {
        q: "What is the difference between prepayment and part payment?",
        a: "Prepayment refers to paying off the entire loan before the due date, while part payment (or partial prepayment) means paying a portion of the outstanding principal. Both reduce your total interest, but part payment allows you to keep the loan active while reducing your EMI or tenure.",
    },
    {
        q: "Does prepayment always save money?",
        a: "Prepayment usually saves money, but consider prepayment penalties. Some lenders charge 2-5% of the prepaid amount. Compare the penalty with the interest saved. For floating rate loans, prepayment penalties are often waived. Use our calculator to compare both scenarios.",
    },
    {
        q: "What is the best time to prepay a loan?",
        a: "The best time to prepay is in the early years of the loan when the interest component is highest. In the first 5 years of a home loan, over 60% of your EMI goes toward interest. Prepaying during this period saves the most interest.",
    },
    {
        q: "Should I reduce EMI or reduce tenure after prepayment?",
        a: "Reducing the tenure saves more interest because you're reducing the total number of payments. Reducing EMI gives you more monthly cash flow but saves less interest. Use our calculator to compare both options and choose based on your financial goals.",
    },
    {
        q: "What are prepayment charges or penalties?",
        a: "Prepayment charges are fees lenders charge for early repayment. For fixed-rate loans, charges are typically 2-5% of the prepaid amount. For floating-rate loans, many lenders waive these charges. Some loans have a lock-in period (e.g., 1-3 years) during which prepayment is not allowed.",
    },
    {
        q: "Can I prepay my home loan?",
        a: "Yes, most home loans allow prepayment. For floating rate home loans, there's usually no prepayment penalty. For fixed rate loans, a penalty of 2-3% may apply. You can prepay partially or fully at any time, subject to your lender's terms.",
    },
    {
        q: "How does prepayment affect my credit score?",
        a: "Prepayment generally doesn't negatively affect your credit score. Closing a loan early shows responsible credit management. However, closing your oldest credit account might slightly reduce your credit history length, but the impact is usually minimal.",
    },
    {
        q: "Is it better to prepay or invest extra money?",
        a: "Compare your loan interest rate with expected investment returns. If your loan rate is higher than your expected returns (e.g., loan at 9%, investments at 7%), prepayment is better. If you expect higher returns (e.g., 12%), investing might be better. Consider your risk tolerance and financial goals.",
    },
    {
        q: "What is the formula for calculating prepayment savings?",
        a: "The calculation involves comparing two scenarios: 1) Regular payments without prepayment, and 2) Payments with extra amount. Interest saved = Total interest without prepayment - Total interest with prepayment. Tenure reduction = Original tenure - New tenure after prepayment.",
    },
    {
        q: "How much can I save by prepaying?",
        a: "Savings depend on prepayment amount, timing, loan rate, and tenure. For a ₹50 lakh loan at 9% for 20 years, a ₹5 lakh prepayment in year 1 can save ₹7-8 lakh in interest and reduce tenure by 2-3 years. Use our calculator to see your specific savings.",
    },
    {
        q: "What is the lock-in period for loans?",
        a: "A lock-in period is the minimum time you must keep the loan active before making prepayments. Typically 1-3 years for home loans. During this period, prepayment may not be allowed or may attract higher penalties. Check your loan agreement for lock-in terms.",
    },
    {
        q: "Should I use savings to prepay my loan?",
        a: "Use savings to prepay only if you have an emergency fund (3-6 months of expenses) saved. Never use your entire savings for prepayment. Balance prepayment with maintaining liquidity for emergencies and other financial goals.",
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
    name: "Loan Prepayment Calculator – Calculate Your Interest Savings",
    description: "Calculate how much you can save by prepaying your loan. See the impact of extra payments on your total interest and loan tenure.",
    url: "https://numrexo.com/finance/loan-prepayment-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Prepayment savings calculation",
        "Tenure reduction analysis",
        "Interest savings breakdown",
        "EMI vs Tenure comparison",
        "Prepayment penalty analysis",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Loan Prepayment Calculator", item: "https://numrexo.com/finance/loan-prepayment-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoanPrepaymentCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [prepaymentAmount, setPrepaymentAmount] = useState("");
    const [prepaymentMonth, setPrepaymentMonth] = useState("");
    const [prepaymentPenalty, setPrepaymentPenalty] = useState("");
    const [prepaymentOption, setPrepaymentOption] = useState<"reduce-tenure" | "reduce-emi">("reduce-tenure");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setPrepaymentAmount("");
        setPrepaymentMonth("");
        setPrepaymentPenalty("");
        setResult(null);
    };

    const calculatePrepayment = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);
        const prepay = parseFloat(prepaymentAmount);
        const prepayMonth = parseFloat(prepaymentMonth);
        const penaltyRate = parseFloat(prepaymentPenalty) || 0;

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

        if (isNaN(prepay) || prepay <= 0) {
            alert("Please enter a valid prepayment amount greater than zero");
            return;
        }

        if (isNaN(prepayMonth) || prepayMonth <= 0 || prepayMonth > months) {
            alert(`Please enter a valid prepayment month (1 to ${months})`);
            return;
        }

        const monthlyRate = rate / 100 / 12;

        // Calculate original EMI
        let originalEmi = 0;
        if (monthlyRate === 0) {
            originalEmi = principal / months;
        } else {
            originalEmi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        // Calculate original total payment
        const originalTotalPayment = originalEmi * months;
        const originalTotalInterest = originalTotalPayment - principal;

        // Calculate outstanding balance at prepayment month
        let balance = principal;
        for (let i = 1; i < prepayMonth; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = originalEmi - interestPayment;
            balance = balance - principalPayment;
        }

        // Apply prepayment
        const newPrincipal = balance - prepay;
        const remainingMonths = months - prepayMonth + 1;

        // Calculate prepayment penalty
        const penaltyAmount = prepay * (penaltyRate / 100);

        // Calculate new EMI (after prepayment)
        let newEmi = 0;
        if (monthlyRate === 0) {
            newEmi = newPrincipal / remainingMonths;
        } else {
            newEmi = newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths) / (Math.pow(1 + monthlyRate, remainingMonths) - 1);
        }

        // Calculate new total payment with different options
        let newTotalPayment, newTotalInterest, newTenure;

        if (prepaymentOption === "reduce-tenure") {
            // Keep EMI same, reduce tenure
            if (monthlyRate === 0) {
                newTenure = newPrincipal / originalEmi;
            } else {
                newTenure = Math.log(originalEmi / (originalEmi - newPrincipal * monthlyRate)) / Math.log(1 + monthlyRate);
            }
            newTenure = Math.ceil(newTenure);
            const totalPaymentsMade = prepayMonth - 1 + newTenure;
            newTotalPayment = originalEmi * (prepayMonth - 1) + originalEmi * newTenure + penaltyAmount;
            newTotalInterest = newTotalPayment - principal;
        } else {
            // Reduce EMI, keep tenure same
            newTotalPayment = originalEmi * (prepayMonth - 1) + newEmi * remainingMonths + penaltyAmount;
            newTotalInterest = newTotalPayment - principal;
            newTenure = remainingMonths;
        }

        // Calculate savings
        const interestSaved = originalTotalInterest - newTotalInterest;
        const tenureReduction = months - (prepayMonth - 1 + newTenure);
        const monthlySaving = originalEmi - newEmi;

        // Calculate break-even point (months to recover penalty)
        const breakEvenMonths = penaltyRate > 0 ? Math.ceil(penaltyAmount / (monthlySaving || 1)) : 0;

        setResult({
            originalEmi: originalEmi,
            originalTotalInterest: originalTotalInterest,
            originalTotalPayment: originalTotalPayment,
            newEmi: newEmi,
            newTotalInterest: newTotalInterest,
            newTotalPayment: newTotalPayment,
            newTenure: newTenure,
            interestSaved: interestSaved,
            tenureReduction: tenureReduction,
            monthlySaving: monthlySaving,
            balanceAtPrepayment: balance,
            principalAfterPrepayment: newPrincipal,
            penaltyAmount: penaltyAmount,
            breakEvenMonths: breakEvenMonths,
            prepayMonth: prepayMonth,
            prepaymentOption: prepaymentOption,
            remainingMonths: remainingMonths,
            totalMonthsSaved: prepayMonth - 1 + newTenure,
            originalEmiFormatted: originalEmi.toFixed(2),
            newEmiFormatted: newEmi.toFixed(2),
            originalTotalInterestFormatted: originalTotalInterest.toFixed(2),
            newTotalInterestFormatted: newTotalInterest.toFixed(2),
            interestSavedFormatted: interestSaved.toFixed(2),
            penaltyAmountFormatted: penaltyAmount.toFixed(2),
            originalTotalPaymentFormatted: originalTotalPayment.toFixed(2),
            newTotalPaymentFormatted: newTotalPayment.toFixed(2),
        });
    };

    // Preset values
    const presetAmounts = [1000000, 2500000, 5000000, 7500000, 10000000];
    const presetRates = [7, 8, 9, 10, 11];
    const presetTenures = [60, 120, 180, 240, 300, 360];
    const presetPrepayments = [50000, 100000, 250000, 500000, 1000000];
    const presetPrepayMonths = [12, 24, 36, 48, 60];

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
                        <span itemProp="name" className="text-gray-300">Loan Prepayment Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Loan Prepayment Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">See how prepayment saves you money</p>
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

                        {/* Prepayment Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Prepayment Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="10000"
                                    placeholder="e.g., 500000"
                                    value={prepaymentAmount}
                                    onChange={(e) => setPrepaymentAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetPrepayments.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setPrepaymentAmount(amount.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        {amount >= 1000000 ? `₹${amount / 1000000}L` : `₹${amount / 1000}K`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Prepayment Month */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Prepayment Month</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="e.g., 24"
                                    value={prepaymentMonth}
                                    onChange={(e) => setPrepaymentMonth(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">month</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetPrepayMonths.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => setPrepaymentMonth(month.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        {month}M
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Early prepayment saves more interest</p>
                        </div>

                        {/* Prepayment Penalty */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Prepayment Penalty (%) <span className="text-gray-500">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="e.g., 2"
                                    value={prepaymentPenalty}
                                    onChange={(e) => setPrepaymentPenalty(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Most floating rate loans have 0% penalty</p>
                        </div>

                        {/* Prepayment Option */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">After Prepayment, I Want To</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setPrepaymentOption("reduce-tenure")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${prepaymentOption === "reduce-tenure"
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    ⏱️ Reduce Tenure
                                </button>
                                <button
                                    onClick={() => setPrepaymentOption("reduce-emi")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${prepaymentOption === "reduce-emi"
                                        ? "bg-green-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    💰 Reduce EMI
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {prepaymentOption === "reduce-tenure"
                                    ? "Keep same EMI, pay off loan faster"
                                    : "Keep same tenure, reduce monthly payment"}
                            </p>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={calculatePrepayment}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Calculate Savings →
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
                    title="Prepayment Savings"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter loan details and press Calculate Savings"
                    mainResult={result ? {
                        label: "Total Interest Saved",
                        value: `₹${result.interestSavedFormatted}`,
                        color: "text-green-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Tenure Reduced", value: `${result.tenureReduction} months`, valueColor: result.tenureReduction > 0 ? "text-green-400" : "text-gray-400" },
                        { label: "Original EMI", value: `₹${result.originalEmiFormatted}` },
                        { label: "New EMI", value: `₹${result.newEmiFormatted}`, valueColor: result.prepaymentOption === "reduce-emi" ? "text-green-400" : "text-gray-400" },
                        { label: "Monthly Savings", value: `₹${result.monthlySaving.toFixed(2)}`, valueColor: result.monthlySaving > 0 ? "text-green-400" : "text-gray-400" },
                        { label: "Original Total Interest", value: `₹${result.originalTotalInterestFormatted}`, valueColor: "text-orange-400" },
                        { label: "New Total Interest", value: `₹${result.newTotalInterestFormatted}`, valueColor: "text-green-400" },
                        { label: "Original Total Payment", value: `₹${result.originalTotalPaymentFormatted}` },
                        { label: "New Total Payment", value: `₹${result.newTotalPaymentFormatted}`, valueColor: "text-yellow-400" },
                        { label: "Prepayment Penalty", value: `₹${result.penaltyAmountFormatted}`, valueColor: "text-red-400" },
                        { label: "Balance at Prepayment", value: `₹${result.balanceAtPrepayment.toFixed(2)}` },
                        { label: "Principal After Prepayment", value: `₹${result.principalAfterPrepayment.toFixed(2)}` },
                        { label: "New Tenure", value: `${result.newTenure} months (${(result.newTenure / 12).toFixed(1)} years)` },
                        ...(result.penaltyAmount > 0 ? [
                            { label: "Break-even Period", value: `${result.breakEvenMonths} months`, valueColor: "text-yellow-400" },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* Comparison Summary */}
            {result && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Prepayment Impact Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                            <h4 className="text-xs text-gray-500 mb-1">Without Prepayment</h4>
                            <p className="text-xl font-bold text-orange-400">₹{result.originalTotalInterestFormatted}</p>
                            <p className="text-xs text-gray-500 mt-1">Total Interest</p>
                            <p className="text-xs text-gray-500">{result.originalEmiFormatted} × {tenure} months</p>
                        </div>
                        <div className="bg-[#111827] border border-green-500/30 rounded-xl p-4 text-center">
                            <h4 className="text-xs text-gray-500 mb-1">With Prepayment</h4>
                            <p className="text-xl font-bold text-green-400">₹{result.newTotalInterestFormatted}</p>
                            <p className="text-xs text-gray-500 mt-1">Total Interest</p>
                            <p className="text-xs text-gray-500">₹{result.newEmiFormatted} × {result.newTenure} months</p>
                        </div>
                        <div className="bg-[#111827] border border-yellow-500/30 rounded-xl p-4 text-center">
                            <h4 className="text-xs text-gray-500 mb-1">You Save</h4>
                            <p className="text-xl font-bold text-yellow-400">₹{result.interestSavedFormatted}</p>
                            <p className="text-xs text-gray-500 mt-1">Total Savings</p>
                            <p className="text-xs text-green-400">⏱️ {result.tenureReduction} months saved</p>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Loan Prepayment Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Loan Prepayment Calculator</strong> helps you understand how making extra payments can save you money on interest and reduce your loan tenure. Whether you're planning a lump sum payment or want to increase your monthly EMI, this calculator shows you the financial impact.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator compares two scenarios: your current loan repayment plan and the plan with prepayment. You can see the interest saved, tenure reduced, and the impact of prepayment penalties. Choose between reducing your tenure or reducing your EMI after prepayment.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Making informed prepayment decisions can save you lakhs of rupees in interest. Use our calculator to find the optimal prepayment strategy for your financial goals.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Loan Prepayment Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">loan amount</strong>, <strong className="text-white">interest rate</strong>, and <strong className="text-white">tenure</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">prepayment amount</strong> you plan to make.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select the <strong className="text-white">prepayment month</strong> (when you'll make the extra payment).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Optionally enter the <strong className="text-white">prepayment penalty</strong> percentage.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Choose whether you want to <strong className="text-white">reduce tenure</strong> or <strong className="text-white">reduce EMI</strong> after prepayment.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">"Calculate Savings"</strong> to see your results.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Loan Prepayment Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ See Your Savings</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See exactly how much money you'll save in interest by making prepayments. Compare your current loan with the prepayment scenario.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Options</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare reducing tenure versus reducing EMI. Choose the option that best fits your financial goals and monthly budget.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Penalty Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See if prepayment is still beneficial after considering penalties. Find your break-even point and make informed decisions.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Optimal Timing</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand the best time to prepay. Early prepayments save the most interest because interest is calculated on the outstanding balance.</p>
                    </div>
                </div>
            </section>

            {/* Prepayment Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">How Prepayment Works</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        When you prepay, you're reducing the outstanding principal. Since interest is calculated on the remaining balance, your total interest reduces. Here's how it works:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0f1525] border border-gray-700 rounded-lg p-3">
                            <p className="text-xs text-gray-500">Without Prepayment</p>
                            <p className="text-sm text-white mt-1">Principal: ₹50,00,000</p>
                            <p className="text-sm text-white">Rate: 9% p.a.</p>
                            <p className="text-sm text-white">Tenure: 20 years</p>
                            <p className="text-sm text-orange-400 mt-1">Total Interest: ₹57,97,000</p>
                        </div>
                        <div className="bg-[#0f1525] border border-green-500/30 rounded-lg p-3">
                            <p className="text-xs text-gray-500">With Prepayment (₹5L at month 24)</p>
                            <p className="text-sm text-white mt-1">Principal Reduced by: ₹5,00,000</p>
                            <p className="text-sm text-white">New Balance: ₹45,00,000</p>
                            <p className="text-sm text-green-400 mt-1">Interest Saved: ₹7,50,000</p>
                            <p className="text-sm text-green-400">Tenure Reduced: 3 years</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prepayment Comparison Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Prepayment Impact Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Prepayment Amount</th>
                                <th className="text-right py-3 px-4 text-gray-400">Interest Saved</th>
                                <th className="text-right py-3 px-4 text-gray-400">Tenure Reduced</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly Savings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹1,00,000</td>
                                <td className="py-2 px-4 text-right text-green-400">₹1.5L</td>
                                <td className="py-2 px-4 text-right text-gray-300">6 months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹2,50,000</td>
                                <td className="py-2 px-4 text-right text-green-400">₹3.8L</td>
                                <td className="py-2 px-4 text-right text-gray-300">14 months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹5,00,000</td>
                                <td className="py-2 px-4 text-right text-green-400">₹7.5L</td>
                                <td className="py-2 px-4 text-right text-gray-300">28 months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹10,00,000</td>
                                <td className="py-2 px-4 text-right text-green-400">₹14.2L</td>
                                <td className="py-2 px-4 text-right text-gray-300">52 months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Based on ₹50 lakh loan at 9% for 20 years with prepayment at month 24</p>
            </section>

            {/* Tips for Prepayment */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Tips for Loan Prepayment</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Prepay Early:</strong> The earlier you prepay, the more interest you save. In the first few years, most of your EMI goes toward interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check Penalty Terms:</strong> Always check your loan agreement for prepayment penalties. Floating rate loans usually have no penalty.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare Prepayment vs Investment:</strong> If your loan rate is high, prepayment is better. If investments can give higher returns, consider investing.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Maintain Emergency Fund:</strong> Don't use all your savings for prepayment. Always keep 3-6 months of expenses in an emergency fund.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Between Tenure and EMI:</strong> Reduce tenure to save more interest. Reduce EMI for better monthly cash flow. Choose based on your goal.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Prepaying</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Considering Penalty:</strong> Prepayment penalties can offset your savings. Always factor them into your decision.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Prepaying Too Late:</strong> Prepaying in the last few years saves less interest. Focus on early prepayments for maximum benefit.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Using All Savings:</strong> Don't drain your emergency fund. Prepay only surplus funds after keeping a safety net.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Comparing Options:</strong> Use our calculator to compare reduce tenure vs reduce EMI. Choose what works best for you.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring Tax Benefits:</strong> Home loans have tax benefits on interest paid. Consider the tax impact before prepaying.</span>
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