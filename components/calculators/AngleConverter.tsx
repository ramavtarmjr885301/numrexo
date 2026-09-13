"use client";

import { useEffect, useState } from "react";
import ResultBox from "@/components/common/ResultBox";

// ─── Static SEO Data ──────────────────────────────────────────────────────────

const FAQ_DATA = [
    {
        q: "How do I convert degrees to radians?",
        a: "Multiply by π/180. A right angle, 90°, becomes π/2 ≈ 1.5708 rad; a full turn, 360°, becomes 2π ≈ 6.2832 rad. As a single factor, 1° = 0.0174533 rad.",
    },
    {
        q: "How do I convert radians to degrees?",
        a: "Multiply by 180/π, which is 57.2957795 — so one radian is a little over 57°. That awkward number is the price of a unit defined by the circle itself rather than by counting.",
    },
    {
        q: "Why do radians exist at all, if degrees are easier to read?",
        a: "Because a radian is defined by the circle rather than imposed on it: one radian is the angle that cuts off an arc equal to the radius. That makes arc length simply r × θ, and it makes the calculus behave — the derivative of sin x is cos x only when x is in radians. In degrees you would carry a π/180 through every step.",
    },
    {
        q: "Where did 360 degrees come from?",
        a: "From Babylonian base-60 arithmetic, and it stuck because 360 divides cleanly by 2, 3, 4, 5, 6, 8, 9, 10, 12 and more. That divisibility is genuinely useful: a third of a circle is a whole 120°, where a third of 400 gradians is not.",
    },
    {
        q: "What is a gradian, and who uses it?",
        a: "A gradian, also written gon, is one hundredth of a right angle — 400 to a full turn, so 1 gon = 0.9°. It was a metric-era attempt to decimalise the circle. It survives mainly in surveying and civil engineering in parts of Europe, where a quarter turn being exactly 100 units simplifies bearing arithmetic.",
    },
    {
        q: "What are arcminutes and arcseconds?",
        a: "Subdivisions of a degree in base 60: one degree is 60 arcminutes, one arcminute is 60 arcseconds, so a degree holds 3,600 arcseconds. They are written 12° 34′ 56″. Astronomy and navigation still use them because the units map onto real distance on the ground.",
    },
    {
        q: "How much ground does an arcsecond cover?",
        a: "One arcminute of latitude is one nautical mile, 1,852 metres — that is where the nautical mile comes from. So one arcsecond of latitude is about 31 metres, and a tenth of an arcsecond is around 3 metres. It is why GPS coordinates quoted in DMS need decimal places on the seconds to be useful for anything smaller than a building.",
    },
    {
        q: "How do I read a coordinate like 51° 30′ 26″ N?",
        a: "Degrees, then arcminutes, then arcseconds. Convert to decimal degrees by dividing: 30 ÷ 60 = 0.5, 26 ÷ 3600 = 0.00722, giving 51.50722° N. Mapping software almost always wants the decimal form, while charts and older references use DMS.",
    },
    {
        q: "What is a turn or revolution?",
        a: "One full rotation: 360°, 2π radians, or 400 gradians. Mechanical and rotational work often quotes angles in turns or in revolutions per minute rather than in any of the three, because the whole rotation is the natural unit there.",
    },
    {
        q: "Why does my converted value have so many decimals?",
        a: "Because π is irrational, so almost every conversion between degrees and radians is an approximation somewhere. Keep the extra digits through intermediate steps and round only at the end — rounding 57.2957795 to 57.3 early will show up as visible error over a long distance or a long calculation.",
    },
];

const ANGLE_UNITS = [
    { value: "degree", label: "Degree (°)", toDegree: 1 },
    { value: "radian", label: "Radian (rad)", toDegree: 57.2957795 },
    { value: "gradian", label: "Gradian (gon)", toDegree: 0.9 },
    { value: "arcminute", label: "Arcminute (')", toDegree: 1 / 60 },
    { value: "arcsecond", label: "Arcsecond ('')", toDegree: 1 / 3600 },
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
    name: "Angle Converter – Convert Angle Units",
    description: "Convert between degrees, radians, gradians, arcminutes, and arcseconds.",
    url: "https://numrexo.com/conversion/angle-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["5 angle units", "Degrees to radians", "Navigation conversions", "Surveying"],
    author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
        { "@type": "ListItem", position: 2, name: "Converters", item: "https://numrexo.com/conversion" },
        { "@type": "ListItem", position: 3, name: "Angle Converter", item: "https://numrexo.com/conversion/angle-converter" },
    ],
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function AngleConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("degree");
    const [toUnit, setToUnit] = useState("radian");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) { setResult(null); return; }

        const from = ANGLE_UNITS.find(u => u.value === fromUnit)!;
        const to = ANGLE_UNITS.find(u => u.value === toUnit)!;
        const inDegrees = val * from.toDegree;
        const converted = inDegrees / to.toDegree;

        setResult({ value: val, fromUnit: from.label, toUnit: to.label, converted: converted.toFixed(6) });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { convert(); }, [value, fromUnit, toUnit]);

    const swapUnits = () => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); if (value) setTimeout(convert, 10); };

    const resetForm = () => {
        setValue("");
        setFromUnit("degree");
        setToUnit("radian");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-gray-300">Home</a><meta itemProp="position" content="1" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/conversion" itemProp="item" className="hover:text-gray-300">Converters</a><meta itemProp="position" content="2" /></li>
                    <li className="text-gray-700">/</li>
                    <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-gray-300">Angle Converter</span><meta itemProp="position" content="3" /></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Angle Converter</h3><p className="text-xs text-gray-500 mt-1">Convert between angle measurement units</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Value</label><input type="number" placeholder="100" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white" /></div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ANGLE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                            <button onClick={swapUnits} className="mt-6 p-2 rounded-lg bg-gray-700 hover:bg-gray-600">🔄</button>
                            <div className="flex-1"><label className="block text-xs font-semibold text-gray-400 mb-2">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">{ANGLE_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}</select></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={convert} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all">Convert →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox title="Converted Angle" isEmpty={!result} emptyIcon="📐" emptyText="Enter value and press Convert" mainResult={result ? { label: `${result.value} ${result.fromUnit} =`, value: `${result.converted} ${result.toUnit}`, color: "text-indigo-400" } : undefined} extraRows={[]} />
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About This Angle Converter</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Converts between degrees, radians, gradians, arcminutes and arcseconds. The four units exist
                    because four different trades needed different things from the same circle: degrees for anyone who
                    wants clean fractions, radians for mathematics and programming, gradians for European surveying,
                    and arcminutes and arcseconds for navigation and astronomy, where an angle has to translate into
                    distance on the ground.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Why Radians Are the Natural Unit</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 space-y-3">
                    <p className="text-white font-mono text-sm">arc length = r × θ &nbsp;&nbsp;(θ in radians)</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        A radian is the angle that cuts an arc as long as the radius. Because the unit is defined by
                        the circle itself, arc length needs no conversion factor — and neither does calculus. The
                        familiar result that the derivative of sin x is cos x holds only in radians; in degrees it
                        picks up a factor of π/180 that has to be carried through everything after it.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        This is why every programming language&apos;s trigonometric functions take radians. Passing
                        degrees to Math.sin is one of the most common quiet bugs in graphics and physics code.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Angles as Distance on the Ground</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Angle of latitude</th><th className="text-right py-3 px-4 text-gray-400">Distance on Earth</th></tr></thead>
                            <tbody>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 degree</td><td className="py-2 px-4 text-right">≈ 111 km</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 arcminute (1′)</td><td className="py-2 px-4 text-right">1 nautical mile — 1,852 m</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 arcsecond (1″)</td><td className="py-2 px-4 text-right">≈ 31 m</td></tr>
                                <tr className="border-b border-gray-800/50"><td className="py-2 px-4">0.1 arcsecond</td><td className="py-2 px-4 text-right">≈ 3 m</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    The nautical mile was defined as one arcminute of latitude, which is why these two columns line up
                    so neatly. Longitude behaves differently — the same angle covers less ground the further you are
                    from the equator.
                </p>
            </section>

            <section className="mb-8"><h2 className="text-xl font-semibold text-white mb-4">Common Angle Conversions</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">From</th><th className="text-left py-3 px-4 text-gray-400">To</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">180°</td><td className="py-2 px-4">Radians</td><td className="py-2 px-4 text-yellow-400">π rad (3.14159 rad)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">90°</td><td className="py-2 px-4">Radians</td><td className="py-2 px-4 text-yellow-400">π/2 rad (1.5708 rad)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Radian</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">57.2958°</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Gradian</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">0.9°</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Arcminute</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">0.0166667°</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">1 Arcsecond</td><td className="py-2 px-4">Degrees</td><td className="py-2 px-4 text-yellow-400">0.00027778°</td></tr>
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
///