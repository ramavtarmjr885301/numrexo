"use client";

// app/tax/TaxCategoryClient.tsx
//
// Client half of the tax category page. It was previously app/tax/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/tax/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function TaxCategoryClient() {
    const calculators = getCalculatorsByCategory('tax');
    
    // SEO Data - Tax & Compliance Focus
    const pageUrl = "https://numrexo.com/tax";
    const siteName = "Numrexo";
    
    // Structured Data for Tax Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Tax Calculators",
        "description": "Free professional tax calculators for GST, VAT, sales tax, and tax compliance.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Tax Compliance & Calculation Tools",
            "description": "Tools for GST calculation, VAT addition/removal, sales tax, and tax return estimation"
        },
        "audience": {
            "@type": "Audience",
            "name": "Business Owners, Accountants, Tax Professionals, Freelancers"
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
                        Tax & Compliance
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Tax Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">GST, VAT, sales tax, income tax, capital gains tax, and tax refunds</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Simplify your tax compliance — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 150,000+ business owners</span>
                        <span className="flex items-center gap-1">✓ Used in 50+ countries</span>
                        <span className="flex items-center gap-1">✓ GST & VAT compliant formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>📋 <span className="font-semibold text-blue-400">{calculators.length}+ tax calculators</span> available — all free, all accurate</>
                    ) : (
                        <>📋 <span className="font-semibold text-blue-400">New tax calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">📋</div>
                        <p className="text-gray-400 mb-2">More tax calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for GST and income tax tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Tax Calculators?</h2>
                            <p>
                                Our <strong className="text-white">tax calculators</strong> are designed for small business owners, 
                                freelancers, accountants, tax professionals, and individual taxpayers. Each tool uses standard 
                                tax formulas compliant with GST, VAT, and sales tax regulations in multiple jurisdictions.
                            </p>
                            <p>
                                The <strong className="text-white">GST Calculator</strong> (Goods and Services Tax) helps businesses 
                                add or remove GST from any amount. Supports all major GST slabs including 5%, 12%, 18%, and 28%. 
                                Perfect for invoicing, billing, and tax filing preparation.
                            </p>
                            <p>
                                Our <strong className="text-white">VAT Calculator</strong> (Value Added Tax) computes VAT-inclusive 
                                and VAT-exclusive prices. Essential for businesses operating in countries with VAT systems (UK, EU, 
                                Canada, Australia, and more).
                            </p>
                            <p>
                                The <strong className="text-white">Sales Tax Calculator</strong> determines the final price after 
                                applying state and local sales tax rates. Perfect for retail businesses and online sellers calculating 
                                customer prices across different tax jurisdictions.
                            </p>
                            <p>
                                Our <strong className="text-white">Income Tax Calculator</strong> estimates tax liability based on 
                                income brackets, deductions, and exemptions. The <strong className="text-white">Capital Gains Tax 
                                Calculator</strong> helps investors calculate taxes on stock, property, and asset sales.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your financial data stays private and secure.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Tax Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">GST Calculator:</strong> Add or remove GST from any amount (5%, 12%, 18%, 28% slabs)</li>
                                <li><strong className="text-white">VAT Calculator:</strong> VAT-inclusive and VAT-exclusive pricing</li>
                                <li><strong className="text-white">Sales Tax Calculator:</strong> Apply state/city sales tax rates to product prices</li>
                                <li><strong className="text-white">Income Tax Estimator:</strong> Calculate annual tax liability based on income brackets</li>
                                <li><strong className="text-white">Capital Gains Tax:</strong> Short-term and long-term gains on assets</li>
                                <li><strong className="text-white">Tax Refund Calculator:</strong> Estimate refund when overpaid taxes</li>
                                <li><strong className="text-white">TDS Calculator:</strong> Tax deducted at source on payments</li>
                                <li><strong className="text-white">GST/HST Calculator:</strong> Canadian federal and provincial taxes</li>
                            </ul>
                            
                            {/* Supported Tax Systems */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Supported Tax Systems</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">GST (India, Canada, Australia)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">VAT (UK, EU, Middle East)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Sales Tax (USA)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Income Tax (Multiple Countries)</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Capital Gains Tax</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> When invoicing clients, always calculate GST/VAT separately 
                                    and show the tax amount clearly. Use our GST Calculator to verify your tax calculations before filing returns. 
                                    Remember: For reverse charge mechanism or composite schemes, consult your tax advisor.
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Disclaimer: These calculators provide estimates based on standard tax rates and formulas. Actual tax liability 
                                depends on jurisdiction, exemptions, deductions, and individual circumstances. Always consult a qualified tax 
                                professional or accountant before filing returns.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/finance" className="text-blue-400 hover:underline mx-1">Finance Calculators</a> • 
                            <a href="/business" className="text-blue-400 hover:underline mx-1">Business Tools</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">📋 GST, VAT & Sales tax compliant formulas | </span>
                            <span className="text-gray-500">Results are estimates — verify with your tax professional</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}