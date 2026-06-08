"use client";

import { useState, useRef, useEffect } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to use the stopwatch?",
        a: "Click Start to begin timing, Lap to record split times, Pause to stop temporarily, and Reset to clear all times.",
    },
    {
        q: "What is lap time?",
        a: "Lap time records the time between laps. Each lap shows how long that specific segment took. Total time continues running.",
    },
    {
        q: "How accurate is the stopwatch?",
        a: "The stopwatch is accurate to 10 milliseconds (0.01 seconds). Perfect for sports, workouts, and timing events.",
    },
    {
        q: "Can I save my lap times?",
        a: "Yes, all lap times are displayed in a list. You can reset to clear them. Lap times are stored during the session.",
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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Stopwatch</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Online Stopwatch</h3>
                        <p className="text-xs text-gray-500 mt-1">Accurate to 0.01 seconds</p>
                    </div>
                    <div className="p-6 text-center">
                        <div className="text-5xl md:text-6xl font-mono font-bold text-blue-400 mb-6">
                            {totalTimeFormatted}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {!isRunning ? (
                                <button onClick={handleStart} className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600">Start</button>
                            ) : (
                                <button onClick={handlePause} className="px-6 py-3 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600">Pause</button>
                            )}
                            <button onClick={handleLap} disabled={!isRunning} className={`px-6 py-3 rounded-lg font-semibold ${isRunning ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 cursor-not-allowed"} text-white`}>Lap</button>
                            <button onClick={handleReset} className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Lap Times"
                    isEmpty={laps.length === 0}
                    emptyIcon="⏱️"
                    emptyText="Press 'Lap' to record split times"
                    mainResult={laps.length > 0 ? { label: "Latest Lap", value: formatLapTime(laps[0]), color: "text-green-400" } : undefined}
                    extraRows={laps.slice(0, 10).map((lap, i) => ({ label: `Lap ${laps.length - i}`, value: formatLapTime(lap) }))}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Stopwatch</h2><p className="text-gray-400 text-sm leading-relaxed">Free online stopwatch with lap timing. Perfect for workouts, cooking, races, and any timing needs. Accurate to 10 milliseconds.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">How to Use</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">▶️</div><div className="text-sm font-semibold text-green-400">Start</div><div className="text-xs text-gray-500">Begin timing</div></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">⏸️</div><div className="text-sm font-semibold text-yellow-400">Pause</div><div className="text-xs text-gray-500">Stop temporarily</div></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">🔄</div><div className="text-sm font-semibold text-blue-400">Lap</div><div className="text-xs text-gray-500">Record split time</div></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">🔁</div><div className="text-sm font-semibold text-red-400">Reset</div><div className="text-xs text-gray-500">Clear all times</div></div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}