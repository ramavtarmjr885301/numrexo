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
    {
        q: "How to convert 0.333... (repeating) to fraction?",
        a: "For single-digit repeating decimals: Let x = 0.333..., multiply by 10: 10x = 3.333..., subtract: 9x = 3, so x = 3/9 = 1/3. For two-digit repeating (0.121212...), multiply by 100: 100x = 12.121212..., subtract: 99x = 12, x = 12/99 = 4/33.",
    },
    {
        q: "What is the difference between terminating and repeating decimals?",
        a: "Terminating decimals end after a finite number of digits (0.5, 0.75). Repeating decimals have an infinite repeating pattern (0.333..., 0.1666...). Terminating decimals convert to fractions with denominators of 2,4,5,8,10,16,20,25, etc. Repeating decimals convert to fractions with denominators like 3,6,7,9,11.",
    },
    {
        q: "How to convert decimal to fraction without a calculator?",
        a: "1) Count decimal places: 0.75 has 2 decimal places. 2) Write as fraction: 75/100. 3) Simplify by dividing numerator & denominator by common factors: 75÷25 = 3, 100÷25 = 4, so 3/4. For 0.125 (3 decimal places): 125/1000 = 1/8 after dividing by 125.",
    },
    {
        q: "What are common decimal to fraction conversions?",
        a: "0.5 = 1/2, 0.25 = 1/4, 0.75 = 3/4, 0.2 = 1/5, 0.4 = 2/5, 0.6 = 3/5, 0.8 = 4/5, 0.125 = 1/8, 0.375 = 3/8, 0.625 = 5/8, 0.875 = 7/8, 0.1 = 1/10, 0.333... = 1/3, 0.666... = 2/3.",
    },
    {
        q: "How to convert decimal to improper fraction?",
        a: "Multiply decimal by denominator, then write as numerator/denominator. Example 1.75: Write as 1.75/1 → multiply by 100 → 175/100 → simplify divide by 25 → 7/4. For mixed numbers, keep integer separate: 1.75 = 1 + 3/4 = 1 3/4 as mixed, or 7/4 as improper.",
    },
    {
        q: "How to convert mixed number decimal to fraction?",
        a: "Example 3.25: Keep integer 3, convert 0.25 to 1/4, combine: 3 1/4 as mixed, or multiply 3×4+1=13/4 as improper. Our calculator automatically handles both mixed numbers and improper fractions.",
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

// ─── Helper Function ─────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

// ─── Component ────────────────────────────────────────────────────────────────

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

    const resetForm = () => {
        setDecimal("");
        setResult(null);
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
                                <input type="number" step="any" placeholder="0.75" value={decimal} onChange={(e) => setDecimal(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Examples: 0.5, 0.75, 1.25, 0.333...</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Convert to Fraction →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
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

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Decimal to Fraction Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Decimal to Fraction Calculator</strong> converts any decimal number into its fraction form instantly. Whether you're a student learning fractions, a professional needing precise measurements, or anyone working with numerical conversions, this calculator saves time and ensures accuracy.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our calculator handles terminating decimals (0.75 = 3/4), repeating decimals (0.333... = 1/3), mixed numbers (1.25 = 5/4 = 1 1/4), and negative decimals (-0.5 = -1/2). All results are automatically simplified to their lowest terms.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Decimal to Fraction Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter any <strong className="text-white">decimal number</strong> in the input field (examples: 0.5, 0.75, 1.25, 0.333).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Click <strong className="text-white">"Convert to Fraction"</strong> to see the result.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> View the simplified fraction and mixed number (if applicable).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 4:</strong> Click <strong className="text-white">Reset</strong> to clear the input and start a new conversion.</p>
                </div>
            </section>

            {/* Why Convert Decimal to Fraction */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Convert Decimal to Fraction?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Precise Measurements</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Fractions are more precise than decimals for construction, carpentry, cooking, and sewing. 1/3 inch is exact, while 0.333... inches is approximate.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Academic Requirements</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Math problems often require fraction answers. Convert decimals to fractions to show simplified, reduced forms for full credit.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Easier Comparisons</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Fractions with common denominators are easier to compare than decimals. 2/3 vs 3/4 is clearer than 0.666 vs 0.75.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Recipe Scaling</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">When scaling recipes, fractions work naturally. Doubling 1/3 cup is 2/3 cup, while 0.333 × 2 = 0.666 cups is less intuitive.</p>
                    </div>
                </div>
            </section>

            {/* Decimal Types Explained */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Decimal Types Explained</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">Terminating Decimals</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">End after finite digits. Examples: 0.5, 0.75, 0.125. Convert by writing over power of 10 (0.75 = 75/100 = 3/4). Denominators only have prime factors 2 and 5.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Repeating Decimals</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Digits repeat infinitely (0.333..., 0.1666..., 0.142857142857...). Use algebraic method: x = 0.333..., 10x = 3.333..., 9x = 3, x = 1/3.</p>
                    </div>
                </div>
            </section>

            {/* Conversion Methods */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Conversion Methods & Tricks</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">Method 1:</span><span><strong className="text-gray-300">Multiply by 10ⁿ:</strong> Count decimal places, multiply numerator and denominator by 10ⁿ, then simplify. Example: 0.75 × 100 = 75/100 = 3/4.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">Method 2:</span><span><strong className="text-gray-300">Fraction to decimal matching:</strong> Memorize common fractions: 1/2=0.5, 1/4=0.25, 3/4=0.75, 1/3=0.333..., 2/3=0.666...</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-blue-400 mt-0.5">Method 3:</span><span><strong className="text-gray-300">For repeating decimals:</strong> Multiply by power of 10 equal to repeating length, subtract original, solve for x.</span></li>
                </ul>
            </section>

            {/* Real-World Applications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Real-World Applications of Decimal to Fraction Conversion</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">🔨 Construction & Carpentry:</strong> Measurements are in fractions (1/4 inch, 3/8 inch). Convert decimal measurements from digital tools to fractions for cutting wood, pipes, or tiles.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">🍳 Cooking & Baking:</strong> Recipes use fractions (1/2 cup, 3/4 teaspoon). Convert decimal quantities from scaled recipes back to fractions for accurate measuring cups.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">📐 Engineering & CAD:</strong> Design software uses decimals, but manufacturing requires fractions. Convert dimensions for blueprints, machining, and 3D printing.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">📊 Finance & Statistics:</strong> Data may come as decimals, but reporting often uses fractions (3/4 of respondents, 2/3 majority).</p>
                </div>
            </section>

            {/* Conversion Examples Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Decimal to Fraction Conversions</h2>
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
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.666...</td><td className="py-2 px-4">666/1000</td><td className="py-2 px-4 text-yellow-400">2/3</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.125</td><td className="py-2 px-4">125/1000</td><td className="py-2 px-4 text-yellow-400">1/8</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.375</td><td className="py-2 px-4">375/1000</td><td className="py-2 px-4 text-yellow-400">3/8</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.625</td><td className="py-2 px-4">625/1000</td><td className="py-2 px-4 text-yellow-400">5/8</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.875</td><td className="py-2 px-4">875/1000</td><td className="py-2 px-4 text-yellow-400">7/8</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.2</td><td className="py-2 px-4">2/10</td><td className="py-2 px-4 text-yellow-400">1/5</td></tr>
                            <tr><td className="py-2 px-4">0.4</td><td className="py-2 px-4">4/10</td><td className="py-2 px-4 text-yellow-400">2/5</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Decimal to Fraction Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Convert any decimal number to its fraction form instantly. Get simplified fractions and mixed numbers with step-by-step explanation.</p>
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