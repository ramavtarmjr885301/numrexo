"use client";

// app/travel/TravelCategoryClient.tsx
//
// Client half of the travel category page. It was previously app/travel/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/travel/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function TravelCategoryClient() {
    const calculators = getCalculatorsByCategory('travel');

    // SEO Data - Travel & Trip Planning Focus
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
                        Travel & Trip Planning
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>

                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Travel Calculators
                    </h1>

                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">fuel cost, trip budget, flight time, accommodation expenses, and currency conversions</strong> instantly.
                        <span className="block mt-2 text-blue-600 text-sm">Plan smarter, save money — 100% free, no sign-up required</span>
                    </p>

                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Real-time exchange rates</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>

                {/* Calculators Count */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    {calculators.length > 0 ? (
                        <>✈️ <span className="font-semibold text-blue-600">{calculators.length}+ travel calculators</span> available — all free to use</>
                    ) : (
                        <>✈️ <span className="font-semibold text-blue-600">New travel calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">✈️</div>
                        <p className="text-ink-faint mb-2">More travel calculators coming soon!</p>
                        <p className="text-ink-faint text-sm">Check back next week for fuel cost and budget tools.</p>
                    </div>
                )}

                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Travel Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">travel calculators</strong> are designed for road trippers,
                                budget travelers, business travelers, vacation planners, and backpackers. Each tool helps you
                                plan efficiently and avoid unexpected expenses on your journey.
                            </p>
                            <p>
                                The <strong className="text-ink">Fuel Cost Calculator</strong> estimates how much you'll spend
                                on gas or diesel for your road trip. Enter distance, fuel efficiency (mileage), and fuel price
                                — get total fuel cost instantly. Perfect for planning road trips, cross-country drives, or daily commutes.
                            </p>
                            <p>
                                Our <strong className="text-ink">Trip Budget Calculator</strong> helps you plan total vacation
                                expenses including transportation, accommodation, food, activities, and miscellaneous costs.
                                Set your budget and see where you can save money.
                            </p>
                            <p>
                                The <strong className="text-ink">Flight Time Calculator</strong> estimates total travel duration
                                including flight time, layovers, and time zone differences. Perfect for connecting flights and
                                international travel planning.
                            </p>
                            <p>
                                The <strong className="text-ink">Accommodation Cost Calculator</strong> helps compare hotel,
                                hostel, or rental prices per night. The <strong className="text-ink">Currency Converter</strong>
                                uses real-time exchange rates to help you understand costs in your home currency.
                            </p>
                            <p>
                                <strong className="text-ink">100% free, no registration, no data collection.</strong> All calculations
                                happen in your browser — your travel plans stay private.
                            </p>
                        </div>

                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Travel Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">Fuel Cost:</strong> Total gas expense for any road trip distance</li>
                                <li><strong className="text-ink">Trip Budget:</strong> Complete vacation cost breakdown</li>
                                <li><strong className="text-ink">Flight Time:</strong> Total travel duration including layovers</li>
                                <li><strong className="text-ink">Accommodation Cost:</strong> Per night and total stay expenses</li>
                                <li><strong className="text-ink">Currency Converter:</strong> Real-time exchange rates for 150+ currencies</li>
                                <li><strong className="text-ink">Hotel Expense Calculator:</strong> Compare lodging options</li>
                                <li><strong className="text-ink">Baggage Limit Calculator:</strong> Check airline luggage allowances</li>
                                <li><strong className="text-ink">Tip Splitter:</strong> Divide restaurant and service tips among travelers</li>
                                <li><strong className="text-ink">Distance Calculator:</strong> Travel distance between cities</li>
                                <li><strong className="text-ink">Pace Calculator:</strong> Walking, running, and hiking pace planning</li>
                            </ul>

                            {/* Supported Travel Categories */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-ink mb-2">Travel Categories Covered</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Road Trips</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Flight Planning</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Budget Travel</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Accommodation</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Currency Exchange</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Group Travel</span>
                                </div>
                            </div>

                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600/80">
                                    💡 <strong className="text-blue-600">Pro Tip:</strong> For road trips, always add 10-15% to fuel cost
                                    estimates for detours and price fluctuations. Use our Trip Budget Calculator before booking anything
                                    — many travelers underestimate daily food and activity costs. For international trips, check currency
                                    rates 2-3 weeks before departure for the best exchange timing.
                                </p>
                            </div>

                            {/* Note */}
                            <div className="mt-3 p-2 bg-cream rounded text-[11px] text-ink-faint italic">
                                Note: Fuel cost estimates assume average driving conditions. Flight times are estimates — actual duration
                                may vary based on airline schedules, weather, and air traffic. Currency rates are updated regularly but
                                may not reflect real-time market fluctuations.
                            </div>
                        </div>
                    </div>

                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-hairline text-xs text-ink-faint text-center">
                        <p>Related:
                            <a href="/calculators" className="text-blue-600 hover:underline mx-1">All Calculators</a> •
                            <a href="/time" className="text-blue-600 hover:underline mx-1">Time & Date Tools</a>
                            {/* <a href="/conversion/currency-converter" className="text-blue-600 hover:underline mx-1">Currency Converter</a> */}
                        </p>
                        <p className="mt-2 text-ink-faint text-[11px]">
                            <span className="text-ink-faint">✈️ Real-time exchange rates & fuel efficiency formulas | </span>
                            <span className="text-ink-faint">Plan smarter, travel better</span>
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}
