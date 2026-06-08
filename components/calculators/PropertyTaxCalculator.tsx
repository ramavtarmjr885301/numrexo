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
    url: "https://www.numrexo.com/tax/property-tax-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["City-wise tax rates", "Property value assessment", "Tax estimation", "Penalty calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Tax Calculators", item: "https://www.numrexo.com/tax" },
        { "@type": "ListItem", position: 3, name: "Property Tax Calculator", item: "https://www.numrexo.com/tax/property-tax-calculator" },
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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/tax" itemProp="item" className="hover:text-gray-300">Tax Calculators</a><meta itemProp="position" content="2" /></li>
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
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">City</label><select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{CITY_TAX_RATES.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}</select></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Type</label><div className="grid grid-cols-2 gap-2"><button className={`py-2 rounded-lg text-sm font-medium transition-all ${propertyType === "residential" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setPropertyType("residential")}>Residential</button><button className={`py-2 rounded-lg text-sm font-medium transition-all ${propertyType === "commercial" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setPropertyType("commercial")}>Commercial</button></div></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Value (₹)</label><div className="relative"><input type="number" step="100000" placeholder="5000000" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Built-up Area (sq ft)</label><input type="number" placeholder="1000" value={area} onChange={(e) => setArea(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Property Age (years)</label><input type="number" placeholder="10" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Late Payment (months)</label><div className="relative"><input type="number" placeholder="0" value={latePayment} onChange={(e) => setLatePayment(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">months</span></div></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:shadow-lg">Calculate Property Tax →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Property Tax Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate property tax for major Indian cities including Mumbai, Delhi, Bangalore, Chennai, and more.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">City-wise Property Tax Rates</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800 sticky top-0 bg-[#111827]"><th className="text-left py-3 px-4 text-gray-400">City</th><th className="text-left py-3 px-4 text-gray-400">Tax Rate</th><th className="text-left py-3 px-4 text-gray-400">Method</th><th className="text-left py-3 px-4 text-gray-400">Notes</th></tr></thead>
                        <tbody>
                            {CITY_TAX_RATES.map((cityData, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{cityData.city}</td><td className="py-2 px-4 text-yellow-400">{cityData.rate}</td><td className="py-2 px-4 text-gray-400">{cityData.method}</td><td className="py-2 px-4 text-gray-500 text-xs">{cityData.notes}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Property Tax Exemptions & Rebates</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Senior Citizens:</strong> 10-30% rebate in many cities (60+ years)</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Women Owners:</strong> Bangalore offers 20% rebate for properties owned by women</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Green Building:</strong> 5-10% rebate for eco-friendly constructions</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-gray-300">Early Payment:</strong> 5-10% discount for paying before due date</span></li>
                </ul>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}