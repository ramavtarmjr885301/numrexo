// components/calculators/EPFCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How does EPF work?",
        a: "Every month, 12% of your basic salary (plus DA) goes into EPF. But here's the breakdown: your 12% goes entirely to EPF. Your employer's 12% gets split - 3.67% to EPF and 8.33% to EPS (pension scheme). The government guarantees an interest rate (around 8-8.5% these days), and the whole amount is tax-free when you withdraw after 5 years of continuous service.",
    },
    {
        q: "Can I withdraw EPF money before retirement?",
        a: "You can withdraw EPF before retirement, but there are rules. For unemployment (leaving job without another one lined up): you can withdraw after 2 months. For specific needs: buying a house (after 5 years), marriage (after 7 years), medical emergencies, or higher education. Partial withdrawals are also allowed for home loan repayment or home renovation.",
    },
    {
        q: "What happens to EPF when I change jobs?",
        a: "You have two options: transfer or withdraw. Transfer is smarter - your EPF account stays active, years of service continue counting, and you keep earning compound interest. Withdrawing resets your service count and you'll pay tax if you withdraw before 5 years. Always transfer your EPF when switching jobs.",
    },
];

const EPF_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EPF Calculator – Employee Provident Fund Calculator",
    description: "Calculate your EPF corpus at retirement including employee and employer contributions with compound interest.",
    url: "https://www.numrexo.com/finance/epf-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function EPFCalculator() {
    const [basicSalary, setBasicSalary] = useState("");
    const [currentAge, setCurrentAge] = useState("25");
    const [retirementAge, setRetirementAge] = useState("58");
    const [employerContribution, setEmployerContribution] = useState("12");
    const [interestRate, setInterestRate] = useState("8.1");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const basic = parseFloat(basicSalary);
        const current = parseFloat(currentAge);
        const retire = parseFloat(retirementAge);
        const empContributionPercent = parseFloat(employerContribution);
        const rate = parseFloat(interestRate) / 100;
        const years = retire - current;

        if (!basic || basic <= 0 || years <= 0) {
            alert("Please enter valid details");
            return;
        }

        // Employee contributes 12% of basic
        const employeeMonthly = basic * 0.12;
        // Employer contributes 3.67% to EPF (rest 8.33% goes to pension)
        const employerMonthly = basic * (empContributionPercent / 100);
        const totalMonthly = employeeMonthly + employerMonthly;

        let balance = 0;
        for (let i = 0; i < years * 12; i++) {
            balance = balance + totalMonthly;
            balance = balance * (1 + rate / 12);
        }

        const employeeTotal = employeeMonthly * years * 12;
        const employerTotal = employerMonthly * years * 12;

        setResult({
            maturityAmount: Math.round(balance).toLocaleString("en-IN"),
            employeeContribution: Math.round(employeeTotal).toLocaleString("en-IN"),
            employerContribution: Math.round(employerTotal).toLocaleString("en-IN"),
            totalInterest: Math.round(balance - employeeTotal - employerTotal).toLocaleString("en-IN"),
            years,
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EPF_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">EPF Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your EPF Details</h3><p className="text-xs text-gray-500 mt-1">Plan your retirement corpus</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Basic Salary + DA</label><div className="relative"><input type="number" placeholder="25000" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div><p className="text-xs text-gray-500 mt-1">This is what 12% of your contribution is calculated on</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Your Current Age</label><div className="relative"><input type="number" placeholder="25" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Retirement Age</label><div className="relative"><input type="number" placeholder="58" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div><p className="text-xs text-gray-500 mt-1">EPF withdrawal allowed after 58 (55 for some organizations)</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected EPF Interest Rate</label><div className="relative"><input type="number" placeholder="8.1" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span></div><p className="text-xs text-gray-500 mt-1">Current EPF rate is 8.15% (2024-25). Government revises it every year.</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition-all">Calculate EPF Corpus →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your EPF at Retirement"
                    isEmpty={!result}
                    emptyIcon="🏦"
                    emptyText="Enter your salary and age"
                    mainResult={result ? { label: "Total EPF Corpus at Age 58", value: `₹${result.maturityAmount}`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Your Contributions (12% of basic)", value: `₹${result.employeeContribution}` },
                        { label: "Employer Contributions (3.67% of basic)", value: `₹${result.employerContribution}` },
                        { label: "Total Interest Earned", value: `₹${result.totalInterest}`, valueColor: "text-green-400" },
                        { label: "Working Years Left", value: `${result.years} years` },
                    ] : undefined}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Why EPF is a Retirement Superstar</h2><p className="text-gray-400 text-sm leading-relaxed">EPF is often called the 'silent wealth builder' because you barely notice the money leaving your salary, but over 30+ years, it grows into a massive corpus. The government guarantee means no market risk, and the tax-free withdrawal (after 5 years) makes it even sweeter. Plus, your employer is essentially giving you free money with their contribution.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">How EPF Contributions Break Down</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-blue-400 mb-2">Your Contribution (12% of basic)</h3><p className="text-white font-mono text-sm">100% → EPF Account</p><p className="text-gray-500 text-xs mt-2">Example: ₹25,000 basic → ₹3,000/month to EPF</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-blue-400 mb-2">Employer Contribution (12% of basic)</h3><p className="text-white font-mono text-sm">3.67% → EPF Account + 8.33% → EPS Pension</p><p className="text-gray-500 text-xs mt-2">Example: ₹25,000 basic → ₹917 to EPF, ₹2,083 to pension</p></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}