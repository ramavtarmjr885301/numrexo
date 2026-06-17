"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How is sales commission calculated?",
        a: "Sales commission is usually a percentage of the total sale amount. Formula: Commission = Sale Amount × Commission Rate ÷ 100. Example: ₹50,000 sale at 10% commission = ₹5,000. Some plans have tiered rates where higher sales earn higher percentages. The calculation can also include bonuses, split commissions, and draw against future commissions for more complex compensation structures.",
    },
    {
        q: "What is a good commission rate?",
        a: "Average commission rates by industry: Real estate (3-6%), Car sales (5-10%), Retail (5-15%), Software/SaaS (10-20%), Insurance (5-15%), Financial services (1-5%), Medical devices (10-20%), Industrial equipment (8-15%). Higher commission usually means lower base salary. A 'good' rate depends on your industry, experience level, and the company's compensation philosophy. Always consider the total compensation package, not just the commission rate.",
    },
    {
        q: "What is tiered commission?",
        a: "Tiered commission pays higher rates for higher sales levels. Example: 5% on ₹0-₹1L, 7% on ₹1L-₹2L, 10% on ₹2L+. This motivates reps to sell more and rewards top performers. Our calculator supports this structure with up to 3 tiers. Tiered structures are common in high-volume sales environments and help align sales incentives with company growth goals.",
    },
    {
        q: "How to calculate commission with bonus?",
        a: "Add bonus to commission. Example: 10% commission on ₹1L sale = ₹10,000 + ₹5,000 bonus = ₹15,000 total. Bonuses are often for hitting specific targets like: Monthly quota achievement (5-10% bonus), New customer acquisition (₹5,000-₹10,000 per new account), Product-specific sales (higher margins), or Performance milestones. Bonuses can significantly boost earnings and motivation.",
    },
    {
        q: "What is draw against commission?",
        a: "A draw is guaranteed minimum payment advanced against future commissions. If you earn less than the draw, you owe the difference. If you earn more, you keep the surplus. Common in car sales and real estate. Types: Forgiving draw (you keep excess, no repayment) and Non-forgiving draw (you must repay shortfall). Draw amounts typically range from ₹20,000-₹50,000 per month, providing income stability during slow periods.",
    },
    {
        q: "How to calculate commission split?",
        a: "When multiple people share a sale, split the commission. Example: Total commission ₹10,000 split 60/40 between sales rep and manager = ₹6,000 and ₹4,000. Common split scenarios: Rep/Manager (60/40, 70/30), Rep/Broker (50/50), Team leads (split based on contribution), Referral fees (10-20% to referrer). Always clarify split percentages in advance to avoid disputes.",
    },
    {
        q: "What's the difference between gross and net commission?",
        a: "Gross commission is the total commission earned before any deductions. Net commission is what you actually receive after deductions: Company overhead (5-15%), Administrative fees (2-5%), Insurance/benefits costs, Professional fees (membership, licensing). Example: ₹10,000 gross commission - 10% admin fee = ₹9,000 net. Always calculate net commission for accurate earnings planning.",
    },
    {
        q: "How to optimize sales commission structure?",
        a: "Best practices for commission structures: 1) Match commission rates to profit margins (higher margin = higher commission), 2) Implement accelerators for over-quota performance (1.5x-2x rates), 3) Include team bonuses for collaboration, 4) Cap commissions for risk management, 5) Use SPIFFs (Special Incentive Funds) for specific products, 6) Regular quarterly reviews. The best structures are simple enough to understand but comprehensive enough to drive desired behaviors.",
    },
    {
        q: "What is the difference between commission and incentive?",
        a: "Commission is a percentage-based payment tied directly to sales volume (e.g., 10% of each sale). Incentives are broader rewards for achieving goals, including: Bonuses (fixed amounts), SPIFFs (special incentives), Trips and prizes, Recognition programs, Points-based rewards. Commissions are usually ongoing payments, while incentives are temporary promotions. Many companies combine both for optimal motivation.",
    },
    {
        q: "How to handle commission disputes?",
        a: "Common commission disputes: Unclear split arrangements, Territory/account conflicts, Multi-person deals, Returns/chargebacks, Payment timing issues. Best practices: 1) Written commission agreements, 2) Clear dispute resolution process, 3) Regular commission statements, 4) Third-party mediation if needed, 5) Regular plan reviews. Always document all sales activities and maintain accurate records to protect your commissions.",
    },
];

const COMMISSION_EXAMPLES = [
    { sales: "₹50,000", rate: "5%", commission: "₹2,500", industry: "Retail" },
    { sales: "₹1,00,000", rate: "8%", commission: "₹8,000", industry: "Real Estate" },
    { sales: "₹2,00,000", rate: "10%", commission: "₹20,000", industry: "SaaS" },
    { sales: "₹5,00,000", rate: "12%", commission: "₹60,000", industry: "Insurance" },
    { sales: "₹10,00,000", rate: "15%", commission: "₹1,50,000", industry: "Medical Devices" },
];

const INDUSTRY_COMMISSION_RATES = [
    { industry: "Real Estate", typicalRate: "3-6%", type: "Percentage of sale price", notes: "Usually split between agents" },
    { industry: "Car Sales", typicalRate: "5-10%", type: "Percentage of profit", notes: "Can include bonuses" },
    { industry: "Retail", typicalRate: "5-15%", type: "Percentage of sales", notes: "Often tiered" },
    { industry: "Software/SaaS", typicalRate: "10-20%", type: "Percentage of ACV", notes: "Often includes renewals" },
    { industry: "Insurance", typicalRate: "5-15%", type: "Percentage of premium", notes: "Recurring commissions" },
    { industry: "Medical Devices", typicalRate: "10-20%", type: "Percentage of sales", notes: "High-value deals" },
    { industry: "Financial Services", typicalRate: "1-5%", type: "Percentage of assets", notes: "Ongoing fees" },
    { industry: "Industrial Equipment", typicalRate: "8-15%", type: "Percentage of sales", notes: "Large transactions" },
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

    const resetForm = () => {
        setCalcType("simple");
        setSaleAmount("");
        setCommissionRate("");
        setBonus("");
        setTier1Limit("");
        setTier1Rate("");
        setTier2Limit("");
        setTier2Rate("");
        setTier3Rate("");
        setSplitPercent("");
        setResult(null);
    };

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
        let tierBreakdown = [];

        if (t1Rate > 0) {
            const tierAmount = Math.min(remaining, t1Limit);
            const tierComm = tierAmount * (t1Rate / 100);
            commission += tierComm;
            remaining -= tierAmount;
            tierBreakdown.push({ tier: "Tier 1", amount: tierAmount, rate: t1Rate, commission: tierComm });
        }

        if (t2Rate > 0 && remaining > 0) {
            const tierAmount = Math.min(remaining, t2Limit);
            const tierComm = tierAmount * (t2Rate / 100);
            commission += tierComm;
            remaining -= tierAmount;
            tierBreakdown.push({ tier: "Tier 2", amount: tierAmount, rate: t2Rate, commission: tierComm });
        }

        if (t3Rate > 0 && remaining > 0) {
            const tierComm = remaining * (t3Rate / 100);
            commission += tierComm;
            tierBreakdown.push({ tier: "Tier 3", amount: remaining, rate: t3Rate, commission: tierComm });
        }

        setResult({
            commission: commission.toFixed(2),
            saleAmount: sale.toFixed(2),
            calcType: "tiered",
            tierBreakdown: tierBreakdown,
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
                        <span itemProp="name" className="text-gray-300">Sales Commission Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Commission Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Calculate earnings from sales</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Commission Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "simple" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("simple")}
                                >
                                    Simple
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "tiered" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("tiered")}
                                >
                                    Tiered
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "split" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("split")}
                                >
                                    Split
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total Sale Amount (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="100000"
                                    value={saleAmount}
                                    onChange={(e) => setSaleAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>

                        {calcType === "simple" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Commission Rate (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.5"
                                            placeholder="10"
                                            value={commissionRate}
                                            onChange={(e) => setCommissionRate(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Bonus (Optional)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={bonus}
                                            onChange={(e) => setBonus(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {calcType === "tiered" && (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Tier 1 Limit (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="50000"
                                            value={tier1Limit}
                                            onChange={(e) => setTier1Limit(e.target.value)}
                                            className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Tier 1 Rate (%)</label>
                                        <input
                                            type="number"
                                            step="0.5"
                                            placeholder="5"
                                            value={tier1Rate}
                                            onChange={(e) => setTier1Rate(e.target.value)}
                                            className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Tier 2 Limit (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="100000"
                                            value={tier2Limit}
                                            onChange={(e) => setTier2Limit(e.target.value)}
                                            className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Tier 2 Rate (%)</label>
                                        <input
                                            type="number"
                                            step="0.5"
                                            placeholder="7"
                                            value={tier2Rate}
                                            onChange={(e) => setTier2Rate(e.target.value)}
                                            className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Tier 3 Rate (%) (Above Tier 2)</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        placeholder="10"
                                        value={tier3Rate}
                                        onChange={(e) => setTier3Rate(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </>
                        )}

                        {calcType === "split" && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Commission Rate (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.5"
                                            placeholder="10"
                                            value={commissionRate}
                                            onChange={(e) => setCommissionRate(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Person 1 Split (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="1"
                                            placeholder="60"
                                            value={splitPercent}
                                            onChange={(e) => setSplitPercent(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Commission →
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
                    title="Commission Results"
                    isEmpty={!result}
                    emptyIcon="💰"
                    emptyText="Enter sale details and press Calculate"
                    mainResult={result ? { label: calcType === "split" ? "Total Commission" : "Total Commission", value: `₹${parseFloat(result.commission || result.totalCommission || result.total).toLocaleString()}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Sale Amount", value: `₹${parseFloat(result.saleAmount).toLocaleString()}` },
                        ...(calcType === "simple" ? [
                            { label: "Commission Rate", value: `${result.rate}%` },
                            { label: "Base Commission", value: `₹${parseFloat(result.commission).toLocaleString()}` },
                            ...(result.bonus && parseFloat(result.bonus) > 0 ? [{ label: "Bonus", value: `₹${parseFloat(result.bonus).toLocaleString()}`, valueColor: "text-yellow-400" }] : []),
                        ] : []),
                        ...(calcType === "tiered" && result.tierBreakdown ? [
                            ...result.tierBreakdown.map((tier: any) => ({
                                label: tier.tier,
                                value: `₹${parseFloat(tier.amount).toLocaleString()} @ ${tier.rate}% = ₹${parseFloat(tier.commission).toLocaleString()}`,
                                valueColor: "text-blue-400"
                            })),
                        ] : []),
                        ...(calcType === "split" ? [
                            { label: "Person 1 Commission", value: `₹${parseFloat(result.person1Commission).toLocaleString()}`, valueColor: "text-blue-400" },
                            { label: "Person 2 Commission", value: `₹${parseFloat(result.person2Commission).toLocaleString()}`, valueColor: "text-purple-400" },
                            { label: "Split Ratio", value: `${result.splitPercent}% / ${(100 - result.splitPercent).toFixed(0)}%` },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Sales Commission Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Sales Commission Calculator</strong> helps sales professionals, managers, and business owners calculate commissions accurately. It supports simple percentage-based commissions, tiered structures, and split commissions between multiple people.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're in real estate, car sales, retail, software/SaaS, insurance, or any commission-based role, this calculator provides instant, accurate results. It includes bonus calculations, tiered rate structures, and commission splitting functionality.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your commission structure is crucial for earnings planning and career decisions. Our calculator helps you project earnings, compare different commission structures, and make informed decisions about compensation plans.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Commission Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select <strong className="text-white">commission type</strong> (Simple, Tiered, or Split).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">total sale amount</strong> in ₹.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For Simple: Enter <strong className="text-white">commission rate</strong> and optional <strong className="text-white">bonus</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> For Tiered: Enter <strong className="text-white">tier limits and rates</strong> (up to 3 tiers).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> For Split: Enter <strong className="text-white">commission rate</strong> and <strong className="text-white">split percentage</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">"Calculate Commission"</strong> to see results. Use <strong className="text-white">Reset</strong> to start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Commission Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Accurate Earnings</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly what you'll earn from each sale. Avoid errors and ensure you're getting paid correctly.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Structure Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare different commission structures. See which plan works best for your sales volume and goals.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Goal Setting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Set realistic sales targets. Know how much you need to sell to achieve your income goals.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Professional Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan your finances with confidence. Accurate commission projections help with budgeting and financial decisions.</p>
                    </div>
                </div>
            </section>

            {/* Industry Commission Rates */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Commission Rates by Industry</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400">Industry</th>
                                <th className="text-left py-3 px-4 text-gray-400">Typical Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Commission Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {INDUSTRY_COMMISSION_RATES.map((item, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300 font-medium">{item.industry}</td>
                                    <td className="py-3 px-4 text-yellow-400">{item.typicalRate}</td>
                                    <td className="py-3 px-4 text-gray-400">{item.type}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Rates vary by company, experience level, and region. These are average ranges for reference only.
                    </p>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Commission Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Simple Commission</h3>
                        <p className="text-white font-mono text-sm mb-2">Commission = Sale × Rate ÷ 100</p>
                        <p className="text-gray-500 text-xs">Example: ₹1,00,000 × 10% = ₹10,000</p>
                        <p className="text-gray-500 text-xs mt-1">With Bonus: Commission + Bonus</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Tiered Commission</h3>
                        <p className="text-white font-mono text-sm mb-2">Different rates for different sale levels</p>
                        <p className="text-gray-500 text-xs">Example: 5% on first ₹50,000</p>
                        <p className="text-gray-500 text-xs">7% on next ₹50,000</p>
                        <p className="text-gray-500 text-xs">10% on remaining</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">Split Commission</h3>
                        <p className="text-white font-mono text-sm mb-2">Commission divided by percentage</p>
                        <p className="text-gray-500 text-xs">Total Commission × Split% = Person 1</p>
                        <p className="text-gray-500 text-xs">Total Commission × (100-Split%) = Person 2</p>
                        <p className="text-gray-500 text-xs">Example: 60/40 split</p>
                    </div>
                </div>
            </section>

            {/* Tiered Commission Example */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tiered Commission Example</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        <strong className="text-white">Scenario:</strong> Sales rep earns tiered commission on ₹2,50,000 total sales.
                    </p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 text-sm">Tier 1: First ₹50,000 @ 5%</span>
                            <span className="text-green-400 text-sm">₹2,500</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 text-sm">Tier 2: Next ₹1,00,000 @ 7%</span>
                            <span className="text-green-400 text-sm">₹7,000</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 text-sm">Tier 3: Remaining ₹1,00,000 @ 10%</span>
                            <span className="text-green-400 text-sm">₹10,000</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-white font-semibold">Total Commission</span>
                            <span className="text-yellow-400 font-semibold">₹19,500</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sales Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Tips for Maximizing Your Commission</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Focus on high-margin products:</strong> Products with higher profit margins often pay higher commissions. Understand your company's margin structure.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Build a referral pipeline:</strong> Referrals often lead to higher conversion rates and larger deals. Nurture relationships for repeat business.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Track your numbers:</strong> Monitor your sales metrics regularly. Identify which products and strategies yield the highest commissions.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Negotiate your commission structure:</strong> If you consistently exceed targets, negotiate higher rates or better tier structures.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-orange-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Leverage SPIFFs and bonuses:</strong> Take advantage of special incentives for specific products or targets. These can significantly boost your earnings.</span>
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