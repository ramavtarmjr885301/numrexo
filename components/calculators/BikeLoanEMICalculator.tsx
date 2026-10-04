"use client";

import { useEffect, useRef, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";
import { calcEmi } from "@/lib/emi";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA_IN = [
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

// US-default version of the FAQ. Every dollar figure below was computed with the
// standard reducing-balance formula (EMI = P*r*(1+r)^n / ((1+r)^n - 1), r = APR/12);
// the assumptions (amount, APR, term) are stated in each answer.
const FAQ_DATA_WEST = [
    {
        q: "What is a motorcycle loan payment calculator?",
        a: "It works out the monthly payment on a motorcycle or scooter loan before you sign anything at the dealership. Powersports financing is a different market from car financing: balances are smaller, terms are shorter, and a lot of it is arranged at the dealer's finance desk, sometimes through a lender tied to the manufacturer and sometimes through a bank or credit union you approached yourself. As a worked example, a $9,000 bike with $1,500 down leaves $7,500 to finance, and at 8% APR over 48 months that comes to about $183 a month. Doing that arithmetic before you walk in is the whole point.",
    },
    {
        q: "How is the monthly payment on a motorcycle loan calculated?",
        a: "Payment = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the amount financed, r is the monthly rate (APR ÷ 12) and n is the number of monthly payments. On a small balance the rate matters less than most people expect: on $7,500 over 48 months, moving from 8% to 9% APR lifts the payment from about $183 to about $187 and adds roughly $170 in total interest. What moves the number most is how much you finance and for how long.",
    },
    {
        q: "What interest rate should I expect on a motorcycle loan?",
        a: "Motorcycle and powersports loans commonly land somewhere around 6-14% APR, depending on your credit score, the term, the age of the bike and the lender. Credit unions and banks often price below dealer-arranged financing for borrowers with good credit, although a manufacturer promotional rate can beat both. On $7,500 over 48 months, 6% APR costs about $176 a month and $955 in interest, while 14% costs about $205 a month and $2,338. Treat any rate you read online as a starting point and get a written quote from at least two lenders.",
    },
    {
        q: "How long should a motorcycle loan run?",
        a: "Lenders commonly offer 24 to 72 months, but a long term is not automatically a good one. On $7,500 at 8% APR, 24 months is about $339 a month with $641 in interest; 48 months is about $183 with $1,289; 72 months drops the payment to about $131 but the interest rises to $1,968, roughly three times the 24-month figure. Motorcycles lose value quickly, and on a long term you can owe more than the bike is worth for years. Many riders find 36 to 48 months a workable middle.",
    },
    {
        q: "How much down payment should I make?",
        a: "Most lenders like to see 10-20% down, and a dealer advertising $0 down is making the payment look small, not the loan cheap. Take a $9,000 bike at 8% APR over 48 months: financing all $9,000 is about $220 a month with $1,546 in interest. Put 20% down ($1,800) and you finance $7,200, which is about $176 a month with $1,237 in interest, so roughly $44 a month and $309 less. A larger down payment also lowers the chance of owing more than the bike is worth, and can help you qualify for a better rate.",
    },
    {
        q: "What does the out-the-door price include, and what gets financed?",
        a: "The advertised price is only the start. The out-the-door price adds sales tax, title and registration fees, the dealer's documentation fee, and often freight or destination and prep charges, plus any accessories or extended warranty you agree to. All of it can be rolled into the loan. For illustration, assume a $9,000 bike, 6% sales tax ($540) and $300 in title, registration and documentation fees: that is $9,840 financed. At 8% APR over 48 months it is about $240 a month, against about $220 on $9,000 alone, and $145 more interest. Sales tax and fees vary by state, so ask for the out-the-door price in writing and enter only what you actually want to finance.",
    },
    {
        q: "Can I get a loan on a used motorcycle?",
        a: "Yes, but expect tighter terms than for a new bike. Many lenders shorten the maximum term or decline older bikes altogether, and rates run higher. Buying from a private seller usually means a bank or credit-union loan rather than dealer financing, and you will need a clean title with no existing lien, a bill of sale, and a VIN that matches the paperwork. As an illustration, $6,000 over 36 months costs about $188 a month with $769 in interest at 8% APR, and about $199 with $1,174 in interest at 12%: roughly $11 more a month and $405 more in total. For an older, cheaper bike, saving part of the price first can be the cheaper route.",
    },
    {
        q: "What documents do I need?",
        a: "Less than for a home loan, but more than most buyers expect to hand over at the counter. Plan on a government photo ID, your Social Security number for the credit check, proof of income (recent pay stubs, or tax returns and bank statements if you are self-employed), proof of address, and proof of insurance before the lender releases funds. Some lenders also ask to see a motorcycle license or endorsement. For the purchase itself you will sign a buyer's order or bill of sale and apply for title and registration; on a private-party deal, the seller's signed title is the key document.",
    },
    {
        q: "What happens if I want to pay the loan off early?",
        a: "Most motorcycle loans use simple interest, so paying early reduces the interest you owe, but you should check the contract for a prepayment penalty before relying on that. On $7,500 at 8% APR over 48 months, the balance after 24 payments is about $4,048. Paying it off at that point avoids roughly $346 in interest that the remaining 24 payments would have carried. Ask the lender for a written payoff quote, which includes interest accrued to the payoff date, and compare it with simply continuing to make payments.",
    },
    {
        q: "What is the payment on a $7,500 motorcycle loan?",
        a: "At 8% APR: 36 months is about $235 a month with $961 in total interest; 48 months is about $183 with $1,289; 60 months is about $152 with $1,624. At 12% APR over 48 months the same loan costs about $198 a month and $1,980 in interest. Change the figures above to match the quote you were actually given rather than relying on any of these.",
    },
    {
        q: "Why does the same motorcycle cost more when I pay monthly?",
        a: "Because you are buying money as well as a bike. A $12,000 loan at 10% APR over 72 months is about $222 a month, and over the full term you pay about $4,006 in interest, roughly a third of the bike's price again, for the convenience of paying later. That is not an argument against financing; it is an argument for knowing the number. The total interest line in the result above is the price of the loan itself.",
    },
    {
        q: "Do I need insurance on a financed motorcycle?",
        a: "Yes. Lenders require proof of insurance before they release funds, usually comprehensive and collision coverage with the lender listed as lienholder, and you must keep it in force until the loan is paid off. That cost is not part of the payment this calculator shows, so budget for it separately: for illustration only, a $600-a-year policy adds $50 a month. Premiums vary with the bike, where you live and your riding and claims history, so get quotes before you choose the bike, not after. You are free to shop around rather than take the dealer's offer.",
    },
    {
        q: "What fees should I watch for besides interest?",
        a: "Look for a documentation fee (some states cap it, others do not), a loan origination fee if the lender charges one, title and registration charges, and freight or prep on a new bike. Ask whether each fee is paid up front or added to the loan, because anything added to the loan accrues interest for the whole term. As an illustration, $300 in fees added to a $7,500 loan is 4% of the balance; at 8% APR over 48 months it lifts the payment from about $183 to about $190 and costs about $351 in total, of which about $51 is extra interest.",
    },
    {
        q: "Can I get a motorcycle loan with a low credit score?",
        a: "Often yes, at a higher price. Credit score is the biggest lever on your APR. Using illustrative rates (not quotes) on $7,500 over 48 months: 6% is about $176 a month with $955 in interest, 12% is about $198 with $1,980, and 18% is about $220 with $3,075. If your score is low, a co-signer, a bigger down payment or a credit-union membership can help. Check your credit report for errors first, and use a lender's pre-qualification, which many offer with a soft credit check, to see an estimated rate before the dealer runs a full application.",
    },
    {
        q: "What actually reduces the monthly payment?",
        a: "In order of how much they move the number: a bigger down payment, fewer dealer add-ons, and a better APR, often from a credit-union or bank pre-approval or an improved credit score. On $7,500 at 8% APR over 48 months (about $183 a month), paying $1,000 more up front drops the loan to $6,500 and the payment to about $159; cutting the APR to 6% brings it to about $176. Stretching to 60 months also lowers the payment to about $152, but it adds about $335 in interest, so compare total interest and not just the monthly figure.",
    },
];

// ─── Per-market defaults, presets and example-table configs ──────────────────
// The preset buttons, defaults and every worked example are sized for the
// selected market: INR gets rupee-scale two-wheeler values, every other
// currency gets a motorcycle/scooter loan sized for US/UK-style lending.

type MarketKey = "india" | "west";

interface BikeProfile {
    defaults: { price: string; down: string; rate: string; tenure: string };
    rateByType: { new: string; used: string };
    placeholders: { price: string; down: string; rateNew: string; rateUsed: string; tenure: string };
    priceStep: number;
    amounts: number[];
    rates: number[];
    tenures: number[];
    downs: number[];
    benefitStep: number;
    rateTable: { principal: number; months: number; rates: number[] };
    tenureTable: { principal: number; rate: number; months: number[] };
    modelTable: { rate: number; months: number; rows: { name: string; price: number }[] };
    stretch: { principal: number; rate: number; shortMonths: number; longMonths: number };
    rateSavingPoint?: { principal: number; months: number; lowRate: number; highRate: number };
}

const PROFILES: Record<MarketKey, BikeProfile> = {
    india: {
        defaults: { price: "100000", down: "15000", rate: "11", tenure: "36" },
        rateByType: { new: "11", used: "13" },
        placeholders: { price: "e.g., 100000", down: "e.g., 20000", rateNew: "e.g., 10", rateUsed: "e.g., 12", tenure: "e.g., 36" },
        priceStep: 5000,
        amounts: [50000, 80000, 100000, 150000, 200000],
        rates: [8, 9, 10, 11, 12, 14],
        tenures: [12, 18, 24, 36, 48],
        downs: [10000, 15000, 20000, 30000, 50000],
        benefitStep: 10000,
        rateTable: { principal: 100000, months: 36, rates: [8, 9, 10, 12, 14] },
        tenureTable: { principal: 100000, rate: 10, months: [12, 18, 24, 36, 48] },
        modelTable: {
            rate: 10,
            months: 36,
            rows: [
                { name: "Honda Activa", price: 85000 },
                { name: "TVS Jupiter", price: 75000 },
                { name: "Hero Splendor", price: 65000 },
                { name: "Bajaj Pulsar", price: 120000 },
                { name: "Royal Enfield", price: 200000 },
            ],
        },
        stretch: { principal: 80000, rate: 11, shortMonths: 24, longMonths: 48 },
    },
    west: {
        defaults: { price: "9000", down: "1500", rate: "8", tenure: "48" },
        rateByType: { new: "8", used: "11" },
        placeholders: { price: "e.g., 9000", down: "e.g., 1500", rateNew: "e.g., 8", rateUsed: "e.g., 11", tenure: "e.g., 48" },
        priceStep: 500,
        amounts: [4000, 6000, 9000, 12000, 18000],
        rates: [6, 8, 10, 12, 14],
        tenures: [24, 36, 48, 60, 72],
        downs: [500, 1000, 1500, 2000, 3000],
        benefitStep: 1000,
        rateTable: { principal: 9000, months: 48, rates: [6, 8, 10, 12, 14] },
        tenureTable: { principal: 9000, rate: 8, months: [24, 36, 48, 60, 72] },
        modelTable: {
            rate: 8,
            months: 48,
            rows: [
                { name: "Entry scooter or used commuter", price: 4000 },
                { name: "Used or entry-level motorcycle", price: 6000 },
                { name: "Mid-range motorcycle", price: 9000 },
                { name: "Cruiser or adventure bike", price: 12000 },
                { name: "Premium touring or performance bike", price: 18000 },
            ],
        },
        stretch: { principal: 7500, rate: 8, shortMonths: 24, longMonths: 48 },
        rateSavingPoint: { principal: 7500, months: 48, lowRate: 8, highRate: 9 },
    },
};

// Row colour classes for the example tables (kept from the original static tables).
const RATE_ROW_RATE_CLS = ["text-green-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const RATE_ROW_INT_CLS = ["text-yellow-700", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];
const TENURE_ROW_TERM_CLS = ["text-blue-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const TENURE_ROW_INT_CLS = ["text-green-600", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];

const termLabel = (months: number) => (months % 12 === 0 && months >= 12 ? `${months / 12}Y` : `${months}M`);

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
    const { symbol, money, compact, market } = useCurrency();
    const profile = PROFILES[market];
    const isIN = market === "india";
    // SSR and the default currency (USD) render the west defaults, so a worked result shows on first paint.
    const [loanAmount, setLoanAmount] = useState(PROFILES.west.defaults.price);
    const [interestRate, setInterestRate] = useState(PROFILES.west.defaults.rate);
    const [tenure, setTenure] = useState(PROFILES.west.defaults.tenure);
    const [bikeType, setBikeType] = useState("new");
    const [downPayment, setDownPayment] = useState(PROFILES.west.defaults.down);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    // Set once the visitor edits anything, so a later currency switch never overwrites their numbers.
    const touched = useRef(false);

    const applyDefaults = (m: MarketKey) => {
        const d = PROFILES[m].defaults;
        setLoanAmount(d.price);
        setDownPayment(d.down);
        setInterestRate(d.rate);
        setTenure(d.tenure);
        setBikeType("new");
    };

    useEffect(() => {
        if (!touched.current) applyDefaults(market);
    }, [market]);

    const resetForm = () => {
        touched.current = false;
        applyDefaults(market);
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
            ratingColor = "text-green-600";
        } else if (emiToBikeRatio <= 0.25) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-600";
        } else if (emiToBikeRatio <= 0.35) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-700";
        } else if (emiToBikeRatio <= 0.45) {
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
        });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateEMI(); }, [loanAmount, interestRate, tenure, bikeType, downPayment]);

    // Example-table rows, computed from the standard EMI formula for the selected market.
    const rateRows = profile.rateTable.rates.map((r) => ({ rate: r, ...calcEmi(profile.rateTable.principal, r, profile.rateTable.months) }));
    const tenureRows = profile.tenureTable.months.map((m) => ({ months: m, ...calcEmi(profile.tenureTable.principal, profile.tenureTable.rate, m) }));
    const modelRows = profile.modelTable.rows.map((row) => ({ ...row, ...calcEmi(row.price, profile.modelTable.rate, profile.modelTable.months) }));
    const stretchShort = calcEmi(profile.stretch.principal, profile.stretch.rate, profile.stretch.shortMonths);
    const stretchLong = calcEmi(profile.stretch.principal, profile.stretch.rate, profile.stretch.longMonths);
    const sp = profile.rateSavingPoint;
    const rateSaving = sp
        ? calcEmi(sp.principal, sp.highRate, sp.months).totalInterest - calcEmi(sp.principal, sp.lowRate, sp.months).totalInterest
        : 0;

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
                        <span itemProp="name" className="text-ink-soft">Bike Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <div>
                            <h3 className="font-semibold">Bike Loan EMI Calculator</h3>
                            <p className="text-xs text-ink-faint mt-1">Calculate your monthly bike loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        {/* Bike Type */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Bike Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        touched.current = true;
                                        setBikeType("new");
                                        setInterestRate(profile.rateByType.new);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${bikeType === "new"
                                        ? "bg-blue-600 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    🏍️ New Bike
                                </button>
                                <button
                                    onClick={() => {
                                        touched.current = true;
                                        setBikeType("used");
                                        setInterestRate(profile.rateByType.used);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${bikeType === "used"
                                        ? "bg-orange-500 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    🛵 Used Bike
                                </button>
                            </div>
                            <p className="text-xs text-ink-faint mt-1">
                                {isIN
                                    ? (bikeType === "new" ? "Interest rates: 8-12% | Tenure: Up to 4 years" : "Interest rates: 10-16% | Tenure: Up to 3 years")
                                    : (bikeType === "new" ? "Typical APR: 6-10% | Terms: 24-72 months" : "Typical APR: 9-14% | Terms: 24-48 months")}
                            </p>
                        </div>

                        {/* Bike Price */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Bike Price ({symbol})</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step={profile.priceStep}
                                    placeholder={profile.placeholders.price}
                                    value={loanAmount}
                                    onChange={(e) => { touched.current = true; setLoanAmount(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.amounts.map((amount) => (
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

                        {/* Down Payment */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Down Payment ({symbol}) <span className="text-ink-faint">(Optional)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step={profile.priceStep}
                                    placeholder={profile.placeholders.down}
                                    value={downPayment}
                                    onChange={(e) => { touched.current = true; setDownPayment(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{symbol}</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.downs.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => { touched.current = true; setDownPayment(amount.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
                                    >
                                        {compact(amount)}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-ink-faint mt-1">Typical down payment: 10-20% of bike price</p>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={bikeType === "new" ? profile.placeholders.rateNew : profile.placeholders.rateUsed}
                                    value={interestRate}
                                    onChange={(e) => { touched.current = true; setInterestRate(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.rates.map((rate) => (
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
                                    placeholder={profile.placeholders.tenure}
                                    value={tenure}
                                    onChange={(e) => { touched.current = true; setTenure(e.target.value); }}
                                    className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:border-blue-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">months</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {profile.tenures.map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => { touched.current = true; setTenure(month.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
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
                    emptyIcon="🏍️"
                    emptyText="Enter bike details to see your monthly payment"
                    mainResult={result ? {
                        label: "Monthly EMI",
                        value: money(result.emi),
                        color: "text-blue-600"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Affordability Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: money(result.totalPayment), valueColor: "text-yellow-700" },
                        { label: "Total Interest", value: money(result.totalInterest), valueColor: "text-orange-600" },
                        { label: "Bike Price", value: money(result.bikePrice) },
                        { label: "Down Payment", value: `${money(result.downPayment)} (${result.downPaymentPercentage.toFixed(1)}%)`, valueColor: "text-purple-600" },
                        { label: "Loan Amount", value: money(result.principal) },
                        { label: "Bike Type", value: result.bikeType === "new" ? "New Bike 🏍️" : "Used Bike 🛵" },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months / 12).toFixed(1)} years)` },
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
                    <p className="text-xs text-ink-faint mt-2">Showing amortization schedule for the loan tenure</p>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About Bike Loan EMI Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    {isIN
                        ? "Two-wheeler financing moves fast — most of it is arranged on the spot at the dealership, often by an NBFC rather than your own bank, with paperwork done in under an hour. That speed is exactly why so many buyers never actually see the EMI math before agreeing to a tenure, and why a quick calculation before you sit down at the counter is worth more here than on almost any other kind of loan."
                        : "Motorcycle and scooter financing moves fast — much of it is arranged on the spot at the dealership's finance desk, often through a lender the dealer chose rather than your own bank or credit union, with paperwork done in under an hour. That speed is exactly why so many buyers never actually see the payment math before agreeing to a term, and why a quick calculation before you sit down at the counter is worth more here than on almost any other kind of loan."}
                </p>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    Enter the bike's {isIN ? "on-road" : "out-the-door"} price, anything you're putting down, the rate quoted, and the tenure, and you'll get the monthly EMI, total interest over the loan, and a schedule showing how the balance comes down month by month.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    It's particularly useful for sanity-checking a "zero down payment" offer — those are built to make the EMI look small, not to make the loan cheap, and the numbers below show exactly what that convenience costs in interest.
                </p>
            </section>

            {/* New vs Used Bike Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">New vs Used Bike Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-blue-200 transition-all">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">🏍️ New Bike</h3>
                        {isIN ? (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Interest Rate: 8-12% p.a.</li>
                                <li>• Tenure: Up to 4 years (48 months)</li>
                                <li>• Down Payment: 10-15%</li>
                                <li>• LTV: Up to 90%</li>
                                <li>• Lower interest rates</li>
                                <li>• Longer repayment period</li>
                            </ul>
                        ) : (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• APR: commonly 6-10%, depending on credit score</li>
                                <li>• Term: 24-72 months</li>
                                <li>• Down Payment: 10-20%</li>
                                <li>• Taxes and fees can often be financed</li>
                                <li>• Lower interest rates</li>
                                <li>• Longer repayment period</li>
                            </ul>
                        )}
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-orange-200 transition-all">
                        <h3 className="text-sm font-semibold text-orange-600 mb-2">🛵 Used Bike</h3>
                        {isIN ? (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Interest Rate: 10-16% p.a.</li>
                                <li>• Tenure: Up to 3 years (36 months)</li>
                                <li>• Down Payment: 20-30%</li>
                                <li>• LTV: Up to 80%</li>
                                <li>• Higher interest rates</li>
                                <li>• Shorter repayment period</li>
                            </ul>
                        ) : (
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• APR: commonly 9-14%, higher for older bikes</li>
                                <li>• Term: 24-48 months, shorter for older bikes</li>
                                <li>• Down Payment: lenders often want 20% or more</li>
                                <li>• Clean title with no existing lien required</li>
                                <li>• Higher interest rates</li>
                                <li>• Shorter repayment period</li>
                            </ul>
                        )}
                    </div>
                </div>
                <p className="text-xs text-ink-faint mt-3">* New bikes generally get better loan terms due to higher resale value and lower risk</p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Bike Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed">Pick <strong className="text-ink">New Bike</strong> or <strong className="text-ink">Used Bike</strong> first, since the typical rates and tenures differ quite a bit between the two. Enter the <strong className="text-ink">{isIN ? "on-road price" : "out-the-door price"}</strong> — not just the {isIN ? "ex-showroom" : "advertised"} figure, since {isIN ? "RTO charges, insurance and accessories" : "sales tax, title and registration fees, dealer fees and accessories"} usually get financed along with it.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Add a <strong className="text-ink">down payment</strong> if you're planning one — try the calculation with and without it to see how much interest a small upfront payment actually saves. Then enter the <strong className="text-ink">interest rate</strong> and <strong className="text-ink">tenure</strong> you've been quoted.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Press <strong className="text-ink">Calculate EMI</strong> for the monthly payment, total interest, and the full repayment schedule. The <strong className="text-ink">affordability rating</strong> flags whether the EMI looks heavy for a typical income at that level — <strong className="text-ink">Reset</strong> clears everything if you want to try a different dealership's numbers.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Bike Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Check the Numbers Before the Counter</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Two-wheeler loans are often approved and signed in the same sitting at the dealership. Having your own EMI figure beforehand means you're not just accepting whatever the finance desk quotes.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">{isIN ? "✓ Bank vs NBFC Tie-Up" : "✓ Dealer Financing vs Your Own Lender"}</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">{isIN ? "Dealership financing is usually an NBFC tie-up chosen for speed, not price. Run the same bike price through your own bank's rate to see if a day's delay is worth the saving." : "Dealer financing is arranged for speed and convenience, not always for the lowest rate. Run the same bike price through a credit union or bank pre-approval to see if a day's delay is worth the saving."}</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Down Payment Analysis</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Zero-down offers are the dealership's best sales tool and your most expensive option. See what each extra {compact(profile.benefitStep)} upfront saves you over the full {isIN ? "tenure" : "term"}.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Weigh a Shorter Loan Against a Lower EMI</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">On a small loan, stretching the {isIN ? "tenure" : "term"} barely moves the {isIN ? "EMI" : "payment"} but can push the total interest up sharply. Test a 2-year and a 4-year {isIN ? "tenure" : "term"} side by side before you pick one.</p>
                    </div>
                </div>
            </section>

            {/* Bike Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Bike Loan EMI Formula</h2>
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
                    <p className="text-ink-faint text-xs mt-4">Interest is charged on the balance still outstanding, so the interest share of each EMI falls a little every month.</p>
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
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(profile.rateTable.principal)}, {termLabel(profile.rateTable.months)})</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rateRows.map((row, i) => (
                                <tr key={row.rate} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 font-bold ${RATE_ROW_RATE_CLS[i]}`}>{row.rate}%</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className={`py-2 px-4 text-right ${RATE_ROW_INT_CLS[i]}`}>{money(row.totalInterest, 0)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.totalPayment, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Comparison shows impact of interest rate on EMI and total cost for a {compact(profile.rateTable.principal)} bike loan over {profile.rateTable.months / 12} years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Tenure Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Tenure</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(profile.tenureTable.principal)}, {profile.tenureTable.rate}%)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenureRows.map((row, i) => (
                                <tr key={row.months} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 font-bold ${TENURE_ROW_TERM_CLS[i]}`}>{row.months} Months</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className={`py-2 px-4 text-right ${TENURE_ROW_INT_CLS[i]}`}>{money(row.totalInterest, 0)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.totalPayment, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* On a two-wheeler, a longer tenure often outlives the bike's useful resale value</p>
            </section>

            {/* Popular Bike Models with EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">{isIN ? "Popular Bike Models & Estimated EMI" : "Estimated Payment by Bike Price"}</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">{isIN ? "Bike Model" : "Bike Type"}</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Price ({symbol})</th>
                                <th className="text-right py-3 px-4 text-ink-faint">EMI ({profile.modelTable.rate}%, {termLabel(profile.modelTable.months)})</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelRows.map((row) => (
                                <tr key={row.name} className="border-b border-hairline hover:bg-cream">
                                    <td className="py-2 px-4 text-blue-600">{row.name}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.price, 0)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className="py-2 px-4 text-right text-yellow-700">{money(row.totalInterest, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* EMI calculated with {profile.modelTable.rate}% interest rate and {profile.modelTable.months / 12}-year tenure{isIN ? "" : ", with the full price financed"}. Prices are indicative.</p>
            </section>

            {/* Bike Loan Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Bike Loan Eligibility Criteria</h2>
                {isIN ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Salaried Individuals</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 21-60 years</li>
                                <li>• Minimum monthly income: {money(15000)}</li>
                                <li>• Work experience: 6+ months</li>
                                <li>• CIBIL score: 700+ preferred, though a thin file is common for a first bike</li>
                                <li>• Aadhaar and PAN, plus address proof if the two differ</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-yellow-700 mb-2">✅ Self-Employed</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 25-65 years</li>
                                <li>• ITR filing: 1+ years</li>
                                <li>• Business vintage: 2+ years</li>
                                <li>• Annual turnover: {compact(200000)}+</li>
                                <li>• Six months of bank statements showing steady inflow</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Employed Applicants</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 18+ (the age of majority where you live)</li>
                                <li>• Steady, verifiable income, shown by recent pay stubs</li>
                                <li>• Credit score: higher tiers get the lowest rates, though fair or limited credit is often still financed at a higher APR</li>
                                <li>• Government photo ID, plus a motorcycle license or endorsement if the lender asks</li>
                                <li>• Proof of insurance before the lender releases funds</li>
                            </ul>
                        </div>
                        <div className="bg-surface border border-hairline rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-yellow-700 mb-2">✅ Self-Employed</h3>
                            <ul className="text-xs text-ink-faint space-y-1">
                                <li>• Age: 18+ (the age of majority where you live)</li>
                                <li>• Tax returns for the last two years, where available</li>
                                <li>• Recent bank statements showing steady deposits</li>
                                <li>• 1099 or business income records if your income is irregular</li>
                                <li>• A larger down payment can offset a thin or short credit history</li>
                            </ul>
                        </div>
                    </div>
                )}
                <p className="text-xs text-ink-faint mt-3">{isIN ? "* Two-wheeler lending is dominated by NBFCs, and their criteria are looser and their rates higher than a bank's. Check both." : "* Dealer financing is convenient, but a credit-union or bank pre-approval gives you a rate to compare it against. Check both."}</p>
            </section>

            {/* Tips for Lower Bike Loan EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Tips for Lower Bike Loan EMI</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Make a Larger Down Payment:</strong> A higher down payment reduces the loan amount, lowering both EMI and total interest. Aim for 15-20% or more.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Improve Credit Score:</strong> A higher credit score (700+) qualifies you for lower interest rates. Check your score regularly and correct any errors.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Choose New Bike Over Used:</strong> New bikes get lower interest rates ({isIN ? "8-12%" : "commonly 6-10%"}) compared to used bikes ({isIN ? "10-16%" : "commonly 9-14%"}). This can save you real money in interest.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Compare Multiple Lenders:</strong> Different lenders offer different rates. {isIN ? <>Even a 1% difference can save you {money(5000)}+ over the loan tenure.</> : <>On {money(sp!.principal)} over {sp!.months} months, one point of APR ({sp!.lowRate}% vs {sp!.highRate}%) is worth about {money(rateSaving, 0)} in interest — more on a larger loan or a longer term.</>}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Choose Optimal {isIN ? "Tenure" : "Term"}:</strong> Match the {isIN ? "tenure" : "term"} to how long you will actually keep the bike. Paying for a commuter bike in year four of ownership is how people end up with a monthly payment on something they no longer ride.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-blue-600 mt-0.5">💡</span>
                        <span><strong className="text-ink-soft">Look for Promotional Offers:</strong> {isIN ? "Many lenders offer zero processing fees or lower rates during festive seasons. Plan your purchase during such periods." : "Manufacturer and dealer promotions come and go. Ask whether a promotional APR or rebate applies, then compare the total cost against a credit-union or bank quote rather than the headline rate alone."}</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Common Mistakes to Avoid When Taking a Bike Loan</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span>{isIN
                            ? <><strong className="text-ink-soft">Ignoring On-Road Price:</strong> Dealers quote ex-showroom. The loan is written against the on-road figure — RTO, road tax, insurance and any accessories they add — which is routinely 20-25% higher.</>
                            : <><strong className="text-ink-soft">Ignoring the Out-the-Door Price:</strong> Dealers advertise the sticker price. The loan is written against the out-the-door figure — sales tax, title and registration, documentation fees, freight or prep charges and any accessories they add — which is always higher than the sticker.</>}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Not Factoring in Insurance:</strong> {isIN ? "Bike insurance is mandatory and adds to your monthly cost. Factor it into your budget." : "Lenders require comprehensive and collision coverage until the loan is paid off, and it adds to your monthly cost. Get quotes before you pick the bike."}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Choosing Longest {isIN ? "Tenure" : "Term"}:</strong> Stretching {money(profile.stretch.principal)} from {profile.stretch.shortMonths / 12} years to {profile.stretch.longMonths / 12} years at {profile.stretch.rate}% cuts the {isIN ? "EMI" : "payment"} by {money(stretchShort.emi - stretchLong.emi, 0)} and adds {money(stretchLong.totalInterest - stretchShort.totalInterest, 0)} in interest. Take that trade only if the shorter {isIN ? "EMI" : "payment"} genuinely does not fit.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">{isIN ? "Missing Processing Fees:" : "Missing Dealer and Loan Fees:"}</strong> {isIN ? "On small loans the flat minimum processing fee matters more than the percentage. Ask for the rupee figure, not the rate." : "On small loans, flat documentation and origination fees matter more than the APR. Ask for the dollar figure, and whether it is paid up front or added to the loan."}</span>
                    </li>
                    <li className="flex gap-3 text-sm text-ink-faint">
                        <span className="text-red-600 mt-0.5">⚠️</span>
                        <span><strong className="text-ink-soft">Multiple Loan Applications:</strong> {isIN ? "Each application leaves a hard enquiry. Dealerships often submit to several financiers at once to get you approved fast — ask them to apply to one first." : "Each full application can leave a hard inquiry on your credit report. Scoring models usually treat several inquiries for the same kind of loan inside a short window as one, but the window varies — ask the dealer which lenders it will submit to, and use pre-qualification where offered."}</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {(isIN ? FAQ_DATA_IN : FAQ_DATA_WEST).map((item, i) => (
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