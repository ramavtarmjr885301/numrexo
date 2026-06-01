// components/calculators/SleepCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "How much sleep do I need?",
        a: "Recommended sleep by age: Adults 18-64: 7-9 hours, Older adults 65+: 7-8 hours, Teens 14-17: 8-10 hours, School children 6-13: 9-11 hours. Quality matters as much as quantity!",
    },
    {
        q: "What is a sleep cycle?",
        a: "A sleep cycle lasts about 90 minutes and includes light sleep, deep sleep, and REM sleep. Waking up at the end of a cycle (after 90-minute intervals) leaves you feeling more refreshed than waking mid-cycle.",
    },
    {
        q: "Is 6 hours of sleep enough?",
        a: "Only 1% of people have a gene allowing 6 hours of sleep without impairment. Most adults need 7-9 hours. Chronic sleep deprivation increases risk of heart disease, diabetes, obesity, and reduced immunity.",
    },
    {
        q: "How to improve sleep quality?",
        a: "Maintain consistent sleep schedule (even weekends), avoid screens 1 hour before bed, keep bedroom dark/cool, avoid caffeine after 2pm, exercise daily (but not late evening), and manage stress through meditation.",
    },
];

const SLEEP_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sleep Calculator – Bedtime Calculator",
    description: "Calculate optimal bedtime based on 90-minute sleep cycles. Wake up refreshed by timing your sleep with natural sleep cycles.",
    url: "https://www.numrexo.com/health/sleep-calculator",
    applicationCategory: "HealthApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function SleepCalculator() {
    const [wakeTime, setWakeTime] = useState("07:00");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const [hours, minutes] = wakeTime.split(":").map(Number);
        const wakeDate = new Date();
        wakeDate.setHours(hours, minutes, 0);

        const sleepCycles = [4.5, 6, 7.5, 9, 10.5];
        const bedTimes = sleepCycles.map(cycles => {
            const bedDate = new Date(wakeDate.getTime() - cycles * 60 * 60 * 1000);
            return bedDate;
        });

        setResult({ wakeTime, bedTimes });
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SLEEP_SCHEMA }} />

            {/* Breadcrumb Navigation */}
            <nav className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="/health" className="hover:text-gray-300">Health Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">Sleep Calculator</span></li>
                </ol>
            </nav>

            {/* Calculator Grid - SAME WORKING CODE as your simple version */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Wake-up Time</h3>
                        <p className="text-xs text-gray-500 mt-1">Based on 90-minute sleep cycles</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                                What time do you need to wake up?
                            </label>
                            <input
                                type="time"
                                value={wakeTime}
                                onChange={(e) => setWakeTime(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                        <button
                            onClick={calculate}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                        >
                            Calculate Bedtime →
                        </button>
                    </div>
                </div>

                {/* Result Box - SAME WORKING CODE */}
                <ResultBox
                    title="Recommended Bedtimes"
                    isEmpty={!result}
                    emptyIcon="😴"
                    emptyText="Enter your wake-up time and press Calculate"
                    mainResult={{
                        label: "Best Sleep Duration",
                        value: "7.5 hours (5 cycles)",
                        color: "text-purple-400"
                    }}
                    extraRows={result ? result.bedTimes.map((bt: Date, i: number) => ({
                        label: `${[4.5, 6, 7.5, 9, 10.5][i]} hours sleep`,
                        value: bt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        valueColor: i === 2 ? "text-green-400" : undefined
                    })) : []}
                />
            </div>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                    About Sleep Calculator
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Waking up feeling refreshed isn't just about total sleep time - it's about timing.
                    Our <strong className="text-gray-300">sleep calculator</strong> uses the 90-minute sleep cycle
                    method to find the optimal bedtime for your wake-up time.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Aiming for 5 complete cycles (7.5 hours) of sleep is ideal for most adults. Waking at the
                    end of a sleep cycle leaves you feeling more rested than waking mid-cycle.
                </p>
            </section>

            {/* Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Sleep Cycle Formula
                </h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        Bedtime = Wake Time - (90 minutes × Number of Cycles)
                    </p>
                    <p className="text-gray-500 text-xs">
                        Example: Wake at 7:00 AM - 5 cycles (7.5 hours) = 11:30 PM bedtime
                    </p>
                </div>
            </section>

            {/* Sleep Cycle Science */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Sleep Cycle Science
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">🌙</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Light Sleep</h3>
                        <p className="text-xs text-gray-400">Easy to wake, accounts for 50% of sleep</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">💤</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Deep Sleep</h3>
                        <p className="text-xs text-gray-400">Body repairs, difficult to wake</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">💭</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">REM Sleep</h3>
                        <p className="text-xs text-gray-400">Dreaming, memory consolidation</p>
                    </div>
                </div>
            </section>

            {/* Sleep Recommendations Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Sleep Recommendations by Age
                </h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-800/30">
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Age Group</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Recommended Sleep</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">Adults (18-64)</td>
                                <td className="py-2 px-4 text-green-400">7-9 hours</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">Older Adults (65+)</td>
                                <td className="py-2 px-4 text-green-400">7-8 hours</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">Teens (14-17)</td>
                                <td className="py-2 px-4 text-yellow-400">8-10 hours</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">School Children (6-13)</td>
                                <td className="py-2 px-4 text-yellow-400">9-11 hours</td>
                            </tr>
                            <tr className="hover:bg-gray-800/20">
                                <td className="py-2 px-4 text-gray-300">Preschool (3-5)</td>
                                <td className="py-2 px-4 text-orange-400">10-13 hours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
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