"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I compare two loans?",
        a: "Look at three things: Monthly EMI, Total Interest, and Total Payment. A lower interest rate doesn't always mean lower total cost if the loan has higher fees or longer tenure. Always compare the total amount you'll pay, not just the monthly EMI.",
    },
    {
        q: "What is better: lower interest rate or shorter tenure?",
        a: "Lower interest rate saves money over time. Shorter tenure reduces total interest but increases monthly payment. Example: ₹10L loan at 9% for 5 years = ₹20,800 EMI, total ₹12.48L. Same loan at 10% for 3 years = ₹32,267 EMI, total ₹11.62L. Calculate both before deciding.",
    },
    {
        q: "Should I choose a loan with processing fees?",
        a: "Compare the effective interest rate including fees. Example: ₹10L loan at 8% with ₹10,000 fees vs 8.5% with no fees. Calculate total cost including fees to find which is cheaper.",
    },
    {
        q: "How does prepayment affect loan comparison?",
        a: "If you plan to prepay, compare loans with lower prepayment penalties. Some banks charge 2-3% on prepayment, others charge nothing. A loan with slightly higher rate but no prepayment penalty might be better if you plan to pay early.",
    },
    {
        q: "What is the difference between fixed and floating interest rates?",
        a: "Fixed rate: EMI constant throughout loan tenure (1-2% higher). Floating rate: EMI changes with market rates (initially lower). Floating saves money when rates fall, fixed gives certainty. For long-term loans (10+ years), floating usually saves 2-3% overall.",
    },
    {
        q: "How does loan tenure affect total interest?",
        a: "Longer tenure = lower EMI but MUCH higher total interest. Example: ₹50L at 9%: 10 years = ₹63,333 EMI (₹26L interest). 20 years = ₹44,986 EMI (₹58L interest). Choose shortest tenure you can afford for maximum savings.",
    },
    {
        q: "What are hidden charges in loans?",
        a: "Hidden charges: Processing fee (0.5-2%), Legal/technical fee (₹5,000-20,000), Prepayment penalty (2-5%), Late payment fee (2-3%/month), Loan cancellation fee (1-2%), Statement charges, Document retrieval fees. Ask lender for complete fee list before signing.",
    },
    {
        q: "How to calculate effective interest rate including fees?",
        a: "Effective Rate = (Total Interest + Fees) ÷ (Loan Amount × Tenure) × 100. Example: ₹10L loan, ₹50,000 interest, ₹10,000 fees, 3 years = (60,000) ÷ (10,00,000 × 3) × 100 = 2% effective rate (much higher than stated rate!). Always compare effective rates.",
    },
    {
        q: "What is the difference between secured and unsecured loans?",
        a: "Secured loan (Home, Car, Gold): Lower interest rates (8-12%), longer tenure, requires collateral, lower risk for bank. Unsecured loan (Personal, Education): Higher rates (12-18%), shorter tenure, no collateral needed, faster approval. Use our calculator to compare both types.",
    },
    {
        q: "How does credit score affect loan interest rates?",
        a: "Credit score (CIBIL) 750+ = Best rates (lowest 0.5-1%). 700-749 = Standard rates (+0.5-1%). 650-699 = Higher rates (+2-3%). Below 650 = May be rejected or very high rates (18-24%). Check your score before applying to negotiate better rates.",
    },
];

const LOAN_TIPS = [
    { tip: "Check prepayment penalties", detail: "Some loans charge 2-3% for early payment" },
    { tip: "Compare processing fees", detail: "Fees can range from 0.5% to 2% of loan amount" },
    { tip: "Look at foreclosure charges", detail: "Floating rate loans usually have no foreclosure charges" },
    { tip: "Consider GST on fees", detail: "Processing fees have 18% GST added" },
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
    name: "Loan Comparison Calculator – Compare Two Loans",
    description: "Compare two loans side by side. See EMI, total interest, and total payment to choose the better loan option.",
    url: "https://www.numrexo.com/finance/loan-comparison-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Side by side comparison", "EMI calculation", "Total interest comparison", "Savings analysis"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Loan Comparison Calculator", item: "https://www.numrexo.com/finance/loan-comparison-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoanComparisonCalculator() {
    // Loan 1
    const [loan1Amount, setLoan1Amount] = useState("");
    const [loan1Rate, setLoan1Rate] = useState("");
    const [loan1Tenure, setLoan1Tenure] = useState("");
    const [loan1Fees, setLoan1Fees] = useState("");
    // Loan 2
    const [loan2Amount, setLoan2Amount] = useState("");
    const [loan2Rate, setLoan2Rate] = useState("");
    const [loan2Tenure, setLoan2Tenure] = useState("");
    const [loan2Fees, setLoan2Fees] = useState("");
    // Result
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateEMI = (amount: number, rate: number, tenureYears: number) => {
        const monthlyRate = rate / 100 / 12;
        const months = tenureYears * 12;
        const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - amount;
        return { emi, totalPayment, totalInterest };
    };

    const calculate = () => {
        const a1 = parseFloat(loan1Amount);
        const r1 = parseFloat(loan1Rate);
        const t1 = parseFloat(loan1Tenure);
        const f1 = parseFloat(loan1Fees) || 0;

        const a2 = parseFloat(loan2Amount);
        const r2 = parseFloat(loan2Rate);
        const t2 = parseFloat(loan2Tenure);
        const f2 = parseFloat(loan2Fees) || 0;

        if (!a1 || !r1 || !t1 || !a2 || !r2 || !t2) {
            alert("Please fill all required fields for both loans");
            return;
        }

        const loan1 = calculateEMI(a1, r1, t1);
        const loan2 = calculateEMI(a2, r2, t2);

        const total1WithFees = loan1.totalPayment + f1;
        const total2WithFees = loan2.totalPayment + f2;
        const savings = Math.abs(total1WithFees - total2WithFees);
        const betterLoan = total1WithFees < total2WithFees ? "Loan 1" : "Loan 2";

        setResult({
            loan1: {
                amount: a1,
                rate: r1,
                tenure: t1,
                fees: f1,
                emi: loan1.emi,
                totalInterest: loan1.totalInterest,
                totalPayment: loan1.totalPayment,
                totalWithFees: total1WithFees,
            },
            loan2: {
                amount: a2,
                rate: r2,
                tenure: t2,
                fees: f2,
                emi: loan2.emi,
                totalInterest: loan2.totalInterest,
                totalPayment: loan2.totalPayment,
                totalWithFees: total2WithFees,
            },
            savings,
            betterLoan,
        });
    };

    const resetForm = () => {
        setLoan1Amount("");
        setLoan1Rate("");
        setLoan1Tenure("");
        setLoan1Fees("");
        setLoan2Amount("");
        setLoan2Rate("");
        setLoan2Tenure("");
        setLoan2Fees("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/finance" itemProp="item" className="hover:text-gray-300">Finance Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Loan Comparison Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 gap-6 mb-8">
                {/* Loan 1 and Loan 2 Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Loan 1 Input Form */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 bg-blue-500/10">
                            <h3 className="font-semibold text-blue-400">Loan 1</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label><div className="relative"><input type="number" placeholder="500000" value={loan1Amount} onChange={(e) => setLoan1Amount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (%)</label><div className="relative"><input type="number" step="0.1" placeholder="9" value={loan1Rate} onChange={(e) => setLoan1Rate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tenure (Years)</label><div className="relative"><input type="number" step="0.5" placeholder="5" value={loan1Tenure} onChange={(e) => setLoan1Tenure(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Processing Fees (₹) - Optional</label><div className="relative"><input type="number" placeholder="0" value={loan1Fees} onChange={(e) => setLoan1Fees(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        </div>
                    </div>

                    {/* Loan 2 Input Form */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 bg-green-500/10">
                            <h3 className="font-semibold text-green-400">Loan 2</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label><div className="relative"><input type="number" placeholder="500000" value={loan2Amount} onChange={(e) => setLoan2Amount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (%)</label><div className="relative"><input type="number" step="0.1" placeholder="9" value={loan2Rate} onChange={(e) => setLoan2Rate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tenure (Years)</label><div className="relative"><input type="number" step="0.5" placeholder="5" value={loan2Tenure} onChange={(e) => setLoan2Tenure(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Processing Fees (₹) - Optional</label><div className="relative"><input type="number" placeholder="0" value={loan2Fees} onChange={(e) => setLoan2Fees(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        </div>
                    </div>
                </div>

                {/* Calculate & Reset Buttons */}
                <div className="flex gap-3">
                    <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Compare Loans →</button>
                    <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Loan Comparison Results"
                    isEmpty={!result}
                    emptyIcon="⚖️"
                    emptyText="Enter both loan details and press Compare"
                    mainResult={result ? { label: "Better Choice", value: result.betterLoan, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Monthly EMI - Loan 1", value: `₹${Math.round(result.loan1.emi).toLocaleString()}`, valueColor: "text-blue-400" },
                        { label: "Monthly EMI - Loan 2", value: `₹${Math.round(result.loan2.emi).toLocaleString()}`, valueColor: "text-green-400" },
                        { label: "Total Interest - Loan 1", value: `₹${Math.round(result.loan1.totalInterest).toLocaleString()}` },
                        { label: "Total Interest - Loan 2", value: `₹${Math.round(result.loan2.totalInterest).toLocaleString()}` },
                        { label: "Total Payment (incl. fees) - Loan 1", value: `₹${Math.round(result.loan1.totalWithFees).toLocaleString()}` },
                        { label: "Total Payment (incl. fees) - Loan 2", value: `₹${Math.round(result.loan2.totalWithFees).toLocaleString()}` },
                        { label: "You Save", value: `₹${Math.round(result.savings).toLocaleString()}`, valueColor: "text-green-400" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Loan Comparison Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Loan Comparison Calculator</strong> helps you compare two loans side by side. Whether you're comparing home loans, car loans, or personal loans from different banks, know which offer truly saves you money.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    See monthly EMI, total interest payable, total payment including processing fees, and how much you save by choosing the better loan. Make informed borrowing decisions.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Loan Comparison Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">Loan 1 details</strong> — amount, interest rate, tenure, processing fees.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">Loan 2 details</strong> from another bank or offer.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Compare Loans"</strong> to see side-by-side comparison.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Review EMI, total interest, total payment, and which loan is better.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and compare different loan offers.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Loan Comparison Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Save Money</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find the cheaper loan offer. Even 0.5% lower interest rate can save lakhs on large loans like home loans.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Avoid Hidden Costs</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Processing fees, legal charges, and prepayment penalties add to loan cost. Include them in comparison for true cost.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Tenure Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See how different tenures affect EMI and total interest. Choose the tenure that fits your budget.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Bank Negotiation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Show bank A's offer to bank B to negotiate better rates. Knowledge is power in loan negotiation.</p>
                    </div>
                </div>
            </section>

            {/* Factors to Consider */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Factors to Consider When Comparing Loans</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">•</span><span><strong className="text-gray-300">Interest Rate (APR):</strong> Compare Annual Percentage Rate which includes interest + fees, not just the advertised rate.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">•</span><span><strong className="text-gray-300">Loan Tenure:</strong> Shorter tenure = higher EMI but lower total interest. Longer tenure = lower EMI but much higher total cost.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">•</span><span><strong className="text-gray-300">Processing Fees:</strong> Ranges from 0.5-2% of loan amount + 18% GST. Ask for fee waiver during festive offers.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">•</span><span><strong className="text-gray-300">Prepayment Penalty:</strong> Some banks charge 2-5% for early repayment. Floating rate loans usually have zero penalty.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-purple-400 mt-0.5">•</span><span><strong className="text-gray-300">Hidden Charges:</strong> Legal fees, valuation charges, document retrieval fees, late payment fees, loan cancellation fees.</span></li>
                </ul>
            </section>

            {/* Loan Types & Features */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Loan Types & Their Features</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Loan Type</th><th className="text-left py-3 px-4 text-gray-400">Interest Rate</th><th className="text-left py-3 px-4 text-gray-400">Tenure</th><th className="text-left py-3 px-4 text-gray-400">Fees</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Home Loan</td><td className="py-2 px-4">8.4-9.5%</td><td className="py-2 px-4">10-30 years</td><td className="py-2 px-4">0.5-1%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Car Loan</td><td className="py-2 px-4">9-12%</td><td className="py-2 px-4">3-7 years</td><td className="py-2 px-4">1-2%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Personal Loan</td><td className="py-2 px-4">11-18%</td><td className="py-2 px-4">1-5 years</td><td className="py-2 px-4">1-3%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Education Loan</td><td className="py-2 px-4">8-13%</td><td className="py-2 px-4">5-15 years</td><td className="py-2 px-4">1% + GST</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Tips to Get Best Loan Deal */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips to Get the Best Loan Deal</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Improve credit score:</strong> 750+ CIBIL score gets 0.5-1% lower rates. Pay credit cards on time, reduce credit utilization.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Negotiate with banks:</strong> Use competitor offers to get better rates. Banks often match or beat competitor rates.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Choose shorter tenure:</strong> If EMI is affordable, choose shorter tenure to save lakhs in interest.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Ask for fee waiver:</strong> During festive seasons, many banks waive processing fees completely.</span></li>
                </ul>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Loan Comparison Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2 text-center">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</p>
                    <p className="text-gray-500 text-xs text-center">Total Cost = (EMI × Months) + Processing Fees</p>
                    <p className="text-gray-500 text-xs text-center mt-2">Better Loan = Lower Total Cost (including all fees)</p>
                </div>
            </section>

            {/* Loan Tips Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">What to Check When Comparing Loans</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Factor</th><th className="text-left py-3 px-4 text-gray-400">Why It Matters</th></tr></thead>
                        <tbody>
                            {LOAN_TIPS.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{item.tip}</td>
                                    <td className="py-3 px-4 text-gray-400">{item.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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