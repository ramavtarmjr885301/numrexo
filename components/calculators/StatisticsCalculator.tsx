"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is mean in statistics?",
        a: "Mean is the average of all numbers. Formula: sum of all numbers ÷ count of numbers. Example: 2,4,6,8 → mean = (2+4+6+8)/4 = 20/4 = 5. The mean is the most commonly used measure of central tendency, but it can be affected by outliers (extremely high or low values). For example, in the dataset 1,2,3,4,100, the mean is 22, which doesn't represent the typical value well.",
    },
    {
        q: "What is median in statistics?",
        a: "Median is the middle value when numbers are sorted. For odd count: middle number. For even count: average of two middle numbers. Example: 2,4,6,8,10 → median = 6. For even: 2,4,6,8 → median = (4+6)/2 = 5. Median is more robust than mean because it's not affected by outliers. In salary data with one very high earner, median gives a better picture of typical earnings.",
    },
    {
        q: "What is mode in statistics?",
        a: "Mode is the most frequent number. Example: 2,3,4,4,5,6 → mode = 4. A dataset can have no mode (all numbers appear once) or multiple modes (bimodal, trimodal). Bimodal example: 1,1,2,2,3 → modes = 1 and 2 (bimodal). Mode is useful for categorical data where you want to know the most common category, like most popular color or most common diagnosis.",
    },
    {
        q: "What is the difference between mean, median, and mode?",
        a: "Mean is average (sum ÷ count), median is middle value (50th percentile), mode is most frequent value. For skewed data, median is often better than mean. Example: Salaries: 30k,35k,40k,45k,500k → mean = 130k (skewed by outlier), median = 40k (better representation). In perfectly symmetrical distributions, mean = median = mode. Use mean for normally distributed data, median for skewed data, and mode for categorical data.",
    },
    {
        q: "What is range in statistics?",
        a: "Range = highest value - lowest value. Example: 2,5,8,12,15 → range = 15-2 = 13. Range shows how spread out the data is, but it's sensitive to outliers. A single extreme value can make the range very large. More robust measures of spread include interquartile range (IQR) and standard deviation. Range is useful for quick, rough estimates of data spread.",
    },
    {
        q: "What is variance and standard deviation?",
        a: "Variance measures how far each number is from the mean. Formula: Variance = Σ(x - mean)² / n. Standard deviation is the square root of variance (σ = √Variance). Example: Data 2,4,6,8, mean=5: Differences: -3,-1,1,3; Squared: 9,1,1,9; Variance = 20/4 = 5; Standard deviation = √5 ≈ 2.24. Lower standard deviation means data points are closer to the mean (more consistent). Higher standard deviation means more spread out.",
    },
    {
        q: "What is the interquartile range (IQR)?",
        a: "IQR is the range between the 25th and 75th percentiles (middle 50% of data). Formula: IQR = Q3 - Q1 (Q3 = 75th percentile, Q1 = 25th percentile). Example: 2,4,6,8,10,12,14 → Q1 = 4, Q3 = 12, IQR = 8. IQR is more robust than range because it ignores outliers. It's used to identify outliers: any value below Q1 - 1.5×IQR or above Q3 + 1.5×IQR is considered an outlier.",
    },
    {
        q: "What is a normal distribution?",
        a: "A normal distribution (bell curve) is symmetrical, with mean = median = mode in the center. Properties: 68% of data falls within ±1 standard deviation, 95% within ±2 standard deviations, 99.7% within ±3 standard deviations. Examples of normally distributed data: Heights, IQ scores, exam scores. Normal distribution is fundamental in statistics because many statistical tests assume normality. Data can be transformed if not normally distributed.",
    },
    {
        q: "How to identify outliers in data?",
        a: "Outliers are extreme values that differ significantly from other observations. Detection methods: 1) IQR method: Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR are outliers, 2) Z-score method: Values with |z| > 3 are outliers, 3) Visual inspection using box plots, 4) Scatter plots for bivariate data. Outliers should be investigated - they may be errors, legitimate extreme values, or indicate important phenomena. Don't automatically remove outliers without justification.",
    },
    {
        q: "What is the difference between descriptive and inferential statistics?",
        a: "Descriptive statistics summarize and describe data (mean, median, mode, standard deviation, range). They tell you what the data shows. Inferential statistics use samples to make predictions about populations (hypothesis testing, confidence intervals, regression). Example: Descriptive - 'The average height of students is 170cm.' Inferential - 'Based on a sample, we predict that the average height of all students is between 168-172cm with 95% confidence.' Our calculator focuses on descriptive statistics.",
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
    url: "https://numrexo.com/math/statistics-calculator",
    applicationCategory: "MathApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Mean (average)", "Median (middle value)", "Mode (most frequent)", "Range and sum"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Statistics Calculator", item: "https://numrexo.com/math/statistics-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatisticsCalculator() {
    const [dataInput, setDataInput] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setDataInput("");
        setResult(null);
    };

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

        // Variance and Standard Deviation
        const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
        const stdDev = Math.sqrt(variance);

        // IQR (Interquartile Range)
        let q1, q3;
        const lowerHalf = sorted.slice(0, Math.floor(sorted.length / 2));
        const upperHalf = sorted.slice(Math.ceil(sorted.length / 2));
        const midLower = Math.floor(lowerHalf.length / 2);
        const midUpper = Math.floor(upperHalf.length / 2);
        if (lowerHalf.length % 2 === 0) {
            q1 = (lowerHalf[midLower - 1] + lowerHalf[midLower]) / 2;
        } else {
            q1 = lowerHalf[midLower];
        }
        if (upperHalf.length % 2 === 0) {
            q3 = (upperHalf[midUpper - 1] + upperHalf[midUpper]) / 2;
        } else {
            q3 = upperHalf[midUpper];
        }
        const iqr = q3 - q1;

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
            variance: variance.toFixed(4),
            stdDev: stdDev.toFixed(4),
            q1: q1.toFixed(4),
            q3: q3.toFixed(4),
            iqr: iqr.toFixed(4),
            dataPreview: numbers.slice(0, 10).join(", ") + (numbers.length > 10 ? "..." : ""),
            totalNumbers: numbers.length,
        });
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
                        <a href="https://numrexo.com/math" itemProp="item" className="hover:text-gray-300">Math Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Statistics Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
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
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none resize-none font-mono text-sm"
                                rows={4}
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate numbers with commas (e.g., 10, 20, 30, 40)</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Statistics →
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
                        { label: "Variance", value: result.variance, valueColor: "text-purple-400" },
                        { label: "Standard Deviation", value: result.stdDev, valueColor: "text-orange-400" },
                        { label: "Minimum", value: result.min },
                        { label: "Maximum", value: result.max },
                        { label: "Q1 (25th percentile)", value: result.q1 },
                        { label: "Q3 (75th percentile)", value: result.q3 },
                        { label: "IQR (Interquartile Range)", value: result.iqr },
                        { label: "Count", value: result.count },
                        { label: "Data Preview", value: result.dataPreview },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Statistics Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Statistics Calculator</strong> computes essential descriptive statistics for any dataset. Calculate mean, median, mode, range, sum, variance, standard deviation, quartiles, and interquartile range (IQR) in seconds.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Statistics is fundamental in data analysis, research, and decision-making. Understanding measures of central tendency (mean, median, mode) and measures of spread (range, variance, standard deviation) helps you interpret data accurately and make informed conclusions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Perfect for students, researchers, data analysts, and anyone working with numerical data. Our calculator handles datasets of any size and provides clear, organized results.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Statistics Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">numbers</strong> separated by commas in the text area.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Click <strong className="text-white">"Calculate Statistics"</strong> to analyze your data.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Review the <strong className="text-white">complete statistical summary</strong> including mean, median, mode, and more.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Use the example datasets below to test the calculator.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Statistics Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Quick Data Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get instant statistical measures without manual calculations. Perfect for homework, research, and data exploration.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Comprehensive Results</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get all key statistics in one place: mean, median, mode, range, variance, standard deviation, quartiles, and IQR.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Educational Tool</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Learn statistics by seeing results for different datasets. Perfect for students learning statistical concepts.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Data Understanding</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand your data's central tendency, spread, and distribution. Make better decisions with statistical insights.</p>
                    </div>
                </div>
            </section>

            {/* Formulas Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Statistics Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">Mean</h3>
                        <p className="text-white font-mono text-sm">x̄ = Σx / n</p>
                        <p className="text-xs text-gray-500 mt-1">Sum divided by count</p>
                        <p className="text-xs text-gray-600 mt-1">Example: (2+4+6)/3 = 4</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-yellow-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">Median</h3>
                        <p className="text-white font-mono text-sm">Middle value</p>
                        <p className="text-xs text-gray-500 mt-1">Average of two middle for even count</p>
                        <p className="text-xs text-gray-600 mt-1">Example: 2,4,6 → median = 4</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-green-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Standard Deviation</h3>
                        <p className="text-white font-mono text-sm">σ = √[Σ(x-μ)²/n]</p>
                        <p className="text-xs text-gray-500 mt-1">Square root of variance</p>
                        <p className="text-xs text-gray-600 mt-1">Measures data spread</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">Variance</h3>
                        <p className="text-white font-mono text-sm">σ² = Σ(x-μ)²/n</p>
                        <p className="text-xs text-gray-500 mt-1">Average squared deviation</p>
                        <p className="text-xs text-gray-600 mt-1">Measures data spread</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-orange-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">IQR</h3>
                        <p className="text-white font-mono text-sm">IQR = Q3 - Q1</p>
                        <p className="text-xs text-gray-500 mt-1">Range of middle 50%</p>
                        <p className="text-xs text-gray-600 mt-1">Robust measure of spread</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-red-500/50 transition-all">
                        <h3 className="text-sm font-semibold text-red-400 mb-2">Range</h3>
                        <p className="text-white font-mono text-sm">Max - Min</p>
                        <p className="text-xs text-gray-500 mt-1">Difference between extremes</p>
                        <p className="text-xs text-gray-600 mt-1">Simple measure of spread</p>
                    </div>
                </div>
            </section>

            {/* Example Datasets */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Example Datasets</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setDataInput("2, 4, 6, 8, 10")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 Even numbers: 2,4,6,8,10
                    </button>
                    <button
                        onClick={() => setDataInput("10, 20, 30, 40, 50, 60")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 Multiples of 10: 10,20,30,40,50,60
                    </button>
                    <button
                        onClick={() => setDataInput("5, 10, 15, 20, 25, 30")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 Sequence: 5,10,15,20,25,30
                    </button>
                    <button
                        onClick={() => setDataInput("1, 2, 2, 3, 3, 3, 4, 4, 5")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 With mode: 1,2,2,3,3,3,4,4,5
                    </button>
                    <button
                        onClick={() => setDataInput("10, 12, 14, 16, 18, 20, 22")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 Odd count: 10,12,14,16,18,20,22
                    </button>
                    <button
                        onClick={() => setDataInput("1, 2, 3, 4, 5, 6, 7, 8, 9, 10")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 1-10: 1,2,3,4,5,6,7,8,9,10
                    </button>
                    <button
                        onClick={() => setDataInput("100, 200, 300, 400, 500")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 Large numbers: 100,200,300,400,500
                    </button>
                    <button
                        onClick={() => setDataInput("1, 1, 1, 2, 2, 3, 3, 3, 3")}
                        className="text-left px-3 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all"
                    >
                        📊 Multiple modes: 1,1,1,2,2,3,3,3,3
                    </button>
                </div>
            </section>

            {/* Statistics Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Statistics Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Choose the right measure:</strong> Use mean for normal distributions, median for skewed data, and mode for categorical data. Understanding your data's distribution helps select the most appropriate measure.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Check for outliers:</strong> Use IQR to identify outliers. Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR are considered outliers and may need investigation.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Variance vs Standard Deviation:</strong> Variance is in squared units, while standard deviation is in the same units as your data. Standard deviation is easier to interpret and more commonly reported.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Sample vs Population:</strong> For sample data, use (n-1) in variance formula for unbiased estimate. Our calculator uses population formula (n) for simplicity.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Visualize your data:</strong> Use box plots (based on quartiles) to visualize data distribution. This helps identify outliers and understand data spread at a glance.</span>
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