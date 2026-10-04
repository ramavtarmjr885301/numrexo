"use client";

import { useEffect, useRef, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";
import { calcEmi } from "@/lib/emi";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

// India version (rupee examples, Indian lending terms). Shown only when INR is selected.
const FAQ_DATA_IN = [
    {
        q: "What is a car loan EMI calculator?",
        a: "It tells you the monthly cost of financing a car before the showroom does. A car loan sits between a home loan and a personal loan: it is secured against the vehicle, so rates are moderate, but the asset loses value far faster than the loan balance falls. That gap — owing more than the car is worth — is the thing worth understanding before you pick a tenure.",
    },
    {
        q: "How is car loan EMI calculated?",
        a: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where r is the monthly rate and n the number of months. On ₹8,00,000 at 9.5%, three years costs ₹25,626 a month with ₹1,22,549 in interest; seven years drops the EMI to ₹13,075 but the interest climbs to ₹2,98,316. Same car, ₹1.75 lakh apart.",
    },
    {
        q: "What is the current car loan interest rate?",
        a: "New-car rates typically sit in the 8-12% band and used-car rates several points above it, with the exact number depending on your credit profile, the model, and whether the loan comes from your own bank or the dealership's tie-up. Dealer finance is quicker and frequently dearer; a written quote from your own bank is the cheapest half-hour of work in the whole purchase.",
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
        a: "On a secured car loan the score moves the rate less than it does on an unsecured one, but it still moves it. A single percentage point on ₹8,00,000 over five years is ₹394 a month and ₹23,618 over the term. Pull your report before applying — a stale, already-closed loan still showing as live is the most common reason a good file gets priced badly.",
    },
    {
        q: "What is the down payment required for a car loan?",
        a: "Typically, banks finance 80-90% of the car's on-road price. You need to pay 10-20% as down payment. For example, for a ₹10 lakh car, you may need to pay ₹1-2 lakh as down payment. Some lenders offer 100% financing with higher interest rates.",
    },
    {
        q: "What documents are required for a car loan?",
        a: "Aadhaar and PAN, address proof, three months of salary slips and six months of bank statements, and the dealer's proforma invoice, since the loan is sanctioned against a specific vehicle. Self-employed applicants add two years of ITR. The RC is issued with the lender's hypothecation on it, and removing that entry after the final EMI is a separate step people routinely forget.",
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
        a: "A car is a depreciating asset, which makes the tenure choice sharper than on a home loan. On ₹8,00,000 at 9.5%: three years is ₹25,626 a month and ₹1,22,549 in interest; five is ₹16,801 and ₹2,08,089; seven is ₹13,075 and ₹2,98,316. Past about five years, many owners owe more than the car would fetch — awkward if you need to sell or the car is written off.",
    },
    {
        q: "What is the difference between fixed and floating rates for car loans?",
        a: "Fixed rates remain constant throughout the loan tenure, offering predictability but usually higher rates. Floating rates change with market conditions, offering potentially lower rates but with uncertainty. Most car loans in India are fixed rate.",
    },
    {
        q: "What is the processing fee for car loans?",
        a: "Usually 0.5-1.5% plus GST, and often waived or discounted at your own bank. Dealer-arranged finance may show a low rate and recover it in the fee, or in an insurance or extended-warranty package attached to the loan. Ask for the total amount financed and the total repayable, and compare those two numbers between lenders rather than the advertised rate.",
    },
    {
        q: "Can I get a car loan with a low CIBIL score?",
        a: "While a low CIBIL score (below 650) makes approval difficult, some NBFCs and fintech lenders offer car loans at higher interest rates. You can also improve approval chances by making a larger down payment, adding a co-applicant, or providing collateral.",
    },
    {
        q: "How to reduce car loan EMI?",
        a: "In order of effect: a larger down payment, since it cuts the financed amount directly; a quote from your own bank rather than the showroom; and skipping the add-ons the dealer wants to roll into the loan. Extending the tenure lowers the EMI too, but on a car that is a trade you are making against an asset that is losing value the whole time.",
    },
];

// Western version (USD default; also GBP/EUR/CAD/AUD). Every dollar figure below was computed with
// EMI = P·r·(1+r)^n / ((1+r)^n − 1), r = APR/12, and the assumptions are stated in each answer.
const FAQ_DATA_WEST = [
    {
        q: "What is a car loan EMI calculator?",
        a: "It tells you the monthly cost of financing a car before the dealer's finance office does. In the US this is simply your monthly car payment; \"EMI\" is the term used for it in many other countries. A car loan is secured against the vehicle, so rates are usually lower than on credit cards or personal loans, but the car loses value faster than the balance falls. That gap, owing more than the car is worth (often called negative equity or being \"upside down\"), is the thing worth understanding before you pick a term.",
    },
    {
        q: "How is car loan EMI calculated?",
        a: "Payment = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the amount financed, r the monthly rate (APR ÷ 12) and n the number of months. On a $30,000 loan at 7% APR, 36 months costs $926.31 a month with $3,347 in total interest; 72 months drops the payment to $511.47 but the interest climbs to $6,826. Same car, about $3,479 apart.",
    },
    {
        q: "What is the current car loan interest rate?",
        a: "Rates move with the market and with your credit score, so treat any published range as a starting point rather than a quote. As a rough guide, borrowers with good credit often see new-car rates in the mid-to-high single digits and used-car rates a couple of points above that, while borrowers with lower scores can be quoted well into double digits. The term, the vehicle's age, your down payment and the lender (credit union, bank, online lender or the dealer's lending partners) all move the number too. Dealers can add a markup to the rate a lender approves you for, so a pre-approval from your own credit union or bank is the cheapest half-hour of work in the purchase: it gives you a figure to hold the dealer's offer against.",
    },
    {
        q: "What is the maximum tenure for a car loan?",
        a: "Terms commonly run from 24 to 72 months, and many lenders go to 84 months on new cars. Used-car terms are usually shorter, often capped around 60 months and sometimes less for older, high-mileage vehicles, because the collateral loses value sooner. Stretching has a cost. On $35,000 at 7% APR, 60 months is $693.04 a month with $6,583 in interest; 72 months is $596.72 with $7,963; 84 months is $528.24 with $9,372. The longer terms also keep you owing more than the car is worth for longer.",
    },
    {
        q: "What is the difference between new car and used car loan rates?",
        a: "Lenders usually price used-car loans higher than new-car loans. As a rough guide for borrowers with good credit, that is around 5-8% for new versus 7-11% for used, though your credit score and the market on the day matter more than any range. New cars also tend to qualify for longer terms (up to 72-84 months) than used ones (often up to 60). A used vehicle is less predictable collateral, so the lender protects itself with a higher rate and a shorter term. Used can still win on total cost because the loan starts smaller; compare the total repayable, not just the rate.",
    },
    {
        q: "How does credit score affect car loan interest rate?",
        a: "Your FICO score decides which pricing tier a lender puts you in, and on a secured car loan the tiers are still wide enough to matter. One percentage point is easy to quantify: on $35,000 over 60 months, 7% APR is $693.04 a month and 8% is $709.67, which is $16.63 more a month and $998 more over the term. Between a prime score and a subprime one the gap is far larger than a single point. Check your credit reports at AnnualCreditReport.com before applying; an error you can dispute, or a paid-off account still showing a balance, is a common reason a good file gets priced badly.",
    },
    {
        q: "What is the down payment required for a car loan?",
        a: "There is no legal minimum, but lenders and dealers commonly look for 10-20% of the price, and 20% is a common target on a new car because a new car's value drops fastest in the first year. On a $40,000 vehicle that is $4,000 to $8,000. At 7% over 60 months, financing $36,000 (10% down) is $712.84 a month; financing $32,000 (20% down) is $633.64, about $79 less each month and $752 less interest. Zero-down offers exist, but they leave you owing more than the car is worth from day one. A trade-in with equity in it counts toward the down payment.",
    },
    {
        q: "What documents are required for a car loan?",
        a: "Typically a valid driver's license, proof of income (recent pay stubs, or for self-employed borrowers the last one or two years of tax returns plus bank statements), proof of residence such as a utility bill, proof of auto insurance, and the buyer's order or purchase agreement for the specific vehicle, since the loan is made against it. The lender also needs your Social Security number to check credit. For a private-party purchase expect to supply the VIN, mileage and the seller's title details. The lender is recorded as lienholder on the title, so after your final payment make sure you receive the lien release or a clean title; that step is easy to forget.",
    },
    {
        q: "Can I prepay my car loan?",
        a: "In most cases yes. Most US auto loans are simple-interest loans, where interest accrues daily on the remaining balance, so extra principal payments reduce the interest you pay. Prepayment penalties are uncommon on prime loans but do exist, particularly on some subprime and precomputed-interest loans, and rules vary by state. Check the contract for a prepayment clause before signing, and when you pay extra, confirm the lender applies it to principal rather than treating it as an early payment on next month's bill.",
    },
    {
        q: "What is the monthly payment on a $25,000 car loan?",
        a: "At 7% APR on $25,000: 36 months is $771.93 a month with $2,789 in total interest; 60 months is $495.03 with $4,702; 84 months is $377.32 with $6,695. These figures cover the loan only. Sales tax, title and registration fees and any add-ons rolled into the loan raise the amount financed, so use the calculator with your actual out-the-door numbers.",
    },
    {
        q: "How does loan tenure affect EMI and total interest?",
        a: "A car is a depreciating asset, which makes the term choice sharper than it is on a mortgage. On $35,000 at 7% APR: 36 months is $1,081 a month and $3,905 in interest; 60 months is $693 and $6,583; 84 months is $528 and $9,372. Going from 36 to 84 months cuts the payment by $552 a month but costs $5,467 more in interest. Past about five years, many owners owe more than the car would fetch. If the car is totaled or you need to sell, that shortfall is yours, which is the situation GAP insurance is designed to cover (check what a given policy excludes).",
    },
    {
        q: "What is the difference between fixed and floating rates for car loans?",
        a: "Nearly all US auto loans are fixed-rate: the APR and the payment stay the same for the whole term, which makes budgeting simple. Variable-rate car loans exist but are uncommon. A better question to ask than fixed versus variable is whether the loan is simple-interest or precomputed, and what APR the Truth in Lending disclosure shows, because those two things determine what you actually pay.",
    },
    {
        q: "What is the processing fee for car loans?",
        a: "The costs show up under different names: dealer documentation (\"doc\") fees, which some states cap and others do not; lender origination fees, which are less common; sales tax; title and registration; and optional add-ons such as GAP insurance, extended warranties or credit insurance that the dealer can roll into the loan. Anything rolled in is financed and earns interest. Ask for an itemized out-the-door price, and on the Truth in Lending disclosure compare the APR, the amount financed and the total of payments between lenders rather than the advertised rate. GAP in particular can be priced very differently by your auto insurer or credit union than by the dealer.",
    },
    {
        q: "Can I get a car loan with a low credit score?",
        a: "Often yes, but at a price. Scores below roughly 600 are commonly treated as subprime, and rates can be far higher. As an illustration, $25,000 over 60 months at 15% APR is $594.75 a month with $10,685 in interest, versus $495.03 and $4,702 at 7%: $99.72 more a month and $5,983 more interest. You can improve your odds with a larger down payment, a less expensive vehicle, or a co-signer with stronger credit (who becomes equally responsible for the debt). Apply to a credit union or bank first, and read the terms of any buy-here-pay-here offer carefully.",
    },
    {
        q: "How to reduce car loan EMI?",
        a: "In order of effect: a larger down payment, since it cuts the financed amount directly; a pre-approval from your own bank or credit union rather than relying on the dealer's offer; and declining the add-ons the dealer wants to roll into the loan. On $35,000 at 7% over 60 months, putting $5,000 more down (financing $30,000) cuts the payment from $693.04 to $594.04, about $99 a month and $940 in interest. Extending the term lowers the payment too, but on a car that is a trade you are making against an asset that is losing value the whole time.",
    },
];

// ─── JSON-LD Schema Strings ───────────────────────────────────────────────────

function buildFaqSchema(items: { q: string; a: string }[]) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    });
}

// SSR / default currency is USD, so the crawlable FAQ schema is the western version.
// The India schema is only emitted when INR is selected, matching the FAQ shown on screen.
const FAQ_SCHEMA = buildFaqSchema(FAQ_DATA_WEST);
const FAQ_SCHEMA_IN = buildFaqSchema(FAQ_DATA_IN);

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

// ─── Market profiles ──────────────────────────────────────────────────────────
// Everything that depends on whether the visitor is looking at rupees (India) or at
// USD/GBP/EUR/CAD/AUD (west): input defaults, preset buttons, the base figures behind the
// comparison tables, and the static lending copy. The component picks one with `market`.

type Fmt = {
    money: (value: number, decimals?: number) => string;
    compact: (value: number) => string;
};
type Item = { title: string; body: string };

interface MarketProfile {
    defaults: { price: string; down: string; rate: string; tenure: string };
    /** Rate pre-filled when the user switches to "Used Car". */
    usedRate: string;
    presets: { price: number[]; rates: number[]; tenures: number[]; down: number[] };
    priceStep: string;
    placeholders: { price: string; down: string; rateNew: string; rateUsed: string };
    carTypeHint: { new: string; used: string };
    newCar: string[];
    usedCar: string[];
    newUsedNote: string;
    /** Base figures for the two comparison tables (all rows are computed with calcEmi). */
    rateTable: { principal: number; rates: number[]; months: number };
    tenureTable: { principal: number; rate: number; months: number[] };
    salaried: (f: Fmt) => string[];
    selfEmployed: (f: Fmt) => string[];
    eligibilityNote: string;
    tips: (f: Fmt, lowerRateSaving: number) => Item[];
    mistakes: Item[];
}

const PROFILES: Record<"india" | "west", MarketProfile> = {
    india: {
        defaults: { price: "800000", down: "100000", rate: "9", tenure: "60" },
        usedRate: "10.5",
        presets: {
            price: [300000, 500000, 800000, 1000000, 1500000],
            rates: [7, 8, 9, 10, 11],
            tenures: [24, 36, 48, 60, 72],
            down: [50000, 100000, 150000, 200000, 300000],
        },
        priceStep: "10000",
        placeholders: { price: "e.g., 800000", down: "e.g., 100000", rateNew: "e.g., 9", rateUsed: "e.g., 10.5" },
        carTypeHint: {
            new: "Interest rates: 7.5-9.5% | Tenure: Up to 7 years",
            used: "Interest rates: 9-12% | Tenure: Up to 5 years",
        },
        newCar: [
            "Interest Rate: 7.5-9.5% p.a.",
            "Tenure: Up to 7 years (84 months)",
            "Down Payment: 10-20%",
            "LTV: Up to 90%",
            "Lower interest rates",
            "Longer repayment period",
        ],
        usedCar: [
            "Interest Rate: 9-12% p.a.",
            "Tenure: Up to 5 years (60 months)",
            "Down Payment: 20-30%",
            "LTV: Up to 80%",
            "Higher interest rates",
            "Shorter repayment period",
        ],
        newUsedNote: "* New cars generally get better loan terms due to higher resale value and lower risk",
        rateTable: { principal: 800000, rates: [7, 8, 9, 10, 11], months: 60 },
        tenureTable: { principal: 800000, rate: 9, months: [36, 48, 60, 72, 84] },
        salaried: ({ money }) => [
            "Age: 21-60 years",
            `Minimum monthly income: ${money(25000)}`,
            "Work experience: 1+ years",
            "CIBIL score: 700+ preferred",
            "Valid identity and address proof",
        ],
        selfEmployed: ({ compact }) => [
            "Age: 25-65 years",
            "ITR filing: 2+ years",
            "Business vintage: 3+ years",
            `Annual turnover: ${compact(500000)}+`,
            "Profitability track record",
        ],
        eligibilityNote: "* Your own bank will usually beat the showroom's tie-up. Get that quote before you sit down to sign.",
        tips: ({ money, compact }, saving) => [
            { title: "Make a Larger Down Payment", body: "A higher down payment reduces the loan amount, lowering both EMI and total interest. Aim for 20% or more." },
            { title: "Improve Credit Score", body: "Check your credit report before you apply, not after. A closed loan still showing as active is the usual culprit behind an unexpectedly high quote." },
            { title: "Choose New Car Over Used", body: "New cars get lower interest rates (7.5-9.5%) compared to used cars (9-12%). This can save you thousands in interest." },
            { title: "Compare Multiple Lenders", body: `Different lenders offer different rates. Even a 0.5% difference can save you about ${money(saving, 0)} in interest on a ${compact(PROFILES.india.rateTable.principal)} loan over the tenure.` },
            { title: "Choose Optimal Tenure", body: "Choose a tenure that balances EMI affordability with total interest. Don't go for the longest tenure just for lower EMI." },
            { title: "Negotiate Processing Fees", body: "Many lenders offer zero or discounted processing fees. Don't hesitate to negotiate or ask for a waiver." },
        ],
        mistakes: [
            { title: "Ignoring On-Road Price", body: "Always calculate EMI based on the on-road price (ex-showroom + RTO + insurance), not just the ex-showroom price." },
            { title: "Not Factoring in Insurance", body: "Car insurance is mandatory and adds to your monthly cost. Factor it into your budget." },
            { title: "Choosing Longest Tenure", body: "While it reduces EMI, it significantly increases total interest. Only choose long tenure if you absolutely need lower EMI." },
            { title: "Missing Processing Fees", body: "Compare the total amount repayable, not the advertised rate. A low rate with a heavy fee and a bundled warranty can cost more than a plain higher rate." },
            { title: "Multiple Loan Applications", body: "Dealerships often push your file to several financiers at once. Every one of those is a hard enquiry — ask them to try a single lender first." },
        ],
    },
    west: {
        defaults: { price: "35000", down: "5000", rate: "7", tenure: "60" },
        usedRate: "9",
        presets: {
            price: [20000, 30000, 40000, 50000, 70000],
            rates: [5, 6, 7, 8, 9],
            tenures: [36, 48, 60, 72, 84],
            down: [2000, 3000, 5000, 7500, 10000],
        },
        priceStep: "500",
        placeholders: { price: "e.g., 35000", down: "e.g., 5000", rateNew: "e.g., 7", rateUsed: "e.g., 9" },
        carTypeHint: {
            new: "Typical rates: 5-8% | Terms: up to 72-84 months",
            used: "Typical rates: 7-11% | Terms: up to 60 months",
        },
        newCar: [
            "Interest Rate: roughly 5-8% APR",
            "Term: up to 72-84 months",
            "Down Payment: 10-20%",
            "LTV: lenders cap the loan at a share of the car's value",
            "Lower interest rates",
            "Longer repayment period",
        ],
        usedCar: [
            "Interest Rate: roughly 7-11% APR",
            "Term: up to 60 months",
            "Down Payment: 15-20% or more",
            "LTV: lower caps, especially on older cars",
            "Higher interest rates",
            "Shorter repayment period",
        ],
        newUsedNote: "* Typical ranges for borrowers with good credit. Your credit score, the lender and market conditions set your actual rate.",
        rateTable: { principal: 35000, rates: [5, 6, 7, 8, 9], months: 60 },
        tenureTable: { principal: 35000, rate: 7, months: [36, 48, 60, 72, 84] },
        salaried: ({ money }) => [
            "Age: 18+ (the legal age to sign a contract varies by state)",
            `Minimum monthly income: about ${money(2500, 0)}`,
            "Stable employment history preferred",
            "Credit score: 660+ (FICO) generally gets better rates",
            "Valid driver's license and proof of residence",
        ],
        selfEmployed: () => [
            "Age: 18+",
            "Tax returns: 1-2 years",
            "Business history: 1-2+ years",
            "Income shown on bank statements or 1099s",
            "Steady, verifiable income and manageable debts",
        ],
        eligibilityNote: "* A pre-approval from a credit union or bank gives you a rate to compare against the dealer's financing offer. Get it before you sit down to sign.",
        tips: ({ money, compact }, saving) => [
            { title: "Make a Larger Down Payment", body: "A higher down payment reduces the loan amount, lowering both the monthly payment and total interest. Aim for 20% or more." },
            { title: "Improve Your Credit Score", body: "Check your credit reports and FICO score before you apply, not after. Pay down card balances and dispute any errors; an account that is closed but still showing a balance is a common reason for an unexpectedly high quote." },
            { title: "Compare New and Used Rates", body: "New-car loans often carry lower rates (roughly 5-8%) than used-car loans (roughly 7-11%), but a used car's lower price can still mean a smaller loan and less interest overall. Run both." },
            { title: "Compare Multiple Lenders", body: `Different lenders offer different rates. Even a 0.5% difference can save you about ${money(saving, 0)} in interest on a ${compact(PROFILES.west.rateTable.principal)} loan over the term.` },
            { title: "Choose an Optimal Term", body: "Choose a term that balances an affordable payment with total interest. Don't go for the longest term just for a lower payment." },
            { title: "Negotiate Fees and Add-ons", body: "Ask the dealer to itemize the documentation fee, and decline add-ons you do not want, such as extended warranties or credit insurance, rather than rolling them into the loan." },
        ],
        mistakes: [
            { title: "Ignoring Taxes and Fees", body: "Calculate the payment on the out-the-door price: the vehicle price plus sales tax, title and registration fees, and dealer fees, minus your down payment or trade-in credit, not just the sticker price." },
            { title: "Not Factoring in Insurance", body: "Auto insurance is required, and lenders typically require full coverage (collision and comprehensive) while you have a loan. It adds to your monthly cost, so factor it into your budget." },
            { title: "Choosing the Longest Term", body: "While it reduces the payment, it significantly increases total interest and keeps you owing more than the car is worth for longer. Only choose a long term if you truly need the lower payment." },
            { title: "Ignoring Fees and Add-ons", body: "Compare the APR, the amount financed and the total of payments, not the advertised rate. A low rate with a heavy doc fee and a bundled warranty can cost more than a plain higher rate." },
            { title: "Multiple Loan Applications", body: "Dealerships often send your application to several lenders at once, and each can result in a hard inquiry. Scoring models typically count auto-loan inquiries made within a short window as one, but ask which lenders they will submit to, and get a pre-approval from your own bank or credit union first." },
        ],
    },
};

/** Row colour classes for the two comparison tables (position-based, as before). */
const RATE_ROW_LABEL = ["text-green-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const RATE_ROW_INTEREST = ["text-yellow-700", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];
const TENURE_ROW_LABEL = ["text-blue-600", "text-yellow-700", "text-orange-600", "text-red-600", "text-red-500"];
const TENURE_ROW_INTEREST = ["text-green-600", "text-orange-600", "text-red-600", "text-red-600", "text-red-600"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarLoanEMICalculator() {
    const { symbol, money, compact, market } = useCurrency();
    const profile = PROFILES[market];
    // Start from the western defaults: SSR and the first client render use USD, so a worked
    // example is on screen immediately. INR users are switched to rupee defaults in the effect below.
    const [loanAmount, setLoanAmount] = useState(PROFILES.west.defaults.price);
    const [interestRate, setInterestRate] = useState(PROFILES.west.defaults.rate);
    const [tenure, setTenure] = useState(PROFILES.west.defaults.tenure);
    const [carType, setCarType] = useState("new");
    const [downPayment, setDownPayment] = useState(PROFILES.west.defaults.down);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    // True once the visitor has changed anything; until then a currency switch re-seeds the defaults.
    const touched = useRef(false);

    const applyDefaults = (m: "india" | "west") => {
        const d = PROFILES[m].defaults;
        setLoanAmount(d.price);
        setDownPayment(d.down);
        setInterestRate(d.rate);
        setTenure(d.tenure);
    };

    useEffect(() => {
        if (touched.current) return;
        applyDefaults(market);
    }, [market]);

    const resetForm = () => {
        touched.current = false;
        setCarType("new");
        applyDefaults(market);
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
        const downPaymentPercentage = (down / (carPrice)) * 100;

        // Determine rating
        let rating = "";
        let ratingColor = "";
        const emiToCarRatio = emi / (principal / 60);

        if (emiToCarRatio <= 0.15) {
            rating = "Very Affordable ★★★★★";
            ratingColor = "text-green-600";
        } else if (emiToCarRatio <= 0.25) {
            rating = "Affordable ★★★★";
            ratingColor = "text-blue-600";
        } else if (emiToCarRatio <= 0.35) {
            rating = "Moderate ★★★";
            ratingColor = "text-yellow-700";
        } else if (emiToCarRatio <= 0.45) {
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

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculateEMI(); }, [loanAmount, interestRate, tenure, carType, downPayment]);

    // Preset values (market-specific)
    const presetAmounts = profile.presets.price;
    const presetRates = profile.presets.rates;
    const presetTenures = profile.presets.tenures;
    const presetDownPayments = profile.presets.down;

    // Comparison tables: every figure comes from calcEmi() for the selected market's base case.
    const { rateTable, tenureTable } = profile;
    const rateRows = rateTable.rates.map((r) => ({ rate: r, ...calcEmi(rateTable.principal, r, rateTable.months) }));
    const tenureRows = tenureTable.months.map((m) => ({ months: m, ...calcEmi(tenureTable.principal, tenureTable.rate, m) }));
    const baseRate = parseFloat(profile.defaults.rate);
    const lowerRateSaving =
        calcEmi(rateTable.principal, baseRate, rateTable.months).totalInterest -
        calcEmi(rateTable.principal, baseRate - 0.5, rateTable.months).totalInterest;
    const fmt = { money, compact };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: market === "india" ? FAQ_SCHEMA_IN : FAQ_SCHEMA }} />
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
                        <span itemProp="name" className="text-ink-soft">Car Loan EMI Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <div>
                            <h3 className="font-semibold">Car Loan EMI Calculator</h3>
                            <p className="text-xs text-ink-faint mt-1">Calculate your monthly car loan payments</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        {/* Car Type */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Car Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        touched.current = true;
                                        setCarType("new");
                                        setInterestRate(profile.defaults.rate);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${carType === "new"
                                        ? "bg-blue-600 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    🚗 New Car
                                </button>
                                <button
                                    onClick={() => {
                                        touched.current = true;
                                        setCarType("used");
                                        setInterestRate(profile.usedRate);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${carType === "used"
                                        ? "bg-orange-500 text-white"
                                        : "bg-surface border border-hairline text-ink-faint hover:text-ink"
                                        }`}
                                >
                                    🚘 Used Car
                                </button>
                            </div>
                            <p className="text-xs text-ink-faint mt-1">
                                {carType === "new" ? profile.carTypeHint.new : profile.carTypeHint.used}
                            </p>
                        </div>

                        {/* Car Price */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Car Price ({symbol})</label>
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
                                {presetDownPayments.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => { touched.current = true; setDownPayment(amount.toString()); }}
                                        className="text-xs px-2 py-0.5 rounded bg-surface border border-hairline text-ink-faint hover:text-ink hover:border-hairline transition-colors"
                                    >
                                        {compact(amount)}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-ink-faint mt-1">Typical down payment: 10-20% of car price</p>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder={carType === "new" ? profile.placeholders.rateNew : profile.placeholders.rateUsed}
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
                                    placeholder="e.g., 60"
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
                                        {month >= 60 ? `${month/12}Y` : `${month}M`}
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
                    emptyIcon="🚗"
                    emptyText="Enter car details and press Calculate"
                    mainResult={result ? {
                        label: "Monthly EMI",
                        value: money(result.emi),
                        color: "text-blue-600"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Affordability Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Total Payment", value: money(result.totalPayment), valueColor: "text-yellow-700" },
                        { label: "Total Interest", value: money(result.totalInterest), valueColor: "text-orange-600" },
                        { label: "Car Price", value: money(result.carPrice) },
                        { label: "Down Payment", value: `${money(result.downPayment)} (${result.downPaymentPercentage.toFixed(1)}%)`, valueColor: "text-purple-600" },
                        { label: "Loan Amount", value: money(result.principal) },
                        { label: "Car Type", value: result.carType === "new" ? "New Car 🚗" : "Used Car 🚘" },
                        { label: "Interest Rate", value: `${result.rate}% p.a.` },
                        { label: "Loan Tenure", value: `${result.months} months (${(result.months/12).toFixed(0)} years)` },
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
                <h2 className="text-xl font-semibold text-ink mb-3">About Car Loan EMI Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    A car depreciates every month you own it, but the loan against it doesn't fall anywhere near as fast — especially in the first two or three years. That gap is the one number showroom conversations tend to skip, and it's the reason an EMI calculator is more useful here than the salesperson's monthly-payment quote: the quote tells you what you'll pay, not what you'll still owe if you need to sell or trade in early.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    Enter the full price you will pay (taxes and registration included), your down payment, the rate you've been quoted, and the tenure, and this calculator works out the EMI, the total interest over the loan, and a month-by-month amortization schedule showing exactly how the split between principal and interest shifts over time.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    It's also the fastest way to see what a dealer's "zero down payment, low EMI" offer actually costs versus a shorter loan with more money down — run both and compare the total interest line, not just the monthly figure.
                </p>
            </section>

            {/* New vs Used Car Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">New vs Used Car Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-blue-200 transition-all">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">🚗 New Car</h3>
                        <ul className="text-xs text-ink-faint space-y-1">
                            {profile.newCar.map((line) => (
                                <li key={line}>• {line}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4 hover:border-orange-200 transition-all">
                        <h3 className="text-sm font-semibold text-orange-600 mb-2">🚘 Used Car</h3>
                        <ul className="text-xs text-ink-faint space-y-1">
                            {profile.usedCar.map((line) => (
                                <li key={line}>• {line}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-ink-faint mt-3">{profile.newUsedNote}</p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This Car Loan EMI Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed">Start by picking <strong className="text-ink">New Car</strong> or <strong className="text-ink">Used Car</strong> — it changes which preset rates and tenures make sense. Then enter the <strong className="text-ink">full car price</strong> (taxes and registration included), either by typing it in or tapping one of the preset amounts.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">If you're planning a down payment, add it next — even a rough figure is useful, since it directly reduces the amount you're financing. Then fill in the <strong className="text-ink">interest rate</strong> your lender or dealer has quoted, and the <strong className="text-ink">tenure</strong> in months.</p>
                    <p className="text-ink-faint text-sm leading-relaxed">Hit <strong className="text-ink">Calculate EMI</strong> and you'll get the monthly payment, total interest, and a full amortization table below. The <strong className="text-ink">affordability rating</strong> gives you a quick read on whether the EMI fits comfortably against typical income levels — use <strong className="text-ink">Reset</strong> to try a different price, rate, or tenure combination.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Why Use a Car Loan EMI Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">✓ Negotiate From a Number, Not a Guess</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Walk into the showroom already knowing your EMI at a few different prices and down payments, so the salesperson's "I can get you this monthly figure" has nothing to hide behind.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Bank Quote vs Dealer Finance</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Run the same price and tenure through both your bank's rate and the dealer's tie-up rate — the gap is often larger than it looks on the sticker.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ See the Depreciation Trap Coming</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">A longer tenure lowers the EMI, but it also stretches out the period where you owe more than the car is worth. The amortization schedule shows you exactly when that crossover happens.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ New vs Used, Side by Side</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">A used car costs less upfront but usually carries a higher rate and shorter tenure. Switch the car type and compare the actual EMI difference, not just the price tag.</p>
                    </div>
                </div>
            </section>

            {/* Car Loan Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Car Loan EMI Formula</h2>
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
                    <p className="text-ink-faint text-xs mt-4">Interest is charged on the balance outstanding, so the early EMIs are mostly interest and the car builds equity slowly.</p>
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
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(rateTable.principal)}, {rateTable.months / 12}Y)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rateRows.map((row, i) => (
                                <tr key={row.rate} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 ${RATE_ROW_LABEL[i]} font-bold`}>{row.rate}%</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className={`py-2 px-4 text-right ${RATE_ROW_INTEREST[i]}`}>{compact(row.totalInterest)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{compact(row.totalPayment)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Comparison shows impact of interest rate on EMI and total cost for a {compact(rateTable.principal)} car loan over {rateTable.months / 12} years</p>
            </section>

            {/* Tenure Comparison */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Tenure Comparison</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-hairline">
                                <th className="text-left py-3 px-4 text-ink-faint">Tenure</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Monthly EMI ({compact(tenureTable.principal)}, {tenureTable.rate}%)</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Interest</th>
                                <th className="text-right py-3 px-4 text-ink-faint">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenureRows.map((row, i) => (
                                <tr key={row.months} className="border-b border-hairline hover:bg-cream">
                                    <td className={`py-2 px-4 ${TENURE_ROW_LABEL[i]} font-bold`}>{row.months / 12} Years</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{money(row.emi, 0)}</td>
                                    <td className={`py-2 px-4 text-right ${TENURE_ROW_INTEREST[i]}`}>{compact(row.totalInterest)}</td>
                                    <td className="py-2 px-4 text-right text-ink-soft">{compact(row.totalPayment)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">* Past roughly five years, the loan balance tends to outrun what the car is worth</p>
            </section>

            {/* Car Loan Eligibility */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Car Loan Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✅ Salaried Individuals</h3>
                        <ul className="text-xs text-ink-faint space-y-1">
                            {profile.salaried(fmt).map((line) => (
                                <li key={line}>• {line}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✅ Self-Employed</h3>
                        <ul className="text-xs text-ink-faint space-y-1">
                            {profile.selfEmployed(fmt).map((line) => (
                                <li key={line}>• {line}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p className="text-xs text-ink-faint mt-3">{profile.eligibilityNote}</p>
            </section>

            {/* Tips for Lower Car Loan EMI */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Tips for Lower Car Loan EMI</h2>
                <ul className="space-y-2">
                    {profile.tips(fmt, lowerRateSaving).map((tip) => (
                        <li key={tip.title} className="flex gap-3 text-sm text-ink-faint">
                            <span className="text-blue-600 mt-0.5">💡</span>
                            <span><strong className="text-ink-soft">{tip.title}:</strong> {tip.body}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Common Mistakes to Avoid When Taking a Car Loan</h2>
                <ul className="space-y-2">
                    {profile.mistakes.map((m) => (
                        <li key={m.title} className="flex gap-3 text-sm text-ink-faint">
                            <span className="text-red-600 mt-0.5">⚠️</span>
                            <span><strong className="text-ink-soft">{m.title}:</strong> {m.body}</span>
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