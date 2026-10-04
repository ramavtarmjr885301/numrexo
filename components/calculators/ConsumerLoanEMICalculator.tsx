"use client";

import { useEffect, useRef, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";
import { calcEmi } from "@/lib/emi";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

// India (INR) FAQ — shown only when the rupee is selected.
const FAQ_DATA_IN = [
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

// West (USD / GBP / EUR / CAD / AUD) FAQ — the default. Every figure below was computed with
// EMI = P·r·(1+r)^n / ((1+r)^n − 1), r = APR/12, fixed rate, monthly payments, no fees unless stated.
const FAQ_DATA_WEST = [
    {
        q: "What is a consumer loan EMI calculator?",
        a: "It estimates the fixed monthly payment (the EMI, or equated monthly installment) on a financed purchase such as an appliance, a laptop, a sofa or a car, using the amount, the annual interest rate and the term in months. It also shows total interest and a payment-by-payment schedule, so you can compare a store's financing offer with a personal loan or a credit card before you sign.",
    },
    {
        q: "What is a consumer loan?",
        a: "A consumer loan is money borrowed by an individual for personal or household spending rather than for a business. In practice that covers installment financing for appliances, furniture and electronics (often arranged at the checkout), auto loans, and personal loans used for a large purchase. Auto loans are secured by the vehicle; most small-ticket financing is unsecured; and buy now, pay later plans are a short-term variant of the same idea.",
    },
    {
        q: "How is consumer loan EMI calculated?",
        a: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the amount financed, r is the monthly rate (annual rate ÷ 12) and n is the number of monthly payments. Worked example: $2,500 at 15% APR over 12 months gives r = 1.25%, a payment of $225.65, a total repaid of $2,707.75 and interest of $207.75. At 0% the formula reduces to P ÷ n: $2,500 ÷ 12 = $208.33 a month.",
    },
    {
        q: "What is the interest rate for consumer loans?",
        a: "There is no single rate. Promotional 0% offers exist, but they run for a fixed period set by the retailer, and the standard APR that applies afterwards (or retroactively, under deferred interest) can be high. Secured auto loans usually cost less than unsecured loans; the presets here use roughly 6-12% for vehicles and 0-25% for other purchases. Your rate depends on your credit, income, term and lender, so use the APR on your written offer. For scale: $2,500 over 12 months costs $137.48 in interest at 10% and $351.33 at 25%.",
    },
    {
        q: "What is the maximum tenure for a consumer loan?",
        a: "It depends on what you finance. Retail promotions commonly run 6-24 months, personal loans often run a few years, and auto loans are frequently 36-72 months. A longer term lowers the payment but raises the total cost: a $25,000 auto loan at 8% is $610.32 a month for 48 months (total interest $4,295.51) versus $438.33 a month for 72 months (total interest $6,559.83). Very long terms on a depreciating item also raise the risk of owing more than it is worth.",
    },
    {
        q: "What documents are required for a consumer loan?",
        a: "Requirements vary by lender. Expect to provide your name, address, date of birth, employment and income details, and a national identification or tax number so the lender can check your credit. Larger loans may ask for recent pay stubs, bank statements or tax returns, and secured loans need details of the vehicle or item. Checkout financing is often decided in minutes, but the lender is still doing a credit check, so read the terms before accepting.",
    },
    {
        q: "Can I prepay my consumer loan?",
        a: "Often yes, but check for a prepayment fee, and check how a promotional plan treats early payoff. Because interest accrues on the remaining balance, early payments save real money. Example: $2,500 at 15% over 12 months (payment $225.65). After six payments you have paid $150.44 in interest and owe $1,296.56; settling then avoids the remaining $57.31 of the $207.75 total interest. Adding $100 a month to a $5,000, 36-month loan at 15% (payment $173.33) clears it in 21 months and cuts interest from $1,239.76 to $712.69, assuming the extra goes to principal.",
    },
    {
        q: "What is the difference between a store card, a store installment plan and a personal loan?",
        a: "Store financing is arranged for one purchase at one retailer, either as a store credit card or an installment plan. A personal loan from a bank, credit union or online lender gives you a lump sum to spend anywhere, at a fixed rate and term. Store offers often pair a promotional period with a high standard APR; personal loans have no promotion but can carry a lower fixed rate. Illustration with assumed rates: $2,500 over 12 months costs $243.71 a month at 29.99% (total interest $424.47) versus $225.65 at 15% ($207.75). A genuine 0% offer paid off on schedule costs $0 in interest ($208.33 a month) and beats both, but only if you meet its conditions.",
    },
    {
        q: "How does credit score affect consumer loan approval?",
        a: "Lenders use your credit score to price risk, typically in bands such as excellent, good, fair and poor. Better bands generally get lower rates and more offers; weaker credit can mean a higher rate, a smaller limit or a decline. Illustration: $5,000 over 24 months is $230.72 a month at 10% (total interest $537.39) versus $266.86 at 25% ($1,404.58). Prequalification tools often use a soft inquiry that does not affect your score, while a formal application usually triggers a hard inquiry that can lower it slightly for a while. Paying on time helps your record; missed payments hurt it.",
    },
    {
        q: "What is the monthly payment on a $2,500 consumer loan?",
        a: "At 15% APR: 12 months is $225.65 a month (total interest $207.75); 24 months is $121.22 ($409.20); 36 months is $86.66 ($619.88). These assume a fixed rate, monthly payments and no fees. A 12-month 0% promotion on the same $2,500 would be $208.33 a month. Change the rate and term above to match your own offer.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "A shorter term means a higher payment but less total interest. For $5,000 at 15%: 12 months is $451.29 a month (total interest $415.50); 24 months is $242.43 ($818.40); 36 months is $173.33 ($1,239.76). Choose the shortest term your monthly budget can carry comfortably, especially for items that lose value quickly.",
    },
    {
        q: "What fees and extra costs can a consumer loan have?",
        a: "Beyond interest, look for origination fees (a percentage of the loan, sometimes deducted from the amount you receive), late-payment and returned-payment fees, prepayment fees, and optional add-ons such as extended warranties or credit insurance. Example: a 5% origination fee on $2,500 is $125; together with $207.75 of interest at 15% over 12 months, the total cost of borrowing is $332.75. Compare offers by APR and by total dollars repaid, not by the headline rate or payment alone.",
    },
    {
        q: "What about buy now, pay later and no-credit-check financing?",
        a: "Pay-in-four buy now, pay later plans split a purchase into four equal payments, often two weeks apart: a $200 purchase becomes four payments of $50. They are commonly interest-free if you pay on time, but late fees may apply and several overlapping plans are easy to lose track of. Longer plans may charge interest like any loan, so enter the APR above to see the real cost. Financing marketed as no credit check, such as lease-to-own, often costs far more than the cash price once every payment is added up. Compare the total you will pay with the price on the shelf.",
    },
    {
        q: "What is the difference between secured and unsecured consumer loans?",
        a: "A secured loan is backed by collateral, such as the vehicle in an auto loan, so the lender can repossess it if you stop paying; an unsecured loan has no collateral and usually a higher rate. Illustration with assumed rates on $25,000 over 60 months: 8% secured is $506.91 a month (total interest $5,414.59), while 14% unsecured is $581.71 ($9,902.38). Most appliance and electronics financing is unsecured.",
    },
    {
        q: "How can I reduce my monthly payment or total cost?",
        a: "Make a larger down payment, compare several lenders (rate shopping with soft-inquiry prequalification first), improve your credit before applying, choose a longer term only if you must (it lowers the payment but raises total interest), and pay extra toward principal when you can. With a 0% deferred-interest plan, divide the price by the promotion months and automate that payment: $2,500 over 12 months is $208.33 a month. If any balance remains when the promotion ends, interest may be charged back to the purchase date; on a 29.99% APR that is roughly $406 if you had been paying the balance down evenly over the year, and more if you had paid less.",
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

// ─── Market profiles ──────────────────────────────────────────────────────────
// "india" is used only when INR is selected; every other currency is "west".
// The SSR/default currency is USD, so the west profile is what loads first.

type LoanKind = "durable" | "vehicle" | "electronics";

interface Presets {
    amounts: number[];
    rates: number[];
    tenures: number[];
}

interface TypeCard {
    title: string;
    blurb: string;
    tenure: string;
    rate: string;
    maxAmount: number;
    extra: string;
}

interface Profile {
    defaults: { amount: string; rate: string; tenure: string };
    amountStep: string;
    /** Decimals for schedule/comparison money. India shows whole rupees; west shows cents. */
    decimals: number;
    presets: Record<LoanKind, Presets>;
    /** Monthly-EMI ceilings for the 5-step affordability rating (4 limits per loan type). */
    ratingLimits: Record<LoanKind, [number, number, number, number]>;
    buttonLabels: Record<LoanKind, string>;
    resultLabels: Record<LoanKind, string>;
    cards: Record<LoanKind, TypeCard>;
    /** Loan-type comparison table rows (EMI is computed from these). */
    comparison: { kind: LoanKind; label: string; color: string; amount: number; rate: number; months: number }[];
    rateTable: { amount: number; months: number; rates: number[] };
    tenureTable: { amount: number; rate: number; tenures: number[] };
    zeroLabel: string;
    aboutIntro: string;
    benefitTitle: string;
    benefitText: string;
    tips: { title: string; text: string }[];
}

const PROFILES: Record<"india" | "west", Profile> = {
    india: {
        defaults: { amount: "50000", rate: "12", tenure: "12" },
        amountStep: "1000",
        decimals: 0,
        presets: {
            durable: { amounts: [10000, 25000, 50000, 100000, 150000], rates: [10, 12, 14, 16, 18], tenures: [3, 6, 12, 18, 24] },
            vehicle: { amounts: [100000, 300000, 500000, 800000, 1000000], rates: [8, 9, 10, 11, 12], tenures: [24, 36, 48, 60, 72] },
            electronics: { amounts: [50000, 100000, 200000, 300000, 500000], rates: [10, 12, 14, 16, 18], tenures: [12, 24, 36, 48, 60] },
        },
        ratingLimits: {
            durable: [5000, 10000, 20000, 35000],
            vehicle: [10000, 20000, 35000, 50000],
            electronics: [5000, 10000, 15000, 25000],
        },
        buttonLabels: { durable: "Consumer Durable", vehicle: "Vehicle", electronics: "Electronics" },
        resultLabels: { durable: "Durable", vehicle: "Vehicle", electronics: "Electronics" },
        cards: {
            durable: { title: "Consumer Durable Loans", blurb: "For buying TVs, refrigerators, washing machines", tenure: "3-24 months", rate: "10-18% p.a.", maxAmount: 100000, extra: "Instant approval options" },
            vehicle: { title: "Vehicle Loans", blurb: "For cars, bikes, scooters", tenure: "24-72 months", rate: "8-12% p.a.", maxAmount: 1000000, extra: "Secured against vehicle" },
            electronics: { title: "Electronics Loans", blurb: "For laptops, mobiles, gadgets", tenure: "3-24 months", rate: "12-20% p.a.", maxAmount: 200000, extra: "Often zero-cost EMI options" },
        },
        comparison: [
            { kind: "durable", label: "Consumer Durable", color: "text-blue-600", amount: 50000, rate: 14, months: 12 },
            { kind: "vehicle", label: "Vehicle", color: "text-green-600", amount: 500000, rate: 10, months: 48 },
            { kind: "electronics", label: "Electronics", color: "text-purple-600", amount: 100000, rate: 16, months: 18 },
            { kind: "durable", label: "Consumer Durable", color: "text-orange-600", amount: 30000, rate: 12, months: 6 },
        ],
        rateTable: { amount: 50000, months: 12, rates: [10, 12, 14, 16, 18] },
        tenureTable: { amount: 50000, rate: 12, tenures: [3, 6, 12, 18, 24] },
        zeroLabel: "no-cost EMI",
        aboutIntro: "\"No-cost EMI\" is one of the more misleading phrases in retail — the interest rarely disappears, it's usually folded into the product's price instead, or recovered through a processing fee and a discount you'd have gotten anyway for paying cash. A quick EMI calculation at checkout is often the easiest way to spot which version you're actually being offered.",
        benefitTitle: "Zero-Cost EMI Analysis",
        benefitText: "Understand the true cost of zero-cost EMI offers. Often, they include hidden charges or higher product prices. Our calculator reveals the real cost.",
        tips: [
            { title: "Check Zero-Cost EMI Offers", text: "Many retailers offer zero-cost EMI, but often the product price is higher. Use our calculator to compare total cost." },
            { title: "Choose Appropriate Tenure", text: "Consumer durable loans should have shorter tenures (6-12 months) as products depreciate. Longer tenures for vehicles make sense." },
            { title: "Compare Multiple Lenders", text: "Different lenders offer different rates for consumer loans. Even a 1% difference can save you money." },
            { title: "Read the Fine Print", text: "Check for processing fees, prepayment charges, and late payment penalties before signing the loan agreement." },
            { title: "Consider Insurance", text: "Some consumer loans include insurance. Check if it's mandatory and if you can opt out to save costs." },
        ],
    },
    west: {
        defaults: { amount: "2500", rate: "15", tenure: "12" },
        amountStep: "any",
        decimals: 2,
        presets: {
            durable: { amounts: [500, 1000, 2500, 5000, 10000], rates: [0, 10, 15, 20, 25], tenures: [6, 12, 18, 24, 36] },
            vehicle: { amounts: [5000, 15000, 25000, 35000, 50000], rates: [6, 8, 9, 10, 12], tenures: [36, 48, 60, 66, 72] },
            electronics: { amounts: [300, 600, 1000, 2000, 3500], rates: [0, 10, 15, 20, 25], tenures: [6, 12, 18, 24, 36] },
        },
        ratingLimits: {
            durable: [100, 250, 500, 900],
            vehicle: [300, 500, 700, 1000],
            electronics: [75, 150, 300, 500],
        },
        buttonLabels: { durable: "Appliances & Furniture", vehicle: "Auto", electronics: "Electronics" },
        resultLabels: { durable: "Appliances & Furniture", vehicle: "Auto", electronics: "Electronics" },
        cards: {
            durable: { title: "Appliance & Furniture Financing", blurb: "For refrigerators, washers, mattresses, furniture", tenure: "6-24 months (promotional periods)", rate: "0% promo, then a high APR if not paid off", maxAmount: 10000, extra: "Watch for deferred interest" },
            vehicle: { title: "Auto Loans", blurb: "For cars, trucks, motorcycles", tenure: "36-72 months", rate: "about 6-12% APR", maxAmount: 50000, extra: "Secured against the vehicle" },
            electronics: { title: "Electronics Financing", blurb: "For laptops, phones, TVs, gadgets", tenure: "6-24 months", rate: "0% promo up to about 25% APR", maxAmount: 3500, extra: "Buy now, pay later options common" },
        },
        comparison: [
            { kind: "durable", label: "Appliances & Furniture", color: "text-blue-600", amount: 2500, rate: 15, months: 12 },
            { kind: "vehicle", label: "Auto", color: "text-green-600", amount: 25000, rate: 8, months: 60 },
            { kind: "electronics", label: "Electronics", color: "text-purple-600", amount: 1000, rate: 20, months: 12 },
            { kind: "durable", label: "Appliances (0% promo)", color: "text-orange-600", amount: 1500, rate: 0, months: 12 },
        ],
        rateTable: { amount: 2500, months: 12, rates: [0, 10, 15, 20, 25] },
        tenureTable: { amount: 2500, rate: 15, tenures: [6, 12, 18, 24, 36] },
        zeroLabel: "0% financing",
        aboutIntro: "\"0% financing\" is one of the more misleading phrases in retail — the interest rarely disappears. It's usually folded into the product's price, recovered through fees, or, with deferred interest, charged retroactively if the balance isn't cleared before the promotion ends. A quick payment calculation at checkout is often the easiest way to spot which version you're actually being offered.",
        benefitTitle: "0% Offer Analysis",
        benefitText: "Understand the true cost of 0% and deferred-interest offers. Often, they come with higher product prices, fees, or back-dated interest if you miss the deadline. Our calculator reveals the real cost.",
        tips: [
            { title: "Check 0% Promotions", text: "Many retailers advertise 0% financing, but some use deferred interest: if the balance isn't paid in full by the end of the promotion, interest may be charged back to the purchase date. Compare against the cash price too." },
            { title: "Choose an Appropriate Term", text: "Appliance and electronics financing is best paid off quickly (6-24 months) because the products lose value. Longer terms are more reasonable for vehicles." },
            { title: "Compare Multiple Lenders", text: "Compare store financing, a personal loan from a bank or credit union, and any card offers. Prequalification with a soft credit check often lets you see rates without a hard inquiry." },
            { title: "Read the Fine Print", text: "Check for origination fees, late fees, prepayment penalties, and what happens to your rate if a promotion ends before the balance is paid." },
            { title: "Question the Add-Ons", text: "Extended warranties and credit insurance offered at checkout are often optional. Ask whether they are required, and whether the cost is added to the amount you finance." },
        ],
    },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConsumerLoanEMICalculator() {
    const { symbol, money, compact, market } = useCurrency();
    const profile = PROFILES[market];
    // SSR default currency is USD, so start from the west defaults and show a worked result at once.
    const [loanAmount, setLoanAmount] = useState(PROFILES.west.defaults.amount);
    const [interestRate, setInterestRate] = useState(PROFILES.west.defaults.rate);
    const [tenure, setTenure] = useState(PROFILES.west.defaults.tenure);
    const [loanType, setLoanType] = useState<LoanKind>("durable");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    // True once the visitor edits anything; until then a currency/market switch swaps in that market's defaults.
    const touched = useRef(false);

    useEffect(() => {
        if (touched.current) return;
        const d = PROFILES[market].defaults;
        setLoanAmount(d.amount);
        setInterestRate(d.rate);
        setTenure(d.tenure);
    }, [market]);

    const resetForm = () => {
        touched.current = false;
        const d = profile.defaults;
        setLoanAmount(d.amount);
        setInterestRate(d.rate);
        setTenure(d.tenure);
        setLoanType("durable");
    };

    const calculateEMI = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        const months = parseFloat(tenure);

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

        // Affordability bands depend on the loan type and on the market's money scale.
        const limits = profile.ratingLimits[loanType];
        if (monthlyPayment <= limits[0]) {
            rating = "Very Affordable ★★★★★";
            ratingColor = "text-green-600";
        } else if (monthlyPayment <= limits[1]) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-600";
        } else if (monthlyPayment <= limits[2]) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-700";
        } else if (monthlyPayment <= limits[3]) {
            rating = "Stretching ★★";
            ratingColor = "text-orange-600";
        } else {
            rating = "Highly Stretching ★";
            ratingColor = "text-red-600";
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

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateEMI(); }, [loanAmount, interestRate, tenure, loanType, market]);

    // Presets come from the selected market's profile.
    const presets = profile.presets[loanType];

    const touch = () => { touched.current = true; };
    const fmt = (value: number) => money(value, profile.decimals);

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
                        <span itemProp="name" className="text-ink-soft">Consumer Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <div>
                            <h3 className="font-semibold">Consumer Loan EMI Calculator</h3>
                            <p className="text-xs text-ink-faint mt-1">Calculate your monthly loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        {/* Loan Type */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Loan Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => { touch(); setLoanType("durable"); }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanType === "durable"
                                        ? "bg-blue-600 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    {profile.buttonLabels.durable}
                                </button>
                                <button
                                    onClick={() => { touch(); setLoanType("vehicle"); }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanType === "vehicle"
                                        ? "bg-green-500 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    {profile.buttonLabels.vehicle}
                                </button>
                                <button
                                    onClick={() => { touch(); setLoanType("electronics"); }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanType === "electronics"
                                        ? "bg-purple-500 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    {profile.buttonLabels.electronics}
                                </button>
                            </div>
                        </div>

                        {/* Loan Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Loan Amount ({symbol})</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step={profile.amountStep}
                                    placeholder={`e.g., ${profile.defaults.amount}`}
                                    value={loanAmount}
                                    onChange={(e) => { touch(); setLoanAmount(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presets.amounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => { touch(); setLoanAmount(amount.toString()); }}
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
                                    placeholder={`e.g., ${profile.defaults.rate}`}
                                    value={interestRate}
                                    onChange={(e) => { touch(); setInterestRate(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presets.rates.map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => { touch(); setInterestRate(rate.toString()); }}
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
                                    placeholder={`e.g., ${profile.defaults.tenure}`}
                                    value={tenure}
                                    onChange={(e) => { touch(); setTenure(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">months</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {presets.tenures.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => { touch(); setTenure(month.toString()); }}
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
                    emptyIcon="🛒"
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
                        { label: "Loan Type", value: profile.resultLabels[result.loanType as LoanKind] },
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
                                            <td className="py-2 px-4 text-right text-ink-soft">{fmt(row.emi)}</td>
                                            <td className="py-2 px-4 text-right text-green-600">{fmt(row.principal)}</td>
                                            <td className="py-2 px-4 text-right text-orange-600">{fmt(row.interest)}</td>
                                            <td className="py-2 px-4 text-right text-ink-soft">{fmt(row.balance)}</td>
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
                <h2 className="text-xl font-semibold text-ink mb-3">About Consumer Loan EMI Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    {profile.aboutIntro}
                </p>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    Enter the loan amount for your durable, electronics, or small vehicle purchase, along with the rate and tenure, and this calculator shows the EMI, the total interest over the loan, and an amortization schedule breaking down each payment into principal and interest.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    It's especially useful for point-of-sale financing, where the EMI is quoted fast and the total cost is easy to skip past — run the numbers here before you tap "confirm" at the counter.
                </p>
            </section>

            {/* Types of Consumer Loans */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Types of Consumer Loans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {([
                        { kind: "durable", icon: "🏷️", text: "text-blue-600", hover: "hover:border-blue-200" },
                        { kind: "vehicle", icon: "🚗", text: "text-green-600", hover: "hover:border-green-200" },
                        { kind: "electronics", icon: "💻", text: "text-purple-600", hover: "hover:border-purple-200" },
                    ] as const).map(({ kind, icon, text, hover }) => {
                        const card = profile.cards[kind];
                        return (
                            <div key={kind} className={`bg-surface border border-hairline rounded-xl p-4 ${hover} transition-all`}>
                                <h3 className={`text-sm font-semibold ${text} mb-2`}>{icon} {card.title}</h3>
                                <ul className="text-xs text-ink-faint space-y-1">
                                    <li>• {card.blurb}</li>
                                    <li>• Tenure: {card.tenure}</li>
                                    <li>• Interest: {card.rate}</li>
                                    <li>• Amount: Up to {compact(card.maxAmount)}</li>
                                    <li>• {card.extra}</li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Consumer Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed">Pick the <strong className="text-ink">loan type</strong> closest to your purchase — {profile.buttonLabels.durable}, {profile.buttonLabels.vehicle}, or {profile.buttonLabels.electronics} — since typical rates and tenures differ across them. Enter the <strong className="text-ink">loan amount</strong>, or use a preset to start from a round figure close to your purchase price.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Enter the <strong className="text-ink">interest rate</strong> you've been quoted — if it's a "{profile.zeroLabel}" deal, check the product's cash price first, since the "zero interest" is often built into a higher sticker price rather than genuinely waived. Then pick the <strong className="text-ink">tenure</strong> in months.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Click <strong className="text-ink">Calculate EMI</strong> to see the monthly payment, total interest, and schedule. Use the <strong className="text-ink">affordability rating</strong> as a quick gut-check, and <strong className="text-ink">Reset</strong> to try a different purchase amount or financing offer.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Consumer Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Smart Shopping Decisions</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Know exactly what you can afford before making a purchase. Plan your monthly budget around your EMI obligations and avoid over-committing.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Compare Financing Options</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Compare EMI offers from different retailers and lenders. Find the best interest rate and tenure combination for your purchase.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Tenure Optimization</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Find the ideal tenure that balances affordable monthly payments with total interest cost for your consumer purchase.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ {profile.benefitTitle}</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">{profile.benefitText}</p>
                    </div>
                </div>
            </section>

            {/* Consumer Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Consumer Loan EMI Formula</h2>
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

            {/* Consumer Loan Comparison — every EMI is computed from the market profile */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Consumer Loan Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Loan Type</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Amount</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Rate</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Tenure</th>
                                <th className="text-right py-3 px-4 text-ink-faint">EMI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.comparison.map((row) => (
                                <tr key={`${row.label}-${row.amount}`} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 ${row.color} font-bold`}>{row.label}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.amount, 0)}</td>
                                    <td className="py-2 px-4 text-right text-yellow-700">{row.rate}%</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{row.months} Months</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{fmt(calcEmi(row.amount, row.rate, row.months).emi)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* EMI amounts are indicative and based on the specified parameters</p>
            </section>

            {/* Interest Rate Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Interest Rate Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Rate (p.a.)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">EMI</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.rateTable.rates.map((rate) => {
                                const row = calcEmi(profile.rateTable.amount, rate, profile.rateTable.months);
                                return (
                                    <tr key={rate} className="border-b border-hairline hover:bg-cream">
                                        <td className="py-2 px-4 text-yellow-700 font-bold">{rate}%</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{fmt(row.emi)}</td>
                                        <td className="py-2 px-4 text-right text-orange-600">{fmt(row.totalInterest)}</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{fmt(row.totalPayment)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Based on a {money(profile.rateTable.amount, 0)} loan over {profile.rateTable.months} months at a fixed rate, no fees</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Tenure Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Tenure</th>
                                <th className="text-right py-3 px-4 text-ink-faint">EMI</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.tenureTable.tenures.map((months) => {
                                const row = calcEmi(profile.tenureTable.amount, profile.tenureTable.rate, months);
                                return (
                                    <tr key={months} className="border-b border-hairline hover:bg-cream">
                                        <td className="py-2 px-4 text-blue-600 font-bold">{months} Months</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{fmt(row.emi)}</td>
                                        <td className="py-2 px-4 text-right text-orange-600">{fmt(row.totalInterest)}</td>
                                        <td className="py-2 px-4 text-right text-ink-soft">{fmt(row.totalPayment)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Based on a {money(profile.tenureTable.amount, 0)} loan at {profile.tenureTable.rate}% p.a., fixed rate, no fees</p>
            </section>

            {/* Consumer Loan Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Tips for Smart Consumer Loan Borrowing</h2>
                <ul className="space-y-2">
                    {profile.tips.map((tip) => (
                        <li key={tip.title} className="flex gap-3 text-sm text-ink-faint">
                            <span className="text-blue-600 mt-0.5">💡</span>
                            <span><strong className="text-ink-soft">{tip.title}:</strong> {tip.text}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {(market === "india" ? FAQ_DATA_IN : FAQ_DATA_WEST).map((item, i) => (
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