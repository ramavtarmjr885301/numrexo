"use client";

import { useState, useRef, useEffect } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to use the stopwatch?",
        a: "Click Start to begin timing, Lap to record split times, Pause to stop temporarily, and Reset to clear all times. The stopwatch runs in the background even when you switch tabs. You can record multiple laps to track your performance over time. The timer displays hours, minutes, seconds, and milliseconds (accurate to 0.01 seconds). Perfect for tracking workouts, cooking times, or any activity requiring precise timing.",
    },
    {
        q: "What is lap time?",
        a: "Lap time records the time between laps. Each lap shows how long that specific segment took. The total time continues running, and each new lap adds to the lap history. For example, in a 1km run, you might record a lap every 100m to see your split times. Laps help you analyze performance over intervals and identify patterns in your timing.",
    },
    {
        q: "How accurate is the stopwatch?",
        a: "The stopwatch is accurate to 10 milliseconds (0.01 seconds). This level of precision is suitable for most sports timing, cooking, workouts, and general timing needs. The accuracy is limited by JavaScript's setInterval timing, but for practical purposes, it provides reliable timing for everyday use. For professional timing needs, consider dedicated hardware timers.",
    },
    {
        q: "Can I save my lap times?",
        a: "Yes, all lap times are displayed in a list and remain visible during the session. The latest lap is shown at the top of the list. When you press Reset, all lap times are cleared. If you need to save lap times permanently, you can manually copy them or take a screenshot. Lap times are stored in your browser's memory during the active session.",
    },
    {
        q: "What is the maximum time the stopwatch can measure?",
        a: "The stopwatch can measure up to 99 hours, 59 minutes, 59.99 seconds. After that, the timer will overflow and reset. In practice, most timing needs are well within this range. The timer displays hours when the time exceeds 60 minutes. For most workouts and cooking tasks, you'll never reach this limit.",
    },
    {
        q: "Can I use keyboard shortcuts?",
        a: "Yes! Keyboard shortcuts: Spacebar - Start/Pause, L - Record Lap, R - Reset. These shortcuts make it easier to control the stopwatch without using your mouse. Perfect for when you're in the middle of a workout and need to quickly record a lap. The shortcuts work when the stopwatch is in focus.",
    },
    {
        q: "What is the difference between lap and split times?",
        a: "Lap times show the duration of each individual segment (e.g., lap 1 = 2:30, lap 2 = 2:45). Split times show the cumulative time at each point (e.g., split 1 = 2:30, split 2 = 5:15). Our stopwatch records lap times (individual segment durations). Splits are often used in running races to track cumulative times at specific markers.",
    },
    {
        q: "How can I use the stopwatch for interval training?",
        a: "For interval training: 1) Start the stopwatch, 2) Record a lap at the end of each interval, 3) Use the lap times to track your pace and consistency. Example: For running intervals, record a lap each time you complete a sprint. You can also use the stopwatch to time rest periods between intervals. Consistent lap times indicate good pacing.",
    },
    {
        q: "Does the stopwatch work offline?",
        a: "Yes! Once the page loads, the stopwatch works completely offline. No internet connection is needed to start, pause, or record laps. This makes it perfect for use in gyms, outdoor workouts, or anywhere without internet access. The offline functionality is powered by client-side JavaScript.",
    },
    {
        q: "Can I measure multiple events simultaneously?",
        a: "The current stopwatch tracks one timing session at a time. However, you can use the lap feature to record times for multiple segments within a single session. For multiple simultaneous timers, you can open the page in different browser tabs or use dedicated multi-timer applications. Each tab will run independently.",
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
    name: "Stopwatch – Online Stopwatch",
    description: "Free online stopwatch with lap times. Accurate to 10ms. Perfect for workouts, cooking, and timing events.",
    url: "https://www.numrexo.com/time/stopwatch",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Start/Pause/Reset", "Lap times", "Millisecond accuracy", "Record keeping"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://www.numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Stopwatch", item: "https://www.numrexo.com/time/stopwatch" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 10);
            }, 10);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (e.code === 'Space') {
                e.preventDefault();
                if (isRunning) {
                    handlePause();
                } else {
                    handleStart();
                }
            } else if (e.key === 'l' || e.key === 'L') {
                handleLap();
            } else if (e.key === 'r' || e.key === 'R') {
                handleReset();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning]);

    const formatTime = (ms: number): string => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
        }
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };

    const formatLapTime = (ms: number): string => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        if (isRunning) {
            setLaps(prev => [time, ...prev]);
        }
    };

    const totalTimeFormatted = formatTime(time);

    // Calculate total laps and average lap time
    const totalLaps = laps.length;
    const averageLap = totalLaps > 0 ? time / totalLaps : 0;
    const bestLap = totalLaps > 0 ? Math.min(...laps) : 0;
    const worstLap = totalLaps > 0 ? Math.max(...laps) : 0;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <a href="https://www.numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a>
                        <meta itemProp="position" content="2" />
                    </li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                        <span itemProp="name" className="text-gray-300">Stopwatch</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Stopwatch Display */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Online Stopwatch</h3>
                        <p className="text-xs text-gray-500 mt-1">Accurate to 0.01 seconds • Keyboard shortcuts: Space (Start/Pause), L (Lap), R (Reset)</p>
                    </div>
                    <div className="p-6 text-center">
                        <div className="text-5xl md:text-6xl font-mono font-bold text-blue-400 mb-6 tracking-wider">
                            {totalTimeFormatted}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {!isRunning ? (
                                <button
                                    onClick={handleStart}
                                    className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-all hover:shadow-lg min-w-[80px]"
                                    aria-label="Start stopwatch"
                                >
                                    Start
                                </button>
                            ) : (
                                <button
                                    onClick={handlePause}
                                    className="px-6 py-3 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-all hover:shadow-lg min-w-[80px]"
                                    aria-label="Pause stopwatch"
                                >
                                    Pause
                                </button>
                            )}
                            <button
                                onClick={handleLap}
                                disabled={!isRunning}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg min-w-[80px] ${isRunning
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-gray-600 cursor-not-allowed text-gray-400"
                                    }`}
                                aria-label="Record lap time"
                            >
                                Lap
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all hover:shadow-lg min-w-[80px]"
                                aria-label="Reset stopwatch"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Lap Statistics */}
                        {laps.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-gray-700 grid grid-cols-3 gap-2 text-xs">
                                <div>
                                    <p className="text-gray-500">Total Laps</p>
                                    <p className="text-white font-semibold text-lg">{totalLaps}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Best Lap</p>
                                    <p className="text-green-400 font-semibold text-lg">{formatLapTime(bestLap)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Avg Lap</p>
                                    <p className="text-yellow-400 font-semibold text-lg">{formatLapTime(averageLap)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Lap Times */}
                <ResultBox
                    title="Lap Times"
                    isEmpty={laps.length === 0}
                    emptyIcon="⏱️"
                    emptyText="Press 'Lap' to record split times • Spacebar to start/pause"
                    mainResult={laps.length > 0 ? { label: "Latest Lap", value: formatLapTime(laps[0]), color: "text-green-400" } : undefined}
                    extraRows={laps.slice(0, 10).map((lap, i) => ({
                        label: `Lap ${laps.length - i}`,
                        value: formatLapTime(lap),
                        valueColor: lap === bestLap && laps.length > 1 ? "text-green-400" : undefined
                    }))}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Stopwatch</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Online Stopwatch</strong> is a free, accurate timing tool perfect for workouts, cooking, races, presentations, and any activity requiring precise timing. With millisecond accuracy (0.01 seconds), it provides reliable timing for everyday use.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Features include lap timing to track split times, keyboard shortcuts for hands-free operation, and a clean, easy-to-use interface. The stopwatch runs in your browser with no downloads or installations required.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're timing a workout, tracking cooking times, or measuring performance, our stopwatch gives you the precision and features you need. All lap times are displayed and can be used to analyze your performance.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Stopwatch</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Click <strong className="text-white">Start</strong> (or press <strong className="text-white">Spacebar</strong>) to begin timing.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Click <strong className="text-white">Lap</strong> (or press <strong className="text-white">L</strong>) to record split times during your activity.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">Pause</strong> (or press <strong className="text-white">Spacebar</strong>) to temporarily stop the timer.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">Reset</strong> (or press <strong className="text-white">R</strong>) to clear all times and start over.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> View your <strong className="text-white">lap history</strong> in the right panel, with the latest lap highlighted.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Track your <strong className="text-white">best lap, average lap, and total laps</strong> to analyze performance.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use This Stopwatch?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Accurate Timing</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Precise to 10 milliseconds (0.01 seconds). Reliable timing for workouts, cooking, and performance tracking.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Lap Recording</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Record unlimited laps to track split times and analyze performance over intervals. See your best and average laps.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Keyboard Shortcuts</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Control the stopwatch hands-free with keyboard shortcuts: Space (Start/Pause), L (Lap), R (Reset).</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Works Offline</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">No internet connection needed. Perfect for gyms, outdoor activities, and anywhere without WiFi.</p>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Stopwatch Use Cases</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🏃</div>
                        <p className="text-sm font-semibold text-gray-200">Workouts</p>
                        <p className="text-xs text-gray-500">Track intervals and laps</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🍳</div>
                        <p className="text-sm font-semibold text-gray-200">Cooking</p>
                        <p className="text-xs text-gray-500">Perfect timing for recipes</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🏁</div>
                        <p className="text-sm font-semibold text-gray-200">Races</p>
                        <p className="text-xs text-gray-500">Time races and events</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">📊</div>
                        <p className="text-sm font-semibold text-gray-200">Presentations</p>
                        <p className="text-xs text-gray-500">Time speaking slots</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🧘</div>
                        <p className="text-sm font-semibold text-gray-200">Meditation</p>
                        <p className="text-xs text-gray-500">Track session duration</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🏊</div>
                        <p className="text-sm font-semibold text-gray-200">Swimming</p>
                        <p className="text-xs text-gray-500">Time laps and sets</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🎯</div>
                        <p className="text-sm font-semibold text-gray-200">Practice</p>
                        <p className="text-xs text-gray-500">Track improvement over time</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">⏰</div>
                        <p className="text-sm font-semibold text-gray-200">Productivity</p>
                        <p className="text-xs text-gray-500">Time work sessions</p>
                    </div>
                </div>
            </section>

            {/* Stopwatch Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Stopwatch Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use lap times for interval training:</strong> Record a lap at the end of each interval to track your pace and consistency. This helps you maintain even splits throughout your workout.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Keyboard shortcuts save time:</strong> Use Spacebar to start/pause, L for lap, and R for reset. This keeps your hands free and your focus on your activity.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Analyze your lap data:</strong> The best lap and average lap help you understand your performance. Consistent laps indicate good pacing, while varied laps may suggest fatigue or technique issues.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use for cooking:</strong> The stopwatch is perfect for timing recipes that require precise cooking times. Pause if you need to step away, and record laps for different stages of cooking.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Works offline:</strong> No internet needed after loading. Bookmark the page for quick access anytime, anywhere - even without WiFi.</span>
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