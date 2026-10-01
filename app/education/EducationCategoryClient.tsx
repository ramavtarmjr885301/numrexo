"use client";

// app/education/EducationCategoryClient.tsx
//
// Client half of the education category page. It was previously app/education/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/education/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function EducationCategoryClient() {
    const calculators = getCalculatorsByCategory('education');
    
    // SEO Data - Education & Academic Focus
    const pageUrl = "https://numrexo.com/education";
    const siteName = "Numrexo";
    
    // Structured Data for Education Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Education Calculators",
        "description": "Free academic calculators for GPA, CGPA, grade calculation, attendance tracking, and test score analysis.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Academic Performance Tools",
            "description": "Tools for GPA calculation, grade point average, attendance percentage, and exam score analysis"
        },
        "audience": {
            "@type": "Audience",
            "name": "Students, Teachers, Academic Advisors"
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
                        Academic & Learning
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Education Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">GPA, CGPA, semester grades, attendance percentage, test scores, and weighted averages</strong> instantly.
                        <span className="block mt-2 text-blue-600 text-sm">Ace your academic planning — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Follows international grading scales</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    {calculators.length > 0 ? (
                        <>📚 <span className="font-semibold text-blue-600">{calculators.length}+ education calculators</span> available — all free to use</>
                    ) : (
                        <>📚 <span className="font-semibold text-blue-600">New education calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">📚</div>
                        <p className="text-ink-faint mb-2">More education calculators coming soon!</p>
                        <p className="text-ink-faint text-sm">Check back next week for GPA and grade calculators.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Education Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">education calculators</strong> are designed for high school students, 
                                college undergraduates, graduate students, teachers, and academic advisors. Each tool uses standard 
                                academic formulas and international grading scales (4.0 scale, 10.0 scale, percentage system, and more).
                            </p>
                            <p>
                                The <strong className="text-ink">GPA Calculator</strong> helps you calculate your Grade Point Average 
                                for a semester or entire academic year. Simply enter your course grades and credit hours — get your 
                                exact GPA on a 4.0 scale instantly.
                            </p>
                            <p>
                                Our <strong className="text-ink">CGPA Calculator</strong> computes your Cumulative Grade Point Average 
                                across multiple semesters. Perfect for tracking academic progress throughout your degree program. 
                                The <strong className="text-ink">Grade Calculator</strong> helps you determine what you need on your 
                                final exam to achieve your target course grade.
                            </p>
                            <p>
                                The <strong className="text-ink">Attendance Calculator</strong> calculates your attendance percentage 
                                and shows how many more classes you can miss while maintaining required attendance. The 
                                <strong className="text-ink">Test Score Calculator</strong> converts raw scores to percentages and 
                                letter grades for any grading scale.
                            </p>
                            <p>
                                <strong className="text-ink">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your academic data stays private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Academic Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">GPA Calculator:</strong> Semester and cumulative GPA on 4.0, 5.0, or 10.0 scale</li>
                                <li><strong className="text-ink">CGPA Calculator:</strong> Track academic progress across multiple semesters</li>
                                <li><strong className="text-ink">Final Grade Calculator:</strong> What score you need on final exam to pass or get an A</li>
                                <li><strong className="text-ink">Attendance Percentage:</strong> Track attendance and see allowed absences</li>
                                <li><strong className="text-ink">Test Score Calculator:</strong> Convert raw marks to percentage and letter grade</li>
                                <li><strong className="text-ink">Weighted Average Calculator:</strong> Calculate grades with different assignment weights</li>
                                <li><strong className="text-ink">College Expense Estimator:</strong> Plan tuition, fees, and education loan costs</li>
                                <li><strong className="text-ink">Scholarship Calculator:</strong> Estimate merit-based scholarship eligibility</li>
                            </ul>
                            
                            {/* Grading Scales Supported */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-ink mb-2">Supported Grading Scales</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">4.0 GPA Scale (US)</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">5.0 GPA Scale (Honors)</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">10.0 CGPA Scale (India)</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Percentage System (0-100)</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Letter Grades (A-F)</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">European ECTS</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600/80">
                                    💡 <strong className="text-blue-600">Pro Tip:</strong> Use our Final Grade Calculator before your exams to know exactly what score you need. 
                                    This helps you focus your study efforts on courses where you need the most improvement.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-hairline text-xs text-ink-faint text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-600 hover:underline mx-1">All Calculators</a> • 
                            <a href="/math" className="text-blue-600 hover:underline mx-1">Math Calculators</a> • 
                            <a href="/finance" className="text-blue-600 hover:underline mx-1">Student Finance Tools</a>
                        </p>
                        <p className="mt-2 text-ink-faint text-[11px]">
                            <span className="text-ink-faint">🎓 International grading standards | </span>
                            <span className="text-ink-faint">Always verify with your institution's specific grading policy</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}