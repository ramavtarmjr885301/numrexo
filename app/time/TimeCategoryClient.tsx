"use client";

// app/time/TimeCategoryClient.tsx
//
// Client half of the time category page. It was previously app/time/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/time/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function TimeCategoryClient() {
    const calculators = getCalculatorsByCategory('time');
    
    // SEO Data - Time & Date Focus
    const pageUrl = "https://numrexo.com/time";
    const siteName = "Numrexo";
    
    // Structured Data for Time & Date Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Time & Date Calculators",
        "description": "Free professional time and date calculators for scheduling, age calculation, and date planning.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Time & Date Management Tools",
            "description": "Tools for age calculation, date difference, working days counting, countdown timers, and schedule planning"
        },
        "audience": {
            "@type": "Audience",
            "name": "Event Planners, HR Professionals, Students, Project Managers, Everyone"
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
                        Time, Date & Scheduling
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Time & Date Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">age, date difference, working days, business days, countdown timers, and time between dates</strong> instantly.
                        <span className="block mt-2 text-blue-600 text-sm">Perfect for planning and scheduling — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Gregorian calendar compliant</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    {calculators.length > 0 ? (
                        <>⏰ <span className="font-semibold text-blue-600">{calculators.length}+ time & date calculators</span> available — all free to use</>
                    ) : (
                        <>⏰ <span className="font-semibold text-blue-600">New time & date calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">⏰</div>
                        <p className="text-ink-faint mb-2">More time & date calculators coming soon!</p>
                        <p className="text-ink-faint text-sm">Check back next week for age and countdown tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Time & Date Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">time and date calculators</strong> are designed for event planners, 
                                HR professionals, project managers, students, and anyone who needs to manage schedules, track ages, 
                                or plan important dates. Each tool uses the Gregorian calendar system and accounts for leap years.
                            </p>
                            <p>
                                The <strong className="text-ink">Age Calculator</strong> tells you your exact age in years, months, 
                                and days. Perfect for birthday planning, medical records, official documents, or simply satisfying 
                                curiosity. Enter any birth date and get instant results.
                            </p>
                            <p>
                                Our <strong className="text-ink">Date Difference Calculator</strong> computes the exact number of 
                                days, weeks, months, or years between two dates. Essential for project timelines, contract durations, 
                                pregnancy due date tracking, or counting down to special events.
                            </p>
                            <p>
                                The <strong className="text-ink">Working Days Calculator</strong> (Business Days Calculator) counts 
                                only weekdays (Monday-Friday) and excludes weekends. Perfect for calculating delivery times, project 
                                deadlines, leave requests, or invoice due dates. Option to exclude public holidays.
                            </p>
                            <p>
                                Our <strong className="text-ink">Countdown Timer</strong> helps you track time until upcoming events — 
                                weddings, vacations, exams, birthdays, or retirement. The <strong className="text-ink">Future Date 
                                Calculator</strong> adds or subtracts days/weeks/months/years from any starting date.
                            </p>
                            <p>
                                <strong className="text-ink">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your personal dates stay private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Time & Date Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">Age Calculator:</strong> Exact age in years, months, and days</li>
                                <li><strong className="text-ink">Date Difference:</strong> Days, weeks, months between two dates</li>
                                <li><strong className="text-ink">Working Days:</strong> Business days excluding weekends</li>
                                <li><strong className="text-ink">Countdown Timer:</strong> Time remaining until any future date</li>
                                <li><strong className="text-ink">Future Date:</strong> Add/subtract time from any starting date</li>
                                <li><strong className="text-ink">Days Until Birthday:</strong> Countdown to your next birthday</li>
                                <li><strong className="text-ink">Time Duration:</strong> Hours and minutes between two times</li>
                                <li><strong className="text-ink">Online Stopwatch:</strong> Track elapsed time for tasks</li>
                                <li><strong className="text-ink">Time Zone Converter:</strong> Convert between global time zones</li>
                            </ul>
                            
                            {/* Key Features */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-ink mb-2">Key Features</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Leap year aware</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Gregorian calendar</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Weekend exclusion</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Holiday support</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Multiple date formats</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600/80">
                                    💡 <strong className="text-blue-600">Pro Tip:</strong> Use our Working Days Calculator for project deadlines — 
                                    remember that a "5 business day" delivery means Monday-Friday only, excluding weekends. For age calculations, 
                                    our tool includes your exact birth date, so you'll know your precise age down to the day!
                                </p>
                            </div>
                            
                            {/* Note */}
                            <div className="mt-3 p-2 bg-cream rounded text-[11px] text-ink-faint italic">
                                Note: All calculations follow the Gregorian calendar and account for leap years. Working days calculations 
                                exclude Saturdays and Sundays by default. Custom holiday exclusion may be added in future updates.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-hairline text-xs text-ink-faint text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-600 hover:underline mx-1">All Calculators</a> • 
                            <a href="/math" className="text-blue-600 hover:underline mx-1">Math Calculators</a> • 
                            <a href="https://numrexo.com/age-calculator" className="text-blue-600 hover:underline mx-1">Age Calculator</a>
                        </p>
                        <p className="mt-2 text-ink-faint text-[11px]">
                            <span className="text-ink-faint">📅 Gregorian calendar & leap year compliant | </span>
                            <span className="text-ink-faint">Perfect for personal and professional planning</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}