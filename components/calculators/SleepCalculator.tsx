// components/calculators/SleepCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How much sleep do I need?",
        a: "Recommended sleep by age: Adults 18-64: 7-9 hours, Older adults 65+: 7-8 hours, Teens 14-17: 8-10 hours, School children 6-13: 9-11 hours, Preschoolers 3-5: 10-13 hours. Quality matters as much as quantity! Consistency is key - going to bed and waking up at the same time daily helps regulate your body's internal clock (circadian rhythm), leading to better sleep quality and overall health.",
    },
    {
        q: "What is a sleep cycle?",
        a: "A sleep cycle lasts about 90 minutes and includes four stages: N1 (light sleep, 5%), N2 (light sleep, 45%), N3 (deep sleep, 25%), and REM sleep (25%). Your brain cycles through these stages 4-6 times per night. Waking up at the end of a cycle (after 90-minute intervals) leaves you feeling more refreshed than waking mid-cycle. This is why timing your sleep to complete cycles matters more than total hours alone.",
    },
    {
        q: "Is 6 hours of sleep enough?",
        a: "Only 1% of people have a gene (DEC2 mutation) allowing 6 hours of sleep without impairment. Most adults need 7-9 hours. Chronic sleep deprivation (less than 7 hours) increases risk of: Heart disease (48% higher risk), Diabetes (30% higher risk), Obesity (32% higher risk), Reduced immunity (50% less antibodies), Depression, Cognitive decline, and Reduced lifespan. Don't gamble with your health - prioritize 7+ hours nightly.",
    },
    {
        q: "How to improve sleep quality?",
        a: "Top tips for better sleep: 1) Maintain consistent sleep schedule (even weekends!), 2) Avoid screens 1-2 hours before bed (blue light suppresses melatonin), 3) Keep bedroom dark (use blackout curtains), cool (18-22°C), and quiet, 4) Avoid caffeine after 2pm (half-life 5-6 hours), 5) Exercise daily (30+ minutes) but not late evening, 6) Manage stress through meditation, journaling, or deep breathing, 7) Avoid alcohol before bed (disrupts REM sleep), 8) Create a relaxing bedtime routine (reading, warm bath).",
    },
    {
        q: "What is the best time to wake up?",
        a: "The best wake-up time depends on your chronotype (natural sleep-wake preference): Early birds (15-20% of people) naturally wake early (5-6am), Night owls (15-20%) prefer later (8-10am), Most people (60-70%) fall somewhere in between. For optimal health, align your wake time with sunrise when possible - this helps regulate your circadian rhythm. Consistency matters more than the specific time. Our sleep calculator helps you find bedtimes based on your chosen wake time.",
    },
    {
        q: "How does blue light affect sleep?",
        a: "Blue light from phones, tablets, computers, and TVs suppresses melatonin production (the sleep hormone) by 50-70%. This: Delays sleep onset by 30-60 minutes, Reduces REM sleep quality, Disrupts circadian rhythm, Causes morning grogginess. Solutions: Use night mode/blue light filters after sunset (50% less suppression), Wear blue light blocking glasses (reduces suppression by 60%), Avoid screens 1-2 hours before bed (best option), Use warm/red lighting in evenings (doesn't suppress melatonin).",
    },
    {
        q: "What are the signs of sleep deprivation?",
        a: "Key signs you're sleep deprived: 1) Difficulty waking up, 2) Relying on caffeine to stay alert, 3) Irritability or mood swings, 4) Difficulty concentrating or memory issues, 5) Microsleeps (brief unintended sleeps), 6) Increased appetite/cravings (especially for carbs/sugar), 7) Frequent illnesses (weakened immunity), 8) Dark circles or puffy eyes, 9) Reduced motivation, 10) Poor decision-making. If you experience 3+ symptoms, prioritize improving your sleep habits.",
    },
    {
        q: "How does sleep affect mental health?",
        a: "Sleep and mental health are deeply connected: Poor sleep increases risk of Depression (2x higher), Anxiety (1.5x higher), Bipolar disorder, ADHD symptoms, and Suicidal ideation. Sleep helps: Process emotions, Form memories, Clear brain toxins (glymphatic system), Regulate stress hormones. 70-80% of people with depression report sleep issues. Quality sleep is as important as therapy and medication for mental health. Prioritize 7-9 hours for emotional resilience.",
    },
    {
        q: "What is the ideal bedroom temperature for sleep?",
        a: "The optimal bedroom temperature is 18-22°C (65-72°F). Your body naturally cools down by 0.5-1°C at night to initiate sleep. A cooler room: 1) Shortens sleep onset time by 30%, 2) Increases deep sleep duration, 3) Reduces middle-of-the-night wakings, 4) Improves sleep quality by 40%. Tips: Use breathable bedding (cotton/linen), Wear moisture-wicking pajamas, Take a warm bath (1-2 hours before bed - cooling effect after), Use a fan or adjust thermostat before bed.",
    },
    {
        q: "How to reset your sleep schedule?",
        a: "Reset your sleep schedule in 3-7 days: 1) Adjust wake time 15-30 minutes earlier each day (don't jump too fast), 2) Get bright light exposure within 30 minutes of waking (20-30 minutes), 3) Avoid bright light 2 hours before desired bedtime, 4) Only use bed for sleep and intimacy (associate bed with sleep), 5) If you can't sleep, get up (15 minutes rule - go to another room), 6) Use melatonin (0.3-0.5mg) 2 hours before bedtime to shift your clock, 7) Stay consistent even on weekends. Be patient - takes 3-7 days to shift circadian rhythm.",
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
    name: "Sleep Calculator – Bedtime Calculator",
    description: "Calculate optimal bedtime based on 90-minute sleep cycles. Wake up refreshed by timing your sleep with natural sleep cycles.",
    url: "https://numrexo.com/health/sleep-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Sleep cycle calculation", "Bedtime optimization", "Wake time analysis", "Sleep hygiene tips"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://numrexo.com/health" },
        { "@type": "ListItem", position: 3, name: "Sleep Calculator", item: "https://numrexo.com/health/sleep-calculator" },
    ],
});

const SLEEP_CYCLES = [
    { hours: 4.5, cycles: 3, description: "Power nap cycle" },
    { hours: 6, cycles: 4, description: "Minimum recommended" },
    { hours: 7.5, cycles: 5, description: "⭐ Best for most adults" },
    { hours: 9, cycles: 6, description: "Extra recovery sleep" },
    { hours: 10.5, cycles: 7, description: "Maximum recovery sleep" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SleepCalculator() {
    const [wakeTime, setWakeTime] = useState("07:00");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const resetForm = () => {
        setWakeTime("07:00");
        setResult(null);
    };

    const calculate = () => {
        const [hours, minutes] = wakeTime.split(":").map(Number);
        const wakeDate = new Date();
        wakeDate.setHours(hours, minutes, 0);

        const bedTimes = SLEEP_CYCLES.map((cycle) => {
            const bedDate = new Date(wakeDate.getTime() - cycle.hours * 60 * 60 * 1000);
            return {
                time: bedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                hours: cycle.hours,
                cycles: cycle.cycles,
                description: cycle.description,
            };
        });

        setResult({
            wakeTime,
            bedTimes,
            bestCycle: SLEEP_CYCLES[2], // 7.5 hours is the sweet spot
        });
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://numrexo.com/health" itemProp="item" className="hover:text-gray-300">Health Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Sleep Calculator</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
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
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                            />
                            <p className="text-xs text-gray-500 mt-1">Choose your desired wake-up time</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Calculate Bedtime →
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
                    title="Recommended Bedtimes"
                    isEmpty={!result}
                    emptyIcon="😴"
                    emptyText="Enter your wake-up time and press Calculate"
                    mainResult={result ? {
                        label: "⭐ Best Sleep Duration",
                        value: `${result.bestCycle.hours} hours (${result.bestCycle.cycles} cycles)`,
                        color: "text-purple-400"
                    } : undefined}
                    extraRows={result ? result.bedTimes.map((bt: any) => ({
                        label: bt.description,
                        value: `${bt.time} (${bt.hours}h)`,
                        valueColor: bt.hours === 7.5 ? "text-green-400" : undefined
                    })) : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Sleep Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Waking up feeling refreshed isn't just about total sleep time - it's about timing. Our <strong className="text-gray-300">sleep calculator</strong> uses the 90-minute sleep cycle method to find the optimal bedtime for your wake-up time. By timing your sleep to complete 90-minute cycles, you wake up naturally at the end of a cycle when you're in light sleep, feeling more rested and alert.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Aiming for 5 complete cycles (7.5 hours) of sleep is ideal for most adults. Waking at the end of a sleep cycle leaves you feeling more refreshed than waking mid-cycle when you're in deep sleep. This is why the sleep calculator recommends bedtimes at 90-minute intervals.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Understanding your sleep cycles is key to improving sleep quality. Our calculator helps you plan your bedtime based on science, not guesswork. Whether you need 6 hours or 9 hours, we show you the optimal times to fall asleep.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Sleep Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Select the time you need to <strong className="text-white">wake up</strong> using the time picker.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Click <strong className="text-white">"Calculate Bedtime"</strong> to see your optimal bedtimes.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Review the <strong className="text-white">recommended bedtimes</strong> based on 90-minute sleep cycles.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Choose the bedtime that works best for your schedule.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Aim for <strong className="text-white">7.5 hours (5 cycles)</strong> for optimal health benefits.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Use the <strong className="text-white">Reset</strong> button to try different wake times.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Sleep Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Wake Up Refreshed</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Time your sleep to complete 90-minute cycles. Wake naturally at the end of a cycle when you're in light sleep, feeling more refreshed and alert.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Science-Based Timing</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Our calculator uses proven sleep cycle research to find optimal bedtimes. No guesswork - just science-backed recommendations.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Flexible Scheduling</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">See multiple bedtime options based on different sleep durations. Find what works best with your daily routine and commitments.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Long-Term Health</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Consistent, cycle-aligned sleep improves mental clarity, immunity, mood, and reduces risk of chronic diseases.</p>
                    </div>
                </div>
            </section>

            {/* Sleep Cycle Science */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sleep Cycle Science</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
                        <div className="text-2xl mb-1">🌙</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Stage 1: Light Sleep</h3>
                        <p className="text-xs text-gray-400">5% of cycle</p>
                        <p className="text-xs text-gray-500 mt-1">Transition to sleep, easy to wake</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
                        <div className="text-2xl mb-1">💤</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Stage 2: Light Sleep</h3>
                        <p className="text-xs text-gray-400">45% of cycle</p>
                        <p className="text-xs text-gray-500 mt-1">Body temperature drops, heart rate slows</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
                        <div className="text-2xl mb-1">🔋</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">Stage 3: Deep Sleep</h3>
                        <p className="text-xs text-gray-400">25% of cycle</p>
                        <p className="text-xs text-gray-500 mt-1">Body repairs, hard to wake</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
                        <div className="text-2xl mb-1">💭</div>
                        <h3 className="text-sm font-semibold text-blue-400 mb-1">REM Sleep</h3>
                        <p className="text-xs text-gray-400">25% of cycle</p>
                        <p className="text-xs text-gray-500 mt-1">Dreaming, memory consolidation</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">* Each cycle lasts ~90 minutes. Adults need 4-6 cycles per night for optimal health.</p>
            </section>

            {/* Sleep Formula */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sleep Cycle Formula</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">
                        Bedtime = Wake Time - (90 minutes × Number of Cycles)
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                        Example: Wake at 7:00 AM - 5 cycles (7.5 hours) = 11:30 PM bedtime
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-400">3 cycles</p>
                            <p className="text-sm text-yellow-400">4.5 hours</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-400">4 cycles</p>
                            <p className="text-sm text-yellow-400">6 hours</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center border border-purple-500/30">
                            <p className="text-xs text-green-400">⭐ 5 cycles</p>
                            <p className="text-sm text-green-400">7.5 hours</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-400">6 cycles</p>
                            <p className="text-sm text-yellow-400">9 hours</p>
                        </div>
                        <div className="bg-[#0f1525] rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-400">7 cycles</p>
                            <p className="text-sm text-yellow-400">10.5 hours</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sleep Recommendations Table */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sleep Recommendations by Age</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 sticky top-0 bg-[#111827]">
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Age Group</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Recommended Sleep</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Sleep Cycles</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300">Adults (18-64)</td>
                                <td className="py-3 px-4 text-green-400">7-9 hours</td>
                                <td className="py-3 px-4 text-gray-400">5-6 cycles</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300">Older Adults (65+)</td>
                                <td className="py-3 px-4 text-green-400">7-8 hours</td>
                                <td className="py-3 px-4 text-gray-400">5 cycles</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300">Teens (14-17)</td>
                                <td className="py-3 px-4 text-yellow-400">8-10 hours</td>
                                <td className="py-3 px-4 text-gray-400">5-6.5 cycles</td>
                            </tr>
                            <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300">School Children (6-13)</td>
                                <td className="py-3 px-4 text-yellow-400">9-11 hours</td>
                                <td className="py-3 px-4 text-gray-400">6-7.5 cycles</td>
                            </tr>
                            <tr className="hover:bg-gray-800/20">
                                <td className="py-3 px-4 text-gray-300">Preschool (3-5)</td>
                                <td className="py-3 px-4 text-orange-400">10-13 hours</td>
                                <td className="py-3 px-4 text-gray-400">7-8.5 cycles</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 p-4 border-t border-gray-800">
                        * Individual needs vary. Listen to your body and adjust based on how you feel during the day.
                    </p>
                </div>
            </section>

            {/* Sleep Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Sleep Hygiene Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Consistent schedule:</strong> Go to bed and wake up at the same time daily - even on weekends! This strengthens your body's sleep-wake cycle.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Create a relaxing routine:</strong> Spend 30-60 minutes winding down before bed. Read, take a warm bath, or practice gentle stretching.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Optimize your bedroom:</strong> Keep it dark (blackout curtains), cool (18-22°C), and quiet. Consider white noise or earplugs if needed.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Avoid sleep disruptors:</strong> No caffeine after 2pm, limit alcohol (disrupts REM sleep), avoid heavy meals 2-3 hours before bed.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Morning light exposure:</strong> Get 20-30 minutes of natural sunlight within 30 minutes of waking. This sets your circadian rhythm for the day.</span>
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
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
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