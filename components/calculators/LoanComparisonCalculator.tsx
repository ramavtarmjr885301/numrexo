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
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label><div className="relative"><input type="number" placeholder="500000" value={loan1Amount} onChange={(e) => setLoan1Amount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (%)</label><div className="relative"><input type="number" step="0.1" placeholder="9" value={loan1Rate} onChange={(e) => setLoan1Rate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tenure (Years)</label><div className="relative"><input type="number" step="0.5" placeholder="5" value={loan1Tenure} onChange={(e) => setLoan1Tenure(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Processing Fees (₹) - Optional</label><div className="relative"><input type="number" placeholder="0" value={loan1Fees} onChange={(e) => setLoan1Fees(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        </div>
                    </div>

                    {/* Loan 2 Input Form */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 bg-green-500/10">
                            <h3 className="font-semibold text-green-400">Loan 2</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Loan Amount (₹)</label><div className="relative"><input type="number" placeholder="500000" value={loan2Amount} onChange={(e) => setLoan2Amount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (%)</label><div className="relative"><input type="number" step="0.1" placeholder="9" value={loan2Rate} onChange={(e) => setLoan2Rate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tenure (Years)</label><div className="relative"><input type="number" step="0.5" placeholder="5" value={loan2Tenure} onChange={(e) => setLoan2Tenure(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Processing Fees (₹) - Optional</label><div className="relative"><input type="number" placeholder="0" value={loan2Fees} onChange={(e) => setLoan2Fees(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        </div>
                    </div>
                </div>

                {/* Calculate Button */}
                <button onClick={calculate} className="py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Compare Loans →</button>

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

            {/* About Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Loan Comparison Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Compare two loans side by side to find the better deal. See EMI, total interest, and total payment including processing fees. Make informed borrowing decisions.</p></section>

            {/* Formula Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Loan Comparison Formula</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm mb-2 text-center">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</p><p className="text-gray-500 text-xs text-center">Total Cost = (EMI × Months) + Processing Fees</p></div></section>

            {/* Loan Tips Table */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">What to Check When Comparing Loans</h2><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Factor</th><th className="text-left py-3 px-4 text-gray-400">Why It Matters</th></tr></thead><tbody>{LOAN_TIPS.map((item, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-gray-300">{item.tip}</td><td className="py-3 px-4 text-gray-400">{item.detail}</td></tr>))}</tbody></table></div></section>

            {/* FAQ Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div></section>
        </>
    );
}