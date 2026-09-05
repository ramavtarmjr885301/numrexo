"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How is property tax calculated?",
        a: "Property tax is calculated based on the property's annual value (rental value) or capital value. Formula: Property Tax = Property Value × Tax Rate.",
    },
    {
        q: "What factors affect property tax?",
        a: "Location, property type, built-up area, age of property, occupancy status, and amenities.",
    },
    {
        q: "How to pay property tax online?",
        a: "Most municipal corporations have online portals. Enter your property ID or assessment number and pay online.",
    },
    {
        q: "What is the penalty for late payment?",
        a: "Late payment penalty: 5-20% of tax amount depending on delay.",
    },
    {
        q: "How to reduce property tax?",
        a: "Ways to reduce property tax: 1) Claim depreciation for older properties, 2) Apply for exemptions (senior citizens, women owners), 3) Green building certifications (5-10% rebate), 4) Pay before due date (5-10% discount), 5) Challenge assessment if property value is overvalued.",
    },
    {
        q: "What is the difference between annual value and capital value?",
        a: "Annual Value: Tax based on property's rental income potential. Used in Delhi, Chennai, Kolkata. Capital Value: Tax based on property's market value. Used in Mumbai, Bangalore, Hyderabad, Pune. Annual value method usually lower for self-occupied properties, capital value method reflects actual market worth.",
    },
    {
        q: "How is property tax calculated?",
        a: "Formula: Property Tax = Base Value × Rate × (Area/1000) × Depreciation Factor × Property Type Factor × Location Factor. Most cities use: Capital Value (Mumbai, Bangalore) or Annual Value (Delhi, Chennai). Our calculator simplifies this for major Indian cities.",
    },
    {
        q: "What factors affect property tax?",
        a: "Key factors: 1) Location (prime areas have higher rates), 2) Built-up area (larger = higher tax), 3) Property age (older = lower tax due to depreciation), 4) Occupancy (self-occupied vs rented), 5) Amenities (lift, parking, gym increase tax), 6) Property type (commercial higher than residential).",
    },
    {
        q: "How to pay property tax online?",
        a: "Online payment steps: 1) Visit municipal corporation website (e.g., MCGM for Mumbai, BBMP for Bangalore), 2) Enter property ID/Assessment number, 3) Verify property details, 4) Select financial year, 5) Pay via net banking/credit card/UPI, 6) Download receipt. Available on all major city portals.",
    },
    {
        q: "What is the penalty for late payment?",
        a: "Late payment penalties: Mumbai (2% per month, max 20%), Delhi (1% per month), Bangalore (2% per month, max 20%), Chennai (1.5% per month), Kolkata (2% per month). Most cities allow 15-30 days grace period. Pay before June 30th to avoid penalties in most cities.",
    },
];

const CITY_TAX_RATES = [
    { city: "Mumbai (MCGM)", rate: "0.5-0.7%", method: "Capital Value", notes: "Based on ready reckoner rates" },
    { city: "Delhi (MCD)", rate: "6-18%", method: "Annual Value", notes: "Based on unit area system" },
    { city: "Bangalore (BBMP)", rate: "0.2-0.3%", method: "Capital Value", notes: "20% rebate for women owners" },
    { city: "Chennai (GCC)", rate: "0.1-0.3%", method: "Annual Value", notes: "Based on plinth area" },
    { city: "Kolkata (KMC)", rate: "7-40%", method: "Annual Value", notes: "Based on annual rental value" },
    { city: "Hyderabad (GHMC)", rate: "0.1-0.5%", method: "Capital Value", notes: "Depends on zone" },
    { city: "Pune (PMC)", rate: "0.5-1%", method: "Capital Value", notes: "Based on ready reckoner" },
    { city: "Ahmedabad (AMC)", rate: "0.1-0.6%", method: "Capital Value", notes: "Zone-wise rates" },
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
    name: "Property Tax Calculator – Estimate Property Tax",
    description: "Calculate property tax for residential and commercial properties in major Indian cities.",
    url: "https://numrexo.com/tax/property-tax-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["City-wise tax rates", "Property value assessment", "Tax estimation", "Penalty calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Tax Calculators", item: "https://numrexo.com/tax" },
        { "@type": "ListItem", position: 3, name: "Property Tax Calculator", item: "https://numrexo.com/tax/property-tax-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PropertyTaxCalculator() {
    const [propertyValue, setPropertyValue] = useState("");
    const [city, setCity] = useState("Mumbai (MCGM)");
    const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
    const [area, setArea] = useState("");
    const [age, setAge] = useState("");
    const [latePayment, setLatePayment] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getTaxRate = () => {
        const cityData = CITY_TAX_RATES.find(c => c.city === city);
        if (!cityData) return 0.6;
        const rateStr = cityData.rate;
        const rate = parseFloat(rateStr.split("-")[0]) || 0.6;
        if (propertyType === "commercial") {
            return rate * 1.5;
        }
        return rate;
    };

    const calculate = () => {
        const value = parseFloat(propertyValue);
        const builtUpArea = parseFloat(area);
        const propertyAge = parseFloat(age);
        const lateMonths = parseFloat(latePayment) || 0;

        if (!value || value <= 0) {
            alert("Please enter property value or area");
            return;
        }

        const taxRate = getTaxRate();
        let taxAmount = value * (taxRate / 100);

        if (builtUpArea && builtUpArea > 0) {
            taxAmount = taxAmount * (builtUpArea / 1000);
        }

        if (propertyAge && propertyAge > 0) {
            const depreciation = Math.min(30, propertyAge * 2);
            taxAmount = taxAmount * (1 - depreciation / 100);
        }

        let penalty = 0;
        if (lateMonths > 0) {
            penalty = taxAmount * (lateMonths * 0.01);
        }

        const totalTax = taxAmount + penalty;
        const cityData = CITY_TAX_RATES.find(c => c.city === city);

        setResult({
            taxAmount: taxAmount.toFixed(2),
            penalty: penalty.toFixed(2),
            totalTax: totalTax.toFixed(2),
            taxRate: taxRate.toFixed(2),
            city,
            propertyType,
            lateMonths,
            method: cityData?.method,
        });
    };

    const resetForm = () => {
        setPropertyValue("");
        setCity("Mumbai (MCGM)");
        setPropertyType("residential");
        setArea("");
        setAge("");
        setLatePayment("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/tax" itemProp="item" className="hover:text-gray-300">Tax Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Property Tax Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Property Tax Estimator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate property tax for Indian cities</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">City</label><select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none cursor-pointer">{CITY_TAX_RATES.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}</select></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Type</label><div className="grid grid-cols-2 gap-2"><button className={`py-2 rounded-lg text-sm font-medium transition-all ${propertyType === "residential" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setPropertyType("residential")}>Residential</button><button className={`py-2 rounded-lg text-sm font-medium transition-all ${propertyType === "commercial" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setPropertyType("commercial")}>Commercial</button></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Value (₹)</label><div className="relative"><input type="number" step="100000" placeholder="5000000" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Built-up Area (sq ft)</label><input type="number" placeholder="1000" value={area} onChange={(e) => setArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Age (years)</label><input type="number" placeholder="10" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Late Payment (months)</label><div className="relative"><input type="number" placeholder="0" value={latePayment} onChange={(e) => setLatePayment(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">months</span></div></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Property Tax →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Property Tax Breakdown"
                    isEmpty={!result}
                    emptyIcon="🏠"
                    emptyText="Enter property details"
                    mainResult={result ? { label: "Total Property Tax", value: `₹${parseFloat(result.totalTax).toLocaleString()}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Base Tax", value: `₹${parseFloat(result.taxAmount).toLocaleString()}` },
                        { label: "Tax Rate", value: `${result.taxRate}%`, valueColor: "text-yellow-400" },
                        { label: "Late Payment Penalty", value: `₹${parseFloat(result.penalty).toLocaleString()}`, valueColor: "text-red-400" },
                        { label: "City", value: result.city },
                        { label: "Property Type", value: result.propertyType === "residential" ? "Residential" : "Commercial" },
                        { label: "Assessment Method", value: result.method },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Property Tax Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Property Tax Calculator</strong> helps you estimate property tax for residential and commercial properties across major Indian cities including Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, and Ahmedabad.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Property tax is a recurring annual expense for property owners. Our calculator considers city-specific tax rates, property type, built-up area, age of property (depreciation), and late payment penalties to give you an accurate estimate.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Property Tax Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select your <strong className="text-white">city</strong> from the dropdown (8 major Indian cities).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Choose <strong className="text-white">property type</strong> — Residential or Commercial (commercial has 1.5x higher rates).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter <strong className="text-white">property value</strong> (capital value or annual value based on city).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> (Optional) Enter <strong className="text-white">built-up area</strong> and <strong className="text-white">property age</strong> for more accurate calculation.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> (Optional) Enter <strong className="text-white">late payment months</strong> to see penalty amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 6:</strong> Click <strong className="text-white">"Calculate Property Tax"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 7:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Property Tax Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your annual property tax liability in advance. Plan your budget and avoid surprises.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Compare Cities</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare property tax rates across different cities. Make informed decisions about property investment location.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Avoid Penalties</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate late payment penalties. Pay on time to avoid 5-20% penalty charges.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Tax Optimization</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Identify ways to reduce tax (depreciation, exemptions, early payment discounts). Maximize your savings.</p>
                    </div>
                </div>
            </section>

            {/* City-wise Tax Rates */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">City-wise Property Tax Rates</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">City</th><th className="text-left py-3 px-4 text-gray-400">Tax Rate</th><th className="text-left py-3 px-4 text-gray-400">Method</th><th className="text-left py-3 px-4 text-gray-400">Notes</th></tr></thead>
                        <tbody>
                            {CITY_TAX_RATES.map((cityData, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{cityData.city}</td><td className="py-2 px-4 text-yellow-400">{cityData.rate}</td><td className="py-2 px-4 text-gray-400">{cityData.method}</td><td className="py-2 px-4 text-gray-500 text-xs">{cityData.notes}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Exemptions & Rebates */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Property Tax Exemptions & Rebates</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Senior Citizens:</strong> 10-30% rebate in many cities (60+ years)</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Women Owners:</strong> Bangalore offers 20% rebate for properties owned by women</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Green Building:</strong> 5-10% rebate for eco-friendly constructions</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Early Payment:</strong> 5-10% discount for paying before due date</span></li>
                </ul>
            </section>

            {/* Property Tax Payment Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Property Tax Payment Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">💡</span><span><strong className="text-gray-300">Pay before June 30th:</strong> Most cities offer early payment discounts (5-10%). Avoid last-minute rush.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">💡</span><span><strong className="text-gray-300">Check property ID:</strong> Ensure your property ID is correct on municipal records. Incorrect ID leads to wrong tax calculation.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">💡</span><span><strong className="text-gray-300">Keep receipts:</strong> Save payment receipts for 5-7 years. Useful for property resale and tax audits.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">💡</span><span><strong className="text-gray-300">Online payment:</strong> Use official municipal portals only. Avoid third-party payment sites to prevent fraud.</span></li>
                </ul>
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