// components/calculators/RDCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is a Recurring Deposit (RD) account?",
        a: "A Recurring Deposit (RD) is a type of term deposit offered by banks where you can invest a fixed amount every month for a predetermined tenure (usually 6 months to 10 years). It's ideal for regular savers who want to build a corpus with guaranteed returns. Interest is compounded quarterly, and the maturity amount is paid at the end of the tenure.",
    },
    {
        q: "What are the current RD interest rates?",
        a: "Current RD interest rates (2025-26): SBI (6.5-7.0%), HDFC Bank (6.6-7.1%), ICICI Bank (6.7-7.2%), Post Office RD (6.9-7.1%), PNB (6.8-7.3%). Senior citizens get 0.5% higher rates. Rates vary by tenure - longer tenures typically offer higher interest. Small finance banks offer up to 8-8.5% on RDs.",
    },
    {
        q: "What is the minimum and maximum RD amount?",
        a: "Most banks allow RD with minimum monthly deposit of ₹500-₹1000. There's no upper limit, but deposits above ₹1.5 lakh per financial year require PAN card documentation. You can invest any amount in multiples of the minimum deposit. Senior citizens get higher interest rates without any maximum limit constraints.",
    },
    {
        q: "Can I withdraw RD before maturity?",
        a: "Yes, premature withdrawal is allowed but with penalty. Most banks charge 0.5-1% lower interest than the contracted rate. Some banks also deduct 0.5-1% of principal as penalty. However, Post Office RD and tax-saving RDs (5-year lock-in) cannot be withdrawn before maturity except in case of account holder's death.",
    },
    {
        q: "How is RD interest calculated?",
        a: "RD interest is calculated using the quarterly compounding formula: A = P × ((1 + r/4)^n - 1) / (1 - (1 + r/4)^(-1/3)), where P is monthly deposit, r is annual interest rate, n is number of quarters. Interest is calculated on the monthly deposits and compounded quarterly, maximizing your returns.",
    },
    {
        q: "Is RD better than Fixed Deposit (FD)?",
        a: "RDs are better for regular monthly savers who want to build discipline. FDs are better if you have a lump sum amount ready. Returns are similar as both offer comparable interest rates. For salaried individuals, RDs are excellent for goal-based saving (vacation, gadget, emergency fund). For retirees with lump sum, FDs are preferable.",
    },
    {
        q: "What is the tax treatment on RD interest?",
        a: "RD interest is fully taxable as 'Income from Other Sources' at your income slab rate. Banks deduct 10% TDS if total interest across all branches exceeds ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G/15H if your total income is below taxable limit. Unlike PPF, there's no tax deduction under Section 80C for RD deposits.",
    },
    {
        q: "How to maximize RD returns?",
        a: "Maximize RD returns by: 1) Choosing banks offering highest rates (small finance banks), 2) Investing early in the month (before 5th-7th), 3) Selecting longer tenures for higher rates, 4) Using RD laddering strategy (multiple RDs with different maturities), 5) Adding senior citizen parent as joint holder, 6) Comparing rates across banks using our calculator.",
    },
];

const RD_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "RD Calculator – Recurring Deposit Calculator",
    description: "Calculate recurring deposit maturity amount, total interest earned, and monthly investment returns. Compare RD interest rates across banks.",
    url: "https://www.numrexo.com/finance/rd-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "Numrexo" },
});

export default function RDCalculator() {
    const [monthlyAmount, setMonthlyAmount] = useState("");
    const [rate, setRate] = useState("7.2");
    const [years, setYears] = useState("5");
    const [seniorCitizen, setSeniorCitizen] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let P = parseFloat(monthlyAmount);
        let r = parseFloat(rate) / 100;
        let n = parseFloat(years);

        if (!P || !r || !n || P <= 0 || r <= 0 || n <= 0) {
            alert("Please enter valid values");
            return;
        }

        // Apply senior citizen rate bonus
        if (seniorCitizen) {
            r = r + 0.005;
        }

        const quarterlyRate = r / 4;
        const quarters = n * 4;

        // RD maturity formula (quarterly compounding)
        const maturity = P * ((Math.pow(1 + quarterlyRate, quarters) - 1) / quarterlyRate) * (1 + quarterlyRate);
        const totalInvestment = P * n * 12;
        const totalInterest = maturity - totalInvestment;
        const effectiveReturn = ((maturity / totalInvestment - 1) / n * 100).toFixed(2);

        setResult({
            maturity: Math.round(maturity).toLocaleString("en-IN"),
            totalInvestment: totalInvestment.toLocaleString("en-IN"),
            interest: Math.round(totalInterest).toLocaleString("en-IN"),
            effectiveReturn,
            monthlyAmount: P,
            years: n,
            rate: (r * 100).toFixed(2),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: RD_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">RD Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Recurring Deposit Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Ideal for regular monthly savings</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Deposit Amount</label>
                            <div className="relative">
                                <input type="number" placeholder="5000" value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum ₹500 per month, no upper limit</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input type="number" placeholder="7.2" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Senior citizens get 0.50% higher rate</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Tenure</label>
                            <div className="relative">
                                <input type="number" placeholder="5" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum 6 months, maximum 10 years</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="seniorCitizen" checked={seniorCitizen} onChange={(e) => setSeniorCitizen(e.target.checked)} className="w-4 h-4 rounded border-gray-700 bg-[#0f1525] text-blue-500" />
                            <label htmlFor="seniorCitizen" className="text-sm text-gray-300">Senior Citizen (60+ years) - +0.50% extra</label>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold hover:shadow-lg transition-all">Calculate RD Returns →</button>
                    </div>
                </div>

                <ResultBox
                    title="RD Maturity Details"
                    isEmpty={!result}
                    emptyIcon="🏦"
                    emptyText="Enter RD investment details and press Calculate"
                    mainResult={result ? { label: "Maturity Amount (Tax-Free)", value: `₹${result.maturity}`, color: "text-emerald-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Investment", value: `₹${result.totalInvestment}` },
                        { label: "Total Interest Earned", value: `₹${result.interest}`, valueColor: "text-green-400" },
                        { label: "Effective Annual Return", value: `${result.effectiveReturn}%` },
                        { label: "Monthly Investment", value: `₹${result.monthlyAmount.toLocaleString()}` },
                        { label: "Tenure", value: `${result.years} years at ${result.rate}% p.a.` },
                    ] : undefined}
                />
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Recurring Deposit (RD) Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    A <strong className="text-gray-300">Recurring Deposit (RD)</strong> is a popular savings scheme offered by banks and post offices where you deposit a fixed amount every month. It's perfect for salaried individuals and regular savers who want to build a substantial corpus with guaranteed, risk-free returns.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our RD calculator helps you estimate the maturity amount, total interest earned, and effective returns on your monthly investments. The calculator uses quarterly compounding (standard for most banks in India) and automatically adds higher rates for senior citizens.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">RD Formula & Calculation</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">Maturity = M × ((1 + r/4)^n - 1) / (r/4) × (1 + r/4)</p>
                    <p className="text-gray-500 text-xs mb-2">Where: M = Monthly Deposit, r = Annual Interest Rate, n = Number of Quarters (Years × 4)</p>
                    <p className="text-gray-500 text-xs">Example: ₹5,000 monthly for 5 years at 7.2% = ₹3,62,000 approx.</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">RD Interest Rates by Bank (2025-26)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Bank</th>
                                <th className="text-right py-3 px-4 text-gray-400">1 Year</th>
                                <th className="text-right py-3 px-4 text-gray-400">3 Years</th>
                                <th className="text-right py-3 px-4 text-gray-400">5 Years</th>
                                <th className="text-right py-3 px-4 text-gray-400">Senior Citizen</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">SBI</td><td className="py-2 px-4 text-right">6.5%</td><td className="py-2 px-4 text-right">6.8%</td><td className="py-2 px-4 text-right">7.0%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">HDFC Bank</td><td className="py-2 px-4 text-right">6.6%</td><td className="py-2 px-4 text-right">6.9%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">ICICI Bank</td><td className="py-2 px-4 text-right">6.7%</td><td className="py-2 px-4 text-right">7.0%</td><td className="py-2 px-4 text-right">7.2%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Post Office</td><td className="py-2 px-4 text-right">6.9%</td><td className="py-2 px-4 text-right">7.0%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
                            <tr><td className="py-2 px-4">PNB</td><td className="py-2 px-4 text-right">6.8%</td><td className="py-2 px-4 text-right">7.1%</td><td className="py-2 px-4 text-right">7.3%</td><td className="py-2 px-4 text-right">+0.5%</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}