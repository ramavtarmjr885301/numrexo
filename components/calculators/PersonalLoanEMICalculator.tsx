"use client";

import { useEffect, useRef, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";
import { calcEmi } from "@/lib/emi";

// ─── Market profiles ──────────────────────────────────────────────────────────
// Defaults, presets and example-table settings are sized per market so a US/UK
// visitor never sees rupee-scale numbers (and an INR visitor never sees $10,000).

const PROFILES = {
    india: {
        amount: "500000",
        rate: "12",
        tenure: "36",
        amounts: [100000, 250000, 500000, 1000000, 2000000],
        rates: [10, 12, 14, 16, 18, 20],
        tenures: [12, 24, 36, 48, 60],
        cmpAmount: 500000,
        cmpRates: [10, 12, 14, 16, 18],
        cmpMonths: 36,
        cmpTenures: [12, 24, 36, 48, 60],
        cmpTenureRate: 12,
    },
    west: {
        amount: "10000",
        rate: "12",
        tenure: "36",
        amounts: [2000, 5000, 10000, 15000, 25000],
        rates: [8, 10, 12, 15, 18],
        tenures: [12, 24, 36, 48, 60],
        cmpAmount: 10000,
        cmpRates: [8, 10, 12, 15, 18],
        cmpMonths: 36,
        cmpTenures: [12, 24, 36, 48, 60],
        cmpTenureRate: 12,
    },
};

// Label colours for the comparison tables (green = cheap ... red = expensive).
const RATE_LABEL_COLORS = ["text-green-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const RATE_INTEREST_COLORS = ["text-yellow-700", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];
const TENURE_LABEL_COLORS = ["text-blue-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const TENURE_INTEREST_COLORS = ["text-green-600", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA_IN = [
    {
        q: "What is a personal loan EMI calculator?",
        a: "It shows what an unsecured loan will actually cost you each month. A personal loan differs from a home or vehicle loan in one decisive way: there is no asset behind it, so the lender prices in the risk. That is why the rate is two to three times a home loan rate, why approval leans almost entirely on your income and credit record, and why the total interest deserves a hard look before you sign.",
    },
    {
        q: "How is personal loan EMI calculated?",
        a: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), with r the monthly rate and n the number of months. The arithmetic is the same as any other loan; what makes a personal loan expensive is the rate that goes into it. ₹5,00,000 over 3 years costs ₹16,607 a month at 12% and ₹17,579 at 16% — a difference of under ₹1,000 a month, but ₹34,969 more in interest over the term.",
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
        a: "Because nothing is pledged, the lender is underwriting you rather than an asset, so the file is about income stability: Aadhaar and PAN, address proof, three months of salary slips and six months of bank statements, plus Form 16 or the last two years' ITR if you are self-employed. Lenders look closely at how long you have been with your current employer and whether the salary credit is regular.",
    },
    {
        q: "How much personal loan can I get?",
        a: "Most lenders work from a multiple of monthly income — commonly 10 to 24 times net salary — and then cap it so that all your EMIs together stay under 40-50% of income. An existing car loan or a large credit card balance therefore reduces what you can borrow here, rupee for rupee. Improving that ratio before you apply raises the sanction more reliably than anything else.",
    },
    {
        q: "What are processing fees for personal loans?",
        a: "Typically 1-3% of the loan plus GST, higher than on a secured loan, and usually deducted from the amount disbursed rather than billed separately. On ₹5,00,000 a 2.5% fee means ₹12,500 plus GST never reaches your account, so you repay interest on money you did not receive. Compare lenders on the amount that actually lands, not the headline rate.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "On ₹5,00,000 at 12%, one year costs ₹44,424 a month and ₹33,093 in interest; five years drops the EMI to ₹11,122 but the interest rises to ₹1,67,333 — five times as much. Unsecured rates make this trade far more punishing than it is on a home loan, so take the shortest term whose EMI you can actually sustain.",
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
        a: "Refinancing to a lower rate is usually the biggest single win on an unsecured loan, and a balance transfer to a bank you already have a relationship with is often cheaper than the NBFC that gave you the original. Beyond that: pay down a credit card first if it is running at a higher rate, prepay in part when a bonus arrives, and extend the tenure only as a last resort — on these rates it costs more than it looks.",
    },
];

// US/UK-style answers. Every dollar figure below was computed with the standard EMI formula
// (fixed rate, monthly payments, no fees unless stated) — see the stated assumptions in each answer.
const FAQ_DATA_WEST = [
    {
        q: "What is a personal loan EMI calculator?",
        a: "It shows the fixed monthly payment on an unsecured installment loan, often called the EMI (equated monthly installment). Because nothing is pledged as collateral, lenders price a personal loan on your credit score and income. That is why APRs usually run well above mortgage or auto-loan rates, and why the total interest deserves a hard look before you sign.",
    },
    {
        q: "How is personal loan EMI calculated?",
        a: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the amount borrowed, r is the monthly rate (APR ÷ 12) and n is the number of monthly payments. Assuming $10,000 over 36 months with a fixed rate and no fees: $332.14 a month at 12% and $351.57 at 16%. That is $19.43 more each month and $699.38 more interest over the term ($2,656.53 versus $1,957.15).",
    },
    {
        q: "What is a good personal loan interest rate?",
        a: "Unsecured personal loan APRs commonly run from roughly 7% to 36%, and your credit score does most of the sorting. Strong credit tends to land near the bottom of that range and weak credit near the top. The gap is large in dollars: on $10,000 over 36 months, 8% costs $313.36 a month and $1,281.09 in interest, while 18% costs $361.52 a month and $3,014.86. Compare APRs rather than headline rates, because the APR is meant to fold in fees such as origination.",
    },
    {
        q: "How does credit score affect personal loan EMI?",
        a: "It is the biggest single lever you control. FICO scores run from 300 to 850, and FICO's published bands are Poor (300-579), Fair (580-669), Good (670-739), Very Good (740-799) and Exceptional (800-850). Each lender sets its own pricing tiers, so the cut-offs vary. As an illustration on $10,000 over 36 months, 11% instead of 12% saves $4.76 a month and $171.21 in interest, and 10% instead of 12% saves $9.47 a month and $340.96. Prequalification tools use a soft credit pull that does not affect your score; a formal application usually triggers a hard pull.",
    },
    {
        q: "What is the maximum tenure for a personal loan?",
        a: "Terms commonly run from 12 to 84 months (1 to 7 years), though the range you are offered depends on the lender and the loan size. A longer term lowers the payment and raises the interest. On $10,000 at 12%: 12 months is $888.49 a month with $661.85 in interest, 36 months is $332.14 with $1,957.15, and 84 months is $176.53 with $4,828.30.",
    },
    {
        q: "Can I prepay my personal loan?",
        a: "Often yes, and many lenders charge no prepayment penalty, but some do, so confirm in the loan agreement and ask whether the origination fee is refunded on early payoff. Assuming $10,000 at 12% over 36 months: after 12 payments the balance is $7,055.84 and you have paid $1,041.56 in interest, so paying it off then avoids $915.59 of the $1,957.15 total. Adding an extra $100 every month from the start clears the loan in 27 months and saves $526.23 in interest.",
    },
    {
        q: "What is the difference between flat rate and reducing balance rate?",
        a: "A flat rate charges interest on the original amount for the whole term. A standard APR installment loan charges interest on the balance still owed, which shrinks with each payment. A 12% flat rate on $10,000 for 3 years adds $3,600 in interest, a payment of $377.78, which is equivalent to an APR of about 21.20%. The same 12% on a declining balance is $332.14 a month and $1,957.15 in interest. Always ask for the APR.",
    },
    {
        q: "What documents are required for a personal loan?",
        a: "Because nothing is pledged, the lender is underwriting you rather than an asset, so the file is about income and credit. Expect a government photo ID, proof of address, your Social Security number or tax ID, proof of income (recent pay stubs or W-2s, or tax returns and 1099s if you are self-employed) and often recent bank statements. The lender also verifies employment and runs a credit check; the formal application typically means a hard pull.",
    },
    {
        q: "How much personal loan can I get?",
        a: "Lenders weigh your income, credit score and debt-to-income ratio (DTI, your monthly debt payments divided by gross monthly income), then apply their own limits. As an illustration, assume gross income of $5,000 a month and $900 of existing monthly debt payments, a DTI of 18.0%. Adding the $332.14 payment from a $10,000 loan at 12% over 36 months brings total payments to $1,232.14, a DTI of 24.6%. Lowering existing debt before applying improves that ratio more reliably than anything else.",
    },
    {
        q: "What are processing fees for personal loans?",
        a: "Many lenders charge an origination fee, commonly 1% to 8% of the loan, usually deducted from the amount you receive. Assume a 5% fee on a $10,000 loan at 12% over 36 months: $500 is withheld and $9,500 reaches your account, but you repay $332.14 a month on the full $10,000, an effective rate of about 15.61%. To receive the full $10,000 you would borrow $10,526.32, with a $526.32 fee, a payment of $349.62 and $2,060.16 in interest. Compare lenders on the amount that lands and the APR.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "Assuming $10,000 at 12%: one year costs $888.49 a month and $661.85 in interest; five years drops the payment to $222.44 but raises the interest to $3,346.67, roughly five times as much. Unsecured rates make that trade far more punishing than it is on a mortgage, so take the shortest term whose payment you can sustain.",
    },
    {
        q: "What is the EMI for a $10,000 personal loan?",
        a: "At 12% APR with a fixed rate and no fees: 12 months is $888.49 a month with $661.85 in interest; 24 months is $470.73 with $1,297.63; 36 months is $332.14 with $1,957.15; 60 months is $222.44 with $3,346.67. Use the calculator above to try your own amount, rate and term.",
    },
    {
        q: "Can I get a personal loan with a low credit score?",
        a: "It is possible, but it costs more. Some online lenders and credit unions serve fair-credit borrowers at APRs in the upper part of the 7% to 36% range. For example, $10,000 over 36 months at 30% is $424.52 a month with $5,282.57 in interest, versus $332.14 and $1,957.15 at 12%, which is $3,325.42 more. A co-signer, a smaller amount, a shorter term or a secured loan can help. Use prequalification (a soft pull) to compare offers, and be wary of any lender that asks for an upfront fee before funding.",
    },
    {
        q: "What is the difference between secured and unsecured personal loans?",
        a: "An unsecured loan needs no collateral and is priced on your credit. A secured loan is backed by an asset such as a savings account, a certificate of deposit or a vehicle, which usually earns a lower rate but puts that asset at risk if you default. As an illustration with assumed rates, $10,000 over 36 months at 8% (secured) is $313.36 a month and $1,281.09 in interest, versus $332.14 and $1,957.15 at 12% (unsecured), a $676.06 difference.",
    },
    {
        q: "How to reduce personal loan EMI?",
        a: "Lowering the rate beats everything else: improve your credit score before applying, prequalify with several lenders and ask your bank or credit union what it would offer. Debt consolidation can also help if you carry high-rate card balances. Assume $10,000 repaid over 36 equal payments in both cases (a simplification, since cards normally set minimum payments): at 24% the payment is $392.33, versus $332.14 at 12%, a saving of $60.19 a month and $2,166.68 in interest. Check the origination fee first and avoid running the cards back up. Extending the term lowers the payment but adds interest, and extra payments cut it.",
    },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────
// SSR default is USD, so the structured data describes the west FAQ.

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

// Pure calculation (moved out of the component so the first render can show a worked result).
function buildResult(loanAmount: string, interestRate: string, tenure: string) {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);

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
            ratingColor = "text-green-600";
        } else if (monthlyPayment <= principal * 0.3) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-600";
        } else if (monthlyPayment <= principal * 0.4) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-700";
        } else if (monthlyPayment <= principal * 0.5) {
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
        };
}

export default function PersonalLoanEMICalculator() {
    const { symbol, money, compact, market } = useCurrency();
    const profile = PROFILES[market];
    const isIndia = market === "india";

    // SSR default is USD, so start from the west defaults and show a worked result on first render.
    const [loanAmount, setLoanAmount] = useState(PROFILES.west.amount);
    const [interestRate, setInterestRate] = useState(PROFILES.west.rate);
    const [tenure, setTenure] = useState(PROFILES.west.tenure);
    const [result, setResult] = useState<any>(() => buildResult(PROFILES.west.amount, PROFILES.west.rate, PROFILES.west.tenure));
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const touched = useRef(false);

    // Switching currency swaps in that market's sensible defaults, unless the user has typed their own.
    useEffect(() => {
        if (touched.current) return;
        const d = PROFILES[market];
        setLoanAmount(d.amount);
        setInterestRate(d.rate);
        setTenure(d.tenure);
    }, [market]);

    const resetForm = () => {
        touched.current = false;
        const d = PROFILES[market];
        setLoanAmount(d.amount);
        setInterestRate(d.rate);
        setTenure(d.tenure);
    };

    const calculateEMI = () => {
        setResult(buildResult(loanAmount, interestRate, tenure));
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateEMI(); }, [loanAmount, interestRate, tenure]);

    // Preset loan amounts, rates and tenures for the selected market
    const presetAmounts = profile.amounts;
    const presetRates = profile.rates;
    const presetTenures = profile.tenures;

    // Example tables are computed with the same EMI formula, never typed in by hand.
    const rateRows = profile.cmpRates.map((r) => ({ rate: r, ...calcEmi(profile.cmpAmount, r, profile.cmpMonths) }));
    const tenureRows = profile.cmpTenures.map((m) => ({ months: m, ...calcEmi(profile.cmpAmount, profile.cmpTenureRate, m) }));
    const cmpYears = profile.cmpMonths / 12;
    const feeExample = profile.cmpAmount * 0.05;
    const onePointSaving = calcEmi(profile.cmpAmount, 12, profile.cmpMonths).totalInterest - calcEmi(profile.cmpAmount, 11, profile.cmpMonths).totalInterest;

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
                        <span itemProp="name" className="text-ink-soft">Personal Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <div>
                            <h3 className="font-semibold">Personal Loan EMI Calculator</h3>
                            <p className="text-xs text-ink-faint mt-1">Calculate your monthly loan payments</p>
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
                                    step="1000"
                                    placeholder={`e.g., ${profile.amount}`}
                                    value={loanAmount}
                                    onChange={(e) => { touched.current = true; setLoanAmount(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetAmounts.map((amount) => (
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
                                    placeholder={`e.g., ${profile.rate}`}
                                    value={interestRate}
                                    onChange={(e) => { touched.current = true; setInterestRate(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presetRates.map((rate) => (
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
                                {presetTenures.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => { touched.current = true; setTenure(month.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
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
                    emptyIcon="💰"
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
                        { label: "Principal Amount", value: money(result.principal) },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months` },
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
                <h2 className="text-xl font-semibold text-ink mb-3">About Personal Loan EMI Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    A personal loan isn't backed by any asset, which is exactly why it costs more than a car or home loan for the same borrower — the lender has nothing to repossess if repayment stops, so the rate carries that risk instead. That makes the tenure and rate you accept matter more here than almost anywhere else, since there's no collateral cushioning the arithmetic.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    Enter the amount you need, the rate you've been offered, and the tenure, and this calculator breaks down the EMI, the total interest you'll pay over the loan, and a full amortization schedule showing how much of each payment goes toward the principal versus the interest.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    Because unsecured loans are priced almost entirely on your credit profile, it's worth running the numbers at a couple of different rates — even a one-point difference compounds into real money over a multi-year personal loan.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Personal Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed">Type in the <strong className="text-ink">loan amount</strong> you're considering, or tap one of the preset figures to start from a round number. Next, enter the <strong className="text-ink">annual interest rate</strong> your lender has quoted — since this is unsecured debt, that rate can vary a lot between lenders for the same applicant, so it's worth checking more than one offer.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Choose the <strong className="text-ink">tenure</strong> in months. A shorter tenure means a bigger EMI but noticeably less interest paid overall — try a couple of tenures back to back to feel out that trade-off before committing.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Click <strong className="text-ink">Calculate EMI</strong> to see the monthly payment, total interest, and the full repayment schedule. Check the <strong className="text-ink">affordability rating</strong> against your other monthly commitments, and use <strong className="text-ink">Reset</strong> whenever you want to compare a different offer.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Personal Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Know the Real Cost of Going Unsecured</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Personal loan rates run well above secured loans precisely because there's no collateral. See the actual cost of that before deciding this is the right way to fund the expense.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Shop the Rate, Not Just the Approval</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Pre-approved offers are convenient but rarely the cheapest. Run the same amount through a couple of quotes — on unsecured debt, lenders price the same applicant very differently.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Tenure Optimization</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Find the ideal tenure that balances affordable EMI with total interest cost. Understand the trade-off between lower EMIs and higher total interest over longer tenures.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Financial Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Plan your long-term financial goals. Understand the impact of EMI on your savings and investment capacity. Make smarter borrowing decisions for your financial future.</p>
                    </div>
                </div>
            </section>

            {/* EMI Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Personal Loan EMI Formula</h2>
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
                    <p className="text-ink-faint text-xs mt-4">Interest accrues on the balance outstanding, so an early prepayment saves more than the same amount paid later.</p>
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
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(profile.cmpAmount)}, {cmpYears}Y)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rateRows.map((row, i) => (
                                <tr key={row.rate} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 font-bold ${RATE_LABEL_COLORS[i]}`}>{row.rate}%</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className={`py-2 px-4 text-right ${RATE_INTEREST_COLORS[i]}`}>{money(row.totalInterest, 0)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.totalPayment, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Comparison shows impact of interest rate on EMI and total cost for a {compact(profile.cmpAmount)} loan over {cmpYears} years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Tenure Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Tenure</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(profile.cmpAmount)}, {profile.cmpTenureRate}%)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenureRows.map((row, i) => (
                                <tr key={row.months} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 font-bold ${TENURE_LABEL_COLORS[i]}`}>{row.months} Months</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className={`py-2 px-4 text-right ${TENURE_INTEREST_COLORS[i]}`}>{money(row.totalInterest, 0)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.totalPayment, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* At unsecured rates, each extra year of tenure costs far more than it does on a secured loan</p>
            </section>

            {/* Eligibility Criteria */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Personal Loan Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Salaried Individuals</h3>
                        {isIndia ? (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 21-60 years</li>
                                <li>• Minimum monthly income: {money(25000, 0)}</li>
                                <li>• Work experience: 1+ years (6+ months in current job)</li>
                                <li>• CIBIL score: 700+ preferred</li>
                                <li>• Valid identity and address proof</li>
                            </ul>
                        ) : (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Legal adult age where you live</li>
                                <li>• Steady, verifiable income (pay stubs or W-2)</li>
                                <li>• Stable employment history, with time in your current job</li>
                                <li>• Credit score: FICO 670+ (Good) tends to unlock the best rates; some lenders approve fair credit at higher APRs</li>
                                <li>• Debt-to-income ratio: lower is better, and each lender sets its own limit</li>
                                <li>• Government photo ID and proof of address</li>
                            </ul>
                        )}
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✅ Self-Employed</h3>
                        {isIndia ? (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 25-65 years</li>
                                <li>• ITR filing: 2+ years</li>
                                <li>• Business vintage: 3+ years</li>
                                <li>• Annual turnover: {compact(500000)}+</li>
                                <li>• Profitability track record</li>
                            </ul>
                        ) : (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Legal adult age where you live</li>
                                <li>• Two years of tax returns or equivalent income records</li>
                                <li>• Bank statements showing consistent deposits</li>
                                <li>• Stable or growing net income after business expenses</li>
                                <li>• A solid credit score and manageable debt-to-income ratio</li>
                            </ul>
                        )}
                    </div>
                </div>
                <p className="text-xs text-ink-faint mt-3">
                    {isIndia
                        ? "* Banks price unsecured lending lower than NBFCs but approve fewer files. If you hold a salary account, start there."
                        : "* Banks and credit unions can price unsecured loans lower than online lenders but may approve fewer applicants. If you already bank with one, ask for its rate first, then compare with prequalified offers from online lenders."}
                </p>
            </section>

            {/* Tips for Lower EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Tips for Lower Personal Loan EMI</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Improve Credit Score:</strong> With no collateral, your credit score is effectively the security. The gap between a 700 and a 780 file is usually several percentage points here, far wider than on a secured loan.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Improve Credit Score:</strong> With no collateral, your credit score is effectively the security. Lenders price a 700 FICO and a 780 FICO differently, and the gap is wider on unsecured loans than on secured ones. Paying down card balances before you apply is a common way to lift it.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Choose Longer Tenure:</strong> A longer term buys breathing room in the monthly budget and costs a great deal for it. Use it deliberately, not by default.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Compare Multiple Lenders:</strong> Different lenders offer different rates. Even a 1% difference can save thousands in interest. Use our calculator to compare offers.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Compare Multiple Lenders:</strong> Different lenders offer different rates, so use prequalification (a soft credit pull) to collect several quotes. On {money(profile.cmpAmount, 0)} over {profile.cmpMonths} months, 11% instead of 12% saves about {money(onePointSaving, 0)} in interest. Compare APRs, not just rates.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Consider Balance Transfer:</strong> If you have an existing loan, transfer to a lender offering lower rates. This can significantly reduce your EMI and total interest.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Consider Refinancing or Debt Consolidation:</strong> If you carry an existing loan or high-rate credit card debt, a lower-rate personal loan can reduce both your monthly payment and total interest. Check the origination fee before you commit.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Opt for Part Payment:</strong> Many lenders allow part payments without penalty. Use bonuses or salary hikes to reduce principal, lowering your EMI.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Make Extra Payments:</strong> Many lenders allow extra payments without a prepayment penalty. Put bonuses or tax refunds toward principal to shorten the loan, and confirm the terms first.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Choose Add-on Products Wisely:</strong> Some banks offer lower rates if you buy loan insurance or open a salary account. Evaluate if these add-ons are worth it.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Choose Add-on Products Wisely:</strong> Some lenders offer a rate discount for autopay or direct deposit, and may pitch optional credit insurance. Evaluate whether each add-on is worth its cost.</span>
                        )}
                    </li>
                </ul>
            </section>

            {/* Common Mistakes to Avoid */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Common Mistakes to Avoid When Taking a Personal Loan</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Over-borrowing:</strong> Lenders often sanction more than you asked for, because a larger loan earns them more. Take the amount you came for.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Over-borrowing:</strong> Lenders may approve more than you asked for, because a larger loan earns them more. Take the amount you came for.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Ignoring Processing Fees:</strong> The fee is usually taken out of the disbursal, so you borrow {money(500000, 0)} and receive less. Ask for the net figure in writing.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Ignoring Origination Fees:</strong> The fee is usually taken out of the proceeds, so on a {money(profile.cmpAmount, 0)} loan a 5% fee ({money(feeExample, 0)}) means you borrow {money(profile.cmpAmount, 0)} and receive less. Ask for the net amount and the APR in writing.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Missing EMI Payments:</strong> Late EMI payments hurt your credit score. Set up auto-debit to avoid missed payments and penalties.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Missing Payments:</strong> Late payments can be reported to the credit bureaus and hurt your credit score, and may add late fees. Set up autopay to avoid them.</span>
                        )}
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Not Checking Prepayment Terms:</strong> Some lenders charge high prepayment penalties. Read your loan agreement carefully before signing.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        {isIndia ? (
                            <span><strong className="text-ink-soft">Multiple Loan Applications:</strong> Rate-shopping across aggregator sites can trigger several hard enquiries in a week, which reads as distress borrowing. Ask for a soft-check quote instead.</span>
                        ) : (
                            <span><strong className="text-ink-soft">Multiple Loan Applications:</strong> Each formal application can trigger a hard credit pull. Use prequalification, which uses a soft pull and does not affect your score, to compare rates first, and apply only to the lender you choose.</span>
                        )}
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {(isIndia ? FAQ_DATA_IN : FAQ_DATA_WEST).map((item, i) => (
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