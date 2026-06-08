"use client";

import { useState, useRef, useEffect } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to use the timer?",
        a: "Set hours, minutes, and seconds, then click Start. The timer will count down and alert you when time is up.",
    },
    {
        q: "Can I pause the timer?",
        a: "Yes, click Pause to stop the timer. Click Resume to continue counting down.",
    },
    {
        q: "What happens when time is up?",
        a: "The timer will show 'Time's Up!' and play a notification sound (if enabled). You can reset to start a new timer.",
    },
    {
        q: "What is the maximum time I can set?",
        a: "You can set up to 99 hours, 59 minutes, and 59 seconds.",
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
    name: "Timer – Online Countdown Timer",
    description: "Free online countdown timer. Set hours, minutes, and seconds. Get alerts when time is up. Perfect for cooking, studying, and workouts.",
    url: "https://www.numrexo.com/time/timer",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Countdown timer", "Hours/Minutes/Seconds", "Pause/Resume", "Time's up alert"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://www.numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Timer", item: "https://www.numrexo.com/time/timer" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function Timer() {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1000) {
                        setIsRunning(false);
                        setIsComplete(true);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            setIsComplete(true);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, timeLeft]);

    const formatTime = (ms: number): string => {
        const totalSeconds = Math.floor(ms / 1000);
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const startTimer = () => {
        const hrs = parseInt(hours) || 0;
        const mins = parseInt(minutes) || 0;
        const secs = parseInt(seconds) || 0;

        const totalSeconds = hrs * 3600 + mins * 60 + secs;

        if (totalSeconds === 0) {
            alert("Please set a time greater than 0");
            return;
        }

        setTimeLeft(totalSeconds * 1000);
        setIsRunning(true);
        setIsComplete(false);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resumeTimer = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setIsComplete(false);
        setHours("");
        setMinutes("");
        setSeconds("");
    };

    const setQuickTime = (h: number, m: number, s: number) => {
        setHours(h.toString());
        setMinutes(m.toString());
        setSeconds(s.toString());
        const totalSeconds = h * 3600 + m * 60 + s;
        setTimeLeft(totalSeconds * 1000);
        setIsComplete(false);
        setIsRunning(false);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Timer</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Countdown Timer</h3>
                        <p className="text-xs text-gray-500 mt-1">Set hours, minutes, and seconds</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Hours</label><input type="number" placeholder="0" min="0" max="99" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-center" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Minutes</label><input type="number" placeholder="0" min="0" max="59" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-center" /></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Seconds</label><input type="number" placeholder="0" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-center" /></div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={startTimer} className="py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600">Start</button>
                            <button onClick={resetTimer} className="py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600">Reset</button>
                        </div>

                        {isRunning && (
                            <button onClick={pauseTimer} className="w-full py-3 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600">Pause</button>
                        )}
                        {!isRunning && timeLeft > 0 && !isComplete && (
                            <button onClick={resumeTimer} className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">Resume</button>
                        )}

                        <div className="pt-4 border-t border-gray-800">
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Quick Set</label>
                            <div className="grid grid-cols-4 gap-2">
                                <button onClick={() => setQuickTime(0, 1, 0)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">1 min</button>
                                <button onClick={() => setQuickTime(0, 5, 0)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">5 min</button>
                                <button onClick={() => setQuickTime(0, 10, 0)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">10 min</button>
                                <button onClick={() => setQuickTime(0, 15, 0)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">15 min</button>
                                <button onClick={() => setQuickTime(0, 30, 0)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">30 min</button>
                                <button onClick={() => setQuickTime(1, 0, 0)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">1 hour</button>
                                <button onClick={() => setQuickTime(0, 0, 30)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">30 sec</button>
                                <button onClick={() => setQuickTime(0, 0, 60)} className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">60 sec</button>
                            </div>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Timer"
                    isEmpty={!isComplete && timeLeft === 0 && !hours && !minutes && !seconds}
                    emptyIcon="⏲️"
                    emptyText="Set a time and press Start"
                    mainResult={isComplete ? { label: "Time's Up!", value: "Timer Complete!", color: "text-green-400" } : (timeLeft > 0 ? { label: "Time Remaining", value: formatTime(timeLeft), color: "text-blue-400" } : undefined)}
                    extraRows={[]}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Timer</h2><p className="text-gray-400 text-sm leading-relaxed">Free online countdown timer. Set hours, minutes, and seconds. Perfect for cooking, studying, workouts, and presentations.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">How to Use</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">⏰</div><div className="text-sm font-semibold text-green-400">Set Time</div><div className="text-xs text-gray-500">Enter hours/minutes/seconds</div></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">▶️</div><div className="text-sm font-semibold text-green-400">Start</div><div className="text-xs text-gray-500">Begin countdown</div></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">⏸️</div><div className="text-sm font-semibold text-yellow-400">Pause</div><div className="text-xs text-gray-500">Stop temporarily</div></div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3"><div className="text-2xl mb-1">🔁</div><div className="text-sm font-semibold text-red-400">Reset</div><div className="text-xs text-gray-500">Clear and start over</div></div>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}