"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to convert decimal to fraction?",
        a: "Write the decimal divided by 1, then multiply numerator and denominator by 10 for every number after decimal point. Simplify the fraction. Example: 0.75 = 75/100 = 3/4. For repeating decimals, use a different method or our calculator.",
    },
    {
        q: "How to convert repeating decimal to fraction?",
        a: "For 0.333... (1/3): Let x = 0.333..., multiply by 10: 10x = 3.333..., subtract: 9x = 3, so x = 3/9 = 1/3. For 0.1666... (1/6): x = 0.1666..., 10x = 1.666..., 100x = 16.666..., subtract: 90x = 15, x = 15/90 = 1/6.",
    },
    {
        q: "What is a terminating decimal?",
        a: "A terminating decimal has a finite number of digits. Example: 0.5, 0.75, 0.125. These decimals can be written as fractions with denominators that are powers of 2 and/or 5. 0.125 = 1/8, 0.2 = 1/5.",
    },
    {
        q: "What is a repeating decimal?",
        a: "A repeating decimal has digits that repeat infinitely. Example: 0.333... (1/3), 0.666... (2/3), 0.1666... (1/6). Repeating decimals occur when the denominator has prime factors other than 2 and 5.",
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
    name: "Decimal to Fraction Calculator – Convert Decimal to Fraction",
    description: "Convert any decimal to a fraction. Get simplified fractions with step-by-step explanation.",
    url: "https://www.numrexo.com/math/decimal-to-fraction-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Decimal to fraction conversion", "Simplified fractions", "Mixed numbers", "Step-by-step"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Decimal to Fraction Calculator", item: "https://www.numrexo.com/math/decimal-to-fraction-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

export default function DecimalToFractionCalculator() {
    const [decimal, setDecimal] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        let d = parseFloat(decimal);

        if (isNaN(d)) {
            alert("Please enter a valid decimal number");
            return;
        }

        // Handle negative numbers
        const isNegative = d < 0;
        d = Math.abs(d);

        // Split into integer and decimal parts
        const integerPart = Math.floor(d);
        const decimalPart = d - integerPart;

        if (decimalPart === 0) {
            setResult({
                fraction: isNegative ? `-${integerPart}` : `${integerPart}`,
                numerator: integerPart,
                denominator: 1,
                mixedNumber: isNegative ? `-${integerPart}` : `${integerPart}`,
                isWhole: true,
            });
            return;
        }

        // Convert decimal to fraction
        const decimalStr = decimalPart.toString();
        const decimalLength = decimalStr.split('.')[1]?.length || 0;
        const denominator = Math.pow(10, decimalLength);
        let numerator = Math.round(decimalPart * denominator);

        // Simplify
        const divisor = gcd(numerator, denominator);
        numerator /= divisor;
        let denominatorSimplified = denominator / divisor;

        // Combine with integer part
        const totalNumerator = (integerPart * denominatorSimplified) + numerator;

        // Apply negative sign
        const finalNumerator = isNegative ? -totalNumerator : totalNumerator;
        const finalDenominator = denominatorSimplified;

        // Create mixed number
        let mixedNumber = "";
        if (integerPart > 0) {
            mixedNumber = `${isNegative ? "-" : ""}${integerPart} ${numerator}/${denominatorSimplified}`;
        } else {
            mixedNumber = `${isNegative ? "-" : ""}${numerator}/${denominatorSimplified}`;
        }

        setResult({
            fraction: `${finalNumerator}/${finalDenominator}`,
            simplified: `${totalNumerator}/${denominatorSimplified}`,
            mixedNumber,
            numerator: totalNumerator,
            denominator: finalDenominator,
            decimal: d,
            isNegative,
            integerPart,
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Decimal to Fraction Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Decimal to Fraction Converter</h3>
                        <p className="text-xs text-gray-500 mt-1">Convert any decimal number to a fraction</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Enter Decimal Number</label>
                            <div className="relative">
                                <input type="number" step="any" placeholder="0.75" value={decimal} onChange={(e) => setDecimal(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Examples: 0.5, 0.75, 1.25, 0.333...</p>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Convert to Fraction →</button>
                    </div>
                </div>

                <ResultBox
                    title="Fraction Result"
                    isEmpty={!result}
                    emptyIcon="➗"
                    emptyText="Enter a decimal number and press Convert"
                    mainResult={result ? { label: "Fraction", value: result.simplified, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Mixed Number", value: result.mixedNumber },
                        { label: "Decimal Entered", value: result.decimal },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Decimal to Fraction Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Convert any decimal number to its fraction form instantly. Get simplified fractions and mixed numbers with step-by-step explanation.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Conversion Examples</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Decimal</th>
                                <th className="text-left py-3 px-4 text-gray-400">Fraction</th>
                                <th className="text-left py-3 px-4 text-gray-400">Simplified</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.5</td><td className="py-2 px-4">5/10</td><td className="py-2 px-4 text-yellow-400">1/2</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.75</td><td className="py-2 px-4">75/100</td><td className="py-2 px-4 text-yellow-400">3/4</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.333...</td><td className="py-2 px-4">333/1000</td><td className="py-2 px-4 text-yellow-400">1/3</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1.25</td><td className="py-2 px-4">125/100</td><td className="py-2 px-4 text-yellow-400">5/4 = 1 1/4</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div>
            </section>
        </>
    );
}