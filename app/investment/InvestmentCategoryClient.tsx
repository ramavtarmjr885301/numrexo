"use client";

// app/investment/InvestmentCategoryClient.tsx
//
// Client half of the investment category page. It was previously app/investment/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/investment/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function InvestmentCategoryClient() {
    const calculators = getCalculatorsByCategory('investment');
    
    // SEO Data - Investment & Wealth Focus
    const pageUrl = "https://numrexo.com/investment";
    const siteName = "Numrexo";
    
    // Structured Data for Investment Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Investment Calculators",
        "description": "Free professional investment calculators for wealth planning, retirement corpus, and goal-based investing.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Investment & Wealth Planning Tools",
            "description": "Tools for SIP calculation, PPF maturity, NPS corpus, lumpsum growth, and retirement planning"
        },
        "audience": {
            "@type": "Audience",
            "name": "Investors, Retirement Planners, Young Professionals, Wealth Builders"
        }
    };
    
    return (
        <>
{/* Structured Data Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="px-4 sm:px-6 py-8 md:py-12 max-w-6xl mx-auto">
                
                {/* Header Section - SEO Optimized */}
                <div className="text-center mb-10 md:mb-12">
                    {/* Category Badge - Theme color (blue) */}
                    <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        Wealth & Investment
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Investment Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">SIP returns, PPF maturity, NPS corpus, lumpsum growth, FD interest, and RD maturity</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Build wealth for your future — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 100,000+ investors</span>
                        <span className="flex items-center gap-1">✓ Used in 60+ countries</span>
                        <span className="flex items-center gap-1">✓ SEBI & RBI compliant formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>📈 <span className="font-semibold text-blue-400">{calculators.length}+ investment calculators</span> available — all free, all accurate</>
                    ) : (
                        <>📈 <span className="font-semibold text-blue-400">New investment calculators</span> being added weekly — check back soon!</>
                    )}
                </div>
                
                {/* Calculator Grid */}
                {calculators.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {calculators.map((calc, index) => (
                            <CalculatorCard 
                                key={calc.id} 
                                calculator={calc} 
                                onClick={() => window.location.href = calc.path}
                                
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-[#111827] rounded-xl border border-gray-800">
                        <div className="text-5xl mb-4">📈</div>
                        <p className="text-gray-400 mb-2">More investment calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for SIP and retirement tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Investment Calculators?</h2>
                            <p>
                                Our <strong className="text-white">investment calculators</strong> are designed for first-time investors, 
                                retirement planners, young professionals, and wealth builders. Each tool uses standard financial formulas 
                                (compound interest, future value, present value) and follows SEBI and RBI guidelines.
                            </p>
                            <p>
                                The <strong className="text-white">SIP Calculator</strong> (Systematic Investment Plan) projects the future 
                                value of your monthly mutual fund investments. Based on expected rate of return, see how small monthly 
                                investments grow into large corpus over time through the power of compounding.
                            </p>
                            <p>
                                Our <strong className="text-white">PPF Calculator</strong> (Public Provident Fund) computes maturity amounts 
                                for this popular government-backed, tax-saving investment. Calculate returns for 15-year lock-in period 
                                with current interest rates.
                            </p>
                            <p>
                                The <strong className="text-white">NPS Calculator</strong> (National Pension System) helps estimate your 
                                retirement corpus and monthly pension. Plan your golden years with confidence using government-backed 
                                pension scheme calculations.
                            </p>
                            <p>
                                The <strong className="text-white">Lumpsum Calculator</strong> evaluates returns on one-time investments 
                                in stocks, mutual funds, or fixed deposits. Our <strong className="text-white">FD Calculator</strong> and 
                                <strong className="text-white">RD Calculator</strong> help with fixed income planning.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your investment strategy stays private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Investment Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">SIP Calculator:</strong> Monthly mutual fund investment growth projection</li>
                                <li><strong className="text-white">PPF Calculator:</strong> Public Provident Fund maturity & tax benefits</li>
                                <li><strong className="text-white">NPS Calculator:</strong> National Pension System retirement corpus</li>
                                <li><strong className="text-white">Lumpsum Calculator:</strong> One-time investment returns</li>
                                <li><strong className="text-white">FD Calculator:</strong> Fixed deposit maturity with cumulative interest</li>
                                <li><strong className="text-white">RD Calculator:</strong> Recurring deposit maturity value</li>
                                <li><strong className="text-white">SWP Calculator:</strong> Systematic withdrawal plan for regular income</li>
                                <li><strong className="text-white">Retirement Planner:</strong> Corpus needed for post-retirement life</li>
                                <li><strong className="text-white">Goal-Based Investing:</strong> Monthly investment needed for target corpus</li>
                            </ul>
                            
                            {/* Supported Investment Products */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Supported Investment Products</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Mutual Funds (SIP)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Public Provident Fund</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">National Pension System</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Fixed Deposits</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Recurring Deposits</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Stocks & Equity</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Retirement Funds</span>
                                </div>
                            </div>
                            
                            {/* Power of Compounding Box */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">The Power of Compounding:</strong> 
                                    A ₹10,000 monthly SIP at 12% returns becomes ₹1 crore in ~21 years, ₹2 crore in ~27 years, 
                                    and ₹5 crore in ~35 years. Start early — time is your biggest wealth-building ally!
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Disclaimer: These calculators provide estimates based on assumed rates of return. Actual market returns 
                                may vary. Past performance does not guarantee future returns. Consult a SEBI-registered financial advisor 
                                before making investment decisions.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/finance" className="text-blue-400 hover:underline mx-1">Finance Calculators</a> • 
                            <a href="/tax" className="text-blue-400 hover:underline mx-1">Tax Planning Tools</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">📊 Compound interest & future value formulas | </span>
                            <span className="text-gray-500">Results are estimates — verify with your financial advisor</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}