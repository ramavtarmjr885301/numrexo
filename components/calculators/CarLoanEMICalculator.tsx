"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a car loan EMI calculator?",
        a: "A car loan EMI calculator helps you estimate your monthly payments for your car purchase. It uses the standard EMI formula to calculate equal monthly installments based on the loan amount, interest rate, and tenure, helping you plan your car purchase budget effectively.",
    },
    {
        q: "How is car loan EMI calculated?",
        a: "Car loan EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). P is the loan amount, r is the monthly interest rate (annual rate/12), and n is the loan tenure in months. This formula ensures equal monthly payments throughout the loan tenure.",
    },
    {
        q: "What is the current car loan interest rate?",
        a: "Car loan interest rates in India typically range from 7.5% to 12% per annum, depending on the lender, loan amount, tenure, and your credit score. Top lenders like SBI, HDFC, and ICICI offer rates between 7.5-9.5% for new cars and 9-12% for used cars.",
    },
    {
        q: "What is the maximum tenure for a car loan?",
        a: "Car loan tenures typically range from 12 to 84 months (1-7 years). New car loans usually offer up to 7 years, while used car loans are typically limited to 3-5 years. Longer tenures mean lower EMIs but higher total interest payments.",
    },
    {
        q: "What is the difference between new car and used car loan rates?",
        a: "New car loans typically have lower interest rates (7.5-9.5%) compared to used car loans (9-12%). New cars also get longer tenures (up to 7 years) while used cars usually get 3-5 years. This is because new cars have higher resale value and lower risk for lenders.",
    },
    {
        q: "How does credit score affect car loan interest rate?",
        a: "A good credit score (750+) helps you get lower interest rates on car loans. For example, a 1% lower interest rate on a ₹10 lakh car loan for 5 years can save you approximately ₹500 per month in EMI and over ₹30,000 in total interest.",
    },
    {
        q: "What is the down payment required for a car loan?",
        a: "Typically, banks finance 80-90% of the car's on-road price. You need to pay 10-20% as down payment. For example, for a ₹10 lakh car, you may need to pay ₹1-2 lakh as down payment. Some lenders offer 100% financing with higher interest rates.",
    },
    {
        q: "What documents are required for a car loan?",
        a: "Common documents include: Identity proof (Aadhaar, PAN), Address proof, Income proof (salary slips, ITR, bank statements), Employment proof, Car invoice, and insurance documents. Salaried individuals need last 3 months' salary slips and 6 months' bank statements.",
    },
    {
        q: "Can I prepay my car loan?",
        a: "Yes, most lenders allow prepayment of car loans. However, prepayment charges may apply (typically 2-5% of the outstanding amount). Some lenders allow prepayment after 12-24 months without penalty. Always check your loan agreement for prepayment terms.",
    },
    {
        q: "What is the EMI for a ₹5 lakh car loan?",
        a: "For a ₹5 lakh car loan at 9% interest: 3 years EMI ₹15,900, total interest ₹72,400; 5 years EMI ₹10,378, total interest ₹1,22,680; 7 years EMI ₹8,035, total interest ₹1,75,940. Use our calculator to check EMIs for different loan amounts and tenures.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "Shorter tenure means higher EMI but lower total interest. Longer tenure means lower EMI but higher total interest. For a ₹10 lakh car loan at 9%: 3 years EMI ₹31,800 (total interest ₹1.45L); 5 years EMI ₹20,756 (total interest ₹2.45L). Choose based on your monthly budget.",
    },
    {
        q: "What is the difference between fixed and floating rates for car loans?",
        a: "Fixed rates remain constant throughout the loan tenure, offering predictability but usually higher rates. Floating rates change with market conditions, offering potentially lower rates but with uncertainty. Most car loans in India are fixed rate.",
    },
    {
        q: "What is the processing fee for car loans?",
        a: "Processing fees typically range from 0.5% to 1.5% of the loan amount plus GST. For a ₹10 lakh car loan, fees can be ₹5,000 to ₹15,000. Many lenders offer zero processing fees during promotional periods or for specific car models.",
    },
    {
        q: "Can I get a car loan with a low CIBIL score?",
        a: "While a low CIBIL score (below 650) makes approval difficult, some NBFCs and fintech lenders offer car loans at higher interest rates. You can also improve approval chances by making a larger down payment, adding a co-applicant, or providing collateral.",
    },
    {
        q: "How to reduce car loan EMI?",
        a: "Ways to reduce EMI: 1) Choose a longer tenure, 2) Improve credit score for better rates, 3) Make a larger down payment, 4) Compare lenders for best rates, 5) Consider balance transfer to a lower rate lender, 6) Use our calculator to find the optimal loan structure.",
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
    name: "Car Loan EMI Calculator – Calculate Your Monthly Car Payments",
    description: "Calculate your car loan EMI with our free calculator. Plan your car purchase, compare interest rates, and find the best loan tenure for your dream car.",
    url: "https://numrexo.com/finance/car-loan-emi-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Monthly EMI calculation",
        "Interest & principal breakdown",
        "Amortization schedule",
        "Total interest payment",
        "New & used car options",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Car Loan EMI Calculator", item: "https://numrexo.com/finance/car-loan-emi-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarLoanEMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [carType, setCarType] = useState("new");
    const [downPayment, setDownPayment] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setDownPayment("");
        setResult(null);
    };

    const calculateEMI = () => {
        let carPrice = parseFloat(loanAmount);
        const down = parseFloat(downPayment) || 0;
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);

        // If down payment is entered, subtract from car price
        let principal = carPrice;
        if (down > 0) {
            principal = carPrice - down;
        }

        if (isNaN(principal) || principal <= 0) {
            alert("Please enter a valid car price greater than zero");
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
        const downPaymentPercentage = (down / (carPrice)) * 100;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        const emiToCarRatio = emi / (principal / 60);

        if (emiToCarRatio <= 0.15) {
            rating = "Very Affordable ★★★★★";
            ratingColor = "text-green-400";
        } else if (emiToCarRatio <= 0.25) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-400";
        } else if (emiToCarRatio <= 0.35) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-400";
        } else if (emiToCarRatio <= 0.45) {
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
            carPrice: carPrice,
            downPayment: down,
            downPaymentPercentage: downPaymentPercentage,
            months: months,
            rate: rate,
            monthlyRate: monthlyRate,
            schedule: schedule,
            averageInterest: averageInterest,
            principalPercentage: principalPercentage,
            interestPercentage: interestPercentage,
            rating: rating,
            ratingColor: ratingColor,
            carType: carType,
            emiFormatted: emi.toFixed(2),
            totalPaymentFormatted: totalPayment.toFixed(2),
            totalInterestFormatted: totalInterest.toFixed(2),
        });
    };

    // Preset values
    const presetAmounts = [300000, 500000, 800000, 1000000, 1500000];
    const presetRates = [7, 8, 9, 10, 11];
    const presetTenures = [24, 36, 48, 60, 72];
    const presetDownPayments = [50000, 100000, 150000, 200000, 300000];

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
                        <span itemProp="name" className="text-gray-300">Car Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Car Loan EMI Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Calculate your monthly car loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Car Type */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Car Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        setCarType("new");
                                        setInterestRate("");
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${carType === "new"
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    🚗 New Car
                                </button>
                                <button
                                    onClick={() => {
                                        setCarType("used");
                                        setInterestRate("");
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${carType === "used"
                                        ? "bg-orange-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    🚘 Used Car
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {carType === "new" ? "Interest rates: 7.5-9.5% | Tenure: Up to 7 years" : "Interest rates: 9-12% | Tenure: Up to 5 years"}
                            </p>
                        </div>

                        {/* Car Price */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Car Price (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="10000"
                                    placeholder="e.g., 800000"
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
                                        {amount >= 1000000 ? `₹${amount/1000000}L` : `₹${amount/1000}K`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Down Payment */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Down Payment (₹) <span className="text-gray-500">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="10000"
                                    placeholder="e.g., 100000"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetDownPayments.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setDownPayment(amount.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        ₹{amount/1000}K
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Typical down payment: 10-20% of car price</p>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={carType === "new" ? "e.g., 9" : "e.g., 10.5"}
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
                                    placeholder="e.g., 60"
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
                                        {month >= 60 ? `${month/12}Y` : `${month}M`}
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
                    emptyIcon="🚗"
                    emptyText="Enter car details and press Calculate"
                    mainResult={result ? {
                        label: "Monthly EMI",
                        value: `₹${result.emiFormatted}`,
                        color: "text-blue-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Affordability Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: `₹${result.totalPaymentFormatted}`, valueColor: "text-yellow-400" },
                        { label: "Total Interest", value: `₹${result.totalInterestFormatted}`, valueColor: "text-orange-400" },
                        { label: "Car Price", value: `₹${result.carPrice.toFixed(2)}` },
                        { label: "Down Payment", value: `₹${result.downPayment.toFixed(2)} (${result.downPaymentPercentage.toFixed(1)}%)`, valueColor: "text-purple-400" },
                        { label: "Loan Amount", value: `₹${result.principal.toFixed(2)}` },
                        { label: "Car Type", value: result.carType === "new" ? "New Car 🚗" : "Used Car 🚘" },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months/12).toFixed(0)} years)` },
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
                <h2 className="text-xl font-semibold text-white mb-3">About Car Loan EMI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Car Loan EMI Calculator</strong> helps you estimate your monthly payments for your car purchase accurately. Whether you're buying a new car or a used car, this calculator gives you a clear picture of your repayment obligations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the standard EMI formula to provide accurate results for car loans. It accounts for the car price, down payment, interest rate, and tenure to calculate your monthly payments. You can also see the total interest payable, and a detailed amortization schedule.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your car loan EMI helps you budget better, plan your finances, and choose the right car within your budget. Use our calculator to compare different loan options and find the one that best fits your financial situation.
                </p>
            </section>

            {/* New vs Used Car Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">New vs Used Car Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🚗 New Car</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Interest Rate: 7.5-9.5% p.a.</li>
                            <li>• Tenure: Up to 7 years (84 months)</li>
                            <li>• Down Payment: 10-20%</li>
                            <li>• LTV: Up to 90%</li>
                            <li>• Lower interest rates</li>
                            <li>• Longer repayment period</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">🚘 Used Car</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Interest Rate: 9-12% p.a.</li>
                            <li>• Tenure: Up to 5 years (60 months)</li>
                            <li>• Down Payment: 20-30%</li>
                            <li>• LTV: Up to 80%</li>
                            <li>• Higher interest rates</li>
                            <li>• Shorter repayment period</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">* New cars generally get better loan terms due to higher resale value and lower risk</p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Car Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">car type</strong> - New Car or Used Car.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">car price</strong> (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Optionally enter the <strong className="text-white">down payment</strong> amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter the <strong className="text-white">interest rate</strong> offered by your lender.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Select the <strong className="text-white">loan tenure</strong> in months.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">"Calculate EMI"</strong> to see your monthly payment and amortization schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 7:</strong> Review the <strong className="text-white">affordability rating</strong> and use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Car Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your exact monthly payment before buying a car. Plan your monthly budget around your EMI obligations and avoid over-committing.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Lenders</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI offers from different banks and NBFCs. Find the best interest rate and tenure combination for your dream car.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Down Payment Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand how different down payment amounts affect your EMI and total interest. Find the optimal down payment for your budget.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ New vs Used Decision</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI for new and used cars. Understand the cost difference and make an informed decision based on your budget.</p>
                    </div>
                </div>
            </section>

            {/* Car Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Car Loan EMI Formula</h2>
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
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹8L, 5Y)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">7%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹15,843</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹1.51L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹9.51L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">8%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,212</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹1.73L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹9.73L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">9%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,605</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1.96L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹9.96L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">10%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,999</td>
                                <td className="py-2 px-4 text-right text-red-400">₹2.20L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹10.20L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">11%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹17,394</td>
                                <td className="py-2 px-4 text-right text-red-400">₹2.44L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹10.44L</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Comparison shows impact of interest rate on EMI and total cost for an ₹8 lakh car loan over 5 years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tenure Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Tenure</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹8L, 9%)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">3 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹25,440</td>
                                <td className="py-2 px-4 text-right text-green-400">₹1.16L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹9.16L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">4 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹19,893</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹1.55L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹9.55L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">5 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹16,605</td>
                                <td className="py-2 px-4 text-right text-red-400">₹1.96L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹9.96L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">6 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹14,418</td>
                                <td className="py-2 px-4 text-right text-red-400">₹2.38L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹10.38L</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">7 Years</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹12,857</td>
                                <td className="py-2 px-4 text-right text-red-400">₹2.80L</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹10.80L</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Longer tenures reduce EMI but significantly increase total interest paid</p>
            </section>

            {/* Car Loan Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Car Loan Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✅ Salaried Individuals</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 21-60 years</li>
                            <li>• Minimum monthly income: ₹25,000</li>
                            <li>• Work experience: 1+ years</li>
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

            {/* Tips for Lower Car Loan EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Lower Car Loan EMI</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Make a Larger Down Payment:</strong> A higher down payment reduces the loan amount, lowering both EMI and total interest. Aim for 20% or more.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Improve Credit Score:</strong> A higher credit score (750+) qualifies you for lower interest rates. Check your score regularly and correct any errors.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose New Car Over Used:</strong> New cars get lower interest rates (7.5-9.5%) compared to used cars (9-12%). This can save you thousands in interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare Multiple Lenders:</strong> Different lenders offer different rates. Even a 0.5% difference can save you ₹20,000+ over the loan tenure.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Optimal Tenure:</strong> Choose a tenure that balances EMI affordability with total interest. Don't go for the longest tenure just for lower EMI.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Negotiate Processing Fees:</strong> Many lenders offer zero or discounted processing fees. Don't hesitate to negotiate or ask for a waiver.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Taking a Car Loan</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring On-Road Price:</strong> Always calculate EMI based on the on-road price (ex-showroom + RTO + insurance), not just the ex-showroom price.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Factoring in Insurance:</strong> Car insurance is mandatory and adds to your monthly cost. Factor it into your budget.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Choosing Longest Tenure:</strong> While it reduces EMI, it significantly increases total interest. Only choose long tenure if you absolutely need lower EMI.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Missing Processing Fees:</strong> Processing fees add to your loan cost. Always factor them into your total loan cost while comparing lenders.</span>
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