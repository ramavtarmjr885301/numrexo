// components/calculators/GratuityCalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const FAQ_DATA = [
    {
        q: "Who is eligible for gratuity?",
        a: "You qualify for gratuity if you've worked continuously for at least 5 years with the same employer. This applies to both government and private sector employees. If you quit, resign, retire, or (heaven forbid) pass away, you or your family gets the payment. Even if you're fired (except for misconduct), you still get gratuity as long as you've completed 5 years.",
    },
    {
        q: "How is gratuity calculated?",
        a: "For companies covered under the Gratuity Act, the formula is: (Last drawn salary × 15 × Years of service) ÷ 26. 'Salary' includes basic + dearness allowance. For example, if your last basic was ₹50,000 and you worked 10 years: (50,000 × 15 × 10) ÷ 26 = ₹2,88,461. For employers not covered by the Act, the formula is a bit different (15/30 instead of 15/26).",
    },
    {
        q: "What is the maximum gratuity amount?",
        a: "The government has set a cap of ₹20 lakhs (2 million rupees) as the maximum tax-free gratuity. Anything above that is taxable. For government employees, the cap is ₹20 lakhs as well, but some states have different rules for their employees.",
    },
    {
        q: "Is gratuity taxable?",
        a: "Gratuity is tax-free up to ₹20 lakhs under Section 10(10) of Income Tax Act. Any amount above ₹20 lakhs is taxable. For government employees, entire gratuity is tax-free (no upper limit for central/state govt employees). For private sector, ₹20 lakhs is maximum tax-free amount as per current rules.",
    },
    {
        q: "What happens to gratuity if I change jobs?",
        a: "You lose gratuity from previous employer but start fresh with new employer. The 5-year clock resets. If you have 4 years 11 months at old job, you get ZERO from them. Always complete 5 years before switching jobs to get gratuity from that employer.",
    },
    {
        q: "Can I get gratuity if I resign?",
        a: "Yes! Resignation counts as 'voluntary retirement' under the Act. Same 5-year rule applies. You'll receive gratuity upon resignation, not just retirement or death. Even if you're fired (except for misconduct causing damage/loss), you still get gratuity after 5 years.",
    },
    {
        q: "Is gratuity applicable for private sector employees?",
        a: "Yes! The Payment of Gratuity Act applies to all establishments with 10+ employees (factories, mines, shops, etc.). Even if your company has less than 10 employees, they may still have gratuity in their policies. Most private sector companies covered.",
    },
    {
        q: "What is the nomination process for gratuity?",
        a: "Companies require employees to submit Form F (nomination form) upon joining. You can nominate family members (spouse, children, parents) to receive gratuity in case of death. Without nomination, legal heirs face delays and documentation. Update nomination after marriage or childbirth.",
    },
    {
        q: "How is gratuity calculated for monthly-rated employees?",
        a: "Formula remains same: (Last drawn monthly salary × 15 × Years) ÷ 26. 'Last drawn salary' means basic + DA for the month of resignation/retirement. The 15 represents 15 days salary per year (15/26 of monthly salary).",
    },
    {
        q: "What if my employer doesn't pay gratuity?",
        a: "File complaint with controlling authority under Payment of Gratuity Act (Labour Commissioner). Time limit: Apply within 90 days of gratuity becoming due. Employer can be penalized with interest (simple interest at 10% per annum). For central govt employees, approach CPIO under RTI.",
    },
];

const GRATUITY_SCHEMA = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gratuity Calculator – Calculate Your Retirement Benefit",
    description: "Calculate your gratuity amount based on last drawn salary and years of service. Know what you're entitled to when leaving a job.",
    url: "https://www.numrexo.com/finance/gratuity-calculator",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

export default function GratuityCalculator() {
    const [lastSalary, setLastSalary] = useState("");
    const [years, setYears] = useState("");
    const [months, setMonths] = useState("0");
    const [result, setResult] = useState<any>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculate = () => {
        const salary = parseFloat(lastSalary);
        let y = parseFloat(years);
        const m = parseFloat(months);

        if (!salary || salary <= 0) {
            alert("Please enter your last drawn salary");
            return;
        }

        if (!y || y < 5) {
            alert("Gratuity requires minimum 5 years of continuous service");
            setResult({ eligible: false, message: "You need at least 5 years of service to be eligible for gratuity." });
            return;
        }

        // Convert months to years fraction
        y = y + (m / 12);
        const completedYears = Math.floor(y);

        // Formula: (Last drawn salary × 15 × Years of service) ÷ 26
        let gratuity = (salary * 15 * completedYears) / 26;
        const maxGratuity = 2000000;
        const taxableAmount = gratuity > maxGratuity ? gratuity - maxGratuity : 0;
        const taxFreeAmount = Math.min(gratuity, maxGratuity);

        setResult({
            eligible: true,
            gratuity: Math.round(gratuity).toLocaleString("en-IN"),
            taxFree: Math.round(taxFreeAmount).toLocaleString("en-IN"),
            taxable: Math.round(taxableAmount).toLocaleString("en-IN"),
            yearsOfService: completedYears,
            salary: salary.toLocaleString("en-IN"),
        });
    };

    const resetForm = () => {
        setLastSalary("");
        setYears("");
        setMonths("0");
        setResult(null);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GRATUITY_SCHEMA }} />

            <nav className="mb-5"><ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"><li><a href="/" className="hover:text-gray-300">Home</a></li><li className="text-gray-700">/</li><li><a href="/finance" className="hover:text-gray-300">Finance Calculators</a></li><li className="text-gray-700">/</li><li><span className="text-gray-300">Gratuity Calculator</span></li></ol></nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-semibold">Your Employment Details</h3><p className="text-xs text-gray-500 mt-1">For employees covered under the Payment of Gratuity Act, 1972</p></div>
                    <div className="p-6 space-y-4">
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Last Drawn Basic Salary + DA</label><div className="relative"><input type="number" placeholder="50000" value={lastSalary} onChange={(e) => setLastSalary(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span></div><p className="text-xs text-gray-500 mt-1">Basic salary + Dearness Allowance (if applicable)</p></div>
                        <div><label className="block text-xs font-semibold text-gray-400 mb-2">Total Years of Service</label><div className="grid grid-cols-2 gap-3"><div className="relative"><input type="number" placeholder="10" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">years</span></div><div className="relative"><input type="number" placeholder="0" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full px-4 py-3 bg-[#0f1525] border border-gray-700 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">months</span></div></div><p className="text-xs text-gray-500 mt-1">Need at least 5 years of continuous service to qualify</p></div>
                        <div className="flex gap-3">
                            <button onClick={calculate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:shadow-lg transition-all">Calculate Gratuity →</button>
                            <button onClick={resetForm} className="px-5 py-3 rounded-lg bg-[#0f1525] border border-gray-700 text-gray-400 font-semibold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all">Reset</button>
                        </div>
                    </div>
                </div>

                <ResultBox
                    title="Your Gratuity Amount"
                    isEmpty={!result}
                    emptyIcon="🎁"
                    emptyText="Enter your salary and years of service"
                    mainResult={result?.eligible ? { label: "Total Gratuity (Before Tax)", value: `₹${result.gratuity}`, color: "text-orange-400" } : undefined}
                    extraRows={result ? [
                        ...(result.eligible ? [
                            { label: "Tax-Free Amount (Up to ₹20 lakhs)", value: `₹${result.taxFree}`, valueColor: "text-green-400" },
                            { label: "Taxable Portion", value: `₹${result.taxable}` },
                            { label: "Your Last Salary (Basic+DA)", value: `₹${result.salary}` },
                            { label: "Completed Years of Service", value: `${result.yearsOfService} years` },
                        ] : [{ label: "Note", value: result.message, valueColor: "text-red-400" }]),
                    ] : []}
                />
            </div>

            {/* ─── EXPANDED SEO CONTENT (~1650 WORDS) ─── */}

            {/* About Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About Gratuity Calculator</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    The <strong className="text-gray-300">Gratuity Calculator</strong> helps you estimate the lump sum amount you'll receive when leaving a job after 5+ years of continuous service. Under the Payment of Gratuity Act, 1972, employers must pay this benefit to eligible employees.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Whether you're planning retirement, switching jobs, or just curious about your benefits, our calculator shows your estimated gratuity amount, tax-free portion (up to ₹20 lakhs), and taxable amount.
                </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">How to Use This Gratuity Calculator</h2>
                <div className="space-y-3">
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 1:</strong> Enter your <strong className="text-white">last drawn basic salary + DA</strong> (Dearness Allowance).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 2:</strong> Enter your <strong className="text-white">total years of service</strong> (including months).</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 3:</strong> Click <strong className="text-white">"Calculate Gratuity"</strong> to see your estimated amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-gray-300">Step 4:</strong> View total gratuity, tax-free portion, and taxable amount.</p>
                    <p className="text-gray-400 text-sm leading-relaxed"><strong className="text-white">Step 5:</strong> Use the <strong className="text-white">Reset</strong> button to clear all inputs and calculate a different scenario.</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Why Use a Gratuity Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-orange-400 mb-2">✓ Retirement Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Know exactly how much you'll receive when you retire. Plan your post-retirement finances with accurate gratuity estimates.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Job Switch Decision</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">If you're 4+ years into a job, calculate if waiting for 5 years is worth the gratuity amount you'd receive.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">✓ Tax Planning</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Gratuity up to ₹20 lakhs is tax-free. Amount above ₹20 lakhs is taxable. Plan your taxes accordingly.</p>
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-2">✓ Know Your Rights</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Many employees don't know they're entitled to gratuity after 5 years. Calculate what your employer owes you.</p>
                    </div>
                </div>
            </section>

            {/* Gratuity Eligibility Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Gratuity Eligibility Criteria</h2>
                <ul className="space-y-2">
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Minimum 5 years continuous service</strong> with same employer (doesn't need to be consecutive years at same location — transfers within same company count).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Applicable on resignation, retirement, or death</strong> (family receives on death).</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Company with 10+ employees</strong> must provide gratuity by law. Smaller companies may still offer voluntarily.</span></li>
                    <li className="flex gap-3 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span><span><strong className="text-gray-300">Even if terminated</strong> (except for misconduct causing damage/loss), gratuity still payable after 5 years.</span></li>
                </ul>
            </section>

            {/* Gratuity Tax Rules */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Gratuity Tax Rules (Section 10(10))</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>• <strong>Government Employees:</strong> Entire gratuity amount is tax-free (no upper limit for central/state govt employees).</li>
                        <li>• <strong>Private Sector Employees:</strong> Gratuity up to ₹20 lakhs is tax-free. Any amount above ₹20 lakhs is added to your taxable income.</li>
                        <li>• <strong>Exemption Formula:</strong> Lower of (Actual gratuity received, ₹20 lakhs, Calculated amount as per formula).</li>
                        <li>• <strong>Death/Disability:</strong> Gratuity received by family is tax-free with no upper limit.</li>
                    </ul>
                </div>
            </section>

            {/* Gratuity vs Other Benefits */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Gratuity vs Other Retirement Benefits</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Benefit</th><th className="text-left py-3 px-4 text-gray-400">Eligibility</th><th className="text-left py-3 px-4 text-gray-400">Tax-Free Limit</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Gratuity</td><td className="py-2 px-4">5+ years service</td><td className="py-2 px-4 text-yellow-400">₹20 lakhs</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">EPF</td><td className="py-2 px-4">Any service period</td><td className="py-2 px-4 text-yellow-400">₹5 lakhs (employee share)</td></tr>
                            <tr className="border-b border-gray-800/50"><td className="py-2 px-4">Superannuation/Pension</td><td className="py-2 px-4">Depends on scheme</td><td className="py-2 px-4 text-yellow-400">Partial exemption</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* What is Gratuity Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">What is Gratuity and Why Should You Care?</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Gratuity is basically your employer saying "thanks for sticking around" in cash form. You get it after 5+ years with the same company. The government mandates it under the Payment of Gratuity Act, so most companies have to pay it. It's a nice lump sum when you retire or move to a new job.</p>
            </section>

            {/* Gratuity Formula Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Gratuity Formula & Example</h2>
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
                    <p className="text-white font-mono text-sm mb-2">Gratuity = (Last drawn salary × 15 × Years of service) ÷ 26</p>
                    <p className="text-gray-500 text-xs">Example: ₹50,000 basic salary, 10 years of service → (50,000 × 15 × 10) ÷ 26 = ₹2,88,461</p>
                    <p className="text-gray-500 text-xs mt-2">Note: The last year counts as a full year if you've worked more than 6 months. Less than 6 months? That half-year doesn't count toward gratuity calculation.</p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, i) => (
                        <div key={i} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                            <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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