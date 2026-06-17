"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is VAT and how does it work?",
        a: "VAT (Value Added Tax) is a consumption tax applied to goods and services at each stage of production and distribution. Unlike GST, VAT is collected at every step where value is added, not just at the final sale. Most countries have VAT rates between 5-25%. Businesses charge VAT on their sales (output VAT) and can reclaim VAT on their purchases (input VAT), paying only the difference to tax authorities.",
    },
    {
        q: "What is the difference between VAT and GST?",
        a: "VAT and GST are similar but have key differences. VAT is collected at each stage of production, while GST is a unified tax that replaced multiple indirect taxes in countries like India, Canada, and Australia. VAT is more common in European countries and the UK. GST typically has multiple tax slabs (e.g., 5%, 12%, 18%, 28% in India), while VAT usually has one standard rate plus reduced rates.",
    },
    {
        q: "How to calculate VAT from a price?",
        a: "To add VAT: Total Price = Original Price × (1 + VAT Rate/100). Example: ₹1000 at 20% VAT = ₹1000 × 1.20 = ₹1200. To remove VAT: Original Price = Total Price ÷ (1 + VAT Rate/100). Example: ₹1200 ÷ 1.20 = ₹1000. Our calculator handles both calculations instantly with just a click.",
    },
    {
        q: "What are common VAT rates by country?",
        a: "UK: 20% standard (5% reduced), Germany: 19% (7% reduced), France: 20% (5.5% reduced), Italy: 22% (10% reduced), Spain: 21% (10% reduced), Netherlands: 21% (9% reduced), Canada: 5% GST (provincial rates extra), Australia: 10% GST, New Zealand: 15% GST, Ireland: 23% (13.5% reduced), Portugal: 23% (13% reduced).",
    },
    {
        q: "Who needs to register for VAT?",
        a: "Businesses with annual taxable turnover exceeding the VAT threshold must register. UK threshold is £85,000, Germany is €22,000, France is €85,800, Italy is €65,000, Spain is €0 (all businesses must register), Canada is CAD 30,000 (GST), Australia is AUD 75,000 (GST). Once registered, businesses must charge VAT on sales and can reclaim VAT on purchases.",
    },
    {
        q: "What is VAT return filing?",
        a: "VAT-registered businesses must file VAT returns quarterly or monthly (depends on country). They report output VAT (collected from customers) and input VAT (paid on purchases). The difference is paid to or refunded by tax authorities. In the UK, most businesses file quarterly. In Germany, monthly filing is common for larger businesses. Penalties apply for late filing.",
    },
    {
        q: "What is the difference between VAT and sales tax?",
        a: "VAT is a multi-stage tax collected at every stage of production and distribution (each time value is added). Sales tax is a single-stage tax collected only at the final point of sale to the end consumer. VAT allows businesses to claim credits for tax paid on inputs (input VAT), while sales tax doesn't provide this mechanism. VAT is used in most countries worldwide (Europe, UK, Australia, Canada), while sales tax is primarily used in the US.",
    },
    {
        q: "What items are exempt from VAT?",
        a: "Common VAT exemptions include: Financial services (insurance, banking), Education (tuition fees, school meals), Healthcare (medical services, hospital care), Postal services, Certain cultural events (theatre, museums), and Property transactions (land, residential property). Additionally, many countries have reduced rates for essential items like food, books, and children's clothing. Always check local regulations for specific exemptions.",
    },
    {
        q: "How to handle VAT for international transactions?",
        a: "For international transactions: 1) Exports are generally zero-rated (0% VAT), 2) Imports are subject to VAT at import (paid to customs), 3) B2B services between EU countries are reverse-charged (buyer accounts for VAT), 4) Distance selling rules apply for cross-border e-commerce, 5) Non-EU businesses may need to register for VAT in the EU country where they supply services. Always consult a tax professional for cross-border VAT compliance.",
    },
    {
        q: "What is the reverse charge mechanism?",
        a: "The reverse charge mechanism shifts the responsibility for reporting VAT from the seller to the buyer. It's used for: 1) B2B services between EU countries, 2) Imported services, 3) Construction services in some countries, 4) Telecom, broadcasting, and electronic services to businesses. Under reverse charge, the buyer accounts for both output VAT (charge) and input VAT (claim), effectively netting to zero. This prevents cash flow issues for cross-border transactions.",
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
    name: "VAT Calculator – Value Added Tax Calculator",
    description: "Calculate VAT for UK, Europe, Canada, and Australia. Add or remove VAT from any amount. Instant and accurate.",
    url: "https://www.numrexo.com/tax/vat-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Add VAT", "Remove VAT", "Multiple country rates", "Instant calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Tax Calculators", item: "https://www.numrexo.com/tax" },
        { "@type": "ListItem", position: 3, name: "VAT Calculator", item: "https://www.numrexo.com/tax/vat-calculator" },
    ],
});

const VAT_RATES_BY_COUNTRY = [
    { country: "🇬🇧 United Kingdom", standard: "20%", reduced: "5%", zero: "0%" },
    { country: "🇩🇪 Germany", standard: "19%", reduced: "7%", zero: "0%" },
    { country: "🇫🇷 France", standard: "20%", reduced: "5.5%", zero: "0%" },
    { country: "🇮🇹 Italy", standard: "22%", reduced: "10%", zero: "0%" },
    { country: "🇪🇸 Spain", standard: "21%", reduced: "10%", zero: "0%" },
    { country: "🇳🇱 Netherlands", standard: "21%", reduced: "9%", zero: "0%" },
    { country: "🇮🇪 Ireland", standard: "23%", reduced: "13.5%", zero: "0%" },
    { country: "🇵🇹 Portugal", standard: "23%", reduced: "13%", zero: "0%" },
    { country: "🇨🇦 Canada (GST)", standard: "5%", reduced: "0%", zero: "0%" },
    { country: "🇦🇺 Australia (GST)", standard: "10%", reduced: "0%", zero: "0%" },
    { country: "🇳🇿 New Zealand (GST)", standard: "15%", reduced: "0%", zero: "0%" },
    { country: "🇨🇭 Switzerland", standard: "7.7%", reduced: "2.5%", zero: "0%" },
];

const VAT_THRESHOLDS = [
    { country: "🇬🇧 United Kingdom", threshold: "£85,000", frequency: "Quarterly" },
    { country: "🇩🇪 Germany", threshold: "€22,000", frequency: "Monthly/Quarterly" },
    { country: "🇫🇷 France", threshold: "€85,800", frequency: "Monthly/Quarterly" },
    { country: "🇮🇹 Italy", threshold: "€65,000", frequency: "Monthly" },
    { country: "🇪🇸 Spain", threshold: "€0 (all must register)", frequency: "Quarterly" },
    { country: "🇨🇦 Canada", threshold: "CAD 30,000", frequency: "Quarterly" },
    { country: "🇦🇺 Australia", threshold: "AUD 75,000", frequency: "Quarterly" },
    { country: "🇳🇿 New Zealand", threshold: "NZD 60,000", frequency: "Monthly/Quarterly" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function VATCalculator() {
    const [amount, setAmount] = useState("");
    const [vatRate, setVatRate] = useState("20");
    const [calcType, setCalcType] = useState<"add" | "remove">("add");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setAmount("");
        setVatRate("20");
        setCalcType("add");
        setResult(null);
    };

    const calculate = () => {
        const a = parseFloat(amount);
        const r = parseFloat(vatRate) / 100;

        if (!a || a <= 0 || isNaN(a)) {
            alert("Please enter a valid amount");
            return;
        }

        let netAmount, vatAmount, grossAmount;

        if (calcType === "add") {
            netAmount = a;
            vatAmount = a * r;
            grossAmount = a + vatAmount;
        } else {
            grossAmount = a;
            netAmount = a / (1 + r);
            vatAmount = grossAmount - netAmount;
        }

        // Ensure amounts are valid
        if (!isFinite(netAmount) || !isFinite(vatAmount) || !isFinite(grossAmount)) {
            alert("Invalid calculation result. Please check your inputs.");
            return;
        }

        setResult({
            netAmount: netAmount.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            grossAmount: grossAmount.toFixed(2),
            vatRate: parseFloat(vatRate),
            calcType,
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
                        <a href="https://www.numrexo.com/tax" itemProp="item" className="hover:text-gray-300">Tax Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">VAT Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">VAT Calculation</h3>
                        <p className="text-xs text-gray-500 mt-1">For UK, Europe, Canada, Australia</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="1000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹/£/€/$</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">VAT Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="20"
                                    value={vatRate}
                                    onChange={(e) => setVatRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">UK: 20%, Germany: 19%, France: 20%, Italy: 22%, Canada: 5%</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "add" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("add")}
                                >
                                    Add VAT
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "remove" ? "bg-orange-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("remove")}
                                >
                                    Remove VAT
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate VAT →
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
                    title="VAT Breakdown"
                    isEmpty={!result}
                    emptyIcon="🧾"
                    emptyText="Enter amount and press Calculate"
                    mainResult={result ? {
                        label: calcType === "add" ? "Total Amount (with VAT)" : "Original Amount (without VAT)",
                        value: `${calcType === "add" ? result.grossAmount : result.netAmount}`,
                        color: "text-purple-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: calcType === "add" ? "Original Amount" : "Gross Amount (with VAT)", value: calcType === "add" ? result.netAmount : result.grossAmount },
                        { label: `VAT Amount (${result.vatRate}%)`, value: result.vatAmount, valueColor: "text-green-400" },
                        { label: calcType === "add" ? "Total with VAT" : "VAT Exclusive Price", value: calcType === "add" ? result.grossAmount : result.netAmount },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About VAT Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Value Added Tax (VAT) Calculator</strong> helps you calculate VAT for transactions in the UK, Europe, Canada, and Australia. Whether you need to add VAT to a price or remove VAT from a VAT-inclusive price, this calculator gives you instant results.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    VAT is a consumption tax applied to most goods and services. Businesses charge VAT on their sales (output VAT) and can reclaim VAT on their purchases (input VAT). The difference is paid to or refunded by tax authorities.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding VAT is essential for businesses and consumers alike. Our calculator supports multiple countries and includes common VAT rates, registration thresholds, and filing frequencies to help you navigate VAT compliance.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This VAT Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">amount</strong> (net or gross depending on calculation type).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">VAT rate</strong> (e.g., 20% for UK standard rate).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Select <strong className="text-white">"Add VAT"</strong> or <strong className="text-white">"Remove VAT"</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate VAT"</strong> to see the breakdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Review your <strong className="text-white">net amount, VAT amount, and gross amount</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a VAT Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Quick VAT Calculations</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get instant VAT calculations without manual math. Perfect for invoices, quotes, and expense tracking.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Multiple Country Support</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Supports VAT rates for UK, Germany, France, Italy, Spain, Canada, Australia, and more.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Add or Remove VAT</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate both VAT-inclusive and VAT-exclusive prices. Essential for business accounting and pricing.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Business Compliance</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Accurate VAT calculations help with VAT return filing, invoice accuracy, and tax compliance.</p>
                    </div>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">VAT Calculation Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Add VAT</h3>
                        <p className="text-white font-mono text-sm mb-2">Gross Amount = Net Amount × (1 + VAT Rate/100)</p>
                        <p className="text-gray-500 text-xs mb-2">VAT Amount = Net Amount × (VAT Rate/100)</p>
                        <p className="text-gray-500 text-xs">Example: ₹1000 × 1.20 = ₹1200 (VAT ₹200)</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Remove VAT</h3>
                        <p className="text-white font-mono text-sm mb-2">Net Amount = Gross Amount ÷ (1 + VAT Rate/100)</p>
                        <p className="text-gray-500 text-xs mb-2">VAT Amount = Gross Amount - Net Amount</p>
                        <p className="text-gray-500 text-xs">Example: ₹1200 ÷ 1.20 = ₹1000 (VAT ₹200)</p>
                    </div>
                </div>
            </section>

            {/* VAT Rates by Country Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">VAT/GST Rates by Country</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Country</th>
                                <th className="text-left py-3 px-4 text-gray-400">Standard Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Reduced Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Zero Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VAT_RATES_BY_COUNTRY.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.country}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.standard}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.reduced}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.zero}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Some countries have provincial or state-level VAT/GST in addition to federal rates. Reduced rates apply to certain goods and services.
                    </p>
                </div>
            </section>

            {/* VAT Registration Thresholds */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">VAT Registration Thresholds</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Country</th>
                                <th className="text-left py-3 px-4 text-gray-400">Registration Threshold</th>
                                <th className="text-left py-3 px-4 text-gray-400">Filing Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VAT_THRESHOLDS.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.country}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.threshold}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.frequency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Thresholds are based on annual taxable turnover. Check with local tax authorities for exact requirements.
                    </p>
                </div>
            </section>

            {/* VAT vs Sales Tax */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">VAT vs Sales Tax Comparison</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-green-500/20">
                            <h4 className="text-sm font-semibold text-green-400 mb-2">✅ VAT</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Charged at each stage of production</li>
                                <li>• Businesses can claim input VAT credits</li>
                                <li>• Used in Europe, UK, Australia, Canada</li>
                                <li>• Single rate + reduced rates</li>
                                <li>• More complex compliance</li>
                            </ul>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-3 border border-orange-500/20">
                            <h4 className="text-sm font-semibold text-orange-400 mb-2">🛒 Sales Tax</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Charged only at final sale</li>
                                <li>• No input tax credits</li>
                                <li>• Used primarily in the US</li>
                                <li>• State + local rates vary</li>
                                <li>• Simpler compliance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* VAT Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart VAT Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check your VAT rate:</strong> Different products may have different VAT rates. Food and books often have reduced rates. Always verify the correct rate for your product or service.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Keep accurate records:</strong> Maintain detailed records of all transactions. You'll need these for VAT returns and potential audits.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Claim input VAT:</strong> Ensure you're claiming VAT on all eligible business purchases. This reduces your VAT liability.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">File on time:</strong> Late VAT returns incur penalties. Set reminders for your filing deadlines (monthly, quarterly, or annually).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use our calculator:</strong> Always double-check your VAT calculations using our calculator. Even small errors can lead to compliance issues.</span>
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