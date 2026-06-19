"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a home loan eligibility calculator?",
        a: "A home loan eligibility calculator helps you determine how much loan amount you can qualify for based on your income, age, existing obligations, and property value. It uses the FOIR (Fixed Obligation to Income Ratio) method to calculate your maximum loan eligibility.",
    },
    {
        q: "How is home loan eligibility calculated?",
        a: "Home loan eligibility is calculated using the FOIR (Fixed Obligation to Income Ratio) method. Lenders typically allow 40-50% of your monthly income for EMI payments. The formula is: Eligible Loan Amount = (Monthly Income × FOIR - Existing EMI) × ((1+r)^n - 1) / (r × (1+r)^n).",
    },
    {
        q: "What is the minimum salary required for a home loan?",
        a: "The minimum salary required varies by lender and city. Generally, you need a monthly income of ₹25,000+ in metro cities and ₹20,000+ in non-metro cities. Some lenders offer loans to individuals with ₹15,000+ monthly income for smaller loan amounts.",
    },
    {
        q: "What is FOIR in home loan eligibility?",
        a: "FOIR (Fixed Obligation to Income Ratio) is the percentage of your monthly income that lenders allow for EMI payments. Typically, FOIR is 40-50%. For example, if your monthly income is ₹50,000 and FOIR is 40%, your total EMI (including existing loans) cannot exceed ₹20,000.",
    },
    {
        q: "What is the maximum age for home loan eligibility?",
        a: "The maximum age for home loan eligibility is typically 60-65 years for salaried individuals and 65-70 years for self-employed individuals. The loan tenure is usually limited to retirement age or 65-70 years, whichever is earlier.",
    },
    {
        q: "How does CIBIL score affect home loan eligibility?",
        a: "CIBIL score is crucial for home loan eligibility. A score of 750+ is considered excellent and qualifies you for the best interest rates. Scores between 700-749 are good, while scores below 700 may result in higher rates or rejection. Some lenders accept scores as low as 650 with higher interest rates.",
    },
    {
        q: "What is the maximum home loan amount I can get?",
        a: "The maximum home loan amount depends on your income and property value. Most lenders offer up to 80-90% of the property value (LTV ratio). Generally, your loan amount can be up to 5-6 times your annual income, subject to FOIR and property valuation.",
    },
    {
        q: "What documents are required for home loan eligibility check?",
        a: "For home loan eligibility check, you need: Identity proof (Aadhaar, PAN), Address proof, Income proof (salary slips for 3 months, ITR for 2-3 years), Bank statements (6 months), Employment proof, Property documents, and CIBIL score report.",
    },
    {
        q: "Can I get a home loan with a co-applicant?",
        a: "Yes, adding a co-applicant (spouse, parents, or siblings) can significantly increase your home loan eligibility. The combined income of all co-applicants is considered, which can increase the loan amount by 30-50%.",
    },
    {
        q: "What is the EMI to income ratio for home loans?",
        a: "Lenders typically allow your EMI to be 40-50% of your monthly income. For example, if your monthly income is ₹50,000, your EMI (including all existing loans) should not exceed ₹20,000-25,000. This is called the FOIR (Fixed Obligation to Income Ratio).",
    },
    {
        q: "How does property value affect loan eligibility?",
        a: "Property value determines the maximum loan amount through LTV (Loan to Value) ratio. For properties up to ₹30 lakhs, LTV can be up to 90%; for ₹30-75 lakhs, up to 80%; for above ₹75 lakhs, up to 75%. Your loan amount is limited by both income eligibility and property value.",
    },
    {
        q: "What is the minimum age for home loan eligibility?",
        a: "The minimum age for home loan eligibility is typically 21 years for salaried individuals and 25 years for self-employed individuals. Some lenders offer loans to individuals aged 18+ for smaller amounts.",
    },
    {
        q: "Can I get a home loan without income proof?",
        a: "Getting a home loan without income proof is extremely difficult. However, some lenders offer loans to self-employed individuals with proven business income, even without formal salary slips, based on ITR and bank statements.",
    },
    {
        q: "How does existing debt affect home loan eligibility?",
        a: "Existing debt (personal loans, car loans, credit cards) reduces your home loan eligibility. Lenders consider your total existing EMIs and deduct them from your FOIR allowance. To increase eligibility, consider closing smaller loans before applying.",
    },
    {
        q: "How to increase home loan eligibility?",
        a: "Ways to increase home loan eligibility: 1) Add a co-applicant, 2) Clear existing debts, 3) Increase income through additional sources, 4) Choose a longer tenure, 5) Improve CIBIL score, 6) Opt for a higher down payment, 7) Choose a property with higher valuation.",
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
    name: "Home Loan Eligibility Calculator – Check Your Home Loan Eligibility",
    description: "Check your home loan eligibility with our free calculator. Find out how much loan you can get based on your income, age, and existing obligations.",
    url: "https://www.numrexo.com/finance/home-loan-eligibility-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Loan eligibility calculation",
        "FOIR analysis",
        "CIBIL score impact",
        "Co-applicant analysis",
        "Property value check",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Home Loan Eligibility Calculator", item: "https://www.numrexo.com/finance/home-loan-eligibility-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeLoanEligibilityCalculator() {
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [existingEMI, setExistingEMI] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [propertyValue, setPropertyValue] = useState("");
    const [age, setAge] = useState("");
    const [employmentType, setEmploymentType] = useState("salaried");
    const [hasCoApplicant, setHasCoApplicant] = useState(false);
    const [coApplicantIncome, setCoApplicantIncome] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setMonthlyIncome("");
        setExistingEMI("");
        setInterestRate("");
        setTenure("");
        setPropertyValue("");
        setAge("");
        setCoApplicantIncome("");
        setResult(null);
    };

    const calculateEligibility = () => {
        const income = parseFloat(monthlyIncome);
        const existing = parseFloat(existingEMI) || 0;
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);
        const property = parseFloat(propertyValue) || 0;
        const applicantAge = parseFloat(age);
        const coIncome = parseFloat(coApplicantIncome) || 0;

        if (isNaN(income) || income <= 0) {
            alert("Please enter a valid monthly income");
            return;
        }

        if (isNaN(rate) || rate < 0) {
            alert("Please enter a valid interest rate");
            return;
        }

        if (isNaN(months) || months <= 0) {
            alert("Please enter a valid loan tenure");
            return;
        }

        if (isNaN(applicantAge) || applicantAge < 18) {
            alert("Please enter a valid age (minimum 18 years)");
            return;
        }

        // Calculate total income (including co-applicant)
        const totalIncome = hasCoApplicant ? income + coIncome : income;

        // Determine FOIR based on income slab
        let foir = 40; // Default FOIR
        if (totalIncome >= 100000) foir = 50;
        else if (totalIncome >= 75000) foir = 48;
        else if (totalIncome >= 50000) foir = 45;
        else if (totalIncome >= 30000) foir = 42;

        // Max allowable EMI (FOIR of income minus existing EMI)
        const maxEMI = (totalIncome * foir / 100) - existing;

        if (maxEMI <= 0) {
            alert("Your existing EMIs already exceed the allowable limit. Consider clearing existing debts first.");
            return;
        }

        // Calculate eligible loan amount using EMI formula inverse
        const monthlyRate = rate / 100 / 12;
        let eligibleAmount = 0;
        if (monthlyRate === 0) {
            eligibleAmount = maxEMI * months;
        } else {
            eligibleAmount = maxEMI * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
        }

        // Apply LTV ratio based on property value
        let ltv = 80; // Default LTV
        if (property > 0) {
            if (property <= 3000000) ltv = 90;
            else if (property <= 7500000) ltv = 80;
            else ltv = 75;

            const maxLoanByProperty = property * ltv / 100;
            eligibleAmount = Math.min(eligibleAmount, maxLoanByProperty);
        }

        // Age factor check
        let maxAge = 60;
        if (employmentType === "salaried") maxAge = 60;
        else maxAge = 65;

        const maxTenureByAge = maxAge - applicantAge;
        if (maxTenureByAge < 5) {
            alert(`Your age (${applicantAge}) is close to retirement (${maxAge} years). Maximum remaining tenure is ${maxTenureByAge} years.`);
            return;
        }

        // Calculate EMI for eligible amount
        let emi = 0;
        if (monthlyRate === 0) {
            emi = eligibleAmount / months;
        } else {
            emi = eligibleAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        const totalPayment = emi * months;
        const totalInterest = totalPayment - eligibleAmount;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        const emiToIncomeRatio = (emi / totalIncome) * 100;

        if (emiToIncomeRatio <= 15) {
            rating = "Excellent Eligibility ★★★★★";
            ratingColor = "text-green-400";
        } else if (emiToIncomeRatio <= 25) {
            rating = "Good Eligibility ★★★★";
            ratingColor = "text-blue-400";
        } else if (emiToIncomeRatio <= 35) {
            rating = "Moderate Eligibility ★★★";
            ratingColor = "text-yellow-400";
        } else if (emiToIncomeRatio <= 45) {
            rating = "Limited Eligibility ★★";
            ratingColor = "text-orange-400";
        } else {
            rating = "Stretched Eligibility ★";
            ratingColor = "text-red-400";
        }

        setResult({
            eligibleAmount: eligibleAmount,
            maxEMI: maxEMI,
            emi: emi,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
            foir: foir,
            income: totalIncome,
            existingEMI: existing,
            months: months,
            rate: rate,
            propertyValue: property,
            ltv: ltv,
            maxLoanByProperty: property > 0 ? property * ltv / 100 : eligibleAmount,
            age: applicantAge,
            maxAge: maxAge,
            tenureByAge: maxTenureByAge,
            employmentType: employmentType,
            hasCoApplicant: hasCoApplicant,
            emiToIncomeRatio: emiToIncomeRatio,
            rating: rating,
            ratingColor: ratingColor,
            eligibleAmountFormatted: eligibleAmount.toFixed(2),
            emiFormatted: emi.toFixed(2),
            totalInterestFormatted: totalInterest.toFixed(2),
            totalPaymentFormatted: totalPayment.toFixed(2),
        });
    };

    // Preset values
    const presetIncomes = [25000, 50000, 75000, 100000, 150000, 200000];
    const presetRates = [7, 8, 9, 10, 11];
    const presetTenures = [60, 120, 180, 240, 300, 360];
    const presetPropertyValues = [2000000, 4000000, 6000000, 8000000, 10000000, 15000000];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/finance" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Finance Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Home Loan Eligibility Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Home Loan Eligibility Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Check how much home loan you can get</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                        {/* Employment Type */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Employment Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setEmploymentType("salaried")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${employmentType === "salaried"
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    💼 Salaried
                                </button>
                                <button
                                    onClick={() => setEmploymentType("self-employed")}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${employmentType === "self-employed"
                                        ? "bg-green-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    👔 Self-Employed
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {employmentType === "salaried" ? "Max age: 60 years | Stable income" : "Max age: 65 years | Business income"}
                            </p>
                        </div>

                        {/* Monthly Income */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Income (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1000"
                                    placeholder="e.g., 50000"
                                    value={monthlyIncome}
                                    onChange={(e) => setMonthlyIncome(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetIncomes.map((income) => (
                                    <button
                                        key={income}
                                        onClick={() => setMonthlyIncome(income.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        ₹{income / 1000}K
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Co-Applicant */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-2">
                                <input
                                    type="checkbox"
                                    checked={hasCoApplicant}
                                    onChange={(e) => setHasCoApplicant(e.target.checked)}
                                    className="rounded border-gray-700 bg-[#0f1525] text-blue-500 focus:ring-blue-500"
                                />
                                Add Co-Applicant (Spouse/Parent)
                            </label>
                            {hasCoApplicant && (
                                <div className="relative mt-2">
                                    <input
                                        type="number"
                                        step="1000"
                                        placeholder="Co-applicant monthly income"
                                        value={coApplicantIncome}
                                        onChange={(e) => setCoApplicantIncome(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                </div>
                            )}
                        </div>

                        {/* Existing EMI */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Existing Monthly EMI (₹) <span className="text-gray-500">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="500"
                                    placeholder="e.g., 10000"
                                    value={existingEMI}
                                    onChange={(e) => setExistingEMI(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Age (Years)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="e.g., 30"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
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

                        {/* Property Value */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Property Value (₹) <span className="text-gray-500">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="100000"
                                    placeholder="e.g., 5000000"
                                    value={propertyValue}
                                    onChange={(e) => setPropertyValue(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetPropertyValues.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => setPropertyValue(value.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        {value >= 10000000 ? `₹${value / 10000000}Cr` : `₹${value / 100000}L`}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">LTV: Up to 90% for properties up to ₹30L, 80% for ₹30-75L, 75% above ₹75L</p>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={calculateEligibility}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Check Eligibility →
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
                    title="Your Home Loan Eligibility"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Enter your details and press Check Eligibility"
                    mainResult={result ? {
                        label: "You Can Get",
                        value: `₹${result.eligibleAmountFormatted}`,
                        color: "text-blue-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Eligibility Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Estimated Monthly EMI", value: `₹${result.emiFormatted}`, valueColor: "text-yellow-400" },
                        { label: "EMI to Income Ratio", value: `${result.emiToIncomeRatio.toFixed(1)}%`, valueColor: result.emiToIncomeRatio <= 30 ? "text-green-400" : "text-orange-400" },
                        { label: "Total Interest", value: `₹${result.totalInterestFormatted}`, valueColor: "text-orange-400" },
                        { label: "Total Payment", value: `₹${result.totalPaymentFormatted}`, valueColor: "text-yellow-400" },
                        { label: "Monthly Income", value: `₹${result.income.toFixed(2)}` },
                        { label: "Co-Applicant", value: result.hasCoApplicant ? "Yes ✅" : "No ❌" },
                        { label: "Existing EMI", value: `₹${result.existingEMI.toFixed(2)}` },
                        { label: "FOIR Allowed", value: `${result.foir}%` },
                        { label: "Maximum EMI Allowed", value: `₹${result.maxEMI.toFixed(2)}` },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months / 12).toFixed(0)} years)` },
                        { label: "Property Value", value: result.propertyValue > 0 ? `₹${result.propertyValue.toFixed(2)}` : "Not provided" },
                        { label: "LTV Ratio", value: result.propertyValue > 0 ? `${result.ltv}%` : "N/A" },
                        { label: "Max Loan by Property", value: result.propertyValue > 0 ? `₹${result.maxLoanByProperty.toFixed(2)}` : "N/A" },
                        { label: "Age", value: `${result.age} years` },
                        { label: "Max Age for Loan", value: `${result.maxAge} years` },
                        { label: "Remaining Tenure by Age", value: `${result.tenureByAge} years` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Home Loan Eligibility Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Home Loan Eligibility Calculator</strong> helps you determine how much home loan you can qualify for based on your financial profile. Whether you're a salaried professional or self-employed, this calculator gives you a clear picture of your borrowing capacity.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our calculator uses the FOIR (Fixed Obligation to Income Ratio) method, which is the industry standard used by all major banks and financial institutions. It considers your monthly income, existing obligations, age, employment type, and property value to provide accurate eligibility results.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Knowing your home loan eligibility helps you plan your dream home purchase better. It gives you confidence when negotiating with builders and lenders, and helps you avoid disappointment during the loan approval process.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Home Loan Eligibility Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select your <strong className="text-white">employment type</strong> - Salaried or Self-Employed.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">monthly income</strong> (use preset buttons for quick input).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Optionally add a <strong className="text-white">co-applicant</strong> (spouse/parent) to increase eligibility.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter your <strong className="text-white">existing monthly EMI</strong> (if any).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Enter your <strong className="text-white">age</strong> to check tenure availability.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Enter <strong className="text-white">interest rate</strong> and <strong className="text-white">loan tenure</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 7:</strong> Optionally enter <strong className="text-white">property value</strong> for LTV check.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 8:</strong> Click <strong className="text-white">"Check Eligibility"</strong> to see your results.</p>
                </div>
            </section>

            {/* Key Factors Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Key Factors That Affect Home Loan Eligibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">💼 Income & FOIR</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Monthly income determines capacity</li>
                            <li>• FOIR: 40-50% of income allowed for EMI</li>
                            <li>• Higher income = Higher eligibility</li>
                            <li>• Co-applicant income adds to capacity</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">📊 Existing Obligations</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Existing EMIs reduce eligibility</li>
                            <li>• Credit card dues impact FOIR</li>
                            <li>• Clear debts for better eligibility</li>
                            <li>• Lower obligations = Higher loan</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🏠 Property & LTV</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• LTV: Up to 90% of property value</li>
                            <li>• Higher property value = Higher loan</li>
                            <li>• Property location and type matter</li>
                            <li>• Valuation by bank required</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">🎯 Age & Tenure</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Max age: 60-65 years</li>
                            <li>• Tenure limited by retirement age</li>
                            <li>• Younger age = Longer tenure</li>
                            <li>• Higher tenure = Higher eligibility</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-red-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">⭐ Credit Score</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• CIBIL score 750+ = Best rates</li>
                            <li>• Higher score = Better eligibility</li>
                            <li>• Score below 700 may reduce eligibility</li>
                            <li>• Regular monitoring recommended</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">💳 Employment Type</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Salaried: Stable income, lower risk</li>
                            <li>• Self-employed: Business income, higher risk</li>
                            <li>• Employment stability matters</li>
                            <li>• 2+ years experience preferred</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FOIR Explanation */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">What is FOIR in Home Loan Eligibility?</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        <strong className="text-gray-300">FOIR (Fixed Obligation to Income Ratio)</strong> is the percentage of your monthly income that lenders allow for EMI payments. This is the most important factor in determining your home loan eligibility.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-[#0f1525] border border-gray-700 rounded-lg p-3">
                            <p className="text-xs text-gray-500">Example Calculation</p>
                            <p className="text-sm text-white mt-1">Monthly Income: ₹50,000</p>
                            <p className="text-sm text-white">FOIR: 45%</p>
                            <p className="text-sm text-white">Max EMI Allowed: ₹22,500</p>
                            <p className="text-sm text-yellow-400 mt-1">Existing EMI: ₹5,000</p>
                            <p className="text-sm text-green-400">Available for Home Loan: ₹17,500</p>
                        </div>
                        <div className="bg-[#0f1525] border border-gray-700 rounded-lg p-3">
                            <p className="text-xs text-gray-500">FOIR Slabs</p>
                            <ul className="text-xs text-gray-400 space-y-1 mt-1">
                                <li>• Income ₹1,00,000+ → FOIR 50%</li>
                                <li>• Income ₹75,000-99,999 → FOIR 48%</li>
                                <li>• Income ₹50,000-74,999 → FOIR 45%</li>
                                <li>• Income ₹30,000-49,999 → FOIR 42%</li>
                                <li>• Income Below ₹30,000 → FOIR 40%</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">* Higher income slabs get higher FOIR as they have more disposable income</p>
                </div>
            </section>

            {/* Eligibility Comparison Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Home Loan Eligibility Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Monthly Income</th>
                                <th className="text-right py-3 px-4 text-gray-400">Eligible Amount (20Y, 9%)</th>
                                <th className="text-right py-3 px-4 text-gray-400">Monthly EMI</th>
                                <th className="text-right py-3 px-4 text-gray-400">EMI to Income Ratio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹30,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹22.5 Lakhs</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹20,243</td>
                                <td className="py-2 px-4 text-right text-green-400">67.5%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹50,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹45 Lakhs</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹40,487</td>
                                <td className="py-2 px-4 text-right text-green-400">81.0%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹75,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹72 Lakhs</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹64,780</td>
                                <td className="py-2 px-4 text-right text-green-400">86.4%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹1,00,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1.2 Crore</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,07,974</td>
                                <td className="py-2 px-4 text-right text-green-400">108.0%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">₹1,50,000</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1.8 Crore</td>
                                <td className="py-2 px-4 text-right text-gray-300">₹1,61,961</td>
                                <td className="py-2 px-4 text-right text-green-400">108.0%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Based on 9% interest rate and 20-year tenure. Income is assumed with no existing EMI.</p>
            </section>

            {/* Tips to Increase Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips to Increase Your Home Loan Eligibility</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Add a Co-Applicant:</strong> Adding a spouse or parent as co-applicant can increase eligibility by 30-50%. Combined income is considered.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Clear Existing Debts:</strong> Pay off personal loans, car loans, and credit card dues before applying for a home loan to reduce your EMI burden.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Improve Credit Score:</strong> A CIBIL score of 750+ not only gets you better rates but also improves your eligibility with most lenders.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose Longer Tenure:</strong> Longer tenure reduces EMI, allowing you to borrow more within your FOIR limit. However, total interest will be higher.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Increase Down Payment:</strong> A higher down payment reduces the loan amount needed, making approval easier and improving your eligibility.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Show Additional Income:</strong> Include rental income, freelance income, or investment income to increase your total monthly income.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes to Avoid When Checking Home Loan Eligibility</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Including All Income Sources:</strong> Always include all income sources (salary, bonuses, rental income, investments) to get accurate eligibility.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring Existing Obligations:</strong> Don't hide existing EMIs or credit card dues. They significantly affect your eligibility.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Not Checking Credit Score:</strong> Check your CIBIL score before applying. A low score can reduce eligibility or lead to rejection.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Multiple Loan Applications:</strong> Avoid applying to multiple lenders simultaneously. Each application hits your credit score.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Overlooking Property Valuation:</strong> Bank valuation may be lower than market price. Get a professional valuation done.</span>
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