"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is LTCG tax on shares?",
        a: "Long Term Capital Gains (LTCG) tax on shares is 10% on gains exceeding ₹1 lakh in a financial year. If you hold shares for more than 1 year, it's considered long-term. For example, if your total LTCG is ₹1.5 lakh, you pay 10% only on ₹50,000 (₹5,000 tax).",
    },
    {
        q: "What is the holding period for LTCG?",
        a: "For shares and equity mutual funds: 1 year or more. For real estate: 3 years or more. For debt mutual funds: 3 years or more. For gold: 3 years or more. Make sure you hold the asset for the minimum period to qualify for LTCG benefits.",
    },
    {
        q: "What is indexation benefit?",
        a: "Indexation allows you to adjust the purchase price for inflation using CII (Cost Inflation Index). This reduces your taxable gains. Available for real estate, debt funds, gold, and bonds held for more than 3 years. Not available for shares and equity funds.",
    },
    {
        q: "Is LTCG on shares completely tax-free?",
        a: "No. LTCG up to ₹1 lakh per financial year is tax-free. Any gain above ₹1 lakh is taxed at 10% without indexation benefit. This rule applies to both shares and equity mutual funds.",
    },
    {
        q: "How to calculate LTCG on property?",
        a: "For property, you can use indexation benefit. Formula: Indexed Cost = Purchase Price × (CII of sale year ÷ CII of purchase year). Then Capital Gain = Sale Price - Indexed Cost. Tax is 20% on the gain.",
    },
    {
        q: "What is the grandfathering rule for LTCG?",
        a: "For shares acquired before February 1, 2018, the cost is taken as the higher of actual purchase price or Fair Market Value (FMV) as of January 31, 2018. This protects gains made before the tax was introduced.",
    },
];

const LTCG_RATES = [
    { assetType: "Shares / Equity Mutual Funds", holdingPeriod: "> 1 year", taxRate: "10%", exemption: "₹1,00,000", indexation: "No" },
    { assetType: "Real Estate (Property)", holdingPeriod: "> 3 years", taxRate: "20%", exemption: "None", indexation: "Yes" },
    { assetType: "Debt Mutual Funds / Bonds", holdingPeriod: "> 3 years", taxRate: "20%", exemption: "None", indexation: "Yes" },
    { assetType: "Gold / Jewellery", holdingPeriod: "> 3 years", taxRate: "20%", exemption: "None", indexation: "Yes" },
];

// CII values (Cost Inflation Index) - base year 2001-02 = 100
const CII_VALUES: Record<string, number> = {
    "2001-02": 100, "2002-03": 105, "2003-04": 109, "2004-05": 113,
    "2005-06": 117, "2006-07": 122, "2007-08": 129, "2008-09": 137,
    "2009-10": 148, "2010-11": 167, "2011-12": 184, "2012-13": 200,
    "2013-14": 220, "2014-15": 240, "2015-16": 254, "2016-17": 264,
    "2017-18": 272, "2018-19": 280, "2019-20": 289, "2020-21": 301,
    "2021-22": 317, "2022-23": 331, "2023-24": 348, "2024-25": 363,
    "2025-26": 378,
};

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
    name: "LTCG Calculator – Long Term Capital Gains Tax Calculator",
    description: "Calculate Long Term Capital Gains tax on shares, real estate, gold, and mutual funds. Includes indexation benefit for non-equity assets.",
    url: "https://www.numrexo.com/tax/ltcg-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Multiple asset types", "Indexation benefit", "₹1 lakh exemption for shares", "Tax calculation"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Tax Calculators", item: "https://www.numrexo.com/tax" },
        { "@type": "ListItem", position: 3, name: "LTCG Calculator", item: "https://www.numrexo.com/tax/ltcg-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LTCGCalculator() {
    const [assetType, setAssetType] = useState<"equity" | "realestate" | "debt" | "gold">("equity");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [purchaseYear, setPurchaseYear] = useState("");
    const [saleYear, setSaleYear] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const purchase = parseFloat(purchasePrice);
        const sale = parseFloat(salePrice);

        if (!purchase || !sale || purchase <= 0 || sale <= 0) {
            alert("Please enter valid purchase and sale prices");
            return;
        }

        if (sale <= purchase) {
            alert("This is a loss. No tax applicable on capital loss.");
            setResult({
                gain: "0",
                tax: "0",
                isLoss: true,
                lossAmount: (purchase - sale).toFixed(2),
            });
            return;
        }

        const gain = sale - purchase;
        let tax = 0;
        let taxableGain = gain;
        let taxRate = 0;
        let indexedCost = null;

        // For equity (shares, equity mutual funds)
        if (assetType === "equity") {
            taxRate = 10;
            const exemption = 100000;
            taxableGain = Math.max(0, gain - exemption);
            tax = taxableGain * 0.10;

            setResult({
                gain: gain.toFixed(2),
                taxableGain: taxableGain.toFixed(2),
                tax: tax.toFixed(2),
                taxRate,
                exemption: "₹1,00,000",
                assetType: "Shares / Equity Mutual Funds",
                isLoss: false,
            });
            return;
        }

        // For real estate, debt funds, gold (with indexation)
        // Use type assertion to tell TypeScript that assetType is not "equity" here
        const nonEquityType = assetType as "realestate" | "debt" | "gold";

        const py = purchaseYear;
        const sy = saleYear;

        if (!py || !sy) {
            alert("Please select purchase and sale years for indexation benefit");
            return;
        }

        const ciiPurchase = CII_VALUES[py];
        const ciiSale = CII_VALUES[sy];

        if (!ciiPurchase || !ciiSale) {
            alert("Please select valid years from the dropdown");
            return;
        }

        indexedCost = (purchase * ciiSale) / ciiPurchase;
        const indexedGain = sale - indexedCost;
        taxRate = 20;
        taxableGain = indexedGain > 0 ? indexedGain : 0;
        tax = taxableGain * 0.20;

        const assetNames = {
            realestate: "Real Estate (Property)",
            debt: "Debt Mutual Funds / Bonds",
            gold: "Gold / Jewellery",
        };

        setResult({
            purchasePrice: purchase.toFixed(2),
            salePrice: sale.toFixed(2),
            actualGain: gain.toFixed(2),
            indexedCost: indexedCost.toFixed(2),
            gain: taxableGain.toFixed(2),
            tax: tax.toFixed(2),
            taxRate,
            assetType: assetNames[nonEquityType],
            withIndexation: true,
            isLoss: false,
        });
    };

    // Generate year options for dropdown
    const years = Object.keys(CII_VALUES);

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
                        <span itemProp="name" className="text-gray-300">LTCG Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Capital Gains Details</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate tax on your long-term investments</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Asset Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${assetType === "equity" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setAssetType("equity")}
                                >
                                    Shares / Equity Funds
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${assetType === "realestate" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setAssetType("realestate")}
                                >
                                    Real Estate
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${assetType === "debt" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setAssetType("debt")}
                                >
                                    Debt Funds / Bonds
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${assetType === "gold" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setAssetType("gold")}
                                >
                                    Gold / Jewellery
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Purchase Price (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="100000"
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Sale Price (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="250000"
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        {assetType !== "equity" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Year of Purchase</label>
                                    <select
                                        value={purchaseYear}
                                        onChange={(e) => setPurchaseYear(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                    >
                                        <option value="">Select year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Year of Sale</label>
                                    <select
                                        value={saleYear}
                                        onChange={(e) => setSaleYear(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                    >
                                        <option value="">Select year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate LTCG Tax →
                        </button>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="LTCG Tax Calculation"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter your investment details and press Calculate"
                    mainResult={result ? {
                        label: result.isLoss ? "Capital Loss" : "Tax Payable",
                        value: result.isLoss ? `₹${result.lossAmount} (No Tax)` : `₹${result.tax}`,
                        color: result.isLoss ? "text-yellow-400" : "text-red-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Asset Type", value: result.assetType },
                        ...(result.isLoss ? [] : [
                            { label: "Total Capital Gain", value: `₹${result.gain}`, valueColor: "text-yellow-400" },
                            ...(result.taxableGain ? [{ label: "Taxable Gain", value: `₹${result.taxableGain}` }] : []),
                            ...(result.indexedCost ? [{ label: "Indexed Cost of Acquisition", value: `₹${result.indexedCost}` }] : []),
                            { label: "Tax Rate", value: `${result.taxRate}%` },
                            ...(result.exemption ? [{ label: "Exemption", value: result.exemption }] : []),
                        ]),
                    ] : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About LTCG Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Long Term Capital Gains (LTCG) Tax Calculator</strong> helps you estimate the tax you need to pay when selling assets held for the long term. Whether you're selling shares, property, gold, or mutual funds, this calculator gives you accurate tax liability.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    For shares and equity funds, gains up to ₹1 lakh per year are tax-free. For property, debt funds, and gold, you get indexation benefits that reduce your taxable gains by accounting for inflation.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">LTCG Calculation Formula</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">For Shares / Equity Funds</h3>
                        <p className="text-white font-mono text-sm mb-2">Tax = (Gain - ₹1,00,000) × 10%</p>
                        <p className="text-gray-500 text-xs">Example: ₹1,50,000 gain → Tax = ₹50,000 × 10% = ₹5,000</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">For Property / Debt / Gold</h3>
                        <p className="text-white font-mono text-sm mb-2">Indexed Cost = Purchase × (CII Sale ÷ CII Purchase)</p>
                        <p className="text-white font-mono text-sm">Tax = (Sale - Indexed Cost) × 20%</p>
                    </div>
                </div>
            </section>

            {/* LTCG Rates Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">LTCG Tax Rates by Asset Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Asset Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Holding Period</th>
                                <th className="text-left py-3 px-4 text-gray-400">Tax Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Indexation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {LTCG_RATES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.assetType}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.holdingPeriod}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.taxRate}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.indexation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Limitations Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">LTCG applies only if held for more than 1 year</strong> — For shares, holding period is 1 year. For property, debt funds, gold, it's 3 years.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">₹1 lakh exemption is per financial year</strong> — You can have multiple transactions, but total exempt gain is ₹1 lakh.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Indexation benefit reduces tax significantly</strong> — For long-held assets, indexation can reduce or eliminate tax liability.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Consult a tax advisor</strong> — This calculator provides estimates. For exact tax calculation, consult a qualified professional.</span>
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