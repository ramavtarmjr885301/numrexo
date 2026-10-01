"use client";

// app/science/ScienceCategoryClient.tsx
//
// Client half of the science category page. It was previously app/science/page.tsx,
// a "use client" file that set its <title> and meta tags through next/head.
// next/head does nothing in the App Router, so none of it ever reached the page.
// The metadata now lives in app/science/page.tsx, which is a server component.

import { getCalculatorsByCategory } from '@/data/calculatorsRegistry';
import CalculatorCard from '@/components/common/CalculatorCard';

export default function ScienceCategoryClient() {
    const calculators = getCalculatorsByCategory('science');
    
    // SEO Data - Science & Physics Focus
    const pageUrl = "https://numrexo.com/science";
    const siteName = "Numrexo";
    
    // Structured Data for Science Tools Collection
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Science Calculators",
        "description": "Free professional science calculators for physics, mechanics, and scientific formulas.",
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": siteName,
            "url": "https://numrexo.com"
        },
        "numberOfItems": calculators.length,
        "about": {
            "@type": "Thing",
            "name": "Scientific & Physics Calculation Tools",
            "description": "Tools for distance-speed-time, acceleration, force, energy, pressure, and scientific conversions"
        },
        "audience": {
            "@type": "Audience",
            "name": "Students, Teachers, Engineers, Science Enthusiasts"
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
                        Physics & Science
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    </span>
                    
                    {/* H1 - Primary Keyword */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                        Science Calculators
                    </h1>
                    
                    {/* Subheading - Benefits + Trust */}
                    <p className="text-ink-soft max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Calculate <strong className="text-ink">distance, speed, time, acceleration, force, energy, pressure, and scientific formulas</strong> instantly.
                        <span className="block mt-2 text-blue-600 text-sm">Perfect for students, teachers, and science enthusiasts — 100% free, no sign-up required</span>
                    </p>
                    
                    {/* Trust Badges - Theme colored */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-ink-faint">
                        <span className="flex items-center gap-1">✓ Free — no sign-up</span>
                        <span className="flex items-center gap-1">✓ Works on any device</span>
                        <span className="flex items-center gap-1">✓ Newtonian physics formulas</span>
                        <span className="flex items-center gap-1">✓ No data storage</span>
                    </div>
                </div>
                
                {/* Calculators Count */}
                <div className="mb-5 text-sm text-ink-faint text-center border-b border-hairline pb-3">
                    {calculators.length > 0 ? (
                        <>🔬 <span className="font-semibold text-blue-600">{calculators.length}+ science calculators</span> available — all free to use</>
                    ) : (
                        <>🔬 <span className="font-semibold text-blue-600">New science calculators</span> being added weekly — check back soon!</>
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
                        <div className="text-5xl mb-4">🔬</div>
                        <p className="text-ink-faint mb-2">More science calculators coming soon!</p>
                        <p className="text-ink-faint text-sm">Check back next week for physics and mechanics tools.</p>
                    </div>
                )}
                
                {/* SEO Content Section - Educational Content (No Footer) */}
                <div className="mt-16 pt-8 border-t border-hairline">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column - Why Use These Calculators */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Why Use Numrexo Science Calculators?</h2>
                            <p>
                                Our <strong className="text-ink">science calculators</strong> are designed for high school and 
                                college students, physics teachers, engineers, and science enthusiasts. Each tool uses standard 
                                scientific formulas based on Newtonian physics, classical mechanics, and fundamental scientific principles.
                            </p>
                            <p>
                                The <strong className="text-ink">Distance, Speed & Time Calculator</strong> solves the classic 
                                d = s × t equation. Enter any two values — get the third instantly. Perfect for motion problems, 
                                travel planning, and physics homework.
                            </p>
                            <p>
                                Our <strong className="text-ink">Acceleration Calculator</strong> computes acceleration using 
                                a = (v - u) / t formula. Find initial velocity, final velocity, time, or acceleration. Essential 
                                for understanding motion dynamics and force relationships.
                            </p>
                            <p>
                                The <strong className="text-ink">Force Calculator</strong> applies Newton's Second Law (F = m × a). 
                                Calculate force, mass, or acceleration. Fundamental for mechanics problems and understanding how 
                                forces affect motion.
                            </p>
                            <p>
                                Our <strong className="text-ink">Energy Calculators</strong> compute kinetic energy (½mv²) and 
                                potential energy (mgh). The <strong className="text-ink">Pressure Calculator</strong> uses P = F/A 
                                formula. These tools are essential for work-energy theorem problems and fluid mechanics.
                            </p>
                            <p>
                                <strong className="text-ink">100% free, no registration, no data collection.</strong> All calculations 
                                happen in your browser — your scientific work stays private.
                            </p>
                        </div>
                        
                        {/* Right Column - Popular Use Cases */}
                        <div className="text-sm text-ink-faint space-y-3">
                            <h2 className="text-lg font-semibold text-ink mb-3">Popular Scientific Calculations</h2>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">Distance-Speed-Time:</strong> d = s × t — motion and travel problems</li>
                                <li><strong className="text-ink">Acceleration:</strong> a = (v - u) / t — change in velocity over time</li>
                                <li><strong className="text-ink">Force (Newton's Second Law):</strong> F = m × a — mass and acceleration</li>
                                <li><strong className="text-ink">Kinetic Energy:</strong> KE = ½mv² — energy of moving objects</li>
                                <li><strong className="text-ink">Potential Energy:</strong> PE = mgh — gravitational potential energy</li>
                                <li><strong className="text-ink">Pressure:</strong> P = F/A — force distributed over area</li>
                                <li><strong className="text-ink">Work Calculator:</strong> W = F × d × cosθ — force over distance</li>
                                <li><strong className="text-ink">Power Calculator:</strong> P = W/t or P = F × v — rate of doing work</li>
                                <li><strong className="text-ink">Density Calculator:</strong> ρ = m/V — mass per unit volume</li>
                                <li><strong className="text-ink">Momentum Calculator:</strong> p = m × v — mass in motion</li>
                            </ul>
                            
                            {/* Scientific Formulas Covered */}
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-ink mb-2">Scientific Laws & Formulas Used</h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Newton's Laws of Motion</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Work-Energy Theorem</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Kinematic Equations</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Law of Conservation of Energy</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-ink-soft">Pascal's Principle</span>
                                </div>
                            </div>
                            
                            {/* Pro Tip Box - Theme colored */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600/80">
                                    💡 <strong className="text-blue-600">Pro Tip:</strong> For motion problems, always identify your known and unknown 
                                    variables first. Use our Distance-Speed-Time calculator for constant velocity problems, and Acceleration 
                                    calculator for uniformly accelerated motion. Remember: Force = mass × acceleration — the same formula 
                                    explains everything from pushing a cart to rocket propulsion!
                                </p>
                            </div>
                            
                            {/* Disclaimer */}
                            <div className="mt-3 p-2 bg-cream rounded text-[11px] text-ink-faint italic">
                                Note: These calculators use standard physics formulas and SI units (meters, kilograms, seconds, Newtons, Joules). 
                                Results are ideal (no friction, air resistance, or other real-world factors). For precise engineering work, 
                                consult domain-specific references.
                            </div>
                        </div>
                    </div>
                    
                    {/* Internal Linking - Helps Search Engines & Users (No Footer) */}
                    <div className="mt-8 pt-6 border-t border-hairline text-xs text-ink-faint text-center">
                        <p>Related: 
                            <a href="/calculators" className="text-blue-600 hover:underline mx-1">All Calculators</a> • 
                            <a href="/math" className="text-blue-600 hover:underline mx-1">Mathematics Calculators</a> • 
                            <a href="/converters" className="text-blue-600 hover:underline mx-1">Unit Converters</a>
                        </p>
                        <p className="mt-2 text-ink-faint text-[11px]">
                            <span className="text-ink-faint">⚛️ Newtonian physics & SI units | </span>
                            <span className="text-ink-faint">Ideal for homework, lab work, and conceptual understanding</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}