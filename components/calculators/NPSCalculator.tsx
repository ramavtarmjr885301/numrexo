// components/calculators/NPSCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "What is NPS and how does it work?",
        a: "NPS (National Pension System) is a government-backed retirement scheme. You contribute regularly during your working years, the money gets invested in a mix of stocks and bonds (you choose the allocation), and when you retire, you can take out 60% as a lump sum (tax-free) and use the remaining 40% to buy an annuity that gives you a monthly pension for life. It's one of the lowest-cost retirement options in India.",
    },
    {
        q: "What are the tax benefits of NPS?",
        a: "NPS offers great tax benefits: 1) Employee contribution up to 10% of salary (80,000 limit in old regime). 2) Additional deduction of ₹50,000 under Section 80CCD(1B) - this is over and above the 1.5 lakh limit. 3) Employer contribution up to 10% of salary is tax-free (14% for government employees). At withdrawal, 60% is completely tax-free, and the annuity portion is taxable when you receive the pension.",
    },
    {
        q: "Can I withdraw money from NPS before retirement?",
        a: "You can withdraw up to 25% of your contributions after 3 years for specific needs: buying a house, treating critical illness, paying for children's higher education or marriage, or starting a business. You can do this up to 3 times during the entire tenure. But partial withdrawal means you'll have less for retirement, so think carefully before doing it.",
    },
    {
        q: "What is the difference between Tier 1 and Tier 2 NPS account?",
        a: "Tier 1 is the main retirement account - it has restrictions on withdrawal (locked until age 60) but gives you the tax benefits. Tier 2 is like a voluntary savings account - you can withdraw anytime, no tax benefits on contributions, but you still get the low costs and professional management. Tier 2 is optional and you need a Tier 1 account first.",
    },
];

const NPS_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NPS Calculator – National Pension System Calculator",
    description: "Estimate your NPS retirement corpus, monthly pension, and tax benefits. Plan your retirement savings with India's government pension scheme.",
    url: "https://www.numrexo.com/investment/nps-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "Numrexo" },
});

export default function NPSCalculator() {
    const [monthlyContribution, setMonthlyContribution] = useState("");
    const [currentAge, setCurrentAge] = useState("30");
    const [retirementAge, setRetirementAge] = useState("60");
    const [expectedReturn, setExpectedReturn] = useState("10");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const P = parseFloat(monthlyContribution);
        const current = parseFloat(currentAge);
        const retire = parseFloat(retirementAge);
        const r = parseFloat(expectedReturn) / 100 / 12;
        const months = (retire - current) * 12;

        if (!P || !current || !retire || !r || P <= 0 || months <= 0) {
            alert("Please fill all fields correctly");
            return;
        }

        const futureValue = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
        const lumpSum = futureValue * 0.6;
        const annuityAmount = futureValue * 0.4;
        const monthlyPension = annuityAmount * 0.06 / 12;

        setResult({
            totalCorpus: Math.round(futureValue).toLocaleString("en-IN"),
            lumpSumTaxFree: Math.round(lumpSum).toLocaleString("en-IN"),
            annuity: Math.round(annuityAmount).toLocaleString("en-IN"),
            monthlyPension: Math.round(monthlyPension).toLocaleString("en-IN"),
            totalInvestment: (P * months).toLocaleString("en-IN"),
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: NPS_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/investment" className="hover:text-gray-300">Investment Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">NPS Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your Retirement Plan</h3><p className="text-xs text-gray-500 mt-1">Plan for a comfortable retirement</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Contribution</label><div className="relative"><input type="number" placeholder="5000" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div><p className="text-xs text-gray-500 mt-1">You can start with as little as ₹500 per month</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Your Current Age</label><div className="relative"><input type="number" placeholder="30" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Retirement Age</label><div className="relative"><input type="number" placeholder="60" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div><p className="text-xs text-gray-500 mt-1">NPS allows withdrawal only after age 60</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return</label><div className="relative"><input type="number" placeholder="10" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div><p className="text-xs text-gray-500 mt-1">Equity-heavy portfolios average 10-12%, debt-heavy 7-9%</p></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all">Calculate NPS Retirement Corpus →</button>
                    </div>
                </div>

                <ResultBox
                    title="Your NPS Retirement Outlook"
                    isEmpty={!result}
                    emptyIcon="🏛️"
                    emptyText="Enter your details and press Calculate"
                    mainResult={result ? { label: "Total Retirement Corpus (Age 60)", value: `₹${result.totalCorpus}`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Tax-Free Lump Sum (60%)", value: `₹${result.lumpSumTaxFree}`, valueColor: "text-green-400" },
                        { label: "Annuity Amount (40%)", value: `₹${result.annuity}` },
                        { label: "Estimated Monthly Pension", value: `₹${result.monthlyPension}`, valueColor: "text-yellow-400" },
                        { label: "Total You Will Invest", value: `₹${result.totalInvestment}` },
                    ] : undefined}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Why Consider NPS for Retirement?</h2><p className="text-gray-400 text-sm leading-relaxed">NPS is one of the cheapest retirement products out there - the fund management fees are much lower than mutual funds. Plus, you get tax benefits on the way in (contributions), tax-free growth inside, and tax-free withdrawal (60% of it anyway). The government backing adds safety, but your returns still depend on market performance based on your chosen asset allocation.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">NPS Withdrawal Rules at Retirement</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm mb-2">At age 60 (or 65 for some), you MUST take:</p><ul className="list-disc list-inside text-gray-400 text-sm space-y-1"><li>60% as lump sum - completely tax-free</li><li>40% to buy annuity - gives you monthly pension (taxable)</li></ul><p className="text-gray-500 text-xs mt-3">You can delay withdrawal up to age 75 if you're still working.</p></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}