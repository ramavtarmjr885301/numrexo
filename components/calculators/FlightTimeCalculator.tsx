"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate flight time?",
        a: "Flight time = Distance ÷ Average speed. Commercial jets cruise at 550-600 mph (880-965 km/h). Add 30-60 minutes for takeoff, landing, and taxiing.",
    },
    {
        q: "What affects flight duration?",
        a: "Wind speed and direction (headwind increases time, tailwind decreases), air traffic, weather, airport congestion, and aircraft type.",
    },
    {
        q: "What is the average speed of commercial airplanes?",
        a: "Boeing 737: 520-580 mph (835-930 km/h), Airbus A320: 510-560 mph (820-900 km/h), Boeing 777: 560-590 mph (900-950 km/h).",
    },
    {
        q: "How to calculate time zones difference?",
        a: "Flying west (e.g., NY to LA) adds hours due to time zones. Flying east (LA to NY) subtracts hours.",
    },
    {
        q: "How does wind affect flight time?",
        a: "Headwind (wind against flight direction) increases flight time by 5-15%. Tailwind (wind with flight direction) decreases flight time by 5-10%. Example: NY to London takes 7h 15m (tailwind), London to NY takes 8h 0m (headwind).",
    },
    {
        q: "What is the longest commercial flight?",
        a: "Current longest flights: Singapore to New York (9,537 miles, 18h 40m), Auckland to Dubai (8,823 miles, 17h 10m), Perth to London (9,009 miles, 17h 15m). These use ultra-long-range aircraft like Airbus A350-900ULR.",
    },
    {
        q: "How to calculate time zone changes?",
        a: "Time zone difference = (Destination Longitude - Origin Longitude) ÷ 15. Flying west (e.g., NY to LA): Add 3 hours. Flying east (LA to NY): Subtract 3 hours. Use time zone converter for accurate local arrival time.",
    },
    {
        q: "What is the difference between flight time and elapsed time?",
        a: "Flight time = wheels up to wheels down (actual flying). Elapsed time = gate departure to gate arrival (includes taxi, takeoff, landing). Elapsed time is typically 30-60 minutes longer than pure flight time.",
    },
    {
        q: "How to estimate fuel consumption based on flight time?",
        a: "Fuel consumption (average): Boeing 737 burns 750 gal/hour, Airbus A320 burns 800 gal/hour, Boeing 777 burns 2,500 gal/hour. Example: 2-hour flight on 737 = ~1,500 gallons. Fuel cost = gallons × jet fuel price ($3-5 per gallon).",
    },
    {
        q: "What is the average speed of private jets?",
        a: "Private jet speeds: Citation CJ4 (440 mph), Gulfstream G650 (610 mph), Bombardier Global 7500 (610 mph), Embraer Phenom 300 (520 mph). Private jets can fly higher (45,000-51,000 ft) and often faster than commercial airliners.",
    },
];

const AIRPLANE_SPEEDS = [
    { aircraft: "Boeing 737", speedMph: 550, speedKmh: 885, icon: "✈️" },
    { aircraft: "Airbus A320", speedMph: 540, speedKmh: 870, icon: "✈️" },
    { aircraft: "Boeing 777", speedMph: 575, speedKmh: 925, icon: "✈️" },
    { aircraft: "Airbus A380", speedMph: 560, speedKmh: 900, icon: "✈️" },
    { aircraft: "Embraer E175", speedMph: 520, speedKmh: 835, icon: "✈️" },
    { aircraft: "Average Commercial", speedMph: 550, speedKmh: 885, icon: "✈️" },
];

const MAJOR_ROUTES = [
    { route: "New York → London", distance: 3450, time: "7h 15m" },
    { route: "London → Dubai", distance: 3400, time: "7h 0m" },
    { route: "Los Angeles → Tokyo", distance: 5470, time: "11h 30m" },
    { route: "Singapore → Sydney", distance: 3900, time: "8h 0m" },
    { route: "Paris → New York", distance: 3630, time: "8h 0m" },
    { route: "Mumbai → London", distance: 4470, time: "9h 15m" },
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
    name: "Flight Time Calculator – Estimate Flight Duration",
    description: "Calculate flight time between cities based on distance and aircraft speed.",
    url: "https://www.numrexo.com/travel/flight-time-calculator",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Flight duration", "Aircraft speed selection", "Distance calculator"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://www.numrexo.com/travel" },
        { "@type": "ListItem", position: 3, name: "Flight Time Calculator", item: "https://www.numrexo.com/travel/flight-time-calculator" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function FlightTimeCalculator() {
    const [distance, setDistance] = useState("");
    const [unit, setUnit] = useState<"miles" | "km">("miles");
    const [aircraft, setAircraft] = useState(AIRPLANE_SPEEDS[5].aircraft);
    const [addTime, setAddTime] = useState("30");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const getAircraftSpeed = () => {
        const selected = AIRPLANE_SPEEDS.find(a => a.aircraft === aircraft);
        if (!selected) return unit === "miles" ? 550 : 885;
        return unit === "miles" ? selected.speedMph : selected.speedKmh;
    };

    const calculate = () => {
        let dist = parseFloat(distance);
        const extraMinutes = parseFloat(addTime) || 0;

        if (!dist || dist <= 0) {
            alert("Please enter a valid distance");
            return;
        }

        const speed = getAircraftSpeed();
        let timeHours = dist / speed;
        const extraHours = extraMinutes / 60;
        timeHours += extraHours;

        const hours = Math.floor(timeHours);
        const minutes = Math.round((timeHours - hours) * 60);

        let timeString = "";
        if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
        if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        if (hours === 0 && minutes === 0) timeString = "< 1 minute";

        setResult({
            distance: dist,
            unit,
            timeHours: timeHours.toFixed(2),
            timeString,
            aircraft,
            speed,
            extraMinutes,
        });
    };

    const resetForm = () => {
        setDistance("");
        setUnit("miles");
        setAircraft(AIRPLANE_SPEEDS[5].aircraft);
        setAddTime("30");
        setResult(null);
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/travel" itemProp="item" className="hover:text-gray-300">Travel Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Flight Time Calculator</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Flight Time Estimator</h3>
                        <p className="text-xs text-gray-500 mt-1">Estimate flight duration between cities</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label><div className="relative"><input type="number" placeholder="3450" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit === "miles" ? "mi" : "km"}</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Unit</label><div className="grid grid-cols-2 gap-2"><button className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "miles" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("miles")}>Miles</button><button className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "km" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("km")}>Kilometers</button></div></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Aircraft Type</label><select value={aircraft} onChange={(e) => setAircraft(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{AIRPLANE_SPEEDS.map(a => <option key={a.aircraft} value={a.aircraft}>{a.icon} {a.aircraft}</option>)}</select></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Extra Time (takeoff, landing, taxi) - minutes</label><div className="relative"><input type="number" step="5" placeholder="30" value={addTime} onChange={(e) => setAddTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">min</span></div></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Flight Time →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Flight Duration"
                    isEmpty={!result}
                    emptyIcon="✈️"
                    emptyText="Enter distance to calculate flight time"
                    mainResult={result ? { label: "Estimated Flight Time", value: result.timeString, color: "text-cyan-400" } : undefined}
                    extraRows={result ? [
                        { label: "Distance", value: `${result.distance.toLocaleString()} ${result.unit === "miles" ? "miles" : "km"}` },
                        { label: "Aircraft Speed", value: `${result.speed} ${result.unit === "miles" ? "mph" : "km/h"}` },
                        { label: "Pure Flying Time", value: `${result.timeHours} hours` },
                        { label: "Extra Time Added", value: `${result.extraMinutes} minutes` },
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Flight Time Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Flight Time Calculator</strong> helps travelers, pilots, and aviation enthusiasts estimate flight duration between any two cities. Based on distance and aircraft speed, with extra time for takeoff, landing, and taxiing.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're planning a trip, comparing routes, or just curious about flight times, this calculator provides accurate estimates for commercial and private aircraft.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Flight Time Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter the <strong className="text-white">flight distance</strong> in miles or kilometers.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Select the <strong className="text-white">aircraft type</strong> (Boeing 737, Airbus A320, etc.) or use average commercial speed.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Add <strong className="text-white">extra time</strong> for takeoff, landing, and taxi (typically 30 minutes).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Click <strong className="text-white">"Calculate Flight Time"</strong> to see estimated duration.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and try different scenarios.</p>
                </div>
            </section>

            {/* Why Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Flight Time Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-2">✓ Trip Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Plan your itinerary with accurate flight durations. Schedule connecting flights, hotel check-ins, and ground transportation.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Jet Lag Preparation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know your flight duration to prepare for time zone changes. Plan sleep schedules and hydration strategies.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Private Aviation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Private jet charter clients can estimate flight times and fuel costs for budget planning.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Flight Comparison</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare different aircraft types and routes to choose the most time-efficient option.</p>
                    </div>
                </div>
            </section>

            {/* Factors Affecting Flight Duration */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Factors That Affect Flight Duration</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-cyan-400 mt-0.5">•</span><span><strong className="text-gray-300">Wind Speed & Direction:</strong> Headwind adds 5-15% to flight time, tailwind reduces time by 5-10%.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-cyan-400 mt-0.5">•</span><span><strong className="text-gray-300">Air Traffic Control:</strong> Congested airspace (NY, London, Dubai) adds 10-30 minutes due to holding patterns.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-cyan-400 mt-0.5">•</span><span><strong className="text-gray-300">Weather Conditions:</strong> Storms, turbulence, or extreme temperatures may require route deviations.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-cyan-400 mt-0.5">•</span><span><strong className="text-gray-300">Airport Congestion:</strong> Major airports add 15-30 minutes for taxi and takeoff queues.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-cyan-400 mt-0.5">•</span><span><strong className="text-gray-300">Aircraft Type:</strong> Different planes have different cruising speeds (private jets often faster).</span></li>
                </ul>
            </section>

            {/* Time Zone & Jet Lag Guide */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Time Zone & Jet Lag Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">🕐 Time Zone Calculation</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Time difference = (Destination Longitude - Origin Longitude) ÷ 15. Flying west adds hours, flying east subtracts hours. Use our converter for accurate local arrival time.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">🌙 Jet Lag Recovery</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Estimate 1 day recovery per time zone crossed. Example: NY to London (5 time zones) = 5 days adjustment. Stay hydrated, adjust sleep schedule before departure.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Flight Time Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Estimate flight duration based on distance and aircraft speed. Includes extra time for takeoff, landing, and taxiing.</p>
            </section>

            {/* Major Route Flight Times */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Major Route Flight Times</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Route</th><th className="text-left py-3 px-4 text-gray-400">Distance (mi)</th><th className="text-left py-3 px-4 text-gray-400">Est. Flight Time</th></tr></thead>
                        <tbody>
                            {MAJOR_ROUTES.map((route, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{route.route}</td><td className="py-2 px-4 text-yellow-400">{route.distance} mi</td><td className="py-2 px-4 text-cyan-400">{route.time}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Aircraft Speed Reference */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Aircraft Speed Reference</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Aircraft</th><th className="text-left py-3 px-4 text-gray-400">Speed (mph)</th><th className="text-left py-3 px-4 text-gray-400">Speed (km/h)</th></tr></thead>
                        <tbody>
                            {AIRPLANE_SPEEDS.map((plane, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{plane.icon} {plane.aircraft}</td><td className="py-2 px-4 text-yellow-400">{plane.speedMph} mph</td><td className="py-2 px-4 text-gray-400">{plane.speedKmh} km/h</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-gray-400 leading-relaxed" itemProp="text">{item.a}</p>
                            </div>
                            {openFaq !== i && <span className="sr-only" itemProp="text">{item.a}</span>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}