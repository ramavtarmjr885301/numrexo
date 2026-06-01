// components/calculators/SWPCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is a SWP and how does it work?",
        a: "SWP stands for Systematic Withdrawal Plan. Think of it as the opposite of a SIP - instead of putting money in every month, you're taking money out. You invest a lump sum in a mutual fund, then set up regular withdrawals (monthly, quarterly, etc.). The rest of your money keeps growing in the market. It's a popular way to generate regular income during retirement without selling everything at once.",
    },
    {
        q: "Is SWP better than a traditional pension plan?",
        a: "Depends on what you value. Traditional pension plans give you guaranteed income but lower returns (think 6-7%). SWPs invest in the market, so your returns can be higher (8-12% historically), but your income isn't guaranteed - if markets crash, your withdrawals might eat into your principal. Many retirees use a mix: some guaranteed income for essentials, SWP for extras.",
    },
    {
        q: "How long will my SWP last?",
        a: "That depends on three things: how much you start with, how much you withdraw each month, and what returns your investments earn. If your withdrawal rate is less than your returns, your money could last indefinitely. The classic 4% rule (withdraw 4% of your corpus in year 1, adjust for inflation after) is designed to make money last 30+ years. Our calculator shows you different scenarios.",
    },
    {
        q: "Are SWP withdrawals taxable?",
        a: "Yes, but here's the smart part - you're only taxed on the capital gains portion, not the whole withdrawal. Since you've already paid tax on the money you invested, only the profit part gets taxed. Equity funds: LTCG over ₹1 lakh/year at 10%. Debt funds: capital gains added to your income. By withdrawing systematically, you can manage which tax bracket you fall into.",
    },
];

const SWP_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SWP Calculator – Systematic Withdrawal Plan Calculator",
    description: "Calculate how long your retirement corpus will last with regular monthly withdrawals. Plan your retirement income strategy.",
    url: "https://www.numrexo.com/investment/swp-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "Numrexo" },
});

export default function SWPCalculator() {
    const [corpus, setCorpus] = useState("");
    const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("");
    const [expectedReturn, setExpectedReturn] = useState("10");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let balance = parseFloat(corpus);
        let withdrawal = parseFloat(monthlyWithdrawal);
        let monthlyReturn = parseFloat(expectedReturn) / 100 / 12;
        let months = 0;

        if (!balance || !withdrawal || balance <= 0 || withdrawal <= 0) {
            alert("Please enter valid values");
            return;
        }

        if (withdrawal > balance) {
            alert("Monthly withdrawal cannot exceed your total corpus");
            return;
        }

        // Calculate how long the corpus lasts
        while (balance > 0 && months < 600) { // Max 50 years
            balance = balance * (1 + monthlyReturn) - withdrawal;
            months++;
            if (balance < 0) break;
        }

        const totalWithdrawn = withdrawal * months;
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        setResult({
            years,
            months: remainingMonths,
            totalMonths: months,
            totalWithdrawn: Math.round(totalWithdrawn).toLocaleString("en-IN"),
            monthlyAmount: withdrawal.toLocaleString("en-IN"),
            finalBalance: balance > 0 ? Math.round(balance).toLocaleString("en-IN") : "₹0",
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SWP_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/investment" className="hover:text-gray-300">Investment Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">SWP Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your SWP Setup</h3><p className="text-xs text-gray-500 mt-1">Turn your savings into regular income</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Your Retirement Corpus</label><div className="relative"><input type="number" placeholder="5000000" value={corpus} onChange={(e) => setCorpus(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Withdrawal You Want</label><div className="relative"><input type="number" placeholder="25000" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return on Investment</label><div className="relative"><input type="number" placeholder="10" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Conservative debt funds: 6-8% | Balanced funds: 8-10% | Equity: 10-12%</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-700 text-white font-semibold hover:shadow-lg transition-all">Calculate SWP Duration →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your SWP Results"
                    isEmpty={!result}
                    emptyIcon="💸"
                    emptyText="Enter your corpus and monthly withdrawal"
                    mainResult={result ? { label: "Your Money Will Last", value: `${result.years} years ${result.months} months`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total You'll Withdraw", value: `₹${result.totalWithdrawn}`, valueColor: "text-green-400" },
                        { label: "Monthly Income", value: `₹${result.monthlyAmount}` },
                        { label: "Remaining Balance", value: result.finalBalance },
                    ] : undefined}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Making Your Money Last in Retirement</h2><p className="text-gray-400 text-sm leading-relaxed mb-3">SWPs are popular for a reason - they give you regular income while letting the rest of your money keep growing. The key is picking a withdrawal rate that's sustainable. Financial planners often suggest the 4% rule: withdraw 4% of your corpus in your first year of retirement, then adjust for inflation each year after. That's designed to make your money last 30 years.</p><p className="text-gray-400 text-sm leading-relaxed">If you want to leave money for your kids or be extra safe, aim for 3-3.5% instead. If you're okay with spending down your principal (or don't have kids to leave money to), you can withdraw more - just know your money won't last as long.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">The 4% Rule Explained</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm mb-2">Year 1 Withdrawal = Corpus × 0.04</p><p className="text-gray-500 text-xs">Example: ₹1 Crore corpus → ₹40,000 per month first year (₹4.8 lakh annual)</p><p className="text-gray-500 text-xs mt-2">Then increase by inflation (say 6%) each year: Year 2: ₹42,400/month, Year 3: ₹44,944/month, etc.</p><p className="text-gray-500 text-xs mt-2">This strategy has historically worked 95% of the time for 30-year retirements.</p></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}