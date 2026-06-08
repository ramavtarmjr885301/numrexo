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
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Distance</label><div className="relative"><input type="number" placeholder="3450" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unit === "miles" ? "mi" : "km"}</span></div></div>
                            <div><label className="block text-xs font-semibold text-gray-400 mb-2">Unit</label><div className="grid grid-cols-2 gap-2"><button className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "miles" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("miles")}>Miles</button><button className={`py-2 rounded-lg text-sm font-medium transition-all ${unit === "km" ? "bg-blue-500 text-white" : "bg-[#0f1525] border border-gray-700"}`} onClick={() => setUnit("km")}>Kilometers</button></div></div>
                        </div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Aircraft Type</label><select value={aircraft} onChange={(e) => setAircraft(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{AIRPLANE_SPEEDS.map(a => <option key={a.aircraft} value={a.aircraft}>{a.icon} {a.aircraft}</option>)}</select></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Extra Time (takeoff, landing, taxi) - minutes</label><div className="relative"><input type="number" step="5" placeholder="30" value={addTime} onChange={(e) => setAddTime(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">min</span></div></div>
                        <button onClick={calculate} className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold hover:shadow-lg">Calculate Flight Time →</button>
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

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Flight Time Calculator</h2><p className="text-gray-400 text-sm leading-relaxed">Estimate flight duration based on distance and aircraft speed. Includes extra time for takeoff, landing, and taxiing.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Major Route Flight Times</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Route</th><th className="text-left py-3 px-4 text-gray-400">Distance (mi)</th><th className="text-left py-3 px-4 text-gray-400">Est. Flight Time</th></tr></thead>
                        <tbody>
                            {MAJOR_ROUTES.map((route, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{route.route}</td><td className="py-2 px-4 text-yellow-400">{route.distance} mi</td><td className="py-2 px-4 text-cyan-400">{route.time}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Aircraft Speed Reference</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Aircraft</th><th className="text-left py-3 px-4 text-gray-400">Speed (mph)</th><th className="text-left py-3 px-4 text-gray-400">Speed (km/h)</th></tr></thead>
                        <tbody>
                            {AIRPLANE_SPEEDS.map((plane, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-gray-300">{plane.icon} {plane.aircraft}</td><td className="py-2 px-4 text-yellow-400">{plane.speedMph} mph</td><td className="py-2 px-4 text-gray-400">{plane.speedKmh} km/h</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">{FAQ_DATA.map((item, i) => (<div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden"><button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="text-sm font-medium text-gray-200">{item.q}</span><span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span></button>{openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}</div>))}</div>
            </section>
        </>
    );
}