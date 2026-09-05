"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a salary budgeting calculator?",
        a: "A salary budgeting calculator helps you plan and track your monthly income allocation across different expense categories. It follows popular budgeting methods like the 50/30/20 rule to help you manage your finances effectively.",
    },
    {
        q: "What is the 50/30/20 budgeting rule?",
        a: "The 50/30/20 rule is a popular budgeting method where: 50% of your income goes to needs (rent, groceries, bills), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. This rule provides a simple framework for financial planning.",
    },
    {
        q: "What are 'needs' in a budget?",
        a: "Needs are essential expenses required for survival and basic living: rent/mortgage, groceries, utilities (electricity, water, gas), transportation, insurance, minimum loan payments, and healthcare. These should ideally be 50% or less of your income.",
    },
    {
        q: "What are 'wants' in a budget?",
        a: "Wants are non-essential expenses that improve your lifestyle: dining out, entertainment, subscriptions (Netflix, Spotify), shopping, vacations, hobbies, and luxury items. These should be limited to 30% of your income.",
    },
    {
        q: "What should I include in savings and investments?",
        a: "Savings and investments include: emergency fund contributions, retirement savings (PPF, NPS, EPF), mutual fund SIPs, fixed deposits, stock investments, and debt repayment beyond minimum payments. Aim for at least 20% of your income.",
    },
    {
        q: "How much should I save each month?",
        a: "Financial experts recommend saving at least 20% of your monthly income. However, the ideal savings rate depends on your goals: 20% for standard goals, 30-40% for aggressive saving, and 10-15% if you have high debt obligations.",
    },
    {
        q: "What is an emergency fund and how much should I have?",
        a: "An emergency fund is money set aside for unexpected expenses like job loss, medical emergencies, or urgent repairs. Financial experts recommend saving 3-6 months of living expenses. Our calculator can help you plan your emergency fund target.",
    },
    {
        q: "How do I reduce my monthly expenses?",
        a: "Ways to reduce expenses: 1) Track all expenses to identify spending patterns, 2) Cancel unused subscriptions, 3) Cook at home instead of dining out, 4) Use public transport or carpool, 5) Negotiate bills, 6) Use cashback and reward programs, 7) Buy in bulk for essentials.",
    },
    {
        q: "What is the best way to track spending?",
        a: "Best ways to track spending: 1) Use budgeting apps (like our Salary Budgeting Calculator), 2) Maintain a spending diary, 3) Use expense tracking apps, 4) Review bank statements monthly, 5) Categorize expenses into needs, wants, and savings.",
    },
    {
        q: "How can I save more money each month?",
        a: "Tips to save more: 1) Automate your savings (auto-debit to savings account), 2) Follow the 50/30/20 rule, 3) Reduce discretionary spending, 4) Negotiate better deals on bills, 5) Increase income through side hustles, 6) Avoid impulse purchases, 7) Use our calculator to find areas to cut.",
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
    name: "Salary Budgeting Calculator – Plan Your Monthly Budget",
    description: "Plan your monthly budget with our free salary budgeting calculator. Follow the 50/30/20 rule to allocate your income to needs, wants, and savings.",
    url: "https://numrexo.com/finance/salary-budgeting-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Monthly income allocation",
        "50/30/20 rule analysis",
        "Expense categorization",
        "Savings goal planning",
        "Emergency fund calculator",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Salary Budgeting Calculator", item: "https://numrexo.com/finance/salary-budgeting-calculator" },
    ],
});

// ─── Chart Component ──────────────────────────────────────────────────────────

function BudgetChart({ needs, wants, savings, needsColor, wantsColor, savingsColor }: any) {
    const total = needs + wants + savings;
    if (total === 0) return null;

    const needsPercent = (needs / total) * 100;
    const wantsPercent = (wants / total) * 100;
    const savingsPercent = (savings / total) * 100;

    return (
        <div className="bg-[#0f1525] rounded-xl p-4 border border-gray-800">
            <h4 className="text-sm font-semibold text-white mb-3 text-center">Budget Distribution</h4>

            {/* Bar Chart */}
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-blue-400">Needs</span>
                        <span className="text-gray-400">{needsPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${needsPercent}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-yellow-400">Wants</span>
                        <span className="text-gray-400">{wantsPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${wantsPercent}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-400">Savings</span>
                        <span className="text-gray-400">{savingsPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${savingsPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Donut Chart (CSS-based) */}
            <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-center gap-6">
                    <div className="relative w-24 h-24">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="16" />
                            <circle
                                cx="50" cy="50" r="40" fill="none" stroke="#3b82f6"
                                strokeWidth="16"
                                strokeDasharray={`${needsPercent * 2.513} ${100 * 2.513}`}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                            <circle
                                cx="50" cy="50" r="40" fill="none" stroke="#eab308"
                                strokeWidth="16"
                                strokeDasharray={`${wantsPercent * 2.513} ${100 * 2.513}`}
                                strokeDashoffset={-needsPercent * 2.513}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                            <circle
                                cx="50" cy="50" r="40" fill="none" stroke="#22c55e"
                                strokeWidth="16"
                                strokeDasharray={`${savingsPercent * 2.513} ${100 * 2.513}`}
                                strokeDashoffset={-(needsPercent + wantsPercent) * 2.513}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            {total > 0 ? `₹${Math.round(total).toLocaleString()}` : '0'}
                        </div>
                    </div>
                    <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-gray-300">Needs</span>
                            <span className="text-gray-500 ml-auto">{needsPercent.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="text-gray-300">Wants</span>
                            <span className="text-gray-500 ml-auto">{wantsPercent.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-gray-300">Savings</span>
                            <span className="text-gray-500 ml-auto">{savingsPercent.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalaryBudgetingCalculator() {
    const [monthlySalary, setMonthlySalary] = useState("");
    const [rent, setRent] = useState("");
    const [groceries, setGroceries] = useState("");
    const [utilities, setUtilities] = useState("");
    const [transport, setTransport] = useState("");
    const [insurance, setInsurance] = useState("");
    const [emiPayments, setEmiPayments] = useState("");
    const [diningOut, setDiningOut] = useState("");
    const [entertainment, setEntertainment] = useState("");
    const [shopping, setShopping] = useState("");
    const [subscriptions, setSubscriptions] = useState("");
    const [emergencyFund, setEmergencyFund] = useState("");
    const [investments, setInvestments] = useState("");
    const [savingsGoal, setSavingsGoal] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setMonthlySalary("");
        setRent("");
        setGroceries("");
        setUtilities("");
        setTransport("");
        setInsurance("");
        setEmiPayments("");
        setDiningOut("");
        setEntertainment("");
        setShopping("");
        setSubscriptions("");
        setEmergencyFund("");
        setInvestments("");
        setSavingsGoal("");
        setResult(null);
    };

    const calculateBudget = () => {
        const salary = parseFloat(monthlySalary);

        if (isNaN(salary) || salary <= 0) {
            alert("Please enter a valid monthly salary greater than zero");
            return;
        }

        const needsTotal = (parseFloat(rent) || 0) + (parseFloat(groceries) || 0) +
            (parseFloat(utilities) || 0) + (parseFloat(transport) || 0) +
            (parseFloat(insurance) || 0) + (parseFloat(emiPayments) || 0);

        const wantsTotal = (parseFloat(diningOut) || 0) + (parseFloat(entertainment) || 0) +
            (parseFloat(shopping) || 0) + (parseFloat(subscriptions) || 0);

        const savingsTotal = (parseFloat(emergencyFund) || 0) + (parseFloat(investments) || 0) +
            (parseFloat(savingsGoal) || 0);

        const totalExpenses = needsTotal + wantsTotal + savingsTotal;
        const remaining = salary - totalExpenses;

        const needsRecommended = salary * 0.5;
        const wantsRecommended = salary * 0.3;
        const savingsRecommended = salary * 0.2;

        let needsRating = "";
        let needsRatingColor = "";
        if (needsTotal <= needsRecommended) {
            needsRating = "✅ On Track (50% or less)";
            needsRatingColor = "text-green-400";
        } else if (needsTotal <= needsRecommended * 1.2) {
            needsRating = "⚠️ Slightly High (50-60%)";
            needsRatingColor = "text-yellow-400";
        } else {
            needsRating = "❌ Too High (Above 60%)";
            needsRatingColor = "text-red-400";
        }

        let wantsRating = "";
        let wantsRatingColor = "";
        if (wantsTotal <= wantsRecommended) {
            wantsRating = "✅ On Track (30% or less)";
            wantsRatingColor = "text-green-400";
        } else if (wantsTotal <= wantsRecommended * 1.2) {
            wantsRating = "⚠️ Slightly High (30-36%)";
            wantsRatingColor = "text-yellow-400";
        } else {
            wantsRating = "❌ Too High (Above 36%)";
            wantsRatingColor = "text-red-400";
        }

        let savingsRating = "";
        let savingsRatingColor = "";
        if (savingsTotal >= savingsRecommended) {
            savingsRating = "✅ On Track (20% or more)";
            savingsRatingColor = "text-green-400";
        } else if (savingsTotal >= savingsRecommended * 0.7) {
            savingsRating = "⚠️ Moderate (14-20%)";
            savingsRatingColor = "text-yellow-400";
        } else {
            savingsRating = "❌ Below Target (Less than 14%)";
            savingsRatingColor = "text-red-400";
        }

        let overallRating = "";
        let overallRatingColor = "";
        if (needsTotal <= needsRecommended && wantsTotal <= wantsRecommended && savingsTotal >= savingsRecommended) {
            overallRating = "Excellent ★★★★★";
            overallRatingColor = "text-green-400";
        } else if (needsTotal <= needsRecommended * 1.2 && wantsTotal <= wantsRecommended * 1.2 && savingsTotal >= savingsRecommended * 0.7) {
            overallRating = "Good ★★★★";
            overallRatingColor = "text-blue-400";
        } else if (needsTotal <= needsRecommended * 1.4 && wantsTotal <= wantsRecommended * 1.4 && savingsTotal >= savingsRecommended * 0.5) {
            overallRating = "Fair ★★★";
            overallRatingColor = "text-yellow-400";
        } else {
            overallRating = "Needs Improvement ★★";
            overallRatingColor = "text-red-400";
        }

        setResult({
            salary: salary,
            needsTotal: needsTotal,
            wantsTotal: wantsTotal,
            savingsTotal: savingsTotal,
            totalExpenses: totalExpenses,
            remaining: remaining,
            needsRecommended: needsRecommended,
            wantsRecommended: wantsRecommended,
            savingsRecommended: savingsRecommended,
            needsRating: needsRating,
            needsRatingColor: needsRatingColor,
            wantsRating: wantsRating,
            wantsRatingColor: wantsRatingColor,
            savingsRating: savingsRating,
            savingsRatingColor: savingsRatingColor,
            overallRating: overallRating,
            overallRatingColor: overallRatingColor,
            needsBreakdown: {
                rent: parseFloat(rent) || 0,
                groceries: parseFloat(groceries) || 0,
                utilities: parseFloat(utilities) || 0,
                transport: parseFloat(transport) || 0,
                insurance: parseFloat(insurance) || 0,
                emi: parseFloat(emiPayments) || 0,
            },
            wantsBreakdown: {
                diningOut: parseFloat(diningOut) || 0,
                entertainment: parseFloat(entertainment) || 0,
                shopping: parseFloat(shopping) || 0,
                subscriptions: parseFloat(subscriptions) || 0,
            },
            savingsBreakdown: {
                emergencyFund: parseFloat(emergencyFund) || 0,
                investments: parseFloat(investments) || 0,
                savingsGoal: parseFloat(savingsGoal) || 0,
            },
            needsPercentage: ((needsTotal / salary) * 100).toFixed(1),
            wantsPercentage: ((wantsTotal / salary) * 100).toFixed(1),
            savingsPercentage: ((savingsTotal / salary) * 100).toFixed(1),
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
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/finance" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Finance Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Salary Budgeting Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Salary Budgeting Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Plan your monthly budget with 50/30/20 rule</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Monthly Salary */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Monthly Salary (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1000"
                                    placeholder="e.g., 50000"
                                    value={monthlySalary}
                                    onChange={(e) => setMonthlySalary(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-4">
                            <h4 className="text-sm font-semibold text-blue-400 mb-3">🏠 Needs (Essential Expenses)</h4>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Rent / Mortgage</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={rent}
                                        onChange={(e) => setRent(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Groceries</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={groceries}
                                        onChange={(e) => setGroceries(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Utilities (Electricity, Water, Gas)</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={utilities}
                                        onChange={(e) => setUtilities(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Transportation</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={transport}
                                        onChange={(e) => setTransport(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Insurance (Health, Life, Vehicle)</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={insurance}
                                        onChange={(e) => setInsurance(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">EMI / Loan Payments</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={emiPayments}
                                        onChange={(e) => setEmiPayments(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-4">
                            <h4 className="text-sm font-semibold text-yellow-400 mb-3">🎯 Wants (Discretionary Spending)</h4>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Dining Out</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={diningOut}
                                        onChange={(e) => setDiningOut(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Entertainment & Leisure</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={entertainment}
                                        onChange={(e) => setEntertainment(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Shopping</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={shopping}
                                        onChange={(e) => setShopping(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Subscriptions (Netflix, Spotify, etc.)</label>
                                    <input
                                        type="number"
                                        step="100"
                                        placeholder="0"
                                        value={subscriptions}
                                        onChange={(e) => setSubscriptions(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-4">
                            <h4 className="text-sm font-semibold text-green-400 mb-3">💰 Savings & Investments</h4>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Emergency Fund</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={emergencyFund}
                                        onChange={(e) => setEmergencyFund(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Investments (FD, SIP, PPF, etc.)</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={investments}
                                        onChange={(e) => setInvestments(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Savings Goal</label>
                                    <input
                                        type="number"
                                        step="500"
                                        placeholder="0"
                                        value={savingsGoal}
                                        onChange={(e) => setSavingsGoal(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={calculateBudget}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Calculate Budget →
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

                {/* Result Box with Chart */}
                <div className="space-y-4">
                    <ResultBox
                        title="Budget Summary"
                        isEmpty={!result}
                        emptyIcon="📊"
                        emptyText="Enter your salary and expenses to see your budget analysis"
                        mainResult={result ? {
                            label: "Remaining Balance",
                            value: `₹${result.remaining.toFixed(2)}`,
                            color: result.remaining >= 0 ? "text-green-400" : "text-red-400"
                        } : undefined}
                        extraRows={result ? [
                            { label: "Overall Budget Health", value: result.overallRating, valueColor: result.overallRatingColor },
                            { label: "Total Income", value: `₹${result.salary.toFixed(2)}` },
                            { label: "Total Expenses", value: `₹${result.totalExpenses.toFixed(2)}` },
                            { label: "Needs (Essential)", value: `₹${result.needsTotal.toFixed(2)} (${result.needsPercentage}%)`, valueColor: result.needsRatingColor },
                            { label: "Needs Rating", value: result.needsRating, valueColor: result.needsRatingColor },
                            { label: "Wants (Discretionary)", value: `₹${result.wantsTotal.toFixed(2)} (${result.wantsPercentage}%)`, valueColor: result.wantsRatingColor },
                            { label: "Wants Rating", value: result.wantsRating, valueColor: result.wantsRatingColor },
                            { label: "Savings & Investments", value: `₹${result.savingsTotal.toFixed(2)} (${result.savingsPercentage}%)`, valueColor: result.savingsRatingColor },
                            { label: "Savings Rating", value: result.savingsRating, valueColor: result.savingsRatingColor },
                            { label: "50/30/20 Recommended", value: `₹${result.needsRecommended.toFixed(2)} / ₹${result.wantsRecommended.toFixed(2)} / ₹${result.savingsRecommended.toFixed(2)}` },
                        ] : []}
                    />

                    {/* Budget Chart */}
                    {result && (
                        <BudgetChart
                            needs={result.needsTotal}
                            wants={result.wantsTotal}
                            savings={result.savingsTotal}
                        />
                    )}
                </div>
            </div>

            {/* ─── EXPANDED SEO CONTENT ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Salary Budgeting Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Salary Budgeting Calculator</strong> helps you plan and track your monthly expenses effectively. By categorizing your spending into needs, wants, and savings, you can understand where your money goes and make informed financial decisions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    This calculator follows the popular <strong className="text-gray-300">50/30/20 budgeting rule</strong>, which suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment. Whether you're saving for a goal, managing debt, or building an emergency fund, this tool provides a clear financial roadmap.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your spending patterns is the first step toward financial freedom. Use our calculator to create a budget that works for your lifestyle and goals.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Salary Budgeting Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">monthly salary</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">needs</strong> expenses: rent, groceries, utilities, transport, insurance, and EMI payments.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter your <strong className="text-white">wants</strong> expenses: dining out, entertainment, shopping, and subscriptions.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter your <strong className="text-white">savings & investments</strong>: emergency fund, investments, and savings goals.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate Budget"</strong> to see your budget analysis and ratings.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Review your <strong className="text-white">budget health rating</strong> and make adjustments to optimize your spending.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Salary Budgeting Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Financial Awareness</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand exactly where your money goes each month. Identify areas where you can cut back and save more.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Goal Setting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Set realistic savings goals and track your progress. Whether it's an emergency fund or a dream vacation, our calculator helps you plan.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ 50/30/20 Rule Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See how your spending compares to the recommended 50/30/20 rule. Get personalized ratings for each category.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Debt Management</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Track your loan EMI payments and see how they impact your overall budget. Plan your debt repayment strategy effectively.</p>
                    </div>
                </div>
            </section>

            {/* 50/30/20 Rule Explanation */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Understanding the 50/30/20 Rule</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        The <strong className="text-gray-300">50/30/20 rule</strong> is a simple yet powerful budgeting framework popularized by Senator Elizabeth Warren. It divides your after-tax income into three categories:
                    </p>
                    <div className="space-y-3">
                        <div className="bg-[#0f1525] border border-blue-500/30 rounded-lg p-3">
                            <p className="text-sm font-semibold text-blue-400">🏠 50% - Needs (Essential Expenses)</p>
                            <ul className="text-xs text-gray-400 mt-1 space-y-0.5">
                                <li>• Rent or mortgage payments</li>
                                <li>• Groceries and essential food</li>
                                <li>• Utilities (electricity, water, gas)</li>
                                <li>• Transportation (fuel, public transit)</li>
                                <li>• Insurance premiums (health, life, vehicle)</li>
                                <li>• Minimum loan/EMI payments</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] border border-yellow-500/30 rounded-lg p-3">
                            <p className="text-sm font-semibold text-yellow-400">🎯 30% - Wants (Discretionary Expenses)</p>
                            <ul className="text-xs text-gray-400 mt-1 space-y-0.5">
                                <li>• Dining out and restaurants</li>
                                <li>• Entertainment (movies, concerts)</li>
                                <li>• Shopping and non-essential purchases</li>
                                <li>• Subscriptions (Netflix, Spotify, gym)</li>
                                <li>• Hobbies and recreational activities</li>
                                <li>• Travel and vacations</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] border border-green-500/30 rounded-lg p-3">
                            <p className="text-sm font-semibold text-green-400">💰 20% - Savings & Debt Repayment</p>
                            <ul className="text-xs text-gray-400 mt-1 space-y-0.5">
                                <li>• Emergency fund contributions</li>
                                <li>• Retirement savings (PPF, NPS, EPF)</li>
                                <li>• Investments (mutual funds, stocks, FD)</li>
                                <li>• Extra debt payments (above minimum)</li>
                                <li>• Savings goals (house, car, education)</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">* This rule is a guideline. Adjust the percentages based on your personal situation and financial goals.</p>
                </div>
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