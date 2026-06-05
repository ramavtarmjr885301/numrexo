"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is VAT and how does it work?",
        a: "VAT (Value Added Tax) is a consumption tax applied to goods and services at each stage of production and distribution. Unlike GST, VAT is collected at every step where value is added, not just at the final sale. Most countries have VAT rates between 5-25%.",
    },
    {
        q: "What is the difference between VAT and GST?",
        a: "VAT and GST are similar but have key differences. VAT is collected at each stage of production, while GST is a unified tax that replaced multiple indirect taxes in countries like India, Canada, and Australia. VAT is more common in European countries and the UK.",
    },
    {
        q: "How to calculate VAT from a price?",
        a: "To add VAT: Total Price = Original Price × (1 + VAT Rate/100). Example: ₹1000 at 20% VAT = ₹1000 × 1.20 = ₹1200. To remove VAT: Original Price = Total Price ÷ (1 + VAT Rate/100). Example: ₹1200 ÷ 1.20 = ₹1000.",
    },
    {
        q: "What are common VAT rates by country?",
        a: "UK: 20% standard (5% reduced), Germany: 19%, France: 20%, Italy: 22%, Spain: 21%, Netherlands: 21%, Canada: 5% GST (provincial rates extra), Australia: 10% GST, New Zealand: 15% GST.",
    },
    {
        q: "Who needs to register for VAT?",
        a: "Businesses with annual taxable turnover exceeding the VAT threshold must register. UK threshold is £85,000, Germany is €22,000, France is €85,800. Once registered, businesses must charge VAT on sales and can reclaim VAT on purchases.",
    },
    {
        q: "What is VAT return filing?",
        a: "VAT-registered businesses must file VAT returns quarterly or monthly (depends on country). They report output VAT (collected from customers) and input VAT (paid on purchases). The difference is paid to or refunded by tax authorities.",
    },
];

const VAT_RATES_BY_COUNTRY = [
    { country: "United Kingdom", standard: "20%", reduced: "5%", zero: "0%" },
    { country: "Germany", standard: "19%", reduced: "7%", zero: "0%" },
    { country: "France", standard: "20%", reduced: "5.5%", zero: "0%" },
    { country: "Italy", standard: "22%", reduced: "10%", zero: "0%" },
    { country: "Spain", standard: "21%", reduced: "10%", zero: "0%" },
    { country: "Netherlands", standard: "21%", reduced: "9%", zero: "0%" },
    { country: "Canada (GST)", standard: "5%", reduced: "0%", zero: "0%" },
    { country: "Australia (GST)", standard: "10%", reduced: "0%", zero: "0%" },
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function VATCalculator() {
    const [amount, setAmount] = useState("");
    const [vatRate, setVatRate] = useState("20");
    const [calcType, setCalcType] = useState<"add" | "remove">("add");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                                    placeholder="1000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹/£/€/$</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">VAT Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="20"
                                    step="0.5"
                                    value={vatRate}
                                    onChange={(e) => setVatRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
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
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate VAT →
                        </button>
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
                        value: calcType === "add" ? `${result.grossAmount}` : `${result.netAmount}`,
                        color: "text-purple-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: calcType === "add" ? "Original Amount" : "Gross Amount (with VAT)", value: calcType === "add" ? result.netAmount : result.grossAmount },
                        { label: `VAT Amount (${result.vatRate}%)`, value: result.vatAmount, valueColor: "text-green-400" },
                        { label: calcType === "add" ? "Total with VAT" : "VAT Exclusive Price", value: calcType === "add" ? result.grossAmount : result.netAmount },
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About VAT Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Value Added Tax (VAT) Calculator</strong> helps you calculate VAT for transactions in the UK, Europe, Canada, and Australia. Whether you need to add VAT to a price or remove VAT from a VAT-inclusive price, this calculator gives you instant results.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    VAT is a consumption tax applied to most goods and services. Businesses charge VAT on their sales (output VAT) and can reclaim VAT on their purchases (input VAT). The difference is paid to or refunded by tax authorities.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">VAT Calculation Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Add VAT</h3>
                        <p className="text-white font-mono text-sm mb-2">Gross Amount = Net Amount × (1 + VAT Rate/100)</p>
                        <p className="text-gray-500 text-xs">Example: ₹1000 × 1.20 = ₹1200 (VAT ₹200)</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">Remove VAT</h3>
                        <p className="text-white font-mono text-sm mb-2">Net Amount = Gross Amount ÷ (1 + VAT Rate/100)</p>
                        <p className="text-gray-500 text-xs">Example: ₹1200 ÷ 1.20 = ₹1000 (VAT ₹200)</p>
                    </div>
                </div>
            </section>

            {/* VAT Rates by Country Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">VAT/GST Rates by Country</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
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
                </div>
                <p className="text-xs text-gray-500 mt-2">Note: Some countries have provincial or state-level VAT/GST in addition to federal rates.</p>
            </section>

            {/* Limitations Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">VAT rates vary by country and product</strong> — Some items like food, books, and children's clothing may have reduced or zero rates.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Businesses must register for VAT</strong> — If your annual turnover exceeds the VAT threshold in your country, you must register and charge VAT.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">VAT is different from sales tax</strong> — VAT is charged at each stage of production, while sales tax is only charged at the final sale.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Consult a tax professional</strong> — This calculator provides estimates. For official VAT calculations, consult a qualified accountant.</span>
                    </li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
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