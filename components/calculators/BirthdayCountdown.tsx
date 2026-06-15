"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How to calculate days until my birthday?",
        a: "Count the days from today to your next birthday. If your birthday has already passed this year, it counts to next year's birthday.",
    },
    {
        q: "What if my birthday is on February 29?",
        a: "In non-leap years, February 28 or March 1 is often used as the celebration date. Our calculator uses February 28 for non-leap years.",
    },
    {
        q: "How to calculate age in years, months, and days?",
        a: "Subtract birth date from current date. Years = difference in years, months = remaining months, days = remaining days.",
    },
    {
        q: "What zodiac sign am I?",
        a: "Zodiac signs are based on birth date: Aries (Mar21-Apr19), Taurus (Apr20-May20), Gemini (May21-Jun20), Cancer (Jun21-Jul22), Leo (Jul23-Aug22), Virgo (Aug23-Sep22), Libra (Sep23-Oct22), Scorpio (Oct23-Nov21), Sagittarius (Nov22-Dec21), Capricorn (Dec22-Jan19), Aquarius (Jan20-Feb18), Pisces (Feb19-Mar20).",
    },
];

const ZODIAC_SIGNS = [
    { sign: "Capricorn", start: "12-22", end: "01-19", symbol: "♑", element: "Earth" },
    { sign: "Aquarius", start: "01-20", end: "02-18", symbol: "♒", element: "Air" },
    { sign: "Pisces", start: "02-19", end: "03-20", symbol: "♓", element: "Water" },
    { sign: "Aries", start: "03-21", end: "04-19", symbol: "♈", element: "Fire" },
    { sign: "Taurus", start: "04-20", end: "05-20", symbol: "♉", element: "Earth" },
    { sign: "Gemini", start: "05-21", end: "06-20", symbol: "♊", element: "Air" },
    { sign: "Cancer", start: "06-21", end: "07-22", symbol: "♋", element: "Water" },
    { sign: "Leo", start: "07-23", end: "08-22", symbol: "♌", element: "Fire" },
    { sign: "Virgo", start: "08-23", end: "09-22", symbol: "♍", element: "Earth" },
    { sign: "Libra", start: "09-23", end: "10-22", symbol: "♎", element: "Air" },
    { sign: "Scorpio", start: "10-23", end: "11-21", symbol: "♏", element: "Water" },
    { sign: "Sagittarius", start: "11-22", end: "12-21", symbol: "♐", element: "Fire" },
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
    name: "Birthday Countdown – Days Until Birthday",
    description: "Calculate days until your next birthday, countdown to celebration, and find your zodiac sign.",
    url: "https://www.numrexo.com/time/birthday-countdown",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Days until birthday", "Age calculation", "Zodiac sign", "Birthday countdown"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://www.numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://www.numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Birthday Countdown", item: "https://www.numrexo.com/time/birthday-countdown" },
    ],
});

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getZodiacSign(month: number, day: number): string {
    const date = `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    return "Sagittarius";
}

function getZodiacDetails(sign: string) {
    return ZODIAC_SIGNS.find(z => z.sign === sign) || ZODIAC_SIGNS[0];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BirthdayCountdown() {
    const [birthDate, setBirthDate] = useState("");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        if (!birthDate) {
            alert("Please select your birth date");
            return;
        }

        const birth = new Date(birthDate);
        const today = new Date();

        // Calculate age
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        // Calculate next birthday
        let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
        }

        const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Calculate age in months and days
        let monthsOld = 0;
        let daysOld = 0;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            monthsOld = 12 + monthDiff;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            daysOld = lastMonth.getDate() + dayDiff;
        } else {
            monthsOld = monthDiff;
            daysOld = dayDiff;
        }

        // Zodiac sign
        const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());
        const zodiacDetails = getZodiacDetails(zodiacSign);

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        setResult({
            birthDate: birth.toLocaleDateString('en-US', options),
            age,
            monthsOld: monthsOld >= 0 ? monthsOld : 0,
            daysOld: daysOld >= 0 ? daysOld : 0,
            nextBirthday: nextBirthday.toLocaleDateString('en-US', options),
            daysUntil,
            zodiacSign,
            zodiacSymbol: zodiacDetails.symbol,
            zodiacElement: zodiacDetails.element,
            nextAge: age + 1,
        });
    };

    const resetForm = () => {
        setBirthDate("");
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
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://www.numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Birthday Countdown</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">Birthday Countdown</h3>
                        <p className="text-xs text-gray-500 mt-1">Count days until your next birthday</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Your Birth Date</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={calculate}
                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                            >
                                Calculate Countdown →
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
                    title="Birthday Countdown"
                    isEmpty={!result}
                    emptyIcon="🎂"
                    emptyText="Enter your birth date"
                    mainResult={result ? { label: "Days Until Your Next Birthday", value: `${result.daysUntil} days`, color: "text-pink-400" } : undefined}
                    extraRows={result ? [
                        { label: "Your Age", value: `${result.age} years, ${result.monthsOld} months, ${result.daysOld} days` },
                        { label: "Next Birthday", value: result.nextBirthday },
                        { label: "You'll Turn", value: `${result.nextAge} years old`, valueColor: "text-yellow-400" },
                        { label: "Zodiac Sign", value: `${result.zodiacSymbol} ${result.zodiacSign} (${result.zodiacElement})`, valueColor: "text-purple-400" },
                    ] : []}
                />
            </div>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">About Birthday Countdown</h2><p className="text-gray-400 text-sm leading-relaxed">Count down the days until your next birthday. Also find your exact age in years, months, and days, and discover your zodiac sign.</p></section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Zodiac Signs</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Sign</th><th className="text-left py-3 px-4 text-gray-400">Dates</th><th className="text-left py-3 px-4 text-gray-400">Symbol</th><th className="text-left py-3 px-4 text-gray-400">Element</th></tr></thead>
                        <tbody>
                            {ZODIAC_SIGNS.map((zodiac, i) => (<tr key={i} className="border-b border-gray-800/50 hover:bg-white/5"><td className="py-2 px-4 text-yellow-400">{zodiac.sign}</td><td className="py-2 px-4 text-gray-300">{zodiac.start} to {zodiac.end}</td><td className="py-2 px-4 text-center text-xl">{zodiac.symbol}</td><td className="py-2 px-4 text-gray-400">{zodiac.element}</td></tr>))}
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