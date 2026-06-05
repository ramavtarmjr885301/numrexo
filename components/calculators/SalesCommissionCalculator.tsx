"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How is sales commission calculated?",
        a: "Sales commission is usually a percentage of the total sale amount. Formula: Commission = Sale Amount × Commission Rate ÷ 100. Example: ₹50,000 sale at 10% commission = ₹5,000. Some plans have tiered rates where higher sales earn higher percentages.",
    },
    {
        q: "What is a good commission rate?",
        a: "Average commission rates: Real estate (3-6%), Car sales (5-10%), Retail (5-15%), Software/SaaS (10-20%), Insurance (5-15%), Financial services (1-5%). Higher commission usually means lower base salary.",
    },
    {
        q: "What is tiered commission?",
        a: "Tiered commission pays higher rates for higher sales. Example: 5% on ₹0-₹1L, 7% on ₹1L-₹2L, 10% on ₹2L+. This motivates reps to sell more. Our calculator supports this structure.",
    },
    {
        q: "How to calculate commission with bonus?",
        a: "Add bonus to commission. Example: 10% commission on ₹1L sale = ₹10,000 + ₹5,000 bonus = ₹15,000 total. Bonuses are often for hitting specific targets.",
    },
    {
        q: "What is draw against commission?",
        a: "A draw is guaranteed minimum payment advanced against future commissions. If you earn less than the draw, you owe the difference. If you earn more, you keep the surplus. Common in car sales.",
    },
    {
        q: "How to calculate commission split?",
        a: "When multiple people share a sale, split the commission. Example: Total commission ₹10,000 split 60/40 between sales rep and manager = ₹6,000 and ₹4,000.",
    },
];

const COMMISSION_EXAMPLES = [
    { sales: "₹50,000", rate: "5%", commission: "₹2,500" },
    { sales: "₹1,00,000", rate: "8%", commission: "₹8,000" },
    { sales: "₹2,00,000", rate: "10%", commission: "₹20,000" },
    { sales: "₹5,00,000", rate: "12%", commission: "₹60,000" },
    { sales: "₹10,00,000", rate: "15%", commission: "₹1,50,000" },
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
    name: "Sales Commission Calculator – Commission Calculator",
    description: "Calculate sales commission with tiered rates, bonuses, and splits. Perfect for sales reps and managers.",
    url: "https://www.numrexo.com/business/sales-commission-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Commission calculation", "Tiered rates", "Bonus inclusion", "Split commission"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Business Calculators", item: "https://www.numrexo.com/business" },
        { "@type": "ListItem", position: 3, name: "Sales Commission Calculator", item: "https://www.numrexo.com/business/sales-commission-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalesCommissionCalculator() {
    const [calcType, setCalcType] = useState<"simple" | "tiered" | "split">("simple");
    const [saleAmount, setSaleAmount] = useState("");
    const [commissionRate, setCommissionRate] = useState("");
    const [bonus, setBonus] = useState("");
    const [tier1Limit, setTier1Limit] = useState("");
    const [tier1Rate, setTier1Rate] = useState("");
    const [tier2Limit, setTier2Limit] = useState("");
    const [tier2Rate, setTier2Rate] = useState("");
    const [tier3Rate, setTier3Rate] = useState("");
    const [splitPercent, setSplitPercent] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateSimple = () => {
        const sale = parseFloat(saleAmount);
        const rate = parseFloat(commissionRate);
        const extraBonus = parseFloat(bonus) || 0;

        if (!sale || sale <= 0 || !rate || rate <= 0) {
            alert("Please enter valid sale amount and commission rate");
            return;
        }

        const commission = sale * (rate / 100);
        const total = commission + extraBonus;

        setResult({
            commission: commission.toFixed(2),
            bonus: extraBonus.toFixed(2),
            total: total.toFixed(2),
            saleAmount: sale.toFixed(2),
            rate: rate,
            calcType: "simple",
        });
    };

    const calculateTiered = () => {
        const sale = parseFloat(saleAmount);
        const t1Limit = parseFloat(tier1Limit) || 0;
        const t1Rate = parseFloat(tier1Rate) || 0;
        const t2Limit = parseFloat(tier2Limit) || 0;
        const t2Rate = parseFloat(tier2Rate) || 0;
        const t3Rate = parseFloat(tier3Rate) || 0;

        if (!sale || sale <= 0) {
            alert("Please enter valid sale amount");
            return;
        }

        let commission = 0;
        let remaining = sale;

        if (t1Rate > 0) {
            const tierAmount = Math.min(remaining, t1Limit);
            commission += tierAmount * (t1Rate / 100);
            remaining -= tierAmount;
        }

        if (t2Rate > 0 && remaining > 0) {
            const tierAmount = Math.min(remaining, t2Limit);
            commission += tierAmount * (t2Rate / 100);
            remaining -= tierAmount;
        }

        if (t3Rate > 0 && remaining > 0) {
            commission += remaining * (t3Rate / 100);
        }

        setResult({
            commission: commission.toFixed(2),
            saleAmount: sale.toFixed(2),
            calcType: "tiered",
        });
    };

    const calculateSplit = () => {
        const sale = parseFloat(saleAmount);
        const rate = parseFloat(commissionRate);
        const split = parseFloat(splitPercent);

        if (!sale || sale <= 0 || !rate || rate <= 0) {
            alert("Please enter valid sale amount and commission rate");
            return;
        }

        if (!split || split <= 0 || split >= 100) {
            alert("Please enter a valid split percentage (1-99)");
            return;
        }

        const totalCommission = sale * (rate / 100);
        const person1 = totalCommission * (split / 100);
        const person2 = totalCommission - person1;

        setResult({
            totalCommission: totalCommission.toFixed(2),
            person1Commission: person1.toFixed(2),
            person2Commission: person2.toFixed(2),
            splitPercent: split,
            saleAmount: sale.toFixed(2),
            rate: rate,
            calcType: "split",
        });
    };

    const calculate = () => {
        if (calcType === "simple") calculateSimple();
        else if (calcType === "tiered") calculateTiered();
        else calculateSplit();
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Sales Commission Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Commission Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate earnings from sales</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Commission Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "simple" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("simple")}>Simple</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "tiered" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("tiered")}>Tiered</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "split" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setCalcType("split")}>Split</button>
                            </div>
                        </div>

                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Total Sale Amount (₹)</label><div className="relative"><input type="number" placeholder="100000" value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>

                        {calcType === "simple" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Commission Rate (%)</label><div className="relative"><input type="number" step="0.5" placeholder="10" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Bonus (Optional)</label><div className="relative"><input type="number" placeholder="0" value={bonus} onChange={(e) => setBonus(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div></div>
                            </>
                        )}

                        {calcType === "tiered" && (
                            <>
                                <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Tier 1 Limit (₹)</label><input type="number" placeholder="50000" value={tier1Limit} onChange={(e) => setTier1Limit(e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Tier 1 Rate (%)</label><input type="number" step="0.5" placeholder="5" value={tier1Rate} onChange={(e) => setTier1Rate(e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div></div>
                                <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-400 mb-2">Tier 2 Limit (₹)</label><input type="number" placeholder="100000" value={tier2Limit} onChange={(e) => setTier2Limit(e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div><div><label className="block text-xs font-semibold text-gray-400 mb-2">Tier 2 Rate (%)</label><input type="number" step="0.5" placeholder="7" value={tier2Rate} onChange={(e) => setTier2Rate(e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Tier 3 Rate (%) (Above Tier 2)</label><input type="number" step="0.5" placeholder="10" value={tier3Rate} onChange={(e) => setTier3Rate(e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" /></div>
                            </>
                        )}

                        {calcType === "split" && (
                            <>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Commission Rate (%)</label><div className="relative"><input type="number" step="0.5" placeholder="10" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                                <div><label className="block text-xs font-semibold text-gray-400 mb-2">Person 1 Split (%)</label><div className="relative"><input type="number" step="1" placeholder="60" value={splitPercent} onChange={(e) => setSplitPercent(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span></div></div>
                            </>
                        )}

                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Commission →</button>
                    </div>
                </div>

                <ResultBox
                    title="Commission Results"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter sale details and press Calculate"
                    mainResult={result ? { label: "Total Commission", value: `₹${parseFloat(result.commission || result.totalCommission).toLocaleString()}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Sale Amount", value: `₹${parseFloat(result.saleAmount).toLocaleString()}` },
                        ...(calcType === "simple" ? [
                            { label: "Commission Rate", value: `${result.rate}%` },
                            ...(result.bonus && parseFloat(result.bonus) > 0 ? [{ label: "Bonus", value: `₹${parseFloat(result.bonus).toLocaleString()}`, valueColor: "text-yellow-400" }] : []),
                        ] : []),
                        ...(calcType === "split" ? [
                            { label: "Person 1 Commission", value: `₹${parseFloat(result.person1Commission).toLocaleString()}`, valueColor: "text-blue-400" },
                            { label: "Person 2 Commission", value: `₹${parseFloat(result.person2Commission).toLocaleString()}`, valueColor: "text-purple-400" },
                            { label: "Split Ratio", value: `${result.splitPercent}% / ${(100 - result.splitPercent).toFixed(0)}%` },
                        ] : []),
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Sales Commission Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate sales commissions for simple rates, tiered structures, or split commissions. Perfect for sales reps, managers, and business owners.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Commission Formulas</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-blue-400 mb-2">Simple</h3><p className="text-white font-mono text-xs">Commission = Sale × Rate ÷ 100</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-green-400 mb-2">Tiered</h3><p className="text-white font-mono text-xs">Different rates for different sale levels</p></div><div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><h3 className="text-sm font-semibold text-purple-400 mb-2">Split</h3><p className="text-white font-mono text-xs">Commission divided by percentage</p></div></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Commission Examples</h2><div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Sale Amount</th><th className="text-left py-3 px-4 text-gray-400">Rate</th><th className="text-left py-3 px-4 text-gray-400">Commission</th></tr></thead><tbody>{COMMISSION_EXAMPLES.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-gray-300">{row.sales}</td><td className="py-3 px-4 text-yellow-400">{row.rate}</td><td className="py-3 px-4 text-green-400">{row.commission}</td></tr>))}</tbody></table></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div></section>
        </>
    );
}