"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How many days until my birthday?",
        a: "The countdown runs from today to your next birthday. If this year's has already passed, it rolls to next year automatically. The figure is whole days, so a birthday tomorrow shows as 1 and a birthday today shows as 0 — the day itself, not a wait.",
    },
    {
        q: "What happens if my birthday is on 29 February?",
        a: "You get a real birthday roughly once every four years and a choice in between. This calculator counts to 28 February in ordinary years, which is the more common convention socially. Legally it varies: many systems treat 1 March as the day the age changes, on the reasoning that the full year is only complete then. The next four leap years are 2028, 2032, 2036 and 2040.",
    },
    {
        q: "Why does my birthday fall on a different weekday each year?",
        a: "A common year is 365 days, which is 52 weeks plus one day, so a birthday shifts forward one weekday each year — and two across a leap day. That is why the same date lands on a weekend roughly two years in seven, and why the pattern repeats on a 28-year cycle in the current calendar.",
    },
    {
        q: "How is my exact age worked out?",
        a: "Whole years since birth, then whole months since your last birthday, then the days left over — the same way an official form asks for it. It is not the total days divided by 365, which is why the months figure can move differently from what you would expect across a short month.",
    },
    {
        q: "When is my next milestone birthday?",
        a: "The countdown gives the next one; the arithmetic for the rest is simple subtraction from your current age. Milestones worth planning around tend to be the round decades, 18 and 21 where they carry legal weight, and 60, 65 or 67 where a pension age sits. If you are planning an event, note that the weekday shifts each year — a Saturday birthday may be two or three years away.",
    },
    {
        q: "How many days have I been alive?",
        a: "The total-days figure counts the real elapsed days including every leap day. People often watch for round numbers: 10,000 days arrives just after 27 years and 4 months, 20,000 days a little past 54 and a half years, and one billion seconds at roughly 31 years and 8 months.",
    },
    {
        q: "What zodiac sign am I, and what happens on the boundary dates?",
        a: "Western sun signs run Aries 21 Mar-19 Apr, Taurus 20 Apr-20 May, Gemini 21 May-20 Jun, Cancer 21 Jun-22 Jul, Leo 23 Jul-22 Aug, Virgo 23 Aug-22 Sep, Libra 23 Sep-22 Oct, Scorpio 23 Oct-21 Nov, Sagittarius 22 Nov-21 Dec, Capricorn 22 Dec-19 Jan, Aquarius 20 Jan-18 Feb, Pisces 19 Feb-20 Mar. The boundaries shift by a day between years because the sun does not cross them at the same clock time each year, so a birth date right on a cusp can genuinely fall either side depending on the year and the time of day.",
    },
    {
        q: "Is the countdown affected by my time zone?",
        a: "It uses your device's date. If you are near midnight, or travelling across a date line, the number can differ by one from what a friend elsewhere sees — both are correct for where they are standing.",
    },
    {
        q: "Can I count down to someone else's birthday?",
        a: "Yes — enter their date instead. It is the usual way to check how long there is to organise something, and the weekday shown for the next birthday is often the detail that decides the plan.",
    },
    {
        q: "Is my birth date stored?",
        a: "No. Everything is calculated in your browser and nothing is sent anywhere or saved.",
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
    url: "https://numrexo.com/time/birthday-countdown",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Days until birthday", "Age calculation", "Zodiac sign", "Birthday countdown"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Time Calculators", item: "https://numrexo.com/time" },
        { "@type": "ListItem", position: 3, name: "Birthday Countdown", item: "https://numrexo.com/time/birthday-countdown" },
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
    const [birthDate, setBirthDate] = useState("1990-06-15");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        if (!birthDate) {
            setResult(null);
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

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [birthDate]);

    const resetForm = () => {
        setBirthDate("");
        setResult(null);
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [birthDate]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/time" itemProp="item" className="hover:text-gray-300">Time Calculators</a><meta itemProp="position" content="2" /></li>
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

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Birthday Countdown</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Enter a birth date and this gives three things at once: how many days remain until the next
                    birthday, the exact age today in years, months and days, and the running total of days lived.
                    The countdown rolls to next year on its own once this year&apos;s birthday has passed.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    It runs entirely in your browser, so nothing you type is sent anywhere.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Why the Weekday Moves Every Year</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        An ordinary year is 52 weeks and one day. That leftover day pushes your birthday forward one
                        weekday each year, and two whenever a 29 February falls in between.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        So a Tuesday birthday becomes Wednesday next year, then Thursday, then jumps to Saturday if a
                        leap day intervenes. Over a long enough run the whole pattern repeats every 28 years. If you
                        are hoping for a weekend birthday to plan something around, it is worth looking a few years
                        ahead rather than assuming next year will do.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Day Milestones Worth Watching</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Milestone</th><th className="text-right py-3 px-4 text-gray-400">Arrives at roughly</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1,000 days</td><td className="py-2 px-4 text-right">2 years 9 months</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">5,000 days</td><td className="py-2 px-4 text-right">13 years 8 months</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">10,000 days</td><td className="py-2 px-4 text-right">27 years 4 months</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 billion seconds</td><td className="py-2 px-4 text-right">31 years 8 months</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">20,000 days</td><td className="py-2 px-4 text-right">54 years 9 months</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">30,000 days</td><td className="py-2 px-4 text-right">82 years 1 month</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    Compare these against the total-days figure above to see which one you are closest to.
                </p>
            </section>

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