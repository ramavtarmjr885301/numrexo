// components/calculators/OvulationCalculator.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import ResultBox from "@/components/common/ResultBox";

// ─── Natural, Human-Written FAQ Content ──────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I know when I'm ovulating?",
        a: "Most women ovulate about 14 days before their next period. So if your cycles are 28 days, you'd likely ovulate around day 14. But bodies aren't clocks - many women have longer or shorter cycles. That's why tracking multiple signs (like cervical mucus changes or using ovulation predictor kits) gives you a clearer picture. This calculator gives you an estimated window based on your cycle length.",
    },
    {
        q: "Can I get pregnant outside my fertile window?",
        a: "Technically no - you need a live egg to conceive, and an egg only lives about 12-24 hours after ovulation. But sperm can hang around for up to 5 days in good conditions. That means your 'fertile window' is actually about 6 days total: the 5 days before ovulation plus the day of ovulation itself. So timing matters, but you've got a decent window to work with.",
    },
    {
        q: "What if my cycles are irregular?",
        a: "If your cycle length varies a lot month to month, calculator predictions become less reliable. Your body might be dealing with stress, hormonal changes, perimenopause, or conditions like PCOS. In this case, tracking physical signs (cervical mucus, basal body temperature) or using ovulation test strips gives you more accurate, real-time info. A fertility tracker app can also help spot patterns over several months.",
    },
    {
        q: "Can I ovulate twice in one cycle?",
        a: "Nope - your body releases only one egg per cycle (occasionally two, which can lead to fraternal twins, but that's still a single event within a 24-hour window). Once ovulation happens, the remaining follicles shut down until next cycle. So you've got one shot each month, but the fertile window lasts several days thanks to sperm survival.",
    },
    {
        q: "What are common signs of ovulation?",
        a: "Your body gives pretty clear hints: 1) Egg white discharge - thin, slippery, stretchy cervical mucus (like raw egg whites). 2) Mild cramping on one side (mittelschmerz). 3) Slight rise in basal body temperature after ovulation. 4) Increased sex drive. 5) Breast tenderness. 6) Light spotting. Paying attention to these signs helps you confirm what the calculator is predicting.",
    },
    {
        q: "Does stress affect ovulation?",
        a: "Absolutely. High stress can delay or even prevent ovulation because your body prioritizes survival over reproduction. Cortisol (stress hormone) interferes with the hormones needed for egg release. You might notice longer cycles, missed periods, or anovulatory cycles (no ovulation at all). Relaxation techniques, enough sleep, and moderate exercise can help get things back on track.",
    },
    {
        q: "What if my cycles are irregular?",
        a: "If your cycle length varies a lot month to month, calculator predictions become less reliable. Your body might be dealing with stress, hormonal changes, perimenopause, or conditions like PCOS. In this case, tracking physical signs (cervical mucus, basal body temperature) or using ovulation test strips gives you more accurate, real-time info.",
    },
    {
        q: "Can I ovulate twice in one cycle?",
        a: "Nope - your body releases only one egg per cycle (occasionally two, which can lead to fraternal twins, but that's still a single event within a 24-hour window). Once ovulation happens, the remaining follicles shut down until next cycle.",
    },
    {
        q: "What are common signs of ovulation?",
        a: "Your body gives pretty clear hints: 1) Egg white discharge, 2) Mild cramping on one side, 3) Slight rise in basal body temperature after ovulation, 4) Increased sex drive, 5) Breast tenderness, 6) Light spotting. Paying attention to these signs helps you confirm what the calculator is predicting.",
    },
    {
        q: "Does stress affect ovulation?",
        a: "Absolutely. High stress can delay or even prevent ovulation because your body prioritizes survival over reproduction. Cortisol (stress hormone) interferes with the hormones needed for egg release. You might notice longer cycles, missed periods, or anovulatory cycles.",
    },
];

const OVULATION_TABLE = [
    { cycleLength: "21 days", ovulationDay: "Day 7", fertileWindow: "Day 4-8", chance: "Less common" },
    { cycleLength: "28 days", ovulationDay: "Day 14", fertileWindow: "Day 11-16", chance: "Most common" },
    { cycleLength: "30 days", ovulationDay: "Day 16", fertileWindow: "Day 13-18", chance: "Common" },
    { cycleLength: "32 days", ovulationDay: "Day 18", fertileWindow: "Day 15-20", chance: "Common" },
    { cycleLength: "35 days", ovulationDay: "Day 21", fertileWindow: "Day 18-23", chance: "Less common" },
];

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

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
    name: "Ovulation Calculator – Fertility Window Predictor",
    description: "Estimate your ovulation day and fertile window based on your cycle length. Helps with pregnancy planning or natural family planning.",
    url: "https://www.numrexo.com/health/ovulation-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-US",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Ovulation day prediction", "Fertile window calculation", "Predicted dates with calendar input", "Next period estimate"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://www.numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Ovulation Calculator", item: "https://www.numrexo.com/health/ovulation-calculator" },
    ],
});

const HOWTO_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Your Ovulation and Fertile Window",
    description: "Step-by-step guide to estimate your ovulation day and most fertile days using your average cycle length.",
    totalTime: "PT1M",
    step: [
        {
            "@type": "HowToStep",
            position: 1,
            name: "Enter your average cycle length",
            text: "Count the days from the first day of your period to the day before your next period starts. Enter this number (usually 21–35 days).",
        },
        {
            "@type": "HowToStep",
            position: 2,
            name: "Enter first day of last period (optional)",
            text: "Add the date your last period started to get predicted calendar dates for your fertile window and next period.",
        },
        {
            "@type": "HowToStep",
            position: 3,
            name: "Click Calculate",
            text: "Press the Calculate Fertile Window button to see your estimated ovulation day, fertile window, best days to try, and next expected period.",
        },
    ],
    tool: [
        { "@type": "HowToTool", name: "Ovulation Calculator at Numrexo" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function OvulationCalculator() {
    const [cycleLength, setCycleLength] = useState("28");
    const [lastPeriod, setLastPeriod] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const cycle = parseInt(cycleLength);
        if (!cycle || cycle < 21 || cycle > 45) {
            alert("Please enter a cycle length between 21 and 45 days");
            return;
        }

        const ovulationDay = cycle - 14;
        const fertileStart = ovulationDay - 5;
        const fertileEnd = ovulationDay + 1;

        let predictedDates = null;
        let nextPeriodDate = null;

        if (lastPeriod) {
            const lastPeriodDate = new Date(lastPeriod);
            const ovulationDate = new Date(lastPeriodDate);
            ovulationDate.setDate(lastPeriodDate.getDate() + ovulationDay - 1);

            const fertileStartDate = new Date(lastPeriodDate);
            fertileStartDate.setDate(lastPeriodDate.getDate() + fertileStart - 1);

            const fertileEndDate = new Date(lastPeriodDate);
            fertileEndDate.setDate(lastPeriodDate.getDate() + fertileEnd - 1);

            const nextPeriod = new Date(lastPeriodDate);
            nextPeriod.setDate(lastPeriodDate.getDate() + cycle);

            predictedDates = {
                ovulation: ovulationDate.toLocaleDateString(),
                fertileStart: fertileStartDate.toLocaleDateString(),
                fertileEnd: fertileEndDate.toLocaleDateString(),
            };
            nextPeriodDate = nextPeriod.toLocaleDateString();
        }

        setResult({
            cycleLength: cycle,
            ovulationDay,
            fertileStart,
            fertileEnd,
            predictedDates,
            nextPeriodDate,
        });
    };

    const resetForm = () => {
        setCycleLength("28");
        setLastPeriod("");
        setResult(null);
    };

    return (
        <>
            {/* ── Meta Tags ── */}
            <Head>
                <title>Ovulation Calculator – Find Your Fertile Window & Most Fertile Days</title>
                <meta
                    name="description"
                    content="Use our free Ovulation Calculator to predict your ovulation date, fertile window, and most fertile days. Plan pregnancy, track fertility, and improve your chances of conception with accurate results."
                />
                <meta name="keywords" content="ovulation calculator, fertile window calculator, ovulation predictor, when do I ovulate, fertility calculator, best days to conceive, cycle tracker" />
                <link rel="canonical" href="https://www.numrexo.com/health/ovulation-calculator" />

                {/* Open Graph */}
                <meta property="og:title" content="Ovulation Calculator – Find Your Fertile Window & Most Fertile Days" />
                <meta property="og:description" content="Use our free Ovulation Calculator to predict your ovulation date, fertile window, and most fertile days. Plan pregnancy, track fertility, and improve your chances of conception with accurate results." />
                <meta property="og:url" content="https://www.numrexo.com/health/ovulation-calculator" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Numrexo" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Ovulation Calculator – Find Your Fertile Window & Most Fertile Days" />
                <meta name="twitter:description" content="Use our free Ovulation Calculator to predict your ovulation date, fertile window, and most fertile days." />

                {/* Robots */}
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            </Head>

            {/* ── JSON-LD Schemas ── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: HOWTO_SCHEMA }} />

            {/* ── Breadcrumb Nav ── */}
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
                        <a href="https://www.numrexo.com/health" itemProp="item" className="hover:text-gray-300">
                            <span itemProp="name">Health Calculators</span>
                        </a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Ovulation Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Your Cycle Information</h3>
                        <p className="text-xs text-gray-500 mt-1">Track from the first day of your period</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Average Cycle Length (days)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="28"
                                    min="21"
                                    max="45"
                                    value={cycleLength}
                                    onChange={(e) => setCycleLength(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">days</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Count from day 1 of your period to the day before your next period starts</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">First Day of Last Period (optional)</label>
                            <input
                                type="date"
                                value={lastPeriod}
                                onChange={(e) => setLastPeriod(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">Add this to see your specific fertile dates</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Fertile Window →
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

                <ResultBox
                    title="Your Fertile Window"
                    isEmpty={!result}
                    emptyIcon="🌸"
                    emptyText="Enter your cycle length and press Calculate"
                    mainResult={result ? { label: "Estimated Ovulation Day", value: `Day ${result.ovulationDay} of your cycle`, color: "text-pink-400" } : undefined}
                    extraRows={result ? [
                        { label: "Fertile Window", value: `Days ${result.fertileStart} – ${result.fertileEnd} (about 6 days)` },
                        { label: "Best Time to Try", value: `Days ${result.fertileStart + 2} – ${result.fertileEnd - 1}`, valueColor: "text-green-400" },
                        ...(result.predictedDates ? [
                            { label: "Predicted Ovulation Date", value: result.predictedDates.ovulation },
                            { label: "Fertile Window Starts", value: result.predictedDates.fertileStart },
                            { label: "Fertile Window Ends", value: result.predictedDates.fertileEnd },
                            { label: "Next Period Expected", value: result.nextPeriodDate },
                        ] : []),
                    ] : undefined}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Ovulation Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">Trying to conceive? Or maybe you're just trying to understand your body better. This tool helps you figure out when you're most likely to ovulate based on your cycle length. The math is pretty simple - most women ovulate about 14 days before their next period starts.</p>
                <p className="text-gray-400 text-sm leading-relaxed">Keep in mind that every body is different. Stress, illness, travel, and lots of other things can shift your ovulation day. This calculator gives you a solid estimate, but paying attention to your body's natural signs (like changes in cervical mucus) gives you even better information.</p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Ovulation Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">average cycle length</strong> (number of days from day 1 of your period to the day before your next period starts).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> (Optional) Enter the <strong className="text-white">first day of your last period</strong> to get specific calendar dates.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Fertile Window"</strong> to see your results.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> View your ovulation day, fertile window, and best days to try.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and start a new calculation.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use an Ovulation Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2">✓ Plan Pregnancy</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your most fertile days to maximize chances of conception. Time intercourse for the best results.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Track Cycle Patterns</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Understand your menstrual cycle better. Predict when your next period will arrive.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Natural Family Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">If you're avoiding pregnancy, identify fertile windows to avoid unprotected sex.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Understand Your Body</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Learn when you ovulate and what your body's signals mean. Empower yourself with knowledge.</p>
                    </div>
                </div>
            </section>

            {/* Ovulation Timing Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Ovulation Timing by Cycle Length</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Cycle Length</th><th className="text-left py-3 px-4 text-gray-400">Ovulation Day</th><th className="text-left py-3 px-4 text-gray-400">Fertile Window</th><th className="text-left py-3 px-4 text-gray-400">How Common?</th></tr></thead>
                        <tbody>
                            {OVULATION_TABLE.map((row, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-3 px-4 text-gray-300">{row.cycleLength}</td><td className="py-3 px-4 text-pink-400">{row.ovulationDay}</td><td className="py-3 px-4 text-gray-300">{row.fertileWindow}</td><td className="py-3 px-4 text-gray-400">{row.chance}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Signs of Ovulation */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Signs Your Body is Ovulating</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">🥚</div><h3 className="text-sm font-semibold text-pink-400 mb-1">Egg White Discharge</h3><p className="text-xs text-gray-400">Clear, stretchy, slippery - looks like raw egg whites. This is your most fertile sign.</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">🌡️</div><h3 className="text-sm font-semibold text-pink-400 mb-1">Temperature Rise</h3><p className="text-xs text-gray-400">Your basal body temperature jumps about half a degree after ovulation (good for confirming it happened).</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">💕</div><h3 className="text-sm font-semibold text-pink-400 mb-1">Higher Sex Drive</h3><p className="text-xs text-gray-400">Many women notice they're more interested in sex around ovulation (nature's way of helping things along).</p></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4"><div className="text-2xl mb-1">📍</div><h3 className="text-sm font-semibold text-pink-400 mb-1">Mild Cramping</h3><p className="text-xs text-gray-400">Some women feel a small ache on one side - that's the egg being released.</p></div>
                </div>
            </section>

            {/* Important Things */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">A Few Things to Keep in Mind</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">This calculator works great for women with regular cycles, but it's not perfect for everyone:</p>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Irregular cycles?</strong> — If your cycle length changes by more than a few days each month, your ovulation day probably shifts too. Consider tracking physical signs or using ovulation test strips.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Recent pregnancy or birth control?</strong> — Your cycles might need a few months to regulate after stopping birth control or having a baby.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-pink-400 mt-0.5">•</span><span><strong className="text-gray-300">Not a birth control method</strong> — If you're trying to avoid pregnancy, don't rely on this calculator alone. Use actual fertility awareness methods or other contraception.</span></li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}