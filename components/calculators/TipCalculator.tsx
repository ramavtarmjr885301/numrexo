"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How much should I tip at a restaurant?",
        a: "Standard tipping guidelines in the US: 15-20% for good service, 10% for average service, 0-5% for poor service. For large parties (6+), some restaurants add automatic 18% gratuity. Always check your bill first to avoid double-tipping. In other countries, tipping customs vary - see our country guide below. For exceptional service, consider tipping 25% or more to show appreciation.",
    },
    {
        q: "Should I tip on the total bill including tax?",
        a: "Most people tip on the subtotal (before tax), but tipping on the total including tax is fine too. The difference is usually small. Example: ₹1000 bill + 10% tax = ₹1100 total. 15% on subtotal = ₹150, on total = ₹165 (₹15 difference). For simplicity, many people tip on the total to avoid mental math. Our calculator lets you choose either method.",
    },
    {
        q: "How to calculate tip quickly in my head?",
        a: "10% tip = move decimal one place left (₹850 → ₹85). 15% tip = 10% + half of 10% (₹85 + ₹42.5 = ₹127.5). 20% tip = double the 10% (₹85 × 2 = ₹170). This mental math trick works for any bill amount. For exact calculations, use our calculator. For quick estimates: round up to the nearest ₹100 for easier math.",
    },
    {
        q: "Should I tip for takeout orders?",
        a: "Yes, 10-15% is customary for takeout, especially for large orders. The kitchen staff still prepares your food, and packaging takes time. For coffee shops, ₹20-50 or rounding up is fine. For small orders (under ₹500), a flat tip of ₹50-100 is appreciated. Consider tipping more for complex orders or during busy times.",
    },
    {
        q: "Do I tip on delivery orders?",
        a: "Yes, delivery drivers should be tipped 15-20% or minimum ₹50-100. They use their own vehicles and gas, and often work in challenging conditions. During bad weather or holidays, tip more (25%+). Some apps add a delivery fee — that doesn't go to the driver. Tip in cash when possible so the driver gets the full amount. For large orders, tip based on the total bill amount.",
    },
    {
        q: "How to split tip among friends?",
        a: "Calculate total tip, add to bill, divide by number of people. Example: Bill ₹4000, tip 18% = ₹720, total ₹4720. Split 4 ways = ₹1180 each. Use our split bill feature to calculate easily. For uneven splits (someone had more), calculate each person's share based on what they ordered. Most restaurants can split bills by item if requested.",
    },
    {
        q: "What is the difference between tip and service charge?",
        a: "Service charge is a mandatory fee added by some restaurants (usually 5-10%) that goes to the restaurant, not the servers. A tip/gratuity is optional and goes directly to the service staff. In some countries, service charge is included and additional tipping isn't expected. Always check your bill: if service charge is included, you can tip less or skip tipping entirely. Some restaurants add both - check carefully.",
    },
    {
        q: "How to tip in different countries?",
        a: "Tipping customs vary by country: USA: 15-20% (standard), Canada: 15-20%, UK: 10-15%, Europe: 5-10% (or rounding up), Australia: 0-10% (not expected), Japan: 0% (tipping can be offensive), India: 5-10% (service charge often included), UAE: 10-15%, Singapore: 0-10% (service charge included). Always research local customs before traveling. When in doubt, ask locals or check the bill.",
    },
    {
        q: "How do I tip when using a credit card?",
        a: "When using a credit card: 1) Look for the 'tip' line on the receipt, 2) Enter the tip amount, 3) Write the total, 4) Sign. Some POS systems prompt for tip percentage (15%, 18%, 20%) - select one or enter a custom amount. For delivery apps: tips are usually added before checkout or after delivery. Tip in cash when possible so service staff get the full amount (no processing fees).",
    },
    {
        q: "What is the 20% rule for tipping?",
        a: "The 20% rule is a modern guideline for excellent service. It's becoming the new standard in many US cities. 20% of the bill = generous tip for good service, 25%+ = exceptional. Many people find 20% easier to calculate (double the 10% tip). For bills under ₹1000, rounding up to the next ₹100 or ₹200 is common. Use our calculator for exact amounts, or remember: 20% = divide by 5.",
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
    name: "Tip Calculator – Gratuity Calculator",
    description: "Calculate tip percentage and split bill among friends. Perfect for restaurants, delivery, and services.",
    url: "https://www.numrexo.com/business/tip-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Tip percentage calculation", "Bill split", "Per person amount", "Total with tip"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Business Calculators", item: "https://www.numrexo.com/business" },
        { "@type": "ListItem", position: 3, name: "Tip Calculator", item: "https://www.numrexo.com/business/tip-calculator" },
    ],
});

const TIP_PERCENTAGES = [
    { percent: 10, label: "Poor Service", color: "text-red-400", description: "Unacceptable service" },
    { percent: 15, label: "Standard Service", color: "text-yellow-400", description: "Met expectations" },
    { percent: 18, label: "Good Service", color: "text-green-400", description: "Attentive and friendly" },
    { percent: 20, label: "Excellent Service", color: "text-blue-400", description: "Went above and beyond" },
    { percent: 25, label: "Outstanding Service", color: "text-purple-400", description: "Exceptional experience" },
];

const COUNTRY_TIPS = [
    { country: "🇺🇸 USA", tipRange: "15-25%", notes: "Standard: 20%, Excellent: 25%" },
    { country: "🇨🇦 Canada", tipRange: "15-20%", notes: "Similar to USA tipping customs" },
    { country: "🇬🇧 UK", tipRange: "10-15%", notes: "Service charge often included" },
    { country: "🇩🇪 Germany", tipRange: "5-10%", notes: "Round up to nearest euro" },
    { country: "🇫🇷 France", tipRange: "5-10%", notes: "Service included, tip for exceptional service" },
    { country: "🇦🇺 Australia", tipRange: "0-10%", notes: "Not expected, but appreciated" },
    { country: "🇯🇵 Japan", tipRange: "0%", notes: "Tipping can be considered offensive" },
    { country: "🇮🇳 India", tipRange: "5-10%", notes: "Service charge often included" },
    { country: "🇦🇪 UAE", tipRange: "10-15%", notes: "Common in hotels and restaurants" },
    { country: "🇸🇬 Singapore", tipRange: "0-10%", notes: "Service charge usually included" },
];

const SERVICE_TYPES = [
    { service: "🍽️ Restaurant (Dine-in)", tipGuide: "15-20%", notes: "Based on service quality" },
    { service: "📦 Takeout", tipGuide: "10-15%", notes: "For large orders or complex prep" },
    { service: "🚗 Delivery", tipGuide: "15-20%", notes: "Minimum ₹50-100 or 20%" },
    { service: "☕ Coffee Shop", tipGuide: "₹20-50", notes: "Round up or small bills" },
    { service: "💇 Hair Salon", tipGuide: "15-20%", notes: "Based on service cost" },
    { service: "🚕 Taxi/Ride", tipGuide: "10-15%", notes: "Round up to nearest ₹100" },
    { service: "🛎️ Hotel Staff", tipGuide: "₹100-500", notes: "Per bag or night" },
    { service: "📦 Moving Services", tipGuide: "10-15%", notes: "Per person, for heavy work" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TipCalculator() {
    const [billAmount, setBillAmount] = useState("");
    const [tipPercent, setTipPercent] = useState("15");
    const [peopleCount, setPeopleCount] = useState("1");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setBillAmount("");
        setTipPercent("15");
        setPeopleCount("1");
        setResult(null);
    };

    const calculate = () => {
        const bill = parseFloat(billAmount);
        const tip = parseFloat(tipPercent);
        const people = parseFloat(peopleCount);

        if (!bill || bill <= 0) {
            alert("Please enter a valid bill amount");
            return;
        }

        if (people < 1) {
            alert("Number of people must be at least 1");
            return;
        }

        const tipAmount = bill * (tip / 100);
        const totalAmount = bill + tipAmount;
        const perPerson = totalAmount / people;

        setResult({
            billAmount: bill.toFixed(2),
            tipPercent: tip,
            tipAmount: tipAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
            perPerson: perPerson.toFixed(2),
            peopleCount: people,
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
                        <a href="https://www.numrexo.com/business" itemProp="item" className="hover:text-gray-300">Business Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Tip Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Tip Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate gratuity and split bills</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Bill Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="1000"
                                    step="any"
                                    value={billAmount}
                                    onChange={(e) => setBillAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Tip Percentage (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="15"
                                    value={tipPercent}
                                    onChange={(e) => setTipPercent(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Number of People</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="1"
                                    min="1"
                                    value={peopleCount}
                                    onChange={(e) => setPeopleCount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">people</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Tip →
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
                    title="Tip Breakdown"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter bill amount and press Calculate"
                    mainResult={result ? { label: "Total Bill (with Tip)", value: `₹${parseFloat(result.totalAmount).toLocaleString()}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Original Bill", value: `₹${parseFloat(result.billAmount).toLocaleString()}` },
                        { label: `Tip (${result.tipPercent}%)`, value: `₹${parseFloat(result.tipAmount).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "Per Person Amount", value: `₹${parseFloat(result.perPerson).toLocaleString()}`, valueColor: "text-blue-400" },
                        { label: "Split Between", value: `${result.peopleCount} person${result.peopleCount > 1 ? 's' : ''}` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Tip Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Tip Calculator</strong> helps you calculate the perfect gratuity for restaurants, delivery services, and any service industry professional. It also makes splitting bills among friends quick and easy.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're dining out, ordering delivery, or getting a service done, our calculator ensures you never overpay or under-tip. It handles both percentage-based tips and even splitting, making social dining stress-free.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    With built-in tipping guidelines, country-specific customs, and quick mental math tips, you'll always know the right amount to tip in any situation.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Tip Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">bill amount</strong> in ₹.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">tip percentage</strong> (10-25% recommended).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">number of people</strong> to split the bill.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Tip"</strong> to see the breakdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review the <strong className="text-white">tip amount, total, and per person</strong> costs.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Tip Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Accurate Tipping</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Never second-guess the right tip amount. Calculate exact gratuity based on service quality and bill amount.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Easy Bill Splitting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Split bills evenly among friends. No more awkward math or overpaying. Perfect for group dining.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ International Travel</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know the tipping customs in different countries. Avoid embarrassing situations while traveling abroad.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly what you'll pay including tip. Plan your dining and service expenses with confidence.</p>
                    </div>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tip Calculation Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-gray-400 text-xs">Tip Amount</p>
                            <p className="text-white font-mono text-sm">Bill × (Tip% ÷ 100)</p>
                        </div>
                        <div className="text-center border-l border-r border-gray-800">
                            <p className="text-gray-400 text-xs">Total Bill</p>
                            <p className="text-white font-mono text-sm">Bill + Tip Amount</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-xs">Per Person</p>
                            <p className="text-white font-mono text-sm">Total ÷ People</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs text-center mt-3 pt-3 border-t border-gray-800">
                        Example: ₹1000 bill, 18% tip, 4 people → Tip ₹180, Total ₹1180, Per Person ₹295
                    </p>
                </div>
            </section>

            {/* Tip Guide Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tip Percentage Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Tip %</th>
                                <th className="text-left py-3 px-4 text-gray-400">Service Level</th>
                                <th className="text-left py-3 px-4 text-gray-400">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TIP_PERCENTAGES.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className={`py-3 px-4 font-mono ${item.color}`}>{item.percent}%</td>
                                    <td className="py-3 px-4 text-gray-300">{item.label}</td>
                                    <td className="py-3 px-4 text-gray-400">{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Customize the tip percentage based on service quality and local customs.
                    </p>
                </div>
            </section>

            {/* Country Tipping Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tipping Guide by Country</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Country</th>
                                <th className="text-left py-3 px-4 text-gray-400">Customary Tip</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COUNTRY_TIPS.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{item.country}</td>
                                    <td className="py-3 px-4 text-yellow-400">{item.tipRange}</td>
                                    <td className="py-3 px-4 text-gray-400 text-xs">{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Always check the bill for included service charge. Customs may vary by region within countries.
                    </p>
                </div>
            </section>

            {/* Service Types */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tipping by Service Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SERVICE_TYPES.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl p-3 hover:border-green-500/30 transition-all">
                            <h4 className="text-sm font-semibold text-gray-200">{item.service}</h4>
                            <p className="text-xs text-yellow-400">{item.tipGuide}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tip Calculator Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Tipping Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check the bill first:</strong> Some restaurants add a service charge. Don't double-tip. Look for "service included" or "gratuity added" on the receipt.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Tip in cash when possible:</strong> Credit card tips may be processed differently and sometimes don't reach service staff. Cash tips are always fully received.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consider the service context:</strong> Tip more for complex orders, large groups, or during busy times. Tip less for counter service or self-service situations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Round up for simplicity:</strong> Round to the nearest ₹10 or ₹100 for easy mental math. Example: ₹127.50 tip → ₹130 is perfectly fine.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use the 20% rule:</strong> 20% is becoming the new standard in many places. Divide by 5 for quick mental calculation. Example: ₹850 ÷ 5 = ₹170 tip.</span>
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