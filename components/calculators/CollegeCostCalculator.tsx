"use client";

import { useEffect, useRef, useState } from "react";
import ResultBox from "@/components/common/ResultBox";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";
import { useCurrency } from "@/components/common/useCurrency";

const FAQ_DATA = [
    {
        q: "What costs should I include in college planning?",
        a: "Include tuition, fees, room & board, books, supplies, transportation, and personal expenses. Don't forget inflation - college costs typically rise 3-5% annually.",
    },
    {
        q: "How much should I save for college?",
        a: "A common rule is to save 1/3 of expected costs, pay 1/3 from current income, and cover 1/3 from loans/scholarships. Use this calculator to estimate your specific needs.",
    },
    {
        q: "What is the 529 plan?",
        a: "A 529 plan is a tax-advantaged savings plan designed for education costs. Earnings grow tax-free and withdrawals for qualified expenses are also tax-free.",
    },
    {
        q: "What does a year of college actually cost?",
        a: "It depends far more on the type of institution than on the subject. In the United States, published sticker prices run roughly $11,000-$13,000 a year in tuition and fees at a public university for in-state students, $28,000-$32,000 for out-of-state students, and $42,000-$45,000 at a private non-profit. Room and board adds about $12,000-$14,000 wherever you go. Most students pay less than the sticker price once grants are applied, so treat these as a starting point and work down from the aid offer.",
    },
    {
        q: "How to get education loans for college?",
        a: "Fill in the FAFSA first — it is what decides federal grants, work-study and federal loans, and many states and colleges use it for their own aid too. Take grants and scholarships before anything you repay, then subsidised federal loans, then unsubsidised. Private loans come last: they usually cost more and carry none of the federal protections. Only after the aid letter arrives do you know the real number, so compare offers side by side before choosing a college.",
    },
    {
        q: "What are scholarship options for college?",
        a: "Need-based aid is decided by the FAFSA and, at some private colleges, the CSS Profile. Merit aid comes from the college itself and is usually tied to GPA or test scores. Beyond that there are federal Pell Grants, state grant programmes, and private scholarships from employers, unions, community foundations and professional associations. Deadlines cluster between December and March, and the earliest applications tend to be the best funded.",
    },
    {
        q: "What is the difference between subsidized and unsubsidized loans?",
        a: "Subsidized loans: Government pays interest while you're in college and during grace period. Need-based. Unsubsidized loans: Interest accrues from day one. You pay all interest. Not need-based. Subsidised loans are limited and go to students with demonstrated financial need, so most borrowers end up with a mix of both.",
    },
    {
        q: "How to reduce college costs?",
        a: "Strategies: 1) Choose government/state colleges (lower fees), 2) Apply for scholarships (reduce by 25-100%), 3) Live at home (save $80k-2L/year), 4) Buy used textbooks (save 50-70%), 5) Work-study/part-time jobs (earn $5-15k/month), 6) Complete degree faster (save 1 year costs).",
    },
    {
        q: "What is the 4-4-4-4 cost breakdown?",
        a: "4-4-4-4 rule: 4 years of college × 4% annual inflation × 4% withdrawal rate × 4 months summer job. Save roughly four times one year's cost before the first semester. Example: a college that runs $29,000 a year → aim for about $116,000 saved.",
    },
    {
        q: "When to start saving for college?",
        a: "Start saving when child is born. Monthly saving targets, at a 7% average return over 18 years: $200/month grows to about $86,000; $400/month to about $172,000; $700/month to about $300,000. Earlier start means lower monthly burden.",
    },
];

// Default worked example per market (rupee-scale for India, US in-state public university for the rest).
const PROFILES = {
    india: { tuition: "200000", roomBoard: "80000", books: "15000", transport: "10000", other: "20000", years: "4", inflation: "5" },
    west: { tuition: "11600", roomBoard: "12700", books: "1200", transport: "1300", other: "2400", years: "4", inflation: "5" },
};

export default function CollegeCostCalculator() {
    const { symbol, market } = useCurrency();
    // Start from the western defaults (SSR / default currency is USD); INR users are switched in the effect below.
    const [tuition, setTuition] = useState(PROFILES.west.tuition);
    const [roomBoard, setRoomBoard] = useState(PROFILES.west.roomBoard);
    const [books, setBooks] = useState(PROFILES.west.books);
    const [transport, setTransport] = useState(PROFILES.west.transport);
    const [other, setOther] = useState(PROFILES.west.other);
    const [years, setYears] = useState(PROFILES.west.years);
    const [inflation, setInflation] = useState(PROFILES.west.inflation);
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    // True once the visitor has changed anything; until then a currency switch re-seeds the defaults.
    const touched = useRef(false);

    const applyDefaults = (m: "india" | "west") => {
        const d = PROFILES[m];
        setTuition(d.tuition);
        setRoomBoard(d.roomBoard);
        setBooks(d.books);
        setTransport(d.transport);
        setOther(d.other);
        setYears(d.years);
        setInflation(d.inflation);
    };

    useEffect(() => {
        if (touched.current) return;
        applyDefaults(market);
    }, [market]);

    const calculate = () => {
        const annualTuition = parseFloat(tuition) || 0;
        const annualRoomBoard = parseFloat(roomBoard) || 0;
        const annualBooks = parseFloat(books) || 0;
        const annualTransport = parseFloat(transport) || 0;
        const annualOther = parseFloat(other) || 0;
        const numYears = parseInt(years) || 4;
        const inflationRate = (parseFloat(inflation) || 5) / 100;

        let totalCost = 0;
        let yearlyBreakdown = [];

        for (let i = 0; i < numYears; i++) {
            const yearCost = (annualTuition + annualRoomBoard + annualBooks + annualTransport + annualOther) * Math.pow(1 + inflationRate, i);
            yearlyBreakdown.push(yearCost);
            totalCost += yearCost;
        }

        setResult({
            totalCost: totalCost.toFixed(2),
            averagePerYear: (totalCost / numYears).toFixed(2),
            firstYearCost: yearlyBreakdown[0].toFixed(2),
            lastYearCost: yearlyBreakdown[yearlyBreakdown.length - 1].toFixed(2),
            yearlyBreakdown: yearlyBreakdown,
            years: numYears,
        });
    };

    // Results update as you type — the answer is no longer hidden behind a button press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { calculate(); }, [tuition, roomBoard, books, transport, other, years, inflation]);

    const reset = () => {
        touched.current = false;
        applyDefaults(market);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    name: "College Cost Calculator – Plan Your Education Budget",
                    description: "Calculate total college costs including tuition, housing, books, and inflation. Plan your education budget and savings strategy.",
                    url: "https://numrexo.com/education/college-cost-calculator",
                    applicationCategory: "EducationApplication",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                    featureList: ["Tuition calculation", "Inflation adjustment", "Year-by-year breakdown", "Cost planning"],
                })
            }} />

            <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
                    <li><a href="https://numrexo.com" className="hover:text-ink-soft">Home</a></li>
                    <li className="text-ink-soft">/</li>
                    <li><a href="https://numrexo.com/education" className="hover:text-ink-soft">Education Calculators</a></li>
                    <li className="text-ink-soft">/</li>
                    <li><span className="text-ink-soft">College Cost Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-hairline">
                        <h3 className="font-semibold">College Cost Details</h3>
                        <p className="text-xs text-ink-faint">Enter annual costs for one year (current prices)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <CurrencySwitcher className="pb-2 border-b border-hairline" />

                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Tuition & Fees ($/year)</label>
                            <input type="number" step="10000" placeholder="e.g., 200000" value={tuition} onChange={(e) => { touched.current = true; setTuition(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Room & Board ($/year)</label>
                            <input type="number" step="5000" placeholder="e.g., 80000" value={roomBoard} onChange={(e) => { touched.current = true; setRoomBoard(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Books & Supplies ($/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 15000" value={books} onChange={(e) => { touched.current = true; setBooks(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Transportation ($/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 10000" value={transport} onChange={(e) => { touched.current = true; setTransport(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-ink-faint mb-2">Personal/Miscellaneous ($/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 20000" value={other} onChange={(e) => { touched.current = true; setOther(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-ink-faint mb-2">Number of Years</label>
                                <select value={years} onChange={(e) => { touched.current = true; setYears(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink">
                                    <option value="1">1 year</option><option value="2">2 years</option><option value="3">3 years</option>
                                    <option value="4">4 years</option><option value="5">5 years</option><option value="6">6+ years</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-ink-faint mb-2">Annual Inflation (%)</label>
                                <input type="number" step="0.5" placeholder="5" value={inflation} onChange={(e) => { touched.current = true; setInflation(e.target.value); }} className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-surface border border-hairline text-ink-faint font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="College Cost Summary"
                    isEmpty={!result}
                    emptyIcon="🎓"
                    emptyText="Enter college costs to see total expense"
                    mainResult={result ? { label: "Total College Cost", value: `${symbol}${parseFloat(result.totalCost).toLocaleString()}`, color: "text-teal-600" } : undefined}
                    extraRows={result ? [
                        { label: "Average Per Year", value: `${symbol}${parseFloat(result.averagePerYear).toLocaleString()}` },
                        { label: "First Year Cost", value: `${symbol}${parseFloat(result.firstYearCost).toLocaleString()}`, valueColor: "text-yellow-700" },
                        { label: "Final Year Cost", value: `${symbol}${parseFloat(result.lastYearCost).toLocaleString()}`, valueColor: "text-orange-600" },
                        { label: "Total Years", value: result.years },
                    ] : []}
                />
            </div>

            {result && result.yearlyBreakdown && (
                <div className="mb-8 bg-surface border border-hairline rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-ink mb-3">Year-by-Year Breakdown</h3>
                    <div className="space-y-2">
                        {result.yearlyBreakdown.map((cost: number, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="text-ink-faint">Year {idx + 1}</span>
                                <span className="text-ink font-medium">${Math.round(cost).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About College Cost Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed mb-3">
                    The <strong className="text-ink-soft">College Cost Calculator</strong> helps students and parents plan their education budget with inflation-adjusted projections. Includes tuition, housing, books, transportation, and miscellaneous expenses.
                </p>
                <p className="text-ink-faint text-sm leading-relaxed">
                    College costs have been climbing faster than general inflation for two decades. Our calculator accounts for inflation to give you a realistic estimate of future expenses, helping you plan savings, education loans, and scholarship needs.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">How to Use This College Cost Calculator</h2>
                <div className="space-y-3">
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 1:</strong> Enter <strong className="text-ink">tuition & fees</strong> — the main academic cost, roughly $9,000 a year in-state and up to $60,000 at a private college.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 2:</strong> Enter <strong className="text-ink">room & board</strong> — housing and a meal plan, typically $12,000-$14,000 a year on campus.</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 3:</strong> Enter <strong className="text-ink">books & supplies</strong> — textbooks, stationery ($10k-$30k/year).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 4:</strong> Enter <strong className="text-ink">transportation</strong> — commute costs ($5k-$20k/year).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 5:</strong> Enter <strong className="text-ink">personal/miscellaneous</strong> — pocket money, clothes, entertainment ($20k-$50k/year).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink-soft">Step 6:</strong> Select <strong className="text-ink">number of years</strong> (3-5 years typical) and <strong className="text-ink">inflation rate</strong> (5-8% recommended).</p>
                    <p className="text-ink-faint text-sm leading-relaxed"><strong className="text-ink">Step 7:</strong> Click <strong className="text-ink">Calculate</strong> to see total cost, year-by-year breakdown, and average per year.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Benefits of College Cost Planning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-600 mb-2">✓ Avoid Financial Surprises</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Know exactly how much you'll need each year. Plan savings and loan applications well in advance without last-minute stress.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">✓ Compare Colleges</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Compare total 4-year costs between different colleges (government vs private, in-state vs out-of-state). Make informed decisions based on ROI.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-2">✓ Scholarship Planning</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Know how much scholarship you need. Apply for appropriate scholarships based on your financial gap.</p>
                    </div>
                    <div className="bg-surface border border-hairline rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">✓ Loan Management</h3>
                        <p className="text-ink-faint text-xs leading-relaxed">Calculate exactly how much education loan to request. Plan repayment strategies before graduation.</p>
                    </div>
                </div>
            </section>

            {/* College Cost Breakdown */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">What a Year of College Costs — Public University, In-State</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Expense Category</th><th className="text-right py-3 px-4 text-ink-faint">Low</th><th className="text-right py-3 px-4 text-ink-faint">Typical</th><th className="text-right py-3 px-4 text-ink-faint">High</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Tuition &amp; Fees</td><td className="py-2 px-4 text-right">$8,000</td><td className="py-2 px-4 text-right">$11,600</td><td className="py-2 px-4 text-right">$16,000</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Room &amp; Board</td><td className="py-2 px-4 text-right">$9,000</td><td className="py-2 px-4 text-right">$12,700</td><td className="py-2 px-4 text-right">$17,000</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Books &amp; Supplies</td><td className="py-2 px-4 text-right">$600</td><td className="py-2 px-4 text-right">$1,200</td><td className="py-2 px-4 text-right">$1,800</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Transportation</td><td className="py-2 px-4 text-right">$700</td><td className="py-2 px-4 text-right">$1,300</td><td className="py-2 px-4 text-right">$2,200</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Personal / Misc</td><td className="py-2 px-4 text-right">$1,500</td><td className="py-2 px-4 text-right">$2,400</td><td className="py-2 px-4 text-right">$3,500</td></tr>
                            <tr className="bg-cream"><td className="py-2 px-4 font-semibold">Total Annual</td><td className="py-2 px-4 text-right font-semibold text-green-600">$19,800</td><td className="py-2 px-4 text-right font-semibold text-yellow-700">$29,200</td><td className="py-2 px-4 text-right font-semibold text-orange-600">$40,500</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-ink-faint mt-2">Approximate published (sticker) prices for a recent academic year. Most students pay less once grants and scholarships are applied — use the aid letter, not this table, once you have one.</p>
            </section>

            {/* Sample College Costs */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Sample Annual Cost by Institution Type</h2>
                <div className="bg-surface border border-hairline rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-hairline"><th className="text-left py-3 px-4 text-ink-faint">Institution Type</th><th className="text-right py-3 px-4 text-ink-faint">Tuition &amp; Fees</th><th className="text-right py-3 px-4 text-ink-faint">With Room &amp; Board</th><th className="text-right py-3 px-4 text-ink-faint">Full Degree</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Community college (in-district)</td><td className="py-2 px-4 text-right">$3,600-4,500</td><td className="py-2 px-4 text-right">$12,000-16,000</td><td className="py-2 px-4 text-right">$24,000-32,000 (2 yrs)</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Public 4-year, in-state</td><td className="py-2 px-4 text-right">$9,000-13,500</td><td className="py-2 px-4 text-right">$22,000-29,000</td><td className="py-2 px-4 text-right">$88,000-116,000</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Public 4-year, out-of-state</td><td className="py-2 px-4 text-right">$24,000-32,000</td><td className="py-2 px-4 text-right">$37,000-48,000</td><td className="py-2 px-4 text-right">$148,000-192,000</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Private non-profit</td><td className="py-2 px-4 text-right">$38,000-46,000</td><td className="py-2 px-4 text-right">$52,000-62,000</td><td className="py-2 px-4 text-right">$208,000-248,000</td></tr>
                            <tr className="border-b border-hairline"><td className="py-2 px-4">Private, highly selective</td><td className="py-2 px-4 text-right">$58,000-68,000</td><td className="py-2 px-4 text-right">$78,000-92,000</td><td className="py-2 px-4 text-right">$312,000-368,000</td></tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <p className="text-xs text-ink-faint mt-2">Two years at a community college followed by two years at a public university is the single biggest lever on this table — it can cut a bachelor&apos;s degree cost roughly in half.</p>
            </section>

            {/* Savings Strategies */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">Smart Savings Strategies for College</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Start the year they are born:</strong> $400 a month at a 7% average return grows to roughly $172,000 in 18 years — about $86,000 of it contributions and the rest growth.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Use a 529 plan:</strong> growth is tax-free when spent on qualified education costs, and most states add a deduction or credit on top.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Federal loans first:</strong> fixed rates, income-driven repayment and deferment options that private lenders do not offer. Up to $2,500 of student loan interest is deductible each year.</span></li>
                    <li className="flex gap-3 text-sm text-ink-faint"><span className="text-teal-600 mt-0.5">✓</span><span><strong className="text-ink-soft">Where to look:</strong> the FAFSA first, then your state&apos;s grant agency, the college&apos;s own aid office, and free national databases. Never pay a fee to search for scholarships.</span></li>
                </ul>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-3">About College Cost Calculator</h2>
                <p className="text-ink-faint text-sm leading-relaxed">Plan your education budget with inflation-adjusted projections. Includes tuition, housing, books, and all associated expenses.</p>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-ink">{item.q}</span>
                                <span className={`text-ink-faint text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-ink-faint leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}