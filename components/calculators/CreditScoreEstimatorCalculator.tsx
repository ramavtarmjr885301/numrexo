"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a credit score estimator?",
        a: "A credit score estimator is a tool that gives you an approximate credit score range based on your financial behavior, payment history, credit utilization, and other factors. It helps you understand where you stand before applying for loans or credit cards.",
    },
    {
        q: "How is credit score calculated?",
        a: "Credit score is calculated using five main factors: Payment History (35%), Credit Utilization (30%), Length of Credit History (15%), Credit Mix (10%), and New Credit Inquiries (10%). Our estimator uses these factors to provide an estimated score range.",
    },
    {
        q: "What is a good credit score?",
        a: "In India, credit scores range from 300 to 900. A score of 750+ is considered excellent and qualifies you for the best interest rates. Scores 700-749 are good, 650-699 are fair, 600-649 are below average, and below 600 is poor.",
    },
    {
        q: "What factors affect credit score the most?",
        a: "Payment history (35%) and credit utilization (30%) are the two most important factors. Making timely payments and keeping credit card balances below 30% of the limit can significantly improve your score.",
    },
    {
        q: "How does credit utilization affect my score?",
        a: "Credit utilization is the percentage of your available credit that you're using. A utilization below 30% is considered good, below 10% is excellent. High utilization indicates credit dependency and lowers your score.",
    },
    {
        q: "What is a CIBIL score?",
        a: "CIBIL score is a 3-digit numeric summary of your credit history, ranging from 300 to 900. It's the most widely used credit score in India, calculated by TransUnion CIBIL based on your credit report data.",
    },
    {
        q: "How does payment history affect credit score?",
        a: "Payment history is the most important factor (35%). Late payments, defaults, and bankruptcies significantly lower your score. A single missed payment can drop your score by 50-100 points.",
    },
    {
        q: "What is the minimum credit score for a home loan?",
        a: "The minimum credit score for a home loan is typically 650-700, depending on the lender. However, a score of 750+ is recommended to get the best interest rates and higher loan amounts.",
    },
    {
        q: "How can I check my credit score for free?",
        a: "You can check your credit score for free through various platforms like CIBIL (once a year), CRIF High Mark, Equifax, and Experian. Many fintech apps also provide free credit score checks.",
    },
    {
        q: "Does checking my credit score lower it?",
        a: "No, checking your own credit score is a soft inquiry and does not affect your score. Only hard inquiries (when a lender checks your score during loan application) can temporarily lower your score by a few points.",
    },
    {
        q: "What is the difference between CIBIL score and credit score?",
        a: "CIBIL score is the credit score provided by TransUnion CIBIL. Credit score is a generic term for any credit rating from any bureau (CIBIL, Experian, Equifax, CRIF). CIBIL is the most commonly used in India.",
    },
    {
        q: "How long does it take to build a credit score?",
        a: "It typically takes 3-6 months of credit activity to generate a credit score. Building a good score (750+) usually takes 12-24 months of consistent on-time payments and responsible credit usage.",
    },
    {
        q: "Can I get a loan with a low credit score?",
        a: "Yes, but you may get higher interest rates and lower loan amounts. Some lenders offer loans to people with scores as low as 600, but at significantly higher rates. Consider improving your score before applying.",
    },
    {
        q: "How does credit mix affect my score?",
        a: "Credit mix (10%) considers the variety of credit accounts you have - secured (home loan, car loan) and unsecured (credit cards, personal loans). A healthy mix of both improves your score.",
    },
    {
        q: "What should I do if my credit score is low?",
        a: "To improve a low credit score: 1) Pay all bills on time, 2) Reduce credit card utilization below 30%, 3) Check for errors in your credit report, 4) Don't close old accounts, 5) Limit new credit applications, 6) Maintain a healthy credit mix.",
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
    name: "Credit Score Estimator – Check Your Credit Score Range",
    description: "Estimate your credit score range with our free calculator. Understand your creditworthiness based on payment history, credit utilization, and other factors.",
    url: "https://www.numrexo.com/finance/credit-score-estimator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Credit score estimation",
        "Score range analysis",
        "Key factors breakdown",
        "Improvement suggestions",
        "Creditworthiness assessment",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Finance Calculators", item: "https://www.numrexo.com/finance" },
        { "@type": "ListItem", position: 3, name: "Credit Score Estimator", item: "https://www.numrexo.com/finance/credit-score-estimator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreditScoreEstimator() {
    const [paymentHistory, setPaymentHistory] = useState("");
    const [creditUtilization, setCreditUtilization] = useState("");
    const [creditHistory, setCreditHistory] = useState("");
    const [creditMix, setCreditMix] = useState("");
    const [newCredit, setNewCredit] = useState("");
    const [existingScore, setExistingScore] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setPaymentHistory("");
        setCreditUtilization("");
        setCreditHistory("");
        setCreditMix("");
        setNewCredit("");
        setExistingScore("");
        setResult(null);
    };

    const estimateScore = () => {
        // Parse inputs
        const ph = parseFloat(paymentHistory);
        const cu = parseFloat(creditUtilization);
        const ch = parseFloat(creditHistory);
        const cm = parseFloat(creditMix);
        const nc = parseFloat(newCredit);
        const existing = parseFloat(existingScore) || 0;

        // Validate inputs
        if (isNaN(ph) || ph < 0 || ph > 100) {
            alert("Please enter a valid payment history score (0-100%)");
            return;
        }

        if (isNaN(cu) || cu < 0 || cu > 100) {
            alert("Please enter a valid credit utilization percentage (0-100%)");
            return;
        }

        if (isNaN(ch) || ch < 0 || ch > 10) {
            alert("Please enter valid credit history years (0-10+)");
            return;
        }

        if (isNaN(cm) || cm < 0 || cm > 100) {
            alert("Please enter a valid credit mix score (0-100%)");
            return;
        }

        if (isNaN(nc) || nc < 0 || nc > 100) {
            alert("Please enter a valid new credit score (0-100%)");
            return;
        }

        // Calculate weighted score (out of 100)
        const paymentScore = ph * 0.35; // 35% weight
        const utilizationScore = (100 - Math.min(cu, 100)) * 0.30; // Lower utilization = better
        const historyScore = Math.min(ch / 10 * 100, 100) * 0.15; // 15% weight
        const mixScore = cm * 0.10; // 10% weight
        const newCreditScore = (100 - Math.min(nc, 100)) * 0.10; // 10% weight

        const totalScore = paymentScore + utilizationScore + historyScore + mixScore + newCreditScore;

        // Convert to CIBIL range (300-900)
        let estimatedScore = 300 + (totalScore / 100) * 600;

        // Adjust based on existing score if provided
        if (existing > 0 && existing >= 300 && existing <= 900) {
            estimatedScore = (estimatedScore * 0.6) + (existing * 0.4);
        }

        // Round to nearest integer
        estimatedScore = Math.round(estimatedScore);

        // Determine score range and rating
        let scoreRange = "";
        let rating = "";
        let ratingColor = "";
        let creditworthiness = "";

        if (estimatedScore >= 750) {
            scoreRange = "750-900";
            rating = "Excellent ★★★★★";
            ratingColor = "text-green-400";
            creditworthiness = "Excellent credit. You'll get the best rates on loans and credit cards. Banks will compete to offer you products.";
        } else if (estimatedScore >= 700) {
            scoreRange = "700-749";
            rating = "Good ★★★★";
            ratingColor = "text-blue-400";
            creditworthiness = "Good credit. You'll get competitive rates on most loans. Some premium products may require higher scores.";
        } else if (estimatedScore >= 650) {
            scoreRange = "650-699";
            rating = "Fair ★★★";
            ratingColor = "text-yellow-400";
            creditworthiness = "Fair credit. You may get loans but at slightly higher rates. Consider improving your score before major loan applications.";
        } else if (estimatedScore >= 600) {
            scoreRange = "600-649";
            rating = "Below Average ★★";
            ratingColor = "text-orange-400";
            creditworthiness = "Below average credit. Loan approval may be difficult with limited options. Focus on building your credit history.";
        } else {
            scoreRange = "Below 600";
            rating = "Poor ★";
            ratingColor = "text-red-400";
            creditworthiness = "Poor credit. Loan approval is challenging. Work on improving your credit score before applying for any credit.";
        }

        // Generate suggestions for improvement
        const suggestions = [];
        if (ph < 90) {
            suggestions.push("🔴 Set up auto-pay for all bills to never miss a payment");
        }
        if (cu > 30) {
            suggestions.push("🔴 Reduce credit card utilization below 30% of your limit");
        }
        if (ch < 3) {
            suggestions.push("🔴 Don't close old credit cards - keep them active to build history");
        }
        if (cm < 60) {
            suggestions.push("🔴 Consider a mix of secured (home loan) and unsecured (credit card) credit");
        }
        if (nc > 50) {
            suggestions.push("🔴 Avoid multiple loan applications in short period - spread them out");
        }
        if (suggestions.length === 0) {
            suggestions.push("✅ You're on the right track! Continue maintaining good credit habits.");
        }

        // Calculate factor breakdown
        const factorBreakdown = {
            paymentHistory: Math.round(paymentScore),
            creditUtilization: Math.round(utilizationScore),
            creditHistory: Math.round(historyScore),
            creditMix: Math.round(mixScore),
            newCredit: Math.round(newCreditScore),
        };

        setResult({
            estimatedScore: estimatedScore,
            scoreRange: scoreRange,
            rating: rating,
            ratingColor: ratingColor,
            creditworthiness: creditworthiness,
            suggestions: suggestions,
            factorBreakdown: factorBreakdown,
            totalScore: Math.round(totalScore),
            paymentHistory: ph,
            creditUtilization: cu,
            creditHistory: ch,
            creditMix: cm,
            newCredit: nc,
            existingScore: existing,
        });
    };

    // Quick preset options
    const paymentOptions = [
        { label: "Excellent (98-100%)", value: 99 },
        { label: "Good (90-97%)", value: 94 },
        { label: "Average (80-89%)", value: 85 },
        { label: "Poor (Below 80%)", value: 70 },
    ];

    const utilizationOptions = [
        { label: "Excellent (0-10%)", value: 5 },
        { label: "Good (11-30%)", value: 20 },
        { label: "Average (31-50%)", value: 40 },
        { label: "Poor (Above 50%)", value: 65 },
    ];

    const historyOptions = [
        { label: "10+ years", value: 10 },
        { label: "5-9 years", value: 7 },
        { label: "2-4 years", value: 3 },
        { label: "Less than 1 year", value: 0.5 },
    ];

    const mixOptions = [
        { label: "Excellent (Mix of both)", value: 90 },
        { label: "Good (Mostly secured)", value: 70 },
        { label: "Average (Mostly unsecured)", value: 50 },
        { label: "Poor (Only one type)", value: 30 },
    ];

    const newCreditOptions = [
        { label: "Excellent (0-1 inquiries)", value: 10 },
        { label: "Good (2-3 inquiries)", value: 30 },
        { label: "Average (4-5 inquiries)", value: 50 },
        { label: "Poor (6+ inquiries)", value: 70 },
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/finance" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Finance Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Credit Score Estimator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <div>
                            <h3 className="font-semibold">Credit Score Estimator</h3>
                            <p className="text-xs text-gray-500 mt-1">Estimate your credit score based on key factors</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Payment History (35%) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Payment History (35% weight)
                                <span className="ml-1 text-gray-500">- On-time payments percentage</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="100"
                                    placeholder="e.g., 95"
                                    value={paymentHistory}
                                    onChange={(e) => setPaymentHistory(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {paymentOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setPaymentHistory(option.value.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                        title={option.label}
                                    >
                                        {option.value}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Credit Utilization (30%) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Credit Utilization (30% weight)
                                <span className="ml-1 text-gray-500">- % of credit used</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="100"
                                    placeholder="e.g., 25"
                                    value={creditUtilization}
                                    onChange={(e) => setCreditUtilization(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {utilizationOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setCreditUtilization(option.value.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                        title={option.label}
                                    >
                                        {option.value}%
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Aim for below 30% for good score</p>
                        </div>

                        {/* Length of Credit History (15%) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Length of Credit History (15% weight)
                                <span className="ml-1 text-gray-500">- Years of credit history</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    max="10"
                                    placeholder="e.g., 5"
                                    value={creditHistory}
                                    onChange={(e) => setCreditHistory(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {historyOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setCreditHistory(option.value.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                        title={option.label}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Credit Mix (10%) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Credit Mix (10% weight)
                                <span className="ml-1 text-gray-500">- Diversity of credit types</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="100"
                                    placeholder="e.g., 70"
                                    value={creditMix}
                                    onChange={(e) => setCreditMix(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {mixOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setCreditMix(option.value.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                        title={option.label}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* New Credit Inquiries (10%) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                New Credit Inquiries (10% weight)
                                <span className="ml-1 text-gray-500">- Recent credit applications</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="100"
                                    placeholder="e.g., 20"
                                    value={newCredit}
                                    onChange={(e) => setNewCredit(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {newCreditOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setNewCredit(option.value.toString())}
                                        className="text-xs px-2 py-0.5 rounded bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                        title={option.label}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">💡 Lower percentage = fewer inquiries = better</p>
                        </div>

                        {/* Existing Score (Optional) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                Existing Score (Optional)
                                <span className="ml-1 text-gray-500">- If you know your score</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1"
                                    min="300"
                                    max="900"
                                    placeholder="e.g., 720"
                                    value={existingScore}
                                    onChange={(e) => setExistingScore(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">score</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Enter your actual CIBIL score for more accurate estimation</p>
                        </div>

                        {/* Buttons - Calculate and Reset side by side */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={estimateScore}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                                Estimate Score →
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
                    title="Estimated Credit Score"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter your credit factors and press Estimate Score"
                    mainResult={result ? {
                        label: "Estimated Score",
                        value: result.estimatedScore,
                        color: result.ratingColor
                    } : undefined}
                    extraRows={result ? [
                        { label: "Score Range", value: result.scoreRange, valueColor: result.ratingColor },
                        { label: "Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Creditworthiness", value: result.creditworthiness, valueColor: "text-gray-400" },
                        { label: "Payment History", value: `${result.paymentHistory}%`, valueColor: result.paymentHistory >= 90 ? "text-green-400" : "text-orange-400" },
                        { label: "Credit Utilization", value: `${result.creditUtilization}%`, valueColor: result.creditUtilization <= 30 ? "text-green-400" : "text-orange-400" },
                        { label: "Credit History", value: `${result.creditHistory} years`, valueColor: result.creditHistory >= 5 ? "text-green-400" : "text-orange-400" },
                        { label: "Credit Mix", value: `${result.creditMix}%`, valueColor: result.creditMix >= 70 ? "text-green-400" : "text-orange-400" },
                        { label: "New Credit Inquiries", value: `${result.newCredit}%`, valueColor: result.newCredit <= 30 ? "text-green-400" : "text-orange-400" },
                        { label: "Factor Breakdown", value: `📊 ${result.factorBreakdown.paymentHistory}/${result.factorBreakdown.creditUtilization}/${result.factorBreakdown.creditHistory}/${result.factorBreakdown.creditMix}/${result.factorBreakdown.newCredit}`, valueColor: "text-gray-400" },
                    ] : []}
                />
            </div>

            {/* Suggestions Section */}
            {result && result.suggestions && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">💡 Suggestions to Improve Your Credit Score</h2>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                        <div className="space-y-2">
                            {result.suggestions.map((suggestion: string, index: number) => (
                                <div key={index} className="flex items-start gap-3 text-sm">
                                    <span className="text-blue-400 mt-0.5">•</span>
                                    <span className={`text-gray-300 ${suggestion.startsWith('✅') ? 'text-green-400' : ''}`}>
                                        {suggestion}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT (1600+ WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Credit Score Estimator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Credit Score Estimator</strong> helps you understand your approximate credit score range based on key financial factors. It uses the same five factors that credit bureaus consider: payment history, credit utilization, length of credit history, credit mix, and new credit inquiries.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Our estimator provides you with an estimated score range, a creditworthiness assessment, and personalized suggestions to improve your score. Whether you're planning to apply for a loan, credit card, or mortgage, knowing your credit score range helps you prepare better.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Remember, this is an estimate based on self-reported information. For an exact score, check your official credit report from CIBIL, Experian, Equifax, or CRIF High Mark.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Credit Score Estimator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">payment history</strong> percentage (how often you pay on time).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">credit utilization</strong> percentage (credit used ÷ total credit limit).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter your <strong className="text-white">length of credit history</strong> in years.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter your <strong className="text-white">credit mix</strong> score (diversity of credit types).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Enter your <strong className="text-white">new credit inquiries</strong> percentage (recent applications).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Optionally enter your <strong className="text-white">existing score</strong> for better accuracy.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 7:</strong> Click <strong className="text-white">"Estimate Score"</strong> to see your results and suggestions.</p>
                </div>
            </section>

            {/* Credit Score Factors */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Five Factors That Affect Your Credit Score</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-red-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">📅 Payment History (35%)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• On-time payments</li>
                            <li>• Late payments (30/60/90 days)</li>
                            <li>• Defaults and collections</li>
                            <li>• Bankruptcy records</li>
                            <li>• Most important factor</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">💳 Credit Utilization (30%)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Credit used ÷ Total limit</li>
                            <li>• Below 30% is good</li>
                            <li>• Below 10% is excellent</li>
                            <li>• High utilization = risk</li>
                            <li>• Second most important</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">📊 Credit History (15%)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Age of oldest account</li>
                            <li>• Average age of accounts</li>
                            <li>• 7+ years = Excellent</li>
                            <li>• Don't close old accounts</li>
                            <li>• Longer history = better</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🏦 Credit Mix (10%)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Secured loans (home, car)</li>
                            <li>• Unsecured loans (personal, CC)</li>
                            <li>• Healthy mix required</li>
                            <li>• Both types improve score</li>
                            <li>• Diversity is good</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">🆕 New Credit (10%)</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Hard inquiries</li>
                            <li>• Recent applications</li>
                            <li>• Too many = risk</li>
                            <li>• Multiple inquiries lower score</li>
                            <li>• Space out applications</li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">⚡ Quick Tips</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Pay all bills on time</li>
                            <li>• Keep utilization below 30%</li>
                            <li>• Don't close old cards</li>
                            <li>• Check credit report yearly</li>
                            <li>• Limit new applications</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Credit Score Range Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Credit Score Range Guide</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Score Range</th>
                                <th className="text-left py-3 px-4 text-gray-400">Rating</th>
                                <th className="text-left py-3 px-4 text-gray-400">What It Means</th>
                                <th className="text-left py-3 px-4 text-gray-400">Recommended</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">750-900</td>
                                <td className="py-2 px-4 text-green-400">Excellent ★★★★★</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Best rates on loans & credit cards</td>
                                <td className="py-2 px-4 text-green-400 text-xs">✅ Keep maintaining</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">700-749</td>
                                <td className="py-2 px-4 text-blue-400">Good ★★★★</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Competitive rates on most loans</td>
                                <td className="py-2 px-4 text-blue-400 text-xs">✅ Good to apply</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">650-699</td>
                                <td className="py-2 px-4 text-yellow-400">Fair ★★★</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Higher rates, limited options</td>
                                <td className="py-2 px-4 text-yellow-400 text-xs">⚠️ Improve before applying</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">600-649</td>
                                <td className="py-2 px-4 text-orange-400">Below Average ★★</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Difficult approval, high rates</td>
                                <td className="py-2 px-4 text-orange-400 text-xs">🔴 Build credit first</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">Below 600</td>
                                <td className="py-2 px-4 text-red-400">Poor ★</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Very limited options</td>
                                <td className="py-2 px-4 text-red-400 text-xs">🔴 Urgent improvement needed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Based on CIBIL/Indian credit bureau scoring system</p>
            </section>

            {/* Tips to Improve Score */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Practical Tips to Improve Your Credit Score</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Set Up Automatic Payments:</strong> Never miss a payment by setting up auto-debit for all your loan and credit card payments.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Keep Balances Low:</strong> Maintain credit card balances below 30% of your limit. Below 10% is even better for your score.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Don't Close Old Accounts:</strong> Keep your oldest credit cards active as they contribute to your credit history length.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check Credit Report Regularly:</strong> Review your credit report yearly for errors. Dispute any incorrect information immediately.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Limit Credit Applications:</strong> Space out your credit applications. Too many hard inquiries in short period can lower your score.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Maintain Credit Mix:</strong> A healthy mix of secured (home loan) and unsecured (credit card) credit improves your score.</span>
                    </li>
                </ul>
            </section>

            {/* Common Mistakes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Common Mistakes That Lower Your Credit Score</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Late or Missed Payments:</strong> Even a single late payment can drop your score by 50-100 points. Set reminders or auto-pay.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Maxing Out Credit Cards:</strong> Using more than 30% of your credit limit indicates credit dependency and lowers your score.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Closing Old Accounts:</strong> Closing old credit cards shortens your credit history and can lower your score.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Multiple Loan Applications:</strong> Too many hard inquiries in a short period signals financial stress and lowers your score.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Ignoring Credit Report Errors:</strong> Errors in your credit report can lower your score. Check and dispute errors regularly.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <span><strong className="text-gray-300">Only Using One Type of Credit:</strong> Having only credit cards or only loans can limit your credit mix and reduce your score.</span>
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