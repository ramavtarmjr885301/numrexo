"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is mean in statistics?",
        a: "Mean is the average of all numbers. Formula: sum of all numbers ÷ count of numbers. Example: 2,4,6,8 → mean = (2+4+6+8)/4 = 20/4 = 5.",
    },
    {
        q: "What is median in statistics?",
        a: "Median is the middle value when numbers are sorted. For odd count: middle number. For even count: average of two middle numbers. Example: 2,4,6,8,10 → median = 6.",
    },
    {
        q: "What is mode in statistics?",
        a: "Mode is the most frequent number. Example: 2,3,4,4,5,6 → mode = 4. A dataset can have no mode (all numbers appear once) or multiple modes (bimodal, trimodal).",
    },
    {
        q: "What is the difference between mean, median, and mode?",
        a: "Mean is average, median is middle value, mode is most frequent. For skewed data, median is often better than mean. Example: Salaries: 30k,35k,40k,45k,500k → mean = 130k (skewed), median = 40k (better representation).",
    },
    {
        q: "What is range in statistics?",
        a: "Range = highest value - lowest value. Example: 2,5,8,12,15 → range = 15-2 = 13. Range shows how spread out the data is.",
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
    name: "Statistics Calculator – Mean, Median, Mode, Range",
    description: "Calculate mean, median, mode, range, and sum of any dataset. Free online statistics calculator.",
    url: "https://www.numrexo.com/math/statistics-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Mean (average)", "Median (middle value)", "Mode (most frequent)", "Range and sum"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://www.numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Statistics Calculator", item: "https://www.numrexo.com/math/statistics-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatisticsCalculator() {
    const [dataInput, setDataInput] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        if (!dataInput.trim()) {
            alert("Please enter numbers separated by commas");
            return;
        }

        const numbers = dataInput.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

        if (numbers.length === 0) {
            alert("Please enter valid numbers");
            return;
        }

        // Sort numbers for median
        const sorted = [...numbers].sort((a, b) => a - b);

        // Mean
        const sum = numbers.reduce((acc, val) => acc + val, 0);
        const mean = sum / numbers.length;

        // Median
        let median;
        const mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            median = (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            median = sorted[mid];
        }

        // Mode
        const frequency: Record<number, number> = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });

        let maxFreq = 0;
        let modes: number[] = [];
        for (const [num, freq] of Object.entries(frequency)) {
            if (freq > maxFreq) {
                maxFreq = freq;
                modes = [parseFloat(num)];
            } else if (freq === maxFreq) {
                modes.push(parseFloat(num));
            }
        }

        const mode = maxFreq > 1 ? modes.join(", ") : "No mode";
        const modeCount = maxFreq;

        // Range
        const range = sorted[sorted.length - 1] - sorted[0];

        // Additional stats
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const count = numbers.length;

        setResult({
            mean: mean.toFixed(4),
            median: median.toFixed(4),
            mode,
            modeCount,
            range: range.toFixed(4),
            sum: sum.toFixed(4),
            min: min.toFixed(4),
            max: max.toFixed(4),
            count,
            data: numbers.slice(0, 10).join(", ") + (numbers.length > 10 ? "..." : ""),
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Statistics Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Statistics Calculator</h3>
                        <p className="text-xs text-gray-500 mt-1">Enter numbers separated by commas</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Data Set</label>
                            <textarea
                                placeholder="Example: 2, 4, 6, 8, 10, 12"
                                value={dataInput}
                                onChange={(e) => setDataInput(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none resize-none"
                                rows={4}
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate numbers with commas (e.g., 10, 20, 30, 40)</p>
                        </div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Statistics →</button>
                    </div>
                </div>

                <ResultBox
                    title="Statistical Results"
                    isEmpty={!result}
                    emptyIcon="📊"
                    emptyText="Enter numbers and press Calculate"
                    mainResult={result ? { label: "Mean (Average)", value: result.mean, color: "text-blue-400" } : undefined}
                    extraRows={result ? [
                        { label: "Median", value: result.median, valueColor: "text-yellow-400" },
                        { label: "Mode", value: result.mode },
                        { label: "Range", value: result.range },
                        { label: "Sum", value: result.sum, valueColor: "text-green-400" },
                        { label: "Minimum", value: result.min },
                        { label: "Maximum", value: result.max },
                        { label: "Count", value: result.count },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Statistics Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Calculate mean, median, mode, range, sum, min, max, and count for any dataset. Perfect for students, researchers, and data analysts.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Statistics Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><h3 className="text-sm font-semibold text-blue-400 mb-2">Mean</h3><p className="text-white font-mono text-sm">Σx / n</p><p className="text-xs text-gray-500 mt-1">Sum divided by count</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><h3 className="text-sm font-semibold text-green-400 mb-2">Median</h3><p className="text-white font-mono text-sm">Middle value</p><p className="text-xs text-gray-500 mt-1">Average of two middle for even count</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center"><h3 className="text-sm font-semibold text-yellow-400 mb-2">Mode</h3><p className="text-white font-mono text-sm">Most frequent</p><p className="text-xs text-gray-500 mt-1">Number that appears most often</p></div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Example Datasets</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setDataInput("2, 4, 6, 8, 10")} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">Even numbers: 2,4,6,8,10</button>
                    <button onClick={() => setDataInput("10, 20, 30, 40, 50, 60")} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">Multiples of 10: 10,20,30,40,50,60</button>
                    <button onClick={() => setDataInput("5, 10, 15, 20, 25, 30")} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">Sequence: 5,10,15,20,25,30</button>
                    <button onClick={() => setDataInput("1, 2, 2, 3, 3, 3, 4, 4, 5")} className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50">With mode: 1,2,2,3,3,3,4,4,5</button>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200" itemProp="name">{item.q}</span><span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span></button><div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}><p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p></div>{openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}</div>))}</div>
            </section>
        </>
    );
}