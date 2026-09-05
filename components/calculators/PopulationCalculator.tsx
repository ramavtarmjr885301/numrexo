// "use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "What is a population calculator?",
        a: "A population calculator estimates future population size based on current population, growth rate, and time period. It helps understand population trends and demographic changes using the exponential growth model.",
    },
    {
        q: "How is population growth calculated?",
        a: "Population growth uses the exponential growth formula: P(t) = P₀ × (1 + r)^t, where P₀ is initial population, r is growth rate (as decimal), and t is time in years. This model assumes continuous compound growth.",
    },
    {
        q: "What is the doubling time formula?",
        a: "Doubling time is calculated using the Rule of 70: Doubling Time = 70 / Growth Rate (as a percentage). For example, a 2% growth rate gives a doubling time of 35 years. This rule works well for growth rates between 0.5% and 10%.",
    },
    {
        q: "What is a good population growth rate?",
        a: "A sustainable growth rate is typically 1-2% per year. Developed countries often have rates below 1%, while developing countries may have rates above 2%. Zero growth (0%) means the population is stable. Negative growth indicates population decline.",
    },
    {
        q: "What factors affect population growth?",
        a: "Birth rates, death rates, immigration, emigration, healthcare quality, economic conditions, education levels, government policies, and cultural factors all affect population growth. Changes in any of these factors can significantly impact growth rates.",
    },
    {
        q: "What is the current world population growth rate?",
        a: "As of 2024, the global population growth rate is approximately 0.9% per year, which translates to about 73 million new people annually. This rate has been declining from its peak of 2.1% in the 1960s.",
    },
    {
        q: "What is carrying capacity?",
        a: "Carrying capacity is the maximum population size that an environment can sustain indefinitely given the available resources like food, water, and habitat. Earth's carrying capacity is estimated to be between 9-10 billion people.",
    },
    {
        q: "How does population growth affect the environment?",
        a: "Rapid population growth increases demand for resources, leads to deforestation, pollution, biodiversity loss, and climate change. Sustainable growth is crucial for environmental balance. Each additional person increases carbon footprint and resource consumption.",
    },
    {
        q: "What is population density and why is it important?",
        a: "Population density is the number of people per unit area (usually per square kilometer). It's important for urban planning, resource allocation, infrastructure development, and understanding environmental impact. High density can indicate urban pressure, while low density may indicate rural areas.",
    },
    {
        q: "How accurate are population projections?",
        a: "Population projections are estimates based on current trends and assumptions. Accuracy decreases with time. Short-term projections (5-10 years) are typically 80-90% accurate, while long-term projections (30+ years) have wider margins of error due to unforeseen changes in birth rates, death rates, and migration patterns.",
    },
];

const GROWTH_RATES = [
    { label: "Very High", rate: 3.5, color: "text-red-400", description: "Developing nations" },
    { label: "High", rate: 2.5, color: "text-orange-400", description: "Growing economies" },
    { label: "Moderate", rate: 1.5, color: "text-yellow-400", description: "Developing countries" },
    { label: "Low", rate: 0.8, color: "text-green-400", description: "Developed nations" },
    { label: "Zero", rate: 0, color: "text-blue-400", description: "Stable population" },
    { label: "Declining", rate: -0.5, color: "text-purple-400", description: "Negative growth" },
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
    name: "Population Calculator – Population Growth & Demographics Tool",
    description: "Calculate population growth, doubling time, population density, and demographic projections with our comprehensive calculator.",
    url: "https://numrexo.com/math/population-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "Population growth projection",
        "Doubling time calculation",
        "Population density analysis",
        "Year-by-year breakdown",
        "Multiple growth rate presets",
    ],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Math Calculators", item: "https://numrexo.com/math" },
        { "@type": "ListItem", position: 3, name: "Population Calculator", item: "https://numrexo.com/math/population-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function PopulationCalculator() {
    const [calculationType, setCalculationType] = useState<"growth" | "doubling" | "density">("growth");
    const [currentPopulation, setCurrentPopulation] = useState("");
    const [growthRate, setGrowthRate] = useState("");
    const [years, setYears] = useState("");
    const [landArea, setLandArea] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setCurrentPopulation("");
        setGrowthRate("");
        setYears("");
        setLandArea("");
        setResult(null);
    };

    const handlePresetRate = (rate: number) => {
        setGrowthRate(rate.toString());
    };

    const calculateGrowth = () => {
        const population = parseFloat(currentPopulation);
        const rate = parseFloat(growthRate);
        const time = parseFloat(years);

        if (isNaN(population) || population <= 0) {
            alert("Please enter a valid current population greater than zero");
            return;
        }

        if (isNaN(rate)) {
            alert("Please enter a valid growth rate");
            return;
        }

        if (isNaN(time) || time <= 0) {
            alert("Please enter a valid number of years greater than zero");
            return;
        }

        const rateDecimal = rate / 100;
        const futurePopulation = population * Math.pow(1 + rateDecimal, time);
        const totalIncrease = futurePopulation - population;
        const percentIncrease = ((futurePopulation / population) - 1) * 100;
        const doublingTime = rate !== 0 ? (70 / Math.abs(rate)).toFixed(1) : "∞";

        // Year-by-year breakdown (first 20 years)
        const yearlyData = [];
        const displayYears = Math.min(time, 20);
        for (let i = 0; i <= Math.floor(displayYears); i++) {
            const yearPopulation = population * Math.pow(1 + rateDecimal, i);
            yearlyData.push({
                year: i,
                population: Math.round(yearPopulation),
                increase: i === 0 ? 0 : Math.round(yearPopulation - (population * Math.pow(1 + rateDecimal, i - 1))),
            });
        }

        // Determine growth rating
        let rating = "";
        let ratingColor = "";
        if (rate > 3) {
            rating = "Very High Growth ★★★★★";
            ratingColor = "text-red-400";
        } else if (rate > 2) {
            rating = "High Growth ★★★★";
            ratingColor = "text-orange-400";
        } else if (rate > 1) {
            rating = "Moderate Growth ★★★";
            ratingColor = "text-yellow-400";
        } else if (rate > 0) {
            rating = "Low Growth ★★";
            ratingColor = "text-green-400";
        } else if (rate === 0) {
            rating = "Stable Population ★★";
            ratingColor = "text-blue-400";
        } else {
            rating = "Declining Population ★";
            ratingColor = "text-purple-400";
        }

        setResult({
            type: "growth",
            currentPopulation: Math.round(population).toLocaleString(),
            futurePopulation: Math.round(futurePopulation).toLocaleString(),
            totalIncrease: Math.round(totalIncrease).toLocaleString(),
            percentIncrease: percentIncrease.toFixed(2),
            doublingTime: doublingTime,
            growthRate: rate,
            years: time,
            yearlyData: yearlyData,
            rating,
            ratingColor,
        });
    };

    const calculateDoubling = () => {
        const rate = parseFloat(growthRate);

        if (isNaN(rate)) {
            alert("Please enter a valid growth rate");
            return;
        }

        if (rate === 0) {
            alert("With 0% growth, the population will never double");
            return;
        }

        if (rate < 0) {
            alert("Population is declining. Use the growth calculator for negative growth rates");
            return;
        }

        const doublingTime = 70 / rate;
        const population = parseFloat(currentPopulation) || 1000;
        const futurePopulation = population * Math.pow(2, 1);

        let rating = "";
        let ratingColor = "";
        if (doublingTime < 20) {
            rating = "Rapid Doubling ★★★★★";
            ratingColor = "text-red-400";
        } else if (doublingTime < 35) {
            rating = "Fast Doubling ★★★★";
            ratingColor = "text-orange-400";
        } else if (doublingTime < 50) {
            rating = "Moderate Doubling ★★★";
            ratingColor = "text-yellow-400";
        } else if (doublingTime < 70) {
            rating = "Slow Doubling ★★";
            ratingColor = "text-green-400";
        } else {
            rating = "Very Slow Doubling ★";
            ratingColor = "text-blue-400";
        }

        setResult({
            type: "doubling",
            doublingTime: doublingTime.toFixed(1),
            futurePopulation: Math.round(futurePopulation).toLocaleString(),
            growthRate: rate,
            currentPopulation: Math.round(population).toLocaleString(),
            rating,
            ratingColor,
        });
    };

    const calculateDensity = () => {
        const population = parseFloat(currentPopulation);
        const area = parseFloat(landArea);

        if (isNaN(population) || population <= 0) {
            alert("Please enter a valid population");
            return;
        }

        if (isNaN(area) || area <= 0) {
            alert("Please enter a valid land area greater than zero");
            return;
        }

        const density = population / area;

        // Compare to world average (World population density ~ 60 per sq km)
        const worldAverage = 60;
        const comparisonToWorld = ((density / worldAverage) * 100);

        let rating = "";
        let ratingColor = "";
        if (density > 1000) {
            rating = "Extremely Dense ★★★★★";
            ratingColor = "text-red-400";
        } else if (density > 500) {
            rating = "Very Dense ★★★★";
            ratingColor = "text-orange-400";
        } else if (density > 100) {
            rating = "Dense ★★★";
            ratingColor = "text-yellow-400";
        } else if (density > 20) {
            rating = "Moderate ★★";
            ratingColor = "text-green-400";
        } else {
            rating = "Sparse ★";
            ratingColor = "text-blue-400";
        }

        setResult({
            type: "density",
            population: Math.round(population).toLocaleString(),
            landArea: Math.round(area).toLocaleString(),
            density: density.toFixed(2),
            densityPerSqKm: density.toFixed(2),
            comparisonToWorld: comparisonToWorld.toFixed(1),
            rating,
            ratingColor,
        });
    };

    const calculate = () => {
        if (calculationType === "growth") {
            calculateGrowth();
        } else if (calculationType === "doubling") {
            calculateDoubling();
        } else {
            calculateDensity();
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/math" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Math Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Population Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Population Calculator</h3>
                            <p className="text-xs text-gray-500 mt-1">Calculate growth, doubling time & density</p>
                        </div>
                        <button
                            onClick={resetForm}
                            className="px-3 py-1 text-sm bg-[#0f1525] border border-gray-700 rounded-lg text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Calculation Type */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Calculation Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => {
                                        setCalculationType("growth");
                                        setResult(null);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${calculationType === "growth"
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Growth
                                </button>
                                <button
                                    onClick={() => {
                                        setCalculationType("doubling");
                                        setResult(null);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${calculationType === "doubling"
                                        ? "bg-green-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Doubling
                                </button>
                                <button
                                    onClick={() => {
                                        setCalculationType("density");
                                        setResult(null);
                                    }}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${calculationType === "density"
                                        ? "bg-purple-500 text-white"
                                        : "bg-[#0f1525] border border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Density
                                </button>
                            </div>
                        </div>

                        {/* Current Population */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Current Population</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="1000"
                                    placeholder="e.g., 8000000"
                                    value={currentPopulation}
                                    onChange={(e) => setCurrentPopulation(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">people</span>
                            </div>
                        </div>

                        {/* Growth Rate */}
                        {(calculationType === "growth" || calculationType === "doubling") && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Growth Rate (%)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 1.2"
                                        value={growthRate}
                                        onChange={(e) => setGrowthRate(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                </div>

                                {/* Preset Growth Rates */}
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {GROWTH_RATES.map((preset) => (
                                        <button
                                            key={preset.rate}
                                            onClick={() => handlePresetRate(preset.rate)}
                                            className={`text-xs px-2 py-1 rounded ${preset.color} bg-[#0f1525] border border-gray-700 hover:border-gray-500 transition-colors`}
                                            title={preset.description}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Years for Growth */}
                        {calculationType === "growth" && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Number of Years</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="1"
                                        placeholder="e.g., 10"
                                        value={years}
                                        onChange={(e) => setYears(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span>
                                </div>
                            </div>
                        )}

                        {/* Land Area for Density */}
                        {calculationType === "density" && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Land Area (sq km)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="100"
                                        placeholder="e.g., 1000000"
                                        value={landArea}
                                        onChange={(e) => setLandArea(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">km²</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        >
                            Calculate →
                        </button>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title={`${calculationType === "growth" ? "Population Growth" : calculationType === "doubling" ? "Doubling Time" : "Population Density"}`}
                    isEmpty={!result}
                    emptyIcon="👥"
                    emptyText="Enter your data and press Calculate"
                    mainResult={result ? {
                        label: calculationType === "growth" ? "Future Population" :
                            calculationType === "doubling" ? "Doubling Time" : "Population Density",
                        value: calculationType === "growth" ? `${result.futurePopulation}` :
                            calculationType === "doubling" ? `${result.doublingTime} years` :
                                `${result.density} /km²`,
                        color: calculationType === "growth" ? "text-blue-400" :
                            calculationType === "doubling" ? "text-green-400" : "text-purple-400"
                    } : undefined}
                    extraRows={result ? [
                        { label: "Performance Rating", value: result.rating, valueColor: result.ratingColor },
                        { label: "Current Population", value: result.currentPopulation },
                        ...(calculationType === "growth" ? [
                            { label: "Total Increase", value: result.totalIncrease, valueColor: "text-green-400" },
                            { label: "Percent Increase", value: `${result.percentIncrease}%`, valueColor: "text-yellow-400" },
                            { label: "Doubling Time", value: `${result.doublingTime} years`, valueColor: "text-orange-400" },
                            { label: "Growth Rate", value: `${result.growthRate}%` },
                            { label: "Time Period", value: `${result.years} years` },
                        ] : []),
                        ...(calculationType === "doubling" ? [
                            { label: "Population at Doubling", value: result.futurePopulation, valueColor: "text-green-400" },
                            { label: "Growth Rate", value: `${result.growthRate}%` },
                        ] : []),
                        ...(calculationType === "density" ? [
                            { label: "Land Area", value: `${result.landArea} km²` },
                            { label: "World Average Comparison", value: `${result.comparisonToWorld}%`, valueColor: result.comparisonToWorld > 100 ? "text-yellow-400" : "text-blue-400" },
                        ] : []),
                    ] : []}
                />
            </div>

            {/* Year-by-Year Breakdown (Growth only) */}
            {result && result.type === "growth" && result.yearlyData && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Year-by-Year Breakdown</h2>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-[#111827]">
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 px-4 text-gray-400">Year</th>
                                        <th className="text-right py-3 px-4 text-gray-400">Population</th>
                                        <th className="text-right py-3 px-4 text-gray-400">Yearly Increase</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.yearlyData.map((data: any, index: number) => (
                                        <tr key={index} className="border-b border-gray-800/50 hover:bg-white/5">
                                            <td className="py-2 px-4 text-gray-300">{data.year}</td>
                                            <td className="py-2 px-4 text-right text-gray-300">{data.population.toLocaleString()}</td>
                                            <td className={`py-2 px-4 text-right ${data.increase > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                                                {data.increase > 0 ? `+${data.increase.toLocaleString()}` : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Showing first 20 years of growth projection</p>
                </section>
            )}

            {/* ─── EXPANDED SEO CONTENT ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Population Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Population Calculator</strong> helps you project future population growth, calculate doubling time, and analyze population density. Perfect for demographic studies, urban planning, and understanding population trends.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    This calculator uses the exponential growth model to provide accurate projections. Whether you're studying demographic changes, planning resource allocation, or analyzing population trends, this tool provides comprehensive insights.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    With three calculation modes and year-by-year breakdowns, you can understand population dynamics at both macro and micro levels.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Population Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the <strong className="text-white">calculation type</strong> - Growth, Doubling Time, or Density.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter the <strong className="text-white">current population</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> For Growth or Doubling, enter the <strong className="text-white">annual growth rate</strong>. Use preset rates for quick input.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> For Growth, enter the <strong className="text-white">number of years</strong> to project. For Density, enter the <strong className="text-white">land area</strong>.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">"Calculate"</strong> to see your results with a performance rating.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use <strong className="text-white">Reset</strong> to clear all inputs and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Population Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Demographic Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Project future population sizes for urban planning, resource allocation, and policy making. Understand growth trends and their implications.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Educational Use</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Learn about population dynamics, exponential growth, and demographic transitions. Perfect for students and researchers.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Business Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand market potential based on population growth. Identify emerging markets and demographic trends for business decisions.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Environmental Analysis</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Assess population pressure on resources, calculate carrying capacity, and understand environmental impact of population growth.</p>
                    </div>
                </div>
            </section>

            {/* Formulas Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Population Formulas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">📈 Population Growth</h3>
                        <p className="text-white font-mono text-sm mb-2">P(t) = P₀ × (1 + r)^t</p>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div><span className="text-blue-400">P(t)</span> = Future population</div>
                            <div><span className="text-blue-400">P₀</span> = Initial population</div>
                            <div><span className="text-blue-400">r</span> = Growth rate (decimal)</div>
                            <div><span className="text-blue-400">t</span> = Time in years</div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">⏱️ Doubling Time</h3>
                        <p className="text-white font-mono text-sm mb-2">T = 70 / r</p>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div><span className="text-green-400">T</span> = Doubling time (years)</div>
                            <div><span className="text-green-400">r</span> = Growth rate (%)</div>
                            <div className="text-gray-500 mt-1">Rule of 70 approximation</div>
                        </div>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">📍 Population Density</h3>
                        <p className="text-white font-mono text-sm mb-2">D = P / A</p>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div><span className="text-purple-400">D</span> = Population density</div>
                            <div><span className="text-purple-400">P</span> = Total population</div>
                            <div><span className="text-purple-400">A</span> = Land area (km²)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Growth Rate Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Growth Rate Interpretation</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Growth Rate</th>
                                <th className="text-left py-3 px-4 text-gray-400">Interpretation</th>
                                <th className="text-left py-3 px-4 text-gray-400">Examples</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-red-400 font-bold">Above 3%</td>
                                <td className="py-2 px-4 text-gray-300">Very High Growth</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Some African nations, Yemen</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-orange-400 font-bold">2-3%</td>
                                <td className="py-2 px-4 text-gray-300">High Growth</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">India, Philippines, Nigeria</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-yellow-400 font-bold">1-2%</td>
                                <td className="py-2 px-4 text-gray-300">Moderate Growth</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">USA, Brazil, Indonesia</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-green-400 font-bold">0-1%</td>
                                <td className="py-2 px-4 text-gray-300">Low Growth</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">China, UK, France</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-blue-400 font-bold">0%</td>
                                <td className="py-2 px-4 text-gray-300">Stable</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Germany, Italy, Japan</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-2 px-4 text-purple-400 font-bold">Negative</td>
                                <td className="py-2 px-4 text-gray-300">Declining</td>
                                <td className="py-2 px-4 text-gray-400 text-xs">Russia, Greece, Portugal</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">* Growth rates vary by country and region. Rates change over time due to economic, social, and policy factors.</p>
            </section>

            {/* Quick Facts */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">World Population Quick Facts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h4 className="text-xs text-gray-500 mb-1">Current World Population</h4>
                        <p className="text-2xl font-bold text-blue-400">8.1 Billion</p>
                        <p className="text-xs text-gray-600 mt-1">As of 2024</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h4 className="text-xs text-gray-500 mb-1">Annual Growth Rate</h4>
                        <p className="text-2xl font-bold text-green-400">0.9%</p>
                        <p className="text-xs text-gray-600 mt-1">~73 million people per year</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h4 className="text-xs text-gray-500 mb-1">Population Density</h4>
                        <p className="text-2xl font-bold text-purple-400">60/km²</p>
                        <p className="text-xs text-gray-600 mt-1">Global average</p>
                    </div>
                </div>
            </section>

            {/* Top 5 Most Populated Countries */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Top 5 Most Populated Countries</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400">Rank</th>
                                <th className="text-left py-3 px-4 text-gray-400">Country</th>
                                <th className="text-right py-3 px-4 text-gray-400">Population</th>
                                <th className="text-right py-3 px-4 text-gray-400">% of World</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">1</td>
                                <td className="py-3 px-4 text-gray-300">India</td>
                                <td className="py-3 px-4 text-right text-gray-300">1.43 Billion</td>
                                <td className="py-3 px-4 text-right text-yellow-400">17.8%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">2</td>
                                <td className="py-3 px-4 text-gray-300">China</td>
                                <td className="py-3 px-4 text-right text-gray-300">1.42 Billion</td>
                                <td className="py-3 px-4 text-right text-yellow-400">17.7%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">3</td>
                                <td className="py-3 px-4 text-gray-300">United States</td>
                                <td className="py-3 px-4 text-right text-gray-300">334 Million</td>
                                <td className="py-3 px-4 text-right text-yellow-400">4.2%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">4</td>
                                <td className="py-3 px-4 text-gray-300">Indonesia</td>
                                <td className="py-3 px-4 text-right text-gray-300">277 Million</td>
                                <td className="py-3 px-4 text-right text-yellow-400">3.4%</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-white/5">
                                <td className="py-3 px-4 text-gray-300 font-medium">5</td>
                                <td className="py-3 px-4 text-gray-300">Pakistan</td>
                                <td className="py-3 px-4 text-right text-gray-300">240 Million</td>
                                <td className="py-3 px-4 text-right text-yellow-400">3.0%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">Source: UN World Population Prospects 2024</p>
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