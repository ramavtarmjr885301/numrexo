"use client";

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';
import Head from 'next/head';

export default function TravelCategoryPage() {
    const calculators = getCalculatorsByCategory('travel');
    
    // SEO Data - Travel & Trip Planning Focus
    const pageTitle = "Travel Calculators: Fuel Cost, Trip Budget, Flight Time, Accommodation, Currency Converter & More | Numrexo";
    const pageDescription = "Free travel calculators for fuel cost, trip budget, flight time, accommodation cost, currency conversion, and travel planning. Trusted by 200,000+ travelers worldwide. Plan smarter, save money on your next trip.";
    const pageUrl = "https://numrexo.com/travel";
    const siteName = "Numrexo";
    
    // Structured Data for Travel Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Travel Calculators",
        "description": "Free professional travel calculators for trip planning, budget management, and travel logistics.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Travel Planning & Budget Tools",
            "description": "Tools for fuel cost calculation, trip budgeting, flight time estimation, accommodation cost planning, and currency conversion"
        },
        "audience": {
            "@type": "Audience",
            "name": "Road Trippers, Budget Travelers, Business Travelers, Vacation Planners, Backpackers"
        }
    };
    
    return (
        <>
            {/* SEO Meta Tags - Travel Specific */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="travel calculators, fuel cost calculator, trip budget calculator, flight time calculator, accommodation cost calculator, currency converter, travel planning tools, road trip planner, vacation budget" />
                <meta name="author" content="Numrexo" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Travel Calculators | Fuel Cost, Trip Budget, Flight Time & Planning Tools" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Travel Calculators | Plan Your Next Adventure" />
                <meta name="twitter:description" content="Free travel calculators for fuel cost, trip budget, flight time & more. Trusted by 200,000+ travelers worldwide." />
            </Head>

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
                        Travel & Trip Planning
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Travel Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-white">fuel cost, trip budget, flight time, accommodation expenses, and currency conversions</strong> instantly.
                        <span className="block mt-2 text-blue-400 text-sm">Plan smarter, save money — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">✓ Trusted by 200,000+ travelers</span>
                        <span className="flex items-center gap-1">✓ Used in 80+ countries</span>
                        <span className="flex items-center gap-1">✓ Real-time exchange rates</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-gray-500 text-center border-b border-gray-800 pb-3">
                    {calculators.length > 0 ? (
                        <>✈️ <span className="font-semibold text-blue-400">{calculators.length}+ travel calculators</span> available — all free, all accurate</>
                    ) : (
                        <>✈️ <span className="font-semibold text-blue-400">New travel calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">✈️</div>
                        <p className="text-gray-400 mb-2">More travel calculators coming soon!</p>
                        <p className="text-gray-500 text-sm">Check back next week for fuel cost and budget tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Why Use Numrexo Travel Calculators?</h2>
                            <p>
                                Our <strong className="text-white">travel calculators</strong> are designed for road trippers, 
                                budget travelers, business travelers, vacation planners, and backpackers. Each tool helps you 
                                plan efficiently and avoid unexpected expenses on your journey.
                            </p>
                            <p>
                                The <strong className="text-white">Fuel Cost Calculator</strong> estimates how much you'll spend 
                                on gas or diesel for your road trip. Enter distance, fuel efficiency (mileage), and fuel price 
                                — get total fuel cost instantly. Perfect for planning road trips, cross-country drives, or daily commutes.
                            </p>
                            <p>
                                Our <strong className="text-white">Trip Budget Calculator</strong> helps you plan total vacation 
                                expenses including transportation, accommodation, food, activities, and miscellaneous costs. 
                                Set your budget and see where you can save money.
                            </p>
                            <p>
                                The <strong className="text-white">Flight Time Calculator</strong> estimates total travel duration 
                                including flight time, layovers, and time zone differences. Perfect for connecting flights and 
                                international travel planning.
                            </p>
                            <p>
                                The <strong className="text-white">Accommodation Cost Calculator</strong> helps compare hotel, 
                                hostel, or rental prices per night. The <strong className="text-white">Currency Converter</strong> 
                                uses real-time exchange rates to help you understand costs in your home currency.
                            </p>
                            <p>
                                <strong className="text-white">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your travel plans stay private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-gray-400 space-y-3">
                            <h2 className="text-lg font-semibold text-white mb-3">Popular Travel Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-white">Fuel Cost:</strong> Total gas expense for any road trip distance</li>
                                <li><strong className="text-white">Trip Budget:</strong> Complete vacation cost breakdown</li>
                                <li><strong className="text-white">Flight Time:</strong> Total travel duration including layovers</li>
                                <li><strong className="text-white">Accommodation Cost:</strong> Per night and total stay expenses</li>
                                <li><strong className="text-white">Currency Converter:</strong> Real-time exchange rates for 150+ currencies</li>
                                <li><strong className="text-white">Hotel Expense Calculator:</strong> Compare lodging options</li>
                                <li><strong className="text-white">Baggage Limit Calculator:</strong> Check airline luggage allowances</li>
                                <li><strong className="text-white">Tip Splitter:</strong> Divide restaurant and service tips among travelers</li>
                                <li><strong className="text-white">Distance Calculator:</strong> Travel distance between cities</li>
                                <li><strong className="text-white">Pace Calculator:</strong> Walking, running, and hiking pace planning</li>
                            </ul>
                            
                            {/* Supported Travel Categories */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-white mb-2">Travel Categories Covered</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Road Trips</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Flight Planning</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Budget Travel</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Accommodation</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Currency Exchange</span>
                                    <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300">Group Travel</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300/80">
                                    💡 <strong className="text-blue-300">Pro Tip:</strong> For road trips, always add 10-15% to fuel cost 
                                    estimates for detours and price fluctuations. Use our Trip Budget Calculator before booking anything 
                                    — many travelers underestimate daily food and activity costs. For international trips, check currency 
                                    rates 2-3 weeks before departure for the best exchange timing.
                                </p>
                            </div>
                            
                            {/* Note */}
                            <div className="mt-3 p-2 bg-gray-800/30 rounded text-[11px] text-gray-500 italic">
                                Note: Fuel cost estimates assume average driving conditions. Flight times are estimates — actual duration 
                                may vary based on airline schedules, weather, and air traffic. Currency rates are updated regularly but 
                                may not reflect real-time market fluctuations.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-gray-800/50 text-xs text-gray-500 text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-400 hover:underline mx-1">All Calculators</a> • 
                            <a href="/time" className="text-blue-400 hover:underline mx-1">Time & Date Tools</a> • 
                            <a href="/converters" className="text-blue-400 hover:underline mx-1">Currency Converter</a>
                        </p>
                        <p className="mt-2 text-gray-600 text-[11px]">
                            <span className="text-gray-500">✈️ Real-time exchange rates & fuel efficiency formulas | </span>
                            <span className="text-gray-500">Plan smarter, travel better</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}
