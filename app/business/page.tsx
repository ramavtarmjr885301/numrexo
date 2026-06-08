"use client";

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';
import Head from 'next/head';

export default function BusinessCategoryPage() {
    const calculators = getCalculatorsByCategory('business');
    
    // SEO Data - Global Traffic Focus
    const pageTitle = "Business Calculators: Profit Margin, ROI, Discount, Break-Even & More | Numrexo";
    const pageDescription = "Free business calculators for profit margin, ROI, discount, break-even analysis, markup, and commission. Make data-driven decisions. Used by 10,000+ business owners worldwide.";
    const pageUrl = "https://numrexo.com/business";
    const siteName = "Numrexo";
    
    // Structured Data for Business Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Business Calculators",
        "description": "Free professional business calculators for financial analysis, profit optimization, and strategic planning.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Business Financial Tools",
            "description": "Tools for profit calculation, ROI analysis, pricing strategy, and financial planning"
        }
    };
    
    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="business calculators, profit margin calculator, ROI calculator, discount calculator, break-even calculator, markup calculator, commission calculator, business finance tools, profit calculator" />
                <meta name="author" content="Numrexo" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Business Calculators | Profit Margin, ROI & Break-Even Tools" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Business Calculators | Financial Tools for Entrepreneurs" />
                <meta name="twitter:description" content="Free professional business calculators. Profit margin, ROI, break-even, and more. Trusted by business owners worldwide." />
            </Head>

            {/* Structured Data Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="px-4 sm:px-6 py-8 md:py-12 max-w-6xl mx-auto">
                
                {/* Header Section - SEO Optimized with Trust Signals */}
                <div className="text-center mb-10 md:mb-12">
                    {/* Category Badge - Shows site structure */}
                    <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        Finance & Business
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Business Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust + Global Appeal */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">profit margin, ROI, discount, break-even point, markup, and commission</strong> instantly. 
                        Make smarter, data-driven business decisions. <strong className="text-blue-400">100% free — no sign-up required.</strong>
                    </p>
                    
                    {/* Trust Badge - Social Proof */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ 10,000+ business owners</span>
                        <span className="flex items-center gap-1">✓ Used in 50+ countries</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                        <span className="flex items-center gap-1">✓ Instant results</span>
                    </div>
                </div>
                
                {/* Calculators Count - Shows comprehensiveness */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    📊 <span className="font-semibold text-blue-400">{calculators.length}+ business calculators</span> available — all free, all accurate
                </div>
                
                {/* Calculator Grid - Optimized Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {calculators.map((calc, index) => (
                        <CalculatorCard 
                            key={calc.id} 
                            calculator={calc} 
                            onClick={() => window.location.href = calc.path}
                            // Optional: Add priority to first 3 calculators for LCP
                            
                        />
                    ))}
                </div>
                
                {/* SEO Content Section - Builds Authority & Targets Long-Tail Keywords */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Educational Content */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Business Calculators?</h2>
                            <p>
                                Our <strong className="text-white">business calculators</strong> are built for entrepreneurs, small business owners, 
                                financial analysts, and students. Each tool uses industry-standard formulas to ensure accuracy you can trust.
                            </p>
                            <p>
                                The <strong className="text-white">Profit Margin Calculator</strong> helps you determine your gross margin, net margin, 
                                and markup percentage. The <strong className="text-white">ROI Calculator</strong> evaluates investment returns over any period. 
                                Our <strong className="text-white">Break-Even Calculator</strong> shows exactly how many units you need to sell to cover costs.
                            </p>
                            <p>
                                <strong className="text-white">No hidden fees, no subscriptions, no data collection.</strong> All calculations happen locally 
                                in your browser — your business data stays private and secure.
                            </p>
                        </div>
                        
                        {/* Right Column - Use Cases & Keywords */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Business Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">Profit Margin:</strong> Calculate gross profit, operating margin, and net profit percentage</li>
                                <li><strong className="text-white">Return on Investment (ROI):</strong> Measure investment efficiency and compare opportunities</li>
                                <li><strong className="text-white">Discount & Sale Price:</strong> Determine final price after percentage or fixed discounts</li>
                                <li><strong className="text-white">Break-Even Analysis:</strong> Find minimum sales volume to avoid losses</li>
                                <li><strong className="text-white">Markup Calculator:</strong> Set optimal selling prices based on cost and desired margin</li>
                                <li><strong className="text-white">Sales Commission:</strong> Calculate earnings for sales teams with tiered rates</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines Crawl */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/finance" className="text-blue-400 hover:underline mx-1">Finance Calculators</a> • 
                            <a href="/tax" className="text-blue-400 hover:underline mx-1">Tax Calculators</a>
                        </p>
                        
                    </div>
                </div>
                
            </div>
        </>
    );
}