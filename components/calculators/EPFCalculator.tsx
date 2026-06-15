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
    {
        q: "What is the current EPF interest rate?",
        a: "The current EPF interest rate for 2024-25 is 8.15% per annum (declared by EPFO). Historical rates: 2023-24: 8.15%, 2022-23: 8.1%, 2021-22: 8.1%, 2020-21: 8.5%, 2019-20: 8.5%. The rate is declared every year based on EPFO's earnings from investments in government securities.",
    },
    {
        q: "Is EPF taxable on withdrawal?",
        a: "EPF withdrawal is TAX-FREE if you have completed 5 continuous years of service. If you withdraw before 5 years: Employee contribution is taxable, Employer contribution is taxable, Interest earned is taxable. TDS @ 10% applies if withdrawal exceeds ₹50,000 (PAN required). No TDS if withdrawal amount is below ₹50,000.",
    },
    {
        q: "What is the EPF pension scheme (EPS)?",
        a: "EPS (Employee Pension Scheme) gets 8.33% of your basic salary (subject to ₹15,000 cap) from employer's 12% contribution. Monthly pension after 58 years: (Pensionable Salary × Pensionable Service) ÷ 70. Minimum service: 10 years. Maximum pensionable salary: ₹15,000/month (₹1,500 pension per year of service).",
    },
    {
        q: "How to check EPF balance online?",
        a: "Ways to check EPF balance: 1) EPFO Portal (passbook), 2) UMANG App, 3) Missed Call 9966044425 (from registered mobile), 4) SMS 'EPFOHO UAN' to 7738299899, 5) Bank ATM (if linked). You'll need your UAN (Universal Account Number) and password.",
    },
    {
        q: "What is the EPF nomination process?",
        a: "Nomination is mandatory for EPF. Without nomination, legal heirs face delays and documentation. Steps: 1) Login to EPFO portal, 2) Go to 'Manage' → 'E-Nomination', 3) Add family members as nominees, 4) Share percentage (total must be 100%), 5) Submit digitally. Multiple nominees allowed. Update nomination after marriage or childbirth.",
    },
    {
        q: "What happens to EPF on death of the employee?",
        a: "On death, the entire EPF corpus is paid to the nominee (tax-free). Additional benefits: EDLI (Employees' Deposit Linked Insurance) provides up to ₹7 lakhs life insurance. Monthly pension to spouse (50% of employee's pension) and children (25% each) under EPS. Nominee must submit death certificate and claim forms to EPFO office.",
    },
    {
        q: "Can I contribute more than 12% to EPF (VPF)?",
        a: "Yes! VPF (Voluntary Provident Fund) allows up to 100% of basic salary as additional contribution. Benefits: Same 8.15% interest rate as EPF, Tax-free returns (under Section 80C up to ₹1.5L/year), Pensionable? No, only employee's extra portion (employer doesn't match). Withdrawal rules same as EPF (5 years for tax-free). Great for risk-free retirement savings.",
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

    const resetForm = () => {
        setBasicSalary("");
        setCurrentAge("25");
        setRetirementAge("58");
        setEmployerContribution("12");
        setInterestRate("8.1");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EPF_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">EPF Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your EPF Details</h3><p className="text-xs text-gray-500 mt-1">Plan your retirement corpus</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Basic Salary + DA</label><div className="relative"><input type="number" placeholder="25000" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div><p className="text-xs text-gray-500 mt-1">This is what 12% of your contribution is calculated on</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Your Current Age</label><div className="relative"><input type="number" placeholder="25" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Retirement Age</label><div className="relative"><input type="number" placeholder="58" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div><p className="text-xs text-gray-500 mt-1">EPF withdrawal allowed after 58 (55 for some organizations)</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected EPF Interest Rate</label><div className="relative"><input type="number" placeholder="8.1" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">% p.a.</span></div><p className="text-xs text-gray-500 mt-1">Current EPF rate is 8.15% (2024-25). Government revises it every year.</p></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition-all">Calculate EPF Corpus →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About EPF Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">EPF Calculator</strong> helps you estimate your retirement corpus from the Employee Provident Fund. EPF is a mandatory savings scheme for salaried employees in India, where both employee and employer contribute 12% of basic salary.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    With government-guaranteed interest rates (currently 8.15%) and tax-free withdrawals after 5 years, EPF is one of the safest retirement savings instruments in India. Use our calculator to plan your retirement and see the power of long-term compounding.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This EPF Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">monthly basic salary + DA</strong> (the amount on which EPF is calculated).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">current age</strong> and <strong className="text-white">retirement age</strong> (standard is 58).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Adjust the <strong className="text-white">expected EPF interest rate</strong> (current rate is 8.15%).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate EPF Corpus"</strong> to see your retirement amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Why EPF Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why EPF is a Retirement Superstar</h2>
                <p className="text-gray-400 text-sm leading-relaxed">EPF is often called the 'silent wealth builder' because you barely notice the money leaving your salary, but over 30+ years, it grows into a massive corpus. The government guarantee means no market risk, and the tax-free withdrawal (after 5 years) makes it even sweeter. Plus, your employer is essentially giving you free money with their contribution.</p>
            </section>

            {/* EPF Tax Benefits */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">EPF Tax Benefits Under Section 80C</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Employee Contribution:</strong> Eligible for deduction up to ₹1.5 lakhs per year under Section 80C.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Employer Contribution:</strong> Not taxable in your hands (up to 12% of basic).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Interest Earned:</strong> Tax-free if you complete 5 continuous years of service.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Final Withdrawal:</strong> Completely tax-free after 5 years of continuous service.</span></li>
                </ul>
            </section>

            {/* EPF vs Other Retirement Investments */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">EPF vs Other Retirement Investments</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Feature</th>
                                <th className="text-left py-3 px-4 text-gray-400">EPF</th>
                                <th className="text-left py-3 px-4 text-gray-400">PPF</th>
                                <th className="text-left py-3 px-4 text-gray-400">NPS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Interest Rate (current)</td>
                                <td className="py-2 px-4 text-yellow-400">8.15%</td>
                                <td className="py-2 px-4 text-yellow-400">7.1%</td>
                                <td className="py-2 px-4 text-yellow-400">9-10% (market-linked)</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Employer Contribution</td>
                                <td className="py-2 px-4 text-green-400">✅ Yes (3.67%)</td>
                                <td className="py-2 px-4 text-red-400">❌ No</td>
                                <td className="py-2 px-4 text-green-400">✅ Yes (up to 14%)</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-2 px-4">Tax-free Withdrawal</td>
                                <td className="py-2 px-4 text-green-400">✅ After 5 years</td>
                                <td className="py-2 px-4 text-yellow-400">After 15 years (partial)</td>
                                <td className="py-2 px-4 text-yellow-400">60% at retirement</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4">Risk Level</td>
                                <td className="py-2 px-4 text-green-400">Government backed</td>
                                <td className="py-2 px-4 text-green-400">Government backed</td>
                                <td className="py-2 px-4 text-yellow-400">Moderate (market-linked)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* EPF Withdrawal Rules Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">EPF Withdrawal Rules Before Retirement</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Purpose</th><th className="text-left py-3 px-4 text-gray-400">Minimum Service</th><th className="text-left py-3 px-4 text-gray-400">Maximum Withdrawal</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Buying/Constructing House</td><td className="py-2 px-4 text-yellow-400">5 years</td><td className="py-2 px-4">90% of corpus</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Marriage (Self/Sibling/Children)</td><td className="py-2 px-4 text-yellow-400">7 years</td><td className="py-2 px-4">50% of corpus</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Higher Education</td><td className="py-2 px-4 text-yellow-400">7 years</td><td className="py-2 px-4">50% of corpus</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Medical Emergency</td><td className="py-2 px-4 text-yellow-400">None</td><td className="py-2 px-4">6 months basic + DA</td></tr>
                            <tr><td className="py-2 px-4">Unemployment (no job)</td><td className="py-2 px-4 text-yellow-400">2 months wait</td><td className="py-2 px-4">100% after 2 months</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* How EPF Contributions Break Down */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">How EPF Contributions Break Down</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-blue-400 mb-2">Your Contribution (12% of basic)</h3><p className="text-white font-mono text-sm">100% → EPF Account</p><p className="text-gray-500 text-xs mt-2">Example: ₹25,000 basic → ₹3,000/month to EPF</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><h3 className="text-sm font-semibold text-blue-400 mb-2">Employer Contribution (12% of basic)</h3><p className="text-white font-mono text-sm">3.67% → EPF Account + 8.33% → EPS Pension</p><p className="text-gray-500 text-xs mt-2">Example: ₹25,000 basic → ₹917 to EPF, ₹2,083 to pension</p></div></div></section>

            {/* FAQ Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}