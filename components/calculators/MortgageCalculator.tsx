"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a mortgage calculator?",
        a: "A mortgage calculator estimates your monthly mortgage payment based on loan amount, interest rate, and loan term. It helps you understand how much house you can afford and plan your budget accordingly.",
    },
    {
        q: "How is monthly mortgage payment calculated?",
        a: "Monthly payment uses the standard amortization formula: M = P × (r(1+r)^n) / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is total number of payments.",
    },
    {
        q: "What is included in monthly mortgage payment?",
        a: "Principal (loan amount), Interest (bank charge), Taxes (property tax), and Insurance (homeowner's insurance). Together these are called PITI.",
    },
    {
        q: "What is a good down payment amount?",
        a: "20% down payment avoids Private Mortgage Insurance (PMI). However, many lenders accept 3-5% down for first-time home buyers with PMI.",
    },
    {
        q: "How does loan term affect my payment?",
        a: "15-year loans have higher monthly payments but lower total interest. 30-year loans have lower monthly payments but you pay more interest overall.",
    },
    {
        q: "What is an amortization schedule?",
        a: "An amortization schedule shows how each payment splits between principal and interest over the life of the loan. Early payments are mostly interest.",
    },
    {
        q: "How much mortgage can I afford?",
        a: "Most lenders use the 28/36 rule: Housing expenses shouldn't exceed 28% of gross monthly income, and total debt shouldn't exceed 36%.",
    },
    {
        q: "What is PMI and when can I remove it?",
        a: "Private Mortgage Insurance (PMI) protects lenders when down payment is under 20%. You can request PMI removal when loan balance reaches 80% of home value.",
    },
    {
        q: "Does credit score affect mortgage rates?",
        a: "Yes. Higher credit scores (740+) qualify for lower interest rates. Lower scores may require higher rates or FHA loans with lower down payments.",
    },
    {
        q: "What are closing costs?",
        a: "Closing costs are fees paid at settlement, typically 2-5% of loan amount. They include appraisal, title insurance, origination fees, and prepaid taxes/insurance.",
    },
    {
        q: "What is the difference between fixed and adjustable-rate mortgages?",
        a: "Fixed-rate mortgage: Interest rate stays same for entire loan term (30-year fixed popular). Predictable payments. Adjustable-rate mortgage (ARM): Rate changes after initial fixed period (usually 5/7/10 years). Lower initial rate but can increase. Choose fixed for long-term stability, ARM if you plan to move within 5-7 years.",
    },
    {
        q: "How to get pre-approved for a mortgage?",
        a: "Steps: 1) Check credit score (740+ for best rates), 2) Gather documents (pay stubs, tax returns, bank statements, W-2s), 3) Compare 3-5 lenders, 4) Submit application with lender, 5) Get pre-approval letter (valid 60-90 days). Pre-approval shows sellers you're serious and gives exact loan amount.",
    },
    {
        q: "What is the debt-to-income ratio for mortgages?",
        a: "Front-end DTI = Housing costs ÷ Gross monthly income (should be ≤28%). Back-end DTI = Total debt payments ÷ Gross monthly income (should be ≤36%). For FHA loans: up to 31% front-end, 43% back-end. Higher DTI = harder to qualify. Pay down debts before applying to improve DTI.",
    },
    {
        q: "What are FHA loans and who qualifies?",
        a: "FHA loans: Government-backed, 3.5% down payment (580+ credit score), 10% down (500-579 score). Easier qualification than conventional. Mortgage insurance required (upfront + monthly). Loan limits vary by county ($420k-$970k). Best for first-time buyers with moderate income.",
    },
    {
        q: "How to refinance a mortgage?",
        a: "Rate-and-term refinance: Lower interest rate or change loan term. Cash-out refinance: Borrow extra equity for home improvements, debt consolidation, education. Costs: 2-5% of loan amount in closing costs. Refinance if new rate is 1-2% lower than current. Break-even period = closing costs ÷ monthly savings.",
    },
];

const LOAN_TERMS = [
    { years: 30, months: 360, color: "text-blue-400" },
    { years: 20, months: 240, color: "text-green-400" },
    { years: 15, months: 180, color: "text-yellow-400" },
    { years: 10, months: 120, color: "text-orange-400" },
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
    name: "Mortgage Calculator – Home Loan Payment Calculator",
    description: "Calculate your monthly mortgage payments including principal, interest, taxes, and insurance. Plan your home purchase budget.",
    url: "https://www.numrexo.com/finance/mortgage-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-US",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Monthly payment calculation",
        "Principal & interest breakdown",
        "Property taxes and insurance",
        "Amortization schedule",
    ],
    author: {
        "@type": "Organization",
        name: "Numrexo",
        url: "https://www.numrexo.com",
    },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Mortgage Calculator", item: "https://www.numrexo.com/finance/mortgage-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function MortgageCalculator() {
    const [homePrice, setHomePrice] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [downPaymentPercent, setDownPaymentPercent] = useState("20");
    const [loanTerm, setLoanTerm] = useState(30);
    const [interestRate, setInterestRate] = useState("");
    const [propertyTax, setPropertyTax] = useState("");
    const [homeInsurance, setHomeInsurance] = useState("");
    const [pmi, setPmi] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [inputMethod, setInputMethod] = useState<"amount" | "percent">("percent");

    const calculate = () => {
        let price = parseFloat(homePrice);
        let down = 0;

        if (inputMethod === "percent") {
            const percent = parseFloat(downPaymentPercent);
            if (!isNaN(percent) && !isNaN(price)) {
                down = (percent / 100) * price;
            }
        } else {
            down = parseFloat(downPayment);
        }

        if (isNaN(price) || price <= 0) {
            alert("Please enter a valid home price");
            return;
        }

        if (isNaN(down) || down < 0) {
            alert("Please enter a valid down payment");
            return;
        }

        const loanAmount = price - down;
        if (loanAmount <= 0) {
            alert("Loan amount must be greater than zero");
            return;
        }

        const rate = parseFloat(interestRate);
        if (isNaN(rate) || rate < 0) {
            alert("Please enter a valid interest rate");
            return;
        }

        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        let monthlyPI = 0;
        if (monthlyRate === 0) {
            monthlyPI = loanAmount / numberOfPayments;
        } else {
            monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        const monthlyTax = parseFloat(propertyTax) / 12 || 0;
        const monthlyInsurance = parseFloat(homeInsurance) / 12 || 0;
        const monthlyPMI = parseFloat(pmi) / 12 || 0;

        const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
        const totalPayments = totalMonthly * numberOfPayments;
        const totalInterest = (monthlyPI * numberOfPayments) - loanAmount;
        const ltv = (loanAmount / price) * 100;

        setResult({
            monthlyPayment: totalMonthly.toFixed(2),
            monthlyPrincipalInterest: monthlyPI.toFixed(2),
            monthlyTax: monthlyTax.toFixed(2),
            monthlyInsurance: monthlyInsurance.toFixed(2),
            monthlyPMI: monthlyPMI.toFixed(2),
            loanAmount: loanAmount.toFixed(2),
            downPayment: down.toFixed(2),
            downPaymentPercent: ((down / price) * 100).toFixed(1),
            ltv: ltv.toFixed(1),
            totalPayments: totalPayments.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            loanTerm: loanTerm,
            interestRate: rate,
        });
    };

    const resetForm = () => {
        setHomePrice("");
        setDownPayment("");
        setDownPaymentPercent("20");
        setLoanTerm(30);
        setInterestRate("");
        setPropertyTax("");
        setHomeInsurance("");
        setPmi("");
        setResult(null);
        setInputMethod("percent");
    };

    const handleDownPaymentPercentChange = (percent: string) => {
        setDownPaymentPercent(percent);
        if (inputMethod === "percent" && homePrice) {
            const price = parseFloat(homePrice);
            if (!isNaN(price)) {
                const amount = (parseFloat(percent) / 100) * price;
                setDownPayment(amount.toString());
            }
        }
    };

    const handleHomePriceChange = (value: string) => {
        setHomePrice(value);
        if (inputMethod === "percent" && downPaymentPercent && value) {
            const price = parseFloat(value);
            const percent = parseFloat(downPaymentPercent);
            if (!isNaN(price) && !isNaN(percent)) {
                const amount = (percent / 100) * price;
                setDownPayment(amount.toString());
            }
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/finance" itemProp="item" className="hover:text-gray-300">Finance Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Mortgage Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Mortgage Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Enter your loan details</p>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Home Price */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Home Price ($)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="300000"
                                    value={homePrice}
                                    onChange={(e) => handleHomePriceChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                            </div>
                        </div>

                        {/* Down Payment */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-semibold text-gray-400">Down Payment</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setInputMethod("percent")}
                                        className={`text-xs px-2 py-0.5 rounded ${inputMethod === "percent" ? "bg-blue-500 text-white" : "text-gray-500"}`}
                                    >
                                        %
                                    </button>
                                    <button
                                        onClick={() => setInputMethod("amount")}
                                        className={`text-xs px-2 py-0.5 rounded ${inputMethod === "amount" ? "bg-blue-500 text-white" : "text-gray-500"}`}
                                    >
                                        $
                                    </button>
                                </div>
                            </div>

                            {inputMethod === "percent" ? (
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.5"
                                        placeholder="20"
                                        value={downPaymentPercent}
                                        onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="60000"
                                        value={downPayment}
                                        onChange={(e) => setDownPayment(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                                </div>
                            )}
                        </div>

                        {/* Loan Term */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Loan Term (years)</label>
                            <div className="grid grid-cols-4 gap-2">
                                {LOAN_TERMS.map((term) => (
                                    <button
                                        key={term.years}
                                        onClick={() => setLoanTerm(term.years)}
                                        className={`py-2 rounded-lg text-sm font-medium transition-all ${loanTerm === term.years
                                            ? "bg-blue-500 text-white"
                                            : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {term.years}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.125"
                                    placeholder="6.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>

                        {/* Property Tax & Insurance */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Property Tax (annual)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="3000"
                                        value={propertyTax}
                                        onChange={(e) => setPropertyTax(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Home Insurance (annual)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="1200"
                                        value={homeInsurance}
                                        onChange={(e) => setHomeInsurance(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                                </div>
                            </div>
                        </div>

                        {/* PMI (optional) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">PMI (annual, if applicable)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={pmi}
                                    onChange={(e) => setPmi(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Typically required when down payment &lt; 20%</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Calculate Mortgage →
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

                {/* Result */}
                <ResultBox
                    title="Your Monthly Payment"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Enter your loan details and press Calculate"
                    mainResult={
                        result
                            ? { label: "Monthly Payment", value: `$${result.monthlyPayment}`, color: "text-blue-400" }
                            : undefined
                    }
                    extraRows={
                        result
                            ? [
                                { label: "Principal & Interest", value: `$${result.monthlyPrincipalInterest}` },
                                { label: "Property Tax", value: `$${result.monthlyTax}`, valueColor: "text-yellow-400" },
                                { label: "Home Insurance", value: `$${result.monthlyInsurance}`, valueColor: "text-green-400" },
                                { label: "PMI", value: `$${result.monthlyPMI}`, valueColor: "text-orange-400" },
                                { label: "Loan Amount", value: `$${result.loanAmount}` },
                                { label: "Down Payment", value: `$${result.downPayment} (${result.downPaymentPercent}%)` },
                                { label: "Loan-to-Value (LTV)", value: `${result.ltv}%` },
                                { label: "Total Interest Paid", value: `$${result.totalInterest}` },
                                { label: "Total Payments", value: `$${result.totalPayments}` },
                            ]
                            : undefined
                    }
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1750 WORDS) ─── */}

            {/* About Mortgage Calculator */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Mortgage Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Mortgage Calculator</strong> helps you estimate your monthly home loan payments including principal, interest, property taxes, home insurance, and PMI. Whether you're a first-time homebuyer or looking to refinance, this tool provides accurate payment estimates.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Use it to plan your home purchase budget, compare different loan terms (10, 15, 20, or 30 years), and understand how much house you can afford. The calculator also shows your total interest paid over the life of the loan and your loan-to-value ratio.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Mortgage Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">home price</strong> you're considering.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">down payment</strong> (as amount or percentage).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select <strong className="text-white">loan term</strong> (10, 15, 20, or 30 years).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter the <strong className="text-white">interest rate</strong> offered by your lender.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> (Optional) Enter <strong className="text-white">property tax, home insurance, and PMI</strong> for accurate total payment.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">"Calculate Mortgage"</strong> to see your monthly payment breakdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 7:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Mortgage Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly what your monthly payment will be before you buy. Plan your household budget with confidence.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Loan Offers</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare different interest rates and loan terms from multiple lenders. Find the most affordable option.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Down Payment Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See how different down payment amounts affect your monthly payment. Find the sweet spot between upfront cost and monthly payment.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Total Cost Visibility</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See total interest paid over the life of the loan. Understand the true cost of homeownership.</p>
                    </div>
                </div>
            </section>

            {/* Mortgage Rate by Credit Score */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Mortgage Rates by Credit Score (2025-26)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Credit Score</th>
                                <th className="text-left py-3 px-4 text-gray-400">Avg. Interest Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Monthly Payment ($300K loan)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-green-400">760+</td>
                                <td className="py-2 px-4 text-yellow-400">6.5%</td>
                                <td className="py-2 px-4">$1,896</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-blue-400">700-759</td>
                                <td className="py-2 px-4 text-yellow-400">6.9%</td>
                                <td className="py-2 px-4">$1,975</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-orange-400">660-699</td>
                                <td className="py-2 px-4 text-yellow-400">7.4%</td>
                                <td className="py-2 px-4">$2,075</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4 text-red-400">620-659</td>
                                <td className="py-2 px-4 text-yellow-400">8.0%</td>
                                <td className="py-2 px-4">$2,200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Loan Term Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Loan Term Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Loan Term</th>
                                <th className="text-left py-3 px-4 text-gray-400">Monthly Payment</th>
                                <th className="text-left py-3 px-4 text-gray-400">Total Interest</th>
                                <th className="text-left py-3 px-4 text-gray-400">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-blue-400 font-medium">30 Years</td>
                                <td className="py-3 px-4 text-gray-300">Lowest</td>
                                <td className="py-3 px-4 text-yellow-400">Highest</td>
                                <td className="py-3 px-4 text-gray-300">Highest</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-green-400 font-medium">20 Years</td>
                                <td className="py-3 px-4 text-gray-300">Moderate</td>
                                <td className="py-3 px-4 text-yellow-400">Moderate</td>
                                <td className="py-3 px-4 text-gray-300">Moderate</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-orange-400 font-medium">15 Years</td>
                                <td className="py-3 px-4 text-gray-300">Highest</td>
                                <td className="py-3 px-4 text-green-400">Lowest</td>
                                <td className="py-3 px-4 text-gray-300">Lowest</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    Shorter loan terms have higher monthly payments but save thousands in interest over the life of the loan.
                </p>
            </section>

            {/* Mortgage Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Mortgage Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-blue-400 mb-2">Monthly Payment Formula</h3>
                    <p className="text-white font-mono text-sm mb-3">M = P × [ r(1+r)^n ] / [ (1+r)^n - 1 ]</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div><span className="text-blue-400">M</span> <span className="text-gray-500">= Monthly Payment</span></div>
                        <div><span className="text-blue-400">P</span> <span className="text-gray-500">= Principal (Loan Amount)</span></div>
                        <div><span className="text-blue-400">r</span> <span className="text-gray-500">= Monthly Interest Rate</span></div>
                        <div><span className="text-blue-400">n</span> <span className="text-gray-500">= Total Payments (months)</span></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">Total Monthly Payment = Principal & Interest + Property Tax + Insurance + PMI</p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}