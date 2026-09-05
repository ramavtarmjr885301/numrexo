"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate hotel cost per night?",
        a: "Hotel cost per night = Total stay cost ÷ Number of nights. Remember to include taxes and fees which can add 10-20% to the base rate.",
    },
    {
        q: "What are common hotel fees?",
        a: "Resort fees ($20-50/night), parking ($10-40/day), city tax (5-15%), tourism fees, and service charges. Always check before booking.",
    },
    {
        q: "How to split hotel cost with friends?",
        a: "Divide total cost by number of people. If rooms are different (single vs double), split room-wise first, then per person.",
    },
    {
        q: "What is the average hotel cost per night?",
        a: "Budget: $50-100, Mid-range: $100-200, Luxury: $200-500. Prices vary by city, season, and hotel rating.",
    },
    {
        q: "How to save money on hotel bookings?",
        a: "Book on weekdays (Sunday-Thursday) for lower rates. Use incognito mode (prices may increase based on cookies). Join loyalty programs. Book directly with hotel (sometimes offers discounts). Use cashback sites. Travel during off-season.",
    },
    {
        q: "What is the best time to book hotels?",
        a: "Best booking window: 1-3 months in advance for domestic, 3-6 months for international. Last-minute deals (within 1 week) can be cheaper but risk sold-out. Holiday seasons book 6+ months early. Tuesday and Wednesday have lowest prices.",
    },
    {
        q: "How to get hotel upgrades for free?",
        a: "Politely ask at check-in (mention anniversary/birthday). Join loyalty programs (free upgrades for members). Book directly with hotel. Check-in late when rooms are available. Tip the front desk ($10-20 works wonders). Use status match from credit cards.",
    },
    {
        q: "What is the cancellation policy for hotels?",
        a: "Free cancellation: Usually up to 24-48 hours before check-in. Non-refundable: 20-30% cheaper but no refunds. Some hotels offer free cancellation for members. Always read terms before booking. Use 'pay at hotel' option for flexibility.",
    },
    {
        q: "How to compare hotel prices across websites?",
        a: "Check 3-4 sites: Booking.com, Agoda, Expedia, Hotel website. Use Google Hotels for aggregate comparison. Clear cookies or use incognito mode. Call hotel directly (they sometimes match online rates). Check membership discounts (AAA, AARP, Corporate).",
    },
    {
        q: "What is the difference between refundable and non-refundable rates?",
        a: "Refundable: Pay 10-20% more, cancel anytime for full refund. Non-refundable: Cheapest rate, but no refunds if plans change. Choose non-refundable only if travel dates are 100% certain. Refundable worth the extra cost for flexible trips.",
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
    name: "Hotel Cost Calculator – Estimate Hotel Expenses",
    description: "Calculate hotel stay costs including taxes, fees, and split between travelers.",
    url: "https://numrexo.com/travel/hotel-cost-calculator",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Cost calculation", "Tax and fees", "Split bill", "Per person cost"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://numrexo.com/travel" },
        { "@type": "ListItem", position: 3, name: "Hotel Cost Calculator", item: "https://numrexo.com/travel/hotel-cost-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function HotelCostCalculator() {
    const [pricePerNight, setPricePerNight] = useState("");
    const [nights, setNights] = useState("");
    const [rooms, setRooms] = useState("1");
    const [people, setPeople] = useState("");
    const [taxRate, setTaxRate] = useState("15");
    const [extraFees, setExtraFees] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const perNight = parseFloat(pricePerNight);
        const numNights = parseFloat(nights);
        const numRooms = parseFloat(rooms);
        const numPeople = parseFloat(people);
        const tax = parseFloat(taxRate) / 100;
        const fees = parseFloat(extraFees) || 0;

        if (!perNight || perNight <= 0 || !numNights || numNights <= 0) {
            alert("Please enter valid price per night and number of nights");
            return;
        }

        const subtotal = perNight * numNights * numRooms;
        const taxAmount = subtotal * tax;
        const total = subtotal + taxAmount + fees;
        const perNightTotal = total / numNights;

        let perPersonCost = null;
        let perPersonPerNight = null;

        if (numPeople && numPeople > 0) {
            perPersonCost = total / numPeople;
            perPersonPerNight = perNightTotal / numPeople;
        }

        setResult({
            subtotal: subtotal.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            extraFees: fees.toFixed(2),
            total: total.toFixed(2),
            perNight: perNightTotal.toFixed(2),
            perPersonCost: perPersonCost ? perPersonCost.toFixed(2) : null,
            perPersonPerNight: perPersonPerNight ? perPersonPerNight.toFixed(2) : null,
            nights: numNights,
            rooms: numRooms,
            people: numPeople || null,
        });
    };

    const resetForm = () => {
        setPricePerNight("");
        setNights("");
        setRooms("1");
        setPeople("");
        setTaxRate("15");
        setExtraFees("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/travel" itemProp="item" className="hover:text-gray-300">Travel Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Hotel Cost Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Hotel Cost Estimator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate total hotel stay cost</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Price per Night ($)</label><div className="relative"><input type="number" step="10" placeholder="150" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Nights</label><input type="number" placeholder="5" value={nights} onChange={(e) => setNights(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of Rooms</label><input type="number" placeholder="1" value={rooms} onChange={(e) => setRooms(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Number of People (for split)</label><input type="number" placeholder="2" value={people} onChange={(e) => setPeople(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tax Rate (%)</label><div className="relative"><input type="number" step="1" placeholder="15" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Extra Fees ($)</label><div className="relative"><input type="number" step="10" placeholder="0" value={extraFees} onChange={(e) => setExtraFees(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Hotel Cost →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Hotel Cost Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏨"
                    emptyText="Enter hotel details"
                    mainResult={result ? { label: "Total Cost", value: `$${parseFloat(result.total).toLocaleString()}`, color: "text-purple-400" } : undefined}
                    extraRows={result ? [
                        { label: "Subtotal", value: `$${result.subtotal}` },
                        { label: "Taxes", value: `$${result.taxAmount}`, valueColor: "text-yellow-400" },
                        { label: "Extra Fees", value: `$${result.extraFees}` },
                        { label: "Cost per Night", value: `$${result.perNight}` },
                        ...(result.perPersonCost ? [
                            { label: "Cost per Person (total)", value: `$${result.perPersonCost}`, valueColor: "text-green-400" },
                            { label: "Cost per Person per Night", value: `$${result.perPersonPerNight}` },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Hotel Cost Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Hotel Cost Calculator</strong> helps travelers estimate total hotel stay costs including taxes and fees. Perfect for trip planning, budget management, and splitting costs with travel companions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Enter price per night, number of nights, rooms, and people. The calculator instantly shows total cost, taxes, fees, per night cost, and per person breakdown.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Hotel Cost Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">price per night</strong> of the hotel room.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">number of nights</strong> you'll be staying.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">number of rooms</strong> (if booking multiple rooms).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter <strong className="text-white">number of people</strong> to split costs (optional).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Adjust <strong className="text-white">tax rate</strong> and <strong className="text-white">extra fees</strong> (resort fees, parking).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">Calculate Hotel Cost</strong> to see total and per person breakdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 7:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and calculate a different scenario.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Hotel Cost Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exact hotel costs before booking. Avoid surprise fees at checkout. Plan your travel budget accurately.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Group Trip Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Split costs fairly among friends. Calculate per person cost instantly. No arguments about who pays what.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Compare Hotels</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare total cost including taxes and fees across different hotels. Find the best value for your budget.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Tax & Fee Transparency</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See exactly how much you're paying in taxes and hidden fees. Avoid price shock at checkout.</p>
                    </div>
                </div>
            </section>

            {/* Hotel Cost Saving Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Hotel Cost Saving Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Book weekdays:</strong> Sunday-Thursday rates are 20-40% cheaper than weekends. Avoid Friday/Saturday check-ins.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Use incognito mode:</strong> Hotel websites track cookies and may increase prices on repeat visits. Clear cookies or use private browsing.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Join loyalty programs:</strong> Free membership gives member-only discounts, late checkout, and points for free nights.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Book directly with hotel:</strong> Often matches or beats OTA prices. Plus, better cancellation policies and room upgrades.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Travel off-season:</strong> Peak season rates can be 2-3x higher. Shoulder season (just before/after peak) offers best value.</span></li>
                </ul>
            </section>

            {/* Hidden Hotel Fees */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Hidden Hotel Fees to Watch For</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Fee Type</th><th className="text-left py-3 px-4 text-gray-400">Typical Cost</th><th className="text-left py-3 px-4 text-gray-400">How to Avoid</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Resort Fees</td><td className="py-2 px-4 text-yellow-400">$20-50/night</td><td className="py-2 px-4">Book hotels without resort fees (use filter)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Parking Fees</td><td className="py-2 px-4 text-yellow-400">$10-40/day</td><td className="py-2 px-4">Use public parking apps (SpotHero, ParkWhiz)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">City Tax</td><td className="py-2 px-4 text-yellow-400">5-15%</td><td className="py-2 px-4">Mandatory, included in total calculation</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Early Check-in Fee</td><td className="py-2 px-4 text-yellow-400">$20-50</td><td className="py-2 px-4">Ask nicely at front desk (often waived)</td></tr>
                            <tr><td className="py-2 px-4">Late Check-out Fee</td><td className="py-2 px-4 text-yellow-400">$20-100</td><td className="py-2 px-4">Request free late checkout with loyalty status</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Hotel Booking Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Hotel Booking Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">📅</span><span><strong className="text-gray-300">Book 1-3 months ahead:</strong> Best rates for domestic travel. For international, book 3-6 months ahead.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">📅</span><span><strong className="text-gray-300">Tuesday/Wednesday bookings:</strong> Prices are lowest mid-week. Friday-Sunday rates are higher.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">📅</span><span><strong className="text-gray-300">Use price tracking:</strong> Google Hotels, Kayak, and Trivago show price history. Book when price drops.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">📅</span><span><strong className="text-gray-300">Read cancellation policy:</strong> Free cancellation within 24-48 hours of check-in. Avoid non-refundable unless certain.</span></li>
                </ul>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Hotel Cost Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate total hotel stay cost including taxes and fees. Split costs between travelers easily.</p>
            </section>

            {/* Average Hotel Costs Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Average Hotel Costs by City</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">City</th><th className="text-left py-3 px-4 text-gray-400">Budget</th><th className="text-left py-3 px-4 text-gray-400">Mid-Range</th><th className="text-left py-3 px-4 text-gray-400">Luxury</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">New York</td><td className="py-2 px-4 text-yellow-400">$150-250</td><td className="py-2 px-4">$250-400</td><td className="py-2 px-4">$500+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">London</td><td className="py-2 px-4 text-yellow-400">$100-200</td><td className="py-2 px-4">$200-350</td><td className="py-2 px-4">$400+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Paris</td><td className="py-2 px-4 text-yellow-400">$100-180</td><td className="py-2 px-4">$180-300</td><td className="py-2 px-4">$400+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Tokyo</td><td className="py-2 px-4 text-yellow-400">$80-150</td><td className="py-2 px-4">$150-250</td><td className="py-2 px-4">$350+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Dubai</td><td className="py-2 px-4 text-yellow-400">$70-150</td><td className="py-2 px-4">$150-300</td><td className="py-2 px-4">$400+</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Singapore</td><td className="py-2 px-4 text-yellow-400">$80-150</td><td className="py-2 px-4">$150-250</td><td className="py-2 px-4">$350+</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
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