// components/calculators/SWPCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a SWP and how does it work?",
        a: "SWP stands for Systematic Withdrawal Plan. Think of it as the opposite of a SIP - instead of putting money in every month, you're taking money out. You invest a lump sum in a mutual fund, then set up regular withdrawals (monthly, quarterly, etc.). The rest of your money keeps growing in the market. It's a popular way to generate regular income during retirement without selling everything at once. SWPs offer flexibility - you can choose how much to withdraw and how often, making them ideal for retirement planning.",
    },
    {
        q: "Is SWP better than a traditional pension plan?",
        a: "Depends on what you value. Traditional pension plans give you guaranteed income but lower returns (think 6-7%). SWPs invest in the market, so your returns can be higher (8-12% historically), but your income isn't guaranteed - if markets crash, your withdrawals might eat into your principal. Many retirees use a mix: some guaranteed income for essentials, SWP for extras. SWPs also offer more flexibility - you can change your withdrawal amount or stop/restart anytime, unlike pension plans which are usually fixed.",
    },
    {
        q: "How long will my SWP last?",
        a: "That depends on three things: how much you start with (corpus), how much you withdraw each month, and what returns your investments earn. If your withdrawal rate is less than your returns, your money could last indefinitely. The classic 4% rule (withdraw 4% of your corpus in year 1, adjust for inflation after) is designed to make money last 30+ years. Our calculator shows you different scenarios so you can find the right withdrawal rate for your goals.",
    },
    {
        q: "Are SWP withdrawals taxable?",
        a: "Yes, but here's the smart part - you're only taxed on the capital gains portion, not the whole withdrawal. Since you've already paid tax on the money you invested, only the profit part gets taxed. For equity funds: LTCG over ₹1 lakh/year at 10%, STCG at 15%. For debt funds: capital gains added to your income and taxed as per your slab. By withdrawing systematically, you can manage which tax bracket you fall into and potentially reduce your tax liability.",
    },
    {
        q: "What is the 4% rule for SWP?",
        a: "The 4% rule is a retirement withdrawal guideline: withdraw 4% of your corpus in your first year of retirement, then adjust that amount for inflation each subsequent year. Example: ₹1 Crore corpus → ₹40,000/month first year (₹4.8 lakh annual). Year 2: increase by inflation (say 6%) → ₹42,400/month. This strategy is designed to make your money last 30+ years in most market conditions. For conservative investors, 3-3.5% is safer.",
    },
    {
        q: "What are the risks of SWP?",
        a: "Key SWP risks: 1) Sequence of returns risk - if markets crash early in retirement, your withdrawals can deplete your corpus faster, 2) Inflation risk - if your withdrawals don't keep up with inflation, your purchasing power erodes, 3) Longevity risk - if you live longer than expected, you might outlive your savings, 4) Market volatility - your remaining corpus fluctuates with markets. Mitigation: use a conservative withdrawal rate (3-4%), maintain a diversified portfolio, and keep some cash buffer.",
    },
    {
        q: "How does inflation impact SWP?",
        a: "Inflation is the biggest threat to retirement income. At 6% inflation, ₹1 lakh today will be worth only ₹31,000 in 20 years. To maintain your lifestyle, your SWP withdrawals need to increase with inflation. Our calculator accounts for this when you select the inflation option. Strategies: 1) Invest in growth assets (equity) that can beat inflation long-term, 2) Start with a lower withdrawal rate (3-3.5%), 3) Increase withdrawals annually by inflation.",
    },
    {
        q: "What is the difference between SWP and dividend income?",
        a: "SWP vs Dividends: SWP is a withdrawal strategy where you systematically sell units of your mutual fund to generate income. Dividends are distributions of company profits to shareholders. SWP gives you control over how much you withdraw and when (flexibility). Dividends are unpredictable and depend on company decisions (uncertainty). SWPs can be set up with any mutual fund, while dividends require equity investments. Many retirees prefer SWPs for the predictable cash flow.",
    },
    {
        q: "Can I combine SWP with other retirement income sources?",
        a: "Yes! Smart retirement planning uses multiple income sources: 1) Pension/Annuity (guaranteed income for essentials), 2) SWP from mutual funds (flexible market-linked income), 3) Rental income from property (inflation-linked), 4) Interest from FDs (safe income), 5) Social Security/Employee benefits (if applicable), 6) Part-time work (active income). The 'buckets' strategy: keep 2-3 years of expenses in safe assets, rest in growth assets for SWP.",
    },
    {
        q: "What happens to my SWP if I pass away?",
        a: "The remaining corpus in your SWP becomes part of your estate and passes to your legal heirs (nominees). They can: 1) Continue the SWP (if they need income), 2) Withdraw the entire amount (subject to tax), 3) Transfer to their own accounts. Importance: Always maintain updated nominations. For tax purposes, your heirs inherit the units at their current market value, so capital gains tax resets (no tax on gains until they sell). This is called 'step-up in cost basis'.",
    },
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
    name: "SWP Calculator – Systematic Withdrawal Plan Calculator",
    description: "Calculate how long your retirement corpus will last with regular monthly withdrawals. Plan your retirement income strategy.",
    url: "https://numrexo.com/investment/swp-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Withdrawal duration", "Monthly income planning", "Corpus sustainability", "Retirement planning"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Investment Calculators", item: "https://numrexo.com/investment" },
        { "@type": "ListItem", position: 3, name: "SWP Calculator", item: "https://numrexo.com/investment/swp-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SWPCalculator() {
    const [corpus, setCorpus] = useState("");
    const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("");
    const [expectedReturn, setExpectedReturn] = useState("10");
    const [inflationRate, setInflationRate] = useState("6");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setCorpus("");
        setMonthlyWithdrawal("");
        setExpectedReturn("10");
        setInflationRate("6");
        setResult(null);
    };

    const calculate = () => {
        let balance = parseFloat(corpus);
        let withdrawal = parseFloat(monthlyWithdrawal);
        let monthlyReturn = parseFloat(expectedReturn) / 100 / 12;
        let monthlyInflation = parseFloat(inflationRate) / 100 / 12;
        let months = 0;
        let totalWithdrawn = 0;

        if (!balance || !withdrawal || balance <= 0 || withdrawal <= 0) {
            alert("Please enter valid values");
            return;
        }

        if (withdrawal > balance) {
            alert("Monthly withdrawal cannot exceed your total corpus");
            return;
        }

        // Calculate how long the corpus lasts with inflation-adjusted withdrawals
        while (balance > 0 && months < 600) { // Max 50 years
            balance = balance * (1 + monthlyReturn) - withdrawal;
            months++;
            totalWithdrawn += withdrawal;

            // Adjust withdrawal for inflation each year
            if (months % 12 === 0) {
                withdrawal = withdrawal * (1 + monthlyInflation);
            }

            if (balance < 0) break;
        }

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        setResult({
            years,
            months: remainingMonths,
            totalMonths: months,
            totalWithdrawn: Math.round(totalWithdrawn).toLocaleString("en-IN"),
            monthlyAmount: parseFloat(monthlyWithdrawal).toLocaleString("en-IN"),
            finalBalance: balance > 0 ? Math.round(balance).toLocaleString("en-IN") : "₹0",
            inflationAdjusted: true,
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/investment" itemProp="item" className="hover:text-gray-300">Investment Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">SWP Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Your SWP Setup</h3>
                        <p className="text-xs text-gray-500 mt-1">Turn your savings into regular income</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Your Retirement Corpus</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="5000000"
                                    value={corpus}
                                    onChange={(e) => setCorpus(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Withdrawal You Want</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="25000"
                                    value={monthlyWithdrawal}
                                    onChange={(e) => setMonthlyWithdrawal(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Annual Return on Investment</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="10"
                                    step="0.5"
                                    value={expectedReturn}
                                    onChange={(e) => setExpectedReturn(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Conservative debt funds: 6-8% | Balanced funds: 8-10% | Equity: 10-12%</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Expected Inflation Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="6"
                                    step="0.5"
                                    value={inflationRate}
                                    onChange={(e) => setInflationRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">SWP withdrawals will increase with inflation to maintain purchasing power</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate SWP Duration →
                            </button>
                            <button
                                onClick={resetForm}
                                className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Your SWP Results"
                    isEmpty={!result}
                    emptyIcon="💸"
                    emptyText="Enter your corpus and monthly withdrawal"
                    mainResult={result ? { label: "Your Money Will Last", value: `${result.years} years ${result.months} months`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total You'll Withdraw", value: `₹${result.totalWithdrawn}`, valueColor: "text-green-400" },
                        { label: "Starting Monthly Income", value: `₹${result.monthlyAmount}` },
                        { label: "Remaining Balance", value: result.finalBalance },
                        { label: "Total Duration", value: `${result.totalMonths} months` },
                        { label: "Inflation Adjusted", value: "Yes (withdrawals increase annually)" },
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About SWP Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Systematic Withdrawal Plan (SWP) Calculator</strong> helps you plan your retirement income strategy. It shows how long your retirement corpus will last when you withdraw a fixed amount monthly, accounting for investment returns and inflation.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    SWPs are popular for retirees who want regular income while keeping their money invested in the market. Unlike traditional pension plans, SWPs offer flexibility - you control how much to withdraw and when, and your remaining money continues to grow.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our calculator factors in inflation to show you the real purchasing power of your withdrawals over time. This is crucial because ₹25,000 today will buy significantly less in 20 years at 6% inflation.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This SWP Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">retirement corpus</strong> (total savings you have).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your desired <strong className="text-white">monthly withdrawal</strong> amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Set the <strong className="text-white">expected annual return</strong> on your investments.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Set the <strong className="text-white">expected inflation rate</strong> (for inflation-adjusted withdrawals).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate SWP Duration"</strong> to see how long your money will last.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to try different scenarios and find the right withdrawal rate.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an SWP Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Retirement Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how long your savings will last. Plan your retirement income strategy with confidence and avoid outliving your money.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Inflation Protection</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See how inflation impacts your purchasing power. Adjust your withdrawal strategy to maintain your lifestyle throughout retirement.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Withdrawal Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Find the sustainable withdrawal rate. Balance between enjoying your retirement now and ensuring your money lasts.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Scenario Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare different return scenarios, withdrawal amounts, and inflation rates. Make informed decisions about your retirement strategy.</p>
                    </div>
                </div>
            </section>

            {/* SWP vs Other Income Options */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">SWP vs Other Retirement Income Options</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Option</th>
                                <th className="text-left py-3 px-4 text-gray-400">Income Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Flexibility</th>
                                <th className="text-left py-3 px-4 text-gray-400">Risk Level</th>
                                <th className="text-left py-3 px-4 text-gray-400">Growth Potential</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">SWP</td>
                                <td className="py-3 px-4 text-gray-400">Market-linked</td>
                                <td className="py-3 px-4 text-green-400">High</td>
                                <td className="py-3 px-4 text-yellow-400">Medium</td>
                                <td className="py-3 px-4 text-green-400">High</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">Pension</td>
                                <td className="py-3 px-4 text-gray-400">Guaranteed</td>
                                <td className="py-3 px-4 text-red-400">Low</td>
                                <td className="py-3 px-4 text-green-400">Low</td>
                                <td className="py-3 px-4 text-red-400">Low</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">Fixed Deposit</td>
                                <td className="py-3 px-4 text-gray-400">Fixed</td>
                                <td className="py-3 px-4 text-yellow-400">Medium</td>
                                <td className="py-3 px-4 text-green-400">Very Low</td>
                                <td className="py-3 px-4 text-red-400">Low</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">Rental Income</td>
                                <td className="py-3 px-4 text-gray-400">Property-linked</td>
                                <td className="py-3 px-4 text-yellow-400">Medium</td>
                                <td className="py-3 px-4 text-yellow-400">Medium</td>
                                <td className="py-3 px-4 text-yellow-400">Medium</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * SWP offers the best balance of flexibility and growth potential, making it ideal for retirement income planning.
                    </p>
                </div>
            </section>

            {/* The 4% Rule */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">The 4% Rule Explained</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">Year 1 Withdrawal = Corpus × 0.04</p>
                    <p className="text-gray-500 text-xs">Example: ₹1 Crore corpus → ₹40,000 per month first year (₹4.8 lakh annual)</p>
                    <p className="text-gray-500 text-xs mt-2">Then increase by inflation (say 6%) each year: Year 2: ₹42,400/month, Year 3: ₹44,944/month, etc.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Conservative (3%)</p>
                            <p className="text-sm text-green-400 font-semibold">₹25,000/month</p>
                            <p className="text-xs text-gray-500">Per ₹1 Crore</p>
                        </div>
                        <div className="text-center border-x border-gray-800">
                            <p className="text-xs text-gray-400">Standard (4%)</p>
                            <p className="text-sm text-yellow-400 font-semibold">₹33,333/month</p>
                            <p className="text-xs text-gray-500">Per ₹1 Crore</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Aggressive (5%)</p>
                            <p className="text-sm text-orange-400 font-semibold">₹41,667/month</p>
                            <p className="text-xs text-gray-500">Per ₹1 Crore</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-3">The 4% rule has historically worked 95% of the time for 30-year retirements in the US market.</p>
                </div>
            </section>

            {/* SWP Strategies */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">SWP Withdrawal Strategies</h2>
                <div className="space-y-2">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-green-400">1️⃣ Fixed Amount SWP</h4>
                        <p className="text-xs text-gray-400">Withdraw a fixed amount each month regardless of market performance. Simple and predictable. Best for those who need consistent income and can tolerate market fluctuations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-blue-400">2️⃣ Inflation-Adjusted SWP</h4>
                        <p className="text-xs text-gray-400">Withdrawals increase annually with inflation to maintain purchasing power. Our calculator supports this strategy. Essential for long retirements (20+ years).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-yellow-400">3️⃣ Percentage-Based SWP</h4>
                        <p className="text-xs text-gray-400">Withdraw a fixed percentage (e.g., 4%) of the current corpus each year. Income varies with markets but ensures you never run out. Best for those with flexible expenses.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-purple-400">4️⃣ Bucket Strategy</h4>
                        <p className="text-xs text-gray-400">Keep 2-3 years of expenses in cash/FDs (short-term bucket), rest in growth assets (long-term bucket). Withdraw from the short-term bucket and replenish from the long-term bucket in good years. Reduces sequence of returns risk.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-red-500/30 transition-all">
                        <h4 className="text-sm font-semibold text-red-400">5️⃣ Variable SWP</h4>
                        <p className="text-xs text-gray-400">Withdraw more in good market years and less in bad years. This strategy maximizes longevity of your corpus. Best for retirees with discretionary expenses that can be adjusted.</p>
                    </div>
                </div>
            </section>

            {/* Tax Implications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tax Implications of SWP</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-yellow-400 mb-2">Equity Funds</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• <strong className="text-gray-300">LTCG (&gt;1 year):</strong> 10% tax on gains exceeding ₹1 lakh per financial year</li>
                                <li>• <strong className="text-gray-300">STCG (&lt;1 year):</strong> 15% tax on entire gains</li>
                                <li>• <strong className="text-gray-300">Indexation:</strong> Not available for equity funds</li>
                                <li>• <strong className="text-gray-300">Tax on SWP:</strong> Only the capital gains portion is taxed (not the entire withdrawal)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">Debt Funds</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• <strong className="text-gray-300">LTCG (&gt;3 years):</strong> 20% tax with indexation benefit (reduces tax)</li>
                                <li>• <strong className="text-gray-300">STCG (&lt;3 years):</strong> Added to income, taxed as per slab rate</li>
                                <li>• <strong className="text-gray-300">Indexation:</strong> Available for LTCG (adjusts purchase price for inflation)</li>
                                <li>• <strong className="text-gray-300">Tax on SWP:</strong> Taxed only on the capital gains portion</li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-800">
                        <div>
                            <h4 className="text-sm font-semibold text-green-400 mb-2">Hybrid / Balanced Funds</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• <strong className="text-gray-300">Taxation:</strong> Depends on equity allocation</li>
                                <li>• <strong className="text-gray-300">Equity-oriented (&gt;65% equity):</strong> Taxed like equity funds</li>
                                <li>• <strong className="text-gray-300">Debt-oriented (&lt;65% equity):</strong> Taxed like debt funds</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-purple-400 mb-2">💡 Tax Optimization Tips</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Withdraw from funds with highest cost basis first</li>
                                <li>• Time withdrawals to manage income tax brackets</li>
                                <li>• Use LTCG tax exemption of ₹1 lakh per year (equity)</li>
                                <li>• Consider SWP from multiple funds for tax efficiency</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-800">
                        <p className="text-gray-400 text-xs leading-relaxed">
                            <strong className="text-gray-300">Important:</strong> In a SWP, each withdrawal is treated as a sale of units. Only the <strong className="text-white">capital gains</strong> portion is taxable, not the entire withdrawal amount. The cost basis (purchase price) determines the gains portion. This makes SWPs tax-efficient compared to regular income or interest income.
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            ⚠️ Tax laws are subject to change. Consult a tax professional for personalized advice based on your specific situation.
                        </p>
                    </div>
                </div>
            </section>

            {/* SWP Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart SWP Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Start with a conservative withdrawal rate:</strong> Begin with 3-3.5% and adjust if your portfolio outperforms. Better to start low and increase than to start high and run out of money.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Maintain an emergency buffer:</strong> Keep 6-12 months of expenses in liquid assets (FDs, savings). This prevents you from selling investments during market downturns.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Rebalance annually:</strong> Review and rebalance your portfolio each year. Ensure your asset allocation matches your risk tolerance and withdrawal needs.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider debt funds for SWP:</strong> Debt funds are less volatile and offer indexation benefits (tax advantage). A mix of equity and debt funds provides stability and growth.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Review SWP every 5 years:</strong> As you age, your needs change. Review your withdrawal strategy regularly and adjust for changing expenses, life expectancy, and market conditions.</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
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