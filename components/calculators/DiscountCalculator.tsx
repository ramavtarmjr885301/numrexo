// components/calculators/DiscountCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How do I calculate the discounted price?",
        a: "Discounted Price = Original Price × (1 - Discount% ÷ 100). Example: ₹1000 with 20% off = ₹1000 × 0.8 = ₹800. You save ₹200.",
    },
    {
        q: "What is the difference between percentage off and fixed amount off?",
        a: "Percentage off reduces price by a percentage (e.g., 20% off). Fixed amount off reduces price by a specific amount (e.g., ₹200 off). Percentage off is better for higher-priced items, fixed amount off for lower-priced items.",
    },
    {
        q: "How to calculate the original price from discounted price?",
        a: "Original Price = Discounted Price ÷ (1 - Discount%). Example: ₹800 at 20% off = ₹800 ÷ 0.8 = ₹1000. Use our 'Reverse Discount' mode to calculate.",
    },
    {
        q: "What is a good discount percentage for sales?",
        a: "Typical sale discounts: Clearance (40-70%), Seasonal (20-40%), Flash sales (30-50%), Bundle deals (10-20%). The average discount during major sales (Black Friday) is 30-40%.",
    },
    {
        q: "What is the difference between discount and markup?",
        a: "Discount reduces price from original (selling price). Markup adds to cost price to get selling price. Example: ₹1000 product with 20% discount = ₹800. ₹800 product with 25% markup = ₹1000. Different calculations give different results.",
    },
    {
        q: "How to calculate the original price after discount?",
        a: "Original Price = Discounted Price ÷ (1 - Discount%). Example: You paid ₹800 with 20% discount. Original = ₹800 ÷ 0.8 = ₹1000. Works for both percentage and fixed discounts (convert fixed to % first).",
    },
    {
        q: "What is the average discount during sale seasons?",
        a: "Average discounts: Black Friday/Cyber Monday (30-40%), End of Season (20-50%), Diwali Sale (20-40%), Christmas Sale (25-35%), Republic Day (20-30%), Amazon/Flipkart Big Days (40-60% on select items).",
    },
    {
        q: "How to calculate multiple discounts (stacking)?",
        a: "Apply discounts sequentially, not add percentages. Example: ₹1000 with 20% off = ₹800, then additional 10% off = ₹720. Total discount = 28%, not 30%. Use our stacking calculator mode for accurate results.",
    },
    {
        q: "What is the buy-one-get-one discount equivalent?",
        a: "BOGO (Buy One Get One Free) = 50% discount if items are same price. BOGO 50% off = 25% overall discount. BOGO with buy 2 get 1 free = 33.33% discount. Use this to compare with percentage discounts.",
    },
    {
        q: "How to calculate bulk purchase discounts?",
        a: "Bulk discounts usually follow tiered pricing: 10+ units = 5% off, 25+ = 10% off, 50+ = 15% off, 100+ = 20% off. Calculate savings per unit: Larger quantities may have lower per-unit cost but check if you really need that many.",
    },
];

const DISCOUNT_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discount Calculator – Sale Price Calculator",
    description: "Calculate discounted prices, savings, and final price after percentage or fixed discounts. Perfect for shopping and sales.",
    url: "https://numrexo.com/business/discount-calculator",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const price = parseFloat(originalPrice);
        const discount = parseFloat(discountValue);

        if (!price || isNaN(price) || price <= 0) {
            alert("Please enter a valid original price");
            return;
        }

        if (!discount || isNaN(discount) || discount <= 0) {
            alert("Please enter a valid discount value");
            return;
        }

        let finalPrice, savings, discountPercent;

        if (discountType === "percentage") {
            if (discount > 100) {
                alert("Discount percentage cannot exceed 100%");
                return;
            }
            discountPercent = discount;
            savings = price * (discount / 100);
            finalPrice = price - savings;
        } else {
            if (discount > price) {
                alert("Discount amount cannot exceed original price");
                return;
            }
            savings = discount;
            finalPrice = price - discount;
            discountPercent = (discount / price) * 100;
        }

        setResult({
            originalPrice: price.toLocaleString("en-IN"),
            finalPrice: finalPrice.toLocaleString("en-IN"),
            savings: savings.toLocaleString("en-IN"),
            discountPercent: discountPercent.toFixed(1),
            discountType: discountType === "percentage" ? `${discountValue}% off` : `₹${discountValue} off`,
        });
    };

    const resetForm = () => {
        setOriginalPrice("");
        setDiscountType("percentage");
        setDiscountValue("");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: DISCOUNT_SCHEMA }} />

            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/calculators" className="hover:text-gray-300">Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Discount Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Sale Price Calculator</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Original Price</label>
                            <div className="relative">
                                <input type="number" placeholder="1000" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Discount Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${discountType === "percentage" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setDiscountType("percentage")}>Percentage (%)</button>
                                <button className={`py-2 rounded-lg text-sm font-medium transition-all ${discountType === "fixed" ? "bg-green-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setDiscountType("fixed")}>Fixed Amount (₹)</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">{discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}</label>
                            <div className="relative">
                                <input type="number" placeholder={discountType === "percentage" ? "20" : "200"} value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{discountType === "percentage" ? "%" : "₹"}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">Calculate Discount →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Discount Results"
                    isEmpty={!result}
                    emptyIcon="🏷️"
                    emptyText="Enter price and discount to calculate savings"
                    mainResult={result ? { label: "Final Price", value: `₹${result.finalPrice}`, color: "text-green-400" } : undefined}
                    extraRows={result ? [
                        { label: "Original Price", value: `₹${result.originalPrice}` },
                        { label: "You Save", value: `₹${result.savings}`, valueColor: "text-green-400" },
                        { label: "Discount Applied", value: result.discountType },
                        { label: "Effective Discount", value: `${result.discountPercent}%` },
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Discount Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Discount Calculator</strong> helps shoppers, business owners, and deal hunters calculate final prices after discounts instantly. Whether you're shopping online during a sale, comparing deals, or setting prices for your products, get accurate results in seconds.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Calculate both percentage discounts (20% off) and fixed amount discounts (₹200 off). See exactly how much you save and the effective discount percentage. Perfect for Black Friday, Diwali sales, End of Season sales, and everyday shopping.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Discount Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">original price</strong> of the product.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select <strong className="text-white">discount type</strong> — Percentage (%) or Fixed Amount (₹).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter the <strong className="text-white">discount value</strong> (e.g., 20 for 20% off, or 200 for ₹200 off).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Discount"</strong> to see final price and savings.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use <strong className="text-white">Reset</strong> to clear all fields and calculate a new discount.</p>
                </div>
            </section>

            {/* Why Use Discount Calculator */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Discount Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Smart Shopping</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Never overpay! Instantly calculate final price before checking out. Compare deals across different stores to find the best value.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Budget Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much you'll spend during sales. Plan your shopping budget with accurate discounted prices, not just MRP.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Business Pricing</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Set sale prices for your products. Calculate profit margins after discounts. Plan promotional campaigns effectively.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Deal Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare percentage discounts vs fixed amount discounts. Which saves you more? ₹200 off vs 15% off on ₹1500 product? Our calculator tells you.</p>
                    </div>
                </div>
            </section>

            {/* Discount Types Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Discount Types Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Percentage Discount (%)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Reduces price by a percentage (e.g., 20% off). Best for: High-priced items (electronics, appliances, furniture). Savings increase with price. Example: ₹1000 product with 20% off = ₹800 savings.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">Fixed Amount Discount (₹)</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Reduces price by specific amount (e.g., ₹200 off). Best for: Low-priced items (grocery, cosmetics, books). Example: ₹500 product with ₹200 off = 40% effective discount, better than 20% off.</p>
                    </div>
                </div>
            </section>

            {/* Shopping Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Shopping Tips & Tricks</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">💡</span><span><strong className="text-gray-300">Wait for Sales:</strong> Major sales (Black Friday, Diwali, End of Season) offer 40-70% discounts. Save big by timing your purchases.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">💡</span><span><strong className="text-gray-300">Stack Coupons:</strong> Store discount + coupon code + cashback = maximum savings. Calculate final price after all discounts applied.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">💡</span><span><strong className="text-gray-300">Check Unit Price:</strong> Larger packages aren't always cheaper per unit. Bulk discount vs smaller package - calculate before buying.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-orange-400 mt-0.5">💡</span><span><strong className="text-gray-300">Sign up for Alerts:</strong> Many stores give 10-15% off coupon just for joining email list. Use with sale discounts.</span></li>
                </ul>
            </section>

            {/* Seasonal Discount Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Seasonal Discount Guide (India)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Sale Event</th><th className="text-left py-3 px-4 text-gray-400">Typical Discount</th><th className="text-left py-3 px-4 text-gray-400">Best For</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Diwali Sale</td><td className="py-2 px-4 text-yellow-400">20-40%</td><td className="py-2 px-4">Electronics, Appliances, Gold</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Amazon/Flipkart Big Days</td><td className="py-2 px-4 text-yellow-400">40-60%</td><td className="py-2 px-4">Electronics, Fashion, Mobiles</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">End of Season Sale</td><td className="py-2 px-4 text-yellow-400">30-50%</td><td className="py-2 px-4">Clothing, Footwear</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Republic Day Sale</td><td className="py-2 px-4 text-yellow-400">20-30%</td><td className="py-2 px-4">Consumer Durables</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">New Year Sale</td><td className="py-2 px-4 text-yellow-400">30-50%</td><td className="py-2 px-4">Fashion, Accessories</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Discount Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Discount Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">Final Price = Original Price × (1 - Discount % ÷ 100)</p>
                    <p className="text-gray-500 text-xs">Example: ₹1000 with 20% off = ₹1000 × 0.8 = ₹800</p>
                    <p className="text-white font-mono text-sm mt-3">Savings = Original Price - Final Price</p>
                    <p className="text-gray-500 text-xs">Example: ₹1000 - ₹800 = ₹200 saved</p>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Discount Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Calculate sale prices instantly! Our discount calculator helps you find the final price after any percentage off or fixed amount discount. Perfect for shopping, sales, and budgeting.</p>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}