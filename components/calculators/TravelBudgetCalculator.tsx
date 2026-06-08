"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to plan a travel budget?",
        a: "Include transportation (flights, trains, local travel), accommodation, food, activities, shopping, and emergency fund. Add 10-15% buffer for unexpected expenses.",
    },
    {
        q: "What is a good daily travel budget?",
        a: "Budget travel: $30-50/day, Mid-range: $50-100/day, Luxury: $150-300/day. Southeast Asia is cheaper ($20-40), Europe is moderate ($80-150), Switzerland/Scandinavia is expensive ($150-250).",
    },
    {
        q: "How much should I budget for food?",
        a: "Breakfast: $5-15, Lunch: $10-25, Dinner: $15-50. Cooking your own meals saves 50-70%. Street food is cheaper ($3-8 per meal).",
    },
    {
        q: "What is the 50-30-20 rule for travel?",
        a: "50% on essentials (flights, accommodation, transport), 30% on experiences (activities, dining), 20% on savings/emergency. Adjust based on your priorities.",
    },
];

const BUDGET_CATEGORIES = [
    { name: "Flights", icon: "✈️", color: "text-blue-400" },
    { name: "Accommodation", icon: "🏨", color: "text-green-400" },
    { name: "Local Transport", icon: "🚗", color: "text-yellow-400" },
    { name: "Food & Dining", icon: "🍽️", color: "text-orange-400" },
    { name: "Activities", icon: "🎯", color: "text-purple-400" },
    { name: "Shopping", icon: "🛍️", color: "text-pink-400" },
    { name: "Miscellaneous", icon: "📝", color: "text-gray-400" },
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
    name: "Travel Budget Calculator – Plan Your Trip Budget",
    description: "Calculate your travel budget including flights, accommodation, food, activities, and more.",
    url: "https://www.numrexo.com/travel/travel-budget-calculator",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Budget planning", "Expense tracking", "Daily budget", "Trip cost estimator"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://www.numrexo.com/travel" },
        { "@type": "ListItem", position: 3, name: "Travel Budget Calculator", item: "https://www.numrexo.com/travel/travel-budget-calculator" },
    ],
});

interface BudgetItem {
    id: string;
    name: string;
    amount: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TravelBudgetCalculator() {
    const [tripDays, setTripDays] = useState("");
    const [peopleCount, setPeopleCount] = useState("1");
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
        { id: "flights", name: "Flights", amount: "" },
        { id: "accommodation", name: "Accommodation", amount: "" },
        { id: "transport", name: "Local Transport", amount: "" },
        { id: "food", name: "Food & Dining", amount: "" },
        { id: "activities", name: "Activities", amount: "" },
        { id: "shopping", name: "Shopping", amount: "" },
        { id: "misc", name: "Miscellaneous", amount: "" },
    ]);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const updateBudgetItem = (id: string, value: string) => {
        setBudgetItems(budgetItems.map(item => item.id === id ? { ...item, amount: value } : item));
    };

    const calculate = () => {
        const days = parseFloat(tripDays);
        const people = parseFloat(peopleCount);

        if (!days || days <= 0) {
            alert("Please enter number of trip days");
            return;
        }

        let totalBudget = 0;
        const breakdown: { name: string; amount: number }[] = [];

        for (const item of budgetItems) {
            const amount = parseFloat(item.amount);
            if (!isNaN(amount) && amount > 0) {
                totalBudget += amount;
                breakdown.push({ name: item.name, amount });
            }
        }

        if (totalBudget === 0) {
            alert("Please enter at least one budget amount");
            return;
        }

        const perDayBudget = totalBudget / days;
        const perPersonBudget = totalBudget / people;
        const perPersonPerDay = totalBudget / (days * people);

        setResult({
            totalBudget: totalBudget.toFixed(2),
            perDayBudget: perDayBudget.toFixed(2),
            perPersonBudget: perPersonBudget.toFixed(2),
            perPersonPerDay: perPersonPerDay.toFixed(2),
            breakdown,
            days,
            people,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/travel" itemProp="item" className="hover:text-gray-300">Travel Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Travel Budget Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Travel Budget Planner</h3>
                        <p className="text-xs text-gray-500 mt-1">Plan your trip expenses</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Trip Duration (days)</label><input type="number" placeholder="7" value={tripDays} onChange={(e) => setTripDays(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of People</label><input type="number" placeholder="1" value={peopleCount} onChange={(e) => setPeopleCount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Expense Categories</label>
                            {budgetItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <div className="w-32 text-sm text-gray-400">{item.name}</div>
                                    <div className="flex-1 relative"><input type="number" step="10" placeholder="0" value={item.amount} onChange={(e) => updateBudgetItem(item.id, e.target.value)} className="w-full px-4 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div>
                                </div>
                            ))}
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg">Calculate Budget →</button>
                    </div>
                </div>

                <ResultBox
                    title="Budget Summary"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter trip details and expenses"
                    mainResult={result ? { label: "Total Budget", value: `$${parseFloat(result.totalBudget).toLocaleString()}`, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Per Day", value: `$${result.perDayBudget}`, valueColor: "text-yellow-400" },
                        { label: "Per Person", value: `$${result.perPersonBudget}` },
                        { label: "Per Person Per Day", value: `$${result.perPersonPerDay}`, valueColor: "text-green-400" },
                        ...result.breakdown.map((item: any) => ({ label: item.name, value: `$${item.amount.toLocaleString()}` })),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Travel Budget Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Plan your trip budget by estimating costs for flights, accommodation, food, activities, and more. Get per day and per person breakdowns.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Sample Daily Budgets by Destination</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Region</th><th className="text-left py-3 px-4 text-gray-400">Budget</th><th className="text-left py-3 px-4 text-gray-400">Mid-Range</th><th className="text-left py-3 px-4 text-gray-400">Luxury</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Southeast Asia</td><td className="py-2 px-4 text-yellow-400">$20-40</td><td className="py-2 px-4">$40-80</td><td className="py-2 px-4">$100-200</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">India/Sri Lanka</td><td className="py-2 px-4 text-yellow-400">$15-30</td><td className="py-2 px-4">$30-60</td><td className="py-2 px-4">$80-150</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Europe</td><td className="py-2 px-4 text-yellow-400">$50-80</td><td className="py-2 px-4">$80-150</td><td className="py-2 px-4">$200-400</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">USA/Canada</td><td className="py-2 px-4 text-yellow-400">$50-80</td><td className="py-2 px-4">$100-200</td><td className="py-2 px-4">$250-500</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Australia/NZ</td><td className="py-2 px-4 text-yellow-400">$40-70</td><td className="py-2 px-4">$80-150</td><td className="py-2 px-4">$200-400</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}