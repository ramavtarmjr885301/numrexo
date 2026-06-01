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
];

const DISCOUNT_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discount Calculator – Sale Price Calculator",
    description: "Calculate discounted prices, savings, and final price after percentage or fixed discounts. Perfect for shopping and sales.",
    url: "https://www.numrexo.com/business/discount-calculator",
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
                                <input type="number" placeholder="1000" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
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
                                <input type="number" placeholder={discountType === "percentage" ? "20" : "200"} value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{discountType === "percentage" ? "%" : "₹"}</span>
                            </div>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all">Calculate Discount →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Discount Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate sale prices instantly! Our discount calculator helps you find the final price after any percentage off or fixed amount discount. Perfect for shopping, sales, and budgeting.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Discount Formula</h2><div className="bg-[#111827] border border-gray-800 rounded-xl p-5"><p className="text-white font-mono text-sm mb-2">Final Price = Original Price × (1 - Discount % ÷ 100)</p><p className="text-gray-500 text-xs">Example: ₹1000 with 20% off = ₹1000 × 0.8 = ₹800</p></div></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2><div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div></section>
        </>
    );
}