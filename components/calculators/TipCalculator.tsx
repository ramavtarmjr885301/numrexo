"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How much should I tip at a restaurant?",
        a: "Standard tipping guidelines in the US: 15-20% for good service, 10% for average service, 0-5% for poor service. For large parties (6+), some restaurants add automatic 18% gratuity. Always check your bill first.",
    },
    {
        q: "Should I tip on the total bill including tax?",
        a: "Most people tip on the subtotal (before tax), but tipping on the total including tax is fine too. The difference is usually small. Example: ₹1000 bill + 10% tax = ₹1100 total. 15% on subtotal = ₹150, on total = ₹165.",
    },
    {
        q: "How to calculate tip quickly in my head?",
        a: "10% tip = move decimal one place left. 15% tip = 10% + half of 10%. 20% tip = double the 10%. Example: ₹850 bill → 10% = ₹85, 15% = ₹85 + ₹42.5 = ₹127.5, 20% = ₹170.",
    },
    {
        q: "Should I tip for takeout orders?",
        a: "Yes, 10-15% is customary for takeout, especially for large orders. The kitchen staff still prepares your food, and packaging takes time. For coffee shops, ₹20-50 or rounding up is fine.",
    },
    {
        q: "Do I tip on delivery orders?",
        a: "Yes, delivery drivers should be tipped 15-20% or minimum ₹50-100. They use their own vehicles and gas. During bad weather or holidays, tip more. Some apps add a delivery fee — that doesn't go to the driver.",
    },
    {
        q: "How to split tip among friends?",
        a: "Calculate total tip, add to bill, divide by number of people. Example: Bill ₹4000, tip 18% = ₹720, total ₹4720. Split 4 ways = ₹1180 each. Use our split bill feature to calculate easily.",
    },
];

const TIP_PERCENTAGES = [
    { percent: 10, label: "Poor Service", color: "text-red-400" },
    { percent: 15, label: "Standard Service", color: "text-yellow-400" },
    { percent: 18, label: "Good Service", color: "text-green-400" },
    { percent: 20, label: "Excellent Service", color: "text-blue-400" },
    { percent: 25, label: "Outstanding Service", color: "text-purple-400" },
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function TipCalculator() {
    const [billAmount, setBillAmount] = useState("");
    const [tipPercent, setTipPercent] = useState("15");
    const [peopleCount, setPeopleCount] = useState("1");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const bill = parseFloat(billAmount);
        const tip = parseFloat(tipPercent);
        const people = parseFloat(peopleCount);

        if (!bill || bill <= 0) {
            alert("Please enter a valid bill amount");
            return;
        }

        const tipAmount = bill * (tip / 100);
        const totalAmount = bill + tipAmount;
        const perPerson = people > 0 ? totalAmount / people : totalAmount;

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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/business" itemProp="item" className="hover:text-gray-300">Business Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Tip Calculator</span><meta itemProp="position" content="3" /></li>
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
                                <input type="number" placeholder="1000" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Tip Percentage (%)</label>
                            <div className="relative">
                                <input type="number" step="1" placeholder="15" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Number of People</label>
                            <div className="relative">
                                <input type="number" placeholder="1" value={peopleCount} onChange={(e) => setPeopleCount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">people</span>
                            </div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Tip →</button>
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

            {/* About Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Tip Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate the perfect tip for restaurants, delivery, or any service. Split bills easily among friends. Never overpay or under-tip again.</p></section>

            {/* Formula Section */}
            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Tip Calculation Formula</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm mb-2 text-center">Tip Amount = Bill Amount × (Tip % ÷ 100)</p><p className="text-white font-mono text-sm text-center">Total = Bill Amount + Tip Amount</p><p className="text-white font-mono text-sm text-center">Per Person = Total ÷ Number of People</p></div></section>

            {/* Tip Guide Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tip Percentage Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Tip %</th>
                                <th className="text-left py-3 px-4 text-gray-400">Service Level</th>
                                <th className="text-left py-3 px-4 text-gray-400">When to Use</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TIP_PERCENTAGES.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-yellow-400">{item.percent}%</td>
                                    <td className="py-3 px-4 text-gray-300">{item.label}</td>
                                    <td className="py-3 px-4 text-gray-400">
                                        {i === 0 ? "Poor or slow service" :
                                            i === 1 ? "Standard decent service" :
                                                i === 2 ? "Good, attentive service" :
                                                    i === 3 ? "Excellent, went above and beyond" :
                                                        "Exceptional, made your day"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}