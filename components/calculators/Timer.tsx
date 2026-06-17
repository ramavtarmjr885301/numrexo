"use client";

import { useState, useRef, useEffect } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to use the timer?",
        a: "Set hours, minutes, and seconds using the input fields or quick-set buttons, then click Start. The timer will count down and alert you when time is up. You can pause and resume anytime. The timer shows the remaining time in HH:MM:SS format. Perfect for cooking, studying, workouts, and any timed activity.",
    },
    {
        q: "Can I pause the timer?",
        a: "Yes, click Pause to stop the timer. Click Resume to continue counting down from where you left off. Pausing is useful when you need to step away from your activity or when you're interrupted. The timer remembers your remaining time until you reset it.",
    },
    {
        q: "What happens when time is up?",
        a: "The timer will show 'Time's Up!' prominently on the display and play a notification sound (if enabled). The timer stops automatically, and the display shows the completion state. You can reset to start a new timer or set a new time. The sound notification helps you notice the timer even if you're not watching the screen.",
    },
    {
        q: "What is the maximum time I can set?",
        a: "You can set up to 99 hours, 59 minutes, and 59 seconds. This gives you nearly 4 days of timer capacity - enough for most practical applications. For longer durations, consider using a countdown calendar or date-based timer.",
    },
    {
        q: "Can I use keyboard shortcuts?",
        a: "Yes! Keyboard shortcuts: Spacebar - Start/Pause, R - Reset, Enter - Start timer. These shortcuts make it easier to control the timer without using your mouse. Perfect for when you're in the middle of a workout or cooking and need to quickly control the timer.",
    },
    {
        q: "Does the timer work offline?",
        a: "Yes! Once the page loads, the timer works completely offline. No internet connection is needed to set, start, pause, or complete a timer. This makes it perfect for use in kitchens, gyms, classrooms, or anywhere without internet access.",
    },
    {
        q: "What are common timer use cases?",
        a: "Common uses: 1) Cooking - timing boiling eggs, pasta, baking, 2) Studying - Pomodoro technique (25 min), 3) Workouts - interval training, plank holds, 4) Presentations - timing speaking slots, 5) Meditation - guided sessions, 6) Sleep - power naps (20 min), 7) Laundry - washing cycles, 8) Parking - tracking time limits.",
    },
    {
        q: "How accurate is the timer?",
        a: "The timer is accurate to 1 second, making it reliable for most everyday timing needs. While JavaScript timers can have slight drift over long periods, for practical purposes (up to several hours), the accuracy is sufficient for cooking, studying, workouts, and most daily activities.",
    },
    {
        q: "What is the Pomodoro Technique?",
        a: "The Pomodoro Technique is a time management method using a timer to break work into intervals (typically 25 minutes of focused work followed by 5-minute breaks). After 4 intervals, take a longer break (15-30 minutes). Our timer's quick-set buttons make it perfect for Pomodoro sessions - just set 25 minutes and start!",
    },
    {
        q: "Can I save my timer settings?",
        a: "Currently, the timer resets when you refresh the page. For recurring timers, use the quick-set buttons or remember your settings. We're working on a feature to save common timer presets. In the meantime, you can use the quick-set buttons for your most-used timers.",
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

const QUICK_TIMES = [
    { label: "30 sec", h: 0, m: 0, s: 30 },
    { label: "1 min", h: 0, m: 1, s: 0 },
    { label: "2 min", h: 0, m: 2, s: 0 },
    { label: "5 min", h: 0, m: 5, s: 0 },
    { label: "10 min", h: 0, m: 10, s: 0 },
    { label: "15 min", h: 0, m: 15, s: 0 },
    { label: "20 min", h: 0, m: 20, s: 0 },
    { label: "25 min", h: 0, m: 25, s: 0 },
    { label: "30 min", h: 0, m: 30, s: 0 },
    { label: "45 min", h: 0, m: 45, s: 0 },
    { label: "1 hour", h: 1, m: 0, s: 0 },
    { label: "2 hours", h: 2, m: 0, s: 0 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Timer() {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1000) {
                        setIsRunning(false);
                        setIsComplete(true);
                        playSound();
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            setIsComplete(true);
            playSound();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, timeLeft]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return;

            if (e.code === 'Space') {
                e.preventDefault();
                if (isRunning) {
                    pauseTimer();
                } else if (timeLeft > 0 && !isComplete) {
                    resumeTimer();
                } else if (isComplete) {
                    resetTimer();
                } else {
                    startTimer();
                }
            } else if (e.key === 'r' || e.key === 'R') {
                resetTimer();
            } else if (e.key === 'Enter') {
                if (!isRunning && !isComplete && timeLeft === 0) {
                    startTimer();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning, timeLeft, isComplete]);

    const playSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            // Silent fallback if audio is not supported
        }
    };

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

    const displayTime = isComplete ? "00:00:00" : formatTime(timeLeft);

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
                        <span itemProp="name" className="text-gray-300">Timer</span>
                        <meta itemProp="position" content="3" />
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input Form */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Countdown Timer</h3>
                        <p className="text-xs text-gray-500 mt-1">Set hours, minutes, and seconds • Keyboard: Space (Start/Pause), R (Reset)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Hours</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    max="99"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-center focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Minutes</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    max="59"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-center focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Seconds</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    max="59"
                                    value={seconds}
                                    onChange={(e) => setSeconds(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-center focus:border-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={startTimer}
                                disabled={isRunning || isComplete}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isRunning || isComplete
                                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                            >
                                Start
                            </button>
                            <button
                                onClick={resetTimer}
                                className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
                            >
                                Reset
                            </button>
                        </div>

                        {isRunning && (
                            <button
                                onClick={pauseTimer}
                                className="w-full py-3 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-all"
                            >
                                Pause
                            </button>
                        )}
                        {!isRunning && timeLeft > 0 && !isComplete && (
                            <button
                                onClick={resumeTimer}
                                className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
                            >
                                Resume
                            </button>
                        )}

                        <div className="pt-4 border-t border-gray-800">
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Quick Set</label>
                            <div className="grid grid-cols-4 gap-2">
                                {QUICK_TIMES.map((qt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setQuickTime(qt.h, qt.m, qt.s)}
                                        className="px-2 py-2 text-sm bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500 transition-all text-gray-300 hover:text-white"
                                    >
                                        {qt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Box */}
                <ResultBox
                    title="Timer"
                    isEmpty={!isComplete && timeLeft === 0 && !hours && !minutes && !seconds}
                    emptyIcon="⏲️"
                    emptyText="Set a time and press Start • Spacebar to start/pause"
                    mainResult={
                        isComplete
                            ? { label: "Time's Up!", value: "Timer Complete! 🎉", color: "text-green-400" }
                            : timeLeft > 0
                                ? { label: "Time Remaining", value: displayTime, color: "text-blue-400" }
                                : undefined
                    }
                    extraRows={
                        isComplete
                            ? [{ label: "Status", value: "Completed", valueColor: "text-green-400" }]
                            : timeLeft > 0
                                ? [
                                    { label: "Status", value: isRunning ? "Running ⏳" : "Paused ⏸️", valueColor: isRunning ? "text-green-400" : "text-yellow-400" },
                                    { label: "Remaining", value: displayTime },
                                ]
                                : []
                    }
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1700 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Timer</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Online Timer</strong> is a free, accurate countdown timer perfect for cooking, studying, workouts, presentations, and any activity that requires precise timing. Set hours, minutes, and seconds, then start the countdown.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Features include pause/resume functionality, quick-set buttons for common times, keyboard shortcuts for hands-free control, and a sound notification when time is up. The timer works offline after the page loads.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're using the Pomodoro Technique for studying, timing your workout intervals, or cooking a perfect meal, our timer provides reliable countdown functionality with a clean, easy-to-use interface.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Timer</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">hours, minutes, and seconds</strong> in the input fields.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Or use <strong className="text-white">Quick Set</strong> buttons for common times (30 sec to 2 hours).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">Start</strong> (or press <strong className="text-white">Spacebar</strong>) to begin the countdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">Pause</strong> (or press <strong className="text-white">Spacebar</strong>) to temporarily stop.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Click <strong className="text-white">Resume</strong> to continue the countdown.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Click <strong className="text-white">Reset</strong> (or press <strong className="text-white">R</strong>) to clear and start over.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use This Timer?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Hands-Free Control</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Keyboard shortcuts (Spacebar to start/pause, R to reset) let you control the timer without interrupting your activity.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Quick Presets</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">12 common timer presets from 30 seconds to 2 hours. One click to set your timer for cooking, studying, or workouts.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Offline Functionality</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Works without internet after page load. Perfect for kitchens, gyms, and anywhere without WiFi.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Sound Notification</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Get an audible alert when your timer completes. Helps you notice the timer even when not watching the screen.</p>
                    </div>
                </div>
            </section>

            {/* Common Timer Presets */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Common Timer Presets</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🍳</div>
                        <p className="text-sm font-semibold text-gray-200">Boiled Eggs</p>
                        <p className="text-xs text-gray-500">6-10 minutes</p>
                        <button onClick={() => setQuickTime(0, 7, 0)} className="mt-2 px-4 py-1 text-xs bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">Set 7 min</button>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">📚</div>
                        <p className="text-sm font-semibold text-gray-200">Pomodoro</p>
                        <p className="text-xs text-gray-500">25 min focus</p>
                        <button onClick={() => setQuickTime(0, 25, 0)} className="mt-2 px-4 py-1 text-xs bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">Set 25 min</button>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">💪</div>
                        <p className="text-sm font-semibold text-gray-200">Plank Hold</p>
                        <p className="text-xs text-gray-500">1-2 minutes</p>
                        <button onClick={() => setQuickTime(0, 1, 0)} className="mt-2 px-4 py-1 text-xs bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">Set 1 min</button>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500/50 transition-all">
                        <div className="text-2xl mb-1">🧘</div>
                        <p className="text-sm font-semibold text-gray-200">Meditation</p>
                        <p className="text-xs text-gray-500">5-20 minutes</p>
                        <button onClick={() => setQuickTime(0, 10, 0)} className="mt-2 px-4 py-1 text-xs bg-[#0f1525] border border-gray-700 rounded-lg hover:border-blue-500">Set 10 min</button>
                    </div>
                </div>
            </section>

            {/* Timer Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Timer Tips</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Use keyboard shortcuts:</strong> Spacebar starts/pauses the timer, R resets it. This keeps your hands free for your activity.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Pomodoro Technique:</strong> Set 25 minutes of focused work, then take a 5-minute break. Repeat 4 times, then take a longer break (15-30 minutes).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Cooking timing:</strong> Use the quick-set buttons for common cooking times. Start the timer when you put food on the stove to avoid overcooking.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Workout intervals:</strong> Use the timer for interval training. Set work and rest periods, and use the pause button between rounds.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-400">
                        <span className="text-blue-400 mt-0.5">💡</span>
                        <span><strong className="text-gray-300">Bookmark for quick access:</strong> Bookmark the timer in your browser for instant access. Works offline after the first load.</span>
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