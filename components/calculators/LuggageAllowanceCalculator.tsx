"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is the standard checked baggage allowance?",
        a: "Economy class: Usually 1-2 bags up to 23kg (50lbs) each. Business/First: 2-3 bags up to 32kg (70lbs) each. Low-cost airlines may charge extra.",
    },
    {
        q: "What is the standard carry-on size?",
        a: "Most airlines: 22 x 14 x 9 inches (56 x 36 x 23 cm). Weight limit: 7-10kg (15-22lbs). Always check airline-specific rules.",
    },
    {
        q: "How much does excess baggage cost?",
        a: "Domestic: $30-100 per extra bag. International: $100-200 per extra bag. Overweight fees: $50-150 per bag. Over size fees: $100-200 per bag.",
    },
    {
        q: "What are baggage fees for budget airlines?",
        a: "Ryanair, EasyJet, Spirit, Frontier: Checked bag $25-50, Carry-on $20-40, Priority boarding adds cost. Always prepay online for better rates.",
    },
    {
        q: "What items are prohibited in checked baggage?",
        a: "Prohibited: Lithium batteries (must carry-on), explosives, flammable liquids, aerosols, matches, lighters, e-cigarettes, camping fuel, bleach, paint. Check TSA/airline lists before packing. Restricted items may be confiscated.",
    },
    {
        q: "Can I pool baggage weight with family members?",
        a: "Yes! Most airlines allow pooling within same reservation. Family of 4 with 4 bags x 23kg can share total 92kg weight. Baggage pooling saves fees if one bag heavier, another lighter. Check airline policy before flight.",
    },
    {
        q: "What is the baggage allowance for infants?",
        a: "Infants under 2 years (lap infant): No checked baggage allowance usually. Some airlines allow 1 stroller/car seat free. Diaper bag allowed as extra carry-on. International flights may allow 1 checked bag up to 23kg.",
    },
    {
        q: "How to pack light to avoid excess fees?",
        a: "Packing light tips: Wear heavy clothes on plane (jackets, boots). Use compression bags. Roll clothes (saves 50% space). Limit shoes to 2-3 pairs. Share toiletries. Buy heavy items (books) at destination. Use vacuum storage bags for bulky items.",
    },
    {
        q: "What happens if my bag is lost or delayed?",
        a: "Report immediately at airline baggage office. Get PIR (Property Irregularity Report) number. Airlines pay up to $3,500 per bag (Montreal Convention). Save receipts for essential purchases during delay. Delay compensation: $50-200/day. Bag usually found within 48-72 hours.",
    },
    {
        q: "Are sports equipment and musical instruments treated differently?",
        a: "Sports gear (golf, skis, surfboards): Often charged oversized fees ($50-150 each way) even within weight limit. Musical instruments (guitar, violin): May buy seat ticket (if valuable) or check as fragile. Smaller instruments can be carry-on. Check airline's special baggage policy.",
    },
];

const AIRLINE_BAGGAGE = [
    { airline: "Emirates (Economy)", checked: "2 bags x 23kg", carryon: "1 bag x 7kg", cabin: "1 personal item" },
    { airline: "Singapore Airlines (Economy)", checked: "2 bags x 23kg", carryon: "1 bag x 7kg", cabin: "1 personal item" },
    { airline: "Qatar Airways (Economy)", checked: "2 bags x 23kg", carryon: "1 bag x 7kg", cabin: "1 personal item" },
    { airline: "American Airlines (Economy)", checked: "1 bag x 23kg", carryon: "1 bag + 1 personal", cabin: "22x14x9 in" },
    { airline: "Delta (Economy)", checked: "1 bag x 23kg", carryon: "1 bag + 1 personal", cabin: "22x14x9 in" },
    { airline: "United (Economy)", checked: "1 bag x 23kg", carryon: "1 bag + 1 personal", cabin: "22x14x9 in" },
    { airline: "Ryanair (Value)", checked: "Paid only", carryon: "1 small bag", cabin: "40x20x25 cm" },
    { airline: "EasyJet (Standard)", checked: "Paid only", carryon: "1 bag + 1 small", cabin: "56x45x25 cm" },
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
    name: "Luggage Allowance Calculator – Check Baggage Limits",
    description: "Check airline baggage allowances. Calculate excess baggage fees and weight limits.",
    url: "https://numrexo.com/travel/luggage-allowance-calculator",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Baggage allowance", "Excess baggage fee", "Weight limit checker", "Airline comparison"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://numrexo.com/travel" },
        { "@type": "ListItem", position: 3, name: "Luggage Allowance Calculator", item: "https://numrexo.com/travel/luggage-allowance-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LuggageAllowanceCalculator() {
    const [calcType, setCalcType] = useState<"allowance" | "excess">("allowance");
    const [airline, setAirline] = useState(AIRLINE_BAGGAGE[0].airline);
    const [bagWeight, setBagWeight] = useState("");
    const [bagCount, setBagCount] = useState("1");
    const [excessWeight, setExcessWeight] = useState("");
    const [excessBags, setExcessBags] = useState("");
    const [feePerKg, setFeePerKg] = useState("15");
    const [feePerBag, setFeePerBag] = useState("75");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getAirlineAllowance = () => {
        const selected = AIRLINE_BAGGAGE.find(a => a.airline === airline);
        return selected || AIRLINE_BAGGAGE[0];
    };

    const calculateAllowance = () => {
        const allowance = getAirlineAllowance();
        setResult({
            type: "allowance",
            airline: allowance.airline,
            checked: allowance.checked,
            carryon: allowance.carryon,
            cabin: allowance.cabin,
        });
    };

    const calculateExcess = () => {
        const weight = parseFloat(excessWeight);
        const bags = parseFloat(excessBags);
        const feeKg = parseFloat(feePerKg);
        const feeBag = parseFloat(feePerBag);

        let weightFee = 0;
        let bagFee = 0;

        if (!isNaN(weight) && weight > 0 && feeKg > 0) {
            weightFee = weight * feeKg;
        }
        if (!isNaN(bags) && bags > 0 && feeBag > 0) {
            bagFee = bags * feeBag;
        }

        const totalFee = weightFee + bagFee;

        setResult({
            type: "excess",
            weightFee: weightFee.toFixed(2),
            bagFee: bagFee.toFixed(2),
            totalFee: totalFee.toFixed(2),
            excessWeight: weight || 0,
            excessBags: bags || 0,
        });
    };

    const calculate = () => {
        if (calcType === "allowance") {
            calculateAllowance();
        } else {
            calculateExcess();
        }
    };

    const resetForm = () => {
        setCalcType("allowance");
        setAirline(AIRLINE_BAGGAGE[0].airline);
        setBagWeight("");
        setBagCount("1");
        setExcessWeight("");
        setExcessBags("");
        setFeePerKg("15");
        setFeePerBag("75");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Luggage Allowance Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Baggage Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Check allowances or calculate excess fees</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "allowance" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("allowance")}>Baggage Allowance</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "excess" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("excess")}>Excess Baggage Fee</button>
                            </div>
                        </div>

                        {calcType === "allowance" ? (
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Select Airline</label><select value={airline} onChange={(e) => setAirline(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white cursor-pointer">{AIRLINE_BAGGAGE.map(a => <option key={a.airline} value={a.airline}>{a.airline}</option>)}</select></div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Excess Weight (kg)</label><input type="number" placeholder="5" value={excessWeight} onChange={(e) => setExcessWeight(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Extra Bags</label><input type="number" placeholder="1" value={excessBags} onChange={(e) => setExcessBags(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Fee per kg ($)</label><div className="relative"><input type="number" step="1" placeholder="15" value={feePerKg} onChange={(e) => setFeePerKg(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                                    <div><label className="block text-xs font-semibold text-gray-400 mb-2">Fee per extra bag ($)</label><div className="relative"><input type="number" step="10" placeholder="75" value={feePerBag} onChange={(e) => setFeePerBag(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span></div></div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title={calcType === "allowance" ? "Baggage Allowance" : "Excess Baggage Fee"}
                    isEmpty={!result}
                    emptyIcon="🧳"
                    emptyText="Enter baggage details"
                    mainResult={result ? (calcType === "allowance" ? { label: result.airline, value: "Allowance", color: "text-orange-400" } : { label: "Total Excess Fee", value: `$${result.totalFee}`, color: "text-orange-400" }) : undefined}
                    extraRows={result ? [
                        ...(calcType === "allowance" ? [
                            { label: "Checked Baggage", value: result.checked, valueColor: "text-yellow-400" },
                            { label: "Carry-on Allowance", value: result.carryon },
                            { label: "Cabin Size", value: result.cabin },
                        ] : [
                            { label: "Excess Weight", value: `${result.excessWeight} kg ($${result.weightFee})` },
                            { label: "Extra Bags", value: `${result.excessBags} bag(s) ($${result.bagFee})` },
                        ]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Luggage Allowance Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Luggage Allowance Calculator</strong> helps travelers check baggage allowances for major airlines and calculate excess baggage fees. Avoid surprise charges at the airport by knowing your limits before you fly.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Compare 8 major airlines including Emirates, Singapore Airlines, Qatar Airways, American Airlines, Delta, United, Ryanair, and EasyJet. Check checked baggage limits, carry-on allowances, and cabin size restrictions.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Luggage Allowance Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select <strong className="text-white">calculation type</strong> — Baggage Allowance or Excess Baggage Fee.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> For Allowance: Choose your <strong className="text-white">airline</strong> from the dropdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For Excess Fee: Enter <strong className="text-white">excess weight</strong> and/or <strong className="text-white">extra bags</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Adjust fee per kg and fee per bag (airline specific).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate"</strong> to see your baggage allowance or excess fees.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Luggage Allowance Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Avoid Excess Fees</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Airports charge $50-200 for overweight/extra bags. Know your limits before packing to avoid surprise charges at check-in.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Compare Airlines</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Different airlines have different baggage policies. Compare before booking to choose the most luggage-friendly airline.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate total travel cost including baggage fees. Budget airlines may have cheap tickets but expensive baggage.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Packing Strategy</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know weight limits before packing. Distribute weight across multiple bags. Avoid last-minute repacking at airport.</p>
                    </div>
                </div>
            </section>

            {/* Airline Baggage Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Airline Baggage Allowance Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">✓</span><span><strong className="text-gray-300">Full-service airlines (Emirates, Singapore, Qatar):</strong> Include 1-2 checked bags (23kg each) + carry-on. Best for long-haul international travel.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">✓</span><span><strong className="text-gray-300">US airlines (American, Delta, United):</strong> Economy includes 1 checked bag (23kg) + carry-on + personal item. Additional bags cost $50-100 each.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">✓</span><span><strong className="text-gray-300">Budget airlines (Ryanair, EasyJet, Spirit):</strong> No free checked bags. Pay extra for every bag ($25-50). Carry-on limited to small personal item.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">✓</span><span><strong className="text-gray-300">Elite status and credit cards:</strong> Frequent flyer status or airline credit cards often include free checked bags (1-2 bags). Sign up for status match programs.</span></li>
                </ul>
            </section>

            {/* Excess Baggage Fee Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Excess Baggage Fee Saving Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">💡</span><span><strong className="text-gray-300">Prepay online:</strong> Baggage fees 20-50% cheaper when prepaid online vs airport counter. Book at least 24 hours before flight.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">💡</span><span><strong className="text-gray-300">Ship instead:</strong> For very heavy bags, shipping via FedEx/UPS often cheaper than airline excess fees ($100-200 for 50lb).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">💡</span><span><strong className="text-gray-300">Wear heavy items:</strong> Wear jackets, boots, heavy sweaters on plane. Put camera gear in jacket pockets.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">💡</span><span><strong className="text-gray-300">Use luggage scale:</strong> $10 luggage scale saves $100+ in overweight fees. Check weight before leaving home.</span></li>
                </ul>
            </section>

            {/* International vs Domestic */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">International vs Domestic Baggage Rules</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Route</th><th className="text-left py-3 px-4 text-gray-400">Checked Baggage</th><th className="text-left py-3 px-4 text-gray-400">Weight Limit</th><th className="text-left py-3 px-4 text-gray-400">Carry-on</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">International (Economy)</td><td className="py-2 px-4 text-yellow-400">1-2 bags</td><td className="py-2 px-4">23kg (50lbs) each</td><td className="py-2 px-4">7kg + personal item</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Domestic US (Economy)</td><td className="py-2 px-4 text-yellow-400">1 bag</td><td className="py-2 px-4">23kg (50lbs)</td><td className="py-2 px-4">1 bag + 1 personal</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Domestic India (Economy)</td><td className="py-2 px-4 text-yellow-400">1 bag</td><td className="py-2 px-4">15-20kg</td><td className="py-2 px-4">7kg</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Domestic Europe (Budget)</td><td className="py-2 px-4 text-yellow-400">Paid only</td><td className="py-2 px-4">15-20kg (paid)</td><td className="py-2 px-4">1 small bag</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Airline Baggage Comparison Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Airline Baggage Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">Airline</th><th className="text-left py-3 px-4 text-gray-400">Checked</th><th className="text-left py-3 px-4 text-gray-400">Carry-on</th><th className="text-left py-3 px-4 text-gray-400">Cabin Size</th></tr></thead>
                        <tbody>
                            {AIRLINE_BAGGAGE.map((bag, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{bag.airline}</td><td className="py-2 px-4 text-yellow-400">{bag.checked}</td><td className="py-2 px-4 text-gray-400">{bag.carryon}</td><td className="py-2 px-4 text-gray-500 text-xs">{bag.cabin}</td></tr>))}
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