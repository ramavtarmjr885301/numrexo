// components/calculators/RDCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a Recurring Deposit (RD) account?",
        a: "A Recurring Deposit (RD) is a type of term deposit offered by banks where you can invest a fixed amount every month for a predetermined tenure (usually 6 months to 10 years). It's ideal for regular savers who want to build a corpus with guaranteed returns. Interest is compounded quarterly, and the maturity amount is paid at the end of the tenure. RDs are particularly popular among salaried individuals who want to develop a disciplined savings habit while earning higher returns than regular savings accounts. The minimum deposit amount starts from ₹500 per month with no upper limit, making it accessible for all income groups.",
    },
    {
        q: "What are the current RD interest rates?",
        a: "Current RD interest rates (2025-26): SBI (6.5-7.0%), HDFC Bank (6.6-7.1%), ICICI Bank (6.7-7.2%), Post Office RD (6.9-7.1%), PNB (6.8-7.3%). Senior citizens get 0.5% higher rates. Rates vary by tenure - longer tenures typically offer higher interest. Small finance banks offer up to 8-8.5% on RDs. It's important to compare rates across banks as even a 0.5% difference can significantly impact your maturity amount over longer tenures. For example, on a ₹5,000 monthly deposit for 5 years, a 0.5% rate difference can mean approximately ₹10,000-15,000 less in maturity amount.",
    },
    {
        q: "What is the minimum and maximum RD amount?",
        a: "Most banks allow RD with minimum monthly deposit of ₹500-₹1000. There's no upper limit, but deposits above ₹1.5 lakh per financial year require PAN card documentation. You can invest any amount in multiples of the minimum deposit. Senior citizens get higher interest rates without any maximum limit constraints. For those looking to save larger amounts, you can open multiple RD accounts across different banks to diversify and maximize returns. Some banks also offer flexible RDs where you can increase your monthly deposit amount during the tenure.",
    },
    {
        q: "Can I withdraw RD before maturity?",
        a: "Yes, premature withdrawal is allowed but with penalty. Most banks charge 0.5-1% lower interest than the contracted rate. Some banks also deduct 0.5-1% of principal as penalty. However, Post Office RD and tax-saving RDs (5-year lock-in) cannot be withdrawn before maturity except in case of account holder's death. Always check the specific terms of your bank before opening an RD account. If you anticipate needing funds before maturity, consider splitting your savings into multiple RDs with shorter tenures.",
    },
    {
        q: "How is RD interest calculated?",
        a: "RD interest is calculated using the quarterly compounding formula: A = P × ((1 + r/4)^n - 1) / (1 - (1 + r/4)^(-1/3)), where P is monthly deposit, r is annual interest rate, n is number of quarters. Interest is calculated on the monthly deposits and compounded quarterly, maximizing your returns. The compounding effect means you earn interest not only on your deposits but also on the interest accumulated in previous quarters. This compounding happens four times a year, ensuring your savings grow faster than simple interest calculations.",
    },
    {
        q: "Is RD better than Fixed Deposit (FD)?",
        a: "RDs are better for regular monthly savers who want to build discipline. FDs are better if you have a lump sum amount ready. Returns are similar as both offer comparable interest rates. For salaried individuals, RDs are excellent for goal-based saving (vacation, gadget, emergency fund). For retirees with lump sum, FDs are preferable. Many financial experts recommend having both instruments in your portfolio for balanced savings. RDs help inculcate regular saving habits while FDs provide higher returns on lump sum investments.",
    },
    {
        q: "What is the tax treatment on RD interest?",
        a: "RD interest is fully taxable as 'Income from Other Sources' at your income slab rate. Banks deduct 10% TDS if total interest across all branches exceeds ₹40,000 per year (₹50,000 for senior citizens). Submit Form 15G/15H if your total income is below taxable limit. Unlike PPF, there's no tax deduction under Section 80C for RD deposits. However, RDs offer better liquidity than PPF for short-term financial goals. The interest earned is added to your annual income and taxed according to your applicable income tax slab.",
    },
    {
        q: "How to maximize RD returns?",
        a: "Maximize RD returns by: 1) Choosing banks offering highest rates (small finance banks), 2) Investing early in the month (before 5th-7th), 3) Selecting longer tenures for higher rates, 4) Using RD laddering strategy (multiple RDs with different maturities), 5) Adding senior citizen parent as joint holder, 6) Comparing rates across banks using our calculator. Regular monitoring and rate shopping can help you earn up to 1% higher returns. Additionally, consider reinvesting your matured RD amount into a new RD to benefit from compound growth.",
    },
];

const BANK_RD_RATES = [
    { bank: "SBI", oneYear: "6.5%", threeYears: "6.8%", fiveYears: "7.0%", seniorCitizen: "+0.5%" },
    { bank: "HDFC Bank", oneYear: "6.6%", threeYears: "6.9%", fiveYears: "7.1%", seniorCitizen: "+0.5%" },
    { bank: "ICICI Bank", oneYear: "6.7%", threeYears: "7.0%", fiveYears: "7.2%", seniorCitizen: "+0.5%" },
    { bank: "Post Office", oneYear: "6.9%", threeYears: "7.0%", fiveYears: "7.1%", seniorCitizen: "+0.5%" },
    { bank: "PNB", oneYear: "6.8%", threeYears: "7.1%", fiveYears: "7.3%", seniorCitizen: "+0.5%" },
    { bank: "Axis Bank", oneYear: "6.5%", threeYears: "6.9%", fiveYears: "7.0%", seniorCitizen: "+0.5%" },
    { bank: "Kotak Bank", oneYear: "6.6%", threeYears: "6.8%", fiveYears: "7.1%", seniorCitizen: "+0.5%" },
    { bank: "Yes Bank", oneYear: "6.8%", threeYears: "7.2%", fiveYears: "7.4%", seniorCitizen: "+0.5%" },
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
    name: "RD Calculator – Recurring Deposit Calculator",
    description: "Calculate recurring deposit maturity amount, total interest earned, and monthly investment returns. Compare RD interest rates across banks.",
    url: "https://numrexo.com/finance/rd-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Monthly deposit calculation", "Quarterly compounding", "Senior citizen rate bonus", "Bank comparison", "Maturity estimation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "RD Calculator", item: "https://numrexo.com/finance/rd-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

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
            seniorCitizen,
        });
    };

    const resetForm = () => {
        setMonthlyAmount("");
        setRate("7.2");
        setYears("5");
        setSeniorCitizen(false);
        setResult(null);
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
                        <a href="https://numrexo.com/finance" itemProp="item" className="hover:text-gray-300">Finance Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">RD Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Recurring Deposit Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Ideal for regular monthly savings</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Deposit Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="5000"
                                    value={monthlyAmount}
                                    onChange={(e) => setMonthlyAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum ₹500 per month, no upper limit</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Interest Rate (% p.a.)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="7.2"
                                    step="0.1"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Senior citizens get 0.50% higher rate</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Tenure</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="5"
                                    step="0.5"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum 6 months, maximum 10 years</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="seniorCitizen"
                                checked={seniorCitizen}
                                onChange={(e) => setSeniorCitizen(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-700 bg-[#0f1525] text-blue-500"
                            />
                            <label htmlFor="seniorCitizen" className="text-sm text-gray-300">Senior Citizen (60+ years) - +0.50% extra</label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate RD Returns →
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

                {/* Results Display */}
                <ResultBox
                    title="RD Maturity Details"
                    isEmpty={!result}
                    emptyIcon="🏦"
                    emptyText="Enter RD investment details and press Calculate"
                    mainResult={result ? { label: "Maturity Amount (Tax-Free)", value: `₹${result.maturity}`, color: "text-emerald-400" } : undefined}
                    extraRows={result ? [
                        { label: "Total Investment", value: `₹${result.totalInvestment}` },
                        { label: "Total Interest Earned", value: `₹${result.interest}`, valueColor: "text-green-400" },
                        { label: "Effective Annual Return", value: `${result.effectiveReturn}%`, valueColor: "text-yellow-400" },
                        { label: "Monthly Investment", value: `₹${result.monthlyAmount.toLocaleString()}` },
                        { label: "Tenure", value: `${result.years} years at ${result.rate}% p.a.` },
                        { label: "Senior Citizen", value: result.seniorCitizen ? "Yes (+0.50%)" : "No" },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Recurring Deposit (RD) Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    A <strong className="text-gray-300">Recurring Deposit (RD)</strong> is a popular savings scheme offered by banks and post offices where you deposit a fixed amount every month. It's perfect for salaried individuals and regular savers who want to build a substantial corpus with guaranteed, risk-free returns. The RD calculator helps you plan your monthly savings and understand how much you can accumulate over time.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our RD calculator helps you estimate the maturity amount, total interest earned, and effective returns on your monthly investments. The calculator uses quarterly compounding (standard for most banks in India) and automatically adds higher rates for senior citizens. This tool is essential for anyone looking to start a recurring deposit or comparing different investment options.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're saving for a child's education, planning a vacation, or building an emergency fund, the RD calculator provides accurate projections to help you achieve your financial goals. The calculator also helps you understand how different variables like monthly deposit, interest rate, and tenure affect your final maturity amount.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This RD Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">monthly deposit amount</strong> (minimum ₹500).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Set the <strong className="text-white">interest rate</strong> offered by your bank (default 7.2%).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Choose the <strong className="text-white">tenure</strong> in years (6 months to 10 years).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Check the <strong className="text-white">senior citizen</strong> box if applicable for 0.50% extra interest.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate RD Returns"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Recurring Deposit Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-emerald-400 mb-2">✓ Goal Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much you'll accumulate at maturity. Plan for specific goals like vacation, wedding, or emergency fund.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Rate Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare RD interest rates across different banks. Make informed decisions about where to open your RD account.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Senior Citizen Benefits</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See the impact of senior citizen bonus rate (0.50% extra). Maximize returns for yourself or family members above 60 years.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Investment Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Adjust monthly deposit amount and tenure to find the optimal balance for your financial goals and monthly budget.</p>
                    </div>
                </div>
            </section>

            {/* Bank RD Rates Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">RD Interest Rates by Bank (2025-26)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Bank</th>
                                <th className="text-right py-3 px-4 text-gray-400">1 Year</th>
                                <th className="text-right py-3 px-4 text-gray-400">3 Years</th>
                                <th className="text-right py-3 px-4 text-gray-400">5 Years</th>
                                <th className="text-right py-3 px-4 text-gray-400">Senior Citizen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BANK_RD_RATES.map((bank, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-2 px-4 text-gray-300">{bank.bank}</td>
                                    <td className="py-2 px-4 text-right text-yellow-400">{bank.oneYear}</td>
                                    <td className="py-2 px-4 text-right text-yellow-400">{bank.threeYears}</td>
                                    <td className="py-2 px-4 text-right text-yellow-400">{bank.fiveYears}</td>
                                    <td className="py-2 px-4 text-right text-green-400">{bank.seniorCitizen}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Rates are subject to change. Please check with individual banks for the most current rates. Small finance banks often offer higher rates, sometimes up to 8-8.5%.
                    </p>
                </div>
            </section>

            {/* RD Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">RD Formula & Calculation Methodology</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 space-y-3">
                    <p className="text-white font-mono text-sm">Maturity = M × ((1 + r/4)^n - 1) / (r/4) × (1 + r/4)</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500 text-xs"><strong className="text-gray-400">M</strong> = Monthly Deposit</p>
                            <p className="text-gray-500 text-xs"><strong className="text-gray-400">r</strong> = Annual Interest Rate</p>
                            <p className="text-gray-500 text-xs"><strong className="text-gray-400">n</strong> = Number of Quarters (Years × 4)</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs"><strong className="text-gray-400">Compounding:</strong> Quarterly</p>
                            <p className="text-gray-500 text-xs"><strong className="text-gray-400">Example:</strong> ₹5,000 × 5 years × 7.2%</p>
                            <p className="text-gray-500 text-xs"><strong className="text-gray-400">Result:</strong> ₹3,62,000 approx.</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed pt-2 border-t border-gray-800">
                        The formula uses quarterly compounding, which means interest is added to your account four times a year, allowing your savings to grow faster. This compounding effect is what makes RDs an attractive investment option for regular savers. The longer your tenure and higher your monthly deposit, the more significant the compounding benefit.
                    </p>
                </div>
            </section>

            {/* RD vs Other Investments */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">RD vs Other Investment Options</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Feature</th>
                                <th className="text-left py-3 px-4 text-gray-400">RD</th>
                                <th className="text-left py-3 px-4 text-gray-400">FD</th>
                                <th className="text-left py-3 px-4 text-gray-400">PPF</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Investment Type</td>
                                <td className="py-2 px-4 text-gray-400">Monthly</td>
                                <td className="py-2 px-4 text-gray-400">Lump Sum</td>
                                <td className="py-2 px-4 text-gray-400">Annual</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Lock-in Period</td>
                                <td className="py-2 px-4 text-gray-400">6 months - 10 years</td>
                                <td className="py-2 px-4 text-gray-400">7 days - 10 years</td>
                                <td className="py-2 px-4 text-gray-400">15 years</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Premature Withdrawal</td>
                                <td className="py-2 px-4 text-gray-400">Allowed (with penalty)</td>
                                <td className="py-2 px-4 text-gray-400">Allowed (with penalty)</td>
                                <td className="py-2 px-4 text-gray-400">Restricted</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Tax Benefit</td>
                                <td className="py-2 px-4 text-gray-400">No</td>
                                <td className="py-2 px-4 text-gray-400">No</td>
                                <td className="py-2 px-4 text-gray-400">Yes (Sec 80C)</td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="py-2 px-4 text-gray-300">Best For</td>
                                <td className="py-2 px-4 text-gray-400">Regular Savers</td>
                                <td className="py-2 px-4 text-gray-400">Lump Sum Investors</td>
                                <td className="py-2 px-4 text-gray-400">Long-term Tax Savings</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Tips Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips to Maximize Your RD Returns</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-emerald-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Start early in the month:</strong> Deposit before 5th-7th of each month to maximize interest earning days.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-emerald-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose longer tenures:</strong> Banks offer higher interest rates for longer tenures (5-10 years).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-emerald-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use RD laddering:</strong> Open multiple RDs with different maturities for liquidity and higher average returns.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-emerald-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Add senior citizen:</strong> Add a parent above 60 years as joint holder to get 0.50% higher interest rate.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-emerald-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Compare rates regularly:</strong> Use our calculator to compare rates across banks and switch if better rates are available.</span>
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