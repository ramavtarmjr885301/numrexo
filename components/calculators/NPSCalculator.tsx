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
    {
        q: "What are the NPS asset allocation options?",
        a: "NPS offers 3 asset classes: Equity (E) - highest returns (10-12%), high risk. Corporate Bonds (C) - moderate returns (8-10%), moderate risk. Government Bonds (G) - lowest returns (7-8%), lowest risk. You choose your allocation (E/C/G). Auto-choice adjusts based on age (higher equity when young, lower at retirement). Active-choice lets you pick your own allocation.",
    },
    {
        q: "How to open an NPS account online?",
        a: "Steps to open NPS online: 1) Visit eNPS portal (enps.nsdl.com). 2) Choose 'Regular' or 'Corporate' (if employer offers). 3) Fill personal details (PAN, Aadhar, bank account). 4) Choose pension fund manager (SBI, UTI, LIC, HDFC, ICICI, Kotak, Aditya Birla, Tata). 5) Choose asset allocation (Auto or Active). 6) Make initial contribution (minimum ₹500). Complete with OTP authentication.",
    },
    {
        q: "What happens to NPS if I change jobs?",
        a: "NPS is portable! Unlike EPF, NPS follows you when you change jobs. 1) Keep your Permanent Retirement Account Number (PRAN). 2) If new employer offers NPS, update your PRAN with HR. 3) Continue contributions seamlessly. 4) No need to transfer or withdraw. 5) Corporate NPS converts to All-India NPS if new employer doesn't offer NPS. Your retirement savings stay intact.",
    },
    {
        q: "Can I have multiple NPS accounts?",
        a: "No! You can have only ONE NPS account (Tier 1) with a single PRAN (Permanent Retirement Account Number). Multiple accounts are not allowed under NPS rules. If you change pension fund managers, you can switch (up to once per year) without creating a new account. Always use your existing PRAN when changing jobs or fund managers.",
    },
    {
        q: "What is the NPS exit load?",
        a: "No exit load! NPS has zero exit load. However: 60% of corpus is tax-free lump sum, 40% must buy annuity (pension) - taxable. If you withdraw before 60 (premature exit), only 20% is tax-free, 80% must buy annuity. If corpus is less than ₹2 lakhs, 100% can be withdrawn as lump sum (tax-free). No penalty charges for exit.",
    },
    {
        q: "Is NPS better than PPF for retirement?",
        a: "NPS vs PPF: NPS (higher returns 8-12%, market-linked, tax benefits, monthly pension). PPF (lower returns 7.1%, fixed/govt backed, 15-year lock-in). Choose NPS if you want higher returns and pension. Choose PPF if you prefer guaranteed returns and tax-free maturity. Best strategy: Use both - NPS for retirement, PPF for safe savings.",
    },
    {
        q: "What is the NPS monthly pension amount?",
        a: "Monthly pension = (Annuity Amount × Annuity Rate) ÷ 12. Example: ₹50L annuity × 6% = ₹30,000/month. Annuity rates vary by provider (5-7%). You can choose annuity type: Life annuity (highest pension, no survivor), Joint annuity (lower pension, spouse gets after you), Return of capital (lowest pension, corpus returned to family). Our calculator uses 6% (standard estimate).",
    },
];

const NPS_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NPS Calculator – National Pension System Calculator",
    description: "Estimate your NPS retirement corpus, monthly pension, and tax benefits. Plan your retirement savings with India's government pension scheme.",
    url: "https://numrexo.com/investment/nps-calculator",
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

    const resetForm = () => {
        setMonthlyContribution("");
        setCurrentAge("30");
        setRetirementAge("60");
        setExpectedReturn("10");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: NPS_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/investment" className="hover:text-gray-300">Investment Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">NPS Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Your Retirement Plan</h3>
                        <p className="text-xs text-gray-500 mt-1">Plan for a comfortable retirement</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Contribution</label>
                            <div className="relative">
                                <input type="number" placeholder="5000" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">You can start with as little as ₹500 per month</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Your Current Age</label>
                            <div className="relative">
                                <input type="number" placeholder="30" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Retirement Age</label>
                            <div className="relative">
                                <input type="number" placeholder="60" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">NPS allows withdrawal only after age 60</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return</label>
                            <div className="relative">
                                <input type="number" placeholder="10" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Equity-heavy portfolios average 10-12%, debt-heavy 7-9%</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all">Calculate NPS Retirement Corpus →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About NPS Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">NPS Calculator</strong> helps you estimate your retirement corpus, monthly pension, and tax benefits under India's National Pension System. Whether you're a government employee, private sector worker, or self-employed, NPS is one of the most cost-effective retirement savings options available.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    With government backing, low fund management fees, and excellent tax benefits (deductions under Sections 80C and 80CCD(1B)), NPS is a powerful tool for building a secure retirement. Our calculator shows you exactly how much you'll have at age 60.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This NPS Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">monthly contribution</strong> (minimum ₹500).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">current age</strong> and <strong className="text-white">retirement age</strong> (NPS allows withdrawal only after 60).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter <strong className="text-white">expected annual return</strong> (10-12% for equity-heavy, 7-9% for debt-heavy).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate NPS Retirement Corpus"</strong> to see results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> View total corpus, tax-free lump sum (60%), annuity amount, and monthly pension.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an NPS Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Retirement Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much you'll have at retirement. Plan your contributions to reach your retirement goal.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Tax Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate tax benefits under Sections 80C, 80CCD(1B). Plan your tax-saving investments strategically.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Pension Estimation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See your estimated monthly pension after retirement. Plan your post-retirement expenses.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Compare Scenarios</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Test different contribution amounts, return rates, and retirement ages. Find the best strategy for you.</p>
                    </div>
                </div>
            </section>

            {/* NPS Asset Allocation */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">NPS Asset Allocation Options</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Asset Class</th><th className="text-left py-3 px-4 text-gray-400">Expected Returns</th><th className="text-left py-3 px-4 text-gray-400">Risk Level</th><th className="text-left py-3 px-4 text-gray-400">Best For</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Equity (E)</td><td className="py-2 px-4 text-yellow-400">10-12%</td><td className="py-2 px-4 text-red-400">High</td><td className="py-2 px-4">Young investors (under 40)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Corporate Bonds (C)</td><td className="py-2 px-4 text-yellow-400">8-10%</td><td className="py-2 px-4 text-yellow-400">Moderate</td><td className="py-2 px-4">Middle-aged (40-50)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Government Bonds (G)</td><td className="py-2 px-4 text-yellow-400">7-8%</td><td className="py-2 px-4 text-green-400">Low</td><td className="py-2 px-4">Near retirement (50+)</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">NPS offers Auto-choice (age-based allocation) and Active-choice (you choose allocation).</p>
            </section>

            {/* NPS vs PPF vs Mutual Funds */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">NPS vs PPF vs Mutual Funds</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Feature</th><th className="text-left py-3 px-4 text-gray-400">NPS</th><th className="text-left py-3 px-4 text-gray-400">PPF</th><th className="text-left py-3 px-4 text-gray-400">Mutual Funds</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Returns</td><td className="py-2 px-4 text-yellow-400">8-12%</td><td className="py-2 px-4 text-yellow-400">7.1%</td><td className="py-2 px-4 text-yellow-400">10-14%</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Lock-in</td><td className="py-2 px-4">Until 60</td><td className="py-2 px-4">15 years</td><td className="py-2 px-4">None</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Tax Benefit</td><td className="py-2 px-4 text-green-400">₹2L+</td><td className="py-2 px-4">₹1.5L</td><td className="py-2 px-4">₹1.5L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Pension</td><td className="py-2 px-4 text-green-400">✅ Yes</td><td className="py-2 px-4 text-red-400">❌ No</td><td className="py-2 px-4 text-red-400">❌ No</td></tr>
                            <tr><td className="py-2 px-4">Risk</td><td className="py-2 px-4">Low-Moderate</td><td className="py-2 px-4">Very Low</td><td className="py-2 px-4">Moderate-High</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* NPS Tax Benefits */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">NPS Tax Benefits</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Section 80CCD(1):</strong> Employee contribution up to 10% of salary (₹1.5L limit shared with 80C).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Section 80CCD(1B):</strong> Additional ₹50,000 deduction (over and above ₹1.5L).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Section 80CCD(2):</strong> Employer contribution up to 10% of salary (14% for government) is tax-free.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">At withdrawal:</strong> 60% lump sum is tax-free, annuity (40%) taxed as pension income.</span></li>
                </ul>
            </section>

            {/* NPS Withdrawal Rules */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">NPS Withdrawal Rules at Retirement</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">At age 60 (or 65 for some), you MUST take:</p>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        <li>60% as lump sum - completely tax-free</li>
                        <li>40% to buy annuity - gives you monthly pension (taxable)</li>
                    </ul>
                    <p className="text-gray-500 text-xs mt-3">You can delay withdrawal up to age 75 if you're still working.</p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}