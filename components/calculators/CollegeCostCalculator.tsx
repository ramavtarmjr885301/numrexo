"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

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
        q: "What is the average college cost in India?",
        a: "Average college costs in India vary widely: Government colleges: ₹20,000-1,00,000/year, Private engineering: ₹1-4 lakhs/year, Private medical: ₹5-20 lakhs/year, Management/MBA: ₹5-25 lakhs/year, Liberal arts: ₹50,000-3 lakhs/year. International studies: ₹20-50 lakhs/year.",
    },
    {
        q: "How to get education loans for college?",
        a: "Steps: 1) Research banks (SBI, HDFC, ICICI, Bank of Baroda), 2) Check eligibility (usually 70%+ in 12th), 3) Calculate loan amount needed, 4) Apply with co-applicant (parents), 5) Provide collateral for loans above ₹7.5 lakhs, 6) Compare interest rates (8-12%).",
    },
    {
        q: "What are scholarship options for college?",
        a: "Scholarship types: Merit-based (top %ile in exams), Means-based (family income below ₹4.5L), National (NSP portal), State (state govt schemes), Private (Tata, Reliance, Adani), Corporate (L&T, Infosys), Sports (SAI). Apply early, deadlines typically Dec-Feb.",
    },
    {
        q: "What is the difference between subsidized and unsubsidized loans?",
        a: "Subsidized loans: Government pays interest while you're in college and during grace period. Need-based. Unsubsidized loans: Interest accrues from day one. You pay all interest. Not need-based. Most Indian students use unsubsidized loans with moratorium period.",
    },
    {
        q: "How to reduce college costs?",
        a: "Strategies: 1) Choose government/state colleges (lower fees), 2) Apply for scholarships (reduce by 25-100%), 3) Live at home (save ₹80k-2L/year), 4) Buy used textbooks (save 50-70%), 5) Work-study/part-time jobs (earn ₹5-15k/month), 6) Complete degree faster (save 1 year costs).",
    },
    {
        q: "What is the 4-4-4-4 cost breakdown?",
        a: "4-4-4-4 rule: 4 years of college × 4% annual inflation × 4% withdrawal rate × 4 months summer job. Save 4 times your annual college cost before starting. Example: ₹4L/year college → save ₹16L before enrolling.",
    },
    {
        q: "When to start saving for college?",
        a: "Start saving when child is born. Monthly saving targets: ₹2,000/month for 18 years at 8% = ₹9.6L corpus. ₹5,000/month = ₹24L corpus. ₹10,000/month = ₹48L corpus. Earlier start means lower monthly burden.",
    },
];

export default function CollegeCostCalculator() {
    const [tuition, setTuition] = useState("");
    const [roomBoard, setRoomBoard] = useState("");
    const [books, setBooks] = useState("");
    const [transport, setTransport] = useState("");
    const [other, setOther] = useState("");
    const [years, setYears] = useState("4");
    const [inflation, setInflation] = useState("5");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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

    const reset = () => {
        setTuition("");
        setRoomBoard("");
        setBooks("");
        setTransport("");
        setOther("");
        setYears("4");
        setInflation("5");
        setResult(null);
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
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <li><a href="https://numrexo.com" className="hover:text-gray-300">Home</a></li>
                    <li className="text-gray-700">/</li>
                    <li><a href="https://numrexo.com/education" className="hover:text-gray-300">Education Calculators</a></li>
                    <li className="text-gray-700">/</li>
                    <li><span className="text-gray-300">College Cost Calculator</span></li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="font-semibold">College Cost Details</h3>
                        <p className="text-xs text-gray-500">Enter annual costs for one year (current prices)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Tuition & Fees (₹/year)</label>
                            <input type="number" step="10000" placeholder="e.g., 200000" value={tuition} onChange={(e) => setTuition(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Room & Board (₹/year)</label>
                            <input type="number" step="5000" placeholder="e.g., 80000" value={roomBoard} onChange={(e) => setRoomBoard(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Books & Supplies (₹/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 15000" value={books} onChange={(e) => setBooks(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Transportation (₹/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 10000" value={transport} onChange={(e) => setTransport(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">Personal/Miscellaneous (₹/year)</label>
                            <input type="number" step="1000" placeholder="e.g., 20000" value={other} onChange={(e) => setOther(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Number of Years</label>
                                <select value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white">
                                    <option value="1">1 year</option><option value="2">2 years</option><option value="3">3 years</option>
                                    <option value="4">4 years</option><option value="5">5 years</option><option value="6">6+ years</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Annual Inflation (%)</label>
                                <input type="number" step="0.5" placeholder="5" value={inflation} onChange={(e) => setInflation(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold hover:shadow-lg transition-all">Calculate →</button>
                            <button onClick={reset} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="College Cost Summary"
                    isEmpty={!result}
                    emptyIcon="🎓"
                    emptyText="Enter college costs to see total expense"
                    mainResult={result ? { label: "Total College Cost", value: `₹${parseFloat(result.totalCost).toLocaleString()}`, color: "text-teal-400" } : undefined}
                    extraRows={result ? [
                        { label: "Average Per Year", value: `₹${parseFloat(result.averagePerYear).toLocaleString()}` },
                        { label: "First Year Cost", value: `₹${parseFloat(result.firstYearCost).toLocaleString()}`, valueColor: "text-yellow-400" },
                        { label: "Final Year Cost", value: `₹${parseFloat(result.lastYearCost).toLocaleString()}`, valueColor: "text-orange-400" },
                        { label: "Total Years", value: result.years },
                    ] : []}
                />
            </div>

            {result && result.yearlyBreakdown && (
                <div className="mb-8 bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Year-by-Year Breakdown</h3>
                    <div className="space-y-2">
                        {result.yearlyBreakdown.map((cost: number, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-400">Year {idx + 1}</span>
                                <span className="text-white font-medium">₹{Math.round(cost).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About College Cost Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">College Cost Calculator</strong> helps students and parents plan their education budget with inflation-adjusted projections. Includes tuition, housing, books, transportation, and miscellaneous expenses.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    College costs in India have been rising at 8-12% annually for private institutions. Our calculator accounts for inflation to give you a realistic estimate of future expenses, helping you plan savings, education loans, and scholarship needs.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This College Cost Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter <strong className="text-white">tuition & fees</strong> — the main academic cost (₹2L-₹25L/year depending on course).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter <strong className="text-white">room & board</strong> — hostel/mess costs (₹50k-₹2L/year).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Enter <strong className="text-white">books & supplies</strong> — textbooks, stationery (₹10k-₹30k/year).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> Enter <strong className="text-white">transportation</strong> — commute costs (₹5k-₹20k/year).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 5:</strong> Enter <strong className="text-white">personal/miscellaneous</strong> — pocket money, clothes, entertainment (₹20k-₹50k/year).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 6:</strong> Select <strong className="text-white">number of years</strong> (3-5 years typical) and <strong className="text-white">inflation rate</strong> (5-8% recommended).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 7:</strong> Click <strong className="text-white">Calculate</strong> to see total cost, year-by-year breakdown, and average per year.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Benefits of College Cost Planning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-teal-400 mb-2">✓ Avoid Financial Surprises</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much you'll need each year. Plan savings and loan applications well in advance without last-minute stress.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Compare Colleges</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Compare total 4-year costs between different colleges (government vs private, in-state vs out-of-state). Make informed decisions based on ROI.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-yellow-400 mb-2">✓ Scholarship Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know how much scholarship you need. Apply for appropriate scholarships based on your financial gap.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Loan Management</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Calculate exactly how much education loan to request. Plan repayment strategies before graduation.</p>
                    </div>
                </div>
            </section>

            {/* College Cost Breakdown */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Typical College Cost Breakdown (Private Engineering - Annual)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Expense Category</th><th className="text-right py-3 px-4 text-gray-400">Low Range</th><th className="text-right py-3 px-4 text-gray-400">Mid Range</th><th className="text-right py-3 px-4 text-gray-400">High Range</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Tuition & Fees</td><td className="py-2 px-4 text-right">₹1,00,000</td><td className="py-2 px-4 text-right">₹2,00,000</td><td className="py-2 px-4 text-right">₹5,00,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Room & Board</td><td className="py-2 px-4 text-right">₹50,000</td><td className="py-2 px-4 text-right">₹80,000</td><td className="py-2 px-4 text-right">₹1,50,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Books & Supplies</td><td className="py-2 px-4 text-right">₹10,000</td><td className="py-2 px-4 text-right">₹15,000</td><td className="py-2 px-4 text-right">₹30,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Transportation</td><td className="py-2 px-4 text-right">₹5,000</td><td className="py-2 px-4 text-right">₹10,000</td><td className="py-2 px-4 text-right">₹20,000</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Personal/Misc</td><td className="py-2 px-4 text-right">₹10,000</td><td className="py-2 px-4 text-right">₹20,000</td><td className="py-2 px-4 text-right">₹50,000</td></tr>
                            <tr className="bg-gray-800/30"><td className="py-2 px-4 font-semibold">Total Annual</td><td className="py-2 px-4 text-right font-semibold text-green-400">₹1,75,000</td><td className="py-2 px-4 text-right font-semibold text-yellow-400">₹3,25,000</td><td className="py-2 px-4 text-right font-semibold text-orange-400">₹7,50,000</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Sample College Costs */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Sample College Costs by Course Type (Annual)</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Course Type</th><th className="text-left py-3 px-4 text-gray-400">Tuition</th><th className="text-left py-3 px-4 text-gray-400">Total with Hostel</th><th className="text-left py-3 px-4 text-gray-400">4-Year Total</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">B.Sc (Government)</td><td className="py-2 px-4">₹10,000-30,000</td><td className="py-2 px-4">₹50,000-80,000</td><td className="py-2 px-4 text-yellow-400">₹2-3.2L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">B.Com (Government)</td><td className="py-2 px-4">₹5,000-20,000</td><td className="py-2 px-4">₹40,000-60,000</td><td className="py-2 px-4 text-yellow-400">₹1.6-2.4L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">B.Tech (Government)</td><td className="py-2 px-4">₹50,000-1,50,000</td><td className="py-2 px-4">₹1,50,000-2,50,000</td><td className="py-2 px-4 text-yellow-400">₹6-10L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">B.Tech (Private)</td><td className="py-2 px-4">₹2,00,000-5,00,000</td><td className="py-2 px-4">₹3,00,000-7,00,000</td><td className="py-2 px-4 text-yellow-400">₹12-28L</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">MBBS (Government)</td><td className="py-2 px-4">₹10,000-50,000</td><td className="py-2 px-4">₹1,00,000-2,00,000</td><td className="py-2 px-4 text-yellow-400">₹4-8L (5.5 yrs)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">MBBS (Private)</td><td className="py-2 px-4">₹10,00,000-25,00,000</td><td className="py-2 px-4">₹12,00,000-28,00,000</td><td className="py-2 px-4 text-yellow-400">₹60L-1.5Cr</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">MBA (Top B-School)</td><td className="py-2 px-4">₹15,00,000-30,00,000</td><td className="py-2 px-4">₹20,00,000-40,00,000</td><td className="py-2 px-4 text-yellow-400">₹20-40L (2 yrs)</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Savings Strategies */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Smart Savings Strategies for College</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Start early with SIP:</strong> ₹5,000/month from child's birth at 12% returns = ₹48L after 18 years (₹10.8L invested, ₹37.2L gains).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Use 529-equivalent plans:</strong> SSY (Sukanya Samriddhi for girls), PPF (up to ₹1.5L/year), NPS (for parents, tax-saving).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Education loans:</strong> SBI, HDFC, Bank of Baroda offer up to ₹1.5Cr with 8-12% interest. Interest deduction under Section 80E.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-teal-400 mt-0.5">✓</span><span><strong className="text-gray-300">Scholarship portals:</strong> National Scholarship Portal (NSP), Vidyasaarathi, Buddy4Study, State scholarship portals.</span></li>
                </ul>
            </section>

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About College Cost Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Plan your education budget with inflation-adjusted projections. Includes tuition, housing, books, and all associated expenses.</p>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="text-sm font-medium text-gray-200">{item.q}</span>
                                <span className={`text-gray-500 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {openFaq === i && <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}