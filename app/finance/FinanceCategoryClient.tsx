"use client";

// app/finance/FinanceCategoryClient.tsx
//
// Client half of the finance category page. It was previously app/finance/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/finance/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function FinanceCategoryClient() {
    const calculators = getCalculatorsByCategory('finance');
    
    // SEO Data - Finance & Investment Focus
    const pageUrl = "https://numrexo.com/finance";
    const siteName = "Numrexo";
    
    // Structured Data for Finance Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Finance Calculators",
        "description": "Free professional finance calculators for loans, investments, tax, and retirement planning.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Personal Finance & Investment Tools",
            "description": "Tools for EMI calculation, investment returns, tax estimation, and financial goal planning"
        },
        "audience": {
            "@type": "Audience",
            "name": "Investors, Home Buyers, Business Owners, Financial Planners"
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
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        Personal Finance & Investment
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Finance Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">EMI, loan amortization, SIP returns, fixed deposits, PPF maturity, GST, and investment growth</strong> instantly.
                        <span className="block mt-2 text-blue-600 text-sm">Make smarter financial decisions — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Standard published formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    {calculators.length > 0 ? (
                        <>💰 <span className="font-semibold text-blue-600">{calculators.length}+ finance calculators</span> available — all free to use</>
                    ) : (
                        <>💰 <span className="font-semibold text-blue-600">New finance calculators</span> being added weekly — check back soon!</>
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
                    <div className="text-center py-12 bg-surface rounded-xl border border-hairline">
                        <div className="text-5xl mb-4">💰</div>
                        <p className="text-ink-faint mb-2">More finance calculators coming soon!</p>
                        <p className="text-ink-faint text-sm">Check back next week for EMI and investment tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Finance Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">finance calculators</strong> are designed for home buyers, 
                                investors, small business owners, students, and financial planners. Each tool uses the standard,
                                publicly documented formulas for amortization, compound interest, NPV and IRR, and every page shows
                                the formula it applies so you can check the result yourself.
                            </p>
                            <p>
                                The <strong className="text-ink">EMI Calculator</strong> helps you estimate monthly loan payments 
                                for home loans, car loans, or personal loans. Simply enter loan amount, interest rate, and tenure — 
                                get your exact EMI and total interest payable over the loan term.
                            </p>
                            <p>
                                Our <strong className="text-ink">SIP Calculator</strong> projects the future value of your 
                                systematic investment plans in mutual funds. Based on expected rate of return, see how your 
                                monthly investments grow over time through the power of compounding.
                            </p>
                            <p>
                                The <strong className="text-ink">FD Calculator</strong> computes maturity amounts for fixed 
                                deposits with cumulative or non-cumulative options. The <strong className="text-ink">PPF Calculator</strong> 
                                helps you plan your Public Provident Fund investments for tax-saving and retirement goals.
                            </p>
                            <p>
                                Our <strong className="text-ink">GST Calculator</strong> helps businesses add or remove GST 
                                from any amount, supporting all Indian GST slabs (5%, 12%, 18%, 28%). The 
                                <strong className="text-ink">Investment Calculator</strong> evaluates returns on lumpsum 
                                investments, stocks, and recurring deposits.
                            </p>
                            <p>
                                <strong className="text-ink">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your financial data stays private and secure.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Financial Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">EMI Calculator:</strong> Monthly payments for home, car, or personal loans</li>
                                <li><strong className="text-ink">Loan Amortization:</strong> Track principal vs interest payment schedule</li>
                                <li><strong className="text-ink">SIP Returns:</strong> Project mutual fund investment growth over time</li>
                                <li><strong className="text-ink">Fixed Deposit:</strong> Maturity amount with cumulative interest</li>
                                <li><strong className="text-ink">PPF Calculator:</strong> Public Provident Fund maturity and tax benefits</li>
                                <li><strong className="text-ink">GST Calculator:</strong> Add or remove GST for business invoicing</li>
                                <li><strong className="text-ink">Lumpsum Investment:</strong> Returns on one-time stock or fund investments</li>
                                <li><strong className="text-ink">Recurring Deposit:</strong> Maturity value for RD accounts</li>
                                <li><strong className="text-ink">Retirement Planning:</strong> Estimate corpus needed for post-retirement life</li>
                                <li><strong className="text-ink">Capital Gains Tax:</strong> Calculate long-term and short-term capital gains</li>
                            </ul>
                            
                            {/* Supported Financial Products */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-ink mb-2">Supported Financial Products</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Home Loan</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Car Loan</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Personal Loan</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Mutual Funds (SIP)</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Fixed Deposits</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Public Provident Fund</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Recurring Deposits</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Stocks & Equity</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600/80">
                                    💡 <strong className="text-blue-600">Pro Tip:</strong> Use our EMI Calculator before applying for a loan 
                                    to ensure monthly payments fit your budget. Try different tenures and down payments to find the 
                                    most affordable option.
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-cream rounded text-[11px] text-ink-faint italic">
                                Disclaimer: These calculators provide estimates based on standard formulas. Actual returns may vary 
                                based on market conditions, bank policies, and individual circumstances. Consult a financial advisor 
                                for major investment decisions.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-hairline text-xs text-ink-faint text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-600 hover:underline mx-1">All Calculators</a> • 
                            <a href="/tax" className="text-blue-600 hover:underline mx-1">Tax Calculators</a> • 
                            <a href="/business" className="text-blue-600 hover:underline mx-1">Business Finance Tools</a>
                        </p>
                        <p className="mt-2 text-ink-faint text-[11px]">
                            <span className="text-ink-faint">📊 Standard amortization & compound interest formulas | </span>
                            <span className="text-ink-faint">Results are estimates — verify with your financial institution</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}