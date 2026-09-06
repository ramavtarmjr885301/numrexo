"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is break-even point and why is it important?",
        a: "The break-even point is when your total revenue equals total costs — you're not making profit or loss. It tells you how many units you need to sell or how much revenue you need to generate to cover all costs. Every sale beyond break-even is pure profit. It's crucial for pricing decisions and business planning.",
    },
    {
        q: "How to calculate break-even point in units?",
        a: "Break-even (units) = Fixed Costs ÷ (Selling Price - Variable Cost per unit). Example: Fixed costs ₹1,00,000, selling price ₹500, variable cost ₹300 → Contribution = ₹200 → Break-even = 1,00,000 ÷ 200 = 500 units.",
    },
    {
        q: "How to calculate break-even point in revenue?",
        a: "Break-even (revenue) = Fixed Costs ÷ Contribution Margin Ratio. Contribution Margin Ratio = (Selling Price - Variable Cost) ÷ Selling Price × 100. Example: Fixed costs ₹1,00,000, margin 40% → Break-even revenue = ₹2,50,000.",
    },
    {
        q: "What is contribution margin?",
        a: "Contribution margin is the amount from each sale that contributes to covering fixed costs and generating profit. Formula: Contribution = Selling Price - Variable Cost. Example: Product sells for ₹1,000, variable cost ₹600 → Contribution ₹400 per unit. Higher contribution means fewer units needed to break even.",
    },
    {
        q: "What is the difference between fixed and variable costs?",
        a: "Fixed costs don't change with production volume (rent, salaries, insurance, loan payments). Variable costs change with production volume (raw materials, packaging, shipping, sales commissions). Understanding both is essential for break-even analysis.",
    },
    {
        q: "How to lower my break-even point?",
        a: "Three ways: 1) Reduce fixed costs (negotiate rent, cut overhead), 2) Reduce variable costs (find cheaper suppliers), 3) Increase selling price (if market allows). Lower break-even means you reach profitability faster and reduce business risk.",
    },
];

const BREAK_EVEN_EXAMPLES = [
    { business: "Coffee Shop", fixedCosts: "₹2,00,000", pricePerUnit: "₹150", variableCost: "₹50", breakEven: "2,000 cups" },
    { business: "T-Shirt Brand", fixedCosts: "₹50,000", pricePerUnit: "₹500", variableCost: "₹200", breakEven: "167 shirts" },
    { business: "Software SaaS", fixedCosts: "₹5,00,000", pricePerUnit: "₹1,000", variableCost: "₹100", breakEven: "556 customers" },
    { business: "Restaurant", fixedCosts: "₹3,00,000", pricePerUnit: "₹400", variableCost: "₹150", breakEven: "1,200 meals" },
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
    name: "Break-even Calculator – Break-even Point Calculator",
    description: "Calculate your business break-even point in units and revenue. Determine how many sales needed to cover costs.",
    url: "https://numrexo.com/business/break-even-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Break-even units", "Break-even revenue", "Contribution margin", "Profit analysis"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Business Calculators", item: "https://numrexo.com/business" },
        { "@type": "ListItem", position: 3, name: "Break-even Calculator", item: "https://numrexo.com/business/break-even-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function BreakEvenCalculator() {
    const [calcType, setCalcType] = useState<"units" | "revenue">("units");
    const [fixedCosts, setFixedCosts] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [variableCost, setVariableCost] = useState("");
    const [contributionMargin, setContributionMargin] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const fixed = parseFloat(fixedCosts);

        if (!fixed || fixed <= 0) {
            alert("Please enter valid fixed costs");
            return;
        }

        let breakEvenUnits = null;
        let breakEvenRevenue = null;
        let margin = null;
        let marginPercent = null;

        if (calcType === "units") {
            const price = parseFloat(sellingPrice);
            const variable = parseFloat(variableCost);

            if (!price || !variable || price <= 0 || variable <= 0) {
                alert("Please enter valid selling price and variable cost");
                return;
            }

            if (price <= variable) {
                alert("Selling price must be greater than variable cost to break even");
                return;
            }

            const contribution = price - variable;
            marginPercent = (contribution / price) * 100;
            breakEvenUnits = Math.ceil(fixed / contribution);
            breakEvenRevenue = breakEvenUnits * price;
            margin = contribution;

            setResult({
                breakEvenUnits,
                breakEvenRevenue: breakEvenRevenue.toFixed(2),
                contribution: contribution.toFixed(2),
                marginPercent: marginPercent.toFixed(1),
                fixedCosts: fixed.toFixed(2),
                price: price.toFixed(2),
                variableCost: variable.toFixed(2),
                calcType: "units",
            });
        } else {
            const marginRate = parseFloat(contributionMargin);

            if (!marginRate || marginRate <= 0 || marginRate >= 100) {
                alert("Please enter a valid contribution margin percentage (1-99%)");
                return;
            }

            breakEvenRevenue = fixed / (marginRate / 100);
            marginPercent = marginRate;
            const price = 100;
            const contribution = price * (marginRate / 100);
            const variable = price - contribution;
            breakEvenUnits = Math.ceil(fixed / contribution);

            setResult({
                breakEvenUnits,
                breakEvenRevenue: breakEvenRevenue.toFixed(2),
                contribution: contribution.toFixed(2),
                marginPercent: marginPercent.toFixed(1),
                fixedCosts: fixed.toFixed(2),
                impliedPrice: price,
                impliedVariableCost: variable.toFixed(2),
                calcType: "revenue",
            });
        }
    };

    const resetForm = () => {
        setCalcType("units");
        setFixedCosts("");
        setSellingPrice("");
        setVariableCost("");
        setContributionMargin("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/business" itemProp="item" className="hover:text-gray-300">Business Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Break-even Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Break-even Analysis</h3>
                        <p className="text-xs text-gray-500 mt-1">Find out when your business becomes profitable</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Method</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "units" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("units")}
                                >
                                    By Units (Price + Cost)
                                </button>
                                <button
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${calcType === "revenue" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`}
                                    onClick={() => setCalcType("revenue")}
                                >
                                    By Revenue (Margin %)
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Total Fixed Costs (₹)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="100000"
                                    value={fixedCosts}
                                    onChange={(e) => setFixedCosts(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Rent, salaries, insurance, loan payments, etc.</p>
                        </div>

                        {calcType === "units" ? (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Selling Price per Unit (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="500"
                                            value={sellingPrice}
                                            onChange={(e) => setSellingPrice(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Variable Cost per Unit (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="300"
                                            value={variableCost}
                                            onChange={(e) => setVariableCost(e.target.value)}
                                            className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Raw materials, packaging, shipping, commissions</p>
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Contribution Margin (%)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="40"
                                        step="1"
                                        value={contributionMargin}
                                        onChange={(e) => setContributionMargin(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">(Selling Price - Variable Cost) ÷ Selling Price × 100</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Break-even →
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
                    title="Break-even Analysis"
                    isEmpty={!result}
                    emptyIcon="⚖️"
                    emptyText="Enter your business details and press Calculate"
                    mainResult={result ? {
                        label: "Break-even Point",
                        value: result.calcType === "units"
                            ? `${result.breakEvenUnits} units`
                            : `₹${parseInt(result.breakEvenRevenue).toLocaleString()}`,
                        color: "text-purple-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Break-even Revenue", value: `₹${parseInt(result.breakEvenRevenue).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "Contribution Margin", value: `${result.marginPercent}%` },
                        { label: "Contribution per Unit", value: `₹${result.contribution}` },
                        { label: "Fixed Costs", value: `₹${parseInt(result.fixedCosts).toLocaleString()}` },
                        ...(result.calcType === "units" ? [
                            { label: "Selling Price", value: `₹${result.price}` },
                            { label: "Variable Cost", value: `₹${result.variableCost}` },
                        ] : [
                            { label: "Break-even Units", value: `${result.breakEvenUnits} units` },
                        ]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1200 WORDS) ─── */}

            {/* About Section - Expanded */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Break-even Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Break-even Calculator</strong> is an essential financial tool for entrepreneurs, small business owners, startups, and financial analysts. It helps you determine the exact point where your business becomes profitable — the moment when total revenue equals total costs.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Whether you're launching a new product, starting a business, expanding operations, or evaluating an investment, knowing your break-even point is critical for informed decision-making. This calculator works for any business type: retail stores, restaurants, manufacturing units, service providers, e-commerce brands, SaaS companies, freelancers, and more.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our break-even analyzer supports two calculation methods: <strong className="text-gray-300">By Units</strong> (using price and cost per unit) and <strong className="text-gray-300">By Revenue</strong> (using contribution margin percentage). Both methods give you a clear picture of your business's financial viability and help you set realistic sales targets.
                </p>
            </section>

            {/* How to Use Section - New */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Break-even Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Choose your calculation method — "By Units" if you know your selling price and variable cost per unit, or "By Revenue" if you know your contribution margin percentage.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your total fixed costs — these are expenses that don't change with production volume (rent, salaries, insurance, loan payments, utilities).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> If using "By Units", enter your selling price per unit and variable cost per unit (raw materials, packaging, shipping, commissions).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> If using "By Revenue", enter your contribution margin percentage — the portion of each sale that covers fixed costs after variable costs.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click "Calculate Break-even" to see your results, including break-even units, break-even revenue, contribution margin, and profit analysis.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the Reset button to clear all inputs and start a new analysis for different scenarios.</p>
                </div>
            </section>

            {/* Benefits of Break-even Analysis - New */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Benefits of Break-even Analysis for Your Business</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Pricing Strategy</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Determine the minimum price you need to charge to cover costs and achieve profitability. Test different price points to see how they affect your break-even point.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Sales Target Setting</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Set realistic monthly and annual sales targets based on your break-even analysis. Know exactly how many units you need to sell to avoid losses.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Cost Management</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Identify areas where you can reduce fixed or variable costs to lower your break-even point and reach profitability faster.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Risk Assessment</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Evaluate the financial viability of new products, business expansions, or investments before committing resources.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Investor Confidence</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Present clear break-even analysis to investors or lenders showing when your business will become profitable and how their investment will be repaid.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">✓ Performance Tracking</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare actual sales against break-even targets to track business performance and make timely adjustments.</p>
                    </div>
                </div>
            </section>

            {/* Strategies to Lower Break-even Point - New */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">5 Strategies to Lower Your Break-even Point</h2>
                <div className="space-y-3">
                    <div className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5 font-bold">1.</span>
                        <span><strong className="text-gray-300">Reduce Fixed Costs:</strong> Negotiate lower rent, outsource non-core functions, reduce staff overhead, switch to cheaper software alternatives, cut unnecessary subscriptions, and optimize energy usage. Every ₹1,000 reduction in fixed costs lowers your break-even point by ₹1,000 divided by contribution margin.</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5 font-bold">2.</span>
                        <span><strong className="text-gray-300">Lower Variable Costs:</strong> Find cheaper suppliers, buy in bulk for discounts, improve production efficiency, reduce packaging costs, negotiate shipping rates, and minimize waste. Lower variable costs increase your contribution margin per unit.</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5 font-bold">3.</span>
                        <span><strong className="text-gray-300">Increase Selling Price:</strong> Add value through better packaging, premium branding, bundle offers, or improved customer service to justify higher prices. Even a small price increase significantly lowers break-even units.</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5 font-bold">4.</span>
                        <span><strong className="text-gray-300">Improve Product Mix:</strong> Focus on selling higher-margin products or services. A product with 60% contribution margin reaches break-even much faster than one with 20% margin.</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-400">
                        <span className="text-green-400 mt-0.5 font-bold">5.</span>
                        <span><strong className="text-gray-300">Increase Sales Volume:</strong> Once you break even, every additional sale directly adds to profit. Use marketing, referrals, promotions, and upselling to drive volume.</span>
                    </div>
                </div>
            </section>

            {/* Real-World Applications - New */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications of Break-even Analysis</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Restaurant Owners:</strong> Calculate how many meals you need to serve daily to cover rent, staff salaries, utilities, and ingredient costs. A restaurant with ₹3,00,000 fixed costs, ₹400 average meal price, and ₹150 variable cost needs 1,200 meals to break even.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">E-commerce Brands:</strong> Determine how many products you must sell monthly to cover website hosting, marketing, inventory storage, and payment gateway fees. Break-even analysis helps plan ad spend and discount strategies.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">SaaS Companies:</strong> Calculate how many customers at ₹1,000/month are needed to cover development costs, server expenses, customer support, and sales team salaries. This guides pricing and customer acquisition goals.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Freelancers & Consultants:</strong> Determine how many billable hours or projects per month are needed to cover business expenses, software subscriptions, marketing, and personal salary requirements.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Manufacturing Units:</strong> Calculate production volume needed to cover machinery costs, factory rent, labor, and raw materials before turning a profit on each additional unit.</p>
                </div>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Break-even Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Break-even in Units</h3>
                        <p className="text-white font-mono text-sm mb-2">BE (units) = Fixed Costs ÷ (Price - Variable Cost)</p>
                        <p className="text-gray-500 text-xs">Example: ₹1,00,000 ÷ ₹200 = 500 units</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Break-even in Revenue</h3>
                        <p className="text-white font-mono text-sm mb-2">BE (₹) = Fixed Costs ÷ Contribution Margin Ratio</p>
                        <p className="text-gray-500 text-xs">Example: ₹1,00,000 ÷ 40% = ₹2,50,000</p>
                    </div>
                </div>
            </section>

            {/* Break-even Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Break-even Examples by Business Type</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Business Type</th>
                                <th className="text-left py-3 px-4 text-gray-400">Fixed Costs</th>
                                <th className="text-left py-3 px-4 text-gray-400">Price</th>
                                <th className="text-left py-3 px-4 text-gray-400">Variable Cost</th>
                                <th className="text-left py-3 px-4 text-gray-400">Break-even</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BREAK_EVEN_EXAMPLES.map((row, i) => (
                                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                                    <td className="py-3 px-4 text-gray-300">{row.business}</td>
                                    <td className="py-3 px-4 text-yellow-400">{row.fixedCosts}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.pricePerUnit}</td>
                                    <td className="py-3 px-4 text-gray-400">{row.variableCost}</td>
                                    <td className="py-3 px-4 text-green-400">{row.breakEven}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Limitations Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Important Things to Know About Break-even Analysis</h2>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Assumes costs are linear</strong> — In reality, fixed costs can change with scale (bulk discounts, overtime wages) and variable costs may decrease with volume discounts. Use break-even as a guideline, not an absolute prediction.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Doesn't include taxes or interest</strong> — For complete profit analysis, consider GST/VAT, income tax, corporate tax, and financing costs separately from break-even calculations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Use for one product at a time</strong> — For businesses with multiple products, calculate weighted average contribution margin across all products. Each product may have different price, cost, and margin profiles.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Regularly update your numbers</strong> — Costs and market conditions change over time. Recalculate break-even quarterly or when you make significant changes to pricing, costs, or operations.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><strong className="text-gray-300">Not a substitute for cash flow analysis</strong> — Break-even focuses on profitability, but businesses also need positive cash flow. Profit doesn't always equal cash in the bank, especially with payment terms and inventory.</span>
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