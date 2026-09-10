"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a bike loan EMI calculator?",
        a: "It works out the monthly instalment on a two-wheeler loan before you sign anything at the showroom. Two-wheeler finance is a different market from car finance: the amounts are small (usually ₹50,000 to ₹1.5 lakh), most of the lending is done by NBFCs rather than banks, and the paperwork is often filled in at the dealership in under an hour. That speed is convenient, and it is also why people agree to a tenure and a rate they have not checked. Working out the EMI yourself first is the whole point.",
    },
    {
        q: "How is bike loan EMI calculated?",
        a: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the amount financed, r is the monthly rate (annual ÷ 12) and n is the number of months. On a small loan the percentage matters less than you would think in rupee terms: on ₹80,000 over 3 years, the difference between 11% and 12% is about ₹38 a month. What actually moves the number is how much you finance and for how long.",
    },
    {
        q: "What interest rate should I expect on a bike loan?",
        a: "Two-wheeler rates are typically higher than car rates because the ticket size is small and the asset depreciates fast. New bikes commonly fall in the 8-16% range and used bikes higher again, with NBFCs at the upper end and banks at the lower end if you already bank with them. Rates change often and vary by model, so treat any figure you read online as a starting point and ask two lenders for a written quote before you decide.",
    },
    {
        q: "How long should a bike loan run?",
        a: "Lenders offer 12 to 48 months. Just because 48 is offered does not mean it is sensible. On ₹80,000 at 11%, a 1-year loan costs ₹7,071 a month and ₹4,846 in interest; stretching to 4 years drops the EMI to ₹2,068 but the interest nearly quadruples to ₹19,247 — on a bike that will be worth a fraction of its price by then. Two years is the usual sweet spot for a commuter bike.",
    },
    {
        q: "How much down payment should I make?",
        a: "Lenders finance 80-90% of the on-road price, and dealerships push low or zero down payment hard because it makes the bike look affordable. It is the single most effective lever you have. On a ₹1,00,000 on-road bike at 12% over 3 years: pay nothing down and the EMI is ₹3,321 with ₹19,572 in interest; put ₹20,000 down and it is ₹2,657 with ₹15,657. Every rupee you pay upfront is a rupee you never pay interest on.",
    },
    {
        q: "What does the on-road price include, and what gets financed?",
        a: "Ex-showroom price is only the start. On-road adds RTO registration, road tax, and the first year of insurance, and dealerships routinely add accessories, extended warranty and a handling charge on top. All of it can be rolled into the loan, which is how a ₹85,000 bike becomes a ₹1,10,000 loan. Ask for the on-road breakup in writing, decide what you actually want, and enter only that amount here.",
    },
    {
        q: "Can I get a loan on a used bike?",
        a: "It is harder than for a used car. Many lenders will not finance two-wheelers older than 3-5 years at all, tenures are capped at 2-3 years, and rates run several points higher. You will also need the seller's RC with hypothecation already cleared, a valid insurance transfer and, in most states, an NOC if the bike is registered elsewhere. For older or cheaper bikes, a small personal loan is often the cheaper route.",
    },
    {
        q: "What documents do I need?",
        a: "Less than for a car loan. Identity and address proof (Aadhaar and PAN), a photograph, and proof that money comes in — three months of salary slips for a salaried applicant, or six months of bank statements for anyone self-employed. Many NBFCs approve small two-wheeler loans on Aadhaar and a bank statement alone. Keep the dealer's proforma invoice handy, since the loan is sanctioned against it.",
    },
    {
        q: "What happens if I want to close the loan early?",
        a: "Most lenders allow foreclosure after 6-12 EMIs, usually with a charge of 2-5% on the outstanding amount, and some add GST on that charge. On a small loan the charge can eat most of the interest you were trying to save, so check the figure before you pay off early — ask for a foreclosure statement, which the lender must give you, and compare it against the interest you would otherwise pay.",
    },
    {
        q: "What is the EMI on a ₹80,000 bike loan?",
        a: "At 11%: 1 year is ₹7,071 a month with ₹4,846 total interest; 2 years is ₹3,729 with ₹9,487; 3 years is ₹2,619 with ₹14,288. At 14% the same loan over 3 years costs ₹2,734 a month and ₹18,432 in interest. Change the figures above to match the quote you were actually given rather than relying on any of these.",
    },
    {
        q: "Why does the same bike cost more when I pay monthly?",
        a: "Because you are buying money as well as a bike. A ₹1,20,000 loan at 11% over 4 years hands the lender ₹28,870 — roughly a quarter of the bike's price again — for the convenience of paying later. That is not an argument against financing; it is an argument for knowing the number. The total interest line in the result above is the price of the loan itself.",
    },
    {
        q: "Should I take the insurance the dealer offers?",
        a: "The first year of insurance is usually bundled into the on-road price, and lenders are happy to finance it because it protects their asset. You are free to buy comprehensive cover elsewhere and often for less, but do it before delivery, not after — the bike cannot be registered or released without valid cover. From year two onward, renewing directly is almost always cheaper than whatever the dealer quotes.",
    },
    {
        q: "How much is the processing fee?",
        a: "Usually 0.5-2% of the loan, plus GST, and often with a floor of ₹500-₹1,500. On a small two-wheeler loan a flat floor hurts disproportionately: ₹1,500 on a ₹60,000 loan is 2.5% before a single rupee of interest. Ask whether the fee is deducted from the disbursal or added to the loan — if it is added, you pay interest on the fee for the whole tenure.",
    },
    {
        q: "Can I get a bike loan with a low or no credit score?",
        a: "A two-wheeler loan is often a person's first credit product, so lenders are used to thin files and will look at income stability and address history instead. With a score below 650 expect a higher rate, a larger down payment, or a request for a co-applicant. If you do take it, treat it as a score-building exercise: 24 EMIs paid on time will do more for your credit record than anything else at that stage.",
    },
    {
        q: "What actually reduces the EMI?",
        a: "In order of how much they move the number: a bigger down payment, a shorter list of dealer add-ons, and a better rate — usually from the bank you already hold a salary account with. Extending the tenure also reduces the EMI, and it is the option dealerships suggest first, but it raises what you pay overall. Run both versions in the calculator above and compare the total interest, not just the monthly figure.",
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
    name: "Bike Loan EMI Calculator – Calculate Your Monthly Two-Wheeler Payments",
    description: "Calculate your bike loan EMI with our free calculator. Plan your two-wheeler purchase, compare interest rates, and find the best loan tenure for your dream bike.",
    url: "https://numrexo.com/finance/bike-loan-emi-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Monthly EMI calculation",
        "Interest & principal breakdown",
        "Amortization schedule",
        "Total interest payment",
        "New & used bike options",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Bike Loan EMI Calculator", item: "https://numrexo.com/finance/bike-loan-emi-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BikeLoanEMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [bikeType, setBikeType] = useState("new");
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
        let bikePrice = parseFloat(loanAmount);
        const down = parseFloat(downPayment) || 0;
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);

        // If down payment is entered, subtract from bike price
        let principal = bikePrice;
        if (down > 0) {
            principal = bikePrice - down;
        }

        if (isNaN(principal) || principal <= 0) {
            setResult(null);
            return;
        }

        if (isNaN(rate) || rate < 0) {
            setResult(null);
            return;
        }

        if (isNaN(months) || months <= 0) {
            setResult(null);
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
        for (let i = 1; i <= Math.min(months, 48); i++) {
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
        const downPaymentPercentage = (down / (bikePrice)) * 100;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        const emiToBikeRatio = emi / (principal / 48);

        if (emiToBikeRatio <= 0.15) {
            rating = "Very Affordable ★★★★★";
            ratingColor = "text-green-400";
        } else if (emiToBikeRatio <= 0.25) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-400";
        } else if (emiToBikeRatio <= 0.35) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-400";
        } else if (emiToBikeRatio <= 0.45) {
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
            bikePrice: bikePrice,
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
            bikeType: bikeType,
            emiFormatted: emi.toFixed(2),
            totalPaymentFormatted: totalPayment.toFixed(2),
            totalInterestFormatted: totalInterest.toFixed(2),
        });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateEMI(); }, [loanAmount, interestRate, tenure, bikeType, downPayment]);

    // Preset values
    const presetAmounts = [50000, 80000, 100000, 150000, 200000];
    const presetRates = [8, 9, 10, 11, 12, 14];
    const presetTenures = [12, 18, 24, 36, 48];
    const presetDownPayments = [10000, 15000, 20000, 30000, 50000];

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
                        <span itemProp="name" className="text-gray-300">Bike Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Bike Loan EMI Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Calculate your monthly bike loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Bike Type */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Bike Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        setBikeType("new");
                                        setInterestRate("");
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${bikeType === "new"
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    🏍️ New Bike
                                </button>
                                <button
                                    onClick={() => {
                                        setBikeType("used");
                                        setInterestRate("");
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${bikeType === "used"
                                        ? "bg-orange-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    🛵 Used Bike
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {bikeType === "new" ? "Interest rates: 8-12% | Tenure: Up to 4 years" : "Interest rates: 10-16% | Tenure: Up to 3 years"}
                            </p>
                        </div>

                        {/* Bike Price */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Bike Price (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="5000"
                                    placeholder="e.g., 100000"
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
                                        ₹{amount / 1000}K
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
                                    step="5000"
                                    placeholder="e.g., 20000"
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
                                        ₹{amount / 1000}K
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Typical down payment: 10-20% of bike price</p>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={bikeType === "new" ? "e.g., 10" : "e.g., 12"}
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
                                        {month >= 36 ? `${month / 12}Y` : `${month}M`}
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
                    emptyIcon="🏍️"
                    emptyText="Enter bike details and press Calculate"
                    mainResult={result ? {
                        label: "Monthly EMI",
                        value: `₹${result.emiFormatted}`,
                        color: "text-blue-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Affordability Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: `₹${result.totalPaymentFormatted}`, valueColor: "text-yellow-400" },
                        { label: "Total Interest", value: `₹${result.totalInterestFormatted}`, valueColor: "text-orange-400" },
                        { label: "Bike Price", value: `₹${result.bikePrice.toFixed(2)}` },
                        { label: "Down Payment", value: `₹${result.downPayment.toFixed(2)} (${result.downPaymentPercentage.toFixed(1)}%)`, valueColor: "text-purple-400" },
                        { label: "Loan Amount", value: `₹${result.principal.toFixed(2)}` },
                        { label: "Bike Type", value: result.bikeType === "new" ? "New Bike 🏍️" : "Used Bike 🛵" },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months / 12).toFixed(1)} years)` },
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
                    <p className="text-xs text-gray-600 mt-2">Showing amortization schedule for the loan tenure</p>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Bike Loan EMI Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Bike Loan EMI Calculator</strong> helps you estimate your monthly payments for your two-wheeler purchase accurately. Whether you're buying a new sports bike, a commuter bike, or a used scooter, this calculator gives you a clear picture of your repayment obligations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the standard EMI formula to provide accurate results for bike loans. It accounts for the bike price, down payment, interest rate, and tenure to calculate your monthly payments. You can also see the total interest payable and a detailed amortization schedule.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your bike loan EMI helps you budget better, plan your finances, and choose the right two-wheeler within your budget. Use our calculator to compare different loan options and find the one that best fits your monthly budget.
                </p>
            </section>

            {/* New vs Used Bike Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">New vs Used Bike Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🏍️ New Bike</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Interest Rate: 8-12% p.a.</li>
                            <li>• Tenure: Up to 4 years (48 months)</li>
                            <li>• Down Payment: 10-15%</li>
                            <li>• LTV: Up to 90%</li>
                            <li>• Lower interest rates</li>
                            <li>• Longer repayment period</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">🛵 Used Bike</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Interest Rate: 10-16% p.a.</li>
                            <li>• Tenure: Up to 3 years (36 months)</li>
                            <li>• Down Payment: 20-30%</li>
                            <li>• LTV: Up to 80%</li>
                            <li>• Higher interest rates</li>
                            <li>• Shorter repayment period</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">* New bikes generally get better loan terms due to higher resale value and lower risk</p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Bike Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">bike type</strong> - New Bike or Used Bike.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">bike price</strong> (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Optionally enter the <strong className="text-white">down payment</strong> amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter the <strong className="text-white">interest rate</strong> offered by your lender.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Select the <strong className="text-white">loan tenure</strong> in months.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">"Calculate EMI"</strong> to see your monthly payment and amortization schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 7:</strong> Review the <strong className="text-white">affordability rating</strong> and use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Bike Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your exact monthly payment before buying a bike. Plan your monthly budget around your EMI obligations and avoid over-committing.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Lenders</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI offers from different banks and NBFCs. Find the best interest rate and tenure combination for your dream bike.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Down Payment Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Zero-down offers are the dealership's best sales tool and your most expensive option. See what each extra ₹10,000 upfront saves you over the full tenure.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ New vs Used Decision</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare EMI for new and used bikes. Understand the cost difference and make an informed decision based on your budget.</p>
                    </div>
                </div>
            </section>

            {/* Bike Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Bike Loan EMI Formula</h2>
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
                    <p className="text-gray-500 text-xs mt-4">Interest is charged on the balance still outstanding, so the interest share of each EMI falls a little every month.</p>
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
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹1L, 3Y)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">8%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,134</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹12,824</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,12,824</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">9%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,180</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹14,480</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,14,480</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">10%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,226</td>
                                <td className="py-2 px-4 text-right text-red-400">₹16,136</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,16,136</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">12%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,322</td>
                                <td className="py-2 px-4 text-right text-red-400">₹19,592</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,19,592</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">14%</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,419</td>
                                <td className="py-2 px-4 text-right text-red-400">₹23,084</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,23,084</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Comparison shows impact of interest rate on EMI and total cost for a ₹1 lakh bike loan over 3 years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tenure Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Tenure</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI (₹1L, 10%)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">12 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹8,790</td>
                                <td className="py-2 px-4 text-right text-green-400">₹5,480</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,05,480</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">18 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,002</td>
                                <td className="py-2 px-4 text-right text-orange-400">₹8,036</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,08,036</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">24 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹4,614</td>
                                <td className="py-2 px-4 text-right text-red-400">₹10,736</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,10,736</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">36 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,226</td>
                                <td className="py-2 px-4 text-right text-red-400">₹16,136</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,16,136</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-500 font-bold">48 Months</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹2,535</td>
                                <td className="py-2 px-4 text-right text-red-400">₹21,680</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,21,680</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* On a two-wheeler, a longer tenure often outlives the bike's useful resale value</p>
            </section>

            {/* Popular Bike Models with EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Popular Bike Models & Estimated EMI</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Bike Model</th>
                                <th className="text-right py-3 px-4 text-gray-400">Price (₹)</th>
                                <th className="text-right py-3 px-4 text-gray-400">EMI (10%, 3Y)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Total Interest</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400">Honda Activa</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹85,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹2,742</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹13,712</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400">TVS Jupiter</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹75,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹2,420</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹12,120</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400">Hero Splendor</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹65,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹2,097</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹10,492</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400">Bajaj Pulsar</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,20,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹3,871</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹19,356</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400">Royal Enfield</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹2,00,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹6,452</td>
                                <td className="py-2 px-4 text-right text-yellow-400">₹32,272</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* EMI calculated with 10% interest rate and 3-year tenure. Prices are indicative.</p>
            </section>

            {/* Bike Loan Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Bike Loan Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✅ Salaried Individuals</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 21-60 years</li>
                            <li>• Minimum monthly income: ₹15,000</li>
                            <li>• Work experience: 6+ months</li>
                            <li>• CIBIL score: 700+ preferred, though a thin file is common for a first bike</li>
                            <li>• Aadhaar and PAN, plus address proof if the two differ</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✅ Self-Employed</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age: 25-65 years</li>
                            <li>• ITR filing: 1+ years</li>
                            <li>• Business vintage: 2+ years</li>
                            <li>• Annual turnover: ₹2 lakhs+</li>
                            <li>• Six months of bank statements showing steady inflow</li>
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">* Two-wheeler lending is dominated by NBFCs, and their criteria are looser and their rates higher than a bank's. Check both.</p>
            </section>

            {/* Tips for Lower Bike Loan EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Lower Bike Loan EMI</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Make a Larger Down Payment:</strong> A higher down payment reduces the loan amount, lowering both EMI and total interest. Aim for 15-20% or more.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Improve Credit Score:</strong> A higher credit score (700+) qualifies you for lower interest rates. Check your score regularly and correct any errors.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose New Bike Over Used:</strong> New bikes get lower interest rates (8-12%) compared to used bikes (10-16%). This can save you thousands in interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare Multiple Lenders:</strong> Different lenders offer different rates. Even a 1% difference can save you ₹5,000+ over the loan tenure.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Optimal Tenure:</strong> Match the tenure to how long you will actually keep the bike. Paying for a commuter bike in year four of ownership is how people end up with an EMI on something they no longer ride.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Look for Promotional Offers:</strong> Many lenders offer zero processing fees or lower rates during festive seasons. Plan your purchase during such periods.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Taking a Bike Loan</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring On-Road Price:</strong> Dealers quote ex-showroom. The loan is written against the on-road figure — RTO, road tax, insurance and any accessories they add — which is routinely 20-25% higher.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Factoring in Insurance:</strong> Bike insurance is mandatory and adds to your monthly cost. Factor it into your budget.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Choosing Longest Tenure:</strong> Stretching ₹80,000 from two years to four cuts the EMI by ₹1,661 and adds ₹9,760 in interest. Take that trade only if the shorter EMI genuinely does not fit.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Missing Processing Fees:</strong> On small loans the flat minimum processing fee matters more than the percentage. Ask for the rupee figure, not the rate.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Multiple Loan Applications:</strong> Each application leaves a hard enquiry. Dealerships often submit to several financiers at once to get you approved fast — ask them to apply to one first.</span>
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