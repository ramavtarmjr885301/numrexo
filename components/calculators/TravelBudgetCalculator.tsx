"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to plan a travel budget?",
        a: "Include transportation (flights, trains, local travel), accommodation, food, activities, shopping, and emergency fund. Add 10-15% buffer for unexpected expenses. Start by researching average costs for your destination, then categorize your expenses. Use our calculator to track each category and get a complete budget breakdown. Always plan for currency fluctuations and travel insurance costs.",
    },
    {
        q: "What is a good daily travel budget?",
        a: "Budget travel: $30-50/day (hostels, street food, public transport), Mid-range: $50-100/day (private rooms, restaurants, tours), Luxury: $150-300/day (hotels, fine dining, private tours). Southeast Asia is cheaper ($20-40), Europe is moderate ($80-150), Switzerland/Scandinavia is expensive ($150-250). Your daily budget should also account for activities, which can be $10-50 per day depending on your interests.",
    },
    {
        q: "How much should I budget for food?",
        a: "Breakfast: $5-15 (cafe or included in hotel), Lunch: $10-25 (restaurant or takeaway), Dinner: $15-50 (dining out). Cooking your own meals saves 50-70%. Street food is cheaper ($3-8 per meal). For a 7-day trip, budget $150-300 per person for food. Fine dining in major cities can cost $50-100 per person. Always research local food prices before your trip.",
    },
    {
        q: "What is the 50-30-20 rule for travel?",
        a: "50% on essentials (flights, accommodation, transport), 30% on experiences (activities, dining, tours), 20% on savings/emergency. Adjust based on your priorities. Example: $3,000 trip → $1,500 essentials, $900 experiences, $600 buffer. This rule ensures you cover necessities while still enjoying your trip and having a safety net for unexpected costs.",
    },
    {
        q: "How to save money on flights?",
        a: "Tips for cheaper flights: 1) Book 2-3 months in advance for international flights, 2) Use incognito mode when searching, 3) Fly on Tuesdays and Wednesdays (cheapest days), 4) Use price comparison websites, 5) Sign up for fare alerts, 6) Consider nearby airports, 7) Be flexible with dates, 8) Use airline miles/points, 9) Travel during shoulder season, 10) Book connecting flights vs direct. Saving $200-500 on flights is possible with these strategies.",
    },
    {
        q: "What are the hidden costs of travel?",
        a: "Hidden travel costs include: 1) Baggage fees ($30-100 per bag), 2) Resort fees ($20-40/night), 3) Tourist taxes ($2-10/night), 4) Currency conversion fees (3-5%), 5) ATM fees ($2-5 per withdrawal), 6) Travel insurance ($30-100), 7) Transportation to/from airport ($20-50), 8) Tipping (15-20%), 9) SIM cards/data ($10-30), 10) Visa fees ($20-100). Always research these costs and add 15-20% buffer to your budget.",
    },
    {
        q: "How to budget for a family vacation?",
        a: "Family travel budgeting: 1) Accommodation: book family rooms or apartments (saves 30-50% vs 2 hotel rooms), 2) Transport: rent a car vs multiple taxis, 3) Meals: grocery stores and picnics save 50%+, 4) Activities: family passes (discounts for groups), 5) Kids eat free at many restaurants, 6) Stay in family-friendly hotels with free breakfast, 7) Use points for family tickets. Budget $100-250 per person per day for family travel, with children under 12 costing less.",
    },
    {
        q: "What is the best time to travel for budget?",
        a: "Best budget travel times: 1) Shoulder season (between peak and off-peak) - prices drop 30-50%, 2) Off-season - cheapest but weather may be less ideal, 3) Mid-week travel (Tue-Wed) - flights 20-30% cheaper, 4) Book 2-3 months ahead for best flight deals, 5) Last-minute deals can save on hotels (booking 1-7 days before). Avoid peak seasons (June-August, December holidays) and major events which drive prices up 50-100%.",
    },
    {
        q: "How to budget for a long-term trip?",
        a: "Long-term travel (1+ months) budgeting: 1) Slow travel - stay longer in one place for better deals, 2) House sit or volunteer for free accommodation, 3) Cook most meals, 4) Use local transport (buses, trains), 5) Work remotely or freelance, 6) Stay in hostels or shared apartments, 7) Travel overland (train/bus) vs flights, 8) Budget $30-60/day for sustainable long-term travel. Example: $2,000/month is possible in Southeast Asia or South America.",
    },
    {
        q: "What travel expenses are tax deductible?",
        a: "Tax-deductible travel expenses (for business, not personal): 1) Flights and transport, 2) Hotel stays, 3) 50% of meals (business meals), 4) Conference fees, 5) Internet/phone charges, 6) Car rentals, 7) Baggage fees, 8) Tips. Requirements: Must be ordinary and necessary for business, not personal or extravagant. Keep ALL receipts. For self-employed, business travel expenses are deductible. Consult a tax professional for specific advice.",
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
    icon: string;
    color: string;
}

const DESTINATION_BUDGETS = [
    { region: "🌏 Southeast Asia", budget: "$20-40", midRange: "$40-80", luxury: "$100-200", notes: "Thailand, Vietnam, Indonesia" },
    { region: "🇮🇳 India/Sri Lanka", budget: "$15-30", midRange: "$30-60", luxury: "$80-150", notes: "South Asia budget friendly" },
    { region: "🇪🇺 Europe", budget: "$50-80", midRange: "$80-150", luxury: "$200-400", notes: "Eastern Europe cheaper" },
    { region: "🇺🇸 USA/Canada", budget: "$50-80", midRange: "$100-200", luxury: "$250-500", notes: "Varies by city" },
    { region: "🇦🇺 Australia/NZ", budget: "$40-70", midRange: "$80-150", luxury: "$200-400", notes: "High cost of living" },
    { region: "🇯🇵 Japan/Korea", budget: "$50-80", midRange: "$100-180", luxury: "$200-400", notes: "Efficient transport" },
    { region: "🇲🇽 Mexico/Central Am", budget: "$25-45", midRange: "$50-90", luxury: "$120-250", notes: "Tacos and ruins" },
    { region: "🇿🇦 Africa", budget: "$30-60", midRange: "$70-130", luxury: "$150-350", notes: "Safaris cost more" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TravelBudgetCalculator() {
    const [tripDays, setTripDays] = useState("");
    const [peopleCount, setPeopleCount] = useState("1");
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
        { id: "flights", name: "Flights", amount: "", icon: "✈️", color: "text-blue-400" },
        { id: "accommodation", name: "Accommodation", amount: "", icon: "🏨", color: "text-green-400" },
        { id: "transport", name: "Local Transport", amount: "", icon: "🚗", color: "text-yellow-400" },
        { id: "food", name: "Food & Dining", amount: "", icon: "🍽️", color: "text-orange-400" },
        { id: "activities", name: "Activities", amount: "", icon: "🎯", color: "text-purple-400" },
        { id: "shopping", name: "Shopping", amount: "", icon: "🛍️", color: "text-pink-400" },
        { id: "misc", name: "Miscellaneous", amount: "", icon: "📝", color: "text-gray-400" },
    ]);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setTripDays("");
        setPeopleCount("1");
        setBudgetItems([
            { id: "flights", name: "Flights", amount: "", icon: "✈️", color: "text-blue-400" },
            { id: "accommodation", name: "Accommodation", amount: "", icon: "🏨", color: "text-green-400" },
            { id: "transport", name: "Local Transport", amount: "", icon: "🚗", color: "text-yellow-400" },
            { id: "food", name: "Food & Dining", amount: "", icon: "🍽️", color: "text-orange-400" },
            { id: "activities", name: "Activities", amount: "", icon: "🎯", color: "text-purple-400" },
            { id: "shopping", name: "Shopping", amount: "", icon: "🛍️", color: "text-pink-400" },
            { id: "misc", name: "Miscellaneous", amount: "", icon: "📝", color: "text-gray-400" },
        ]);
        setResult(null);
    };

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

        if (people < 1) {
            alert("Number of people must be at least 1");
            return;
        }

        let totalBudget = 0;
        const breakdown: { name: string; amount: number; icon: string; color: string }[] = [];

        for (const item of budgetItems) {
            const amount = parseFloat(item.amount);
            if (!isNaN(amount) && amount > 0) {
                totalBudget += amount;
                breakdown.push({ name: item.name, amount, icon: item.icon, color: item.color });
            }
        }

        if (totalBudget === 0) {
            alert("Please enter at least one budget amount");
            return;
        }

        const perDayBudget = totalBudget / days;
        const perPersonBudget = totalBudget / people;
        const perPersonPerDay = totalBudget / (days * people);

        // Calculate category percentages
        const categoriesWithPercent = breakdown.map(item => ({
            ...item,
            percentage: ((item.amount / totalBudget) * 100).toFixed(1)
        }));

        setResult({
            totalBudget: totalBudget.toFixed(2),
            perDayBudget: perDayBudget.toFixed(2),
            perPersonBudget: perPersonBudget.toFixed(2),
            perPersonPerDay: perPersonPerDay.toFixed(2),
            breakdown: categoriesWithPercent,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/travel" itemProp="item" className="hover:text-gray-300">Travel Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Travel Budget Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Travel Budget Planner</h3>
                        <p className="text-xs text-gray-500 mt-1">Plan your trip expenses</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Trip Duration (days)</label>
                                <input
                                    type="number"
                                    placeholder="7"
                                    min="1"
                                    value={tripDays}
                                    onChange={(e) => setTripDays(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Number of People</label>
                                <input
                                    type="number"
                                    placeholder="1"
                                    min="1"
                                    value={peopleCount}
                                    onChange={(e) => setPeopleCount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Expense Categories</label>
                            {budgetItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <div className="w-8 text-lg">{item.icon}</div>
                                    <div className="w-28 text-sm text-gray-400">{item.name}</div>
                                    <div className="flex-1 relative">
                                        <input
                                            type="number"
                                            step="10"
                                            placeholder="0"
                                            value={item.amount}
                                            onChange={(e) => updateBudgetItem(item.id, e.target.value)}
                                            className="w-full px-4 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
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

                {/* Result Box */}
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
                        ...result.breakdown.map((item: any) => ({
                            label: `${item.icon} ${item.name}`,
                            value: `$${item.amount.toLocaleString()} (${item.percentage}%)`,
                            valueColor: item.color
                        })),
                        { label: "Trip Duration", value: `${result.days} days` },
                        { label: "Number of People", value: `${result.people}` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Travel Budget Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Travel Budget Calculator</strong> helps you plan your trip expenses accurately. Enter your trip duration, number of travelers, and estimated costs for flights, accommodation, food, activities, and more to get a complete budget breakdown.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're planning a weekend getaway, a family vacation, or a long-term backpacking trip, our calculator provides essential insights including total budget, daily costs, per-person expenses, and category breakdowns with percentages.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    With built-in destination guides, saving tips, and seasonal advice, you'll be able to plan your dream trip without breaking the bank.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Travel Budget Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">trip duration</strong> in days.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">number of people</strong> traveling.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter estimated <strong className="text-white">expenses for each category</strong> (flights, accommodation, food, etc.).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Budget"</strong> to see your trip budget breakdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review your <strong className="text-white">total budget, daily costs, and category percentages</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Travel Budget Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Accurate Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much your trip will cost before you go. Avoid financial surprises and plan with confidence.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Category Breakdown</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See where your money is going. Identify which categories take the most budget and where you can save.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Per Person Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand costs per person and per day. Perfect for group travel and family vacation planning.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Budget Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Adjust expense estimates to find the right balance between comfort and cost. Optimize your travel budget.</p>
                    </div>
                </div>
            </section>

            {/* Destination Budget Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Daily Budget by Destination</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Region</th>
                                <th className="text-left py-3 px-4 text-gray-400">Budget</th>
                                <th className="text-left py-3 px-4 text-gray-400">Mid-Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Luxury</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DESTINATION_BUDGETS.map((dest, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{dest.region}</td>
                                    <td className="py-3 px-4 text-yellow-400">{dest.budget}</td>
                                    <td className="py-3 px-4 text-gray-400">{dest.midRange}</td>
                                    <td className="py-3 px-4 text-gray-400">{dest.luxury}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">{dest.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Daily budgets include accommodation, food, transport, and basic activities. Excludes flights and shopping.
                    </p>
                </div>
            </section>

            {/* Savings Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Travel Money Saving Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <div className="text-2xl mb-1">✈️</div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-1">Flights</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Book 2-3 months in advance</li>
                            <li>• Fly on Tuesdays or Wednesdays</li>
                            <li>• Use incognito mode for searches</li>
                            <li>• Consider nearby airports</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <div className="text-2xl mb-1">🏨</div>
                        <h4 className="text-sm font-semibold text-green-400 mb-1">Accommodation</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Book in advance for better deals</li>
                            <li>• Consider hostels or shared rooms</li>
                            <li>• Look for last-minute deals</li>
                            <li>• Stay outside city center</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
                        <div className="text-2xl mb-1">🍽️</div>
                        <h4 className="text-sm font-semibold text-orange-400 mb-1">Food</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Eat street food and local markets</li>
                            <li>• Cook some meals yourself</li>
                            <li>• Look for lunch specials</li>
                            <li>• Drink tap water (if safe)</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <div className="text-2xl mb-1">🎯</div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-1">Activities</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Free walking tours</li>
                            <li>• City passes for discounts</li>
                            <li>• Museums on free days</li>
                            <li>• Group tours vs private</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Seasonal Budgeting */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Seasonal Budget Planning</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-[#0f1525] rounded-lg border border-green-500/20">
                            <div className="text-2xl mb-1">🌸</div>
                            <h4 className="text-sm font-semibold text-green-400">Shoulder Season</h4>
                            <p className="text-xs text-gray-400">Spring & Fall</p>
                            <p className="text-xs text-yellow-400 mt-1">Best value: 30-50% cheaper</p>
                            <p className="text-xs text-gray-500">Good weather, fewer crowds</p>
                        </div>
                        <div className="text-center p-3 bg-[#0f1525] rounded-lg border border-yellow-500/20">
                            <div className="text-2xl mb-1">☀️</div>
                            <h4 className="text-sm font-semibold text-yellow-400">Peak Season</h4>
                            <p className="text-xs text-gray-400">Summer & Holidays</p>
                            <p className="text-xs text-red-400 mt-1">Highest prices (50-100% more)</p>
                            <p className="text-xs text-gray-500">Best weather, busy</p>
                        </div>
                        <div className="text-center p-3 bg-[#0f1525] rounded-lg border border-blue-500/20">
                            <div className="text-2xl mb-1">❄️</div>
                            <h4 className="text-sm font-semibold text-blue-400">Off-Season</h4>
                            <p className="text-xs text-gray-400">Winter (excluding holidays)</p>
                            <p className="text-xs text-green-400 mt-1">Cheapest (60-70% less)</p>
                            <p className="text-xs text-gray-500">Limited activities, cooler</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Travel Budget Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Travel Budget Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Add a 15% buffer:</strong> Always add 15-20% to your calculated budget for unexpected expenses. Hidden costs like baggage fees, tourist taxes, and emergency medical expenses can add up.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Research local prices:</strong> Use websites and apps to research current prices for accommodation, food, and activities. Prices change seasonally and by location.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Track your spending:</strong> During your trip, track expenses daily to stay on budget. Use apps or a simple notebook to log purchases.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider travel insurance:</strong> Budget $30-100 for travel insurance. It covers medical emergencies, trip cancellations, and lost luggage. Peace of mind is worth the cost.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use no-foreign-fee cards:</strong> Credit/debit cards without foreign transaction fees save 2-5% on every purchase. Get a travel-friendly card before your trip.</span>
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