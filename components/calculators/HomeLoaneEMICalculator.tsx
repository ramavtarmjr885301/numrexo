"use client";

import { useEffect, useRef, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";
import { calcEmi } from "@/lib/emi";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA_IN = [
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

// US/UK-style FAQ shown for USD, GBP, EUR, CAD and AUD. Every dollar figure below was computed
// with EMI = P*r*(1+r)^n / ((1+r)^n - 1), r = annual rate / 12, rounded to the nearest dollar.
const FAQ_DATA_WEST = [
    {
        q: "What is a home loan EMI calculator?",
        a: "It estimates the fixed monthly installment (EMI) on a mortgage from the loan amount, interest rate and term. In US terms that figure is the principal-and-interest (P&I) payment, and it is only part of what you will actually pay each month: property taxes and homeowners insurance are usually collected on top through an escrow account, and mortgage insurance is added if you put down less than 20%. Treat the result as the floor of your housing cost, not the whole of it.",
    },
    {
        q: "How is home loan EMI calculated?",
        a: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the loan amount, r is the monthly rate (annual rate ÷ 12) and n is the number of monthly payments. For $400,000 at 6.5% over 30 years, r is about 0.5417% and n is 360, which gives $2,528 a month and $510,178 of total interest, more than the amount borrowed. Early payments are mostly interest: in month one, $2,167 of the $2,528 is interest, so the balance falls slowly at first and faster later.",
    },
    {
        q: "What is the current home loan interest rate?",
        a: "Mortgage rates move daily and differ by lender, loan type, credit score, down payment and whether you pay points, so a fixed number on a page like this goes stale quickly. Treat the 5.5% to 7.5% presets as what-if scenarios, not a quote, and ask lenders for written Loan Estimates to see today's rate. What a rate gap is worth, on a $400,000 30-year loan: 6% is $2,398 a month, 6.5% is $2,528 and 7% is $2,661, with total interest of $463,353, $510,178 and $558,036. Each half-point step adds roughly $47,000 to $48,000 of interest over the term.",
    },
    {
        q: "What is the maximum tenure for a home loan?",
        a: "The standard US terms are 30 and 15 years, with 20 and 25 years also offered by many lenders. Thirty years is the usual choice because it gives the lowest required payment; shorter terms raise the monthly payment but cut the interest sharply. This calculator accepts any term in months (for example 360 for 30 years or 180 for 15), so you can test the exact term a lender quotes. Eligible terms and limits vary by lender and loan program.",
    },
    {
        q: "How does credit score affect home loan interest rate?",
        a: "Lenders price risk, and your credit score is one of the main inputs. Many conventional lenders look for roughly 620 or higher, and the best pricing tiers tend to start somewhere around 740, though exact cutoffs vary by lender and program (FHA loans can accept lower scores, with a 3.5% down payment at 580 and above). On $400,000 over 30 years, the gap between 6.5% and 7.5% is $269 a month ($2,528 versus $2,797) and $96,691 of total interest. Check your credit reports for errors before applying, and avoid opening new credit in the months before you do.",
    },
    {
        q: "What is the difference between fixed and adjustable interest rates?",
        a: "A fixed-rate mortgage keeps the same rate, and the same principal-and-interest payment, for the whole term. An adjustable-rate mortgage (ARM) such as a 5/1 holds an introductory rate for five years and then adjusts periodically within the caps written into the loan. Illustration with assumed rates, not a forecast: on $400,000 over 30 years, a fixed 6.5% loan is $2,528 a month, while a 5/1 ARM starting at 5.5% is $2,271 for the first five years. If it then resets to 7.5% on the remaining balance of about $369,842 over 25 years, the payment becomes $2,733, which is $205 above the fixed loan; a reset to 6.5% would give $2,497. An ARM can make sense if you expect to sell or refinance before the reset, but only if you could afford the higher payment.",
    },
    {
        q: "What documents are required for a home loan?",
        a: "Expect to provide a government photo ID, recent pay stubs (commonly the last 30 days), two years of W-2s or tax returns, two months of bank and asset statements, and details of your existing debts. Self-employed borrowers usually supply two years of personal and business tax returns and often a profit-and-loss statement. Pre-approval is not the same as pre-qualification: pre-qualification is a quick estimate from figures you state, while pre-approval means the lender has verified your documents and pulled your credit, and it produces a letter sellers take seriously. Get pre-approved before you make offers; it also tells you your real rate. Requirements vary by lender and country.",
    },
    {
        q: "How much home loan can I get?",
        a: "Lenders focus on debt-to-income (DTI): your total monthly debt payments, including the new mortgage, divided by gross monthly income. About 43% is a common upper guideline; some programs allow more and some lenders want less. Worked example with stated assumptions: $100,000 gross income is $8,333 a month, and 43% of that is $3,583. Subtract $500 of other debt payments and an assumed $700 for property taxes and insurance, and about $2,383 is left for principal and interest, which at 6.5% over 30 years supports a loan of roughly $377,000. Add your down payment to get a price range. Being approved for an amount is not the same as being comfortable paying it.",
    },
    {
        q: "What are processing fees for home loans?",
        a: "Closing costs commonly run about 2% to 5% of the loan amount, which is $8,000 to $20,000 on a $400,000 loan, and cover lender fees, appraisal, title and recording. Lender fees such as origination or processing are one line inside that total; some lenders quote them around 0.5% to 1% of the loan, and 1% of $400,000 is $4,000, the figure pre-filled in the fee box above. Discount points are separate: one point is 1% of the loan, paid up front to lower the rate, and it only pays off if you keep the loan past the break-even (point cost divided by monthly savings). Compare Loan Estimates line by line.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "Shorter term means a higher payment but much less interest. On $400,000 at 6.5%: 15 years is $3,484 a month with $227,197 of interest; 20 years is $2,982 and $315,750; 25 years is $2,701 and $410,249; 30 years is $2,528 and $510,178. Moving from 30 years to 15 raises the payment by about $956 but cuts interest by $282,981. This compares the same rate for every term; in practice shorter loans often carry a somewhat lower rate, which would widen the gap.",
    },
    {
        q: "Can I prepay my home loan?",
        a: "Yes, and extra principal payments are the most direct way to cut interest. Many US mortgages carry no prepayment penalty, but check your note, and tell your servicer to apply any extra amount to principal rather than hold it toward the next payment. On $400,000 at 6.5% over 30 years, adding $200 a month pays the loan off in about 24 years 5 months instead of 30 and saves roughly $111,892 of interest. Adding $500 a month pays it off in about 19 years 5 months and saves roughly $205,557.",
    },
    {
        q: "What is the EMI for a $300,000 home loan?",
        a: "For a $300,000 loan at 6.5% (principal and interest only, an assumed rate for illustration): 15 years is $2,613 a month with $170,398 of interest; 20 years is $2,237 and $236,813; 30 years is $1,896 and $382,633. Add property taxes and homeowners insurance, plus mortgage insurance if you put down less than 20%, for the full monthly cost. Use the calculator to check other amounts and terms.",
    },
    {
        q: "What is the difference between home loan and mortgage?",
        a: "In everyday US usage the two terms mean the same thing; strictly, the loan is the debt and the mortgage is the lien that secures it against the property. A more useful distinction for your budget is P&I versus PITI. This calculator's EMI is principal and interest only. PITI adds property taxes and homeowners insurance, which are typically paid monthly into an escrow account run by your servicer; HOA dues, if any, are usually separate. Illustration: P&I of $2,528 on $400,000, plus an assumed $400 a month in taxes and $150 in insurance (both vary widely by location), is about $3,078 a month before any mortgage insurance. Escrow is reviewed regularly, so your total payment can change even on a fixed-rate loan.",
    },
    {
        q: "What is LTV ratio in home loans?",
        a: "Loan-to-value (LTV) is the loan amount divided by the property value. On a $500,000 home, 20% down ($100,000) means a $400,000 loan and an 80% LTV. On a conventional loan, putting down less than 20% generally means paying private mortgage insurance (PMI), which protects the lender, not you. With 5% down the loan is $475,000 (95% LTV): principal and interest at 6.5% is $3,002 a month versus $2,528, a $474 difference, with PMI on top. PMI is priced as an annual percentage of the loan that depends on credit score and down payment; at an assumed 0.5% it would be $2,375 a year, or about $198 a month. You can generally request removal once the balance reaches 80% of the original value, and it must end automatically at 78% on the original schedule if you are current (US Homeowners Protection Act). FHA loans follow different mortgage insurance rules.",
    },
    {
        q: "How to reduce home loan EMI?",
        a: "Roughly in order of effect: a larger down payment, which shrinks the loan and may remove PMI; a higher credit score before you lock a rate; Loan Estimates from several lenders gathered within a short window; discount points if you will keep the loan past the break-even; and a longer term, which lowers the payment but adds interest. If rates fall after you buy, refinancing can cut the payment. For example, refinancing a $400,000 balance from 7.5% to 6.5% over a new 30 years lowers principal and interest from $2,797 to $2,528, a saving of $269 a month. If closing costs are 3% ($12,000), the break-even is about 45 months. This is simplified: restarting a 30-year clock can increase total interest, so consider a term that keeps your original payoff date.",
    },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

const FAQ_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA_WEST.map((item) => ({
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

// ─── Market profiles ──────────────────────────────────────────────────────────
// "india" is used only when INR is selected; every other currency is "west".
// The SSR default is USD, so the first render always uses PROFILES.west.

const PROFILES = {
    india: {
        amount: "5000000",
        rate: "8.5",
        tenure: "240",
        fee: "",
        amountPresets: [1000000, 2500000, 5000000, 7500000, 10000000],
        ratePresets: [7, 8, 9, 10, 11],
        tenurePresets: [60, 120, 180, 240, 300, 360],
        yearLabelFrom: 240, // tenure presets at or above this many months are labelled in years
        amountStep: "100000",
        ratePlaceholder: "e.g., 9",
        feePlaceholder: "e.g., 25000",
        feeLabel: "Processing Fee",
        feeHint: "Processing fees typically range from 0.5% to 1% of loan amount",
    },
    west: {
        amount: "400000",
        rate: "6.5",
        tenure: "360",
        fee: "4000", // 1% of the default amount; the fee input takes a currency amount, not a percent
        amountPresets: [200000, 300000, 400000, 600000, 800000],
        ratePresets: [5.5, 6, 6.5, 7, 7.5],
        tenurePresets: [120, 180, 240, 300, 360],
        yearLabelFrom: 120,
        amountStep: "10000",
        ratePlaceholder: "e.g., 6.5",
        feePlaceholder: "e.g., 4000",
        feeLabel: "Origination / Processing Fee",
        feeHint: "Some lenders charge an origination or processing fee, often quoted around 0.5% to 1% of the loan. Total closing costs are commonly about 2% to 5%.",
    },
};

// Base case for the two static comparison tables. Every cell is computed with calcEmi().
const COMPARISON = {
    india: { principal: 5000000, rates: [8, 9, 10, 11], months: 240, tenureRate: 9, tenureYears: [10, 15, 20, 25, 30] },
    west: { principal: 400000, rates: [5.5, 6.5, 7.5, 8.5], months: 360, tenureRate: 6.5, tenureYears: [10, 15, 20, 25, 30] },
};

// Row accent colours, cheapest to costliest (reused by both markets).
const RATE_ROW_COLORS = ["text-green-600", "text-yellow-700", "text-orange-600", "text-red-600"];
const RATE_INTEREST_COLORS = ["text-yellow-700", "text-orange-600", "text-red-600", "text-red-600"];
const TENURE_ROW_COLORS = ["text-blue-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const TENURE_INTEREST_COLORS = ["text-green-600", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];

// Total-interest cost of a half-point rate gap on the west base loan (used in the lender-comparison tip).
const WEST_HALF_POINT_GAP =
    calcEmi(COMPARISON.west.principal, 7, COMPARISON.west.months).totalInterest -
    calcEmi(COMPARISON.west.principal, 6.5, COMPARISON.west.months).totalInterest;

// Pure calculation, shared by the live-recalc effect and the first render so the page
// ships with a worked result already in the HTML (same maths as before, just hoisted).
function computeEmiResult(loanAmount: string, interestRate: string, tenure: string, processingFee: string) {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const months = parseFloat(tenure);
    const fee = parseFloat(processingFee) || 0;

    if (isNaN(principal) || principal <= 0) {
        return null;
    }

    if (isNaN(rate) || rate < 0) {
        return null;
    }

    if (isNaN(months) || months <= 0) {
        return null;
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
        ratingColor = "text-green-600";
    } else if (emiToIncomeRatio <= 0.3) {
        rating = "Affordable ★★★★";
        ratingColor = "text-blue-600";
    } else if (emiToIncomeRatio <= 0.4) {
        rating = "Moderate ★★★";
        ratingColor = "text-yellow-700";
    } else if (emiToIncomeRatio <= 0.5) {
        rating = "Stretching ★★";
        ratingColor = "text-orange-600";
    } else {
        rating = "Highly Stretching ★";
        ratingColor = "text-red-600";
    }

    return {
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
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeLoanEMICalculator() {
    const { symbol, money, compact, market } = useCurrency();
    const isIn = market === "india";
    const profile = PROFILES[market];
    const cmp = COMPARISON[market];
    const faqs = isIn ? FAQ_DATA_IN : FAQ_DATA_WEST;

    // SSR default is USD, so start from the west profile and show a worked result on first render.
    const [loanAmount, setLoanAmount] = useState(PROFILES.west.amount);
    const [interestRate, setInterestRate] = useState(PROFILES.west.rate);
    const [tenure, setTenure] = useState(PROFILES.west.tenure);
    const [processingFee, setProcessingFee] = useState(PROFILES.west.fee);
    const [result, setResult] = useState<any>(() =>
        computeEmiResult(PROFILES.west.amount, PROFILES.west.rate, PROFILES.west.tenure, PROFILES.west.fee)
    );
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const touched = useRef(false);

    const applyDefaults = (m: keyof typeof PROFILES) => {
        const p = PROFILES[m];
        setLoanAmount(p.amount);
        setInterestRate(p.rate);
        setTenure(p.tenure);
        setProcessingFee(p.fee);
    };

    // Switching currency swaps in that market's defaults, unless the visitor already typed something.
    useEffect(() => {
        if (touched.current) return;
        applyDefaults(market);
    }, [market]);

    const resetForm = () => {
        touched.current = false;
        applyDefaults(market);
    };

    const calculateEMI = () => {
        setResult(computeEmiResult(loanAmount, interestRate, tenure, processingFee));
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateEMI(); }, [loanAmount, interestRate, tenure, processingFee]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/finance" itemProp="item" className="hover:text-ink-soft">
                            <span itemProp="name">Finance Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-ink-soft">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-ink-soft">Home Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <div>
                            <h3 className="font-semibold">Home Loan EMI Calculator</h3>
                            <p className="text-xs text-ink-faint mt-1">Calculate your monthly mortgage payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        {/* Loan Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Loan Amount ({symbol})</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step={profile.amountStep}
                                    placeholder={`e.g., ${profile.amount}`}
                                    value={loanAmount}
                                    onChange={(e) => { touched.current = true; setLoanAmount(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.amountPresets.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => { touched.current = true; setLoanAmount(amount.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
                                    >
                                        {compact(amount)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={profile.ratePlaceholder}
                                    value={interestRate}
                                    onChange={(e) => { touched.current = true; setInterestRate(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.ratePresets.map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => { touched.current = true; setInterestRate(rate.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
                                    >
                                        {rate}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Loan Tenure */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Loan Tenure (months)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    placeholder={`e.g., ${profile.tenure}`}
                                    value={tenure}
                                    onChange={(e) => { touched.current = true; setTenure(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">months</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.tenurePresets.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => { touched.current = true; setTenure(month.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
                                    >
                                        {month >= profile.yearLabelFrom ? `${month / 12}Y` : `${month}M`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Processing Fee (Optional) */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">{profile.feeLabel} ({symbol}) <span className="text-ink-faint">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="100"
                                    placeholder={profile.feePlaceholder}
                                    value={processingFee}
                                    onChange={(e) => { touched.current = true; setProcessingFee(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                            <p className="text-xs text-ink-faint mt-1">{profile.feeHint}</p>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3">
                            <button
                                onClick={calculateEMI}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Calculate EMI →
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
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
                        value: money(result.emi),
                        color: "text-blue-600"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Affordability Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: money(result.totalPayment), valueColor: "text-yellow-700" },
                        { label: "Total Interest", value: money(result.totalInterest), valueColor: "text-orange-600" },
                        { label: profile.feeLabel, value: money(result.processingFee), valueColor: "text-purple-600" },
                        { label: "Total Cost with Fee", value: money(result.totalCostWithFee), valueColor: "text-red-600" },
                        { label: "Principal Amount", value: money(result.principal) },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months / 12).toFixed(0)} years)` },
                        { label: "Principal % of Total", value: `${result.principalPercentage.toFixed(1)}%`, valueColor: "text-green-600" },
                        { label: "Interest % of Total", value: `${result.interestPercentage.toFixed(1)}%`, valueColor: "text-orange-600" },
                        { label: "Average Interest per Month", value: money(result.averageInterest) },
                    ] : []}
                />
            </div>

            {/* Amortization Schedule */}
            {result && result.schedule && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-ink mb-4">Amortization Schedule</h2>
                    <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-surface">
                                    <tr className="border-b border-hairline">
                                        <th className="text-left py-3 px-4 text-ink-faint">Month</th>
                                        <th className="text-right py-3 px-4 text-ink-faint">EMI</th>
                                        <th className="text-right py-3 px-4 text-ink-faint">Principal</th>
                                        <th className="text-right py-3 px-4 text-ink-faint">Interest</th>
                                        <th className="text-right py-3 px-4 text-ink-faint">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.schedule.map((row: any) => (
                                        <tr key={row.month} className="border-b border-hairline hover:bg-cream">
                                            <td className="py-2 px-4 text-ink-soft">{row.month}</td>
                                            <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                            <td className="py-2 px-4 text-right text-green-600">{money(row.principal, 0)}</td>
                                            <td className="py-2 px-4 text-right text-orange-600">{money(row.interest, 0)}</td>
                                            <td className="py-2 px-4 text-right text-ink-soft">{money(row.balance, 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-xs text-ink-faint mt-2">Showing first 60 months of amortization schedule</p>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Home Loan EMI Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    A home loan is usually the longest financial commitment most people ever take on — 15, 20, sometimes 30 years — which means small differences in rate or tenure compound into very large amounts over the life of the loan. A quarter-point on the interest rate barely changes the EMI you see month to month, but it can add up to {isIn ? "lakhs over two decades" : "tens of thousands over the life of the loan"}.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    Enter the loan amount, interest rate, tenure, and any processing fee, and this calculator works out your EMI, total interest payable, total cost including fees, and a year-by-year amortization schedule showing how slowly the principal actually falls in the early years of a long mortgage.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    It's worth running the numbers at a couple of different tenures before you sign — a shorter loan feels heavier on the EMI but can cut the total interest paid by a striking amount, which the schedule below makes easy to see.
                </p>
            </section>

            {/* Types of Home Loans */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Types of Home Loans</h2>
                {isIn ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-blue-200 transition-all">
                            <h3 className="text-sm font-semibold text-blue-600 mb-2">🏠 Fixed Rate</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Interest rate remains constant</li>
                                <li>• Predictable monthly payments</li>
                                <li>• Higher rates than floating</li>
                                <li>• Best for long-term stability</li>
                                <li>• No rate change risk</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-green-200 transition-all">
                            <h3 className="text-sm font-semibold text-green-600 mb-2">📈 Floating Rate</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Rate changes with market</li>
                                <li>• Lower initial rates</li>
                                <li>• Potential for savings</li>
                                <li>• Most common in India</li>
                                <li>• Rate reset periodically</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-yellow-200 transition-all">
                            <h3 className="text-sm font-semibold text-yellow-700 mb-2">🔒 Hybrid</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Fixed for initial period</li>
                                <li>• Then converts to floating</li>
                                <li>• Best of both worlds</li>
                                <li>• Initial payment certainty</li>
                                <li>• Long-term flexibility</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-blue-200 transition-all">
                            <h3 className="text-sm font-semibold text-blue-600 mb-2">🏠 Fixed Rate (30 / 15-Year)</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Same rate for the whole term</li>
                                <li>• Predictable principal and interest</li>
                                <li>• 30-year: lowest monthly payment</li>
                                <li>• 15-year: higher payment, far less interest</li>
                                <li>• Refinance if rates fall later</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-green-200 transition-all">
                            <h3 className="text-sm font-semibold text-green-600 mb-2">📈 Adjustable Rate (ARM)</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Rate adjusts after an initial period</li>
                                <li>• Introductory rate is usually lower</li>
                                <li>• Periodic and lifetime caps apply</li>
                                <li>• Payment can rise at each reset</li>
                                <li>• Suits shorter planned ownership</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-yellow-200 transition-all">
                            <h3 className="text-sm font-semibold text-yellow-700 mb-2">🔒 Hybrid ARM (e.g., 5/1)</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Fixed for the first 5 years</li>
                                <li>• Then adjusts once a year</li>
                                <li>• Payment certainty at the start</li>
                                <li>• Check the cap on the first reset</li>
                                <li>• Model the post-reset payment first</li>
                            </ul>
                        </div>
                    </div>
                )}
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Home Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed">Enter the <strong className="text-ink">loan amount</strong> you expect to borrow — the preset buttons cover common property price brackets if you want a quick starting point. Then enter the <strong className="text-ink">interest rate</strong> your bank has quoted and whether it's fixed or floating, since that affects how the rate might move later.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Pick the <strong className="text-ink">tenure</strong> in months — given how long home loans run, it's worth testing a few tenures to see the real trade-off between monthly affordability and total interest. If your lender charges a <strong className="text-ink">processing fee</strong>, add it in to see the full cost of the loan, not just the EMI.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Click <strong className="text-ink">Calculate EMI</strong> for the monthly payment, total interest, and the full amortization schedule. The <strong className="text-ink">affordability rating</strong> is a useful check against your income, and <strong className="text-ink">Reset</strong> lets you compare a different lender's terms from scratch.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Home Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ See Decades of Interest in One Table</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">A mortgage's total interest is easy to underestimate when you're only looking at the monthly figure. The amortization schedule shows the real number across the full tenure.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ A Quarter-Point Matters More Than It Looks</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Over a 20-year tenure, even a small rate difference between lenders compounds into a meaningful sum. Worth comparing before you commit to one bank.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Tenure Optimization</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Find the ideal tenure that balances affordable EMI with total interest cost. Understand the trade-off between lower EMIs and higher total interest.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Financial Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Plan your long-term financial goals. Understand the impact of home loan EMI on your savings and investment capacity.</p>
                    </div>
                </div>
            </section>

            {/* Home Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Home Loan EMI Formula</h2>
                <div className="bg-surface border border-hairline rounded-xl p-5 text-center">
                    <p className="text-ink font-mono text-lg mb-3">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                        <div>
                            <span className="text-blue-600 font-bold">EMI</span>
                            <span className="text-ink-faint block text-xs">Monthly Payment</span>
                        </div>
                        <div>
                            <span className="text-blue-600 font-bold">P</span>
                            <span className="text-ink-faint block text-xs">Principal (Loan Amount)</span>
                        </div>
                        <div>
                            <span className="text-blue-600 font-bold">r</span>
                            <span className="text-ink-faint block text-xs">Monthly Interest Rate</span>
                        </div>
                        <div>
                            <span className="text-blue-600 font-bold">n</span>
                            <span className="text-ink-faint block text-xs">Total Payments (months)</span>
                        </div>
                    </div>
                    <p className="text-ink-faint text-xs mt-4">The calculator uses the reducing balance method for accurate EMI calculation.</p>
                </div>
            </section>

            {/* Interest Rate Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Interest Rate Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Interest Rate</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(cmp.principal)}, {cmp.months / 12}Y)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cmp.rates.map((rate, i) => {
                                const row = calcEmi(cmp.principal, rate, cmp.months);
                                return (
                                    <tr key={rate} className="border-b border-hairline hover:bg-cream">
                                        <td className={`py-2 px-4 font-bold ${RATE_ROW_COLORS[i]}`}>{rate}%</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                        <td className={`py-2 px-4 text-right ${RATE_INTEREST_COLORS[i]}`}>{compact(row.totalInterest)}</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{compact(row.totalPayment)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Comparison shows impact of interest rate on EMI and total cost for a {compact(cmp.principal)} loan over {cmp.months / 12} years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Tenure Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Tenure</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(cmp.principal)}, {cmp.tenureRate}%)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cmp.tenureYears.map((years, i) => {
                                const row = calcEmi(cmp.principal, cmp.tenureRate, years * 12);
                                return (
                                    <tr key={years} className="border-b border-hairline hover:bg-cream">
                                        <td className={`py-2 px-4 font-bold ${TENURE_ROW_COLORS[i]}`}>{years} Years</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                        <td className={`py-2 px-4 text-right ${TENURE_INTEREST_COLORS[i]}`}>{compact(row.totalInterest)}</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{compact(row.totalPayment)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Longer tenures reduce EMI but significantly increase total interest paid</p>
            </section>

            {/* Home Loan Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Home Loan Eligibility Criteria</h2>
                {isIn ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Salaried Individuals</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 21-60 years</li>
                                <li>• Minimum monthly income: {money(25000, 0)}</li>
                                <li>• Work experience: 2+ years</li>
                                <li>• CIBIL score: 700+ preferred</li>
                                <li>• Valid identity and address proof</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-yellow-700 mb-2">✅ Self-Employed</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 25-65 years</li>
                                <li>• ITR filing: 3+ years</li>
                                <li>• Business vintage: 5+ years</li>
                                <li>• Annual turnover: {compact(1000000)}+</li>
                                <li>• Profitability track record</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Salaried Borrowers</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Credit score: roughly 620+ for most conventional loans; 740+ tends to get the best pricing</li>
                                <li>• Debt-to-income: about 43% or lower is a common guideline</li>
                                <li>• Employment: about 2 years of steady work history</li>
                                <li>• Down payment: 20% avoids PMI; less is possible with PMI</li>
                                <li>• Recent pay stubs, W-2s and bank statements</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-yellow-700 mb-2">✅ Self-Employed Borrowers</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Typically 2 years of personal and business tax returns</li>
                                <li>• Lenders usually average your net income over those years</li>
                                <li>• Profit-and-loss statement and business bank statements</li>
                                <li>• Same credit score and debt-to-income checks apply</li>
                                <li>• A larger down payment or reserves can help</li>
                            </ul>
                        </div>
                    </div>
                )}
                <p className="text-xs text-ink-faint mt-3">* Eligibility criteria vary by lender. Always check with your bank for specific requirements.</p>
            </section>

            {/* Tips for Lower Home Loan EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Tips for Lower Home Loan EMI</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Improve Credit Score:</strong> {isIn ? "A higher credit score (750+) qualifies you for lower interest rates." : "A higher credit score (740+ often reaches the best pricing tiers) qualifies you for lower interest rates."} Check your score regularly and correct any errors.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Choose Longer Tenure:</strong> While total interest is higher, longer tenure significantly reduces monthly EMI. Ideal for tight monthly budgets.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Make Larger Down Payment:</strong> A higher down payment reduces the loan amount, lowering both EMI and total interest.{!isIn && " Putting 20% down generally also avoids private mortgage insurance (PMI) on a conventional loan."}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Compare Multiple Lenders:</strong> Different lenders offer different rates. {isIn ? "Even a 0.5% difference can save lakhs in interest." : `On a ${compact(COMPARISON.west.principal)} ${COMPARISON.west.months / 12}-year loan, a half-point rate difference (6.5% vs 7%) is about ${money(WEST_HALF_POINT_GAP, 0)} of total interest.`}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIn ? (
                            <span><strong className="text-ink-soft">Consider Floating Rate:</strong> Floating rates are typically lower than fixed rates and can save you money over the long term.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Weigh a 15-Year Term or an ARM:</strong> A 15-year fixed loan raises the payment but cuts interest sharply; an ARM starts lower but can reset higher, so only consider one if you could afford the higher payment.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIn ? (
                            <span><strong className="text-ink-soft">Make Partial Prepayments:</strong> Use bonuses or savings to make partial prepayments, reducing your principal and future EMIs.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Make Extra Principal Payments:</strong> Use bonuses or savings to pay extra toward principal, which shortens the loan and cuts interest. Confirm your loan has no prepayment penalty and that extra payments are applied to principal.</span>
                        )}
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Common Mistakes to Avoid When Taking a Home Loan</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Over-borrowing:</strong> Borrow only what you need. Higher loan amount means higher EMI and more interest. Use our calculator to find your comfortable EMI.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span>{isIn ? (<><strong className="text-ink-soft">Ignoring Processing Fees:</strong> Processing fees add to your loan cost. Always factor them into your total loan cost while comparing lenders.</>) : (<><strong className="text-ink-soft">Ignoring Closing Costs and Escrow:</strong> Closing costs commonly run about 2% to 5% of the loan, and property taxes and homeowners insurance (escrow) are paid on top of the EMI shown here. Compare lenders on the full Loan Estimate and budget for the total monthly payment.</>)}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Choosing the Wrong Tenure:</strong> Choose a tenure that balances EMI affordability with total interest. Don't just go for the lowest EMI without considering total cost.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Not Checking Hidden Charges:</strong> Read your loan agreement carefully for prepayment penalties, late payment fees, and other charges.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span>{isIn ? (<><strong className="text-ink-soft">Multiple Loan Applications:</strong> Multiple loan applications lower your credit score. Research thoroughly and apply to select lenders only.</>) : (<><strong className="text-ink-soft">Spreading Applications Over Months:</strong> Credit-scoring models generally treat several mortgage inquiries made within a short window (commonly 14 to 45 days) as one, so gather your quotes close together rather than over several months.</>)}</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">
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